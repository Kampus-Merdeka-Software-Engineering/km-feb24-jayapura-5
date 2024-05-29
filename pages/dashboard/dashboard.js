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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data)
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
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Total Order',
                data: totalOrderData,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: false
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
    /*Mendapatkan canvas element*/
    var canvas = document.getElementById('chartRankedProductByProfit');
    var ctx = canvas.getContext('2d');

    /* Mendefinisikan data yang akan digunakan dalam chart */
    var products = data.map(function (item) {
        return item.Product;
    });
    var profits = data.map(function (item) {
        return parseInt(item.total_profit);
    });

    /* Membuat chart */
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products,
            datasets: [{
                label: 'Total Profit',
                data: profits,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
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
    var colors = ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'];

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
    var colors = ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)']; // Warna-warna yang akan digunakan
    data.forEach((item, index) => {
        if (!datasets[item.Product_Category]) {
            const colorIndex = Object.keys(datasets).length % colors.length; // Mendapatkan indeks warna
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