import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
  import CustomerModel from "./customer.model";
  import OrderItemModel from "./order-item.model";
import { NonAttribute } from "sequelize";
  
  @Table({
    tableName: "orders",
    timestamps: false,
  })
  export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;
  
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel

    @HasMany(() => OrderItemModel, {
      
    })
    declare items?: NonAttribute<OrderItemModel[]>
  
    @Column({ allowNull: false })
    declare total: number;
}