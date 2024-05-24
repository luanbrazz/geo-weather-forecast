describe('Teste de Proficiência em Programação - Geopixel', () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
        cy.visit('/');
    });

    context('Teste de toda a aplicação', () => {
        it('Testando título do cabeçalho', () => {
            cy.get('h3').contains('Consulta Meteorológica:');
            cy.screenshot('titulo-cabecalho');
        });

        it('Digitando Cidade válida', () => {
            cy.get('#cidade-input').type('Caçapava');
            cy.get('#pesquisar > .fa-solid').click();
            cy.screenshot('cidade-valida');
        });

        it('Validando se a cidade está correta', () => {
            cy.get('#cidade-input').type('Caçapava');
            cy.get('#pesquisar > .fa-solid').click();
            cy.get('#cidade').contains('Caçapava');
            cy.screenshot('validacao-cidade-correta');
        });

        it('Buscando cidade salva', () => {
            cy.get('#cidade-input').type('Buenos Aires');
            cy.get('#pesquisar > .fa-solid').click();
            cy.screenshot('cidade-buenos-aires');

            cy.get('#cidade-input').clear();
            cy.get('#cidade-input').type('Rio de Janeiro');
            cy.get('#pesquisar > .fa-solid').click();
            cy.screenshot('cidade-rio-de-janeiro');

            cy.get('#cidade-input').clear();
            cy.get('#cidades-salvas').select('Buenos Aires');
            cy.screenshot('buscando-cidade-salva');
        });
    });
});
