import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../infrastructure/customer/repository/sequelize/customer.model"
import { customerRoutes } from "./routes/customer.routes"
export const app: Express = express()
app.use(express.json())
app.use("/customer", customerRoutes)

export let sequelize: Sequelize
async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    })
    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
}
setupDb()
