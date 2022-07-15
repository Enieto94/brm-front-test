<template>
  <template v-if="contacto">
    <div class="entry-title d-flex justify-content-between p-2">
      <div></div>

      <div>
        <input
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
        />

        <button
          v-if="contacto.id"
          class="btn btn-danger mx-2"
          @click="onDeleteContacto"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary" @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <label for="">Nombre</label>
      <textarea
        v-model="contacto.nombre"
        placeholder="Ingrese su nombre"
      ></textarea>
      <label for="">Fecha de nacimiento</label>
      <input
        type="date"
        v-model="contacto.date"
        placeholder="Ingrese su fecha de nacimiento"
      />
      <label for="">Telefono</label>
      <textarea
        v-model="contacto.telefono"
        placeholder="Ingrese su telefono"
      ></textarea>
      <label for="">Direccion</label>
      <textarea
        v-model="contacto.direccion"
        placeholder="Ingrese su dirección"
      ></textarea>
      <label for="">Correo</label>
      <textarea
        v-model="contacto.correo"
        placeholder="Ingrese su correo electrónico"
      ></textarea>
    </div>

    <img
      v-if="contacto.picture && !localImage"
      :src="contacto.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />

    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>

  <Fab icon="fa-save" @on:click="saveContacto" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex"; // computed!!!
import Swal from "sweetalert2";

import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },

  data() {
    return {
      contacto: null,
      localImage: null,
      file: null,
    };
  },

  computed: {
    ...mapGetters("agenda", ["getContactoById"]),
  },

  methods: {
    ...mapActions("agenda", [
      "updateContacto",
      "createContacto",
      "deleteContacto",
    ]),

    loadContacto() {
      let contacto;

      if (this.id === "new") {
        contacto = {
          text: "",
          date: "",
        };
      } else {
        contacto = this.getContactoById(this.id);
        if (!contacto) return this.$router.push({ name: "no-entry" });
      }

      this.contacto = contacto;
    },
    async saveContacto() {
      new Swal({
        title: "Espere por favor",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const picture = await uploadImage(this.file);

      this.contacto.picture = picture;

      if (this.contacto.id) {
        // Actualizar
        await this.updateContacto(this.contacto);
      } else {
        // Crear una nueva entrada
        const id = await this.createContacto(this.contacto);
        this.$router.push({ name: "contacto", params: { id } });
      }

      this.file = null;
      Swal.fire("Guardado", "Entrada registrada con éxito", "success");
    },
    async onDeleteContacto() {
      const { isConfirmed } = await Swal.fire({
        title: "¿Está seguro?",
        text: "Una vez borrado, no se puede recuperar",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });

      if (isConfirmed) {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteContacto(this.contacto.id);
        this.$router.push({ name: "no-entry" });

        Swal.fire("Eliminado", "", "success");
      }
    },

    onSelectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }

      this.file = file;

      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
    },
  },

  created() {
    // console.log(this.$route.params.id)
    this.loadContacto();
  },

  watch: {
    id() {
      this.loadContacto();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: auto;
  border: solid 1px #000;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
