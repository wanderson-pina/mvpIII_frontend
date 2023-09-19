// Função para obter a lista existente do servidor via requisição GET
const getList = async () => {
  let url = 'https://fakestoreapi.com/products';
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      data.forEach(item => insertCard(item));
    } else {
      console.error('Erro na resposta da API:', response.status);
    }
  } catch (error) {
    console.error('Erro na requisição GET:', error);
  }
}

// Chamada da função para carregamento inicial dos dados
getList();

// Função para inserir items na lista apresentada
const insertCard = (product) => {
  var section = document.getElementById('products-list');
  let article = document.createElement('article');
  article.setAttribute('class', 'product');
  article.setAttribute('id', product.id);

  let img = document.createElement('img');
  img.setAttribute('src', product.image);
  img.setAttribute('alt', 'Não foi possível carregar a imagem do produto');

  let h3 = document.createElement('h3');
  h3.setAttribute('class', 'price-product');
  let span = document.createElement('span');
  span.innerHTML = 'R$ ' + product.price;
  h3.appendChild(span);

  let p = document.createElement('p');
  p.setAttribute('class', 'name-product');
  p.innerHTML = product.title;

  let button = document.createElement('button');
  button.setAttribute('class', 'buy-product');
  button.setAttribute('type', 'button');
  button.setAttribute('data-product-id', product.id); // Use data-* attributes para armazenar dados personalizados

  button.innerHTML = 'Comprar';

  let button2 = document.createElement('button');
  button2.setAttribute('class', 'del-product');
  button2.setAttribute('type', 'button');
  button2.setAttribute('data-product-id', product.id); // Use data-* attributes para armazenar dados personalizados

  button2.innerHTML = 'Cancel';

  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);
  article.appendChild(button);  
  article.appendChild(button2);
  section.appendChild(article);

  // Evento de clique do botão "Comprar"
  button.addEventListener('click', (e) => {
    const productId = e.target.getAttribute('data-product-id'); // Obtenha o ID do produto do atributo data-* do botão
    // Chamar a função para comprar o produto
    postItem(productId, product.title, product.price, product.image);
  });

 
  // Evento de clique do botão "Cancelar"
  button2.addEventListener('click', (e) => {
    const productId = e.target.getAttribute('data-product-id'); // Obtenha o ID do produto do atributo data-* do botão
    // Chamar a função para deletar o produto
    delItem(productId, product.title, product.price, product.image);
  });





// Enviar Post
const postItem = async (inputid, inputtitle, inputprice, inputimage, ) => {
  const formData = new FormData();
  formData.append('id', inputid);
  formData.append('title', inputtitle);
  formData.append('price', inputprice);
  formData.append('image', inputimage);

  let url = 'http://127.0.0.1:5000/product';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      // Check if the response status is 200 before inserting data into the table
      if (response.status === 200)
              response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
}

// Função para delete um produto do Bando de Dados
const delItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/product?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
  
}
