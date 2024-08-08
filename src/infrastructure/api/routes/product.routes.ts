import express, { Request, Response } from "express"
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase"

export const productRoutes = express.Router()

productRoutes.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository())
    try {
        const customerDto = {
            name: req.body.name,
            price: req.body.price,
        }
        const output = await usecase.execute(customerDto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})

productRoutes.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository())
    try {
        const output = await usecase.execute({})
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})
