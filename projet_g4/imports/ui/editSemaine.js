//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';

//importation des fichiers
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';

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
	},
	'click .heureSemaine': function(event){
		event.preventDefault();
		if(valeur==0){
			$(event.target).val(valeur);
		} else if(valeur==4){
			$(event.target).val(valeur);
		} else if(valeur==10){
			$(event.target).val(valeur);
		}
	}
});

Template.newTr.events({
	'click .joursSemaine': function(event){
		event.preventDefault();
		if(valeur==0){
			$(event.target).val(valeur);
		} else if(valeur==4){
			$(event.target).val(valeur);
		} else if(valeur==10){
			$(event.target).val(valeur);
		}
	},
});
Template.header.events({
	'click #prive': function(event){
		event.preventDefault();
		const doc = Semaines.findOne({ id_utilisateur: Meteor.userId() });
		if(event.target.value == "oui"){
			event.target.value = "non";
			console.log(doc._id);
			Meteor.call("semaines.updateFalse", Meteor.userId());
		} else if(event.target.value == "non"){
			event.target.value = "oui";
			Meteor.call("semaines.updateTrue", Meteor.userId());
		}
	}
});



