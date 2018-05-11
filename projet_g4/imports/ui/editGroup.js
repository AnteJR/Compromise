//importation des méthodes
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Semaines } from '../api/semaines.js';
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

Template.addGroup.events({
    'click #btnCreer': function(event, template){
        event.preventDefault();

        //let leGroupe = event.target.nomGroupe.value;
        let leGroupe = document.getElementById("nomGroupe").value;
        console.log(leGroupe)
        let nameTest = Groups.findOne({"name": leGroupe});
		if(leGroupe){
           let nameTest=Groups.findOne({name : leGroupe});
            if (nameTest!=null){
                Meteor.call('groups.create', Meteor.userId(), leGroupe);
                    let btnGroupe = document.createElement("input");
                    btnGroupe.setAttribute("type","button");
                    btnGroupe.setAttribute("id","btnGroupe");
                    btnGroupe.setAttribute("value",leGroupe)
                    groupes.appendChild(btnGroupe);
                    console.log(btnGroupe.id);
                    FlowRouter.go('/groupe');
           }
           else{
               alert("Un groupe avec ce nom existe déjà!");
           }
        }
        else{
            alert("Veuillez entrer un nom de groupe!")
        }
        

},
    'click #btnGroupe': function(event){
        event.preventDefault();
        console.log("click");
        let groupName=document.getElementById("groupNameInput").value;

        FlowRouter.go('/groupe');
}
});