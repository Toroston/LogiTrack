import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetalleEnvio from "../../src/components/DetalleEnvio/DetalleEnvio";

const mockEnvio = {
  id: "1",
  trackingId: "TRK-123",
  remitente: "Juan",
  destinatario: "Maria",
  estado: "En tránsito",
  fechaCreacion: new Date().toISOString(),
  historial: []
};

test("muestra el detalle del envío", () => {
  render(
    <MemoryRouter >
      <DetalleEnvio envio={mockEnvio} user={{ rol: "Operador" }} />
    </MemoryRouter>
  );

  expect(screen.getByText("TRK-123")).toBeInTheDocument();
  expect(screen.getByText("Juan")).toBeInTheDocument();
  expect(screen.getByText("Maria")).toBeInTheDocument();
  expect(screen.getByText("En tránsito")).toBeInTheDocument();
});