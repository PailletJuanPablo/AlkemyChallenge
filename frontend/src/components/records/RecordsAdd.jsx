import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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

function RecordsAdd({ records, setRecords, recordToModify }) {
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState(recordToModify);
  const [amountError, setAmountError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    setNewData(recordToModify);
    setAmountError(false);
    setDescriptionError(false);
  }, [recordToModify]);

  const dataHandler = (e) => {
    newData[e.target.id] = e.target.value;
    setNewData({ ...newData });
  };

  const selectHandler = (e) => {
    newData[e.target.name] = e.target.value;
    setNewData({ ...newData });
  };

  const submitHandler = () => {
    if (!newData.type) {
      newData.type = "ingreso";
    }
    if (
      (newData.type === "ingreso" && newData.amount < 0) ||
      isNaN(parseFloat(newData.amount))
    ) {
      setAmountError(true);
      return;
    } else if (newData.type === "egreso" && newData.amount > 0) {
      setAmountError(true);
      return;
    } else {
      setAmountError(false);
    }
    if (newData.id) {
      axios
        .put("http://localhost:3000/record/" + newData.id, newData)
        .then(function () {
          const index = records.findIndex((record) => record.id === newData.id);
          if (index !== -1) {
            records.splice(index, 1, newData);
          }
          setRecords([...records]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:3000/record", newData)
        .then(function (response) {
          records.unshift(response.data);
          if (records.length > 10) {
            records.pop();
          }
          setRecords([...records]);
        })
        .catch((err) => {
          console.log(err);
          setDescriptionError(true);
        });
    }
  };

  const resetHandler = () => {
    setNewData({});
    setAmountError(false);
    setDescriptionError(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();

  return (
    <form className={classes.root}>
      <TextField
        value={newData.amount || ""}
        id="amount"
        label="Monto"
        onChange={dataHandler}
        error={amountError}
        helperText="En caso de ser egreso agregue '-' "
      />
      <TextField
        value={newData.concept || ""}
        id="concept"
        label="Concepto"
        onChange={dataHandler}
        error={descriptionError}
        helperText="El campo debe estar completo"
      />

      <FormControl
        className={classes.formControl}
        disabled={newData.id ? true : false}
      >
        <InputLabel id="type">Tipo</InputLabel>
        <Select
          labelId="type-label"
          id="type-label"
          name="type"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={selectHandler}
          value={newData.type || "ingreso"}
        >
          <MenuItem value={"ingreso"}>Ingreso</MenuItem>
          <MenuItem value={"egreso"}>Egreso</MenuItem>
        </Select>
      </FormControl>
      <div style={{ width: "100%" }}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button variant="contained" onClick={submitHandler}>
            {newData.id ? "Modificar" : "Enviar"}
          </Button>
          <Button variant="contained" onClick={resetHandler}>
            Reset
          </Button>
        </ButtonGroup>
      </div>
    </form>
  );
}

export default RecordsAdd;
