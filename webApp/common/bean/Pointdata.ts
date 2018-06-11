export class pointdata{
    public name:string;   //名字
    public xpoint:number; //卡id
    public ypoint:number;  //Io所在卡索引
    public zpoint:number;  //值
    public total:number; 
      //输入，输出
    constructor(name:string,xpoint:number,ypoint:number,zpoint:number,total:number){
        this.xpoint = xpoint;
        this.name = name;
        this.ypoint = ypoint;
        this.zpoint = zpoint;
        this.total = total;
       
    }
}
 export class twopoint{
     public name:string;
     public index:number;
     public pointinfo:pointdata[];
     constructor(index:number){
        this.index=index;
        this.name="";
        this.pointinfo = [];
       
    }
 }
export const IOListC:twopoint[]=[];
export const IOListC1:twopoint[]=[];
export const IOList:twopoint[] = [];
export const IOListA:twopoint[]=[];
export const IOListB:twopoint[]=[];
export const IOListB1:twopoint[]=[];
//export const objB:any[]=[];
// export class totalpoint{
//    public  Apoint:IOList;
//    //public  Bpoint:IOList;
// }
let  tempItem = new twopoint(1);
tempItem.name="CCD工站";
tempItem.pointinfo=[
       
    new pointdata("起始位",0,0,0,1),
    new pointdata("A扫码位",0,0,0,1),
    new pointdata("A上下ENTER拍照位",0,0,0,1),
    new pointdata("B扫码位",0,0,0,1),
    new pointdata("B空格拍照位",0,0,0,1),
    new pointdata("B上下ENTER拍照位",0,0,0,1),

    

    

    
]
IOListC[0]=tempItem;
IOListC1[0]=Object.assign([],IOListC[0]);
IOListC1[0]=JSON.parse(JSON.stringify(IOListC[0]));
// tempItem = new twopoint(2);
// tempItem.name="Tray运料";
// tempItem.pointinfo=[
       
//         new pointdata("取料位",0,0,0,1),
//         new pointdata("A放料位",0,0,0,1),
//         new pointdata("B放料位",0,0,0,1),
//         new pointdata("Caps键拍照位（jis）",0,0,0,1),
//         new pointdata("SPace键拍照位",0,0,0,1),
//         new pointdata("上下键拍照位",0,0,0,1),
// ]

// IOListC[1]=tempItem;
// IOListC1[1]=Object.assign([],IOListC[1]);
// IOListC1[1]=JSON.parse(JSON.stringify(IOListC[1]));



tempItem = new twopoint(4);
tempItem.name="A-Tray顶升";
tempItem.pointinfo=[      
        new pointdata("起始位",0,0,0,1),
        new pointdata("出料位",0,0,0,1), 
        new pointdata("间隙 ",0,0,0,1),  
        new pointdata("最高点",0,0,0,1), 
        new pointdata("第一层料盘位",0,0,0,1),
        new pointdata("料盘行终点",0,0,0,1),
        
]

IOList[0]=tempItem;
IOListA[0]=Object.assign([],IOList[0]);
IOListA[0]=JSON.parse(JSON.stringify(IOList[0]));
tempItem = new twopoint(5);
tempItem.name="A-取键帽";
tempItem.pointinfo=[
       
        new pointdata("起始位",0,0,0,2),
        new pointdata("取tray盘位",0,0,0,2),
      //  new pointdata("取键帽位",0,0,0,2),
      //  new pointdata("取其他键位",0,0,0,2),
        new pointdata("取上下键帽位",0,0,0,2),
        new pointdata("取回车空格键帽位",0,0,0,2),
        new pointdata("放tray盘位",0,0,0,2),
        new pointdata("放UP键",0,0,0,2),
        new pointdata("放DOWN键",0,0,0,2),  
        new pointdata("放空格键",0,0,0,2),
        new pointdata("放Enter键",0,0,0,2),
        new pointdata("放UP键_JIS",0,0,0,2),
        new pointdata("放DOWN键_JIS",0,0,0,2),  
        new pointdata("放空格键_JIS",0,0,0,2),
        new pointdata("放ENTER键_JIS",0,0,0,2),
        new pointdata("放Caps键_JIS",0,0,0,2),

]

