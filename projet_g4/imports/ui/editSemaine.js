//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';

//importation des fichiers
import '../templates/semaine.html';
import '../templates/newTr.html';
import '../templates/newTd.html';

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
Template.tableauSemaines.helpers({
	jour: [
		{
			nomJour: "lundi",
			id_jour:0,
		},
		{
			nomJour: "mardi",
			id_jour:1,
		},
		{
			nomJour: "mercredi",
			id_jour:2,
		},
		{
			nomJour: "jeudi",
			id_jour:3,
		},
		{
			nomJour: "vendredi",
			id_jour:4,
		},
		{
			nomJour: "samedi",
			id_jour:5,
		},
		{
			nomJour: "dimanche",
			id_jour:6,
		},
	],
});

Template.newTd.helpers({
	//fonction qui observe les changement dans le document de l'utilisateur
	periode:function(){
		//on récupère les scores de l'utilisateur courant
		let mesScores = [];
		for(let i=0;i<7;i++){
	      	const doc = Semaines.findOne({ id_utilisateur: Meteor.userId() });
	      	const array = doc[mesJours[i]];
	      	mesScores.push(array);
    	}

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

//Code pour les boutons permettant de changer la couleur et l'état des cellules
var valeur = 10;

Template.tableauSemaines.events({
	'click #red': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(9, 75%, 55%, 1)"});
		$("#yellow").css({"background-color":"hsl(49, 70%, 70%, 1)"});
		$("#green").css({"background-color":"hsl(109, 70%, 70%, 1)"});
		valeur = 0;
	},
	'click #yellow': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(49, 75%, 55%, 1)"});
		$("#red").css({"background-color":"hsl(9, 70%, 70%, 1)"});
		$("#green").css({"background-color":"hsl(109, 70%, 70%, 1)"});
		valeur = 4;
	},
	'click #green': function(event){
		event.preventDefault();
		$(event.target).css({"background-color":"hsl(109, 75%, 55%, 1)"});
		$("#yellow").css({"background-color":"hsl(49, 70%, 70%, 1)"});
		$("#red").css({"background-color":"hsl(9, 70%, 70%, 1)"});
		valeur = 10;
	}
});


Template.newTd.events({
	//quand on clique sur les cellules ayant la class "semaine", on change leur couleur et leur valeur
	'click .semaine': function(event){
		event.preventDefault();
		if(valeur==0){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		} else if(valeur==4){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		} else if(valeur==10){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		}
	},
	//quand on clique sur les cellules ayant la class "heureSemaine", on change la couleur et la valeur d'une ligne
	'click .heureSemaine': function(event){
		event.preventDefault();
		if(valeur==0){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		} else if(valeur==4){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		} else if(valeur==10){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		}
	},
	//quand on entre sur une cellule ayant la class "semaine", on change sa couleur avec celle de la valeur
	'mouseenter .semaine': function(event){
		event.preventDefault();
		if(event.target.dataset.value != valeur){
			$(event.target).css({"background-color":"hsl("+valeur+"9, 75%, 75%, 1)"});
		}
	},
	//quand on quitte une cellule ayant la class "semaine", on réinitialise sa couleur
	'mouseleave .semaine': function(event){
		event.preventDefault();
		if(parseInt(event.target.dataset.value) == 0){
			$(event.target).css({"background-color":"hsl(9, 75%, 55%, 1)"});
		}
		else if(parseInt(event.target.dataset.value) == 4){
			$(event.target).css({"background-color":"hsl(49, 75%, 55%, 1)"});
		}
		else if(parseInt(event.target.dataset.value) == 10){
			$(event.target).css({"background-color":"hsl(109, 75%, 55%, 1)"});
		}
	}
});

Template.newTr.events({
	//quand on clique sur les cellules ayant la class "joursSemaines", on change la couleur et la valeur d'une colonne
	'click .joursSemaine': function(event){
		event.preventDefault();
		if(valeur==0){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		} else if(valeur==4){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		} else if(valeur==10){
			$(event.target).val(valeur);
			event.target.dataset.value = valeur
		}
	}
});

Template.tableauSemaines.events({
	//quand on passe sur une cellule ayant la class "joursSemaine", on récupère le numréo du jour et on lance la fonction changeBg()
	'mouseenter .joursSemaine': function(event){
		event.preventDefault();
		let monJour = parseInt(event.currentTarget.dataset.jour)
		let mesTd = document.querySelectorAll('.j'+monJour);
		changeBg(mesTd)
	},
	//quand on quitte une cellule ayant la class "joursSemaine", on récupère le numéro du jour et on lance la fonction testValeur()
	'mouseleave .joursSemaine': function(event){
		event.preventDefault();
		let monJour = parseInt(event.currentTarget.dataset.jour);
		let mesTd = document.querySelectorAll('.j'+monJour);
		testValeur(mesTd);
	},
	//quand on passe sur une celleul ayant la class "heureSemaine", on récupère le numéro de l'heure et on lance la fonction changeBg()
	'mouseenter .heureSemaine': function(event){
		event.preventDefault();
		let monHeure = parseInt(event.currentTarget.dataset.heure);
		let monTd = document.querySelectorAll('.heure'+monHeure);
		changeBg(monTd);
	},
	//quand on quitte une cellule ayant la class "heureSemaine", on récupère le numéro de l'heure et on lance la fonction testValeur()
	'mouseleave .heureSemaine': function(event){
		event.preventDefault();
		let monHeure = parseInt(event.currentTarget.dataset.heure);
		let monTd = document.querySelectorAll('.heure'+monHeure);
		testValeur(monTd);
	}
});

//fonction changeBg() qui change la background-color de toutes les cellules ayant une valeur différente de celle sélectionnée
function changeBg(desTd){
	for(let i=0;i<desTd.length;i++){
		if(desTd[i].dataset.value != valeur){
			desTd[i].style.backgroundColor = "hsl("+valeur+"9, 75%, 75%, 1)"
		}
	}
}
//fonction testValeur() qui réinitialise les couleurs de background des cellules dont la couleur a été changée
function testValeur(desTd){
	for(let i=0;i<desTd.length;i++){
		if(desTd[i].dataset.value == 0){
			desTd[i].style.backgroundColor = "hsl(9, 75%, 55%, 1)"
		}
		else if(desTd[i].dataset.value == 4){
			desTd[i].style.backgroundColor = "hsl(49, 75%, 55%, 1)"
		}
		else if(desTd[i].dataset.value == 10){
			desTd[i].style.backgroundColor = "hsl(109, 75%, 55%, 1)"
		}
	}
}