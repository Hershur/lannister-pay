import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;


export {
    PORT,
    SECRET_KEY
}