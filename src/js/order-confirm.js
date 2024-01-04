function getOrders() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch('http://127.0.0.1:8080/api/order', requestOptions)
        .then(response => {
            console.log('Raw Response:', response);
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                displayOrders(data.data);
            } else {
                console.error('API Error:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

// Display orders in the table
function displayOrders(orders) {
    const tableBody = document.getElementById('order2confirm');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        const data = document.createElement('tr');
        data.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";
        data.innerHTML = `
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${order.id}
            </th>
            <td class="px-6 py-4">
                BUTTON HERE
            </td>
        `;
        tableBody.appendChild(data);
    });
}

window.onload = getOrders;