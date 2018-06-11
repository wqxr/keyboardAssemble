const path = require("path");
const fs = require('fs');

const fsEx = require('fs-extra');
const XLSX = require('xlsx');
const iconv = require('iconv-lite');

let LOGS_DIR = "";
const excelTyep = "csv";

const errorLogFileName = "错误日志";
const productdetailName = "生产记录";
const operateName = "操作日志";
const pointName="点位更改表";
//const machineTime="机器时间";
let machineTime="";
let machinelineNo="";
let excelLogUtil = {
  init: init,
  addErrorLogRecord: addErrorLogRecord,
  addProductDetail: addProductDetail,
  addOperateLogRecord: addOperateLogRecord,
  addpointRecord:addpointRecord,
  addMachineTime:addMachineTime,
  getLineNo:getLineNo,
};

/**
 * 
 * @param {MongodbService} mongodbService 
 */
function init() {
  console.log("LOGS_DIR", LOGS_DIR);
  let today = new Date();
  LOGS_DIR = path.join(__dirname, "..", "..", "logs", "日志记录");
  LOGS_DIR = path.join(LOGS_DIR, today.getFullYear() + "年", today.getMonth() + 1 + "月", today.getDate() + "日");
  console.info("LOGS_DIR", LOGS_DIR);
  return fsEx.ensureDir(LOGS_DIR);
}
/**
 * 增加一条机器时间信息
 */

