
describe('5. Тестирование работоспособности приложения', () => {
  it('5.1: should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });
});
