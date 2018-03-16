import { creerStructureFormulaire } from './UsefulFuncVar'
import axios from 'axios/index'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'


const apiBaseUrl = "/api/";
const signinUrl = "signin";
const getAllUsersUrl = 'users/allusers';


export let getTokenOnLogin = (username, password) => {
  return new Promise(
    (resolve, reject) => {
      let donneesFormulaire ={
        "username":username,
        "password":password
      }

      axios.post(apiBaseUrl + signinUrl, creerStructureFormulaire(donneesFormulaire), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then((response) => {

          if (response.status === 200) {
            let token = response.data.token;
            cookie.save('token', token, {path: '/'});
            resolve(token);
            reject('Error in getTokenOnLogin');
          }
        })
        .catch(function (error) {
          if (error.response.status && error.response.status === 401) toast.error(
            (error.response.data.msg ? error.response.data.msg : "connection impossible"), {
              position: toast.POSITION.TOP_LEFT,
              autoClose: 3000,
            });
        })
    });
}


export let getAllUsers = (token) => {
  return new Promise(
    (resolve, reject) => {
      axios.get(apiBaseUrl + getAllUsersUrl, {
        headers: {'Authorization': token}
      }).then((response) => {
        let allUsers = response.data.users;
        resolve(allUsers);
        reject('Error in getAllUsers request');
      });
  })
}
