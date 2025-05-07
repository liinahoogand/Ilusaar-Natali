<script setup lang="ts">

export default {
  name: 'AsukohaSamm'
}

import { computed } from 'vue';

const props = defineProps<{
  location: string;
}>();

const emit = defineEmits<{
  'update:location': [value: string];
  'next': [];
}>();

const isValid = computed(() => !!props.location);

const updateLocation = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:location', target.value);
};

const locations = [
  { value: '', label: '-- vali asukoht --', disabled: true },
  { value: 'Tallinn', label: 'Tallinn' },
  { value: 'Tartu', label: 'Tartu' },
  { value: 'Pärnu', label: 'Pärnu' },
  { value: 'Narva', label: 'Narva' },
  { value: 'Viljandi', label: 'Viljandi' }
];
</script>

<template>
  <div class="step-wrapper">
    <h2 class="step-title">Vali asukoht</h2>
    <p class="step-description">Palun vali, millises linnas soovid teenust kasutada</p>
    
    <div class="form-group">
      <label for="location">Asukoht:</label>
      <select 
        id="location" 
        :value="location" 
        @change="updateLocation"
        class="form-control"
      >
        <option 
          v-for="option in locations" 
          :key="option.value" 
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    
    <div class="button-group">
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
  justify-content: flex-end;
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

@media (prefers-color-scheme: dark) {
  .step-title {
    color: var(--color-neutral-100);
  }
}
</style>