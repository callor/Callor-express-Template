import { DataTyle } from 'sequelize'
const bbs = (sequelize) => {
  return sequelize.define(
    'tbl_bbs',
    {
      b_seq: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      b_title: {
        type: DataTypes.STRING(125),
        allowNull: true,
        defaultValue: '',
      },
      b_content: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: '',
      },
      b_nickname: {
        type: DataTypes.STRING(125),
        allowNull: true,
        defaultValue: '',
      },
      b_password: {
        type: DataTypes.STRING(125),
        allowNull: true,
        defaultValue: '',
      },
      b_ccode: {
        type: DataTypes.STRING(6),
        allowNull: true,
        defaultValue: '',
      },
      b_date: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: '',
      },
      b_viewcount: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
      },
      b_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      b_origin_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
    },
    {
      sequelize,
      tableName: 'tbl_bbs',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'b_seq' }],
        },
      ],
    }
  )
}

export default bbs
