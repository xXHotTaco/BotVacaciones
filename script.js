
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(express.json());


const webhookURL = process.env.DCBOT;

app.post('/vacaciones', async (req, res) => {
  const { nombre, fechaInicio, fechaFin, motivo } = req.body;

  const mensaje = {
    content: `📢 **Nueva solicitud de vacaciones**\n👤 *${nombre}*\n📅 Desde: ${fechaInicio}\n📅 Hasta: ${fechaFin}\n📝 Motivo: ${motivo}`
  };

  try {
    await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mensaje)
    });

    res.send({ success: true, message: 'Solicitud enviada a Discord' });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).send({ success: false, error: 'Error al enviar a Discord' });
  }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
