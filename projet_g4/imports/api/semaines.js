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
  'semaines.updateTable'(idUt, day, hour, score){
  	check(idUt, String);
    check(day, String);
  	check(hour, Number);
  	check(score, Number);
    let req = "jours."+day+"["+hour+"]"
    console.log(req)
  	Semaines.update(
      { id_utilisateur: idUt },
      { $set : { jours: { [day]: { "$[index]": score } } } },
      { arrayFilters: [ { index: hour } ] },
    );
  }
});