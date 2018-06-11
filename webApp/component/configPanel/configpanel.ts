import { Component,NgZone,Input,Output,EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { IOService } from '../../service/io.service';
import { Observable, Subscription } from 'rxjs';
import { IOList,IOData } from '../../common/bean/IOData';
import { IPCService } from '../../common/service/ipc.service';
const dialog = nodeRequire('electron').remote.dialog;
const browserWindow = nodeRequire('electron').remote.getCurrentWindow();



@Component({
  selector: 'config-panel',
  templateUrl:"./webApp/component/configPanel/configpanel.html"
})


export class Configpanel{

    private _ngZone: NgZone
    private title: String;
    private isShow:boolean=true;
    private iOList = IOList;
    private ipcService:IPCService;
    private IOService:IOService;
    
    
    @Output() ioisShow = new EventEmitter<boolean>();
    private iscongigshow:boolean=true;
    constructor(_ngZone: NgZone,ipcServive:IPCService,IOService:IOService) {
        this._ngZone = _ngZone;
        this.title = 'IAStudio';
        this.ipcService=ipcServive;
        this.IOService = IOService;
        console.log(_.isString(this.title));



    }
    switchTab(tabIndex:number){
        this.iOList.forEach ((item)=>{
            item.hidden = true;
        });
        this.iOList[tabIndex].hidden = false;
    }
    ngOnInit() {
        this.iOList[0].hidden = false;
        this.ipcService.on("operateIO_result", (message) => {
            this._ngZone.run(() => {
                this.IOService.parseIntIo(message.data.cardID,message.data.value,message.data.IOtype);
                //this.iOService.updateCardIo(ioVal);
            });
        });
    }
    operateIo(io:IOData){
       // let val = io.value;
        io.value = io.value === 0 ? 1:0;
       // let value=val;
        let name=io.name;
        this.ipcService.send("operateIo",{
            'cardId':io.cardId,'index':io.index,'value':io.value,'name':name
        });
        // if(io.value===1){
        //     io.value=0;
        // }else{
        //     io.value=1;
        // }
        
    }
    showMessageBox(browswindow:object,options: object) {
        return new Promise(function (resolve, reject) {
          dialog.showMessageBox(browswindow,options, (btnIndex: number) => {
            resolve(btnIndex);
          });
        });
      }
    onclose(){
        this.showMessageBox(browserWindow,{
            type: "warning",
            message: "是否关闭窗口",
            buttons: ["是", "否"],
            defaultId: 0,
            cancelId:-1,
          }).then((btnIndex: number) => {
            if(btnIndex===0){
                this.ioisShow.emit(true);   
            }
        })
         
      
      }
}