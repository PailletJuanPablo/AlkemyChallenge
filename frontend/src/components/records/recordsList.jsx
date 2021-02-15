import React, { useState, useEffect } from "react";
import axios from "axios";
import Records from "./Records";
import RecordsAdd from "./RecordsAdd";
import Balance from "./Balance";
import Container from "@material-ui/core/Container";

function RecordsTable() {
  const [records, setRecords] = useState([]);
  const [balance, setBalance] = useState(0);
  const [recordToModify, setRecordToModify] = useState({});

  const handleDelete = (id) => {
    const deleteRecord = async () => {
      await axios
        .delete("http://localhost:3000/record/" + id)
        .then(function (response) {
          setRecords(response.data);
        });
    };
    deleteRecord();
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/recordsome")
        .then(function (response) {
          setRecords(response.data.response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchBalance();
    setRecordToModify({});
  }, [records]);

  const fetchBalance = async () => {
    await axios
      .get("http://localhost:3000/balance")
      .then(function (response) {
        setBalance(response.data.balance);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container>
      <Balance balance={balance} />
      <Records
        records={records}
        handleDelete={handleDelete}
        setRecordToModify={setRecordToModify}
      />
      <RecordsAdd
        records={records}
        setRecords={setRecords}
        recordToModify={recordToModify}
      />
    </Container>
  );
}

export default RecordsTable;
