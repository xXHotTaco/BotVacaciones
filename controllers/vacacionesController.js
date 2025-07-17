import { bdOperation} from '../db/connection.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function registrarSolicitudVacaciones({nombre, fechaInicio, fechaFin, motivo}) {
  try {
    const query = `
      INSERT INTO vacaciones (nombre, fecha_inicio, fecha_fin, motivo)
      VALUES (?, ?, ?, ?)
    `;

    const result = await bdOperation(query, [nombre, fechaInicio, fechaFin, motivo]);


    return true;
  } catch (error) {
    console.error("❌ Error al insertar vacaciones:", error);
    return false; // o lanzar error si quieres que el controlador lo capture
  }
}

async function notificarDiscord({ nombre, fechaInicio, fechaFin, motivo }) {
  const mensaje = {
    content: `📢 **Nueva solicitud de vacaciones**\n👤 *${nombre}*\n📅 Desde: ${fechaInicio}\n📅 Hasta: ${fechaFin}\n📝 Motivo: ${motivo}`
  };

  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mensaje)
    });

    if (!response.ok) {
      console.error('❌ Error al enviar webhook:', await response.text());
    }
  } catch (err) {
    console.error('❌ Error fetch Discord:', err);
  }
}


export {registrarSolicitudVacaciones, notificarDiscord}
