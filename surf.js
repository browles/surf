var storage = new Firebase('https://fiery-torch-5161.firebaseio.com/');

storage.on('child_changed', function(dataSnapshot) {
  var data = dataSnapshot.val(),
      newUrl = data.url,
      room = data.room;
  if (room === window._room) {
    chrome.tabs.query({'active':true, 'lastFocusedWindow': true}, function(result) {
      var id = result[0].id;
      chrome.tabs.update(id, {url: newUrl});
    });
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  storage.push({room: window._room, url: changeInfo.url});
});