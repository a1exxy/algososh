// Стек
import {changingColor, circleLetter, defaultColor, circle} from "../../../../src/tests/utils";

describe('9: Стек', () => {
  const block = 'div[class^="stack-page_line__"] > div'
  const addItem = (item) => {
    cy.get('input').first().type(item).get('@add').click()
  }

  beforeEach(() => {
    cy.visit('stack')
    cy.get('button:contains(Добавить)').as('add')
  })

  it('9.1: если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy
      .get('input')
      .should('have.value', '')
      .get('@add')
      .should('be.disabled')
  })

  it('9.2: правильность добавления элемента в стек', () => {
    addItem('1')
    cy
      .get(circleLetter).should('contain', '1')
      .get(circle).should('have.css', 'border-color', changingColor)
      .wait(500)
      .get(circle).should('have.css', 'border-color', defaultColor)
  })

  it('9.3: правильность удаления элемента из стека', () => {
    addItem('1')
    cy
      .wait(500)
      .get('button:contains(Удалить)').click()
      .get(block).should('not.exist')
  })

  it('9.4: поведение кнопки «Очистить»', () => {
    addItem('1')
    addItem('1')
    cy
      .wait(1000)
      .get('button:contains(Очистить)').click()
      .get(block).should('not.exist')
  })
})