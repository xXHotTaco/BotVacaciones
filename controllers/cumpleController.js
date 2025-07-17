import { bdOperation } from "../db/connection.js";


async function registrarCumple({ nombre, fechaNacimiento }) {
  try {
    const query = `INSERT INTO cumpleaños (nombre, fecha_nacimiento) VALUES (?, ?)`;
    const result = await bdOperation(query, [nombre, fechaNacimiento]);

    return {
      success: true,
      insertId: result.insertId
    };
  } catch (error) {
    console.error('❌ Error al registrar cumpleaños:', error);
    return {
      success: false,
      error: 'No se pudo registrar el cumpleaños'
    };
  }
}


export { registrarCumple }