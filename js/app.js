var db = new PouchDB('Frameworks-List');
var remoteCouch = false;

function saveList() {
	alert(JSON.stringify(List));
	db.bulkDocs(List, function callback(err, result) {
		if (!err) {
			console.log('Successfully posted a todo!');
		}
	});
}

function allList() {
	db.allDocs({include_docs: true})
	.then(function (response) {
		console.log(response);
	}).catch(function (err) {
		console.log(err);
	});
}
