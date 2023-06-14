(()=>{"use strict";var t=document.querySelector(".page"),e={editProfile:t.querySelector(".profile__edit-button"),changeAvatar:t.querySelector(".profile__edit-avatar-button"),addCard:t.querySelector(".profile__add-button")},r=".default-card-template",n={cardSelector:".card",nameSelector:".card__name",imageSelector:".card__image",likeBtnSelector:".card__like-button",likeBtnActiveClass:"card__like-button_active",likeNumSelector:".card__likes-number",removeBtnSelector:".card__remove-button"},o={popupClass:"popup",popupSelector:".popup",openedPopupClass:"popup_opened",imageSelector:".popup__image",captionSelector:".popup__figcaption",closePopupBtnClass:"popup__close-button",popupEditProfileSelector:".popup_type_edit-profile",popupChangeAvatarSelector:".popup_type_edit-avatar",popupAddCardSelector:".popup_type_add-place",popupShowImageSelector:".popup_type_enlarge-image"},i={editProfile:t.querySelector(".form_type_profile-info"),changeAvatar:t.querySelector(".form_type_edit-avatar"),addCard:t.querySelector(".form_type_place-info")},a={formSelector:".form",inputSelector:".form__input",submitBtnClass:"form__submit",submitBtnSelector:".form__submit",inactiveBtnClass:"form__submit_inactive",inputErrorClass:"form__input_type_invalid",errorVisibleClass:"form__input-error_visible"},l="Сохранить",c="Сохранение...",u=function(t,e,r,n){e.querySelector(a.submitBtnSelector).textContent=t?r:n},s=function(t){console.log("Error: ",t)};function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function p(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,l=[],c=!0,u=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(l.push(n.value),l.length!==e);c=!0);}catch(t){u=!0,o=t}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(u)throw o}}return l}}(t,e)||function(t,e){if(t){if("string"==typeof t)return h(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function y(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==f(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===f(o)?o:String(o)),n)}var o}var d=function(){function t(e){var r=e.baseUrl,n=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=r,this._headers=n}var e,r;return e=t,(r=[{key:"_checkResult",value:function(t){return t.ok?t.json():Promise.reject(t.status)}},{key:"getProfile",value:function(){var t=this;return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then((function(e){return t._checkResult(e)}))}},{key:"getInitialCards",value:function(){var t=this;return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then((function(e){return t._checkResult(e)}))}},{key:"patchProfile",value:function(t){var e=this,r=p(t,2),n=r[0],o=r[1];return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:n,about:o})}).then((function(t){return e._checkResult(t)}))}},{key:"patchAvatar",value:function(t){var e=this,r=p(t,1)[0];return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:r})}).then((function(t){return e._checkResult(t)}))}},{key:"postCard",value:function(t){var e=this,r=p(t,2),n=r[0],o=r[1];return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:n,link:o})}).then((function(t){return e._checkResult(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards/").concat(t),{method:"DELETE",headers:this._headers}).then((function(t){return e._checkResult(t)}))}},{key:"putLike",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(t,"/"),{method:"PUT",headers:this._headers}).then((function(t){return e._checkResult(t)}))}},{key:"deleteLike",value:function(t){var e=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(t,"/"),{method:"DELETE",headers:this._headers}).then((function(t){return e._checkResult(t)}))}}])&&y(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function v(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==m(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==m(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===m(o)?o:String(o)),n)}var o}var b=function(){function t(e,r,n,o,i,a,l){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.userId=r,this.id=e._id,this.likes=e.likes,this._link=e.link,this._name=e.name,this._ownerId=e.owner._id,this._templateSelector=n,this._cardSelectors=o,this._imageClickHandler=i,this._likeClickHandler=a,this._deleteClickHandler=l}var e,r;return e=t,(r=[{key:"_getElement",value:function(){return this._cardElement=document.querySelector(this._templateSelector).content.querySelector(this._cardSelectors.cardSelector).cloneNode(!0),this._cardElement}},{key:"_setEventListeners",value:function(){var t=this;this._imageElement.addEventListener("click",(function(){t._imageClickHandler(t._name,t._link)})),this._likeButtonElement.addEventListener("click",(function(){t._likeClickHandler(t)})),this._deleteButtonElement.addEventListener("click",(function(){t._deleteClickHandler(t)}))}},{key:"hasMyLike",value:function(){var t=this;return this.likes.some((function(e){return e._id===t.userId}))}},{key:"renderLikesData",value:function(){this.hasMyLike()?this._likeButtonElement.classList.add(this._cardSelectors.likeBtnActiveClass):this._likeButtonElement.classList.remove(this._cardSelectors.likeBtnActiveClass),this._likesCounter.textContent=this.likes.length}},{key:"create",value:function(){return this._cardElement=this._getElement(),this._nameElement=this._cardElement.querySelector(this._cardSelectors.nameSelector),this._imageElement=this._cardElement.querySelector(this._cardSelectors.imageSelector),this._likeButtonElement=this._cardElement.querySelector(this._cardSelectors.likeBtnSelector),this._deleteButtonElement=this._cardElement.querySelector(this._cardSelectors.removeBtnSelector),this._likesCounter=this._cardElement.querySelector(this._cardSelectors.likeNumSelector),this._imageElement.src=this._link,this._imageElement.alt=this._name,this._nameElement.textContent=this._name,this._ownerId!==this.userId&&this._deleteButtonElement.remove(),this.renderLikesData(),this._setEventListeners(),this._cardElement}},{key:"delete",value:function(){this._cardElement.remove(),this._cardElement=null}}])&&v(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function S(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==_(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==_(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===_(o)?o:String(o)),n)}var o}var g=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._form=e,this._selectors=r,this._submitBtn=this._form.querySelector(this._selectors.submitBtnSelector),this._inputList=Array.from(this._form.querySelectorAll(this._selectors.inputSelector))}var e,r;return e=t,(r=[{key:"_showInputError",value:function(t){var e=this._form.querySelector(".".concat(t.name,"-error"));t.classList.add(this._selectors.inputErrorClass),e.textContent=t.validationMessage,e.classList.add(this._selectors.errorVisibleClass)}},{key:"_hideInputError",value:function(t){var e=this._form.querySelector(".".concat(t.name,"-error"));t.classList.remove(this._selectors.inputErrorClass),e.textContent="",e.classList.remove(this._selectors.errorVisibleClass)}},{key:"_validateInput",value:function(t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"_hasInvalidInput",value:function(t){return t.some((function(t){return!t.validity.valid}))}},{key:"_toggleButtonState",value:function(t){this._hasInvalidInput(t)?(this._submitBtn.classList.add(this._selectors.inactiveBtnClass),this._submitBtn.disabled=!0):(this._submitBtn.classList.remove(this._selectors.inactiveBtnClass),this._submitBtn.disabled=!1)}},{key:"enableValidation",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._validateInput(e),t._toggleButtonState(t._inputList)}))}))}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(this._inputList),this._inputList.forEach((function(e){t._hideInputError(e)}))}}])&&S(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function E(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==k(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==k(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===k(o)?o:String(o)),n)}var o}var w=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._container=document.querySelector(e),this._renderer=r}var e,r;return e=t,(r=[{key:"addItem",value:function(t){this._container.prepend(t)}},{key:"renderItems",value:function(t){var e=this;t.reverse().forEach((function(t){var r=e._renderer(t);e.addItem(r)}))}}])&&E(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function C(t){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(t)}function P(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==C(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==C(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===C(o)?o:String(o)),n)}var o}var j=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._popupSelectors=r,this._handleEscClose=this._handleEscClose.bind(this),this._handleClickClose=this._handleClickClose.bind(this)}var e,r;return e=t,(r=[{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_handleClickClose",value:function(t){(t.target===this._popup||t.target.classList.contains(this._popupSelectors.closePopupBtnClass))&&this.close()}},{key:"open",value:function(){this._popup.classList.add(this._popupSelectors.openedPopupClass),document.addEventListener("keydown",this._handleEscClose),this._popup.addEventListener("click",this._handleClickClose)}},{key:"close",value:function(){this._popup.classList.remove(this._popupSelectors.openedPopupClass),document.removeEventListener("keydown",this._handleEscClose),this._popup.removeEventListener("click",this._handleClickClose)}}])&&P(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function L(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==O(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==O(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===O(o)?o:String(o)),n)}var o}function I(){return I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=T(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},I.apply(this,arguments)}function A(t,e){return A=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},A(t,e)}function B(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function T(t){return T=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},T(t)}var q=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&A(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=T(n);if(o){var r=T(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===O(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return B(t)}(this,t)});function a(t,e,r,n){var o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(o=i.call(this,t,e))._formSelectors=r,o._formElement=o._popup.querySelector(o._formSelectors.formSelector),o._inputList=o._formElement.querySelectorAll(o._formSelectors.inputSelector),o._formSubmitHandler=n,o._handleClickSubmit=o._handleClickSubmit.bind(B(o)),o}return e=a,(r=[{key:"_getInputValues",value:function(){var t=this;return this._inputValues=[],this._inputList.forEach((function(e){t._inputValues.push(e.value)})),this._inputValues}},{key:"setInputValues",value:function(t){this._inputList.forEach((function(e){e.value=t[e.name]}))}},{key:"_handleClickSubmit",value:function(t){t.preventDefault(),this._formSubmitHandler(this._getInputValues())}},{key:"open",value:function(){I(T(a.prototype),"open",this).call(this),this._formElement.addEventListener("submit",this._handleClickSubmit)}},{key:"close",value:function(){I(T(a.prototype),"close",this).call(this),this._formElement.reset(),this._formElement.removeEventListener("submit",this._handleClickSubmit)}}])&&L(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(j);function R(t){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},R(t)}function U(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==R(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==R(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===R(o)?o:String(o)),n)}var o}function x(){return x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=D(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},x.apply(this,arguments)}function V(t,e){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},V(t,e)}function D(t){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},D(t)}var H=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&V(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=D(n);if(o){var r=D(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===R(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t,e){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,t,e))._image=r._popup.querySelector(r._popupSelectors.imageSelector),r._figcaption=r._popup.querySelector(r._popupSelectors.captionSelector),r}return e=a,(r=[{key:"open",value:function(t,e){x(D(a.prototype),"open",this).call(this),this._figcaption.textContent=t,this._image.src=e,this._image.alt=t}}])&&U(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(j);function M(t){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(t)}function N(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==M(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==M(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===M(o)?o:String(o)),n)}var o}function J(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,l=[],c=!0,u=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(l.push(n.value),l.length!==e);c=!0);}catch(t){u=!0,o=t}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(u)throw o}}return l}}(t,e)||function(t,e){if(t){if("string"==typeof t)return G(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?G(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var $=new(function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=document.querySelector(e.nameSelector),this._about=document.querySelector(e.aboutSelector),this._avatar=document.querySelector(e.avatarSelector)}var e,r;return e=t,(r=[{key:"getUserInfo",value:function(){return{"profile-name-input":this._name.textContent,"profile-text-input":this._about.textContent}}},{key:"setUserInfo",value:function(t){this._name.textContent=t.name,this._about.textContent=t.about,this.id=t._id}},{key:"setAvatar",value:function(t){this._avatar.src=t.avatar}}])&&N(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}())({nameSelector:".profile__name",aboutSelector:".profile__text",avatarSelector:".profile__avatar-image"}),z=new g(i.editProfile,a),F=new g(i.changeAvatar,a),K=new g(i.addCard,a);z.enableValidation(),F.enableValidation(),K.enableValidation();var Q=new q(o.popupEditProfileSelector,o,a,(function(t){u(!0,i.editProfile,c,l),tt.patchProfile(t).then((function(t){$.setUserInfo(t),Q.close()})).catch((function(t){s(t)})).finally((function(){u(!1,i.editProfile,c,l)}))})),W=new q(o.popupChangeAvatarSelector,o,a,(function(t){u(!0,i.changeAvatar,c,l),tt.patchAvatar(t).then((function(t){$.setAvatar(t),W.close()})).catch((function(t){s(t)})).finally((function(){u(!1,i.changeAvatar,c,l)}))})),X=new q(o.popupAddCardSelector,o,a,(function(t){u(!0,i.changeAvatar,c,l),tt.postCard(t).then((function(t){var e=et(t);rt.addItem(e),X.close()})).catch((function(t){s(t)})).finally((function(){u(!1,i.changeAvatar,c,l)}))})),Y=new H(o.popupShowImageSelector,o),Z=function(t,e){t===Q&&t.setInputValues($.getUserInfo()),e.resetValidation(),t.open()};e.editProfile.addEventListener("click",(function(){Z(Q,z)})),e.changeAvatar.addEventListener("click",(function(){Z(W,F)})),e.addCard.addEventListener("click",(function(){Z(X,K)}));var tt=new d({baseUrl:"https://nomoreparties.co/v1/plus-cohort-24",headers:{authorization:"9e2d263a-3d5a-40f2-a16e-27e8711676de","Content-Type":"application/json"}});function et(t){return new b(t,$.id,r,n,it,nt,ot).create()}var rt=new w(".cards",et),nt=function(t){t.hasMyLike()?tt.deleteLike(t.id).then((function(e){t.likes=e.likes,t.renderLikesData()})).catch((function(t){s(t)})):tt.putLike(t.id).then((function(e){t.likes=e.likes,t.renderLikesData()})).catch((function(t){s(t)}))},ot=function(t){tt.deleteCard(t.id).then((function(){t.delete()})).catch((function(t){s(t)}))},it=function(t,e){Y.open(t,e)};Promise.all([tt.getProfile(),tt.getInitialCards()]).then((function(t){var e=J(t,2),r=e[0],n=e[1];$.setUserInfo(r),$.setAvatar(r),rt.renderItems(n)})).catch((function(t){var e=J(t,2),r=e[0],n=e[1];s(r),s(n)}))})();