function truncateName(name) {
    if (name.length > 12) {
        // Si el nombre tiene más de 12 caracteres, truncar y agregar tres puntos suspensivos
        return name.slice(0, 9) + "...";
    } else if ((name.match(/m/g) || []).length > 2) {
        // Si el nombre tiene más de dos caracteres "m", truncar y agregar tres puntos suspensivos
        return name.slice(0, 8) + "...";
    } else {
        return name;
    }
}

function truncateLocation(location) {
    if (location.length > 16) {
        // Si la ubicación tiene más de 14 caracteres, truncar y agregar tres puntos suspensivos a partir del carácter 13
        return location.slice(0, 12) + "...";
    } else {
        return location;
    }
}

function getCharacterData(characterId, containerId) {
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            const statusCircleClass = getStatusCircleClass(data.status);
            const truncatedName = truncateName(data.name);
            const truncatedLocation = truncateLocation(data.location.name)
            
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
        })
        .catch(error => {
            console.error(`Error al cargar los datos del personaje ${characterId}: ${error}`);
        });
}

// Obtener la clase de círculo según el estado del personaje
function getStatusCircleClass(status) {
    if (status === "Alive") {
        return "alive";
    } else if (status === "Dead") {
        return "dead";
    } else {
        return "unknown";
    }
}

// Obtener datos de tres personajes y mostrarlos
getCharacterData(1, "character-list");
getCharacterData(2, "character-list");
getCharacterData(3, "character-list");