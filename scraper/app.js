const fetch = require('node-fetch'); // Para buscar dados da URL
const cheerio = require('cheerio'); // Para manipular e buscar dados no HTML

const url = 'https://quotes.toscrape.com/';

async function fetchData() {
    try {
        // Faz a requisição da página
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Verifica os seletores específicos da página
        const frases = $('.quote');
        const listaFrases = [];

        // Itera sobre os elementos da tabela
        frases.each(function () {
            const texto = $(this).find('.text').text().trim();
            const autor = $(this).find('.author').text().trim();
            const tags = $(this).find('.tag').map(function() {
                return $(this).text().trim(); //usando o .map para separar as tags e deixar o retorno mais bonito 
            }).get()
           

            
            if (texto && autor && tags ) {
                listaFrases.push({
                    texto,
                    autor,
                    tags,
                   
                });
            }
        });

        // Exibe os dados no console
        console.log(listaFrases);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Executa a função
fetchData();
