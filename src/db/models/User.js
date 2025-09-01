import { DataTypes, Model } from "sequelize";
import { emailRegexp, phoneRegexp } from "../../constants/regex.js";
import { userRole } from "../../constants/dbStaticData.js";

class User extends Model {
  static initModel(sequelize) {
    return User.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true, is: emailRegexp } },
      phone: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { is: phoneRegexp } },
      password: { type: DataTypes.STRING, allowNull: false },
      avatar_url: { type: DataTypes.STRING, allowNull: true },
      role: { type: DataTypes.STRING, defaultValue: 'customer', allowNull: false, validate: { isIn: [userRole] } },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: true
    })
  }

  static associate(model) {
    User.hasOne(model.Cart, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'cart' });
    User.hasMany(model.Order, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'orers' });
    User.hasMany(model.RefreshToken, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'refreshTokens' });
  }
}

export default User;