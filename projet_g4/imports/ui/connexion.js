//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Notifs } from '../api/notifications.js';
import swal from 'sweetalert2'

//importation des fichiers
import './login.html';
import '../templates/login.html';
import '../templates/semaine.html';
import '../templates/semaineComparee.html';
import '../templates/newTr.html';
import '../templates/newTd.html';
import '../templates/newTdComparaisons.html';
import '../templates/header.html';
import '../templates/recherche.html';
import '../templates/addGroup.html';
import '../templates/groupe.html';
import '../templates/homePage.html';

//variable constante pour faciliter le parcours de la base de donnée
const mesJours = [
	"lundi",
	"mardi",
	"mercredi",
	"jeudi",
	"vendredi",
	"samedi",
	"dimanche"
	];
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

let mesScores = [];
let nomUtilisateurComparaison;

//quand on se déconnecte, qu'importe où on est sur le site, on retourne à la page d'accueil
Accounts.onLogout(function(){
	FlowRouter.go("/");
});

//quand le template login est créé --> on créer un variable réactive (nom de template problématique, puisqu'inchangé depuis le début de l'application --> ce n'est pas pour le login de l'utilisateur, mais son profile)
Template.login.onCreated(function(){
	this.comparaisonTriggered = new ReactiveVar( false );
});

//helper du template login qui réagit aux changement de la variable réactive comparaisonTriggered
Template.login.helpers({
	comparaisonTriggered: function(){
		return Template.instance().comparaisonTriggered.get();
	},
})

//events du template login
Template.login.events({
	//quand on clique sur le bouton ayant pour class "semaine"
	'click .semaine': function(event){
		event.preventDefault();

		//on récupère la value (le score) de l'élément sur lequel au clique
		let elemVal = parseInt(event.currentTarget.value);

		//on récupère son id, qu'on sépare à l'underscore pour avoir d'un côté le jour et de l'autre l'id de l'heure
		const elem = event.currentTarget.id;
		let elemStr = String(elem);
		let elemTab = elemStr.split("_");
		let jour = elemTab[0];
		let heure = parseInt(elemTab[1]);

		//si elemVal est un nombre, on appelle la méthode semaines.updateTable
		if(!isNaN(elemVal)){
			Meteor.call("semaines.updateTable", Meteor.userId(), jour, heure, elemVal)
		}
	},

	//quand on clique sur un des jours
	'click .joursSemaine': function(event){
		event.preventDefault();

		//on récupère le jour et la valeur
		const jour = event.currentTarget.id;
		const elemVal = parseInt(event.currentTarget.value);

		//on appelle la méthode semaines.dayFill
		if(!isNaN(elemVal)){
			Meteor.call("semaines.dayFill", Meteor.userId(), jour, elemVal)
		}
	},

	//qaund on clique sur une heure
	'click .heureSemaine': function(event){
		event.preventDefault();

		//on récupère l'heure et la valeur
		const heure = parseInt(event.currentTarget.id);
		const elemVal = parseInt(event.currentTarget.value);

		//on appaelle la méthode semaines.hourFill
		if(!isNaN(elemVal)){
			Meteor.call("semaines.hourFill", Meteor.userId(), heure, elemVal)
		}
	},

	//quand on remplit le formulaire pour chercher un utilisateur
	'submit .searchUser': function(event, template){
		event.preventDefault();

		//on récupère la valeur et crée une RegEx
		let re = /\S+@\S+\.\S+/;
		let searchVal = event.target.mySearch.value;
		let searchRes;

		//si la RegEx est validée, on cherche l'utilisateur par son adresse email, sinon par son nom d'utilisateur
		if(searchVal.match(re)){
			searchRes = Meteor.users.findOne({"emails.address": searchVal});
		}
		else if(!searchVal.match(re)){
			searchRes = Meteor.users.findOne({username: searchVal});
		}

		//si l'input n'est pas vide
		if(searchRes != null){
			//on récupère l'id et la semaine de l'utilisateur cherché
			let idUt2 = searchRes._id;
			let utilisateurTeste = Semaines.findOne({id_utilisateur: idUt2});

			//si l'utilisateur a entré son adresse mail ou son pseudo, on lui fait savoir qu'il ne peut continuer
			if(Meteor.userId() == idUt2){
				swal("C'est vous !");
			}

			//si l'utilisateur cherché a mis son compte en privé, alors on dit à l'utilisateur qu'il ne peut pas accèder à cette semaine
			else if(utilisateurTeste.isPrivate){
				swal("Cet utilisateur ne désire pas partager ses informations");
			}

			//si l'utilisateur existe, qu'il ne sagit pas de soi et qu'il a son compte en publique
			else{
    			//on récupère les semaines des deux utilisateurs et on les stocke dans des arrays
    			const mesScores1 = scoresUtilisateurCourant(Meteor.userId());
   				const mesScores2 = scoresUtilisateurCourant(idUt2);

    			//double boucles imbriquées qui stockent les informations compilées de deux tableaux de disponibilité sous la forme d'un array à deux dimensions
    			const mesScores3 = [];
    			for(let i=0;i<mesScores1.length;i++){
   					let placeHolder = [];
   					for(let j=0;j<mesScores1[i].length;j++){
   						let calcul = (mesScores1[i][j] + mesScores2[i][j])/2;
   						placeHolder.push(calcul);
    				}
    				mesScores3.push(placeHolder);
    			}

    			mesScores = mesScores3;
    			nomUtilisateurComparaison = searchRes.username;

    			//changer la valeur de la variable réactive comparaisonTriggered pour afficher le tableau comparé
				if(template.comparaisonTriggered.get() == false){
					template.comparaisonTriggered.set(true);
				}
			}
		}

		//si aucune des conditions ci-dessus n'est validée, c'est que les informations entrées par l'utilisateurs sont erronées
		else{
			swal("Utilisateur non trouvable !");
		}
	},

	//si on appuie sur le bouton retour, on change de template et on revient à celui de base
	'click #goBack': function(event, template){
		event.preventDefault();
		if(template.comparaisonTriggered.get() == true){
				template.comparaisonTriggered.set(false);
		}
	}
});

