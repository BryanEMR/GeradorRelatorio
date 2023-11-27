
import { Router } from "express";

const routFront = Router()

//Routes
routFront.get("/",(req, res) => {
  res.sendFile( __dirname + "/tela/index.html")
  })

export default routFront ;