//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
import { Notifs } from '../api/notifications.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Groups } from '../api/groups.js';


//importation des fichiers
import './login.html';
import '../templates/login.html';
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';
import '../templates/header.html';
import '../templates/semaineComparee.html';
import '../templates/recherche.html';
import '../templates/addGroup.html';
import '../templates/groupe.html';
import '../templates/semaineGroupe.html';
import '../templates/newTrGrp.html';
import '../templates/newTdGrp.html';

//constantes pour les heures et les jours
const mesHeures = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
];
const mesJours = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche"
];

//Helpers pour les tableaux
Template.semaineDeGroupe.helpers({
    jour: [
        {
            nomJour: mesJours[0]
        },
        {
            nomJour: mesJours[1]
        },
        {
            nomJour: mesJours[2]
        },
        {
            nomJour: mesJours[3]
        },
        {
            nomJour: mesJours[4]
        },
        {
            nomJour: mesJours[5]
        },
        {
            nomJour: mesJours[6]
        },
    ],
});

Template.addGroup.events({
    //créer un groupe
    'submit .creationGrp': function(event, template){
        event.preventDefault();

        //récupérer le nom entré par l'utilisateur
        let leGroupe = document.getElementById("nomGroupe").value;

        //s'il a entré quelque chose
        if(leGroupe){
            //appeler la méthode groups.create et récupérer le callback, qui est l'id du groupe fraîchement créé
            let leGroupeId;
            Meteor.call('groups.create', Meteor.userId(), leGroupe, function(err, result){
                leGroupeId = result
            });

            //fonction à timeout pour aller à la route du groupe avec l'id récupéré
            setTimeout(function(){
                FlowRouter.go('groupe', { _id: leGroupeId });
            }, 250);
        }

        //s'il n'a rien entrer, le lui faire savoir
        else {
            alert("Veuillez entrer un nom de groupe!");
        }
    },
});

Template.addGroup.helpers({
    //savoir quels sont les groupes pour lesquels on est membre
    mesGroupesMembre: function(){
        let myGroups = Groups.find({users: Meteor.userId()})
        return myGroups;
    }
});

//quand le template groupe est créé, on crée une variable réactive
Template.groupe.onCreated(function(){
  this.isAdmin = new ReactiveVar(false);
});

Template.groupe.helpers({
    //Savoir qui est admin et récupérer son nom d'utilisateur
    monAdmin: function(){
        let groupeId = FlowRouter.getParam('_id');
        let requete = Groups.findOne({_id:groupeId});
        let idAdmin = requete.admin;
        let leAdmin = Meteor.users.findOne({_id: idAdmin});
        let myAdmin = leAdmin.username;
        return myAdmin;
    },

    //Savoir qui est membre et récupérer leurs noms d'utilisateurs
    mesMembres: function(){
        let groupeId = FlowRouter.getParam('_id');
        let requete = Groups.findOne({_id: groupeId});
        let myMembre = [];
        for(let i = 1; i<requete.users.length;i++){
            let membre = requete.users[i];
            let leMembre = Meteor.users.findOne({_id: membre});
            myMembre[(i-1)] = {
                monMembre: leMembre.username,
                membreId: requete.users[i]
            };
        }
        return myMembre;
    },

    //créer une mailing list pour un mailto
    mailingList: function(){
        let groupeId = FlowRouter.getParam('_id');
        let requete = Groups.findOne({_id: groupeId});
        let myMembre = [];
        let listeMembre=[];
        for(let i = 1; i<requete.users.length;i++){
            let membre = requete.users[i];
            let leMembre = Meteor.users.findOne({_id: membre});
            myMembre[(i-1)] = {
                monMembre: leMembre.emails[0].address,
                membreId: requete.users[i]
            }
            listeMembre.push(myMembre[(i-1)].monMembre);
        }
        let mailList=listeMembre.toString();
        return mailList;
    },

    //afficher le nom du groupe
    nomGroupe: function(){
        let groupeId = FlowRouter.getParam('_id');
        let requete = Groups.findOne({_id:groupeId});
        return(requete.name);
    },

    //savoir si l'utilisateur qui observe le groupe en est l'administrateur ou non
    estAdmin: function(){
        let groupeId = FlowRouter.getParam('_id');
        let requete = Groups.findOne({_id:groupeId});
        if(Meteor.userId() == requete.admin){
            Template.instance().isAdmin = new ReactiveVar(true);
        }
        else {
            Template.instance().isAdmin = new ReactiveVar(false);
        }
        return Template.instance().isAdmin.get();
    }
});

