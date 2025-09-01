import { DataTypes, Model } from "sequelize";

class Product extends Model {
  static initModel(sequelize) {
    return Product.init({
      id: { type: DataTypes.UUIDV4, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      quantity: { type: DataTypes.NUMBER, allowNull: false },
      image_url: { type: DataTypes.STRING, allowNull: true },
      category_id: { type: DataTypes.UUIDV4, allowNull: false },
      status_id: { type: DataTypes.UUIDV4, allowNull: false }
    },
      {
        sequelize,
        modelName: "product",
        tableName: "products",
        timestamps: false,
        underscored: true
      })
  }

  static associate(model) {

  }
}

export default Product;