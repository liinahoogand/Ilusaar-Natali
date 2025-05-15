<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Broneeringu detailid</h2>
     <form @submit.prevent="updateBooking">
      <label>Teenus:
        <input v-model="form.teenus" required />
      </label>

      <label>Teenusepakkuja:
        <input v-model="form.teenusepakkuja" required />
      </label>

      <label>Kliendi nimi:
        <input v-model="form.nimi" required />
      </label>

      <label>Email:
        <input v-model="form.email" type="email" />
      </label>

      <label>Kuupäev:
        <input v-model="form.kuupäev" type="date" required />
      </label>

      <label>Algusaeg:
        <input v-model="form.kell" type="time" required />
      </label>

      <label>Lõppaeg:
        <input v-model="form.lõpp" type="time" required />
      </label>

      <label>Asukoht:
        <input v-model="form.asukoht" />
      </label>

      <div class="modal-actions">
        <button type="submit">💾 Salvesta muudatused</button>
        <button type="button" class="delete-button" @click="deleteBooking">🗑 Kustuta</button>
        <button type="button" @click="$emit('close')">Sulge</button>
      </div>
    </form>

    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  booking: Object
});
const emit = defineEmits(['close', 'deleted', 'updated']);

// Hoia muudetavat vormi
const form = reactive({
  teenus: '',
  teenusepakkuja: '',
  nimi: '',
  email: '',
  kuupäev: '',
  kell: '',
  lõpp: '',
  asukoht: ''
});
watch(() => props.booking, (b) => {
  if (b) {
    form.teenus = b.teenus;
    form.teenusepakkuja = b.teenusepakkuja;
    form.nimi = b.nimi;
    form.email = b.email || '';
    form.kuupäev = b.kuupäev;
    form.kell = b.kell;
    form.lõpp = b.lõpp;
    form.asukoht = b.asukoht || '';
  }
}, { immediate: true });

// PUT päring broneeringu muutmiseks
const updateBooking = async () => {
  try {
    const res = await fetch(`https://ilusaar-backend.onrender.com/api/broneeringud/${props.booking._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!res.ok) throw new Error('Muudatused ebaõnnestusid');
    alert('Broneering muudetud!');
    emit('updated');
    emit('close');
  } catch (err) {
    console.error('Muudatusvigade viga:', err);
    alert('Viga broneeringu muutmisel');
  }
};

const deleteBooking = async () => {
  const confirmed = confirm('Kas soovid kindlasti selle broneeringu kustutada?');
  if (!confirmed) return;

  try {
    const res = await fetch(`https://ilusaar-backend.onrender.com/api/broneeringud/${props.booking._id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    alert(data.message);
    emit('deleted'); // uuenda kalendrit
    emit('close');
  } catch (err) {
    console.error('Kustutamisviga:', err);
    alert('Kustutamine ebaõnnestus');
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Lisab vahed väljade vahele */
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #333;
}

input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #3ecf8e;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

button[type="button"]:last-child {
  background-color: #ccc;
  color: black;
}
.delete-button {
  background-color: #e74c3c; /* Punane */
  color: white;
}

.delete-button:hover {
  background-color: #c0392b; /* Tumedam punane hoveril */
}


</style>
