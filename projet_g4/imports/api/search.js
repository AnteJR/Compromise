//Import des méthodes
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

let mySearch= document.getElementById(mySearch);
let searchVal = mySearch.value;
document.getElementById(myButton)
function test(){
    console.log(searchVal);
}
myButton.addEventListener("click",test)
/*Meteor.methods({
    
    'users.search'(searchVal){
        
    }
})
Meteor.methods({
'users.search'users.find({ "emails.address" : )'foo@foo.com' });
})*/