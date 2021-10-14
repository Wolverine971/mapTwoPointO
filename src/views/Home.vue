<template>
    <m-Nav app :myMap="myMap" class="nav"></m-Nav>
    <h1>No place like it</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mNav from "../components/mNav.vue";
export default defineComponent({
  name: 'Home',

  components: {
    mNav,
  },
});
</script>
