
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require("fs");


//app.configure(function(){
  //  app.use(express.static(__dirname + '/src'));chatbackup
//});
/*fs.writeFile(__dirname + '/src/chatbackup/input.json', '{app:"chat"}',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("Data written successfully!");
   fs.readFile(__dirname + '/src/chatbackup/input.json', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("Asynchronous read: " + data.toString());
   });
});*/
var expressImage=require('express');
app.use(expressImage.static(__dirname + '/src'));
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  //app.use(express.static(path.join(__dirname)));
  //res.sendFile(path.join(__dirname, '../san/src/partial', 'chat.html'));
   res.sendFile(__dirname + '/src/partial/chat.html');
});
 
// Register events on socket connection
io.on('connection', function(socket){ 

  socket.on('onetwoone', function(objTo, msg){
  io.sockets.to(objTo.socket).emit("onetwoone",objTo,msg);
  io.sockets.to(objTo.meSocket).emit("onetwoone",objTo,msg);
  
  
  
  });
    socket.on('disconnect', function () {
        console.log('user disconnected');
		 for(var i=0; i<users.length; i++) {
            if(users[i].mobile == socket.mobile) {
			   var index = users.indexOf(socket.mobile);
               users.splice(index, 1);
            }
        }
        updateClients(); 
    });
  
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
   function updateClients() {
        io.sockets.emit('update', users);
    }
 function userExists(){
 io.emit('userIDExists', 'User Email Already exists...');
 }
  
 function getFileName(obj,to,from){
 
 var fName="N";
  for (var key in obj) {
  console.log('fName  124'+obj[key].mobile2+obj[key].mobile1);
  console.log('fName  125'+to+from);
  if (obj.hasOwnProperty(key)) {
  if(obj[key].mobile1==to && obj[key].mobile2==from || obj[key].mobile1==from && obj[key].mobile2==to){
  fName=obj[key].fileName;
  break;
  }
  }
  }
  
if(fName=="N"){

  var postFix='/src/chatbackup/backup_'+to+'_'+from+'.json';

  var objJ=JSON.stringify({
	"app": "chat",
	"messages": []
});
  fs.writeFile(__dirname +postFix, objJ,  function(err) {
   if (err) {
       return console.error(err);
   }

  backupList.push({
  mobile1:to,
  mobile2:from,
  fileName:'backup_'+to+'_'+from+'.json'
  });
  fName='backup_'+to+'_'+from+'.json';
  //console.log('userPair'+JSON.stringify(backupList));
  });
}//end
  console.log('fName  145'+fName);
 return fName;
 }
 
 socket.on('createbackup', function(objUserInfo){
  
 //var getFName=getFileName(backupList,0,0,'message');
 

 /*
  for (var key in userPair) {
  if (userPair.hasOwnProperty(key)) {
  if(userPair[key].email==objFrom.email){
  console.log(JSON.stringify('userPair[key].group 111 : '+userPair[key].group));
  var index=userPair[key].group.indexOf(objTo.email);
  console.log('Before i  '+index);
  if(index==-1){
  ++count;
  var postFix='/src/chatbackup/backup'+count+'.json';
  var objJ=JSON.stringify({
	"app": "chat",
	"messages": []
});
  fs.writeFile(__dirname +postFix, objJ,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log('userPair[i].pair'+JSON.stringify(userPair));
   console.log('userPair[i]'+JSON.stringify(userPair[key]));
   userPair[key].group.push(objTo.email);
   //console.log('userPair'+JSON.stringify(userPair));
   for (var keyK in userPair) {
  if (userPair.hasOwnProperty(keyK)) {
  if(userPair[keyK].email==objTo.email){
  var indexK=userPair[keyK].group.indexOf(objFrom.email);
  console.log('index k'+indexK);
  if(indexK==-1){
     userPair[keyK].group.push(objFrom.email);
	 console.log('userPair 136 : '+JSON.stringify(userPair));
  }
  break;
  }
  }
  }
  
  backupData.push({
  email1:objFrom.email,
  email2:objTo.email,
  fileName:'backup'+count+'.json'
  });
  console.log('userPair'+JSON.stringify(backupData));
  });
  }
  }
  }
  }
  
  /*use to find the filename*/
  var getFName=getFileName(backupList,objUserInfo.to_mobile,objUserInfo.from_mobile);
  
  if(getFName!=undefined && getFName!=null && getFName!=''){
   fs.readFile(__dirname + '/src/chatbackup/'+getFName, function (err, data) {
      if (err) {
         return console.error(err);
      }
	  console.log("read: File 181" + data.toString());
	  var objData=JSON.parse(data);
	  var jObj=JSON.stringify(objData);
	  io.sockets.to(objUserInfo.from_socket).emit('showbackup_message', jObj);
	  });
	  }
  
  
  /*
  var filename=returnFileName(backupData,objFrom.email,objTo.email);
  console.log(' returnFileName filename:176'+filename);
  if(filename!=undefined && filename!=null && filename!=''){
   fs.readFile(__dirname + '/src/chatbackup/backup2.json', function (err, data) {
      if (err) {
         return console.error(err);
      }
	  console.log("read: File 181" + data.toString());
	  var objData=JSON.parse(data);
	  var jObj=JSON.stringify(objData);
	  io.sockets.to(objFrom.meSocket).emit('showbackup_message', jObj);
	  });
	  }*/
  
});

});

