import { toXML, XmlElement, XmlOptions } from "jstoxml"
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
    static toListXML(data: OutputListCustomerDto): string {
        const xmlOptions: XmlOptions = {
            header: true,
            indent: "\t",
            //newLine: "\n",
            //allowEmpty: true,
        }
        const elem: XmlElement = {

        }
        return toXML({
            customers: {
                customer: data.customers.map((customer) => ({
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zip: customer.address.zip,
                        city: customer.address.city,
                    }
                }))
            }
        }, xmlOptions)
    }
}
