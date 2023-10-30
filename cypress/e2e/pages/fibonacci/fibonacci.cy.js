import {circleLetter} from "../../../../src/tests/utils";

describe('8: Фибоначчи', () => {

  beforeEach(() => {
    cy.visit('fibonacci')
  })

  it('8.1: если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy
      .get('input')
      .first()
      .should('have.value', '')
      .get('button').last()
      .should('be.disabled')
  })

  it('8.2: числа генерируются корректно', () => {
    cy.get('input').first().type('7').get('button').last().click().wait(4000)
    cy.get(circleLetter).last().should('contain', '21')
  })
})