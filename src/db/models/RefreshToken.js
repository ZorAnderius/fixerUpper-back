import { DataTypes, Model } from "sequelize";

class RefreshToken extends Model {
  static initModel(sequelize) {
    return RefreshToken.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        user_id: { type: DataTypes.UUID, allowNull: false },
        jti: { type: DataTypes.STRING, allowNull: false, unique: true },
        token_hash: { type: DataTypes.STRING, allowNull: false },
        revoked: { type: DataTypes.BOOLEAN, defaultValue: false },
        replaced_by: { type: DataTypes.UUID, allowNull: true },
        expires_at: { type: DataTypes.DATE, allowNull: false },
        ip: { type: DataTypes.STRING, allowNull: true },
        user_agent: { type: DataTypes.STRING, allowNull: true },
      },
      {
        sequelize,
        modelName: 'RefreshToken',
        tableName: 'refreshTokens',
        timestamps: true,
        underscored: true,
      });
  }

  static associate(model) {
    RefreshToken.belongsTo(model.User, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'user' });
  }
}

export default RefreshToken;