function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Tree View Sidebar')
    .setWidth(340);

  SpreadsheetApp.getUi().showSidebar(html);
}

function generateTreeView() {
  var clinicianEmails = getUniqueValues('B2:B'); // Column B
  var treeData = { label: 'Clinicians', children: [] };

  for (var i = 0; i < clinicianEmails.length; i++) {
    treeData.children.push({ label: clinicianEmails[i], children: [] });
  }

  return treeData; // Wrap the treeData in an array to make the root node unclickable
}

function generateClientTreeView(clinicianEmail) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

// Find the last row with data in column B
  var lastRow = sheet.getRange("B:B").getValues().flat().filter(String).length + 1;

  // Adjust the data range dynamically
  var dataRange = sheet.getRange('B2:D' + lastRow);

  // Get all values in the data range
  var data = dataRange.getValues();

  // Filter data based on the clinician's email
  var filteredData = data.filter(function(row) {
    return row[0] === clinicianEmail;
  });

  // Create a Map to store unique client names and their counts
  var clientsMap = new Map();

  // Iterate through filtered data to populate the Map
  filteredData.forEach(function(row) {
    var clientName = row[1];
    var status = row[2];

    // Initialize the Map entry if it doesn't exist
    if (!clientsMap.has(clientName)) {
      clientsMap.set(clientName, { checkedInCount: 0, cancelledCount: 0, noShowCount: 0 });
    }

    // Update the status count for the client
    var clientStatusCounts = clientsMap.get(clientName);
    switch (status) {
      case 'Checked-in':
        clientStatusCounts.checkedInCount++;
        break;
      case 'Cancelled':
        clientStatusCounts.cancelledCount++;
        break;
      case 'No Show':
        clientStatusCounts.noShowCount++;
        break;
    }
  });

  // Build the tree data based on the Map
  var treeData = { label: clinicianEmail.replace('@email.com', ''), children: [] };

  clientsMap.forEach(function(statusCounts, clientName) {
    treeData.children.push({
      label: clientName,
      children: [
        { label: 'Checked-in: ' + statusCounts.checkedInCount },
        { label: 'Cancelled: ' + statusCounts.cancelledCount },
        { label: 'No Show: ' + statusCounts.noShowCount }
      ]
    });
  });

  return treeData;
}

function getClients(clinicianEmail) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
   // Find the last row with data in column B
  var lastRow = sheet.getRange("B:B").getValues().flat().filter(String).length + 1;

  // Adjust the data range dynamically
  var data = sheet.getRange('B2:D' + lastRow).getValues();
  var clients = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == clinicianEmail) {
      clients.push(data[i][1]);
    }
  }

  return clients.filter(function (value, index, self) {
    return self.indexOf(value) === index; // Remove duplicates
  });
}
function getUniqueValues(range, filter) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getRange(range).getValues().flat().filter(String);
  
  if (filter) {
    data = data.filter(function(value) {
      return value == filter.clinicianEmail;
    });
  }

  return Array.from(new Set(data));
}
