GuatoCa - Aplicación Full Stack para Guardería Canina


Una app para gestionar reservas de guardería canina, con un dashboard para administradores y una experiencia fluida para usuarios.

GuatoCa es un proyecto full stack que permite a los usuarios registrarse, iniciar sesión y reservar servicios diarios para sus perros en una guardería canina. Los administradores tienen un panel dedicado con gráficos y tablas para monitorear reservas, servicios y usuarios registrados. Todo está respaldado por una base de datos PostgreSQL y potenciado por un stack moderno de tecnologías frontend y backend.

Características principales
Para usuarios
Registro e inicio de sesión: Autenticación segura para acceder a la plataforma.
Reservas por día: Selecciona fechas para reservar servicios usando un calendario interactivo.
Ubicación integrada: Visualiza la guardería en Google Maps.
Notificaciones: Alertas toast con Sonner y correos automáticos vía EmailJS.
Para administradores
Dashboard completo: Vista global de reservas, servicios y usuarios.
Gráficos dinámicos: Visualización de datos con Recharts (ej. reservas por día).
Tablas detalladas: Listados filtrables de usuarios y servicios.
Gestión en tiempo real: Actualizaciones inmediatas del estado de las reservas.
Tecnologías utilizadas
Frontend
React: Construcción de la interfaz de usuario dinámica.
Tailwind CSS: Estilos modernos y responsivos.
Sonner: Notificaciones toast elegantes.
Framer Motion: Animaciones fluidas para una mejor UX.
Formik: Manejo sencillo de formularios.
Zustand: Gestión eficiente del estado global.
Recharts: Gráficos interactivos para el dashboard.
Date Range: Selector de fechas para reservas.
EmailJS: Envío de correos automáticos.
Backend
Python + Flask: API RESTful robusta y ligera.
JWT: Autenticación basada en tokens.
Bcrypt: Hashing seguro de contraseñas.
PostgreSQL: Base de datos relacional para almacenar usuarios, reservas y servicios.
Integraciones
Google Maps API: Muestra la ubicación exacta de la guardería.
Uso
Usuarios
Regístrate con tu email y contraseña.
Inicia sesión y reserva un día para tu perro usando el calendario.
Recibe una confirmación por correo.
Administradores
Usa credenciales de admin (definidas en la DB) para acceder al dashboard.
Explora gráficos y tablas para gestionar la guardería.
Desafíos y soluciones
Sincronización de reservas: Usé Zustand para mantener el estado actualizado entre el frontend y backend.
Seguridad: Implementé JWT y Bcrypt para proteger las cuentas.
Visualización de datos: Recharts permitió mostrar tendencias de reservas de forma clara y dinámica.

Autor
Vicente Torres
