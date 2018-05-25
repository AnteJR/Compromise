import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';

import '../templates/register.html';
import '../templates/loginUser.html';
import '../templates/logout.html';

Template.regUser.events({
	'click .validationReg': function(event){
		event.preventDefault();
		let nomDUt = document.getElementById('nameReg').value;
		let emailUt = document.getElementById('emailReg').value;
		let passwordUt = document.getElementById('passReg').value;
		Accounts.createUser({
			username: nomDUt,
			email: emailUt,
			password: passwordUt
		}, function(error){
			let re = /\S+@\S+\.\S+/;
			if(error || !emailUt.match(re) || !nomDUt){
				alert(error.reason);
				if(!emailUt.match(re)){
					alert("Veuillez entrer une adresse email correcte !");
				}
				else if(!nomDUt){
					alert("Veuillez entrer un nom d'utilisateur !")
				}
			}
			else{
				FlowRouter.go('home');
				alert("Vous avez créé votre compte !");
			}
		});
	},
	'click .cancelLogin': function(event){
		event.preventDefault();
		FlowRouter.go('home');
	}
});

Template.logUser.events({
	'click .validationLog': function(event){
		event.preventDefault();
		let nomDUt = document.getElementById('nameLog').value;
		let passwordUt = document.getElementById('passLog').value;
		Meteor.loginWithPassword(nomDUt, passwordUt, function(error){
			if(error){
				alert(error.reason);
			}
			else{
				FlowRouter.go('home');
			}
		});
	},
	'click .cancelLogin': function(event){
		event.preventDefault();
		FlowRouter.go('home');
	}
});

Template.logOutLink.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
	}
});