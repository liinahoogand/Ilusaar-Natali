<template>
  <div class="login-container">
    <h2>Töötaja sisselogimine</h2>
    <form @submit.prevent="login">
      <label for="username">Kasutajanimi:</label>
      <input v-model="username" type="text" id="username" required />

      <label for="password">Parool:</label>
      <input v-model="password" type="password" id="password" required />

      <button type="submit">Logi sisse</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


/* Component name is not needed here because <script setup> handles the export */

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  try {
    const res = await fetch('https://ilusaar-backend.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kasutajanimi: username.value, 
        parool: password.value 
      })
    });

    if (!res.ok) throw new Error('Vale kasutajanimi või parool');

    const data = await res.json();
    localStorage.setItem('token', data.token);
    router.push('/admin');
  } catch (err) {
    errorMessage.value = err.message;
  }
};

</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  border: 2px solid #E6C36A;
  padding: 30px;
  border-radius: 8px;
  color: black;
}
label {
  display: block;
  margin: 10px 0 5px;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background: #E6C36A;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
