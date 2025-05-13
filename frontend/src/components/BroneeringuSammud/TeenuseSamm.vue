<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Props ja emits
const props = defineProps(['asukoht', 'teenus']);
const emit = defineEmits(['update:teenus', 'prev', 'next']);


const isValid = computed(() => !!props.teenus);

// Teenuste seisund
const allServices = ref([]);
const filteredServices = computed(() => {
  if (!props.asukoht) return [];

  return allServices.value.filter(teenus => teenus[props.asukoht] === "true");
});

const updateService = (event) => {
  const selectedService = allServices.value.find(s => s.nimi === event.target.value);
  if (selectedService) {
    emit('update:teenus', selectedService.nimi);
    emit('update:teenusepakkuja', selectedService.teenusepakkuja); 
    emit('update:aeg', selectedService.aeg); 

  }
};

// API-st andmete laadimine
const fetchServices = async () => {
  try {
    const res = await fetch('https://ilusaar-backend.onrender.com/api/teenused');
    const data = await res.json();
    allServices.value = data;
  } catch (error) {
    console.error('Teenuste laadimine ebaõnnestus:', error);
  }
};

onMounted(fetchServices);

// Kui location muutub, võime hiljem siia lisada loogikat (praegu piisab computed'ist)
watch(() => props.asukoht, () => {
  // valikuline: puhasta valitud teenus uue asukoha korral
  emit('update:teenus', '');
});
</script>

<template>
  <div class="step-wrapper">
    <h2 class="step-title">Vali teenus</h2>
    <p class="step-description">Millist teenust soovid broneerida?</p>

    <div class="form-group">
      <label for="teenus">Teenus:</label>
      <select 
        id="teenus" 
        :value="props.teenus" 
        @change="updateService"
        class="form-control"
      >
        <option value="" disabled>-- vali teenus --</option>
        <option 
          v-for="service in filteredServices" 
          :key="service._id.$oid" 
          :value="service.nimi"
        >
          {{ service.nimi }}
        </option>
      </select>
    </div>

    <div class="button-group">
      <button class="secondary" @click="emit('prev')">
        <span class="button-icon">←</span>
        Tagasi
      </button>

      <button 
        class="primary-button" 
        :disabled="!isValid" 
        @click="emit('next')"
      >
        Jätka
        <span class="button-icon">→</span>
      </button>
    </div>
  </div>
</template>


<style scoped>
.step-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.step-title {
  font-size: 1.5rem;
  color: var(--color-neutral-900);
  margin-bottom: 0;
}

.step-description {
  color: var(--color-neutral-500);
  margin-top: -16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-control {
  height: 48px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.primary-button {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  justify-content: center;
}

.button-icon {
  transition: transform 0.2s ease;
}

.primary-button:hover .button-icon {
  transform: translateX(4px);
}

button.secondary:hover .button-icon {
  transform: translateX(-4px);
}

@media (prefers-color-scheme: dark) {
  .step-title {
    color: var(--color-neutral-100);
  }
}
</style>