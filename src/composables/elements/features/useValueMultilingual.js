import { computed, ref, watch } from 'composition-api'

export default function(props, context, dependencies)
{
  // ============ DEPENDENCIES =============

  const default_ = dependencies.default
  const nullValue = dependencies.nullValue
  const language = dependencies.language

  // ============== COMPUTED ===============

  /**
   * Helper property used to store the element value.
   * 
   * @type {object}
   * @default null
   */
  const currentValue = ref(default_ !== undefined ? _.clone(default_.value) : {})

  /**
   * Helper property used to store the element previous value.
   * 
   * @type {object}
   * @default null
   */
  const previousValue = ref(nullValue !== undefined ? _.clone(nullValue.value) : {})

  /**
   * The value of the element.
   * 
   * @type {any}
   */
  const value = computed({
    get() {
      return currentValue.value
    },
    set(val) {
      previousValue.value = _.clone(currentValue.value)
      currentValue.value = val
    }
  })

  /**
   * Helper property used for tracking the field's value.
   * 
   * @type {any}
   */
  const model = computed({
    get() {
      return value.value[language.value]
    },
    set(val) {
      value.value = Object.assign({}, value.value, {
        [language.value]: val,
      })
    }
  })

  return {
    // Computed
    value,
    model,
    previousValue,
    currentValue,
  }
}