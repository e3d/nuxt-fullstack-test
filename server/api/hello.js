export default defineEventHandler((event) => {
  return {
    message: 'Hello from the Nuxt 3 backend API!',
    timestamp: new Date().toISOString()
  };
});