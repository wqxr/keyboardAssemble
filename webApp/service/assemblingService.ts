import { Injectable } from '@angular/core';
import { productDetail } from "../common/bean/productdetail"
import { Assembling } from "../common/bean/assembling"
import { productdetail } from "../common/bean/assembling"
let productIndex = 0 ;
@Injectable()
export class AssemblingService {

    updateassemblingInfo(data: Assembling, datainfo: any) {
        data.assemblyKey = datainfo.assemblyKey;
        data.lackKeyCount = datainfo.lackKeyCount;
        data.language = datainfo.language;
        data.timeConsume = datainfo.timeConsume;
        data.type = datainfo.type;
    }
    updateheadInfo(data: Assembling, datainfo: any, type: number) {
        if (type == 1) {
            data.keycaps[0].language = datainfo[0].language;
            data.keycaps[0].color = datainfo[0].color;
            data.keycaps[0].machineType = datainfo[0].machineType;
            data.keycaps[0].SN = datainfo[0].SN;
            data.keycaps[0].station = datainfo[0].station;
            data.keycaps[0].type = datainfo[0].type;
        } else {
            data.keycaps[1].language = datainfo[1].language;
            data.keycaps[1].color = datainfo[1].color;
            data.keycaps[1].machineType = datainfo[1].machineType;
            data.keycaps[1].SN = datainfo[1].SN;
            data.keycaps[1].station = datainfo[1].station;
            data.keycaps[1].type = datainfo[1].type;
        }
    }
    assemblinginfo(data: productDetail, datainfo: any) {
        if (datainfo.code === "A") {
            datainfo.code = "A工位";
            data.codeStation = "A工位";
            data.APCBSN = datainfo.PCBSN||"nosn";
            data.ATraySN = datainfo.TraySN||"noTraysn";
        } else {
            data.codeStation = "B工位";
            datainfo.code = "B工位"
            data.BPCBSN = datainfo.PCBSN||"nosn";
            data.BTraySN = datainfo.TraySN||"noTraysn";
        }
        data.jobnumber = datainfo.jobnumber||"";
        data.type = datainfo.type||"";
    }
    productdetailinfo(data: Assembling, datainfo: any) {
        data.productdetail = new productdetail();
        if( datainfo.code === "A" ) {
            data.productdetail.codeStation = "A工位";
        } else {
            data.productdetail.codeStation = "B工位";
        }
        data.productdetail.PCBSN = datainfo.PCBSN||"nosn";
        data.productdetail.TraySN = datainfo.TraySN||"noTraysn";
        data.productdetail.time = datainfo.time;
        data.productdetail.jobnumber = datainfo.jobnumber||"";
        data.productdetail.type = datainfo.type||"";
        data.productdetail.index =  productIndex + 1;
        productIndex++;
        data.detailproduct.unshift(data.productdetail);
        // if(data.detailproduct.length>5){
        //     data.detailproduct.splice(data.detailproduct.length-1,1);
        // }
    }
    onloadProduct(data: Assembling, datainfo: any) {
        data.detailproduct = datainfo;
        data.detailproduct.forEach((item)=>{
            item.index ++ ;
        });
    }
}