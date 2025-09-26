// Function to fetch XML data
function fetchXMLData(url) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');
            return xml;
        });
}


const gradeLabels = ['A', 'B', 'C', 'D', 'E', 'Fn', 'Fx'];
const gradeColours = ['rgba(25,155,214, 1)', 'rgba(251,208,9, 1)', 'rgba(230,37,37, 1)',
    'rgba(66,175,71, 1)', 'rgba(219,170,101, 1)', 'rgba(164,147,113, 1)', 'rgba(65,59,54, 1)'];

const yearLabels = [];
const aValues = [];
const bValues = [];
const cValues = [];
const dValues = [];
const eValues = [];
const fxValues = [];
const fnValues = [];

// let barChart;
let charts = [];

// Function to update options based on screen width
function flipChart() {

    if (window.innerWidth < 768) {
        if (!charts[0]) {
            createBarChart('y', 1);
        } else if (charts[0].options.indexAxis === 'x') {
            charts[0].destroy();
            createBarChart('y', 1);
        }
    }
    else {
        if (!charts[0]) {
            createBarChart('x', 2.5);
        } else if (charts[0].options.indexAxis === 'y') {
            charts[0].destroy();
            createBarChart('x', 2.5);
        }
    }
}

// Listen for window resize events to update chart options
window.addEventListener('resize', flipChart);

function createPieCharts() {
    const pie1617 = document.getElementById('pieChart1617').getContext('2d');
    const pie1718 = document.getElementById('pieChart1718').getContext('2d');
    const pie1819 = document.getElementById('pieChart1819').getContext('2d');
    const pie1920 = document.getElementById('pieChart1920').getContext('2d');
    const pie2021 = document.getElementById('pieChart2021').getContext('2d');
    const pie2122 = document.getElementById('pieChart2122').getContext('2d');

    charts[2] = new Chart(pie1617, getDataForPie(0));
    charts[3] = new Chart(pie1718, getDataForPie(1));
    charts[4] = new Chart(pie1819, getDataForPie(2));
    charts[5] = new Chart(pie1920, getDataForPie(3));
    charts[6] = new Chart(pie2021, getDataForPie(4));
    charts[7] = new Chart(pie2122, getDataForPie(5));
}

function createBarChart(axis, ratio) {

    const ctx = document.getElementById('barChartResults').getContext('2d');
    charts[0] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearLabels,
            datasets: [
                {
                    label: 'A',
                    data: aValues,
                    backgroundColor: 'rgba(25, 155, 214, 0.8)',
                    borderColor: 'rgba(25, 155, 214, 1)',
                    borderWidth: 1
                },
                {
                    label: 'B',
                    data: bValues,
                    backgroundColor: 'rgba(251,208,9, 0.8)',
                    borderColor: 'rgba(251,208,9, 1)',
                    borderWidth: 1
                },
                {
                    label: 'C',
                    data: cValues,
                    backgroundColor: 'rgba(230,37,37, 0.8)',
                    borderColor: 'rgba(230,37,37, 1)',
                    borderWidth: 1
                },
                {
                    label: 'D',
                    data: dValues,
                    backgroundColor: 'rgba(66,175,71, 0.8)',
                    borderColor: 'rgba(66,175,71, 1)',
                    borderWidth: 1
                },
                {
                    label: 'E',
                    data: eValues,
                    backgroundColor: 'rgba(219,170,101, 0.8)',
                    borderColor: 'rgba(219,170,101, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Fn',
                    data: fnValues,
                    backgroundColor: 'rgba(164,147,113, 0.8)',
                    borderColor: 'rgb(164,147,113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Fx',
                    data: fxValues,
                    backgroundColor: 'rgba(65,59,54, 0.8)',
                    borderColor: 'rgb(65,59,54, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            aspectRatio: ratio,
            indexAxis: axis,
            plugins: {
                title: {
                    display: true,
                    text: 'Hodnotenie študentov v zimných semestroch'
                }
            }
        }
    });
}

function createStackedBarChart () {
    const ctx = document.getElementById('stackedBarChart').getContext('2d');
    charts[1] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearLabels,
            datasets: [
                {
                    label: 'Fn',
                    data: fnValues,
                    backgroundColor: 'rgba(164,147,113, 0.8)',
                    borderColor: 'rgb(164,147,113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Fx',
                    data: fxValues,
                    backgroundColor: 'rgba(65,59,54, 0.8)',
                    borderColor: 'rgb(65,59,54, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            // aspectRatio: 3,
            plugins: {
                title: {
                    display: true,
                    text: 'Neúspešní študenti'
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    } );
}

// Function to create Chart.js charts with XML data
function createChart(xmlData) {

    const items = xmlData.querySelectorAll('zaznam');
    items.forEach(item => {
        const yearLabel = item.querySelector('rok').textContent;
        const aValue = parseFloat(item.querySelector('A').textContent);
        const bValue = parseFloat(item.querySelector('B').textContent);
        const cValue = parseFloat(item.querySelector('C').textContent);
        const dValue = parseFloat(item.querySelector('D').textContent);
        const eValue = parseFloat(item.querySelector('E').textContent);
        const fnValue = parseFloat(item.querySelector('FN').textContent);
        const fxValue = parseFloat(item.querySelector('FX').textContent);
        yearLabels.push(yearLabel);
        aValues.push(aValue);
        bValues.push(bValue);
        cValues.push(cValue);
        dValues.push(dValue);
        eValues.push(eValue);
        fxValues.push(fnValue);
        fnValues.push(fxValue);
        // wanted to make it nicer, but gave up to save time
    });

    flipChart();
    createStackedBarChart();
    createPieCharts();
}

function getDataForPie(index) {

    const chartData = {
        labels: gradeLabels,
        datasets: [{
            data: [ aValues[index], bValues[index], cValues[index], dValues[index], eValues[index], fnValues[index], fxValues[index] ],
            backgroundColor: gradeColours,
        }]
    };

    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Hodnotenie študentov v ' + yearLabels[index]
            }
        }
    };

    return {
        type: 'pie',
        data: chartData,
        options: chartOptions
    };

}

// Fetch XML data and create the chart
const xmlDataURL = 'z03.xml';
fetchXMLData(xmlDataURL)
    .then(xmlData => createChart(xmlData))
    .catch(error => console.error('Error fetching XML data:', error));

