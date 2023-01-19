import Sequelize from 'sequelize'
export default (sequelize) => {
  return sequelize.define(
    'tbl_student',
    {
      st_num: {
        type: Sequelize.DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      st_name: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      st_dept: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      st_grade: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      st_tel: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: true,
      },
      st_addr: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_student',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'st_num' }],
        },
      ],
    }
  )
}
