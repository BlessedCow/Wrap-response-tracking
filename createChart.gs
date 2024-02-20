  function calculateCountsAndCreateChart() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "JanWIP"; 

  // Check if the sheet exists
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    Logger.log(`Sheet '${sheetName}' not found.`);
    return;
  }

  const dataRange = sheet.getDataRange();
  const data = dataRange.getValues();

  // Create a map to hold clinician data
  let clinicianData = {};

  // Process the data
  data.forEach((row, index) => {
    if (index > 0) { // Skip header row
      const clinicianEmail = row[1];
      const clientName = row[2];
      const status = row[3];

      // Initialize clinician data structure
      if (!clinicianData[clinicianEmail]) {
        clinicianData[clinicianEmail] = {
          'No Show': 0,
          'Cancelled': 0,
          'Checked-in': 0,
          'Total': 0,
          'Clients': {}
        };
      }

      // Increment status count
      clinicianData[clinicianEmail][status]++;
      clinicianData[clinicianEmail]['Total']++;

      // Track client appointments per clinician
      if (!clinicianData[clinicianEmail]['Clients'][clientName]) {
        clinicianData[clinicianEmail]['Clients'][clientName] = {
          'No Show': 0,
          'Cancelled': 0,
          'Checked-in': 0,
          'Total': 0
        };
      }
      clinicianData[clinicianEmail]['Clients'][clientName][status]++;
      clinicianData[clinicianEmail]['Clients'][clientName]['Total']++;
    }
  });

  // Prepare data for chart
  let chartData = [['Clinician', 'No Show', 'Cancelled', 'Checked-in']];
  Object.keys(clinicianData).forEach(clinicianEmail => {
    const clinician = clinicianData[clinicianEmail];
    chartData.push([clinicianEmail, clinician['No Show'], clinician['Cancelled'], clinician['Checked-in']]);
  });

  // Add the chart data to a new sheet
  const chartSheetName = 'Clinician Appointment Stats';
  let chartSheet = ss.getSheetByName(chartSheetName);
  if (!chartSheet) {
    chartSheet = ss.insertSheet(chartSheetName);
  } else {
    chartSheet.clear(); // Clear the existing data
  }
  chartSheet.getRange(1, 1, chartData.length, 4).setValues(chartData);

  // Create and insert the chart
  const chart = chartSheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(chartSheet.getRange(1, 1, chartData.length, 4))
    .setPosition(5, 1, 0, 0)
    .build();
  chartSheet.insertChart(chart);
}
