import{C as e,D as t,M as n,N as r,O as i,_ as a,a as o,b as s,c,i as l,j as u,k as d,r as f,t as p,v as m,w as h,y as g}from"./localization-B03jtK1N.js";import{C as _,O as v,S as y,T as b,_ as x,a as ee,c as te,d as S,f as ne,g as C,h as w,i as re,j as T,k as ie,l as ae,m as oe,n as se,o as ce,p as le,r as ue,s as de,t as fe,u as pe,v as me,w as E,x as he,y as ge}from"./calendar-preview.operations-CKO_1Gv_.js";import{h as _e,l as ve,m as ye,p as be}from"./calendar.events-BCLn1gSw.js";import{t as xe}from"./interaction-CfrO8v-J.js";import{a as Se,c as D,d as Ce,f as we,h as Te,i as Ee,m as O,n as De,o as Oe,p as k,r as ke,s as Ae,t as A,v as je,x as Me,y as j}from"./components-CDVp9--B.js";import{t as M}from"./dropdown-DNxQFjEo.js";function Ne(e,t){let n=c(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,l=r===`extended`?`:`:``;if(i!==`time`){let e=O(n.getDate(),2),t=O(n.getMonth()+1,2);a=`${O(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=O(Math.trunc(t/60),2),r=O(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=O(n.getHours(),2),r=O(n.getMinutes(),2),i=O(n.getSeconds(),2),s=a===``?``:`T`,c=[t,r,i].join(l);a=`${a}${s}${c}${o}`}return a}var Pe=n((e=>{var t=u();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,a=t.useRef,o=t.useEffect,s=t.useMemo,c=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,l,u){var d=a(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=s(function(){function e(e){if(!i){if(i=!0,a=e,e=l(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return o=t}return o=e}if(t=o,r(a,e))return t;var n=l(e);return u!==void 0&&u(t,n)?(a=e,t):(a=e,o=n)}var i=!1,a,o,s=n===void 0?null:n;return[function(){return e(t())},s===null?void 0:function(){return e(s())}]},[t,n,l,u]);var p=i(e,d[0],d[1]);return o(function(){f.hasValue=!0,f.value=p},[p]),c(p),p}})),Fe=n(((e,t)=>{t.exports=Pe()})),Ie=r(i()),N=r(u(),1),Le=Fe();function Re(e){e()}function ze(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Re(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Be={notify(){},get:()=>[]};function Ve(e,t){let n,r=Be,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=ze())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Be)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var He=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ue=typeof navigator<`u`&&navigator.product===`ReactNative`,We=He||Ue?N.useLayoutEffect:N.useEffect,Ge=Symbol.for(`react-redux-context`),Ke=typeof globalThis<`u`?globalThis:{};function qe(){if(!N.createContext)return{};let e=Ke[Ge]??(Ke[Ge]=new Map),t=e.get(N.createContext);return t||(t=N.createContext(null),e.set(N.createContext,t)),t}var P=qe();function Je(e){let{children:t,context:n,serverState:r,store:i}=e,a=N.useMemo(()=>{let e=Ve(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=N.useMemo(()=>i.getState(),[i]);We(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||P;return N.createElement(s.Provider,{value:a},t)}var Ye=Je;function Xe(e=P){return function(){return N.useContext(e)}}var Ze=Xe();function Qe(e=P){let t=e===P?Ze:Xe(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var $e=Qe();function et(e=P){let t=e===P?$e:Qe(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var F=et(),tt=(e,t)=>e===t;function nt(e=P){let t=e===P?Ze:Xe(e),n=(e,n={})=>{let{equalityFn:r=tt}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();N.useRef(!0);let s=N.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Le.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return N.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var I=nt(),rt=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`[data-element-editor]`).data(`elementEditor`)??t(e).closest(`form`).data(`elementEditor`)},it=async e=>{let t=rt(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},at=new WeakSet,ot=e=>{let t=window.jQuery;if(at.has(e)||!t)return;at.add(e);let n=Number(e.dataset.calendarId),r=e.querySelector(`button.menubtn`),i=r?.querySelector(`.inline-flex`),a=i?.innerHTML,o=!1;t(e).on(`change`,async()=>{let s=Number(t(e).data(`value`));if(i&&a&&(i.innerHTML=a),t(e).data(`value`,n),e.querySelectorAll(`[data-value]`).forEach(e=>{e.classList.toggle(`sel`,Number(e.dataset.value)===n)}),o||s===n||!s)return;o=!0,r&&(r.disabled=!0);let c=rt(e),l=!1;try{let t=await it(e);c?.pause(),l=!!c;let n=new Craft.CpScreenSlideout(`calendar/event-calendar/edit`,{params:{eventId:t,siteId:Number(e.dataset.siteId),targetCalendarId:s}}),i=!1;n.on(`submit`,e=>{let t=e?.response?.data?.url;i=!0,window.location.assign(t||window.location.href)}),n.on(`close`,()=>{!i&&l&&c?.resume(),o=!1,r&&(r.disabled=!1)})}catch{l&&c?.resume(),o=!1,r&&(r.disabled=!1),Craft.cp.displayError(Craft.t(`calendar`,`Couldn’t open the calendar mapping.`))}})},st=e=>{let t=JSON.parse(e.dataset.populated||`{}`),n=Array.from(e.querySelectorAll(`select[data-field-mapping]`)),r=n.map(e=>e.value).filter(Boolean),i=r.length!==new Set(r).size,a=new Set(r),o=Object.entries(t).filter(([e])=>!a.has(e)),s=e.querySelector(`[data-unmapped-warning]`),c=e.querySelector(`[data-unmapped-fields]`),l=e.querySelector(`[data-mapping-error]`),u=e.querySelector(`input[data-calendar-transfer-confirm]`)?.checked,d=e.closest(`form.cp-screen`)?.querySelector(`.so-footer button.submit`);if(d){let e=!u||i;d.disabled=e,d.classList.toggle(`disabled`,e),d.setAttribute(`aria-disabled`,String(e))}s&&(s.hidden=o.length===0),l&&(l.hidden=!i),c&&c.replaceChildren(...o.map(([,e])=>{let t=document.createElement(`li`);return t.textContent=e,t})),n.forEach(e=>{e.setCustomValidity(i?Craft.t(`calendar`,`Each source field can only be mapped once.`):``)})},ct=e=>{at.has(e)||(at.add(e),e.addEventListener(`change`,()=>st(e)),st(e))},lt=()=>!1;function L(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var ut=typeof Symbol==`function`&&Symbol.observable||`@@observable`,dt=()=>Math.random().toString(36).substring(7).split(``).join(`.`),ft={INIT:`@@redux/INIT${dt()}`,REPLACE:`@@redux/REPLACE${dt()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${dt()}`};function pt(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function mt(e,t,n){if(typeof e!=`function`)throw Error(L(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(L(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(L(1));return n(mt)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(L(3));return i}function d(e){if(typeof e!=`function`)throw Error(L(4));if(c)throw Error(L(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(L(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!pt(e))throw Error(L(7));if(e.type===void 0)throw Error(L(8));if(typeof e.type!=`string`)throw Error(L(17));if(c)throw Error(L(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(L(10));r=e,f({type:ft.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(L(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[ut](){return this}}}return f({type:ft.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[ut]:m}}function ht(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:ft.INIT})===void 0)throw Error(L(12));if(n(void 0,{type:ft.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(L(13))})}function gt(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{ht(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(L(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function _t(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function vt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(L(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=_t(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function yt(e){return pt(e)&&`type`in e&&typeof e.type==`string`}var bt=Symbol.for(`immer-nothing`),xt=Symbol.for(`immer-draftable`),R=Symbol.for(`immer-state`);function z(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var B=Object,St=B.getPrototypeOf,Ct=`constructor`,wt=`prototype`,Tt=`configurable`,Et=`enumerable`,Dt=`writable`,Ot=`value`,V=e=>!!e&&!!e[R];function H(e){return e?jt(e)||Rt(e)||!!e[xt]||!!e[Ct]?.[xt]||zt(e)||Bt(e):!1}var kt=B[wt][Ct].toString(),At=new WeakMap;function jt(e){if(!e||!Vt(e))return!1;let t=St(e);if(t===null||t===B[wt])return!0;let n=B.hasOwnProperty.call(t,Ct)&&t[Ct];if(n===Object)return!0;if(!U(n))return!1;let r=At.get(n);return r===void 0&&(r=Function.toString.call(n),At.set(n,r)),r===kt}function Mt(e,t,n=!0){Nt(e)===0?(n?Reflect.ownKeys(e):B.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function Nt(e){let t=e[R];return t?t.type_:Rt(e)?1:zt(e)?2:Bt(e)?3:0}var Pt=(e,t,n=Nt(e))=>n===2?e.has(t):B[wt].hasOwnProperty.call(e,t),Ft=(e,t,n=Nt(e))=>n===2?e.get(t):e[t],It=(e,t,n,r=Nt(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Lt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Rt=Array.isArray,zt=e=>e instanceof Map,Bt=e=>e instanceof Set,Vt=e=>typeof e==`object`,U=e=>typeof e==`function`,Ht=e=>typeof e==`boolean`;function Ut(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var W=e=>e.copy_||e.base_,Wt=e=>e.modified_?e.copy_:e.base_;function Gt(e,t){if(zt(e))return new Map(e);if(Bt(e))return new Set(e);if(Rt(e))return Array[wt].slice.call(e);let n=jt(e);if(t===!0||t===`class_only`&&!n){let t=B.getOwnPropertyDescriptors(e);delete t[R];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[Dt]===!1&&(a[Dt]=!0,a[Tt]=!0),(a.get||a.set)&&(t[i]={[Tt]:!0,[Dt]:!0,[Et]:a[Et],[Ot]:e[i]})}return B.create(St(e),t)}else{let t=St(e);if(t!==null&&n)return{...e};let r=B.create(t);return B.assign(r,e)}}function Kt(e,t=!1){return Yt(e)||V(e)||!H(e)?e:(Nt(e)>1&&B.defineProperties(e,{set:Jt,add:Jt,clear:Jt,delete:Jt}),B.freeze(e),t&&Mt(e,(e,t)=>{Kt(t,!0)},!1),e)}function qt(){z(2)}var Jt={[Ot]:qt};function Yt(e){return e===null||!Vt(e)?!0:B.isFrozen(e)}var Xt=`MapSet`,Zt=`Patches`,Qt=`ArrayMethods`,$t={};function G(e){let t=$t[e];return t||z(0,e),t}var en=e=>!!$t[e],tn,nn=()=>tn,rn=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:en(Xt)?G(Xt):void 0,arrayMethodsPlugin_:en(Qt)?G(Qt):void 0});function an(e,t){t&&(e.patchPlugin_=G(Zt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function on(e){sn(e),e.drafts_.forEach(ln),e.drafts_=null}function sn(e){e===tn&&(tn=e.parent_)}var cn=e=>tn=rn(tn,e);function ln(e){let t=e[R];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function un(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[R].modified_&&(on(t),z(4)),H(e)&&(e=dn(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[R].base_,e,t)}else e=dn(t,n);return fn(t,e,!0),on(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===bt?void 0:e}function dn(e,t){if(Yt(t))return t;let n=t[R];if(!n)return bn(t,e.handledSet_,e);if(!mn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);vn(n,e)}return n.copy_}function fn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Kt(t,n)}function pn(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var mn=(e,t)=>e.scope_===t,hn=[];function gn(e,t,n,r){let i=W(e),a=e.type_;if(r!==void 0&&Ft(i,r,a)===t){It(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;Mt(i,(e,n)=>{if(V(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??hn;for(let e of o)It(i,e,n,a)}function _n(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!mn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Wt(i);gn(e,i.draft_??i,a,n),vn(i,r)})}function vn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}pn(e)}}function yn(e,t,n){let{scope_:r}=e;if(V(n)){let i=n[R];mn(i,r)&&i.callbacks_.push(function(){On(e),gn(e,n,Wt(i),t)})}else H(n)&&e.callbacks_.push(function(){let i=W(e);e.type_===3?i.has(n)&&bn(n,r.handledSet_,r):Ft(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&bn(Ft(e.copy_,t,e.type_),r.handledSet_,r)})}function bn(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||V(e)||t.has(e)||!H(e)||Yt(e)?e:(t.add(e),Mt(e,(r,i)=>{if(V(i)){let t=i[R];mn(t,n)&&(It(e,r,Wt(t),e.type_),pn(t))}else H(i)&&bn(i,t,n)}),e)}function xn(e,t){let n=Rt(e),r={type_:+!!n,scope_:t?t.scope_:nn(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=Sn;n&&(i=[r],a=Cn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var Sn={get(e,t){if(t===R)return e;if(t===`constructor`||t===`__proto__`){let n=W(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=W(e);if(!Pt(i,t,e.type_))return Tn(e,i,t);let a=i[t];if(e.finalized_||!H(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Ut(t))return a;if(a===wn(e.base_,t)){On(e);let n=e.type_===1?+t:t,r=An(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in W(e)},ownKeys(e){return Reflect.ownKeys(W(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=En(W(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=wn(W(e),t),i=r?.[R];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Lt(n,r)&&(n!==void 0||Pt(e.base_,t,e.type_)))return!0;On(e),Dn(e)}return e.copy_[t]===n&&(n!==void 0||Pt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),yn(e,t,n),!0)},deleteProperty(e,t){return On(e),wn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),Dn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=W(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Dt]:!0,[Tt]:e.type_!==1||t!==`length`,[Et]:r[Et],[Ot]:n[t]}},defineProperty(){z(11)},getPrototypeOf(e){return St(e.base_)},setPrototypeOf(){z(12)}},Cn={};for(let e in Sn){let t=Sn[e];Cn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}Cn.deleteProperty=function(e,t){return Cn.set.call(this,e,t,void 0)},Cn.set=function(e,t,n){return Sn.set.call(this,e[0],t,n,e[0])};function wn(e,t){let n=e[R];return(n?W(n):e)[t]}function Tn(e,t,n){let r=En(t,n);return r?Ot in r?r[Ot]:r.get?.call(e.draft_):void 0}function En(e,t){if(!(t in e))return;let n=St(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=St(n)}}function Dn(e){e.modified_||(e.modified_=!0,e.parent_&&Dn(e.parent_))}function On(e){e.copy_||(e.assigned_=new Map,e.copy_=Gt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var kn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(U(e)&&!U(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}U(t)||z(6),n!==void 0&&!U(n)&&z(7);let r;if(H(e)){let i=cn(this),a=An(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?on(i):sn(i)}return an(i,n),un(r,i)}else if(!e||!Vt(e)){if(r=t(e),r===void 0&&(r=e),r===bt&&(r=void 0),this.autoFreeze_&&Kt(r,!0),n){let t=[],i=[];G(Zt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else z(1,e)},this.produceWithPatches=(e,t)=>{if(U(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Ht(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Ht(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Ht(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){H(e)||z(8),V(e)&&(e=jn(e));let t=cn(this),n=An(t,e,void 0);return n[R].isManual_=!0,sn(t),n}finishDraft(e,t){let n=e&&e[R];(!n||!n.isManual_)&&z(9);let{scope_:r}=n;return an(r,t),un(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=G(Zt).applyPatches_;return V(e)?r(e,t):this.produce(e,e=>r(e,t))}};function An(e,t,n,r){let[i,a]=zt(t)?G(Xt).proxyMap_(t,n):Bt(t)?G(Xt).proxySet_(t,n):xn(t,n);return(n?.scope_??nn()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?_n(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function jn(e){return V(e)||z(10,e),Mn(e)}function Mn(e){if(!H(e)||Yt(e))return e;let t=e[R],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Gt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Gt(e,!0);return Mt(n,(e,t)=>{It(n,e,Mn(t))},r),t&&(t.finalized_=!1),n}var Nn=new kn().produce;function Pn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Fn=Pn(),In=Pn,Ln=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?_t:_t.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Rn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(K(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>yt(t)&&t.type===e,n}var zn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Bn(e){return H(e)?Nn(e,()=>{}):e}function Vn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Hn(e){return typeof e==`boolean`}var Un=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new zn;return t&&(Hn(t)?a.push(Fn):a.push(In(t.extraArgument))),a},Wn=`RTK_autoBatch`,Gn=e=>t=>{setTimeout(t,e)},Kn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},qn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Kn(window.requestAnimationFrame,100):Gn(10):e.type===`callback`?e.queueNotification:Gn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Wn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Jn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new zn(e);return n&&r.push(qn(typeof n==`object`?n:void 0)),r};function Yn(e){let t=Un(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(pt(n))c=gt(n);else throw Error(K(1));let l;l=typeof r==`function`?r(t):t();let u=_t;i&&(u=Ln({trace:!1,...typeof i==`object`&&i}));let d=Jn(vt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return mt(c,o,p)}function Xn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(K(28));if(r in t)throw Error(K(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Zn(e){return typeof e==`function`}function Qn(e,t){let[n,r,i]=Xn(t),a;if(Zn(e))a=()=>Bn(e());else{let t=Bn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(V(e)){let r=n(e,t);return r===void 0?e:r}else if(H(e))return Nn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var $n=Symbol.for(`rtk-slice-createasyncthunk`);function er(e,t){return`${e}/${t}`}function tr({creators:e}={}){let t=e?.asyncThunk?.[$n];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(K(11));let i=(typeof e.reducers==`function`?e.reducers(ir()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(K(12));if(n in o.sliceCaseReducersByType)throw Error(K(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:er(n,r),createNotation:typeof e.reducers==`function`};or(a)?cr(o,a,s,t):ar(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Xn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Qn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Vn(d,r,m)),i}function i(t=l){return Vn(Vn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=nr(a,t,()=>Vn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function nr(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var rr=tr();function ir(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function ar({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!sr(r))throw Error(K(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Rn(e,o):Rn(e))}function or(e){return e._reducerDefinitionType===`asyncThunk`}function sr(e){return e._reducerDefinitionType===`reducerWithPrepare`}function cr({type:e,reducerName:t},n,r,i){if(!i)throw Error(K(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||lr,pending:s||lr,rejected:c||lr,settled:l||lr})}function lr(){}var ur=`listener`,dr=`completed`,fr=`cancelled`;`${fr}`,`${dr}`,`${ur}${fr}`,`${ur}${dr}`;var{assign:pr}=Object,mr=`listenerMiddleware`,hr=pr(Rn(`${mr}/add`),{withTypes:()=>hr});`${mr}`;var gr=pr(Rn(`${mr}/remove`),{withTypes:()=>gr});function K(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var _r=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),vr=new Set([`NEVER`,`AFTER`,`ON_DATE`]),yr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},br=e=>_r.has(e)?e:`NEVER`,xr=e=>vr.has(e)?e:`NEVER`,Sr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,Cr=rr({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:E.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=ne(e,e.until)),r!==void 0&&(e.until=e.start+r),C(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=ne(e,n),C(e)},setAllDay:(t,n)=>{let{enabled:r,eventDuration:i}=n.payload;t.allDay=r;let a=r?0:new Date().getUTCHours(),o=e(t.start);o.setHours(a,0,0,0),t.start=g(o);let s=e(t.end);r?s=Me(j(s),1):(s=we(s,1),s=Ce(s,o.getHours()),s=je(s,i)),t.end=g(s),t.until&&t.repeatEndType===`ON_DATE`&&(t.until=ne(t,t.until)),C(t)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=me(e.rrule)),e.repeatType=t.payload,C(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=Sr(e.count):e.count=null,C(e)},setFreq:(e,t)=>{e.freq=t.payload,ge(e,t.payload),C(e)},setCount:(e,t)=>{e.count=Sr(t.payload),C(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),C(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=w(r),C(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=w(n.byweekday)),`bymonth`in n&&(e.bymonth=w(n.bymonth)),`bymonthday`in n&&(e.bymonthday=w(n.bymonthday)),`byyearday`in n&&(e.byyearday=w(n.byyearday)),`bysetpos`in n&&(e.bysetpos=w(n.bysetpos)),C(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=Cr,wr=Cr.reducer,J={state:e=>e.event},Tr=t.div`
  padding-top: 16px;
  width: 100%;
`,Er=t.div`
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
`,Dr=t.p`
  && {
    margin: 0 0 8px;
    padding: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
`,Or=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,kr=t.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  ${Ee}

  .react-datepicker__current-month {
    display: none;
  }
`,Ar=t.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,jr=t.div`
  position: relative;
  flex-shrink: 0;
`,Mr=t.button`
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
`,Nr=t.div`
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
`,Pr=t.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Fr=t.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Ir=t.li`
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
`,Lr=t.button`
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
`,Rr=rr({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:zr}=Rr,Br=Rr.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},Vr=t.div`
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
`,Hr=t.ul`
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
`,Ur=t.li`
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
`,X=d(),Wr=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],Gr=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of Wr){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},Kr=({context:e,refreshKey:t,onOccurrencesChanged:n})=>{let r=(0,N.useRef)(null),[i,a]=(0,N.useState)([]),[s,c]=(0,N.useState)(null),[l,u]=(0,N.useState)(null),d=(0,N.useRef)(0),f=I(J.state),p=I(Y.formats),m=e=>v(e,p),h=(0,N.useCallback)(()=>rt(r.current)?.settings.elementId??e.eventId,[e.eventId]),g=(0,N.useCallback)(async()=>{let t=h();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let r=await be(n,{headers:{Accept:`application/json`}});if(!r.ok)return;let i=(await r.json()).occurrences??[];++d.current,a(i),u(null)},[e.siteId,h]);(0,N.useEffect)(()=>{g()},[g,t]);let _=(0,N.useCallback)(async()=>{let t=h();if(!t)return;let n=++d.current,i=await be(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...Gr(r.current)})});if(!i.ok)return;let a=await i.json();n===d.current&&u(new Set(a.orphaned??[]))},[e.siteId,h]);(0,N.useEffect)(()=>{if(++d.current,i.length===0)return;let e=setTimeout(()=>void _(),400);return()=>clearTimeout(e)},[f,i,_]);let y=e=>l?l.has(e.recurrenceId):e.orphaned;(0,N.useEffect)(()=>{n?.(i.map(e=>({...e,orphaned:l?l.has(e.recurrenceId):e.orphaned})))},[i,l,n]);let b=async t=>{c(t.recurrenceId);try{let n=await it(r.current);if(!n)return;ve({eventId:n,recurrenceId:t.recurrenceId,siteId:e.siteId,onSave:()=>void g()})}catch{Craft.cp.displayError(o(`Couldn’t open the occurrence for editing.`))}finally{c(null)}},x=async t=>{if(window.confirm(o(`Remove everything this occurrence changes?`))){c(t.recurrenceId);try{let n=await it(r.current);if(!n)return;let i=await be(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||o(`Couldn’t reset the occurrence.`));return}await g()}catch{Craft.cp.displayError(o(`Couldn’t reset the occurrence.`))}finally{c(null)}}};return(0,X.jsx)(Vr,{ref:r,children:i.length>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Er,{as:`h3`,children:o(`Edited occurrences`)}),(0,X.jsx)(Dr,{children:o(`Occurrences with their own changes. Changes made here go live with the event.`)}),i.some(y)&&(0,X.jsx)(Dr,{className:`warning`,children:o(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,X.jsx)(Hr,{children:i.map(e=>(0,X.jsxs)(Ur,{className:D(y(e)&&`is-orphaned`,e.cancelled&&`is-cancelled`),children:[(0,X.jsxs)(`div`,{className:`occurrence-details`,children:[(0,X.jsx)(`span`,{className:`occurrence-title`,children:e.title}),e.cancelled&&(0,X.jsx)(`span`,{className:`occurrence-state cancelled`,children:o(`Cancelled`)}),y(e)&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:o(`No longer on the schedule`)})]}),(0,X.jsx)(`div`,{className:`occurrence-date`,children:m(e)}),(0,X.jsx)(`div`,{className:`occurrence-changes`,children:(0,X.jsx)(`span`,{children:e.changes.join(`, `)})}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[!y(e)&&(0,X.jsx)(Lr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":o(`Edit occurrence on {date}`,{date:m(e)}),title:o(`Edit occurrence`),disabled:s!==null,onClick:()=>void b(e)}),(0,X.jsx)(Lr,{type:`button`,className:`icon occurrence-discard`,"data-icon":`remove`,"aria-label":`${o(`Discard`)}: ${m(e)}`,title:o(`Removes everything this occurrence changes.`),disabled:s!==null,onClick:()=>void x(e)})]})]},e.recurrenceId))})]})})},qr=t.div`
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
`,Jr=t.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  margin-top: 10px;
  width: 455px;
  max-width: 100%;
  box-sizing: border-box;
`,Yr=t.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,Xr=t.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Zr=t.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Qr=t.div`
  min-width: max-content;
  flex: 1;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,$r=t.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,ei=t.li`
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
`,ti=t.ul`
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
`,ni=(e,t=[])=>{let n=[],r=(e,t,r)=>{e>0&&n.push(o(e===1?t:r,{count:e}))},i=(e.recurrenceSet?.rdates()??[]).filter(t=>{let n=pe(e,t);return n.full&&!n.base&&n.timestamp!==e.startTimestamp}).length,a=(e.recurrenceSet?.exdates()??[]).filter(t=>pe(e,t).excluded).length,s=t.filter(e=>!e.orphaned);return r(i,`{count} additional date`,`{count} additional dates`),r(a,`{count} excluded date`,`{count} excluded dates`),r(s.filter(e=>!e.cancelled).length,`{count} edited occurrence`,`{count} edited occurrences`),r(s.filter(e=>e.cancelled).length,`{count} cancelled occurrence`,`{count} cancelled occurrences`),r(t.filter(e=>e.orphaned).length,`{count} edit off schedule`,`{count} edits off schedule`),n},ri=(t,n,r,i=`PP`,a=`PPp`)=>{let s=t=>k(e(t),r?i:a,{locale:f()});return t?.splitAt?o(`This draft changes the series from {date} onward.`,{date:s(t.splitAt)}):t?.series?.later?o(`This part of the series starts on {start} and ends before {end}.`,{start:s(n),end:s(t.series.later.start)}):t?.series?.earlier?o(`This part of the series starts on {date}.`,{date:s(n)}):null},ii=8,ai=({context:e,onOccurrenceSaved:t,editedOccurrences:n})=>{let r=(0,N.useRef)(null),[i,a]=(0,N.useState)(!1),c=F(),l=I(Y.weekStartDay),u=I(Y.formats),d=u?.date.short.icu??`P`,m=u?.datetime?.short.icu??`Pp`,g=I(J.state),{start:_,rrule:v}=g,y=!!(e?.eventId&&v),[b,x]=(0,N.useState)(null),S=(0,N.useMemo)(()=>re(v,_),[v,_]),ne=(0,N.useMemo)(()=>new Set(n?.filter(e=>e.cancelled&&!e.orphaned).map(e=>e.recurrenceId.replace(` `,`T`))),[n]),C=e=>{let t=te(S,e);return t!==null&&ne.has(t)},w=(0,N.useMemo)(()=>ue(S,b),[S,b]),T=(0,N.useMemo)(()=>ee(S,b?.start??null,ii),[S,b]),ie=(0,N.useMemo)(()=>de(S,d),[S,d]),oe=(0,N.useMemo)(()=>{let e=se(S,T.length);return e?ce(e):null},[S,T]),le=(0,N.useMemo)(()=>ni(S,n),[S,n]),me=ri(e,_,g.allDay,d,m),E=(0,N.useCallback)((e,t,n)=>{c(q.setRRule(fe(g,S,e,t,n)))},[c,S,g]),he=(0,N.useCallback)(e=>{let t=ae(S,e);if(t){let{timestamp:n}=pe(S,e);E(t,n,t===`exdate`)}},[E,S]),ge=(0,N.useCallback)(e=>{let t=pe(S,e);if(t.base&&t.excluded){E(`exdate`,t.timestamp,!1);return}if(t.full){he(e);return}t.full||E(`rdate`,t.timestamp,!0)},[E,S,he]),be=(0,N.useCallback)(e=>pe(S,e),[S]),Se=async n=>{if(!(!e||i)){a(!0);try{ve({eventId:await it(r.current),recurrenceId:n,siteId:e.siteId,onSave:()=>t?.()})}catch{Craft.cp.displayError(o(`Couldn’t open the occurrence for editing.`))}finally{a(!1)}}};return(0,X.jsx)(qr,{ref:r,children:(0,X.jsxs)(Oe,{children:[(0,X.jsxs)(A,{$direction:`column`,$gap:10,children:[(0,X.jsx)(Yr,{children:o(`Schedule Preview`)}),ie&&(0,X.jsx)(Xr,{children:ie})]}),le.length>0&&(0,X.jsx)(ti,{"aria-label":o(`Schedule changes`),children:le.map(e=>(0,X.jsx)(`li`,{children:e},e))}),me&&(0,X.jsx)(Xr,{children:me}),(0,X.jsxs)(Jr,{children:[(0,X.jsxs)(A,{$direction:`column`,$gap:10,children:[(0,X.jsx)(ye,{...p(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[_e,xe],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(f().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:l,timeZone:`UTC`,eventDisplay:`none`,events:w,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>x({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=be(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``,C(e.date)?`fc-cancelled-date`:``].filter(Boolean)},dayCellContent:e=>{let t=C(e.date),n=t?o(`Cancelled`):void 0;return(0,X.jsxs)(`span`,{title:n,children:[e.dayNumberText,t&&(0,X.jsxs)(`span`,{className:`cancelled-date-label`,children:[`, `,n]})]})},dateClick:e=>ge(e.date)}),oe&&(0,X.jsx)(Zr,{children:oe})]}),(0,X.jsx)(Qr,{children:T.length===0?(0,X.jsxs)(`p`,{children:[o(`No occurrences starting from`),(0,X.jsx)(`br`,{}),k(h(b?.currentStart??new Date),`PP`,{locale:f()})]}):(0,X.jsx)($r,{$count:T.length,children:T.map(e=>{let t=new Date(e*1e3),n=C(t),r=k(h(t),d,{locale:f()}),a=ae(S,t),c=y?te(S,t):null,l=o(a===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:r});return(0,X.jsxs)(ei,{className:n?`is-cancelled`:void 0,children:[(0,X.jsxs)(`span`,{className:`occurrence-date`,children:[(0,X.jsx)(`span`,{children:r}),n&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:o(`Cancelled`)})]}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[c&&(0,X.jsx)(Lr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":o(`Edit occurrence on {date}`,{date:r}),title:o(`Edit occurrence`),disabled:i,onClick:()=>void Se(c)}),a&&(0,X.jsx)(Lr,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:i,"aria-label":l,title:l,onClick:()=>he(t)})]})]},s(t))})})})]})]})})},oi=({context:e,refreshKey:t})=>{let n=I(J.state),{showOverlapWarnings:r,formats:i}=I(Y.config),a=(0,N.useRef)(null),o=(0,N.useCallback)(()=>rt(a.current)?.settings.elementId??e?.eventId,[e?.eventId]);return e?.calendarId?(0,X.jsx)(`div`,{ref:a,style:{padding:r?`0 20px 12px`:`0 20px`,marginTop:r?-8:0},children:(0,X.jsx)(b,{formats:i,enabled:r,schedule:{...n,rrule:n.rrule??``,calendarId:e.calendarId,siteId:e.siteId},resolveEventId:o,refreshKey:t})}):null},si=t.div`
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
`,ci=t.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,li=t.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,ui=t=>g(we(e(t),1)),di=(e,t,n)=>{let r=pi(t,n);return e.getTime()>=r.getTime()},fi=({value:t,start:n,allDay:r,timeInterval:i})=>{if(r)return g(Me(j(e(t)),1));let a=e(t),o=pi(n,i);return a.getTime()>=o.getTime()?t:g(o)},pi=(t,n)=>je(e(t),n),mi=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},hi=({inputValue:e,value:t,min:n})=>{let r=mi(e)??n??t??0;return n===void 0?r:Math.max(r,n)},gi=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,N.useState)(e?.toString()??``),o=(0,N.useRef)(void 0),s=(0,N.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,N.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,N.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,N.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,N.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=mi(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,N.useCallback)(n=>{n.stopPropagation();let r=hi({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},_i=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=gi({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(Oe,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},vi=()=>null,Z=[{value:`MO`,label:`Monday`,days:[_.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[_.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[_.WE.weekday]},{value:`TH`,label:`Thursday`,days:[_.TH.weekday]},{value:`FR`,label:`Friday`,days:[_.FR.weekday]},{value:`SA`,label:`Saturday`,days:[_.SA.weekday]},{value:`SU`,label:`Sunday`,days:[_.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[_.MO.weekday,_.TU.weekday,_.WE.weekday,_.TH.weekday,_.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[_.SA.weekday,_.SU.weekday]}],yi=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},bi=(e,t)=>{let n=yi(e),r=yi(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},xi=(e,t)=>{if(e){let t=Z.find(t=>bi(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},Si=e=>Z.find(t=>t.value===e)?.days??[_.MO.weekday],Q=`5px`,Ci=t.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,wi=t(Ci)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,Ti=t(Ci)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,Ei=t.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,Di=t(Ei)`
  grid-template-columns: repeat(7, 1fr);

  ${Ci} {
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
`,Oi=t(Ei)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${Ci} {
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
`,ki=t(Ei)`
  grid-template-columns: repeat(4, 1fr);

  ${Ci} {
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
`,Ai=({label:e,values:t,onChange:n})=>(0,X.jsx)(Oe,{label:e,children:(0,X.jsxs)(Di,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(wi,{type:`button`,className:D(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(Ti,{},e))]})}),ji=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],Mi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Ni=()=>{let t=F(),{start:n,bymonthday:r,byweekday:i,bysetpos:a}=I(J.state),o=e(n),s=o.getDate(),c=(o.getDay()+6)%7,l=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,u=r?.length?r:[s],d=a?.[0]??1,f=xi(i,c),p=e=>{t(q.setByRules({bymonthday:e.length?e:void 0,byweekday:void 0,bysetpos:void 0}))},m=(e,n)=>{t(q.setByRules({bymonthday:void 0,byweekday:Si(e),bysetpos:[n]}))};return(0,X.jsxs)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(M,{translateOptions:!0,label:`Repeat on`,value:l,options:ji,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,X.jsx)(Ai,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,X.jsxs)(A,{children:[(0,X.jsx)(M,{translateOptions:!0,label:`Position`,value:d,options:Mi,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(M,{translateOptions:!0,label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},Pi=[{weekday:_.SU,label:`Sun`},{weekday:_.MO,label:`Mon`},{weekday:_.TU,label:`Tue`},{weekday:_.WE,label:`Wed`},{weekday:_.TH,label:`Thu`},{weekday:_.FR,label:`Fri`},{weekday:_.SA,label:`Sat`}],Fi=()=>{let e=F(),{byweekday:t}=I(J.state);return(0,X.jsx)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,X.jsx)(Oe,{label:`On`,children:(0,X.jsx)(Oi,{children:Pi.map(({weekday:n,label:r})=>(0,X.jsx)(wi,{type:`button`,className:D(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:o(r)},n.weekday))})})})},Ii=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],Li=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Ri=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],zi=()=>{let t=F(),{start:n,bymonth:r,bymonthday:i,byweekday:a,bysetpos:s}=I(J.state),c=e(n),l=c.getDate(),u=c.getMonth()+1,d=(c.getDay()+6)%7,f=s?.length&&a?.length?`WEEKDAY`:`MONTHDAY`,p=i?.length?i:[l],m=r?.length?r:[u],h=s?.[0]??1,g=xi(a,d),_=(e,n)=>{t(q.setByRules({bymonth:e.length?e:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(e,n,r)=>{t(q.setByRules({bymonth:e.length?e:void 0,bymonthday:void 0,byweekday:Si(n),bysetpos:[r]}))};return(0,X.jsxs)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(Oe,{label:`Month`,children:(0,X.jsx)(ki,{children:Ri.map(e=>{let t=m.includes(e.value);return(0,X.jsx)(wi,{type:`button`,className:D(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:o(e.label)},e.value)})})}),(0,X.jsx)(M,{translateOptions:!0,label:`Repeat on`,value:f,options:Ii,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,X.jsx)(Ai,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,X.jsxs)(A,{children:[(0,X.jsx)(M,{translateOptions:!0,label:`Position`,value:h,options:Li,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,X.jsx)(M,{translateOptions:!0,label:`Day`,value:g,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},Bi=()=>{let{freq:e}=I(J.state);return e===E.DAILY?(0,X.jsx)(vi,{}):e===E.WEEKLY?(0,X.jsx)(Fi,{}):e===E.MONTHLY?(0,X.jsx)(Ni,{}):e===E.YEARLY?(0,X.jsx)(zi,{}):null},Vi=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Hi=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Ui=()=>{let e=F(),{interval:t}=I(J.state);return(0,X.jsxs)(Wi,{children:[(0,X.jsx)(`span`,{children:o(`Every`)}),(0,X.jsx)(Gi,{"aria-label":o(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(q.setInterval(n))}}),(0,X.jsxs)(Ki,{children:[(0,X.jsx)(qi,{type:`button`,"aria-label":o(`Increase interval`),onClick:()=>e(q.setInterval(t+1)),children:(0,X.jsx)(Hi,{})}),(0,X.jsx)(qi,{type:`button`,"aria-label":o(`Decrease interval`),onClick:()=>e(q.setInterval(t-1)),children:(0,X.jsx)(Vi,{})})]})]})},Wi=t.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Gi=t.input`
  width: 60px;
`,Ki=t.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,qi=t.button`
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
`,Ji=ie({position:[`bottom`,`top`],alignment:`end`,padding:8}),Yi=(e,t,n,r)=>{let[i,a]=(0,N.useState)();return(0,N.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=T({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Ji}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Xi=(e,t,n)=>{(0,N.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Zi=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:s,weekStartDay:c,formatDate:u,filterDate:d,onAdd:f,onRemove:p})=>{let[m,h]=(0,N.useState)(!1),_=(0,N.useRef)(null),v=(0,N.useRef)(null),y=(0,N.useRef)(null),b=Yi(m,v,y,_);return(0,N.useEffect)(()=>{a.length===0&&h(!1)},[a.length]),Xi(m,[v,y],()=>h(!1)),(0,X.jsxs)(Tr,{children:[(0,X.jsx)(Er,{children:o(e)}),t&&(0,X.jsx)(Dr,{children:o(t)}),(0,X.jsxs)(Or,{children:[(0,X.jsxs)(jr,{ref:_,children:[(0,X.jsx)(Mr,{ref:v,type:`button`,disabled:a.length===0,className:D({active:m}),onClick:()=>{a.length!==0&&h(e=>!e)},children:a.length}),m&&(0,X.jsxs)(Nr,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,X.jsx)(Pr,{children:o(i)}),(0,X.jsx)(Fr,{children:a.map(e=>(0,X.jsxs)(Ir,{children:[(0,X.jsx)(`span`,{children:u(e)}),(0,X.jsx)(`button`,{type:`button`,"aria-label":o(`Remove date {date}`,{date:u(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,X.jsx)(kr,{children:(0,X.jsx)(Ae,{...l(),selected:null,onChange:e=>{e&&f(g(j(e)))},customInput:(0,X.jsx)(Qi,{label:n,className:D(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:o(`Today`),openToDate:s,calendarStartDay:c,filterDate:d})})]})]})},Qi=(0,N.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Ar,{type:`button`,ref:n,...t,children:o(e)}));Qi.displayName=`PickerTrigger`;var $i=t.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,ea=()=>{let e=F(),t=I(J.state),{start:n,rrule:r}=t,i=(0,N.useMemo)(()=>re(r,n),[r,n]),{startTimestamp:o,baseRule:s,recurrenceSet:c}=i,l=(0,N.useMemo)(()=>c?Array.from(new Set(c.rdates().map(e=>g(j(h(e)))).filter(e=>s?!0:e!==o))).sort((e,t)=>e-t):[],[s,c,o]),u=(0,N.useMemo)(()=>c?Array.from(new Set(c.exdates().map(e=>g(j(h(e)))))).sort((e,t)=>e-t):[],[c]),d=(0,N.useMemo)(()=>new Set(l),[l]),f=(0,N.useMemo)(()=>new Set(u),[u]),p=(0,N.useCallback)(e=>{let t=m(j(e)),n=a(Te(e)),r=s?s.between(t,n,!0).length>0:!1,i=c?c.between(t,n,!0).length>0:g(j(e))===o;return{full:i,base:r,excluded:r&&!i}},[s,c,o]),_=n=>{let r=n({baseRule:s,rdates:c?.rdates().filter(e=>s?!0:g(j(h(e)))!==o)??[],exdates:c?.exdates()??[]});e(q.setRRule(oe(t,r.baseRule,ta(r.rdates),ta(r.exdates))))};return{addedDates:l,excludedDates:u,addFixedDate:(e,n)=>{if(e===`exdate`&&S(i,n))return;let r=le(t,n);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:x(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,n)=>{if(e===`rdate`&&S(i,n))return;let r=le(t,n).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?x(n,r):n,exdates:e===`exdate`?x(i,r):i}))},canAddOccurrence:(0,N.useCallback)(e=>{let t=g(j(e)),n=p(e);return!n.full&&!n.excluded&&!d.has(t)},[d,p]),canExcludeOccurrence:(0,N.useCallback)(e=>{let t=g(j(e)),n=p(e);return n.base&&!n.excluded&&!f.has(t)&&!S(i,t)},[f,p,i]),getStatus:p}},ta=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},na=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],ra=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],ia=e=>[{value:E.DAILY,label:e?`Days`:`Day`},{value:E.WEEKLY,label:e?`Weeks`:`Week`},{value:E.MONTHLY,label:e?`Months`:`Month`},{value:E.YEARLY,label:e?`Years`:`Year`}],aa=300,oa=()=>{let t=F(),n=I(J.state),r=I(Y.weekStartDay),i=I(Y.formats)?.date.short.icu??`P`,{repeatType:a,repeatEndType:o,count:s,until:c,freq:l,start:u,interval:d}=n,p=a!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=ea(),b=(0,N.useMemo)(()=>e(u),[u]),x=t=>k(e(t),i,{locale:f()});return(0,X.jsxs)($i,{children:[(0,X.jsxs)(A,{$alignItems:`end`,style:{width:`100%`},children:[(0,X.jsx)(M,{translateOptions:!0,label:`Repeats`,value:a,options:na,onChange:e=>t(q.setRepeatType(e))}),a===`CUSTOM`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Ui,{}),(0,X.jsx)(M,{translateOptions:!0,label:``,value:l,options:ia(d>1),onChange:e=>t(q.setFreq(Number.parseInt(e,10)))})]})]}),a===`CUSTOM`&&(0,X.jsx)(Bi,{}),a!==`NEVER`&&(0,X.jsxs)(A,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(M,{translateOptions:!0,label:`Ends`,options:ra,value:o,onChange:e=>t(q.setRepeatEndType(e))}),o===`AFTER`&&(0,X.jsx)(_i,{label:`Times`,value:s,min:1,debounceMs:aa,onChange:e=>t(q.setCount(e))}),o===`ON_DATE`&&(0,X.jsx)(ke,{label:``,value:c||null,onChange:e=>t(q.setUntil(e)),datePickerProps:{dateFormat:i,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:r,minDate:b}})]}),(0,X.jsxs)(A,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,X.jsx)(Zi,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:x,filterDate:v,weekStartDay:r,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),p&&(0,X.jsx)(Zi,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:x,filterDate:y,weekStartDay:r,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},sa=({context:t,onOccurrenceSaved:n})=>{let r=(0,N.useId)(),i=(0,N.useId)(),a=(0,N.useId)(),[s,c]=(0,N.useState)(0),[l,u]=(0,N.useState)([]),d=F(),{start:f,end:p,allDay:m}=I(J.state),{date:h,time:g,datetime:_}=I(Y.formats),v=I(Y.weekStartDay),y=I(Y.timeInterval),b=I(Y.eventDuration),x=(0,N.useMemo)(()=>m?h.short.icu:_.short.icu,[m,h,_]),ee=(0,N.useMemo)(()=>m?ui(p):p,[m,p]);return(0,X.jsxs)(si,{children:[(0,X.jsxs)(ci,{children:[(0,X.jsxs)(li,{children:[(0,X.jsx)(ke,{id:i,label:`Starts`,value:f,onChange:e=>d(q.setStart(e)),datePickerProps:{id:i,showIcon:!0,icon:(0,X.jsx)(Se,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:g.short.icu,todayButton:o(`Today`),calendarStartDay:v,timeIntervals:y}}),(0,X.jsx)(ke,{id:a,label:`Ends`,value:ee,onChange:e=>{e!=null&&d(q.setEnd(fi({value:e,start:f,allDay:m,timeInterval:y})))},datePickerProps:{id:a,showIcon:!0,icon:(0,X.jsx)(Se,{}),toggleCalendarOnIconClick:!0,minDate:e(f),showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:g.short.icu,todayButton:o(`Today`),calendarStartDay:v,timeIntervals:y,filterTime:e=>di(new Date(e),f,y)}}),(0,X.jsx)(De,{id:r,label:`All Day`,enabled:m,style:{margin:0},onClick:e=>d(q.setAllDay({enabled:e,eventDuration:b}))})]}),(0,X.jsx)(oi,{context:t,refreshKey:s}),(0,X.jsx)(oa,{}),t?.eventId&&(0,X.jsx)(Kr,{context:t,refreshKey:s,onOccurrencesChanged:u})]}),(0,X.jsx)(ai,{context:t,editedOccurrences:l,onOccurrenceSaved:()=>{c(e=>e+1),n?.()}})]})},ca=t.div`
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
`,la=t.div`
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
`,ua=({context:e})=>{let{allDay:t}=I(J.state),n=I(Y.formats),r=(e,t=!1)=>k(h(new Date(e*1e3)),t?n?.datetime.short.icu??`Pp`:n?.date.short.icu??`P`,{locale:f()}),{splitAt:i,series:a}=e,s=a?.earlier??null,c=a?.later??null;return!i&&!s&&!c?null:(0,X.jsxs)(la,{children:[i&&(0,X.jsx)(`p`,{children:o(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:r(i,!t)})}),(s||c)&&(0,X.jsxs)(`nav`,{children:[(0,X.jsx)(`span`,{children:o(`Part of a series`)}),s&&(0,X.jsxs)(`a`,{href:s.url,children:[`← `,o(`Earlier part, from {date}`,{date:r(s.start)})]}),c&&(0,X.jsxs)(`a`,{href:c.url,children:[o(`Later part, from {date}`,{date:r(c.start)}),` →`]})]})]})},da=({context:e})=>{let{rrule:t}=I(J.state),n=(0,N.useMemo)(lt,[]),r=t?y(t,{forceset:!0}).all((e,t)=>t<10).map(e=>`${k(h(e),`yyyy-MM-dd HH:mm`)} [${Ne(e)}]`):[];return(0,X.jsxs)(ca,{children:[e&&(0,X.jsx)(ua,{context:e}),(0,X.jsx)(sa,{context:e}),n&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:t}),(0,X.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},fa=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,pa(n)),$(t,`end`,pa(r)),$(t,`until`,i?pa(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},pa=t=>k(e(t),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},ma=e=>{let t=he(e.event.rrule),{byweekday:n,bysetpos:r}=yr(t?.options.byweekday),i=br(e.event.repeatType),a=xr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||E.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?Sr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Yn({reducer:{app:Br,event:wr},preloadedState:o})},ha=new WeakSet,ga=e=>{if(ha.has(e))return;ha.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=ma(r),a=Ie.createRoot(n);i.subscribe(()=>{fa(i,e)}),fa(i,e),a.render((0,X.jsx)(Ye,{store:i,children:(0,X.jsx)(da,{context:r.context})}))},_a=(e=document)=>{e.querySelectorAll(`[data-calendar-transfer-select]`).forEach(ot),e.querySelectorAll(`[data-calendar-transfer]`).forEach(ct),e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(ga)},va=()=>{_a(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-calendar-transfer-select]`)&&ot(e),e.matches(`[data-calendar-transfer]`)&&ct(e),e.matches(`[data-event-builder]`)&&ga(e),_a(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,va):va();
