import React, { Component } from 'react';
import LoginScreen from "./LoginScreen";

class PageAccueilPerso extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="PageAccueilPerso">
                <div className="bandeau">
                    <h1>Accueil Linkapp</h1>
                </div>
                <div>
                <div>
                <ul>
                <li class="lienMenu"><a href="https://google.com">Accueil</a></li>
            <li class="lienMenu"><a href="https://google.com">Gestion des comptes</a></li>
            <li class="lienMenu"><a href="https://google.com">Gestion des groupes</a></li>
            <li class="lienMenu"><a href="https://google.com">Création du compte</a></li>
            <li class="lienMenu"><a href="https://google.com">Emploi du temps</a></li>
            </ul>
        </div>

            <div className="blocApplication">
                <a href="https://google.com"><img src="logo.svg" class="application"/></a>
                <a href="https://google.com"><img src="logo.svg" class="application"/></a>
                <a href="https://google.com"><img src="logo.svg" class="application"/></a>
                <a href="https://google.com"><img src="logo.svg" class="application"/></a>
                <a href="https://google.com"><img src="logo.svg" class="application"/></a>
                </div>
            </div>
    </div>
        );
    }

}

export default PageAccueilPerso;