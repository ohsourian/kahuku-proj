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
    var { page } = req.query; // 페이지
    const { name } = req.query; // 이름
    const { group } = req.query; // 조
    var groupNum = []; // 불러올 조들 리스트
    const members = [] // 각각의 조

    page = page*2-1 // 페이지 계산식

    const resData = {};
    if(group == null){ // 기본페이지 네이션
      for (let i = page; i < parseInt(page)+2; i++) {
        console.log(i+"   "+page);
        groupNum.push(i)
      }
      console.log(groupNum);
    }else{ // 특정한 조 검색
      console.log(groupNum);
    }

    const data = await Participant.findAll({
      where: {
        group: groupNum
      },
      raw:true
    });
  


  if(group == null){ 
    var count = page;
    for (let i = page; i < parseInt(page)+2; i++) {
      for (let i = 0; i < data.length; i++) {
        if(data[i].group == count){
          members.push(data[i]);
        };
      };
      count++;
      resData[i] = {members:members};
    }
    return res.send(resData);
  }else{
    return res.send(resData);
    // for (let i = page; i < parseInt(page)+2; i++) {
    //   for (let i = 0; i < data.length; i++) {
    //     if(data[i].group == count){
    //       members.push(data[i]);
    //     };
    //   };
    //   count++;
    //   resData[i] = {members:members};
    // }
    // return res.send(resData);
  }
    

    
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


