<script setup>
import { ref, computed, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import BookingModal from './BookingModal.vue';
import BookingDetailModal from './BookingDetailModal.vue';

const selectedBooking = ref(null);
const showDetailModal = ref(false);
const showModal = ref(false);
const selectedDate = ref('');
const selectedProvider = ref('');
const calendarRawEvents = ref([]);
const teenused = ref([]);  // Teenuste loetelu

// API teenuste laadimine
// API teenuste laadimine
const fetchServices = async () => {
  try {
    const res = await fetch('https://ilusaar-backend.onrender.com/api/teenused');
    const data = await res.json();
    // Kui teenus on objekt (näiteks { name: 'Juukselõikus', id: 1 })
    teenused.value = data.map(service => service.nimi); // Siin kasuta vastavat välju teenuse objekti järgi
    teenused.value.push('Puhkus'); // Lisa 'Puhkus' teenus
  } catch (err) {
    console.error('Viga teenuste laadimisel:', err);
  }
};


// Modalist saadud broneering salvestamine
const handleModalSubmit = async (data) => {
  try {
    await fetch('https://ilusaar-backend.onrender.com/api/broneeringud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    showModal.value = false;
    await fetchBookings();
    alert('Broneering lisatud!');
  } catch (err) {
    console.error('Viga lisamisel:', err);
    alert('Midagi läks valesti!');
  }
};

// Kalendri seaded
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  selectable: true,
  select: (info) => {
    selectedDate.value = info.startStr.slice(0, 10); // ainult kuupäev
    showModal.value = true;
  },
  events: [],
  eventClick: (info) => {
    const clicked = calendarRawEvents.value.find(e => e.id === info.event.id);
    if (clicked) {
      selectedBooking.value = {
        _id: clicked.id,
        nimi: clicked.extendedProps.nimi,
        teenus: info.event.title,
        email: '', // kui vajad, pead laadima detailid eraldi
        kuupäev: clicked.start.split('T')[0],
        kell: clicked.start.split('T')[1],
        lõpp: clicked.end.split('T')[1],
        asukoht: clicked.extendedProps.asukoht,
        teenusepakkuja: clicked.extendedProps.teenusepakkuja
      };
      showDetailModal.value = true;
    }
  }
});

// Unikaalsed teenusepakkujad dropdowni jaoks
const uniqueProviders = computed(() => {
  const providers = calendarRawEvents.value.map(e => e.extendedProps?.teenusepakkuja);
  return [...new Set(providers.filter(Boolean))];
});

// Värv teenusepakkuja järgi
const getColorForProvider = (provider) => {
  return provider === 'Ilusaar' ? '#f28b82'
       : provider === 'Natali' ? '#3ecf8e'
       : '#d7aefb';
};

// API andmete laadimine
const fetchBookings = async () => {
  try {
    const res = await fetch('https://ilusaar-backend.onrender.com/api/broneeringud');
    const data = await res.json();

    const events = data
      .filter(b => b.kuupäev && b.kell && b.lõpp)
      .map(b => ({
        id: b._id, // ← see on väga oluline
        title: `${b.teenus} (${b.nimi})`,
        start: `${b.kuupäev.slice(0, 10)}T${b.kell}`,
        end: `${b.kuupäev.slice(0, 10)}T${b.lõpp}`,
        backgroundColor: getColorForProvider(b.teenusepakkuja),
        extendedProps: {
          _id: b._id, // ← siia lisa see!
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

// Teenusepakkuja filter
const filterEvents = () => {
  if (!selectedProvider.value) {
    calendarOptions.value.events = calendarRawEvents.value;
  } else {
    calendarOptions.value.events = calendarRawEvents.value.filter(
      e => e.extendedProps.teenusepakkuja === selectedProvider.value
    );
  }
};

onMounted(() => {
  fetchBookings();
  fetchServices(); // Lae teenused andmebaasist
});
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

    <BookingDetailModal
      v-if="showDetailModal"
      :booking="selectedBooking"
      @close="showDetailModal = false"
      @deleted="fetchBookings"
    />

    <!-- Booking Modal ainult siis kui showModal === true -->
    <BookingModal
      v-if="showModal"
      :kuupäev="selectedDate"
      :teenused="teenused"
      :teenusepakkujad="uniqueProviders"
      @submit="handleModalSubmit"
      @close="showModal = false"
    />


  </div>
</template>



<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* poolläbipaistev taust */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* väga kõrge väärtus, et oleks kõige ees */
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}
</style>