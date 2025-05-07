<template>
    <div class="hero-image"></div>
</template>
  
  <script>
  export default {
    name: 'HeroImage'
  };
  </script>
  
  <style scoped>
  .hero-image {
    height: 70vh;
    background-image:
    url('../assets/images/kodulehe-pilt-tekstiga.png'); /* Muuda vastavalt pildile */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    margin-top: 30px;
  }
  </style>
  