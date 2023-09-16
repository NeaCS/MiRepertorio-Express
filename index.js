const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.listen(3000, console.log("Servidor encendido"));

app.use(cors());

//Middleware
app.use(express.json());

app.get("/canciones", async (req, res) => {
  try {
    const jsonCanciones = await fs.readFileSync("canciones.json", "utf-8");
    const canciones = JSON.parse(jsonCanciones);
    res.json(canciones);
  } catch (error) {
    console.log(error);
  }
});

app.post("/canciones", async (req, res) => {
  try {
    const cancionNueva = req.body;
    const jsonCanciones = await fs.readFileSync("canciones.json", "utf-8");
    const canciones = JSON.parse(jsonCanciones);
    canciones.push(cancionNueva);
    await fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send('canción agregada')
  } catch (error) {
    console.log(error);
  }
});

app.put("/canciones/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cancionNueva = req.body;
    const jsonCanciones = await fs.readFileSync("canciones.json", "utf-8");
    const canciones = JSON.parse(jsonCanciones);
    const index = canciones.findIndex((p) => p.id == id);
    canciones[index] = cancionNueva;
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send('cancion modificada con éxito')
  } catch (error) {
    console.log(error);
  }
});

app.delete('/canciones/:id')

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  console.log(__dirname);
});
