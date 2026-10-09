import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,g as c,i as l,j as u,n as d,r as f,s as p,t as m,v as h,y as g}from"./localization-Dt_HqhpZ.js";import{C as _,E as v,S as y,_ as b,a as ee,b as te,c as ne,d as x,f as re,g as S,h as C,i as ie,l as ae,m as oe,n as se,o as ce,p as w,r as le,s as ue,t as de,u as fe,v as pe,w as me,x as he,y as ge}from"./calendar-preview.operations-DLg5NIyx.js";import{c as _e,d as ve,f as ye,p as be}from"./calendar.events-BsoNrhOC.js";import{t as xe}from"./interaction-CRxFL9NJ.js";import{a as Se,b as Ce,c as T,d as we,f as Te,g as Ee,h as De,i as Oe,m as E,n as ke,o as D,p as O,r as Ae,s as je,t as k,v as Me,y as A}from"./components-CefPxcP5.js";import{t as j}from"./dropdown-a6jWzpVl.js";function Ne(e,t){let n=p(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=E(n.getDate(),2),t=E(n.getMonth()+1,2);a=`${E(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=E(Math.trunc(t/60),2),r=E(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=E(n.getHours(),2),r=E(n.getMinutes(),2),i=E(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Pe=u((t=>{var n=e();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Fe=u(((e,t)=>{t.exports=Pe()})),Ie=i(n()),M=i(e(),1),Le=Fe();function Re(e){e()}function ze(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Re(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Be={notify(){},get:()=>[]};function Ve(e,t){let n,r=Be,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=ze())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Be)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var He=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ue=typeof navigator<`u`&&navigator.product===`ReactNative`,We=He||Ue?M.useLayoutEffect:M.useEffect,Ge=Symbol.for(`react-redux-context`),Ke=typeof globalThis<`u`?globalThis:{};function qe(){if(!M.createContext)return{};let e=Ke[Ge]??(Ke[Ge]=new Map),t=e.get(M.createContext);return t||(t=M.createContext(null),e.set(M.createContext,t)),t}var N=qe();function Je(e){let{children:t,context:n,serverState:r,store:i}=e,a=M.useMemo(()=>{let e=Ve(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=M.useMemo(()=>i.getState(),[i]);We(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||N;return M.createElement(s.Provider,{value:a},t)}var Ye=Je;function Xe(e=N){return function(){return M.useContext(e)}}var Ze=Xe();function Qe(e=N){let t=e===N?Ze:Xe(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var $e=Qe();function et(e=N){let t=e===N?$e:Qe(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var P=et(),tt=(e,t)=>e===t;function nt(e=N){let t=e===N?Ze:Xe(e),n=(e,n={})=>{let{equalityFn:r=tt}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();M.useRef(!0);let s=M.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Le.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return M.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var F=nt(),rt=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`[data-element-editor]`).data(`elementEditor`)??t(e).closest(`form`).data(`elementEditor`)},it=async e=>{let t=rt(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},at=new WeakSet,ot=e=>{let t=window.jQuery;if(at.has(e)||!t)return;at.add(e);let n=Number(e.dataset.calendarId),r=e.querySelector(`button.menubtn`),i=r?.querySelector(`.inline-flex`),a=i?.innerHTML,o=!1;t(e).on(`change`,async()=>{let s=Number(t(e).data(`value`));if(i&&a&&(i.innerHTML=a),t(e).data(`value`,n),e.querySelectorAll(`[data-value]`).forEach(e=>{e.classList.toggle(`sel`,Number(e.dataset.value)===n)}),o||s===n||!s)return;o=!0,r&&(r.disabled=!0);let c=rt(e),l=!1;try{let t=await it(e);c?.pause(),l=!!c;let n=new Craft.CpScreenSlideout(`calendar/event-calendar/edit`,{params:{eventId:t,siteId:Number(e.dataset.siteId),targetCalendarId:s}}),i=!1;n.on(`submit`,e=>{let t=e?.response?.data?.url;i=!0,window.location.assign(t||window.location.href)}),n.on(`close`,()=>{!i&&l&&c?.resume(),o=!1,r&&(r.disabled=!1)})}catch{l&&c?.resume(),o=!1,r&&(r.disabled=!1),Craft.cp.displayError(Craft.t(`calendar`,`Couldn’t open the calendar mapping.`))}})},st=e=>{let t=JSON.parse(e.dataset.populated||`{}`),n=Array.from(e.querySelectorAll(`select[data-field-mapping]`)),r=n.map(e=>e.value).filter(Boolean),i=r.length!==new Set(r).size,a=new Set(r),o=Object.entries(t).filter(([e])=>!a.has(e)),s=e.querySelector(`[data-unmapped-warning]`),c=e.querySelector(`[data-unmapped-fields]`),l=e.querySelector(`[data-mapping-error]`);s&&(s.hidden=o.length===0),l&&(l.hidden=!i),c&&c.replaceChildren(...o.map(([,e])=>{let t=document.createElement(`li`);return t.textContent=e,t})),n.forEach(e=>{e.setCustomValidity(i?Craft.t(`calendar`,`Each source field can only be mapped once.`):``)})},ct=e=>{at.has(e)||(at.add(e),e.addEventListener(`change`,()=>st(e)),st(e))},lt=()=>!1;function I(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var ut=typeof Symbol==`function`&&Symbol.observable||`@@observable`,dt=()=>Math.random().toString(36).substring(7).split(``).join(`.`),ft={INIT:`@@redux/INIT${dt()}`,REPLACE:`@@redux/REPLACE${dt()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${dt()}`};function pt(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function mt(e,t,n){if(typeof e!=`function`)throw Error(I(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(I(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(I(1));return n(mt)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(I(3));return i}function d(e){if(typeof e!=`function`)throw Error(I(4));if(c)throw Error(I(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(I(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!pt(e))throw Error(I(7));if(e.type===void 0)throw Error(I(8));if(typeof e.type!=`string`)throw Error(I(17));if(c)throw Error(I(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(I(10));r=e,f({type:ft.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(I(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[ut](){return this}}}return f({type:ft.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[ut]:m}}function ht(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:ft.INIT})===void 0)throw Error(I(12));if(n(void 0,{type:ft.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(I(13))})}function gt(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{ht(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(I(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function _t(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function vt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(I(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=_t(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function yt(e){return pt(e)&&`type`in e&&typeof e.type==`string`}var bt=Symbol.for(`immer-nothing`),xt=Symbol.for(`immer-draftable`),L=Symbol.for(`immer-state`);function R(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var z=Object,B=z.getPrototypeOf,St=`constructor`,Ct=`prototype`,wt=`configurable`,Tt=`enumerable`,Et=`writable`,Dt=`value`,V=e=>!!e&&!!e[L];function H(e){return e?At(e)||Lt(e)||!!e[xt]||!!e[St]?.[xt]||Rt(e)||zt(e):!1}var Ot=z[Ct][St].toString(),kt=new WeakMap;function At(e){if(!e||!Bt(e))return!1;let t=B(e);if(t===null||t===z[Ct])return!0;let n=z.hasOwnProperty.call(t,St)&&t[St];if(n===Object)return!0;if(!U(n))return!1;let r=kt.get(n);return r===void 0&&(r=Function.toString.call(n),kt.set(n,r)),r===Ot}function jt(e,t,n=!0){Mt(e)===0?(n?Reflect.ownKeys(e):z.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function Mt(e){let t=e[L];return t?t.type_:Lt(e)?1:Rt(e)?2:zt(e)?3:0}var Nt=(e,t,n=Mt(e))=>n===2?e.has(t):z[Ct].hasOwnProperty.call(e,t),Pt=(e,t,n=Mt(e))=>n===2?e.get(t):e[t],Ft=(e,t,n,r=Mt(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function It(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Lt=Array.isArray,Rt=e=>e instanceof Map,zt=e=>e instanceof Set,Bt=e=>typeof e==`object`,U=e=>typeof e==`function`,Vt=e=>typeof e==`boolean`;function Ht(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var W=e=>e.copy_||e.base_,Ut=e=>e.modified_?e.copy_:e.base_;function Wt(e,t){if(Rt(e))return new Map(e);if(zt(e))return new Set(e);if(Lt(e))return Array[Ct].slice.call(e);let n=At(e);if(t===!0||t===`class_only`&&!n){let t=z.getOwnPropertyDescriptors(e);delete t[L];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[Et]===!1&&(a[Et]=!0,a[wt]=!0),(a.get||a.set)&&(t[i]={[wt]:!0,[Et]:!0,[Tt]:a[Tt],[Dt]:e[i]})}return z.create(B(e),t)}else{let t=B(e);if(t!==null&&n)return{...e};let r=z.create(t);return z.assign(r,e)}}function Gt(e,t=!1){return Jt(e)||V(e)||!H(e)?e:(Mt(e)>1&&z.defineProperties(e,{set:qt,add:qt,clear:qt,delete:qt}),z.freeze(e),t&&jt(e,(e,t)=>{Gt(t,!0)},!1),e)}function Kt(){R(2)}var qt={[Dt]:Kt};function Jt(e){return e===null||!Bt(e)?!0:z.isFrozen(e)}var Yt=`MapSet`,Xt=`Patches`,Zt=`ArrayMethods`,Qt={};function G(e){let t=Qt[e];return t||R(0,e),t}var $t=e=>!!Qt[e],en,tn=()=>en,nn=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:$t(Yt)?G(Yt):void 0,arrayMethodsPlugin_:$t(Zt)?G(Zt):void 0});function rn(e,t){t&&(e.patchPlugin_=G(Xt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function an(e){on(e),e.drafts_.forEach(cn),e.drafts_=null}function on(e){e===en&&(en=e.parent_)}var sn=e=>en=nn(en,e);function cn(e){let t=e[L];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function ln(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[L].modified_&&(an(t),R(4)),H(e)&&(e=un(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[L].base_,e,t)}else e=un(t,n);return dn(t,e,!0),an(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===bt?void 0:e}function un(e,t){if(Jt(t))return t;let n=t[L];if(!n)return yn(t,e.handledSet_,e);if(!pn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);_n(n,e)}return n.copy_}function dn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Gt(t,n)}function fn(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var pn=(e,t)=>e.scope_===t,mn=[];function hn(e,t,n,r){let i=W(e),a=e.type_;if(r!==void 0&&Pt(i,r,a)===t){Ft(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;jt(i,(e,n)=>{if(V(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??mn;for(let e of o)Ft(i,e,n,a)}function gn(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!pn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Ut(i);hn(e,i.draft_??i,a,n),_n(i,r)})}function _n(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}fn(e)}}function vn(e,t,n){let{scope_:r}=e;if(V(n)){let i=n[L];pn(i,r)&&i.callbacks_.push(function(){Dn(e),hn(e,n,Ut(i),t)})}else H(n)&&e.callbacks_.push(function(){let i=W(e);e.type_===3?i.has(n)&&yn(n,r.handledSet_,r):Pt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&yn(Pt(e.copy_,t,e.type_),r.handledSet_,r)})}function yn(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||V(e)||t.has(e)||!H(e)||Jt(e)?e:(t.add(e),jt(e,(r,i)=>{if(V(i)){let t=i[L];pn(t,n)&&(Ft(e,r,Ut(t),e.type_),fn(t))}else H(i)&&yn(i,t,n)}),e)}function bn(e,t){let n=Lt(e),r={type_:+!!n,scope_:t?t.scope_:tn(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=xn;n&&(i=[r],a=Sn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var xn={get(e,t){if(t===L)return e;if(t===`constructor`||t===`__proto__`){let n=W(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=W(e);if(!Nt(i,t,e.type_))return wn(e,i,t);let a=i[t];if(e.finalized_||!H(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Ht(t))return a;if(a===Cn(e.base_,t)){Dn(e);let n=e.type_===1?+t:t,r=kn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in W(e)},ownKeys(e){return Reflect.ownKeys(W(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=Tn(W(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=Cn(W(e),t),i=r?.[L];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(It(n,r)&&(n!==void 0||Nt(e.base_,t,e.type_)))return!0;Dn(e),En(e)}return e.copy_[t]===n&&(n!==void 0||Nt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),vn(e,t,n),!0)},deleteProperty(e,t){return Dn(e),Cn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),En(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=W(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Et]:!0,[wt]:e.type_!==1||t!==`length`,[Tt]:r[Tt],[Dt]:n[t]}},defineProperty(){R(11)},getPrototypeOf(e){return B(e.base_)},setPrototypeOf(){R(12)}},Sn={};for(let e in xn){let t=xn[e];Sn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}Sn.deleteProperty=function(e,t){return Sn.set.call(this,e,t,void 0)},Sn.set=function(e,t,n){return xn.set.call(this,e[0],t,n,e[0])};function Cn(e,t){let n=e[L];return(n?W(n):e)[t]}function wn(e,t,n){let r=Tn(t,n);return r?Dt in r?r[Dt]:r.get?.call(e.draft_):void 0}function Tn(e,t){if(!(t in e))return;let n=B(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=B(n)}}function En(e){e.modified_||(e.modified_=!0,e.parent_&&En(e.parent_))}function Dn(e){e.copy_||(e.assigned_=new Map,e.copy_=Wt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var On=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(U(e)&&!U(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}U(t)||R(6),n!==void 0&&!U(n)&&R(7);let r;if(H(e)){let i=sn(this),a=kn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?an(i):on(i)}return rn(i,n),ln(r,i)}else if(!e||!Bt(e)){if(r=t(e),r===void 0&&(r=e),r===bt&&(r=void 0),this.autoFreeze_&&Gt(r,!0),n){let t=[],i=[];G(Xt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else R(1,e)},this.produceWithPatches=(e,t)=>{if(U(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Vt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Vt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Vt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){H(e)||R(8),V(e)&&(e=An(e));let t=sn(this),n=kn(t,e,void 0);return n[L].isManual_=!0,on(t),n}finishDraft(e,t){let n=e&&e[L];(!n||!n.isManual_)&&R(9);let{scope_:r}=n;return rn(r,t),ln(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=G(Xt).applyPatches_;return V(e)?r(e,t):this.produce(e,e=>r(e,t))}};function kn(e,t,n,r){let[i,a]=Rt(t)?G(Yt).proxyMap_(t,n):zt(t)?G(Yt).proxySet_(t,n):bn(t,n);return(n?.scope_??tn()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?gn(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function An(e){return V(e)||R(10,e),jn(e)}function jn(e){if(!H(e)||Jt(e))return e;let t=e[L],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Wt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Wt(e,!0);return jt(n,(e,t)=>{Ft(n,e,jn(t))},r),t&&(t.finalized_=!1),n}var Mn=new On().produce;function Nn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Pn=Nn(),Fn=Nn,In=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?_t:_t.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Ln(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(K(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>yt(t)&&t.type===e,n}var Rn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function zn(e){return H(e)?Mn(e,()=>{}):e}function Bn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Vn(e){return typeof e==`boolean`}var Hn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new Rn;return t&&(Vn(t)?a.push(Pn):a.push(Fn(t.extraArgument))),a},Un=`RTK_autoBatch`,Wn=e=>t=>{setTimeout(t,e)},Gn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Kn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Gn(window.requestAnimationFrame,100):Wn(10):e.type===`callback`?e.queueNotification:Wn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Un],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},qn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new Rn(e);return n&&r.push(Kn(typeof n==`object`?n:void 0)),r};function Jn(e){let t=Hn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(pt(n))c=gt(n);else throw Error(K(1));let l;l=typeof r==`function`?r(t):t();let u=_t;i&&(u=In({trace:!1,...typeof i==`object`&&i}));let d=qn(vt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return mt(c,o,p)}function Yn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(K(28));if(r in t)throw Error(K(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Xn(e){return typeof e==`function`}function Zn(e,t){let[n,r,i]=Yn(t),a;if(Xn(e))a=()=>zn(e());else{let t=zn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(V(e)){let r=n(e,t);return r===void 0?e:r}else if(H(e))return Mn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Qn=Symbol.for(`rtk-slice-createasyncthunk`);function $n(e,t){return`${e}/${t}`}function er({creators:e}={}){let t=e?.asyncThunk?.[Qn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(K(11));let i=(typeof e.reducers==`function`?e.reducers(rr()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(K(12));if(n in o.sliceCaseReducersByType)throw Error(K(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:$n(n,r),createNotation:typeof e.reducers==`function`};ar(a)?sr(o,a,s,t):ir(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Yn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Zn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Bn(d,r,m)),i}function i(t=l){return Bn(Bn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=tr(a,t,()=>Bn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function tr(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var nr=er();function rr(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function ir({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!or(r))throw Error(K(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Ln(e,o):Ln(e))}function ar(e){return e._reducerDefinitionType===`asyncThunk`}function or(e){return e._reducerDefinitionType===`reducerWithPrepare`}function sr({type:e,reducerName:t},n,r,i){if(!i)throw Error(K(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||cr,pending:s||cr,rejected:c||cr,settled:l||cr})}function cr(){}var lr=`listener`,ur=`completed`,dr=`cancelled`;`${dr}`,`${ur}`,`${lr}${dr}`,`${lr}${ur}`;var{assign:fr}=Object,pr=`listenerMiddleware`,mr=fr(Ln(`${pr}/add`),{withTypes:()=>mr});`${pr}`;var hr=fr(Ln(`${pr}/remove`),{withTypes:()=>hr});function K(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var gr=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),_r=new Set([`NEVER`,`AFTER`,`ON_DATE`]),vr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},yr=e=>gr.has(e)?e:`NEVER`,br=e=>_r.has(e)?e:`NEVER`,xr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,Sr=nr({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:_.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),r!==void 0&&(e.until=e.start+r),S(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=re(e,n),S(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=o(e.start);a.setHours(i,0,0,0),e.start=h(a);let s=o(e.end);n?s=Ce(A(s),1):(s=Te(s,1),s=we(s,a.getHours()),s=Me(s,r)),e.end=h(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),S(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=pe(e.rrule)),e.repeatType=t.payload,S(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=xr(e.count):e.count=null,S(e)},setFreq:(e,t)=>{e.freq=t.payload,ge(e,t.payload),S(e)},setCount:(e,t)=>{e.count=xr(t.payload),S(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),S(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=C(r),S(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=C(n.byweekday)),`bymonth`in n&&(e.bymonth=C(n.bymonth)),`bymonthday`in n&&(e.bymonthday=C(n.bymonthday)),`byyearday`in n&&(e.byyearday=C(n.byyearday)),`bysetpos`in n&&(e.bysetpos=C(n.bysetpos)),S(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=Sr,Cr=Sr.reducer,J={state:e=>e.event},wr=r.div`
  padding-top: 16px;
  width: 100%;
`,Tr=r.div`
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
`,Er=r.p`
  && {
    margin: 0 0 8px;
    padding: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
`,Dr=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Or=r.div`
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
`,kr=r.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Ar=r.div`
  position: relative;
  flex-shrink: 0;
`,jr=r.button`
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
`,Mr=r.div`
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
`,Nr=r.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Pr=r.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Fr=r.li`
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
`,Ir=r.button`
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
`,Lr=nr({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:Rr}=Lr,zr=Lr.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},Br=r.div`
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
`,Vr=r.ul`
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
`,Hr=r.li`
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
`,Ur=(e,t)=>{let n=o(e.start),r=o(e.end),i={locale:d()},a=t?.date.short.icu??`P`,s=t?.time.short.icu??`p`,c=O(n,a,i),u=O(r,a,i),f=Ee(n,r);if(e.allDay)return`${f?c:`${c} - ${u}`} (${l(`all day`)})`;let p=O(n,s,i),m=O(r,s,i);return`${c} ${p} - ${f?m:`${u} ${m}`}`},X=a(),Wr=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],Gr=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of Wr){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},Kr=({context:e,refreshKey:t,onOccurrencesChanged:n})=>{let r=(0,M.useRef)(null),[i,a]=(0,M.useState)([]),[o,s]=(0,M.useState)(null),[c,u]=(0,M.useState)(null),d=(0,M.useRef)(0),f=F(J.state),p=F(Y.formats),m=e=>Ur(e,p),h=(0,M.useCallback)(()=>rt(r.current)?.settings.elementId??e.eventId,[e.eventId]),g=(0,M.useCallback)(async()=>{let t=h();if(!t)return;let r=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);r.searchParams.set(`eventId`,String(t)),r.searchParams.set(`siteId`,String(e.siteId));let i=await ve(r,{headers:{Accept:`application/json`}});if(!i.ok)return;let o=(await i.json()).occurrences??[];a(o),n?.(o)},[e.siteId,h,n]);(0,M.useEffect)(()=>{g()},[g,t]);let _=(0,M.useCallback)(async()=>{let t=h();if(!t)return;let n=++d.current,i=await ve(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...Gr(r.current)})});if(!i.ok)return;let a=await i.json();n===d.current&&u(new Set(a.orphaned??[]))},[e.siteId,h]);(0,M.useEffect)(()=>{if(i.length===0)return;let e=setTimeout(()=>void _(),400);return()=>clearTimeout(e)},[f,i.length,_]);let v=e=>c?c.has(e.recurrenceId):e.orphaned,y=async t=>{s(t.recurrenceId);try{let n=await it(r.current);if(!n)return;_e({eventId:n,recurrenceId:t.recurrenceId,siteId:e.siteId,onSave:()=>void g()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{s(null)}},b=async t=>{if(window.confirm(l(`Remove everything this occurrence changes?`))){s(t.recurrenceId);try{let n=await it(r.current);if(!n)return;let i=await ve(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||l(`Couldn’t reset the occurrence.`));return}await g()}catch{Craft.cp.displayError(l(`Couldn’t reset the occurrence.`))}finally{s(null)}}};return(0,X.jsx)(Br,{ref:r,children:i.length>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Tr,{as:`h3`,children:l(`Edited occurrences`)}),(0,X.jsx)(Er,{children:l(`Occurrences with their own changes. Changes made here go live with the event.`)}),i.some(v)&&(0,X.jsx)(Er,{className:`warning`,children:l(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,X.jsx)(Vr,{children:i.map(e=>(0,X.jsxs)(Hr,{className:T(v(e)&&`is-orphaned`,e.cancelled&&`is-cancelled`),children:[(0,X.jsxs)(`div`,{className:`occurrence-details`,children:[(0,X.jsx)(`span`,{className:`occurrence-title`,children:e.title}),e.cancelled&&(0,X.jsx)(`span`,{className:`occurrence-state cancelled`,children:l(`Cancelled`)}),v(e)&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:l(`No longer on the schedule`)})]}),(0,X.jsx)(`div`,{className:`occurrence-date`,children:m(e)}),(0,X.jsx)(`div`,{className:`occurrence-changes`,children:(0,X.jsx)(`span`,{children:e.changes.join(`, `)})}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[!v(e)&&(0,X.jsx)(Ir,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":l(`Edit occurrence on {date}`,{date:m(e)}),title:l(`Edit occurrence`),disabled:o!==null,onClick:()=>void y(e)}),(0,X.jsx)(Ir,{type:`button`,className:`icon occurrence-discard`,"data-icon":`remove`,"aria-label":`${l(`Discard`)}: ${m(e)}`,title:l(`Removes everything this occurrence changes.`),disabled:o!==null,onClick:()=>void b(e)})]})]},e.recurrenceId))})]})})},qr=r.div`
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
`,ti=8,ni=({context:e,onOccurrenceSaved:n,editedOccurrences:r})=>{let i=(0,M.useRef)(null),[a,o]=(0,M.useState)(!1),s=P(),c=F(Y.weekStartDay),u=F(Y.formats)?.date.short.icu??`P`,f=F(J.state),{start:p,rrule:h}=f,_=!!(e?.eventId&&h),[v,y]=(0,M.useState)(null),b=(0,M.useMemo)(()=>ie(h,p),[h,p]),te=(0,M.useMemo)(()=>new Set(r?.filter(e=>e.cancelled&&!e.orphaned).map(e=>e.recurrenceId.replace(` `,`T`))),[r]),x=e=>{let t=ne(b,e);return t!==null&&te.has(t)},re=(0,M.useMemo)(()=>le(b,v),[b,v]),S=(0,M.useMemo)(()=>ee(b,v?.start??null,ti),[b,v]),C=(0,M.useMemo)(()=>ue(b,u),[b,u]),oe=(0,M.useMemo)(()=>{let e=se(b,S.length);return e?ce(e):null},[b,S]),w=(0,M.useCallback)((e,t,n)=>{s(q.setRRule(de(f,b,e,t,n)))},[s,b,f]),pe=(0,M.useCallback)(e=>{let t=ae(b,e);if(t){let{timestamp:n}=fe(b,e);w(t,n,t===`exdate`)}},[w,b]),me=(0,M.useCallback)(e=>{let t=fe(b,e);if(t.base&&t.excluded){w(`exdate`,t.timestamp,!1);return}if(t.full){pe(e);return}t.full||w(`rdate`,t.timestamp,!0)},[w,b,pe]),he=(0,M.useCallback)(e=>fe(b,e),[b]),ge=async t=>{if(!(!e||a)){o(!0);try{_e({eventId:await it(i.current),recurrenceId:t,siteId:e.siteId,onSave:()=>n?.()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{o(!1)}}};return(0,X.jsx)(qr,{ref:i,children:(0,X.jsxs)(D,{children:[(0,X.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,X.jsx)(Yr,{children:l(`Schedule Preview`)}),C&&(0,X.jsx)(Xr,{children:C})]}),(0,X.jsxs)(Jr,{children:[(0,X.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,X.jsx)(ye,{...m(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[be,xe],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(d().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:c,timeZone:`UTC`,eventDisplay:`none`,events:re,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>y({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=he(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``,x(e.date)?`fc-cancelled-date`:``].filter(Boolean)},dayCellContent:e=>{let t=x(e.date),n=t?l(`Cancelled`):void 0;return(0,X.jsxs)(`span`,{title:n,children:[e.dayNumberText,t&&(0,X.jsxs)(`span`,{className:`cancelled-date-label`,children:[`, `,n]})]})},dateClick:e=>me(e.date)}),oe&&(0,X.jsx)(Zr,{children:oe})]}),(0,X.jsx)(Qr,{children:S.length===0?(0,X.jsxs)(`p`,{children:[l(`No occurrences starting from`),(0,X.jsx)(`br`,{}),O(t(v?.currentStart??new Date),`PP`,{locale:d()})]}):(0,X.jsx)($r,{$count:S.length,children:S.map(e=>{let n=new Date(e*1e3),r=x(n),i=O(t(n),u,{locale:d()}),o=ae(b,n),s=_?ne(b,n):null,c=l(o===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:i});return(0,X.jsxs)(ei,{className:r?`is-cancelled`:void 0,children:[(0,X.jsxs)(`span`,{className:`occurrence-date`,children:[(0,X.jsx)(`span`,{children:i}),r&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:l(`Cancelled`)})]}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[s&&(0,X.jsx)(Ir,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":l(`Edit occurrence on {date}`,{date:i}),title:l(`Edit occurrence`),disabled:a,onClick:()=>void ge(s)}),o&&(0,X.jsx)(Ir,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:a,"aria-label":c,title:c,onClick:()=>pe(n)})]})]},g(n))})})})]})]})})},ri=r.div`
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
`,ii=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,ai=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,oi=e=>h(Te(o(e),1)),si=(e,t,n)=>{let r=li(t,n);return e.getTime()>=r.getTime()},ci=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return h(Ce(A(o(e)),1));let i=o(e),a=li(t,r);return i.getTime()>=a.getTime()?e:h(a)},li=(e,t)=>Me(o(e),t),ui=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},di=({inputValue:e,value:t,min:n})=>{let r=ui(e)??n??t??0;return n===void 0?r:Math.max(r,n)},fi=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,M.useState)(e?.toString()??``),o=(0,M.useRef)(void 0),s=(0,M.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,M.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,M.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,M.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,M.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=ui(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,M.useCallback)(n=>{n.stopPropagation();let r=di({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},pi=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=fi({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(D,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},mi=()=>null,Z=[{value:`MO`,label:`Monday`,days:[y.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[y.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[y.WE.weekday]},{value:`TH`,label:`Thursday`,days:[y.TH.weekday]},{value:`FR`,label:`Friday`,days:[y.FR.weekday]},{value:`SA`,label:`Saturday`,days:[y.SA.weekday]},{value:`SU`,label:`Sunday`,days:[y.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[y.MO.weekday,y.TU.weekday,y.WE.weekday,y.TH.weekday,y.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[y.SA.weekday,y.SU.weekday]}],hi=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},gi=(e,t)=>{let n=hi(e),r=hi(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},_i=(e,t)=>{if(e){let t=Z.find(t=>gi(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},vi=e=>Z.find(t=>t.value===e)?.days??[y.MO.weekday],Q=`5px`,yi=r.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,bi=r(yi)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,xi=r(yi)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,Si=r.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,Ci=r(Si)`
  grid-template-columns: repeat(7, 1fr);

  ${yi} {
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
`,wi=r(Si)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${yi} {
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
`,Ti=r(Si)`
  grid-template-columns: repeat(4, 1fr);

  ${yi} {
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
`,Ei=({label:e,values:t,onChange:n})=>(0,X.jsx)(D,{label:e,children:(0,X.jsxs)(Ci,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(bi,{type:`button`,className:T(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(xi,{},e))]})}),Di=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],Oi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],ki=()=>{let e=P(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=F(J.state),a=o(t),s=a.getDate(),c=(a.getDay()+6)%7,l=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[s],d=i?.[0]??1,f=_i(r,c),p=t=>{e(q.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(q.setByRules({bymonthday:void 0,byweekday:vi(t),bysetpos:[n]}))};return(0,X.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(j,{translateOptions:!0,label:`Repeat on`,value:l,options:Di,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,X.jsx)(Ei,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,X.jsxs)(k,{children:[(0,X.jsx)(j,{translateOptions:!0,label:`Position`,value:d,options:Oi,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(j,{translateOptions:!0,label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},Ai=[{weekday:y.SU,label:`Sun`},{weekday:y.MO,label:`Mon`},{weekday:y.TU,label:`Tue`},{weekday:y.WE,label:`Wed`},{weekday:y.TH,label:`Thu`},{weekday:y.FR,label:`Fri`},{weekday:y.SA,label:`Sat`}],ji=()=>{let e=P(),{byweekday:t}=F(J.state);return(0,X.jsx)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,X.jsx)(D,{label:`On`,children:(0,X.jsx)(wi,{children:Ai.map(({weekday:n,label:r})=>(0,X.jsx)(bi,{type:`button`,className:T(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:l(r)},n.weekday))})})})},Mi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],Ni=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Pi=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],Fi=()=>{let e=P(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=F(J.state),s=o(t),c=s.getDate(),u=s.getMonth()+1,d=(s.getDay()+6)%7,f=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,p=r?.length?r:[c],m=n?.length?n:[u],h=a?.[0]??1,g=_i(i,d),_=(t,n)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(t,n,r)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:vi(n),bysetpos:[r]}))};return(0,X.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(D,{label:`Month`,children:(0,X.jsx)(Ti,{children:Pi.map(e=>{let t=m.includes(e.value);return(0,X.jsx)(bi,{type:`button`,className:T(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:l(e.label)},e.value)})})}),(0,X.jsx)(j,{translateOptions:!0,label:`Repeat on`,value:f,options:Mi,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,X.jsx)(Ei,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,X.jsxs)(k,{children:[(0,X.jsx)(j,{translateOptions:!0,label:`Position`,value:h,options:Ni,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,X.jsx)(j,{translateOptions:!0,label:`Day`,value:g,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},Ii=()=>{let{freq:e}=F(J.state);return e===_.DAILY?(0,X.jsx)(mi,{}):e===_.WEEKLY?(0,X.jsx)(ji,{}):e===_.MONTHLY?(0,X.jsx)(ki,{}):e===_.YEARLY?(0,X.jsx)(Fi,{}):null},Li=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Ri=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),zi=()=>{let e=P(),{interval:t}=F(J.state);return(0,X.jsxs)(Bi,{children:[(0,X.jsx)(`span`,{children:l(`Every`)}),(0,X.jsx)(Vi,{"aria-label":l(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(q.setInterval(n))}}),(0,X.jsxs)(Hi,{children:[(0,X.jsx)(Ui,{type:`button`,"aria-label":l(`Increase interval`),onClick:()=>e(q.setInterval(t+1)),children:(0,X.jsx)(Ri,{})}),(0,X.jsx)(Ui,{type:`button`,"aria-label":l(`Decrease interval`),onClick:()=>e(q.setInterval(t-1)),children:(0,X.jsx)(Li,{})})]})]})},Bi=r.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Vi=r.input`
  width: 60px;
`,Hi=r.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Ui=r.button`
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
`,Wi=me({position:[`bottom`,`top`],alignment:`end`,padding:8}),Gi=(e,t,n,r)=>{let[i,a]=(0,M.useState)();return(0,M.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=v({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Wi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Ki=(e,t,n)=>{(0,M.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},qi=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:p})=>{let[m,g]=(0,M.useState)(!1),_=(0,M.useRef)(null),v=(0,M.useRef)(null),y=(0,M.useRef)(null),b=Gi(m,v,y,_);return(0,M.useEffect)(()=>{a.length===0&&g(!1)},[a.length]),Ki(m,[v,y],()=>g(!1)),(0,X.jsxs)(wr,{children:[(0,X.jsx)(Tr,{children:l(e)}),t&&(0,X.jsx)(Er,{children:l(t)}),(0,X.jsxs)(Dr,{children:[(0,X.jsxs)(Ar,{ref:_,children:[(0,X.jsx)(jr,{ref:v,type:`button`,disabled:a.length===0,className:T({active:m}),onClick:()=>{a.length!==0&&g(e=>!e)},children:a.length}),m&&(0,X.jsxs)(Mr,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,X.jsx)(Nr,{children:l(i)}),(0,X.jsx)(Pr,{children:a.map(e=>(0,X.jsxs)(Fr,{children:[(0,X.jsx)(`span`,{children:c(e)}),(0,X.jsx)(`button`,{type:`button`,"aria-label":l(`Remove date {date}`,{date:c(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,X.jsx)(Or,{children:(0,X.jsx)(je,{...f(),selected:null,onChange:e=>{e&&d(h(A(e)))},customInput:(0,X.jsx)(Ji,{label:n,className:T(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:l(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},Ji=(0,M.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(kr,{type:`button`,ref:n,...t,children:l(e)}));Ji.displayName=`PickerTrigger`;var Yi=r.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,Xi=()=>{let e=P(),n=F(J.state),{start:r,rrule:i}=n,a=(0,M.useMemo)(()=>ie(i,r),[i,r]),{startTimestamp:o,baseRule:l,recurrenceSet:u}=a,d=(0,M.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>h(A(t(e)))).filter(e=>l?!0:e!==o))).sort((e,t)=>e-t):[],[l,u,o]),f=(0,M.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>h(A(t(e)))))).sort((e,t)=>e-t):[],[u]),p=(0,M.useMemo)(()=>new Set(d),[d]),m=(0,M.useMemo)(()=>new Set(f),[f]),g=(0,M.useCallback)(e=>{let t=s(A(e)),n=c(De(e)),r=l?l.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:h(A(e))===o;return{full:i,base:r,excluded:r&&!i}},[l,u,o]),_=r=>{let i=r({baseRule:l,rdates:u?.rdates().filter(e=>l?!0:h(A(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(q.setRRule(oe(n,i.baseRule,Zi(i.rdates),Zi(i.exdates))))};return{addedDates:d,excludedDates:f,addFixedDate:(e,t)=>{if(e===`exdate`&&x(a,t))return;let r=w(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:b(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&x(a,t))return;let r=w(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?b(n,r):n,exdates:e===`exdate`?b(i,r):i}))},canAddOccurrence:(0,M.useCallback)(e=>{let t=h(A(e)),n=g(e);return!n.full&&!n.excluded&&!p.has(t)},[p,g]),canExcludeOccurrence:(0,M.useCallback)(e=>{let t=h(A(e)),n=g(e);return n.base&&!n.excluded&&!m.has(t)&&!x(a,t)},[m,g,a]),getStatus:g}},Zi=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},Qi=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],$i=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],ea=e=>[{value:_.DAILY,label:e?`Days`:`Day`},{value:_.WEEKLY,label:e?`Weeks`:`Week`},{value:_.MONTHLY,label:e?`Months`:`Month`},{value:_.YEARLY,label:e?`Years`:`Year`}],ta=300,na=()=>{let e=P(),t=F(J.state),n=F(Y.weekStartDay),r=F(Y.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:s,until:c,freq:l,start:u,interval:f}=t,p=i!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=Xi(),b=(0,M.useMemo)(()=>o(u),[u]),ee=e=>O(o(e),r,{locale:d()});return(0,X.jsxs)(Yi,{children:[(0,X.jsxs)(k,{$alignItems:`end`,style:{width:`100%`},children:[(0,X.jsx)(j,{translateOptions:!0,label:`Repeats`,value:i,options:Qi,onChange:t=>e(q.setRepeatType(t))}),i===`CUSTOM`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(zi,{}),(0,X.jsx)(j,{translateOptions:!0,label:``,value:l,options:ea(f>1),onChange:t=>e(q.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,X.jsx)(Ii,{}),i!==`NEVER`&&(0,X.jsxs)(k,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(j,{translateOptions:!0,label:`Ends`,options:$i,value:a,onChange:t=>e(q.setRepeatEndType(t))}),a===`AFTER`&&(0,X.jsx)(pi,{label:`Times`,value:s,min:1,debounceMs:ta,onChange:t=>e(q.setCount(t))}),a===`ON_DATE`&&(0,X.jsx)(Ae,{label:``,value:c||null,onChange:t=>e(q.setUntil(t)),datePickerProps:{dateFormat:r,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:b}})]}),(0,X.jsxs)(k,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,X.jsx)(qi,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:ee,filterDate:v,weekStartDay:n,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),p&&(0,X.jsx)(qi,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:ee,filterDate:y,weekStartDay:n,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},ra=({context:e,onOccurrenceSaved:t})=>{let n=(0,M.useId)(),r=(0,M.useId)(),i=(0,M.useId)(),[a,s]=(0,M.useState)(0),[c,u]=(0,M.useState)([]),d=P(),{start:f,end:p,allDay:m}=F(J.state),{date:h,time:g,datetime:_}=F(Y.formats),v=F(Y.weekStartDay),y=F(Y.timeInterval),b=F(Y.eventDuration),ee=(0,M.useMemo)(()=>m?h.short.icu:_.short.icu,[m,h,_]),te=(0,M.useMemo)(()=>m?oi(p):p,[m,p]);return(0,X.jsxs)(ri,{children:[(0,X.jsxs)(ii,{children:[(0,X.jsxs)(ai,{children:[(0,X.jsx)(Ae,{id:r,label:`Starts`,value:f,onChange:e=>d(q.setStart(e)),datePickerProps:{id:r,showIcon:!0,icon:(0,X.jsx)(Se,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:ee,timeFormat:g.short.icu,todayButton:l(`Today`),calendarStartDay:v,timeIntervals:y}}),(0,X.jsx)(Ae,{id:i,label:`Ends`,value:te,onChange:e=>{e!=null&&d(q.setEnd(ci({value:e,start:f,allDay:m,timeInterval:y})))},datePickerProps:{id:i,showIcon:!0,icon:(0,X.jsx)(Se,{}),toggleCalendarOnIconClick:!0,minDate:o(f),showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:ee,timeFormat:g.short.icu,todayButton:l(`Today`),calendarStartDay:v,timeIntervals:y,filterTime:e=>si(new Date(e),f,y)}}),(0,X.jsx)(ke,{id:n,label:`All Day`,enabled:m,style:{margin:0},onClick:e=>d(q.setAllDay({enabled:e,eventDuration:b}))})]}),(0,X.jsx)(na,{}),e?.eventId&&(0,X.jsx)(Kr,{context:e,refreshKey:a,onOccurrencesChanged:u})]}),(0,X.jsx)(ni,{context:e,editedOccurrences:c,onOccurrenceSaved:()=>{s(e=>e+1),t?.()}})]})},ia=r.div`
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
`,aa=r.div`
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
`,oa=({context:e})=>{let{allDay:n}=F(J.state),r=F(Y.formats),i=(e,n=!1)=>O(t(new Date(e*1e3)),n?r?.datetime.short.icu??`Pp`:r?.date.short.icu??`P`,{locale:d()}),{splitAt:a,series:o}=e,s=o?.earlier??null,c=o?.later??null;return!a&&!s&&!c?null:(0,X.jsxs)(aa,{children:[a&&(0,X.jsx)(`p`,{children:l(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:i(a,!n)})}),(s||c)&&(0,X.jsxs)(`nav`,{children:[(0,X.jsx)(`span`,{children:l(`Part of a series`)}),s&&(0,X.jsxs)(`a`,{href:s.url,children:[`← `,l(`Earlier part, from {date}`,{date:i(s.start)})]}),c&&(0,X.jsxs)(`a`,{href:c.url,children:[l(`Later part, from {date}`,{date:i(c.start)}),` →`]})]})]})},sa=({context:e})=>{let{rrule:n}=F(J.state),r=(0,M.useMemo)(lt,[]),i=n?he(n,{forceset:!0}).all((e,t)=>t<10).map(e=>`${O(t(e),`yyyy-MM-dd HH:mm`)} [${Ne(e)}]`):[];return(0,X.jsxs)(ia,{children:[e&&(0,X.jsx)(oa,{context:e}),(0,X.jsx)(ra,{context:e}),r&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:n}),(0,X.jsx)(`pre`,{children:JSON.stringify(i,null,2)})]})]})},ca=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,la(n)),$(t,`end`,la(r)),$(t,`until`,i?la(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},la=e=>O(o(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},ua=e=>{let t=te(e.event.rrule),{byweekday:n,bysetpos:r}=vr(t?.options.byweekday),i=yr(e.event.repeatType),a=br(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||_.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?xr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Jn({reducer:{app:zr,event:Cr},preloadedState:o})},da=new WeakSet,fa=e=>{if(da.has(e))return;da.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=ua(r),a=Ie.createRoot(n);i.subscribe(()=>{ca(i,e)}),ca(i,e),a.render((0,X.jsx)(Ye,{store:i,children:(0,X.jsx)(sa,{context:r.context})}))},pa=(e=document)=>{e.querySelectorAll(`[data-calendar-transfer-select]`).forEach(ot),e.querySelectorAll(`[data-calendar-transfer]`).forEach(ct),e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(fa)},ma=()=>{pa(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-calendar-transfer-select]`)&&ot(e),e.matches(`[data-calendar-transfer]`)&&ct(e),e.matches(`[data-event-builder]`)&&fa(e),pa(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ma):ma();
