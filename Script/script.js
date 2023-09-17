const Stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];

async function getStockPriceandValue() {
    const response = await fetch('https://stocks3.onrender.com/api/stocks/getstockstatsdata');
    const data = await response.json();
    return data.stocksStatsData[0];
}

async function getStockGraph() {
    const response = await fetch('https://stocks3.onrender.com/api/stocks/getstocksdata');
    const data = await response.json();
    return data.stocksData[0];
}

async function getStockSummary() {
    const response = await fetch('https://stocks3.onrender.com/api/stocks/getstocksprofiledata');
    const data = await response.json();
    return data.stocksProfileData[0];
}

const stockList = document.getElementById('stockList');
const oneMonth = document.getElementById('oneMonth');
const threeMonth = document.getElementById('threeMonth');
const oneYear = document.getElementById('oneYear');
const fiveYear = document.getElementById('fiveYear');
const chartStockHeading = document.getElementById('chartStockHeading');
const chartSummary = document.getElementById('chartSummary');

async function getStockListRender() {

    const stockPriceValueData = await getStockPriceandValue();
    const stockGraph = await getStockGraph();
    const stockSummary = await getStockSummary();
    const eachStockGraph = stockGraph['AAPL'];
    const timestamps = eachStockGraph['5y'].timeStamp;
    const values = eachStockGraph['5y'].value;
    toMakegraphOf(timestamps, values, '5 year graph');

    oneMonth.addEventListener('click', () => {
        const timestamps = eachStockGraph['1mo'].timeStamp;
        const values = eachStockGraph['1mo'].value;
        toMakegraphOf(timestamps, values, '1month Graph');
    });

    threeMonth.addEventListener('click', () => {
        const timestamps = eachStockGraph['3mo'].timeStamp;
        const values = eachStockGraph['3mo'].value;
        toMakegraphOf(timestamps, values, '3month Graph');
    });

    oneYear.addEventListener('click', () => {
        const timestamps = eachStockGraph['1y'].timeStamp;
        const values = eachStockGraph['1y'].value;
        toMakegraphOf(timestamps, values, '1 year graph');
    });

    fiveYear.addEventListener('click', () => {
        const timestamps = eachStockGraph['5y'].timeStamp;
        const values = eachStockGraph['5y'].value;
        toMakegraphOf(timestamps, values, '5 year graph');
    });


    const listDiv = document.createElement('div');
    listDiv.className = 'listHeading';

    const stockNameSpan = document.createElement('span');
    stockNameSpan.className = 'stockNameHeading';
    stockNameSpan.textContent = 'AAPL';

    const stockValueSpan = document.createElement("span");
    stockValueSpan.className = 'stockValueHeading';
    stockValueSpan.textContent = stockPriceValueData['AAPL'].bookValue.toFixed(3);

    const stockPerSpan = document.createElement('span');
    stockPerSpan.className = 'stockPerHeading';
    stockPerSpan.textContent = stockPriceValueData['AAPL'].profit.toFixed(2) + "%";

   
    listDiv.appendChild(stockNameSpan);
    listDiv.appendChild(stockValueSpan);
    listDiv.appendChild(stockPerSpan);

    chartStockHeading.appendChild(listDiv);
    chartSummary.innerHTML = `<p style="font-size: 1.2rem;" >${stockSummary['AAPL'].summary}</p>`

    Stocks.forEach((stock) => {
        const stockData = stockPriceValueData[stock];

        const listDiv = document.createElement('div');
        listDiv.className = 'list';

        const stockNameSpan = document.createElement('span');
        stockNameSpan.className = 'stockName';
        stockNameSpan.textContent = stock;

        const stockValueSpan = document.createElement("span");
        stockValueSpan.className = 'stockValue';
        stockValueSpan.textContent = stockData.bookValue.toFixed(3);

        const stockPerSpan = document.createElement('span');
        stockPerSpan.className = 'stockPer';
        stockPerSpan.textContent = stockData.profit.toFixed(2) + "%";
        stockPerSpan.style.color = "green"
        stockData.profit > 0 ? stockPerSpan.style.color = "green" : stockPerSpan.style.color = 'red';

        listDiv.appendChild(stockNameSpan);
        listDiv.appendChild(stockValueSpan);
        listDiv.appendChild(stockPerSpan);

        stockList.appendChild(listDiv);

       
        stockNameSpan.addEventListener('click', () => {
            redndernewStock(stock);
        });
    });
}