Template.groupe.events({
    //quand on remplit le formulaire pour ajouter un utilisateur
    'submit #ajoutDUtilisateur': function(event){
        event.preventDefault();

        //récupérer les infos utiles : id du groupe, nom du groupe, nom de l'utilisateur...
        let groupeId= FlowRouter.getParam('_id');
        let groupName = Groups.findOne({_id:groupeId}).name;
        let nomUt = document.getElementById("addUser").value;
        let currentAdminEmail = Meteor.users.findOne({_id:Meteor.userId()}).emails.address;

        //si on a une entrée dans l'input
        if (nomUt){

            //vérifier si on a affaire à une adresse mail ou un pseudo à l'aide d'une RegEx, puis chercher la semaine de l'utilisateur
            let searchRes;
            let searchResId;
            let re = /\S+@\S+\.\S+/;
            if(nomUt.match(re)){
                searchRes = Meteor.users.findOne({"emails.address": nomUt});
            }
            else if(!nomUt.match(re)){
                searchRes = Meteor.users.findOne({username: nomUt});
            }
            if(searchRes){
                searchResId = searchRes._id;
            }
            let searchSemaine = Semaines.findOne({"id_utilisateur":searchResId});

            //si ce n'est pas le cas, alerter l'utilisateur.
            if (!searchResId){
                alert("Cet utilisateur n'existe pas!");
                addUser.value="";
            }

            //si l'utilisateur essaie de s'ajouter lui-même au groupe...
            else if (searchResId == Meteor.userId()){
                alert("C'est vous!");
                addUser.value="";
            }
            
            //si aucune des conditions précédentes sont remplies, procéder avec l'ajout au groupe.
            else if (searchSemaine){
                let groupeId = FlowRouter.getParam('_id');

                //réupérer le username de l'admin
                let admin= Groups.findOne({_id: groupeId},{admin:Meteor.userId()}).admin;
                let adminEmail = Meteor.users.findOne({'_id':admin}).username;

                //tester si l'utilisateur est déjà dans le groupe.
                let groupTest = Groups.findOne({users : searchResId, _id : groupeId});

                //si ce n'est pas le cas, procéder
                if (!groupTest){
                    Meteor.call("groups.updateGroup", searchResId, groupeId);

                    // notifier la personne en question.
                    Meteor.call("notifs.pushGroupAdd",searchResId, groupName,adminEmail);

                    //notifier tous les membres du groupe, à l'exception de l'admin
                    let thisGroupMembres = Groups.findOne({_id: groupeId}).users
                    for (i=1; i<thisGroupMembres.length-1; i++){
                        Meteor.call('notifs.pushNewGroupMember',thisGroupMembres[i],groupName,addUser.value)
                    }
                    FlowRouter.go('groupe', { _id: groupeId });
                    alert(`${addUser.value} a été ajouté!`);
                    addUser.value="";
                }

                //si l'utilisateur est déjà dans le groupe, le dire à l'admin
                else if (groupTest){
                    alert("Cet utilisateur est déjà dans ce groupe!");
                    addUser.value="";
                }
            }
        }
    },

    //quand on clique sur le petit crayon, on a un prompt pour changer le nom du groupe
    'click #groupNameButton': function (event){
        event.preventDefault();
        let groupeId = FlowRouter.getParam('_id');
        let groupe = Groups.findOne({_id: groupeId});
        let newname = window.prompt("Entrez un nouvean nom");
        if(newname != null){
            Meteor.call('groups.changeName', groupeId, newname);
        }
    },

    //quand on clique sur le bouton pour quitter le groupe
    'click #groupLeaveButton': function (event){
        event.preventDefault();
        let groupeId = FlowRouter.getParam('_id');
        let groupe = Groups.findOne({_id: groupeId});
        let idUt = Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address;

        //si l'utilisateur confirme, notifier les membres du groupe qu'il l'a quitté, puis le faire quitter le groupe et revenir à son profile, sinon revenir au groupe
        let r=confirm("Voulez-vous vraiment quitter ce groupe?");
        if (r==true){
            Meteor.call("notifs.groupMemberLeave",groupe.admin, groupe.name, idUt);
            Meteor.call('groups.leaveGroup', groupeId, Meteor.userId());
            FlowRouter.go('/')
        }
        else{
            FlowRouter.go('groupe', { _id: groupeId });
        }
    },

    //quand on clique sur le bouton pour effacer le groupe
    'click #groupDeleteButton': function (event){
        event.preventDefault();
        let groupeId = FlowRouter.getParam('_id');
        let groupe = Groups.findOne({_id: groupeId});

        //si l'utilisateur confirme, on supprime le document de la collection, on revient au profile et on notifie les utilisateurs de la disparition du groupe
        let s = confirm("Ce groupe sera supprimé. Procéder?");
        if (s == true){
            Groups.remove({_id: groupeId});
            FlowRouter.go('/');
            let users = groupe.users;
            for (i=0;i<users.length;i++){
                Meteor.call('notifs.kickedGroup',users[i],groupe.name);
            }    
        }
    },

    //quand l'administrateur retire un utilisateur
    'click .banUser': function (event){
        event.preventDefault();
        let groupeId = FlowRouter.getParam('_id');
        let idUt = event.currentTarget.id;
        let nomGr = Groups.findOne({_id:groupeId}).name;

        //s'il confirme, supprimer l'utilisateur du group et le notifier
        let s = confirm("Cet utilisateur sera supprimé du groupe. Procéder?");
            if (s == true){
                Meteor.call('groups.leaveGroup', groupeId, idUt);
                Meteor.call('notifs.kickedGroup',idUt,nomGr);
        }
    }
});

