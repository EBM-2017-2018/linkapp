import { creerStructureFormulaire } from './UsefulFuncVar'
import axios from 'axios/index'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'

const apiBaseUrl = "http://localhost:3000/api/";
const signinUrl = "signin";

export var signinLinkapp = (username, password) => {
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
        this.props.appOnSuccessLogin(token);

      }
    })
    .catch(function (error) {

      if (error.response.status && error.response.status === 401) toast.error(
        (error.response.data.msg ? error.response.data.msg : "connection impossible"), {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000,
        });

    });
}