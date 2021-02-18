import { computed, toRefs } from 'composition-api'

const base = function(props, context, dependencies)
{
  const {
    object,
    element
  } = toRefs(props)
      
  // ============== COMPUTED ==============

  /**
    * The schema of a child.
    * 
    * @type {object}
    */
  const prototype = computed(() => {
    return isObject.value
      ? Object.assign({}, object.value, {type: 'object'})
      : element.value || {}
  })

  /**
   * Determines if the list items are objects.
   *
   * @type {boolean}
   */
  const isObject = computed(() => {
    return !!object.value
  })

  return {
    prototype,
    isObject,
  }
}

const multifile = function(props, context, dependencies, options = {})
{
  const { 
    auto,
    object,
    file,
    fields,
    storeFile,
    storeOrder,
    image,
   } = toRefs(props)

  // =============== PRIVATE ==============

  const type = computed(() => {
    return options.type || 'file'
  })

  // ============== COMPUTED ==============

  /**
   * 
   * 
   * @private
   */
  const storeFileName = computed(() => {
    if (storeFile.value) {
      return storeFile.value
    }

    return object.value || _.keys(fields.value).length || storeOrder.value ? 'file' : null
  })

  /**
   * Determines if the list items are objects.
   *
   * @type {boolean}
   */
  const isObject = computed(() => {
    return !!object.value || !!storeFileName.value || !!storeOrder.value || !!_.keys(fields.value).length
  })

  /**
    * The schema of a child.
    * 
    * @type {object}
    */
  const prototype = computed(() => {
    if (!isObject.value) {
      return Object.assign({}, {
        type: type.value,
        auto: auto.value,
        image: image.value,
      }, file.value)
    }

    return {
      type: 'object',
      schema: Object.assign({},
        // File
        {[storeFileName.value]: Object.assign({}, {
          type: type.value,
          auto: auto.value,
          image: image.value,
          embed: true,
        }, file.value)},

        // Order
        storeOrder.value ? {
          [storeOrder.value]: {
            type: 'hidden',
            meta: true
          }
        } : {},

        // Other fields
        fields.value
      )
    }
  })

  return {
    storeFileName,
    isObject,
    prototype,
  }
}

export {
  multifile,
}

export default base