<template>
  <div>
    <h1>Welcome to My Nuxt 3 App</h1>
    <p>Message from API: {{ apiMessage }}</p>
    <p>Timestamp from API: {{ apiTimestamp }}</p>
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/hello'); // Use Nuxt's useFetch

const apiMessage = ref('');
const apiTimestamp = ref('');

if (data.value) {
  apiMessage.value = data.value.message;
  apiTimestamp.value = data.value.timestamp;
}
</script>