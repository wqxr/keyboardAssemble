import { Injectable } from '@angular/core';
import { IOList,IOData,Card,IOType } from '../common/bean/IOData';
@Injectable()
export class IOService{
    private ioList = IOList;
    private cards:Card[];
    constructor(){
        this.cards=[];
       // this.cards=new Card();
        for(let i=0;i<17;i++){           
            this.cards[i]=new Card();
        }
        // for(let i = 0 ; i < 11; ++i){
        //     this.cards[i] = new Card();
        //     this.cards[i].cardId = i;
        // }
    }
    parseIntIo(carId: number, ioStr: number,type:number) {
        let ioVal: number;
      
        let varStr=ioStr.toString(2);
        while(varStr.length<16){
            varStr='0'+varStr;
        }
        for(let i=0;i<varStr.length;i++){
            let card=this.cards[carId];
            card.cardId=carId;
            if(type===0){
                card.input[i]=parseInt(varStr[15-i]);
            }else{
                card.output[i]=parseInt(varStr[15-i]);
            }
          
        }  
        this.updateIoStatus(type);
}
       
            //card.output[i]=parseInt(varStr[15-i]);
        
        
       // return varStr;
    
    // updateCardIo(ioStatus:string){
    //     let ioStr:string="";
    //     for(let i = 0 ; i < ioStatus.length; ++i){
    //         let val = ioStatus[i];
    //         let valStr = val.toString(2);
    //         while( valStr.length < 16 ){
    //             valStr = '0' + valStr;
    //         }
    //         for(let i=0;i<ioStr.length;++i){
    //             let card=this.cards;
    //             card.input[i]=parseInt(ioStr[i]);
    //         }
    //     }
      
    //     this.updateIoStatus();
    // }
    updateIoStatus(type:number){
        for(let i = 0 ; i < this.ioList.length; ++i){
            let ioPanelItem = this.ioList[i];
            ioPanelItem.reactIOList.forEach( (io)=>{
                this.upDateIo(io,type);
            });
            ioPanelItem.nozzleList.forEach( (nozzle)=>{
                this.upDateIo(nozzle.control,type);
                this.upDateIo(nozzle.react,type);
                this.upDateIo(nozzle.controlreact,type);
            });
            ioPanelItem.cylinderIOList.forEach( (cylinder)=>{
                this.upDateIo(cylinder.activity,type);
                this.upDateIo(cylinder.original,type);  
                this.upDateIo(cylinder.activityReact,type);
                this.upDateIo(cylinder.originalReact,type);  
            });
            ioPanelItem.otherIoList.forEach( (io)=>{
                this.upDateIo(io,type);
            });
        }
    }

    upDateIo(io:IOData,type:number){
        if( !io ){
            return;
        }
        if( io.type === IOType.IN  && this.cards&& type===0 ){
            io.value = this.cards[io.cardId].input[io.index];
        }else if( io.type === IOType.OUT  && this.cards&& type===1 ){
            io.value = this.cards[io.cardId].output[io.index];
        }
    }
}
