import {stringRevert} from "./index";

describe('3: Тестирование алгоритма разворота строки. Корректно разворачивает строку', () => {
  it('3.1: с чётным количеством символов', () => {
    expect(stringRevert("1234",[])).toBe("4321")
  })
  it('3.2: с нечетным количеством символов', () => {
    expect(stringRevert("12345",[])).toBe("54321")
  })
  it('3.3: с одним символом', () => {
    expect(stringRevert("1",[])).toBe("1")
  })
  it('3.4: пустую строку', () => {
    expect(stringRevert("",[])).toBe("")
  })
})