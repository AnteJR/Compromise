//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';

//importation des fichiers
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';

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
//helper pour le tableau de semaine, avec une fonction qui observe les changement dans le document de l'utilisateur
Template.newTd.helpers({
	periode:function(){
		let mesScores = [];
		for(let i=0;i<7;i++){
	      	const doc = Semaines.findOne({ id_utilisateur: Meteor.userId() });
	      	const array = doc[mesJours[i]];
	      	mesScores.push(array);
    	}
    let superieurASept = [];
    for(let i=0;i<mesScores.length;i++){
      let isSuperieur;
      let tableauIntermediaire = [];
      for(let j=0;j<mesScores[i].length;j++){
        if(mesScores[i][j]>=0 && mesScores[i][j]<=7){
          isSuperieur = false;
        }
        else if(mesScores[i][j]>7 && mesScores[i][j]<=10){
          isSuperieur = true;
        }
        tableauIntermediaire.push(isSuperieur);
      }
      superieurASept.push(tableauIntermediaire);
    }
    let entreQuatreEtSept = [];
    for(let i=0;i<mesScores.length;i++){
      let isSuperieur;
      let tableauIntermediaire = [];
      for(let j=0;j<mesScores[i].length;j++){
        if(mesScores[i][j]>=4 && mesScores[i][j]<=7){
          isSuperieur = true;
        }
        else{
          isSuperieur = false;
        }
        tableauIntermediaire.push(isSuperieur);
      }
      entreQuatreEtSept.push(tableauIntermediaire);
    }
    //return du résultat
    return [
    {
      heure: mesHeures[0], 
      id_heure: 0, 
      valeurLundi: mesScores[0][0],
      lundiIsOk: superieurASept[0][0],
      lundiMaybe: entreQuatreEtSept[0][0],

      valeurMardi: mesScores[1][0],
      mardiIsOk: superieurASept[1][0],
      mardiMaybe: entreQuatreEtSept[1][0],

      valeurMercredi: mesScores[2][0],
      mercrediIsOk: superieurASept[2][0],
      mercrediMaybe: entreQuatreEtSept[2][0],

      valeurJeudi: mesScores[3][0],
      jeudiIsOk: superieurASept[3][0],
      jeudiMaybe: entreQuatreEtSept[3][0],

      valeurVendredi: mesScores[4][0],
      vendrediIsOk: superieurASept[4][0],
      vendrediMaybe: entreQuatreEtSept[4][0],

      valeurSamedi: mesScores[5][0],
      samediIsOk: superieurASept[5][0],
      samediMaybe: entreQuatreEtSept[5][0],

      valeurDimanche: mesScores[6][0],
      dimancheIsOk: superieurASept[6][0],
      dimancheMaybe: entreQuatreEtSept[6][0],
    },
    {
      heure: mesHeures[1], 
      id_heure: 1,
      valeurLundi: mesScores[0][1],
      lundiIsOk: superieurASept[0][1],
      lundiMaybe: entreQuatreEtSept[0][1],

      valeurMardi: mesScores[1][1],
      mardiIsOk: superieurASept[1][1],
      mardiMaybe: entreQuatreEtSept[1][1],

      valeurMercredi: mesScores[2][1],
      mercrediIsOk: superieurASept[2][1],
      mercrediMaybe: entreQuatreEtSept[2][1],

      valeurJeudi: mesScores[3][1],
      jeudiIsOk: superieurASept[3][1],
      jeudiMaybe: entreQuatreEtSept[3][1],

      valeurVendredi: mesScores[4][1],
      vendrediIsOk: superieurASept[4][1],
      vendrediMaybe: entreQuatreEtSept[4][1],

      valeurSamedi: mesScores[5][1],
      samediIsOk: superieurASept[5][1],
      samediMaybe: entreQuatreEtSept[5][1],

      valeurDimanche: mesScores[6][1],
      dimancheIsOk: superieurASept[6][1],
      dimancheMaybe: entreQuatreEtSept[6][1],
    },
    {
      heure: mesHeures[2], 
      id_heure: 2,
      valeurLundi: mesScores[0][2],
      lundiIsOk: superieurASept[0][2],
      lundiMaybe: entreQuatreEtSept[0][2],

      valeurMardi: mesScores[1][2],
      mardiIsOk: superieurASept[1][2],
      mardiMaybe: entreQuatreEtSept[1][2],

      valeurMercredi: mesScores[2][2],
      mercrediIsOk: superieurASept[2][2],
      mercrediMaybe: entreQuatreEtSept[2][2],

      valeurJeudi: mesScores[3][2],
      jeudiIsOk: superieurASept[3][2],
      jeudiMaybe: entreQuatreEtSept[3][2],

      valeurVendredi: mesScores[4][2],
      vendrediIsOk: superieurASept[4][2],
      vendrediMaybe: entreQuatreEtSept[4][2],

      valeurSamedi: mesScores[5][2],
      samediIsOk: superieurASept[5][2],
      samediMaybe: entreQuatreEtSept[5][2],

      valeurDimanche: mesScores[6][2],
      dimancheIsOk: superieurASept[6][2],
      dimancheMaybe: entreQuatreEtSept[6][2],
    },
    {
      heure: mesHeures[3], 
      id_heure: 3,
      valeurLundi: mesScores[0][3],
      lundiIsOk: superieurASept[0][3],
      lundiMaybe: entreQuatreEtSept[0][3],

      valeurMardi: mesScores[1][3],
      mardiIsOk: superieurASept[1][3],
      mardiMaybe: entreQuatreEtSept[1][3],

      valeurMercredi: mesScores[2][3],
      mercrediIsOk: superieurASept[2][3],
      mercrediMaybe: entreQuatreEtSept[2][3],

      valeurJeudi: mesScores[3][3],
      jeudiIsOk: superieurASept[3][3],
      jeudiMaybe: entreQuatreEtSept[3][3],

      valeurVendredi: mesScores[4][3],
      vendrediIsOk: superieurASept[4][3],
      vendrediMaybe: entreQuatreEtSept[4][3],

      valeurSamedi: mesScores[5][3],
      samediIsOk: superieurASept[5][3],
      samediMaybe: entreQuatreEtSept[5][3],

      valeurDimanche: mesScores[6][3],
      dimancheIsOk: superieurASept[6][3],
      dimancheMaybe: entreQuatreEtSept[6][3],
    },
    {
      heure: mesHeures[4], 
      id_heure: 4,
      valeurLundi: mesScores[0][4],
      lundiIsOk: superieurASept[0][4],
      lundiMaybe: entreQuatreEtSept[0][4],

      valeurMardi: mesScores[1][4],
      mardiIsOk: superieurASept[1][4],
      mardiMaybe: entreQuatreEtSept[1][4],

      valeurMercredi: mesScores[2][4],
      mercrediIsOk: superieurASept[2][4],
      mercrediMaybe: entreQuatreEtSept[2][4],

      valeurJeudi: mesScores[3][4],
      jeudiIsOk: superieurASept[3][4],
      jeudiMaybe: entreQuatreEtSept[3][4],

      valeurVendredi: mesScores[4][4],
      vendrediIsOk: superieurASept[4][4],
      vendrediMaybe: entreQuatreEtSept[4][4],

      valeurSamedi: mesScores[5][4],
      samediIsOk: superieurASept[5][4],
      samediMaybe: entreQuatreEtSept[5][4],

      valeurDimanche: mesScores[6][4],
      dimancheIsOk: superieurASept[6][4],
      dimancheMaybe: entreQuatreEtSept[6][4],
    },
    {
      heure: mesHeures[5], 
      id_heure: 5,
      valeurLundi: mesScores[0][5],
      lundiIsOk: superieurASept[0][5],
      lundiMaybe: entreQuatreEtSept[0][5],

      valeurMardi: mesScores[1][5],
      mardiIsOk: superieurASept[1][5],
      mardiMaybe: entreQuatreEtSept[1][5],

      valeurMercredi: mesScores[2][5],
      mercrediIsOk: superieurASept[2][5],
      mercrediMaybe: entreQuatreEtSept[2][5],

      valeurJeudi: mesScores[3][5],
      jeudiIsOk: superieurASept[3][5],
      jeudiMaybe: entreQuatreEtSept[3][5],

      valeurVendredi: mesScores[4][5],
      vendrediIsOk: superieurASept[4][5],
      vendrediMaybe: entreQuatreEtSept[4][5],

      valeurSamedi: mesScores[5][5],
      samediIsOk: superieurASept[5][5],
      samediMaybe: entreQuatreEtSept[5][5],

      valeurDimanche: mesScores[6][5],
      dimancheIsOk: superieurASept[6][5],
      dimancheMaybe: entreQuatreEtSept[6][5],
    },
    {
      heure: mesHeures[6], 
      id_heure: 6,
      valeurLundi: mesScores[0][6],
      lundiIsOk: superieurASept[0][6],
      lundiMaybe: entreQuatreEtSept[0][6],

      valeurMardi: mesScores[1][6],
      mardiIsOk: superieurASept[1][6],
      mardiMaybe: entreQuatreEtSept[1][6],

      valeurMercredi: mesScores[2][6],
      mercrediIsOk: superieurASept[2][6],
      mercrediMaybe: entreQuatreEtSept[2][6],

      valeurJeudi: mesScores[3][6],
      jeudiIsOk: superieurASept[3][6],
      jeudiMaybe: entreQuatreEtSept[3][6],

      valeurVendredi: mesScores[4][6],
      vendrediIsOk: superieurASept[4][6],
      vendrediMaybe: entreQuatreEtSept[4][6],

      valeurSamedi: mesScores[5][6],
      samediIsOk: superieurASept[5][6],
      samediMaybe: entreQuatreEtSept[5][6],

      valeurDimanche: mesScores[6][6],
      dimancheIsOk: superieurASept[6][6],
      dimancheMaybe: entreQuatreEtSept[6][6],
    },
    {
      heure: mesHeures[7], 
      id_heure: 7,
      valeurLundi: mesScores[0][7],
      lundiIsOk: superieurASept[0][7],
      lundiMaybe: entreQuatreEtSept[0][7],

      valeurMardi: mesScores[1][7],
      mardiIsOk: superieurASept[1][7],
      mardiMaybe: entreQuatreEtSept[1][7],

      valeurMercredi: mesScores[2][7],
      mercrediIsOk: superieurASept[2][7],
      mercrediMaybe: entreQuatreEtSept[2][7],

      valeurJeudi: mesScores[3][7],
      jeudiIsOk: superieurASept[3][7],
      jeudiMaybe: entreQuatreEtSept[3][7],

      valeurVendredi: mesScores[4][7],
      vendrediIsOk: superieurASept[4][7],
      vendrediMaybe: entreQuatreEtSept[4][7],

      valeurSamedi: mesScores[5][7],
      samediIsOk: superieurASept[5][7],
      samediMaybe: entreQuatreEtSept[5][7],

      valeurDimanche: mesScores[6][7],
      dimancheIsOk: superieurASept[6][7],
      dimancheMaybe: entreQuatreEtSept[6][7],
    },
    {
      heure: mesHeures[8], 
      id_heure: 8,
      valeurLundi: mesScores[0][8],
      lundiIsOk: superieurASept[0][8],
      lundiMaybe: entreQuatreEtSept[0][8],

      valeurMardi: mesScores[1][8],
      mardiIsOk: superieurASept[1][8],
      mardiMaybe: entreQuatreEtSept[1][8],

      valeurMercredi: mesScores[2][8],
      mercrediIsOk: superieurASept[2][8],
      mercrediMaybe: entreQuatreEtSept[2][8],

      valeurJeudi: mesScores[3][8],
      jeudiIsOk: superieurASept[3][8],
      jeudiMaybe: entreQuatreEtSept[3][8],

      valeurVendredi: mesScores[4][8],
      vendrediIsOk: superieurASept[4][8],
      vendrediMaybe: entreQuatreEtSept[4][8],

      valeurSamedi: mesScores[5][8],
      samediIsOk: superieurASept[5][8],
      samediMaybe: entreQuatreEtSept[5][8],

      valeurDimanche: mesScores[6][8],
      dimancheIsOk: superieurASept[6][8],
      dimancheMaybe: entreQuatreEtSept[6][8],
    },
    {
      heure: mesHeures[9], 
      id_heure: 9,
      valeurLundi: mesScores[0][9],
      lundiIsOk: superieurASept[0][9],
      lundiMaybe: entreQuatreEtSept[0][9],

      valeurMardi: mesScores[1][9],
      mardiIsOk: superieurASept[1][9],
      mardiMaybe: entreQuatreEtSept[1][9],

      valeurMercredi: mesScores[2][9],
      mercrediIsOk: superieurASept[2][9],
      mercrediMaybe: entreQuatreEtSept[2][9],

      valeurJeudi: mesScores[3][9],
      jeudiIsOk: superieurASept[3][9],
      jeudiMaybe: entreQuatreEtSept[3][9],

      valeurVendredi: mesScores[4][9],
      vendrediIsOk: superieurASept[4][9],
      vendrediMaybe: entreQuatreEtSept[4][9],

      valeurSamedi: mesScores[5][9],
      samediIsOk: superieurASept[5][9],
      samediMaybe: entreQuatreEtSept[5][9],

      valeurDimanche: mesScores[6][9],
      dimancheIsOk: superieurASept[6][9],
      dimancheMaybe: entreQuatreEtSept[6][9],
    },
    {
      heure: mesHeures[10], 
      id_heure: 10,
      valeurLundi: mesScores[0][10],
      lundiIsOk: superieurASept[0][10],
      lundiMaybe: entreQuatreEtSept[0][10],

      valeurMardi: mesScores[1][10],
      mardiIsOk: superieurASept[1][10],
      mardiMaybe: entreQuatreEtSept[1][10],

      valeurMercredi: mesScores[2][10],
      mercrediIsOk: superieurASept[2][10],
      mercrediMaybe: entreQuatreEtSept[2][10],

      valeurJeudi: mesScores[3][10],
      jeudiIsOk: superieurASept[3][10],
      jeudiMaybe: entreQuatreEtSept[3][10],

      valeurVendredi: mesScores[4][10],
      vendrediIsOk: superieurASept[4][10],
      vendrediMaybe: entreQuatreEtSept[4][10],

      valeurSamedi: mesScores[5][10],
      samediIsOk: superieurASept[5][10],
      samediMaybe: entreQuatreEtSept[5][10],

      valeurDimanche: mesScores[6][10],
      dimancheIsOk: superieurASept[6][10],
      dimancheMaybe: entreQuatreEtSept[6][10],
    },
    {
      heure: mesHeures[11], 
      id_heure: 11,
      valeurLundi: mesScores[0][11],
      lundiIsOk: superieurASept[0][11],
      lundiMaybe: entreQuatreEtSept[0][11],

      valeurMardi: mesScores[1][11],
      mardiIsOk: superieurASept[1][11],
      mardiMaybe: entreQuatreEtSept[1][11],

      valeurMercredi: mesScores[2][11],
      mercrediIsOk: superieurASept[2][11],
      mercrediMaybe: entreQuatreEtSept[2][11],

      valeurJeudi: mesScores[3][11],
      jeudiIsOk: superieurASept[3][11],
      jeudiMaybe: entreQuatreEtSept[3][11],

      valeurVendredi: mesScores[4][11],
      vendrediIsOk: superieurASept[4][11],
      vendrediMaybe: entreQuatreEtSept[4][11],

      valeurSamedi: mesScores[5][11],
      samediIsOk: superieurASept[5][11],
      samediMaybe: entreQuatreEtSept[5][11],

      valeurDimanche: mesScores[6][11],
      dimancheIsOk: superieurASept[6][11],
      dimancheMaybe: entreQuatreEtSept[6][11],
    },
    {
      heure: mesHeures[12], 
      id_heure: 12,
      valeurLundi: mesScores[0][12],
      lundiIsOk: superieurASept[0][12],
      lundiMaybe: entreQuatreEtSept[0][12],

      valeurMardi: mesScores[1][12],
      mardiIsOk: superieurASept[1][12],
      mardiMaybe: entreQuatreEtSept[1][12],

      valeurMercredi: mesScores[2][12],
      mercrediIsOk: superieurASept[2][12],
      mercrediMaybe: entreQuatreEtSept[2][12],

      valeurJeudi: mesScores[3][12],
      jeudiIsOk: superieurASept[3][12],
      jeudiMaybe: entreQuatreEtSept[3][12],

      valeurVendredi: mesScores[4][12],
      vendrediIsOk: superieurASept[4][12],
      vendrediMaybe: entreQuatreEtSept[4][12],

      valeurSamedi: mesScores[5][12],
      samediIsOk: superieurASept[5][12],
      samediMaybe: entreQuatreEtSept[5][12],

      valeurDimanche: mesScores[6][12],
      dimancheIsOk: superieurASept[6][12],
      dimancheMaybe: entreQuatreEtSept[6][12],
    },
    {
      heure: mesHeures[13], 
      id_heure: 13,
      valeurLundi: mesScores[0][13],
      lundiIsOk: superieurASept[0][13],
      lundiMaybe: entreQuatreEtSept[0][13],

      valeurMardi: mesScores[1][13],
      mardiIsOk: superieurASept[1][13],
      mardiMaybe: entreQuatreEtSept[1][13],

      valeurMercredi: mesScores[2][13],
      mercrediIsOk: superieurASept[2][13],
      mercrediMaybe: entreQuatreEtSept[2][13],

      valeurJeudi: mesScores[3][13],
      jeudiIsOk: superieurASept[3][13],
      jeudiMaybe: entreQuatreEtSept[3][13],

      valeurVendredi: mesScores[4][13],
      vendrediIsOk: superieurASept[4][13],
      vendrediMaybe: entreQuatreEtSept[4][13],

      valeurSamedi: mesScores[5][13],
      samediIsOk: superieurASept[5][13],
      samediMaybe: entreQuatreEtSept[5][13],

      valeurDimanche: mesScores[6][13],
      dimancheIsOk: superieurASept[6][13],
      dimancheMaybe: entreQuatreEtSept[6][13],
    },
    {
      heure: mesHeures[14], 
      id_heure: 14,
      valeurLundi: mesScores[0][14],
      lundiIsOk: superieurASept[0][14],
      lundiMaybe: entreQuatreEtSept[0][14],

      valeurMardi: mesScores[1][14],
      mardiIsOk: superieurASept[1][14],
      mardiMaybe: entreQuatreEtSept[1][14],

      valeurMercredi: mesScores[2][14],
      mercrediIsOk: superieurASept[2][14],
      mercrediMaybe: entreQuatreEtSept[2][14],

      valeurJeudi: mesScores[3][14],
      jeudiIsOk: superieurASept[3][14],
      jeudiMaybe: entreQuatreEtSept[3][14],

      valeurVendredi: mesScores[4][14],
      vendrediIsOk: superieurASept[4][14],
      vendrediMaybe: entreQuatreEtSept[4][14],

      valeurSamedi: mesScores[5][14],
      samediIsOk: superieurASept[5][14],
      samediMaybe: entreQuatreEtSept[5][14],

      valeurDimanche: mesScores[6][14],
      dimancheIsOk: superieurASept[6][14],
      dimancheMaybe: entreQuatreEtSept[6][14],
    },
  ]
  }
});

