import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY;


export {
    PORT,
    SECRET_KEY
}