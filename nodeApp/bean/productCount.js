
/**
 * 每次进料料仓tray盘数加1,每次出料成品数加1
 */
class ProductCount {
    constructor() {
        this.Atraynumber = 0; //成品数量
        this.Btraynumber = 0;  //A料仓tray盘数
        this.totalPCBnumber = 0; //B料仓tray盘数
        this.type = "pcbCounting";
    }
}
module.exports = ProductCount;