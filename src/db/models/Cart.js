import { DataTypes, Model } from "sequelize";

class Cart extends Model {
  static initModel(sequelize) {
    return Cart.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      user_id: { type: DataTypes.UUID, allowNull: false }
    },
      {
        sequelize,
        modelName: 'Cart',
        tableName: 'carts',
        timestamps: false,
        underscored: true
      })
  }

  static associate(model) {
    Cart.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
    Cart.hasMany(model.CartItem, { foreignKey: 'cart_id', as: 'cartItems' });
  }
}

export default Cart;