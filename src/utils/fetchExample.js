// Aquí implementé el modelo que también se utiliza en nuxt creando una función general
// dandole una cantidad de intentos y un delay para lla espera entre cada retry
export async function fetchRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err; 
      await new Promise(res => setTimeout(res, delay));
    }
  }
}
