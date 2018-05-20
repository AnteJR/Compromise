//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
import { Notifs } from '../api/notifications.js'
import { ReactiveVar } from 'meteor/reactive-var';
import { Groups } from '../api/groups.js';


//importation des fichiers
import './login.html';
import '../templates/login.html';
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';
import '../templates/header.html';
import '../templates/semaineComparee.html';
import '../templates/recherche.html';
import '../templates/addGroup.html';
import '../templates/groupe.html';

const mesJours = [
    "lundi",
    "mardi",
   "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche"
];
const mesHeures = [
"08:00",
"09:00",
"10:00",
"11:00",
"12:00",
"13:00",
"14:00",
"15:00",
"16:00",
"17:00",
"18:00",
"19:00",
"20:00",
"21:00",
"22:00"
];

Template.groupe.onCreated(function(){
  let groupeId= FlowRouter.getParam('_id');
  let requete = Groups.findOne({_id:groupeId});
  if(Meteor.userId() == requete.admin){
    this.isAdmin = new ReactiveVar(true);
  }
  else{
    this.isAdmin = new ReactiveVar(false);
  }
  if (requete.users.includes(Meteor.userId())){
    this.isUser = new ReactiveVar(true);
  }
  else {
    this.isUser = new ReactiveVar(false);
  }
});

Template.groupe.rendered = function(){
    
  setTimeout(function(){
    creationTableau();
  }, 500);
}

Template.addGroup.events({
    'click #btnCreer': function(event, template){
        event.preventDefault();

        //let leGroupe = event.target.nomGroupe.value;
        let leGroupe = document.getElementById("nomGroupe").value;
        console.log(leGroupe)
        let nameTest = Groups.findOne({"name": leGroupe});
		    if(leGroupe){
            
            Meteor.call('groups.create', Meteor.userId(), leGroupe);
           
        }
        else{
            alert("Veuillez entrer un nom de groupe!")
        }
    },
});

function creationTableau(){
  let groupeId = FlowRouter.getParam('_id');
        let monGroupe = Groups.findOne({_id: groupeId});
        let mbrGroupe = monGroupe.users;
        let mesScores = [];
        
        for(let i =0;i<mbrGroupe.length;i++){
            mesScores[i] = scoresUtilisateurCourant(mbrGroupe[i]);
        }
        
        console.table(mesScores);
        const resultat = [];
        for(let i=0;i<mesJours.length;i++){
               let placeHolder = [];
               for(let j=0;j<mesHeures.length;j++){
                   let calcul = 0;
                   for(let k=0;k<mbrGroupe.length; k++){
                   calcul = calcul + mesScores[k][i][j];
                   }
                   calcul = calcul/mbrGroupe.length;
                   placeHolder.push(calcul);
            }
            resultat.push(placeHolder);
        }
        if(document.getElementById('tableauComparaison')){
          document.getElementById('tableauComparaison').remove();
        }
        let monTableau = document.createElement("table");
        monTableau.setAttribute("border",1);
        monTableau.setAttribute("id","tableauComparaison")
        document.body.appendChild(monTableau);
        for(let i=0;i<mesHeures.length;i++){
            if(i==0){
                let unTr = document.createElement("tr");
                monTableau.appendChild(unTr);
                let unTd = document.createElement("td");
                unTd.style = "width:100px;height:30px;text-align:center;line-height:30px;"
                  unTd.innerHTML = " "
                unTr.appendChild(unTd);
                for(let k=0;k<resultat.length;k++){
                    let mesTh = document.createElement("th");
                    mesTh.innerHTML = mesJours[k];
                    mesTh.style = "width:100px;height:30px;text-align:center;line-height:30px;"
                    unTr.appendChild(mesTh);
                }
            }
            let monTr = document.createElement("tr");
            monTableau.appendChild(monTr);
            for(let j=0;j<resultat.length;j++){
                  if(j==0){
                    let unTd = document.createElement("td");
                          unTd.style = "width:100px;"
                    unTd.innerHTML = mesHeures[i];
                    monTr.appendChild(unTd)
                  }
                  resultat[j][i] = Math.round(resultat[j][i]);
                  monTd = document.createElement("td");
                  monTd.style = "background-color:hsla("+resultat[j][i]+"0, 100%, 54%, 1);width:100px;height:30px;text-align:center;line-height:30px;";
                  if(resultat[j][i] >= 0 && resultat[j][i] <= 4){
                      monTd.innerHTML = "<b> ✕ </b>";
                      monTd.style.color = "hsla("+resultat[j][i]+"0, 100%, 90%, 1)";
                  }
                  else if(resultat[j][i] > 4 && resultat[j][i] <= 7){
                      monTd.innerHTML = "<b> ~ </b>";
                      monTd.style.color += "hsla("+resultat[j][i]+"0, 100%, 90%, 1)";
                  }
                  else if(resultat[j][i] > 7 && resultat[j][i] <= 10){
                      monTd.innerHTML = "<b> ✓ </b>";
                      monTd.style.color += "hsla("+resultat[j][i]+"0, 100%, 90%, 1)";
                  }
                  monTd.setAttribute("value",resultat[j][i]);
                  monTr.appendChild(monTd);
            }
        }
}

