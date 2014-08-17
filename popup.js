var form = document.forms['roomSubmit'];
form.addEventListener('submit', function() {
  var data = form['room'].value;
  chrome.runtime.sendMessage({'name':'form_submit','data':data});
});