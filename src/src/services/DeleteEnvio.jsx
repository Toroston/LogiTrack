export const deleteEnvio = async (trackingId) => {
    return fetch(`http://localhost:3001/envios/${trackingId}`, {
        method: "DELETE"
    });
};