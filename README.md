====================================================
🧪 LABSYS ONE SOFTWARE V.1.0
====================================================

Labsys One es un LIMS (Laboratory Information Management System) de alto
rendimiento, diseñado para digitalizar la operativa científica,
garantizando la integridad de los datos, el control de activos y la
eficiencia en la entrega de resultados.

Proyecto orientado a laboratorios educativos, científicos e industriales,
con una arquitectura moderna, desacoplada y escalable.

----------------------------------------------------
🚀 FUNCIONALIDADES PRINCIPALES
----------------------------------------------------

📦 GESTIÓN DE EQUIPOS
- Registro, edición y eliminación de equipos con perfiles detallados.
- Gestión de documentos (facturas, manuales) e imágenes por equipo.
- Control de mantenimientos preventivos con alertas por email y sistema.
- Préstamos, historial de uso y estados dinámicos
  (activo, fuera de servicio, dado de baja).
- Búsqueda por código de barras (manual o escáner) y ubicación.
- Exportación completa del inventario a Excel.

🧪 REACTIVOS Y CONTROL DE STOCK
- Control de stock en tiempo real.
- Registro de uso de reactivos.
- Monitoreo de fechas de vencimiento con notificaciones automáticas.
- Alertas por stock crítico (cantidad mínima o cero).
- Gestión de hojas de seguridad y archivos asociados.
- Búsqueda avanzada con filtros inteligentes y paginación.
- Exportación de inventario detallado en Excel.

🧬 MUESTRAS Y ENSAYOS
- Flujo completo desde la recepción hasta el informe final.
- Lista y consulta de todos los ensayos aceptados.
- Registro de recepción de muestras (datos e imágenes).
- Validación de análisis.
- Emisión de resultados con protección de edición.
- Vista previa de reportes finales.
- Emisión de ensayos con:
  * Reportes por muestra
  * Información completa
  * Envío directo al cliente
  * Firma digital y PDFs adicionales
- Historial de envíos y trazabilidad de usuarios responsables.
- Emisión de muestras independientes al cliente.
- Control de muestras:
  * Por entregar
  * Vencidas
  * Entregadas
  * Sin recepción de muestra

💰 COTIZACIONES
- Módulo para clientes: creación de cotizaciones y solicitud de análisis.
- Cálculo automático de precios.
- Gestión de estados (aceptada / rechazada).
- Envío de cotizaciones en PDF vía email.
- Conversión automática de cotización aceptada a ensayo.
- Consulta y filtrado avanzado de cotizaciones.

----------------------------------------------------
🧱 ARQUITECTURA DEL SISTEMA
----------------------------------------------------

- Comunicación basada en API REST.
- Arquitectura Hexagonal (Clean Architecture).
- Desacoplamiento total entre:
  * Lógica de negocio
  * Infraestructura
  * Frameworks y tecnologías

Beneficios:
- Alta mantenibilidad
- Escalabilidad
- Facilidad de testeo
- Independencia tecnológica


----------------------------------------------------
🗄️ MODELO DE BASE DE DATOS (DISEÑO INICIAL)
----------------------------------------------------

El sistema se apoya en una base de datos relacional diseñada como
fundamento lógico del proyecto.

El modelo inicial fue construido utilizando principios de
NORMALIZACIÓN, con el objetivo de:

- Evitar redundancia de datos
- Garantizar integridad referencial
- Facilitar la escalabilidad del sistema
- Representar correctamente la lógica del negocio

Este esquema inicial sirvió como base para el desarrollo de la lógica
de dominio y los flujos principales del sistema.

A partir de este modelo, la base de datos fue evolucionando e
incorporando nuevas tablas y relaciones conforme crecieron los
requerimientos funcionales del proyecto.

----------------------------------------------------
📌 DOMINIOS PRINCIPALES DEL MODELO
----------------------------------------------------

- Usuarios y Roles
- Clientes
- Inventario de Equipos y Mantenimientos
- Préstamos y Uso de Equipos
- Reactivos y Control de Stock
- Solicitudes de Ensayo
- Muestras y Análisis
- Resultados y Documentación
- Historial y Trazabilidad



----------------------------------------------------
🖥️ FRONT-END (USER INTERFACE)
----------------------------------------------------

Tecnologías:
- React 18
- Material UI v5
- JavaScript
- HTML

Características:
- Interfaz reactiva de alta fidelidad.
- Diseño basado en componentes atómicos.
- Dark Mode dinámico.
- Diseño responsivo orientado a inventarios.
- Comunicación en tiempo real con WebSockets.
- Seguridad basada en JWT.
- Control de acceso por roles (RBAC).

----------------------------------------------------
⚙️ BACK-END (BUSINESS LOGIC & CORE)
----------------------------------------------------

Tecnologías:
- Java 21
- Spring Boot
- Spring Web
- Spring JPA
- Spring Security
- Spring Cache
- Spring Events
- MySQL
- Docker

Características:
- Arquitectura Hexagonal.
- Persistencia con JPA.
- Cache optimizada mediante Spring Cache.
- Seguridad robusta con JWT y Google Auth.
- Sistema orientado a eventos (EDA) usando Spring Events.
- Procesos asíncronos para:
  * Auditorías
  * Notificaciones
  * Actualización de stock

Integraciones:
- Cloudinary (gestión de archivos).
- Apache POI (exportación Excel).
- MapStruct (mapeo DTO).
- Nodemailer (envío de correos).

----------------------------------------------------
🧰 STACK TECNOLÓGICO
----------------------------------------------------

- React 18
- Material UI v5
- Node.js
- Java 21
- Spring Boot (Web, JPA, Security, Cache, Events)
- JWT Authentication
- MySQL
- Docker
- Cloudinary
- WebSockets
- JavaScript / HTML

----------------------------------------------------
📌 VERSIÓN
----------------------------------------------------

v1.2.5-stable

----------------------------------------------------
📅 ÚLTIMO DESPLIEGUE
----------------------------------------------------

Enero 2026

----------------------------------------------------
👨‍💻 AUTOR
----------------------------------------------------

Desarrollado por:
JUAN PABLO OCAMPO LEÓN

Labsys One Software © 2026
SENA – Centro de los Recursos Renovables La Salada

----------------------------------------------------
📂 REPOSITORIOS
----------------------------------------------------

Front-end:
- https://github.com/tu-usuario/tu-proyecto

Back-end:
- https://github.com/tu-usuario/tu-proyecto

Modelo Base de Datos:
- Pendiente / Por agregar

====================================================
FIN DEL DOCUMENTO
====================================================
