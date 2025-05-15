<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2>Lisa broneering kuupäeval {{ kuupäev }}</h2>

      <form @submit.prevent="submit">
        <label>Teenusepakkuja:
          <select v-model="form.teenusepakkuja" required>
            <option v-for="t in teenusepakkujad" :key="t" :value="t">{{ t }}</option>
          </select>
        </label>

        <label>Teenus:
          <select v-model="form.teenus" required>
            <option v-for="t in teenused" :key="t" :value="t">{{ t }}</option>
          </select>
        </label>

        <label>Kliendi nimi:
          <input v-model="form.nimi" type="text" required />
        </label>

        <label>Email (soovituslik):
          <input v-model="form.email" type="email" />
        </label>

        <label>Algusaeg:
          <input v-model="form.kell" type="time" required />
        </label>

        <label>Lõppaeg:
          <input v-model="form.lõpp" type="time" required />
        </label>

        <div class="modal-actions">
          <button type="submit">💾 Salvesta</button>
          <button type="button" class="cancel-button" @click="$emit('close')">Tühista</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  kuupäev: String,
  teenused: Array,
  teenusepakkujad: Array
});

const emit = defineEmits(['submit', 'close']);

const form = reactive({
  teenusepakkuja: '',
  teenus: '',
  nimi: '',
  email: '',
  kell: '',
  lõpp: '',
  kuupäev: props.kuupäev
});

const submit = () => {
  emit('submit', { ...form });
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
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  color: #333;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  background-color: #3ecf8e;
  color: white;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #33b67a;
}

.cancel-button {
  background-color: #e0e0e0;
  color: #333;
}

.cancel-button:hover {
  background-color: #c7c7c7;
}
</style>

