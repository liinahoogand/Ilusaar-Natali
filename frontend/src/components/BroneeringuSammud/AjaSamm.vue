<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps(['kell', 'kuupäev', 'teenusepakkuja', 'aeg']);
const emit = defineEmits(['update:kell', 'prev', 'next']);

const selectedTime = ref(props.kell || '');
const existingBookings = ref([]);

watch(selectedTime, (newVal) => {
  emit('update:kell', newVal);
});

// uuenda valitud väärtust kui props muutub
watch(() => props.kell, (newVal) => {
  selectedTime.value = newVal;
});

// lae olemasolevad broneeringud, kui kuupäev või teenusepakkuja muutub
watch(
  () => [props.kuupäev, props.teenusepakkuja],
  async ([kuupäev, teenusepakkuja]) => {
    if (kuupäev && teenusepakkuja) {
      try {
        const res = await fetch(`https://ilusaar-backend.onrender.com/api/broneeringud?kuupäev=${kuupäev}&teenusepakkuja=${encodeURIComponent(teenusepakkuja)}`);
        existingBookings.value = await res.json();
      } catch (err) {
        console.error('Viga broneeringute laadimisel:', err);
        existingBookings.value = [];
      }
    }
  },
  { immediate: true }
);

// Kontroll, kas aeg on vaba
function isTimeAvailable(time) {
  const [h, m] = time.split(':').map(Number);
  const startTime = new Date(0, 0, 0, h, m);
  const endTime = new Date(startTime.getTime() + (props.aeg || 0) * 60000);

  return !existingBookings.value.some(b => {
    // ainult sama teenusepakkuja broneeringud loevad
    if (b.teenusepakkuja !== props.teenusepakkuja) return false;

    if (!b.kell || !b.lõpp) return false;

    const bStartParts = b.kell.split(':');
    const bEndParts = b.lõpp.split(':');
    if (bStartParts.length < 2 || bEndParts.length < 2) return false;

    const bStart = new Date(0, 0, 0, Number(bStartParts[0]), Number(bStartParts[1]));
    const bEnd = new Date(0, 0, 0, Number(bEndParts[0]), Number(bEndParts[1]));

    return startTime < bEnd && endTime > bStart;
  });
}


const timeOptions = computed(() => {
  const times = [];
  const start = 9 * 60;
  const end = 18 * 60;

  for (let i = start; i <= end; i += 15) {
    const h = String(Math.floor(i / 60)).padStart(2, '0');
    const m = String(i % 60).padStart(2, '0');
    const t = `${h}:${m}`;
    if (isTimeAvailable(t)) {
      times.push(t);
    }
  }

  return times;
});

const isValid = computed(() => !!selectedTime.value);
</script>


<template>
  <div class="step-wrapper">
    <h2 class="step-title">Vali kellaaeg</h2>
    <p class="step-description">Mis kellaajal soovid oma broneeringut?</p>
    
    <div class="form-group">
      <label for="kell">Kellaaeg:</label>
      <select 
        id="kell" 
        v-model="selectedTime" 
        class="form-control"
      >
        <option value="" disabled>-- vali kellaaeg --</option>
        <option 
          v-for="kell in timeOptions" 
          :key="kell" 
          :value="kell"
        >
          {{ kell }}
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
