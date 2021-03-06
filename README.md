Linkapp
===============
**Master** 

[![Build Status](https://travis-ci.org/EBM-2017-2018/linkapp.svg?branch=master)](https://travis-ci.org/EBM-2017-2018/linkapp)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c769b7b37b10c0cda64/maintainability)](https://codeclimate.com/github/EBM-2017-2018/linkapp/maintainability)

##### Frontend :

[![codecov](https://codecov.io/gh/EBM-2017-2018/linkapp/branch/master/graph/badge.svg)](https://codecov.io/gh/EBM-2017-2018/linkapp)

**develop**

[![Build Status](https://travis-ci.org/EBM-2017-2018/linkapp.svg?branch=develop)](https://travis-ci.org/EBM-2017-2018/linkapp)

##### Frontend :
[![codecov](https://codecov.io/gh/EBM-2017-2018/linkapp/branch/develop/graph/badge.svg)](https://codecov.io/gh/EBM-2017-2018/linkapp)

Ce dépot contient le code du projet projet Linkapp.

# Vérifier et Rafraichir le token pour les autres sites de la plateforme

pour vérifier le token, il faut envoyer une requête à https://linkapp.ebm.nymous.io/api/checkadnrefreshtoken avec un header 
`Authorization` ayant comme valeur le token, si le token est valide la réponse est de la forme :

```json
{
     "success": true,
     "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm",
 }
  ``` 
il faut ensuite récupérer le nouveau token dans le json et remplacer l'ancien token par le nouveau.

Il est maintenant possible d'utiliser le middleware [ebm-auth](https://github.com/EBM-2017-2018/ebm-auth) qui simplifie grandement la gestion de l'authentification.

# Apidoc

Pour plus d'informations concernant les requêtes, reportez vous à l'[apidoc](https://ebm-2017-2018.github.io/linkapp/). 

# Rapport du fil rouge

Le rapport du fil rouge est disponible sur ce [Gdoc](https://docs.google.com/document/d/1HN_XiCOaZ9BO3D--FnskxPu3o2WOTBxE0MsYqJfzORI/edit?usp=sharing).

