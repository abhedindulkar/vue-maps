<template>
    <div id="map"></div>
    <div class="overlay" id="info">
    <h2>US population density</h2>
    <div id="pd"><p>Hover over a state!</p></div>
    </div>
    <div id="legend" class="overlay">
    <h4>population density</h4>
    <div>
        <span style="background-color: #FFEDA0"></span>
        <span style="background-color: #FED976"></span>
        <span style="background-color: #FEB24C"></span>
        <span style="background-color: #FD8D3C"></span>
        <span style="background-color: #FC4E2A"></span>
        <span style="background-color: #E31A1C"></span>
        <span style="background-color: #BD0026"></span>
        <span style="background-color: #800026"></span>
    </div>
    <div class="labels">
        <label>0</label>
        <label>10</label>
        <label>20</label>
        <label>50</label>
        <label>100</label>
        <label>200</label>
        <label>500</label>
        <label>1000</label>
    </div>
</div>
</template>
<style lang="css" scoped src="../../src/assets/polygon.css"></style>
<script setup>
    import { Map, MapStyle, Marker, Popup, config } from '@maptiler/sdk';
    import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
    import '@maptiler/sdk/dist/maptiler-sdk.css';
    
    config.apiKey = 'ETtbOYrjEsqV6Zb1ONpk';
    
    onMounted(() => {
        
        var map = new Map({
            container: 'map',
            style: MapStyle.DATAVIZ.LIGHT,
            center: [-100.486052, 37.830348],
            zoom: 3
        });

        var hoveredStateId = null;

        map.on('load', function () {
            map.addSource('states', {
                'type': 'geojson',
                'data':
                    'https://docs.maptiler.com/sdk-js/assets/us_states.geojson'
            });

            // The feature-state dependent fill-opacity expression will render the hover effect
            // when a feature's hover state is set to true.
            map.addLayer({
                'id': 'state-fills',
                'type': 'fill',
                'source': 'states',
                'layout': {},
                'paint': {
                    'fill-color': ["step",
                        ["get", "DENSITY"],
                        "#FFEDA0", 10,
                        "#FED976", 20,
                        "#FEB24C", 50,
                        "#FD8D3C", 100,
                        "#FC4E2A", 200,
                        "#E31A1C", 500,
                        "#BD0026", 1000,
                        "#800026"
                    ],
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        1,
                        0.8
                    ],
                    'fill-outline-color': "rgba(255, 255, 255, 0)"
                }
            });

            map.addLayer({
                'id': 'state-borders',
                'type': 'line',
                'source': 'states',
                'layout': {},
                'paint': {
                    'line-color': '#FFFFFF',
                    'line-width': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        3,
                        1
                    ],
                }
            });

            // When the user moves their mouse over the state-fill layer, we'll update the
            // feature state for the feature under the mouse.
            map.on('mousemove', 'state-fills', function (e) {
                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState(
                            { source: 'states', id: hoveredStateId },
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState(
                        { source: 'states', id: hoveredStateId },
                        { hover: true }
                    );
                }
                document.getElementById('pd').innerHTML = `<h3>${e.features[0].properties.STATE_NAME}</h3>
                <p><strong><em>${e.features[0].properties.DENSITY}</strong> people per square mile</em></p>`;
            });

            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            map.on('mouseleave', 'state-fills', function () {
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: 'states', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
                document.getElementById('pd').innerHTML = `<p>Hover over a state!</p>`;
            });
        })
    });

    
</script>