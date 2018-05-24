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
import '../templates/semaineGroupe.html';
import '../templates/newTrGrp.html';
import '../templates/newTdGrp.html';

//constantes pour les heures et les jours
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
const mesJours = [
        "lundi",
        "mardi",
      "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche"
];

//Helpers pour les tableaux
Template.semaineDeGroupe.helpers({
  jour: [
    {
      nomJour: mesJours[0]
    },
    {
      nomJour: mesJours[1]
    },
    {
      nomJour: mesJours[2]
    },
    {
      nomJour: mesJours[3]
    },
    {
      nomJour: mesJours[4]
    },
    {
      nomJour: mesJours[5]
    },
    {
      nomJour: mesJours[6]
    },
  ],
});

//quand le template est créé, on crée un ReactiveVar
Template.groupe.onCreated(function(){
  this.isAdmin = new ReactiveVar(false);
});

//events du template proposant à l'utilisateur de créer un groupe
Template.addGroup.events({
'click #btnCreer': function(event, template){
        event.preventDefault();

        //let leGroupe = event.target.nomGroupe.value;
        let leGroupe = document.getElementById("nomGroupe").value;
        console.log(leGroupe)
        let nameTest = Groups.findOne({"name": leGroupe});
        if(leGroupe){
            
            Meteor.call('groups.create', Meteor.userId(), leGroupe);
            let nameGroup = Groups.findOne({"name": leGroupe});
            FlowRouter.go('groupe', { _id: nameGroup._id });
           
        }
        else{
            alert("Veuillez entrer un nom de groupe!")
        }
    },
});

//helpers permettant de savoir quels sont les groupes pour lesquels on est membre
Template.addGroup.helpers({
  mesGroupesMembre: function(){
    let myGroups = Groups.find({users: Meteor.userId()})
    return myGroups;
  }
});

