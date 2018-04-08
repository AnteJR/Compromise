//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Lundi } from '../api/lundi.js';
import { Mardi } from '../api/mardi.js';
import { Mercredi } from '../api/mercredi.js';
import { Jeudi } from '../api/jeudi.js';
import { Vendredi } from '../api/vendredi.js';
import { Samedi } from '../api/samedi.js';
import { Dimanche } from '../api/dimanche.js';

//importation des fichiers
import './firstTableau.html';
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';

Template.tableauSemaines.helpers({
	jour: [
		{nomJour: "lundi"},
		{nomJour: "mardi"},
		{nomJour: "mercredi"},
		{nomJour: "jeudi"},
		{nomJour: "vendredi"},
		{nomJour: "samedi"},
		{nomJour: "dimanche"},
	],
});

Template.newTd.helpers({
	jour: [
		{nomJour: "lundi"},
		{nomJour: "mardi"},
		{nomJour: "mercredi"},
		{nomJour: "jeudi"},
		{nomJour: "vendredi"},
		{nomJour: "samedi"},
		{nomJour: "dimanche"},
	],
	periode: [
		{heure: "8"},
		{heure: "9"},
		{heure: "10"},
		{heure: "11"},
		{heure: "12"},
		{heure: "13"},
		{heure: "14"},
		{heure: "15"},
		{heure: "16"},
		{heure: "17"},
		{heure: "18"},
		{heure: "19"},
		{heure: "20"},
		{heure: "21"},
		{heure: "22"},
	],
});

var val;

Template.tableauSemaines.events({
	'click #red': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"red"});
		$("#yellow").css({"background-color":"white"});
		$("#green").css({"background-color":"white"});
		val = 1;
	},
	'click #yellow': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"yellow"});
		$("#red").css({"background-color":"white"});
		$("#green").css({"background-color":"white"});
		val = 2;
	},
	'click #green': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"lightgreen"});
		$("#yellow").css({"background-color":"white"});
		$("#red").css({"background-color":"white"});
		val = 3;
	}
});

Template.newTd.events({
	'click .mesTd': function(event){
		event.preventDefault();
		console.log(event.target.id)
		console.log(val);
		var idJourHeure = event.target.id.split("_");
		Meteor.call("semaines.updateTable", Meteor.userId(), idJourHeure[0], idJourHeure[1], score);
		if(val==1){
		$(event.target).css({"background-color":"red"});
		
		} else if(val==2){
			$(event.target).css({"background-color":"yellow"});
		} else if(val==3){
			$(event.target).css({"background-color":"lightgreen"});
		}
	}
});









