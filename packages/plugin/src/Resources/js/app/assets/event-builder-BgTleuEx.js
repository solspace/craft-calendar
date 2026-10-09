import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,g as c,i as l,j as u,n as d,r as f,s as p,t as m,v as h,y as g}from"./localization-Dt_HqhpZ.js";import{A as _,C as v,D as y,O as b,S as x,_ as S,a as ee,b as te,c as ne,d as C,f as re,g as w,h as T,i as ie,l as ae,m as oe,n as se,o as ce,p as le,r as ue,s as de,t as fe,u as pe,v as me,w as he,x as ge,y as _e}from"./calendar-preview.operations-kxAQQpA7.js";import{h as ve,l as ye,m as be,p as xe}from"./calendar.events-DxgmBNw7.js";import{t as Se}from"./interaction-D2VE812o.js";import{a as Ce,b as we,c as E,d as Te,f as Ee,h as De,i as Oe,m as D,n as ke,o as Ae,p as O,r as je,s as Me,t as k,v as Ne,y as A}from"./components-CefPxcP5.js";import{t as j}from"./dropdown-a6jWzpVl.js";function Pe(e,t){let n=p(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=D(n.getDate(),2),t=D(n.getMonth()+1,2);a=`${D(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=D(Math.trunc(t/60),2),r=D(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=D(n.getHours(),2),r=D(n.getMinutes(),2),i=D(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Fe=u((t=>{var n=e();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Ie=u(((e,t)=>{t.exports=Fe()})),Le=i(n()),M=i(e(),1),Re=Ie();function ze(e){e()}function Be(){let e=null,t=null;return{clear(){e=null,t=null},notify(){ze(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Ve={notify(){},get:()=>[]};function He(e,t){let n,r=Ve,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Be())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Ve)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Ue=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,We=typeof navigator<`u`&&navigator.product===`ReactNative`,Ge=Ue||We?M.useLayoutEffect:M.useEffect,Ke=Symbol.for(`react-redux-context`),qe=typeof globalThis<`u`?globalThis:{};function Je(){if(!M.createContext)return{};let e=qe[Ke]??(qe[Ke]=new Map),t=e.get(M.createContext);return t||(t=M.createContext(null),e.set(M.createContext,t)),t}var N=Je();function Ye(e){let{children:t,context:n,serverState:r,store:i}=e,a=M.useMemo(()=>{let e=He(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=M.useMemo(()=>i.getState(),[i]);Ge(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||N;return M.createElement(s.Provider,{value:a},t)}var Xe=Ye;function Ze(e=N){return function(){return M.useContext(e)}}var Qe=Ze();function $e(e=N){let t=e===N?Qe:Ze(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var et=$e();function tt(e=N){let t=e===N?et:$e(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var P=tt(),nt=(e,t)=>e===t;function rt(e=N){let t=e===N?Qe:Ze(e),n=(e,n={})=>{let{equalityFn:r=nt}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();M.useRef(!0);let s=M.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Re.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return M.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var F=rt(),it=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`[data-element-editor]`).data(`elementEditor`)??t(e).closest(`form`).data(`elementEditor`)},at=async e=>{let t=it(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},ot=new WeakSet,st=e=>{let t=window.jQuery;if(ot.has(e)||!t)return;ot.add(e);let n=Number(e.dataset.calendarId),r=e.querySelector(`button.menubtn`),i=r?.querySelector(`.inline-flex`),a=i?.innerHTML,o=!1;t(e).on(`change`,async()=>{let s=Number(t(e).data(`value`));if(i&&a&&(i.innerHTML=a),t(e).data(`value`,n),e.querySelectorAll(`[data-value]`).forEach(e=>{e.classList.toggle(`sel`,Number(e.dataset.value)===n)}),o||s===n||!s)return;o=!0,r&&(r.disabled=!0);let c=it(e),l=!1;try{let t=await at(e);c?.pause(),l=!!c;let n=new Craft.CpScreenSlideout(`calendar/event-calendar/edit`,{params:{eventId:t,siteId:Number(e.dataset.siteId),targetCalendarId:s}}),i=!1;n.on(`submit`,e=>{let t=e?.response?.data?.url;i=!0,window.location.assign(t||window.location.href)}),n.on(`close`,()=>{!i&&l&&c?.resume(),o=!1,r&&(r.disabled=!1)})}catch{l&&c?.resume(),o=!1,r&&(r.disabled=!1),Craft.cp.displayError(Craft.t(`calendar`,`Couldn’t open the calendar mapping.`))}})},ct=e=>{let t=JSON.parse(e.dataset.populated||`{}`),n=Array.from(e.querySelectorAll(`select[data-field-mapping]`)),r=n.map(e=>e.value).filter(Boolean),i=r.length!==new Set(r).size,a=new Set(r),o=Object.entries(t).filter(([e])=>!a.has(e)),s=e.querySelector(`[data-unmapped-warning]`),c=e.querySelector(`[data-unmapped-fields]`),l=e.querySelector(`[data-mapping-error]`);s&&(s.hidden=o.length===0),l&&(l.hidden=!i),c&&c.replaceChildren(...o.map(([,e])=>{let t=document.createElement(`li`);return t.textContent=e,t})),n.forEach(e=>{e.setCustomValidity(i?Craft.t(`calendar`,`Each source field can only be mapped once.`):``)})},lt=e=>{ot.has(e)||(ot.add(e),e.addEventListener(`change`,()=>ct(e)),ct(e))},ut=()=>!1;function I(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var dt=typeof Symbol==`function`&&Symbol.observable||`@@observable`,ft=()=>Math.random().toString(36).substring(7).split(``).join(`.`),pt={INIT:`@@redux/INIT${ft()}`,REPLACE:`@@redux/REPLACE${ft()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${ft()}`};function mt(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function ht(e,t,n){if(typeof e!=`function`)throw Error(I(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(I(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(I(1));return n(ht)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(I(3));return i}function d(e){if(typeof e!=`function`)throw Error(I(4));if(c)throw Error(I(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(I(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!mt(e))throw Error(I(7));if(e.type===void 0)throw Error(I(8));if(typeof e.type!=`string`)throw Error(I(17));if(c)throw Error(I(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(I(10));r=e,f({type:pt.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(I(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[dt](){return this}}}return f({type:pt.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[dt]:m}}function gt(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:pt.INIT})===void 0)throw Error(I(12));if(n(void 0,{type:pt.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(I(13))})}function _t(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{gt(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(I(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function vt(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function yt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(I(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=vt(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function bt(e){return mt(e)&&`type`in e&&typeof e.type==`string`}var xt=Symbol.for(`immer-nothing`),St=Symbol.for(`immer-draftable`),L=Symbol.for(`immer-state`);function R(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var z=Object,B=z.getPrototypeOf,Ct=`constructor`,wt=`prototype`,Tt=`configurable`,Et=`enumerable`,Dt=`writable`,Ot=`value`,V=e=>!!e&&!!e[L];function H(e){return e?jt(e)||Rt(e)||!!e[St]||!!e[Ct]?.[St]||zt(e)||Bt(e):!1}var kt=z[wt][Ct].toString(),At=new WeakMap;function jt(e){if(!e||!Vt(e))return!1;let t=B(e);if(t===null||t===z[wt])return!0;let n=z.hasOwnProperty.call(t,Ct)&&t[Ct];if(n===Object)return!0;if(!U(n))return!1;let r=At.get(n);return r===void 0&&(r=Function.toString.call(n),At.set(n,r)),r===kt}function Mt(e,t,n=!0){Nt(e)===0?(n?Reflect.ownKeys(e):z.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function Nt(e){let t=e[L];return t?t.type_:Rt(e)?1:zt(e)?2:Bt(e)?3:0}var Pt=(e,t,n=Nt(e))=>n===2?e.has(t):z[wt].hasOwnProperty.call(e,t),Ft=(e,t,n=Nt(e))=>n===2?e.get(t):e[t],It=(e,t,n,r=Nt(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Lt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Rt=Array.isArray,zt=e=>e instanceof Map,Bt=e=>e instanceof Set,Vt=e=>typeof e==`object`,U=e=>typeof e==`function`,Ht=e=>typeof e==`boolean`;function Ut(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var W=e=>e.copy_||e.base_,Wt=e=>e.modified_?e.copy_:e.base_;function Gt(e,t){if(zt(e))return new Map(e);if(Bt(e))return new Set(e);if(Rt(e))return Array[wt].slice.call(e);let n=jt(e);if(t===!0||t===`class_only`&&!n){let t=z.getOwnPropertyDescriptors(e);delete t[L];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[Dt]===!1&&(a[Dt]=!0,a[Tt]=!0),(a.get||a.set)&&(t[i]={[Tt]:!0,[Dt]:!0,[Et]:a[Et],[Ot]:e[i]})}return z.create(B(e),t)}else{let t=B(e);if(t!==null&&n)return{...e};let r=z.create(t);return z.assign(r,e)}}function Kt(e,t=!1){return Yt(e)||V(e)||!H(e)?e:(Nt(e)>1&&z.defineProperties(e,{set:Jt,add:Jt,clear:Jt,delete:Jt}),z.freeze(e),t&&Mt(e,(e,t)=>{Kt(t,!0)},!1),e)}function qt(){R(2)}var Jt={[Ot]:qt};function Yt(e){return e===null||!Vt(e)?!0:z.isFrozen(e)}var Xt=`MapSet`,Zt=`Patches`,Qt=`ArrayMethods`,$t={};function G(e){let t=$t[e];return t||R(0,e),t}var en=e=>!!$t[e],tn,nn=()=>tn,rn=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:en(Xt)?G(Xt):void 0,arrayMethodsPlugin_:en(Qt)?G(Qt):void 0});function an(e,t){t&&(e.patchPlugin_=G(Zt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function on(e){sn(e),e.drafts_.forEach(ln),e.drafts_=null}function sn(e){e===tn&&(tn=e.parent_)}var cn=e=>tn=rn(tn,e);function ln(e){let t=e[L];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function un(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[L].modified_&&(on(t),R(4)),H(e)&&(e=dn(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[L].base_,e,t)}else e=dn(t,n);return fn(t,e,!0),on(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===xt?void 0:e}function dn(e,t){if(Yt(t))return t;let n=t[L];if(!n)return bn(t,e.handledSet_,e);if(!mn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);vn(n,e)}return n.copy_}function fn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Kt(t,n)}function pn(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var mn=(e,t)=>e.scope_===t,hn=[];function gn(e,t,n,r){let i=W(e),a=e.type_;if(r!==void 0&&Ft(i,r,a)===t){It(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;Mt(i,(e,n)=>{if(V(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??hn;for(let e of o)It(i,e,n,a)}function _n(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!mn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Wt(i);gn(e,i.draft_??i,a,n),vn(i,r)})}function vn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}pn(e)}}function yn(e,t,n){let{scope_:r}=e;if(V(n)){let i=n[L];mn(i,r)&&i.callbacks_.push(function(){On(e),gn(e,n,Wt(i),t)})}else H(n)&&e.callbacks_.push(function(){let i=W(e);e.type_===3?i.has(n)&&bn(n,r.handledSet_,r):Ft(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&bn(Ft(e.copy_,t,e.type_),r.handledSet_,r)})}function bn(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||V(e)||t.has(e)||!H(e)||Yt(e)?e:(t.add(e),Mt(e,(r,i)=>{if(V(i)){let t=i[L];mn(t,n)&&(It(e,r,Wt(t),e.type_),pn(t))}else H(i)&&bn(i,t,n)}),e)}function xn(e,t){let n=Rt(e),r={type_:+!!n,scope_:t?t.scope_:nn(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=Sn;n&&(i=[r],a=Cn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var Sn={get(e,t){if(t===L)return e;if(t===`constructor`||t===`__proto__`){let n=W(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=W(e);if(!Pt(i,t,e.type_))return Tn(e,i,t);let a=i[t];if(e.finalized_||!H(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Ut(t))return a;if(a===wn(e.base_,t)){On(e);let n=e.type_===1?+t:t,r=An(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in W(e)},ownKeys(e){return Reflect.ownKeys(W(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=En(W(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=wn(W(e),t),i=r?.[L];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Lt(n,r)&&(n!==void 0||Pt(e.base_,t,e.type_)))return!0;On(e),Dn(e)}return e.copy_[t]===n&&(n!==void 0||Pt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),yn(e,t,n),!0)},deleteProperty(e,t){return On(e),wn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),Dn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=W(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Dt]:!0,[Tt]:e.type_!==1||t!==`length`,[Et]:r[Et],[Ot]:n[t]}},defineProperty(){R(11)},getPrototypeOf(e){return B(e.base_)},setPrototypeOf(){R(12)}},Cn={};for(let e in Sn){let t=Sn[e];Cn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}Cn.deleteProperty=function(e,t){return Cn.set.call(this,e,t,void 0)},Cn.set=function(e,t,n){return Sn.set.call(this,e[0],t,n,e[0])};function wn(e,t){let n=e[L];return(n?W(n):e)[t]}function Tn(e,t,n){let r=En(t,n);return r?Ot in r?r[Ot]:r.get?.call(e.draft_):void 0}function En(e,t){if(!(t in e))return;let n=B(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=B(n)}}function Dn(e){e.modified_||(e.modified_=!0,e.parent_&&Dn(e.parent_))}function On(e){e.copy_||(e.assigned_=new Map,e.copy_=Gt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var kn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(U(e)&&!U(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}U(t)||R(6),n!==void 0&&!U(n)&&R(7);let r;if(H(e)){let i=cn(this),a=An(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?on(i):sn(i)}return an(i,n),un(r,i)}else if(!e||!Vt(e)){if(r=t(e),r===void 0&&(r=e),r===xt&&(r=void 0),this.autoFreeze_&&Kt(r,!0),n){let t=[],i=[];G(Zt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else R(1,e)},this.produceWithPatches=(e,t)=>{if(U(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Ht(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Ht(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Ht(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){H(e)||R(8),V(e)&&(e=jn(e));let t=cn(this),n=An(t,e,void 0);return n[L].isManual_=!0,sn(t),n}finishDraft(e,t){let n=e&&e[L];(!n||!n.isManual_)&&R(9);let{scope_:r}=n;return an(r,t),un(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=G(Zt).applyPatches_;return V(e)?r(e,t):this.produce(e,e=>r(e,t))}};function An(e,t,n,r){let[i,a]=zt(t)?G(Xt).proxyMap_(t,n):Bt(t)?G(Xt).proxySet_(t,n):xn(t,n);return(n?.scope_??nn()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?_n(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function jn(e){return V(e)||R(10,e),Mn(e)}function Mn(e){if(!H(e)||Yt(e))return e;let t=e[L],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Gt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Gt(e,!0);return Mt(n,(e,t)=>{It(n,e,Mn(t))},r),t&&(t.finalized_=!1),n}var Nn=new kn().produce;function Pn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Fn=Pn(),In=Pn,Ln=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?vt:vt.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Rn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(K(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>bt(t)&&t.type===e,n}var zn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Bn(e){return H(e)?Nn(e,()=>{}):e}function Vn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Hn(e){return typeof e==`boolean`}var Un=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new zn;return t&&(Hn(t)?a.push(Fn):a.push(In(t.extraArgument))),a},Wn=`RTK_autoBatch`,Gn=e=>t=>{setTimeout(t,e)},Kn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},qn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Kn(window.requestAnimationFrame,100):Gn(10):e.type===`callback`?e.queueNotification:Gn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Wn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Jn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new zn(e);return n&&r.push(qn(typeof n==`object`?n:void 0)),r};function Yn(e){let t=Un(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(mt(n))c=_t(n);else throw Error(K(1));let l;l=typeof r==`function`?r(t):t();let u=vt;i&&(u=Ln({trace:!1,...typeof i==`object`&&i}));let d=Jn(yt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return ht(c,o,p)}function Xn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(K(28));if(r in t)throw Error(K(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Zn(e){return typeof e==`function`}function Qn(e,t){let[n,r,i]=Xn(t),a;if(Zn(e))a=()=>Bn(e());else{let t=Bn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(V(e)){let r=n(e,t);return r===void 0?e:r}else if(H(e))return Nn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var $n=Symbol.for(`rtk-slice-createasyncthunk`);function er(e,t){return`${e}/${t}`}function tr({creators:e}={}){let t=e?.asyncThunk?.[$n];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(K(11));let i=(typeof e.reducers==`function`?e.reducers(ir()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(K(12));if(n in o.sliceCaseReducersByType)throw Error(K(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:er(n,r),createNotation:typeof e.reducers==`function`};or(a)?cr(o,a,s,t):ar(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Xn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Qn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Vn(d,r,m)),i}function i(t=l){return Vn(Vn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=nr(a,t,()=>Vn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function nr(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var rr=tr();function ir(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function ar({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!sr(r))throw Error(K(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Rn(e,o):Rn(e))}function or(e){return e._reducerDefinitionType===`asyncThunk`}function sr(e){return e._reducerDefinitionType===`reducerWithPrepare`}function cr({type:e,reducerName:t},n,r,i){if(!i)throw Error(K(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||lr,pending:s||lr,rejected:c||lr,settled:l||lr})}function lr(){}var ur=`listener`,dr=`completed`,fr=`cancelled`;`${fr}`,`${dr}`,`${ur}${fr}`,`${ur}${dr}`;var{assign:pr}=Object,mr=`listenerMiddleware`,hr=pr(Rn(`${mr}/add`),{withTypes:()=>hr});`${mr}`;var gr=pr(Rn(`${mr}/remove`),{withTypes:()=>gr});function K(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var _r=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),vr=new Set([`NEVER`,`AFTER`,`ON_DATE`]),yr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},br=e=>_r.has(e)?e:`NEVER`,xr=e=>vr.has(e)?e:`NEVER`,Sr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,Cr=rr({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:v.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),r!==void 0&&(e.until=e.start+r),w(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=re(e,n),w(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=o(e.start);a.setHours(i,0,0,0),e.start=h(a);let s=o(e.end);n?s=we(A(s),1):(s=Ee(s,1),s=Te(s,a.getHours()),s=Ne(s,r)),e.end=h(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),w(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=me(e.rrule)),e.repeatType=t.payload,w(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=Sr(e.count):e.count=null,w(e)},setFreq:(e,t)=>{e.freq=t.payload,_e(e,t.payload),w(e)},setCount:(e,t)=>{e.count=Sr(t.payload),w(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),w(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=T(r),w(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=T(n.byweekday)),`bymonth`in n&&(e.bymonth=T(n.bymonth)),`bymonthday`in n&&(e.bymonthday=T(n.bymonthday)),`byyearday`in n&&(e.byyearday=T(n.byyearday)),`bysetpos`in n&&(e.bysetpos=T(n.bysetpos)),w(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=Cr,wr=Cr.reducer,J={state:e=>e.event},Tr=r.div`
  padding-top: 16px;
  width: 100%;
`,Er=r.div`
  && {
    margin: 0 0 3px;
    padding: 0;
    color: var(--gray-700);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 18px;
  }
`,Dr=r.p`
  && {
    margin: 0 0 8px;
    padding: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
`,Or=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,kr=r.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  ${Oe}

  .react-datepicker__current-month {
    display: none;
  }
`,Ar=r.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,jr=r.div`
  position: relative;
  flex-shrink: 0;
`,Mr=r.button`
  min-width: 36px;
  height: 36px;
  padding: 0 11px;

  color: var(--gray-800);
  background: var(--gray-100);
  border: 1px solid var(--gray-300);
  border-radius: 100%;

  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--gray-150);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &.active {
    color: var(--white);
    background: var(--gray-600);
    border-color: var(--gray-600);

    &:hover:not(:disabled) {
      background: var(--gray-700);
      border-color: var(--gray-700);
    }
  }
`,Nr=r.div`
  position: absolute;
  z-index: 20;

  box-sizing: border-box;
  width: min(350px, calc(100vw - 16px));
  max-height: calc(100vh - 16px);
  padding: 14px;
  overflow-y: auto;

  background: white;
  border: 1px solid var(--gray-250, var(--gray-200));
  border-radius: var(--radius-lg, 10px);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);

  ul {
    margin: 0;
  }
`,Pr=r.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Fr=r.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Ir=r.li`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 8px 2px;

  background: var(--gray-050);
  border: 1px solid var(--gray-200);
  border-radius: 5px;

  font-family: monospace;
  font-size: 12px;
  line-height: 12px;

  button {
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--gray-600);
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
  }
`,Lr=r.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: var(--small-border-radius, 3px);
  background: transparent;
  color: var(--gray-600);
  font-size: 12px;
  line-height: 1;
  cursor: pointer;

  &::before {
    color: inherit;
    font-size: inherit;
  }

  /* Craft's edit glyph fills an em; remove fills 5/8. Both draw at about 10px. */
  &[data-icon="edit"]::before {
    font-size: 10px;
  }

  &[data-icon="remove"]::before {
    font-size: 16px;
  }

  &:hover:not(:disabled) {
    color: var(--link-color);
  }

  &:focus-visible {
    outline: 2px solid var(--link-color);
    outline-offset: 1px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`,Rr=rr({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:zr}=Rr,Br=Rr.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},Vr=r.div`
  container-type: inline-size;

  &:empty {
    display: none;
  }

  margin: 0 20px 20px;
  padding: 16px 0 0;
  border-top: 1px solid var(--gray-200);

  > p.warning {
    color: var(--error-color, #cf1124);
  }
`,Hr=r.ul`
  && {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  && > li {
    margin: 0;
    padding: 8px 0;
    list-style: none;
  }
`,Ur=r.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    "details actions"
    "date actions"
    "changes actions";
  align-items: start;
  gap: 2px 12px;
  line-height: 22px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  > div {
    margin: 0;
    padding: 0;
  }

  .occurrence-details {
    grid-area: details;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 8px;
    min-width: 0;
  }

  &.is-orphaned .occurrence-details {
    color: var(--gray-600);
  }

  .occurrence-title {
    min-width: 0;
    font-size: 13px;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .occurrence-date {
    grid-area: date;
    min-width: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }

  .occurrence-changes {
    grid-area: changes;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 8px;
    min-width: 0;
    color: var(--gray-600);
    font-size: 12px;
    overflow-wrap: anywhere;
  }

  .occurrence-state {
    padding: 1px 6px;
    border-radius: var(--small-border-radius, 3px);
    background-color: var(--gray-100);
    font-size: 11px;
    font-weight: 400;
    line-height: 18px;
    white-space: nowrap;
    color: var(--gray-600);

    &.cancelled {
      color: var(--yellow-700);
      background-color: var(--yellow-050);
    }
  }

  .occurrence-actions {
    grid-area: actions;
    display: flex;
    align-items: center;
    gap: 0;
  }

  @container (min-width: 440px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr) auto;
    grid-template-areas:
      "details date actions"
      "changes changes actions";
    column-gap: 16px;
  }

  @container (min-width: 560px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, .7fr) auto;
    grid-template-areas: "details date changes actions";
  }
`,X=a(),Wr=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],Gr=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of Wr){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},Kr=({context:e,refreshKey:t,onOccurrencesChanged:n})=>{let r=(0,M.useRef)(null),[i,a]=(0,M.useState)([]),[o,s]=(0,M.useState)(null),[c,u]=(0,M.useState)(null),d=(0,M.useRef)(0),f=F(J.state),p=F(Y.formats),m=e=>y(e,p),h=(0,M.useCallback)(()=>it(r.current)?.settings.elementId??e.eventId,[e.eventId]),g=(0,M.useCallback)(async()=>{let t=h();if(!t)return;let r=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);r.searchParams.set(`eventId`,String(t)),r.searchParams.set(`siteId`,String(e.siteId));let i=await xe(r,{headers:{Accept:`application/json`}});if(!i.ok)return;let o=(await i.json()).occurrences??[];a(o),n?.(o)},[e.siteId,h,n]);(0,M.useEffect)(()=>{g()},[g,t]);let _=(0,M.useCallback)(async()=>{let t=h();if(!t)return;let n=++d.current,i=await xe(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...Gr(r.current)})});if(!i.ok)return;let a=await i.json();n===d.current&&u(new Set(a.orphaned??[]))},[e.siteId,h]);(0,M.useEffect)(()=>{if(i.length===0)return;let e=setTimeout(()=>void _(),400);return()=>clearTimeout(e)},[f,i.length,_]);let v=e=>c?c.has(e.recurrenceId):e.orphaned,b=async t=>{s(t.recurrenceId);try{let n=await at(r.current);if(!n)return;ye({eventId:n,recurrenceId:t.recurrenceId,siteId:e.siteId,onSave:()=>void g()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{s(null)}},x=async t=>{if(window.confirm(l(`Remove everything this occurrence changes?`))){s(t.recurrenceId);try{let n=await at(r.current);if(!n)return;let i=await xe(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||l(`Couldn’t reset the occurrence.`));return}await g()}catch{Craft.cp.displayError(l(`Couldn’t reset the occurrence.`))}finally{s(null)}}};return(0,X.jsx)(Vr,{ref:r,children:i.length>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Er,{as:`h3`,children:l(`Edited occurrences`)}),(0,X.jsx)(Dr,{children:l(`Occurrences with their own changes. Changes made here go live with the event.`)}),i.some(v)&&(0,X.jsx)(Dr,{className:`warning`,children:l(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,X.jsx)(Hr,{children:i.map(e=>(0,X.jsxs)(Ur,{className:E(v(e)&&`is-orphaned`,e.cancelled&&`is-cancelled`),children:[(0,X.jsxs)(`div`,{className:`occurrence-details`,children:[(0,X.jsx)(`span`,{className:`occurrence-title`,children:e.title}),e.cancelled&&(0,X.jsx)(`span`,{className:`occurrence-state cancelled`,children:l(`Cancelled`)}),v(e)&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:l(`No longer on the schedule`)})]}),(0,X.jsx)(`div`,{className:`occurrence-date`,children:m(e)}),(0,X.jsx)(`div`,{className:`occurrence-changes`,children:(0,X.jsx)(`span`,{children:e.changes.join(`, `)})}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[!v(e)&&(0,X.jsx)(Lr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":l(`Edit occurrence on {date}`,{date:m(e)}),title:l(`Edit occurrence`),disabled:o!==null,onClick:()=>void b(e)}),(0,X.jsx)(Lr,{type:`button`,className:`icon occurrence-discard`,"data-icon":`remove`,"aria-label":`${l(`Discard`)}: ${m(e)}`,title:l(`Removes everything this occurrence changes.`),disabled:o!==null,onClick:()=>void x(e)})]})]},e.recurrenceId))})]})})},qr=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
  flex: 0 0 495px;
  box-sizing: border-box;

  @container (min-width: 1024px) {
    width: 495px;
  }

  > .field {
    margin: 0;
    width: 100%;

    .input {
      display: flex;
      flex-direction: column;
      gap: 10px;

      width: 100%;
    }
  }

  table:not(.data) {
    th, td {
      padding-block: 0;

      &:not(:first-child) {
        padding-inline-start: 0;
      }

      &:not(:last-child) {
        padding-inline-end: 0;
      }
    }
  }

  .fc {
    --fc-border-color: var(--gray-200);

    min-width: 260px;
    max-width: 260px;
    color: var(--gray-600);

    .cancelled-date-label {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    .fc-scrollgrid,
    th,
    td {
      border-color: var(--fc-border-color);
    }

    .fc-col-header-cell {
      background-color: var(--gray-100);
      color: var(--gray-600);
      text-align: center;
    }

    .fc-col-header-cell-cushion {
      padding: 5px 0;
      font-weight: 700;
    }

    .fc-header-toolbar {
      margin-bottom: 10px;

      .fc-toolbar-title {
        font-size: 14px;
        font-weight: 600;
        font-family: inherit;
      }

      .fc-button-group {
        display: flex;
        flex-direction: row;
        gap: 3px;
      }

      .fc-button {
        font-size: 10px;
      }

      .fc-today-button {
        display: none;
      }

      .fc-prev-button,
      .fc-next-button {
        padding: 0.3em 0;
        outline: none !important;
        box-shadow: none !important;
        border: 0 !important;
        color: var(--gray-700);
        border-radius: var(--radius-lg);
        background-color: var(--gray-200);

        &:hover {
          background-color: var(--gray-150);
        }

        &:active,
        &:focus,
        &:focus-visible {
          outline: none !important;
          box-shadow: none !important;
          border: 0 !important;
        }

        &:active {
          background-color: var(--gray-150);
        }
      }

      .fc-prev-button {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }

      .fc-next-button {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }

    .fc-scrollgrid {
      user-select: none;

      > thead {
        font-size: 13px;
      }

      >tbody {

        td.fc-day  {
          padding-inline-start: 0;
          padding-inline-end: 0;
          cursor: pointer;
          background-color: var(--gray-050);

          box-sizing: border-box;
          height: 32px;
          padding: 0;
          line-height: 1;
          vertical-align: middle;

          .fc-daygrid-day-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: 26px;
            height: 26px;
            padding: 0;
            line-height: 1;
            border: 2px solid transparent;
            border-radius: 50%;
          }

          &.fc-day-today {
            .fc-daygrid-day-number {
              border-color: var(--gray-200);
            }
          }

          &.fc-has-event {
            background-color: var(--gray-150);
          }

          &.fc-extra-date {
            background-color: var(--gray-150);
          }

          &.fc-excluded-date {
            background: color-mix(in srgb, var(--red-100) 72%, white);
            color: var(--gray-600);
          }

          &.fc-cancelled-date {
            background-color: var(--yellow-050);

            .fc-daygrid-day-number {
              color: var(--yellow-700);
              text-decoration: line-through;
            }
          }

          div.fc-daygrid-day-frame {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            height: 31px;
            min-height: 31px;

            .fc-daygrid-day-top {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: row;
              font-size: 13px;
              width: 100%;
            }

            .fc-daygrid-day-events {
              display: none;
            }
          }
        }
      }
    }
  }
`,Jr=r.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  margin-top: 10px;
  width: 455px;
  max-width: 100%;
  box-sizing: border-box;
`,Yr=r.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,Xr=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Zr=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Qr=r.div`
  min-width: max-content;
  flex: 1;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,$r=r.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,ei=r.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin: 0;
  padding: 4px 6px;

  font-size: 13px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  background-color: var(--gray-050);
  border: 1px solid var(--gray-200);
  border-radius: var(--small-border-radius, 3px);

  > span {
    flex: 1;
  }

  .occurrence-actions {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    gap: 0;
  }

  .occurrence-date {
    display: flex;
    flex-direction: column;
    line-height: 18px;
  }

  &.is-cancelled {
    background-color: var(--yellow-050);

    .occurrence-date > span:first-child {
      color: var(--gray-600);
      text-decoration: line-through;
    }

    .occurrence-state {
      color: var(--yellow-700);
      font-size: 11px;
    }
  }
`,ti=8,ni=({context:e,onOccurrenceSaved:n,editedOccurrences:r})=>{let i=(0,M.useRef)(null),[a,o]=(0,M.useState)(!1),s=P(),c=F(Y.weekStartDay),u=F(Y.formats)?.date.short.icu??`P`,f=F(J.state),{start:p,rrule:h}=f,_=!!(e?.eventId&&h),[v,y]=(0,M.useState)(null),b=(0,M.useMemo)(()=>ie(h,p),[h,p]),x=(0,M.useMemo)(()=>new Set(r?.filter(e=>e.cancelled&&!e.orphaned).map(e=>e.recurrenceId.replace(` `,`T`))),[r]),S=e=>{let t=ne(b,e);return t!==null&&x.has(t)},te=(0,M.useMemo)(()=>ue(b,v),[b,v]),C=(0,M.useMemo)(()=>ee(b,v?.start??null,ti),[b,v]),re=(0,M.useMemo)(()=>de(b,u),[b,u]),w=(0,M.useMemo)(()=>{let e=se(b,C.length);return e?ce(e):null},[b,C]),T=(0,M.useCallback)((e,t,n)=>{s(q.setRRule(fe(f,b,e,t,n)))},[s,b,f]),oe=(0,M.useCallback)(e=>{let t=ae(b,e);if(t){let{timestamp:n}=pe(b,e);T(t,n,t===`exdate`)}},[T,b]),le=(0,M.useCallback)(e=>{let t=pe(b,e);if(t.base&&t.excluded){T(`exdate`,t.timestamp,!1);return}if(t.full){oe(e);return}t.full||T(`rdate`,t.timestamp,!0)},[T,b,oe]),me=(0,M.useCallback)(e=>pe(b,e),[b]),he=async t=>{if(!(!e||a)){o(!0);try{ye({eventId:await at(i.current),recurrenceId:t,siteId:e.siteId,onSave:()=>n?.()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{o(!1)}}};return(0,X.jsx)(qr,{ref:i,children:(0,X.jsxs)(Ae,{children:[(0,X.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,X.jsx)(Yr,{children:l(`Schedule Preview`)}),re&&(0,X.jsx)(Xr,{children:re})]}),(0,X.jsxs)(Jr,{children:[(0,X.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,X.jsx)(be,{...m(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[ve,Se],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(d().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:c,timeZone:`UTC`,eventDisplay:`none`,events:te,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>y({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=me(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``,S(e.date)?`fc-cancelled-date`:``].filter(Boolean)},dayCellContent:e=>{let t=S(e.date),n=t?l(`Cancelled`):void 0;return(0,X.jsxs)(`span`,{title:n,children:[e.dayNumberText,t&&(0,X.jsxs)(`span`,{className:`cancelled-date-label`,children:[`, `,n]})]})},dateClick:e=>le(e.date)}),w&&(0,X.jsx)(Zr,{children:w})]}),(0,X.jsx)(Qr,{children:C.length===0?(0,X.jsxs)(`p`,{children:[l(`No occurrences starting from`),(0,X.jsx)(`br`,{}),O(t(v?.currentStart??new Date),`PP`,{locale:d()})]}):(0,X.jsx)($r,{$count:C.length,children:C.map(e=>{let n=new Date(e*1e3),r=S(n),i=O(t(n),u,{locale:d()}),o=ae(b,n),s=_?ne(b,n):null,c=l(o===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:i});return(0,X.jsxs)(ei,{className:r?`is-cancelled`:void 0,children:[(0,X.jsxs)(`span`,{className:`occurrence-date`,children:[(0,X.jsx)(`span`,{children:i}),r&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:l(`Cancelled`)})]}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[s&&(0,X.jsx)(Lr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":l(`Edit occurrence on {date}`,{date:i}),title:l(`Edit occurrence`),disabled:a,onClick:()=>void he(s)}),o&&(0,X.jsx)(Lr,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:a,"aria-label":c,title:c,onClick:()=>oe(n)})]})]},g(n))})})})]})]})})},ri=({context:e,refreshKey:t})=>{let n=F(J.state),{showOverlapWarnings:r,formats:i}=F(Y.config),a=(0,M.useRef)(null),o=(0,M.useCallback)(()=>it(a.current)?.settings.elementId??e?.eventId,[e?.eventId]);return e?.calendarId?(0,X.jsx)(`div`,{ref:a,style:{padding:`0 20px`},children:(0,X.jsx)(he,{formats:i,enabled:r,schedule:{...n,rrule:n.rrule??``,calendarId:e.calendarId,siteId:e.siteId},resolveEventId:o,refreshKey:t})}):null},ii=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;

  padding: 0;
  width: 100%;

  background-color: var(--gray-100);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 6px -1px rgba(0,0,0,.05);

  @container (min-width: 1024px) {
    flex-direction: row;
  }

  &:before {
    content: "";
    position: absolute;
    z-index: 1;

    inset: 0;
    pointer-events: none;
    border-radius: var(--radius-lg);
    box-shadow: inset 0 0 0 1px var(--custom-border-color,var(--gray-200));
  }
`,ai=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,oi=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,si=e=>h(Ee(o(e),1)),ci=(e,t,n)=>{let r=ui(t,n);return e.getTime()>=r.getTime()},li=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return h(we(A(o(e)),1));let i=o(e),a=ui(t,r);return i.getTime()>=a.getTime()?e:h(a)},ui=(e,t)=>Ne(o(e),t),di=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},fi=({inputValue:e,value:t,min:n})=>{let r=di(e)??n??t??0;return n===void 0?r:Math.max(r,n)},pi=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,M.useState)(e?.toString()??``),o=(0,M.useRef)(void 0),s=(0,M.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,M.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,M.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,M.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,M.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=di(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,M.useCallback)(n=>{n.stopPropagation();let r=fi({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},mi=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=pi({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(Ae,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},hi=()=>null,Z=[{value:`MO`,label:`Monday`,days:[x.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[x.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[x.WE.weekday]},{value:`TH`,label:`Thursday`,days:[x.TH.weekday]},{value:`FR`,label:`Friday`,days:[x.FR.weekday]},{value:`SA`,label:`Saturday`,days:[x.SA.weekday]},{value:`SU`,label:`Sunday`,days:[x.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[x.MO.weekday,x.TU.weekday,x.WE.weekday,x.TH.weekday,x.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[x.SA.weekday,x.SU.weekday]}],gi=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},_i=(e,t)=>{let n=gi(e),r=gi(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},vi=(e,t)=>{if(e){let t=Z.find(t=>_i(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},yi=e=>Z.find(t=>t.value===e)?.days??[x.MO.weekday],Q=`5px`,bi=r.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,xi=r(bi)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,Si=r(bi)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,Ci=r.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,wi=r(Ci)`
  grid-template-columns: repeat(7, 1fr);

  ${bi} {
    &:first-child {
      border-top-left-radius: var(--button-border-radius);
    }

    &:nth-child(7) {
      border-top-right-radius: var(--button-border-radius);
    }

    &:last-child {
      border-bottom-right-radius: var(--button-border-radius);
    }

    &:nth-child(29) {
      border-bottom-left-radius: var(--button-border-radius);
    }

    &:nth-child(7n) {
      border-right: none;
    }

    &:nth-child(n + 29) {
      border-bottom: none;
    }
  }
`,Ti=r(Ci)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${bi} {
    border-bottom: none;

    &:first-child {
      border-top-left-radius: ${Q};
      border-bottom-left-radius: ${Q};
    }

    &:last-child {
      border-right: none;
      border-top-right-radius: ${Q};
      border-bottom-right-radius: ${Q};
    }
  }
`,Ei=r(Ci)`
  grid-template-columns: repeat(4, 1fr);

  ${bi} {
    &:first-child {
      border-top-left-radius: ${Q};
    }

    &:nth-child(4) {
      border-top-right-radius: ${Q};
    }

    &:nth-child(9) {
      border-bottom-left-radius: ${Q};
    }

    &:last-child {
      border-bottom-right-radius: ${Q};
    }

    &:nth-child(4n) {
      border-right: none;
    }

    &:nth-child(n + 9) {
      border-bottom: none;
    }
  }
`,Di=({label:e,values:t,onChange:n})=>(0,X.jsx)(Ae,{label:e,children:(0,X.jsxs)(wi,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(xi,{type:`button`,className:E(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(Si,{},e))]})}),Oi=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],ki=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Ai=()=>{let e=P(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=F(J.state),a=o(t),s=a.getDate(),c=(a.getDay()+6)%7,l=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[s],d=i?.[0]??1,f=vi(r,c),p=t=>{e(q.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(q.setByRules({bymonthday:void 0,byweekday:yi(t),bysetpos:[n]}))};return(0,X.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(j,{translateOptions:!0,label:`Repeat on`,value:l,options:Oi,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,X.jsx)(Di,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,X.jsxs)(k,{children:[(0,X.jsx)(j,{translateOptions:!0,label:`Position`,value:d,options:ki,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(j,{translateOptions:!0,label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},ji=[{weekday:x.SU,label:`Sun`},{weekday:x.MO,label:`Mon`},{weekday:x.TU,label:`Tue`},{weekday:x.WE,label:`Wed`},{weekday:x.TH,label:`Thu`},{weekday:x.FR,label:`Fri`},{weekday:x.SA,label:`Sat`}],Mi=()=>{let e=P(),{byweekday:t}=F(J.state);return(0,X.jsx)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,X.jsx)(Ae,{label:`On`,children:(0,X.jsx)(Ti,{children:ji.map(({weekday:n,label:r})=>(0,X.jsx)(xi,{type:`button`,className:E(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:l(r)},n.weekday))})})})},Ni=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],Pi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Fi=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],Ii=()=>{let e=P(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=F(J.state),s=o(t),c=s.getDate(),u=s.getMonth()+1,d=(s.getDay()+6)%7,f=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,p=r?.length?r:[c],m=n?.length?n:[u],h=a?.[0]??1,g=vi(i,d),_=(t,n)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(t,n,r)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:yi(n),bysetpos:[r]}))};return(0,X.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(Ae,{label:`Month`,children:(0,X.jsx)(Ei,{children:Fi.map(e=>{let t=m.includes(e.value);return(0,X.jsx)(xi,{type:`button`,className:E(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:l(e.label)},e.value)})})}),(0,X.jsx)(j,{translateOptions:!0,label:`Repeat on`,value:f,options:Ni,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,X.jsx)(Di,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,X.jsxs)(k,{children:[(0,X.jsx)(j,{translateOptions:!0,label:`Position`,value:h,options:Pi,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,X.jsx)(j,{translateOptions:!0,label:`Day`,value:g,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},Li=()=>{let{freq:e}=F(J.state);return e===v.DAILY?(0,X.jsx)(hi,{}):e===v.WEEKLY?(0,X.jsx)(Mi,{}):e===v.MONTHLY?(0,X.jsx)(Ai,{}):e===v.YEARLY?(0,X.jsx)(Ii,{}):null},Ri=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),zi=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Bi=()=>{let e=P(),{interval:t}=F(J.state);return(0,X.jsxs)(Vi,{children:[(0,X.jsx)(`span`,{children:l(`Every`)}),(0,X.jsx)(Hi,{"aria-label":l(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(q.setInterval(n))}}),(0,X.jsxs)(Ui,{children:[(0,X.jsx)(Wi,{type:`button`,"aria-label":l(`Increase interval`),onClick:()=>e(q.setInterval(t+1)),children:(0,X.jsx)(zi,{})}),(0,X.jsx)(Wi,{type:`button`,"aria-label":l(`Decrease interval`),onClick:()=>e(q.setInterval(t-1)),children:(0,X.jsx)(Ri,{})})]})]})},Vi=r.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Hi=r.input`
  width: 60px;
`,Ui=r.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Wi=r.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 26px;
  height: 18px;
  margin: 0;
  padding: 0;

  color: var(--gray-800);
  cursor: pointer;
  appearance: none;

  border: 1px solid var(--gray-050);
  background: var(--gray-200);

  svg {
    display: block;
    width: 12px;
    height: 12px;
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    margin-top: -1px;
    border-radius: 0 0 5px 5px;
  }

  &:hover {
    position: relative;
    z-index: 1;
    color: var(--gray-800);
    background: var(--button-bg--hover);
  }

  &:focus-visible {
    position: relative;
    z-index: 2;
    outline: 2px solid var(--blue-500);
    outline-offset: 1px;
  }

  &:active {
    background: var(--button-bg--active);
  }
`,Gi=b({position:[`bottom`,`top`],alignment:`end`,padding:8}),Ki=(e,t,n,r)=>{let[i,a]=(0,M.useState)();return(0,M.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=_({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Gi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},qi=(e,t,n)=>{(0,M.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Ji=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:p})=>{let[m,g]=(0,M.useState)(!1),_=(0,M.useRef)(null),v=(0,M.useRef)(null),y=(0,M.useRef)(null),b=Ki(m,v,y,_);return(0,M.useEffect)(()=>{a.length===0&&g(!1)},[a.length]),qi(m,[v,y],()=>g(!1)),(0,X.jsxs)(Tr,{children:[(0,X.jsx)(Er,{children:l(e)}),t&&(0,X.jsx)(Dr,{children:l(t)}),(0,X.jsxs)(Or,{children:[(0,X.jsxs)(jr,{ref:_,children:[(0,X.jsx)(Mr,{ref:v,type:`button`,disabled:a.length===0,className:E({active:m}),onClick:()=>{a.length!==0&&g(e=>!e)},children:a.length}),m&&(0,X.jsxs)(Nr,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,X.jsx)(Pr,{children:l(i)}),(0,X.jsx)(Fr,{children:a.map(e=>(0,X.jsxs)(Ir,{children:[(0,X.jsx)(`span`,{children:c(e)}),(0,X.jsx)(`button`,{type:`button`,"aria-label":l(`Remove date {date}`,{date:c(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,X.jsx)(kr,{children:(0,X.jsx)(Me,{...f(),selected:null,onChange:e=>{e&&d(h(A(e)))},customInput:(0,X.jsx)(Yi,{label:n,className:E(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:l(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},Yi=(0,M.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Ar,{type:`button`,ref:n,...t,children:l(e)}));Yi.displayName=`PickerTrigger`;var Xi=r.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,Zi=()=>{let e=P(),n=F(J.state),{start:r,rrule:i}=n,a=(0,M.useMemo)(()=>ie(i,r),[i,r]),{startTimestamp:o,baseRule:l,recurrenceSet:u}=a,d=(0,M.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>h(A(t(e)))).filter(e=>l?!0:e!==o))).sort((e,t)=>e-t):[],[l,u,o]),f=(0,M.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>h(A(t(e)))))).sort((e,t)=>e-t):[],[u]),p=(0,M.useMemo)(()=>new Set(d),[d]),m=(0,M.useMemo)(()=>new Set(f),[f]),g=(0,M.useCallback)(e=>{let t=s(A(e)),n=c(De(e)),r=l?l.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:h(A(e))===o;return{full:i,base:r,excluded:r&&!i}},[l,u,o]),_=r=>{let i=r({baseRule:l,rdates:u?.rdates().filter(e=>l?!0:h(A(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(q.setRRule(oe(n,i.baseRule,Qi(i.rdates),Qi(i.exdates))))};return{addedDates:d,excludedDates:f,addFixedDate:(e,t)=>{if(e===`exdate`&&C(a,t))return;let r=le(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:S(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&C(a,t))return;let r=le(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?S(n,r):n,exdates:e===`exdate`?S(i,r):i}))},canAddOccurrence:(0,M.useCallback)(e=>{let t=h(A(e)),n=g(e);return!n.full&&!n.excluded&&!p.has(t)},[p,g]),canExcludeOccurrence:(0,M.useCallback)(e=>{let t=h(A(e)),n=g(e);return n.base&&!n.excluded&&!m.has(t)&&!C(a,t)},[m,g,a]),getStatus:g}},Qi=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},$i=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],ea=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],ta=e=>[{value:v.DAILY,label:e?`Days`:`Day`},{value:v.WEEKLY,label:e?`Weeks`:`Week`},{value:v.MONTHLY,label:e?`Months`:`Month`},{value:v.YEARLY,label:e?`Years`:`Year`}],na=300,ra=()=>{let e=P(),t=F(J.state),n=F(Y.weekStartDay),r=F(Y.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:s,until:c,freq:l,start:u,interval:f}=t,p=i!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=Zi(),b=(0,M.useMemo)(()=>o(u),[u]),x=e=>O(o(e),r,{locale:d()});return(0,X.jsxs)(Xi,{children:[(0,X.jsxs)(k,{$alignItems:`end`,style:{width:`100%`},children:[(0,X.jsx)(j,{translateOptions:!0,label:`Repeats`,value:i,options:$i,onChange:t=>e(q.setRepeatType(t))}),i===`CUSTOM`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Bi,{}),(0,X.jsx)(j,{translateOptions:!0,label:``,value:l,options:ta(f>1),onChange:t=>e(q.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,X.jsx)(Li,{}),i!==`NEVER`&&(0,X.jsxs)(k,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(j,{translateOptions:!0,label:`Ends`,options:ea,value:a,onChange:t=>e(q.setRepeatEndType(t))}),a===`AFTER`&&(0,X.jsx)(mi,{label:`Times`,value:s,min:1,debounceMs:na,onChange:t=>e(q.setCount(t))}),a===`ON_DATE`&&(0,X.jsx)(je,{label:``,value:c||null,onChange:t=>e(q.setUntil(t)),datePickerProps:{dateFormat:r,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:b}})]}),(0,X.jsxs)(k,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,X.jsx)(Ji,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:x,filterDate:v,weekStartDay:n,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),p&&(0,X.jsx)(Ji,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:x,filterDate:y,weekStartDay:n,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},ia=({context:e,onOccurrenceSaved:t})=>{let n=(0,M.useId)(),r=(0,M.useId)(),i=(0,M.useId)(),[a,s]=(0,M.useState)(0),[c,u]=(0,M.useState)([]),d=P(),{start:f,end:p,allDay:m}=F(J.state),{date:h,time:g,datetime:_}=F(Y.formats),v=F(Y.weekStartDay),y=F(Y.timeInterval),b=F(Y.eventDuration),x=(0,M.useMemo)(()=>m?h.short.icu:_.short.icu,[m,h,_]),S=(0,M.useMemo)(()=>m?si(p):p,[m,p]);return(0,X.jsxs)(ii,{children:[(0,X.jsxs)(ai,{children:[(0,X.jsxs)(oi,{children:[(0,X.jsx)(je,{id:r,label:`Starts`,value:f,onChange:e=>d(q.setStart(e)),datePickerProps:{id:r,showIcon:!0,icon:(0,X.jsx)(Ce,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:g.short.icu,todayButton:l(`Today`),calendarStartDay:v,timeIntervals:y}}),(0,X.jsx)(je,{id:i,label:`Ends`,value:S,onChange:e=>{e!=null&&d(q.setEnd(li({value:e,start:f,allDay:m,timeInterval:y})))},datePickerProps:{id:i,showIcon:!0,icon:(0,X.jsx)(Ce,{}),toggleCalendarOnIconClick:!0,minDate:o(f),showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:g.short.icu,todayButton:l(`Today`),calendarStartDay:v,timeIntervals:y,filterTime:e=>ci(new Date(e),f,y)}}),(0,X.jsx)(ke,{id:n,label:`All Day`,enabled:m,style:{margin:0},onClick:e=>d(q.setAllDay({enabled:e,eventDuration:b}))})]}),(0,X.jsx)(ri,{context:e,refreshKey:a}),(0,X.jsx)(ra,{}),e?.eventId&&(0,X.jsx)(Kr,{context:e,refreshKey:a,onOccurrencesChanged:u})]}),(0,X.jsx)(ni,{context:e,editedOccurrences:c,onOccurrenceSaved:()=>{s(e=>e+1),t?.()}})]})},aa=r.div`
  code {
    display: block;
    padding: 12px;
    background-color: var(--gray-100);
    border: 1px solid var(--gray-300);
    border-radius: 4px;
    font-size: 12px;
    line-height: 1.4;
    color: var(--gray-800);
  }
`,oa=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 20px;

  > p {
    margin: 0;
    padding: 10px 14px;
    border-radius: var(--large-border-radius, 5px);
    background: var(--blue-050, #edf3fa);
    color: var(--gray-700);
  }

  > nav {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 16px;
    color: var(--gray-600);
  }
`,sa=({context:e})=>{let{allDay:n}=F(J.state),r=F(Y.formats),i=(e,n=!1)=>O(t(new Date(e*1e3)),n?r?.datetime.short.icu??`Pp`:r?.date.short.icu??`P`,{locale:d()}),{splitAt:a,series:o}=e,s=o?.earlier??null,c=o?.later??null;return!a&&!s&&!c?null:(0,X.jsxs)(oa,{children:[a&&(0,X.jsx)(`p`,{children:l(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:i(a,!n)})}),(s||c)&&(0,X.jsxs)(`nav`,{children:[(0,X.jsx)(`span`,{children:l(`Part of a series`)}),s&&(0,X.jsxs)(`a`,{href:s.url,children:[`← `,l(`Earlier part, from {date}`,{date:i(s.start)})]}),c&&(0,X.jsxs)(`a`,{href:c.url,children:[l(`Later part, from {date}`,{date:i(c.start)}),` →`]})]})]})},ca=({context:e})=>{let{rrule:n}=F(J.state),r=(0,M.useMemo)(ut,[]),i=n?ge(n,{forceset:!0}).all((e,t)=>t<10).map(e=>`${O(t(e),`yyyy-MM-dd HH:mm`)} [${Pe(e)}]`):[];return(0,X.jsxs)(aa,{children:[e&&(0,X.jsx)(sa,{context:e}),(0,X.jsx)(ia,{context:e}),r&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:n}),(0,X.jsx)(`pre`,{children:JSON.stringify(i,null,2)})]})]})},la=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,ua(n)),$(t,`end`,ua(r)),$(t,`until`,i?ua(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},ua=e=>O(o(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},da=e=>{let t=te(e.event.rrule),{byweekday:n,bysetpos:r}=yr(t?.options.byweekday),i=br(e.event.repeatType),a=xr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||v.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?Sr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Yn({reducer:{app:Br,event:wr},preloadedState:o})},fa=new WeakSet,pa=e=>{if(fa.has(e))return;fa.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=da(r),a=Le.createRoot(n);i.subscribe(()=>{la(i,e)}),la(i,e),a.render((0,X.jsx)(Xe,{store:i,children:(0,X.jsx)(ca,{context:r.context})}))},ma=(e=document)=>{e.querySelectorAll(`[data-calendar-transfer-select]`).forEach(st),e.querySelectorAll(`[data-calendar-transfer]`).forEach(lt),e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(pa)},ha=()=>{ma(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-calendar-transfer-select]`)&&st(e),e.matches(`[data-calendar-transfer]`)&&lt(e),e.matches(`[data-event-builder]`)&&pa(e),ma(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ha):ha();
