import { Component,NgZone,Input,Output,EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { IOListC,IOListC1 } from '../../common/bean/Pointdata';
import { IPCService } from '../../common/service/ipc.service';


@Component({
  selector: 'outmaterialpoint',
  templateUrl:"./webApp/component/OutmaterialPoint/pointOutmaterial.html"
})


export class outmaterialPoint{

    private _ngZone: NgZone
    private title: String;
    private isShow:boolean=true;
    private iOList=IOListC;
    private iOListcold=IOListC1;
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
      changedata(){

      }
      getPointfun(station:number,xPoint:number,yPoint:number,zPoint:number,name:string){
        for(let i=0;i<this.iOList.length;i++){
          if(this.iOList[i].index===station){
            let pointinfo=this.iOList[i].pointinfo;
            let pointinfoold=this.iOListcold[i].pointinfo;
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
      for(let i=0;i<this.iOList.length;i++){
          for(let j=0;j<this.iOList[i].pointinfo.length;j++){
            if(this.iOList[i].pointinfo[j].xpoint!==this.iOListcold[i].pointinfo[j].xpoint){
              let stationid=this.iOList[i].index;
              let name=this.iOList[i].pointinfo[j].name;
              let stationname=this.iOList[i].name;
            this.ipcService.send("setPoint", {"stationname":stationname,"station":stationid,"pointname":name,"xPoint":this.iOList[i].pointinfo[j].xpoint,"yPoint":this.iOList[i].pointinfo[j].ypoint,"zPoint":this.iOList[i].pointinfo[j].zpoint,"prexpoint":this.iOListcold[i].pointinfo[j].xpoint,"totalpoint":this.iOList[i].pointinfo[j].total,"change":"x"});
            this.iOListcold[i].pointinfo[j].xpoint=this.iOList[i].pointinfo[j].xpoint;
          }
          if(this.iOList[i].pointinfo[j].ypoint!==this.iOListcold[i].pointinfo[j].ypoint){
            let stationid=this.iOList[i].index;
            let name=this.iOList[i].pointinfo[j].name;
            let stationname=this.iOList[i].name;
            this.ipcService.send("setPoint", {"stationname":stationname,"station":stationid,"pointname":name,"xPoint":this.iOList[i].pointinfo[j].xpoint,"yPoint":this.iOList[i].pointinfo[j].ypoint,"zPoint":this.iOList[i].pointinfo[j].zpoint,"prexpoint":this.iOListcold[i].pointinfo[j].ypoint,"totalpoint":this.iOList[i].pointinfo[j].total,"change":"y"});
            this.iOListcold[i].pointinfo[j].ypoint=this.iOList[i].pointinfo[j].ypoint;
            
        }
        if(this.iOList[i].pointinfo[j].zpoint!==this.iOListcold[i].pointinfo[j].zpoint){
          let stationid=this.iOList[i].index;
          let name=this.iOList[i].pointinfo[j].name;
          let stationname=this.iOList[i].name;
          this.ipcService.send("setPoint", {"stationname":stationname,"station":stationid,"pointname":name,"xPoint":this.iOList[i].pointinfo[j].xpoint,"yPoint":this.iOList[i].pointinfo[j].ypoint,"zPoint":this.iOList[i].pointinfo[j].zpoint,"prexpoint":this.iOListcold[i].pointinfo[j].zpoint,"totalpoint":this.iOList[i].pointinfo[j].total,"change":"z"});
          this.iOListcold[i].pointinfo[j].zpoint=this.iOList[i].pointinfo[j].zpoint;
          
      }

      }
     
       
    }

      }   
}
