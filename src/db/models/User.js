import { DataTypes, Model } from "sequelize";
import { emailRegexp, phoneRegexp } from "../../constants/regex";

class User extends Model {
  static initModel(sequelize) {
    return User.init({
      id: { type: DataTypes.UUIDV4, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true, is: emailRegexp } },
      phone: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { is: phoneRegexp } },
      password: { type: DataTypes.STRING, allowNull: false },
      avatar_url: { type: DataTypes.STRING, allowNull: true },
      role: { type: DataTypes.STRING, defaultValue: 'customer', allowNull: false },
    }, {
      sequelize,
      modelName: 'user',
      tableName: 'users',
      timestamps: true,
      underscored: true
    })
  }

  static associate(model) {

  }
}

export default User;