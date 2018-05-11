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
            users: idUt,
        });
    }
})