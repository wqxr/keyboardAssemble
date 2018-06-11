
/**
 * 数据库保存的工作方式模型
 */
class WorkConfig {
    constructor() {
        this.space = "";   //空格键扣合
        this.up = "";       //上键扣合
        this.down = "";     //下键扣合
        this.enter = "";    //enter键扣合
        this.scanCode = ""; //扫码
        this.showflowin = "";  //shopflow上传
        this.CCD = "";      //启用CCD拍照
        this.ccdres = "";   //CCD拍照结果
        this.enableStationA = ""; //启用A工站
        this.enableStationB = "";  //启用B工站
        this.emptyrun = "";         //空跑
        this.enableMachineCon = ""; //设备连接
        this.type = "";
    }
}
module.exports = WorkConfig;