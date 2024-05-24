// VARIÁVEIS
let codigoPais;
const chaveApi = "b5547caf7a0cdfba10a70155aa0068c8";
let urlApiPais = "";

const inputCidade = document.querySelector("#cidade-input");
const botaoPesquisar = document.querySelector("#pesquisar");
const selectCidadesSalvas = document.querySelector("#cidades-salvas");

const elementCidade = document.querySelector("#cidade");
const elementTemperatura = document.querySelector("#temperatura span");
const elementDescricao = document.querySelector("#descricao");
const elementIconeClima = document.querySelector("#icone-clima");
const elementPais = document.querySelector("#bandeira-pais");
const elementUmidade = document.querySelector("#umidade span");
const elementVento = document.querySelector("#vento span");

const elementData = document.querySelector("#data");
const elementTempMax = document.querySelector("#temp-max");
const elementTempMin = document.querySelector("#temp-min");
const elementProbabilidadeChuva = document.querySelector("#probabilidade-chuva");
const elementFaseLua = document.querySelector("#fase-lua");
const elementIconeFaseLua = document.querySelector("#icone-fase-lua");

const containerClima = document.querySelector("#dados-clima");
const containerMapa = document.querySelector("#mapa");

let mapa;

// FUNÇÕES
// Inicializa o mapa para que possamos ver a localização das cidades
const inicializarMapa = () => {
    mapa = new ol.Map({
        target: 'mapa',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([0, 0]),
            zoom: 2
        })
    });
};

// Atualiza a posição do mapa para a cidade que pesquisamos
const atualizarMapa = (latitude, longitude) => {
    const view = mapa.getView();
    const coords = ol.proj.fromLonLat([longitude, latitude]);
    view.setCenter(coords);
    view.setZoom(10);
};

// Busca os dados climáticos da cidade que o usuário digitou
const obterDadosClima = async (cidade) => {
    const urlApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveApi}&lang=pt_br`;
    const resposta = await fetch(urlApiClima);
    const dadosClima = await resposta.json();
    return dadosClima;
};

// Calcula a fase da lua com base na data atual
const calcularFaseLua = (data) => {
    const fases = ['Nova', 'Crescente', 'Cheia', 'Minguante'];
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();

    // Um cálculo simples para determinar a fase da lua
    const fase = Math.floor((dia + mes + ano) % 4);
    const iconesFases = {
        'Nova': 'fa-moon',
        'Crescente': 'fa-cloud-moon',
        'Cheia': 'fa-circle',
        'Minguante': 'fa-moon'
    };
    return { fase: fases[fase], icone: iconesFases[fases[fase]] };
};

// Calcula a probabilidade de chuva com base nos dados recebidos
const calcularProbabilidadeChuva = (dadosClima) => {
    if (dadosClima.rain) {
        return `${dadosClima.rain["1h"] * 100}%`;
    }
    return "0%";
};

// Exibe os dados do clima na tela para a cidade pesquisada
const mostrarDadosClima = async (cidade) => {
    const dadosClima = await obterDadosClima(cidade);

    if (dadosClima.message === 'city not found') {
        alert("Cidade não encontrada. Por favor, tente novamente.");
        return;
    }

    const { name, sys, main, weather, wind, dt, coord } = dadosClima;
    const { country } = sys;
    const { temp, humidity, temp_max, temp_min } = main;
    const { description, icon } = weather[0];
    const { speed } = wind;

    const data = new Date(dt * 1000).toLocaleDateString("pt-BR");

    codigoPais = country;
    urlApiPais = `https://flagsapi.com/${codigoPais}/flat/64.png`;

    elementCidade.innerText = name;
    elementTemperatura.innerText = `${parseInt(temp)}°C`;
    elementDescricao.innerText = description;
    elementIconeClima.setAttribute("src", `http://openweathermap.org/img/wn/${icon}.png`);
    elementPais.setAttribute("src", urlApiPais);
    elementUmidade.innerText = `${humidity}%`;
    elementVento.innerText = `${parseInt(speed)}km/h`;

    const faseLua = calcularFaseLua(new Date(dt * 1000));
    elementFaseLua.innerText = `Fase da lua: ${faseLua.fase}`;
    elementIconeFaseLua.className = `fa ${faseLua.icone}`;

    elementData.innerText = `Data: ${data}`;
    elementTempMax.innerText = `Máxima: ${parseInt(temp_max)}°C`;
    elementTempMin.innerText = `Mínima: ${parseInt(temp_min)}°C`;
    elementProbabilidadeChuva.innerText = `Probabilidade de chuva: ${calcularProbabilidadeChuva(dadosClima)}`;

    containerClima.classList.remove("hide");

    atualizarMapa(coord.lat, coord.lon);
    salvarCidade(name);
    carregarCidadesSalvas(name);
};

// Salva a cidade pesquisada no armazenamento local do navegador
const salvarCidade = (cidade) => {
    let cidades = JSON.parse(localStorage.getItem("cidadesSalvas")) || [];
    if (!cidades.includes(cidade)) {
        cidades.push(cidade);
        localStorage.setItem("cidadesSalvas", JSON.stringify(cidades));
    }
};

// Carrega as cidades salvas do armazenamento local e preenche o select
const carregarCidadesSalvas = (cidadeSelecionada = null) => {
    const cidades = JSON.parse(localStorage.getItem("cidadesSalvas")) || [];
    selectCidadesSalvas.innerHTML = "";

    if (cidades.length === 0) {
        const placeholderOption = document.createElement("option");
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        placeholderOption.textContent = "Nenhuma cidade salva";
        selectCidadesSalvas.appendChild(placeholderOption);
    } else {
        cidades.forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            selectCidadesSalvas.appendChild(option);
        });

        if (cidadeSelecionada) {
            selectCidadesSalvas.value = cidadeSelecionada;
        }
    }
};

// EVENTOS
// Adiciona um evento de clique no botão de pesquisar para buscar dados climáticos
botaoPesquisar.addEventListener("click", (e) => {
    e.preventDefault();
    const cidade = inputCidade.value.trim();
    if (cidade) {
        mostrarDadosClima(cidade);
    }
});

// Carrega os dados climáticos da cidade selecionada no select
selectCidadesSalvas.addEventListener("change", () => {
    const cidade = selectCidadesSalvas.value;
    if (cidade) {
        mostrarDadosClima(cidade);
    }
});

// Inicializa o mapa e carrega as cidades salvas quando a página é carregada
window.addEventListener("load", () => {
    inicializarMapa();
    carregarCidadesSalvas();
});

// Adiciona um evento de tecla no input para buscar dados ao pressionar Enter
inputCidade.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const cidade = e.target.value.trim();
        if (cidade) {
            mostrarDadosClima(cidade);
        }
    }
});
