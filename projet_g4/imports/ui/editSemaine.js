//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';

//importation des fichiers
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';
import '../templates/semaineDays.html';



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

Template.newTr.helpers({
	jour: [
		{nbreJour:1},
		{nbreJour:2},
		{nbreJour:3},
		{nbreJour:4},
		{nbreJour:5},
		{nbreJour:6},
		{nbreJour:7},
		{nbreJour:8},
	],
});

Template.newTd.helpers({
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