async function redndernewStock(currStock) {

    const stockPriceValue = await getStockPriceandValue();
    const currStockPriceVal = stockPriceValue[currStock];
    const stockGraph = await getStockGraph();


    const stockSummary = await getStockSummary();
    const currStockSummary = stockSummary[currStock];
    const eachStockGraph1 = stockGraph[currStock];

    const timestamps = eachStockGraph1['5y'].timeStamp;
    const values = eachStockGraph1['5y'].value;
    toMakegraphOf(timestamps, values, '5 year graph');

    oneMonth.addEventListener('click', () => {
        const timestamps = eachStockGraph1['1mo'].timeStamp;
        const values = eachStockGraph1['1mo'].value;
        toMakegraphOf(timestamps, values, '1month Graph');
    });

    threeMonth.addEventListener('click', () => {
        const timestamps = eachStockGraph1['3mo'].timeStamp;
        const values = eachStockGraph1['3mo'].value;
        toMakegraphOf(timestamps, values, '3month Graph');
    });

    oneYear.addEventListener('click', () => {
        const timestamps = eachStockGraph1['1y'].timeStamp;
        const values = eachStockGraph1['1y'].value;
        toMakegraphOf(timestamps, values, '1 year graph');
    });

    fiveYear.addEventListener('click', () => {
        const timestamps = eachStockGraph1['5y'].timeStamp;
        const values = eachStockGraph1['5y'].value;
        toMakegraphOf(timestamps, values, '5 year graph');
    });

    chartStockHeading.textContent = '';
    const listDiv = document.createElement('div');
    listDiv.className = 'listHeading';


    const stockNameSpan = document.createElement('span');
    stockNameSpan.className = 'stockNameHeading';
    stockNameSpan.textContent = currStock;

    const stockValueSpan = document.createElement("span");
    stockValueSpan.className = 'stockValueHeading';
    stockValueSpan.textContent = currStockPriceVal.bookValue.toFixed(3);


    const stockPerSpan = document.createElement('span');
    stockPerSpan.className = 'stockPerHeading';
    stockPerSpan.textContent = currStockPriceVal.profit.toFixed(2) + "%";
    stockPerSpan.style.color = "green"
    currStockPriceVal.profit > 0 ? stockPerSpan.style.color = "green" : stockPerSpan.style.color = 'red';
    listDiv.appendChild(stockNameSpan);
    listDiv.appendChild(stockValueSpan);
    listDiv.appendChild(stockPerSpan);

    chartStockHeading.appendChild(listDiv);
    chartSummary.textContent = '';
    chartSummary.innerHTML = `<p style="font-size: 1.2rem;" >${currStockSummary.summary}</p>`
}




function toMakegraphOf(timestamps, values, timeValue) {
    var layout = {
        title: timeValue,
        xaxis: {
            title: null,
            tickvals: null,
            visible: false
        },
        yaxis: {
            title: null,
            tickvals: null,
            visible: false
        },
        plot_bgcolor: 'blue',
        paper_bgcolor: 'blue',
        line: {
            color: '#46ff00'
        }
    };

    var data = [{
        x: timestamps,
        y: values,
        type: "line",
        line: {
            color: '#46ff00' // Set the line color to red
        },
        hovertemplate: '%{y}' + "<br>Date: %{text}", // Display both value and date in hover
        text: timestamps.map((timestamp) => {
            // Calculate the date based on the selected time frame
            var date = new Date(timestamp * 1000); // Convert to milliseconds
            if (timeValue === '5 year graph') {
                // For 5-year time frame, show the date from the current data to before 5 years
                date.setFullYear(date.getFullYear() - 5);
            } else if (timeValue === '1 year graph') {
                // For 1-year time frame, show the date from the current data to before 1 year
                date.setFullYear(date.getFullYear() - 1);
            } else if (timeValue === '3 month graph') {
                // For 3-month time frame, show the date from the current data to before 3 months
                date.setMonth(date.getMonth() - 3);
            } else if (timeValue === '1 month graph') {
                // For 1-month time frame, show the date from the current data to before 1 month
                date.setMonth(date.getMonth() - 1);
            }
            // Format the date as desired (e.g., 'yyyy-mm-dd')
            var formattedDate = date.toISOString().slice(0, 10);
            return formattedDate;
        }),
        on: {
            click: function (event) {
                var date = timestamps[event.points[0].pointNumber];
                alert(date);
            }
        }
    }];

    Plotly.newPlot("charSection", data, layout);
}


getStockListRender();



