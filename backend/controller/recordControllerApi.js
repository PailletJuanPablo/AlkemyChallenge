const qy = require('.././models/record')

//Get all elements
exports.getAll = async (req, res) => {
  try {
    const query = 'SELECT * FROM records ORDER BY id DESC';

    const response = await qy(query);

    res.send({ "response": response });
  }
  catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }
}
//Create one element
exports.createRecord = async (req, res) => {
  try {
    if (!req.body.concept || !req.body.amount  || !req.body.type) {
      throw new Error("Some data is missing");
    }
    const datetime = new Date()
    const query = 'INSERT INTO records (concept, amount, datetime, type) VALUES (?, ?, ?, ?)';
    const response = await qy(query, [req.body.concept, req.body.amount, datetime, req.body.type]);
    const result = {
      ...req.body,
      id:response.insertId,
      datetime,
    }

    res.send(result);
  }
  catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }
}
//Get 10 elements
exports.getSome = async (req, res) => {
  try {
    const query = 'SELECT * FROM records limit 10';

    const response = await qy(query);

    res.send({ "response": response });
  }
  catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }
}
//Modify one element by id
exports.modifyRecord = async (req, res) => {
  try {

    if (!req.params.id) {
      throw new Error("No id detected");
    }

    let query = 'SELECT * FROM records WHERE id = ?';
    let response = await qy(query, [req.body.concept, req.body.amount, req.body.datetime]);

    if (response.length > 0) {
      throw new Error("Id don't exist");
    }

    query = 'UPDATE records SET concept = ?, amount = ?, datetime = ? WHERE id = ?';
    response = await qy(query, [req.body.concept, req.body.amount, req.body.datetime, req.params.id]);

    res.send({ "response": response.affectedRows });

  }
  catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }
};
//Get one element by id
exports.getOne = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("No id detected");
    }

    const query = 'SELECT * FROM records WHERE id = ?';
    const response = await qy(query, [req.params.id]);
    
    res.send({ "response": response });
  }
  catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }
}

//Get a sum of records
exports.getBalance = async(req, res) => {
  try {
    const query = 'SELECT SUM(amount) as balance FROM records'
    const response = await qy(query);

    res.send({ balance: response[0].balance });
  }
  catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }
}

//Delete One Record
exports.deleteOne = async(req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("No id detected");
    }

    let query = 'DELETE FROM records where id = ?'
    await qy(query, [req.params.id]);
    
    query = 'SELECT * FROM records ORDER BY id DESC';
    const response = await qy(query);

    res.send(response);
  }
  catch (e) {
    console.error(e.message);
    res.status(413).send({ "Error": e.message });
  }
}
