define({ "api": [
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "api/signin",
    "title": "connection",
    "description": "<p>connection à la plateforme linkapp</p>",
    "name": "Signin",
    "group": "General",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"success\": true,\n \"token\": \"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMmJ\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "4xx": [
          {
            "group": "4xx",
            "optional": false,
            "field": "User",
            "description": "<p>not found code</p>"
          },
          {
            "group": "4xx",
            "optional": false,
            "field": "Wrong",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "filename": "src/api/index.js",
    "groupTitle": "General",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apiapi/signin"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "api/signup",
    "title": "inscription",
    "description": "<p>inscrit un nouvel utilisateur</p>",
    "name": "Signup",
    "group": "General",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"etudiant\"",
              "\"intervenant\"",
              "\"administrateur\""
            ],
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "11000": [
          {
            "group": "11000",
            "optional": false,
            "field": "UsernameAlreadyExist",
            "description": ""
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongRole",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongEmail",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoPasswordOrUsername",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/index.js",
    "groupTitle": "General",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apiapi/signup"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "api/checktoken",
    "title": "checkTokenValidity",
    "description": "<p>vérifie le token d'un utilisateur</p>",
    "name": "verification",
    "group": "General",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "JWT",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UnknownUser",
            "description": ""
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "WrongToken",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/index.js",
    "groupTitle": "General",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apiapi/checktoken"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "api/promos/:promo",
    "title": "getPromo",
    "description": "<p>récupère la promo passée en paramètre</p>",
    "name": "getPromo",
    "group": "Promo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Authorization\":\"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "promo",
            "description": "<p>le nom de la promo</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>succès</p>"
          },
          {
            "group": "Success 200",
            "type": "Promo",
            "optional": false,
            "field": "promotion",
            "description": "<p>la promo demandée</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"promotion\": {\n        \"_id\": \"5a9aa79b687a689eba75a121\",\n        \"nomPromo\": \"EBM1\",\n        \"responsable\": \"root\",\n        \"__v\": 0,\n        \"membres\": [\n            \"root\",\n            \"test\",\n            \"test2\"\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "4xx": [
          {
            "group": "4xx",
            "optional": false,
            "field": "wrongUser",
            "description": ""
          },
          {
            "group": "4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/promos.js",
    "groupTitle": "Promo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apiapi/promos/:promo"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "api/promos",
    "title": "setPromo",
    "description": "<p>récupère la promo passée en paramètre</p>",
    "name": "setPromo",
    "group": "Promo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Authorization\":\"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "body:\n    {\n    \"nomPromo\":\"EBM\",\n    \"responsable\":\"root\",\n    \"membres\":[\"root\",\"test\"]\n    }",
        "type": "json"
      }
    ],
    "permission": [
      {
        "name": "'administrateur'"
      },
      {
        "name": "'intervenant'"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomPromo",
            "description": "<p>le nom de la promo</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "responsable",
            "description": "<p>le username du responsable</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "membres",
            "description": "<p>les usernames des membres</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>succès</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "4xx": [
          {
            "group": "4xx",
            "optional": false,
            "field": "wrongUser",
            "description": ""
          },
          {
            "group": "4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/promos.js",
    "groupTitle": "Promo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apiapi/promos"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "put",
    "url": "api/promos",
    "title": "updatePromo",
    "description": "<p>récupère la promo passée en paramètre</p>",
    "name": "updatePromo",
    "group": "Promo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Authorization\":\"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "body:\n    {\n    \"nomPromo\":\"EBM\",\n    \"responsable\":\"root\",\n    \"membres\":[\"root\",\"test\"]\n    }",
        "type": "json"
      }
    ],
    "permission": [
      {
        "name": "'administrateur'"
      },
      {
        "name": "'intervenant'"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nomPromo",
            "description": "<p>le nom de la promo</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "responsable",
            "description": "<p>le username du responsable</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "membres",
            "description": "<p>les usernames des membres * @apiSuccess {Boolean} success succès</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "4xx": [
          {
            "group": "4xx",
            "optional": false,
            "field": "wrongUser",
            "description": ""
          },
          {
            "group": "4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/promos.js",
    "groupTitle": "Promo",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apiapi/promos"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "api/users/role/:username",
    "title": "getUserRole",
    "description": "<p>récupère le role de l'utilisateur</p>",
    "name": "getUserRole",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Authorization\":\"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>le nom d'utilisateur de l'utilisateur</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>succès</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role de l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"role\": \"admin\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "4xx": [
          {
            "group": "4xx",
            "optional": false,
            "field": "wrongUser",
            "description": ""
          },
          {
            "group": "4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apiapi/users/role/:username"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "api/users/list/:role",
    "title": "getUsersFromRole",
    "description": "<p>récupère la liste des utilisateurs pour un role donné</p>",
    "name": "getUsersFromRole",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Authorization\":\"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"etudiant\"",
              "\"intervenant\"",
              "\"administrateur\""
            ],
            "optional": false,
            "field": "le",
            "description": "<p>role dont on cherche les utilisateurs</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>succès</p>"
          },
          {
            "group": "Success 200",
            "type": "users[]",
            "optional": false,
            "field": "users",
            "description": "<p>liste d'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"success\": true,\n \"users\": [\n     {\n         \"username\": \"eleve\",\n         \"nom\": \"test\",\n         \"prenom\": \"test\",\n         \"role\": \"etudiant\"\n     },\n     {\n         \"username\": \"petitpoucet\",\n         \"nom\": \"test\",\n        \"prenom\": \"test\",\n        \"role\": \"etudiant\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "4xx": [
          {
            "group": "4xx",
            "optional": false,
            "field": "wrongRole",
            "description": ""
          },
          {
            "group": "4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/apiapi/users/list/:role"
      }
    ]
  }
] });
