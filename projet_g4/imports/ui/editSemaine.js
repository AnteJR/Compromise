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

Template.newTd.events({
	'click .mesTd': function(event){
		console.log("s")
		
    }
});







