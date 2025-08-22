// Aquí implementé el modelo que también se utiliza en nuxt creando una función general
// dandole una cantidad de intentos y un delay para lla espera entre cada retry 
// esto hace que sea optimo en todas las funciones que lo necesite
export async function fetchRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await fn();
      console.log(`Intento ${i + 1}: Funciona`);
      return result;
    } catch (err) {
      console.warn(`Intento ${i + 1} fallido:`, err);
      if (i === retries - 1) {
        console.error("falló");
        throw err; 
      }
      await new Promise(res => setTimeout(res, delay));
      console.log(`Esperando ${delay}ms antes del próximo intento...`);
    }
  }
}
