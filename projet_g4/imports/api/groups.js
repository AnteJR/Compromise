//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Semaines } from '../api/semaines.js';

export const Groups = new Mongo.Collection('groups');

//méthodes

Meteor.methods({
    'groups.create'(idUt){
    	check(idUt, String);
    	Groups.insert({
        	'admin':idUt,
        	'isCreated': true,
        	'name': 'Mon groupe',
    	});
    },
    'groups.insertUser'(numeroUt, idUt){
    	check(idUt, String);
    	check(numeroUt, Number);
    	Groups.insert({
    		'membre'+numeroUt: idUt;
    	});
    }
})