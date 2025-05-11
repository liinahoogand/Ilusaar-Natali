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
  export default {
    name: 'BroneeriLeht',
    components:{
      NavBar,
      BroneeriVorm
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  </style>