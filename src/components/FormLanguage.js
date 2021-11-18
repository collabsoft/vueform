import { computed, toRefs } from 'composition-api'
import useFormComponent from './../composables/useFormComponent'

export default {
  name: 'FormLanguage',
  emits: ['select'],
  props: {
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  setup(props, context)
  {  
    const { code } = toRefs(props)

    // ============ DEPENDENCIES ============

    const {
      form$,
      theme,
      classes,
      mainClass,
      templates,
      defaultClasses,
    } = useFormComponent(props, context, {}, {
      addClasses: [
        ['wrapper', 'wrapper_active', computed(() => selected.value)],
        ['wrapper', 'wrapper_inactive', computed(() => !selected.value)],
      ]
    })

    // ============== COMPUTED ==============

    /**
     * The language code of the currently selected language (2 letters).
     * 
     * @type {string}
     */
    const selectedLanguage = computed(() => {
      return form$.value.selectedLanguage
    })

    /**
     * Whether the current language is the selected one.
     * 
     * @type {boolean}
     */
    const selected = computed(() => {
      return selectedLanguage.value == code.value
    })

    // =============== METHODS ==============

    /**
     * Select language.
     * 
     * @return {void}
     */
    const select = () => {
      context.emit('select', code.value)
    }

    return {
      form$,
      theme,
      selectedLanguage,
      selected,
      classes,
      mainClass,
      defaultClasses,
      templates,
      select,
    }
  },
}