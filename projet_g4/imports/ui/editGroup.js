//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
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

    //'click #btnGroupe': function(event){
      //  event.preventDefault();
        //let leGroupe = document.getElementById("nomGroupe").value;
        //let groupName = document.getElementById("groupNameInput").value;
        //let groupName = Groups.findOne({"name": leGroupe});
        //let groupId = groupName._id;
        //console.log(groupId);
        //FlowRouter.go('groupe', { _id: groupId });
    //}
});
Template.groupe.events({
    'click #ajouterUt': function(event){
        event.preventDefault();
        let nomUt = document.getElementById("addUser").value;
        let searchRes = Meteor.users.findOne({"emails.address": nomUt});
        let idUt = searchRes._id;
        let groupeId = FlowRouter.getParam('_id');
        console.log(idUt);
        console.log(groupeId);
        Meteor.call("groups.updateGroup", idUt, groupeId);
    },
    'click #lienGrp': function(event){
        event.preventDefault();
        let groupeId = FlowRouter.getParam('_id');
        let groupe = Groups.findOne({_id: groupeId});
        let mbrGroupe = groupe.users;
        console.log(mbrGroupe);
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
        console.table(resultat);
     
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
                      monTd.innerHTML = "<b> X </b>";
                      monTd.style.color = "hsla("+resultat[j][i]+"0, 100%, 90%, 1)";
                  }
                  else if(resultat[j][i] > 4 && resultat[j][i] <= 7){
                      monTd.innerHTML = "<b> ~ </b>";
                      monTd.style.color += "hsla("+resultat[j][i]+"0, 100%, 90%, 1)";
                  }
                  else if(resultat[j][i] > 7 && resultat[j][i] <= 10){
                      monTd.innerHTML = "<b> V </b>";
                      monTd.style.color += "hsla("+resultat[j][i]+"0, 100%, 90%, 1)";
                  }
                  monTd.setAttribute("value",resultat[j][i]);
                  monTr.appendChild(monTd);
            }
        }
    }
});

Template.addGroup.helpers({
    mesGroupes: function(){
    let btngroupes = Groups.find({ admin: Meteor.userId() });
        return btngroupes;
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