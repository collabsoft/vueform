import { runElementTests } from 'test-helpers'

export default runElementTests('toggle', {
  default: {
    fieldType: 'toggle',
    value: true,
    value2: false,
    default: false,
    default2: false,
    nullValue: false,
  },
  // events: {
  //   events: ['change'],
  // }
})