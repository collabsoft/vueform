import { createForm } from 'test-helpers'
import { nextTick, ref } from 'composition-api'

describe('Plugin', () => {
  // @todo: Could not test in Vue2 because of global $vueform obj setting for tests
  // it('should change config', async () => {
  //   let form = createForm({
  //     el: {
  //       type: 'text'
  //     }
  //   }, {
  //     config: {
  //       plugins: [
  //         {
  //           config(config) {
  //             config.something = 'something'

  //             return config
  //           }
  //         }
  //       ]
  //     }
  //   })

  //   console.log(form.vm.$vueform)

  //   expect(form.vm.$vueform.something).toBe('something')
  // })

  it('should install', async () => {
    let form = createForm({
      schema: {
        el: {
          type: 'text'
        }
      }
    }, {
      config: {
        plugins: [
          {
            install(app) {
              app.mixin({
                data() {
                  return {
                    $something: null
                  }
                },
                beforeCreate() {
                  this.$something = 'something'
                }
              })
            }
          }
        ]
      }
    })

    expect(form.vm.$something).toBe('something')
  })

  it('should apply setup', async () => {
    let form = createForm({
      schema: {
        el: {
          type: 'text'
        }
      }
    }, {
      config: {
        plugins: [
          {
            apply: 'TextElement',
            setup(props, context, component) {
              component.ref = ref('value')

              return component
            }
          }
        ]
      }
    })

    let el = form.vm.el$('el')

    expect(el.ref).toBe('value')
  })

  it('should apply in array', async () => {
    let form = createForm({
      schema: {
        el: {
          type: 'text'
        },
        el2: {
          type: 'textarea'
        },
      }
    }, {
      config: {
        plugins: [
          {
            apply: ['TextElement', 'TextareaElement'],
            setup(props, context, component) {
              component.ref = ref('value')

              return component
            }
          }
        ]
      }
    })

    let el = form.vm.el$('el')
    let el2 = form.vm.el$('el2')

    expect(el.ref).toBe('value')
    expect(el2.ref).toBe('value')
  })

  it('should apply as regex', async () => {
    let form = createForm({
      schema: {
        el: {
          type: 'text'
        },
        el2: {
          type: 'textarea'
        },
        el3: {
          type: 'select'
        },
      }
    }, {
      config: {
        plugins: [
          {
            apply: /Text[a-z]*Element/,
            setup(props, context, component) {
              component.ref = ref('value')

              return component
            }
          }
        ]
      }
    })

    let el = form.vm.el$('el')
    let el2 = form.vm.el$('el2')
    let el3 = form.vm.el$('el3')

    expect(el.ref).toBe('value')
    expect(el2.ref).toBe('value')
    expect(el3.ref).toBe(undefined)
  })

  it('should apply as array regex', async () => {
    let form = createForm({
      schema: {
        el: {
          type: 'text'
        },
        el2: {
          type: 'textarea'
        },
        el3: {
          type: 'select'
        },
        el4: {
          type: 'multiselect'
        },
        el5: {
          type: 'editor'
        },
      }
    }, {
      config: {
        plugins: [
          {
            apply: [/Text[a-z]*Element/, /[Ss]electElement/],
            setup(props, context, component) {
              component.ref = ref('value')

              return component
            }
          }
        ]
      }
    })

    let el = form.vm.el$('el')
    let el2 = form.vm.el$('el2')
    let el3 = form.vm.el$('el3')
    let el4 = form.vm.el$('el4')
    let el5 = form.vm.el$('el5')

    expect(el.ref).toBe('value')
    expect(el2.ref).toBe('value')
    expect(el3.ref).toBe('value')
    expect(el4.ref).toBe('value')
    expect(el5.ref).toBe(undefined)
  })

  it('should apply to everything', async () => {
    let form = createForm({
      schema: {
        el: {
          type: 'text'
        },
        el2: {
          type: 'textarea'
        },
        el3: {
          type: 'select'
        },
        el4: {
          type: 'multiselect'
        },
        el5: {
          type: 'editor'
        },
      }
    }, {
      config: {
        plugins: [
          {
            setup(props, context, component) {
              component.ref = ref('value')

              return component
            }
          }
        ]
      }
    })

    let el = form.vm.el$('el')
    let el2 = form.vm.el$('el2')
    let el3 = form.vm.el$('el3')
    let el4 = form.vm.el$('el4')
    let el5 = form.vm.el$('el5')

    expect(el.ref).toBe('value')
    expect(el2.ref).toBe('value')
    expect(el3.ref).toBe('value')
    expect(el4.ref).toBe('value')
    expect(el5.ref).toBe('value')
  })

  it('should apply other props', async () => {
    let a = 0

    createForm({
      schema: {
        el: {
          type: 'text'
        },
        el2: {
          type: 'textarea'
        },
      }
    }, {
      config: {
        plugins: [
          {
            apply: 'TextElement',
            created() {
              a++
            }
          }
        ]
      }
    })

    expect(a).toBe(1)
  })
})