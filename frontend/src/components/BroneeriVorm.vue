<script setup lang="ts">
import { ref, computed } from 'vue';
import StepProgress from './StepProgress.vue';
import AsukohaSamm from './BroneeringuSammud/AsukohaSamm.vue';
import TeenuseSamm from './BroneeringuSammud/TeenuseSamm.vue';
import KuupäevaSamm from './BroneeringuSammud/KuupäevaSamm.vue';
import AjaSamm from './BroneeringuSammud/AjaSamm.vue';
import NimeSamm from './BroneeringuSammud/NimeSamm.vue';
import KinnituseSamm from './BroneeringuSammud/KinnituseSamm.vue';
import { BookingFormData } from '../types/booking';
import { formatDate } from '../utils/formatter';


const step = ref(1);
const totalSteps = 6;
const slideDirection = ref('right');

const form = ref<BookingFormData>({
  location: '',
  service: '',
  date: null,
  time: '',
  name: '',
});

const formattedDate = computed(() => {
  return form.value.date ? formatDate(form.value.date) : '';
});

const nextStep = () => {
  if (step.value < totalSteps) {
    slideDirection.value = 'right';
    step.value++;
  }
};

const prevStep = () => {
  if (step.value > 1) {
    slideDirection.value = 'left';
    step.value--;
  }
};

const submitBooking = () => {
  // In a real application, you would send this data to your backend
  console.log('Broneeringu andmed:', form.value);
  
  // Show success message
  alert('Broneering edukalt saadetud!');
  
  // Reset form
  form.value = {
    location: '',
    service: '',
    date: null,
    time: '',
    name: '',
  };
  
  // Return to step 1
  step.value = 1;
};

const updateFormField = (field: keyof BookingFormData, value: any) => {
  form.value[field] = value;
};
</script>

<template>
  <div class="booking-container">
    <div class="booking-card">
      <h1 class="booking-title">Broneeri aeg</h1>
      
      <StepProgress :current-step="step" :total-steps="totalSteps" />
      
      <div class="step-container">
        <Transition :name="slideDirection === 'right' ? 'slide-right' : 'slide-left'" mode="out-in">
          <div class="step-content" :key="step">
            <AsukohaSamm 
              v-if="step === 1" 
              :location="form.location" 
              @update:location="updateFormField('location', $event)"
              @next="nextStep" 
            />
            
            <TeenuseSamm 
              v-else-if="step === 2" 
              :service="form.service" 
              @update:service="updateFormField('service', $event)"
              @next="nextStep" 
              @prev="prevStep" 
            />
            
            <KuupäevaSamm 
              v-else-if="step === 3" 
              :date="form.date" 
              @update:date="updateFormField('date', $event)"
              @next="nextStep" 
              @prev="prevStep" 
            />
            
            <AjaSamm 
              v-else-if="step === 4" 
              :time="form.time" 
              @update:time="updateFormField('time', $event)"
              @next="nextStep" 
              @prev="prevStep" 
            />
            
            <NimeSamm 
              v-else-if="step === 5" 
              :name="form.name" 
              @update:name="updateFormField('name', $event)"
              @next="nextStep" 
              @prev="prevStep" 
            />
            
            <KinnituseSamm 
              v-else-if="step === 6" 
              :booking-data="form"
              :formatted-date="formattedDate"
              @submit="submitBooking" 
              @prev="prevStep" 
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.booking-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 16px;
}

.booking-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 32px;
  overflow: hidden;
}

.booking-title {
  font-size: 1.75rem;
  color: var(--color-neutral-900);
  margin-bottom: 24px;
  text-align: center;
  font-weight: 600;
}

.step-container {
  position: relative;
  overflow: hidden;
  min-height: 300px;
}

.step-content {
  margin-top: 24px;
}

/* Slide transitions */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (prefers-color-scheme: dark) {
  .booking-card {
    background-color: var(--color-neutral-800);
  }
  
  .booking-title {
    color: var(--color-neutral-100);
  }
}

@media (max-width: 480px) {
  .booking-card {
    padding: 24px 16px;
    border-radius: 12px;
  }
  
  .booking-title {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }
}
</style>