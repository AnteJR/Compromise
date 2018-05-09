//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
import { ReactiveVar } from 'meteor/reactive-var';

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

//variable constante pour faciliter le parcours de la base de donnée
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
let valeursComparees;
let estCompare = false;

Template.login.onCreated(function(){
	this.comparaisonTriggered = new ReactiveVar( false );
})

//quand un utilisateur se connecte...
Accounts.onLogin(function(user){
	setTimeout(function(){
		//...si il n'a pas de document avec son id dans la collection Semaines..
		if(Semaines.find({id_utilisateur: Meteor.userId()}).count() == 0){
			//...on lui assigne un document semaine par défaut (valeurs de 0 pour chaque cellules)
			Meteor.call("semaines.createDefault", Meteor.userId());
			let mesScores = scoresUtilisateurCourant(Meteor.userId());
		}
		else{
			let mesScores = scoresUtilisateurCourant(Meteor.userId());
		}
	}, 500);
});

Template.login.helpers({
	comparaisonTriggered: function(){
		return Template.instance().comparaisonTriggered.get();
	},
})

Template.login.events({
	//quand on clique sur le bouton ayant pour class "semaine" (fonctionnera avec un tableau dont les td ont cette class)
	'click .semaine': function(event){
		//on empêche le comportement par défaut
		event.preventDefault();
		//on récupère la value (le score) de l'élément sur lequel au clique
		let elemVal = parseInt(event.currentTarget.value);
		//on récupère son id, qu'on sépare à l'underscore pour avoir d'un côté le jour et de l'autre l'id de l'heure
		const elem = event.currentTarget.id;
		let elemStr = String(elem);
		let elemTab = elemStr.split("_");
		let jour = elemTab[0];
		let heure = parseInt(elemTab[1]);
		//vérification des infos envoyées (à supprimer pour le projet final)
		//appel de la méthode semaines.updateTable
		if(!isNaN(elemVal)){Meteor.call("semaines.updateTable", Meteor.userId(), jour, heure, elemVal)};
	},
	'click .joursSemaine': function(event){
		event.preventDefault();
		const jour = event.currentTarget.id;
		const elemVal = parseInt(event.currentTarget.value);
		if(!isNaN(elemVal)){Meteor.call("semaines.dayFill", Meteor.userId(), jour, elemVal)};
	},
	'click .heureSemaine': function(event){
		event.preventDefault();
		const heure = parseInt(event.currentTarget.id);
		const elemVal = parseInt(event.currentTarget.value);
		console.log(elemVal);
		if(!isNaN(elemVal)){Meteor.call("semaines.hourFill", Meteor.userId(), heure, elemVal)};
	},
	'submit form': function(event, template){
		event.preventDefault();
		let re = /\S+@\S+\.\S+/;
		//let searchVal = mySearch.value;
		let searchVal = event.target.mySearch.value;
		let searchRes = Meteor.users.findOne({"emails.address": searchVal});
		if(searchRes != null){
			let idUt2 = searchRes._id;
			let utilisateurTeste = Semaines.findOne({id_utilisateur: idUt2});
			if(utilisateurTeste.isPrivate){
				alert("Cet utilisateur ne désire pas partager ses informations")
			}
			else{
    		//tableau vie pour accueillir les scores
    		const mesScores1 = scoresUtilisateurCourant(Meteor.userId());
   			const mesScores2 = scoresUtilisateurCourant(idUt2);
    		//double boucles imbriquées qui stockent les informations compilées de deux tableaux de disponibilité sous la forme d'un array à deux dimensions
    		const mesScores3 = [];
    		for(let i=0;i<mesScores1.length;i++){
   				let placeHolder = [];
   				for(let j=0;j<mesScores1[i].length;j++){
   					let calcul = (mesScores1[i][j] + mesScores2[i][j])/2;
   					placeHolder.push(calcul);
    			}
    			mesScores3.push(placeHolder);
    		}
			if(template.comparaisonTriggered.get() == false){
				template.comparaisonTriggered.set(true);
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
					for(let k=0;k<mesScores3.length;k++){
						let mesTh = document.createElement("th");
						mesTh.innerHTML = mesJours[k];
						mesTh.style = "width:100px;height:30px;text-align:center;line-height:30px;"
						unTr.appendChild(mesTh);
					}
				}
				let monTr = document.createElement("tr");
        		monTableau.appendChild(monTr);
        		for(let j=0;j<mesScores3.length;j++){
          			if(j==0){
            			let unTd = document.createElement("td");
  		  	  			unTd.style = "width:100px;"
            			unTd.innerHTML = mesHeures[i];
            			monTr.appendChild(unTd)
          			}
          			monTd = document.createElement("td");
				  	monTd.style = "background-color:hsla("+mesScores3[j][i]+"0, 100%, 54%, 1);width:100px;height:30px;text-align:center;line-height:30px;";
          			if(mesScores3[j][i] >= 0 && mesScores3[j][i] <= 4){
          				monTd.innerHTML = "<b> X </b>";
          				monTd.style.color = "hsla("+mesScores3[j][i]+"0, 100%, 90%, 1)";
          			}
          			else if(mesScores3[j][i] > 4 && mesScores3[j][i] <= 7){
          				monTd.innerHTML = "<b> ~ </b>";
          				monTd.style.color += "hsla("+mesScores3[j][i]+"0, 100%, 90%, 1)";
          			}
          			else if(mesScores3[j][i] > 7 && mesScores3[j][i] <= 10){
          				monTd.innerHTML = "<b> V </b>";
          				monTd.style.color += "hsla("+mesScores3[j][i]+"0, 100%, 90%, 1)";
          			}
          			monTd.setAttribute("value",mesScores3[j][i]);
				  	monTr.appendChild(monTd);
        		}
			}
		}
		}
		else{
			alert("Email invalide !");
		}
	},
	'click .goBack': function(event, template){
		event.preventDefault();
		if(template.comparaisonTriggered.get() == true){
				template.comparaisonTriggered.set(false);
		}
		let tableauASupprimer = document.getElementById("tableauComparaison");
		tableauASupprimer.remove();
	}
});

//Fonction qui retourne au tableau contenant les disponibilités d'un utilisateur donné
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