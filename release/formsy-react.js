!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i(require("react")):"function"==typeof define&&define.amd?define(["react"],i):"object"==typeof exports?exports.Formsy=i(require("react")):t.Formsy=i(t.react)}(this,function(t){return function(t){function i(r){if(e[r])return e[r].exports;var s=e[r]={exports:{},id:r,loaded:!1};return t[r].call(s.exports,s,s.exports,i),s.loaded=!0,s.exports}var e={};return i.m=t,i.c=e,i.p="",i(0)}([function(t,i,e){(function(i){"use strict";var r=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},s=i.React||e(1),n={},u=e(6),o=e(7),a=e(3),l=e(2),d=e(5),h=e(4),F={};n.Mixin=l,n.HOC=d,n.Decorator=h,n.defaults=function(t){F=t},n.addValidationRule=function(t,i){u[t]=i},n.Form=s.createClass({displayName:"Form",getInitialState:function(){return{isValid:!0,isSubmitting:!1,canChange:!1}},getDefaultProps:function(){return{onSuccess:function(){},onError:function(){},onSubmit:function(){},onValidSubmit:function(){},onInvalidSubmit:function(){},onSubmitted:function(){},onValid:function(){},onInvalid:function(){},onChange:function(){},validationErrors:null,preventExternalInvalidation:!1}},childContextTypes:{formsy:s.PropTypes.object},getChildContext:function(){return{formsy:{attachToForm:this.attachToForm,detachFromForm:this.detachFromForm,validate:this.validate,isFormDisabled:this.isFormDisabled,isValidValue:function(t,i){return this.runValidation(t,i).isValid}.bind(this)}}},componentWillMount:function(){this.inputs={},this.model={}},componentDidMount:function(){this.validateForm()},componentWillUpdate:function(){this.prevInputKeys=Object.keys(this.inputs)},componentDidUpdate:function(){this.props.validationErrors&&this.setInputValidationErrors(this.props.validationErrors);var t=Object.keys(this.inputs);a.arraysDiffer(this.prevInputKeys,t)&&this.validateForm()},reset:function(t){this.setFormPristine(!0),this.resetModel(t)},submit:function(t){t&&t.preventDefault(),this.setFormPristine(!1),this.updateModel();var i=this.mapModel();this.props.onSubmit(i,this.resetModel,this.updateInputsWithError),this.state.isValid?this.props.onValidSubmit(i,this.resetModel,this.updateInputsWithError):this.props.onInvalidSubmit(i,this.resetModel,this.updateInputsWithError)},mapModel:function(){return this.props.mapping?this.props.mapping(this.model):o(Object.keys(this.model).reduce(function(t,i){for(var e=i.split("."),r=t;e.length;){var s=e.shift();r=r[s]=e.length?r[s]||{}:this.model[i]}return t}.bind(this),{}))},updateModel:function(){Object.keys(this.inputs).forEach(function(t){var i=this.inputs[t];this.model[t]=i.state._value}.bind(this))},resetModel:function(t){Object.keys(this.inputs).forEach(function(i){t&&t[i]?this.inputs[i].setValue(t[i]):this.inputs[i].resetValue()}.bind(this)),this.validateForm()},setInputValidationErrors:function(t){Object.keys(this.inputs).forEach(function(i,e){var r=this.inputs[i],s=[{_isValid:!(i in t),_validationError:"string"==typeof t[i]?[t[i]]:t[i]}];r.setState.apply(r,s)}.bind(this))},isChanged:function(){return!a.isSame(this.getPristineValues(),this.getCurrentValues())},getPristineValues:function(){var t=this.inputs;return Object.keys(t).reduce(function(i,e){var r=t[e];return i[e]=r.props.value,i},{})},updateInputsWithError:function(t){Object.keys(t).forEach(function(i,e){var r=this.inputs[i];if(!r)throw new Error("You are trying to update an input that does not exist. Verify errors object with input names. "+JSON.stringify(t));var s=[{_isValid:this.props.preventExternalInvalidation||!1,_externalError:"string"==typeof t[i]?[t[i]]:t[i]}];r.setState.apply(r,s)}.bind(this))},traverseChildrenAndRegisterInputs:function(t){return"object"!=typeof t||null===t?t:s.Children.map(t,function(t){return"object"!=typeof t||null===t?t:t.props&&t.props.name?s.cloneElement(t,{_attachToForm:this.attachToForm,_detachFromForm:this.detachFromForm,_validate:this.validate,_isFormDisabled:this.isFormDisabled,_isValidValue:function(t,i){return this.runValidation(t,i).isValid}.bind(this)},t.props&&t.props.children):s.cloneElement(t,{},this.traverseChildrenAndRegisterInputs(t.props&&t.props.children))},this)},isFormDisabled:function(){return this.props.disabled},getCurrentValues:function(){return Object.keys(this.inputs).reduce(function(t,i){var e=this.inputs[i];return t[i]=e.state._value,t}.bind(this),{})},setFormPristine:function(t){var i=this.inputs,e=Object.keys(i);this.setState({_formSubmitted:!t}),e.forEach(function(e,r){var s=i[e];s.setState({_formSubmitted:!t,_isPristine:t})}.bind(this))},validate:function(t){this.state.canChange&&this.props.onChange(this.getCurrentValues(),this.isChanged());var i=this.runValidation(t);t.setState({_isValid:i.isValid,_isRequired:i.isRequired,_validationError:i.error,_externalError:null},this.validateForm)},runValidation:function(t,i){var e=this.getCurrentValues(),r=t.props.validationErrors,s=t.props.validationError;i=2===arguments.length?i:t.state._value;var n=this.runRules(i,e,t._validations),u=this.runRules(i,e,t._requiredValidations);"function"==typeof t.validate&&(n.failed=t.validate()?[]:["failed"]);var o=Object.keys(t._requiredValidations).length?!!u.success.length:!1,a=!(n.failed.length||this.props.validationErrors&&this.props.validationErrors[t.props.name]);return{isRequired:o,isValid:o?!1:a,error:function(){if(a&&!o)return[];if(n.errors.length)return n.errors;if(this.props.validationErrors&&this.props.validationErrors[t.props.name])return"string"==typeof this.props.validationErrors[t.props.name]?[this.props.validationErrors[t.props.name]]:this.props.validationErrors[t.props.name];if(o){var i=r[u.success[0]];return i?[i]:null}return n.failed.length?n.failed.map(function(t){return r[t]?r[t]:s}).filter(function(t,i,e){return e.indexOf(t)===i}):void 0}.call(this)}},runRules:function(t,i,e){var r={errors:[],failed:[],success:[]};return Object.keys(e).length&&Object.keys(e).forEach(function(s){if(u[s]&&"function"==typeof e[s])throw new Error("Formsy does not allow you to override default validations: "+s);if(!u[s]&&"function"!=typeof e[s])throw new Error("Formsy does not have the validation rule: "+s);if("function"==typeof e[s]){var n=e[s](i,t);return void("string"==typeof n?(r.errors.push(n),r.failed.push(s)):n||r.failed.push(s))}if("function"!=typeof e[s]){var n=u[s](i,t,e[s]);return void("string"==typeof n?(r.errors.push(n),r.failed.push(s)):n?r.success.push(s):r.failed.push(s))}return r.success.push(s)}),r},validateForm:function(){var t,i=this.inputs,e=Object.keys(i),r=function(){t=e.every(function(t){return i[t].state._isValid}.bind(this)),this.setState({isValid:t}),t?this.props.onValid():this.props.onInvalid(),this.setState({canChange:!0})}.bind(this);e.forEach(function(t,s){var n=i[t],u=this.runValidation(n);u.isValid&&n.state._externalError&&(u.isValid=!1),n.setState({_isValid:u.isValid,_isRequired:u.isRequired,_validationError:u.error,_externalError:!u.isValid&&n.state._externalError?n.state._externalError:null},s===e.length-1?r:null)}.bind(this)),!e.length&&this.isMounted()&&this.setState({canChange:!0})},attachToForm:function(t){this.inputs[t.props.name]=t,this.model[t.props.name]=t.state._value,this.validate(t)},detachFromForm:function(t){delete this.inputs[t.props.name],delete this.model[t.props.name]},render:function(){return s.createElement("form",r({},this.props,{onSubmit:this.submit}),this.props.children)}}),i.exports||i.module||i.define&&i.define.amd||(i.Formsy=n),t.exports=n}).call(i,function(){return this}())},function(i,e){i.exports=t},function(t,i,e){(function(i){"use strict";var r=e(3),s=i.React||e(1),n=function(t){return"string"==typeof t?t.split(/\,(?![^{\[]*[}\]])/g).reduce(function(t,i){var e=i.split(":"),r=e.shift();if(e=e.map(function(t){try{return JSON.parse(t)}catch(i){return t}}),e.length>1)throw new Error("Formsy does not support multiple args on string validations. Use object format of validations instead.");return t[r]=e.length?e[0]:!0,t},{}):t||{}};t.exports={getInitialState:function(){return{_value:this.props.value,_isRequired:!1,_isValid:!0,_isPristine:!0,_pristineValue:this.props.value,_validationError:[],_externalError:null,_formSubmitted:!1}},contextTypes:{formsy:s.PropTypes.object},getDefaultProps:function(){return{validationError:"",validationErrors:{}}},componentWillMount:function(){var t=function(){this.setValidations(this.props.validations,this.props.required),this.context.formsy.attachToForm(this)}.bind(this);if(!this.props.name)throw new Error("Form Input requires a name property when used");t()},componentWillReceiveProps:function(t){this.setValidations(t.validations,t.required)},componentDidUpdate:function(t){r.isSame(this.props.value,t.value)||this.setValue(this.props.value),r.isSame(this.props.validations,t.validations)&&r.isSame(this.props.required,t.required)||this.context.formsy.validate(this)},componentWillUnmount:function(){this.context.formsy.detachFromForm(this)},setValidations:function(t,i){this._validations=n(t)||{},this._requiredValidations=i===!0?{isDefaultRequiredValue:!0}:n(i)},setValue:function(t){this.setState({_value:t,_isPristine:!1},function(){this.context.formsy.validate(this)}.bind(this))},resetValue:function(){this.setState({_value:this.state._pristineValue,_isPristine:!0},function(){this.context.formsy.validate(this)})},getValue:function(){return this.state._value},hasValue:function(){return""!==this.state._value},getErrorMessage:function(){var t=this.getErrorMessages();return t.length?t[0]:null},getErrorMessages:function(){return!this.isValid()||this.showRequired()?this.state._externalError||this.state._validationError||[]:[]},isFormDisabled:function(){return this.context.formsy.isFormDisabled()},isValid:function(){return this.state._isValid},isPristine:function(){return this.state._isPristine},isFormSubmitted:function(){return this.state._formSubmitted},isRequired:function(){return!!this.props.required},showRequired:function(){return this.state._isRequired},showError:function(){return!this.showRequired()&&!this.isValid()},isValidValue:function(t){return this.context.formsy.isValidValue.call(null,this,t)}}}).call(i,function(){return this}())},function(t,i){"use strict";t.exports={arraysDiffer:function(t,i){var e=!1;return t.length!==i.length?e=!0:t.forEach(function(t,r){this.isSame(t,i[r])||(e=!0)},this),e},objectsDiffer:function(t,i){var e=!1;return Object.keys(t).length!==Object.keys(i).length?e=!0:Object.keys(t).forEach(function(r){this.isSame(t[r],i[r])||(e=!0)},this),e},isSame:function(t,i){return typeof t!=typeof i?!1:Array.isArray(t)?!this.arraysDiffer(t,i):"object"==typeof t&&null!==t&&null!==i?!this.objectsDiffer(t,i):t===i}}},function(t,i,e){(function(i){"use strict";var r=i.React||e(1),s=e(2);t.exports=function(){return function(t){return r.createClass({mixins:[s],render:function(){return r.createElement(t,{setValidations:this.setValidations,setValue:this.setValue,resetValue:this.resetValue,getValue:this.getValue,hasValue:this.hasValue,getErrorMessage:this.getErrorMessage,getErrorMessages:this.getErrorMessages,isFormDisabled:this.isFormDisabled,isValid:this.isValid,isPristine:this.isPristine,isFormSubmitted:this.isFormSubmitted,isRequired:this.isRequired,showRequired:this.showRequired,showError:this.showError,isValidValue:this.isValidValue})}})}}}).call(i,function(){return this}())},function(t,i,e){(function(i){"use strict";var r=i.React||e(1),s=e(2);t.exports=function(t){return r.createClass({mixins:[s],render:function(){return r.createElement(t,{setValidations:this.setValidations,setValue:this.setValue,resetValue:this.resetValue,getValue:this.getValue,hasValue:this.hasValue,getErrorMessage:this.getErrorMessage,getErrorMessages:this.getErrorMessages,isFormDisabled:this.isFormDisabled,isValid:this.isValid,isPristine:this.isPristine,isFormSubmitted:this.isFormSubmitted,isRequired:this.isRequired,showRequired:this.showRequired,showError:this.showError,isValidValue:this.isValidValue})}})}}).call(i,function(){return this}())},function(t,i){"use strict";var e=function(t){return null!==t&&void 0!==t},r=function(t){return""===t},s={isDefaultRequiredValue:function(t,i){return void 0===i||""===i},isExisty:function(t,i){return e(i)},matchRegexp:function(t,i,s){return!e(i)||r(i)||s.test(i)},isUndefined:function(t,i){return void 0===i},isEmptyString:function(t,i){return r(i)},isEmail:function(t,i){return s.matchRegexp(t,i,/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i)},isUrl:function(t,i){return s.matchRegexp(t,i,/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)},isTrue:function(t,i){return i===!0},isFalse:function(t,i){return i===!1},isNumeric:function(t,i){return"number"==typeof i?!0:s.matchRegexp(t,i,/^[-+]?(\d*[.])?\d+$/)},isAlpha:function(t,i){return s.matchRegexp(t,i,/^[a-zA-Z]+$/)},isWords:function(t,i){return s.matchRegexp(t,i,/^[a-zA-Z\s]+$/)},isSpecialWords:function(t,i){return s.matchRegexp(t,i,/^[a-zA-Z\s\u00C0-\u017F]+$/)},isLength:function(t,i,s){return!e(i)||r(i)||i.length===s},equals:function(t,i,s){return!e(i)||r(i)||i==s},equalsField:function(t,i,e){return i==t[e]},maxLength:function(t,i,r){return!e(i)||i.length<=r},minLength:function(t,i,s){return!e(i)||r(i)||i.length>=s}};t.exports=s},function(t,i){t.exports=function(t){return Object.keys(t).reduce(function(i,e){var r=e.match(/[^\[]*/i),s=e.match(/\[.*?\]/g)||[];s=[r[0]].concat(s).map(function(t){return t.replace(/\[|\]/g,"")});for(var n=i;s.length;){var u=s.shift();u in n?n=n[u]:(n[u]=s.length?isNaN(s[0])?{}:[]:t[e],n=n[u])}return i},{})}}])});
//# sourceMappingURL=formsy-react.js.map