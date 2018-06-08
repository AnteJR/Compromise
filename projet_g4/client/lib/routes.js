FlowRouter.route('/', {
    name: 'homePage',
    action(){
        BlazeLayout.render('homePage');
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

FlowRouter.route('/password', {
	name: 'changePassword',
	action(){
		BlazeLayout.render('changePW');
	}
});

FlowRouter.route('/profile', {
	name: 'profile',
	action(){
		BlazeLayout.render('login');
	}
});

FlowRouter.route('/comparaison/:_id', {
    name: 'comparaison',
    action(){
        BlazeLayout.render('semaineComparee');
    }
});