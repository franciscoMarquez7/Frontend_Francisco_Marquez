import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function ListadoCiudades() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCiudad() {
      let response = await fetch(apiUrl + "/ciudades", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Para aceptar cookies en la respuesta y enviarlas si las hay
      });

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getCiudad();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (idciudad) => {
    let response = await fetch(apiUrl + "/ciudades/" + idciudad, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const ciudadesTrasBorrado = rows.filter(
        (ciudad) => ciudad.idciudad != idciudad
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(ciudadesTrasBorrado);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de ciudades
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">IDCIUDAD</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>PAIS</TableCell>
                <TableCell align="right">POBLACION</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.idciudad}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.idciudad}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.pais}</TableCell>
                  <TableCell align="right">{row.poblacion + " €"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.idciudad)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate("/modificarciudad/" + row.idciudad)
                      }
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoCiudades;
