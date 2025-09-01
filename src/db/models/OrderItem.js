import { DataTypes, Model } from "sequelize";

class OrderItem extends Model {
  static initModel(sequelize) {
    return OrderItem.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1, validate: { isInt: true, min: 0 } },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { isDecimal: true, min: 0 } },
      order_id: { type: DataTypes.UUID, allowNull: false },
      product_id: { type: DataTypes.UUID, allowNull: false }
    },
      {
        sequelize,
        modelName: 'orderItem',
        tableName: 'orderItems',
        timestamps: false,
        underscored: true
      })
  }

  static associate(model) {

  }

}

export default OrderItem;