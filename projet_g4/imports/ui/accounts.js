import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
import { Groups } from '../api/groups.js';
import { Notifs } from '../api/notifications.js';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert2';

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
				swal(error.reason);
				if(!emailUt.match(re)){
					swal("Veuillez entrer une adresse email correcte !");
				}
				else if(!nomDUt){
					swal("Veuillez entrer un nom d'utilisateur !")
				}
			}

			//s'il n'y a pas de problème, diriger l'utilisateur vers son profil, lui dire que ça a fonctionné et appeler des méthodes pour lui attribuer une semaine et des notifications
			else{
				FlowRouter.go('profile');
				swal("Vous avez créé votre compte !");
				Meteor.call("semaines.createDefault", Meteor.userId());
				Meteor.call('notifs.createDefault',Meteor.userId());
			}
		});
	},
	'click #cancelLogin': function(event){
		event.preventDefault();
		FlowRouter.go('homePage');
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
				swal(error.reason);
			}
			else{
				FlowRouter.go('profile');
			}
		});
	},
	'click #cancelLogin': function(event){
		event.preventDefault();
		FlowRouter.go('homePage');
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
				swal(err.reason);
			}
			else{
				FlowRouter.go('profile');
			}
		});
	},
	'click #cancelLogin': function(event){
		event.preventDefault();
		FlowRouter.go('homePage');
	}
});

Template.delUserBtn.events({
	'click #deleteUser': function(event){
		event.preventDefault();

		swal({
            title: 'Voulez-vous vraiment supprimer votre compte ?',
            text: 'Cette action est irréversible.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3ea1e6',
            cancelButtonColor: 'hsla(9, 88%, 55%, 1)',
            confirmButtonText: 'Confirmer',
            cancelButtonText: 'Annuler',
          }).then((result) => {
            if (result.value) {
            	swal(
                	'Vous allez nous manquer :(',
                	'Votre compte a été supprimé avec succès.',
                	'warning'
              	)
              	//supprimer sa semaine
				let maSemaine = Semaines.findOne({ id_utilisateur : Meteor.userId() });
				let maSemaineId = maSemaine._id;
				Semaines.remove({ _id: maSemaineId });

				//supprimer son document dans Notifs
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
              		FlowRouter.go('homePage')
            }
            else{
            	swal(
                	'Ouf !',
                	'Vous nous avez fait peur !',
                	'warning'
              	)
            }
        });
	}
});