//helpers pour le tableau de comparaison
Template.semaineComparee.helpers({
	//on récupère le nom de l'utilisateur cherché
	nomComparaison:function(){
		return nomUtilisateurComparaison;
	},

	//jours de la semaine pour les <th> du tableau
	jour: [
		{
			nomJour: "lundi"
		},
		{
			nomJour: "mardi"
		},
		{
			nomJour: "mercredi"
		},
		{
			nomJour: "jeudi"
		},
		{
			nomJour: "vendredi"
		},
		{
			nomJour: "samedi"
		},
		{
			nomJour: "dimanche"
		},
	],
});

Template.newTdComp.helpers({
	//fonction qui observe les changement dans la variable mesScores
	periode:function(){
    	//on vérifie si chaque score est égal ou supérieur à 7
    	let superieurASept = [];
    	for(let i=0;i<mesScores.length;i++){
      		let isSuperieur;
      		let tableauIntermediaire = [];
      			for(let j=0;j<mesScores[i].length;j++){
        			if(mesScores[i][j]>=0 && mesScores[i][j]<=7){
          				isSuperieur = false;
        			}
        			else if(mesScores[i][j]>7 && mesScores[i][j]<=10){
          				isSuperieur = true;
        			}
        			tableauIntermediaire.push(isSuperieur);
      			}
      		superieurASept.push(tableauIntermediaire);
    	}

    	//on vérifie si chaque score est compris entre 4 et 7
    	let entreQuatreEtSept = [];
    	for(let i=0;i<mesScores.length;i++){
      		let isSuperieur;
      		let tableauIntermediaire = [];
      		for(let j=0;j<mesScores[i].length;j++){
        		if(mesScores[i][j]>=4 && mesScores[i][j]<=7){
          			isSuperieur = true;
        		}
        		else{
          			isSuperieur = false;
        		}
        		tableauIntermediaire.push(isSuperieur);
      		}
      		entreQuatreEtSept.push(tableauIntermediaire);
    	}

    	//tout stocker dans une variable
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
    	
    	//return du résultat
    	return semaineComparaison;
  	}
});

//Fonction qui retourne au tableau contenant les disponibilités d'un utilisateur donné
function scoresUtilisateurCourant(idUt){
    //tableau vide pour accueillir les scores
    const scoresEnvoyes = [];
    
    //boucle qui va chercher les scres de chaque jour et les stocke dans un array à deux dimensions
    for(let i=0;i<7;i++){
      	const doc = Semaines.findOne({ id_utilisateur: idUt });
      	const array = doc[mesJours[i]];
      	scoresEnvoyes.push(array);
    }
    return(scoresEnvoyes);
}