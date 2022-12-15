<template>
  <div>
    <the-header></the-header>
    <badge-list></badge-list>
    <user-info
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"
    ></user-info>
  </div> 
</template>
 
<script>
// 1. Importiere Komponenten
import TheHeader from "./components/TheHeader.vue";
import BadgeList from "./components/BadgeList.vue";
import UserInfo from "./components/UserInfo.vue";

export default {
  components: {
    // 2. Registriere Komponente lokal
    "the-header": TheHeader,
    "badge-list": BadgeList,
    "user-info": UserInfo,
  },

  data() {
    return {
      activeUser: {
        name: 'John Miller',
        description: 'Site owner and admin',
        role: 'admin',
      },
    };
  },
};
</script>



// hier ohne style scoped sind die Styles global
<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>