<script setup>
import { ref, onMounted } from 'vue';

const teenused = ref([]);
const loading = ref(false);
const error = ref(null);

// Andmete laadimine
const fetchTeenused = async () => {
  loading.value = true;
  try {
    const res = await fetch('http://localhost:5000/api/teenused');
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
    const res = await fetch(`http://localhost:5000/api/teenused/${teenus._id.$oid}`, {
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teenus in teenused" :key="teenus._id.$oid">
            <td><input v-model="teenus.nimi" /></td>
            <td><input v-model="teenus.hind" /></td>
            <td><input v-model="teenus.aeg" /></td>
            <td><input v-model="teenus.teenusepakkuja" /></td>
            <td>
              <label>
                <input type="checkbox" v-model="teenus.Kuressaare" true-value="true" false-value="false" />
                Kuressaare
              </label>
              <label>
                <input type="checkbox" v-model="teenus.Salme" true-value="true" false-value="false" />
                Salme
              </label>
            </td>
            <td>
              <button @click="salvestaMuutused(teenus)">💾 Salvesta</button>
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
