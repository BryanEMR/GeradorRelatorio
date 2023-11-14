import mongoose from 'mongoose';

export default function connectMongoDB(): void{

    const dotenv = require('dotenv')

    dotenv.config();
    
    const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_URL } = process.env;

    const MONGO_DB_URL = MONGO_URL
    ? MONGO_URL
    : `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`;
    
    console.log("mongoURL", MONGO_DB_URL)

    mongoose.connect(MONGO_DB_URL)
    .then(
        ()=> console.log("Banco conectado")
    ).catch( (err) => {
        console.log("Deu Erro ao conectar ao banco", err)
    })
}

