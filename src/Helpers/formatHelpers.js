export const formatoFecha = (date) => {
    if(date == null) return "";
    let fecha = new Date(date);
    var fechaFormateada = fecha.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return fechaFormateada;
}

export const tableStyleColumn = (props,styles) => {
    return { muiTableBodyCellProps: { ...props, style: { ...styles } } }
}

export const tableStyleHeader = (props, styles) => {
    return { muiTableHeadCellProps: { ...props, style: { ...styles } } }
}