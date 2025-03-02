# GuatoCa - Aplicación Full Stack para Guardería Canina  

<p align="center">
  <img src="https://github.com/user-attachments/assets/94036227-d684-4d37-a67f-97ae8821310f" alt="Demostración App de GuatoCa">
</p>


GuatoCa es una plataforma completa para gestionar reservas en una guardería canina, ofreciendo una experiencia fluida tanto para usuarios como para administradores. Permite a los dueños de perros reservar servicios fácilmente y a los administradores gestionar reservas, usuarios y servicios desde un dashboard intuitivo.  

## 🚀 Características principales  

### **Para visitantes (sin iniciar sesión):**  
- Explorar la web.  
- Contactar con la guardería.  
- Ver la ubicación en **Google Maps**.  

### **Para usuarios registrados:**  
- Reservar servicios diarios.  
- Modificar o cancelar reservas.  
- Consultar y filtrar sus reservas.  

### **Para administradores:**  
#### **Dashboard**  
- Resumen general con:  
  - Total de reservas activas.  
  - Total de servicios disponibles.  
  - Total de usuarios registrados.  
  - Gráfico de distribución de plazas reservadas.  

#### **Gestión de servicios**  
- Listado de servicios disponibles.  
- Gráfico de plazas ocupadas por servicio.  
- Agregar o eliminar servicios.  

#### **Gestión de reservas**  
- Ver y filtrar todas las reservas.  

#### **Contabilidad**  
- Visualización de ganancias por mes y por servicio.  

#### **Gestión de usuarios**  
- Listado de usuarios registrados.  
- Gráfico con el total de reservas por usuario.  

## 🛠️ Tecnologías utilizadas  

### **Frontend**  
- **React + Tailwind CSS** → Interfaz moderna y responsiva.  
- **Zustand** → Gestión eficiente del estado global.  
- **Formik** → Manejo de formularios intuitivo.  
- **Framer Motion** → Animaciones fluidas.  
- **Sonner** → Notificaciones elegantes.  
- **Recharts** → Visualización de datos en gráficos.  
- **EmailJS** → Envío automático de correos.  

### **Backend**  
- **Python + Flask** → API RESTful ligera y robusta.  
- **PostgreSQL** → Base de datos relacional escalable.  
- **JWT + Bcrypt** → Seguridad en autenticación y almacenamiento de contraseñas.  

### **Integraciones**  
- **Google Maps API** → Ubicación interactiva de la guardería.  

## 📌 Uso  

### **Usuarios**  
1. Regístrate con tu email y contraseña.  
2. Inicia sesión y reserva un día para tu perro.  
3. Opción de borrar y editar las reservas.  

### **Administradores**  
1. Accede al dashboard con credenciales de administrador.  
2. Gestiona reservas, servicios y usuarios desde la interfaz.  

## ⚡ Desafíos y soluciones  
- **Sincronización de reservas:** **Zustand** mantiene el estado actualizado en tiempo real.  
- **Seguridad:** Implementación de **JWT** y **Bcrypt** para proteger cuentas.  
- **Visualización de datos:** **Recharts** permite un monitoreo claro de reservas y ganancias.  

## 👨‍💻 Autor  
**Vicente Torres**
