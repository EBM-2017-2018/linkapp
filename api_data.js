define({ "api": [
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "/signup",
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
        "url": "http://localhost:3000/api/signup"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "post",
    "url": "/signin",
    "title": "connection",
    "description": "<p>connection à la plateforme linkapp</p>",
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
        "url": "http://localhost:3000/api/signin"
      }
    ]
  },
  {
    "type": "get",
    "url": "/user/role/:username",
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
    "version": "0.0.0",
    "filename": "src/api/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/role/:username"
      }
    ]
  },
  {
    "version": "1.0.0-SNAPSHOT",
    "type": "get",
    "url": "/user/list/:role",
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
        "url": "http://localhost:3000/api/user/list/:role"
      }
    ]
  }
] });
