//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../imports/api/semaines.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import '../imports/api/semaines.js';

Meteor.startup(() => {
  Tracker.autorun(()=>{
		Meteor.publish('semaines', function () {
			return Semaines.find({
				'isPrivate':false
			});
		});
		Meteor.publish('users', function () {
				return Meteor.users.find({},{
					fields:{'emails':1,
					'_id':1,
				}
				});
			});
	});
});
