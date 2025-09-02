import { DataTypes, Model } from "sequelize";

class CartItem extends Model {
  static initModel(sequelize) {
    return CartItem.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      card_id: { type: DataTypes.UUID, allowNull: false },
      product_id: { type: DataTypes.UUID, allowNull: false }
    },
      {
        sequelize,
        modelName: 'CartItem',
        tableName: 'cartItems',
        timestamps: true,
        underscored: true
      })
  }

  static associate(model) {
    CartItem.belongsTo(model.Cart, {foreignKey: 'card_id', onDelete: 'CASCADE', as: 'cart'});
    CartItem.belongsTo(model.Product, {foreignKey: 'product_id', as: 'products'});
  }
}

export default CartItem;