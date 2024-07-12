import Order from "./order"
import OrderItem from "./order_item"

describe("order unit tests", () => {
    it("should throw error when Id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrow("Id is required")
    })
    it("should throw error when Customer Id is empty", () => {
        expect(() => {
            let order = new Order("111", "", [])
        }).toThrow("Customer Id is required")
    })
    it("should throw error when there are no items", () => {
        expect(() => {
            let order = new Order("1", "1", [])
        }).toThrow("Items are required")
    })
    it("should calculate total", () => {
        const item = new OrderItem("1", "item 1", 100, "p1", 2)
        const order = new Order("2", "2", [item])

        let total = order.total()
        expect(total).toBe(200)

        const item2 = new OrderItem("2", "item 2", 200, "p2", 2)
        const order2 = new Order("3", "3", [item, item2])
        total = order2.total()
        expect(total).toBe(600)
    })
    it("should check if the item quantity is greater than zero", () => {
        expect(() => {
            const item = new OrderItem("1", "item 1", 100, "p1", 0)
            const order = new Order("2", "2", [item])
        }).toThrow("Item quantity must be greater than zero")
    })
})