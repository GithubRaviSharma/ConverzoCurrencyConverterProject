// Include API for currency change
const apiKey = "62a35f414ac341068cc05bb75c92f520";
const api = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

// Selecting different controls
const search = document.querySelector(".searchBox");
const convert = document.querySelector(".convert");
const fromCurrency = document.querySelector(".from");
const toCurrency = document.querySelector(".to");
const finalValue = document.querySelector(".finalValue");
const finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;

// Event when currency is changed
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

// Event when currency is changed
toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
});

search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}

// When user clicks, call function getResults
convert.addEventListener("click", getResults);

// Function to get results after conversion
// Function to get results after conversion
// Function to get results after conversion
// Function to get results after conversion
function getResults() {
    // Show loading symbol
    document.getElementById('loadingSpinner').style.display = 'inline-block';
    // Clear previous results
    finalValue.innerHTML = '';
    
    fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(currency => {
            // Simulate delay before displaying results
            setTimeout(() => {
                displayResults(currency);
                // Hide loading symbol
                document.getElementById('loadingSpinner').style.display = 'none';
            }, 2000); // 2000 milliseconds delay (2 seconds)
        })
        .catch(error => {
            // Display error message if there's an error
            finalValue.innerHTML = 'Error fetching data';
            console.error('Error fetching data:', error);
            // Hide loading symbol
            document.getElementById('loadingSpinner').style.display = 'none';
        });
}


// Function to display results after conversion
function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    let timestamp = currency.timestamp;

    finalValue.innerHTML = `${searchValue} ${resultFrom} equals ${(toRate / fromRate) * searchValue} ${resultTo}`;
    finalAmount.style.display = "block";

    console.log("Exchange rates last updated at: " + new Date(timestamp * 1000));
}

// Function to fetch historical exchange rates for a specific date
function fetchHistoricalData(date) {
    const historicalApi = `https://openexchangerates.org/api/historical/${date}.json?app_id=${apiKey}`;

    fetch(historicalApi)
        .then(response => response.json())
        .then(data => {
            // Process historical data and display trends
            // Example: Calculate trends, display line charts, etc.
        })
        .catch(error => console.error('Error fetching historical data:', error));
}

// Call fetchHistoricalData function when the page loads
window.onload = function() {
    // Fetch historical data for January 1, 2022
    fetchHistoricalData('2022-01-01');
};

// Function to clear values
function clearVal() {
    window.location.reload();
    document.querySelector(".finalValue").innerHTML = "";
}
