//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaine } from '../api/semaine.js';

//importation des fichiers
import './body.html';
import '../templates/template1.html';

Template.loginButtons.events({
	'click #login-buttons-password': function(elem, template){
		elem.preventDefault();
		Semaine.insert({
			id_user: Meteor.userId(),
		});
	}
});