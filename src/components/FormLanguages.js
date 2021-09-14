import { computed, toRefs } from 'composition-api'
import useFormComponent from './../composables/useFormComponent'

export default {
  name: 'FormLanguages',
  emits: ['changeLanguage'],
  setup(props, context)
  {  
    // ============ DEPENDENCIES ============

    const {
      form$,
      theme,
      classes,
      mainClass,
      components,
      defaultClasses,
    } = useFormComponent(props, context)

    // ============== COMPUTED ==============

    /**
     * The ISO 639-1 code of the currently selected language (2 letters).
     * 
     * @type {string}
     */
    const language = computed(() => {
      return form$.value.selectedLanguage
    })

    /**
     * The available languages.
     * 
     * @type {object}
     */
    const languages = computed(() => {
      return form$.value.options.languages
    })

    // =============== METHODS ==============

    /**
     * Select a language.
     * 
     * @param {string} code* the language code to be selected
     * @returns {void}
     */
    const select = (code) => {
      form$.value.setLanguage(code)
    }

    /**
     * Handles `select` event.
     *
     * @param {string} code* the language code to be selected
     * @returns {void}
     * @private
     */
    const handleSelect = (code) => {
      select(code)
    }

    return {
      form$,
      theme,
      classes,
      mainClass,
      defaultClasses,
      components,
      language,
      languages,
      select,
      handleSelect,
    }
  },
}