Template.groupe.helpers({
  //Savoir qui est admin et récupérer son email
  monAdmin: function(){
    let groupeId = FlowRouter.getParam('_id');
    let requete = Groups.findOne({_id:groupeId});
    let idAdmin = requete.admin;
    let leAdmin = Meteor.users.findOne({_id: idAdmin});
    let myAdmin = leAdmin.emails[0].address;
    return myAdmin;
  },
  //Savoir qui est membre et récupérer leurs emails
  mesMembres: function(){
    let groupeId = FlowRouter.getParam('_id');
    let requete = Groups.findOne({_id: groupeId});
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
  //créer une mailing list pour un mailto
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
      if (!searchRes){
        alert("Cet utilisateur n'existe pas!");
        addUser.value="";
      }
      //si l'utilisateur essaie de s'ajouter lui-même au groupe...
      else if (searchRes._id == Meteor.userId()){
        alert("C'est vous!")
        addUser.value="";
      }
      //si aucune des conditions précédentes sont remplies, procéder avec l'ajout au groupe.
      else if (!searchSemaine.isPrivate){
        let idSearch = searchRes._id;
        let groupeId = FlowRouter.getParam('_id');
        //réupérer l'email de l'admin
        let admin= Groups.findOne({_id: groupeId},{admin:Meteor.userId()}).admin;
        let adminEmail = Meteor.users.findOne({'_id':admin}).emails[0].address;
        console.log(adminEmail)
        //tester si l'utilisateur est déjà dans le groupe.
        let groupTest = Groups.findOne({users : idSearch, _id : groupeId});
        //si ce n'est pas le cas, procéder
        if (!groupTest){
          Meteor.call("groups.updateGroup", idSearch, groupeId);
          // notifier la personne en question.
          Meteor.call("notifs.pushGroupAdd",idSearch, groupName,adminEmail);
          //notifier tous les membres du groupe, à l'exception de l'admin (qui occupe la position 0
          // et le membre en question, qui occupe la dernière position de l'array "users".
          let thisGroupMembres = Groups.findOne({_id: groupeId}).users
            for (i=1; i<thisGroupMembres.length-1; i++){
              Meteor.call('notifs.pushNewGroupMember',thisGroupMembres[i],groupName,addUser.value)
          }
          FlowRouter.go('groupe', { _id: groupeId });
          alert(`${addUser.value} a été ajouté!`);
          addUser.value="";
        }
        //si l'utilisateur est déjà dans le groupe...
        else if (groupTest){
          alert("Cet utilisateur est déjà dans ce groupe!")
          addUser.value="";
        }
      }
    }
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
                        // et notifier la personne en question.
                          Meteor.call("notifs.pushGroupAdd",idSearch,groupName,adminEmail);
                          console.log(idSearch,groupName,adminEmail)
                        //ensuite, notifier tous les membres du groupe, à l'exception de l'admin
                        //(se trouvant à la position 0 de l'array "users", et le nouvel utilisateur, qui
                        //se trouve à la dernière.
                        let thisGroupMembres = Groups.findOne({_id: groupeId}).users
                        for (i=1; i<thisGroupMembres.length-1; i++){
                            Meteor.call('notifs.pushNewGroupMember',thisGroupMembres[i],groupName,nomUt)
                        }
                          FlowRouter.go('groupe', { _id: groupeId });
                          alert(`${addUser.value} a été ajouté!`)
                          addUser.value="";
                        }
                        //si l'utilisateur est déjà dans le groupe...
                        else if (groupTest){
                          alert("Cet utilisateur est déjà dans ce groupe!")
                          addUser.value="";
                        }
                }
            //enfin, si l'adresse mail n'est pas valide...
            else{
                alert("Cet adresse email n'est pas valide!")
                addUser.value="";
            }
          }
    },
    //quand on clique sur le petit crayon, on a un prompt pour changer le nom du groupe
    'click #groupNameButton': function (event){
        event.preventDefault();
        let groupeId = FlowRouter.getParam('_id');
        let groupe = Groups.findOne({_id: groupeId});
            let newname = window.prompt("Entrez un nouvean nom");
            if(newname != null){
                Meteor.call('groups.changeName', groupeId, newname);
            } else {
                return;
            }
    },
    //quand on clique sur le bouton pour quitter le groupe... On quitte le groupe
    'click #groupLeaveButton': function (event){
        event.preventDefault();
        let groupeId = FlowRouter.getParam('_id');
        let groupe = Groups.findOne({_id: groupeId});
        let idUt = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;
        let r=confirm("Voulez-vous vraiment quitter ce groupe?");
        if (r==true){
            console.log(groupe.admin,groupe.name,idUt);
            Meteor.call("notifs.groupMemberLeave",groupe.admin, groupe.name, idUt);
            Meteor.call('groups.leaveGroup', groupeId, Meteor.userId());
            FlowRouter.go('/')
            }
        else{
            FlowRouter.go('groupe', { _id: groupeId });
            }
    },
    //quand on clique sur le bouton pour effacer le groupe... on supprime son document de la collection Groups
    'click #groupDeleteButton': function (event){
        event.preventDefault();
        let groupeId= FlowRouter.getParam('_id');
        let groupe=Groups.findOne({_id: groupeId});
        if(groupe.admin == Meteor.userId()){
            let s=confirm("Ce groupe sera supprimé. Procéder?");
            if (s==true){
                Groups.remove({_id: groupeId});
                FlowRouter.go('/');
                let users=groupe.users;
                for (i=0;i<users.length;i++){
                    Meteor.call('notifs.kickedGroup',users[i],groupe.name)
                }
            }
            else{
                FlowRouter.go('groupe', { _id: groupeId });
            }
        }
    },
    //quand l'administrateur retire un utilisateur... ça le supprime
    'click .banUser': function (event){
        event.preventDefault();
        let groupeId= FlowRouter.getParam('_id');
        let idUt = event.currentTarget.id;
        let nomGr=Groups.findOne({_id:groupeId}).name;
        let s=confirm("Cet utilisateur sera supprimé du groupe. Procéder?");
            if (s==true){
              Meteor.call('groups.leaveGroup', groupeId, idUt);
              Meteor.call('notifs.kickedGroup',idUt,nomGr);
            }
    }
});

