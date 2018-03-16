class GlobalVarHandler {
  constructor () {
    // url to access mongo DB
    this.apiBaseUrl = "/api/";
    this.signinUrl = "signin";
    this.getAllPromosUrl = "promos/listpromos";
    this.setPromosUrl = "promos";
    this.signupUrl = "signup";
    this.updatePasswordUrl = "updatePassword";
    this.getAllUsersUrl = 'users/allusers';
  }
}

export default (new GlobalVarHandler());


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
