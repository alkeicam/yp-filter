!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.ypfilter=n():e.ypfilter=n()}(this,(function(){return function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=0)}([function(e,n){class r{canHandle(e){return this.key==e}apply(e,n){throw new Error("Method must be implemented")}}class t extends r{constructor(e){super(),this.key="allOf"}apply(e,n){var r=e.every(e=>n.includes(e));return{e:this.key+"condition check failed ("+e+","+n+")",v:r}}}class o extends r{constructor(e){super(),this.key="anyOf"}apply(e,n){var r=e.some(e=>n.includes(e));return{e:this.key+"condition check failed ("+e+","+n+")",v:r}}}class s extends r{constructor(e){super(),this.key="noneOf"}apply(e,n){var r=!e.some(e=>n.includes(e));return{e:this.key+"condition check failed ("+e+","+n+")",v:r}}}class i{constructor(e){this.operands=[],this.handlers=[new t,new o,new s]}allOf(e){return this.operands.push({k:"allOf",v:e}),this}anyOf(e){return this.operands.push({k:"anyOf",v:e}),this}noneOf(e){return this.operands.push({k:"noneOf",v:e}),this}_findHandler(e){var n=void 0;return this.handlers.forEach(r=>{r.canHandle(e)&&(n=r)}),n}check(e){var n=this,r=!0,t=[];return this.operands.forEach(o=>{var s=n._findHandler(o.k).apply(e,o.v);r=r&&s.v,s.v||t.push(s.e)}),{r:r,e:t}}}e.exports={YpFilter:new class{constructor(e){}create(){return new i}}({}),Handler:r,AllOfHandler:t,AnyOfHandler:o,NoneOfHandler:s}}])}));