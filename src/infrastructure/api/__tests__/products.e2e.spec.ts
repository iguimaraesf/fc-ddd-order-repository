import { app, sequelize } from "../express"
import request from "supertest"
describe("E2E test for products", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10.0,
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Product 1")
        expect(response.body.price).toBe(10.0)
    })

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
            })
        expect(response.status).toBe(500)
    })

    it("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10.0,
            })
        expect(response.status).toBe(200)
        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 11.0,
            })
        expect(response2.status).toBe(200)

        const listResponse = await request(app).get("/product").send()
        expect(listResponse.status).toBe(200)
        expect(listResponse.body.products.length).toBe(2)
        const r1 = listResponse.body.products[0]
        expect(r1.name).toBe("Product 1")
        const r2 = listResponse.body.products[1]
        expect(r2.name).toBe("Product 2")
    })
})
