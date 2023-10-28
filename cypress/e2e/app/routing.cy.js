describe('6: Тестирование переходов по страницам', () => {
  beforeEach( () => {
    cy.visit('http://localhost:3000')
  })
  it('6.1: страница "Cтрока"', () => {
    cy.get('a[href="/recursion"]').click().get('h3').contains('Строка')
  })
  it('6.2: страница "Последовательность Фибоначчи"', () => {
    cy.get('a[href="/fibonacci"]').click().get('h3').contains('Последовательность Фибоначчи')
  })
  it('6.3: страница "Сортировка массива"', () => {
    cy.get('a[href="/sorting"]').click().get('h3').contains('Сортировка массива')
  })
  it('6.4: страница "Стек"', () => {
    cy.get('a[href="/stack"]').click().get('h3').contains('Стек')
  })
  it('6.5: страница "Очередь"', () => {
    cy.get('a[href="/queue"]').click().get('h3').contains('Очередь')
  })
  it('6.6: страница "Связный список"', () => {
    cy.get('a[href="/list"]').click().get('h3').contains('Связный список')
  })
})