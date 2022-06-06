let asteroid = [];
// Création d'un tableau vide qui va par la suite contenir les résultats de la requête 
var select = document.querySelector('select');

const URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=ABcELdggKuECdSgLEkq7ZBLqIMCySovNCvvNooKR';
fetch(URL).then( response => { 
// fetch() est une méthode qui procure un moyen facile et logique de récupérer des ressources à travers le réseau de manière asynchrone.
    return response.json(); 
    // on précise que l'on souhaite une réponse de type JSON
}).then( data => {
    asteroid = data;
    // On attribue les données au tableau
    // console.log(asteroid); (vérification)
    chargerMenu(asteroid);
    afficherInformationsAsteroides(asteroid);
    afficherInformationsAsteroides2(asteroid);
});

function chargerMenu(parametre){
// Fonction qui va nous permettre de rajouter le nom de tous les astéroïdes dans le select sous forme de <option>, on obtient donc notre liste déroulante
    for (i= 0; i < parametre['near_earth_objects'].length; i++){
            var listeOption = document.createElement('option');
            listeOption.setAttribute("value", i);
            listeOption.setAttribute("class", "listeAsteroide");
            listeOption.textContent = parametre['near_earth_objects'][i].name_limited;
            select.appendChild(listeOption);
    }
}

function $_GET(param) {
// Fonction qui va nous permettre de récupérer un élément (param) dans l'url (équivalent du $_GET de php)
// Fonction trouvée sur internet : https://www.creativejuiz.fr/blog/javascript/recuperer-parametres-get-url-javascript
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace( 
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );
    if ( param ) {
        return vars[param] ? vars[param] : null;    
    }
    return vars;
}

function afficherInformationsAsteroides(parametre2){
// Fonction qui va nous permettre d'afficher les informations d'un astéroïde, en récupérant les éléments du HTML et en y injectant les valeurs, que l'on récupère dans des variables
// Ce sont les informations du premier bloc, (informations générales) qui seront affichés
    var asteroidID = $_GET("asteroide");
    let asteroidNom = parametre2['near_earth_objects'][asteroidID].name_limited;
    let asteroidNomComplet = parametre2['near_earth_objects'][asteroidID].name;
    let magnitude = parametre2['near_earth_objects'][asteroidID].absolute_magnitude_h;
    let diametreMax = parametre2['near_earth_objects'][asteroidID].estimated_diameter.kilometers.estimated_diameter_max;
    let diametreMin = parametre2['near_earth_objects'][asteroidID].estimated_diameter.kilometers.estimated_diameter_min;
    let hasardeuse = parametre2['near_earth_objects'][asteroidID].is_potentially_hazardous_asteroid;
    let sentry = parametre2['near_earth_objects'][asteroidID].is_sentry_object;
    
    document.getElementById("nomAsteroide").innerHTML = asteroidNom;
    document.getElementById("nomAsteroide2").innerHTML = asteroidNom;
    document.getElementById("nomAsteroideComplet").innerHTML = asteroidNomComplet;
    document.getElementById("magnitudeAbsolue").innerHTML = magnitude;
    document.getElementById("diametreEstimeMin").innerHTML = "Diamètre min : " + diametreMin + " km";
    document.getElementById("diametreEstimeMax").innerHTML = "Diamètre max : " + diametreMax + " km";
    document.getElementById("trajectoire").innerHTML = hasardeuse ? "Oui" : "Non";
    document.getElementById("sentry").innerHTML = sentry ? "Répertorié" : "Non répertorié";
    
}

function swappDate(date) {
// Fonction qui permet d'afficher la date dans "l'ordre" français
    var dateOld = date.split(" ");
    return dateOld[0].split("-").reverse().join("-") + " " + dateOld[1];

}

function afficherInformationsAsteroides2(parametre3){
// Fonction qui va nous permettre d'afficher les informations d'un astéroïde, en récupérant les éléments du HTML et en y injectant les valeurs, que l'on récupère dans des variables
// Ce sont les informations du deuxième bloc, (informations techniques) qui seront affichés

    var asteroidID2 = $_GET("asteroide");
    for(j=0; j<parametre3['near_earth_objects'][asteroidID2].close_approach_data.length; j++){

        var ligneTableau = document.createElement('tr');
        var colonne1 = document.createElement('td');
        var colonne2 = document.createElement('td');
        var colonne3 = document.createElement('td');
        var colonne4 = document.createElement('td');
        var tableBody = document.querySelector('.infos2');

        var dateFull = parametre3['near_earth_objects'][asteroidID2]['close_approach_data'][j].close_approach_date_full;
        var dateFr = swappDate(dateFull)
        colonne1.textContent = dateFr;
        colonne2.textContent = parametre3['near_earth_objects'][asteroidID2]['close_approach_data'][j].miss_distance.kilometers + " km";
        colonne3.textContent = parametre3['near_earth_objects'][asteroidID2]['close_approach_data'][j].relative_velocity.kilometers_per_hour + " km/h";
        colonne4.textContent = parametre3['near_earth_objects'][asteroidID2]['close_approach_data'][j].orbiting_body;

        ligneTableau.appendChild(colonne1);
        ligneTableau.appendChild(colonne2);
        ligneTableau.appendChild(colonne3);
        ligneTableau.appendChild(colonne4);
        tableBody.appendChild(ligneTableau);

    }
}

// function deroulerMenu() {
//     document.getElementById('asteroide').click();
// }

function chercherAsteroide() {
// Fonction qui va nous permettre de rechercher un astéroïde via son nom (les éléments de la liste qui ne comporteront pas l'occurence tapée en barre de recherche ne seront plus visibles)
// Après avoir tapé la recherche dans la barre, il faudra cliquer sur la liste pour afficher les éléments de la recherche

    let input = document.getElementById('recherche').value 
    input = input.toLowerCase();
    // deroulerMenu();
    let listeAsteroides = document.getElementsByClassName('listeAsteroide');
    

    for (i = 0; i < listeAsteroides.length; i++) { 
        if (!listeAsteroides[i].innerHTML.toLowerCase().includes(input)) {
            listeAsteroides[i].style.display="none";
        }
        else {
            listeAsteroides[i].style.display="list-item";                 
        }
    
    }
}