<template>
  <div class="hero-image">
    <div class="hero-text">
      <p>Kõik</p>
      <p>ühes</p>
      <p>kohas</p>
    </div>
  </div>
</template>

  
  <script>
  export default {
    name: 'HeroImage'
  };
  </script>
  
  <style scoped>
.hero-image {
  height: 80vh;
  background-image: url('../assets/images/kodulehe-pilt-tekstiga.jpg');
  background-position: center top; /* Nihutab pilti üles */
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin-top: 7px;
}
.hero-text {
  position: absolute;
  font-family: 'Playfair Display', serif;
  top: 50%;
  left: 60%; /* Määrab kui paremal ta on – kohanda nt 25% või 30% */
  transform: translateY(-50%);
  color: white;
  font-size: 100px;
  font-weight: bold;
  text-align: left;
  line-height: 0.5;
  z-index: 2;
}
  </style>
  