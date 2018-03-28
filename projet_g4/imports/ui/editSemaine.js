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

Template.newTr.helpers({
	periode: [
		{heure: "08:00"},
		{heure: "09:00"},
		{heure: "10:00"},
		{heure: "11:00"},
		{heure: "12:00"},
		{heure: "13:00"},
		{heure: "14:00"},
		{heure: "15:00"},
		{heure: "16:00"},
		{heure: "17:00"},
		{heure: "18:00"},
		{heure: "19:00"},
		{heure: "20:00"},
		{heure: "21:00"},
		{heure: "22:00"},
	],
});

Template.newTd.events({
	'click .mesTd': function(event){
		console.log("s")
		
    }
});







