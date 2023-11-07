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
        if (species.length > 8) {
            return species.slice(0, 6) + "...";
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
    
                        container.innerHTML += `
                            <div class="character">
                                <img src="${character.image}" alt="${character.name}">
                                <h2>${truncatedName}</h2>
                                <div class="text-container">
                                    <div class="alive-container">
                                        <div class="status-circle ${statusCircleClass}"></div>
                                        <p>${character.status} - ${character.species}</p>
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
                                    <p>${data.status} - ${data.species}</p>
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

    getCharacterData(1, "character-list");
    getCharacterData(2, "character-list");
    getCharacterData(3, "character-list");
});