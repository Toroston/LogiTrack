import React from 'react';

const ErrorMessage = ({ responseBody, columnsLength }) => {
    const response = JSON.parse(responseBody.body);

    const codError = responseBody.statusCode ?? "S/código";
    const message = response?.mensaje ?? response?.message ?? "Error consulta";

    const messageToShow = `Error ${codError}, ${message}. Intente en unos minutos.`

    return (
        <>
            <tr style={{ display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center"}}>
                <td colSpan={columnsLength} style={{ padding: '16px' }}>
                    {messageToShow}
                </td>
            </tr>
        </>
    )
}

export default ErrorMessage;