import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Semaines } from '../imports/api/semaines.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Groups } from '../imports/api/groups.js';
import '../imports/ui/editGroup.js';
import '../imports/ui/connexion.js';
import '../imports/ui/editSemaine.js';

Meteor.startup(()=>{
	Tracker.autorun(()=> {
        Meteor.subscribe('users', function () {
            return Meteor.users.find({});
        })
        Meteor.subscribe('semaines', function () {
        	return Semaines.find({});
        });
        Meteor.subscribe('groups',function(){
            return Groups.find({});
        });
    });
});