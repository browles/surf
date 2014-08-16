var storage = new Firebase('https://fiery-torch-5161.firebaseio.com/');

storage.on('value', function(dataSnapshot) {
  var data = dataSnapshot.val(),
      newUrl = data.url;
  chrome.tabs.query({'active':true, 'lastFocusedWindow': true}, function(result) {
    var id = result[0].id;
    chrome.tabs.update(id, {url: newUrl});
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  storage.set({url: changeInfo.url});
});