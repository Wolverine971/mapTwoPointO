<template>
  <div>
    <div class="layout-topbar">
      <h1>{{title}}</h1>
      <router-link to="/" class="layout-topbar-logo"> Home </router-link> | 
      <router-link to="/map" class="layout-topbar-logo">Map </router-link>
      <search-Bar></search-Bar>


      <Button type="button" label="Go To" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"/>

      <Menu :model="itemz" id="overlay_menu" ref="menu" :popup="true">
          <template #item="{item}" @click="handleNavClick(item.title)">
              <button class="p-link layout-topbar-button" @click="handleNavClick(item.title)">{{item.title}}</button>
          </template>
      </Menu>
    </div>

  </div>
</template>
<script lang="ts">
import searchBar from "./searchBar.vue";
import Menu from 'primevue/menu';

// import L from "leaflet";
const L = require('leaflet');
export default {
  props: ["myMap"],
  components: {
    searchBar,
    Menu
  },
  data() {
    return {
      items: [
        { title: "Home", icon: "list", type: "home" },
        { title: "Map", icon: "map" },
        //   { title: 'About', icon: 'question_answer' },
        { title: "Reston", icon: "home", type: "map" },
        { title: "Mike's House", icon: "home", type: "map" },
        { title: "My House", icon: "home", type: "map" },
        { title: "Colorado Square", icon: "map", type: "map" },
      ],
      // https://tigerweb.geo.census.gov/arcgis/sdk/rest/index.html#/Query_Map_Service_Layer/02ss0000000r000000/
      // http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/40
      
    };
  },
  methods: {
    toggle(event: any){
      this.$refs.menu.toggle(event);
    },
    handleNavClick(title: string) {
      switch (title) {
        case "home":
          this.$router.push("/");
          break;
        case "Map":
          this.$router.push("/map");
          break;
        case "Reston":
          this.$router.push("/map");
          this.handleReston();
          break;
        case "Mike's House":
          this.$router.push("/map");
          this.handleMike();
          break;
        case "My House":
          this.$router.push("/map");
          this.handleMyHouse();
          break;
        case "Colorado Square":
          this.$router.push("/map");
          this.handleColorado();
          break;
        default:
          alert("dont know that one chief");
      }
    },
    recurseArr(newArr: any[]) {
      newArr.forEach((item) => {
        if (item.length === 2) {
          return item.reverse();
        } else {
          this.recurseArr(item);
        }
      });
    },
    handleMike() {
      // {lat: 39.135652755862196, lng: -76.64625871421225}
      this.myMap.panTo({ lon: -76.64625871421225, lat: 39.135652755862196 });
      this.myMap.zoomIn(11, { animate: true });
    },
    handleMyHouse() {
      this.myMap.panTo({ lon: -77.1525790916042, lat: 39.02720626044225 });
      this.myMap.zoomIn(11, { animate: true });
    },
    handleReston() {
      // {lat: 38.95885734141066, lng: -77.35224982404915}
      this.myMap.panTo({ lon: -77.35224982404915, lat: 38.95885734141066 });
      this.myMap.zoomIn(11, { animate: true });
    },
    handleColorado() {
      // create a red polygon from an array of LatLng points
      var latlngs = [
        [37, -109.05],
        [41, -109.03],
        [41, -102.05],
        [37, -102.04],
      ];
      var polygon = L.polygon(latlngs, { color: "red" }).addTo(this.myMap);
      // zoom the map to the polygon
      this.myMap.fitBounds(polygon.getBounds());
    },
  },
  computed: {
    itemz() {
      let itemzz = this.items.filter((item: any) => {
        if (
          (item.type !== "map" && !this.myMap) ||
          (item.type === "map" && this.myMap)
        ) {
          return item;
        }
      });
      return itemzz;
    },
    title() {
      if (this.myMap) {
        return "MAP";
      } else {
        return "Home";
      }
    },
  },
};
</script>
<style>
#nav {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active {
  animation: go 2s;
}
</style>
