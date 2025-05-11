<script setup lang="js">
import { computed } from 'vue';

// defineProps ja defineEmits vajavad argumente JavaScriptis
const props = defineProps(['service']);
const emit = defineEmits(['update:service', 'prev', 'next']);

const isValid = computed(() => !!props.service);

const updateService = (event) => {
  emit('update:service', event.target.value);
};

const services = [
  { value: '', label: '-- vali teenus --', disabled: true },
  { value: 'juuksur', label: 'Juuksur' },
  { value: 'maniküür', label: 'Maniküür' },
  { value: 'pediküür', label: 'Pediküür' },
  { value: 'massaaž', label: 'Massaaž' },
  { value: 'näohooldus', label: 'Näohooldus' }
];
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
        <option 
          v-for="option in services" 
          :key="option.value" 
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
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