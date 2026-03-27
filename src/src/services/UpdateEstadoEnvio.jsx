export const updateEstadoEnvio = async (trackingId, nuevoEstado, usuario) => {
  const response = await fetch(`http://localhost:3001/envios/${trackingId}`);
  const envio = await response.json();

  const actualizado = {
    ...envio,
    estado: nuevoEstado,
    historial: [
      ...envio.historial,
      { estado: nuevoEstado, timestamp: new Date().toISOString(), usuario }
    ]
  };

  return fetch(`http://localhost:3001/envios/${trackingId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actualizado)
  });
};