import { DataTypes, Model } from "sequelize";

class OrderItem extends Model {
  static initModel(sequelize) {
    return OrderItem.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      order_id: { type: DataTypes.UUID, allowNull: false },
      product_id: { type: DataTypes.UUID, allowNull: false }
    },
      {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'orderItems',
        timestamps: false,
        underscored: true
      })
  }

  static associate(model) {
    OrderItem.belongsTo(model.Order, { foreignKey: 'order_id', onDelete: 'CASCADE', as: 'orders' });
    OrderItem.belongsTo(model.Product, { foreignKey: 'product_id', as: 'products' });
  }

}

export default OrderItem;