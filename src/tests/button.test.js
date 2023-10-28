import React from "react";
import {render, screen, fireEvent, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom'
import {Button} from "../components/ui/button/button";

describe('1: Тестирование компонента Button (проверяем при помощи снэпшотов корректную отрисовку)', () => {
  it('1.1: кнопки с текстом', () => {
    const testData = '123'
    const {asFragment, getByText} = render(<Button text={testData}/>)
    expect(getByText(testData)).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
  it('1.2: кнопки без текста', () => {
    const testData = ''
    const {asFragment} = render(<Button text={testData}/>)
    expect(asFragment().querySelector('p')).toHaveTextContent(testData)
    expect(asFragment()).toMatchSnapshot()
  })
  it('1.3: заблокированной кнопки', () => {
    const {asFragment} = render(<Button disabled={true}/>)
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
    expect(asFragment()).toMatchSnapshot()
  })
  it('1.4: кнопки с индикацией загрузки', () => {
    const {asFragment} = render(<Button isLoader={true}/>)
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveClass('loader_icon')
    expect(asFragment()).toMatchSnapshot()
  })

  it('1.5: Проверяем корректность вызова колбека при клике на кнопку', () => {
    const testData = 'GOOD'
    const onClick = () => {
      document.getElementById('result').innerHTML = testData
    }
    const {container} =
      render(<><Button data-testid="btn" onClick={onClick}/><p id="result" data-testid="result"></p></>)
    const btn = getByTestId(container, "btn");
    const result = getByTestId(container, "result");
    fireEvent.click(btn)
    expect(result.textContent).toBe(testData)
    expect(container).toMatchSnapshot()
  })
})