// Función para obtener los datos de la API y crear la tabla
async function fetchData() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const tableData = document.getElementById('tableData').getElementsByTagName('tbody')[0];

        // Recorre los datos obtenidos y crea filas de la tabla
        response.data.forEach(item => {
            const newRow = tableData.insertRow();

            const cell1 = newRow.insertCell(0);
            cell1.textContent = item.id;

            const cell2 = newRow.insertCell(1);
            cell2.textContent = item.title;

            const cell3 = newRow.insertCell(2);
            cell3.textContent = item.completed ? 'Sí' : 'No';

            const cell4 = newRow.insertCell(3);
            const button = document.createElement('button');
            button.textContent = 'Mostrar Detalles';
            button.addEventListener('click', async () => {
                try {
                    const url = `https://jsonplaceholder.typicode.com/todos/${item.id}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    swal("Detailed Data", `
                        User ID: ${data.userId}
                        ID: ${data.id}
                        Title: ${data.title}
                        Completed: ${data.completed ? 'Yes' : 'No'}
                    `);
                } catch (error) {
                    console.error("Hubo un problema al obtener el detalle:", error);
                }
            });
            cell4.appendChild(button);
        });
    } catch (error) {
        console.error("Hubo un problema al obtener los datos:", error);
    }
}

window.onload = fetchData;
