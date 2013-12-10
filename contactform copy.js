dbNamespace = {};

var contacts = blackberry.pim.contacts;

function displayAllContacts()
{
	document.getElementById('newfruit').style.display = 'none';
	document.getElementById('allfruit').style.display = 'inline';
}

function displayContactForm()
{
	document.getElementById('allfruit').style.display = 'none';
	document.getElementById('newfruit').style.display = 'inline';
    
}


function process( fruit_name ){
	
	addFruit( fruit_name );
	//alert( fruit_name );
}

function createTable() {
	dbNamespace.db = window.openDatabase('Contact Database', '1.0', 'Contact Descriptions', 5*1024*1024);
    var db = dbNamespace.db;

    //alert( "here " + db );

    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS ContactDescriptions(id INTEGER PRIMARY KEY, description VARCHAR[50] , added_on DATETIME)", 
        	[], 
        	function(trans, result) {
           		// handle  the success
            	alert("Table created!");
        	}, 
        	function(trans, error) {
            	// handle the error
            	alert("Table creation error: " + error);
        	});
    }); 
}

function createContact() {
    alert("createContact");
     /*var contacts = blackberry.pim.contacts,
     ContactField = contacts.ContactField,
     name = {},
     mobilePhone = { type: ContactField.MOBILE, value: document.getElementById('mobilePhone').value },
     homePhone = { type: ContactField.WORK, value: document.getElementById('workPhone').value },
     workEmail = { type: ContactField.WORK, value: document.getElementById('workEmail').value },
     homeEmail = { type: ContactField.HOME, value: document.getElementById('homeEmail').value },
     contact;

     name.familyName = document.getElementById('lastName').value;
     name.givenName = document.getElementById('firstName').value;
     contact = contacts.create({
     "displayName": document.getElementById('firstName').value,
     "name": name,
     "phoneNumbers": [homePhone,mobilePhone],
     "emails": [workEmail, homeEmail]
     });
     contact.save(onSaveSuccess, onSaveError);*/
}

function onSaveSuccess(contact) {
 alert("Contact with id=" + contact.id + " is saved!");
 storeContactDescription(contact.id)
}
function onSaveError(error) {
 alert("Error saving contact: " + error.code);
}

function storeContactDescription(contactID) {
    alert("storeContactDescription");
    createTable();
    var db = dbNamespace.db;
    db.transaction(function(tx) {
        var addedOn = new Date();
        tx.executeSql("INSERT INTO contacts(id, description, added_on) VALUES (?,?)",
            [contactID, document.getElementById('description'), addedOn],
            function(trans, result) {
                // handle the success
                alert("Contact added" + document.getElementById('description');
                getContacts();
            }, 
            function(trans, error) {
                 // handle the error
                 alert("Error adding " + document.getElementById('description') + ": " + error);
            });
     });
}


function getContacts() {
    alert("getContacts");
    var db = dbNamespace.db;
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM ContactDescriptions",
        [],
        function(trans, result) {
            var items = [],
      item;

            
            for(var i=0; i < result.rows.length; i++) {
                var contact = contacts.getContact(result.rows.item(i).id);
                var name = contact.name.givenName + " " + contact.name.familyName;
                item = document.createElement('div');
                item.setAttribute('data-bb-type','item');
                item.setAttribute('data-bb-title', name);
                item.setAttribute('data-bb-img','http://placekitten.com/100/200');
                item.setAttribute('onclick', showDetails(contact, result.rows.item(i).description));
     
     items.push(item);
   }

document.getElementById('mylist').refresh(items);
           
        }, 
        function(trans, error) {
           // handle the error

        });
    });
}