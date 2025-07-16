import { db } from '../db/connection.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function enviarRecordatorios() {
  // Fecha de mañana (YYYY-MM-DD)
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  const fechaMananaStr = manana.toISOString().split('T')[0];


  // Consulta solicitudes que empiezan mañana
  const [rows] = await db.execute(`
    SELECT nombre, fecha_inicio, fecha_fin, motivo 
    FROM vacaciones 
    WHERE fecha_inicio = ?
  `, [fechaMananaStr]);


  for (const vacacion of rows) {
    const mensaje = {
      content: `⏰ **Recordatorio de vacaciones**\n👤 *${vacacion.nombre}*\n📅 Comienzan mañana: ${vacacion.fecha_inicio}\n📅 Hasta: ${vacacion.fecha_fin}\n📝 Motivo: ${vacacion.motivo}`
    };


    await fetch(process.env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mensaje)
    });
  }
}

export {enviarRecordatorios}