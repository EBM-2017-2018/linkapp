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
    this.getUserInfos='users/userinfos';
  }
}

export default (new GlobalVarHandler());
