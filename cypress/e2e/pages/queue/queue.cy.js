// Очередь

import {changingColor, defaultColor, circle} from "../../../../src/tests/utils";

describe('10: Очередь', () => {
  const paragraph = 'div[class^="queue-page_line__"] > div > div > p'
  const addItem = (item) => {
    cy.get('input').first().type(item).get('@add').click()
  }
  beforeEach(() => {
    cy.visit('queue')
    cy.get('button:contains(Добавить)').as('add')
  })
  it('10.1: если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy
      .get('input')
      .first()
      .should('have.value', '')
      .get('@add')
      .should('be.disabled')
  })
  it('10.2: правильность добавления элемента в очередь', () => {
    addItem('1')
    cy
      .get(paragraph).first().should('contain', '1')
      .get(circle).first().as('item')
      .get('@item').should('have.css', 'border-color', changingColor)
      .wait(500)
      .get('@item').should('have.css', 'border-color', defaultColor)
  })
  it('10.3: правильность удаления элемента из очереди', () => {
    addItem('1')
    cy.wait(1000)
    cy
      .get('button:contains(Удалить)').click()
      .get(circle).first().should('have.css', 'border-color', defaultColor)
      .get('div[class^="circle_content__"]:contains(1) > div[class^="circle_circle__"]').should('have.css', 'border-color', changingColor)
      .wait(500)
      .get(paragraph).should('contain', '')
      .get(circle).should('have.css', 'border-color', defaultColor)
  })
  it('10.4: поведение кнопки «Очистить»', () => {
    addItem('1')
    cy.wait(1000)
    addItem('1')
    cy.wait(1000)
    cy
      .get('button:contains(Очистить)').click()
      .get(paragraph).should('contain', '')
      .get(circle).should('have.css', 'border-color', defaultColor)
  })
})