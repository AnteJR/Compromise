//import de méthodes, de plugins et de fichier js
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Semaines } from '../imports/api/semaines.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Groups } from '../imports/api/groups.js';
import { Notifs } from '../imports/api/notifications.js'
import '../imports/ui/editGroup.js';
import '../imports/ui/connexion.js';
import '../imports/ui/editSemaine.js';
import '../imports/ui/editHeader.js';
import '../imports/ui/accounts.js';

//subscribe aux collections et settings de sAlert
Meteor.startup(()=>{
    configOverwrite={
        position: 'top-right', timeout: 'none', onRouteClose: false, stack: true, offset: '80px'
    };
    sAlert.config({
        effect: '',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0,
        beep: false,
        onClose: _.noop
    });
	Tracker.autorun(()=> {
        Meteor.subscribe('users', function () {
            return Meteor.users.find();
        })
        Meteor.subscribe('semaines', function (_id) {
        	return Semaines.find({});
        });
        Meteor.subscribe('groups',function(){
            return Groups.find({});
        });
        Meteor.subscribe('notifs',function(){
            return Notifs.find({
                fields:{
                    id_utilisateur: Meteor.userId()
                }
            });
        })
    });
});