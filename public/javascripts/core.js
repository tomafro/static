//Reusable functions
var Alphagov = {
  cookie_domain: function() {
    var host_parts = document.location.host.split(':')[0].split('.').slice(-3);
    return '.' + host_parts.join('.');
  },
  read_cookie: function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  },
  delete_cookie: function(name) {
    if (document.cookie && document.cookie != '') {
      var date = new Date();
      date.setTime(date.getTime()-(24*60*60*1000)); // 1 day ago
      document.cookie = name + "=; expires=" + date.toGMTString() + "; domain=" + Alphagov.cookie_domain() + "; path=/";
    }
  },
  write_permanent_cookie: function(name, value) {
    var date = new Date(2021, 12, 31);
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + date.toGMTString() + "; domain=" +  Alphagov.cookie_domain() + "; path=/";
  },
  
  get_display_place_name: function(locality_name, council_name){
    var result = '';

    //get long/short version of council name
    council_short_name =  council_name.replace(' Borough Council', '').replace(' County Council', '').replace(' District Council', '').replace(' Council', '');

    if(council_short_name != '' && council_short_name != undefined){
      result = locality_name + ', ' + council_short_name;
    }else{
      result = locality_name;
    }
    
    return result;
  }
  
  
}

//General page setup
jQuery(document).ready(function() {

    
  //Setup annotator links 
  $('a.annotation').each(function(index) {
    $(this).linkAnnotator();
  });

  //feedback
  $('#send_feedback').click(function () {
    $('#feedback-router').show();
    return false;
  });
  $('a.close').click(function () {
    $(this).closest('.popover-mask').hide();
  });


});

