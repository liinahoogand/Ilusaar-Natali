<script setup lang="js">
import { computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// defineProps stringi-massiiviga
const props = defineProps(['kuupäev']);

// defineEmits stringi-massiiviga
const emit = defineEmits(['update:kuupäev', 'prev', 'next']);

// kontroll, kas kuupäev on määratud
const isValid = computed(() => !!props.kuupäev);

// kuupäeva muutmine
const updateDate = (newDate) => {
  emit('update:kuupäev', newDate);
};

// praegune kuupäev – min-date jaoks
const now = new Date();
</script>

<template>
  <div class="step-wrapper">
    <h2 class="step-title">Vali kuupäev</h2>
    <p class="step-description">Millal soovid teenust kasutada?</p>

    <div class="form-group">
      <label for="kuupäev">Kuupäev:</label>
      <VueDatePicker
        :model-value="props.kuupäev"
        @update:model-value="updateDate"
        :min-date="now"
        :monday-first="true"
        :enable-time-picker="false"
        auto-apply
        :text-input="true"
        placeholder="Vali kuupäev"
        :locale="'et'"
        :format="'dd.MM.yyyy'"
        class="date-picker"
        :teleport="true"

      />
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

.date-picker {
  width: 100%;
}

/* Customize DatePicker */
:deep(.dp__theme_light) {
  --dp-background-color: #ffff;
  --dp-text-color: #02512B;
  --dp-hover-color: #02512B;
  --dp-hover-text-color: white;
  --dp-hover-icon-color: var(--color-primary-500);
  --dp-primary-color: var(--color-primary-500);
  --dp-primary-text-color: #02512B;
  --dp-secondary-color: var(--color-primary-100);
  --dp-border-color: var(--color-neutral-300);
  --dp-menu-border-color: var(--color-neutral-300);
  --dp-border-radius: 8px;
  --dp-selected-background-color: var(--color-primary-500);
  --dp-selected-text-color: #fff;
  --dp-icon-color: #02512B;
  --dp-danger-color: var(--color-error-500);
}

:deep(.dp__theme_dark) {
  --dp-background-color: var(--color-neutral-800);
  --dp-text-color: var(--color-neutral-100);
  --dp-hover-color: var(--color-primary-800);
  --dp-hover-text-color: var(--color-primary-200);
  --dp-hover-icon-color: var(--color-primary-400);
  --dp-primary-color: var(--color-primary-600);
  --dp-primary-text-color: #fff;
  --dp-secondary-color: var(--color-primary-900);
  --dp-border-color: var(--color-neutral-700);
  --dp-menu-border-color: var(--color-neutral-700);
  --dp-border-radius: 8px;
  --dp-selected-background-color: var(--color-primary-600);
  --dp-selected-text-color: #fff;
  --dp-icon-color: var(--color-neutral-400);
  --dp-danger-color: var(--color-error-500);
}

:deep(.dp__input) {
  height: 48px;
  padding: 12px 40px 12px 30px; /* suurenda parem-paddingut */
  font-size: 16px;
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