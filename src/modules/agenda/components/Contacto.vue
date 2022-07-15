<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'contacto', params: { id: contacto.id } })"
  >
    <!-- Titilo -->
    <div class="entry-title d-flex"></div>

    <div class="entry-description">{{ shortText }} <br /></div>
  </div>
</template>

<script>
export default {
  props: {
    contacto: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shortText() {
      return this.contacto.nombre.length > 130
        ? this.contacto.nombre.substring(0, 130) + "..."
        : this.contacto.nombre;
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 25px;
  }
}
</style>
