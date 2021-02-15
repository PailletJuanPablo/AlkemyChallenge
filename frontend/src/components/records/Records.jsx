import React from "react";
import {
  Table,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
} from "@material-ui/core/";
import Moment from "react-moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Records({ records, handleDelete, setRecordToModify }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Concepto</TableCell>
            <TableCell align="center">Monto</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.concept}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">
                <Moment format="DD/MM/YYYY hh:mm:ss">
                  {row.datetime.toString()}
                </Moment>
              </TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  <Button onClick={() => setRecordToModify(row)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Records;
