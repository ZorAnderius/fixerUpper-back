import { DataTypes, Model } from "sequelize";

class CartItem extends Model {
  static initModel(sequelize) {
    return CartItem.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      card_id: { type: DataTypes.UUID, allowNull: false },
      product_id: { type: DataTypes.UUID, allowNull: false }
    },
      {
        sequelize,
        modelName: 'cartItem',
        tableName: 'cartItems',
        timestamps: true,
        underscored: true
      })
  }

  static associate(model) {

  }
}

export default CartItem;