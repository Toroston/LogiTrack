import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetalleEnvio from "../../src/components/DetalleEnvio/DetalleEnvio";

// --- MOCK SERVICIOS ---
jest.mock("../../src/services/UpdateEstadoEnvio", () => ({
  updateEstadoEnvio: jest.fn(),
}));

jest.mock("../../src/services/DeleteEnvio", () => ({
  deleteEnvio: jest.fn(),
}));

import { updateEstadoEnvio } from "../../src/services/UpdateEstadoEnvio";

const envioMock = {
  id: 1,
  trackingId: "TRK-123",
  remitente: "Juan",
  destinatario: "Maria",
  origen: "BA",
  destino: "Rosario",
  tipo: "Normal",
  distancia: 100,
  volumen: 2,
  ventanaHoraria: "08:00 - 12:00",
  restricciones: "Ninguna",
  prioridad: "Media",
  saturacionSimulada: "Media",
  estado: "Creado",
  fechaCreacion: new Date().toISOString(),
  historial: []
};

const supervisorUser = { rol: "Supervisor" };

test("CP10 - Supervisor cambia estado de envío", async () => {
  // Mock de la respuesta del updateEstadoEnvio
  updateEstadoEnvio.mockResolvedValueOnce({
    json: async () => ({
      ...envioMock,
      estado: "En tránsito",
      historial: [{ estado: "En tránsito", timestamp: new Date().toISOString(), usuario: "Supervisor_01" }]
    })
  });

  render(
    <MemoryRouter>
      <DetalleEnvio envio={envioMock} onClose={jest.fn()} user={supervisorUser} />
    </MemoryRouter>
  );

  const selectEstado = screen.getByRole("combobox");
  fireEvent.mouseDown(selectEstado); // abre el menú
  const opcionEnTransito = await screen.findByText("En tránsito");
  fireEvent.click(opcionEnTransito);

  const botonActualizar = screen.getByRole("button", { name: /Actualizar/i });
  fireEvent.click(botonActualizar);

  // Esperamos a que el estado se actualice en la UI
  await waitFor(() => {
    expect(screen.getByText("En tránsito")).toBeInTheDocument();
    expect(screen.getByText(/Eventos de Cambio de Estado: 1/i)).toBeInTheDocument();
  });

  // Verificar que el mock fue llamado con los parámetros correctos
  expect(updateEstadoEnvio).toHaveBeenCalledWith(
    envioMock.id,
    "En tránsito",
    "Supervisor_01"
  );
});