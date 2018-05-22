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
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });
	Tracker.autorun(()=> {
        Meteor.subscribe('users', function () {
            return Meteor.users.find();
        })
        Meteor.subscribe('semaines', function () {
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