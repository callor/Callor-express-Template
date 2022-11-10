import _tbl_student from "./sample_model.js";
function initModels(sequelize) {
  var tbl_student = _tbl_student(sequelize);

  return {
    tbl_student,
  };
}
export default initModels;
