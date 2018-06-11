
/**
 * 数据库保存的机器配置模型
 */
class MachineConfig{
    constructor(){
        this.IP = "";
        this.MAC_ADDR = "";
        this.Station = "";
        this.MachineNo = "";
        this.StationNo = "";
        this.strHeader = "";
        this.strMAC_ADDR = "";
        this.strStation = "";
        this.strMachineNo = "";
        this.strStationNo = "";
        this.LineNo = "";
        this.outTrayCount = 0;
        this.type = "";
    }
}
module.exports = MachineConfig;