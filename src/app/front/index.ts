import express from "express";
import routFront from "./frontRouter";
export class AppFront{
  public server: express.Application;

  constructor(){
    this.server = express();
    this.router();
  }

/* --------------------------- Importação das rotas que será usados no sistema --------------------------- */
  private router(){ //Arquivos de rotas 
    this.server.use(routFront)
    
  }


}