//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Groups = new Mongo.Collection('groups');

//méthodes

Meteor.methods({
    'groups.create'(idUt, nom){
        check(idUt, String);
        check (nom, String);
        Groups.insert({
            admin: idUt,
            isCreated: true,
            name: nom,
            users: [
                idUt
            ]
        });
    },
    'groups.updateGroup'(idUt, idGrp){
        check(idUt, String);
        check(idGrp, String);
        let monGroupe = Groups.findOne({_id: idGrp});
        console.log(monGroupe.users);
        monGroupe.users.push(idUt);
        Groups.update(
            { _id: idGrp },
            { $set : { users: monGroupe.users } },
        );
      }
})