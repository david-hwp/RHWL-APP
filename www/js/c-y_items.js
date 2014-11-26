var datas={"no1":[{"time":"2014-11-04","name":"lucy","numbers":"xh201920998","status":"未处理"}],
            "no2":[{"time":"2014-11-04","name":"张敏","numbers":"jk593087363","status":"已重抽"}],
	        "no3":[{"time":"2014-11-05","name":"王蕾","numbers":"dl980348382","status":"已通知"}],
            "no4":[{"time":"2014-11-05","name":"herry","numbers":"mk109382026","status":"未处理"}],    
            "no5":[{"time":"2014-11-06","name":"刘丽","numbers":"ql903938383","status":"已重抽"}],
            "no6":[{"time":"2014-11-07","name":"郑琦","numbers":"wk386456636","status":"未处理"}],
            "no7":[{"time":"2014-11-07","name":"王清","numbers":"pw938029382","status":"已通知"}],
           };//重抽血

 var datas2={"num1":[{"time":"2014-11-04","name":"lucy","numbers":"xh201920998","status":"未处理"}],
             "num2":[{"time":"2014-11-05","name":"张敏","numbers":"jk593087363","status":"已通知"}],
	         "num3":[{"time":"2014-11-06","name":"王蕾","numbers":"dl980348382","status":"已穿刺"}],
           };//阳性

onload=function(){
    /*设置表格中字体的位置居中*/
     $("table").css("text-align","center");
     $("table thead tr th").css("text-align","center");
     for(var i in datas){
         var newtr=$("<tr/>").appendTo($("#tbd"));//动态插入一行
         var newtd1=$("<td/>").appendTo(newtr);//动态插入一列
         newtd1.get(0).innerHTML=datas[i][0].time; 
         var newtd2=$("<td/>").appendTo(newtr);
         newtd2.get(0).innerHTML="<a href='#'>"+datas[i][0].name+"</a>"+"\(<a href='#'>"+datas[i][0].numbers+"</a>\)";
         var newtd3=$("<td/>").appendTo(newtr);
         newtd3.get(0).innerHTML=datas[i][0].status;
         if("未处理"==datas[i][0].status){
              newtr.addClass("danger");
              newtd3.css("color","red");
              newtr.insertBefore($("#tbd tr:first"));
         }else if("已通知"==datas[i][0].status){
              newtr.addClass("success");
              newtd3.css("color","green");      
         }else{
              newtr.addClass("warning");
              newtd3.css("color","blue");
              newtr.insertAfter($("#tbd tr:last"));
              }
     }
    
    
    for(var j in datas2){  
         var newtr=$("<tr/>").appendTo($("#tbd2"));
         var newtd1=$("<td/>").appendTo(newtr);
         newtd1.get(0).innerHTML=datas2[j][0].time;
         var newtd2=$("<td/>").appendTo(newtr);
         newtd2.get(0).innerHTML="<a href='#'>"+datas2[j][0].name+"</a>"+"\(<a href='#'>"+datas2[j][0].numbers+"</a>\)";
         var newtd3=$("<td/>").appendTo(newtr);
         newtd3.get(0).innerHTML=datas2[j][0].status;
         if("未处理"==datas2[j][0].status){
              newtr.addClass("danger");
              newtd3.css("color","red");
        }else if("已通知"==datas2[j][0].status){
              newtr.addClass("success");
              newtd3.css("color","green");
         }else{
              newtr.addClass("warning");
              newtd3.css("color","blue");
         }
     }
}
    