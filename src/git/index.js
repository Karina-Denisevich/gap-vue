import {router} from '../index'
import auth from '../auth'

const API_URL = 'http://localhost:8082/'
const GIT_URL = API_URL + 'api/git/'
const USER_URL = API_URL + 'api/users/';

export default {
    repoData: '',
    getRepo(context, owner, name){
        return new Promise(function (resolve, reject) {
            context.$http.get({
                url: GIT_URL + owner + '/' + name, method: 'GET', headers: auth.getAuthHeader()
            }).then((data) => {
                resolve(data)
            }, error => {
                reject(error)
            });
        });
    },
    getTree(context, path){
        return new Promise(function (resolve, reject) {
            context.$http.get({
                url: GIT_URL + path, method: 'GET', headers: auth.getAuthHeader()
            }).then((data) => {
                resolve(data)
            }, error => {
                reject(error)
            });
        });
    },
    getFile(context, path){
        return new Promise(function (resolve, reject) {
            context.$http.get({
                url: GIT_URL + path, method: 'GET', headers: auth.getAuthHeader()
            }).then((data) => {
                resolve(data)
            }, error => {
                reject(error)
            });
        });
    },
    saveLines(context, data, userId){
        return new Promise(function (resolve, reject) {
            context.$http.post({
                url: USER_URL + 'saveLines' + '?userId=' + userId,
                method: 'POST',
                data: data,
                headers: auth.getAuthHeader()
            }).then((data) => {
                alert(JSON.stringify(data))
            }, error => {
                alert('h')
                reject(error)
            });
        });
    },
    goToRepo(owner, reponame){
        router.go('/repo' + '/' + owner + '/' + reponame)
    }


}
