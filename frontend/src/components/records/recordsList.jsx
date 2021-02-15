import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Records from './Records'
import RecordsAdd from './RecordsAdd'
import Balance from './Balance'


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

function ModifyRecord({id}){

}


function RecordsTable() {
  const [records, setRecords] = useState([]);
  const [balance, setBalance] = useState(0);

  const handleDelete = (id) => {
    const deleteRecord = async () => {
      await axios.delete('http://localhost:3000/record/' + id)
      .then(function(response){
        setRecords(response.data)
      })
    }
    deleteRecord()
  }

  useEffect(() => {
    const fetchData = async () => {

      await axios.get('http://localhost:3000/record')
      .then(function(response){
        setRecords(response.data.response)

      })
      .catch(function (error) {
        console.log(error);
      })
      
    }
    fetchData()
  }, []);

  useEffect(() => {
    fetchBalance()
  }, [records])
    
  const fetchBalance = async () => {
    await axios.get('http://localhost:3000/balance')
    .then(function(response){
      setBalance(response.data.balance)
    })
    .catch(function (error) {
      console.log(error);
    })
  }



  return (
    <div>
      <Balance balance={balance}/>
      <Records records={records} handleDelete={handleDelete}/>
      <RecordsAdd records={records} setRecords={setRecords}/>
    </div>
  );
}

export default RecordsTable;
