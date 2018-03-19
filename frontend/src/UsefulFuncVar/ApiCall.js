import axios from 'axios/index'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'

const apiBaseUrl = "/api/";
const signinUrl = "signin";
const getAllUsersUrl = 'users/allusers';
const promosUrl = 'promos';


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
            let username = response.data.username;
            cookie.save('token', token, {path: '/'});
            cookie.save('username', username, {path: '/'});
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


export let getPromosInfos = (nameProm, token) => {
  return new Promise(
    (resolve, reject) => {
      axios.get(apiBaseUrl + promosUrl + '/' + nameProm, {
        headers: {'Authorization': token}
      }).then((response) => {
        let dataProm = response.data.promotion;
        resolve(dataProm);
        reject('Error in getPromosInfos');
      })
    }
  )
}


export let setPromosInfos = (nomPromo, responsable, membres, token) => {
  let dataProm = {
    "nomPromo": nomPromo,
    "responsable": responsable,
    "membres": membres
  };

  return new Promise(
    (resolve, reject) => {
      axios.post(apiBaseUrl + promosUrl, creerStructureFormulaire(dataProm), {
        headers: {'Authorization': token}
      }).then((response) => {
        resolve('answer');
        reject('Error in setPromosInfos');
      })
    }
  )
}


export function creerStructureFormulaire(donneesFormulaire) {
  let structureFormulaire = [];
  for (let proprietes in donneesFormulaire) {
    let encodedKey = encodeURIComponent(proprietes);
    let encodedValue = encodeURIComponent(donneesFormulaire[proprietes]);
    structureFormulaire.push(encodedKey + "=" + encodedValue);
  }
  structureFormulaire = structureFormulaire.join("&");
  return structureFormulaire;
}
