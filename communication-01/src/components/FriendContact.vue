<!-- Hier steht unser Template für unsere Komponente -->
<template>
  <li>
    <h2>{{ name }} {{ isFavorite ? ' **Favorite**' : '' }}</h2>
    <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show' }} Details</button>
    <button @click="toggleFavorite">Toggle Favorite</button>
    <button @click="deleteFriend">Delete</button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phoneNumber }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ emailAddress }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {

  emits: [
    'toggle-favorite',
    'delete-friend'
  ],
  // props können als array angegeben werden
  // props: ['name','phoneNumber','emailAddress','isFavorite'],

  // props können als Objekte mit speziellen Eigenschaften angegeben werden
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
      // Es kann auch ein validator angegeben werden
      // hier wird einfach überprüft, ob '1' oder '0' übergeben wurde
      validator: function (value) {
        return value === '1' || value === '0';
      }
    }
  },

  // created() 
  // wird aufgerufen nach der Erstellung der Komponente
  // Kann für Initalisierungen verwendet werden
  created() {
    this.isMyFavorite = this.isFavorite === '1';
    console.log('created : ' + this.phoneNumber);
  },

  data() {
    return {
      detailsAreVisible: false,
      isMyFavorite: false,
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
      console.log(this.phoneNumber);
    },
    toggleFavorite() {
      this.$emit('toggle-favorite', this.id);
    },
    deleteFriend() {
      this.$emit('delete-friend', this.id);
    }
  }
};
</script>