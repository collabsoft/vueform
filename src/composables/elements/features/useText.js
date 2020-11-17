import computedOption from './../../../utils/computedOption'
import { toRefs } from 'composition-api'

export default function(props, context, dependencies)
{
  const { schema } = toRefs(props)

  // ============== COMPUTED ==============

  const text = computedOption('text', schema, '')

  return {
    text,
  }
}