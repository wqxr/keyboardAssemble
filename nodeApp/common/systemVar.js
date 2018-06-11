const msgType = {
    UI_HANDLER                :'ui_handler',
    COUNTINFO                 :"countinfo",
    SEND_TO_PAGE              :"send_to_page",
    SEND_TO_MID               :"send_to_mid",
    FEED_MATERIAL             :"feederinfomation",//上料信息
    OUT_MATERIAL              :"outmaterial",
    PAGE_READY_RESULT         :"page_readyResult", 
    OPS_STATUS                :"ops_status"
};
const type = {
    ANSI:0,
    ISO:1,
    JIS:2,
    TYPE_C:3,
    TYPE_D:4,
    TYPE_PJ:14
};
const SUB_TYPE = {
    "normal":"normal",
    "single":"single",
    "custom":"custom"
}
const language = {
    USA:"USA"

};
let productADetail = {
    PCBSN:"",
    TraySN:"",
    type:"",
    jobnumber:"",
    code:"",
    time:"",
    detail:""
}
let productBDetail = {
    PCBSN:"",
    TraySN:"",
    type:"",
    jobnumber:"",
    code:"",
    time:"",
    detail:""
}
const dbName = "keycap_assembling";
module.exports = {
    msgType:msgType,
    subType:SUB_TYPE,
    TYPE:type,
    LANGUAGE:language,
    isDebug:false,
    midExePath:"D:/workspace/SpecialKC.exe",
    midExeDir:"D:/workspace",
    //midExePath:"D:/SpecialKC11/distribute/Debug/SpecialKC.exe",
     //midExeDir:"D:/SpecialKC11/distribute/Debug",
    wsURL:"ws://127.0.0.1:8000",
    mongodbURL:"mongodb://localhost:27017/"+dbName,
    productADetail:productADetail,
    productBDetail:productBDetail
}
