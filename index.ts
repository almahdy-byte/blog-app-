import express, { Application } from 'express';
import dotenv from 'dotenv';
import { bootstrap } from './src/app.controller';
import chalk from 'chalk';
dotenv.config();
const app:Application = express();
const PORT:number =  Number(process.env.PORT);  

bootstrap(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

