# Compromise - README
### *Compromise ver. 1.0*
*Saara Jones, Antoine Klotz, Joël Rimaz & Sorcha Walsh*
Projet dans le cadre du cours : Programmation pour Internet II - Meteor.js donné par Isaac Pante et Loris Rimaz 
Faculté des Lettres - Université de Lausanne - Février à Mai 2017 Github
## Description
Le projet Compromise a pour but de proposer une plateforme sur laquelle il est possible de partager un horaire-type de semaine et de le comparer avec d'autres utilisateurs. Créer un compte assigne un tableau de semaine à l'utilisateur, et on peut alors le modifier avec nos disponibilités. On peut alors comparer son tableau avec un utilisateur en particulier, ainsi que créer des groupes pour se retrouver entre utilisateurs - comme par exemple entre collègues, ou amis.
Le public cible de cette application est très large. Il ne vise pas d'audience en particulier et il n'est pas nécessaire de s'y connaître en informatique pour pouvoir l'utiliser. L'utilisation est un mélange entre Doodle (dans l'idée d'une gestion de disponibilités entre des utilisateurs) et Whatsapp (pour la création de groupe et leur gestion). L'application ayant pour but d'être accessible à tous, on peut aisémment partager nos disponibilités avec nos amis.
## Interface
Cette section décrit les différentes étapes d'utilisation.
* L'utilisateur, à l'écran d'accueil, peut soit se créer un compte, soit se connecter
* Il est ensuite dirigé vers la page principale, contenant un tableau alors rempli comme étant entièrement indisponible.
* Il peut ici modifier ses disponibilités en utilisant les boutons situés sous le tableau, chercher un utilisateur avec un email ou un pseudo pour comparer son horaire avec le sien, ainsi que créer et accéder à ses groupes.
* Il y a également un header, en haut, où l'utilisateur peut se déconnecter, changer son mot de passe, supprimer son compte, ou le passer en privé
* S'il crée ou se connecte à un groupe, il est redirigé vers une interface en deux temps : **s'il est admin**, il peut ajouter des utilisateur, contacter le groupe par email et supprimer le groupe, et **s'il est un membre normal**, il peut quitter le groupe. Dans les deux cas, le groupe affiche l'horaire comparant celui de tous les membres.
## Base de données
L'application contient 4 collections MongoDB. La première est gérée par un des plugins (Accounts-base) et gère les comptes utilisateurs. Les 3 autres, Semaines, Groups et Notifs. Elles gèrent respectivement les semaines des utilisateurs et les états de chaque cellule des tableaux, les groupes et leurs membres, et les notifications.
## License
Ce programme est un logiciel gratuit.
Event.Org a été développé avec le framework de développement web en Javascript Meteor dans sa version 1.6.1.
Les principaux modules Meteor utilisés dans ce projet sont :
* reactiveVar (variables réactives)
* FlowRouter (les liens)
* Blaze Layout (render des templates)
* Accounts-base & Accounts-password (gestion des comptes utilisateurs)
* sAlert (notifications)
* Bootstrap (style)
Certaines libraries et modules utilisés pour le développement sont parfois soumis à un copyright par leurs auteurs respectifs.
Copyright © 2018 - l'équipe de développement de Compromise : *Saara Jones - Antoine Klotz - Joël Rimaz - Sorch Walsh*
