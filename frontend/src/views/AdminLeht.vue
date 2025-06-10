<script>
import dayGridPlugin from '@fullcalendar/daygrid'
import KalendriVaade from '@/components/KalendriVaade.vue'  
import AdminTeenused from '@/components/AdminTeenused.vue'

export default {
  components: {
    KalendriVaade,
    AdminTeenused // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: false,
        events: [
          { title: 'Meeting', start: new Date() }
        ]
      }
    }
  }
}

</script>

<template>
  <button @click="logout">Logi välja</button>
  <h1>Kalender</h1>
    <KalendriVaade />
  <h1>Teenused</h1>
    <AdminTeenused />
</template>

<style scoped lang="scss">
  h1 {
    text-align: center;
    margin-top: 20px;
    font-family: 'Tangerine', serif;
    font-size: 6em;
    color: #333;
  }
</style>
