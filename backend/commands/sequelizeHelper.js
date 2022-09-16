const db = require("../providers/sequelize.provider");
const Participant = db.participants;
const fs = require("fs");
const path = require("path");
const filePath = process.env.CSV_SRC_PATH;
const FILE_NAME_PREFIX = "group_";

async function fetchData(begin, end) {
  for (let cnt = begin; cnt <= end; cnt++) {
    const lists = [];
    let csv;
    let csvPath;
    try {
      // 파일 계속읽기
      csvPath = path.join(
        process.cwd(),
        filePath,
        FILE_NAME_PREFIX + cnt + ".csv"
      ); //파일 path
      csv = fs.readFileSync(csvPath, "utf-8");
    } catch (e) {
      throw new Error(`${csvPath} File Not Exist`);
    }
    try {
      const rows = csv.split("\n"); // 줄별로 나누기
      for (let i = 1; i < rows.length - 1; i++) {
        // 한줄씩 읽어오기
        const colums = rows[i].split(",");
        let gender = colums[2] === "남" ? 0 : 1;
        const newParticipant = {
          name: colums[1],
          gender: gender,
          group: cnt,
          belong: colums[4] + "_" + colums[5],
          groupLeader: 0,
          profileColor: gender === 0 ? "#91cefa" : "#e18ca0",
        };
        lists.push(newParticipant);
      }
      await Participant.bulkCreate(lists); // 테이블 update
    } catch (e) {
      //더 이상 읽을 파일없으면 끝내기
      throw new Error("DB Connection Error");
    }
  }
  console.log("fetch DB finished");
}

async function truncate() {
  await Participant.destroy({
    where: {},
    truncate: true,
  });
  console.log("truncate finished");
}

module.exports = {
  fetchData,
  truncate,
};
