//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';

//importation des fichiers
import './login.html';
import '../templates/login.html';

//quand un utilisateur se connecte...
Accounts.onLogin(function(user){
	//...si il n'a pas de document avec son id dans la collection Semaines..
	if(Semaines.find({id_utilisateur: Meteor.userId()}).count() == 0){
		//...on lui assigne un document semaine par défaut (valeurs de 0 pour chaque cellules)
		Meteor.call("semaines.createDefault", Meteor.userId());
	}
});

Template.login.events({
	//quand on clique sur le bouton ayant pour class "semaine" (fonctionnera avec un tableau dont les td ont cette class)
	'click .semaine': function(event){
		//on empêche le comportement par défaut
		event.preventDefault();
		//on récupère la value (le score) de l'élément sur lequel au clique
		const elemVal = parseInt(event.currentTarget.value);
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
		Meteor.call("semaines.updateTable", Meteor.userId(), jour, heure, elemVal);
	},
	//quand on clique sur le bouton ayant pour class "testRecuperation" (fonctionnera au moment où l'utilisateur se connecte)
	'click .testonsLaRecuperation': function(event){
		event.preventDefault();
		//tableau contenant les jours
		const mesJours = [
      		"lundi",
      		"mardi",
     		"mercredi",
      		"jeudi",
      		"vendredi",
      		"samedi",
      		"dimanche"
    	];
    	//tableau vie pour accueillir les scores
    	const mesScores = [];
    	//boucle qui va chercher les scres de chaque jour et les stocke dans un array à deux dimensions
    	for(let i=0;i<7;i++){
      		const doc = Semaines.findOne({ id_utilisateur: Meteor.userId() });
      		const array = doc[mesJours[i]];
      		mesScores.push(array);
    	}
    	//console.log pour tester
    	console.log(mesScores)
	}
});