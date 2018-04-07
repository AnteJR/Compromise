//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';

//importation des fichiers
import './login.html';
import '../templates/login.html';

Template.login.events({
	'click #emptyTab': function(event){
      event.preventDefault();
      Meteor.call("semaines.createDefault", Meteor.userId());
      console.log(Semaines.find({}));
    }
});
//Meteor.call("createDefault", Meteor.userId());