//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../imports/api/semaines.js';
import { Groups } from '../imports/api/groups.js'
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Notifs } from '../imports/api/notifications.js';

Meteor.startup(() => {
  Tracker.autorun(()=>{
		Meteor.publish('semaines', function () {
			return Semaines.find({},{
				'_id':1,
				'id_utilisateur':1,
				'lundi':1,
				'mardi':1,
				'mercredi':1,
				'jeudi':1,
				'vendredi':1,
				'samedi':1,
				'dimanche':1,
			});
		});
		Meteor.publish('users', function () {
				return Meteor.users.find({},{
					fields:{'emails':1,
					'_id':1,
					'username':1
				}
				});
			});
		Meteor.publish('groups',function(){
			return Groups.find();
		});
		Meteor.publish('notifs',function(){
			return Notifs.find();
		}
	)
	});
	Groups.allow({
		remove() {return true}
		});
});
