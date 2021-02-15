import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';

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

function RecordsAdd({records, setRecords}) {
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({});

  const dataHandler = (e) => {
    newData[e.target.id] = e.target.value;
    setNewData({ ...newData });
  };

  const selectHandler = (e) => {
    newData[e.target.name] = e.target.value;
    setNewData({ ...newData });
  };

  const submitHandler = () => {

    axios.post("http://localhost:3000/record", newData)
    .then(function(response){
      records.push(response.data)
      setRecords([...records])
    })
    .catch((err) => {
      console.log(err)
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();

  return (
    <div>
      <form className={classes.root}>
        <TextField
          value={newData.amount}
          id="amount"
          label="Monto"
          onChange={dataHandler}
        />
        <TextField
          value={newData.concept}
          id="concept"
          label="Concepto"
          onChange={dataHandler}
        />
        
				<FormControl className={classes.formControl}>
        <InputLabel id="type">Tipo</InputLabel>
          <Select
            labelId="type-label"
            id="type-label"
            name="type"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={selectHandler}
            value={newData.type}
            >
            <MenuItem value={"ingreso"}>Ingreso</MenuItem>
            <MenuItem value={"egreso"}>Egreso</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={submitHandler}>
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default RecordsAdd; 