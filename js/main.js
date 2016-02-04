

$(document).ready(function(){ 
		display_main();
	});



function successHandler (result) {
       
 //var div = document.getElementById('myDiv');
// div.innerHTML=result;

}

function errorHandler (error) {
   // var div = document.getElementById('myDiv');
 // div.innerHTML=error;
 alert("GCM error");
}

function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    
}


function onNotificationAPN (event) {
    if ( event.alert )
    {
        navigator.notification.alert(event.alert);
    }

    if ( event.sound )
    {
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}


function onNotificationGCM(e) {
    
    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
           
                   json_call(e.regid); //gcm 코드 저장
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
          
            var my_media = new Media("/android_asset/www/"+e.soundname);
            my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }
            else
            {
                $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }

        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
        $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
    break;

    case 'error':
        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;

    default:
        $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
}


function json_call(reg_id) {
      var reg_id=reg_id;
      var deviceid=device.uuid;
      alert(reg_id+" "+deviceid);
      
       } 


// 홈 클릭
$("#home_btn").click(
	function() {
			alert("확인");
	}
	
);

 var pushNotification;

            function onLoad() {
				 document.addEventListener("deviceready", onDeviceReady, false);
}
  function onDeviceReady() {
        // Register the event listener
        var uuid=device.uuid;
            // uuid 정리 

           
  
pushNotification = window.plugins.pushNotification;




    pushNotification.register(
        successHandler,
        errorHandler, {
            "senderID":"6713287727330566613",
            "ecb":"onNotificationGCM"
        });
            
        document.addEventListener("backbutton", function(e)
    {
   

      navigator.app.backHistory();
    
    }, false);


  document.addEventListener("menubutton", function(e)
    {
       

 if (confirm('exit')) {
        navigator.app.exitApp();
    }
         
       }, false);


 var success = function(status) {
         navigator.notification.activityStop();
        }

        var error = function(status) {
         navigator.notification.activityStop();
        }
navigator.notification.activityStart("PlusPay", "updating");
        window.cache.clear( success, error );

        
      

  check_uuid(uuid);
 
 
    }
