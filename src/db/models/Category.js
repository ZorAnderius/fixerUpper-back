import { DataTypes, Model } from "sequelize";

class Category extends Model {
  static initModel(sequelize) {
    return Category.init(
      {
        id: { type: DataTypes.UUIDV4, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.UUIDV4, allowNull: false, unique: true }
      },
      {
        sequelize,
        modelName: 'category',
        tableName: 'categories',
        timestamps: false,
        underscored: true
      }
    )
  }


  static associate(model) {
  }
}

export default Category;