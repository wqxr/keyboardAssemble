import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './component/root/root';
import { HeaderinfoComponent } from './component/headerinfo/headerinfo';
import { FormsModule } from '@angular/forms';

import { AssembleinfoComponent } from './component/assembleing/assembleing';
import { KeycapsComponent } from './component/keycaps/keycaps';
import { AsideComponent } from './component/aside/aside';
import { Configpanel } from './component/configPanel/configpanel';
import { LogPanel } from './component/logPanel/logPanel';
import { PointPanel } from './component/pointPanel/pointPanel';
import { LoginlPanel } from './component/loginPanel/login.panel';
import { ChangePassword } from './component/changePassword/change.password';

import { StationB } from './component/stationB/stationB';
import { StationA } from './component/stationA/stationA';
import { outmaterialPoint } from './component/OutmaterialPoint/pointOutmaterial';

import { KeycapDetailComponent } from './component/keycapsDetails/keycapsdetail';
import { PcbCountComponent } from './component/pcbcount/pcbcount';
import { IPCService } from './common/service/ipc.service';
import { countInfoService } from './service/countinfoService';
import { AssemblingService } from './service/assemblingService';
import { assemblystatusService } from './service/assemblystatusService';
import { TrayinfoService} from './service/TrayinfoService';
import { productionRecordService} from './service/productionRecordService';
import { IOService } from './service/io.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    HeaderinfoComponent,
    AssembleinfoComponent,
    KeycapsComponent,
    KeycapDetailComponent,
    AsideComponent,
    Configpanel,
    LogPanel,
    PointPanel,
    StationB,
    StationA,
    LoginlPanel,
    ChangePassword,
    PcbCountComponent,
    outmaterialPoint
  ],
  providers: [
    IPCService,
    countInfoService,
    AssemblingService,
    assemblystatusService,
    TrayinfoService,
    productionRecordService,
    IOService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }