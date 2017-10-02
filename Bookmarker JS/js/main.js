// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(argument) {

	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!validateForm(siteName, siteURL)) {
		return false;
	}
 	var bookmark = {
 		name: siteName,
 		url: siteURL
 	}

 	/*
 	// Local Storage Test
	localStorage.setItem('test', 'Hello World');
 	console.log(localStorage.getItem('test'));
 	localStorage.removeItem('test');
 	console.log(localStorage.getItem('test'));
	*/

	// Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null) {
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array
		bookmarks.push(bookmark);
		// Re-set back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	//Clear form
	document.getElementById('myForm').reset();
	// Re-fetch bookmarks
	fetchBookmarks();
	// prevent form from submitting
	argument.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == url) {
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}
	// Re-set back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// Re-fetch bookmarks
	fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(argument) {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Get output id
	var bookmarskResults = document.getElementById('bookmarksResults');
	// Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="card card-body bg-light">'+
									'<h3>'+name+
									'  <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> '+
									'  <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
									'</h3>'+
									'</div>';
	}
}

// Validate form
function validateForm(siteName, siteURL) {
	// Check for emplty fields
	if(!siteName || !siteURL) {
		alert('Please fill in the form.');
		return false;
	}
	// Check if valid URL
	var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  	if(!regex .test(siteURL)) {
    	alert("Please enter valid URL.");
    	return false;
  	}
	return true;
}