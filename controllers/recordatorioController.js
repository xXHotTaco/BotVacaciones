import { bdOperation} from '../db/connection.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Mexico_City' // Asegura hora correcta
  }).format(new Date(fecha));
}


async function enviarRecordatorios() {
  // Fecha de mañana (YYYY-MM-DD)
const manana = new Date();
manana.setDate(manana.getDate() + 1);

const yyyy = manana.getFullYear();
const mm = String(manana.getMonth() + 1).padStart(2, '0');
const dd = String(manana.getDate()).padStart(2, '0');

const fechaMananaStr = `${yyyy}-${mm}-${dd}`;

  let query = `SELECT nombre, fecha_inicio, fecha_fin, motivo 
               FROM vacaciones WHERE fecha_inicio = ?`
 
  let rows = await bdOperation(query, fechaMananaStr)

  for (const vacacion of rows) {
  const mensaje = {
    content: `⏰ **Recordatorio de vacaciones**\n` +
             `👤 *${vacacion.nombre}*\n` +
             `📅 Comienzan mañana: ${formatearFecha(vacacion.fecha_inicio)}\n` +
             `📅 Hasta: ${formatearFecha(vacacion.fecha_fin)}\n` +
             `📝 Motivo: ${vacacion.motivo}`
  };

    await fetch(process.env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mensaje)
    });
  }
}

async function notificarCumpleañosHoy() {
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);

  const mm = String(manana.getMonth() + 1).padStart(2, '0');
  const dd = String(manana.getDate()).padStart(2, '0');


  const query = `
    SELECT nombre FROM cumpleaños
    WHERE DATE_FORMAT(fecha_nacimiento, '%m-%d') = ?
  `;

  const empleados = await bdOperation(query, [`${mm}-${dd}`]);


  for (const { nombre } of empleados) {
    await fetch(process.env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🎉 Mañana es el cumpleaños de *${nombre}* ¡Felicidades! 🥳`
      })
    });
  }
}

export {enviarRecordatorios, notificarCumpleañosHoy}