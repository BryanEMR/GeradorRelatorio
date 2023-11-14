
import { Router } from "express";

const routs = Router()

//Routes
routs.get("/",(req, res) => {
    res.send('Olá mundo, Bem-vindo ao Back!')
  })

export default routs ;