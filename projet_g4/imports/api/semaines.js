//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//Création de constantes qui serviront à référencer les BD dans le code
export const Semaines = new Mongo.Collection('semaines');

Meteor.methods({
  'semaines.createDefault'(idUt){
    check(idUt, String);
    Semaines.insert({
        id_utilisateur: idUt,
        isCreated: true,
        jours: {
        	lundi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        	mardi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        	mercredi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        	jeudi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        	vendredi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        	samedi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        	dimanche: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        }
    });
  },
  'semaines.updateTable'(idSemaine, day, hour, score){
  	check(idSemaine, String);
    check(day, String);
  	check(hour, Number);
		check(score, Number);
  	if(day=="lundi"){Semaines.update(idSemaine,{$set : {"jours.lundi.4" : score}});}
  	else if(day=="mardi"){Semaines.update(idSemaine,{$set : {"jours.mardi.$[hour]" : score}});}
  	else if(day=="mercredi"){Semaines.update(idSemaine,{$set : {"jours.mercredi.$[hour]" : score}});}
  	else if(day=="jeudi"){Semaines.update(idSemaine,{$set : {"jours.jeudi.$[hour]" : score}});}
  	else if(day=="vendredi"){Semaines.update(idSemaine,{$set : {"jours.vendredi.$[hour]" : score}});}
  	else if(day=="samedi"){Semaines.update(idSemaine,{$set : {"jours.samedi.$[hour]" : score}});}
  	else if(day=="dimanche"){Semaines.update(idSemaine,{$set : {"jours.dimanche.$[hour]" : score}});}
  }
});