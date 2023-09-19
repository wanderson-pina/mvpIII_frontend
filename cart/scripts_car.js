document.addEventListener("DOMContentLoaded", function () {
  const productTable = document.getElementById('product-table2');

  const insertRow = (data) => {
      const row = productTable.insertRow();
      const idCell = row.insertCell(0);
      const titleCell = row.insertCell(1);
      const priceCell = row.insertCell(2);
      const quantityCell = row.insertCell(3);
      const actionCell = row.insertCell(4); // Célula para o botão "Comprar"

      idCell.textContent = data.id;
      titleCell.textContent = data.title;
      priceCell.textContent = data.price;

      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.value = data.quantity;
      quantityCell.appendChild(quantityInput);

      const incrementButton = document.createElement('button');
      incrementButton.textContent = '+';
      incrementButton.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value, 10) + 1;
      });
      quantityCell.appendChild(incrementButton);

      const decrementButton = document.createElement('button');
      decrementButton.textContent = '-';
      decrementButton.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 0) {
          quantityInput.value = currentValue - 1;
        }
      });
      quantityCell.appendChild(decrementButton);

      // Botão "Comprar" para enviar a quantidade ao servidor
      const buyButton = document.createElement('button');
      buyButton.textContent = 'Comprar';
      buyButton.addEventListener('click', () => {
        const newQuantity = parseInt(quantityInput.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
          // Faça a requisição POST para atualizar a quantidade no servidor
          updateQuantity(data.id, newQuantity);
        }
      });
      actionCell.appendChild(buyButton);
  };

  // Função para atualizar a quantidade no servidor (requisição POST)
  const updateQuantity = (productId, newQuantity) => {
    const formData = new FormData();
    formData.append('id', productId);
    formData.append('quantity', newQuantity);
    
    fetch('http://127.0.0.1:5000/product/update_quantity', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Quantidade atualizada com sucesso:', data);
        
      })
      .catch(error => {
        console.error('Erro ao atualizar a quantidade no servidor:', error);
      });
  };

  fetch('http://127.0.0.1:5000/products')
      .then(response => response.json())
      .then(data => {
          data.products.forEach(item => insertRow(item));
      })
      .catch(error => {
          console.error('Erro ao buscar dados do servidor:', error);
      });
});
