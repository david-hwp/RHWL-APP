/*
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// See app.initEvents() in init-app.js for event initialization.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...
/*
数据格式：
页面加载时：
[{"exception":"1个"},
{"time":"2014-11-01","datas":[{"name":"张三","code":"XBY38575945","status":"未处理"},{"name":"李四","code":"XBY38575946","status":"未处理"}]},
{"time":"2014-11-02","datas":[{"name":"王五","code":"XBY38575947","status":"已处理"}]}
]
这是一个时间（即同一天）内做检查的人，time为日期，datas为每天做检查的多个数据,其下包含的name为受检孕妇姓名，code为序列号，status为状态

搜索时：传入一个参数到服务器，判断是汉字还是字母或数字，汉字按姓名模糊查询，字母或数字则按code查询  
结果返回：
[
{"time":"2014-07-08","name":"李四","code":"XBY54545455","status":"未处理"}
{"time":"2014-07-09","name":"王五","code":"XBY54545456","status":"已处理"}
]
如果按代号查询，只返回一个结果；如果是模糊查询，不排除返回多个查询结果的可能。
*/
//-------------------------------------------------------------------------------------------------------------

var server_ip='120.24.58.11';//服务器地址
var port='8069';//端口号
var DBname='dev';//数据库名

window.onload=writedate;//页面加载时直接调用函数
function writedate(jsonStr){
    var json=JSON.parse('[{"exception":"1个"},{"time":"2014-11-01","datas":[{"name":"张三","code":"XBY38575945","status":"未处理"},{"name":"李四","code":"XBY38575946","status":"重抽血"}]},{"time":"2014-11-02","datas":[{"name":"王五","code":"XBY38575947","status":"阳性"}]}]');
    
    var length=json.length;
    //alert("外长："+length);
    //alert("---"+json[0].exception.length);
    $("#num").html(json[0].exception);//写入异常个数
    $("#bs-accordion-0").html(""); //先清空一次,防止二次刷新的时候数据累加
    for(var i=1;i<length;i++){//外循环写入下拉列表,由于第一个为异常，下标从1开始     
      var info='<div class="panel widget uib_w_'+(i+5)+' panel-warning" data-uib="twitter%20bootstrap/collapsible" data-ver="0"><div class="panel-heading"><h4 class="panel-title" data-toggle="collapse" href="#bs-accordion-group-'+i+'" data-parent="#bs-accordion-0">时间：'+json[i].time+'</h4></div><div id="bs-accordion-group-'+i+'" class="panel-collapse collapse"><div class="panel-body"><div class="col uib_col_'+(i+6)+' single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><table class="hovertable" id="tab'+i+'"><tr><th>姓名</th><th>代号</th><th>状态</th></tr></table></div></div></div></div></div>';     
      $("#bs-accordion-0").append(info);    
      var length1=json[i].datas.length;
      //alert("内长："+length1);
      for(var j=0;j<length1;j++){//内循环写入具体table数据
         var data=json[i].datas[j];
         //var designation='XBY12312123';//此处模拟代号，当onclick发生 传入代号转到另外页面
         var tr='';
         if(data.status=='阳性'||data.status=='重抽血'){//加个判断 如果状态为阳性或重抽血则状态为红色
            tr='<tr onmouseover="mouseover(this)" onmouseout="mouseout(this)" id="'+data.code+'" onclick="goto(this)"><td>'+data.name+'</td><td>'+data.code+'</td><td style="color:red;font-weight:bold;">'+data.status+'</td></tr>';
         }else{
            tr='<tr onmouseover="mouseover(this)" onmouseout="mouseout(this)" id="'+data.code+'" onclick="goto(this)"><td>'+data.name+'</td><td>'+data.code+'</td><td>'+data.status+'</td></tr>';
         }    
         $("#tab"+i).append(tr);
       }
     }  
}
//-------------------------------------------------------------------------------------------------------------
//==================================当点击搜索的时候
function search(obj){
   var inp=$("#inp")[0].value;//获得输入框输入的值
   alert("搜索关键字："+inp);
    
    var url="http://www.kuaidiapi.cn/rest/";
    var data="uid=20840&key=afba559bf6104e5d9696b870a2b26e8d&order?=&id=?";
    //$.post(url,data,writeresult);//调用ajax发送数据，并调用回调函数，获得数据写入
    writeresult(data);
}
//回调函数，写入查询结果=================================================
function writeresult(data){
        var json=JSON.parse('[{"time":"2014-07-08","name":"李四","code":"XBY54545455","status":"未处理"},{"time":"2014-07-09","name":"王五","code":"XBY54545456","status":"阳性"}]');//将数据使用JSON解析出来       
   
        var length=json.length;
        var tab='<table class="hovertable" id="result"><tr><th>时间</th><th>姓名(代号)</th><th>状态</th></tr></table>';
        $("#bs-accordion-0").html(tab);  //写入table框架
        for(var i=0;i<length;i++){
           var dat=json[i];
           var res='';
           if(dat.status=='阳性'||dat.status=='重抽血'){//加个判断 如果状态为阳性或重抽血则状态为红色
              res='<tr onmouseover="mouseover(this)" onmouseout="mouseout(this)" id="'+dat.code+'" onclick="goto(this)"><td>'+dat.time+'</td><td>'+dat.name+'<br>('+dat.code+')'+'</td><td  style="color:red;font-weight:bold;">'+dat.status+'</td></tr>';
           }else{
              res='<tr onmouseover="mouseover(this)" onmouseout="mouseout(this)" id="'+dat.code+'" onclick="goto(this)"><td>'+dat.time+'</td><td>'+dat.name+'<br>('+dat.code+')'+'</td><td>'+dat.status+'</td></tr>';
           }
           $("#result").append(res);//逐个写入数据
         }
           var back='<button class="btn widget uib_w_4 d-margins btn-sm btn-info" data-uib="twitter%20bootstrap/button" data-ver="0" id="searchBack"><i class="glyphicon glyphicon-chevron-left button-icon-left" data-position="left"></i>返回</button>';
           $("#bs-accordion-0").append(back);
}



