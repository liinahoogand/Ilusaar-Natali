<template>
  <NavBar />
  <div class="teenused-page container">
    <h1>Teenused ja hinnakiri</h1>

    <div class="teenused-container">
      <!-- Teenusepakkujad kõrvuti -->
      <div
        v-for="(categories, provider) in servicesByProvider"
        :key="provider"
        class="provider-column"
      >
        <h2>{{ provider }}</h2>

        <!-- Kategooriad -->
        <div
          v-for="(services, category) in categories"
          :key="category"
          class="kategooria-blokk"
        >
          <h3>{{ category }}</h3>
          <div class="teenuste-loetelu">
            <div
              v-for="service in services"
              :key="service._id"
              class="teenus-rida-wrapper"
            >
              <div class="teenus-rida">
                <h4 class="teenus-nimi">{{ service.nimi }}</h4>
                <span class="teenus-hind">{{ service.hind }}</span>
                <span class="teenus-kestus">{{ formatDuration(service.aeg) }}</span>
              </div>
              <p class="teenus-selgitus">{{ service.selgitus }}</p>
            </div>
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
    fetch("https://ilusaar-backend.onrender.com/api/teenused")
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
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
}
h1 {
  font-family: "Tangerine", serif;
  text-align: center;
  font-size: 80px;
  font-weight: 900;
  margin-bottom: 2rem;
  color: #02512B;
}

.teenused-container {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  flex-wrap: wrap;
}

.provider-column {
  flex: 1 1 48%;
  max-width: 48%;
}

.provider-column h2 {
  font-family: "Tangerine", serif;
  font-size: 55px;
  font-weight: 900;
  color: #02512B;
  margin-bottom: 1rem;
  border-bottom: 2px solid #02512B;
  padding-bottom: 0.5rem;
}

.kategooria-blokk {
  background-color: #96b2a2;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.kategooria-blokk h3 {
  margin-bottom: 1rem;
  color: #02512B;
  margin-top: auto;
  font-weight: 500;
  font-size: 30px;
  border-left: 4px solid #02512B;
  padding-left: 0.5rem;
}

.teenuste-loetelu {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.teenus-rida-wrapper {
  background: rgb(243, 248, 244);
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.teenus-rida {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.teenus-nimi {
  font-weight: 500;
  font-size: 1.3rem;
  margin: 0;
  flex: 1;
}

.teenus-hind,
.teenus-kestus {
  font-weight: normal;
  margin-left: 1rem;
  white-space: nowrap;
  font-size: 0.95rem;
}

.teenus-selgitus {
  margin-top: 0.5rem;
  margin-bottom: auto;
  font-size: 0.95rem;
  color: #555;
}

</style>
