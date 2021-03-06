import { onMounted } from 'composition-api'
import useForm$ from './../../composables/useForm$'
import useFieldId from './../../composables/elements/useFieldId'
import useTheme from './../../composables/useTheme'
import useLayout from './../../composables/elements/useLayout'
import useInput from './../../composables/elements/useInput'
import useAddons from './../../composables/elements/useAddons'
import usePath from './../../composables/elements/usePath'
import useConditions from './../../composables/useConditions'
import useValue from './../../composables/elements/useValue'
import useData from './../../composables/elements/useData'
import useDefault from './../../composables/elements/useDefault'
import useNullValue from './../../composables/elements/useNullValue'
import useValidation from './../../composables/elements/useValidation'
import useLabel from './../../composables/elements/useLabel'
import useClasses from './../../composables/elements/useClasses'
import useColumns from './../../composables/elements/useColumns'
import useBaseElement from './../../composables/elements/useBaseElement'
import useGenericName from './../../composables/elements/useGenericName'
import useView from './../../composables/elements/useView'
import useComponents from './../../composables/elements/useComponents'
import useSlots from './../../composables/elements/useSlots'
import useDisabled from './../../composables/elements/useDisabled'
import useEvents from './../../composables/useEvents'
import useHandleInput from './../../composables/elements/useHandleInput'
import useEmpty from './../../composables/elements/useEmpty'
import useAutogrow from './../../composables/elements/useAutogrow'
import useWatchValue from './../../composables/elements/useWatchValue'

export default {
  name: 'TextareaElement',
  emits: ['change'],
  slots: ['label', 'info', 'description', 'error', 'message', 'before', 'between', 'after', 'addonBefore', 'addonAfter'],
  props: {
    name: { required: true, type: [String, Number], },
    inline: { required: false, type: [Boolean], default: false, },
    layout: { required: false, type: [String, Object, Boolean], default: 'ElementLayout' },
    addons: { required: false, type: [Object], default: () => ({}) },
    autogrow: { required: false, type: [Boolean], default: true },
    rows: { required: false, type: [Number], default: 3 },
    type: { required: false, type: [String], default: 'textarea' },
    addClass: { required: false, type: [String, Array, Object], default: null },
    overrideClasses: { required: false, type: [Object], default: () => ({}) },
    addClasses: { required: false, type: [Object], default: () => ({}) },
    columns: { required: false, type: [Object, String], default: null },
    overrideComponents: { required: false, type: [Object], default: () => ({}) },
    conditions: { required: false, type: [Array], default: () => ([]) },
    formatData: { required: false, type: [Function], default: null },
    formatLoad: { required: false, type: [Function], default: null },
    submit: { required: false, type: [Boolean], default: true },
    debounce: { required: false, type: [Number], default: null },
    default: { required: false, type: [String, Number], default: null },
    description: { required: false, type: [String], default: null },
    disabled: { required: false, type: [Boolean], default: false },
    floating: { required: false, type: [String], default: null },
    id: { required: false, type: [String], default: null },
    info: { required: false, type: [String], default: null },
    label: { required: false, type: [String, Object, Function], default: null },
    placeholder: { required: false, type: [String], default: null },
    readonly: { required: false, type: [Boolean], default: false },
    before: { required: false, type: [Object, String, Number], default: null },
    between: { required: false, type: [Object, String, Number], default: null },
    after: { required: false, type: [Object, String, Number], default: null },
    slots: { required: false, type: [Object], default: () => ({}) },
    rules: { required: false, type: [Array, String, Object], default: null },
    messages: { required: false, type: [Object], default: () => ({}) },
    displayError: { required: false, type: [Boolean], default: true },
    onChange: { required: false, type: [Function], default: null, },
  },
  setup(props, context) {
    const form$ = useForm$(props, context)
    const fieldId = useFieldId(props, context)
    const theme = useTheme(props, context)
    const layout = useLayout(props, context)
    const input = useInput(props, context)
    const addons = useAddons(props, context)
    const path = usePath(props, context)
    const disabled = useDisabled(props, context)
    const nullValue = useNullValue(props, context)

    const baseElement = useBaseElement(props, context, {
      form$: form$.form$,
    })

    const events = useEvents(props, context, {
      form$: form$.form$,
    }, {
      events: [
        'change'
      ],
    })

    const default_ = useDefault(props, context, {
      nullValue: nullValue.nullValue,
      form$: form$.form$,
      dataPath: path.dataPath,
    })

    const conditions = useConditions(props, context, {
      form$: form$.form$,
      path: path.path,
    })

    const validation = useValidation(props, context, {
      form$: form$.form$,
      path: path.path,
    })

    const value = useValue(props, context, {
      defaultValue: default_.defaultValue,
      dataPath: path.dataPath,
      form$: form$.form$,
    })

    const data = useData(props, context, {
      form$: form$.form$,
      available: conditions.available,
      value: value.value,
      resetValidators: validation.resetValidators,
      defaultValue: default_.defaultValue,
      nullValue: nullValue.nullValue,
    })

    const empty = useEmpty(props, context, {
      value: value.value,
      nullValue: nullValue.nullValue,
    })

    const label = useLabel(props, context, {
      form$: form$.form$,
    })

    const genericName = useGenericName(props, context, {
      label: label.label,
    })
    
    const components = useComponents(props, context, {
      theme: theme.theme,
      form$: form$.form$
    })

    const classes = useClasses(props, context, {
      form$: form$.form$,
      theme: theme.theme,
    })

    const columns = useColumns(props, context, {
      form$: form$.form$,
    })

    const view = useView(props, context, {
      available: conditions.available,
    })

    const slots = useSlots(props, context, {
      form$: form$.form$,
      components: components.components,
    }, {
      slots: [
        'label', 'info', 'description', 'error',
        'message', 'before', 'between', 'after',
        'addonBefore', 'addonAfter',
      ]
    })

    const handleInput = useHandleInput(props, context, {
      value: value.value,
    })

    const autogrow = useAutogrow(props, context, {
      form$: form$.form$,
      input: input.input,
      value: value.value,
    })

    useWatchValue(props, context, {
      form$: form$.form$,
      value: value.value,
      fire: events.fire,
      dirt: validation.dirt,
      validate: validation.validate,
    })

    onMounted(() => {
      validation.initMessageBag()
      validation.initValidation()
    })

    return {
      ...form$,
      ...fieldId,
      ...theme,
      ...layout,
      ...input,
      ...addons,
      ...path,
      ...conditions,
      ...value,
      ...validation,
      ...label,
      ...classes,
      ...columns,
      ...baseElement,
      ...genericName,
      ...view,
      ...components,
      ...slots,
      ...disabled,
      ...events,
      ...data,
      ...empty,
      ...default_,
      ...nullValue,
      ...handleInput,
      ...autogrow,
    }
  } 
}