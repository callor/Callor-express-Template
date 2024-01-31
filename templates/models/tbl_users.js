import { Model } from 'sequelize'

export default class tbl_users extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        username: {
          type: DataTypes.STRING(25),
          allowNull: false,
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING(25),
          allowNull: false,
        },
        enabled: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
        accountNonExpired: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
        accountNonLocked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
        credentialsNonExpired: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
        realname: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        nickname: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(25),
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(15),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(125),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'tbl_users',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'username' }],
          },
        ],
      }
    )
  }
}
