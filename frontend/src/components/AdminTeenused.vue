<script setup>
import { ref, onMounted } from 'vue';

const teenused = ref([]);
const loading = ref(false);
const error = ref(null);

// Andmete laadimine
const fetchTeenused = async () => {
  loading.value = true;
  try {
    const res = await fetch('https://ilusaar-backend.onrender.com/api/teenused');
    teenused.value = await res.json();
  } catch (err) {
    error.value = 'Teenuste laadimine ebaõnnestus';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Salvestamine
const salvestaMuutused = async (teenus) => {
  try {
    console.log("Saadan salvestamiseks:", teenus);

      const res = await fetch(`https://ilusaar-backend.onrender.com/api/teenused/${teenus._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teenus)
    });

    if (!res.ok) throw new Error('Salvestamine ebaõnnestus');
    alert('Salvestatud!');
  } catch (err) {
    alert('Viga salvestamisel');
    console.error(err);
  }
};

const kustutaTeenus = async (id) => {
  if (!confirm('Oled kindel, et soovid kustutada selle teenuse?')) return;
  try {
    const res = await fetch(`https://ilusaar-backend.onrender.com/api/teenused/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Kustutamine ebaõnnestus');
    teenused.value = teenused.value.filter(t => t._id !== id);
  } catch (err) {
    alert('Viga kustutamisel');
    console.error(err);
  }
};


const uusTeenus = ref({
  nimi: '',
  hind: '',
  aeg: '',
  teenusepakkuja: '',
  Kuressaare: false,
  Salme: false
});

const lisaUusTeenus = async () => {
  try {
    const res = await fetch('https://ilusaar-backend.onrender.com/api/teenused', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uusTeenus.value)
    });

    if (!res.ok) throw new Error('Lisamine ebaõnnestus');

    const uus = await res.json();
    teenused.value.push(uus); // Lisa uute hulka
    alert('Teenuse lisamine õnnestus');

    // Nulli vorm
    uusTeenus.value = {
      nimi: '',
      hind: '',
      aeg: '',
      teenusepakkuja: '',
      Kuressaare: false,
      Salme: false
    };
  } catch (err) {
    alert('Viga teenuse lisamisel');
    console.error(err);
  }
};


onMounted(fetchTeenused);
</script>

<template>
  <div class="admin-teenused">
    <h2>Admin – Teenuste haldus</h2>

    <div v-if="loading">Laen teenuseid...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Hind</th>
            <th>Aeg (min)</th>
            <th>Teenusepakkuja</th>
            <th>Asukohad</th>
            <th>Toimingud</th>
          </tr>
        </thead>
        <tbody>

          <!-- 🟢 Lisa uus teenus -->
          <tr>
            <td><input v-model="uusTeenus.nimi" placeholder="Teenuse nimi" /></td>
            <td><input v-model="uusTeenus.hind" placeholder="Hind" /></td>
            <td><input v-model="uusTeenus.aeg" placeholder="Aeg (min)" /></td>
            <td><input v-model="uusTeenus.teenusepakkuja" placeholder="Teenusepakkuja" /></td>
            <td>
              <label>
                <input type="checkbox" v-model="uusTeenus.Kuressaare" />
                Kuressaare
              </label>
              <label>
                <input type="checkbox" v-model="uusTeenus.Salme" />
                Salme
              </label>
            </td>
            <td>
              <button @click="lisaUusTeenus">➕ Lisa</button>
            </td>
          </tr>

          <!-- 🔁 Olemasolevad teenused -->
          <tr v-for="teenus in teenused" :key="teenus._id">
            <td><input v-model="teenus.nimi" /></td>
            <td><input v-model="teenus.hind" /></td>
            <td><input v-model="teenus.aeg" /></td>
            <td><input v-model="teenus.teenusepakkuja" /></td>
            <td>
              <label>
                <input type="checkbox" v-model="teenus.Kuressaare" />
                Kuressaare
              </label>
              <label>
                <input type="checkbox" v-model="teenus.Salme" />
                Salme
              </label>
            </td>
            <td>
              <button @click="salvestaMuutused(teenus)">💾</button>
              <button @click="kustutaTeenus(teenus._id)">🗑️</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>



<style scoped>
.admin-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-table th, .admin-table td {
  border: 1px solid #ccc;
  padding: 6px 10px;
}
.admin-table input {
  width: 100%;
}
</style>
