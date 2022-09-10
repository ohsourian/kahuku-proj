const router = require("express").Router();
const db = require("../../providers/sequelize.provider");
const Participant = db.participants;
const fs = require("fs");
const path = require("path");
const { equal } = require("assert");
var file_name = "group_"

router.post("/", async (req, res) => { // csv 파일 테이블에 넣기
  const lists = []; //넣을 테이블 리스트
  var group_count = 1; //조 카운트
  while(true){ 
    try {// 파일 계속읽기
      const csvPath = path.join(__dirname,'../..','group_samples',file_name + group_count+".csv"); //파일 path
      const csv = fs.readFileSync(csvPath,"utf-8");
      const rows = csv.split("\n") // 줄별로 나누기
      for (let i = 1; i < rows.length - 1; i++) { // 한줄씩 읽어오기
        const colums = rows[i].split(",")
        var gender = 0;
        if (colums[2] == "남"){
          gender = 0;
        }else{
          gender = 1;
        }
        const newParticipant = {
          name: colums[1],
          gender: gender,
          group: group_count,
          belong: colums[4]+"_"+colums[5],
          groupLeader: 0,
          profileColor: "#000000",
        };
        lists.push(newParticipant);
      }
      group_count++;
    }catch (e) { //더 이상 읽을 파일없으면 끝내기
      break;
    }
  }
  try {
    await Participant.bulkCreate(lists); // 테이블 update
    return res.send("group successfully created");
  } catch (e) {
    return res.status(500).send("db err1");
  }
});

router.post("/:id/profileColor", async (req, res) => { // 컬러 업데이트
  const id = req.params.id; // 조
  const profileColor = req.body.profileColor;
  try {
    await Participant.update({profileColor:profileColor},{where:{id:id}});
    return res.send("success");
  } catch (e) {
    return res.status(500).send("db err1");
  }
});

router.post("/:id/groupLeader", async (req, res) => { // 조장 여부 업데이트
  const id = req.params.id; // 조
  const groupLeader = req.body.groupLeader;
  try {
    await Participant.update({groupLeader:groupLeader},{where:{id:id}});
    return res.send("success");
  } catch (e) {
    return res.status(500).send("db err1");
  }
});

router.get("/", async (req, res) => { 
  try {
    var { page } = req.query; // 페이지
    const { group } = req.query; // 조
    const { name } = req.query; // 이름
    var groupNum = []; // 불러올 조들 리스트
  
    page = page*6-5 // 페이지 계산식
    const resData = {};
    if(group == null){ // 기본페이지 네이션
      for (let i = page; i < parseInt(page)+6; i++) {
        groupNum.push(i)
      }
    }else{ // 특정한 조 검색
      const items = group.split(",")
      for (let i = 0; i < items.length; i++) {
        groupNum.push(items[i])
      }
    }

    console.log("조회할 그룹"+groupNum);
    const data = await Participant.findAll({
      where: {
        group: groupNum
      },
      raw:true
    });

    // 데이터 가공
    var members = [];
    for (let i = 0; i < groupNum.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if(data[j].group == groupNum[i]){
          members.push(data[j]);
        };
      };
      if(members.length != 0){
        resData[groupNum[i]] = {members:members};
      }
      members = [];
    }
    return res.send(resData);

  } catch (e) {
    console.error(e);
    return res.status(500).send("db err");
  }
});

router.get("/:group", async (req, res) => {  // 그룹 하나부르기
  try {
    const group = req.params.group; // 조
    const members = [] // 각각의 조
    const resData = {};

    const data = await Participant.findAll({
      where: {
        group: group
      },
      raw:true
    });

    for (let i = 0; i < data.length; i++) {
        members.push(data[i]);
    };
    
    resData[group] = {members:members};
    return res.send(resData);
  
  } catch (e) {
    console.error(e);
    return res.status(500).send("db err");
  }
});

router.delete("/", async (req, res) => { //전체 테이블 삭제
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