<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar Contacto"
        v-model="term"
      />
    </div>

    <div class="mt-2 d-flex flex-column">
      <button
        class="btn btn-primary mx-3"
        @click="$router.push({ name: 'contacto', params: { id: 'new' } })"
      >
        <i class="fa fa-plus-circle"></i>
        Nuevo contacto
      </button>
    </div>

    <div class="entry-scrollarea">
      <Contacto
        v-for="contacto in contactos"
        :key="contacto.id"
        :contacto="contacto"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Contacto: defineAsyncComponent(() => import("./Contacto.vue")),
  },
  computed: {
    ...mapGetters("agenda", ["getEntriesByContacto"]),
    contactos() {
      return this.getEntriesByContacto(this.term);
    },
  },
  data() {
    return {
      term: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>
