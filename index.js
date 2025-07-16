import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
dotenv.config();

import { registrarSolicitudVacaciones, notificarDiscord } from './controllers/vacacionesController.js';
import { enviarRecordatorios } from './controllers/recordatorioController.js';

const app = express();
app.use(express.json());

app.post('/vacaciones', async (req, res) => {
  const { nombre, fechaInicio, fechaFin, motivo } = req.body;

  try {
    await registrarSolicitudVacaciones({ nombre, fechaInicio, fechaFin, motivo });
    await notificarDiscord({ nombre, fechaInicio, fechaFin, motivo });

    res.json({ success: true, message: 'Solicitud registrada y enviada a Discord' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, error: 'Ocurrió un error al procesar la solicitud' });
  }
});


//Falle no se como se usa esta madre
// Ejecutar todos los días a las 9:00 am
// cron.schedule('9 23 * * *', async () => {
//   console.log('🔔 Ejecutando job de recordatorios');
//   try {
//     await enviarRecordatorios();
//   } catch (error) {
//     console.error('❌ Error en recordatorios:', error);
//   }
// });

app.listen(3000, () => console.log('🟢 Servidor corriendo en http://localhost:3000'));
