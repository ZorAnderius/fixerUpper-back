import { DataTypes, Model } from "sequelize";

class Order extends Model {
  static initModel(sequelize) {
    return Order.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      oder_number: { type: DataTypes.STRING, allowNull: false },
      total_price: { type: DataTypes.NUMBER, allowNull: false, validate: { isNumeric: true, min: 0 } },
      user_id: { type: DataTypes.UUID, allowNull: false }
    },
      {
        sequelize,
        modelName: 'order',
        tableName: 'orders',
        timestamps: true,
        underscored: true
      })
  }

  static associate(model) {

  }
}

export default Order;