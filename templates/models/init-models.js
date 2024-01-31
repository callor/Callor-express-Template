import { DataTypes } from 'sequelize'

import _tbl_authors from './tbl_authors.js'
import _tbl_users from './tbl_users.js'

export default function initModels(sequelize) {
  // 모델 이름 설정
  const tbl_authors = _tbl_authors.init(sequelize, DataTypes)
  const tbl_users = _tbl_users.init(sequelize, DataTypes)

  /**
   * tbl_files 와 tbl_bbs 를 b_seq 칼럼으로 join 하기
   * SourceModel.belongsTo(TargetModel) : 외래키가 source모델에 존재하는 연결관계, N 인 테이블
   * SourceModel.hasMany(TargetModel) : 외래 키가 target모델에 존재하는 관계, 1 인 테이블
   * as : TargetModel 별명
   *    include 사용 시 쿼리 결과 값이 모델명으로 지정되는데,
   *    이는 foreignKey에서 AS 사용으로 include 에서도 같은 AS 명을 사용해야 함
   * foreignKey : 외래키 이름
   * sourceKey : 연결할 source 모델의 컬럼 이름
   * targetKey : 연결할 target 모델의 컬럼 이름
   */
  tbl_authors.belongsTo(tbl_users, { as: 'username_tbl_user', foreignKey: 'username' })
  tbl_users.hasMany(tbl_authors, { as: 'tbl_authors', foreignKey: 'username' })

  // 다른 곳에서 model 을 사용할수 있도록 export 준비
  return {
    tbl_authors,
    tbl_users,
  }
}
