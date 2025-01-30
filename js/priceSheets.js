const spreadsheetId = '13X_U88FR7VDrrfCHOBqpmo2rlEAlm9MnwiubfWhAZts';
const apiKey = 'AIzaSyCcmUSfySaStZaD6Gq2QPV0gSOia-S0Srw';
const range = 'Sheet1!A1:D10'; // Specify the range of data you want to fetch

const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => updateTable(data.values))
    .catch(error => console.error('Error fetching data:', error));

function updateTable(sheetData) {
    const tableBody = document.querySelector('#myTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    sheetData.forEach(row => {
        const tableRow = document.createElement('tr');
        row.forEach(cell => {
            const tableCell = document.createElement('td');
            tableCell.textContent = cell;
            tableRow.appendChild(tableCell);
        });
        tableBody.appendChild(tableRow);
    });
}