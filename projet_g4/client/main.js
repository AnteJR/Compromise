//import '../imports/ui/editSemaine.js';
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Semaines } from '../imports/api/semaines.js';
//import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import '../imports/ui/connexion.js';

Meteor.startup(()=>{
	Tracker.autorun(()=> {
        Meteor.subscribe('users', function () {
            return Meteor.users.find();
        })
        Meteor.subscribe('semaines', function (_id) {
            return Semaines.find({isPrivate:false});
                });
            });
       });

 