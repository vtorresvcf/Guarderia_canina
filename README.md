# GuatoCa - Aplicación Full Stack para Guardería Canina  

Una app para gestionar reservas de guardería canina, con un dashboard para administradores y una experiencia fluida para usuarios.  

GuatoCa es un proyecto full stack que permite a los usuarios registrarse, iniciar sesión y reservar servicios diarios para sus perros en una guardería canina. Los administradores tienen un panel dedicado con gráficos y tablas para monitorear reservas, servicios y usuarios registrados. Todo está respaldado por una base de datos **PostgreSQL** y potenciado por un stack moderno de tecnologías frontend y backend.  

## 🚀 Características principales  

### **Sin iniciar sesión, puedes:**  
- Ver la web.  
- Contactar.  
- Consultar la ubicación del lugar mediante un mapa.  

### **Con sesión iniciada, puedes:**  
- Reservar.  
- Modificar y borrar tus reservas.  
- Ver y filtrar reservas.  

### **Como administrador, tienes acceso a:**  
#### **Inicio**  
- Resumen de la situación actual con:  
  - Total de reservas activas.  
  - Total de servicios disponibles.  
  - Total de usuarios registrados.  
  - Gráfico con la distribución de plazas reservadas.  

#### **Servicios**  
- Listado de servicios disponibles.  
- Gráfico con el total de plazas ocupadas por servicio.  
- Opción para agregar y eliminar servicios.  

#### **Reservas**  
- Listado de todas las reservas con opción de filtrado.  

#### **Contabilidad**  
- Visualización de ganancias por mes y por servicio.  

#### **Usuarios**  
- Listado de usuarios registrados.  
- Gráfico con el total de reservas realizadas por cada usuario.  

## 🛠️ Tecnologías utilizadas  

### **Frontend**  
- **React:** Construcción de la interfaz de usuario dinámica.  
- **Tailwind CSS:** Estilos modernos y responsivos.  
- **Sonner:** Notificaciones toast elegantes.  
- **Framer Motion:** Animaciones fluidas para una mejor UX.  
- **Formik:** Manejo sencillo de formularios.  
- **Zustand:** Gestión eficiente del estado global.  
- **Recharts:** Gráficos interactivos para el dashboard.  
- **Date Range:** Selector de fechas para reservas.  
- **EmailJS:** Envío de correos automáticos.  

### **Backend**  
- **Python + Flask:** API RESTful robusta y ligera.  
- **JWT:** Autenticación basada en tokens.  
- **Bcrypt:** Hashing seguro de contraseñas.  
- **PostgreSQL:** Base de datos relacional para almacenar usuarios, reservas y servicios.  

### **Integraciones**  
- **Google Maps API:** Muestra la ubicación exacta de la guardería.  

## 📌 Uso  

### **Usuarios**  
1. Regístrate con tu email y contraseña.  
2. Inicia sesión y reserva un día para tu perro usando el calendario.  
3. Recibe una confirmación por correo.  

### **Administradores**  
1. Usa credenciales de admin (definidas en la DB) para acceder al dashboard.  
2. Explora gráficos y tablas para gestionar la guardería.  

## ⚡ Desafíos y soluciones  
- **Sincronización de reservas:** Usé **Zustand** para mantener el estado actualizado entre el frontend y backend.  
- **Seguridad:** Implementé **JWT** y **Bcrypt** para proteger las cuentas.  
- **Visualización de datos:** **Recharts** permitió mostrar tendencias de reservas de forma clara y dinámica.  

## 👨‍💻 Autor  
**Vicente Torres**
