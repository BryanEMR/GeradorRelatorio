import { App } from "./app/config/index"
const dotenv = require('dotenv')

dotenv.config();

const { PORT } = process.env

new App().server.listen(PORT || 3000);