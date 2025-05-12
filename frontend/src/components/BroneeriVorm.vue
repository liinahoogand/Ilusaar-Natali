<script setup>
import { ref, computed } from 'vue';
import AjaSamm from './BroneeringuSammud/AjaSamm.vue';
import AsukohaSamm from './BroneeringuSammud/AsukohaSamm.vue';
import TeenuseSamm from './BroneeringuSammud/TeenuseSamm.vue';
import NimeSamm from './BroneeringuSammud/NimeSamm.vue';
import KuupäevaSamm from './BroneeringuSammud/KuupäevaSamm.vue';
import KinnituseSamm from './BroneeringuSammud/KinnituseSamm.vue'; 
import StepProgress from './StepProgress.vue';
import { formatDate } from '../utils/formatter.js';

const step = ref(1);
const totalSteps = 6;
const slideDirection = ref('right');

function calculateEndTime(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const start = new Date(0, 0, 0, hours, minutes);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  return `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;
}


const form = ref({
  asukoht: '',
  teenus: '',
  kuupäev: null,
  kell: '',
  nimi: '',
  teenusepakkuja: '',
  aeg: null,
  lõpp: null,
});

const formattedDate = computed(() => {
  return form.value.kuupäev ? formatDate(form.value.kuupäev) : '';
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

const submitBooking = async () => {
  try {
    // arvuta lõppaeg ja lisa form andmetele
    form.value.lõpp = calculateEndTime(form.value.kell, form.value.aeg);

    await fetch('http://localhost:5000/api/broneeringud', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });

    alert('Broneering edukalt salvestatud!');
    form.value = { asukoht: '', teenus: '', kuupäev: null, kell: '', nimi: '', teenusepakkuja: '', aeg: null, lõpp: null };
    step.value = 1;
    console.log('Broneering saadetakse:', form.value);

  } catch (error) {
    console.error('Salvestamine ebaõnnestus:', error);
    alert('Midagi läks valesti!');
  }
};


const updateFormField = (field, value) => {
  console.log('Väli uuendatud:', field, value);
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
              :asukoht="form.asukoht" 
              @update:asukoht="updateFormField('asukoht', $event)"
              @next="nextStep" 
            />
            
            <TeenuseSamm 
              v-else-if="step === 2" 
              :teenus="form.teenus" 
              :asukoht="form.asukoht"
              :teenusepakkuja="form.teenusepakkuja"
              :aeg="form.aeg"
              @update:teenus="updateFormField('teenus', $event)"
              @update:teenusepakkuja="updateFormField('teenusepakkuja', $event)"
              @update:aeg="updateFormField('aeg', $event)"
              @next="nextStep" 
              @prev="prevStep" 
            />
            
            <KuupäevaSamm 
              v-else-if="step === 3" 
              :kuupäev="form.kuupäev" 
              @update:kuupäev="updateFormField('kuupäev', $event)"
              @next="nextStep" 
              @prev="prevStep" 
            />
            
            <AjaSamm 
              v-else-if="step === 4" 
              :kell="form.kell" 
              @update:kell="updateFormField('kell', $event)"
              @next="nextStep" 
              @prev="prevStep" 
            />
            
            <NimeSamm 
              v-else-if="step === 5" 
              :nimi="form.nimi" 
              @update:nimi="updateFormField('nimi', $event)"
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
  max-width: 800px;
  margin-top: 50px;
  padding: 16px;
}

.booking-card {
  background-color: #96b2a2;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 32px;
  overflow: hidden;
}

.booking-title {
  font-size: 60px;
  font-family: 'Tangerine', serif;
  color: white;
  margin-bottom: 50px;
  margin-top: 20px;
  text-align: center;
  font-weight: 900;
}

.step-container {
  position: relative;
  overflow: hidden;
  min-height: 300px;
}

.step-content {
  margin-top: 24px;
  font-family: 'Playfair Display', serif;
  color: white;

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

@media (prefers-color-scheme: dark) {
  .booking-card {
    background-color: #1f3324;
    border-color: #3ecf8e;
  }
  
  .booking-title {
    color: #a8f0c4;
  }
}
</style>