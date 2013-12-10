dbNamespace = {};

dbNamespace.db = window.openDatabase('Contact Database', '1.0', 'Contact Descriptions', 5*1024*1024);
 var db = dbNamespace.db;
createTable();
    //alert( "here " + db );};

var contacts = blackberry.pim.contacts;

function createTable() {
        //old bd location
    alert("Create Tables");
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

function displayAllContacts()
{
        alert("displayAllContacts");

	document.getElementById('newContact').style.display = 'none';
	document.getElementById('allContacts').style.display = 'inline';
    document.getElementById('allContacts').style.display = 'inline';
    getContacts();
}

function displayContactForm()
{
	document.getElementById('allContacts').style.display = 'none';
	document.getElementById('newContact').style.display = 'inline';
    document.getElementById('contactForm').style.display = 'inline';
}

function process( firstName ){
    createTable();
    createContact();
    //alert( firstName );
}

function createContact() {
    alert("createContact");
	if(document.getElementById('firstName').value == "")
	{
		//do not add the contact
	}
    var contacts = blackberry.pim.contacts,
    ContactField = contacts.ContactField,
    name = {},
    mobilePhone = { type: ContactField.MOBILE, value: document.getElementById('mobilePhone').value },
    homePhone = { type: ContactField.WORK, value: document.getElementById('workPhone').value },
    workEmail = { type: ContactField.WORK, value: document.getElementById('workEmail').value },
    homeEmail = { type: ContactField.HOME, value: document.getElementById('homeEmail').value },
    contact;
    alert("57");

    name.familyName = document.getElementById('lastName').value;
    alert("60")
    name.givenName = document.getElementById('firstName').value;
    alert("62")
    contact = contacts.create({
    "displayName": document.getElementById('firstName').value,
    "name": name,
    "phoneNumbers": [homePhone,mobilePhone],
    "emails": [workEmail, homeEmail]
    });
    alert("69")
    contact.save(onSaveSuccess, onSaveError);
    alert("end of createContact");
}

function onSaveSuccess(contact) {
 alert("Contact with id=" + contact.id + " is saved!");
 storeContactDescription(contact.id);
}

function onSaveError(error) {
alert("Error saving contact: " + error.code);
}

function storeContactDescription(contactID) {
    alert("storeContactDescription");
    createTable();
   
    db.transaction(function(tx) {
        var addedOn = new Date();
        tx.executeSql("INSERT INTO contacts(id, description, added_on) VALUES (?,?)",
            [contactID, document.getElementById('description'), addedOn],
            function(trans, result) {
                // handle the success
                alert("Contact added" + document.getElementById('description'));
            }, 
            function(trans, error) {
                 // handle the error
                 alert("Error adding " + document.getElementById('description') + ": " + error);
            });
     });
}


function getContacts() {
    alert("getContacts fired");
   
    
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM ContactDescriptions",
        [],
        
        function(trans, result) {
            alert("getContacts trans, result");
            var items = [], 
        item;
            alert("getContacts Item");
            alert(result.rows.length);
            for(var i=0; i < result.rows.length; i++) {
                var contact = contacts.getContact(result.rows.item(i).id);
                alert("contactId: " + contact );
                var name = contact.name.givenName + " " + contact.name.familyName;
                item = document.createElement('div');
                item.setAttribute('data-bb-type','item');
                item.setAttribute('data-bb-title', name);
                item.setAttribute('data-bb-img','http://placekitten.com/100/200');
                item.setAttribute('onclick', showDetails(contact, result.rows.item(i).description));
     
        items.push(item);
        alert("itemPushed")
            }

            document.getElementById('mylist').refresh(items);
           
        }, 
        function(trans, error) {
           // handle the error
           alert(" in error " + error);

        });
    });
}

blackberry.invoke.invoke({
    target: "com.example.image.view ",
    action: "bb.action.OPEN",
    type: "image/png",
    uri: "file:///path/to/image.png"
}, onSuccess, onError);

function onSuccess(response) {
 console.log("<p>Invocation query successful: " + response + "</p>");
}

function onError(error) {
 console.log("<p>Invocation query error: " + error + "</p>");
}