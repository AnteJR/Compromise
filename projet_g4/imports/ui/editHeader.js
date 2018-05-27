//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveVar } from 'meteor/reactive-var';
import { Semaines } from '../api/semaines.js';
import { Notifs } from '../api/notifications.js';

//importation des fichiers
import '../templates/header.html';

//quand le header est créé, créer une variable réactive
Template.header.onCreated(function(){
	this.semainePrivee = new ReactiveVar(false);
});

Template.header.rendered = function(){
	//fonction constamment active qui vérifie les arrivées de notifications en temps réel, les affiche et les supprime de la collection
	Tracker.autorun(()=>{
		let thisDocument=Notifs.findOne({id_utilisateur: Meteor.userId()});
		let thisInfo=thisDocument.info;
			for (i=0 ; i<thisInfo.length ; i++){
				sAlert.info(thisInfo[i] , configOverwrite);
				Meteor.call('notifs.removeInfo',Meteor.userId(),thisInfo[i])
			}
		let thisSuccess=thisDocument.success;
			for (i=0 ; i<thisSuccess.length ; i++){
				sAlert.success(thisSuccess[i] , configOverwrite);
				Meteor.call('notifs.removeSuccess',Meteor.userId(),thisSuccess[i])
			}
		let thisError=thisDocument.error;
			for (i=0 ; i<thisError.length ; i++){
				sAlert.error(thisError[i] , configOverwrite);
				Meteor.call('notifs.removeError',Meteor.userId(),thisError[i])
			}
		let thisWarning=thisDocument.warning;
		for (i=0 ; i<thisWarning.length ; i++){
			sAlert.warning(thisWarning[i] , configOverwrite);
			Meteor.call('notifs.removeWarning',Meteor.userId(),thisWarning[i])
		}
	});
}

Template.header.events({
	//possibilité de dire si oui ou non un utilisateur a son horaire en privé
	'click #prive': function(event){
		event.preventDefault();
		const doc = Semaines.findOne({ id_utilisateur: Meteor.userId() });
		if(doc.isPrivate == true){
			Meteor.call("semaines.updateFalse", Meteor.userId());
		}
		else if(doc.isPrivate == false){
			Meteor.call("semaines.updateTrue", Meteor.userId());
		}
	}
});

Template.header.helpers({
	//on vérifie le changement de la valeur isPrivate dans le document de l'utilisateur dans la collection Semaines
	comptePrive: function(){
		let monUt = Semaines.findOne({ id_utilisateur: Meteor.userId() });
		if(monUt.isPrivate == true){
			Template.instance().semainePrivee.set(true);
		}
		else if(monUt.isPrivate == false){
			Template.instance().semainePrivee.set(false);
		}
		return Template.instance().semainePrivee.get();
	},

	//on récupère le nom de l'utilisateur
	nomUt: function(){
		let utilisateur = Meteor.users.findOne({ "_id": Meteor.userId() });
		let nomUtilisateur = utilisateur.username;
		return nomUtilisateur;
	}
});