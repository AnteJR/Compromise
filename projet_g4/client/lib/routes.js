FlowRouter.route('/', {
    name: 'home',
    action(){
        BlazeLayout.render('login');
    }
});

FlowRouter.route('/groupe/:_id', {
    name: 'groupe',
    action(){
        BlazeLayout.render('groupe');
    }
});

