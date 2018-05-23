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
        isPrivate: false,
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
  //méthode 3 : mettre à jour une colonne entière
  'semaines.dayFill'(idUt, day, score){
    check(idUt, String);
    check(day, String);
    check(score, Number);
    //création dynamique d'une query et update
    const doc = Semaines.findOne({ id_utilisateur: idUt });
    let array = doc[day];
    array = [score, score, score, score, score, score, score, score, score, score, score, score, score, score, score];
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
  },
  //méthode 4 : mettre à jour une ligne
  'semaines.hourFill'(idUt, hour, score){
    check(idUt, String);
    check(hour, Number);
    check(score, Number);
    const doc = Semaines.findOne({ id_utilisateur: idUt });
    //créations de multiples updates mettant à jour les bonnes cellules
    let day = "lundi";
    let array = doc[day];
    array[hour] = score;
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
    day = "mardi";
    array = doc[day];
    array[hour] = score;
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
    day = "mercredi";
    array = doc[day];
    array[hour] = score;
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
    day = "jeudi";
    array = doc[day];
    array[hour] = score;
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
    day = "vendredi";
    array = doc[day];
    array[hour] = score;
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
    day = "samedi";
    array = doc[day];
    array[hour] = score;
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
    day = "dimanche";
    array = doc[day];
    array[hour] = score;
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { [day]: array } },
    );
  },
  //méthode 5 : mettre à jour l'information concernant la confidentialité du compte
  'semaines.updateTrue'(idUt){
  	check(idUt, String);
    const doc = Semaines.findOne({ id_utilisateur: idUt });
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { isPrivate : true } },
    );
  },
  //méthode 6 : mettre à jour l'information concernant la confidentialité du compte
  'semaines.updateFalse'(idUt){
  	check(idUt, String);
    const doc = Semaines.findOne({ id_utilisateur: idUt });
    Semaines.update(
        { id_utilisateur: idUt },
        { $set : { isPrivate : false } },
    );
  }
});