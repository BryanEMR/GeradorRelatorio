import express from "express";
import routs from "../routes/index";
import connectMongoDB from './mongoDB'
import router from "../routes/router";
export class App{
  public server: express.Application;

  constructor(){
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware(){
    this.server.use(express.json());
    connectMongoDB()
  }

/* --------------------------- Importação das rotas que será usados no sistema --------------------------- */
  private router(){ //Arquivos de rotas 
    this.server.use(router)
    this.server.use(routs);
  }


}