Template.addGroup.helpers({
    mesGroupesAdmin: function(){
    let btngroupes = Groups.find({ admin: Meteor.userId() });
        return btngroupes;
    },
    mesGroupesMembre: function(){
        let myGroups = Groups.find({users: Meteor.userId()})
        return myGroups;
    }
});

Template.groupe.helpers({
    monAdmin: function(){
        let groupeId = FlowRouter.getParam('_id');
        let requete = Groups.findOne({_id:groupeId});
        let idAdmin = requete.admin;
        let leAdmin = Meteor.users.findOne({_id: idAdmin});
        let myAdmin = leAdmin.emails[0].address;
        return myAdmin;
    },
    mesMembres: function(){
        let groupeId = FlowRouter.getParam('_id');
        let requete = Groups.findOne({_id: groupeId});
        //console.log(requete.users);
        let myMembre = [];
        for(let i = 1; i<requete.users.length;i++){
            let membre = requete.users[i];
            let leMembre = Meteor.users.findOne({_id: membre});
            myMembre[(i-1)] = {
                monMembre: leMembre.emails[0].address,
                membreId: requete.users[i]
            };
        }
        return myMembre;
    },
    mailingList: function(){
        let groupeId = FlowRouter.getParam('_id');
        let requete = Groups.findOne({_id: groupeId});
        //console.log(requete.users);
        let myMembre = [];
        let listeMembre=[];
        for(let i = 1; i<requete.users.length;i++){
            let membre = requete.users[i];
            let leMembre = Meteor.users.findOne({_id: membre});
            myMembre[(i-1)] = {
                monMembre: leMembre.emails[0].address,
                membreId: requete.users[i]
            };
            listeMembre.push(myMembre[(i-1)].monMembre);
        }
        let mailList=listeMembre.toString();
        return mailList;
    
    }
});

function scoresUtilisateurCourant(idUt){
    //tableau vide pour accueillir les scores
    const mesScores = [];
    //boucle qui va chercher les scres de chaque jour et les stocke dans un array à deux dimensions
    for(let i=0;i<7;i++){
      	const doc = Semaines.findOne({ id_utilisateur: idUt });
      	const array = doc[mesJours[i]];
      	mesScores.push(array);
    }
    return(mesScores);
}

