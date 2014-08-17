var storage = new Firebase('https://fiery-torch-5161.firebaseio.com/'),
rooms = storage.child('rooms'),
currentRoom = 'lobby',
currentUrl = null;
console.log('currentRoom =', currentRoom);


// Setup listener for form submit on popup.html
chrome.runtime.onMessage.addListener(function(message,sender,callback) {
  if (message.name === 'form_submit') {
    currentRoom = message.data;
    console.log('currentRoom =', currentRoom);
  }
});


// Listen for changes in relevant child
rooms.on('child_changed', function(dataSnapshot) {
  var data = dataSnapshot.val(),
  childRoom = dataSnapshot.name(),
  newUrl = data.url;
  if ((childRoom === currentRoom) && !(currentUrl === newUrl)) {
    chrome.tabs.query({'active':true, 'lastFocusedWindow': true}, function(result) {
      var id = result[0].id;
      chrome.tabs.update(id, {url: newUrl});
    });
  }
});


// If room is set, submit change to relevant child in storage
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!(currentUrl === tab.url)) {
    currentUrl = tab.url;
    console.log('Update ',currentRoom)
    rooms.child(currentRoom).update({url: tab.url});
  }
});




