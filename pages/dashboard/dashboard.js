/* Daftar File Data JSON */
document.addEventListener("DOMContentLoaded", function () {
    fetch('/data/profit_berdasarkan_agegroup.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        /*Memuat data dan membuat grafik*/
        createChart(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

fetch('/data/ranked_product_by_profit.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        /* Memuat data dan membuat grafik*/
        drawRankedProductByProfitChart(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



fetch('/data/rataan_profit.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        /* Memuat data dan membuat grafik*/
        drawAverageProfitByCategoryChart(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


fetch('/data/top3_produk_pertahun.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        /* Memuat data dan membuat grafik*/
        drawTotalProfitPerYearChart(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



fetch('/data/top3product_agegroup.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        /* Memuat data dan membuat grafik*/
        drawTotalProfitPerAgeChart(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


fetch('/data/trend_penjualan_pertahun.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        /* Memuat data dan membuat grafik*/
        drawTrendPenjualan(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


function createChart(data) {
    const labels = data.map(item => item.Age_Group);
    const profits = data.map(item => item.total_profit);

    const ctx = document.getElementById('chartProfitByAge').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Profit',
                data: profits,
                backgroundColor: [
                    '#86C6F4', // Biru Pastel
                    '#77DD77', // Hijau Pastel
                    '#FFB347', // Kuning Pastel
                    '#CFCFC4'  // Abu-abu
                ],
                borderColor: [
                    '#86C6F4', // Biru Pastel
                    '#77DD77', // Hijau Pastel
                    '#FFB347', // Kuning Pastel
                    '#CFCFC4'  // Abu-abu
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function drawTrendPenjualan(data) {
    const tahunLabels = data.map(item => item.tahun);
    const totalProfitData = data.map(item => parseInt(item.total_profit));
    const totalOrderData = data.map(item => parseInt(item.total_order));

    /* Membuat grafik */
    const ctx = document.getElementById('trendPenjualan').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tahunLabels,
            datasets: [{
                label: 'Total Profit',
                data: totalProfitData,
                borderColor:   '#86C6F4', // Biru
                borderWidth: 3,
                fill: false,
                tension: 0.4,
            },
            {
                label: 'Total Order',
                data: totalOrderData,
                borderColor: '#77DD77', // Hijau',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function drawRankedProductByProfitChart(data) {
    // Mengurutkan data berdasarkan total profit dalam urutan menurun
    data.sort((a, b) => b.total_profit - a.total_profit);

    // Mengambil 10 data teratas
    var top10Data = data.slice(0, 10);

    // Mendapatkan nama produk dan profit dari 10 data teratas
    var products = top10Data.map(function (item) {
        return item.Product;
    });
    var profits = top10Data.map(function (item) {
        return parseInt(item.total_profit);
    });

    // Mendapatkan canvas element
    var canvas = document.getElementById('chartRankedProductByProfit');
    var ctx = canvas.getContext('2d');

    // Membuat chart
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products,
            datasets: [{
                label: 'Total Profit',
                data: profits,
                backgroundColor: '#CFCFC4',  // Abu-abu
                borderColor: '#CFCFC4',  // Abu-abu
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function drawAverageProfitByCategoryChart(data) {
    /* Mendapatkan canvas element */
    var canvas = document.getElementById('chartRerata');
    var ctx = canvas.getContext('2d');
    
    /* Mendefinisikan data yang akan digunakan dalam chart */
    var categories = data.map(function (item) {
        return item.Product_Category;
    });
    var averages = data.map(function (item) {
        return parseFloat(item.rataan_profit);
    });

    /*Membuat chart*/
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Average Profit',
                data: averages,
                backgroundColor: [
                    '#86C6F4', // Biru Pastel
                    '#77DD77', // Hijau Pastel
                    '#FFB347', // Kuning Pastel
                ],
                borderColor: [
                    '#86C6F4',
                    '#77DD77',
                    '#FFB347',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Average Profit by Category'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}


function drawTotalProfitPerYearChart(data) {
    /* Mendapatkan canvas element */
    var canvas = document.getElementById('chartTotalProfitPerYear');
    var ctx = canvas.getContext('2d');

    /*Mengelompokkan data berdasarkan tahun*/
    var years = [...new Set(data.map(item => item.tahun))];
    var datasets = {};

    /* Array warna yang akan digunakan */
    var colors = [
        '#86C6F4', // Biru Pastel
        '#77DD77', // Hijau Pastel
        '#FFB347', // Kuning Pastel
    ];

    /* Mengelompokkan data profit per tahun berdasarkan kategori produk */
    data.forEach((item, index) => {
        if (!datasets[item.Product_Category]) {
            const colorIndex = Object.keys(datasets).length % colors.length; /* Mendapatkan indeks warna*/
            datasets[item.Product_Category] = {
                label: item.Product_Category,
                data: [],
                backgroundColor: colors[colorIndex],
                borderColor: colors[colorIndex],
                borderWidth: 1
            };
        }
        datasets[item.Product_Category].data.push(parseFloat(item.total_profit));
    });

    /* Membuat chart */
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: Object.values(datasets)
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total Profit Per Year by Product Category'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}




function drawTotalProfitPerAgeChart(data) {
    /* Mendapatkan canvas element */
    var canvas = document.getElementById('chartTotalProfitPerAge');
    var ctx = canvas.getContext('2d');

    /*/ Mengelompokkan data berdasarkan kelompok usia (Age Group) */
    var ageGroups = [...new Set(data.map(item => item.Age_Group))];
    var datasets = {};

    /* Mengelompokkan data profit per kelompok usia berdasarkan kategori produk*/
    var colors = [
        '#86C6F4', // Biru Pastel
        '#77DD77', // Hijau Pastel
        '#FFB347', // Kuning Pastel
        ]; /* Warna-warna yang akan digunakan */
    data.forEach((item, index) => {
        if (!datasets[item.Product_Category]) {
            const colorIndex = Object.keys(datasets).length % colors.length; /* Mendapatkan indeks warna */
            datasets[item.Product_Category] = {
                label: item.Product_Category,
                data: [],
                backgroundColor: colors[colorIndex],
                borderColor: colors[colorIndex],
                borderWidth: 1
            };
        }
        datasets[item.Product_Category].data.push(parseFloat(item.total_profit));
    });

    /*Membuat chart*/
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ageGroups,
            datasets: Object.values(datasets)
        },
        options: {
            responsive: true,
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total Profit Per Age Group by Product Category'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}