import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 👈 IMPORTANTE
import DetalleEnvio from "../../src/src/components/DetalleEnvio/DetalleEnvio";

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
    <MemoryRouter>
      <DetalleEnvio envio={mockEnvio} user={{ rol: "Operador" }} />
    </MemoryRouter>
  );

  expect(screen.getByText("TRK-123")).toBeInTheDocument();
});