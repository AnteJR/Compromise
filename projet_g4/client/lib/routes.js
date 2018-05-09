FlowRouter.route('/', {
    name: 'home',
    action(){
        console.log("route home");
        BlazeLayout.render('login');
    }
});

FlowRouter.route('/groupe', {
    name: 'groupe',
    action(){
        console.log("la route test marche");
        BlazeLayout.render('groupe');
    }
});

