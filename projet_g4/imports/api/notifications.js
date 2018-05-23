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
            error:[],
            info:[],
            success:[],
            warning:[],
     
        })
    },
    'notifs.pushGroupAdd'(idUt,nomGr,admin){
        check (idUt,String);
        check (nomGr, String);
        check (admin, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{info:`L'utilisateur ${admin} vous a ajouté au groupe ${nomGr}!`}}
        )

    },
    'notifs.pushNewGroupMember'(idUt,nomGr,newUt){
        check (idUt,String);
        check (nomGr, String);
        check (newUt, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{success:`L'utilisateur ${newUt} a été ajouté au groupe ${nomGr}!`}}
        )
    },
    'notifs.groupMemberLeave'(idUt,nomGr,newUt){
        check (idUt,String);
        check (nomGr, String);
        check (newUt, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{error:`L'utilisateur ${newUt} a quitté ${nomGr}!`}}
        )
    },
    'notifs.kickedGroup'(idUt,nomGr){
        check (idUt,String);
        check (nomGr, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{warning:`Vous ne faites plus partie de ${nomGr}.`}}
        )
    },
    'notifs.removeInfo'(idUt,val){
        check (idUt, String);
        check (val, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$pull:{info:val}}
        )
    },
    'notifs.removeSuccess'(idUt,val){
        check (idUt, String);
        check (val, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$pull:{success:val}}
        )
        },
    'notifs.removeError'(idUt,val){
        check (idUt, String);
        check (val, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$pull:{error:val}}
        )
    },
    'notifs.removeWarning'(idUt,val){
        check (idUt, String);
        check (val, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$pull:{warning:val}}
        )
    }
})