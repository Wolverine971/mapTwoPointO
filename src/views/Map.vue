<template>
  <div style="">
    <m-Nav app :myMap="myMap" class="nav"></m-Nav>
    <div class="pa-5" flat id="mapid"></div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mNav from "../components/mNav.vue";
import L from "leaflet";
// import _ from 'lodash'
export default {
  name: "Map",
  components: {
    mNav,
  },
  data() {
    return {
      myMap: null,
      access_token: process.env.VUE_APP_MAPBOX_KEY,
      center: [-76.64707427613129, 39.13486154818506],
      leafletCenter: [39.13486154818506, -76.64707427613129]
    };
  },
  computed: {
    currentGeo () {
      return this.$store.getters.currentGeo
    },
    newGeoNum () {
      return this.$store.getters.newGeoNum
    },
    newMultiGeoNum () {
      return this.$store.getters.newMultiGeoNum
    },
    newMultiGeo () {
      return this.$store.getters.newMultiGeo
    }
  },
  methods: {
    async createMapBoxMap() {
      try {
        mapboxgl.accessToken = this.access_token;
        this.myMap = new mapboxgl.Map({
          container: "mapid",
          style: "mapbox://styles/mapbox/streets-v11",
          center: this.center,
          zoom: 15,
        });
        this.myMap.on("load", () => {
          this.myMap.addLayer({
            id: "rpd_parks",
            type: "fill",
            source: {
              type: "vector",
              url: "mapbox://mapbox.3o7ubwm8",
            },
            "source-layer": "RPD_Parks",
          });
          this.myMap.on("click", this.getLatLong);
        });
      } catch (err) {
        console.log("map error", err);
      }
    },
    async createLeafletMap() {
      this.myMap = L.map("mapid", {
        center: this.leafletCenter,
        zoom: 10,
      });
      this.addToLeafletDark()
    },
    addToLeafletDark(){
      L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox/dark-v10", //"mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: this.access_token
      }
    ).addTo(this.myMap);
    },
    addToLeafletMap() {
      const newMap = {
        version: 8,
        name: "Mapbox Country Boundaries tileset v1",
        sources: {
          "country-boundaries": {
            type: "vector",
            url: "mapbox://mapbox.country-boundaries-v1",
          },
        },
        layers: [
          {
            id: "undisputed country boundary fill",
            source: "country-boundaries",
            "source-layer": "country_boundaries",
            type: "fill",
            filter: ["==", ["get", "disputed"], "false"],
            paint: {
              "fill-color": "rgba(66,100,251, 0.3)",
              "fill-outline-color": "#0000ff",
            },
          },
          {
            id: "disputed area boundary fill",
            source: "country-boundaries",
            "source-layer": "country_boundaries",
            type: "fill",
            filter: ["==", ["get", "disputed"], "true"],
            paint: {
              "fill-color": "rgba(200,100,251, 0.3)",
              "fill-outline-color": "#ff0000",
            },
          },
        ],
      };
      L.tileLayer(newMap).addTo(this.myMap);
    },

    renderMap: function () {
    },
    getLatLong(e) {
      console.log(e.lngLat);
    },
    goToPlace(req) {
      var line = L.polygon(req, { color: "red" }).addTo(this.myMap);
      this.myMap.fitBounds(line.getBounds());
    },
    recurseArr(newArr) {
      return newArr.map((item) => {
        if (item.length === 2) {
          return item.reverse();
        } else {
          return this.recurseArr(item);
        }
      });
    },
    setGeo() {
      let recurrsedGeo = this.recurseArr(this.currentGeo);
      // this.floridaPoly
      var line = L.polygon(recurrsedGeo, { color: "red" }).addTo(this.myMap);
      // var circle = this.myMap.circle( center, { renderer: myRenderer } );
      this.myMap.flyToBounds(line.getBounds());
    },
    setMultiGeo() {
      let polys = [];
      this.newMultiGeo.forEach(feature=>{
        let geoCords = this.recurseArr(feature.geometry.coordinates)// this.recurseArr(geo.geometry.coordinates);
        let poly = L.polygon(geoCords, { color: "blue" }).addTo(
          this.myMap
        );
        polys.push(poly);

      })
      this.myMap.flyToBounds(polys[0].getBounds())
    },
  },
  async mounted() {
    this.createLeafletMap();

  },
  watch: {
    newGeoNum(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setGeo();
      }
    },
    newMultiGeo(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setMultiGeo();
      }
    },
  },
};
</script>
<style>
#mapid {
  height: 600px;
}
.leaflet-pane {
  position: relative !important;
}
</style>
