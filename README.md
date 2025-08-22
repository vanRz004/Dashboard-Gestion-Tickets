# Dashboard de Gestion de Tickets
Este proyecto es una aplicación web que simula un Dashboard para Gestión de Tickets. Permite visualizar, filtrar, buscar y administrar tickets de manera sencilla, además de contar con un resumen gráfico del estado de los tickets.

## Instalación y Ejecución

Clonar el repositorio

* git clone https://github.com/vanrz004/ticket-fast-sas.git
* cd ticket-fast-sas

* npm i 
* npm run dev

Abrir el localhost en el navegador:
* http://localhost:5177

## Decisiones técnicas tomadas:

**Framework**: Vue 3 + Vite

**UI**: TailwindCSS 3 para estilos rápidos y responsivos

**Componentes reutilizables**: TicketsTable, TicketForm, TicketDetail, TicketsStats, TicketsChart

**API simulada**: Servicio local (services/api.js) con promesas y delay simulado

**Persistencia**: LocalStorage para mantener los tickets mientras no haya backend real

**Notificaciones**: SweetAlert2 para feedback de usuario al crear y actualizar tickets, reporte de errores

**Testing**: Vitest para validar campos vacios y fechas de creación de tickets

## Tiempo invertido en cada sección con funcionalidad

* **Cards**: 1,5 horas
* **Filtros y tabla**: 3 horas
* **Gráfico de tickets**:. 1 hora
* **Modal de creación y edición**:3 horas

## Mejoras futuras que implementarías

> Ya que es un aplicativo que pueden manejar varias personas estaria bien implementar el uso de sesiones para que sea solo de la compañia para asi también tener roles de permiso.
Generar un historial de las personas que entran y generan acciones en el aplicativo (auditoria).
Se pueden agregar más filtros como por ejemplo: por fecha.
A ticket se le puede agregar un campo de evidencia que para cerrarlo se muestre como fue solucionado.

## API Error Handling Documentation

* **Manejo de errores en la aplicación**
> Implementé un servicio centralizado (api.js) que envuelve fetch y aplica un try-catch permitiendo la captura de errores de red, de servidor o de desarrollo. También hay un registro en la consola para mostrar el error de donde proviene en su respectiva depuración

* **Estrategias de retry utilizadas y por qué**
> Implementé una función de retry que básicamente intenta repetir la petición un par de veces si falla, pero con pausas cada vez más largas (1 seg, 2seg ...).
La idea es que si el servidor está saturado o hay un fallo momentáneo de red, el sistema no se rinda al primer intento, sino que espere y vuelva a probar teniendo en cuenta que si el error es por cliente, como un 400, no tendría sentido reintentar solo  se realiza cuando son errores de red o del servidor.

* **Manejo de diferentes tipos de errores**

> * Errores de red: Se manejan en el catch de fetchRetry, si falla muestra que la llamada al api ha fallado.

> * 500 Internal Server Error: capturado en el catch, se muestra un mensaje genérico de error del servidor.

> * 404 Not Found: cuando un recurso no existe, se devuelve inmediatamente.


> * Retry strategy: se utiliza una función genérica (fetchRetry) que reintenta 3 veces con un delay fijo entre cada intento. Esto ayuda a manejar caídas momentáneas de red o errores tipo 500

```
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
```
* **Experiencia previa con problemas similares de API en proyectos reales**
>En proyectos anteriores ya trabajé con APIs que presentaban inestabilidad intermitente, por ejemplo en sistemas de ventas y CRM: 
> * Aplicamos retry con useAsyncData de Nuxt para mitigar caídas temporales o iniciales ya que eran millones de datos.
> * Se usó cache local (Pinia) para mejorar la experiencia y también  Redis que ejecutaba todos los endpoints a partir de una hora especifica haciendo que cuando ya entraran a validar estuvieran actualizados al día procurando la disponibilidad y la integridad de los datos.
> * Aprendí a diferenciar qué errores realmente necesitan retry y cuáles son necesarios guardar en un cache distribuido (cuando se trata de mucha data).
