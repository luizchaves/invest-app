describe('Invest App', () => {
  describe('Homepage', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('should create a new investment', () => {
      cy.get('.pb-5 > :nth-child(4) > .btn').click();

      cy.get('#name').type('Tesouro Selic');
      cy.get('#value').type('200');

      cy.get('#submit').click();

      cy.get('.investment-name').last().should('contain', 'Tesouro Selic');
      cy.get('.investment-value').last().should('contain', '200');
    });

    it('should update a investment', async () => {
      cy.get('.card .icon-pencil').last().click();

      cy.get('#value').type('250');

      cy.get('.investment-value').last().should('contain', '250');
    });

    it('should remove a investment', async () => {
      cy.get('.icon-trash > .iconify').last().click();

      cy.get('.btn-primary').click();

      cy.get('.investment-value').last().should('not.contain', '250');
    });
  });
});
