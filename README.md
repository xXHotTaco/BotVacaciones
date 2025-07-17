<p align="center">
  <img src="https://i.imgur.com/dM7Thhn.png" width="200" alt="Logo del Proyecto">
</p>

# 🎉 Gestor de Vacaciones y Cumpleaños 📆

> Automatiza recordatorios de vacaciones y cumpleaños vía Webhook de Discord. Perfecto para equipos que quieren mantener el buen ambiente sin olvidar fechas importantes.

---

## 🚀 Funcionalidades

- 📌 Registro de vacaciones con nombre, fecha de inicio, fin y motivo.
- 🎂 Registro de cumpleaños con nombre y fecha de nacimiento.
- ⏰ Notificaciones automáticas en Discord:
  - Un día antes del inicio de vacaciones.
  - El mismo día de cumpleaños.
- 🧠 Jobs automáticos usando `node-cron`.

---

## ⚙️ Requisitos

- Node.js 18 o superior
- Base de datos MySQL
- Webhook de Discord

---

## 📁 Estructura del Proyecto

├── src/
│ ├── jobs/
│ │ ├── cumpleaños.js
│ │ └── vacaciones.js
│ ├── db/
│ │ └── connection.js
│ └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md

## 🛠️ Instalación

```bash
# Clona el proyecto
git clone https://github.com/tuusuario/gestor-fechas.git

# Entra al directorio
cd gestor-fechas

# Instala dependencias
npm install
```

⏰ Tareas Automáticas
Configuradas con node-cron. Se ejecutan automáticamente según la hora del servidor (zona horaria: América/México_City).

🎈 cumpleaños.js → Todos los días a las 9:00 AM.

🏖 vacaciones.js → Todos los días a las 6:00 PM.

Si usas PM2 o algún manejador de procesos, puedes correr el script base que importe y dispare los jobs.

