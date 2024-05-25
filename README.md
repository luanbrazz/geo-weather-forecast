# Teste de Proficiência em Programação

## Descrição
Este projeto é uma aplicação web desenvolvida como requisito do Teste de Proficiência em Programação realizado pela empresa [Geopixel](https://geopixel.com.br/). O objetivo é permitir a consulta de previsões meteorológicas de cidades do Brasil, utilizando a biblioteca OpenLayers para exibir um mapa e a API OpenWeather para obter dados meteorológicos e de geocodificação. A aplicação foi desenvolvida para avaliar competências em controle de estados, estruturação de código, realização de requisições, utilização de APIs, responsividade da aplicação e testes unitários.

## Funcionalidades
- Consultar previsões meteorológicas para uma cidade especificada pelo usuário.
- Exibir um mapa centrado na cidade consultada.
- Exibir dados meteorológicos, incluindo:
  - Nome da cidade
  - Data
  - Temperaturas (atual, máxima e mínima)
  - Tipo de clima atual com ícone correspondente
  - Probabilidade de chuva
  - Fase da lua com ícone correspondente
- Exibir previsões meteorológicas para os próximos 3 dias.
- Salvar cidades consultadas para acesso posterior.
- Navegar pelas cidades salvas e exibir suas previsões meteorológicas a partir do cache.

## Tecnologias Utilizadas
- HTML
- CSS
- JavaScript
- OpenLayers
- OpenWeather API
- Cypress

## Estrutura do Projeto
- `index.html`: Arquivo HTML principal.
- `css/style.css`: Arquivo CSS para estilização.
- `js/script.js`: Arquivo JavaScript com a lógica da aplicação.
- `img/`: Pasta contendo imagem utilizada no projeto.
- `cypress/`: Pasta contendo os testes e relatórios gerados pelo Cypress.

## Requisitos
- Navegador moderno (Google Chrome, Firefox, etc.)
- Conexão com a internet para acessar as APIs.

## Execução
Para usar o sistema de consulta de clima, siga os passos abaixo:

1. **Copie o código HTTPS do GitHub**:
   - Clique no link a seguir para copiar o repositório:
     ```sh
     https://github.com/luanbrazz/geo-weather-forecast.git
     ```
     <button onclick="navigator.clipboard.writeText('https://github.com/luanbrazz/geo-weather-forecast.git')">Copiar URL do Repositório</button>

2. **Clone o repositório ou baixe o projeto**:
   - **Método 1: Clonando o repositório pelo terminal**:
     - Abra um terminal de sua preferência e execute o comando:
       ```sh
       git clone https://github.com/luanbrazz/geo-weather-forecast.git
       ```
   - **Método 2: Baixando o projeto como ZIP**:
     - Acesse o repositório no GitHub e clique na opção "Download ZIP".
     - Após o download, descompacte o arquivo gerado.

3. **Abra o arquivo index.html no navegador**:
   - Navegue até a pasta onde o projeto foi clonado ou descompactado.
   - Localize o arquivo `index.html` e abra-o com o navegador de sua preferência. (Navegador recomendado: Google Chrome)

4. **Realize consultas de clima**:
   - Com a página web aberta, você pode realizar consultas de clima por cidade, inserir o nome de uma cidade na barra de pesquisa e obter as previsões meteorológicas.

## Como Usar
1. Digite o nome da cidade no campo de input e clique no botão de pesquisa ou pressione "Enter".
2. As informações meteorológicas e o mapa serão atualizados com os dados da cidade consultada.
3. As cidades consultadas serão salvas automaticamente no select "Cidades Salvas". Selecione uma cidade salva para carregar suas informações do cache.

## API Utilizadas
- [OpenWeather API](https://openweathermap.org/api) para obter dados meteorológicos e de geocodificação.
- [OpenLayers](https://openlayers.org/) para exibir o mapa.

## Testes e Relatórios
O projeto utiliza Cypress para testes automatizados e geração de relatórios. Os relatórios e capturas de tela dos testes podem ser encontrados nas seguintes pastas:
- `cypress/reports/html/index.html`: Relatório em formato HTML gerado pelo Cypress.
- `cypress/screenshots/test-app.cy.js/**`: Capturas de tela dos testes realizados.

O Cypress é utilizado para garantir que a aplicação funcione corretamente e para facilitar a manutenção e expansão futura do projeto.
