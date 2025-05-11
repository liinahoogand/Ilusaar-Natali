<template>
    <NavBar />
    <div class="teenused-page container">
      <h1>Teenused ja hinnakiri</h1>
  
      <div class="teenused-container">
  <!-- Ilusaar -->
  <div class="provider-column">
    <h2>Ilusaar</h2>
    <div v-for="(services, category) in servicesByProvider['Ilusaar']" :key="category">
      <h3>{{ category }}</h3>
      <div v-for="service in services" :key="service._id" class="teenus-blokk">
        <h4>{{ service.nimi }}</h4>
        <p>{{ service.selgitus }}</p>
        <p><strong>Hind:</strong> {{ service.hind }}</p>
        <p><strong>Kestvus:</strong> {{ formatDuration(service.aeg) }}</p>
      </div>
    </div>
  </div>

  <!-- Natali -->
  <div class="provider-column">
    <h2>Natali</h2>
    <div v-for="(services, category) in servicesByProvider['Natali']" :key="category">
      <h3>{{ category }}</h3>
      <div v-for="service in services" :key="service._id" class="teenus-blokk">
        <h4>{{ service.nimi }}</h4>
        <p>{{ service.selgitus }}</p>
        <p><strong>Hind:</strong> {{ service.hind }}</p>
        <p><strong>Kestvus:</strong> {{ formatDuration(service.aeg) }}</p>
      </div>
    </div>
  </div>
</div>


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
    servicesByProvider: {}
  };
},
mounted() {
  fetch("http://localhost:5000/api/teenused")
    .then(res => res.json())
    .then(data => {
      const grouped = {};

      data.forEach(service => {
        const provider = service.teenusepakkuja;
        const category = service.kategooria || "Muu";

        if (!grouped[provider]) {
          grouped[provider] = {};
        }

        if (!grouped[provider][category]) {
          grouped[provider][category] = [];
        }

        grouped[provider][category].push(service);
      });

      this.servicesByProvider = grouped;
    });
},

    methods: {
      formatDuration(minutes) {
        const mins = parseInt(minutes, 10);
        if (isNaN(mins)) return "";
  
        if (mins < 60) return `${mins} min`;
  
        const hours = Math.floor(mins / 60);
        const remaining = mins % 60;
  
        if (remaining === 0) return `${hours}h`;
        return `${hours}h ${remaining}min`;
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
  .teenused-container {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  flex-wrap: wrap;
}

.provider-column {
  flex: 1 1 45%;
  max-width: 48%;
}

.teenus-blokk {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 10px;
}

  
  </style>
  