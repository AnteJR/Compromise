//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Groups } from '../api/groups.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

//importation des fichiers
import './login.html';
import '../templates/login.html';
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';
import '../templates/header.html';
import '../templates/semaineComparee.html';
import '../templates/recherche.html';
import '../templates/addGroup.html';

Template.addGroup.events({
'click #myGroupButton': function(event){
    event.preventDefault();

    let monBtnGroupe = document.createElement("input");
    monBtnGroupe.setAttribute("type","button");
    monBtnGroupe.setAttribute("id","monBtnGroupe")
	document.body.appendChild(monBtnGroupe);
    Meteor.call('groups.create', Meteor.userId());
    

    FlowRouter.go('/groupe');
}
})