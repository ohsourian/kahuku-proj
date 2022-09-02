const router = require("express").Router();
const db = require("../../providers/sequelize.provider");
const Participant = db.participants;

router.post("/", async (req, res) => {
  const newParticipant = {
    name: req.body.name,
    gender: req.body.gender,
    group: req.body.group,
    belong: req.body.belong,
    groupLeader: req.body.groupLeader,
    profileColor: req.body.profileColor,
  };
  try {
    await Participant.create(newParticipant);
    return res.send("success");
  } catch (e) {
    return res.status(500).send("db err");
  }
});

router.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const { name } = req.query;
    const data = await Participant.findAll({
      where: {
        name: name
      }
    });

    const data2 = {
      "1":[
        {
          "id": 16,
          "name": "four_4",
          "gender": 0,
          "group": 4,
          "belong": "강북2",
          "groupLeader": 0,
          "profileColor": "black",
          "createdAt": "2022-09-02T16:40:34.000Z",
          "updatedAt": "2022-09-02T16:40:34.000Z"
      },
      ],
      "2":[
        {
          "id": 16,
          "name": "four_4",
          "gender": 0,
          "group": 4,
          "belong": "강북2",
          "groupLeader": 0,
          "profileColor": "black",
          "createdAt": "2022-09-02T16:40:34.000Z",
          "updatedAt": "2022-09-02T16:40:34.000Z"
      }
      ]
    };
    return res.send(data2);
  } catch (e) {
    console.error(e);
    return res.status(500).send("db err");
  }
});

router.delete("/", async (req, res) => {
  try {
    await Participant.destroy({
      where: {},
      truncate: true
    });
    return res.send("destroy success");
  } catch (e) {
    console.error(e);
    return res.status(500).send("db err");
  }
});

module.exports = router;


//TODO
/*

1. 페이지 조 6개씩 API (페이지)
2. 조하나 조회 API
3. 그룹필터
4. 이름필터

page:
group:

1 3 5 7 9 11 
13 15


real todo

0. 데이터 가공후 1 하기
1. create 하기
2. 처음 페이지 api 만들기 1-50 조
3. 이름필터 

*/


