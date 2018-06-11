export class workModel{
    CCD: number;
    scanCode: number;
    ccdres: number;
    space: number;
    enableStationA: number;
    enableStationB: number;
    showflowin:number;
    // inkeyboard:number;//keyboard上传
    // trayin:number;//tray盘上传
    emptyrun:number;//空炮
    enter:number;
    up:number;
    down:number;
    enableMachineCon:number;
    caps:number;
    JisProduct:number;
    correctTimes:number;
    PcbRoad:number;
    tray_flowline:number;
}
export class machineConnect{
    uiCnt:number;
    CCDCnt:number
    pcbScannerCnt:number;
    trayScannerCnt:number;
    SFCconnect:number;
    constructor(){
        this.uiCnt = 0;
        this.pcbScannerCnt = 0;
        this.trayScannerCnt = 0;
        this.CCDCnt = 0;
        this.SFCconnect=0;
    }
}
