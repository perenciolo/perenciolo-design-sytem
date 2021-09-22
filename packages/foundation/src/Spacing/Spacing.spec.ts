import { Spacing } from "./Spacing"

describe('Spacing', () => {
  it('should match object', () => {
    expect(Spacing).toMatchObject({
      "lg": "lg",
      "md": "md",
      "sm": "sm",
      "xl": "xl",
      "xs": "xs",
      "xxl": "xxl",
      "xxs": "xxs",
      "xxxl": "xxxl",
      "xxxs": "xxxs",
    })
  })
})