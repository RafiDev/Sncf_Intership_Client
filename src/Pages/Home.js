import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <h2>Objectif du Stage</h2>
                <p>
                    A partir des différents services de la SNCF (Rexmat/PUMA/Osmose), on peut recuperer
                    une extraction des données sous format .xls. De ces formats on peut depuis ce client
                    web envoyer toutes ces donnés au server, qui lui va travailler avec, afin de les renvoyer
                    au client sous un objet pour pouvoir créer des visuels, mais aussi les enregister 
                    sur une base de données NoSQL (mongoDB). A partir de la base de données, on peut aussi créer
                    des visuels sur Power BI.         
                </p>
                <br/>
                <h2>Mode d'emploi</h2>
                <h3>Rexmat</h3>
                <p>
                    Sélectionner la durée (choix entre semaine et mois),
                    ensuite sur le calendrier rentrer la date d'entrée et la date de fin.
                    Choisir le ficher voulu en fonction de la durée choisie précédement.
                    Pour finir cliquer sur "upload". Patienter quelque secondes puis observer
                    les graphiques du fichier passé en paramètre. Pour pouvoir charger les données
                    de l'extraction sur Power BI, cliquer sur "create JSON file".
                </p>
                <br/>
                <h3>Puma</h3>
                <p>
                    Mode d'emploi à venir.
                </p>
            </div>
        )
    }
}

export default Home