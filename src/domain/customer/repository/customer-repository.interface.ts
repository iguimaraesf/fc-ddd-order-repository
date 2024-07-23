import RepositoryInterface from "../../@shared/repository/repository-interface";
import Customer from "../entity/customer";
import { CustomerInterface } from "../entity/customer.interface";

export default interface CustomerRepositoryInterface extends RepositoryInterface<CustomerInterface> {
}
