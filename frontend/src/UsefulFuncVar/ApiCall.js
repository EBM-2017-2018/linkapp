import axios from 'axios/index'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'

const apiBaseUrl = "/api/";
const signinUrl = "signin";
const usersUrl = 'users/';
const allUsersUrl = "allusers"
const promosUrl = 'promos/';
const userInfoUrl = 'userinfos/'


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
      axios.get(apiBaseUrl + usersUrl + allUsersUrl, {
        headers: {'Authorization': token}
      }).then((response) => {
        let allUsers = response.data.users;
        resolve(allUsers);
        reject('Error in getAllUsers request');
      });
  })
}

export let getUserInfos = (token, username) => {
  return new Promise(
    (resolve, reject) => {
      axios.get(apiBaseUrl + usersUrl + userInfoUrl + username, {
        headers: {'Authorization': token}
      }).then((response) => {
        let userInfos = response.data;
        resolve(userInfos);
        reject('Error in getUserInfos request');
      });
    })
}


export let getPromosInfos = (nameProm, token) => {
  return new Promise(
    (resolve, reject) => {
      axios.get(apiBaseUrl + promosUrl  + nameProm, {
        headers: {'Authorization': token}
      }).then((response) => {
        let dataProm = response.data.promotion;
        resolve(dataProm);
        reject('Error in getPromosInfos');
      })
    }
  )
}


export let setPromosInfos = (nomPromo, responsable, token, membres) => {
  let dataProm = {
    "nomPromo": nomPromo,
    "responsable": responsable,
    "membres": membres
  };

  return new Promise(
    (resolve, reject) => {
      axios.post(apiBaseUrl + promosUrl, dataProm, {
        headers: {'Authorization': token,
          'Content-Type': 'application/json'}
      }).then((response) => {

          if (response.status === 200) {
            toast.success("Promotion crée", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            resolve('answer');
            reject('Error in setPromoInfo');
          }
        })
        .catch(function (error) {
          if(error.response.status === 403) toast.error("Vous n'avez pas les droits pour cette opération", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          console.log(error);
        })
    }
  )
}


export let updatePromoInfos = (token, nomPromo, responsable, membres) => {
  let dataProm = {
    "nomPromo": nomPromo,
    "responsable": responsable,
    "membres": membres
  };

  return new Promise(
    (resolve, reject) => {
      axios.put(apiBaseUrl + promosUrl, dataProm, {
        headers: {'Authorization': token,
          'Content-Type': 'application/json'}
      }).then((response) => {

        if (response.status === 200) {
          toast.success("Promotion mise à jour", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          resolve('answer');
          reject('Error in updatePromoInfo');
        }
      })
        .catch(function (error) {
          if(error.response.status === 403) toast.error("Vous n'avez pas les droits pour cette opération", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          console.log(error);
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