/*function returnFileName(obj,from,to){

//userPair[key].email
var retFilename="";
console.log('Obj 196'+JSON.stringify(obj));
 for (var key in obj) {
 console.log('userPair'+JSON.stringify(obj[key]));
  if (obj.hasOwnProperty(key)) {
    //console.log('email1 198'+obj[key].email1);
   //console.log('email2 199'+obj[key].email2);
   //console.log('To 200'+to);
   //console.log('From 201'+from);
  if(obj[key].email1==from && obj[key].email2==to || obj[key].email1==to && obj[key].email2==from){
   retFilename=obj[key].fileName;
  }
  }
  }
  return retFilename;
} 
*/


/*
function chatBackUpData(chatInfo, msgstring, filename){

console.log("Got file info successfully");
fs.stat(__dirname + '/src/chatbackup/'+filename, function (err, stats) {
   if (err) {
       return console.error(err);
   }
   //console.log(stats); emailFrom
   console.log("Got file info successfully!"+JSON.stringify(chatInfo));
   
   // Check file type
   console.log("isFile ? " + stats.isFile());
   console.log("isDirectory ? " + stats.isDirectory());    
   if(stats.isFile()){
   
      fs.readFile(__dirname + '/src/chatbackup/'+filename, function (err, data) {
      if (err) {
         return console.error(err);
      }
	  //console.log("Asynchronous read: " + data.toString());
	  var objData=JSON.parse(data);
	  console.log(objData);
	  objData.messages.push({
	  to:chatInfo.email,
	  from:chatInfo.emailFrom,
	  message:msgstring
	  });
    fs.writeFile(__dirname + '/src/chatbackup/'+filename, JSON.stringify(objData),  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log(" inner Data written successfully!");
   console.log("Let's read newly written data");

});
	  
   });
   
   

   
   }
});
}
*/
 function create_chat_backup(objInfo, msgstring, filename,to){

fs.stat(__dirname + '/src/chatbackup/'+filename, function (err, stats) {
   if (err) {
       return console.error(err);
   }

   console.log("isFile ? " + stats.isFile());
   console.log("isDirectory ? " + stats.isDirectory());    
   if(stats.isFile()){
   
      fs.readFile(__dirname + '/src/chatbackup/'+filename, function (err, data) {
      if (err) {
         return console.error(err);
      }
	  //console.log("Asynchronous read: " + data.toString());
	  var objData=JSON.parse(data);
	  objData.messages.push({
	  to:objInfo.to_mobile,
	  from:objInfo.from_mobile,
	  to_name:objInfo.to_name,
	  from_name:objInfo.from_name,
	  message:msgstring
	  });
    fs.writeFile(__dirname + '/src/chatbackup/'+filename, JSON.stringify(objData),  function(err) {
   if (err) {
       return console.error(err);
   }

});
	  
   });
   
   

   
   }
});
}
 
 
 function showMessage(){
 fs.readFile(__dirname + '/src/chatbackup/'+filename, function (err, data) {
      if (err) {
         return console.error(err);
      }
	  console.log("Asynchronous read: " + data.toString());
	  var objData=JSON.parse(data);
	  io.emit('showbackup_message', data);
	  });
 }
// Listen application request on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});