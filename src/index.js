import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import PersonalInfo from './components/PersonalInfo.vue'
import AdminHome from './components/AdminHome.vue'
import Search from './components/Search.vue'
import Bookmarks from './components/Bookmarks.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import auth from './auth'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Dropdown from 'hsy-vue-dropdown'


Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Dropdown)


auth.checkAuth()
auth.setUserDetails(new Vue());

Vue.component('search-box', Search)

import Vuetable from 'vuetable/src/components/Vuetable.vue';
import VuetablePagination from 'vuetable/src/components/VuetablePagination.vue';
import VuetablePaginationDropdown  from 'vuetable/src/components/VuetablePaginationDropdown.vue';
Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination)
Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown)



export var router = new VueRouter()



router.map({
    '/home': {
        component: Home,
        userOnly: true,
        authenticatedOnly: false
    },
    '/admin-home': {
        component: AdminHome,
        adminOnly: true,
        authenticatedOnly: true,
    },
    '/search': {
        component: Search
    },
    '/login': {
        component: Login
    },
    '/signup': {
        component: Signup
    },
    '/personal-info': {
        component: PersonalInfo,
        authenticatedOnly: true
    },
    '/bookmarks': {
        component: Bookmarks,
        authenticatedOnly: true
    }
})


router.beforeEach(function (transition) {
    if (auth.user.authenticated && auth.user.authorities.toString().length < 1) {
        auth.setUserDetails(new Vue(), redirect, transition);
    } else {
        redirect(transition)
    }
});

function redirect(transition) {
    if (transition.to.authenticatedOnly && auth.user.authenticated === false) {
        transition.redirect('/login');
    } else if (transition.to.adminOnly && auth.user.authorities !=  'ROLE_ADMIN') {
        transition.redirect('/home');
    } else if (transition.to.userOnly && auth.user.authorities == 'ROLE_ADMIN') {
        transition.redirect('/admin-home');
    }
    else {
        transition.next();
    }
}

router.redirect({
    '*': '/home'
})

router.start(App, '#app')

