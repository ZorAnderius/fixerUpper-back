import { DataTypes, Model } from "sequelize";

class Product extends Model {
  static initModel(sequelize) {
    return Product.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { isDecimal: true, min: 0 } },
      quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { isInt: true, min: 0 }, defaultValue: 1 },
      image_url: { type: DataTypes.STRING, allowNull: true },
      category_id: { type: DataTypes.UUID, allowNull: false },
      status_id: { type: DataTypes.UUID, allowNull: false }
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