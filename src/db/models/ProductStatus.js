import { DataTypes, Model } from "sequelize";
import { productStates } from "../../constants/dbStaticData";

class ProductStatus extends Model {

  static initModel(sequelize) {
    return ProductStatus.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        status: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [productStates] } }
      },
      {
        sequelize,
        modelName: 'productStatus',
        tableName: 'productStatuses',
        timestamps: false,
        underscored: true
      })
  }

  static associate(model) {

  }
}

export default ProductStatus;