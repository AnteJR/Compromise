//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//Création de constantes qui serviront à référencer les BD dans le code
export const Semaines = new Mongo.Collection('semaines');

//méthodes
Meteor.methods({
  //méthode 1 : attribution d'un document aux valeurs par défaut dans la collection Semaines
  'semaines.createDefault'(idUt){
    check(idUt, String);
    //le document en question, qui ne nécessite que l'id de l'utilisateur comme info supplémentaire unique
    Semaines.insert({
        id_utilisateur: idUt,
        isCreated: true,
        lundi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        mardi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        mercredi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        jeudi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        vendredi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        samedi: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        dimanche: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    });
  },
  //méthode 2 : mettre à jour le document quand on clique sur un des td du tableau
  'semaines.updateTable'(idUt, day, hour, score){
    //check des différentes valeurs envoyées
  	check(idUt, String);
    check(day, String);
  	check(hour, Number);
  	check(score, Number);
    //création dynamique d'une query pour remplacer le score au bon jour et à la bonne heure
    const doc = Semaines.findOne({ id_utilisateur: idUt });
    const array = doc[day];
    array[hour] = score;
    //update pour modifier, avec dans le $set la query crée dynamiquement
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
  },
  'semaines.dayFill'(idUt, day, score){
    check(idUt, String);
    check(day, String);
    check(score, Number);
    const doc = Semaines.findOne({ id_utilisateur: idUt });
    let array = doc[day];
    array = [score, score, score, score, score, score, score, score, score, score, score, score, score, score, score];
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
  }
});