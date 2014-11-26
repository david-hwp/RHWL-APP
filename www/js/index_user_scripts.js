(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {

        $(document).on("click", "#searchBack", function(evt)
        {
            writedate();
        });
        $(document).on("click", "#BackMain", function(evt)
        {
         activate_page("#mainpage"); 
        });
        $(document).on("click", "#yangBackMain", function(evt)
        {
         activate_page("#mainpage"); 
        });
        $(document).on("click", "#retakeBackMain", function(evt)
        {
         activate_page("#mainpage"); 
        });
        $(document).on("click", "#DemoBackMain", function(evt)
        {
         activate_page("#mainpage"); 
        });
        $(document).on("click", "#loginBtn", function(evt)
        {
         activate_page("#mainpage"); 
        });
         $(document).on("click", "#sendBackMain", function(evt)
        {
             activate_page("#mainpage"); 
         });
         $(document).on("click", "#logisticsBackMain", function(evt)
        {
             activate_page("#mainpage"); 
         });
      $(document).on("click", "#receiveBackMain", function(evt)
        {
             activate_page("#mainpage"); 
         });
     
        //主页跳转至其他页面
        $(document).on("click", "#uib_w_14", function(evt)
        {
         activate_page("#LoginPage"); 
        });
        $(document).on("click", "#uib_w_15", function(evt)
        {
            loadhislog();
            activate_page("#logisticsMSG"); 
        });
        $(document).on("click", "#uib_w_16", function(evt)
        {
            loadshouhuo();
            activate_page("#receive"); 
        });
        $(document).on("click", "#uib_w_17", function(evt)
        {
            activate_page("#yangxing"); 
        });
        $(document).on("click", "#uib_w_18", function(evt)
        {
            activate_page("#DemoTrak"); 
            writedate();
        });
        
        $(document).on("click", "#uib_w_20", function(evt)
        {
         activate_page("#chongchouxie"); 
        });
     
    $(document).on("click", "#uib_w_19", function(evt)
    {
        hideSendBtn();
         activate_page("#send"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
