//importation des méthodes
import { Template } from 'meteor/templating';

//importation des fichiers
import './body.html';
import './templates/template1.html';
import { Semaines } from '../api/db_methods.js';

//on dit bonjour
Template.bonjour1.helpers({
	texte: function(){
		monTxt = "Salut";
		return monTxt;
	}
});