import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_files",
    {
      f_seq: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      f_bseq: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "tbl_bbs",
          key: "b_seq",
        },
      },
      f_image: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      f_origin_image: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
    },

    {
      sequelize,
      tableName: "tbl_files",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "f_seq" }],
        },
        {
          name: "F_BBS",
          using: "BTREE",
          fields: [{ name: "f_bseq" }],
        },
      ],
    }
  );
};
