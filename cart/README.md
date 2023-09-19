# Meu Front

Este Projeto faz parte da entrega do MVP, onde este Front se refere a Componente A da entrega, e se refere a um sistemas de compras, que irá consumir dados de uma API Externa (Fake Store), e irá fornecer os dados da compra para o Back End (Componente C)

---

## Como executar em modo de desenvolvimento
Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Como executar através do Docker
Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal. Execute como administrador o seguinte comando para construir a imagem Docker:

docker build -t containercar .

Uma vez criada a imagem, para executar o container basta executar, como administrador, seguinte o comando:

docker run --rm -p 8084:80 containercar

Uma vez executando, para acessar o front-end, basta abrir o http://localhost:8084/#/ no navegador.