Template.newTdGrp.helpers({
  //fonction qui observe les changement dans le document des utilisateurs
  periode:function(){
    //récupération des informations du groupe et des utilisateurs
    let groupeId = FlowRouter.getParam('_id');
    let monGroupe = Groups.findOne({_id: groupeId});
    let mbrGroupe = monGroupe.users;
    let mesScores = [];

    //compiler les horaires et diviser les scores par le nombre de membres
    for(let i =0;i<mbrGroupe.length;i++){
        mesScores[i] = scoresUtilisateurCourant(mbrGroupe[i]);
    }
    const resultat = [];
    for(let i=0;i<mesJours.length;i++){
        let placeHolder = [];
        for(let j=0;j<mesHeures.length;j++){
            let calcul = 0;
            for(let k=0;k<mbrGroupe.length; k++){
                calcul = calcul + mesScores[k][i][j];
            }
            calcul = Math.round(calcul/mbrGroupe.length);
            placeHolder.push(calcul);
        }
        resultat.push(placeHolder);
    }
    mesScores = resultat;

    //on teste si le nombre est supérieur ou égal à 7
    let superieurASept = [];
    for(let i=0;i<mesScores.length;i++){
      let isSuperieur;
      let tableauIntermediaire = [];
      for(let j=0;j<mesScores[i].length;j++){
        if(mesScores[i][j]>=0 && mesScores[i][j]<7){
          isSuperieur = false;
        }
        else if(mesScores[i][j]>=7 && mesScores[i][j]<=10){
          isSuperieur = true;
        }
        tableauIntermediaire.push(isSuperieur);
      }
      superieurASept.push(tableauIntermediaire);
    }

    //on teste si le nombre est compris entre 4 et 7
    let entreQuatreEtSept = [];
    for(let i=0;i<mesScores.length;i++){
      let isSuperieur;
      let tableauIntermediaire = [];
      for(let j=0;j<mesScores[i].length;j++){
        if(mesScores[i][j]>=4 && mesScores[i][j]<7){
          isSuperieur = true;
        }
        else{
          isSuperieur = false;
        }
        tableauIntermediaire.push(isSuperieur);
      }
      entreQuatreEtSept.push(tableauIntermediaire);
    }

    //on crée dynamiquement le code pour le helper, pour éviter une trop forte redondance
    let semaineComparaison = [];
    for(let i=0;i<15;i++){
      let aAjouter = {
          heure: mesHeures[i], 
          id_heure: i, 
          valeurLundi: mesScores[0][i],
          lundiIsOk: superieurASept[0][i],
          lundiMaybe: entreQuatreEtSept[0][i],

          valeurMardi: mesScores[1][i],
          mardiIsOk: superieurASept[1][i],
          mardiMaybe: entreQuatreEtSept[1][i],

          valeurMercredi: mesScores[2][i],
          mercrediIsOk: superieurASept[2][i],
          mercrediMaybe: entreQuatreEtSept[2][i],

          valeurJeudi: mesScores[3][i],
          jeudiIsOk: superieurASept[3][i],
          jeudiMaybe: entreQuatreEtSept[3][i],

          valeurVendredi: mesScores[4][i],
          vendrediIsOk: superieurASept[4][i],
          vendrediMaybe: entreQuatreEtSept[4][i],

          valeurSamedi: mesScores[5][i],
          samediIsOk: superieurASept[5][i],
          samediMaybe: entreQuatreEtSept[5][i],

          valeurDimanche: mesScores[6][i],
          dimancheIsOk: superieurASept[6][i],
          dimancheMaybe: entreQuatreEtSept[6][i],
        };
        semaineComparaison.push(aAjouter);
    }

    //return le résultat
    return semaineComparaison;
  }
});

//fonction pour obtenir les tableaux des utilisateurs
function scoresUtilisateurCourant(idUt){
  //tableau vide pour accueillir les scores
  const mesScores = [];
  
  //boucle qui va chercher les scores de chaque jour et les stocke dans un array à deux dimensions
  for(let i=0;i<7;i++){
    const doc = Semaines.findOne({ id_utilisateur: idUt });
    const array = doc[mesJours[i]];
    mesScores.push(array);
  }
  return(mesScores);
}