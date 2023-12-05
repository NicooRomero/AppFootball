Gestor de Torneo de Fútbol con Next.js
Este proyecto es una aplicación web desarrollada con Next.js para administrar un torneo de fútbol. Proporciona un conjunto de funcionalidades para gestionar equipos, jugadores y detalles del torneo, así como un dashboard para visualizar la cantidad de equipos y usuarios registrados.

Características
Dashboard: Muestra dos secciones que reflejan la cantidad de equipos y usuarios registrados en el torneo.

Módulos:

Jugadores: Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los jugadores inscritos en el torneo.
Equipos: Gestiona la información de los equipos participantes en el torneo, incluyendo sus detalles, jugadores asociados, etc.
Torneo: Proporciona la funcionalidad para administrar los detalles del torneo en curso, generar fixture, modificar resultado de partidos.
Invitaciones/Notificaciones: Por cada invitacion a formar parte de un equipo, llega la correspondiente notificacion. La cual los usuarios deberan aceptar.

Roles: 
Admin: Puede realizar todo.
Team Leaders: Realizan acciones sobre su equipo, invitar jugadores, eliminar jugadores de su equipo.
Jugadores: Actuan sobre su propio perfil

USUARIOS DE PRUEBA:
admin: admin@gmail.com
Otros Usuarios: prueba2@gmail.com
               juanpe@gmail.com 
               davidsmith@email.com
               modegaard@arsenal.com

pw: 94694747 (misma para todos)

Tecnologías Utilizadas
Frontend:
Desarrollado con Next.js
Uso de Tailwind CSS para estilos y SCSS para estilización adicional
Backend:
Node.js y Express para la creación del servidor
MongoDB como base de datos para almacenar la información de la aplicación

Instalación
Clona el repositorio:

bash
Copy code
git clone https://github.com/NicooRomero/AppFootball.git
cd frontend
cd backend
Instala las dependencias:

bash
Copy code
npm install
Configuración de MongoDB

Ejecutar la aplicación:

bash
Copy code
npm run dev
Esto iniciará el servidor de desarrollo. Abre http://localhost:3000 en tu navegador para ver la aplicación.

Autor
Nombre: Nicolas Romero
Contacto: nicooromero@gmail.com