Template.groupe.events({
    'submit #ajoutDUtilisateur': function(event){
        event.preventDefault();
        let groupeId= FlowRouter.getParam('_id');
        let groupName = Groups.findOne({_id:groupeId}).name;
        let nomUt = document.getElementById("addUser").value;
        let currentAdminEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails.address;
        //vérifier que l'adresse mail correspond au format habituel
        let re = /\S+@\S+\.\S+/;
        let regExTest = nomUt.match(re);
        // si c'est le cas...
        if (regExTest){
            //vérifier qu'une semaine avec l'ID de l'utilisateur en question existe.
            let searchRes = Meteor.users.findOne({"emails.address": nomUt});
            let searchSemaine= Semaines.find({"id_utilisateur":searchRes});
            //si ce n'est pas le cas, alerter l'utilisateur.
            console.log(searchSemaine)
            if (!searchRes){
                alert("Cet utilisateur n'existe pas!");
                addUser.value="";
            }
            //si l'utilisateur essaie de s'ajouter lui-même au groupe...
            else if (searchRes._id == Meteor.userId()){
                alert("C'est vous!")
                addUser.value="";
            }
            //si la semaine en question est privée...
            else if (searchSemaine.isPrivate){
                alert("Cet utilisateur ne désire pas partager ses informations!")
                addUser.value="";
            }
            //si aucune des conditions précédentes sont remplies, procéder avec l'ajout au groupe.
            else if (!searchSemaine.isPrivate){
                let idSearch = searchRes._id;
                let groupeId = FlowRouter.getParam('_id');
                //utile pour la suite (notifs) de déjà définir certains propriétés de l'admin
                let admin= Groups.findOne({_id: groupeId},{admin:Meteor.userId()}).admin;
                let adminEmail = Meteor.users.findOne({'_id':admin}).emails[0].address;
                console.log(adminEmail)
                //tester si l'utilisateur est déjà dans le groupe.
                    let groupTest = Groups.findOne({users : idSearch, _id : groupeId});
                    //si ce n'est pas le cas, procéder
                        if (!groupTest){
                          Meteor.call("groups.updateGroup", idSearch, groupeId);
                          console.log(idSearch,groupName,adminEmail);
                        // et notifier la personne en question.
                          Meteor.call("notifs.pushGroupAdd",idSearch, groupName,adminEmail);
                        //ensuite, notifier tous les membres du groupe.
                        let thisGroupMembres=Groups.findOne({_id: groupeId}).users
                        for (i=0;i>thisGroupMembres.length;i++){
                            Meteor.call('notifs.pushNewGroupMember',thisGroupMembres[i],groupName,addUser.value)
                            console.log(thisGroupMembres[i],groupName,addUser.value)
                        }
                          FlowRouter.go('groupe', { _id: groupeId });
                          alert(`${addUser.value} a été ajouté!`)
                          creationTableau();
                          addUser.value="";
                        }
                        //si l'utilisateur est déjà dans le groupe...
                        else if (groupTest){
                          alert("Cet utilisateur est déjà dans ce groupe!")
                          addUser.value="";
                        }
                  }
                }
            //enfin, si l'adresse mail n'est pas valide...
            else{
                alert("Cet adresse email n'est pas valide!")
                addUser.value="";
            }
},
    'click #groupNameButton': function (event){
        event.preventDefault();
        let groupeId= FlowRouter.getParam('_id');
        let groupe=Groups.findOne({_id: groupeId});
            //merci Loris pour le code
            let newname = window.prompt("Entrez un nouvean nom",this.nom);
            if(newname != null){
                Meteor.call('groups.changeName',groupeId,newname);
            }else{
                return;
            }
    },
    'click #groupLeaveButton': function (event){
        event.preventDefault();
        let groupeId= FlowRouter.getParam('_id');
        let groupe=Groups.findOne({_id: groupeId});
        let r=confirm("Voulez-vous vraiment quitter ce groupe?")
        if (r==true){
            Meteor.call('groups.leaveGroup', groupeId, Meteor.userId())
            FlowRouter.go('/')
            }
        else{
            FlowRouter.go('groupe', { _id: groupeId });
            }
    },
    'click #groupDeleteButton': function (event){
        event.preventDefault();
        let groupeId= FlowRouter.getParam('_id');
        let groupe=Groups.findOne({_id: groupeId});
        if(groupe.admin == Meteor.userId()){
            let s=confirm("Ce groupe sera supprimé. Procéder?")
            if (s==true){
                Groups.remove({_id: groupeId});
                FlowRouter.go('/')
            }
            else{
                FlowRouter.go('groupe', { _id: groupeId });
            }
        }
    },
    'click .banUser': function (event){
        event.preventDefault();
        let groupeId= FlowRouter.getParam('_id');
        let idUt = event.currentTarget.id;
        let s=confirm("Cet utilisateur sera supprimé du groupe. Procéder?")
            if (s==true){
        Meteor.call('groups.leaveGroup', groupeId, idUt);
        creationTableau();
            }
    }
});

Template.groupe.helpers({
  nomGroupe: function(){
    let groupeId= FlowRouter.getParam('_id');
    let requete = Groups.findOne({_id:groupeId});
    return(requete.name);
  },
  estAdmin: function(){
    return Template.instance().isAdmin.get();
  },
  estMembre: function(){
    return Template.instance().isUser.get();
  }
});