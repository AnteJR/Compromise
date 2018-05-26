//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';

export const Groups = new Mongo.Collection('groups');

//méthodes

Meteor.methods({
    'groups.create'(idUt, nom){
        check(idUt, String);
        check (nom, String);
        let e = Groups.insert({
            admin: idUt,
            isCreated: true,
            name: nom,
            users: [
                idUt
            ]
        });
        return e;
    },
    'groups.updateGroup'(idUt, idGrp){
        check(idUt, String);
        check(idGrp, String);
        Groups.update(
            {_id: idGrp},
            { $push : { users : idUt } }
        );
      },
    'groups.changeName'(idGrp,newName){
        check (idGrp, String);
        check (newName, String);
        let monGroupe = Groups.findOne({_id: idGrp});
        Groups.update(
            {_id: idGrp},
            { $set: {name: newName} },
        )
    },
    'groups.leaveGroup'(idGrp,idUt){
        check (idGrp, String);
        check (idUt, String);
        Groups.update(
            {_id: idGrp},
            {$pull: {users:idUt}}
        )
    },
})