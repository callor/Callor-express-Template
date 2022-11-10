import _tbl_sample from "./sample_model.js";
const initModels = (sequelize) => {
  const tbl_sample = _tbl_sample(sequelize);

  return {
    tbl_sample,
  };
};

export default initModels;
