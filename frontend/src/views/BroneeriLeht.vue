<template>
    <NavBar />
    <main class="app-container">
      <BroneeriVorm />
    </main>
    <AppFooter />
</template>

  <script>
  import NavBar from '@/components/NavBar.vue';
  import BroneeriVorm from '../components/BroneeriVorm.vue';
  import AppFooter from '@/components/AppFooter.vue';
  export default {
    name: 'BroneeriLeht',
    components:{
      NavBar,
      BroneeriVorm,
      AppFooter
    }
  }
  </script>
  
  <style scoped>
.app-container {
  width: 100%;
  height: 80vh; /* Täiskõrgus, et saaks vertikaalselt keskendada */
  display: flex;
  align-items: center;   /* Vertikaalne keskjoondus */
  justify-content: center; /* Horisontaalne keskjoondus */
  padding: 20px;
}

  </style>