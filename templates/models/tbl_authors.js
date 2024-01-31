import { Model } from 'sequelize'

export default class tbl_authors extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        seq: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(25),
          allowNull: false,
          references: {
            model: 'tbl_users',
            key: 'username',
          },
        },
        authority: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'tbl_authors',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'seq' }],
          },
          {
            name: 'FK_USERNAME',
            using: 'BTREE',
            fields: [{ name: 'username' }],
          },
        ],
      }
    )
  }
}
