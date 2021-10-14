<template>
  <AutoComplete
    v-model="text"
    :suggestions="typeaheadSuggestions"
    @complete="typedText"
    @item-select="searchText($event)"
    field="address.formattedAddress"
  >
    <template #optiongroup="slotProps">
      <div class="p-d-flex p-ai-center country-item combo">
        <div class="p-ml-2">{{ slotProps.item.address.formattedAddress }}</div>
      </div>
    </template>
  </AutoComplete>
</template>

<script lang="ts">
import AutoComplete from "primevue/autocomplete";
// import _ from "underscore";
import api from "../../api/index";
import { BingResp, BingValue, TigerResp } from "../../api/models";
export default {
  name: "searchBar",
  components: {
    AutoComplete,
  },

  data: () => ({
    text: "",
    suggestions: null,
  }),
  methods: {
    goToPlace() {},
    typedText(text: any): void {
      if (
        text &&
        text.query &&
        text.query.length >= 3
      ) {
        // http://dev.virtualearth.net/REST/v1/Locations?query=locationQuery&key=BingMapsKey

        // "https://data.census.gov/api/typeahead"
        // Lazily load input items

        //The bounds parameter defines the latitude/longitude coordinates of the southwest and northeast corners of this bounding box using a pipe (|) character to separate the coordinates.
        //need a bounds param which is |
        api
          .bingLocation(text.query)
          .then((response: BingResp) => {
            this.suggestions = response.resourceSets[0].resources[0].value;
            console.log(this.suggestions);
          })
          .catch((e) => {
            throw new Error(e);
          })

          .finally(() => (this.isLoading = false));
      }
    },
    getMicro(text: string) {
      return api
        .getTigerMicro(text)
        .then((response: TigerResp) => {
          if (response.features.length === 0) {
            return false;
          } else {
            if (response.features.length > 1) {
              let parsedGeos = response.features;
              this.$store.commit("setMultipleGeoForMap", parsedGeos);
            } else {
              let parsedGeo = response.features[0].geometry.coordinates;
              this.$store.commit("setGeoForMap", parsedGeo);
            }
            return true;
          }
        })
        .catch((e) => {
          throw new Error(e);
        })
        .finally(() => {
          this.suggestions = [];
          this.text = text;
        });
    },
    getZip(text: string) {
      return api
        .getTigerZip(text)
        .then((response: TigerResp) => {
          if (response.features.length === 0) {
            return false;
          } else {
            if (response.features.length > 1) {
              let parsedGeos = response.features;
              this.$store.commit("setMultipleGeoForMap", parsedGeos);
            } else {
              let parsedGeo = response.features[0].geometry.rings ? response.features[0].geometry.rings : response.features[0].geometry.coordinates;
              this.$store.commit("setGeoForMap", parsedGeo);
            }
            return true;
          }
        })
        .catch((e) => {
          throw new Error(e);
        })
        .finally(() => {
          this.suggestions = [];
          this.text = text;
        });
    },
    getCounty(text: string) {
      // adminDistrict: "Maryland"
      // adminDistrict2: "Anne Arundel County"
      // countryRegion: "United States"
      // countryRegionIso2: "US"
      // formattedAddress: "Glen Burnie, Maryland"
      // locality: "Glen Burnie"
      return api
        .getTigerCounty(text)
        .then((response: TigerResp) => {
          if (response.features.length === 0) {
            return false;
          } else {
            if (response.features.length > 1) {
              let parsedGeos = response.features;
              this.$store.commit("setMultipleGeoForMap", parsedGeos);
            } else {
              let parsedGeo = response.features[0].geometry.coordinates;
              this.$store.commit("setGeoForMap", parsedGeo);
            }
            return true;
          }
        })
        .catch((e) => {
          throw new Error(e);
        })
        .finally(() => {
          this.suggestions = [];
          this.text = text;
        });
    },
    getState(text: string) {
      return api
        .getTigerState(text)
        .then((response: TigerResp) => {
          let parsedGeo = response.features[0].geometry.coordinates;
          this.$store.commit("setGeoForMap", parsedGeo);
        })
        .catch((e) => {
          throw new Error(e);
        })
        .finally(() => {
          this.suggestions = [];
          this.text = text;
        });
    },

    async searchText(text: { value: BingValue }) {
      console.log(text.value);
      if (text.value.address) {
        if (text.value.address.locality) {
          // glen burnie, micro data
          let success = await this.getMicro(text.value.address.locality);
          if (!success) {
            let secondTry = await this.getZip(text.value.address.postalCode);
            if (!secondTry) {
              this.getCounty(text.value.address.adminDistrict2);
            }
          }
        } else if (text.value.address.postalCode) {
          // zip code 21061
          this.getZip(text.value.address.postalCode);
        } else if (text.value.address.adminDistrict2) {
          // anne arundel county
          this.getCounty(text.value.address.adminDistrict2);
        } else {
          // full address
          this.getState(text.value.address.formattedAddress);
        }
      }
    },
  },
  computed: {
    typeaheadSuggestions(): any[] {
      console.log(this.suggestions);
      return this.suggestions;
    },
  },
  watch: {},
};
</script>
<style lang="css">
.combo {
  z-index: 800;
}
.p-autocomplete-items {
  background-color: white;
}
.p-autocomplete-item:hover {
  background-color: rgba(170, 164, 164, 0.411);
}
</style>
