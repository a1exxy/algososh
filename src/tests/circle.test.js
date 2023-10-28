import {render} from "@testing-library/react";
import React from "react";
import {Circle} from "../components/ui/circle/circle";
import {ElementStates} from "../types/element-states";

describe('2: Тестирование компонента Circle (проверяем при помощи снэпшотов корректную отрисовку элемента)', () => {
  it('2.1: без буквы', () => {
    const {container} = render(<Circle/>)
    expect(container).toMatchSnapshot()
  })
  it('2.2: с буквами', () => {
    const testData = "aaa"
    const {container} = render(<Circle letter={testData}/>)
    expect(container.querySelector("p.letter").textContent).toBe(testData)
    expect(container).toMatchSnapshot()
  })
  it('2.3: с head', () => {
    const testData = "aaa"
    const {container} = render(<Circle head={testData}/>)
    expect(container.querySelector("div.head").textContent).toBe(testData)
    expect(container).toMatchSnapshot()
  })
  it('2.4: с react-элементом в head', () => {
    const testData = "aaa"
    const {container} = render(<Circle head={<Circle letter={testData}/>}/>)
    expect(container.querySelector("div.head p.letter").textContent).toBe(testData)
    expect(container).toMatchSnapshot()
  })
  it('2.5: с tail', () => {
    const testData = "aaa"
    const {container} = render(<Circle tail={testData}/>)
    expect(container.querySelector("div.tail30").textContent).toBe(testData)
    expect(container).toMatchSnapshot()
  })
  it('2.6: с react-элементом в tail', () => {
    const testData = "aaa"
    const {container} = render(<Circle tail={<Circle letter={testData}/>}/>)
    expect(container.querySelector("div.tail30 p.letter").textContent).toBe(testData)
    expect(container).toMatchSnapshot()
  })
  it('2.7: с index', () => {
    const testData = "1"
    const {container} = render(<Circle index={testData}/>)
    expect(container.querySelector("p.index").textContent).toBe(testData)
    expect(container).toMatchSnapshot()
  })
  it('2.8: с пропом isSmall ===  true', () => {
    const {container} = render(<Circle isSmall={true}/>)
    expect(container).toMatchSnapshot()
  })
  it('2.9: в состоянии default', () => {
    const {container} = render(<Circle state={ElementStates.Default}/>)
    expect(container).toMatchSnapshot()
  })
  it('2.10: в состоянии changing', () => {
    const {container} = render(<Circle state={ElementStates.Changing}/>)
    expect(container).toMatchSnapshot()
  })
  it('2.11: в состоянии modified', () => {
    const {container} = render(<Circle state={ElementStates.Modified}/>)
    expect(container).toMatchSnapshot()
  })
})