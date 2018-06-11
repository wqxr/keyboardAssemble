export class Headerinfo{
    CT: number=0;
    finishKeyBoard: number;
    Atraynumber: number;
    Btraynumber: number;
    AOutTrayCount:number = 0;
    BOutTrayCount:number = 0;
    totalPCBnumber: number;
    Acycletime: number = 0;//A装配周期时间
    Bcycletime: number = 0;//B装配周期时间
    AtrayStyle:boolean = false;
    BtrayStyle:boolean = false;
    headdetail: number[] = [];
}