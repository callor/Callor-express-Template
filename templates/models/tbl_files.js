import { DataTyle } from 'sequelize'
export default (sequelize) => {
  return sequelize.define(
    'tbl_files',
    {
      f_seq: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      f_bseq: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'tbl_bbs',
          key: 'b_seq',
        },
      },
      f_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      f_origin_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
    },

    {
      sequelize,
      tableName: 'tbl_files',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'f_seq' }],
        },
        {
          name: 'F_BBS',
          using: 'BTREE',
          fields: [{ name: 'f_bseq' }],
        },
      ],
    }
  )
}
