import { db } from '../db/connection.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function registrarSolicitudVacaciones({ nombre, fechaInicio, fechaFin, motivo }) {
  await db.execute(`
    INSERT INTO vacaciones (nombre, fecha_inicio, fecha_fin, motivo)
    VALUES (?, ?, ?, ?)
  `, [nombre, fechaInicio, fechaFin, motivo]);

  return true;
}

async function notificarDiscord({ nombre, fechaInicio, fechaFin, motivo }) {
  const mensaje = {
    content: `📢 **Nueva solicitud de vacaciones**\n👤 *${nombre}*\n📅 Desde: ${fechaInicio}\n📅 Hasta: ${fechaFin}\n📝 Motivo: ${motivo}`
  };

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mensaje)
  });
}

export {registrarSolicitudVacaciones, notificarDiscord}
