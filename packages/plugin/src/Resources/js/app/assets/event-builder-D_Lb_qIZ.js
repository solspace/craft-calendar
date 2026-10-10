import{C as e,D as t,M as n,N as r,O as i,S as a,_ as o,a as s,b as c,c as l,i as u,j as d,k as f,r as p,t as m,v as h,w as g,y as _}from"./localization-B03jtK1N.js";import{E as v,O as y,S as b,T as x,a as ee,b as S,c as C,d as te,f as w,g as T,h as ne,i as re,l as ie,m as ae,n as oe,o as se,p as E,r as ce,s as le,t as ue,u as de,v as fe,x as D,y as pe}from"./calendar-preview.operations-DwziUOGM.js";import{h as me,l as he,m as ge,p as _e}from"./calendar.events-BCLn1gSw.js";import{t as ve}from"./interaction-CfrO8v-J.js";import{_ as ye,a as be,b as xe,c as Se,d as Ce,f as we,h as Te,i as Ee,m as O,n as De,o as Oe,p as k,r as ke,s as Ae,t as A,v as j}from"./components-Qu5dB3to.js";import{t as M}from"./dropdown-DOixoeya.js";function je(e,t){let n=l(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=O(n.getDate(),2),t=O(n.getMonth()+1,2);a=`${O(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=O(Math.trunc(t/60),2),r=O(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=O(n.getHours(),2),r=O(n.getMinutes(),2),i=O(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Me=n((e=>{var t=d();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,a=t.useRef,o=t.useEffect,s=t.useMemo,c=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,l,u){var d=a(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=s(function(){function e(e){if(!i){if(i=!0,a=e,e=l(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return o=t}return o=e}if(t=o,r(a,e))return t;var n=l(e);return u!==void 0&&u(t,n)?(a=e,t):(a=e,o=n)}var i=!1,a,o,s=n===void 0?null:n;return[function(){return e(t())},s===null?void 0:function(){return e(s())}]},[t,n,l,u]);var p=i(e,d[0],d[1]);return o(function(){f.hasValue=!0,f.value=p},[p]),c(p),p}})),Ne=n(((e,t)=>{t.exports=Me()})),Pe=r(i()),N=r(d(),1),Fe=Ne();function Ie(e){e()}function Le(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Ie(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Re={notify(){},get:()=>[]};function ze(e,t){let n,r=Re,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Le())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Re)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Be=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ve=typeof navigator<`u`&&navigator.product===`ReactNative`,He=Be||Ve?N.useLayoutEffect:N.useEffect,Ue=Symbol.for(`react-redux-context`),We=typeof globalThis<`u`?globalThis:{};function Ge(){if(!N.createContext)return{};let e=We[Ue]??(We[Ue]=new Map),t=e.get(N.createContext);return t||(t=N.createContext(null),e.set(N.createContext,t)),t}var P=Ge();function Ke(e){let{children:t,context:n,serverState:r,store:i}=e,a=N.useMemo(()=>{let e=ze(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=N.useMemo(()=>i.getState(),[i]);He(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||P;return N.createElement(s.Provider,{value:a},t)}var qe=Ke;function Je(e=P){return function(){return N.useContext(e)}}var Ye=Je();function Xe(e=P){let t=e===P?Ye:Je(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Ze=Xe();function Qe(e=P){let t=e===P?Ze:Xe(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var F=Qe(),$e=(e,t)=>e===t;function et(e=P){let t=e===P?Ye:Je(e),n=(e,n={})=>{let{equalityFn:r=$e}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();N.useRef(!0);let s=N.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Fe.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return N.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var I=et(),tt=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`[data-element-editor]`).data(`elementEditor`)??t(e).closest(`form`).data(`elementEditor`)},nt=async e=>{let t=tt(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},rt=new WeakSet,it=e=>{let t=window.jQuery;if(rt.has(e)||!t)return;rt.add(e);let n=Number(e.dataset.calendarId),r=e.querySelector(`button.menubtn`),i=r?.querySelector(`.inline-flex`),a=i?.innerHTML,o=!1;t(e).on(`change`,async()=>{let s=Number(t(e).data(`value`));if(i&&a&&(i.innerHTML=a),t(e).data(`value`,n),e.querySelectorAll(`[data-value]`).forEach(e=>{e.classList.toggle(`sel`,Number(e.dataset.value)===n)}),o||s===n||!s)return;o=!0,r&&(r.disabled=!0);let c=tt(e),l=!1;try{let t=await nt(e);c?.pause(),l=!!c;let n=new Craft.CpScreenSlideout(`calendar/event-calendar/edit`,{params:{eventId:t,siteId:Number(e.dataset.siteId),targetCalendarId:s}}),i=!1;n.on(`submit`,e=>{let t=e?.response?.data?.url;i=!0,window.location.assign(t||window.location.href)}),n.on(`close`,()=>{!i&&l&&c?.resume(),o=!1,r&&(r.disabled=!1)})}catch{l&&c?.resume(),o=!1,r&&(r.disabled=!1),Craft.cp.displayError(Craft.t(`calendar`,`Couldn’t open the calendar mapping.`))}})},at=e=>{let t=JSON.parse(e.dataset.populated||`{}`),n=Array.from(e.querySelectorAll(`select[data-field-mapping]`)),r=n.map(e=>e.value).filter(Boolean),i=r.length!==new Set(r).size,a=new Set(r),o=Object.entries(t).filter(([e])=>!a.has(e)),s=e.querySelector(`[data-unmapped-warning]`),c=e.querySelector(`[data-unmapped-fields]`),l=e.querySelector(`[data-mapping-error]`),u=e.querySelector(`input[data-calendar-transfer-confirm]`)?.checked,d=e.closest(`form.cp-screen`)?.querySelector(`.so-footer button.submit`);if(d){let e=!u||i;d.disabled=e,d.classList.toggle(`disabled`,e),d.setAttribute(`aria-disabled`,String(e))}s&&(s.hidden=o.length===0),l&&(l.hidden=!i),c&&c.replaceChildren(...o.map(([,e])=>{let t=document.createElement(`li`);return t.textContent=e,t})),n.forEach(e=>{e.setCustomValidity(i?Craft.t(`calendar`,`Each source field can only be mapped once.`):``)})},ot=e=>{rt.has(e)||(rt.add(e),e.addEventListener(`change`,()=>at(e)),at(e))},st=()=>!1;function L(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var ct=typeof Symbol==`function`&&Symbol.observable||`@@observable`,lt=()=>Math.random().toString(36).substring(7).split(``).join(`.`),ut={INIT:`@@redux/INIT${lt()}`,REPLACE:`@@redux/REPLACE${lt()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${lt()}`};function dt(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function ft(e,t,n){if(typeof e!=`function`)throw Error(L(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(L(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(L(1));return n(ft)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(L(3));return i}function d(e){if(typeof e!=`function`)throw Error(L(4));if(c)throw Error(L(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(L(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!dt(e))throw Error(L(7));if(e.type===void 0)throw Error(L(8));if(typeof e.type!=`string`)throw Error(L(17));if(c)throw Error(L(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(L(10));r=e,f({type:ut.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(L(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[ct](){return this}}}return f({type:ut.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[ct]:m}}function pt(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:ut.INIT})===void 0)throw Error(L(12));if(n(void 0,{type:ut.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(L(13))})}function mt(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{pt(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(L(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function ht(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function gt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(L(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=ht(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function _t(e){return dt(e)&&`type`in e&&typeof e.type==`string`}var vt=Symbol.for(`immer-nothing`),yt=Symbol.for(`immer-draftable`),R=Symbol.for(`immer-state`);function z(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var B=Object,V=B.getPrototypeOf,bt=`constructor`,xt=`prototype`,St=`configurable`,Ct=`enumerable`,wt=`writable`,Tt=`value`,H=e=>!!e&&!!e[R];function U(e){return e?Ot(e)||Ft(e)||!!e[yt]||!!e[bt]?.[yt]||It(e)||Lt(e):!1}var Et=B[xt][bt].toString(),Dt=new WeakMap;function Ot(e){if(!e||!Rt(e))return!1;let t=V(e);if(t===null||t===B[xt])return!0;let n=B.hasOwnProperty.call(t,bt)&&t[bt];if(n===Object)return!0;if(!W(n))return!1;let r=Dt.get(n);return r===void 0&&(r=Function.toString.call(n),Dt.set(n,r)),r===Et}function kt(e,t,n=!0){At(e)===0?(n?Reflect.ownKeys(e):B.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function At(e){let t=e[R];return t?t.type_:Ft(e)?1:It(e)?2:Lt(e)?3:0}var jt=(e,t,n=At(e))=>n===2?e.has(t):B[xt].hasOwnProperty.call(e,t),Mt=(e,t,n=At(e))=>n===2?e.get(t):e[t],Nt=(e,t,n,r=At(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Pt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Ft=Array.isArray,It=e=>e instanceof Map,Lt=e=>e instanceof Set,Rt=e=>typeof e==`object`,W=e=>typeof e==`function`,zt=e=>typeof e==`boolean`;function Bt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var G=e=>e.copy_||e.base_,Vt=e=>e.modified_?e.copy_:e.base_;function Ht(e,t){if(It(e))return new Map(e);if(Lt(e))return new Set(e);if(Ft(e))return Array[xt].slice.call(e);let n=Ot(e);if(t===!0||t===`class_only`&&!n){let t=B.getOwnPropertyDescriptors(e);delete t[R];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[wt]===!1&&(a[wt]=!0,a[St]=!0),(a.get||a.set)&&(t[i]={[St]:!0,[wt]:!0,[Ct]:a[Ct],[Tt]:e[i]})}return B.create(V(e),t)}else{let t=V(e);if(t!==null&&n)return{...e};let r=B.create(t);return B.assign(r,e)}}function Ut(e,t=!1){return Kt(e)||H(e)||!U(e)?e:(At(e)>1&&B.defineProperties(e,{set:Gt,add:Gt,clear:Gt,delete:Gt}),B.freeze(e),t&&kt(e,(e,t)=>{Ut(t,!0)},!1),e)}function Wt(){z(2)}var Gt={[Tt]:Wt};function Kt(e){return e===null||!Rt(e)?!0:B.isFrozen(e)}var qt=`MapSet`,Jt=`Patches`,Yt=`ArrayMethods`,Xt={};function K(e){let t=Xt[e];return t||z(0,e),t}var Zt=e=>!!Xt[e],Qt,$t=()=>Qt,en=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:Zt(qt)?K(qt):void 0,arrayMethodsPlugin_:Zt(Yt)?K(Yt):void 0});function tn(e,t){t&&(e.patchPlugin_=K(Jt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function nn(e){rn(e),e.drafts_.forEach(on),e.drafts_=null}function rn(e){e===Qt&&(Qt=e.parent_)}var an=e=>Qt=en(Qt,e);function on(e){let t=e[R];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function sn(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[R].modified_&&(nn(t),z(4)),U(e)&&(e=cn(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[R].base_,e,t)}else e=cn(t,n);return ln(t,e,!0),nn(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===vt?void 0:e}function cn(e,t){if(Kt(t))return t;let n=t[R];if(!n)return _n(t,e.handledSet_,e);if(!dn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);hn(n,e)}return n.copy_}function ln(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Ut(t,n)}function un(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var dn=(e,t)=>e.scope_===t,fn=[];function pn(e,t,n,r){let i=G(e),a=e.type_;if(r!==void 0&&Mt(i,r,a)===t){Nt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;kt(i,(e,n)=>{if(H(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??fn;for(let e of o)Nt(i,e,n,a)}function mn(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!dn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Vt(i);pn(e,i.draft_??i,a,n),hn(i,r)})}function hn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}un(e)}}function gn(e,t,n){let{scope_:r}=e;if(H(n)){let i=n[R];dn(i,r)&&i.callbacks_.push(function(){Tn(e),pn(e,n,Vt(i),t)})}else U(n)&&e.callbacks_.push(function(){let i=G(e);e.type_===3?i.has(n)&&_n(n,r.handledSet_,r):Mt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&_n(Mt(e.copy_,t,e.type_),r.handledSet_,r)})}function _n(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||H(e)||t.has(e)||!U(e)||Kt(e)?e:(t.add(e),kt(e,(r,i)=>{if(H(i)){let t=i[R];dn(t,n)&&(Nt(e,r,Vt(t),e.type_),un(t))}else U(i)&&_n(i,t,n)}),e)}function vn(e,t){let n=Ft(e),r={type_:+!!n,scope_:t?t.scope_:$t(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=yn;n&&(i=[r],a=bn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var yn={get(e,t){if(t===R)return e;if(t===`constructor`||t===`__proto__`){let n=G(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=G(e);if(!jt(i,t,e.type_))return Sn(e,i,t);let a=i[t];if(e.finalized_||!U(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Bt(t))return a;if(a===xn(e.base_,t)){Tn(e);let n=e.type_===1?+t:t,r=Dn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in G(e)},ownKeys(e){return Reflect.ownKeys(G(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=Cn(G(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=xn(G(e),t),i=r?.[R];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Pt(n,r)&&(n!==void 0||jt(e.base_,t,e.type_)))return!0;Tn(e),wn(e)}return e.copy_[t]===n&&(n!==void 0||jt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),gn(e,t,n),!0)},deleteProperty(e,t){return Tn(e),xn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),wn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=G(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[wt]:!0,[St]:e.type_!==1||t!==`length`,[Ct]:r[Ct],[Tt]:n[t]}},defineProperty(){z(11)},getPrototypeOf(e){return V(e.base_)},setPrototypeOf(){z(12)}},bn={};for(let e in yn){let t=yn[e];bn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}bn.deleteProperty=function(e,t){return bn.set.call(this,e,t,void 0)},bn.set=function(e,t,n){return yn.set.call(this,e[0],t,n,e[0])};function xn(e,t){let n=e[R];return(n?G(n):e)[t]}function Sn(e,t,n){let r=Cn(t,n);return r?Tt in r?r[Tt]:r.get?.call(e.draft_):void 0}function Cn(e,t){if(!(t in e))return;let n=V(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=V(n)}}function wn(e){e.modified_||(e.modified_=!0,e.parent_&&wn(e.parent_))}function Tn(e){e.copy_||(e.assigned_=new Map,e.copy_=Ht(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var En=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(W(e)&&!W(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}W(t)||z(6),n!==void 0&&!W(n)&&z(7);let r;if(U(e)){let i=an(this),a=Dn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?nn(i):rn(i)}return tn(i,n),sn(r,i)}else if(!e||!Rt(e)){if(r=t(e),r===void 0&&(r=e),r===vt&&(r=void 0),this.autoFreeze_&&Ut(r,!0),n){let t=[],i=[];K(Jt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else z(1,e)},this.produceWithPatches=(e,t)=>{if(W(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},zt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),zt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),zt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){U(e)||z(8),H(e)&&(e=On(e));let t=an(this),n=Dn(t,e,void 0);return n[R].isManual_=!0,rn(t),n}finishDraft(e,t){let n=e&&e[R];(!n||!n.isManual_)&&z(9);let{scope_:r}=n;return tn(r,t),sn(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=K(Jt).applyPatches_;return H(e)?r(e,t):this.produce(e,e=>r(e,t))}};function Dn(e,t,n,r){let[i,a]=It(t)?K(qt).proxyMap_(t,n):Lt(t)?K(qt).proxySet_(t,n):vn(t,n);return(n?.scope_??$t()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?mn(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function On(e){return H(e)||z(10,e),kn(e)}function kn(e){if(!U(e)||Kt(e))return e;let t=e[R],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Ht(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Ht(e,!0);return kt(n,(e,t)=>{Nt(n,e,kn(t))},r),t&&(t.finalized_=!1),n}var An=new En().produce;function jn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Mn=jn(),Nn=jn,Pn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?ht:ht.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Fn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(q(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>_t(t)&&t.type===e,n}var In=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Ln(e){return U(e)?An(e,()=>{}):e}function Rn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function zn(e){return typeof e==`boolean`}var Bn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new In;return t&&(zn(t)?a.push(Mn):a.push(Nn(t.extraArgument))),a},Vn=`RTK_autoBatch`,Hn=e=>t=>{setTimeout(t,e)},Un=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Wn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Un(window.requestAnimationFrame,100):Hn(10):e.type===`callback`?e.queueNotification:Hn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Vn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Gn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new In(e);return n&&r.push(Wn(typeof n==`object`?n:void 0)),r};function Kn(e){let t=Bn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(dt(n))c=mt(n);else throw Error(q(1));let l;l=typeof r==`function`?r(t):t();let u=ht;i&&(u=Pn({trace:!1,...typeof i==`object`&&i}));let d=Gn(gt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return ft(c,o,p)}function qn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(q(28));if(r in t)throw Error(q(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Jn(e){return typeof e==`function`}function Yn(e,t){let[n,r,i]=qn(t),a;if(Jn(e))a=()=>Ln(e());else{let t=Ln(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(H(e)){let r=n(e,t);return r===void 0?e:r}else if(U(e))return An(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Xn=Symbol.for(`rtk-slice-createasyncthunk`);function Zn(e,t){return`${e}/${t}`}function Qn({creators:e}={}){let t=e?.asyncThunk?.[Xn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(q(11));let i=(typeof e.reducers==`function`?e.reducers(tr()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(q(12));if(n in o.sliceCaseReducersByType)throw Error(q(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:Zn(n,r),createNotation:typeof e.reducers==`function`};rr(a)?ar(o,a,s,t):nr(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?qn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Yn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Rn(d,r,m)),i}function i(t=l){return Rn(Rn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=$n(a,t,()=>Rn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function $n(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var er=Qn();function tr(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function nr({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!ir(r))throw Error(q(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Fn(e,o):Fn(e))}function rr(e){return e._reducerDefinitionType===`asyncThunk`}function ir(e){return e._reducerDefinitionType===`reducerWithPrepare`}function ar({type:e,reducerName:t},n,r,i){if(!i)throw Error(q(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||or,pending:s||or,rejected:c||or,settled:l||or})}function or(){}var sr=`listener`,cr=`completed`,lr=`cancelled`;`${lr}`,`${cr}`,`${sr}${lr}`,`${sr}${cr}`;var{assign:ur}=Object,dr=`listenerMiddleware`,fr=ur(Fn(`${dr}/add`),{withTypes:()=>fr});`${dr}`;var pr=ur(Fn(`${dr}/remove`),{withTypes:()=>pr});function q(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var mr=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),hr=new Set([`NEVER`,`AFTER`,`ON_DATE`]),gr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},_r=e=>mr.has(e)?e:`NEVER`,vr=e=>hr.has(e)?e:`NEVER`,yr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,br=er({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:D.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=ie(e,e.until)),r!==void 0&&(e.until=e.start+r),E(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=ie(e,n),E(e)},setAllDay:(t,n)=>{let{enabled:r,eventDuration:i}=n.payload;t.allDay=r;let a=r?0:new Date().getUTCHours(),o=e(t.start);o.setHours(a,0,0,0),t.start=_(o);let s=e(t.end);r?s=xe(j(s),1):(s=we(s,1),s=Ce(s,o.getHours()),s=ye(s,i)),t.end=_(s),t.until&&t.repeatEndType===`ON_DATE`&&(t.until=ie(t,t.until)),E(t)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=ne(e.rrule)),e.repeatType=t.payload,E(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=yr(e.count):e.count=null,E(e)},setFreq:(e,t)=>{e.freq=t.payload,T(e,t.payload),E(e)},setCount:(e,t)=>{e.count=yr(t.payload),E(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),E(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=w(r),E(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=w(n.byweekday)),`bymonth`in n&&(e.bymonth=w(n.bymonth)),`bymonthday`in n&&(e.bymonthday=w(n.bymonthday)),`byyearday`in n&&(e.byyearday=w(n.byyearday)),`bysetpos`in n&&(e.bysetpos=w(n.bysetpos)),E(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:J}=br,xr=br.reducer,Y={state:e=>e.event},Sr=t.div`
  padding-top: 16px;
  width: 100%;
`,Cr=t.div`
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
`,wr=t.p`
  && {
    margin: 0 0 8px;
    padding: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
`,Tr=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Er=t.div`
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
`,Dr=t.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Or=t.div`
  position: relative;
  flex-shrink: 0;
`,kr=t.button`
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
`,Ar=t.div`
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
`,jr=t.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Mr=t.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Nr=t.li`
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
`,Pr=t.button`
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
`,Fr=er({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:Ir}=Fr,Lr=Fr.reducer,X={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},Rr=t.div`
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
`,zr=t.ul`
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
`,Br=t.li`
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
`,Z=f(),Vr=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],Hr=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of Vr){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},Ur=({context:e,refreshKey:t,onOccurrencesChanged:n})=>{let r=(0,N.useRef)(null),[i,a]=(0,N.useState)([]),[o,c]=(0,N.useState)(null),[l,u]=(0,N.useState)(null),d=(0,N.useRef)(0),[f,p]=(0,N.useState)(new Map),m=I(Y.state),h=I(X.formats),g=e=>x({...e,...f.get(e.recurrenceId)},h),_=(0,N.useCallback)(()=>tt(r.current)?.settings.elementId??e.eventId,[e.eventId]),v=(0,N.useCallback)(async()=>{let t=_();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let r=await _e(n,{headers:{Accept:`application/json`}});if(!r.ok)return;let i=(await r.json()).occurrences??[];++d.current,a(i),u(null),p(new Map)},[e.siteId,_]);(0,N.useEffect)(()=>{v()},[v,t]);let y=(0,N.useCallback)(async()=>{let t=_();if(!t)return;let n=++d.current,i=await _e(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...Hr(r.current)})});if(!i.ok)return;let a=await i.json();n===d.current&&(u(new Set(a.orphaned??[])),p(new Map(a.occurrences?.map(e=>[e.recurrenceId,e])??[])))},[e.siteId,_]);(0,N.useEffect)(()=>{if(++d.current,i.length===0)return;let e=setTimeout(()=>void y(),400);return()=>clearTimeout(e)},[m,i,y]);let b=e=>l?l.has(e.recurrenceId):e.orphaned;(0,N.useEffect)(()=>{n?.(i.map(e=>({...e,...f.get(e.recurrenceId),orphaned:l?l.has(e.recurrenceId):e.orphaned})))},[i,l,f,n]);let ee=async t=>{c(t.recurrenceId);try{let n=await nt(r.current);if(!n)return;he({eventId:n,recurrenceId:f.get(t.recurrenceId)?.scheduleRecurrenceId??t.recurrenceId,siteId:e.siteId,onSave:()=>void v()})}catch{Craft.cp.displayError(s(`Couldn’t open the occurrence for editing.`))}finally{c(null)}},S=async t=>{if(window.confirm(s(`Remove everything this occurrence changes?`))){c(t.recurrenceId);try{let n=await nt(r.current);if(!n)return;let i=await _e(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:f.get(t.recurrenceId)?.scheduleRecurrenceId??t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||s(`Couldn’t reset the occurrence.`));return}await v()}catch{Craft.cp.displayError(s(`Couldn’t reset the occurrence.`))}finally{c(null)}}};return(0,Z.jsx)(Rr,{ref:r,children:i.length>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Cr,{as:`h3`,children:s(`Edited occurrences`)}),(0,Z.jsx)(wr,{children:s(`Occurrences with their own changes. Changes made here go live with the event.`)}),i.some(b)&&(0,Z.jsx)(wr,{className:`warning`,children:s(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,Z.jsx)(zr,{children:i.map(e=>(0,Z.jsxs)(Br,{className:Se(b(e)&&`is-orphaned`,e.cancelled&&`is-cancelled`),children:[(0,Z.jsxs)(`div`,{className:`occurrence-details`,children:[(0,Z.jsx)(`span`,{className:`occurrence-title`,children:e.title}),e.cancelled&&(0,Z.jsx)(`span`,{className:`occurrence-state cancelled`,children:s(`Cancelled`)}),b(e)&&(0,Z.jsx)(`span`,{className:`occurrence-state`,children:s(`No longer on the schedule`)})]}),(0,Z.jsx)(`div`,{className:`occurrence-date`,children:g(e)}),(0,Z.jsx)(`div`,{className:`occurrence-changes`,children:(0,Z.jsx)(`span`,{children:e.changes.join(`, `)})}),(0,Z.jsxs)(`div`,{className:`occurrence-actions`,children:[!b(e)&&(0,Z.jsx)(Pr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":s(`Edit occurrence on {date}`,{date:g(e)}),title:s(`Edit occurrence`),disabled:o!==null,onClick:()=>void ee(e)}),(0,Z.jsx)(Pr,{type:`button`,className:`icon occurrence-discard`,"data-icon":`remove`,"aria-label":`${s(`Discard`)}: ${g(e)}`,title:s(`Removes everything this occurrence changes.`),disabled:o!==null,onClick:()=>void S(e)})]})]},e.recurrenceId))})]})})},Wr=t.div`
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
`,Gr=t.div`
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
`,Kr=t.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,qr=t.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Jr=t.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Yr=t.div`
  min-width: 0;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,Xr=t.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,Zr=t.li`
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
`,Qr=t.ul`
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
`,$r=e=>new Date(`${e.replace(` `,`T`)}Z`),ei=(e,t,n,r=[],i,o)=>{if(!n)return[];let s=new Date(`${c(n)}T00:00:00Z`),l=i??new Date(Date.UTC(s.getUTCFullYear()+100,0,1)),u=r.filter(t=>{if(t.orphaned)return!1;let n=$r(t.scheduleRecurrenceId??t.recurrenceId);return e.recurrenceSet?.between(n,n,!0).length===1}),d=new Map(u.map(e=>[e.scheduleRecurrenceId?.replace(` `,`T`)??e.recurrenceId.replace(` `,`T`),e])),f=t.end-t.start,p=(e.recurrenceSet?e.recurrenceSet.between(i?new Date(s.getTime()-Math.max(0,f)*1e3):s,l,!0,o===void 0?void 0:(e,t)=>t<o+u.length):[new Date(t.start*1e3)]).filter(e=>!d.has(a(e))).map(e=>{let n=e.getTime()/1e3,r=t.allDay&&t.end%86400==0?f-1:f;return{recurrenceId:a(e),scheduleRecurrenceId:a(e),start:n,end:n+r,allDay:t.allDay,title:null,edited:!1,cancelled:!1}});for(let e of u)p.push({...e,scheduleRecurrenceId:e.scheduleRecurrenceId??e.recurrenceId,edited:!0});let m=p.filter(e=>i?e.start<l.getTime()/1e3&&e.end>=s.getTime()/1e3:e.start>=s.getTime()/1e3).sort((e,t)=>e.start-t.start||e.recurrenceId.localeCompare(t.recurrenceId));return o===void 0?m:m.slice(0,o)},ti=(e,t)=>{let n=c(t),r=e.allDay?e.end:Math.max(e.start,e.end-1);return c(new Date(e.start*1e3))<=n&&c(new Date(r*1e3))>=n},ni=(e,t=[])=>{let n=[],r=(e,t,r)=>{e>0&&n.push(s(e===1?t:r,{count:e}))},i=(e.recurrenceSet?.rdates()??[]).filter(t=>{let n=le(e,t);return n.full&&!n.base&&n.timestamp!==e.startTimestamp}).length,a=(e.recurrenceSet?.exdates()??[]).filter(t=>le(e,t).excluded).length,o=t.filter(e=>!e.orphaned);return r(i,`{count} additional date`,`{count} additional dates`),r(a,`{count} excluded date`,`{count} excluded dates`),r(o.filter(e=>!e.cancelled).length,`{count} edited occurrence`,`{count} edited occurrences`),r(o.filter(e=>e.cancelled).length,`{count} cancelled occurrence`,`{count} cancelled occurrences`),r(t.filter(e=>e.orphaned).length,`{count} edit off schedule`,`{count} edits off schedule`),n},ri=(t,n,r,i=`PP`,a=`PPp`)=>{let o=t=>k(e(t),r?i:a,{locale:p()});return t?.splitAt?s(`This draft changes the series from {date} onward.`,{date:o(t.splitAt)}):t?.series?.later?s(`This part of the series starts on {start} and ends before {end}.`,{start:o(n),end:o(t.series.later.start)}):t?.series?.earlier?s(`This part of the series starts on {date}.`,{date:o(n)}):null},ii=8,ai=({context:e,onOccurrenceSaved:t,editedOccurrences:n})=>{let r=(0,N.useRef)(null),[i,a]=(0,N.useState)(!1),o=F(),l=I(X.weekStartDay),u=I(X.formats),d=u?.date.short.icu??`P`,f=u?.datetime?.short.icu??`Pp`,h=I(Y.state),{start:_,rrule:v}=h,y=!!(e?.eventId&&v),[b,S]=(0,N.useState)(null),C=(0,N.useMemo)(()=>ce(v,_),[v,_]),te=(0,N.useMemo)(()=>ei(C,h,b?.start??null,n,b?.end),[C,h,b,n]),w=(0,N.useMemo)(()=>te.map(e=>({id:e.recurrenceId,start:c(new Date(e.start*1e3)),allDay:!0})),[te]),T=(0,N.useMemo)(()=>ei(C,h,b?.start??null,n,void 0,ii),[C,h,b,n]),ne=e=>te.filter(t=>ti(t,e)),ie=e=>[e.title,x(e,u),e.cancelled?s(`Cancelled`):e.edited?s(`Edited occurrence`):null].filter(Boolean).join(` · `),ae=(0,N.useMemo)(()=>ee(C,d),[C,d]),E=(0,N.useMemo)(()=>{let e=oe(C,T.length);return e?re(e):null},[C,T]),de=(0,N.useMemo)(()=>ni(C,n),[C,n]),fe=ri(e,_,h.allDay,d,f),D=(0,N.useCallback)((e,t,n)=>{o(J.setRRule(ue(h,C,e,t,n)))},[o,C,h]),pe=(0,N.useCallback)(e=>{let t=se(C,e);if(t){let{timestamp:n}=le(C,e);D(t,n,t===`exdate`)}},[D,C]),_e=e=>{let t=ne(e).find(e=>e.edited),r=n?.find(t=>!t.orphaned&&c($r(t.scheduleRecurrenceId??t.recurrenceId))===c(e));if(y&&(t||r)){be((t??r).scheduleRecurrenceId??(t??r).recurrenceId);return}let i=le(C,e);if(i.base&&i.excluded){D(`exdate`,i.timestamp,!1);return}if(i.full){pe(e);return}i.full||D(`rdate`,i.timestamp,!0)},ye=(0,N.useCallback)(e=>le(C,e),[C]),be=async n=>{if(!(!e||i)){a(!0);try{he({eventId:await nt(r.current),recurrenceId:n.replace(` `,`T`),siteId:e.siteId,onSave:()=>t?.()})}catch{Craft.cp.displayError(s(`Couldn’t open the occurrence for editing.`))}finally{a(!1)}}};return(0,Z.jsx)(Wr,{ref:r,children:(0,Z.jsxs)(Oe,{children:[(0,Z.jsxs)(A,{$direction:`column`,$gap:10,children:[(0,Z.jsx)(Kr,{children:s(`Schedule Preview`)}),ae&&(0,Z.jsx)(qr,{children:ae})]}),de.length>0&&(0,Z.jsx)(Qr,{"aria-label":s(`Schedule changes`),children:de.map(e=>(0,Z.jsx)(`li`,{children:e},e))}),fe&&(0,Z.jsx)(qr,{children:fe}),(0,Z.jsxs)(Gr,{children:[(0,Z.jsxs)(A,{$direction:`column`,$gap:10,children:[(0,Z.jsx)(ge,{...m(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[me,ve],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(p().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:l,timeZone:`UTC`,eventDisplay:`none`,events:w,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>S({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=ye(e.date),n=ne(e.date);return[n.length>0?`fc-has-event`:``,n.length>0&&t.rdate?`fc-extra-date`:``,n.length===0&&t.excluded?`fc-excluded-date`:``,n.some(e=>e.cancelled)?`fc-cancelled-date`:``,n.some(e=>e.edited)?`fc-edited-date`:``].filter(Boolean)},dayCellContent:e=>{let t=ne(e.date).map(ie),n=t.length?t.join(`
`):void 0;return(0,Z.jsxs)(`span`,{title:n,children:[e.dayNumberText,n&&(0,Z.jsxs)(`span`,{className:`cancelled-date-label`,children:[`, `,n]})]})},dateClick:e=>_e(e.date)}),E&&(0,Z.jsx)(Jr,{children:E})]}),(0,Z.jsx)(Yr,{children:T.length===0?(0,Z.jsxs)(`p`,{children:[s(`No occurrences starting from`),(0,Z.jsx)(`br`,{}),k(g(b?.currentStart??new Date),`PP`,{locale:p()})]}):(0,Z.jsx)(Xr,{$count:T.length,children:T.map(e=>{let t=new Date(e.start*1e3),n=e.cancelled,r=$r(e.scheduleRecurrenceId),a=k(g(t),d,{locale:p()}),o=se(C,r),c=y?e.scheduleRecurrenceId:null,l=s(o===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:a});return(0,Z.jsxs)(Zr,{title:ie(e),className:[n?`is-cancelled`:``,e.edited?`is-edited`:``].filter(Boolean).join(` `),children:[(0,Z.jsxs)(`span`,{className:`occurrence-date`,children:[(0,Z.jsx)(`span`,{children:a}),e.edited&&!n&&(0,Z.jsx)(`span`,{className:`occurrence-state`,children:s(`Edited occurrence`)}),n&&(0,Z.jsx)(`span`,{className:`occurrence-state`,children:s(`Cancelled`)})]}),(0,Z.jsxs)(`div`,{className:`occurrence-actions`,children:[c&&(0,Z.jsx)(Pr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":s(`Edit occurrence on {date}`,{date:a}),title:s(`Edit occurrence`),disabled:i,onClick:()=>void be(c)}),o&&(0,Z.jsx)(Pr,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:i,"aria-label":l,title:l,onClick:()=>pe(r)})]})]},e.recurrenceId)})})})]})]})})},oi=({context:e,refreshKey:t})=>{let n=I(Y.state),{showOverlapWarnings:r,formats:i}=I(X.config),a=(0,N.useRef)(null),o=(0,N.useCallback)(()=>tt(a.current)?.settings.elementId??e?.eventId,[e?.eventId]);return e?.calendarId?(0,Z.jsx)(`div`,{ref:a,style:{padding:r?`0 20px 12px`:`0 20px`,marginTop:r?-8:0},children:(0,Z.jsx)(b,{formats:i,enabled:r,schedule:{...n,rrule:n.rrule??``,calendarId:e.calendarId,siteId:e.siteId},resolveEventId:o,refreshKey:t})}):null},si=t.div`
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
`,ui=t=>_(we(e(t),1)),di=(e,t,n)=>{let r=pi(t,n);return e.getTime()>=r.getTime()},fi=({value:t,start:n,allDay:r,timeInterval:i})=>{if(r)return _(xe(j(e(t)),1));let a=e(t),o=pi(n,i);return a.getTime()>=o.getTime()?t:_(o)},pi=(t,n)=>ye(e(t),n),mi=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},hi=({inputValue:e,value:t,min:n})=>{let r=mi(e)??n??t??0;return n===void 0?r:Math.max(r,n)},gi=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,N.useState)(e?.toString()??``),o=(0,N.useRef)(void 0),s=(0,N.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,N.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,N.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,N.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,N.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=mi(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,N.useCallback)(n=>{n.stopPropagation();let r=hi({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},_i=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=gi({value:e,min:t,debounceMs:n,onChange:r});return(0,Z.jsx)(Oe,{...i,children:(0,Z.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},vi=()=>null,yi=[{value:`MO`,label:`Monday`,days:[S.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[S.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[S.WE.weekday]},{value:`TH`,label:`Thursday`,days:[S.TH.weekday]},{value:`FR`,label:`Friday`,days:[S.FR.weekday]},{value:`SA`,label:`Saturday`,days:[S.SA.weekday]},{value:`SU`,label:`Sunday`,days:[S.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[S.MO.weekday,S.TU.weekday,S.WE.weekday,S.TH.weekday,S.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[S.SA.weekday,S.SU.weekday]}],bi=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},xi=(e,t)=>{let n=bi(e),r=bi(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Si=(e,t)=>{if(e){let t=yi.find(t=>xi(t.days,e));if(t)return t.value}if(t!==void 0){let e=yi.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return yi[0].value},Ci=e=>yi.find(t=>t.value===e)?.days??[S.MO.weekday],Q=`5px`,wi=t.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,Ti=t(wi)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,Ei=t(wi)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,Di=t.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,Oi=t(Di)`
  grid-template-columns: repeat(7, 1fr);

  ${wi} {
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
`,ki=t(Di)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${wi} {
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
`,Ai=t(Di)`
  grid-template-columns: repeat(4, 1fr);

  ${wi} {
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
`,ji=({label:e,values:t,onChange:n})=>(0,Z.jsx)(Oe,{label:e,children:(0,Z.jsxs)(Oi,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,Z.jsx)(Ti,{type:`button`,className:Se(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,Z.jsx)(Ei,{},e))]})}),Mi=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],Ni=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Pi=()=>{let t=F(),{start:n,bymonthday:r,byweekday:i,bysetpos:a}=I(Y.state),o=e(n),s=o.getDate(),c=(o.getDay()+6)%7,l=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,u=r?.length?r:[s],d=a?.[0]??1,f=Si(i,c),p=e=>{t(J.setByRules({bymonthday:e.length?e:void 0,byweekday:void 0,bysetpos:void 0}))},m=(e,n)=>{t(J.setByRules({bymonthday:void 0,byweekday:Ci(e),bysetpos:[n]}))};return(0,Z.jsxs)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(M,{translateOptions:!0,label:`Repeat on`,value:l,options:Mi,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,Z.jsx)(ji,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,Z.jsxs)(A,{children:[(0,Z.jsx)(M,{translateOptions:!0,label:`Position`,value:d,options:Ni,onChange:e=>m(f,Number.parseInt(e,10))}),(0,Z.jsx)(M,{translateOptions:!0,label:`Day`,value:f,options:yi.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},Fi=[{weekday:S.SU,label:`Sun`},{weekday:S.MO,label:`Mon`},{weekday:S.TU,label:`Tue`},{weekday:S.WE,label:`Wed`},{weekday:S.TH,label:`Thu`},{weekday:S.FR,label:`Fri`},{weekday:S.SA,label:`Sat`}],Ii=()=>{let e=F(),{byweekday:t}=I(Y.state);return(0,Z.jsx)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,Z.jsx)(Oe,{label:`On`,children:(0,Z.jsx)(ki,{children:Fi.map(({weekday:n,label:r})=>(0,Z.jsx)(Ti,{type:`button`,className:Se(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(J.setDays({type:`byweekday`,values:r}))},children:s(r)},n.weekday))})})})},Li=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],Ri=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],zi=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],Bi=()=>{let t=F(),{start:n,bymonth:r,bymonthday:i,byweekday:a,bysetpos:o}=I(Y.state),c=e(n),l=c.getDate(),u=c.getMonth()+1,d=(c.getDay()+6)%7,f=o?.length&&a?.length?`WEEKDAY`:`MONTHDAY`,p=i?.length?i:[l],m=r?.length?r:[u],h=o?.[0]??1,g=Si(a,d),_=(e,n)=>{t(J.setByRules({bymonth:e.length?e:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(e,n,r)=>{t(J.setByRules({bymonth:e.length?e:void 0,bymonthday:void 0,byweekday:Ci(n),bysetpos:[r]}))};return(0,Z.jsxs)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(Oe,{label:`Month`,children:(0,Z.jsx)(Ai,{children:zi.map(e=>{let t=m.includes(e.value);return(0,Z.jsx)(Ti,{type:`button`,className:Se(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:s(e.label)},e.value)})})}),(0,Z.jsx)(M,{translateOptions:!0,label:`Repeat on`,value:f,options:Li,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,Z.jsx)(ji,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,Z.jsxs)(A,{children:[(0,Z.jsx)(M,{translateOptions:!0,label:`Position`,value:h,options:Ri,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,Z.jsx)(M,{translateOptions:!0,label:`Day`,value:g,options:yi.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},Vi=()=>{let{freq:e}=I(Y.state);return e===D.DAILY?(0,Z.jsx)(vi,{}):e===D.WEEKLY?(0,Z.jsx)(Ii,{}):e===D.MONTHLY?(0,Z.jsx)(Pi,{}):e===D.YEARLY?(0,Z.jsx)(Bi,{}):null},Hi=e=>(0,Z.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Z.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Ui=e=>(0,Z.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Z.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Wi=()=>{let e=F(),{interval:t}=I(Y.state);return(0,Z.jsxs)(Gi,{children:[(0,Z.jsx)(`span`,{children:s(`Every`)}),(0,Z.jsx)(Ki,{"aria-label":s(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(J.setInterval(n))}}),(0,Z.jsxs)(qi,{children:[(0,Z.jsx)(Ji,{type:`button`,"aria-label":s(`Increase interval`),onClick:()=>e(J.setInterval(t+1)),children:(0,Z.jsx)(Ui,{})}),(0,Z.jsx)(Ji,{type:`button`,"aria-label":s(`Decrease interval`),onClick:()=>e(J.setInterval(t-1)),children:(0,Z.jsx)(Hi,{})})]})]})},Gi=t.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Ki=t.input`
  width: 60px;
`,qi=t.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Ji=t.button`
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
`,Yi=v({position:[`bottom`,`top`],alignment:`end`,padding:8}),Xi=(e,t,n,r)=>{let[i,a]=(0,N.useState)();return(0,N.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=y({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Yi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Zi=(e,t,n)=>{(0,N.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Qi=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:c,formatDate:l,filterDate:d,onAdd:f,onRemove:p})=>{let[m,h]=(0,N.useState)(!1),g=(0,N.useRef)(null),v=(0,N.useRef)(null),y=(0,N.useRef)(null),b=Xi(m,v,y,g);return(0,N.useEffect)(()=>{a.length===0&&h(!1)},[a.length]),Zi(m,[v,y],()=>h(!1)),(0,Z.jsxs)(Sr,{children:[(0,Z.jsx)(Cr,{children:s(e)}),t&&(0,Z.jsx)(wr,{children:s(t)}),(0,Z.jsxs)(Tr,{children:[(0,Z.jsxs)(Or,{ref:g,children:[(0,Z.jsx)(kr,{ref:v,type:`button`,disabled:a.length===0,className:Se({active:m}),onClick:()=>{a.length!==0&&h(e=>!e)},children:a.length}),m&&(0,Z.jsxs)(Ar,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,Z.jsx)(jr,{children:s(i)}),(0,Z.jsx)(Mr,{children:a.map(e=>(0,Z.jsxs)(Nr,{children:[(0,Z.jsx)(`span`,{children:l(e)}),(0,Z.jsx)(`button`,{type:`button`,"aria-label":s(`Remove date {date}`,{date:l(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,Z.jsx)(Er,{children:(0,Z.jsx)(Ae,{...u(),selected:null,onChange:e=>{e&&f(_(j(e)))},customInput:(0,Z.jsx)($i,{label:n,className:Se(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:s(`Today`),openToDate:o,calendarStartDay:c,filterDate:d})})]})]})},$i=(0,N.forwardRef)(({label:e,...t},n)=>(0,Z.jsx)(Dr,{type:`button`,ref:n,...t,children:s(e)}));$i.displayName=`PickerTrigger`;var ea=t.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,ta=()=>{let e=F(),t=I(Y.state),{start:n,rrule:r}=t,i=(0,N.useMemo)(()=>ce(r,n),[r,n]),{startTimestamp:a,baseRule:s,recurrenceSet:c}=i,l=(0,N.useMemo)(()=>c?Array.from(new Set(c.rdates().map(e=>_(j(g(e)))).filter(e=>s?!0:e!==a))).sort((e,t)=>e-t):[],[s,c,a]),u=(0,N.useMemo)(()=>c?Array.from(new Set(c.exdates().map(e=>_(j(g(e)))))).sort((e,t)=>e-t):[],[c]),d=(0,N.useMemo)(()=>new Set(l),[l]),f=(0,N.useMemo)(()=>new Set(u),[u]),p=(0,N.useCallback)(e=>{let t=h(j(e)),n=o(Te(e)),r=s?s.between(t,n,!0).length>0:!1,i=c?c.between(t,n,!0).length>0:_(j(e))===a;return{full:i,base:r,excluded:r&&!i}},[s,c,a]),m=n=>{let r=n({baseRule:s,rdates:c?.rdates().filter(e=>s?!0:_(j(g(e)))!==a)??[],exdates:c?.exdates()??[]});e(J.setRRule(te(t,r.baseRule,na(r.rdates),na(r.exdates))))};return{addedDates:l,excludedDates:u,addFixedDate:(e,n)=>{if(e===`exdate`&&C(i,n))return;let r=de(t,n);m(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:ae(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,n)=>{if(e===`rdate`&&C(i,n))return;let r=de(t,n).getTime();m(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?ae(n,r):n,exdates:e===`exdate`?ae(i,r):i}))},canAddOccurrence:(0,N.useCallback)(e=>{let t=_(j(e)),n=p(e);return!n.full&&!n.excluded&&!d.has(t)},[d,p]),canExcludeOccurrence:(0,N.useCallback)(e=>{let t=_(j(e)),n=p(e);return n.base&&!n.excluded&&!f.has(t)&&!C(i,t)},[f,p,i]),getStatus:p}},na=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},ra=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],ia=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],aa=e=>[{value:D.DAILY,label:e?`Days`:`Day`},{value:D.WEEKLY,label:e?`Weeks`:`Week`},{value:D.MONTHLY,label:e?`Months`:`Month`},{value:D.YEARLY,label:e?`Years`:`Year`}],oa=300,sa=()=>{let t=F(),n=I(Y.state),r=I(X.weekStartDay),i=I(X.formats)?.date.short.icu??`P`,{repeatType:a,repeatEndType:o,count:s,until:c,freq:l,start:u,interval:d}=n,f=a!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=ta(),b=(0,N.useMemo)(()=>e(u),[u]),x=t=>k(e(t),i,{locale:p()});return(0,Z.jsxs)(ea,{children:[(0,Z.jsxs)(A,{$alignItems:`end`,style:{width:`100%`},children:[(0,Z.jsx)(M,{translateOptions:!0,label:`Repeats`,value:a,options:ra,onChange:e=>t(J.setRepeatType(e))}),a===`CUSTOM`&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Wi,{}),(0,Z.jsx)(M,{translateOptions:!0,label:``,value:l,options:aa(d>1),onChange:e=>t(J.setFreq(Number.parseInt(e,10)))})]})]}),a===`CUSTOM`&&(0,Z.jsx)(Vi,{}),a!==`NEVER`&&(0,Z.jsxs)(A,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(M,{translateOptions:!0,label:`Ends`,options:ia,value:o,onChange:e=>t(J.setRepeatEndType(e))}),o===`AFTER`&&(0,Z.jsx)(_i,{label:`Times`,value:s,min:1,debounceMs:oa,onChange:e=>t(J.setCount(e))}),o===`ON_DATE`&&(0,Z.jsx)(ke,{label:``,value:c||null,onChange:e=>t(J.setUntil(e)),datePickerProps:{dateFormat:i,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:r,minDate:b}})]}),(0,Z.jsxs)(A,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,Z.jsx)(Qi,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:x,filterDate:v,weekStartDay:r,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),f&&(0,Z.jsx)(Qi,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:x,filterDate:y,weekStartDay:r,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},ca=({context:t,onOccurrenceSaved:n})=>{let r=(0,N.useId)(),i=(0,N.useId)(),a=(0,N.useId)(),[o,c]=(0,N.useState)(0),[l,u]=(0,N.useState)([]),d=F(),{start:f,end:p,allDay:m}=I(Y.state),{date:h,time:g,datetime:_}=I(X.formats),v=I(X.weekStartDay),y=I(X.timeInterval),b=I(X.eventDuration),x=(0,N.useMemo)(()=>m?h.short.icu:_.short.icu,[m,h,_]),ee=(0,N.useMemo)(()=>m?ui(p):p,[m,p]);return(0,Z.jsxs)(si,{children:[(0,Z.jsxs)(ci,{children:[(0,Z.jsxs)(li,{children:[(0,Z.jsx)(ke,{id:i,label:`Starts`,value:f,onChange:e=>d(J.setStart(e)),datePickerProps:{id:i,showIcon:!0,icon:(0,Z.jsx)(be,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:g.short.icu,todayButton:s(`Today`),calendarStartDay:v,timeIntervals:y}}),(0,Z.jsx)(ke,{id:a,label:`Ends`,value:ee,onChange:e=>{e!=null&&d(J.setEnd(fi({value:e,start:f,allDay:m,timeInterval:y})))},datePickerProps:{id:a,showIcon:!0,icon:(0,Z.jsx)(be,{}),toggleCalendarOnIconClick:!0,minDate:e(f),showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:g.short.icu,todayButton:s(`Today`),calendarStartDay:v,timeIntervals:y,filterTime:e=>di(new Date(e),f,y)}}),(0,Z.jsx)(De,{id:r,label:`All Day`,enabled:m,style:{margin:0},onClick:e=>d(J.setAllDay({enabled:e,eventDuration:b}))})]}),(0,Z.jsx)(oi,{context:t,refreshKey:o}),(0,Z.jsx)(sa,{}),t?.eventId&&(0,Z.jsx)(Ur,{context:t,refreshKey:o,onOccurrencesChanged:u})]}),(0,Z.jsx)(ai,{context:t,editedOccurrences:l,onOccurrenceSaved:()=>{c(e=>e+1),n?.()}})]})},la=t.div`
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
`,ua=t.div`
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
`,da=({context:e})=>{let{allDay:t}=I(Y.state),n=I(X.formats),r=(e,t=!1)=>k(g(new Date(e*1e3)),t?n?.datetime.short.icu??`Pp`:n?.date.short.icu??`P`,{locale:p()}),{splitAt:i,series:a}=e,o=a?.earlier??null,c=a?.later??null;return!i&&!o&&!c?null:(0,Z.jsxs)(ua,{children:[i&&(0,Z.jsx)(`p`,{children:s(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:r(i,!t)})}),(o||c)&&(0,Z.jsxs)(`nav`,{children:[(0,Z.jsx)(`span`,{children:s(`Part of a series`)}),o&&(0,Z.jsxs)(`a`,{href:o.url,children:[`← `,s(`Earlier part, from {date}`,{date:r(o.start)})]}),c&&(0,Z.jsxs)(`a`,{href:c.url,children:[s(`Later part, from {date}`,{date:r(c.start)}),` →`]})]})]})},fa=({context:e})=>{let{rrule:t}=I(Y.state),n=(0,N.useMemo)(st,[]),r=t?pe(t,{forceset:!0}).all((e,t)=>t<10).map(e=>`${k(g(e),`yyyy-MM-dd HH:mm`)} [${je(e)}]`):[];return(0,Z.jsxs)(la,{children:[e&&(0,Z.jsx)(da,{context:e}),(0,Z.jsx)(ca,{context:e}),n&&(0,Z.jsxs)(`code`,{children:[(0,Z.jsx)(`pre`,{children:t}),(0,Z.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},pa=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,ma(n)),$(t,`end`,ma(r)),$(t,`until`,i?ma(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},ma=t=>k(e(t),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},ha=e=>{let t=fe(e.event.rrule),{byweekday:n,bysetpos:r}=gr(t?.options.byweekday),i=_r(e.event.repeatType),a=vr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||D.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?yr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Kn({reducer:{app:Lr,event:xr},preloadedState:o})},ga=new WeakSet,_a=e=>{if(ga.has(e))return;ga.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=ha(r),a=Pe.createRoot(n);i.subscribe(()=>{pa(i,e)}),pa(i,e),a.render((0,Z.jsx)(qe,{store:i,children:(0,Z.jsx)(fa,{context:r.context})}))},va=(e=document)=>{e.querySelectorAll(`[data-calendar-transfer-select]`).forEach(it),e.querySelectorAll(`[data-calendar-transfer]`).forEach(ot),e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(_a)},ya=()=>{va(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-calendar-transfer-select]`)&&it(e),e.matches(`[data-calendar-transfer]`)&&ot(e),e.matches(`[data-event-builder]`)&&_a(e),va(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ya):ya();
