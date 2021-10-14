<template>
  <div id="app">
        <router-view />
    <Toast />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
