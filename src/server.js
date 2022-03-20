import app from './app';
import { PORT } from './config';
import sequelize from './database/database';
import spdy from 'spdy';
import fs from 'fs';


sequelize.sync({force: 'true'}).then(()=> console.log('Sqllite db running'))


app.set('port', PORT);


spdy.createServer(
    { 
        key: fs.readFileSync("./private.pem"),
        cert: fs.readFileSync("./cert.pem")
    },
    app
).listen(PORT, () => console.log(`Running on port ${PORT}`));
