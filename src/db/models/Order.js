import { DataTypes, Model } from "sequelize";

class Order extends Model {
  static initModel(sequelize) {
    return Order.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      oder_number: { type: DataTypes.STRING, allowNull: false },
      total_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false},
      user_id: { type: DataTypes.UUID, allowNull: false }
    },
      {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
        underscored: true
      })
  }

  static associate(model) {
    Order.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
    Order.hasMany(model.OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE', as: 'orderItems' });
  }
}

export default Order;