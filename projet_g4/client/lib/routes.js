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

FlowRouter.route('/register', {
	name: 'register',
	action(){
		BlazeLayout.render('regUser');
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action(){
		BlazeLayout.render('logUser');
	}
});