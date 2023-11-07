document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const characters = [];
    let initialLoad = true; // Bandera para el primer cargamento
    const loadMoreButton = document.getElementById("load-more");
    loadMoreButton.addEventListener("click", () => {
        if (initialLoad) {
            initialLoad = false;
            getCharacterData(1, "character-list");
            getCharacterData(2, "character-list");
            getCharacterData(3, "character-list");
        } else {
            loadMoreCharacters();
        }
    });

    function truncateName(name) {
        if (name.length > 12) {
            return name.slice(0, 9) + "...";
        } else if ((name.match(/m/g) || []).length > 2) {
            return name.slice(0, 8) + "...";
        } else {
            return name;
        }
    }

    function truncateLocation(location) {
        if (location.length > 16) {
            return location.slice(0, 12) + "...";
        } else {
            return location;
        }
    }

    function truncateSpecies(species) {
        if (species.length > 6) {
            return species.slice(0, 4) + "...";
        } else {
            return species;
        }
    }

    function getStatusCircleClass(status) {
        if (status === "Alive") {
            return "alive";
        } else if (status === "Dead") {
            return "dead";
        } else {
            return "unknown";
        }
    }

    function loadMoreCharacters() {
        fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("character-list");
    
                data.results.forEach(character => {
                    if (!characters.some(char => char.id === character.id)) {
                        // Verifica si el personaje ya existe en el array antes de agregarlo
                        characters.push(character);
                        const statusCircleClass = getStatusCircleClass(character.status);
                        const truncatedName = truncateName(character.name);
                        const truncatedLocation = truncateLocation(character.location.name);
                        const truncatedSpecies = truncateSpecies(character.species)
    
                        container.innerHTML += `
                            <div class="character">
                                <img src="${character.image}" alt="${character.name}">
                                <h2>${truncatedName}</h2>
                                <div class="text-container">
                                    <div class="alive-container">
                                        <div class="status-circle ${statusCircleClass}"></div>
                                        <p>${character.status} - ${truncatedSpecies}</p>
                                    </div>
                                    <div class="location-container">
                                        <img class="icon-location" src="./assets/619.png" />
                                        <p>${truncatedLocation}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                });
    
                currentPage++; // Aumenta la página actual
            })
            .catch(error => {
                console.error(`Error al cargar los personajes: ${error}`);
            });
    }


    function getCharacterData(characterId, containerId) {
        fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById(containerId);
                const statusCircleClass = getStatusCircleClass(data.status);
                const truncatedName = truncateName(data.name);
                const truncatedLocation = truncateLocation(data.location.name);
                const truncatedSpecies = truncateSpecies(data.species)
    
                // Verifica si el personaje ya existe en el array antes de agregarlo
                if (!characters.some(char => char.id === data.id)) {
                    characters.push(data);
    
                    container.innerHTML += `
                        <div class="character">
                            <img src="${data.image}" alt="${data.name}">
                            <h2>${truncatedName}</h2>
                            <div class="text-container">
                                <div class="alive-container">
                                    <div class="status-circle ${statusCircleClass}"></div>
                                    <p>${data.status} - ${truncatedSpecies}</p>
                                </div>
                                <div class="location-container">
                                    <img class="icon-location" src="./assets/619.png" />
                                    <p>${truncatedLocation}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.error(`Error al cargar los datos del personaje ${characterId}: ${error}`);
            });
    }

    const screenWidth = window.innerWidth;

    // Cargar 3 o 6 personajes inicialmente según el ancho de la pantalla
    if (screenWidth > 993) {
        // Si la pantalla es más ancha que 1200px, carga 6 personajes
        for (let i = 1; i <= 6; i++) {
            getCharacterData(i, "character-list");
        }
    } else {
        // Si la pantalla es más estrecha o igual a 1200px, carga 3 personajes
        for (let i = 1; i <= 3; i++) {
            getCharacterData(i, "character-list");
        }
    }
});