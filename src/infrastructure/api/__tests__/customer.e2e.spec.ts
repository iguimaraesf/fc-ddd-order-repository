import { app, sequelize } from "../express"
import request from "supertest"
describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        // ___________________________________________________
        //
        // Problema:
        // ConnectionManager.getConnection was called after the connection manager was closed!
        // SQLITE_MISUSE: Database is closed
        //
        // Ocorrendo quando se preparava para o segundo teste no beforeEach
        //
        // Node v22.3.0
        // ___________________________________________________
        //
        // Solução 1:
        // usar beforeAll e afterAll
        //
        // Não funciona porque não limpa a base de dados a cada teste
        // ___________________________________________________
        //
        // Solução 2:
        // usar beforeEach e afterAll
        //
        // Só fecha a conexão no final
        // ___________________________________________________
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    number: 1,
                    zip: "12335",
                    city: "City",
                }
            })
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("John")
        expect(response.body.address.street).toBe("Street")
        expect(response.body.address.number).toBe(1)
        expect(response.body.address.zip).toBe("12335")
        expect(response.body.address.city).toBe("City")
    })

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
            })
        expect(response.status).toBe(500)
    })

    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    number: 1,
                    zip: "12335",
                    city: "City",
                }
            })
        expect(response.status).toBe(200)
        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street 2",
                    number: 2,
                    zip: "22222",
                    city: "City 2",
                }
            })
        expect(response2.status).toBe(200)

        const listResponse = await request(app).get("/customer").send()
        expect(listResponse.status).toBe(200)
        expect(listResponse.body.customers.length).toBe(2)
        const customer = listResponse.body.customers[0]
        expect(customer.name).toBe("John")
        expect(customer.address.street).toBe("Street")
        const customer2 = listResponse.body.customers[1]
        expect(customer2.name).toBe("Jane")
        expect(customer2.address.street).toBe("Street 2")

        const listResponseXml = await request(app).get("/customer")
            .set("Accept", "application/xml")
            .send()
        expect(listResponseXml.status).toBe(200)
        expect(listResponseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
        expect(listResponseXml.text).toContain(`<customers>`)
        expect(listResponseXml.text).toContain(`<customer>`)
        expect(listResponseXml.text).toContain(`<name>John</name>`)
        expect(listResponseXml.text).toContain(`<name>Jane</name>`)
        expect(listResponseXml.text).toContain(`</customer>`)
        expect(listResponseXml.text).toContain(`</customers>`)
    })
})