IOList[1]=tempItem;
IOListA[1]=Object.assign([],IOList[1]);
IOListA[1]=JSON.parse(JSON.stringify(IOList[1]));
tempItem = new twopoint(6);
tempItem.name="A-键帽导正";
tempItem.pointinfo=[       
        new pointdata("起始位",0,0,0,1),
        new pointdata("取料位",0,0,0,1),
        new pointdata("接料位",0,0,0,1),      
]

IOList[2]=tempItem;
IOListA[2]=Object.assign([],IOList[2]);
IOListA[2]=JSON.parse(JSON.stringify(IOList[2]));
tempItem = new twopoint(7);
tempItem.name="A-扣合运料";
tempItem.pointinfo=[
       
    new pointdata("起始位",0,0,0,3),
   //new pointdata("JIS取料位(5个键位)",0,0,0,0),
    
    new pointdata("上键取料位",0,0,0,3),
    new pointdata("下键取料位",0,0,0,3),
   // new pointdata("上下键取料位",0,0,0,3),
    new pointdata("ENTER键取料位",0,0,0,3),
    new pointdata("空格键取料位",0,0,0,3),
  
    new pointdata("空格键扣合位",0,0,0,3),
    new pointdata("上键扣合位",0,0,0,3),
    new pointdata("下键扣合位",0,0,0,3),
    new pointdata("ENTER扣合位",0,0,0,3), 
    new pointdata("上键偏移_JIS",0,0,0,3),
    new pointdata("下键偏移_JIS",0,0,0,3),
    new pointdata("ENTER偏移_JIS",0,0,0,3),
    new pointdata("空格键偏移_JIS",0,0,0,3),
    new pointdata("上键偏移",0,0,0,3),
    new pointdata("下键偏移",0,0,0,3),
    new pointdata("ENTER键偏移",0,0,0,3),
    new pointdata("空格键偏移",0,0,0,3),

   new pointdata("上键取料位_JIS",0,0,0,3),
   new pointdata("下键取料位_JIS",0,0,0,3),
   new pointdata("ENTER键取料位_JIS",0,0,0,3),
   new pointdata("空格键取料位_JIS",0,0,0,3),
   new pointdata("Caps键取料位_JIS",0,0,0,3),
   
 
   new pointdata("空格扣合位_JIS",0,0,0,3),
   new pointdata("上键扣合位_JIS",0,0,0,3),
   new pointdata("下键扣合位_JIS",0,0,0,3),
   new pointdata("ENTER键扣合位_JIS",0,0,0,3),
   new pointdata("Caps键扣合位_JIS",0,0,0,3),
]

IOList[3]=tempItem;
IOListA[3]=Object.assign([],IOList[3]);
IOListA[3]=JSON.parse(JSON.stringify(IOList[3]));
tempItem = new twopoint(8);
tempItem.name="A-取PCB";
tempItem.pointinfo=[  
    new pointdata("起始位",0,0,0,2),  
    new pointdata("取料位",0,0,0,2),
    new pointdata("放料位",0,0,0,2),
    new pointdata("微压料位",0,0,0,2),
    new pointdata("组装位",0,0,0,2), 
    new pointdata("放料位_JIS",0,0,0,2),
    new pointdata("微压料位_JIS",0,0,0,2), 

]

IOList[5]=tempItem;
IOListA[5]=Object.assign([],IOList[5]);
IOListA[5]=JSON.parse(JSON.stringify(IOList[5]));
tempItem = new twopoint(9);
tempItem.name="A-回车上下键扣合";
tempItem.pointinfo=[
       
    new pointdata("起始位",0,0,0,3),
    new pointdata("ENTER键取料位",0,0,0,3),
    new pointdata("上键取料位",0,0,0,3),
    new pointdata("下键取料位",0,0,0,3),
   // new pointdata("ENTER键扣合偏移",0,0,0,3),
    //new pointdata("JIS取键位",0,0,0,3),
   new pointdata("上键扣合位",0,0,0,3),
   new pointdata("下键扣合位",0,0,0,3),
   new pointdata("上下键取料位",0,0,0,3),
   //new pointdata("上键扣合偏移",0,0,0,3),
  // new pointdata("下键扣合偏移",0,0,0,3),
   new pointdata("ENTER键扣合位",0,0,0,3),
   new pointdata("ENTER键取料位_JIS",0,0,0,3),
   new pointdata("上键取料位_JIS",0,0,0,3),
   new pointdata("上下键取料位_JIS",0,0,0,3),
   new pointdata("下键取料位_JIS",0,0,0,3),
 
  new pointdata("上键扣合位_JIS",0,0,0,3),
  new pointdata("下键扣合位_JIS",0,0,0,3),
  new pointdata("ENTER键扣合位_JIS",0,0,0,3),
   
 
]

