let products = [];
let editingIndex = -1;
let dataTable;

document.addEventListener("DOMContentLoaded", function () {
    fetch('/data/data_otak_atik.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            products = data;
            initializeRankedProductTable(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const category = document.getElementById('productCategory').value;
        const name = document.getElementById('productName').value;
        const profit = document.getElementById('productProfit').value;
        const order = document.getElementById('productOrder').value;
        const profitRank = document.getElementById('profitRank').value;
        const qtyRank = document.getElementById('qtyRank').value;

        const product = { Product_Category: category, Product: name, total_profit: profit, total_order: order, Profit_Rank: profitRank, Qty_Rank: qtyRank };

        if (editingIndex === -1) {
            /* Add new product */
            products.push(product);
            dataTable.row.add(product).draw();
        } else {
            /* Edit existing product */
            products[editingIndex] = product;
            dataTable.row(editingIndex).data(product).draw();
            editingIndex = -1;
        }

        document.getElementById('productForm').reset();
    });
});

function initializeRankedProductTable(data) {
    dataTable = $('#rankedProductTable').DataTable({
        data: data,
        columns: [
            { data: 'Product_Category' },
            { data: 'Product' },
            { data: 'total_profit' },
            { data: 'total_order' },
            { data: 'Profit_Rank' },
            { data: 'Qty_Rank' },
            { 
                data: null,
                render: function (data, type, row, meta) {
                    return `<button onclick="editProduct(${meta.row})">Edit</button>
                            <button onclick="deleteProduct(${meta.row})">Delete</button>`;
                }
            }
        ]
    });
}

function editProduct(index) {
    const product = products[index];

    document.getElementById('productCategory').value = product.Product_Category;
    document.getElementById('productName').value = product.Product;
    document.getElementById('productProfit').value = product.total_profit;
    document.getElementById('productOrder').value = product.total_order;
    document.getElementById('profitRank').value = product.Profit_Rank;
    document.getElementById('qtyRank').value = product.Qty_Rank;

    editingIndex = index;
}

function deleteProduct(index) {
    products.splice(index, 1);
    dataTable.row(index).remove().draw();
}

function goHome() {
    window.location.href = '/index.html';
}