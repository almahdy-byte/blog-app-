import chalk from "chalk"
import { connect } from "mongoose"

const dbConnection = async ()=>{
    await connect(process.env.DB_URI as string)
    .then(()=>{
        console.log("Connected to the database successfully")
    })
    .catch((err)=>{
        console.log("Error connecting to the database" , err)
    })
}

export default dbConnection;