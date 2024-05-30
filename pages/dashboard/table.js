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
        initializeAgeGroupTable(data);
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
        initializeRankedProductTable(data);
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
        initializeRataProfitTable(data);
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
        initializeTotalProfitPerYearTable(data);
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
        initializeTotalProfitPerAgeTable(data);
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
        initializeTrendPenjualanTable(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


function initializeAgeGroupTable(data) {
    $('#ageGroupTable').DataTable({
        data: data,
        columns: [
            { data: 'Age_Group' },
            { data: 'total_profit' },
            { data: 'total_orders' }
        ]
    });
}

function initializeRankedProductTable(data) {
    $('#rankedProductTable').DataTable({
        data: data,
        columns: [
            { data: 'Product_Category' },
            { data: 'Product' },
            { data: 'total_profit' },
            { data: 'total_order' },
            { data: 'Profit_Rank' },
            { data: 'Qty_Rank' }
        ]
    });
}

function initializeRataProfitTable(data) {
    $('#rataProfitTable').DataTable({
        data: data,
        columns: [
            { data: 'Product_Category' },
            { data: 'rataan_profit' }
        ]
    });
}

function initializeTotalProfitPerYearTable(data) {
    $('#totalProfitPerYearTable').DataTable({
        data: data,
        columns: [
            { data: 'tahun' },
            { data: 'Product_Category' },
            { data: 'Product' },
            { data: 'total_order' },
            { data: 'total_profit' }
        ]
    });
}


function initializeTotalProfitPerAgeTable(data) {
    $('#totalProfitPerAgeTable').DataTable({
        data: data,
        columns: [
            { data: 'Age_Group' },
            { data: 'Product_Category' },
            { data: 'Product' },
            { data: 'total_profit' },
            { data: 'total_order' }
        ]
    });
}


function initializeTrendPenjualanTable(data) {
    $('#trendPenjualanTable').DataTable({
        data: data,
        columns: [
            { data: 'tahun' },
            { data: 'Total_Product_Category' },
            { data: 'total_profit' },
            { data: 'total_order' },
        ]
    });
}

function goBack() {
    window.location.href = '/pages/dashboard/dashboard.html';
}