//Code pour les boutons permettant de changer la couleur et l'état des cellules
var valeur;

Template.tableauSemaines.events({
	'click #red': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(9, 88%, 55%, 1)"});
		$("#yellow").css({"background-color":"rgb(0,132,255)"});
		$("#green").css({"background-color":"rgb(0,132,255)"});
		valeur = 0;
	},
	'click #yellow': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(49, 88%, 55%, 1)"});
		$("#red").css({"background-color":"rgb(0,132,255)"});
		$("#green").css({"background-color":"rgb(0,132,255)"});
		valeur = 4;
	},
	'click #green': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(109, 88%, 55%, 1)"});
		$("#yellow").css({"background-color":"rgb(0,132,255)"});
		$("#red").css({"background-color":"rgb(0,132,255)"});
		valeur = 10;
	}
});


Template.newTd.events({
	//quand on clique sur les cellules ayant la class "semaine", on change leur couleur et leur valeur
	'click .semaine': function(event){
		event.preventDefault();
		if(valeur==0){
			$(event.target).css({"background-color":"hsl(9, 88%, 55%, 1)"});
			$(event.target).val(valeur);
		} else if(valeur==4){
			$(event.target).css({"background-color":"hsl(49, 88%, 55%, 1)"});
			$(event.target).val(valeur);
		} else if(valeur==10){
			$(event.target).css({"background-color":"hsl(109, 88%, 55%, 1)"});
			$(event.target).val(valeur);
		}
	},
	//quand on clique sur les cellules ayant la class "heureSemaine", on change la couleur et la valeur d'une ligne
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
	//quand on clique sur les cellules ayant la class "joursSemaines", on change la couleur et la valeur d'une colonne
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
	//possibilité de dire si oui ou non un utilisateur a son horaire en privé
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



