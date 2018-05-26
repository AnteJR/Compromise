import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
import { Groups } from '../api/groups.js';
import { Accounts } from 'meteor/accounts-base'

import '../templates/register.html';
import '../templates/loginUser.html';
import '../templates/logout.html';
import '../templates/changePassword.html';
import '../templates/deleteAccount.html';

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
				Meteor.call("semaines.createDefault", Meteor.userId());
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

Template.changePW.events({
	'click .validationPW': function(event){
		event.preventDefault();
		let vieuxPW = document.getElementById('oldPW').value;
		let nouveauPW = document.getElementById('newPW').value;
		let monUser = Meteor.users.findOne({ _id: Meteor.userId() });
		Accounts.changePassword(vieuxPW, nouveauPW, function(err){
			if(err){
				alert(err.reason);
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

Template.delUserBtn.events({
	'click .deleteUser': function(event){
		event.preventDefault();
		let s = confirm("Votre compte et votre présence sur le site seront supprimés de manière permanente. Êtes-vous sûr de vouloir supprimer votre compte ?");
		if(s){
			alert("Vous allez nous manquer :(");
			let maSemaine = Semaines.findOne({ id_utilisateur : Meteor.userId() });
			let maSemaineId = maSemaine._id;
			Semaines.remove({ _id: maSemaineId });
			for(let i = 0; i<Groups.find({}).count(); i++){
				let groupesUtilisateurAdmin = Groups.findOne({ admin: Meteor.userId() });
				if(groupesUtilisateurAdmin){
					let monId = groupesUtilisateurAdmin._id
					Groups.remove({ _id: monId });
				}
			}
			for(let i = 0; i<Groups.find({}).count(); i++){
				let monGroupe = Groups.findOne({ users: Meteor.userId() });
				let monGroupeId = monGroupe._id;
				let monGroupeUsers = monGroupe.users;
				console.log(monGroupeId)
				for(let j=0; j<monGroupeUsers.length; j++){
					if(monGroupeUsers[j] == Meteor.userId()){
						Meteor.call('leaveGroup', monGroupeId, Meteor.userId());
					}
				}
			}
			Meteor.users.remove({ _id: Meteor.userId() });
		}
	}
});