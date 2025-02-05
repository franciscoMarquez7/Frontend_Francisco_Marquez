import React from "react";

const Tabla = ({ datos, columnas, onModificar, onEliminar }) => {
  return (
    <table>
      <thead>
        <tr>
          {columnas.map((columna) => (
            <th key={columna}>{columna}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((dato) => (
          <tr key={dato.id}>
            {columnas.map((columna) => (
              <td key={columna}>{dato[columna]}</td>
            ))}
            <td>
              <button onClick={() => onModificar(dato.id)}>Modificar</button>
              <button onClick={() => onEliminar(dato.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
