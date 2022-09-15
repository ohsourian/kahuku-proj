const router = require("express").Router();
const db = require("../../providers/sequelize.provider");
const Participant = db.participants;

router.put("/:id/color", async (req, res) => {
  // 컬러 업데이트
  const id = req.params.id; // 조
  const profileColor = req.body.profileColor;
  try {
    await Participant.update(
      { profileColor: profileColor },
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
  const groupLeader = req.body.groupLeader;
  try {
    await Participant.update(
      { groupLeader: groupLeader },
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

    const groupPage = page * 6 - 5; // 페이지 계산식
    const resData = {};
    if (group == null) {
      // 기본페이지 네이션
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

router.get("/group/:group", async (req, res) => {
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

module.exports = router;
