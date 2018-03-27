/* Defines the structure of each request to our database Mongo
 * Paths are defined in const at the beginning
  * Each function corresponds to a specific request */

import axios from 'axios/index'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'

const apiBaseUrl = "/api/";
const signinUrl = "signin";
const usersUrl = 'users/';
const allUsersUrl = "allusers";
const updateUserUrl = 'updateuser';
const promosUrl = 'promos/';
const userInfoUrl = 'userinfos/';
const allPromosUrl = 'listpromos';
const basicUserInfoUrl = 'basicuserinfos/';
const signupUrl = 'signup';
const checkAndRefreshToken = 'checkandrefreshtoken';
const updatePasswordUrl = 'updatePassword';
const pictureFileUrl = 'pictures/file/'
const pictureUploadUrl = 'pictures/upload/'

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

export let funcCheckAndRefreshToken = () => {
  return new Promise((resolve, reject) =>
  {
    axios.get(apiBaseUrl + checkAndRefreshToken, {
      headers: {'Authorization': cookie.load('token')}
    })
      .then((response) => {
        if (response.status === 200 && response.data.newToken) {
          cookie.save('token', response.data.newToken);
          resolve(cookie.load('token'));
          reject('Error in checkAndRefreshToken');
        }
      })
  })
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
        if(response.status === 200) {
          let userInfos = response.data;
          resolve(userInfos);
          reject('Error in getUserInfos request');
        }
      });
    })
}

export let getBasicUserInfos = (token, username) => {
  return new Promise(
    (resolve, reject) => {
      axios.get(apiBaseUrl + usersUrl + basicUserInfoUrl + username, {
        headers: {'Authorization': token}
      }).then((response) => {
        let basicUserInfos = response.data;
        resolve(basicUserInfos);
        reject('Error in getBasicUserInfos request');
      });
    })
}

export let setUserInfos = (token, username, password, roleUser, nomUser, prenomUser, emailUser) => {
  let dataUser = {
    "username": username,
    'password': password ,
    'role': roleUser,
    'nom': nomUser,
    'prenom': prenomUser,
    'email': emailUser
  };

  return new Promise(
    (resolve, reject) => {
      axios.post(apiBaseUrl + signupUrl, dataUser, {
        headers: {'Authorization': token,
          'Content-Type': 'application/json'}
      }).then((response) => {

        if (response.status === 200) {
          toast.success("Utilisateur créé", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          resolve('answer');
          reject('Error in setUserInfo');
        }
      })
        .catch(function (error) {
          if(error.status === 11000){
            toast.error("Username Already exists", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
          else if(error.status === 401){
            toast.error("Wrong role", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
          else if(error.response.status === 403) {
            toast.error("Vous n'avez pas les droits pour cette opération", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
          else {
            toast.error("Username does not exists", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
    }
  )
}

export let updateUserInfos = (token, username, role, nom, prenom, email) => {
  let donneesFormulaire={
    "username":username,
    "role":role,
    "nom": nom,
    "prenom": prenom,
    "email": email
  };

  return new Promise(
    (resolve, reject) => {
      axios.put(apiBaseUrl+ updateUserUrl, donneesFormulaire, {
        headers: {'Authorization': token}
      }).then((response) => {
        if (response.status === 200) {
          toast.success("Utilisateur mis à jour" , {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          resolve('answer');
          reject('Error in updateUserInfo');
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

export let updatePassword = (myToken, oldPassword, newPassword) => {
  return new Promise ((resolve, reject) => {
    let donneesFormulaire={
      "password":oldPassword,
      "newPassword": newPassword
    }

    axios.post(apiBaseUrl+updatePasswordUrl, creerStructureFormulaire(donneesFormulaire), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': myToken}
    })
      .then(function (response) {
        if(response.status === 200){
          let token = response.data.token;
          cookie.save('token', token, {path: '/'});
          toast.success("Mot de passe modifié", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          resolve('success');
          reject('error in updatePassword');
        }
      })
  })
}

export let getPicture = (token, username) => {
  return new Promise((resolve, reject) => {
    axios.get(apiBaseUrl+pictureFileUrl+username, {
      headers: {
        'Content-Type':'multipart/form-data',
      }
    })
      .then((data) => {
        if( data.status === 200) {
          resolve(apiBaseUrl+pictureFileUrl+username);
          reject('error in getPicture');
      }
    })
  })
}

export let uploadPicture = (username, data) => {
  return new Promise ((resolve, reject) => {
    axios.post(apiBaseUrl + pictureUploadUrl + username, data).then((response) => {
      if( response.status === 200) {
        toast.success("photo mise en ligne", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        resolve(apiBaseUrl + pictureFileUrl + username);
        reject('Error in uploadPicture');
      }
    })
      .catch((error) => {
        toast.error("erreur durant la mise en ligne de la photo", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
  })
}

export let getPromosInfos = (nameProm, token) => {
  return new Promise(
    (resolve, reject) => {
      axios.get(apiBaseUrl + promosUrl  + nameProm, {
        headers: {'Authorization': token}
      }).then((response) => {
        if (response.status === 200) {
          let dataProm = response.data.promotion;
          resolve(dataProm);
          reject('Error in getPromosInfos');
        }
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
            toast.success("Promotion créée", {
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

export let getAllPromos = (token) => {
  return new Promise(
    (resolve, reject) => {
      axios.get(apiBaseUrl + promosUrl  + allPromosUrl, {
        headers: {'Authorization': token}
      }).then((response) => {
        let dataAllPromos = response.data.promotions;
        resolve(dataAllPromos);
        reject('Error in getAllPromos');
      })
    }
  )
}

/* Creates a request typical structure */
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
