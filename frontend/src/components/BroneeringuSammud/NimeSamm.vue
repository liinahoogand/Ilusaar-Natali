<script setup>
import { computed } from 'vue';

const props = defineProps(['nimi', 'email', 'telefon']);
const emit = defineEmits(['update:nimi', 'update:email', 'update:telefon', 'prev', 'next']);

const isValid = computed(() => {
  return props.nimi?.length >= 3 && props.email?.includes('@') && props.telefon?.length >= 7;
});

</script>

<template>
  <div class="step-wrapper">
    <h2 class="step-title">Sisesta oma andmed</h2>
    <p class="step-description">Palun sisesta oma kontaktandmed</p>
    
    <div class="form-group">
      <label for="nimi">Nimi:</label>
      <input
        id="nimi"
        type="text"
        :value="props.nimi"
        @input="e => emit('update:nimi', e.target.value)"
        required
        placeholder="Ees- ja perekonnanimi"
      />
    </div>

    <div class="form-group">
      <label for="email">E-mail:</label>
      <input
        id="email"
        type="email"
        :value="props.email"
        @input="e => emit('update:email', e.target.value)"
        required
        placeholder="email@domeen.ee"
      />
    </div>

    <div class="form-group">
      <label for="telefon">Telefon:</label>
      <input
        id="telefon"
        type="tel"
        :value="props.telefon"
        @input="e => emit('update:telefon', e.target.value)"
        required
        placeholder="+372 5555 5555"
      />
    </div>

    <div class="button-group">
      <button class="secondary" @click="emit('prev')">← Tagasi</button>
      <button class="primary-button" :disabled="!isValid" @click="emit('next')">Jätka →</button>
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