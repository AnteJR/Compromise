//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';

//importation des fichiers
import './login.html';
import '../templates/login.html';
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';
import '../templates/semaineDays.html';
import '../templates/header.html';
import '../templates/newTdComp.html';
import '../templates/semaineComparee.html';
import '../templates/recherche.html';

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
let valeursComparees;

//quand un utilisateur se connecte...
Accounts.onLogin(function(user){
	//...si il n'a pas de document avec son id dans la collection Semaines..
	if(Semaines.find({id_utilisateur: Meteor.userId()}).count() == 0){
		//...on lui assigne un document semaine par défaut (valeurs de 0 pour chaque cellules)
		Meteor.call("semaines.createDefault", Meteor.userId());
	}
	let mesScores = scoresUtilisateurCourant(Meteor.userId());
    //lancement de la fonction de création de tableaux
    //creerTableau(mesScores);
});



//Helpers pour les tableaux
Template.tableauSemaines.helpers({
	jour: [
		{
			nomJour: "lundi"
		},
		{
			nomJour: "mardi"
		},
		{
			nomJour: "mercredi"
		},
		{
			nomJour: "jeudi"
		},
		{
			nomJour: "vendredi"
		},
		{
			nomJour: "samedi"
		},
		{
			nomJour: "dimanche"
		},
	],
});
Template.semaineComparee.helpers({
	jour: [
		{
			nomJour: "lundi"
		},
		{
			nomJour: "mardi"
		},
		{
			nomJour: "mercredi"
		},
		{
			nomJour: "jeudi"
		},
		{
			nomJour: "vendredi"
		},
		{
			nomJour: "samedi"
		},
		{
			nomJour: "dimanche"
		},
	],
});
Template.newTd.helpers({
	periode:function(){
		let mesScores = [];
		for(let i=0;i<7;i++){
	      	const doc = Semaines.findOne({ id_utilisateur: Meteor.userId() });
	      	const array = doc[mesJours[i]];
	      	mesScores.push(array);
    	}
		return [
		{
			heure: "8:00", 
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
			heure: "9:00", 
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
			heure: "10:00", 
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
			heure: "11:00", 
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
			heure: "12:00", 
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
			heure: "13:00", 
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
			heure: "14:00", 
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
			heure: "15:00", 
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
			heure: "16:00", 
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
			heure: "17:00", 
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
			heure: "18:00", 
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
			heure: "19:00", 
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
			heure: "20:00", 
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
			heure: "21:00", 
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
			heure: "22:00", 
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
		console.log(Meteor.userId()+" "+jour+" "+heure+" "+elemVal);
		//appel de la méthode semaines.updateTable
		//à voir si l'id de la semaine n'est pas plus pertinent. Cependant il faut voir où le stocker pour le vérifier dans la méthode
		if(!isNaN(elemVal)){Meteor.call("semaines.updateTable", Meteor.userId(), jour, heure, elemVal)};
	},
	'click .joursSemaine': function(event){
		event.preventDefault();
		const jour = event.currentTarget.id;
		const elemVal = parseInt(event.currentTarget.value);
		console.log(elemVal);
		if(!isNaN(elemVal)){Meteor.call("semaines.dayFill", Meteor.userId(), jour, elemVal)};
	}
});

var valeur;

Template.tableauSemaines.events({
	'click #red': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(0, 100%, 54%, 1)"});
		$("#yellow").css({"background-color":"white"});
		$("#green").css({"background-color":"white"});
		valeur = 0;
	},
	'click #yellow': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(40, 100%, 54%, 1)"});
		$("#red").css({"background-color":"white"});
		$("#green").css({"background-color":"white"});
		valeur = 4;
	},
	'click #green': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(100, 100%, 54%, 1)"});
		$("#yellow").css({"background-color":"white"});
		$("#red").css({"background-color":"white"});
		valeur = 10;
	}
});

Template.newTd.events({
	'click .semaine': function(event){
		event.preventDefault();
		//console.log(event.target.id+value);
		//Meteor.call("semaines.updateTable", myId, jour, heure, score);
		
		if(valeur==0){
			$(event.target).css({"background-color":"hsl(0, 100%, 54%, 1)"});
			$(event.target).val(valeur);
		} else if(valeur==4){
			$(event.target).css({"background-color":"hsl(40, 100%, 54%, 1)"});
			$(event.target).val(valeur);
		} else if(valeur==10){
			$(event.target).css({"background-color":"hsl(100, 100%, 54%, 1)"});
			$(event.target).val(valeur);
		}
	}
});


//La recherche d'utilisateurs par adresse mail
Template.maRecherche.events({
		'submit form': function(event){
			event.preventDefault();
			let re = /\S+@\S+\.\S+/;
			//let searchVal = mySearch.value;
			let searchVal = event.target.mySearch.value;
			//si l'adresse correspond au format habituel défini sous "re", le stocker dans le console.
			console.log(searchVal.match(re));
			let searchRes = Meteor.users.findOne({"emails.address": searchVal});
			if(searchRes != null){
				console.log(searchRes);
    			let idUt2 = searchRes._id;
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
	    		//lancement de la fonction de création de tableau avec, en donnée, l'array compilant les deux tableaux
    			//creerTableau(mesScores3);
				console.log(mesScores3);
				valeursComparees = mesScores3;
				//Session.set(mesScoresComp, valeursComparees)
			}
			else{
				alert("Email invalide !");
			}
		}
	})



Template.newTr.events({
	'click .joursSemaine': function(event){
		event.preventDefault();
		//console.log(event.target.id+value);
		//Meteor.call("semaines.updateTable", myId, jour, heure, score);
		
		if(valeur==0){
			$(event.target).val(valeur);
		} else if(valeur==4){
			$(event.target).val(valeur);
		} else if(valeur==10){
			$(event.target).val(valeur);
		}
	},
});

Template.newTdComp.helpers({
	periode:function(){
		//let mesScores = Session.get(mesScoresComp);
		return [
		{
			heure: "8:00", 
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
			heure: "9:00", 
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
			heure: "10:00", 
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
			heure: "11:00", 
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
			heure: "12:00", 
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
			heure: "13:00", 
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
			heure: "14:00", 
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
			heure: "15:00", 
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
			heure: "16:00", 
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
			heure: "17:00", 
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
			heure: "18:00", 
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
			heure: "19:00", 
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
			heure: "20:00", 
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
			heure: "21:00", 
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
			heure: "22:00", 
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