//---------------------------------------------------------------------------------------------------------------
function back(){//从搜索结果返回到样品追踪主页
    writedate();//直接调用函数重新写入一次数据
}

function goto(obj){//当选中一个tr点击的时候 查看详情的跳转函数 携带一个序列号跳到张鹏页面
    
    alert("代号为："+obj.id);
}

//鼠标对table的移入移出事件
function mouseover(obj){
   obj.style.backgroundColor='#ffff66';
}
 
function mouseout(obj){
   obj.style.backgroundColor='#d4e3e5';
}

//------------------------------------------------hwp&zy--------------------
var options="";
var cancel=false;
var preBreakNum=0;//前一次填写的破损数量
var demo=[];
var i=0;
var allCount=0;
function wuliu() {
    options="wuliu";
    intel.xdk.device.scanBarcode();
}

document.addEventListener("intel.xdk.device.barcode.scan", function(evt) {
    intel.xdk.notification.beep(2);
    if (evt.type == "intel.xdk.device.barcode.scan") {
        if (evt.success === true) {
            var url = evt.codedata;
            if(options=="addDemo"){
                demo.push(url);
                $("#body-one").show();
                $("#confrimOut").show();
                $("#tbody_y").append("<tr><td>"+(i+1)+"</td><td>"+url+"</td><td>"+"按钮"+"</td></tr>");
                $(".demoCount").text(i+1);
                $(".allCount").text(i+1);
                i++;
                $('#continueScan').modal('show');
            }else if(options=="wuliu"){ 
                $("#scanner").val(url);
            }else if(options=="recieve"){
            //向服务器发送快递单号，获得应收试管数
                /* $.ajax("",url,function (data){
                    
             
                   
                   })*/
            //将服务器发来的数据显示到页面上
           //模拟数据
            var goodsItems={ "neworder01":[{"logIdCompany":"9331708964","Number":"10"}]};
                shownewOderItems(goodsItems);//将从服务器获得的收货数据展示
            }
        } else {
            cancel=true;
        }
    }
});
function addDemo(){
    options="addDemo";
    intel.xdk.device.scanBarcode();
    //$('#continueScan').modal('show');
}

function addBreak(){
    var breakText=$("#breakInput").val().trim();
    var breakNum=parseInt(breakText);
    if(isNaN(breakNum)){
        //$("#breakInput").addClass("from-err")
        //$("#element").popover('show');
        alert("breakText==="+breakText);
    }else{
        var preallCount=parseInt($("#allCount").text().trim());
        allCount=preallCount-preBreakNum+breakNum;
        $(".breakCount").text(breakNum);
        $(".allCount").text(allCount);
        preBreakNum=breakNum;
    }
}

