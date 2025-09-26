mapboxgl.accessToken = 'pk.eyJ1IjoieGtvcHJkYW0iLCJhIjoiY2xwazhrMHZlMDhzeTJqbGI4anJ0N3J3eiJ9.sOpo9J1oI_Sw848wxx7x4w';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [30.712481, 46.482952],
    zoom: 4
});

function createFeature(data) {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: data.coordinates
        },
        properties: {
            title: data.title,
            description: data.description
        }
    };
}

async function getDataFromJsonFile(filePath) {
    // Fetch the data from the JSON file
    const response = await fetch(filePath);

    // Parse the JSON data
    const data = await response.json();

    // Map the data to GeoJSON features
    const features = data.images.map(item => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: item.coordinates,
        },
        properties: {
            title: item.name,
            description: item.description,
            timestamp: item.timestamp,
            url: item.url,
        }
    }));
    // console.log(features);
    // Return the features as a FeatureCollection
    return {
        type: 'FeatureCollection',
        features: features
    };
}

getDataFromJsonFile('../data/images.json')
    .then(geojson => {
        // You can now use the geojson data
        console.log(geojson);

        // add markers to map
        for (const feature of geojson.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';

            console.log(feature.properties.url);
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(
                            `<h3>${feature.properties.title}</h3>
                            <p>${feature.properties.timestamp}</p>
                            <p>${feature.properties.description}</p>
                            <img src=".${feature.properties.url}" alt="${feature.properties.description}">`
                        )
                )
                .addTo(map);
        }
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });



// const start = [19.042228, 49.208735];
//
// // create a function to make a directions request
// async function getRoute(end) {
//     // make a directions request using cycling profile
//     // an arbitrary start will always be the same
//     // only the end or destination will change
//     const query = await fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}`,
//         { method: 'GET' }
//     );
//     const json = await query.json();
//     const data = json.routes[0];
//     const route = data.geometry.coordinates;
//     const geojson = {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//             type: 'LineString',
//             coordinates: route
//         }
//     };
//     // if the route already exists on the map, we'll reset it using setData
//     if (map.getSource('route')) {
//         map.getSource('route').setData(geojson);
//     }
//     // otherwise, we'll make a new request
//     else {
//         map.addLayer({
//             id: 'route',
//             type: 'line',
//             source: {
//                 type: 'geojson',
//                 data: geojson
//             },
//             layout: {
//                 'line-join': 'round',
//                 'line-cap': 'round'
//             },
//             paint: {
//                 'line-color': '#3887be',
//                 'line-width': 5,
//                 'line-opacity': 0.75
//             }
//         });
//     }
//     // add turn instructions here at the end
// }
//
// map.on('load', () => {
//     // make an initial directions request that
//     // starts and ends at the same location
//     getRoute([19.06804073732161, 49.231647322370634]);
//
//     // Add starting point to the map
//     map.addLayer({
//         id: 'point',
//         type: 'circle',
//         source: {
//             type: 'geojson',
//             data: {
//                 type: 'FeatureCollection',
//                 features: [
//                     {
//                         type: 'Feature',
//                         properties: {},
//                         geometry: {
//                             type: 'Point',
//                             coordinates: start
//                         }
//                     }
//                 ]
//             }
//         },
//         paint: {
//             'circle-radius': 10,
//             'circle-color': '#3887be'
//         }
//     });
//     // this is where the code from the next step will go
// });

