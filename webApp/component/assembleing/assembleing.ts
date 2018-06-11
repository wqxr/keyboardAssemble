import { Component,NgZone,Input } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { Assembling } from '../../common/bean/assembling';



@Component({
  selector: 'assemble_info',
  templateUrl: "./webApp/component/assembleing/assembleing.html"
})
export class AssembleinfoComponent {
  private _ngZone: NgZone
  private title: String;
  public stationItem:StationItem=new StationItem();
  private isodownstyle = "";
  private isoupstyle = "";
  private isoleftdownstyle="";
  private isoleftupstyle="";
  private lefttotal:number=0;
  private righttotal:number=0;
  
  private changeclass="";
  private assembclass="";
  public assemblingClass:AssemblingClass=new AssemblingClass();


  private ansiupstyle = "";
  private ansidownstyle="";
  private ansileftupstyle="";
  private ansileftdownstyle="";

  private jisupstyle = "";
  private jisdownstyle = "";
  private jisleftupstyle="";
  private jisleftdownstyle="";


  private nowclass = "";
  private backclass = "";
  private photoclass="";
  
  

  @Input()
  private assembling: Assembling;

  constructor(_ngZone: NgZone) {
    this._ngZone = _ngZone;
    this.title = 'IAStudio';
  }

  workassemb(data: any) {
    if (data.target == "left") {
      console.log("keycaps:" + this.assembling.keycaps);
      if (data.type == "ANSI") {
        this.stationItem.isANSIleft = true;
        this.stationItem.isISOleft = false;
        this.stationItem.isJISleft = false;
        if(data.status==0){//出料
          this.lefttotal+=1;
          this.ansileftdownstyle = "k-l-step2";
          this.ansileftupstyle = "t-l-step2";       
          this.photoclass="";
        }else if(data.status==1){//拍照
          this.ansileftupstyle = "k-step1";
          this.ansileftupstyle = "";
          this.photoclass="sca-ani";
        }else if(data.status==2){//取料
          this.assemblingClass.leftchangeclass=true;
          this.assemblingClass.leftassembclass=true;
          this.photoclass="";
          setTimeout(()=>{
            this.assemblingClass.leftshowclass=true;
            this.assemblingClass.leftchangeclass=false;

          })
         
        }else if(data.status==3){//进料
           this.ansileftdownstyle="k-l-step1";
           this.ansileftupstyle="t-l-step1";
           this.photoclass="";
        }else if(data.status==4){//导正放料
            this.assemblingClass.leftup1class=true;

          
           this.photoclass="";
        }
      } else if (data.type == "ISO") {
        this.stationItem.isISOleft= true;
        this.stationItem.isANSIleft = false;
        this.stationItem.isJISleft = false;
        if(data.status==0){
          this.lefttotal+=1;
          this.isoleftdownstyle = "k-l-step2";
          this.isoleftupstyle = "t-l-step2";
          this.photoclass="";

        }else if(data.status==1){
          this.isoleftdownstyle= "k-step1";
          this.isoleftupstyle = "";
          this.photoclass="sca-ani";   
        }else if(data.status==2){
          this.assemblingClass.leftchangeclass=true;
          this.assemblingClass.leftassembclass=true;
          this.photoclass="";
          setTimeout(()=>{
            this.assemblingClass.leftshowclass=true;
            this.assemblingClass.leftchangeclass=false;

          })
          

        }else if(data.status==3){
          this.isoleftdownstyle = "k-l-step1";
          this.isoleftupstyle = "t-l-step1";
          this.photoclass="";

        }else if(data.status==4){
          this.assemblingClass.leftup1class=true;


           this.photoclass="";
        }
      } else if(data.type="JIS") {
        this.stationItem.isJISleft = true;
        this.stationItem.isANSIleft = false;
        this.stationItem.isISOleft = false;
        if(data.status==0){
          this.lefttotal+=1;
          this.jisdownstyle = "k-l-step2";
          this.jisupstyle = "t-l-step2";
          this.photoclass="";

        }else if(data.status==1){
          this.jisleftdownstyle = "k-step1";
          this.jisleftupstyle = "";
          this.photoclass="sca-ani";
        }else if(data.status==2){ 
          this.assemblingClass.leftchangeclass=true;
          this.assemblingClass.leftassembclass=true;
          this.photoclass="";
          setTimeout(()=>{
          this.assemblingClass.leftshowclass=true;
          this.assemblingClass.leftchangeclass=false;

          })
         
        }else if(data.status==3){
          this.jisleftdownstyle="k-l-step1";
          this.jisleftupstyle="t-l-step1";
          this.photoclass="";
        }else if(data.status==4){
            this.assemblingClass.leftup1class=true;

            this.photoclass="";
        }
      }     
    } else if (data.target == "right") {
      if (data.type == "ANSI") {
        this.stationItem.isANSIright = true;
        this.stationItem.isISOright = false;
        this.stationItem.isJISright = false;
         if(data.status==0){
           this.righttotal+=1;
           this.ansidownstyle = "k-r-step2";
           this.ansiupstyle = "t-r-step2";
           this.photoclass="";
        }else if(data.status==1){
          this.ansidownstyle = "k-step1";
          this.ansiupstyle = "";
          this.photoclass="sca-ani";

        }else if(data.status==2){
          this.assemblingClass.rightchangeclass=true;
          this.assemblingClass.rightassembclass=true;
          this.photoclass="";
          setTimeout(()=>{
            this.assemblingClass.rightshowclass=true;
            this.assemblingClass.rightchangeclass=false;

          })
       

        }else if(data.status==3){
         this.ansidownstyle = "k-r-step1";
         this.ansiupstyle = "t-r-step1";
         this.photoclass="";

        }else if(data.status==4){
         this.assemblingClass.rightup1class=true;
         this.photoclass="";

        }
      } else if (data.type == "ISO") {
        this.stationItem.isISOright = true;
        this.stationItem.isANSIright = false;
        this.stationItem.isJISright = false;
        if(data.status==0){
           this.righttotal+=1;
           this.isodownstyle = "k-r-step2";
           this.isoupstyle = "t-r-step2";
           this.photoclass="";

        }else if(data.status==1){
          this.isodownstyle = "k-step1";
          this.isoupstyle = "";
          this.photoclass="sca-ani";
        }else if(data.status==2){  
          this.assemblingClass.rightchangeclass=true;
          this.assemblingClass.rightassembclass=true;
          this.photoclass="";
          setTimeout(()=>{
            this.assemblingClass.rightshowclass=true;
            this.assemblingClass.rightchangeclass=false;

          },1000)  

         

        }else if(data.status==3){
           this.isodownstyle = "k-r-step1";
           this.isoupstyle = "t-r-step1";
           this.photoclass="";

        }else if(data.status==4){
           this.assemblingClass.rightup1class=true;


           this.photoclass="";
        }

      } else if(data.type=="JIS") {
        this.stationItem.isJISright = true;
        this.stationItem.isANSIright = false;
        this.stationItem.isISOright = false;
         if(data.status==0){
           this.righttotal+=1;
           this.jisdownstyle = "k-r-step2";
           this.jisupstyle = "t-r-step2";
           this.photoclass="";

        }else if(data.status==1){
          this.jisdownstyle = "k-step1";
          this.jisupstyle = "";
          this.photoclass="sca-ani";

        }else if(data.status==2){
          this.assemblingClass.rightchangeclass=true;
          this.assemblingClass.rightassembclass=true;
          this.photoclass="";
          setTimeout(()=>{
            this.assemblingClass.rightshowclass=true;
            this.assemblingClass.rightchangeclass=false;

          })  
         
       

        }else if(data.status==3){
          this.jisdownstyle = "k-r-step1";
          this.jisupstyle = "t-r-step1";
          this.photoclass="";
        }else if(data.status==4){
            //this.assembclass="up1";
            this.assemblingClass.rightup1class=true;

            this.photoclass="";
        }
      }
    }
  }

}
class StationItem{
    public isANSIleft:boolean=false;
    public isISOleft:boolean=false;
    public isJISleft:boolean=false;
    public isANSIright:boolean=false;
    public isISOright:boolean=false;
    public isJISright:boolean=false;
}

class AssemblingClass{
    public leftchangeclass:boolean=false;
    public leftassembclass:boolean=false;
    public rightchangeclass:boolean=false;
    public rightassembclass:boolean=false;
    public leftshowclass:boolean=false;
    public rightshowclass:boolean=false;
    public leftup1class:boolean=false;
    public rightup1class:boolean=false;

}