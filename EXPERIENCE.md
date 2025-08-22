# Experiencia previa:

* **a. Un desafío técnico complejo que enfrenté en los últimos 12 meses**:

El mayor desafío fue implementar un sistema de roles en el frontend para una empresa a nivel internacional como Lilipink & YOI, donde los usuarios tenían distintos perfiles y permisos de acceso. 
La complejidad estaba en garantizar que la información visible se ajustara a cada rol, manteniendo la seguridad y al mismo tiempo una experiencia de usuario fluida para más de mil usuarios.

* **b. Cómo abordé el problema paso a paso**

*Definición de requisitos:* trabajé junto con el backend para identificar qué información debía estar disponible para cada rol.

*Propuesta desde frontend:* diseñé cómo debía comportarse la interfaz según los distintos tipos de usuarios y qué datos eran realmente relevantes para cada uno.

*Implementación de middleware en Nuxt:* configuré un sistema de autenticación con middleware para validar roles y accesos antes de cargar cada vista.

*Gestión de tokens:* implementé el uso de un token enmascarado(JWT), con expiración definida, que se enviaba al backend para validar roles y permisos.

*Pruebas:* realicé pruebas con diferentes roles para asegurar que cada usuario solo pudiera ver lo que le correspondía.

* **c. Qué alternativas consideré y por qué elegí mi solución**

*Alternativas*: 
* Validar roles únicamente en el backend y devolver vistas estáticas pero reducía la flexibilidad y la experiencia dinámica del usuario.
* Usar un sistema de flags en el frontend sin validación, representaba un riesgo de seguridad al exponer información sensible.

*Solución*:
Integrar middleware en Nuxt junto con validación vía token encriptado y comunicación constante con backend ya que aseguraba tanto la seguridad como la escalabilidad del sistema y garantizaba una experiencia fluida para los usuarios.

* **d. El impacto de mi solución en el proyecto/equipo**

Esta implementación permitió que más de mil usuarios internacionales accedieran a la aplicación con la seguridad de que solo podían ver la información relevante a su rol.Esto mejoró la confianza en el sistema, aumentó la eficiencia del trabajo en la organización. Además, se dejó las bases para que futuros módulos de la aplicación pudieran crecer de manera ordenada y segura usando solo un par de líneas de código.