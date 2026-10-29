import{a as e,c as t,d as n,l as r,o as i,s as a,t as o,u as s}from"./translations-CL8ZheTP.js";import{a as c,i as l,n as u,r as d,t as f}from"./http-CR9t7coc.js";import{F as p,L as m,M as h,N as g,P as _,R as v,S as y,T as b,g as x,n as S,s as C,t as w,x as T,y as ee,z as E}from"./clsx-cTcqfvCk.js";import{n as te,t as ne}from"./dist-DIkwrSHL.js";import{n as re,t as ie}from"./create-with-ai-HGvoBrlB.js";import{a as D,c as ae,f as oe,i as se,l as ce,n as le,o as ue,r as de,s as fe,t as pe,u as me}from"./date-picker-DftqnX7R.js";import{i as he,p as ge,t as _e}from"./overlap-warning-D3FRusxs.js";import{C as O,S as k,_ as ve,a as ye,c as be,d as xe,f as Se,g as Ce,h as we,i as Te,l as Ee,m as A,n as De,o as Oe,p as ke,r as Ae,s as je,t as Me,u as Ne,w as Pe,x as Fe,y as Ie}from"./calendar-preview.operations-B83U9trr.js";import{t as j}from"./components-BWRsZ4NF.js";import{t as Le}from"./ai-button-CXq_Ss-z.js";import{t as Re}from"./open-event-create-with-ai-AyWFumb6.js";function ze(e,t){let n=b(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=C(n.getDate(),2),t=C(n.getMonth()+1,2);a=`${C(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=C(Math.trunc(t/60),2),r=C(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=C(n.getHours(),2),r=C(n.getMinutes(),2),i=C(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Be=s((e=>{var t=r();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:n,a=t.useSyncExternalStore,o=t.useRef,s=t.useEffect,c=t.useMemo,l=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Ve=s(((e,t)=>{t.exports=Be()})),He=n(i()),M=n(r(),1),Ue=Ve();function We(e){e()}function Ge(){let e=null,t=null;return{clear(){e=null,t=null},notify(){We(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){r&&e!==null&&(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Ke={notify(){},get:()=>[]};function qe(e,t){let n,r=Ke,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Ge())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Ke)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Je=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ye=typeof navigator<`u`&&navigator.product===`ReactNative`,Xe=Je||Ye?M.useLayoutEffect:M.useEffect,Ze=Symbol.for(`react-redux-context`),Qe=typeof globalThis<`u`?globalThis:{};function $e(){if(!M.createContext)return{};let e=Qe[Ze]??(Qe[Ze]=new Map),t=e.get(M.createContext);return t||(t=M.createContext(null),e.set(M.createContext,t)),t}var N=$e();function et(e){let{children:t,context:n,serverState:r,store:i}=e,a=M.useMemo(()=>{let e=qe(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=M.useMemo(()=>i.getState(),[i]);Xe(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||N;return M.createElement(s.Provider,{value:a},t)}var tt=et;function nt(e=N){return function(){return M.useContext(e)}}var rt=nt();function it(e=N){let t=e===N?rt:nt(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var at=it();function ot(e=N){let t=e===N?at:it(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var P=ot(),st=(e,t)=>e===t;function ct(e=N){let t=e===N?rt:nt(e),n=(e,n={})=>{let{equalityFn:r=st}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();M.useRef(!0);let s=M.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Ue.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return M.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var F=ct(),lt=e=>{let t=window.jQuery;if(e&&t)return t(e).closest(`[data-element-editor]`).data(`elementEditor`)??t(e).closest(`form`).data(`elementEditor`)},ut=async e=>{let t=lt(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},dt=new WeakSet,ft=e=>{let t=window.jQuery;if(dt.has(e)||!t)return;dt.add(e);let n=Number(e.dataset.calendarId),r=e.querySelector(`button.menubtn`),i=r?.querySelector(`.inline-flex`),a=i?.innerHTML,o=!1;t(e).on(`change`,async()=>{let s=Number(t(e).data(`value`));if(i&&a&&(i.innerHTML=a),t(e).data(`value`,n),e.querySelectorAll(`[data-value]`).forEach(e=>{e.classList.toggle(`sel`,Number(e.dataset.value)===n)}),o||s===n||!s)return;o=!0,r&&(r.disabled=!0);let c=lt(e),l=!1;try{let t=await ut(e);c?.pause(),l=!!c;let n=new Craft.CpScreenSlideout(`calendar/event-calendar/edit`,{params:{eventId:t,siteId:Number(e.dataset.siteId),targetCalendarId:s}}),i=!1;n.on(`submit`,e=>{let t=e?.response?.data?.url;i=!0,window.location.assign(t||window.location.href)}),n.on(`close`,()=>{!i&&l&&c?.resume(),o=!1,r&&(r.disabled=!1)})}catch{l&&c?.resume(),o=!1,r&&(r.disabled=!1),Craft.cp.displayError(Craft.t(`calendar`,`Couldn’t open the calendar mapping.`))}})},pt=e=>{let t=JSON.parse(e.dataset.populated||`{}`),n=Array.from(e.querySelectorAll(`select[data-field-mapping]`)),r=n.map(e=>e.value).filter(Boolean),i=r.length!==new Set(r).size,a=new Set(r),o=Object.entries(t).filter(([e])=>!a.has(e)),s=e.querySelector(`[data-unmapped-warning]`),c=e.querySelector(`[data-unmapped-fields]`),l=e.querySelector(`[data-mapping-error]`),u=e.querySelector(`input[data-calendar-transfer-confirm]`)?.checked,d=e.closest(`form.cp-screen`)?.querySelector(`.so-footer button.submit`);if(d){let e=!u||i;d.disabled=e,d.classList.toggle(`disabled`,e),d.setAttribute(`aria-disabled`,String(e))}s&&(s.hidden=o.length===0),l&&(l.hidden=!i),c&&c.replaceChildren(...o.map(([,e])=>{let t=document.createElement(`li`);return t.textContent=e,t})),n.forEach(e=>{e.setCustomValidity(i?Craft.t(`calendar`,`Each source field can only be mapped once.`):``)})},mt=e=>{dt.has(e)||(dt.add(e),e.addEventListener(`change`,()=>pt(e)),pt(e))},ht=()=>!1;function I(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var gt=typeof Symbol==`function`&&Symbol.observable||`@@observable`,_t=()=>Math.random().toString(36).substring(7).split(``).join(`.`),vt={INIT:`@@redux/INIT${_t()}`,REPLACE:`@@redux/REPLACE${_t()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${_t()}`};function yt(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function bt(e,t,n){if(typeof e!=`function`)throw Error(I(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(I(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(I(1));return n(bt)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(I(3));return i}function d(e){if(typeof e!=`function`)throw Error(I(4));if(c)throw Error(I(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(I(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!yt(e))throw Error(I(7));if(e.type===void 0)throw Error(I(8));if(typeof e.type!=`string`)throw Error(I(17));if(c)throw Error(I(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(I(10));r=e,f({type:vt.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(I(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[gt](){return this}}}return f({type:vt.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[gt]:m}}function xt(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:vt.INIT})===void 0)throw Error(I(12));if(n(void 0,{type:vt.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(I(13))})}function St(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{xt(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(I(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function Ct(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function wt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(I(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=Ct(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function Tt(e){return yt(e)&&`type`in e&&typeof e.type==`string`}var Et=Symbol.for(`immer-nothing`),Dt=Symbol.for(`immer-draftable`),L=Symbol.for(`immer-state`);function R(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var z=Object,B=z.getPrototypeOf,Ot=`constructor`,kt=`prototype`,At=`configurable`,jt=`enumerable`,Mt=`writable`,Nt=`value`,V=e=>!!e&&!!e[L];function H(e){return e?It(e)||Ut(e)||!!e[Dt]||!!e[Ot]?.[Dt]||Wt(e)||Gt(e):!1}var Pt=z[kt][Ot].toString(),Ft=new WeakMap;function It(e){if(!e||!Kt(e))return!1;let t=B(e);if(t===null||t===z[kt])return!0;let n=z.hasOwnProperty.call(t,Ot)&&t[Ot];if(n===Object)return!0;if(!U(n))return!1;let r=Ft.get(n);return r===void 0&&(r=Function.toString.call(n),Ft.set(n,r)),r===Pt}function Lt(e,t,n=!0){Rt(e)===0?(n?Reflect.ownKeys(e):z.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function Rt(e){let t=e[L];return t?t.type_:Ut(e)?1:Wt(e)?2:Gt(e)?3:0}var zt=(e,t,n=Rt(e))=>n===2?e.has(t):z[kt].hasOwnProperty.call(e,t),Bt=(e,t,n=Rt(e))=>n===2?e.get(t):e[t],Vt=(e,t,n,r=Rt(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Ht(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Ut=Array.isArray,Wt=e=>e instanceof Map,Gt=e=>e instanceof Set,Kt=e=>typeof e==`object`,U=e=>typeof e==`function`,qt=e=>typeof e==`boolean`;function Jt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var W=e=>e.copy_||e.base_,Yt=e=>e.modified_?e.copy_:e.base_;function Xt(e,t){if(Wt(e))return new Map(e);if(Gt(e))return new Set(e);if(Ut(e))return Array[kt].slice.call(e);let n=It(e);if(t===!0||t===`class_only`&&!n){let t=z.getOwnPropertyDescriptors(e);delete t[L];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[Mt]===!1&&(a[Mt]=!0,a[At]=!0),(a.get||a.set)&&(t[i]={[At]:!0,[Mt]:!0,[jt]:a[jt],[Nt]:e[i]})}return z.create(B(e),t)}{let t=B(e);if(t!==null&&n)return{...e};let r=z.create(t);return z.assign(r,e)}}function Zt(e,t=!1){return en(e)||V(e)||!H(e)||(Rt(e)>1&&z.defineProperties(e,{set:$t,add:$t,clear:$t,delete:$t}),z.freeze(e),t&&Lt(e,(e,t)=>{Zt(t,!0)},!1)),e}function Qt(){R(2)}var $t={[Nt]:Qt};function en(e){return e===null||!Kt(e)||z.isFrozen(e)}var tn=`MapSet`,nn=`Patches`,rn=`ArrayMethods`,an={};function G(e){let t=an[e];return t||R(0,e),t}var on=e=>!!an[e],sn,cn=()=>sn,ln=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:on(tn)?G(tn):void 0,arrayMethodsPlugin_:on(rn)?G(rn):void 0});function un(e,t){t&&(e.patchPlugin_=G(nn),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function dn(e){fn(e),e.drafts_.forEach(mn),e.drafts_=null}function fn(e){e===sn&&(sn=e.parent_)}var pn=e=>sn=ln(sn,e);function mn(e){let t=e[L];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function hn(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[L].modified_&&(dn(t),R(4)),H(e)&&(e=gn(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[L].base_,e,t)}else e=gn(t,n);return _n(t,e,!0),dn(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===Et?void 0:e}function gn(e,t){if(en(t))return t;let n=t[L];if(!n)return Tn(t,e.handledSet_,e);if(!yn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);Cn(n,e)}return n.copy_}function _n(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Zt(t,n)}function vn(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var yn=(e,t)=>e.scope_===t,bn=[];function xn(e,t,n,r){let i=W(e),a=e.type_;if(r!==void 0&&Bt(i,r,a)===t){Vt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;Lt(i,(e,n)=>{if(V(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??bn;for(let e of o)Vt(i,e,n,a)}function Sn(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!yn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Yt(i);xn(e,i.draft_??i,a,n),Cn(i,r)})}function Cn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}vn(e)}}function wn(e,t,n){let{scope_:r}=e;if(V(n)){let i=n[L];yn(i,r)&&i.callbacks_.push(function(){Nn(e),xn(e,n,Yt(i),t)})}else H(n)&&e.callbacks_.push(function(){let i=W(e);e.type_===3?i.has(n)&&Tn(n,r.handledSet_,r):Bt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&Tn(Bt(e.copy_,t,e.type_),r.handledSet_,r)})}function Tn(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||V(e)||t.has(e)||!H(e)||en(e)||(t.add(e),Lt(e,(r,i)=>{if(V(i)){let t=i[L];yn(t,n)&&(Vt(e,r,Yt(t),e.type_),vn(t))}else H(i)&&Tn(i,t,n)})),e}function En(e,t){let n=Ut(e),r={type_:+!!n,scope_:t?t.scope_:cn(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=Dn;n&&(i=[r],a=On);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var Dn={get(e,t){if(t===L)return e;if(t===`constructor`||t===`__proto__`){let n=W(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=W(e);if(!zt(i,t,e.type_))return An(e,i,t);let a=i[t];if(e.finalized_||!H(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Jt(t))return a;if(a===kn(e.base_,t)){Nn(e);let n=e.type_===1?+t:t,r=Fn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in W(e)},ownKeys(e){return Reflect.ownKeys(W(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=jn(W(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=kn(W(e),t),i=r?.[L];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Ht(n,r)&&(n!==void 0||zt(e.base_,t,e.type_)))return!0;Nn(e),Mn(e)}return e.copy_[t]===n&&(n!==void 0||zt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_.set(t,!0),wn(e,t,n)),!0},deleteProperty(e,t){return Nn(e),kn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),Mn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=W(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Mt]:!0,[At]:e.type_!==1||t!==`length`,[jt]:r[jt],[Nt]:n[t]}},defineProperty(){R(11)},getPrototypeOf(e){return B(e.base_)},setPrototypeOf(){R(12)}},On={};for(let e in Dn){let t=Dn[e];On[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}On.deleteProperty=function(e,t){return On.set.call(this,e,t,void 0)},On.set=function(e,t,n){return Dn.set.call(this,e[0],t,n,e[0])};function kn(e,t){let n=e[L];return(n?W(n):e)[t]}function An(e,t,n){let r=jn(t,n);return r?Nt in r?r[Nt]:r.get?.call(e.draft_):void 0}function jn(e,t){if(!(t in e))return;let n=B(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=B(n)}}function Mn(e){e.modified_||(e.modified_=!0,e.parent_&&Mn(e.parent_))}function Nn(e){e.copy_||(e.assigned_=new Map,e.copy_=Xt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var Pn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(U(e)&&!U(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}U(t)||R(6),n!==void 0&&!U(n)&&R(7);let r;if(H(e)){let i=pn(this),a=Fn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?dn(i):fn(i)}return un(i,n),hn(r,i)}if(!e||!Kt(e)){if(r=t(e),r===void 0&&(r=e),r===Et&&(r=void 0),this.autoFreeze_&&Zt(r,!0),n){let t=[],i=[];G(nn).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}R(1,e)},this.produceWithPatches=(e,t)=>{if(U(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},qt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),qt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),qt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){H(e)||R(8),V(e)&&(e=In(e));let t=pn(this),n=Fn(t,e,void 0);return n[L].isManual_=!0,fn(t),n}finishDraft(e,t){let n=e&&e[L];n&&n.isManual_||R(9);let{scope_:r}=n;return un(r,t),hn(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=G(nn).applyPatches_;return V(e)?r(e,t):this.produce(e,e=>r(e,t))}};function Fn(e,t,n,r){let[i,a]=Wt(t)?G(tn).proxyMap_(t,n):Gt(t)?G(tn).proxySet_(t,n):En(t,n);return(n?.scope_??cn()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?Sn(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function In(e){return V(e)||R(10,e),Ln(e)}function Ln(e){if(!H(e)||en(e))return e;let t=e[L],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Xt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Xt(e,!0);return Lt(n,(e,t)=>{Vt(n,e,Ln(t))},r),t&&(t.finalized_=!1),n}var Rn=new Pn().produce;function zn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Bn=zn(),Vn=zn,Hn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?Ct:Ct.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Un(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(K(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>Tt(t)&&t.type===e,n}var Wn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Gn(e){return H(e)?Rn(e,()=>{}):e}function Kn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function qn(e){return typeof e==`boolean`}var Jn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new Wn;return t&&(qn(t)?a.push(Bn):a.push(Vn(t.extraArgument))),a},Yn=`RTK_autoBatch`,Xn=e=>t=>{setTimeout(t,e)},Zn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Qn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Zn(window.requestAnimationFrame,100):Xn(10):e.type===`callback`?e.queueNotification:Xn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Yn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},$n=e=>function(t){let{autoBatch:n=!0}=t??{},r=new Wn(e);return n&&r.push(Qn(typeof n==`object`?n:void 0)),r};function er(e){let t=Jn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(yt(n))c=St(n);else throw Error(K(1));let l;l=typeof r==`function`?r(t):t();let u=Ct;i&&(u=Hn({trace:!1,...typeof i==`object`&&i}));let d=$n(wt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return bt(c,o,p)}function tr(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(K(28));if(r in t)throw Error(K(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function nr(e){return typeof e==`function`}function rr(e,t){let[n,r,i]=tr(t),a;if(nr(e))a=()=>Gn(e());else{let t=Gn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n){if(V(e)){let r=n(e,t);return r===void 0?e:r}if(H(e))return Rn(e,e=>n(e,t));{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}}return e},e)}return o.getInitialState=a,o}var ir=Symbol.for(`rtk-slice-createasyncthunk`);function ar(e,t){return`${e}/${t}`}function or({creators:e}={}){let t=e?.asyncThunk?.[ir];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(K(11));let i=(typeof e.reducers==`function`?e.reducers(lr()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(K(12));if(n in o.sliceCaseReducersByType)throw Error(K(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:ar(n,r),createNotation:typeof e.reducers==`function`};dr(a)?pr(o,a,s,t):ur(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?tr(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return rr(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Kn(d,r,m)),i}function i(t=l){return Kn(Kn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=sr(a,t,()=>Kn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function sr(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var cr=or();function lr(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function ur({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!fr(r))throw Error(K(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Un(e,o):Un(e))}function dr(e){return e._reducerDefinitionType===`asyncThunk`}function fr(e){return e._reducerDefinitionType===`reducerWithPrepare`}function pr({type:e,reducerName:t},n,r,i){if(!i)throw Error(K(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||mr,pending:s||mr,rejected:c||mr,settled:l||mr})}function mr(){}var hr=`listener`,gr=`completed`,_r=`cancelled`;`${_r}`,`${gr}`,`${hr}${_r}`,`${hr}${gr}`;var{assign:vr}=Object,yr=`listenerMiddleware`,br=vr(Un(`${yr}/add`),{withTypes:()=>br});`${yr}`;var xr=vr(Un(`${yr}/remove`),{withTypes:()=>xr});function K(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var Sr=cr({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:Cr}=Sr,wr=Sr.reducer,q={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0,isSolspaceAiConnected:e=>!!e.app.isSolspaceAiConnected},Tr=cr({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:O.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=Ee(e,e.until)),r!==void 0&&(e.until=e.start+r),A(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;e.until=n==null?void 0:Ee(e,n),A(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=v(e.start);a.setHours(i,0,0,0),e.start=_(a);let o=v(e.end);n?o=oe(x(o),1):(o=ae(o,1),o=fe(o,a.getHours()),o=me(o,r)),e.end=_(o),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=Ee(e,e.until)),A(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=Ce(e.rrule)),e.repeatType=t.payload,A(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,e.count=n===`AFTER`?Ie(e.count):null,A(e)},setFreq:(e,t)=>{e.freq=t.payload,ve(e,t.payload),A(e)},setCount:(e,t)=>{e.count=Ie(t.payload),A(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),A(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=ke(r),A(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=ke(n.byweekday)),`bymonth`in n&&(e.bymonth=ke(n.bymonth)),`bymonthday`in n&&(e.bymonthday=ke(n.bymonthday)),`byyearday`in n&&(e.byyearday=ke(n.byyearday)),`bysetpos`in n&&(e.bysetpos=ke(n.bysetpos)),A(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0},applyGeneratedSchedule:(e,t)=>{Object.assign(e,Ne(t.payload))}}}),{actions:J}=Tr,Er=Tr.reducer,Y={state:e=>e.event},Dr=n(t()),Or=`calendar:occurrences-changed`,kr=async(e,t,n)=>{if(!n.length)return;let r=await ut(e),i=await f(Craft.getActionUrl(`calendar/occurrences/apply-edits`),{method:`POST`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify({eventId:r,siteId:t,occurrenceEdits:n})});if(!i.ok){let e=o(`Couldn’t save the occurrence.`);try{let t=await i.json();e=t.message||t.error||e}catch{}throw Error(e)}window.dispatchEvent(new Event(Or))},X=a(),Ar=(e,t)=>{let n=document.querySelector(e);n&&(n.value=t,n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.dispatchEvent(new Event(`change`,{bubbles:!0})))},jr=e=>{Ar(`#title, input[name='title']`,e)},Mr=(e,t)=>{if(!e)return;let n=CSS.escape(e);Ar(`textarea[name="fields[${n}]"], input[name="fields[${n}]"], #fields-${n}`,t??``)},Nr=e=>document.querySelector(e)?.value?.trim()??``,Pr=e=>{if(!e)return``;let t=CSS.escape(e);return Nr(`textarea[name="fields[${t}]"], input[name="fields[${t}]"], #fields-${t}`)},Fr=e=>S(v(e),`yyyy-MM-dd'T'HH:mm:ss`),Ir=()=>{window.location.href=Craft.getCpUrl(`calendar/settings/solspaceai`)},Lr=(e,t)=>!e?.length||e.includes(t),Rr=({context:e})=>{let t=(0,M.useRef)(null),n=(0,M.useRef)(!1),r=P(),i=F(q.isSolspaceAiConnected),a=F(Y.state),{showPopover:s,hidePopover:c}=d(),l=document.querySelector(`[data-event-ai-create-root]`),u=()=>{let t=document.querySelector(`[data-event-builder]`)?.querySelector(`input[name="rrule"]`)?.value?.trim()||``,n=a.rrule?.trim()||``,r=e=>(e.includes(`RDATE`)?2:0)+(e.includes(`EXDATE`)?2:0)+e.length/1e3,i=r(t)>=r(n)&&t||n;return{title:Nr(`#title, input[name='title']`)||`Untitled`,description:Pr(e?.descriptionFieldHandle),location:Pr(e?.locationFieldHandle),start:Fr(a.start),end:Fr(a.end),allDay:a.allDay,repeatType:a.repeatType,rrule:i,calendarId:e?.calendarId}},f=async t=>{let n=t.changedFields,i=t.occurrenceEdits??[],s=i.length>0&&(!n?.length||n.includes(`occurrenceEdits`)||n.includes(`additionalDates`));if(Lr(n,`title`)&&jr(t.title),Lr(n,`description`)&&Mr(e?.descriptionFieldHandle,t.description),Lr(n,`location`)&&Mr(e?.locationFieldHandle,t.location),(!n?.length||[`start`,`end`,`allDay`,`repeatType`,`rrule`,`additionalDates`,`excludedDates`,`occurrenceEdits`].some(e=>n.includes(e)))&&(n?.length&&n.every(e=>[`additionalDates`,`excludedDates`,`rrule`,`occurrenceEdits`].includes(e))&&t.rrule?r(J.setRRule(t.rrule)):r(J.applyGeneratedSchedule({start:t.start,end:t.end,allDay:t.allDay,repeatType:t.repeatType||`NEVER`,repeatEndType:t.repeatEndType||void 0,until:t.until??void 0,rrule:t.rrule||void 0,timezone:a.timezone}))),c(),s&&e)try{await kr(document.querySelector(`[data-event-builder]`),e.siteId,i)}catch(e){Craft.cp.displayError(e instanceof Error?e.message:o(`Couldn’t save the occurrence.`))}},p=()=>{if(!i){Ir();return}let e=t.current;e&&s((0,X.jsx)(ie,{mode:`edit`,calendarSelected:!0,currentEvent:u(),onCancel:c,onApplyDraft:f}),e,{alignment:`end`,position:[`bottom`,`top`,`right`,`left`]})},m=(0,M.useRef)(p);return m.current=p,(0,M.useEffect)(()=>{if(n.current||!l||!i||!Re())return;n.current=!0;let e=window.setTimeout(()=>m.current(),100);return()=>window.clearTimeout(e)},[i,l]),l?(0,Dr.createPortal)((0,X.jsx)(Le,{ref:t,icon:`edit`,connected:i,label:o(`Update with AI`),onClick:p}),l):null},zr=e.div`
  padding-top: 16px;
  width: 100%;
`,Br=e.div`
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
`,Vr=e.p`
  && {
    margin: 0 0 8px;
    padding: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
`,Hr=e.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ur=e.div`
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
`,Wr=e.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Gr=e.div`
  position: relative;
  flex-shrink: 0;
`,Kr=e.button`
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
`,qr=e.div`
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
`,Jr=e.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Yr=e.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Xr=e.li`
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
`,Zr=e.button`
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
`,Qr=e.div`
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
`,$r=e.ul`
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
`,ei=e.li`
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
`,ti=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],ni=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of ti){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},ri=({context:e,refreshKey:t,onOccurrencesChanged:n})=>{let r=(0,M.useRef)(null),[i,a]=(0,M.useState)([]),[s,c]=(0,M.useState)(null),[l,u]=(0,M.useState)(null),d=(0,M.useRef)(0),[p,m]=(0,M.useState)(new Map),h=F(Y.state),g=F(q.formats),_=e=>he({...e,...p.get(e.recurrenceId)},g),v=(0,M.useCallback)(()=>lt(r.current)?.settings.elementId??e.eventId,[e.eventId]),y=(0,M.useCallback)(async()=>{let t=v();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let r=await f(n,{headers:{Accept:`application/json`}});if(!r.ok)return;let i=(await r.json()).occurrences??[];++d.current,a(i),u(null),m(new Map)},[e.siteId,v]);(0,M.useEffect)(()=>{y()},[y,t]);let b=(0,M.useCallback)(async()=>{let t=v();if(!t)return;let n=++d.current,i=await f(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...ni(r.current)})});if(!i.ok)return;let a=await i.json();n===d.current&&(u(new Set(a.orphaned??[])),m(new Map(a.occurrences?.map(e=>[e.recurrenceId,e])??[])))},[e.siteId,v]);(0,M.useEffect)(()=>{if(++d.current,i.length===0)return;let e=setTimeout(()=>void b(),400);return()=>clearTimeout(e)},[h,i,b]);let x=e=>l?l.has(e.recurrenceId):e.orphaned;(0,M.useEffect)(()=>{n?.(i.map(e=>({...e,...p.get(e.recurrenceId),orphaned:l?l.has(e.recurrenceId):e.orphaned})))},[i,l,p,n]);let S=async t=>{c(t.recurrenceId);try{let n=await ut(r.current);if(!n)return;ge({eventId:n,recurrenceId:p.get(t.recurrenceId)?.scheduleRecurrenceId??t.recurrenceId,siteId:e.siteId,onSave:()=>void y()})}catch{Craft.cp.displayError(o(`Couldn’t open the occurrence for editing.`))}finally{c(null)}},C=async t=>{if(window.confirm(o(`Remove everything this occurrence changes?`))){c(t.recurrenceId);try{let n=await ut(r.current);if(!n)return;let i=await f(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:p.get(t.recurrenceId)?.scheduleRecurrenceId??t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||o(`Couldn’t reset the occurrence.`));return}await y()}catch{Craft.cp.displayError(o(`Couldn’t reset the occurrence.`))}finally{c(null)}}};return(0,X.jsx)(Qr,{ref:r,children:i.length>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Br,{as:`h3`,children:o(`Edited occurrences`)}),(0,X.jsx)(Vr,{children:o(`Occurrences with their own changes. Changes made here go live with the event.`)}),i.some(x)&&(0,X.jsx)(Vr,{className:`warning`,children:o(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,X.jsx)($r,{children:i.map(e=>(0,X.jsxs)(ei,{className:w(x(e)&&`is-orphaned`,e.cancelled&&`is-cancelled`),children:[(0,X.jsxs)(`div`,{className:`occurrence-details`,children:[(0,X.jsx)(`span`,{className:`occurrence-title`,children:e.title}),e.cancelled&&(0,X.jsx)(`span`,{className:`occurrence-state cancelled`,children:o(`Cancelled`)}),x(e)&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:o(`No longer on the schedule`)})]}),(0,X.jsx)(`div`,{className:`occurrence-date`,children:_(e)}),(0,X.jsx)(`div`,{className:`occurrence-changes`,children:(0,X.jsx)(`span`,{children:e.changes.join(`, `)})}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[!x(e)&&(0,X.jsx)(Zr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":o(`Edit occurrence on {date}`,{date:_(e)}),title:o(`Edit occurrence`),disabled:s!==null,onClick:()=>void S(e)}),(0,X.jsx)(Zr,{type:`button`,className:`icon occurrence-discard`,"data-icon":`remove`,"aria-label":`${o(`Discard`)}: ${_(e)}`,title:o(`Removes everything this occurrence changes.`),disabled:s!==null,onClick:()=>void C(e)})]})]},e.recurrenceId))})]})})},ii=e.div`
  container-type: inline-size;

  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
  flex: 0 0 auto;
  min-width: 0;
  box-sizing: border-box;
    
  @container (min-width: 1024px) {
    width: 535px;
    flex-basis: 535px;
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

    .fc-edited-date .fc-daygrid-day-frame::after {
      content: "";
      position: absolute;
      top: 4px;
      inset-inline-end: 4px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: var(--blue-600);
      pointer-events: none;
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
`,ai=e.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  align-items: start;
  gap: 16px;

  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;

  @container (max-width: 449px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,oi=e.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,si=e.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,ci=e.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,li=e.div`
  min-width: 0;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,ui=e.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,di=e.li`
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
    min-width: 0;
  }

  .occurrence-actions {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    gap: 0;
  }

  .occurrence-date {
    display: flex;
    align-items: center;
    gap: 6px;
    line-height: 18px;

    > span:first-child {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .occurrence-state {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }

  &.is-edited .occurrence-date::after {
    content: "";
    flex: 0 0 4px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--blue-600);
  }

  &.is-cancelled {
    background-color: var(--yellow-050);

    .occurrence-date > span:first-child {
      color: var(--gray-600);
      text-decoration: line-through;
    }
  }
`,fi=e.ul`
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
`,pi=e=>new Date(`${e.replace(` `,`T`)}Z`),mi=(e,t,n,r=[],i,a)=>{if(!n)return[];let o=new Date(`${p(n)}T00:00:00Z`),s=i??new Date(Date.UTC(o.getUTCFullYear()+100,0,1)),c=r.filter(t=>{if(t.orphaned)return!1;let n=pi(t.scheduleRecurrenceId??t.recurrenceId);return e.recurrenceSet?.between(n,n,!0).length===1}),l=new Map(c.map(e=>[e.scheduleRecurrenceId?.replace(` `,`T`)??e.recurrenceId.replace(` `,`T`),e])),u=t.end-t.start,d=(e.recurrenceSet?e.recurrenceSet.between(i?new Date(o.getTime()-Math.max(0,u)*1e3):o,s,!0,a===void 0?void 0:(e,t)=>t<a+c.length):[new Date(t.start*1e3)]).filter(e=>!l.has(m(e))).map(e=>{let n=e.getTime()/1e3,r=t.allDay&&t.end%86400==0?u-1:u;return{recurrenceId:m(e),scheduleRecurrenceId:m(e),start:n,end:n+r,allDay:t.allDay,title:null,edited:!1,cancelled:!1}});for(let e of c)d.push({...e,scheduleRecurrenceId:e.scheduleRecurrenceId??e.recurrenceId,edited:!0});let f=d.filter(e=>i?e.start<s.getTime()/1e3&&e.end>=o.getTime()/1e3:e.start>=o.getTime()/1e3).sort((e,t)=>e.start-t.start||e.recurrenceId.localeCompare(t.recurrenceId));return a===void 0?f:f.slice(0,a)},hi=(e,t)=>{let n=p(t),r=e.allDay?e.end:Math.max(e.start,e.end-1);return p(new Date(e.start*1e3))<=n&&p(new Date(r*1e3))>=n},gi=(e,t=[])=>{let n=[],r=(e,t,r)=>{e>0&&n.push(o(e===1?t:r,{count:e}))},i=(e.recurrenceSet?.rdates()??[]).filter(t=>{let n=je(e,t);return n.full&&!n.base&&n.timestamp!==e.startTimestamp}).length,a=(e.recurrenceSet?.exdates()??[]).filter(t=>je(e,t).excluded).length,s=t.filter(e=>!e.orphaned);return r(i,`{count} additional date`,`{count} additional dates`),r(a,`{count} excluded date`,`{count} excluded dates`),r(s.filter(e=>!e.cancelled).length,`{count} edited occurrence`,`{count} edited occurrences`),r(s.filter(e=>e.cancelled).length,`{count} cancelled occurrence`,`{count} cancelled occurrences`),r(t.filter(e=>e.orphaned).length,`{count} edit off schedule`,`{count} edits off schedule`),n},_i=(e,t,n,r=`PP`,i=`PPp`)=>{let a=e=>S(v(e),n?r:i,{locale:T()});return e?.splitAt?o(`This draft changes the series from {date} onward.`,{date:a(e.splitAt)}):e?.series?.later?o(`This part of the series starts on {start} and ends before {end}.`,{start:a(t),end:a(e.series.later.start)}):e?.series?.earlier?o(`This part of the series starts on {date}.`,{date:a(t)}):null},vi=8,yi=({context:e,onOccurrenceSaved:t,editedOccurrences:n})=>{let r=(0,M.useRef)(null),[i,a]=(0,M.useState)(!1),s=P(),c=F(q.weekStartDay),l=F(q.formats),u=l?.date.short.icu??`P`,d=l?.datetime?.short.icu??`Pp`,f=F(Y.state),{start:m,rrule:h}=f,g=!!(e?.eventId&&h),[_,v]=(0,M.useState)(null),y=(0,M.useMemo)(()=>Ae(h,m),[h,m]),b=(0,M.useMemo)(()=>mi(y,f,_?.start??null,n,_?.end),[y,f,_,n]),x=(0,M.useMemo)(()=>b.map(e=>({id:e.recurrenceId,start:p(new Date(e.start*1e3)),allDay:!0})),[b]),C=(0,M.useMemo)(()=>mi(y,f,_?.start??null,n,void 0,vi),[y,f,_,n]),w=e=>b.filter(t=>hi(t,e)),ie=e=>[e.title,he(e,l),e.cancelled?o(`Cancelled`):e.edited?o(`Edited occurrence`):null].filter(Boolean).join(` · `),ae=(0,M.useMemo)(()=>ye(y,u),[y,u]),oe=(0,M.useMemo)(()=>{let e=De(y,C.length);return e?Te(e):null},[y,C]),se=(0,M.useMemo)(()=>gi(y,n),[y,n]),ce=_i(e,m,f.allDay,u,d),le=(0,M.useCallback)((e,t,n)=>{s(J.setRRule(Me(f,y,e,t,n)))},[s,y,f]),ue=(0,M.useCallback)(e=>{let t=Oe(y,e);if(t){let{timestamp:n}=je(y,e);le(t,n,t===`exdate`)}},[le,y]),de=e=>{let t=w(e).find(e=>e.edited),r=n?.find(t=>!t.orphaned&&p(pi(t.scheduleRecurrenceId??t.recurrenceId))===p(e));if(g&&(t||r)){pe((t??r).scheduleRecurrenceId??(t??r).recurrenceId);return}let i=je(y,e);i.base&&i.excluded?le(`exdate`,i.timestamp,!1):i.full?ue(e):i.full||le(`rdate`,i.timestamp,!0)},fe=(0,M.useCallback)(e=>je(y,e),[y]),pe=async n=>{if(e&&!i){a(!0);try{let i=await ut(r.current);ge({eventId:i,recurrenceId:n.replace(` `,`T`),siteId:e.siteId,onSave:()=>t?.()})}catch{Craft.cp.displayError(o(`Couldn’t open the occurrence for editing.`))}finally{a(!1)}}};return(0,X.jsx)(ii,{ref:r,children:(0,X.jsxs)(D,{children:[(0,X.jsxs)(j,{$direction:`column`,$gap:10,children:[(0,X.jsx)(oi,{children:o(`Schedule Preview`)}),ae&&(0,X.jsx)(si,{children:ae})]}),se.length>0&&(0,X.jsx)(fi,{"aria-label":o(`Schedule changes`),children:se.map(e=>(0,X.jsx)(`li`,{children:e},e))}),ce&&(0,X.jsx)(si,{children:ce}),(0,X.jsxs)(ai,{children:[(0,X.jsxs)(j,{$direction:`column`,$gap:10,children:[(0,X.jsx)(ne,{...ee(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[te,re],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(T().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:c,timeZone:`UTC`,eventDisplay:`none`,events:x,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>v({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=fe(e.date),n=w(e.date);return[n.length>0?`fc-has-event`:``,n.length>0&&t.rdate?`fc-extra-date`:``,n.length===0&&t.excluded?`fc-excluded-date`:``,n.some(e=>e.cancelled)?`fc-cancelled-date`:``,n.some(e=>e.edited)?`fc-edited-date`:``].filter(Boolean)},dayCellContent:e=>{let t=w(e.date).map(ie),n=t.length?t.join(`
`):void 0;return(0,X.jsxs)(`span`,{title:n,children:[e.dayNumberText,n&&(0,X.jsxs)(`span`,{className:`cancelled-date-label`,children:[`, `,n]})]})},dateClick:e=>de(e.date)}),oe&&(0,X.jsx)(ci,{children:oe})]}),(0,X.jsx)(li,{children:C.length===0?(0,X.jsxs)(`p`,{children:[o(`No occurrences starting from`),(0,X.jsx)(`br`,{}),S(E(_?.currentStart??new Date),`PP`,{locale:T()})]}):(0,X.jsx)(ui,{$count:C.length,children:C.map(e=>{let t=new Date(e.start*1e3),n=e.cancelled,r=pi(e.scheduleRecurrenceId),a=S(E(t),u,{locale:T()}),s=Oe(y,r),c=g?e.scheduleRecurrenceId:null,l=o(s===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:a});return(0,X.jsxs)(di,{title:ie(e),className:[n?`is-cancelled`:``,e.edited?`is-edited`:``].filter(Boolean).join(` `),children:[(0,X.jsxs)(`span`,{className:`occurrence-date`,children:[(0,X.jsx)(`span`,{children:a}),e.edited&&!n&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:o(`Edited occurrence`)}),n&&(0,X.jsx)(`span`,{className:`occurrence-state`,children:o(`Cancelled`)})]}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[c&&(0,X.jsx)(Zr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":o(`Edit occurrence on {date}`,{date:a}),title:o(`Edit occurrence`),disabled:i,onClick:()=>void pe(c)}),s&&(0,X.jsx)(Zr,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:i,"aria-label":l,title:l,onClick:()=>ue(r)})]})]},e.recurrenceId)})})})]})]})})},bi=({context:e,refreshKey:t})=>{let n=F(Y.state),{showOverlapWarnings:r,formats:i}=F(q.config),a=(0,M.useRef)(null),o=(0,M.useCallback)(()=>lt(a.current)?.settings.elementId??e?.eventId,[e?.eventId]);return e?.calendarId?(0,X.jsx)(`div`,{ref:a,style:{padding:r?`0 20px 12px`:`0 20px`,marginTop:r?-8:0},children:(0,X.jsx)(_e,{formats:i,enabled:r,schedule:{...n,rrule:n.rrule??``,calendarId:e.calendarId,siteId:e.siteId},resolveEventId:o,refreshKey:t})}):null},xi=e.div`
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
`,Si=e.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,Ci=e.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,wi=e=>_(ae(v(e),1)),Ti=(e,t,n)=>{let r=Di(t,n);return e.getTime()>=r.getTime()},Ei=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n){let t=v(e),n=oe(x(t),1);return _(n)}let i=v(e),a=Di(t,r);return i.getTime()>=a.getTime()?e:_(a)},Di=(e,t)=>me(v(e),t),Z=({options:e,value:t,onChange:n,translateOptions:r=!1,...i})=>(0,X.jsx)(D,{...i,children:(0,X.jsx)(`div`,{className:`select fullwidth`,children:(0,X.jsx)(`select`,{id:i.id,className:`fullwidth`,value:t,onChange:e=>n?.(e.target.value),children:e.map(e=>(0,X.jsx)(`option`,{value:e.value,children:r?o(e.label):e.label},e.value))})})}),Oi=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},ki=({inputValue:e,value:t,min:n})=>{let r=Oi(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Ai=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,M.useState)(e?.toString()??``),o=(0,M.useRef)(void 0),s=(0,M.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,M.useCallback)((e,t=`debounced`)=>{s(),r&&(!n||t===`immediate`?r(e):o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n))},[s,n,r]);return(0,M.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,M.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,M.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Oi(n);r===null||t!==void 0&&r<t?s():c(r)},[s,c,t]),handleBlur:(0,M.useCallback)(n=>{n.stopPropagation();let r=ki({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},ji=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Ai({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(D,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Mi=()=>null,Ni=[{value:`MO`,label:`Monday`,days:[k.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[k.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[k.WE.weekday]},{value:`TH`,label:`Thursday`,days:[k.TH.weekday]},{value:`FR`,label:`Friday`,days:[k.FR.weekday]},{value:`SA`,label:`Saturday`,days:[k.SA.weekday]},{value:`SU`,label:`Sunday`,days:[k.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[k.MO.weekday,k.TU.weekday,k.WE.weekday,k.TH.weekday,k.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[k.SA.weekday,k.SU.weekday]}],Pi=e=>{if(e&&e.length!==0)return Array.from(new Set(e)).sort((e,t)=>e-t)},Fi=(e,t)=>{let n=Pi(e),r=Pi(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Ii=(e,t)=>{if(e){let t=Ni.find(t=>Fi(t.days,e));if(t)return t.value}if(t!==void 0){let e=Ni.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Ni[0].value},Li=e=>Ni.find(t=>t.value===e)?.days??[k.MO.weekday],Q=`5px`,Ri=e.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,zi=e(Ri)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,Bi=e(Ri)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,Vi=e.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,Hi=e(Vi)`
  grid-template-columns: repeat(7, 1fr);

  ${Ri} {
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
`,Ui=e(Vi)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${Ri} {
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
`,Wi=e(Vi)`
  grid-template-columns: repeat(4, 1fr);

  ${Ri} {
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
`,Gi=({label:e,values:t,onChange:n})=>(0,X.jsx)(D,{label:e,children:(0,X.jsxs)(Hi,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(zi,{type:`button`,className:w(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(Bi,{},e))]})}),Ki=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],qi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Ji=()=>{let e=P(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=F(Y.state),a=v(t),o=a.getDate(),s=(a.getDay()+6)%7,c=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,l=n?.length?n:[o],u=i?.[0]??1,d=Ii(r,s),f=t=>{e(J.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},p=(t,n)=>{e(J.setByRules({bymonthday:void 0,byweekday:Li(t),bysetpos:[n]}))};return(0,X.jsxs)(j,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(Z,{translateOptions:!0,label:`Repeat on`,value:c,options:Ki,onChange:e=>{e===`WEEKDAY`?p(d,u):f(l)}}),c===`MONTHDAY`&&(0,X.jsx)(Gi,{label:`Days of Month`,values:l,onChange:e=>f(e)}),c===`WEEKDAY`&&(0,X.jsxs)(j,{children:[(0,X.jsx)(Z,{translateOptions:!0,label:`Position`,value:u,options:qi,onChange:e=>p(d,Number.parseInt(e,10))}),(0,X.jsx)(Z,{translateOptions:!0,label:`Day`,value:d,options:Ni.map(e=>({value:e.value,label:e.label})),onChange:e=>p(e,u)})]})]})},Yi=[{weekday:k.SU,label:`Sun`},{weekday:k.MO,label:`Mon`},{weekday:k.TU,label:`Tue`},{weekday:k.WE,label:`Wed`},{weekday:k.TH,label:`Thu`},{weekday:k.FR,label:`Fri`},{weekday:k.SA,label:`Sat`}],Xi=()=>{let e=P(),{byweekday:t}=F(Y.state);return(0,X.jsx)(j,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,X.jsx)(D,{label:`On`,children:(0,X.jsx)(Ui,{children:Yi.map(({weekday:n,label:r})=>(0,X.jsx)(zi,{type:`button`,className:w(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(J.setDays({type:`byweekday`,values:r}))},children:o(r)},n.weekday))})})})},Zi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],Qi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],$i=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],ea=()=>{let e=P(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=F(Y.state),s=v(t),c=s.getDate(),l=s.getMonth()+1,u=(s.getDay()+6)%7,d=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,f=r?.length?r:[c],p=n?.length?n:[l],m=a?.[0]??1,h=Ii(i,u),g=(t,n)=>{e(J.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},_=(t,n,r)=>{e(J.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:Li(n),bysetpos:[r]}))};return(0,X.jsxs)(j,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(D,{label:`Month`,children:(0,X.jsx)(Wi,{children:$i.map(e=>{let t=p.includes(e.value);return(0,X.jsx)(zi,{type:`button`,className:w(t&&`active`),onClick:()=>{let n=p.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),d===`WEEKDAY`?_(n,h,m):g(n,f))},children:o(e.label)},e.value)})})}),(0,X.jsx)(Z,{translateOptions:!0,label:`Repeat on`,value:d,options:Zi,onChange:e=>{e===`WEEKDAY`?_(p,h,m):g(p,f)}}),d===`MONTHDAY`&&(0,X.jsx)(Gi,{label:`Days of Month`,values:f,onChange:e=>g(p,e)}),d===`WEEKDAY`&&(0,X.jsxs)(j,{children:[(0,X.jsx)(Z,{translateOptions:!0,label:`Position`,value:m,options:Qi,onChange:e=>_(p,h,Number.parseInt(e,10))}),(0,X.jsx)(Z,{translateOptions:!0,label:`Day`,value:h,options:Ni.map(e=>({value:e.value,label:e.label})),onChange:e=>_(p,e,m)})]})]})},ta=()=>{let{freq:e}=F(Y.state);return e===O.DAILY?(0,X.jsx)(Mi,{}):e===O.WEEKLY?(0,X.jsx)(Xi,{}):e===O.MONTHLY?(0,X.jsx)(Ji,{}):e===O.YEARLY?(0,X.jsx)(ea,{}):null},na=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),ra=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),ia=()=>{let e=P(),{interval:t}=F(Y.state);return(0,X.jsxs)(aa,{children:[(0,X.jsx)(`span`,{children:o(`Every`)}),(0,X.jsx)(oa,{"aria-label":o(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(J.setInterval(n))}}),(0,X.jsxs)(sa,{children:[(0,X.jsx)(ca,{type:`button`,"aria-label":o(`Increase interval`),onClick:()=>e(J.setInterval(t+1)),children:(0,X.jsx)(ra,{})}),(0,X.jsx)(ca,{type:`button`,"aria-label":o(`Decrease interval`),onClick:()=>e(J.setInterval(t-1)),children:(0,X.jsx)(na,{})})]})]})},aa=e.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,oa=e.input`
  width: 60px;
`,sa=e.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,ca=e.button`
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
`,la=l({position:[`bottom`,`top`],alignment:`end`,padding:8}),ua=(e,t,n,r)=>{let[i,a]=(0,M.useState)();return(0,M.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let l=()=>{let e=c({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:la}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};l();let u=new ResizeObserver(l);return u.observe(i),u.observe(o),window.addEventListener(`resize`,l),window.addEventListener(`scroll`,l,!0),()=>{u.disconnect(),window.removeEventListener(`resize`,l),window.removeEventListener(`scroll`,l,!0)}},[e,t,n,r]),i},da=(e,t,n)=>{(0,M.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},fa=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:s,weekStartDay:c,formatDate:l,filterDate:u,onAdd:d,onRemove:f})=>{let[p,m]=(0,M.useState)(!1),h=(0,M.useRef)(null),g=(0,M.useRef)(null),v=(0,M.useRef)(null),b=ua(p,g,v,h);return(0,M.useEffect)(()=>{a.length===0&&m(!1)},[a.length]),da(p,[g,v],()=>m(!1)),(0,X.jsxs)(zr,{children:[(0,X.jsx)(Br,{children:o(e)}),t&&(0,X.jsx)(Vr,{children:o(t)}),(0,X.jsxs)(Hr,{children:[(0,X.jsxs)(Gr,{ref:h,children:[(0,X.jsx)(Kr,{ref:g,type:`button`,disabled:a.length===0,className:w({active:p}),onClick:()=>{a.length!==0&&m(e=>!e)},children:a.length}),p&&(0,X.jsxs)(qr,{ref:v,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,X.jsx)(Jr,{children:o(i)}),(0,X.jsx)(Yr,{children:a.map(e=>(0,X.jsxs)(Xr,{children:[(0,X.jsx)(`span`,{children:l(e)}),(0,X.jsx)(`button`,{type:`button`,"aria-label":o(`Remove date {date}`,{date:l(e)}),onClick:()=>f(e),children:`×`})]},e))})]})]}),(0,X.jsx)(Ur,{children:(0,X.jsx)(ue,{...y(),selected:null,onChange:e=>{e&&d(_(x(e)))},customInput:(0,X.jsx)(pa,{label:n,className:w(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,renderCustomHeader:e=>(0,X.jsx)(de,{...e}),todayButton:o(`Today`),openToDate:s,calendarStartDay:c,filterDate:u})})]})]})},pa=(0,M.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Wr,{type:`button`,ref:n,...t,children:o(e)}));pa.displayName=`PickerTrigger`;var ma=e.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,ha=()=>{let e=P(),t=F(Y.state),{start:n,rrule:r}=t,i=(0,M.useMemo)(()=>Ae(r,n),[r,n]),{startTimestamp:a,baseRule:o,recurrenceSet:s}=i,c=(0,M.useMemo)(()=>s?Array.from(new Set(s.rdates().map(e=>_(x(E(e)))).filter(e=>o?!0:e!==a))).sort((e,t)=>e-t):[],[o,s,a]),l=(0,M.useMemo)(()=>s?Array.from(new Set(s.exdates().map(e=>_(x(E(e)))))).sort((e,t)=>e-t):[],[s]),u=(0,M.useMemo)(()=>new Set(c),[c]),d=(0,M.useMemo)(()=>new Set(l),[l]),f=(0,M.useCallback)(e=>{let t=g(x(e)),n=h(ce(e)),r=o?o.between(t,n,!0).length>0:!1,i=s?s.between(t,n,!0).length>0:_(x(e))===a;return{full:i,base:r,excluded:r&&!i}},[o,s,a]),p=n=>{let r=n({baseRule:o,rdates:s?.rdates().filter(e=>o?!0:_(x(E(e)))!==a)??[],exdates:s?.exdates()??[]});e(J.setRRule(Se(t,r.baseRule,ga(r.rdates),ga(r.exdates))))};return{addedDates:c,excludedDates:l,addFixedDate:(e,n)=>{if(e===`exdate`&&be(i,n))return;let r=xe(t,n);p(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:we(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,n)=>{if(e===`rdate`&&be(i,n))return;let r=xe(t,n).getTime();p(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?we(n,r):n,exdates:e===`exdate`?we(i,r):i}))},canAddOccurrence:(0,M.useCallback)(e=>{let t=_(x(e)),n=f(e);return!n.full&&!n.excluded&&!u.has(t)},[u,f]),canExcludeOccurrence:(0,M.useCallback)(e=>{let t=_(x(e)),n=f(e);return n.base&&!n.excluded&&!d.has(t)&&!be(i,t)},[d,f,i]),getStatus:f}},ga=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},_a=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],va=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],ya=e=>[{value:O.DAILY,label:e?`Days`:`Day`},{value:O.WEEKLY,label:e?`Weeks`:`Week`},{value:O.MONTHLY,label:e?`Months`:`Month`},{value:O.YEARLY,label:e?`Years`:`Year`}],ba=300,xa=()=>{let e=P(),t=F(Y.state),n=F(q.weekStartDay),r=F(q.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:o,until:s,freq:c,start:l,interval:u}=t,d=i!==`NEVER`,{addedDates:f,excludedDates:p,addFixedDate:m,removeFixedDate:h,canAddOccurrence:g,canExcludeOccurrence:_}=ha(),y=(0,M.useMemo)(()=>v(l),[l]),b=e=>S(v(e),r,{locale:T()});return(0,X.jsxs)(ma,{children:[(0,X.jsxs)(j,{$alignItems:`end`,style:{width:`100%`},children:[(0,X.jsx)(Z,{translateOptions:!0,label:`Repeats`,value:i,options:_a,onChange:t=>e(J.setRepeatType(t))}),i===`CUSTOM`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(ia,{}),(0,X.jsx)(Z,{translateOptions:!0,label:``,value:c,options:ya(u>1),onChange:t=>e(J.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,X.jsx)(ta,{}),i!==`NEVER`&&(0,X.jsxs)(j,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(Z,{translateOptions:!0,label:`Ends`,options:va,value:a,onChange:t=>e(J.setRepeatEndType(t))}),a===`AFTER`&&(0,X.jsx)(ji,{label:`Times`,value:o,min:1,debounceMs:ba,onChange:t=>e(J.setCount(t))}),a===`ON_DATE`&&(0,X.jsx)(pe,{label:``,value:s||null,onChange:t=>e(J.setUntil(t)),datePickerProps:{dateFormat:r,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:y}})]}),(0,X.jsxs)(j,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,X.jsx)(fa,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:f,openToDate:y,formatDate:b,filterDate:g,weekStartDay:n,onAdd:e=>m(`rdate`,e),onRemove:e=>h(`rdate`,e)}),d&&(0,X.jsx)(fa,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:p,openToDate:y,formatDate:b,filterDate:_,weekStartDay:n,onAdd:e=>m(`exdate`,e),onRemove:e=>h(`exdate`,e)})]})]})},Sa=({context:e,onOccurrenceSaved:t})=>{let n=(0,M.useId)(),r=(0,M.useId)(),i=(0,M.useId)(),[a,s]=(0,M.useState)(0),[c,l]=(0,M.useState)([]);(0,M.useEffect)(()=>{let e=()=>s(e=>e+1);return window.addEventListener(Or,e),()=>window.removeEventListener(Or,e)},[]);let u=P(),{start:d,end:f,allDay:p}=F(Y.state),{date:m,time:h,datetime:g}=F(q.formats),_=F(q.weekStartDay),y=F(q.timeInterval),b=F(q.eventDuration),x=(0,M.useMemo)(()=>p?m.short.icu:g.short.icu,[p,m,g]),S=(0,M.useMemo)(()=>p?wi(f):f,[p,f]);return(0,X.jsxs)(xi,{children:[(0,X.jsxs)(Si,{children:[(0,X.jsxs)(Ci,{children:[(0,X.jsx)(pe,{id:r,label:`Starts`,value:d,onChange:e=>u(J.setStart(e)),datePickerProps:{id:r,showIcon:!0,icon:(0,X.jsx)(se,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!p,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:h.short.icu,todayButton:o(`Today`),calendarStartDay:_,timeIntervals:y}}),(0,X.jsx)(pe,{id:i,label:`Ends`,value:S,onChange:e=>{e!=null&&u(J.setEnd(Ei({value:e,start:d,allDay:p,timeInterval:y})))},datePickerProps:{id:i,showIcon:!0,icon:(0,X.jsx)(se,{}),toggleCalendarOnIconClick:!0,minDate:v(d),showTimeSelect:!p,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:h.short.icu,todayButton:o(`Today`),calendarStartDay:_,timeIntervals:y,filterTime:e=>Ti(new Date(e),d,y)}}),(0,X.jsx)(Pe,{id:n,label:`All Day`,enabled:p,style:{margin:0},onClick:e=>u(J.setAllDay({enabled:e,eventDuration:b}))})]}),(0,X.jsx)(bi,{context:e,refreshKey:a}),(0,X.jsx)(xa,{}),e?.eventId&&(0,X.jsx)(ri,{context:e,refreshKey:a,onOccurrencesChanged:l})]}),(0,X.jsx)(yi,{context:e,editedOccurrences:c,onOccurrenceSaved:()=>{s(e=>e+1),t?.()}})]})},Ca=e.div`
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
`,wa=e.div`
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
`,Ta=({context:e})=>{let{allDay:t}=F(Y.state),n=F(q.formats),r=(e,t=!1)=>S(E(new Date(e*1e3)),t?n?.datetime.short.icu??`Pp`:n?.date.short.icu??`P`,{locale:T()}),{splitAt:i,series:a}=e,s=a?.earlier??null,c=a?.later??null;return!i&&!s&&!c?null:(0,X.jsxs)(wa,{children:[i&&(0,X.jsx)(`p`,{children:o(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:r(i,!t)})}),(s||c)&&(0,X.jsxs)(`nav`,{children:[(0,X.jsx)(`span`,{children:o(`Part of a series`)}),s&&(0,X.jsxs)(`a`,{href:s.url,children:[`← `,o(`Earlier part, from {date}`,{date:r(s.start)})]}),c&&(0,X.jsxs)(`a`,{href:c.url,children:[o(`Later part, from {date}`,{date:r(c.start)}),` →`]})]})]})},Ea=({context:e})=>{let{rrule:t}=F(Y.state),n=(0,M.useMemo)(ht,[]),r=t?Fe(t,{forceset:!0}).all((e,t)=>t<10).map(e=>{let t=E(e);return`${S(t,`yyyy-MM-dd HH:mm`)} [${ze(e)}]`}):[];return(0,X.jsx)(u,{children:(0,X.jsxs)(Ca,{children:[e&&(0,X.jsx)(Ta,{context:e}),(0,X.jsx)(Rr,{context:e}),(0,X.jsx)(Sa,{context:e}),n&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:t}),(0,X.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})})},Da=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,Oa(n)),$(t,`end`,Oa(r)),$(t,`until`,i?Oa(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},Oa=e=>{let t=v(e);return S(t,`yyyy-MM-dd'T'HH:mm:ss`)},$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},ka=e=>{let t={app:e.app,event:Ne(e.event)};return er({reducer:{app:wr,event:Er},preloadedState:t})},Aa=new WeakSet,ja=e=>{if(Aa.has(e))return;Aa.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=ka(r),a=He.createRoot(n);i.subscribe(()=>{Da(i,e)}),Da(i,e),a.render((0,X.jsx)(tt,{store:i,children:(0,X.jsx)(Ea,{context:r.context})}))},Ma=(e=document)=>{e.querySelectorAll(`[data-calendar-transfer-select]`).forEach(ft),e.querySelectorAll(`[data-calendar-transfer]`).forEach(mt),e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(ja)},Na=()=>{Ma(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-calendar-transfer-select]`)&&ft(e),e.matches(`[data-calendar-transfer]`)&&mt(e),e.matches(`[data-event-builder]`)&&ja(e),Ma(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Na):Na();