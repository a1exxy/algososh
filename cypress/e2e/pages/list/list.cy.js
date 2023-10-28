// Список

import {changingColor, defaultColor, modifiedColor} from "../../../../src/tests/utils";

describe('11: Список ', () => {
  const testData = 'TST'
  beforeEach(() => {
    cy
      .visit('http://localhost:3000/list')
      .get('input').first().as('value')
      .get('input').last().as('index')
      .get('button:contains(Добавить в head)').as('add_head')
      .get('button:contains(Удалить из head)').as('del_head')
      .get('button:contains(Добавить в tail)').as('add_tail')
      .get('button:contains(Удалить из tail)').as('del_tail')
      .get('button:contains(Добавить по индексу)').as('add_index')
      .get('button:contains(Удалить по индексу)').as('del_index')
      .get('div[class^="list-page_line__"]').as('line')

  })

  it('11.1: если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже', () => {
    cy
      .get('@value')
      .should('have.value', '')
      .get('@add_head').should('be.disabled')
      .get('@add_tail').should('be.disabled')
      .get('@add_index').should('be.disabled')
      .get('@del_index').should('be.disabled')
  })

  it('11.2: отрисовки дефолтного списка', () => {
    cy.get('@line').should('not.be.empty')
  })

  it('11.3: добавления элемента в head', () => {
    cy
      .get('@value').type(testData)
      .get('@add_head').click()
      .get('div[class^="circle_content__"]').first().within((item) => {
      cy.wrap(item).get('div').first().within(el => {
        cy.wrap(el)
          .get('p').first().should('contain', testData)
          .get('div[class^="circle_circle__"]').should('have.css', 'border-color', changingColor)
      })
      cy
        .wait(1000)
        .wrap(item).get('div[class^="circle_circle__"]').should('have.css', 'border-color', defaultColor)
        .wrap(item).get('p').first().should('contain', testData)
    })
  })

  it('11.4: добавления элемента в tail', () => {
    cy
      .get('@value').type(testData)
      .get('@add_tail').click()
      .wait(500)
      .get('div[class^="circle_content__"]').last().within((item) => {
      cy.wrap(item).get('div[class^="circle_circle__"]').first()
        .should('have.css', 'border-color', changingColor)
        .get('p').first().should('contain', testData)
    })
      .wait(500)
      .get('div[class^="circle_content__"]').last().within((item) => {
      cy.wrap(item)
        .get('p[class*="circle_letter__"]').should('contain', testData)
        .get('div[class^="circle_circle__"]').should('have.css', 'border-color', modifiedColor)
    })
      .wait(500)
      .get('div[class^="circle_content__"]').last().within((item) => {
      cy.wrap(item)
        .get('p[class*="circle_letter__"]').should('contain', testData)
        .get('div[class^="circle_circle__"]').should('have.css', 'border-color', defaultColor)
    })
  })

  it('11.5: добавления элемента по индексу', () => {
    cy
      .get('@value').type(testData)
      .get('@index').type(0)
      .get('@add_index').click()
      .wait(500)
      .get('div[class^="circle_content__"]').first().within((item) => {
      cy.wrap(item).get('div[class^="circle_circle__"]').first()
        .should('have.css', 'border-color', changingColor)
        .get('p').first().should('contain', testData)
    })
      .wait(500)
      .get('div[class^="circle_content__"]').first().within((item) => {
      cy.wrap(item)
        .get('p[class*="circle_letter__"]').should('contain', testData)
        .get('div[class^="circle_circle__"]').should('have.css', 'border-color', defaultColor)
    })
  })

  it('11.6: удаления элемента из head', () => {
    cy
      .get('@value').type(testData)
      .get('@add_head').click()
      .wait(1000)
      .get('@del_head').click()
      .wait(500)
      .get('div[class^="circle_content__"]').first().within((item) => {
      cy.wrap(item).get('div[class^="circle_circle__"]').first()
        .should('have.css', 'border-color', defaultColor)
        .get('p').first().should('contain', '')
        .get('div[class^="circle_circle__"]').last().should('have.css', 'border-color', changingColor)
        .get('p[class*="circle_letter__"]').last().should('contain', testData)
    })
      .wait(500)
      .get('div[class^="circle_content__"]').first().within((item) => {
      cy.wrap(item)
        .get('p[class*="circle_letter__"]').should('not.contain', testData)
        .get('div[class^="circle_circle__"]').should('have.css', 'border-color', defaultColor)
    })
  })
  it('11.7: удаления элемента из tail', () => {
    cy
      .get('@value').type(testData)
      .get('@add_tail').click()
      .wait(1000)
      .get('@del_tail').click()
      .wait(500)
      .get('div[class*="circle_default__"]').last().within((item) => {
      cy.wrap(item)
        .should('have.css', 'border-color', defaultColor)
        .get('p').first().should('contain', '')
    })
      .get('div[class^="circle_circle__"]').last().within(el => {
      cy.wrap(el).should('have.css', 'border-color', changingColor)
        .get('p').last().should('contain', testData)
    })
      .wait(500)
      .get('div[class^="circle_circle__"]').last().within(el => {
      cy.wrap(el).should('have.css', 'border-color', defaultColor)
        .get('p').last().should('not.contain', testData)
    })
  })

  it('11.8: удаления элемента по индексу', () => {
    cy
      .get('@value').type(testData)
      .get('@add_head').click()
      .wait(1000)
      .get('@index').type(0)
      .get('@del_index').click()
      .wait(500)
      .get('div[class^="circle_content__"]').first().within((item) => {
      cy.wrap(item).get('div[class^="circle_circle__"]').first()
        .should('have.css', 'border-color', defaultColor)
        .get('p').first().should('contain', '')
        .get('div[class^="circle_circle__"]').last().should('have.css', 'border-color', changingColor)
        .get('p[class*="circle_letter__"]').last().should('contain', testData)
    })
      .wait(500)
      .get('div[class^="circle_content__"]').first().within((item) => {
      cy.wrap(item)
        .get('p[class*="circle_letter__"]').should('not.contain', testData)
        .get('div[class^="circle_circle__"]').should('have.css', 'border-color', defaultColor)
    })
  })
})