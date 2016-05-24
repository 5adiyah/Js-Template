var moment = require('moment');
$(document).ready(function(){
  $('#insertTime').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
});
