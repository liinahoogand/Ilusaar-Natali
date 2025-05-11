<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Props ja emits
const props = defineProps(['location', 'service']);
const emit = defineEmits(['update:service', 'prev', 'next']);

const isValid = computed(() => !!props.service);

// Teenuste seisund
const allServices = ref([]);
const filteredServices = computed(() => {
  if (!props.location) return [];

  return allServices.value.filter(service => service[props.location] === "true");
});

// Teenuse uuendamine
const updateService = (event) => {
  emit('update:service', event.target.value);
};

// API-st andmete laadimine
const fetchServices = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/teenused');
    const data = await res.json();
    allServices.value = data;
  } catch (error) {
    console.error('Teenuste laadimine ebaõnnestus:', error);
  }
};

onMounted(fetchServices);

// Kui location muutub, võime hiljem siia lisada loogikat (praegu piisab computed'ist)
watch(() => props.location, () => {
  // valikuline: puhasta valitud teenus uue asukoha korral
  emit('update:service', '');
});
</script>

<template>
  <div class="step-wrapper">
    <h2 class="step-title">Vali teenus</h2>
    <p class="step-description">Millist teenust soovid broneerida?</p>

    <div class="form-group">
      <label for="service">Teenus:</label>
      <select 
        id="service" 
        :value="props.service" 
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