function addMachineTime(data){
  return new Promise((resolve, reject) => {
   
   
    ensureFileForErrorLog(5).
      then(async() => {
        let now=new Date();
        let filePath = path.join(LOGS_DIR, machineTime +"." + excelTyep); 
        let newRow = [];
       // newRow[0] = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
        //newRow[1] = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        newRow[0] = data.product;
        newRow[1]=data.cm;
        newRow[2]=data.cm_line;
        newRow[3]=data.machine_number;
        newRow[4]=data.manufacturer;
        newRow[5]=data.time_local;
        newRow[6]=data.total_time;
        newRow[7]=data.scheduled_time;
        newRow[8]=data.unscheduled_downtime;
        newRow[9]=data.scheduled_downtime;
        newRow[10]=data.engineering_time;
        newRow[11]=data.idle_time;
        newRow[12]=data.production_time;
        newRow[13]=data.unit_count;
        newRow[14]=data.pass_count;
        newRow[15]=data.pass_cycle_time;
        newRow[16]=data.fail_cycle_time;
        newRow[17]=data.planned_cycle_time;
        newRow[18]=data.Date;
        newRow[19]=now.getHours();
        newRow = newRow.join(",");
        newRow = "\r\n" + newRow;
        newRow = iconv.encode(newRow, "GBK");
        fs.appendFile(filePath, newRow, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      })
      .catch((error) => {
        reject(error);
      });

  });

}

/**
 * 增加一条异常信息
 */

function addErrorLogRecord(errorCode, type,message, SN) {
  SN = SN || "";
  return new Promise((resolve, reject) => {
    ensureFileForErrorLog(3).
      then(async() => {
        let filePath = path.join(LOGS_DIR, errorLogFileName + "." + excelTyep);
        let now = new Date();
        let newRow = [];
        newRow[0] = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
        newRow[1] = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        newRow[2] = errorCode;
        newRow[3] = type;
        newRow[4] = message;
        //newRow[4] = SN;
        newRow = newRow.join(",");
        newRow = "\r\n" + newRow;
        newRow = iconv.encode(newRow, "GBK");
        fs.appendFile(filePath, newRow, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      })
      .catch((error) => {
        reject(error);
      });

  });
}
/**
 * 增加一条操作信息
 */
function addOperateLogRecord(message) {
  return new Promise((resolve, reject) => {
    ensureFileForErrorLog(1).
      then(async() => {
        let filePath = path.join(LOGS_DIR, operateName + "." + excelTyep);
        let now = new Date();
        let newRow = [];
        newRow[0] = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
        newRow[1] = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        newRow[2] = message;
        newRow = newRow.join(",");
        newRow = "\r\n" + newRow;
        newRow = iconv.encode(newRow, "GBK");
        fs.appendFile(filePath, newRow, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      })
      .catch((error) => {
        reject(error);
      });

  });
}
function addProductDetail(message) {
  //console.info("wqwq",message);
  // SN = SN||"";
  //Date,Time,PCBSN,TraySN,type,jobnumber,station
 // console.info("wqwqwqwq",message);
  this.init();
  return new Promise((resolve, reject) => {
    ensureFileForErrorLog(2)
    .then(async() => {
        let filePath = path.join(LOGS_DIR, productdetailName + "." + excelTyep);
        //console.info("wqwqwq",filePath);
      //  let filePath = "D:/web/wq/logs/sheng.csv";
        let now = new Date();
        let newRow = [];
        newRow[0] = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
        newRow[1] = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        // newRow[2] = errorCode;
        newRow[2] = message.PCBSN;
        newRow[3] = message.TraySN;
        newRow[4] = message.type;
        newRow[5] = message.jobnumber;
        newRow[6] = message.code;
        newRow = newRow.join(",");
        newRow = "\r\n" + newRow;
        newRow = iconv.encode(newRow, "GBK");
        fs.appendFile(filePath, newRow, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      })
      .catch((error) => {
        reject(error);
      });

  });
}
function addpointRecord(message){
 
 // SN = SN||"";
  return new Promise((resolve,reject)=>{
    
    ensureFileForErrorLog(4)
    .then(async()=>{
      let filePath = path.join(LOGS_DIR,  pointName+ "." + excelTyep);
      let now = new Date();
      let newRow = [];
      newRow[0] =now.getFullYear() + "/"+ (now.getMonth()+1) + "/" + now.getDate()+
      now.getHours() + ":" + now.getMinutes() + ":"+now.getSeconds();
     
      newRow[1]=message.station;
      newRow[2] = message.stationname;
      newRow[3]=message.pointname
      if(message.change==="x"){
        newRow[4]="xPoint从"+message.prexpoint+"改变成"+message.xPoint;
      }else if(message.change==="y"){
        newRow[4]="yPoint从"+message.preypoint+"改变成"+message.yPoint;
      }else if(message.change==="z"){
        newRow[4]="yPoint从"+message.prezpoint+"改变成"+message.zPoint;
      }else if(message.change==="u"){
       newRow[4]="yPoint从"+message.preupoint+"改变成"+message.uPoint;
      }
      newRow = newRow.join(",");
      newRow = "\r\n" + newRow;
      newRow = iconv.encode(newRow, "GBK");
      fs.appendFile(filePath, newRow, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    })
    .catch((error)=>{
      reject(error);
    });
    
  });
}


/**检查按键搜索记录文件是否存在，不存在则初始化该文件 */
// function ensureFileForSearchKey() {
//   return new Promise(function (resolve, reject) {
//     let filePath = path.join(LOGS_DIR, searchKeyFileName + "." + excelTyep);
//     fsEx.pathExists(filePath)
//       .then((isExists) => {
//         if (false === isExists) {
//           return initSearchKeyFile(filePath);
//         } else {
//           return Promise.resolve();
//         }
//       })
//       .then(() => {
//         resolve();
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }
function getLineNo(lineNo){
    let now = new Date();
    let month=(now.getMonth()+1);
    if(month<10){
      month="0"+month;
    }
    let current=now.getFullYear()+month+now.getDate()+"_LD";
    machineTime="WIZS_"+lineNo+"_HA1_"+current;
    console.info("erer"+machineTime);
}
function ensureFileForErrorLog(type) {
  return new Promise(function (resolve, reject) {
    let today = new Date();
    LOGS_DIR = path.join(__dirname, "..", "..", "logs", "日志记录");
    LOGS_DIR = path.join(LOGS_DIR, today.getFullYear() + "年", today.getMonth() + 1 + "月", today.getDate() + "日");
  //  console.info("LOGS_DIR", LOGS_DIR);
    fsEx.ensureDir(LOGS_DIR).then(() => {
      if (type === 1) {
        filePath = path.join(LOGS_DIR, operateName + "." + excelTyep);
      } else if (type === 2) {
        filePath = path.join(LOGS_DIR, productdetailName + "." + excelTyep);
      } else if (type === 3) {
        filePath = path.join(LOGS_DIR, errorLogFileName + "." + excelTyep);
      } else if (type === 4) {
        filePath = path.join(LOGS_DIR, pointName + "." + excelTyep);
      } else if (type === 5) {
        filePath = path.join(LOGS_DIR, machineTime + "." + excelTyep);
      }
      fsEx.pathExists(filePath)
        .then((isExists) => {
          if (false === isExists) {
            return initErrorLogFile(filePath, type);
          } else {
            return Promise.resolve();
          }
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  })

}
 //let filePath = "";   
    //let filePath = path.join(LOGS_DIR, errorLogFileName + "." + excelTyep);

//}

/**
 * 初始化错误日志文件
 * @param {string} filePath 
 */
function initErrorLogFile(filePath, type) {
  let header = ""
  if (type === 1) {
    header = "Date,Time,Description";//操作日志

  } else if (type === 2) {
    header = "Date,Time,PCBSN,TraySN,type,jobnumber,station";//生产日志
  } else if (type === 3) {

    header = "Date,Time,ErrorCode,ErrorType,ErrorDescription";//错误日志
  }else if(type===4){
    header="time,stationID,stationname,pointname,change "//点位示教
  }else if(type===5){
    header="product,cm,cm_line,machine_number,manufacturer,time_local,total_time,scheduled_time,unscheduled_downtime,scheduled_downtime,"+
    "engineering_time,idle_time,production_time,unit_count,pass_count,pass_cycle_time,fail_cycle_time,planned_cycle_time,Date,Hour"
  }
  header = iconv.encode(header, "GBK");
  return fsEx.writeFile(filePath, header);

}

function getTimeStr() {
  let today = new Date();
  let dateStr = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";
  dateStr += today.getHours() + "时" + today.getMinutes() + "分" + today.getSeconds() + "秒";
  return dateStr;
}

module.exports = excelLogUtil;