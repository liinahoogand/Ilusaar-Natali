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
  <h1>KalendriVaade</h1>
    <KalendriVaade />
  <h1>Teenused</h1>
    <AdminTeenused />
</template>