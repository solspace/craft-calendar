import{a as e,c as t,i as n,l as r,o as i,s as a,t as o,u as s}from"./translations-CPvEMAbD.js";import{c,l,o as u,s as d}from"./create-with-ai.styles-dAY_Ede8.js";import{S as f,_ as p,g as m,h,n as g,o as _,r as v,t as y,v as b,x}from"./localization-Mf36Vfg7.js";import{l as ee,m as te,p as ne}from"./calendar.events-B0-G7rS_.js";import{t as re}from"./interaction-DqG35pqf.js";import{_ as S,a as ie,d as ae,f as C,i as oe,m as se,n as w,o as ce,p as T,r as le,s as E,t as ue,u as de,v as D,y as fe}from"./lightswitch-Bj0mJjdb.js";import{A as pe,D as me,E as O,S as he,T as k,_ as A,a as ge,b as _e,c as ve,d as ye,f as be,g as xe,h as Se,i as Ce,l as we,m as Te,n as Ee,o as De,p as Oe,r as ke,s as Ae,t as je,u as Me,v as j,w as Ne,x as Pe,y as Fe}from"./create-with-ai-DzGOu4nE.js";import{t as Ie}from"./http-bwzZaFVT.js";import{t as M}from"./components-DAVK9kbC.js";import{t as Le}from"./ai-button-DEEwQsMT.js";import{t as Re}from"./open-event-create-with-ai-AyWFumb6.js";import{t as N}from"./dropdown-CVbJN3sq.js";function ze(e,t){let n=_(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=T(n.getDate(),2),t=T(n.getMonth()+1,2);a=`${T(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=T(Math.trunc(t/60),2),r=T(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=T(n.getHours(),2),r=T(n.getMinutes(),2),i=T(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Be=r((e=>{var n=t();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Ve=r(((e,t)=>{t.exports=Be()})),He=s(e()),P=s(t(),1),Ue=Ve();function We(e){e()}function Ge(){let e=null,t=null;return{clear(){e=null,t=null},notify(){We(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Ke={notify(){},get:()=>[]};function qe(e,t){let n,r=Ke,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Ge())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Ke)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Je=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ye=typeof navigator<`u`&&navigator.product===`ReactNative`,Xe=Je||Ye?P.useLayoutEffect:P.useEffect,Ze=Symbol.for(`react-redux-context`),Qe=typeof globalThis<`u`?globalThis:{};function $e(){if(!P.createContext)return{};let e=Qe[Ze]??(Qe[Ze]=new Map),t=e.get(P.createContext);return t||(t=P.createContext(null),e.set(P.createContext,t)),t}var F=$e();function et(e){let{children:t,context:n,serverState:r,store:i}=e,a=P.useMemo(()=>{let e=qe(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=P.useMemo(()=>i.getState(),[i]);Xe(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||F;return P.createElement(s.Provider,{value:a},t)}var tt=et;function nt(e=F){return function(){return P.useContext(e)}}var rt=nt();function it(e=F){let t=e===F?rt:nt(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var at=it();function ot(e=F){let t=e===F?at:it(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var I=ot(),st=(e,t)=>e===t;function ct(e=F){let t=e===F?rt:nt(e),n=(e,n={})=>{let{equalityFn:r=st}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();P.useRef(!0);let s=P.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Ue.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return P.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var L=ct(),lt=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`[data-element-editor]`).data(`elementEditor`)??t(e).closest(`form`).data(`elementEditor`)},ut=async e=>{let t=lt(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},dt=new WeakSet,ft=e=>{let t=window.jQuery;if(dt.has(e)||!t)return;dt.add(e);let n=Number(e.dataset.calendarId),r=e.querySelector(`button.menubtn`),i=r?.querySelector(`.inline-flex`),a=i?.innerHTML,o=!1;t(e).on(`change`,async()=>{let s=Number(t(e).data(`value`));if(i&&a&&(i.innerHTML=a),t(e).data(`value`,n),e.querySelectorAll(`[data-value]`).forEach(e=>{e.classList.toggle(`sel`,Number(e.dataset.value)===n)}),o||s===n||!s)return;o=!0,r&&(r.disabled=!0);let c=lt(e),l=!1;try{let t=await ut(e);c?.pause(),l=!!c;let n=new Craft.CpScreenSlideout(`calendar/event-calendar/edit`,{params:{eventId:t,siteId:Number(e.dataset.siteId),targetCalendarId:s}}),i=!1;n.on(`submit`,e=>{let t=e?.response?.data?.url;i=!0,window.location.assign(t||window.location.href)}),n.on(`close`,()=>{!i&&l&&c?.resume(),o=!1,r&&(r.disabled=!1)})}catch{l&&c?.resume(),o=!1,r&&(r.disabled=!1),Craft.cp.displayError(Craft.t(`calendar`,`Couldn’t open the calendar mapping.`))}})},pt=e=>{let t=JSON.parse(e.dataset.populated||`{}`),n=Array.from(e.querySelectorAll(`select[data-field-mapping]`)),r=n.map(e=>e.value).filter(Boolean),i=r.length!==new Set(r).size,a=new Set(r),o=Object.entries(t).filter(([e])=>!a.has(e)),s=e.querySelector(`[data-unmapped-warning]`),c=e.querySelector(`[data-unmapped-fields]`),l=e.querySelector(`[data-mapping-error]`),u=e.querySelector(`input[data-calendar-transfer-confirm]`)?.checked,d=e.closest(`form.cp-screen`)?.querySelector(`.so-footer button.submit`);if(d){let e=!u||i;d.disabled=e,d.classList.toggle(`disabled`,e),d.setAttribute(`aria-disabled`,String(e))}s&&(s.hidden=o.length===0),l&&(l.hidden=!i),c&&c.replaceChildren(...o.map(([,e])=>{let t=document.createElement(`li`);return t.textContent=e,t})),n.forEach(e=>{e.setCustomValidity(i?Craft.t(`calendar`,`Each source field can only be mapped once.`):``)})},mt=e=>{dt.has(e)||(dt.add(e),e.addEventListener(`change`,()=>pt(e)),pt(e))},ht=()=>!1;function R(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var gt=typeof Symbol==`function`&&Symbol.observable||`@@observable`,_t=()=>Math.random().toString(36).substring(7).split(``).join(`.`),vt={INIT:`@@redux/INIT${_t()}`,REPLACE:`@@redux/REPLACE${_t()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${_t()}`};function yt(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function bt(e,t,n){if(typeof e!=`function`)throw Error(R(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(R(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(R(1));return n(bt)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(R(3));return i}function d(e){if(typeof e!=`function`)throw Error(R(4));if(c)throw Error(R(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(R(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!yt(e))throw Error(R(7));if(e.type===void 0)throw Error(R(8));if(typeof e.type!=`string`)throw Error(R(17));if(c)throw Error(R(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(R(10));r=e,f({type:vt.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(R(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[gt](){return this}}}return f({type:vt.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[gt]:m}}function xt(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:vt.INIT})===void 0)throw Error(R(12));if(n(void 0,{type:vt.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(R(13))})}function St(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{xt(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(R(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function Ct(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function wt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(R(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=Ct(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function Tt(e){return yt(e)&&`type`in e&&typeof e.type==`string`}var Et=Symbol.for(`immer-nothing`),Dt=Symbol.for(`immer-draftable`),z=Symbol.for(`immer-state`);function B(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var V=Object,Ot=V.getPrototypeOf,kt=`constructor`,At=`prototype`,jt=`configurable`,Mt=`enumerable`,Nt=`writable`,Pt=`value`,H=e=>!!e&&!!e[z];function U(e){return e?Lt(e)||Wt(e)||!!e[Dt]||!!e[kt]?.[Dt]||Gt(e)||Kt(e):!1}var Ft=V[At][kt].toString(),It=new WeakMap;function Lt(e){if(!e||!qt(e))return!1;let t=Ot(e);if(t===null||t===V[At])return!0;let n=V.hasOwnProperty.call(t,kt)&&t[kt];if(n===Object)return!0;if(!W(n))return!1;let r=It.get(n);return r===void 0&&(r=Function.toString.call(n),It.set(n,r)),r===Ft}function Rt(e,t,n=!0){zt(e)===0?(n?Reflect.ownKeys(e):V.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function zt(e){let t=e[z];return t?t.type_:Wt(e)?1:Gt(e)?2:Kt(e)?3:0}var Bt=(e,t,n=zt(e))=>n===2?e.has(t):V[At].hasOwnProperty.call(e,t),Vt=(e,t,n=zt(e))=>n===2?e.get(t):e[t],Ht=(e,t,n,r=zt(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Ut(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Wt=Array.isArray,Gt=e=>e instanceof Map,Kt=e=>e instanceof Set,qt=e=>typeof e==`object`,W=e=>typeof e==`function`,Jt=e=>typeof e==`boolean`;function Yt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var G=e=>e.copy_||e.base_,Xt=e=>e.modified_?e.copy_:e.base_;function Zt(e,t){if(Gt(e))return new Map(e);if(Kt(e))return new Set(e);if(Wt(e))return Array[At].slice.call(e);let n=Lt(e);if(t===!0||t===`class_only`&&!n){let t=V.getOwnPropertyDescriptors(e);delete t[z];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[Nt]===!1&&(a[Nt]=!0,a[jt]=!0),(a.get||a.set)&&(t[i]={[jt]:!0,[Nt]:!0,[Mt]:a[Mt],[Pt]:e[i]})}return V.create(Ot(e),t)}else{let t=Ot(e);if(t!==null&&n)return{...e};let r=V.create(t);return V.assign(r,e)}}function Qt(e,t=!1){return tn(e)||H(e)||!U(e)?e:(zt(e)>1&&V.defineProperties(e,{set:en,add:en,clear:en,delete:en}),V.freeze(e),t&&Rt(e,(e,t)=>{Qt(t,!0)},!1),e)}function $t(){B(2)}var en={[Pt]:$t};function tn(e){return e===null||!qt(e)?!0:V.isFrozen(e)}var nn=`MapSet`,rn=`Patches`,an=`ArrayMethods`,on={};function K(e){let t=on[e];return t||B(0,e),t}var sn=e=>!!on[e],cn,ln=()=>cn,un=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:sn(nn)?K(nn):void 0,arrayMethodsPlugin_:sn(an)?K(an):void 0});function dn(e,t){t&&(e.patchPlugin_=K(rn),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function fn(e){pn(e),e.drafts_.forEach(hn),e.drafts_=null}function pn(e){e===cn&&(cn=e.parent_)}var mn=e=>cn=un(cn,e);function hn(e){let t=e[z];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function gn(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[z].modified_&&(fn(t),B(4)),U(e)&&(e=_n(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[z].base_,e,t)}else e=_n(t,n);return vn(t,e,!0),fn(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===Et?void 0:e}function _n(e,t){if(tn(t))return t;let n=t[z];if(!n)return En(t,e.handledSet_,e);if(!bn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);wn(n,e)}return n.copy_}function vn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Qt(t,n)}function yn(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var bn=(e,t)=>e.scope_===t,xn=[];function Sn(e,t,n,r){let i=G(e),a=e.type_;if(r!==void 0&&Vt(i,r,a)===t){Ht(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;Rt(i,(e,n)=>{if(H(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??xn;for(let e of o)Ht(i,e,n,a)}function Cn(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!bn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Xt(i);Sn(e,i.draft_??i,a,n),wn(i,r)})}function wn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}yn(e)}}function Tn(e,t,n){let{scope_:r}=e;if(H(n)){let i=n[z];bn(i,r)&&i.callbacks_.push(function(){Pn(e),Sn(e,n,Xt(i),t)})}else U(n)&&e.callbacks_.push(function(){let i=G(e);e.type_===3?i.has(n)&&En(n,r.handledSet_,r):Vt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&En(Vt(e.copy_,t,e.type_),r.handledSet_,r)})}function En(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||H(e)||t.has(e)||!U(e)||tn(e)?e:(t.add(e),Rt(e,(r,i)=>{if(H(i)){let t=i[z];bn(t,n)&&(Ht(e,r,Xt(t),e.type_),yn(t))}else U(i)&&En(i,t,n)}),e)}function Dn(e,t){let n=Wt(e),r={type_:+!!n,scope_:t?t.scope_:ln(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=On;n&&(i=[r],a=kn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var On={get(e,t){if(t===z)return e;if(t===`constructor`||t===`__proto__`){let n=G(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=G(e);if(!Bt(i,t,e.type_))return jn(e,i,t);let a=i[t];if(e.finalized_||!U(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Yt(t))return a;if(a===An(e.base_,t)){Pn(e);let n=e.type_===1?+t:t,r=In(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in G(e)},ownKeys(e){return Reflect.ownKeys(G(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=Mn(G(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=An(G(e),t),i=r?.[z];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Ut(n,r)&&(n!==void 0||Bt(e.base_,t,e.type_)))return!0;Pn(e),Nn(e)}return e.copy_[t]===n&&(n!==void 0||Bt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),Tn(e,t,n),!0)},deleteProperty(e,t){return Pn(e),An(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),Nn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=G(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Nt]:!0,[jt]:e.type_!==1||t!==`length`,[Mt]:r[Mt],[Pt]:n[t]}},defineProperty(){B(11)},getPrototypeOf(e){return Ot(e.base_)},setPrototypeOf(){B(12)}},kn={};for(let e in On){let t=On[e];kn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}kn.deleteProperty=function(e,t){return kn.set.call(this,e,t,void 0)},kn.set=function(e,t,n){return On.set.call(this,e[0],t,n,e[0])};function An(e,t){let n=e[z];return(n?G(n):e)[t]}function jn(e,t,n){let r=Mn(t,n);return r?Pt in r?r[Pt]:r.get?.call(e.draft_):void 0}function Mn(e,t){if(!(t in e))return;let n=Ot(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=Ot(n)}}function Nn(e){e.modified_||(e.modified_=!0,e.parent_&&Nn(e.parent_))}function Pn(e){e.copy_||(e.assigned_=new Map,e.copy_=Zt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var Fn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(W(e)&&!W(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}W(t)||B(6),n!==void 0&&!W(n)&&B(7);let r;if(U(e)){let i=mn(this),a=In(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?fn(i):pn(i)}return dn(i,n),gn(r,i)}else if(!e||!qt(e)){if(r=t(e),r===void 0&&(r=e),r===Et&&(r=void 0),this.autoFreeze_&&Qt(r,!0),n){let t=[],i=[];K(rn).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else B(1,e)},this.produceWithPatches=(e,t)=>{if(W(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Jt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Jt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Jt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){U(e)||B(8),H(e)&&(e=Ln(e));let t=mn(this),n=In(t,e,void 0);return n[z].isManual_=!0,pn(t),n}finishDraft(e,t){let n=e&&e[z];(!n||!n.isManual_)&&B(9);let{scope_:r}=n;return dn(r,t),gn(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=K(rn).applyPatches_;return H(e)?r(e,t):this.produce(e,e=>r(e,t))}};function In(e,t,n,r){let[i,a]=Gt(t)?K(nn).proxyMap_(t,n):Kt(t)?K(nn).proxySet_(t,n):Dn(t,n);return(n?.scope_??ln()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?Cn(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function Ln(e){return H(e)||B(10,e),Rn(e)}function Rn(e){if(!U(e)||tn(e))return e;let t=e[z],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Zt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Zt(e,!0);return Rt(n,(e,t)=>{Ht(n,e,Rn(t))},r),t&&(t.finalized_=!1),n}var zn=new Fn().produce;function Bn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Vn=Bn(),Hn=Bn,Un=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?Ct:Ct.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Wn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(q(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>Tt(t)&&t.type===e,n}var Gn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Kn(e){return U(e)?zn(e,()=>{}):e}function qn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Jn(e){return typeof e==`boolean`}var Yn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new Gn;return t&&(Jn(t)?a.push(Vn):a.push(Hn(t.extraArgument))),a},Xn=`RTK_autoBatch`,Zn=e=>t=>{setTimeout(t,e)},Qn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},$n=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Qn(window.requestAnimationFrame,100):Zn(10):e.type===`callback`?e.queueNotification:Zn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Xn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},er=e=>function(t){let{autoBatch:n=!0}=t??{},r=new Gn(e);return n&&r.push($n(typeof n==`object`?n:void 0)),r};function tr(e){let t=Yn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(yt(n))c=St(n);else throw Error(q(1));let l;l=typeof r==`function`?r(t):t();let u=Ct;i&&(u=Un({trace:!1,...typeof i==`object`&&i}));let d=er(wt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return bt(c,o,p)}function nr(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(q(28));if(r in t)throw Error(q(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function rr(e){return typeof e==`function`}function ir(e,t){let[n,r,i]=nr(t),a;if(rr(e))a=()=>Kn(e());else{let t=Kn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(H(e)){let r=n(e,t);return r===void 0?e:r}else if(U(e))return zn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var ar=Symbol.for(`rtk-slice-createasyncthunk`);function or(e,t){return`${e}/${t}`}function sr({creators:e}={}){let t=e?.asyncThunk?.[ar];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(q(11));let i=(typeof e.reducers==`function`?e.reducers(ur()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(q(12));if(n in o.sliceCaseReducersByType)throw Error(q(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:or(n,r),createNotation:typeof e.reducers==`function`};fr(a)?mr(o,a,s,t):dr(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?nr(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return ir(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=qn(d,r,m)),i}function i(t=l){return qn(qn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=cr(a,t,()=>qn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function cr(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var lr=sr();function ur(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function dr({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!pr(r))throw Error(q(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Wn(e,o):Wn(e))}function fr(e){return e._reducerDefinitionType===`asyncThunk`}function pr(e){return e._reducerDefinitionType===`reducerWithPrepare`}function mr({type:e,reducerName:t},n,r,i){if(!i)throw Error(q(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||hr,pending:s||hr,rejected:c||hr,settled:l||hr})}function hr(){}var gr=`listener`,_r=`completed`,vr=`cancelled`;`${vr}`,`${_r}`,`${gr}${vr}`,`${gr}${_r}`;var{assign:yr}=Object,br=`listenerMiddleware`,xr=yr(Wn(`${br}/add`),{withTypes:()=>xr});`${br}`;var Sr=yr(Wn(`${br}/remove`),{withTypes:()=>Sr});function q(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var Cr=lr({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:wr}=Cr,Tr=Cr.reducer,J={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0,isSolspaceAiConnected:e=>!!e.app.isSolspaceAiConnected},Er=lr({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:O.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=Oe(e,e.until)),r!==void 0&&(e.until=e.start+r),j(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=Oe(e,n),j(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=x(e.start);a.setHours(i,0,0,0),e.start=p(a);let o=x(e.end);n?o=fe(D(o),1):(o=ae(o,1),o=de(o,a.getHours()),o=S(o,r)),e.end=p(o),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=Oe(e,e.until)),j(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=_e(e.rrule)),e.repeatType=t.payload,j(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=he(e.count):e.count=null,j(e)},setFreq:(e,t)=>{e.freq=t.payload,Pe(e,t.payload),j(e)},setCount:(e,t)=>{e.count=he(t.payload),j(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),j(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=A(r),j(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=A(n.byweekday)),`bymonth`in n&&(e.bymonth=A(n.bymonth)),`bymonthday`in n&&(e.bymonthday=A(n.bymonthday)),`byyearday`in n&&(e.byyearday=A(n.byyearday)),`bysetpos`in n&&(e.bysetpos=A(n.bysetpos)),j(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0},applyGeneratedSchedule:(e,t)=>{Object.assign(e,Te(t.payload))}}}),{actions:Y}=Er,Dr=Er.reducer,X={state:e=>e.event},Or=s(a()),Z=i(),kr=(e,t)=>{let n=document.querySelector(e);n&&(n.value=t,n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.dispatchEvent(new Event(`change`,{bubbles:!0})))},Ar=e=>{kr(`#title, input[name='title']`,e)},jr=(e,t)=>{if(!e)return;let n=CSS.escape(e);kr(`textarea[name="fields[${n}]"], input[name="fields[${n}]"], #fields-${n}`,t??``)},Mr=e=>document.querySelector(e)?.value?.trim()??``,Nr=e=>{if(!e)return``;let t=CSS.escape(e);return Mr(`textarea[name="fields[${t}]"], input[name="fields[${t}]"], #fields-${t}`)},Pr=e=>C(x(e),`yyyy-MM-dd'T'HH:mm:ss`),Fr=()=>{window.location.href=Craft.getCpUrl(`calendar/settings/solspaceai`)},Ir=(e,t)=>!e?.length||e.includes(t),Lr=({context:e})=>{let t=(0,P.useRef)(null),n=(0,P.useRef)(!1),r=I(),i=L(J.isSolspaceAiConnected),a=L(X.state),{showPopover:s,hidePopover:c}=d(),l=document.querySelector(`[data-event-ai-create-root]`),u=()=>({title:Mr(`#title, input[name='title']`)||`Untitled`,description:Nr(e?.descriptionFieldHandle),location:Nr(e?.locationFieldHandle),start:Pr(a.start),end:Pr(a.end),allDay:a.allDay,repeatType:a.repeatType,rrule:a.rrule||``,calendarId:e?.calendarId}),f=t=>{let n=t.changedFields;Ir(n,`title`)&&Ar(t.title),Ir(n,`description`)&&jr(e?.descriptionFieldHandle,t.description),Ir(n,`location`)&&jr(e?.locationFieldHandle,t.location),(!n?.length||[`start`,`end`,`allDay`,`repeatType`,`rrule`,`additionalDates`,`excludedDates`].some(e=>n.includes(e)))&&(n?.length&&n.every(e=>[`additionalDates`,`excludedDates`,`rrule`].includes(e))&&t.rrule?r(Y.setRRule(t.rrule)):r(Y.applyGeneratedSchedule({start:t.start,end:t.end,allDay:t.allDay,repeatType:t.repeatType||`NEVER`,repeatEndType:t.repeatEndType||void 0,until:t.until??void 0,rrule:t.rrule||void 0,timezone:a.timezone}))),c()},p=()=>{if(!i){Fr();return}let e=t.current;e&&s((0,Z.jsx)(je,{mode:`edit`,calendarSelected:!0,currentEvent:u(),onCancel:c,onApplyDraft:f}),e,{alignment:`end`,position:[`bottom`,`top`,`right`,`left`]})},m=(0,P.useRef)(p);return m.current=p,(0,P.useEffect)(()=>{if(n.current||!l||!i||!Re())return;n.current=!0;let e=window.setTimeout(()=>m.current(),100);return()=>window.clearTimeout(e)},[i,l]),l?(0,Or.createPortal)((0,Z.jsx)(Le,{ref:t,icon:`edit`,connected:i,label:o(`Update with AI`),onClick:p}),l):null},Rr=n.div`
  padding-top: 16px;
  width: 100%;
`,zr=n.div`
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
`,Br=n.p`
  && {
    margin: 0 0 8px;
    padding: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
`,Vr=n.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Hr=n.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  ${le}

  .react-datepicker__current-month {
    display: none;
  }
`,Ur=n.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Wr=n.div`
  position: relative;
  flex-shrink: 0;
`,Gr=n.button`
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
`,Kr=n.div`
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
`,qr=n.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Jr=n.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Yr=n.li`
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
`,Xr=n.button`
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
`,Zr=n.div`
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
`,Qr=n.ul`
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
`,$r=n.li`
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
`,ei=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],ti=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of ei){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},ni=({context:e,refreshKey:t,onOccurrencesChanged:n})=>{let r=(0,P.useRef)(null),[i,a]=(0,P.useState)([]),[s,c]=(0,P.useState)(null),[l,u]=(0,P.useState)(null),d=(0,P.useRef)(0),f=L(X.state),p=L(J.formats),m=e=>pe(e,p),h=(0,P.useCallback)(()=>lt(r.current)?.settings.elementId??e.eventId,[e.eventId]),g=(0,P.useCallback)(async()=>{let t=h();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let r=await Ie(n,{headers:{Accept:`application/json`}});if(!r.ok)return;let i=(await r.json()).occurrences??[];++d.current,a(i),u(null)},[e.siteId,h]);(0,P.useEffect)(()=>{g()},[g,t]);let _=(0,P.useCallback)(async()=>{let t=h();if(!t)return;let n=++d.current,i=await Ie(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...ti(r.current)})});if(!i.ok)return;let a=await i.json();n===d.current&&u(new Set(a.orphaned??[]))},[e.siteId,h]);(0,P.useEffect)(()=>{if(++d.current,i.length===0)return;let e=setTimeout(()=>void _(),400);return()=>clearTimeout(e)},[f,i,_]);let v=e=>l?l.has(e.recurrenceId):e.orphaned;(0,P.useEffect)(()=>{n?.(i.map(e=>({...e,orphaned:l?l.has(e.recurrenceId):e.orphaned})))},[i,l,n]);let y=async t=>{c(t.recurrenceId);try{let n=await ut(r.current);if(!n)return;ee({eventId:n,recurrenceId:t.recurrenceId,siteId:e.siteId,onSave:()=>void g()})}catch{Craft.cp.displayError(o(`Couldn’t open the occurrence for editing.`))}finally{c(null)}},b=async t=>{if(window.confirm(o(`Remove everything this occurrence changes?`))){c(t.recurrenceId);try{let n=await ut(r.current);if(!n)return;let i=await Ie(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||o(`Couldn’t reset the occurrence.`));return}await g()}catch{Craft.cp.displayError(o(`Couldn’t reset the occurrence.`))}finally{c(null)}}};return(0,Z.jsx)(Zr,{ref:r,children:i.length>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(zr,{as:`h3`,children:o(`Edited occurrences`)}),(0,Z.jsx)(Br,{children:o(`Occurrences with their own changes. Changes made here go live with the event.`)}),i.some(v)&&(0,Z.jsx)(Br,{className:`warning`,children:o(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,Z.jsx)(Qr,{children:i.map(e=>(0,Z.jsxs)($r,{className:E(v(e)&&`is-orphaned`,e.cancelled&&`is-cancelled`),children:[(0,Z.jsxs)(`div`,{className:`occurrence-details`,children:[(0,Z.jsx)(`span`,{className:`occurrence-title`,children:e.title}),e.cancelled&&(0,Z.jsx)(`span`,{className:`occurrence-state cancelled`,children:o(`Cancelled`)}),v(e)&&(0,Z.jsx)(`span`,{className:`occurrence-state`,children:o(`No longer on the schedule`)})]}),(0,Z.jsx)(`div`,{className:`occurrence-date`,children:m(e)}),(0,Z.jsx)(`div`,{className:`occurrence-changes`,children:(0,Z.jsx)(`span`,{children:e.changes.join(`, `)})}),(0,Z.jsxs)(`div`,{className:`occurrence-actions`,children:[!v(e)&&(0,Z.jsx)(Xr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":o(`Edit occurrence on {date}`,{date:m(e)}),title:o(`Edit occurrence`),disabled:s!==null,onClick:()=>void y(e)}),(0,Z.jsx)(Xr,{type:`button`,className:`icon occurrence-discard`,"data-icon":`remove`,"aria-label":`${o(`Discard`)}: ${m(e)}`,title:o(`Removes everything this occurrence changes.`),disabled:s!==null,onClick:()=>void b(e)})]})]},e.recurrenceId))})]})})},ri=n.div`
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
`,ii=n.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  margin-top: 10px;
  width: 455px;
  max-width: 100%;
  box-sizing: border-box;
`,ai=n.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,oi=n.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,si=n.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,ci=n.div`
  min-width: max-content;
  flex: 1;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,li=n.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,ui=n.li`
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
`,di=n.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 3px 8px;
    border: 1px solid var(--gray-200);
    border-radius: var(--radius-sm);
    background: var(--gray-050);
    font-size: 12px;
    line-height: 1.4;
    color: var(--gray-700);
  }
`,fi=(e,t=[])=>{let n=[],r=(e,t,r)=>{e>0&&n.push(o(e===1?t:r,{count:e}))},i=(e.recurrenceSet?.rdates()??[]).filter(t=>{let n=ye(e,t);return n.full&&!n.base&&n.timestamp!==e.startTimestamp}).length,a=(e.recurrenceSet?.exdates()??[]).filter(t=>ye(e,t).excluded).length,s=t.filter(e=>!e.orphaned);return r(i,`{count} additional date`,`{count} additional dates`),r(a,`{count} excluded date`,`{count} excluded dates`),r(s.filter(e=>!e.cancelled).length,`{count} edited occurrence`,`{count} edited occurrences`),r(s.filter(e=>e.cancelled).length,`{count} cancelled occurrence`,`{count} cancelled occurrences`),r(t.filter(e=>e.orphaned).length,`{count} edit off schedule`,`{count} edits off schedule`),n},pi=(e,t,n,r=`PP`,i=`PPp`)=>{let a=e=>C(x(e),n?r:i,{locale:g()});return e?.splitAt?o(`This draft changes the series from {date} onward.`,{date:a(e.splitAt)}):e?.series?.later?o(`This part of the series starts on {start} and ends before {end}.`,{start:a(t),end:a(e.series.later.start)}):e?.series?.earlier?o(`This part of the series starts on {date}.`,{date:a(t)}):null},mi=8,hi=({context:e,onOccurrenceSaved:t,editedOccurrences:n})=>{let r=(0,P.useRef)(null),[i,a]=(0,P.useState)(!1),s=I(),c=L(J.weekStartDay),l=L(J.formats),u=l?.date.short.icu??`P`,d=l?.datetime?.short.icu??`Pp`,p=L(X.state),{start:m,rrule:h}=p,_=!!(e?.eventId&&h),[v,x]=(0,P.useState)(null),S=(0,P.useMemo)(()=>ge(h,m),[h,m]),ae=(0,P.useMemo)(()=>new Set(n?.filter(e=>e.cancelled&&!e.orphaned).map(e=>e.recurrenceId.replace(` `,`T`))),[n]),oe=e=>{let t=we(S,e);return t!==null&&ae.has(t)},se=(0,P.useMemo)(()=>Ce(S,v),[S,v]),w=(0,P.useMemo)(()=>De(S,v?.start??null,mi),[S,v]),ce=(0,P.useMemo)(()=>ve(S,u),[S,u]),T=(0,P.useMemo)(()=>{let e=ke(S,w.length);return e?Ae(e):null},[S,w]),le=(0,P.useMemo)(()=>fi(S,n),[S,n]),E=pi(e,m,p.allDay,u,d),ue=(0,P.useCallback)((e,t,n)=>{s(Y.setRRule(Ee(p,S,e,t,n)))},[s,S,p]),de=(0,P.useCallback)(e=>{let t=Me(S,e);if(t){let{timestamp:n}=ye(S,e);ue(t,n,t===`exdate`)}},[ue,S]),D=(0,P.useCallback)(e=>{let t=ye(S,e);if(t.base&&t.excluded){ue(`exdate`,t.timestamp,!1);return}if(t.full){de(e);return}t.full||ue(`rdate`,t.timestamp,!0)},[ue,S,de]),fe=(0,P.useCallback)(e=>ye(S,e),[S]),pe=async n=>{if(!(!e||i)){a(!0);try{ee({eventId:await ut(r.current),recurrenceId:n,siteId:e.siteId,onSave:()=>t?.()})}catch{Craft.cp.displayError(o(`Couldn’t open the occurrence for editing.`))}finally{a(!1)}}};return(0,Z.jsx)(ri,{ref:r,children:(0,Z.jsxs)(ie,{children:[(0,Z.jsxs)(M,{$direction:`column`,$gap:10,children:[(0,Z.jsx)(ai,{children:o(`Schedule Preview`)}),ce&&(0,Z.jsx)(oi,{children:ce})]}),le.length>0&&(0,Z.jsx)(di,{"aria-label":o(`Schedule changes`),children:le.map(e=>(0,Z.jsx)(`li`,{children:e},e))}),E&&(0,Z.jsx)(oi,{children:E}),(0,Z.jsxs)(ii,{children:[(0,Z.jsxs)(M,{$direction:`column`,$gap:10,children:[(0,Z.jsx)(ne,{...y(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[te,re],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(g().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:c,timeZone:`UTC`,eventDisplay:`none`,events:se,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>x({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=fe(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``,oe(e.date)?`fc-cancelled-date`:``].filter(Boolean)},dayCellContent:e=>{let t=oe(e.date),n=t?o(`Cancelled`):void 0;return(0,Z.jsxs)(`span`,{title:n,children:[e.dayNumberText,t&&(0,Z.jsxs)(`span`,{className:`cancelled-date-label`,children:[`, `,n]})]})},dateClick:e=>D(e.date)}),T&&(0,Z.jsx)(si,{children:T})]}),(0,Z.jsx)(ci,{children:w.length===0?(0,Z.jsxs)(`p`,{children:[o(`No occurrences starting from`),(0,Z.jsx)(`br`,{}),C(f(v?.currentStart??new Date),`PP`,{locale:g()})]}):(0,Z.jsx)(li,{$count:w.length,children:w.map(e=>{let t=new Date(e*1e3),n=oe(t),r=C(f(t),u,{locale:g()}),a=Me(S,t),s=_?we(S,t):null,c=o(a===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:r});return(0,Z.jsxs)(ui,{className:n?`is-cancelled`:void 0,children:[(0,Z.jsxs)(`span`,{className:`occurrence-date`,children:[(0,Z.jsx)(`span`,{children:r}),n&&(0,Z.jsx)(`span`,{className:`occurrence-state`,children:o(`Cancelled`)})]}),(0,Z.jsxs)(`div`,{className:`occurrence-actions`,children:[s&&(0,Z.jsx)(Xr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":o(`Edit occurrence on {date}`,{date:r}),title:o(`Edit occurrence`),disabled:i,onClick:()=>void pe(s)}),a&&(0,Z.jsx)(Xr,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:i,"aria-label":c,title:c,onClick:()=>de(t)})]})]},b(t))})})})]})]})})},gi=({context:e,refreshKey:t})=>{let n=L(X.state),{showOverlapWarnings:r,formats:i}=L(J.config),a=(0,P.useRef)(null),o=(0,P.useCallback)(()=>lt(a.current)?.settings.elementId??e?.eventId,[e?.eventId]);return e?.calendarId?(0,Z.jsx)(`div`,{ref:a,style:{padding:r?`0 20px 12px`:`0 20px`,marginTop:r?-8:0},children:(0,Z.jsx)(me,{formats:i,enabled:r,schedule:{...n,rrule:n.rrule??``,calendarId:e.calendarId,siteId:e.siteId},resolveEventId:o,refreshKey:t})}):null},_i=n.div`
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
`,vi=n.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,yi=n.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,bi=e=>p(ae(x(e),1)),xi=(e,t,n)=>{let r=Ci(t,n);return e.getTime()>=r.getTime()},Si=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return p(fe(D(x(e)),1));let i=x(e),a=Ci(t,r);return i.getTime()>=a.getTime()?e:p(a)},Ci=(e,t)=>S(x(e),t),wi=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Ti=({inputValue:e,value:t,min:n})=>{let r=wi(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Ei=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,P.useState)(e?.toString()??``),o=(0,P.useRef)(void 0),s=(0,P.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,P.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,P.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,P.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,P.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=wi(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,P.useCallback)(n=>{n.stopPropagation();let r=Ti({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Di=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Ei({value:e,min:t,debounceMs:n,onChange:r});return(0,Z.jsx)(ie,{...i,children:(0,Z.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Oi=()=>null,ki=[{value:`MO`,label:`Monday`,days:[k.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[k.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[k.WE.weekday]},{value:`TH`,label:`Thursday`,days:[k.TH.weekday]},{value:`FR`,label:`Friday`,days:[k.FR.weekday]},{value:`SA`,label:`Saturday`,days:[k.SA.weekday]},{value:`SU`,label:`Sunday`,days:[k.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[k.MO.weekday,k.TU.weekday,k.WE.weekday,k.TH.weekday,k.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[k.SA.weekday,k.SU.weekday]}],Ai=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},ji=(e,t)=>{let n=Ai(e),r=Ai(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Mi=(e,t)=>{if(e){let t=ki.find(t=>ji(t.days,e));if(t)return t.value}if(t!==void 0){let e=ki.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return ki[0].value},Ni=e=>ki.find(t=>t.value===e)?.days??[k.MO.weekday],Q=`5px`,Pi=n.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,Fi=n(Pi)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,Ii=n(Pi)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,Li=n.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,Ri=n(Li)`
  grid-template-columns: repeat(7, 1fr);

  ${Pi} {
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
`,zi=n(Li)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${Pi} {
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
`,Bi=n(Li)`
  grid-template-columns: repeat(4, 1fr);

  ${Pi} {
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
`,Vi=({label:e,values:t,onChange:n})=>(0,Z.jsx)(ie,{label:e,children:(0,Z.jsxs)(Ri,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,Z.jsx)(Fi,{type:`button`,className:E(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,Z.jsx)(Ii,{},e))]})}),Hi=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],Ui=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Wi=()=>{let e=I(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=L(X.state),a=x(t),o=a.getDate(),s=(a.getDay()+6)%7,c=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,l=n?.length?n:[o],u=i?.[0]??1,d=Mi(r,s),f=t=>{e(Y.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},p=(t,n)=>{e(Y.setByRules({bymonthday:void 0,byweekday:Ni(t),bysetpos:[n]}))};return(0,Z.jsxs)(M,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Repeat on`,value:c,options:Hi,onChange:e=>{e===`WEEKDAY`?p(d,u):f(l)}}),c===`MONTHDAY`&&(0,Z.jsx)(Vi,{label:`Days of Month`,values:l,onChange:e=>f(e)}),c===`WEEKDAY`&&(0,Z.jsxs)(M,{children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Position`,value:u,options:Ui,onChange:e=>p(d,Number.parseInt(e,10))}),(0,Z.jsx)(N,{translateOptions:!0,label:`Day`,value:d,options:ki.map(e=>({value:e.value,label:e.label})),onChange:e=>p(e,u)})]})]})},Gi=[{weekday:k.SU,label:`Sun`},{weekday:k.MO,label:`Mon`},{weekday:k.TU,label:`Tue`},{weekday:k.WE,label:`Wed`},{weekday:k.TH,label:`Thu`},{weekday:k.FR,label:`Fri`},{weekday:k.SA,label:`Sat`}],Ki=()=>{let e=I(),{byweekday:t}=L(X.state);return(0,Z.jsx)(M,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,Z.jsx)(ie,{label:`On`,children:(0,Z.jsx)(zi,{children:Gi.map(({weekday:n,label:r})=>(0,Z.jsx)(Fi,{type:`button`,className:E(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(Y.setDays({type:`byweekday`,values:r}))},children:o(r)},n.weekday))})})})},qi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],Ji=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Yi=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],Xi=()=>{let e=I(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=L(X.state),s=x(t),c=s.getDate(),l=s.getMonth()+1,u=(s.getDay()+6)%7,d=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,f=r?.length?r:[c],p=n?.length?n:[l],m=a?.[0]??1,h=Mi(i,u),g=(t,n)=>{e(Y.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},_=(t,n,r)=>{e(Y.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:Ni(n),bysetpos:[r]}))};return(0,Z.jsxs)(M,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(ie,{label:`Month`,children:(0,Z.jsx)(Bi,{children:Yi.map(e=>{let t=p.includes(e.value);return(0,Z.jsx)(Fi,{type:`button`,className:E(t&&`active`),onClick:()=>{let n=p.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),d===`WEEKDAY`?_(n,h,m):g(n,f))},children:o(e.label)},e.value)})})}),(0,Z.jsx)(N,{translateOptions:!0,label:`Repeat on`,value:d,options:qi,onChange:e=>{e===`WEEKDAY`?_(p,h,m):g(p,f)}}),d===`MONTHDAY`&&(0,Z.jsx)(Vi,{label:`Days of Month`,values:f,onChange:e=>g(p,e)}),d===`WEEKDAY`&&(0,Z.jsxs)(M,{children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Position`,value:m,options:Ji,onChange:e=>_(p,h,Number.parseInt(e,10))}),(0,Z.jsx)(N,{translateOptions:!0,label:`Day`,value:h,options:ki.map(e=>({value:e.value,label:e.label})),onChange:e=>_(p,e,m)})]})]})},Zi=()=>{let{freq:e}=L(X.state);return e===O.DAILY?(0,Z.jsx)(Oi,{}):e===O.WEEKLY?(0,Z.jsx)(Ki,{}):e===O.MONTHLY?(0,Z.jsx)(Wi,{}):e===O.YEARLY?(0,Z.jsx)(Xi,{}):null},Qi=e=>(0,Z.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Z.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),$i=e=>(0,Z.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Z.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),ea=()=>{let e=I(),{interval:t}=L(X.state);return(0,Z.jsxs)(ta,{children:[(0,Z.jsx)(`span`,{children:o(`Every`)}),(0,Z.jsx)(na,{"aria-label":o(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(Y.setInterval(n))}}),(0,Z.jsxs)(ra,{children:[(0,Z.jsx)(ia,{type:`button`,"aria-label":o(`Increase interval`),onClick:()=>e(Y.setInterval(t+1)),children:(0,Z.jsx)($i,{})}),(0,Z.jsx)(ia,{type:`button`,"aria-label":o(`Decrease interval`),onClick:()=>e(Y.setInterval(t-1)),children:(0,Z.jsx)(Qi,{})})]})]})},ta=n.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,na=n.input`
  width: 60px;
`,ra=n.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,ia=n.button`
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
`,aa=c({position:[`bottom`,`top`],alignment:`end`,padding:8}),oa=(e,t,n,r)=>{let[i,a]=(0,P.useState)();return(0,P.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=l({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:aa}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let u=new ResizeObserver(c);return u.observe(i),u.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{u.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},sa=(e,t,n)=>{(0,P.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},ca=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:s,weekStartDay:c,formatDate:l,filterDate:u,onAdd:d,onRemove:f})=>{let[m,h]=(0,P.useState)(!1),g=(0,P.useRef)(null),_=(0,P.useRef)(null),y=(0,P.useRef)(null),b=oa(m,_,y,g);return(0,P.useEffect)(()=>{a.length===0&&h(!1)},[a.length]),sa(m,[_,y],()=>h(!1)),(0,Z.jsxs)(Rr,{children:[(0,Z.jsx)(zr,{children:o(e)}),t&&(0,Z.jsx)(Br,{children:o(t)}),(0,Z.jsxs)(Vr,{children:[(0,Z.jsxs)(Wr,{ref:g,children:[(0,Z.jsx)(Gr,{ref:_,type:`button`,disabled:a.length===0,className:E({active:m}),onClick:()=>{a.length!==0&&h(e=>!e)},children:a.length}),m&&(0,Z.jsxs)(Kr,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,Z.jsx)(qr,{children:o(i)}),(0,Z.jsx)(Jr,{children:a.map(e=>(0,Z.jsxs)(Yr,{children:[(0,Z.jsx)(`span`,{children:l(e)}),(0,Z.jsx)(`button`,{type:`button`,"aria-label":o(`Remove date {date}`,{date:l(e)}),onClick:()=>f(e),children:`×`})]},e))})]})]}),(0,Z.jsx)(Hr,{children:(0,Z.jsx)(ce,{...v(),selected:null,onChange:e=>{e&&d(p(D(e)))},customInput:(0,Z.jsx)(la,{label:n,className:E(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:o(`Today`),openToDate:s,calendarStartDay:c,filterDate:u})})]})]})},la=(0,P.forwardRef)(({label:e,...t},n)=>(0,Z.jsx)(Ur,{type:`button`,ref:n,...t,children:o(e)}));la.displayName=`PickerTrigger`;var ua=n.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,da=()=>{let e=I(),t=L(X.state),{start:n,rrule:r}=t,i=(0,P.useMemo)(()=>ge(r,n),[r,n]),{startTimestamp:a,baseRule:o,recurrenceSet:s}=i,c=(0,P.useMemo)(()=>s?Array.from(new Set(s.rdates().map(e=>p(D(f(e)))).filter(e=>o?!0:e!==a))).sort((e,t)=>e-t):[],[o,s,a]),l=(0,P.useMemo)(()=>s?Array.from(new Set(s.exdates().map(e=>p(D(f(e)))))).sort((e,t)=>e-t):[],[s]),u=(0,P.useMemo)(()=>new Set(c),[c]),d=(0,P.useMemo)(()=>new Set(l),[l]),g=(0,P.useCallback)(e=>{let t=m(D(e)),n=h(se(e)),r=o?o.between(t,n,!0).length>0:!1,i=s?s.between(t,n,!0).length>0:p(D(e))===a;return{full:i,base:r,excluded:r&&!i}},[o,s,a]),_=n=>{let r=n({baseRule:o,rdates:s?.rdates().filter(e=>o?!0:p(D(f(e)))!==a)??[],exdates:s?.exdates()??[]});e(Y.setRRule(xe(t,r.baseRule,fa(r.rdates),fa(r.exdates))))};return{addedDates:c,excludedDates:l,addFixedDate:(e,n)=>{if(e===`exdate`&&be(i,n))return;let r=Se(t,n);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:Fe(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,n)=>{if(e===`rdate`&&be(i,n))return;let r=Se(t,n).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?Fe(n,r):n,exdates:e===`exdate`?Fe(i,r):i}))},canAddOccurrence:(0,P.useCallback)(e=>{let t=p(D(e)),n=g(e);return!n.full&&!n.excluded&&!u.has(t)},[u,g]),canExcludeOccurrence:(0,P.useCallback)(e=>{let t=p(D(e)),n=g(e);return n.base&&!n.excluded&&!d.has(t)&&!be(i,t)},[d,g,i]),getStatus:g}},fa=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},pa=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],ma=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],ha=e=>[{value:O.DAILY,label:e?`Days`:`Day`},{value:O.WEEKLY,label:e?`Weeks`:`Week`},{value:O.MONTHLY,label:e?`Months`:`Month`},{value:O.YEARLY,label:e?`Years`:`Year`}],ga=300,_a=()=>{let e=I(),t=L(X.state),n=L(J.weekStartDay),r=L(J.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:o,until:s,freq:c,start:l,interval:u}=t,d=i!==`NEVER`,{addedDates:f,excludedDates:p,addFixedDate:m,removeFixedDate:h,canAddOccurrence:_,canExcludeOccurrence:v}=da(),y=(0,P.useMemo)(()=>x(l),[l]),b=e=>C(x(e),r,{locale:g()});return(0,Z.jsxs)(ua,{children:[(0,Z.jsxs)(M,{$alignItems:`end`,style:{width:`100%`},children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Repeats`,value:i,options:pa,onChange:t=>e(Y.setRepeatType(t))}),i===`CUSTOM`&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(ea,{}),(0,Z.jsx)(N,{translateOptions:!0,label:``,value:c,options:ha(u>1),onChange:t=>e(Y.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,Z.jsx)(Zi,{}),i!==`NEVER`&&(0,Z.jsxs)(M,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Ends`,options:ma,value:a,onChange:t=>e(Y.setRepeatEndType(t))}),a===`AFTER`&&(0,Z.jsx)(Di,{label:`Times`,value:o,min:1,debounceMs:ga,onChange:t=>e(Y.setCount(t))}),a===`ON_DATE`&&(0,Z.jsx)(w,{label:``,value:s||null,onChange:t=>e(Y.setUntil(t)),datePickerProps:{dateFormat:r,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:y}})]}),(0,Z.jsxs)(M,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,Z.jsx)(ca,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:f,openToDate:y,formatDate:b,filterDate:_,weekStartDay:n,onAdd:e=>m(`rdate`,e),onRemove:e=>h(`rdate`,e)}),d&&(0,Z.jsx)(ca,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:p,openToDate:y,formatDate:b,filterDate:v,weekStartDay:n,onAdd:e=>m(`exdate`,e),onRemove:e=>h(`exdate`,e)})]})]})},va=({context:e,onOccurrenceSaved:t})=>{let n=(0,P.useId)(),r=(0,P.useId)(),i=(0,P.useId)(),[a,s]=(0,P.useState)(0),[c,l]=(0,P.useState)([]),u=I(),{start:d,end:f,allDay:p}=L(X.state),{date:m,time:h,datetime:g}=L(J.formats),_=L(J.weekStartDay),v=L(J.timeInterval),y=L(J.eventDuration),b=(0,P.useMemo)(()=>p?m.short.icu:g.short.icu,[p,m,g]),ee=(0,P.useMemo)(()=>p?bi(f):f,[p,f]);return(0,Z.jsxs)(_i,{children:[(0,Z.jsxs)(vi,{children:[(0,Z.jsxs)(yi,{children:[(0,Z.jsx)(w,{id:r,label:`Starts`,value:d,onChange:e=>u(Y.setStart(e)),datePickerProps:{id:r,showIcon:!0,icon:(0,Z.jsx)(oe,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!p,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:b,timeFormat:h.short.icu,todayButton:o(`Today`),calendarStartDay:_,timeIntervals:v}}),(0,Z.jsx)(w,{id:i,label:`Ends`,value:ee,onChange:e=>{e!=null&&u(Y.setEnd(Si({value:e,start:d,allDay:p,timeInterval:v})))},datePickerProps:{id:i,showIcon:!0,icon:(0,Z.jsx)(oe,{}),toggleCalendarOnIconClick:!0,minDate:x(d),showTimeSelect:!p,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:b,timeFormat:h.short.icu,todayButton:o(`Today`),calendarStartDay:_,timeIntervals:v,filterTime:e=>xi(new Date(e),d,v)}}),(0,Z.jsx)(ue,{id:n,label:`All Day`,enabled:p,style:{margin:0},onClick:e=>u(Y.setAllDay({enabled:e,eventDuration:y}))})]}),(0,Z.jsx)(gi,{context:e,refreshKey:a}),(0,Z.jsx)(_a,{}),e?.eventId&&(0,Z.jsx)(ni,{context:e,refreshKey:a,onOccurrencesChanged:l})]}),(0,Z.jsx)(hi,{context:e,editedOccurrences:c,onOccurrenceSaved:()=>{s(e=>e+1),t?.()}})]})},ya=n.div`
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
`,ba=n.div`
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
`,xa=({context:e})=>{let{allDay:t}=L(X.state),n=L(J.formats),r=(e,t=!1)=>C(f(new Date(e*1e3)),t?n?.datetime.short.icu??`Pp`:n?.date.short.icu??`P`,{locale:g()}),{splitAt:i,series:a}=e,s=a?.earlier??null,c=a?.later??null;return!i&&!s&&!c?null:(0,Z.jsxs)(ba,{children:[i&&(0,Z.jsx)(`p`,{children:o(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:r(i,!t)})}),(s||c)&&(0,Z.jsxs)(`nav`,{children:[(0,Z.jsx)(`span`,{children:o(`Part of a series`)}),s&&(0,Z.jsxs)(`a`,{href:s.url,children:[`← `,o(`Earlier part, from {date}`,{date:r(s.start)})]}),c&&(0,Z.jsxs)(`a`,{href:c.url,children:[o(`Later part, from {date}`,{date:r(c.start)}),` →`]})]})]})},Sa=({context:e})=>{let{rrule:t}=L(X.state),n=(0,P.useMemo)(ht,[]),r=t?Ne(t,{forceset:!0}).all((e,t)=>t<10).map(e=>`${C(f(e),`yyyy-MM-dd HH:mm`)} [${ze(e)}]`):[];return(0,Z.jsx)(u,{children:(0,Z.jsxs)(ya,{children:[e&&(0,Z.jsx)(xa,{context:e}),(0,Z.jsx)(Lr,{context:e}),(0,Z.jsx)(va,{context:e}),n&&(0,Z.jsxs)(`code`,{children:[(0,Z.jsx)(`pre`,{children:t}),(0,Z.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})})},Ca=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,wa(n)),$(t,`end`,wa(r)),$(t,`until`,i?wa(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},wa=e=>C(x(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},Ta=e=>{let t={app:e.app,event:Te(e.event)};return tr({reducer:{app:Tr,event:Dr},preloadedState:t})},Ea=new WeakSet,Da=e=>{if(Ea.has(e))return;Ea.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=Ta(r),a=He.createRoot(n);i.subscribe(()=>{Ca(i,e)}),Ca(i,e),a.render((0,Z.jsx)(tt,{store:i,children:(0,Z.jsx)(Sa,{context:r.context})}))},Oa=(e=document)=>{e.querySelectorAll(`[data-calendar-transfer-select]`).forEach(ft),e.querySelectorAll(`[data-calendar-transfer]`).forEach(mt),e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(Da)},ka=()=>{Oa(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-calendar-transfer-select]`)&&ft(e),e.matches(`[data-calendar-transfer]`)&&mt(e),e.matches(`[data-event-builder]`)&&Da(e),Oa(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ka):ka();