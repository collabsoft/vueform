import computedOption from './../../../utils/computedOption'
import { computed, toRefs } from 'composition-api'

const base = function(props, context, dependencies)
{
  const { schema } = toRefs(props)

  // ============ DEPENDENCIES =============

  const update = dependencies.update
  const disabled = dependencies.disabled
  
  // ============== COMPUTED ==============

  const drop = computedOption('drop', schema, false)

  const canDrop = computed(() => {
    let div = document.createElement('div')

    return ( ( 'draggable' in div )
            || ( 'ondragstart' in div && 'ondrop' in div ) )
            && 'FormData' in window
            && 'FileReader' in window
  })

  // =============== METHODS ==============

  const handleDrop = (e) => {
    if (disabled.value) {
      return
    }

    let file = e.dataTransfer.files[0]

    update(file || null)
  }

  return {
    drop,
    canDrop,
    handleDrop,
  }
}

const multifile = function(props, context, dependencies)
{
  // ============ DEPENDENCIES =============

  const add = dependencies.add
  const disabled = dependencies.disabled
  const isObject = dependencies.isObject
  const storeFile = dependencies.storeFile

  const { drop, canDrop } = base(props, context, dependencies)

  // =============== METHODS ==============

  const handleDrop = (e) => {
    if (!e.dataTransfer || !e.dataTransfer.files || e.dataTransfer.files.length == 0 || disabled.value) {
      return
    }

    _.each(e.dataTransfer.files, (file) => {
      add(isObject.value ? {
        [storeFile.value]: file
      } : file)
    })
  }

  return {
    drop,
    canDrop,
    handleDrop,
  }
}

export {
  multifile,
}

export default base