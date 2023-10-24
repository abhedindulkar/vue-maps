<template>
    <div class="map-wrap">
      <div class="map" ref="mapContainer"></div>
    </div>
</template>
  
  <script setup>
  import { Map, MapStyle, Marker, Popup, config } from '@maptiler/sdk';
  import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
  import '@maptiler/sdk/dist/maptiler-sdk.css';
  
  const mapContainer = shallowRef(null);
  const map = shallowRef(null);
  
  onMounted(() => { 

    console.log('map.vue')
    config.apiKey = 'ETtbOYrjEsqV6Zb1ONpk';
  
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
  
    map.value = markRaw(new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    }));

    var popup = new Popup({ offset: 25 }).setText(
        'Construction on the Washington Monument began in 1848.'
    );

    new Marker({color: "#FF0000"})
        .setPopup(popup)
        .setLngLat([139.7525,35.6846])
        .addTo(map.value);
  }),

  onUnmounted(() => {
    map.value?.remove();
  })
  </script>
  
  <style lang="css" scoped src="../../src/assets/map.css"></style>