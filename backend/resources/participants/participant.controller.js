const router = require("express").Router();
const db = require("../../providers/sequelize.provider");
const { Op } = require("sequelize");
const Participant = db.participants;

router.put("/:id/color", async (req, res) => {
  // 컬러 업데이트
  const id = req.params.id; // 조
  const color = req.body.color;
  try {
    await Participant.update({ profileColor: color }, { where: { id: id } });
    return res.send("success");
  } catch (e) {
    return res.status(500).send("db err1");
  }
});

router.put("/:id/leader", async (req, res) => {
  // 조장 여부 업데이트
  const leaderPeriod = Number(process.env.LEADER_SET_PERIOD) === 1;
  if (leaderPeriod) {
    const id = req.params.id; // 조
    const isLeader = req.body.leader;
    try {
      const leader = await Participant.findByPk(id);
      if (leader) {
        await Participant.update(
          { groupLeader: 0 },
          { where: { group: leader.group } }
        );
        leader.groupLeader = isLeader;
        await leader.save();
        return res.send("success");
      }
      return res.status(401).send("member not found");
    } catch (e) {
      return res.status(500).send("db err1");
    }
  }
  return res.status(403).send("unavailable");
});

router.get("/", async (req, res) => {
  try {
    const { page = 1, group, name } = req.query; // 페이지
    let groupNum = []; // 불러올 조들 리스트

    const resData = {};

    if (name == null) {
      // 이름 검색아닐시
      let groupPage = page * 6 - 5; // 페이지 계산식
      if (group == null) {
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
    } else {
      // 이름 검색일시
      const data = await Participant.findAll({
        where: {
          name: {
            [Op.like]: "%" + name + "%",
          },
        },
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
    const leaderPeriod = Number(process.env.LEADER_SET_PERIOD) === 1;
    return res.send({ leader_period: leaderPeriod, groups: resData });
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
