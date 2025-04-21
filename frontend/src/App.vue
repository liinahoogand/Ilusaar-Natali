<template>
  <router-view />
</template>

<script setup>
// siin pole vaja midagi teha, kui ei ole lisakoodi
</script>

<style scoped>
nav {
  background: #42b983;
  padding: 1rem;
}
nav a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}
nav a.router-link-active {
  font-weight: bold;
}
main {
  padding: 2rem;
}
</style>