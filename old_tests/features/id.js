import { createForm, testComputedOption, findAllComponents, testAttribute } from 'test-helpers'

export default function id (elementType, options) {
  const elementName = `${_.upperFirst(elementType)}Element`

  return () => {
    testComputedOption(it, elementType, 'id', elementType, 'my-id')

    it('should render `id` attribute', () => {
      let form = createForm({
        schema: {
          el: {
            type: elementType,
            id: 'my-id'
          }
        }
      })

      let elWrapper = findAllComponents(form, { name: elementName }).at(0)

      testAttribute(elWrapper, options.fieldType, 'id', 'my-id')
    })
  }
}