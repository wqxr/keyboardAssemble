export enum IOType{
    OUT,IN
}
export class IOData{
    public name:string;   //名字
    public cardId:number; //卡id
    public index:number;  //Io所在卡索引
    public value:number;  //值
    public type:number;   //输入，输出
    constructor(name:string,cardId:number,index:number,value:number,type:number){
        this.cardId = cardId;
        this.name = name;
        this.index = index;
        this.value = value;
        this.type = type;
    }
}

//气缸
export class Cylinder {
    name:string;
    activity:IOData;   //动位
    original:IOData;   //原位
    activityReact:IOData; //动位感应
    originalReact:IOData; //原位感应
    react:IOData;
    constructor(name:string,activity?:IOData,original?:IOData,activityReact?:IOData,originalReact?:IOData,react?:IOData){
        this.name = name;
        this.activity = activity;
        this.original = original;
        this.activityReact = activityReact;
        this.originalReact = originalReact;
        this.react=react;
    }
}
//真空
export class Nozzle{
    control:IOData; 
    react:IOData;
    controlreact:IOData;
    constructor(control?:IOData,react?:IOData,controlreact?:IOData){
        this.control = control;
        this.react = react;
        this.controlreact=controlreact;
    }
}

export class IoPanelItem{
    hidden:boolean = true;
    nozzleList:Nozzle[];  //真空
    cylinderIOList:Cylinder[]; //气缸
    reactIOList:IOData[];  //感应
    otherIoList:IOData[]   //其他
    constructor(){
        this.cylinderIOList = [];
        this.nozzleList = [];
        this.reactIOList = [];
        this.otherIoList = [];
    }
}

export class Card{
    cardId:number;
    input:number[];
    output:number[];
    constructor(){
        this.cardId = -1;
        this.input = [];
        this.output = [];
    }
}

