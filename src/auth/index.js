import {router} from '../index'
import user from '../user'

const API_URL = 'http://localhost:8082/'
const LOGIN_URL = API_URL + 'api/auth'
const SIGNUP_URL = API_URL + 'api/signup'

export default {
    user: {
        authenticated: false,
        authorities: '',
        id: '',
        username: ''
    },

    login(context, creds, redirect) {
        context.$http.post(LOGIN_URL, creds, (data) => {
            localStorage.setItem('token', data.token)

            this.user.authenticated = true;
            this.setUserDetails(context);

            if (redirect) {
                router.go(redirect)
            }

        }).error((err) => {
            context.error = err
        })
    },

    setUserDetails(context, callback){
        if (this.user.authenticated) {
            user.getCurrentUser(context)
                .then(result => {
                        this.user.authorities = result.data.authorities;
                        this.user.id = result.data.id;
                        this.user.username = result.data.username;
                        callback(arguments[2]);
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
    },

    signup(context, creds, redirect) {
        return new Promise(function (resolve, reject) {
            context.$http.post({
                url: SIGNUP_URL,
                method: 'POST',
                data: creds
            }).then((data) => {
                if (redirect) {
                    router.go(redirect)
                }
            }, error => {
                reject(error)
            });
        });
    },

    logout(context) {
        localStorage.removeItem('token');
        this.user.authenticated = false;
        if (!!context) {
            location.reload();
        }
    },

    checkAuth() {
        var jwt = localStorage.getItem('token');
        this.user.authenticated = !!jwt;
    },

    getAuthHeader() {
        return {
            'token': localStorage.getItem('token')
        }
    }
}
