<script setup lang="ts">

export default {
  name: 'NimeSamm'
}

import { computed } from 'vue';

const props = defineProps<{
  name: string;
}>();

const emit = defineEmits<{
  'update:name': [value: string];
  'next': [];
  'prev': [];
}>();

const isValid = computed(() => props.name.length >= 3);

const updateName = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:name', target.value);
};
</script>

<template>
  <div class="step-wrapper">
    <h2 class="step-title">Sisesta oma andmed</h2>
    <p class="step-description">Palun sisesta oma nimi broneeringu jaoks</p>
    
    <div class="form-group">
      <label for="name">Nimi:</label>
      <input 
        type="text" 
        id="name" 
        :value="name" 
        @input="updateName"
        placeholder="Ees- ja perekonnanimi" 
        class="form-control"
      />
      <p v-if="name && !isValid" class="validation-message">
        Palun sisesta täisnimi (vähemalt 3 tähemärki)
      </p>
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

.validation-message {
  color: var(--color-error-500);
  font-size: 0.875rem;
  margin-top: 4px;
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