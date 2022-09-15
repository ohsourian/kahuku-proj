const router = require("express").Router();
const db = require("../../providers/sequelize.provider");
const Participant = db.participants;
const fs = require("fs");
const path = require("path");
const filePath = process.env.CSV_SRC_PATH;
const FILE_NAME_PREFIX = "group_";
const sequelize = require("sequelize");
const Op = sequelize.Op;

router.post("/", async (req, res) => {
  // csv 파일 테이블에 넣기
  const groupStart = Number(req.body.begin);
  const groupCnt = Number(req.body.end);
  for (let cnt = groupStart; cnt <= groupCnt; cnt++) {
    const lists = [];
    try {
      // 파일 계속읽기
      const csvPath = path.join(
        __dirname,
        "../../",
        filePath,
        FILE_NAME_PREFIX + cnt + ".csv"
      ); //파일 path
      console.log("!!!!@@"+csvPath)
      const csv = fs.readFileSync(csvPath, "utf-8");
      const rows = csv.split("\n"); // 줄별로 나누기
      for (let i = 1; i < rows.length - 1; i++) {
        // 한줄씩 읽어오기
        const colums = rows[i].split(",");
        var gender = 0;
        var color = "#91cefa";
        if (colums[2] == "남") {
          gender = 0;
          color = "#91cefa";
        } else {
          color = "#e18ca0";
          gender = 1;
        }
        const newParticipant = {
          name: colums[1],
          gender: gender,
          group: cnt,
          belong: colums[4] + "_" + colums[5],
          groupLeader: 0,
          profileColor: color,
        };
        lists.push(newParticipant);
      }
      try {
        await Participant.bulkCreate(lists); // 테이블 update
      } catch (e) {
        return res.status(500).send("db err1");
      }
    } catch (e) {
      //더 이상 읽을 파일없으면 끝내기
      console.log("no file found!");
      break;
    }
  }
  return res.send("group successfully created");
});

router.put("/:id/color", async (req, res) => {
  // 컬러 업데이트
  const id = req.params.id; // 조
  const color = req.body.color;
  try {
    await Participant.update(
      { profileColor: color },
      { where: { id: id } }
    );
    return res.send("success");
  } catch (e) {
    return res.status(500).send("db err1");
  }
});

router.put("/:id/leader", async (req, res) => {
  // 조장 여부 업데이트
  const id = req.params.id; // 조
  const leader = req.body.leader;
  try {
    await Participant.update(
      { groupLeader: leader },
      { where: { id: id } }
    );
    return res.send("success");
  } catch (e) {
    return res.status(500).send("db err1");
  }
});

router.get("/", async (req, res) => {
  try {
    const { page, group, name } = req.query; // 페이지
    let groupNum = []; // 불러올 조들 리스트

    const resData = {};

    if(name == null){ // 이름 검색아닐시
      var groupPage = page * 6 - 5; // 페이지 계산식
      
      if (group == null && page == null) {
        groupPage = 1;
        // 기본페이지 네이션
      }
      if(group == null){
        for (let i = groupPage; i < parseInt(groupPage) + 6; i++) {
          groupNum.push(i);
        }
      } else {
        // 특정한 조 검색
        const items = group.split(",");
        for (let i = 0; i < items.length; i++) {
          groupNum.push(items[i]);
        }
      }
    }else{ // 이름 검색일시 
      const data = await Participant.findAll({
        where:{
          name: {
              [Op.like]: "%" + name + "%"
          }
      }
      });

      for (let i = 0; i < data.length; i++) {
          groupNum.push(data[i].group);
        }
    }
    console.log("조회할 그룹" + groupNum);
    const data = await Participant.findAll({
      where: {
        group: groupNum,
      },
      raw: true,
    });
    // 데이터 가공
    var members = [];
    for (let i = 0; i < groupNum.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].group == groupNum[i]) {
          members.push(data[j]);
        }
      }
      if (members.length != 0) {
        resData[groupNum[i]] = { members: members };
      }
      members = [];
    }
    return res.send(resData);
  } catch (e) {
    console.error(e);
    return res.status(500).send("db err");
  }
});

router.get("/:group", async (req, res) => {
  // 그룹 하나부르기
  try {
    const group = req.params.group; // 조
    const members = []; // 각각의 조
    const resData = {};

    const data = await Participant.findAll({
      where: {
        group: group,
      },
      raw: true,
    });

    for (let i = 0; i < data.length; i++) {
      members.push(data[i]);
    }
    resData[group] = { members: members };
    return res.send(resData);
  } catch (e) {
    console.error(e);
    return res.status(500).send("db err");
  }
});

router.delete("/", async (req, res) => {
  //전체 테이블 삭제
  try {
    await Participant.destroy({
      where: {},
      truncate: true,
    });
    return res.send("destroy success");
  } catch (e) {
    console.error(e);
    return res.status(500).send("db err");
  }
});

module.exports = router;
