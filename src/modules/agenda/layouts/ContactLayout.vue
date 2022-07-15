<template>
  <Navbar />

  <div v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Espere por favor...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex">
    <div class="col-4">
      <ContactList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Navbar: defineAsyncComponent(() => import("../components/Navbar.vue")),
    ContactList: defineAsyncComponent(() =>
      import("../components/ContactList.vue")
    ),
  },
  methods: {
    ...mapActions("agenda", ["loadContactos"]),
  },
  computed: {
    ...mapState("agenda", ["isLoading"]),
  },
  created() {
    this.loadContactos();
  },
};
</script>
