import parse from './parse'
import replaceWildcards from './../../utils/replaceWildcards'
import compare from './../../utils/compare'
import Validator from './../../../src/services/validation/validator'
 
const Factory = class {

  constructor(element$) {
    this.element$ = element$
    this.form$ = element$.form$
  }

  get rules() {
    return Object.assign({}, this.form$.$laraform.services.validation.rules, this.form$.$laraform.rules)
  }
 
  makeAll(rules) {
    let parsedRules = this.parseRules(rules)

    if (parsedRules.length == 0) {
      return []
    }

    return _.map(parsedRules, (rule) => {
      return this.make(rule)
    })
  }
  
  make(rule) {
    let ruleClass = typeof rule == 'function' ? this.createRule(rule) : this.rules[rule.name]

    return new ruleClass(rule, {
      element$: this.element$
    })
  }

  createRule(inlineRule) {
    return class extends Validator {
      get defaultMessage() {
        let message = inlineRule(this.element$.value, this.form$, this)

        return message === true ? '' : message
      }

      check() {
        return inlineRule(this.element$.value, this.form$, this) === true
      }
    }
  }

  parseRules(rules) {
    if (!_.isArray(rules)) {
      rules = rules.split('|')
    }
    
    return _.flatMap(rules, (rule) => {
      if (typeof rule == 'function') {
        return rule
      }

      return this.isConditional(rule) ? this.parseConditional(rule) : this.parse(rule)
    })
  }

  parse(rule) {
    return parse(rule)
  }

  isConditional(rule) {
    return _.isPlainObject(rule)
  }

  parseConditional(rule) {
    let condition = _.values(rule)[0]
    let parsed = parse(_.keys(rule)[0])

    // simplified condition
    if (_.isArray(condition)) {
      parsed = Object.assign({}, parsed, {
        dependent: replaceWildcards(condition[0], this.element$.path),
        condition: this.createConditionFromArray(condition),
      })

    // custom condition callback
    } else {
      parsed = Object.assign({}, parsed, {
        dependent: null,
        condition: condition,
      })
    }

    return parsed
  } 

  createConditionFromArray(condition) {
    let field = replaceWildcards(condition[0], this.element$.path)
    let operator = condition.length == 3 ? condition[1] : '='
    let value = condition.length == 3 ? condition[2] : condition[1]

    return () => {
      var actual = _.get(this.form$.data, field)
      var expected = value

      if (_.isArray(expected)) {
        if (operator === '!=') {
          if (expected.indexOf(actual) !== -1) {
            return false
          }
        } else if (expected.indexOf(actual) === -1) {
          return false
        }
      } else {
        return compare(actual, expected, operator)
      }

      return true
    }
  }
}
 
export default Factory