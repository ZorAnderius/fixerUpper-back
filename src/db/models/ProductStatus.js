import { DataTypes, Model } from "sequelize";
import { productStates } from "../../constants/dbStaticData.js";

class ProductStatus extends Model {

  static initModel(sequelize) {
    return ProductStatus.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        status: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [productStates] } }
      },
      {
        sequelize,
        modelName: 'ProductStatus',
        tableName: 'productStatuses',
        timestamps: false,
        underscored: true
      })
  }

  static associate(model) {
    ProductStatus.hasMany(model.Product, { foreignKey: 'status_id', as: 'products' });
  }
}

export default ProductStatus;