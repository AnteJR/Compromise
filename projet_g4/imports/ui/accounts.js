import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
import { Groups } from '../api/groups.js';
import { Notifs } from '../api/notifications.js';
import { Accounts } from 'meteor/accounts-base'

import '../templates/register.html';
import '../templates/loginUser.html';
import '../templates/logout.html';
import '../templates/changePassword.html';
import '../templates/deleteAccount.html';

Template.regUser.events({
	'click #validationReg': function(event){
		event.preventDefault();

		//récupérer les valeurs des inputs
		let nomDUt = document.getElementById('nameReg').value;
		let emailUt = document.getElementById('emailReg').value;
		let passwordUt = document.getElementById('passReg').value;

		//créer l'utilisateur et callback s'il y a un problème.
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

			//s'il n'y a pas de problème, diriger l'utilisateur vers son profil, lui dire que ça a fonctionné et appeler des méthodes pour lui attribuer une semaine et des notifications
			else{
				FlowRouter.go('home');
				alert("Vous avez créé votre compte !");
				Meteor.call("semaines.createDefault", Meteor.userId());
				Meteor.call('notifs.createDefault',Meteor.userId());
			}
		});
	},
	'click #cancelLogin': function(event){
		event.preventDefault();
		FlowRouter.go('home');
	}
});

Template.logUser.events({
	//Se connecter
	'click #validationLog': function(event){
		event.preventDefault();

		//récupérer les valeurs des inputs
		let nomDUt = document.getElementById('nameLog').value;
		let passwordUt = document.getElementById('passLog').value;

		//login avec callback
		Meteor.loginWithPassword(nomDUt, passwordUt, function(error){
			if(error){
				alert(error.reason);
			}
			else{
				FlowRouter.go('home');
			}
		});
	},
	'click #cancelLogin': function(event){
		event.preventDefault();
		FlowRouter.go('home');
	}
});

Template.logOutLink.events({
	'click #logout': function(event){
		event.preventDefault();
		Meteor.logout();
	}
});

Template.changePW.events({
	'click #validationPW': function(event){
		event.preventDefault();

		//récupérer les valeurs des inputs
		let vieuxPW = document.getElementById('oldPW').value;
		let nouveauPW = document.getElementById('newPW').value;

		//changer le mot de passe avec les informations données
		Accounts.changePassword(vieuxPW, nouveauPW, function(err){
			if(err){
				alert(err.reason);
			}
			else{
				FlowRouter.go('home');
			}
		});
	},
	'click #cancelLogin': function(event){
		event.preventDefault();
		FlowRouter.go('home');
	}
});

Template.delUserBtn.events({
	'click #deleteUser': function(event){
		event.preventDefault();

		//prompt de confirmation
		let s = confirm("Votre compte et votre présence sur le site seront supprimés de manière permanente. Êtes-vous sûr de vouloir supprimer votre compte ?");

		//si l'utilisateur accepte :
		if(s){
			alert("Vous allez nous manquer :(");

			//supprimer sa semaine
			let maSemaine = Semaines.findOne({ id_utilisateur : Meteor.userId() });
			let maSemaineId = maSemaine._id;
			Semaines.remove({ _id: maSemaineId });

			let mesNotifs = Notifs.findOne({ id_utilisateur : Meteor.userId() });
			let mesNotifsId = mesNotifs._id;
			Notifs.remove({ _id: mesNotifsId });

			//supprimer les groupes dont il est admin
			for(let i = 0; i<Groups.find({}).count(); i++){
				let groupesUtilisateurAdmin = Groups.findOne({ admin: Meteor.userId() });
				if(groupesUtilisateurAdmin){
					let monId = groupesUtilisateurAdmin._id
					Groups.remove({ _id: monId });
				}
			}

			//supprimer sa présence des autres groupes
			for(let i = 0; i<Groups.find({}).count(); i++){
				let monGroupe = Groups.findOne({ users: Meteor.userId() });
				if(monGroupe){
					let monGroupeId = monGroupe._id;
					Meteor.call('groups.leaveGroup', monGroupeId, Meteor.userId());
				}
			}

			//supprimer son compte
			Meteor.users.remove({ _id: Meteor.userId() });
		}
	}
});