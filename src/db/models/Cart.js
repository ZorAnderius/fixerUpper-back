import { DataTypes, Model } from "sequelize";

class Cart extends Model {
  static initModel(sequelize) {
    return Cart.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      user_id: { type: DataTypes.UUIDV4, allowNull: false }
    },
      {
        sequelize,
        modelName: 'cart',
        tableName: 'carts',
        timestamps: false,
        underscored: true
      })
  }

  static associate(model) {

  }
}

export default Cart;