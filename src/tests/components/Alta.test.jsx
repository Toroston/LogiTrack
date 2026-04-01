import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AltaEnvio from "../../src/components/AltaEnvio/AltaEnvio";
import MainAlta from "../../src/components/AltaEnvio/MainAlta";

// Mock global de fetch
beforeAll(() => {
  global.fetch = jest.fn();
});

afterAll(() => {
  global.fetch.mockRestore();
});

test("CP1/CP3 - Usuario completa formulario y se genera tracking ID", () => {
  const mockCrear = jest.fn();

  render(
    <MemoryRouter >
        <AltaEnvio onCrear={mockCrear} />
    </MemoryRouter>
  );

  // Given: Usuario en el formulario de alta
  const remitente = screen.getByLabelText(/Remitente/i);
  const destinatario = screen.getByLabelText(/Destinatario/i);
  const origen = screen.getByLabelText(/Origen/i);
  const destino = screen.getByLabelText(/Destino/i);
  const distancia = screen.getByLabelText(/Distancia/i);
  const volumen = screen.getByLabelText(/Volumen/i);
  const ventana = screen.getByLabelText(/Ventana Horaria/i);

  // When: Usuario ingresa datos válidos
  fireEvent.change(remitente, { target: { value: "Juan" } });
  fireEvent.change(destinatario, { target: { value: "Maria" } });
  fireEvent.change(origen, { target: { value: "Buenos Aires" } });
  fireEvent.change(destino, { target: { value: "Rosario" } });
  fireEvent.change(distancia, { target: { value: 300 } });
  fireEvent.change(volumen, { target: { value: 5 } });
  fireEvent.change(ventana, { target: { value: "08:00 - 12:00" } });

  fireEvent.click(screen.getByRole("button", { name: /Crear Envío/i }));

  // Then: Llama a onCrear con datos correctos
  expect(mockCrear).toHaveBeenCalledWith(
    expect.objectContaining({
      remitente: "Juan",
      destinatario: "Maria",
      origen: "Buenos Aires",
      destino: "Rosario",
      distancia: "300",
      volumen: "5",
      ventanaHoraria: "08:00 - 12:00"
    })
  );
});

test("CP2/CP13 - Usuario deja campos vacíos y muestra alerta", () => {
  const mockCrear = jest.fn();
  window.alert = jest.fn(); // mock alert

  render(
    <MemoryRouter >
        <AltaEnvio onCrear={mockCrear} />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole("button", { name: /Crear Envío/i }));

  expect(window.alert).toHaveBeenCalledWith("Por favor, completa todos los campos del envío.");
  expect(mockCrear).not.toHaveBeenCalled();
});

test("CP4/CP5 - Lista envíos existentes", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      {
        trackingId: "TRK-123",
        destinatario: "Maria",
        origen: "BA",
        estado: "Creado",
        fechaCreacion: new Date().toISOString()
      },
      {
        trackingId: "TRK-456",
        destinatario: "Pedro",
        origen: "Rosario",
        estado: "Creado",
        fechaCreacion: new Date().toISOString()
      }
    ]
  });

  render(
    <MemoryRouter>
      <MainAlta />
    </MemoryRouter>
  );

  // Esperamos que los envíos carguen y aparezcan en la tabla
  const envio1 = await screen.findByText("TRK-123");
  const envio2 = await screen.findByText("TRK-456");

  expect(envio1).toBeInTheDocument();
  expect(envio2).toBeInTheDocument();
});