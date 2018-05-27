//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tracker } from 'meteor/tracker';

//Création de constantes qui serviront à référencer les BD dans le code
export const Groups = new Mongo.Collection('groups');

Meteor.methods({
    //méthode 1 : créer un groupe vide
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

    //méthode 2 : ajouter un utilisateur
    'groups.updateGroup'(idUt, idGrp){
        check(idUt, String);
        check(idGrp, String);
        Groups.update(
            {_id: idGrp},
            { $push : { users : idUt } }
        );
    },

    //méthode 3 : changer le nom du groupe
    'groups.changeName'(idGrp,newName){
        check (idGrp, String);
        check (newName, String);
        let monGroupe = Groups.findOne({_id: idGrp});
        Groups.update(
            {_id: idGrp},
            { $set: {name: newName} },
        )
    },

    //méthode 4 : quitter le groupe (pour 1 utilisateur non-admin)
    'groups.leaveGroup'(idGrp,idUt){
        check (idGrp, String);
        check (idUt, String);
        Groups.update(
            {_id: idGrp},
            {$pull: {users:idUt}}
        )
    },
})