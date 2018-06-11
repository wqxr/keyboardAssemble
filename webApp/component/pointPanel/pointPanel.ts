import { Component, NgZone, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
const dialog = nodeRequire('electron').remote.dialog;
const browserWindow = nodeRequire('electron').remote.getCurrentWindow();
@Component({
    selector: 'point-panel',
    templateUrl: "./webApp/component/pointPanel/pointPanel.html"
})
export class PointPanel {

    private _ngZone: NgZone
    private title: String;
    private pointshow: boolean = true;
    private stationAshow: boolean = true;
    private stationBshow: boolean = true;
    private stationCshow:boolean=false;
    private showFlag: boolean[];
    private machinestatus:number;
    private userinfo:string;
    @Output() ispointPanelShow = new EventEmitter<boolean>();
    private iscongigshow: boolean = true;
    constructor(_ngZone: NgZone) {
        this._ngZone = _ngZone;
        this.title = 'IAStudio';
        this.showFlag = [false, false,true];
    }
    ngOnInit() {
    }
    onclose() {
        this.showMessageBox(browserWindow,{
            type: "warning",
            message: "是否关闭窗口",
            buttons: ["是", "否"],
            defaultId: 0,
            cancelId:-1,
          }).then((btnIndex: number) => {
            if(btnIndex===0){
                this.ispointPanelShow.emit(true);
            }
        })
       
    }
    openStationA() {
        this.stationAshow = false;
        this.stationBshow = true;
        this.stationCshow=true;
        this.showFlag = [true, false,false];
    }
    openstationB() {
        this.stationBshow = false;
        this.stationAshow = true;
        this.stationCshow=true;
        this.showFlag = [false, true,false];
    }
    openstationC(){
        this.stationBshow = true;
        this.stationAshow = true;
        this.stationCshow=false;
        this.showFlag = [false, false,true];
    }
    getUserandOpstatus(opssttus:number,userrole:string){
        this.machinestatus=opssttus;
        this.userinfo=userrole;
    }
    showMessageBox(browswindow:object,options: object) {
        return new Promise(function (resolve, reject) {
          dialog.showMessageBox(browswindow,options, (btnIndex: number) => {
            resolve(btnIndex);
          });
        });
      }
}