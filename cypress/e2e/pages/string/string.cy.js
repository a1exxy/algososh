// Строка

import {changingColor, defaultColor, modifiedColor} from "../../../../src/tests/utils";

describe('7: Строка', () => {
  const data = {
    step0: '12345',
    step1: '52341',
    step2: '54321',
  }
  const colors = {
    step0: [defaultColor, defaultColor, defaultColor, defaultColor, defaultColor],
    step1_1: [changingColor, defaultColor, defaultColor, defaultColor, changingColor],
    step1_2: [modifiedColor, defaultColor, defaultColor, defaultColor, modifiedColor],
    step2_1: [modifiedColor, changingColor, defaultColor, changingColor, modifiedColor],
    step2_2: [modifiedColor, modifiedColor, modifiedColor, modifiedColor, modifiedColor],
  }

  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('7.1: если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy
      .get('input')
      .first()
      .should('have.value', '')
      .get('button').last()
      .should('be.disabled')
  })

  it('7.2: строка разворачивается корректно', () => {
    const getCircles = () => cy.get('div[class^="circle_circle__"]')
    const getValues = () => cy.get('div[class^="circle_circle__"] > p')
    const checkValues = (values) => {
      getValues().each((item, index) =>
        cy.wrap(item).should('contain', `${values.slice(index, index + 1)}`)
      )
    }
    const checkColors = (colors) => {
      getCircles().each((item, index) => {
        cy.wrap(item).should('have.css', 'border-color', colors[index])
      })
    }

    // Ввод тестовых данных
    cy.get('input').first().type(data['step0']).get('button').last().click()

    // Начальное положение
    checkValues(data['step0'])
    checkColors(colors['step0'])

    // Шаг 1_1
    cy.wait(1000)
    checkValues(data['step0'])
    checkColors(colors['step1_1'])

    // Шаг 1_2
    cy.wait(1000)
    checkValues(data['step1'])
    checkColors(colors['step1_2'])

    // Шаг 2_1
    cy.wait(1000)
    checkValues(data['step1'])
    checkColors(colors['step2_1'])

    // Шаг 2_2
    cy.wait(1000)
    checkValues(data['step2'])
    checkColors(colors['step2_2'])
  })
})