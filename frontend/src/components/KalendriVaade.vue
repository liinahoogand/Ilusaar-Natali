<script setup>
import { ref, computed, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const selectedProvider = ref('');
const calendarRawEvents = ref([]);
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  selectable: true,
  events: [],
  eventClick: (info) => {
    alert(`Broneering: ${info.event.title}\nAeg: ${info.event.start.toLocaleString()}`);
  }
});

// Tagastab unikaalsed teenusepakkujad (dropdowni jaoks)
const uniqueProviders = computed(() => {
  const providers = calendarRawEvents.value.map(e => e.extendedProps?.teenusepakkuja);
  return [...new Set(providers.filter(Boolean))];
});

// Teenusepakkuja põhine värvikood
const getColorForProvider = (provider) => {
  return provider === 'Ilusaar' ? '#f28b82'
       : provider === 'Natali' ? '#3ecf8e'
       : '#d7aefb';
};

// API andmete laadimine
const fetchBookings = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/broneeringud');
    const data = await res.json();

        // teisenda andmed FullCalendar formaati
      const events = data
        .filter(b => b.kuupäev && b.kell && b.lõpp)  // ainult kuupäev ja kell on kohustuslikud
        .map(b => ({
          title: `${b.teenus} (${b.nimi})`,
          start: `${b.kuupäev.slice(0, 10)}T${b.kell}`,
          end: b.end ? `${b.kuupäev.slice(0, 10)}T${b.end}` : undefined,
          backgroundColor: getColorForProvider(b.teenusepakkuja),
          extendedProps: {
            asukoht: b.asukoht,
            teenusepakkuja: b.teenusepakkuja,
            nimi: b.nimi
          }
        }));


    calendarRawEvents.value = events;
    calendarOptions.value.events = events;
  } catch (err) {
    console.error('Viga broneeringute laadimisel:', err);
  }
};

// Filtreeri kalendri sündmused valitud teenusepakkuja järgi
const filterEvents = () => {
  if (!selectedProvider.value) {
    calendarOptions.value.events = calendarRawEvents.value;
  } else {
    calendarOptions.value.events = calendarRawEvents.value.filter(
      e => e.extendedProps.teenusepakkuja === selectedProvider.value
    );
  }
};

onMounted(fetchBookings);
</script>

<template>
  <div>
    <label for="provider-filter">Filtreeri teenusepakkuja järgi:</label>
    <select id="provider-filter" v-model="selectedProvider" @change="filterEvents">
      <option value="">Kõik teenusepakkujad</option>
      <option v-for="provider in uniqueProviders" :key="provider" :value="provider">
        {{ provider }}
      </option>
    </select>

    <FullCalendar :options="calendarOptions" />
  </div>
</template>


<style scoped>

</style>
