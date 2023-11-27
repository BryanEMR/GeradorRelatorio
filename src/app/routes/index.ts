
import { Router } from "express";

const routs = Router()

//Routes
routs.get("/",(req, res) => {
  res.sendFile("../src/app/front")
  })

export default routs ;