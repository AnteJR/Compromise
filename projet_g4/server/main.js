import { Meteor } from 'meteor/meteor';
import '../imports/api/semaines.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('semaines',function () {
    return semaines.find({isPrivate:false})
  })

Meteor.publish('users', function () {
//publish some of users' information to client
return Meteor.users.find({},
{
  //specify information to publish from the users' collection
    fields:{ 'emails': 1,
     '_id':1,}
})
})
});