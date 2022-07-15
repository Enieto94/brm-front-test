<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>

  <Fab @on:click="createNewContacto" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  methods: {
    createNewContacto() {
      this.$router.push({ name: "contacto", params: { id: "new" } });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
