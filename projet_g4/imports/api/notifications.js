//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//export constante

export const Notifs = new Mongo.Collection('notifs');

Meteor.methods({
    'notifs.createDefault'(idUt){
        check(idUt, String);
        Notifs.insert({
            id_utilisateur: idUt,
            isCreated: true,
            messages: [],
        })
    },
    'notifs.pushGroupAdd'(idUt,nomGr,admin){
        console.log(idUt,nomGr,admin);
        //check (idUt,nomGr,admin,String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{messages:`L'utilisateur ${admin} vous a ajouté au groupe ${nomGr}!`}}
        )

    },
    'notifs.pushNewGroupMember'(idUt,nomGr,newUt){
        check (idUt,nomGr,newUt,String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{messages:`L'utilisateur ${newUt} a été ajouté au groupe ${nomGr}!`}}
        )
    }
})