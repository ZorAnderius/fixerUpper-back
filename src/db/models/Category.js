import { DataTypes, Model } from "sequelize";

class Category extends Model {
  static initModel(sequelize) {
    return Category.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
      },
      {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: false,
        underscored: true
      }
    )
  }


  static associate(model) {
    Category.hasMany(model.Product, { foreignKey: 'category_id', as: 'products' })
  }
}

export default Category;