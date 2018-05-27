//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//Création de constantes qui serviront à référencer les BD dans le code
export const Notifs = new Mongo.Collection('notifs');

Meteor.methods({
    //méthode 1 : création d'une notification vide
    'notifs.createDefault'(idUt){
        check(idUt, String);
        Notifs.insert({
            id_utilisateur: idUt,
            isCreated: true,
            error:[],
            info:[],
            success:[],
            warning:[]
        });
    },

    //méthode 2 : push d'une notification chez un utilisateur quand il est ajouté à un groupe
    'notifs.pushGroupAdd'(idUt,nomGr,admin){
        check (idUt,  String);
        check (nomGr, String);
        check (admin, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{info:`L'utilisateur ${admin} vous a ajouté au groupe ${nomGr}!`}
        });
    },

    //méthode 3 : push d'une notification aux membres d'un groupe quand un membre est ajouté
    'notifs.pushNewGroupMember'(idUt,nomGr,newUt){
        check (idUt,  String);
        check (nomGr, String);
        check (newUt, String);
        console.log("pushNGMok")
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{success:`L'utilisateur ${newUt} a été ajouté au groupe ${nomGr}!`}
        });
    },

    //méthode 4 : push d'une notification aux membres d'un groupe quand un membre le quitte
    'notifs.groupMemberLeave'(idUt,nomGr,newUt){
        check (idUt,  String);
        check (nomGr, String);
        check (newUt, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{error:`L'utilisateur ${newUt} a quitté ${nomGr}!`}
        });
    },

    //méthode 5 : push d'une notification à un utilisateur quand il a été retiré d'un groupe
    'notifs.kickedGroup'(idUt,nomGr){
        check (idUt,  String);
        check (nomGr, String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$push:{warning:`Vous ne faites plus partie de ${nomGr}.`}
        });
    },

    //méthode 6 : on retire les notifications de type Info
    'notifs.removeInfo'(idUt,val){
        check (idUt, String);
        check (val,  String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$pull:{info:val}
        });
    },

    //méthode 7 : on retire les notifications de type Success
    'notifs.removeSuccess'(idUt,val){
        check (idUt, String);
        check (val,  String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$pull:{success:val}
        });
    },

    //méthode 8 : on retire les notifications de type Error
    'notifs.removeError'(idUt,val){
        check (idUt, String);
        check (val,  String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$pull:{error:val}
        });
    },

    //méthode 9 : on retire les notifications de type Warning
    'notifs.removeWarning'(idUt,val){
        check (idUt, String);
        check (val,  String);
        Notifs.update(
            {id_utilisateur:idUt},
            {$pull:{warning:val}
        });
    }
})