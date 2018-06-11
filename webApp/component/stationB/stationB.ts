import { Component,NgZone,Input,Output,EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { IOListB ,IOListB1} from '../../common/bean/Pointdata';
import { IPCService } from '../../common/service/ipc.service';



@Component({
  selector: 'station-b',
  templateUrl:"./webApp/component/stationB/stationB.html"
})


export class StationB{

    private _ngZone: NgZone
    private title: String;
    private isShow:boolean=true;
    private ioListB = IOListB;
    private ioListold=IOListB1;
    private ipcService:IPCService;
    @Input()
    private machinestatus:number;
    @Input()
    private userrole:string;
    @Output() ioisShow = new EventEmitter<boolean>();
    private iscongigshow:boolean=true;
    constructor(_ngZone: NgZone,ipcService:IPCService) {
        this._ngZone = _ngZone;
        this.title = 'IAStudio';
        this.ipcService=ipcService;    
    }
    ngOnInit() {
      this.ipcService.on("getPoint",(data)=>{//获取点位
        this._ngZone.run(()=>{
          this.getPointfun(data.data.station,data.data.xPoint,data.data.yPoint,data.data.zPoint,data.data.pointname);
         
      })
   })
    }
    onclose(){
        this.ioisShow.emit(this.isShow);      
      
      }
      getPointfun(station:number,xPoint:number,yPoint:number,zPoint:number,name:string){
        for(let i=0;i<this.ioListB.length;i++){
          if(this.ioListB[i].index===station){
            let pointinfo=this.ioListB[i].pointinfo;
            let pointinfoold=this.ioListold[i].pointinfo;
            //let message = Object.assign([],pointinfo );
            for(let j=0;j<pointinfo.length;j++){
              if(pointinfo[j].name==name){
                 pointinfo[j].xpoint=xPoint;
                 pointinfo[j].ypoint=yPoint;
                 pointinfo[j].zpoint=zPoint;
                 pointinfoold[j].xpoint=xPoint;
                 pointinfoold[j].ypoint=yPoint;
                 pointinfoold[j].zpoint=zPoint;
              }
            }
          }
        }
      }  
    savePoint(){
      console.info("sfsdf");
      for(let i=0;i<this.ioListB.length;i++){
          for(let j=0;j<this.ioListB[i].pointinfo.length;j++){
            if(this.ioListB[i].pointinfo[j].xpoint!==this.ioListold[i].pointinfo[j].xpoint){
              let stationid=this.ioListB[i].index;
              let stationname=this.ioListB[i].name;
              let name=this.ioListB[i].pointinfo[j].name;
            this.ipcService.send("setPoint", {"stationname":stationname,"station":stationid,"pointname":name,"xPoint":this.ioListB[i].pointinfo[j].xpoint,"yPoint":this.ioListB[i].pointinfo[j].ypoint,"zPoint":this.ioListB[i].pointinfo[j].zpoint,"prexpoint":this.ioListold[i].pointinfo[j].xpoint,"totalpoint":this.ioListB[i].pointinfo[j].total,"change":"x"});
            this.ioListold[i].pointinfo[j].xpoint=this.ioListB[i].pointinfo[j].xpoint;
          }
          if(this.ioListB[i].pointinfo[j].ypoint!==this.ioListold[i].pointinfo[j].ypoint){
            let stationid=this.ioListB[i].index;
            let name=this.ioListB[i].pointinfo[j].name;
            let stationname=this.ioListB[i].name;
            this.ipcService.send("setPoint", {"stationname":stationname,"station":stationid,"pointname":name,"xPoint":this.ioListB[i].pointinfo[j].xpoint,"yPoint":this.ioListB[i].pointinfo[j].ypoint,"zPoint":this.ioListB[i].pointinfo[j].zpoint,"prexpoint":this.ioListold[i].pointinfo[j].ypoint,"totalpoint":this.ioListB[i].pointinfo[j].total,"change":"y"});
            this.ioListold[i].pointinfo[j].ypoint=this.ioListB[i].pointinfo[j].ypoint;
            
        }
        if(this.ioListB[i].pointinfo[j].zpoint!==this.ioListold[i].pointinfo[j].zpoint){
          let stationid=this.ioListB[i].index;
          let name=this.ioListB[i].pointinfo[j].name;
          let stationname=this.ioListB[i].name;
          this.ipcService.send("setPoint", {"stationname":stationname,"station":stationid,"pointname":name,"xPoint":this.ioListB[i].pointinfo[j].xpoint,"yPoint":this.ioListB[i].pointinfo[j].ypoint,"zPoint":this.ioListB[i].pointinfo[j].zpoint,"prexpoint":this.ioListold[i].pointinfo[j].zpoint,"totalpoint":this.ioListB[i].pointinfo[j].total,"change":"z"});
          this.ioListold[i].pointinfo[j].zpoint=this.ioListB[i].pointinfo[j].zpoint;
          
      }

      }
     
       
    }

      }   
}
