<template>
    <NavBar />
    <div class="teenused-page container">
      <h1>Teenused ja hinnakiri</h1>
  
      <!-- Ilusaar teenused -->
      <section>
        <h2>Ilusaar</h2>
        <div v-for="service in ilusaarServices" :key="service.id" :id="service.id" class="teenus-blokk">
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <p><strong>Hind:</strong> {{ service.price }}</p>
          <p><strong>Kestvus:</strong> {{ service.duration }}</p>
        </div>
      </section>
  
      <!-- Natali teenused -->
      <section>
        <h2>Natali</h2>
        <div v-for="service in nataliServices" :key="service.id" :id="service.id" class="teenus-blokk">
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <p><strong>Hind:</strong> {{ service.price }}</p>
          <p><strong>Kestvus:</strong> {{ service.duration }}</p>
        </div>
      </section>
    </div>
    <AppFooter />
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import AppFooter from '@/components/AppFooter.vue';
  export default {
    name: "TeenusedView",
    components: {
      NavBar,
      AppFooter
    },
    data() {
      return {
        ilusaarServices: [
          {
            id: "manikuur",
            title: "Maniküür/pediküür",
            description: "Kaunista oma käed ja jalad professionaalse hooldusega...",
            price: "25 €",
            duration: "45 min"
          },
          {
            id: "geelkuuned",
            title: "Geelküüned",
            description: "Stiilsed ja vastupidavad geelküüned...",
            price: "35 €",
            duration: "1h 15min"
          },
          // Lisa teised ...
        ],
        nataliServices: [
          {
            id: "soengud",
            title: "Soengud",
            description: "Leia endale uus soeng, mis toob esile sinu parimad jooned...",
            price: "30 €",
            duration: "1h"
          },
          {
            id: "loikused",
            title: "Lõikused",
            description: "Pakume erinevaid lõikuseid vastavalt sinu soovile...",
            price: "25 €",
            duration: "45 min"
          },
          // Lisa teised ...
        ]
      };
    },
    mounted() {
      // Scrolli ankrule, kui URL-is on hash (#soengud jne)
      const hash = this.$route.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 300); // veidi ootamist, et DOM laeks
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
    padding: 2rem;
  }
  .teenus-blokk {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 10px;
  }
  </style>
  