//helpers pour :
Template.groupe.helpers({
  //1) afficher le nom du groupe
  nomGroupe: function(){
    let groupeId = FlowRouter.getParam('_id');
    let requete = Groups.findOne({_id:groupeId});
    return(requete.name);
  },
  //2) savoir si l'utilisateur qui observe le groupe en est l'administrateur ou non
  estAdmin: function(){
    let groupeId= FlowRouter.getParam('_id');
    let requete = Groups.findOne({_id:groupeId});
    if(Meteor.userId() == requete.admin){
      Template.instance().isAdmin = new ReactiveVar(true);
    }
    else{
      Template.instance().isAdmin = new ReactiveVar(false);
    }
    return Template.instance().isAdmin.get();
  },
});

//fonction pour obtenir les tableaux des utilisateurs
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

//helper pour le tableau de semaine, avec une fonction qui observe les changement dans le document des utilisateurs
Template.newTdGrp.helpers({
  periode:function(){
    //récupération des informations des utilisateurs
    let groupeId = FlowRouter.getParam('_id');
    let monGroupe = Groups.findOne({_id: groupeId});
    let mbrGroupe = monGroupe.users;
    let mesScores = [];
    for(let i =0;i<mbrGroupe.length;i++){
        mesScores[i] = scoresUtilisateurCourant(mbrGroupe[i]);
    }
    const resultat = [];
    for(let i=0;i<mesJours.length;i++){
        let placeHolder = [];
        for(let j=0;j<mesHeures.length;j++){
            let calcul = 0;
            for(let k=0;k<mbrGroupe.length; k++){
                calcul = calcul + mesScores[k][i][j];
            }
            calcul = Math.round(calcul/mbrGroupe.length);
            placeHolder.push(calcul);
        }
        resultat.push(placeHolder);
    }
    mesScores = resultat;
    //return du résultat
    return [
    {
      heure: mesHeures[0], 
      id_heure: 0, 
      valeurLundi: mesScores[0][0],
      valeurMardi: mesScores[1][0],
      valeurMercredi: mesScores[2][0],
      valeurJeudi: mesScores[3][0],
      valeurVendredi: mesScores[4][0],
      valeurSamedi: mesScores[5][0],
      valeurDimanche: mesScores[6][0]
    },
    {
      heure: mesHeures[1], 
      id_heure: 1,
      valeurLundi: mesScores[0][1],
      valeurMardi: mesScores[1][1],
      valeurMercredi: mesScores[2][1],
      valeurJeudi: mesScores[3][1],
      valeurVendredi: mesScores[4][1],
      valeurSamedi: mesScores[5][1],
      valeurDimanche: mesScores[6][1]
    },
    {
      heure: mesHeures[2], 
      id_heure: 2,
      valeurLundi: mesScores[0][2],
      valeurMardi: mesScores[1][2],
      valeurMercredi: mesScores[2][2],
      valeurJeudi: mesScores[3][2],
      valeurVendredi: mesScores[4][2],
      valeurSamedi: mesScores[5][2],
      valeurDimanche: mesScores[6][2]
    },
    {
      heure: mesHeures[3], 
      id_heure: 3,
      valeurLundi: mesScores[0][3],
      valeurMardi: mesScores[1][3],
      valeurMercredi: mesScores[2][3],
      valeurJeudi: mesScores[3][3],
      valeurVendredi: mesScores[4][3],
      valeurSamedi: mesScores[5][3],
      valeurDimanche: mesScores[6][3]
    },
    {
      heure: mesHeures[4], 
      id_heure: 4,
      valeurLundi: mesScores[0][4],
      valeurMardi: mesScores[1][4],
      valeurMercredi: mesScores[2][4],
      valeurJeudi: mesScores[3][4],
      valeurVendredi: mesScores[4][4],
      valeurSamedi: mesScores[5][4],
      valeurDimanche: mesScores[6][4]
    },
    {
      heure: mesHeures[5], 
      id_heure: 5,
      valeurLundi: mesScores[0][5],
      valeurMardi: mesScores[1][5],
      valeurMercredi: mesScores[2][5],
      valeurJeudi: mesScores[3][5],
      valeurVendredi: mesScores[4][5],
      valeurSamedi: mesScores[5][5],
      valeurDimanche: mesScores[6][5]
    },
    {
      heure: mesHeures[6], 
      id_heure: 6,
      valeurLundi: mesScores[0][6],
      valeurMardi: mesScores[1][6],
      valeurMercredi: mesScores[2][6],
      valeurJeudi: mesScores[3][6],
      valeurVendredi: mesScores[4][6],
      valeurSamedi: mesScores[5][6],
      valeurDimanche: mesScores[6][6]
    },
    {
      heure: mesHeures[7], 
      id_heure: 7,
      valeurLundi: mesScores[0][7],
      valeurMardi: mesScores[1][7],
      valeurMercredi: mesScores[2][7],
      valeurJeudi: mesScores[3][7],
      valeurVendredi: mesScores[4][7],
      valeurSamedi: mesScores[5][7],
      valeurDimanche: mesScores[6][7]
    },
    {
      heure: mesHeures[8], 
      id_heure: 8,
      valeurLundi: mesScores[0][8],
      valeurMardi: mesScores[1][8],
      valeurMercredi: mesScores[2][8],
      valeurJeudi: mesScores[3][8],
      valeurVendredi: mesScores[4][8],
      valeurSamedi: mesScores[5][8],
      valeurDimanche: mesScores[6][8]
    },
    {
      heure: mesHeures[9], 
      id_heure: 9,
      valeurLundi: mesScores[0][9],
      valeurMardi: mesScores[1][9],
      valeurMercredi: mesScores[2][9],
      valeurJeudi: mesScores[3][9],
      valeurVendredi: mesScores[4][9],
      valeurSamedi: mesScores[5][9],
      valeurDimanche: mesScores[6][9]
    },
    {
      heure: mesHeures[10], 
      id_heure: 10,
      valeurLundi: mesScores[0][10],
      valeurMardi: mesScores[1][10],
      valeurMercredi: mesScores[2][10],
      valeurJeudi: mesScores[3][10],
      valeurVendredi: mesScores[4][10],
      valeurSamedi: mesScores[5][10],
      valeurDimanche: mesScores[6][10]
    },
    {
      heure: mesHeures[11], 
      id_heure: 11,
      valeurLundi: mesScores[0][11],
      valeurMardi: mesScores[1][11],
      valeurMercredi: mesScores[2][11],
      valeurJeudi: mesScores[3][11],
      valeurVendredi: mesScores[4][11],
      valeurSamedi: mesScores[5][11],
      valeurDimanche: mesScores[6][11]
    },
    {
      heure: mesHeures[12], 
      id_heure: 12,
      valeurLundi: mesScores[0][12],
      valeurMardi: mesScores[1][12],
      valeurMercredi: mesScores[2][12],
      valeurJeudi: mesScores[3][12],
      valeurVendredi: mesScores[4][12],
      valeurSamedi: mesScores[5][12],
      valeurDimanche: mesScores[6][12]
    },
    {
      heure: mesHeures[13], 
      id_heure: 13,
      valeurLundi: mesScores[0][13],
      valeurMardi: mesScores[1][13],
      valeurMercredi: mesScores[2][13],
      valeurJeudi: mesScores[3][13],
      valeurVendredi: mesScores[4][13],
      valeurSamedi: mesScores[5][13],
      valeurDimanche: mesScores[6][13]
    },
    {
      heure: mesHeures[14], 
      id_heure: 14,
      valeurLundi: mesScores[0][14],
      valeurMardi: mesScores[1][14],
      valeurMercredi: mesScores[2][14],
      valeurJeudi: mesScores[3][14],
      valeurVendredi: mesScores[4][14],
      valeurSamedi: mesScores[5][14],
      valeurDimanche: mesScores[6][14]
    },
  ]
  }
});