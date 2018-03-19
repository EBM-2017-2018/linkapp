define({ "api": [
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "signin",
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
          "content": "{\n \"success\": true,\n \"token\": \"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMmJ\",\n \"username: \"kevin\"\n }",
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
        "url": "http://localhost:3000/api/signin"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "signup",
    "title": "inscription",
    "description": "<p>inscrit un nouvel utilisateur</p>",
    "name": "Signup",
    "group": "General",
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
        "url": "http://localhost:3000/api/signup"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "put",
    "url": "updateUser",
    "title": "modifier utilisateur",
    "description": "<p>modifie les données d'un utilisateur</p>",
    "name": "UpdateUser",
    "group": "General",
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
            "field": "username",
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
            "field": "NoUsername",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/index.js",
    "groupTitle": "General",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/updateUser"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "checkandrefreshtoken",
    "title": "checkAndRefreshToken",
    "description": "<p>vérifie le token d'un utilisateur et renvoie un nouveau token</p>",
    "name": "checkAndRefreshToken",
    "group": "General",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"success\": true\n  \"token\": \"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm\"\n}",
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
        "url": "http://localhost:3000/api/checkandrefreshtoken"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "updatePassword",
    "title": "updatePassword",
    "description": "<p>connection à la plateforme linkapp</p>",
    "name": "updatePassword",
    "group": "General",
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
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": ""
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "    body:\n{\n     password: test,\n     newPassword: t3st,\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"success\": true,\n }",
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
            "description": "<p>not found</p>"
          },
          {
            "group": "4xx",
            "optional": false,
            "field": "Wrong",
            "description": "<p>password</p>"
          }
        ],
        "5xx": [
          {
            "group": "5xx",
            "optional": false,
            "field": "InternalError",
            "description": ""
          }
        ]
      }
    },
    "filename": "src/api/index.js",
    "groupTitle": "General",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/updatePassword"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "promos/listpromos",
    "title": "getListPromo",
    "description": "<p>récupère la liste des promotions</p>",
    "name": "getListPromo",
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
            "field": "promotions",
            "description": "<p>la liste des promotions</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"promotions\": [\n        {\n            \"_id\": \"5a9aa79b687a689eba75a121\",\n            \"nomPromo\": \"EBM1\",\n            \"responsable\": \"root\",\n            \"__v\": 0,\n            \"membres\": [\n                \"root\",\n                \"test\",\n                \"test2\"\n            ]\n        },\n        {\n            \"_id\": \"5a9aab5e69e4d89f0e467b23\",\n            \"nomPromo\": \"EBM2\",\n            \"responsable\": \"root\",\n            \"__v\": 0,\n            \"membres\": [\n                \"root\"\n            ]\n        },\n        {\n            \"_id\": \"5a9aab6c69e4d89f0e467b24\",\n            \"nomPromo\": \"EBM\",\n            \"responsable\": \"root\",\n            \"__v\": 0,\n            \"membres\": [\n                \"root\"\n            ]\n        }\n    ]\n}",
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
        "url": "http://localhost:3000/api/promos/listpromos"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "promos/listpromoofresponsable/:responsable",
    "title": "getListPromoByResponsable",
    "description": "<p>récupère la liste des promotions</p>",
    "name": "getListPromoByResponsable",
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
            "field": "promotions",
            "description": "<p>la liste des promotions</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"promotions\": [\n        {\n            \"_id\": \"5a9aa79b687a689eba75a121\",\n            \"nomPromo\": \"EBM1\",\n            \"responsable\": \"root\",\n            \"__v\": 0,\n            \"membres\": [\n                \"root\",\n                \"test\",\n                \"test2\"\n            ]\n        },\n        {\n            \"_id\": \"5a9aab5e69e4d89f0e467b23\",\n            \"nomPromo\": \"EBM2\",\n            \"responsable\": \"root\",\n            \"__v\": 0,\n            \"membres\": [\n                \"root\"\n            ]\n        },\n        {\n            \"_id\": \"5a9aab6c69e4d89f0e467b24\",\n            \"nomPromo\": \"EBM\",\n            \"responsable\": \"root\",\n            \"__v\": 0,\n            \"membres\": [\n                \"root\"\n            ]\n        }\n    ]\n}",
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
            "field": "resp",
            "description": "<p>responsable de la promo</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "4xx": [
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
        "url": "http://localhost:3000/api/promos/listpromoofresponsable/:responsable"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "promos/:promo",
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
            "field": "wrongPromo",
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
        "url": "http://localhost:3000/api/promos/:promo"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "listpromosof/:username",
    "title": "listPromosOf",
    "description": "<p>récupère la liste des promos dont l'utilisateur est membre</p>",
    "name": "listPromosf",
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
          "content": "{\n    \"success\": true,\n    \"promotions\": [\n        {\n            \"_id\": \"5a9aa79b687a689eba75a121\",\n            \"nomPromo\": \"EBM1\",\n            \"responsable\": \"root\",\n            \"__v\": 0,\n            \"membres\": [\n                \"root\",\n                \"test\",\n                \"test2\"\n            ]\n        },\n        {\n            \"_id\": \"5a9aab5e69e4d89f0e467b23\",\n            \"nomPromo\": \"EBM2\",\n            \"responsable\": \"root\",\n            \"__v\": 0,\n            \"membres\": [\n                \"root\"\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
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
        "url": "http://localhost:3000/api/listpromosof/:username"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "promos",
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
        "url": "http://localhost:3000/api/promos"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "put",
    "url": "promos",
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
        "url": "http://localhost:3000/api/promos"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "users/allusers",
    "title": "getAllUsers",
    "description": "<p>récupère la liste des utilisateurs</p>",
    "name": "getAllUsers",
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
        "403": [
          {
            "group": "403",
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
        "url": "http://localhost:3000/api/users/allusers"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "pictures/file/:username",
    "title": "getProfilePic",
    "description": "<p>vérifie le token d'un utilisateur</p>",
    "name": "getProfilePic",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username de l'utilisateur dont on veut récupérer la photo</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "UnknownPicture",
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
    "filename": "src/api/pictures.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/pictures/file/:username"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "users/userinfos/:username",
    "title": "getUserInfos",
    "description": "<p>récupère les informations l'utilisateur</p>",
    "name": "getUserInfos",
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
            "field": "username",
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
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nom",
            "description": "<p>nom de l'utilisateur</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "prenom",
            "description": "<p>prenom de l'utilisateur</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email de l'utilisateur</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>pseudo de l'utilisateur</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"role\": \"admin\",\n    \"nom\": \"test\",\n    \"prenom\": \"test\",\n    \"email\": \"test@ebm.fr\",\n  }",
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
        "url": "http://localhost:3000/api/users/userinfos/:username"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "users/role/:username",
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
        "url": "http://localhost:3000/api/users/role/:username"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "users/list/:role",
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
            "field": "role",
            "description": "<p>le role dont on cherche les utilisateurs</p>"
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
        "url": "http://localhost:3000/api/users/list/:role"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "users/getusersstartingwith/:name",
    "title": "getUsersStartingWith",
    "description": "<p>récupère la liste des utilisateurs dont le nom commence par</p>",
    "name": "getUsersStartingWith",
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
            "optional": false,
            "field": "name",
            "description": "<p>le début du nom des utilisateurs que l'on cherche</p>"
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
        "403": [
          {
            "group": "403",
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
        "url": "http://localhost:3000/api/users/getusersstartingwith/:name"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "pictures/upload",
    "title": "setProfilePic",
    "description": "<p>upload d'une photo de profil</p>",
    "name": "setProfilePic",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"multipart/form-data\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "    body:\n{\n     username: test,\n     file: file to upload,\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"success\": true,\n }",
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
            "field": "Wrong",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "filename": "src/api/pictures.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/pictures/upload"
      }
    ]
  }
] });
