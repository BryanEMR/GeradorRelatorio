import { App } from "./app/config/index"
import { AppFront } from "./app/front";
const dotenv = require('dotenv')

dotenv.config();

new App().server.listen(3001);
new AppFront().server.listen(3000);