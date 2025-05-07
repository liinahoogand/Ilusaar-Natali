<script setup lang="ts">

export default {
  name: 'AjaSamm'
}

import { computed } from 'vue';

const props = defineProps<{
  time: string;
}>();

const emit = defineEmits<{
  'update:time': [value: string];
  'next': [];
  'prev': [];
}>();

const isValid = computed(() => !!props.time);

const updateTime = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:time', target.value);
};

const timeOptions = computed(() => {
  const times = [];
  const start = 9 * 60; // 9:00 in minutes
  const end = 18 * 60;  // 18:00 in minutes
  
  for (let i = start; i <= end; i += 15) {
    const h = Math.floor(i / 60).toString().padStart(2, '0');
    const m = (i % 60).toString().padStart(2, '0');
    times.push(`${h}:${m}`);
  }
  
  return times;
});
</script>

<template>
  <div class="step-wrapper">
    <h2 class="step-title">Vali kellaaeg</h2>
    <p class="step-description">Mis kellaajal soovid oma broneeringut?</p>
    
    <div class="form-group">
      <label for="time">Kellaaeg:</label>
      <select 
        id="time" 
        :value="time" 
        @change="updateTime"
        class="form-control"
      >
        <option value="" disabled>-- vali kellaaeg --</option>
        <option 
          v-for="time in timeOptions" 
          :key="time" 
          :value="time"
        >
          {{ time }}
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