function upload(){
    
}

function showLogistics(){
    $("#send").hide();
    $("#recieve").hide();
    $("#logistics").show();
}


    var   hisinfo={"logvalue01":[{"time":"2014/03/20","logIdCompany":"12345678912-申通","state":"已接受"}],
                "logvalue02":[{"time":"2014/04/29","logIdCompany":"12787132320-韵达","state":"已发送"}],
                "logvalue03":[{"time":"2014/11/05","logIdCompany":"12891231211-顺风","state":"已发送"}]
                             
                }; 

//扫快递单号
function shouHuoBut(){
    options="recieve";
    intel.xdk.device.scanBarcode();
}


//显示历史物流
function loadhislog(){
 var logtbody=$("#logtb01");
    logtbody.html("");
 for(var keyl in hisinfo){

     var newtr=$("<tr/>").appendTo($("#logtb01"));
     var newtd1=$("<td/>").appendTo(newtr);
         newtd1.get(0).innerHTML=hisinfo[keyl][0].time;
     var newtd2=$("<td/>").appendTo(newtr);
         newtd2.get(0).innerHTML=hisinfo[keyl][0].logIdCompany;
     var newtd3=$("<td/>").appendTo(newtr);
         newtd3.get(0).innerHTML=hisinfo[keyl][0].state;
 }

}
//当没有快递来时  隐藏
function loadshouhuo(){
        $("#showTake").css({"display":'none'});

}
var count=-1;
var numforYingShou=-1;

//展示新快递里的试管数
function shownewOderItems(items){
    var  shtbody=$("#shTb02");
    shtbody.html("");
    for(var keyo in items){
     var newtr=$("<tr/>").appendTo($("#shTb02"));
     var newtd1=$("<td/>").appendTo(newtr);
         newtd1.get(0).innerHTML=items[keyo][0].logIdCompany;//快递单号
     var newtd2=$("<td/>").appendTo(newtr);
         newtd2.get(0).innerHTML=items[keyo][0].Number;//应收试管数
         numforYingShou=items[keyo][0].Number;
     var newtd3=$("<td />").appendTo(newtr);     
       $("<input type='text' id='td3'/>").css("width","50px").appendTo(newtd3);  
    }
}

//确认收货按钮：确认应收试管和实收试管数
function sureForSH(){
  //var firvalue=$("#tdshiguan01").innerHTML;
  var secvalue=$('#td3').val();
  if(numforYingShou!=secvalue){//不匹配时显示备注信息
       $("#marks01").css({"display":'block'});
       var marksValue=$("#markId01").val();
        
      if(marksValue!==''){
        confirm("确认收货了！");
      }else{
        alert("请填写原因");
      }
  }else{
        confirm("确认收货！");
  
  }
}

//当有快递到来时展示
function shownewOder(){
    $("#showTake").css({"display":'block'});
    $("#marks01").css({"display":'none'});
}

//按要求搜索历史物流
function searchHislog(){
   var searchval=$('#searchlog').val();
   var i=-1;
      var  hislogs=[];
        for(var keyls in hisinfo){
           var company=((hisinfo[keyls][0].logIdCompany).split("-"))[1];
           // alert(searchval+","+hisinfo[keyls][0].time)
           if(searchval.match(hisinfo[keyls][0].time)){
               i++;
               hislogs[i]=keyls;
            }
            else if(searchval.match(hisinfo[keyls][0].state)){
             i++;
                hislogs[i]=keyls;
            }
            else if(searchval.match(company)){
                i++;
               hislogs[i]=keyls;
            }
            else{
             matchlog(hislogs);
            }
        }
    matchlog(hislogs);
}

//匹配的搜索结果  并将其展示出来
function matchlog(logkeys){
   var logtbody=$("#logtb01");
    logtbody.html("");
    for(var i=0;i<logkeys.length;i++){
     var newtr=$("<tr/>").appendTo($("#logtb01"));
     var newtd1=$("<td/>").appendTo(newtr);
         newtd1.get(0).innerHTML=hisinfo[logkeys[i]][0].time;
     var newtd2=$("<td/>").appendTo(newtr);
         newtd2.get(0).innerHTML=hisinfo[logkeys[i]][0].logIdCompany;
     var newtd3=$("<td/>").appendTo(newtr);
         newtd3.get(0).innerHTML=hisinfo[logkeys[i]][0].state;
    }
}


