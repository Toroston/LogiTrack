import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BusquedaEnvio from "../../src/components/BusquedaEnvio/BusquedaEnvio";

// --- MOCK GLOBAL FETCH ---
beforeAll(() => {
    global.fetch = jest.fn();
});

afterAll(() => {
    global.fetch.mockRestore();
});

const userMock = { rol: "Operador" };

const enviosMock = [
    { trackingId: "TRK-123", remitente: "Juan", destinatario: "Maria", origen: "BA", destino: "Rosario", estado: "Creado", fechaCreacion: new Date().toISOString(), historial: [] },
    { trackingId: "TRK-456", remitente: "Pedro", destinatario: "Ana", origen: "Rosario", destino: "Cordoba", estado: "Creado", fechaCreacion: new Date().toISOString(), historial: [] }
];

test("CP6 - Buscar tracking existente devuelve resultado", async () => {
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [enviosMock[0]]
    });

    render(
        <MemoryRouter>
            <BusquedaEnvio user={userMock} />
        </MemoryRouter>
    );

    const input = screen.getByLabelText(/Ingresá el Tracking ID/i);
    const botonBuscar = screen.getByRole("button", { name: /Buscar/i });

    fireEvent.change(input, { target: { value: "TRK-123" } });
    fireEvent.click(botonBuscar);

    await waitFor(() => {
        expect(screen.getByText("TRK-123")).toBeInTheDocument();
        expect(screen.getByText("Juan")).toBeInTheDocument();
        expect(screen.getByText("Maria")).toBeInTheDocument();
    });
});

test("CP7 - Buscar tracking inexistente muestra mensaje 'No se encontró'", async () => {
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
    });

    render(
        <MemoryRouter>
            <BusquedaEnvio user={userMock} />
        </MemoryRouter>
    );

    const input = screen.getByLabelText(/Ingresá el Tracking ID/i);
    const botonBuscar = screen.getByRole("button", { name: /Buscar/i });

    fireEvent.change(input, { target: { value: "TRK-999" } });
    fireEvent.click(botonBuscar);

    await waitFor(() => {
        expect(screen.getByText(/No se encontró ningún envío/i)).toBeInTheDocument();
    });
});


test("CP8 - Buscar por destinatario lista coincidencias", async () => {
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [enviosMock[1]] // Pedro -> Ana
    });

    render(
        <MemoryRouter>
            <BusquedaEnvio user={userMock} />
        </MemoryRouter>
    );

    const input = screen.getByLabelText(/Ingresá el Tracking ID/i);
    const botonBuscar = screen.getByRole("button", { name: /Buscar/i });

    fireEvent.change(input, { target: { value: "TRK-456" } });
    fireEvent.click(botonBuscar);

    await waitFor(() => {
        expect(screen.getByText("TRK-456")).toBeInTheDocument();
        expect(screen.getByText("Pedro")).toBeInTheDocument();
        expect(screen.getByText("Ana")).toBeInTheDocument();
    });
});

test("CP9 - Ver detalle de envío existente muestra info completa", async () => {
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [enviosMock[0]]
    });

    render(
        <MemoryRouter>
            <BusquedaEnvio user={userMock} />
        </MemoryRouter>
    );

    const input = screen.getByLabelText(/Ingresá el Tracking ID/i);
    const botonBuscar = screen.getByRole("button", { name: /Buscar/i });

    fireEvent.change(input, { target: { value: "TRK-123" } });
    fireEvent.click(botonBuscar);

    // Esperamos a que se renderice el detalle (DetalleEnvio)
    await waitFor(() => {
        expect(screen.getByText("TRK-123")).toBeInTheDocument();
        expect(screen.getByText("Creado")).toBeInTheDocument();
        expect(screen.getByText("BA")).toBeInTheDocument();
        expect(screen.getByText("Rosario")).toBeInTheDocument();
    });
});


