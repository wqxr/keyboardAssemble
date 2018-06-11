'use strict'
const webSocketServer = require('websocket').server;
const WebSocketClient = require('websocket').client;
const http= require('http');
const uuidv1 = require('uuid/v1');
const logger = require('../nodeApp/service/logger.js');
//let readData = require('./excleTest.js');
let connection = null;
function socketServer(){
let server  =http.createServer( function(request , response){
        console.log( (new Date())+' Received request for '+request.url);
        response.writeHead(404);
        response.end();
    })
    server.listen(8002, function(){
        console.log( (new Date())+ ' server is listen on port 8000');
    });
    let wsServer = new webSocketServer({
        httpServer :server,
        autoAcceptConnections:false
    });
    function originIsAllowed(origin){
        return true;
    }
    wsServer.on('request',function(request){
        if(!originIsAllowed(request.origin)){
            request.reject();
            console.log((new Date())+' Connection from origin' +request.origin+' rejected. ');
            return ;
        }
        var connection = request.accept(null, request.origin);
        console.log((new Date()) + ' Connection accepted.');
        //mockDataCase1(connection);
        //mockDataCase2(connection);
        //mockDataCase3(connection);
        //mockDataCase4(connection);
        //mockDataCase5(connection);
        //mockDataCase6(connection)
        // reportTest(connection);
        mockDataCase8(connection)
        //mockDataCase9(connection);
        //mockDataCase10(connection);
        connection.on('close', function(reasonCode, description) {
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        }); 
        connection.on('message', async function (message) {
            if (message.type === 'utf8' || message.type === 'utf-8') {
                let receivedData = JSON.parse(message.utf8Data);
                //console.log(message.utf8Data);
                if (receivedData.data.resultCode && receivedData.data.resultCode === -1) {
                    //console.log("异常,"+receivedData.msgType);
                    process.exit(-1);
                    return;
                }
            }
        });
    });
}
module.exports={
    socketServer:socketServer
}
const msgTemplate = {
    "msgType": "",
    "version": "v1.0.0",
    "timestamp": null,
    "data": null,
    "msgId": null
}
function awaitTime(time){
    time = time > 0 ? time*1000 : 300;
    return new Promise(function(resolve,reject){
        setTimeout(function() {
            resolve();
        }, time );
    });
}
async function mockDataCase5(connection){
    await awaitTime(5);
    for(let i=0;i<2;i++){
        assemb(connection);
       // outmaterial(connection);
    }   
}
async function mockDataCase6(connection){
    await awaitTime(7);
    for(let i=0;i<1;i++){
       workingDetail(connection);
    }   
}
async function mockDataCase7(connection){
    await awaitTime(8);
    for(let i=0;i<1;i++){
        assembling(connection);
    }
}
async function mockDataCase8(connection){
    // await awaitTime(4);
    // inmaterial(connection,"A");
    await awaitTime(4);
    inmaterial(connection,"B");
    for(let i=1;i<=20;i++){
        await awaitTime(3);
        headerinfo(connection,i);
        await awaitTime(3);
        outmaterial(connection,i);
    }
    
}
async function mockDataCase9(connection){
    for(let i=0;i<9;i++){
        await awaitTime(3);
        opsStaus(connection,i);
    }
    
}
async function mockDataCase10(connection){
    for(let i=0;i<9;i++){
        await awaitTime(3);
        workModel(connection);
    }
    
}
function workModel(connection){
    let message=Object.assign({},msgTemplate);
    message.msgType="workModel";
    message.msgId=uuidv1();
    message.timestamp=Date.now();
    message.data={
        CCD: 1,
        scanCode: 1,
        ccdres: 1,
        space: 1,
        enableStationA: 1,
        enableStationB: 1,
        showflowin: 1,
        emptyrun: 1,
        enter: 1,
        up: 1,
        down: 1,
        enableMachineCon:1
    }
    connection.sendUTF(JSON.stringify(message));
}
function workingDetail(connection){
    let message=Object.assign({},msgTemplate);
    message.msgType="workingDetail";
    message.msgId=uuidv1();
    message.timestamp=Date.now();
    message.data = 
        [{
            "contory": "Swiss",
            "model": "x86",
            "area": "asian1",
            "color":"White",
            "EEEE":"HWBC",
            "config":"ISO"
        }, {
            "contory": "German",
            "model": "x369a",
            "area": "asian2",
            "color":"Sparrow",
            "EEEE":"HWBC",
            "config":"ISO"

         }
    ]
    
    connection.sendUTF(JSON.stringify(message));

}
function opsStaus(connection,i){
    let message=Object.assign({},msgTemplate);
    message.msgType="opsStatus";
    message.msgId=uuidv1();
    message.timestamp=Date.now();
    message.data={
      "status":i
    }
    connection.sendUTF(JSON.stringify(message));
}
function userlogin(connection){
    let message=Object.assign({},msgTemplate);
    message.msgType="loginresult";
    message.msgId=uuidv1();
    message.timestamp=Date.now();
    message.data={
      "resultcode":1
    }
    connection.sendUTF(JSON.stringify(message));
}
function inmaterial(connection,code){
    let message=Object.assign({},msgTemplate);
    message.msgType="inmaterial";
    message.msgId=uuidv1();
    message.timestamp=Date.now();
    message.data={
        "code":code,
    }
    connection.sendUTF(JSON.stringify(message));
}
function headerinfo(connection,i){
    let message=Object.assign({},msgTemplate);
    message.msgType="feederinfomation";
    message.msgId=uuidv1();
    message.timestamp=Date.now();
    let code = null;
    if(i%2===0){
        code = "A";
    }else{
        code = "B";
    }
    message.data={
        "code":"B",
        "PCBSN":"pcb"+i,
        "TraySN":"tray"+i,
        "type":"JIS",
        "jobnumber":"hhAH"
    }
    connection.sendUTF(JSON.stringify(message));
}
 async function outmaterial(connection,i){
    let message=Object.assign({},msgTemplate);
    message.msgType="outmaterial";
    message.msgId=uuidv1();
    message.timestamp=Date.now();
    let code = null;
    // if(i%2===0){
    //     code = "A";
    // }else{
    //     code = "B";
    // }
    message.data={
        "code":"B",
        "PCBSN":"pcb"+i,
    }
    connection.sendUTF(JSON.stringify(message));
    // await awaitTime(4);
    // message.msgType="outmaterial";
    // message.msgId=uuidv1();
    // message.timestamp=Date.now();
    // message.data={
    //     "code":"A",
    //     "PCBSN":"FPW74952TLJJLLR1Y",
    // }
    // connection.sendUTF(JSON.stringify(message));
    // await awaitTime(4);
    // message.msgType="outmaterial";
    // message.msgId=uuidv1();
    // message.timestamp=Date.now();
    // message.data={
    //     "code":"A",
    //     "PCBSN":"FPW74952THSJLLR1Z",
    // }
    // connection.sendUTF(JSON.stringify(message));
    // await awaitTime(4);
    // message.msgType="outmaterial";
    // message.msgId=uuidv1();
    // message.timestamp=Date.now();
    // message.data={
    //     "code":"A",
    //     "PCBSN":"FPW74952TGFJLLR1D",
    // }
    // connection.sendUTF(JSON.stringify(message));
    // await awaitTime(4);
    // message.msgType="outmaterial";
    // message.msgId=uuidv1();
    // message.timestamp=Date.now();
    // message.data={
    //     "code":"A",
    //     "PCBSN":"FPW74952TMBJLLR12",
    // }
    // connection.sendUTF(JSON.stringify(message));
    // await awaitTime(4);
    // message.msgType="outmaterial";
    // message.msgId=uuidv1();
    // message.timestamp=Date.now();
    // message.data={
    //     "code":"A",
    //     "PCBSN":"FPW74952TGHJLLR1B",
    // }
    //connection.sendUTF(JSON.stringify(message));
}
function assembling(connection){
    let message=Object.assign({},msgTemplate);
    message.msgType="workingDetail";
    message.msgId=uuidv1();
    message.timestamp=Date.now();
    message.data={
       "keycaps": [{
            "contory": "Swiss",
            "model": "x86",
            "area": "asian1",
            "color":"White",
            "EEEE":"HWBC",
            "config":"ISO"
        }, {
            "contory": "German",
            "model": "x369a",
            "area": "asian2",
            "color":"Sparrow",
            "EEEE":"HWBC",
            "config":"ISO"

         }
    ]
}
    connection.sendUTF(JSON.stringify(message));

}
async function assemb(connection) {
    let message = Object.assign({}, msgTemplate);
    message.msgType = "sendMsg";
    message.msgId = uuidv1();
    message.timestamp = Date.now();
    message.data =
       {
           operate:"复位成功"
       }
    connection.sendUTF(JSON.stringify(message));
    await awaitTime(4);
    //let message = Object.assign({}, msgTemplate);
    message.msgType = "sendMsg";
    message.msgId = uuidv1();
    message.timestamp = Date.now();
    message.data =
       {
           error:"大家过来打几个",
           ID:"234gfdfgdg",
       }
    connection.sendUTF(JSON.stringify(message));
    // await awaitTime(4);
    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ANSI",
    //         "language": "China",
    //         "status": 3,
    //         "target": "left",           
    //     }]
    // connection.sendUTF(JSON.stringify(message));
    // await awaitTime(4);

    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ANSI",
    //         "language":"China",
    //         "status":1,
    //         "target": "right",
            
    //     }]
    // connection.sendUTF(JSON.stringify(message))
    // await awaitTime(4);

    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ANSI",
    //         "language":"China",
    //         "status":3,
    //         "target": "right",
            
    //     }]
    // connection.sendUTF(JSON.stringify(message))
    // await awaitTime(4);

    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ANSI",
    //         "language":"China",
    //         "status":4,
    //         "target": "right",
            
    //     }]
    // connection.sendUTF(JSON.stringify(message));

    // await awaitTime(4);
    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ANSI",
    //         "language": "China",
    //         "status": 2,
    //         "target": "right",
            
    //     }]
    // connection.sendUTF(JSON.stringify(message));

    // await awaitTime(4);
    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ANSI",
    //         "language": "China",
    //         "status": 0,
    //         "target": "right",           
    //     }]
    // connection.sendUTF(JSON.stringify(message));
    // await awaitTime(4);

    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ISO",
    //         "language":"China",
    //         "status":4,
    //         "target": "right",
            
    //     }]
    // connection.sendUTF(JSON.stringify(message))
    // await awaitTime(4);

    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ISO",
    //         "language":"China",
    //         "status":2,
    //         "target": "right",
            
    //     }]
    // connection.sendUTF(JSON.stringify(message))
    // await awaitTime(4);

    // message.msgType = "assemblyStatus";
    // message.msgId = uuidv1();
    // message.timestamp = Date.now();
    // message.data =
    //     [{
    //         "color": "white",
    //         "type": "ISO",
    //         "language":"China",
    //         "status":0,
    //         "target": "right",
            
    //     }]
    // connection.sendUTF(JSON.stringify(message))

}

function reportTest(connection){
    connection.on('message',function(message){
        for (var key in message) {
            if (message.hasOwnProperty(key)) {
                var element = message[key];
                console.log('message:  '+ element);
            }
        }
        
    });
}