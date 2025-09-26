let source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");
let y1 = [];
let y2 = [];
let lineChart;

function createLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'sin',
                data: y1,
                borderColor: 'rgba(230,37,37)',
                hidden: false,
            },
            {
                label: 'cos',
                data: y2,
                borderColor: 'rgba(251,208,9)',
                hidden: false,
            }]
        },
        options: {
            plugins: {
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                    }
                }
            }
        }
    });
}

createLineChart();

function addData(chart, newData, multiplier) {
    chart.data.labels.push(newData.x);
    chart.data.datasets[0].data.push(newData.y1 * multiplier);
    chart.data.datasets[1].data.push(newData.y2 * multiplier);
    chart.update();
}


source.onmessage = function(event) {
    addData(lineChart, JSON.parse(event.data), +(document.getElementById('slider').label.innerHTML));
};


// Toggle buttons functionality
const toggleSin = document.getElementById('toggle-sin');
const toggleCos = document.getElementById('toggle-cos');

toggleSin.addEventListener('change', () => {
    let dataset = lineChart.data.datasets[0];
    dataset.hidden = !toggleSin.checked;
    lineChart.update();
});

toggleCos.addEventListener('change', () => {
    let dataset = lineChart.data.datasets[1];
    dataset.hidden = !toggleCos.checked;
    lineChart.update();
});


// Stop button functionality
const stopButton = document.getElementById('stop');

stopButton.addEventListener('click', () => {
    document.getElementById('stop').setAttribute('disabled','');
    lineChart.resetZoom();
    source.onmessage = function (event) {}
});


// Reset zoom button functionality
const zoomResetButton = document.getElementById('zoom-reset');

zoomResetButton.addEventListener('click', () => {
    lineChart.resetZoom();
});
