/*var pathToDataFolder = '/json/'; */

/* Daftar File */
const profitAge = '/data/profit_berdasarkan_agegroup.json';
const rankedProduct = '/data/ranked_product_by_profit.json';
const rataProfit = '/data/rataan_profit.json';
const topProduct = '/data/top3_produk_pertahun.json';
const topAge = '/data/top3product_agegroup.json';
const trenPen = '/data/trend_penjualan_pertahun.json';


/* Fungsi untuk memuat dan mem-parse file JSON lokal */
function loadLocalJSON(filePath, call) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', filePath, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            const jsonData = JSON.parse(xhr.responseText);
            call(jsonData);
        }
    };
    xhr.send(null);
}

loadLocalJSON(topAge, function (ageTopData) {
    /* Memanggil data berdasarkan top product age group */
    const ageTopList = document.getElementById('ageTop');
    console.log(ageTopData)

});

loadLocalJSON(topProduct, function (productTopData) {
    /* Memanggil data berdasarkan top product pertahun */
    const productTopList = document.getElementById('productTop');
    console.log(productTopData)

});

loadLocalJSON(profitAge, function (ageData) {
    /* Memanggil data berdasarkan profit age group */
    const ageList = document.getElementById('ageProfit');
    console.log(ageData)

    const ageGroup = ageData.map(age => age.Age_Group);
    const ageProfit = ageData.map(age => age.total_profit);
    const ageOrder = ageData.map(age => age.total_order);
    const ageChart = document.getElementById('ageChart');
    new Chart(ageChart, {
        type: 'doughnut',
        data: {
            labels: ageGroup,
            datasets: [{
                label: ageOrder,
                data: ageProfit,
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(153, 102, 255)'],
                borderWidth: 3
            }]
        },

    });
});

loadLocalJSON(trenPen, function (penTrenData) {
    /* Memanggil data berdasarkan tren penjualan */
    const trenPenList = document.getElementById('trenPenj');
    console.log(penTrenData)

});

loadLocalJSON(rankedProduct, function (rankData) {
    /* Memanggil data berdasarkan ranked product */
    const rankProductList = document.getElementById('rankPro');
    console.log(rankData)

});

loadLocalJSON(rataProfit, function (rataData) {
    /* Memanggil data berdasarkan rataan profit */
    const rataList = document.getElementById('rataaProfit');
    console.log(rataData)

    /* Visualisasi data rataan profit menggunakan Chart.js */
    const productCategory = rataData.map(product => product.Product_Category);
    const productProfit = rataData.map(product => product.rataan_profit);
    const rataChart = document.getElementById('rataChart');
    new Chart(rataChart, {
        type: 'bar',
        data: {
            labels: productCategory,
            datasets: [{
                label: 'Rataan Profit',
                data: productProfit,
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
                borderWidth: 5
            }]
        },

    });

});