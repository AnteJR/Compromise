import '../imports/ui/connexion.js';
//import '../imports/ui/editSemaine.js';
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
Meteor.subscribe('semaines');
Meteor.subscribe('users');