export const IOList:IoPanelItem[] = [];
//进料
let  tempItem = new IoPanelItem();//感应类 
tempItem.reactIOList = [
    
    new IOData("TRAY皮带出料感应",12,8,0,IOType.IN),
    new IOData("TRAY皮带中间感应",1,12,0,IOType.IN),
    new IOData("TRAY皮带进料感应",1,0,0,IOType.IN),
    new IOData("TRAY出料感应",5,12,0,IOType.IN),
    new IOData("TRAY皮带光电感应",1,1,0,IOType.IN),

   
    new IOData("载具出料检测",14,7,0,IOType.IN),
    new IOData("载具进料感应",11,1,0,IOType.IN),
    new IOData("载具上站有料检测",5,7,0,IOType.IN),
    new IOData("载具本站请求入料",14,13,0,IOType.OUT), 
    new IOData("下端设备要料信号",4,8,0,IOType.IN),
    new IOData("载具下站无料信号",5,14,0,IOType.IN),

    new IOData("TRAY上站有料检测",5,6,0,IOType.IN),
    new IOData("TRAY本站请求入料",14,11,0,IOType.OUT), 

    new IOData("TRAY下站要料信号",5,13,0,IOType.IN),
    new IOData("通知TRAY下站有料",14,14,0,IOType.OUT),

    new IOData("门禁",14,14,0,IOType.IN),

];
tempItem.cylinderIOList=[//气缸类
new Cylinder("TRAY出料气缸",
    new IOData("TRAY出料阻挡气缸",12,14,0,IOType.OUT),
    new IOData("TRAY进料阻挡气缸",1,0,0,IOType.OUT),
    new IOData("TRAY进料阻挡气缸原位",1,2,0,IOType.IN),
    new IOData("TRAY进料阻挡气缸动位",1,3,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
   
),
new Cylinder("载具阻挡气缸",
    new IOData("载具阻挡气缸",11,1,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("载具阻挡气缸原位",11,2,0,IOType.IN),
    new IOData("载具阻挡气缸动位",11,3,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
   
)
   
];
tempItem.otherIoList=[//其他类

    new IOData("A-离子风",11,8,0,IOType.OUT),
    new IOData("B-离子风",14,7,0,IOType.OUT),
    new IOData("真空泵启动1",11,14,0,IOType.OUT),
    new IOData("真空泵启动2",11,15,0,IOType.OUT),
    new IOData("红灯",5,12,0,IOType.OUT),
    new IOData("黄灯",5,13,0,IOType.OUT),
    new IOData("绿灯",5,14,0,IOType.OUT),
    new IOData("蜂鸣",5,15,0,IOType.OUT),
    new IOData("启动",3,14,0,IOType.IN),
    new IOData("复位",3,15,0,IOType.IN),
    new IOData("停止",4,6,0,IOType.IN),
    new IOData("急停",4,7,0,IOType.IN),

    
    new IOData("安全光栅",14,15,0,IOType.IN),
    
     new IOData("成品出料信号",11,13,0,IOType.OUT),
    
    
   
]

IOList[4] = tempItem;



//-----A-Tray
tempItem = new IoPanelItem();
//感应
tempItem.reactIOList = [
   
    new IOData("A-TRAY进料光电检测",1,4,0,IOType.IN),
    new IOData("A-TRAY到位感应",1,9,0,IOType.IN),
    new IOData("A-TRAY到位减速感应",1,8,0,IOType.IN),
    
    new IOData("A-TRAY物料在位感应",1,7,0,IOType.IN),
    new IOData("A-TRAY物料在位感应2",2,11,0,IOType.IN),

    new IOData("A-TRAY料仓到位检测",1,13,0,IOType.IN),
    new IOData("A-TRAY顶升料满检测",1,15,0,IOType.IN),
    new IOData("A-TRAY顶升物料光纤检测",1,15,0,IOType.IN),
];
//真空
tempItem.nozzleList = [

    new Nozzle(
        new IOData("A-取TRAY真空吸",1,5,0,IOType.OUT),
        new IOData("A-取TRAY破真空吸",2,3,0,IOType.OUT), 
        new IOData("A-取TRAY真空检测",2,5,0,IOType.IN),
        
    ),

    new Nozzle(
        new IOData("A-取键CAPS真空吸",1,3,0,IOType.OUT),
        new IOData("A-取键CAPS破真空吸",1,4,0,IOType.OUT), 
        new IOData("A-取键CAPS真空检测",2,0,0,IOType.IN), 
    ),

    new Nozzle(
        new IOData("A-取键空格真空吸",2,0,0,IOType.OUT),
        new IOData("A-取键空格破真空吸",1,6,0,IOType.OUT),
        new IOData("A-取键空格真空检测",2,1,0,IOType.IN),
    ),

    new Nozzle(
        new IOData("A-取键回车真空吸",2,0,0,IOType.OUT),
        new IOData("A-取键回车破真空吸",2,1,0,IOType.OUT),
        new IOData("A-取键回车真空检测",2,4,0,IOType.IN),
       
      
    ),

    new Nozzle(
        new IOData("A-取键上键真空吸",1,7,0,IOType.OUT),
        new IOData("A-取键上键破真空吸",1,8,0,IOType.OUT),  
        new IOData("A-取键上键真空检测",2,2,0,IOType.IN),
      
    ),

    new Nozzle(
        new IOData("A-取键下键真空吸",1,9,0,IOType.OUT),
        new IOData("A-取键下键破真空吸",1,10,0,IOType.OUT),
        new IOData("A-取键下键真空检测",2,3,0,IOType.IN),
        
    ),

    new Nozzle(
        new IOData("A-导正CAPS真空吸",2,6,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-导正CAPS真空检测",2,10,0,IOType.IN),
      
    ),

    new Nozzle(
        new IOData("A-导正上键真空吸",2,7,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-导正上键真空检测",2,11,0,IOType.IN), 
    ),

    new Nozzle(
        new IOData("A-导正下键真空吸",2,8,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-导正下键真空检测",2,12,0,IOType.IN),   
    ),

    new Nozzle(
        new IOData("A-ISO SPACE真空吸",2,9,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-ISO-SPACE真空检测",2,13,0,IOType.IN),
    ),

    new Nozzle(
        new IOData("A-JIS-SPACE真空吸",2,12,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-JIS-SPACE真空检测",2,12,0,IOType.IN),
        
    ),

    new Nozzle(
        new IOData("A-ISO ENTER真空吸",2,11,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-ISO-ENTER真空检测",2,15,0,IOType.IN),    
    ),

    new Nozzle(
        new IOData("A-JIS ENTER真空吸",11,0,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-JIS ENTER真空检测",11,0,0,IOType.IN),
    ),

    new Nozzle(
        new IOData("A-JIS SPACE真空吸",2,10,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-JIS-SPACE真空检测",2,14,0,IOType.IN),
    )
];
tempItem.otherIoList=[];

//气缸
tempItem.cylinderIOList = [
    new Cylinder(
        "TRAY进料阻挡气缸",
        new IOData("TRAY进料阻挡气缸",1,0,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("TRAY进料阻挡气缸原位",1,2,0,IOType.IN),
        new IOData("TRAY进料阻挡气缸动位",1,3,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "A-TRAY物料顶升气缸",
        new IOData("A-TRAY物料顶升气缸动位",1,11,0,IOType.OUT),
        new IOData("A-TRAY物料顶升气缸原位",1,1,0,IOType.OUT),
        new IOData("A-TRAY物料顶升气缸动位感应",1,6,0,IOType.IN),
        new IOData("A-TRAY物料顶升气缸原位感应",1,5,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "A-TRAY阻挡气缸",
        new IOData("A-TRAY阻挡气缸",1,2,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-TRAY阻挡气缸动位",1,11,0,IOType.IN),
        new IOData("A-TRAY阻挡气缸原位",1,10,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "TRAY出料阻挡气缸",
        new IOData("TRAY出料阻挡气缸",12,14,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("",0,0,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "A-上键上下气缸",
        new IOData("A-上键上下气缸",2,4,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-上键上下气缸原位",2,6,0,IOType.IN),
        new IOData("A-上键上下气缸动位",2,7,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "A-下键上下气缸",
        new IOData("A-下键上下气缸",2,5,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-下键上下气缸原位",2,8,0,IOType.IN),
        new IOData("A-下键上下气缸动位",2,9,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
        
       
    )
];

IOList[0] = tempItem;
//B-Tray
tempItem = new IoPanelItem();
tempItem.reactIOList = [
    //感应
     new IOData("B-TRAY进料光电检测",12,0,0,IOType.IN),
     new IOData("B-TRAY物料在位感应",12,3,0,IOType.IN),
     new IOData("B-TRAY物料在位感应2",11,15,0,IOType.IN),

     new IOData("B-TRAY料仓到位检测",12,9,0,IOType.IN),
     new IOData("B-TRAY顶升料满检测",12,11,0,IOType.IN),
     new IOData("B-TRAY顶升物料光纤检测",12,10,0,IOType.IN),

     new IOData("B-TRAY皮带过位感应",12,5,0,IOType.IN),
     new IOData("B-TRAY皮带在位感应",12,4,0,IOType.IN),
 ];
 //真空
 tempItem.nozzleList = [

    new Nozzle(
        new IOData("B-取TRAY真空吸",13,2,0,IOType.OUT),
        new IOData("B-取TRAY破真空吸",13,3,0,IOType.OUT),
        new IOData("B-取TRAY真空检测",13,1,0,IOType.IN),
      
     ),

     new Nozzle(
        new IOData("B-取键CAPS真空吸",12,2,0,IOType.OUT),
        new IOData("B-取键CAPS破真空吸",12,3,0,IOType.OUT),
        new IOData("B-取键CAPS真空检测",12,12,0,IOType.IN),
       
     ),
 
     new Nozzle(
        new IOData("B-取键空格真空吸",12,4,0,IOType.OUT),
        new IOData("B-取键空格破真空吸",12,5,0,IOType.OUT),
        new IOData("B-取键空格真空检测",12,13,0,IOType.IN),
       
     ),

     new Nozzle(
        new IOData("B-取键回车真空吸",13,0,0,IOType.OUT),
        new IOData("B-取键回车破真空吸",13,1,0,IOType.OUT), 
        new IOData("B-取键回车真空检测",13,0,0,IOType.IN),
       
     ),

     new Nozzle(
        new IOData("B-取键上键真空吸",12,7,0,IOType.OUT),
        new IOData("B-取键上键破真空吸",12,6,0,IOType.OUT), 
        new IOData("B-取键上键真空检测",12,14,0,IOType.IN),
          
     ),

     new Nozzle(
        new IOData("B-取键下键真空吸",12,8,0,IOType.OUT),
        new IOData("B-取键下键破真空吸",12,9,0,IOType.OUT),
        new IOData("B-取键下键真空检测",12,15,0,IOType.IN),
      
     ),

     new Nozzle(
        new IOData("B-导正CAPS真空吸",13,6,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
         new IOData("B-导正CAPS真空检测",13,6,0,IOType.IN),
     ),

     new Nozzle(
        new IOData("B-导正上键真空吸",13,7,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
         new IOData("B-导正上键真空检测",13,7,0,IOType.IN),
     ),

     new Nozzle(
        new IOData("B-导正下键真空吸",13,8,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("B-导正下键真空检测",13,8,0,IOType.IN),
     ),

     new Nozzle(
        new IOData("B-ISO SPACE真空吸",13,9,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
         new IOData("B-ISO-SPACE真空检测",13,9,0,IOType.IN),
       
     ),

     new Nozzle(
        new IOData("B-JIS SPACE真空吸",13,10,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
         new IOData("B-JIS-SPACE真空检测",13,10,0,IOType.IN),

     ),

     new Nozzle(
        new IOData("B-ISO ENTER真空吸",13,11,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
         new IOData("B-ISO ENTER真空检测",13,11,0,IOType.IN),
     ),

     new Nozzle(
        new IOData("B-JIS ENTER真空吸",13,12,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
         new IOData("B-JIS ENTER真空检测",13,12,0,IOType.IN),
     )
 ];

 //气缸
 tempItem.cylinderIOList = [
    new Cylinder(
        "TRAY进料阻挡气缸",
        new IOData("TRAY进料阻挡气缸",1,0,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("TRAY进料阻挡气缸原位",1,2,0,IOType.IN),
        new IOData("TRAY进料阻挡气缸动位",1,3,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "B-TRAY阻挡气缸",
        new IOData("B-TRAY阻挡气缸",12,1,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("B-TRAY阻挡气缸动位",12,7,0,IOType.IN),
        new IOData("B-TRAY阻挡气缸原位",12,6,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN), 
    ),

    new Cylinder(
        "B-TRAY物料顶升气缸",
        new IOData("B-TRAY物料顶升气缸动位",12,13,0,IOType.OUT),
        new IOData("B-TRAY物料顶升气缸原位",12,12,0,IOType.OUT),
        new IOData("B-TRAY物料顶升气缸动位检测",12,2,0,IOType.IN),
        new IOData("B-TRAY物料顶升气缸原位检测",12,1,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "TRAY出料阻挡气缸",
        new IOData("TRAY出料阻挡气缸",12,14,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("",0,0,0,IOType.IN), 
        new IOData("",0,0,0,IOType.IN), 
        new IOData("",0,0,0,IOType.IN), 
    ),

     new Cylinder(
         "B-上键上下气缸",
         new IOData("B-上键上下气缸",13,5,0,IOType.OUT),
         new IOData("",0,0,0,IOType.OUT),
         new IOData("B-上键上下气缸原位",13,4,0,IOType.IN),
         new IOData("B-上键上下气缸动位",13,5,0,IOType.IN),
         new IOData("",0,0,0,IOType.IN), 
       
        
     ),
  

     new Cylinder(
         "B-下键上下气缸",
         new IOData("B-下键上下气缸",13,4,0,IOType.OUT),
         new IOData("",0,0,0,IOType.OUT),
         new IOData("B-下键上下气缸原位",13,2,0,IOType.IN),
         new IOData("B-下键上下气缸动位",13,3,0,IOType.IN),
         new IOData("",0,0,0,IOType.IN),
        
     )
 
 ];
tempItem.otherIoList=[];
IOList[1] = tempItem;

//A扣合
tempItem=new IoPanelItem();
tempItem.cylinderIOList=[//气缸类
 new Cylinder(
     "A-CAPS扣合气缸",
     new IOData("A-CAPS扣合气缸",3,3,0,IOType.OUT),
     new IOData("",0,0,0,IOType.OUT),
     new IOData("A-CAPS扣合气缸下降",3,2,0,IOType.IN),
     new IOData("",0,0,0,IOType.IN),
     new IOData("",0,0,0,IOType.IN),
 ),

 new Cylinder(
    "A-SPACE扣合气缸",
    new IOData("A-SPACE扣合气缸",3,3,0,IOType.OUT),
    new IOData("A-SPACE扣合切换气缸",3,6,0,IOType.OUT),
    new IOData("A-SPACE扣合切换气缸动位",3,6,0,IOType.IN),
    new IOData("A-SPACE扣合切换气缸下降",3,4,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),

),

// new Cylinder(
//     "A-SPACE扣合切换气缸",
//     new IOData("A-SPACE扣合切换气缸",3,8,0,IOType.OUT),
//     new IOData("",0,0,0,IOType.OUT),
//     new IOData("A-SAPCE扣合切换动位",3,7,0,IOType.IN),
//     new IOData("",0,0,0,IOType.IN),
   
    
// ),
new Cylinder(
    "A-上键扣合气缸",
    new IOData("A-上键扣合气缸",3,9,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("A-上键扣合气缸动位",3,9,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),


),
new Cylinder(
    "A-下键扣合气缸",
    new IOData("A-下键扣合气缸",3,12,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("A-下键扣合气缸动位",3,12,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    
    
),
new Cylinder(
    "A-ENTER键扣合切换气缸",
    new IOData("A-ENTER扣合切换气缸下降",4,1,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("A-ENTER扣合切换气缸动位",4,3,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
   

),

new Cylinder(
    "A-ENTER键扣合气缸",
    new IOData("A-ENTER扣合气缸动位",4,2,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("A-ENTER扣合气缸动位1",4,4,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
   ),

new Cylinder(
    "A-ENTER扣合切换气缸",
    new IOData("A-ENTER扣合切换气缸",4,1,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("A-ENTER扣合切换气缸动位",4,3,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
)
];

tempItem.nozzleList=[//真空类
new Nozzle(
    new IOData("A-CAPS扣合真空吸",3,1,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("A-CAPS扣合真空检测",3,3,0,IOType.IN),
),

new Nozzle(
    new IOData("A-SPACE扣合真空吸",3,4,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("A-SPACE扣合真空检测",3,5,0,IOType.IN),
),

new Nozzle(
    new IOData("A-SPACE切换真空吸",3,7,0,IOType.OUT),
    new IOData("A-SPACE切换破真空吸",3,8,0,IOType.OUT),
    new IOData("A-SPACE切换真空检测",3,7,0,IOType.IN),
  
),

new Nozzle(
    new IOData("A-上键扣合真空吸",3,10,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("A-上键扣合真空检测",3,10,0,IOType.IN),
),

new Nozzle(
    new IOData("A-下键扣合真空吸",3,13,0,IOType.OUT),
    new IOData("A-下键扣合破真空",3,14,0,IOType.OUT),
    new IOData("A-下键扣合真空检测",3,13,0,IOType.IN),
  
),

new Nozzle(
    new IOData("A-ENTER扣合真空吸",4,3,0,IOType.OUT),
    new IOData("A-ENTER扣合破真空吸",4,4,0,IOType.OUT),
    new IOData("A-ENTER扣合真空检测",4,5,0,IOType.IN),
    
)
];
tempItem.otherIoList=[];
tempItem.reactIOList=[];
IOList[5] = tempItem;

//B扣合
tempItem=new IoPanelItem();
tempItem.cylinderIOList=[//气缸类
 new Cylinder(
     "B-CAPS扣合气缸",
     new IOData("B-CAPS扣合气缸",4,5,0,IOType.OUT),
     new IOData("",0,0,0,IOType.OUT),
     new IOData("B-CAPS扣合气缸下降",4,10,0,IOType.IN),
     new IOData("",0,0,0,IOType.IN),
     new IOData("",0,0,0,IOType.IN),
 ),

 new Cylinder(
    "B-SPACE扣合气缸",
    new IOData("B-SPACE扣合气缸",4,8,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("B-SPACE扣合气缸下降",4,12,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
),

new Cylinder(
    "B-SPACE扣合切换气缸",
    new IOData("B-SPACE扣合切换气缸",4,11,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("B-SPACE扣合切换气缸动位",4,14,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
),

new Cylinder(
    "B-上键扣合气缸",
    new IOData("B-上键扣合气缸",5,0,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("B-上键扣合气缸动位",5,1,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
),

new Cylinder(
    "B-下键扣合气缸",
    new IOData("B-下键扣合气缸",5,3,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("B-下键扣合气缸动位",5,4,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
),

new Cylinder(
    "B-ENTER扣合气缸",
    new IOData("B-ENTER扣合气缸动位",5,8,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("B-ENTER扣合气缸动位1",5,10,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
),

new Cylinder(
    "B-ENTER扣合切换气缸",
    new IOData("B-ENTER扣合切换气缸",5,7,0,IOType.OUT),
    new IOData("",0,0,0,IOType.OUT),
    new IOData("B-ENTER扣合切换气缸动位",5,9,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
    new IOData("",0,0,0,IOType.IN),
)
];

tempItem.nozzleList=[//真空类
new Nozzle(
    new IOData("B-CAPS扣合真空吸",4,6,0,IOType.OUT),
    new IOData("B-CAPS扣合破真空吸",4,7,0,IOType.OUT),
    new IOData("B-CAPS扣合真空检测",4,11,0,IOType.IN),
    
),

new Nozzle(
    new IOData("B-ENTER扣合真空吸",5,9,0,IOType.OUT),
    new IOData("B-ENTER扣合破真空吸",5,10,0,IOType.OUT),
    new IOData("B-ENTER扣合真空检测",5,11,0,IOType.IN),
  
),

new Nozzle(
    new IOData("B-SPACE扣合真空吸",4,9,0,IOType.OUT),
    new IOData("B-SPACE扣合破真空吸",4,10,0,IOType.OUT),
    new IOData("B-SPACE扣合真空检测",4,13,0,IOType.IN),
    
),

new Nozzle(
    new IOData("B-SPACE切换真空吸",4,12,0,IOType.OUT),
    new IOData("B-SPACE切换破真空吸",4,13,0,IOType.OUT),
    new IOData("B-SPACE切换真空检测",4,15,0,IOType.IN),
    
),

new Nozzle(
    new IOData("B-上键扣合真空吸",5,1,0,IOType.OUT),
    new IOData("B-上键扣合破真空吸",5,2,0,IOType.OUT),
    new IOData("B-上键扣合真空检测",5,2,0,IOType.IN),
   
),

new Nozzle(
    new IOData("B-下键扣合真空吸",5,4,0,IOType.OUT),
    new IOData("B-下键扣合破真空",5,5,0,IOType.OUT),
    new IOData("B-下键扣合真空检测",5,5,0,IOType.IN),
   
)
];

tempItem.reactIOList=[];
tempItem.otherIoList=[];
IOList[6] = tempItem;

//A-PCB
tempItem=new IoPanelItem();
tempItem.reactIOList=[//感应类
        new IOData("A-载具在位检测",11,7,0,IOType.IN),
        new IOData("A-载具到位光电检测",11,4,0,IOType.IN),
        new IOData("A-PCB移载光电检测",11,13,0,IOType.IN),
];

tempItem.cylinderIOList=[//气缸类
    new Cylinder(
        "A-载具阻挡气缸",
        new IOData("A-载具阻挡气缸",11,2,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("A-载具阻挡气缸原位",11,5,0,IOType.IN),
        new IOData("A-载具阻挡气缸动位",11,5,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "A-载具顶升气缸",
        new IOData("A-载具顶升气缸动位",11,4,0,IOType.OUT),
        new IOData("A-载具顶升气缸原位",11,3,0,IOType.OUT),
        new IOData("A-载具顶升气缸动位检测",11,9,0,IOType.IN),
        new IOData("A-载具顶升气缸原位检测",11,8,0,IOType.IN), 
        new IOData("",0,0,0,IOType.IN),
    ),

    new Cylinder(
        "A-PCB夹爪",
        new IOData("A-PCB夹爪",14,10,0,IOType.OUT),
        new IOData("A-PCB夹爪1夹",4,0,0,IOType.IN),
        new IOData("A-PCB夹爪2夹",14,8,0,IOType.IN),
        new IOData("A-PCB夹爪1松",4,1,0,IOType.IN),
        new IOData("A-PCB夹爪2松",14,9,0,IOType.IN),
    ),
];

tempItem.nozzleList=[//真空类
    new Nozzle(
        new IOData("A-载具真空吸",11,5,0,IOType.OUT),
        new IOData("A-载具破真空吸",11,6,0,IOType.OUT),
        new IOData("A-载具真空检测",11,11,0,IOType.IN),
        
    ),

    new Nozzle(
        new IOData("A-取PCB真空吸",11,7,0,IOType.OUT),
        new IOData("A-取PCB破真空吸",13,15,0,IOType.OUT),
        new IOData("A-取PCB真空检测",11,10,0,IOType.IN),
       
    ),

    new Nozzle(
        new IOData("A-PCB移载真空吸",11,9,0,IOType.OUT),
        new IOData("A-PCB移载破真空吸",11,10,0,IOType.OUT),
        new IOData("A-PCB移载真空检测",11,12,0,IOType.IN),
       
    )
];
tempItem.otherIoList=[];
IOList[2] = tempItem;
//B-PCB
tempItem=new IoPanelItem();
tempItem.reactIOList=[//感应类
        new IOData("B-载具到位光纤检测",13,13,0,IOType.IN),
        new IOData("B-载具在位检测",14,0,0,IOType.IN),
        new IOData("B-PCB移载光电检测",14,6,0,IOType.IN),
];
tempItem.cylinderIOList=[//气缸类
    new Cylinder(
        "B-载具阻挡气缸",
        new IOData("B-载具阻挡气缸",14,1,0,IOType.OUT),
        new IOData("",0,0,0,IOType.OUT),
        new IOData("B-载具阻挡气缸动位",13,15,0,IOType.IN),
        new IOData("B-载具阻挡气缸原位",13,14,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN),
        
    ),

    new Cylinder(
        "B-载具顶升气缸",
        new IOData("B-载具顶升气缸动位",14,3,0,IOType.OUT),
        new IOData("B-载具顶升气缸原位",14,2,0,IOType.OUT),
        new IOData("B-载具顶升气缸动位检测",14,2,0,IOType.IN),
        new IOData("B-载具顶升气缸原位检测",14,1,0,IOType.IN),
        new IOData("",0,0,0,IOType.IN), 
    ),

    new Cylinder(
        "B-PCB夹爪",
        new IOData("B-PCB夹爪",14,12,0,IOType.OUT),
        new IOData("B-PCB夹爪1夹",14,10,0,IOType.IN),
        new IOData("B-PCB夹爪2夹",14,12,0,IOType.IN),
        new IOData("B-PCB夹爪1松",14,11,0,IOType.IN),
        new IOData("B-PCB夹爪2松",14,13,0,IOType.IN),
    ),
];

tempItem.nozzleList=[//真空类
    new Nozzle(
        new IOData("B-载具真空吸",14,4,0,IOType.OUT),
        new IOData("B-载具破真空吸",14,5,0,IOType.OUT),
        new IOData("B-载具真空检测",14,4,0,IOType.IN),
        
    ),

    new Nozzle(
        new IOData("B-取PCB真空吸",14,6,0,IOType.OUT),
        new IOData("B-取PCB破真空",13,14,0,IOType.OUT),
        new IOData("B-取PCB真空检测",14,4,0,IOType.IN),
       
    ),

    new Nozzle(
        new IOData("B-PCB移载破真空吸",14,3,0,IOType.OUT),
        new IOData("B-PCB移载破真空吸",14,9,0,IOType.OUT),
        new IOData("B-PCB移载真空检测",14,5,0,IOType.IN),
      
    )
];
tempItem.otherIoList=[];
IOList[3] = tempItem