IOList[4]=tempItem;
IOListA[4]=Object.assign([],IOList[4]);
IOListA[4]=JSON.parse(JSON.stringify(IOList[4]));
tempItem = new twopoint(10);
tempItem.name="A-空格CAPS扣合";
tempItem.pointinfo=[  
     new pointdata("起始位",0,0,0,1),
    // new pointdata("JIS取料位",0,0,0,1),
    // new pointdata("SPACE取料位",0,0,0,1),
    new pointdata("Caps键取料位",0,0,0,1),
    new pointdata("Caps键扣合位",0,0,0,1),    
]

IOList[6]=tempItem;
IOListA[6]=Object.assign([],IOList[6]);
IOListA[6]=JSON.parse(JSON.stringify(IOList[6]));



let tempItem1 = new twopoint(12);

tempItem1.name="B-tray顶升";
tempItem1.pointinfo=[
       
    new pointdata("起始位",0,0,0,1),
    new pointdata("出料位",0,0,0,1), 
    new pointdata("间隙",0,0,0,1),  
    new pointdata("最高点",0,0,0,1), 
    new pointdata("第一层料盘高度",0,0,0,1),
    //new pointdata("料盘终点",0,0,0,1),
      
]

IOListB[0]=tempItem1;
IOListB1[0]=Object.assign([], tempItem1);
IOListB1[0]=JSON.parse(JSON.stringify(IOListB[0]));
tempItem1 = new twopoint(13);
tempItem1.name="B-取键帽";
tempItem1.pointinfo=[
       
    new pointdata("起始位",0,0,0,2),
    new pointdata("取tray盘位",0,0,0,2),
  //  new pointdata("取键帽位",0,0,0,2),
  //  new pointdata("取其他键位",0,0,0,2),
    new pointdata("取上下键帽位",0,0,0,2),
    new pointdata("取回车空格键位",0,0,0,2),
    new pointdata("放tray盘位",0,0,0,2),
    new pointdata("放UP键",0,0,0,2),
    new pointdata("放DOWN键",0,0,0,2),  
    new pointdata("放空格键",0,0,0,2),
    new pointdata("放Enter键",0,0,0,2),
    new pointdata("放UP键_JIS",0,0,0,2),
    new pointdata("放DOWN键_JIS",0,0,0,2),  
    new pointdata("放空格键_JIS",0,0,0,2),
    new pointdata("放Enter键_JIS",0,0,0,2),
    new pointdata("放Caps键_JIS",0,0,0,2),
]
IOListB[1]=tempItem1;
IOListB1[1]=Object.assign([], tempItem1);
IOListB1[1]=JSON.parse(JSON.stringify(IOListB[1]));
tempItem1 = new twopoint(14);
tempItem1.name="B-键帽导正";
tempItem1.pointinfo=[
       
    new pointdata("起始位",0,0,0,1),
    new pointdata("取料位",0,0,0,1),
    new pointdata("接料位",0,0,0,1),  
       
]
IOListB[2]=tempItem1;
IOListB1[2]=Object.assign([], tempItem1);
IOListB1[2]=JSON.parse(JSON.stringify(IOListB[2]));
tempItem1 = new twopoint(15);
tempItem1.name="B-扣合运料";
tempItem1.pointinfo=[
       
    new pointdata("起始位",0,0,0,3),
    //new pointdata("JIS取料位(5个键位)",0,0,0,0),
     
     new pointdata("上键取料位",0,0,0,3),
     new pointdata("下键取料位",0,0,0,3),
    // new pointdata("上下键取料位",0,0,0,3),
     new pointdata("ENTER键取料位",0,0,0,3),
     new pointdata("空格键取料位",0,0,0,3),
   
     new pointdata("空格键扣合位",0,0,0,3),
     new pointdata("上键扣合位",0,0,0,3),
     new pointdata("下键扣合位",0,0,0,3),
     new pointdata("ENTER键扣合位",0,0,0,3), 
     new pointdata("上键偏移_JIS",0,0,0,3),
     new pointdata("下键偏移_JIS",0,0,0,3),
     new pointdata("ENTER偏移_JIS",0,0,0,3),
     new pointdata("空格键偏移_JIS",0,0,0,3),
     new pointdata("上键偏移",0,0,0,3),
     new pointdata("下键偏移",0,0,0,3),
     new pointdata("ENTER偏移",0,0,0,3),
     new pointdata("空格键偏移",0,0,0,3),
 
    new pointdata("上键取料位_JIS",0,0,0,3),
    new pointdata("下键取料位_JIS",0,0,0,3),
    new pointdata("ENTER键取料位_JIS",0,0,0,3),
    new pointdata("空格键取料位_JIS",0,0,0,3),
    new pointdata("Caps键取料位_JIS",0,0,0,3),
    
  
    new pointdata("空格键扣合位_JIS",0,0,0,3),
    new pointdata("上键扣合位_JIS",0,0,0,3),
    new pointdata("下键扣合位_JIS",0,0,0,3),
    new pointdata("ENTER键扣合位_JIS",0,0,0,3),
    new pointdata("Caps键扣合位_JIS",0,0,0,3),
       
]
IOListB[3]=tempItem1;
IOListB1[3]=Object.assign([], tempItem1);
IOListB1[3]=JSON.parse(JSON.stringify(IOListB[3]));
tempItem1 = new twopoint(16);
tempItem1.name="B-取PCB";
tempItem1.pointinfo=[
       
    new pointdata("起始位",0,0,0,2),  
    new pointdata("取料位",0,0,0,2),
    new pointdata("放料位",0,0,0,2),
    new pointdata("微压料位",0,0,0,2),
    new pointdata("组装位",0,0,0,2), 
    new pointdata("放料位_JIS",0,0,0,2),
    new pointdata("微压料位_JIS",0,0,0,2),
]
IOListB[5]=tempItem1;
IOListB1[5]=Object.assign([], tempItem1);
tempItem1 = new twopoint(17);
tempItem1.name="B-回车上下键扣合";
tempItem1.pointinfo=[
       
    new pointdata("起始位",0,0,0,3),
    new pointdata("ENTER键取料位",0,0,0,3),
    new pointdata("上键取料位",0,0,0,3),
    new pointdata("下键取料位",0,0,0,3),
   // new pointdata("ENTER键扣合偏移",0,0,0,3),
    //new pointdata("JIS取键位",0,0,0,3),
   new pointdata("上键扣合位",0,0,0,3),
   new pointdata("下键扣合位",0,0,0,3),
   new pointdata("上下键取料位",0,0,0,3),
   //new pointdata("上键扣合偏移",0,0,0,3),
  // new pointdata("下键扣合偏移",0,0,0,3),
   new pointdata("ENTER键扣合位",0,0,0,3),
   new pointdata("ENTER键取料位_JIS",0,0,0,3),
   new pointdata("上键取料位_JIS",0,0,0,3),
   new pointdata("上下键取料位_JIS",0,0,0,3),
   new pointdata("下键取料位_JIS",0,0,0,3),
 
  new pointdata("上键扣合位_JIS",0,0,0,3),
  new pointdata("下键扣合位_JIS",0,0,0,3),
  new pointdata("ENTER键扣合位_JIS",0,0,0,3),
]
IOListB[4]=tempItem1;
IOListB1[4]=Object.assign([], tempItem1);
IOListB1[4]=JSON.parse(JSON.stringify(IOListB[4]));

tempItem1 = new twopoint(18);
tempItem1.name="B-空格caps扣合";
tempItem1.pointinfo=[
       
    new pointdata("起始位",0,0,0,1),
    // new pointdata("JIS取料位",0,0,0,1),
    // new pointdata("SPACE取料位",0,0,0,1),
    new pointdata("Caps键取料位",0,0,0,1),
    new pointdata("Caps键扣合位",0,0,0,1),     
]
IOListB[6]=tempItem1;
IOListB1[6]=Object.assign([], tempItem1);
IOListB1[6]=JSON.parse(JSON.stringify(IOListB[6]));




