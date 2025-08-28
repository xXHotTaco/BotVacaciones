import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();
//una prueba 1

import { registrarSolicitudVacaciones, notificarDiscord } from './controllers/vacacionesController.js';
import { enviarRecordatorios, notificarCumpleañosHoy } from './controllers/recordatorioController.js';
import { registrarCumple } from './controllers/cumpleController.js';

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

app.post('/birthday', async (req, res) => {
  const { nombre, fechaNacimiento } = req.body;
  const resultado = await registrarCumple({ nombre, fechaNacimiento });

  if (resultado.success) {
    res.json({ success: true, message: 'Cumpleaños registrado 🎉' });
  } else {
    res.status(500).json({ success: false, error: resultado.error });
  }
});



cron.schedule('45 23 * * *', async () => {
  console.log('🔔 Ejecutando job de recordatorios');
  try {
    await enviarRecordatorios();
    await notificarCumpleañosHoy()
  } catch (error) {
    console.error('❌ Error en recordatorios:', error);
  }
});

app.listen(3000, () => console.log('🟢 Servidor corriendo'));
