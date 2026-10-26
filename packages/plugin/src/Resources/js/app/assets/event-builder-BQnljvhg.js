import{B as e,C as t,E as n,F as r,G as i,I as a,J as o,K as s,N as c,P as l,R as u,S as d,W as f,X as p,Y as m,g as h,n as g,s as _,t as v,x as y,y as b,z as x}from"./clsx-i4RjRRj2.js";import{_ as S,b as C,i as ee,p as te,t as ne,v as re}from"./overlap-warning-DAofkiem.js";import{n as ie,t as ae}from"./dist-Co6xHCO2.js";import{t as oe}from"./interaction-BmeFE1t9.js";import{a as w,c as T,f as se,i as ce,l as le,n as ue,o as de,r as fe,s as pe,t as me,u as he}from"./date-picker-Bjh6aDMF.js";import{C as ge,S as E,_ as _e,a as ve,b as ye,c as be,d as xe,f as Se,g as Ce,h as we,i as Te,l as Ee,m as D,n as De,o as Oe,p as O,r as ke,s as Ae,t as k,u as je,x as A,y as Me}from"./components-gAeKq-bt.js";function Ne(e,t){let r=n(e,t?.in);if(isNaN(+r))throw RangeError(`Invalid time value`);let i=t?.format??`extended`,a=t?.representation??`complete`,o=``,s=``,c=i===`extended`?`-`:``,l=i===`extended`?`:`:``;if(a!==`time`){let e=_(r.getDate(),2),t=_(r.getMonth()+1,2);o=`${_(r.getFullYear(),4)}${c}${t}${c}${e}`}if(a!==`date`){let e=r.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=_(Math.trunc(t/60),2),r=_(t%60,2);s=`${e<0?`+`:`-`}${n}:${r}`}else s=`Z`;let t=_(r.getHours(),2),n=_(r.getMinutes(),2),i=_(r.getSeconds(),2),a=o===``?``:`T`,c=[t,n,i].join(l);o=`${o}${a}${c}${s}`}return o}var Pe=m((e=>{var t=o();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,a=t.useRef,s=t.useEffect,c=t.useMemo,l=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,o,u){var d=a(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!i){if(i=!0,a=e,e=o(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,r(a,e))return t;var n=o(e);return u!==void 0&&u(t,n)?(a=e,t):(a=e,s=n)}var i=!1,a,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,o,u]);var p=i(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Fe=m(((e,t)=>{t.exports=Pe()})),Ie=p(i()),j=p(o(),1),Le=Fe();function Re(e){e()}function ze(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Re(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Be={notify(){},get:()=>[]};function Ve(e,t){let n,r=Be,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=ze())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Be)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var He=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ue=typeof navigator<`u`&&navigator.product===`ReactNative`,We=He||Ue?j.useLayoutEffect:j.useEffect,Ge=Symbol.for(`react-redux-context`),Ke=typeof globalThis<`u`?globalThis:{};function qe(){if(!j.createContext)return{};let e=Ke[Ge]??(Ke[Ge]=new Map),t=e.get(j.createContext);return t||(t=j.createContext(null),e.set(j.createContext,t)),t}var M=qe();function Je(e){let{children:t,context:n,serverState:r,store:i}=e,a=j.useMemo(()=>{let e=Ve(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=j.useMemo(()=>i.getState(),[i]);We(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||M;return j.createElement(s.Provider,{value:a},t)}var Ye=Je;function Xe(e=M){return function(){return j.useContext(e)}}var Ze=Xe();function Qe(e=M){let t=e===M?Ze:Xe(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var $e=Qe();function et(e=M){let t=e===M?$e:Qe(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var N=et(),tt=(e,t)=>e===t;function nt(e=M){let t=e===M?Ze:Xe(e),n=(e,n={})=>{let{equalityFn:r=tt}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();j.useRef(!0);let s=j.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Le.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return j.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var P=nt(),rt=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`[data-element-editor]`).data(`elementEditor`)??t(e).closest(`form`).data(`elementEditor`)},it=async e=>{let t=rt(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},at=new WeakSet,ot=e=>{let t=window.jQuery;if(at.has(e)||!t)return;at.add(e);let n=Number(e.dataset.calendarId),r=e.querySelector(`button.menubtn`),i=r?.querySelector(`.inline-flex`),a=i?.innerHTML,o=!1;t(e).on(`change`,async()=>{let s=Number(t(e).data(`value`));if(i&&a&&(i.innerHTML=a),t(e).data(`value`,n),e.querySelectorAll(`[data-value]`).forEach(e=>{e.classList.toggle(`sel`,Number(e.dataset.value)===n)}),o||s===n||!s)return;o=!0,r&&(r.disabled=!0);let c=rt(e),l=!1;try{let t=await it(e);c?.pause(),l=!!c;let n=new Craft.CpScreenSlideout(`calendar/event-calendar/edit`,{params:{eventId:t,siteId:Number(e.dataset.siteId),targetCalendarId:s}}),i=!1;n.on(`submit`,e=>{let t=e?.response?.data?.url;i=!0,window.location.assign(t||window.location.href)}),n.on(`close`,()=>{!i&&l&&c?.resume(),o=!1,r&&(r.disabled=!1)})}catch{l&&c?.resume(),o=!1,r&&(r.disabled=!1),Craft.cp.displayError(Craft.t(`calendar`,`Couldn’t open the calendar mapping.`))}})},st=e=>{let t=JSON.parse(e.dataset.populated||`{}`),n=Array.from(e.querySelectorAll(`select[data-field-mapping]`)),r=n.map(e=>e.value).filter(Boolean),i=r.length!==new Set(r).size,a=new Set(r),o=Object.entries(t).filter(([e])=>!a.has(e)),s=e.querySelector(`[data-unmapped-warning]`),c=e.querySelector(`[data-unmapped-fields]`),l=e.querySelector(`[data-mapping-error]`),u=e.querySelector(`input[data-calendar-transfer-confirm]`)?.checked,d=e.closest(`form.cp-screen`)?.querySelector(`.so-footer button.submit`);if(d){let e=!u||i;d.disabled=e,d.classList.toggle(`disabled`,e),d.setAttribute(`aria-disabled`,String(e))}s&&(s.hidden=o.length===0),l&&(l.hidden=!i),c&&c.replaceChildren(...o.map(([,e])=>{let t=document.createElement(`li`);return t.textContent=e,t})),n.forEach(e=>{e.setCustomValidity(i?Craft.t(`calendar`,`Each source field can only be mapped once.`):``)})},ct=e=>{at.has(e)||(at.add(e),e.addEventListener(`change`,()=>st(e)),st(e))},lt=()=>!1;function F(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var ut=typeof Symbol==`function`&&Symbol.observable||`@@observable`,dt=()=>Math.random().toString(36).substring(7).split(``).join(`.`),ft={INIT:`@@redux/INIT${dt()}`,REPLACE:`@@redux/REPLACE${dt()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${dt()}`};function pt(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function mt(e,t,n){if(typeof e!=`function`)throw Error(F(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(F(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(F(1));return n(mt)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(F(3));return i}function d(e){if(typeof e!=`function`)throw Error(F(4));if(c)throw Error(F(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(F(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!pt(e))throw Error(F(7));if(e.type===void 0)throw Error(F(8));if(typeof e.type!=`string`)throw Error(F(17));if(c)throw Error(F(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(F(10));r=e,f({type:ft.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(F(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[ut](){return this}}}return f({type:ft.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[ut]:m}}function ht(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:ft.INIT})===void 0)throw Error(F(12));if(n(void 0,{type:ft.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(F(13))})}function gt(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{ht(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(F(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function _t(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function vt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(F(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=_t(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function yt(e){return pt(e)&&`type`in e&&typeof e.type==`string`}var bt=Symbol.for(`immer-nothing`),xt=Symbol.for(`immer-draftable`),I=Symbol.for(`immer-state`);function L(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var R=Object,z=R.getPrototypeOf,St=`constructor`,Ct=`prototype`,wt=`configurable`,Tt=`enumerable`,Et=`writable`,Dt=`value`,B=e=>!!e&&!!e[I];function V(e){return e?At(e)||Lt(e)||!!e[xt]||!!e[St]?.[xt]||Rt(e)||zt(e):!1}var Ot=R[Ct][St].toString(),kt=new WeakMap;function At(e){if(!e||!Bt(e))return!1;let t=z(e);if(t===null||t===R[Ct])return!0;let n=R.hasOwnProperty.call(t,St)&&t[St];if(n===Object)return!0;if(!H(n))return!1;let r=kt.get(n);return r===void 0&&(r=Function.toString.call(n),kt.set(n,r)),r===Ot}function jt(e,t,n=!0){Mt(e)===0?(n?Reflect.ownKeys(e):R.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function Mt(e){let t=e[I];return t?t.type_:Lt(e)?1:Rt(e)?2:zt(e)?3:0}var Nt=(e,t,n=Mt(e))=>n===2?e.has(t):R[Ct].hasOwnProperty.call(e,t),Pt=(e,t,n=Mt(e))=>n===2?e.get(t):e[t],Ft=(e,t,n,r=Mt(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function It(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Lt=Array.isArray,Rt=e=>e instanceof Map,zt=e=>e instanceof Set,Bt=e=>typeof e==`object`,H=e=>typeof e==`function`,Vt=e=>typeof e==`boolean`;function Ht(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var U=e=>e.copy_||e.base_,Ut=e=>e.modified_?e.copy_:e.base_;function Wt(e,t){if(Rt(e))return new Map(e);if(zt(e))return new Set(e);if(Lt(e))return Array[Ct].slice.call(e);let n=At(e);if(t===!0||t===`class_only`&&!n){let t=R.getOwnPropertyDescriptors(e);delete t[I];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[Et]===!1&&(a[Et]=!0,a[wt]=!0),(a.get||a.set)&&(t[i]={[wt]:!0,[Et]:!0,[Tt]:a[Tt],[Dt]:e[i]})}return R.create(z(e),t)}else{let t=z(e);if(t!==null&&n)return{...e};let r=R.create(t);return R.assign(r,e)}}function Gt(e,t=!1){return Jt(e)||B(e)||!V(e)?e:(Mt(e)>1&&R.defineProperties(e,{set:qt,add:qt,clear:qt,delete:qt}),R.freeze(e),t&&jt(e,(e,t)=>{Gt(t,!0)},!1),e)}function Kt(){L(2)}var qt={[Dt]:Kt};function Jt(e){return e===null||!Bt(e)?!0:R.isFrozen(e)}var Yt=`MapSet`,Xt=`Patches`,Zt=`ArrayMethods`,Qt={};function W(e){let t=Qt[e];return t||L(0,e),t}var $t=e=>!!Qt[e],en,tn=()=>en,nn=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:$t(Yt)?W(Yt):void 0,arrayMethodsPlugin_:$t(Zt)?W(Zt):void 0});function rn(e,t){t&&(e.patchPlugin_=W(Xt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function an(e){on(e),e.drafts_.forEach(cn),e.drafts_=null}function on(e){e===en&&(en=e.parent_)}var sn=e=>en=nn(en,e);function cn(e){let t=e[I];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function ln(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[I].modified_&&(an(t),L(4)),V(e)&&(e=un(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[I].base_,e,t)}else e=un(t,n);return dn(t,e,!0),an(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===bt?void 0:e}function un(e,t){if(Jt(t))return t;let n=t[I];if(!n)return yn(t,e.handledSet_,e);if(!pn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);_n(n,e)}return n.copy_}function dn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Gt(t,n)}function fn(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var pn=(e,t)=>e.scope_===t,mn=[];function hn(e,t,n,r){let i=U(e),a=e.type_;if(r!==void 0&&Pt(i,r,a)===t){Ft(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;jt(i,(e,n)=>{if(B(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??mn;for(let e of o)Ft(i,e,n,a)}function gn(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!pn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Ut(i);hn(e,i.draft_??i,a,n),_n(i,r)})}function _n(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}fn(e)}}function vn(e,t,n){let{scope_:r}=e;if(B(n)){let i=n[I];pn(i,r)&&i.callbacks_.push(function(){Dn(e),hn(e,n,Ut(i),t)})}else V(n)&&e.callbacks_.push(function(){let i=U(e);e.type_===3?i.has(n)&&yn(n,r.handledSet_,r):Pt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&yn(Pt(e.copy_,t,e.type_),r.handledSet_,r)})}function yn(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||B(e)||t.has(e)||!V(e)||Jt(e)?e:(t.add(e),jt(e,(r,i)=>{if(B(i)){let t=i[I];pn(t,n)&&(Ft(e,r,Ut(t),e.type_),fn(t))}else V(i)&&yn(i,t,n)}),e)}function bn(e,t){let n=Lt(e),r={type_:+!!n,scope_:t?t.scope_:tn(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=xn;n&&(i=[r],a=Sn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var xn={get(e,t){if(t===I)return e;if(t===`constructor`||t===`__proto__`){let n=U(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=U(e);if(!Nt(i,t,e.type_))return wn(e,i,t);let a=i[t];if(e.finalized_||!V(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Ht(t))return a;if(a===Cn(e.base_,t)){Dn(e);let n=e.type_===1?+t:t,r=kn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in U(e)},ownKeys(e){return Reflect.ownKeys(U(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=Tn(U(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=Cn(U(e),t),i=r?.[I];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(It(n,r)&&(n!==void 0||Nt(e.base_,t,e.type_)))return!0;Dn(e),En(e)}return e.copy_[t]===n&&(n!==void 0||Nt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),vn(e,t,n),!0)},deleteProperty(e,t){return Dn(e),Cn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),En(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=U(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Et]:!0,[wt]:e.type_!==1||t!==`length`,[Tt]:r[Tt],[Dt]:n[t]}},defineProperty(){L(11)},getPrototypeOf(e){return z(e.base_)},setPrototypeOf(){L(12)}},Sn={};for(let e in xn){let t=xn[e];Sn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}Sn.deleteProperty=function(e,t){return Sn.set.call(this,e,t,void 0)},Sn.set=function(e,t,n){return xn.set.call(this,e[0],t,n,e[0])};function Cn(e,t){let n=e[I];return(n?U(n):e)[t]}function wn(e,t,n){let r=Tn(t,n);return r?Dt in r?r[Dt]:r.get?.call(e.draft_):void 0}function Tn(e,t){if(!(t in e))return;let n=z(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=z(n)}}function En(e){e.modified_||(e.modified_=!0,e.parent_&&En(e.parent_))}function Dn(e){e.copy_||(e.assigned_=new Map,e.copy_=Wt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var On=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(H(e)&&!H(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}H(t)||L(6),n!==void 0&&!H(n)&&L(7);let r;if(V(e)){let i=sn(this),a=kn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?an(i):on(i)}return rn(i,n),ln(r,i)}else if(!e||!Bt(e)){if(r=t(e),r===void 0&&(r=e),r===bt&&(r=void 0),this.autoFreeze_&&Gt(r,!0),n){let t=[],i=[];W(Xt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else L(1,e)},this.produceWithPatches=(e,t)=>{if(H(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Vt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Vt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Vt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){V(e)||L(8),B(e)&&(e=An(e));let t=sn(this),n=kn(t,e,void 0);return n[I].isManual_=!0,on(t),n}finishDraft(e,t){let n=e&&e[I];(!n||!n.isManual_)&&L(9);let{scope_:r}=n;return rn(r,t),ln(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=W(Xt).applyPatches_;return B(e)?r(e,t):this.produce(e,e=>r(e,t))}};function kn(e,t,n,r){let[i,a]=Rt(t)?W(Yt).proxyMap_(t,n):zt(t)?W(Yt).proxySet_(t,n):bn(t,n);return(n?.scope_??tn()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?gn(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function An(e){return B(e)||L(10,e),jn(e)}function jn(e){if(!V(e)||Jt(e))return e;let t=e[I],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Wt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Wt(e,!0);return jt(n,(e,t)=>{Ft(n,e,jn(t))},r),t&&(t.finalized_=!1),n}var Mn=new On().produce;function Nn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Pn=Nn(),Fn=Nn,In=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?_t:_t.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Ln(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(G(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>yt(t)&&t.type===e,n}var Rn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function zn(e){return V(e)?Mn(e,()=>{}):e}function Bn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Vn(e){return typeof e==`boolean`}var Hn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new Rn;return t&&(Vn(t)?a.push(Pn):a.push(Fn(t.extraArgument))),a},Un=`RTK_autoBatch`,Wn=e=>t=>{setTimeout(t,e)},Gn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Kn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Gn(window.requestAnimationFrame,100):Wn(10):e.type===`callback`?e.queueNotification:Wn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Un],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},qn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new Rn(e);return n&&r.push(Kn(typeof n==`object`?n:void 0)),r};function Jn(e){let t=Hn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(pt(n))c=gt(n);else throw Error(G(1));let l;l=typeof r==`function`?r(t):t();let u=_t;i&&(u=In({trace:!1,...typeof i==`object`&&i}));let d=qn(vt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return mt(c,o,p)}function Yn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(G(28));if(r in t)throw Error(G(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Xn(e){return typeof e==`function`}function Zn(e,t){let[n,r,i]=Yn(t),a;if(Xn(e))a=()=>zn(e());else{let t=zn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(B(e)){let r=n(e,t);return r===void 0?e:r}else if(V(e))return Mn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Qn=Symbol.for(`rtk-slice-createasyncthunk`);function $n(e,t){return`${e}/${t}`}function er({creators:e}={}){let t=e?.asyncThunk?.[Qn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(G(11));let i=(typeof e.reducers==`function`?e.reducers(rr()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(G(12));if(n in o.sliceCaseReducersByType)throw Error(G(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:$n(n,r),createNotation:typeof e.reducers==`function`};ar(a)?sr(o,a,s,t):ir(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Yn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Zn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Bn(d,r,m)),i}function i(t=l){return Bn(Bn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=tr(a,t,()=>Bn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function tr(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var nr=er();function rr(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function ir({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!or(r))throw Error(G(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Ln(e,o):Ln(e))}function ar(e){return e._reducerDefinitionType===`asyncThunk`}function or(e){return e._reducerDefinitionType===`reducerWithPrepare`}function sr({type:e,reducerName:t},n,r,i){if(!i)throw Error(G(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||cr,pending:s||cr,rejected:c||cr,settled:l||cr})}function cr(){}var lr=`listener`,ur=`completed`,dr=`cancelled`;`${dr}`,`${ur}`,`${lr}${dr}`,`${lr}${ur}`;var{assign:fr}=Object,pr=`listenerMiddleware`,mr=fr(Ln(`${pr}/add`),{withTypes:()=>mr});`${pr}`;var hr=fr(Ln(`${pr}/remove`),{withTypes:()=>hr});function G(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var gr=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),_r=new Set([`NEVER`,`AFTER`,`ON_DATE`]),vr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},yr=e=>gr.has(e)?e:`NEVER`,br=e=>_r.has(e)?e:`NEVER`,xr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,Sr=nr({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:E.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=je(e,e.until)),r!==void 0&&(e.until=e.start+r),D(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=je(e,n),D(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:i}=t.payload;e.allDay=n;let a=n?0:new Date().getUTCHours(),o=x(e.start);o.setHours(a,0,0,0),e.start=r(o);let s=x(e.end);n?s=se(h(s),1):(s=T(s,1),s=pe(s,o.getHours()),s=he(s,i)),e.end=r(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=je(e,e.until)),D(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=Ce(e.rrule)),e.repeatType=t.payload,D(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=xr(e.count):e.count=null,D(e)},setFreq:(e,t)=>{e.freq=t.payload,_e(e,t.payload),D(e)},setCount:(e,t)=>{e.count=xr(t.payload),D(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),D(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=O(r),D(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=O(n.byweekday)),`bymonth`in n&&(e.bymonth=O(n.bymonth)),`bymonthday`in n&&(e.bymonthday=O(n.bymonthday)),`byyearday`in n&&(e.byyearday=O(n.byyearday)),`bysetpos`in n&&(e.bysetpos=O(n.bysetpos)),D(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:K}=Sr,Cr=Sr.reducer,q={state:e=>e.event},wr=f.div`
  padding-top: 16px;
  width: 100%;
`,Tr=f.div`
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
`,Er=f.p`
  && {
    margin: 0 0 8px;
    padding: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
`,Dr=f.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Or=f.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  ${ue}

  .react-datepicker__current-month {
    display: none;
  }
`,kr=f.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Ar=f.div`
  position: relative;
  flex-shrink: 0;
`,jr=f.button`
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
`,Mr=f.div`
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
`,Nr=f.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Pr=f.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Fr=f.li`
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
`,Ir=f.button`
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
`,Lr=nr({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:Rr}=Lr,zr=Lr.reducer,J={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},Br=f.div`
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
`,Vr=f.ul`
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
`,Hr=f.li`
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
`,Y=s(),Ur=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],Wr=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of Ur){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},Gr=({context:e,refreshKey:n,onOccurrencesChanged:r})=>{let i=(0,j.useRef)(null),[a,o]=(0,j.useState)([]),[s,c]=(0,j.useState)(null),[l,u]=(0,j.useState)(null),d=(0,j.useRef)(0),[f,p]=(0,j.useState)(new Map),m=P(q.state),h=P(J.formats),g=e=>ee({...e,...f.get(e.recurrenceId)},h),_=(0,j.useCallback)(()=>rt(i.current)?.settings.elementId??e.eventId,[e.eventId]),y=(0,j.useCallback)(async()=>{let t=_();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let r=await S(n,{headers:{Accept:`application/json`}});if(!r.ok)return;let i=(await r.json()).occurrences??[];++d.current,o(i),u(null),p(new Map)},[e.siteId,_]);(0,j.useEffect)(()=>{y()},[y,n]);let b=(0,j.useCallback)(async()=>{let t=_();if(!t)return;let n=++d.current,r=await S(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...Wr(i.current)})});if(!r.ok)return;let a=await r.json();n===d.current&&(u(new Set(a.orphaned??[])),p(new Map(a.occurrences?.map(e=>[e.recurrenceId,e])??[])))},[e.siteId,_]);(0,j.useEffect)(()=>{if(++d.current,a.length===0)return;let e=setTimeout(()=>void b(),400);return()=>clearTimeout(e)},[m,a,b]);let x=e=>l?l.has(e.recurrenceId):e.orphaned;(0,j.useEffect)(()=>{r?.(a.map(e=>({...e,...f.get(e.recurrenceId),orphaned:l?l.has(e.recurrenceId):e.orphaned})))},[a,l,f,r]);let C=async n=>{c(n.recurrenceId);try{let t=await it(i.current);if(!t)return;te({eventId:t,recurrenceId:f.get(n.recurrenceId)?.scheduleRecurrenceId??n.recurrenceId,siteId:e.siteId,onSave:()=>void y()})}catch{Craft.cp.displayError(t(`Couldn’t open the occurrence for editing.`))}finally{c(null)}},ne=async n=>{if(window.confirm(t(`Remove everything this occurrence changes?`))){c(n.recurrenceId);try{let r=await it(i.current);if(!r)return;let a=await S(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:r,siteId:e.siteId,recurrenceId:f.get(n.recurrenceId)?.scheduleRecurrenceId??n.recurrenceId})});if(!a.ok){let e=await a.json().catch(()=>null);Craft.cp.displayError(e?.message||t(`Couldn’t reset the occurrence.`));return}await y()}catch{Craft.cp.displayError(t(`Couldn’t reset the occurrence.`))}finally{c(null)}}};return(0,Y.jsx)(Br,{ref:i,children:a.length>0&&(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(Tr,{as:`h3`,children:t(`Edited occurrences`)}),(0,Y.jsx)(Er,{children:t(`Occurrences with their own changes. Changes made here go live with the event.`)}),a.some(x)&&(0,Y.jsx)(Er,{className:`warning`,children:t(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,Y.jsx)(Vr,{children:a.map(e=>(0,Y.jsxs)(Hr,{className:v(x(e)&&`is-orphaned`,e.cancelled&&`is-cancelled`),children:[(0,Y.jsxs)(`div`,{className:`occurrence-details`,children:[(0,Y.jsx)(`span`,{className:`occurrence-title`,children:e.title}),e.cancelled&&(0,Y.jsx)(`span`,{className:`occurrence-state cancelled`,children:t(`Cancelled`)}),x(e)&&(0,Y.jsx)(`span`,{className:`occurrence-state`,children:t(`No longer on the schedule`)})]}),(0,Y.jsx)(`div`,{className:`occurrence-date`,children:g(e)}),(0,Y.jsx)(`div`,{className:`occurrence-changes`,children:(0,Y.jsx)(`span`,{children:e.changes.join(`, `)})}),(0,Y.jsxs)(`div`,{className:`occurrence-actions`,children:[!x(e)&&(0,Y.jsx)(Ir,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":t(`Edit occurrence on {date}`,{date:g(e)}),title:t(`Edit occurrence`),disabled:s!==null,onClick:()=>void C(e)}),(0,Y.jsx)(Ir,{type:`button`,className:`icon occurrence-discard`,"data-icon":`remove`,"aria-label":`${t(`Discard`)}: ${g(e)}`,title:t(`Removes everything this occurrence changes.`),disabled:s!==null,onClick:()=>void ne(e)})]})]},e.recurrenceId))})]})})},Kr=f.div`
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
`,qr=f.div`
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
`,Jr=f.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,Yr=f.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Xr=f.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Zr=f.div`
  min-width: 0;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,Qr=f.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,$r=f.li`
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
`,ei=f.ul`
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
`,ti=e=>new Date(`${e.replace(` `,`T`)}Z`),ni=(e,t,n,r=[],i,o)=>{if(!n)return[];let s=new Date(`${a(n)}T00:00:00Z`),c=i??new Date(Date.UTC(s.getUTCFullYear()+100,0,1)),l=r.filter(t=>{if(t.orphaned)return!1;let n=ti(t.scheduleRecurrenceId??t.recurrenceId);return e.recurrenceSet?.between(n,n,!0).length===1}),d=new Map(l.map(e=>[e.scheduleRecurrenceId?.replace(` `,`T`)??e.recurrenceId.replace(` `,`T`),e])),f=t.end-t.start,p=(e.recurrenceSet?e.recurrenceSet.between(i?new Date(s.getTime()-Math.max(0,f)*1e3):s,c,!0,o===void 0?void 0:(e,t)=>t<o+l.length):[new Date(t.start*1e3)]).filter(e=>!d.has(u(e))).map(e=>{let n=e.getTime()/1e3,r=t.allDay&&t.end%86400==0?f-1:f;return{recurrenceId:u(e),scheduleRecurrenceId:u(e),start:n,end:n+r,allDay:t.allDay,title:null,edited:!1,cancelled:!1}});for(let e of l)p.push({...e,scheduleRecurrenceId:e.scheduleRecurrenceId??e.recurrenceId,edited:!0});let m=p.filter(e=>i?e.start<c.getTime()/1e3&&e.end>=s.getTime()/1e3:e.start>=s.getTime()/1e3).sort((e,t)=>e.start-t.start||e.recurrenceId.localeCompare(t.recurrenceId));return o===void 0?m:m.slice(0,o)},ri=(e,t)=>{let n=a(t),r=e.allDay?e.end:Math.max(e.start,e.end-1);return a(new Date(e.start*1e3))<=n&&a(new Date(r*1e3))>=n},ii=(e,n=[])=>{let r=[],i=(e,n,i)=>{e>0&&r.push(t(e===1?n:i,{count:e}))},a=(e.recurrenceSet?.rdates()??[]).filter(t=>{let n=be(e,t);return n.full&&!n.base&&n.timestamp!==e.startTimestamp}).length,o=(e.recurrenceSet?.exdates()??[]).filter(t=>be(e,t).excluded).length,s=n.filter(e=>!e.orphaned);return i(a,`{count} additional date`,`{count} additional dates`),i(o,`{count} excluded date`,`{count} excluded dates`),i(s.filter(e=>!e.cancelled).length,`{count} edited occurrence`,`{count} edited occurrences`),i(s.filter(e=>e.cancelled).length,`{count} cancelled occurrence`,`{count} cancelled occurrences`),i(n.filter(e=>e.orphaned).length,`{count} edit off schedule`,`{count} edits off schedule`),r},ai=(e,n,r,i=`PP`,a=`PPp`)=>{let o=e=>g(x(e),r?i:a,{locale:y()});return e?.splitAt?t(`This draft changes the series from {date} onward.`,{date:o(e.splitAt)}):e?.series?.later?t(`This part of the series starts on {start} and ends before {end}.`,{start:o(n),end:o(e.series.later.start)}):e?.series?.earlier?t(`This part of the series starts on {date}.`,{date:o(n)}):null},oi=8,si=({context:n,onOccurrenceSaved:r,editedOccurrences:i})=>{let o=(0,j.useRef)(null),[s,c]=(0,j.useState)(!1),l=N(),u=P(J.weekStartDay),d=P(J.formats),f=d?.date.short.icu??`P`,p=d?.datetime?.short.icu??`Pp`,m=P(q.state),{start:h,rrule:_}=m,v=!!(n?.eventId&&_),[x,S]=(0,j.useState)(null),C=(0,j.useMemo)(()=>Te(_,h),[_,h]),ne=(0,j.useMemo)(()=>ni(C,m,x?.start??null,i,x?.end),[C,m,x,i]),re=(0,j.useMemo)(()=>ne.map(e=>({id:e.recurrenceId,start:a(new Date(e.start*1e3)),allDay:!0})),[ne]),T=(0,j.useMemo)(()=>ni(C,m,x?.start??null,i,void 0,oi),[C,m,x,i]),se=e=>ne.filter(t=>ri(t,e)),ce=e=>[e.title,ee(e,d),e.cancelled?t(`Cancelled`):e.edited?t(`Edited occurrence`):null].filter(Boolean).join(` · `),le=(0,j.useMemo)(()=>Oe(C,f),[C,f]),ue=(0,j.useMemo)(()=>{let e=ke(C,T.length);return e?ve(e):null},[C,T]),de=(0,j.useMemo)(()=>ii(C,i),[C,i]),fe=ai(n,h,m.allDay,f,p),pe=(0,j.useCallback)((e,t,n)=>{l(K.setRRule(De(m,C,e,t,n)))},[l,C,m]),me=(0,j.useCallback)(e=>{let t=Ae(C,e);if(t){let{timestamp:n}=be(C,e);pe(t,n,t===`exdate`)}},[pe,C]),he=e=>{let t=se(e).find(e=>e.edited),n=i?.find(t=>!t.orphaned&&a(ti(t.scheduleRecurrenceId??t.recurrenceId))===a(e));if(v&&(t||n)){E((t??n).scheduleRecurrenceId??(t??n).recurrenceId);return}let r=be(C,e);if(r.base&&r.excluded){pe(`exdate`,r.timestamp,!1);return}if(r.full){me(e);return}r.full||pe(`rdate`,r.timestamp,!0)},ge=(0,j.useCallback)(e=>be(C,e),[C]),E=async e=>{if(!(!n||s)){c(!0);try{te({eventId:await it(o.current),recurrenceId:e.replace(` `,`T`),siteId:n.siteId,onSave:()=>r?.()})}catch{Craft.cp.displayError(t(`Couldn’t open the occurrence for editing.`))}finally{c(!1)}}};return(0,Y.jsx)(Kr,{ref:o,children:(0,Y.jsxs)(w,{children:[(0,Y.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,Y.jsx)(Jr,{children:t(`Schedule Preview`)}),le&&(0,Y.jsx)(Yr,{children:le})]}),de.length>0&&(0,Y.jsx)(ei,{"aria-label":t(`Schedule changes`),children:de.map(e=>(0,Y.jsx)(`li`,{children:e},e))}),fe&&(0,Y.jsx)(Yr,{children:fe}),(0,Y.jsxs)(qr,{children:[(0,Y.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,Y.jsx)(ae,{...b(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[ie,oe],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(y().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:u,timeZone:`UTC`,eventDisplay:`none`,events:re,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>S({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=ge(e.date),n=se(e.date);return[n.length>0?`fc-has-event`:``,n.length>0&&t.rdate?`fc-extra-date`:``,n.length===0&&t.excluded?`fc-excluded-date`:``,n.some(e=>e.cancelled)?`fc-cancelled-date`:``,n.some(e=>e.edited)?`fc-edited-date`:``].filter(Boolean)},dayCellContent:e=>{let t=se(e.date).map(ce),n=t.length?t.join(`
`):void 0;return(0,Y.jsxs)(`span`,{title:n,children:[e.dayNumberText,n&&(0,Y.jsxs)(`span`,{className:`cancelled-date-label`,children:[`, `,n]})]})},dateClick:e=>he(e.date)}),ue&&(0,Y.jsx)(Xr,{children:ue})]}),(0,Y.jsx)(Zr,{children:T.length===0?(0,Y.jsxs)(`p`,{children:[t(`No occurrences starting from`),(0,Y.jsx)(`br`,{}),g(e(x?.currentStart??new Date),`PP`,{locale:y()})]}):(0,Y.jsx)(Qr,{$count:T.length,children:T.map(n=>{let r=new Date(n.start*1e3),i=n.cancelled,a=ti(n.scheduleRecurrenceId),o=g(e(r),f,{locale:y()}),c=Ae(C,a),l=v?n.scheduleRecurrenceId:null,u=t(c===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:o});return(0,Y.jsxs)($r,{title:ce(n),className:[i?`is-cancelled`:``,n.edited?`is-edited`:``].filter(Boolean).join(` `),children:[(0,Y.jsxs)(`span`,{className:`occurrence-date`,children:[(0,Y.jsx)(`span`,{children:o}),n.edited&&!i&&(0,Y.jsx)(`span`,{className:`occurrence-state`,children:t(`Edited occurrence`)}),i&&(0,Y.jsx)(`span`,{className:`occurrence-state`,children:t(`Cancelled`)})]}),(0,Y.jsxs)(`div`,{className:`occurrence-actions`,children:[l&&(0,Y.jsx)(Ir,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":t(`Edit occurrence on {date}`,{date:o}),title:t(`Edit occurrence`),disabled:s,onClick:()=>void E(l)}),c&&(0,Y.jsx)(Ir,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:s,"aria-label":u,title:u,onClick:()=>me(a)})]})]},n.recurrenceId)})})})]})]})})},ci=({context:e,refreshKey:t})=>{let n=P(q.state),{showOverlapWarnings:r,formats:i}=P(J.config),a=(0,j.useRef)(null),o=(0,j.useCallback)(()=>rt(a.current)?.settings.elementId??e?.eventId,[e?.eventId]);return e?.calendarId?(0,Y.jsx)(`div`,{ref:a,style:{padding:r?`0 20px 12px`:`0 20px`,marginTop:r?-8:0},children:(0,Y.jsx)(ne,{formats:i,enabled:r,schedule:{...n,rrule:n.rrule??``,calendarId:e.calendarId,siteId:e.siteId},resolveEventId:o,refreshKey:t})}):null},li=f.div`
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
`,ui=f.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,di=f.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,fi=e=>r(T(x(e),1)),pi=(e,t,n)=>{let r=hi(t,n);return e.getTime()>=r.getTime()},mi=({value:e,start:t,allDay:n,timeInterval:i})=>{if(n)return r(se(h(x(e)),1));let a=x(e),o=hi(t,i);return a.getTime()>=o.getTime()?e:r(o)},hi=(e,t)=>he(x(e),t),X=({options:e,value:n,onChange:r,translateOptions:i=!1,...a})=>(0,Y.jsx)(w,{...a,children:(0,Y.jsx)(`div`,{className:`select fullwidth`,children:(0,Y.jsx)(`select`,{id:a.id,className:`fullwidth`,value:n,onChange:e=>r?.(e.target.value),children:e.map(e=>(0,Y.jsx)(`option`,{value:e.value,children:i?t(e.label):e.label},e.value))})})}),gi=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},_i=({inputValue:e,value:t,min:n})=>{let r=gi(e)??n??t??0;return n===void 0?r:Math.max(r,n)},vi=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,j.useState)(e?.toString()??``),o=(0,j.useRef)(void 0),s=(0,j.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,j.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,j.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,j.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,j.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=gi(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,j.useCallback)(n=>{n.stopPropagation();let r=_i({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},yi=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=vi({value:e,min:t,debounceMs:n,onChange:r});return(0,Y.jsx)(w,{...i,children:(0,Y.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},bi=()=>null,Z=[{value:`MO`,label:`Monday`,days:[A.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[A.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[A.WE.weekday]},{value:`TH`,label:`Thursday`,days:[A.TH.weekday]},{value:`FR`,label:`Friday`,days:[A.FR.weekday]},{value:`SA`,label:`Saturday`,days:[A.SA.weekday]},{value:`SU`,label:`Sunday`,days:[A.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[A.MO.weekday,A.TU.weekday,A.WE.weekday,A.TH.weekday,A.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[A.SA.weekday,A.SU.weekday]}],xi=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},Si=(e,t)=>{let n=xi(e),r=xi(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Ci=(e,t)=>{if(e){let t=Z.find(t=>Si(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},wi=e=>Z.find(t=>t.value===e)?.days??[A.MO.weekday],Q=`5px`,Ti=f.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,Ei=f(Ti)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,Di=f(Ti)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,Oi=f.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,ki=f(Oi)`
  grid-template-columns: repeat(7, 1fr);

  ${Ti} {
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
`,Ai=f(Oi)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${Ti} {
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
`,ji=f(Oi)`
  grid-template-columns: repeat(4, 1fr);

  ${Ti} {
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
`,Mi=({label:e,values:t,onChange:n})=>(0,Y.jsx)(w,{label:e,children:(0,Y.jsxs)(ki,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,Y.jsx)(Ei,{type:`button`,className:v(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,Y.jsx)(Di,{},e))]})}),Ni=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],Pi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Fi=()=>{let e=N(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=P(q.state),a=x(t),o=a.getDate(),s=(a.getDay()+6)%7,c=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,l=n?.length?n:[o],u=i?.[0]??1,d=Ci(r,s),f=t=>{e(K.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},p=(t,n)=>{e(K.setByRules({bymonthday:void 0,byweekday:wi(t),bysetpos:[n]}))};return(0,Y.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,Y.jsx)(X,{translateOptions:!0,label:`Repeat on`,value:c,options:Ni,onChange:e=>{e===`WEEKDAY`?p(d,u):f(l)}}),c===`MONTHDAY`&&(0,Y.jsx)(Mi,{label:`Days of Month`,values:l,onChange:e=>f(e)}),c===`WEEKDAY`&&(0,Y.jsxs)(k,{children:[(0,Y.jsx)(X,{translateOptions:!0,label:`Position`,value:u,options:Pi,onChange:e=>p(d,Number.parseInt(e,10))}),(0,Y.jsx)(X,{translateOptions:!0,label:`Day`,value:d,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>p(e,u)})]})]})},Ii=[{weekday:A.SU,label:`Sun`},{weekday:A.MO,label:`Mon`},{weekday:A.TU,label:`Tue`},{weekday:A.WE,label:`Wed`},{weekday:A.TH,label:`Thu`},{weekday:A.FR,label:`Fri`},{weekday:A.SA,label:`Sat`}],Li=()=>{let e=N(),{byweekday:n}=P(q.state);return(0,Y.jsx)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,Y.jsx)(w,{label:`On`,children:(0,Y.jsx)(Ai,{children:Ii.map(({weekday:r,label:i})=>(0,Y.jsx)(Ei,{type:`button`,className:v(n?.includes(r.weekday)&&`active`),onClick:()=>{let t=n?[...n]:[];t.includes(r.weekday)?t=t.filter(e=>e!==r.weekday):t.push(r.weekday),t.length!==0&&e(K.setDays({type:`byweekday`,values:t}))},children:t(i)},r.weekday))})})})},Ri=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],zi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Bi=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],Vi=()=>{let e=N(),{start:n,bymonth:r,bymonthday:i,byweekday:a,bysetpos:o}=P(q.state),s=x(n),c=s.getDate(),l=s.getMonth()+1,u=(s.getDay()+6)%7,d=o?.length&&a?.length?`WEEKDAY`:`MONTHDAY`,f=i?.length?i:[c],p=r?.length?r:[l],m=o?.[0]??1,h=Ci(a,u),g=(t,n)=>{e(K.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},_=(t,n,r)=>{e(K.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:wi(n),bysetpos:[r]}))};return(0,Y.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,Y.jsx)(w,{label:`Month`,children:(0,Y.jsx)(ji,{children:Bi.map(e=>{let n=p.includes(e.value);return(0,Y.jsx)(Ei,{type:`button`,className:v(n&&`active`),onClick:()=>{let t=p.filter(t=>t!==e.value);n||(t=[...t,e.value]),t.length!==0&&(t.sort((e,t)=>e-t),d===`WEEKDAY`?_(t,h,m):g(t,f))},children:t(e.label)},e.value)})})}),(0,Y.jsx)(X,{translateOptions:!0,label:`Repeat on`,value:d,options:Ri,onChange:e=>{e===`WEEKDAY`?_(p,h,m):g(p,f)}}),d===`MONTHDAY`&&(0,Y.jsx)(Mi,{label:`Days of Month`,values:f,onChange:e=>g(p,e)}),d===`WEEKDAY`&&(0,Y.jsxs)(k,{children:[(0,Y.jsx)(X,{translateOptions:!0,label:`Position`,value:m,options:zi,onChange:e=>_(p,h,Number.parseInt(e,10))}),(0,Y.jsx)(X,{translateOptions:!0,label:`Day`,value:h,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>_(p,e,m)})]})]})},Hi=()=>{let{freq:e}=P(q.state);return e===E.DAILY?(0,Y.jsx)(bi,{}):e===E.WEEKLY?(0,Y.jsx)(Li,{}):e===E.MONTHLY?(0,Y.jsx)(Fi,{}):e===E.YEARLY?(0,Y.jsx)(Vi,{}):null},Ui=e=>(0,Y.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Y.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Wi=e=>(0,Y.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Y.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Gi=()=>{let e=N(),{interval:n}=P(q.state);return(0,Y.jsxs)(Ki,{children:[(0,Y.jsx)(`span`,{children:t(`Every`)}),(0,Y.jsx)(qi,{"aria-label":t(`Repeat interval`),type:`text`,className:`text`,value:n,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(K.setInterval(n))}}),(0,Y.jsxs)(Ji,{children:[(0,Y.jsx)(Yi,{type:`button`,"aria-label":t(`Increase interval`),onClick:()=>e(K.setInterval(n+1)),children:(0,Y.jsx)(Wi,{})}),(0,Y.jsx)(Yi,{type:`button`,"aria-label":t(`Decrease interval`),onClick:()=>e(K.setInterval(n-1)),children:(0,Y.jsx)(Ui,{})})]})]})},Ki=f.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,qi=f.input`
  width: 60px;
`,Ji=f.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Yi=f.button`
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
`,Xi=re({position:[`bottom`,`top`],alignment:`end`,padding:8}),Zi=(e,t,n,r)=>{let[i,a]=(0,j.useState)();return(0,j.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=C({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Xi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Qi=(e,t,n)=>{(0,j.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},$i=({title:e,description:n,actionLabel:i,actionClass:a,popoverTitle:o,dates:s,openToDate:c,weekStartDay:l,formatDate:u,filterDate:f,onAdd:p,onRemove:m})=>{let[g,_]=(0,j.useState)(!1),y=(0,j.useRef)(null),b=(0,j.useRef)(null),x=(0,j.useRef)(null),S=Zi(g,b,x,y);return(0,j.useEffect)(()=>{s.length===0&&_(!1)},[s.length]),Qi(g,[b,x],()=>_(!1)),(0,Y.jsxs)(wr,{children:[(0,Y.jsx)(Tr,{children:t(e)}),n&&(0,Y.jsx)(Er,{children:t(n)}),(0,Y.jsxs)(Dr,{children:[(0,Y.jsxs)(Ar,{ref:y,children:[(0,Y.jsx)(jr,{ref:b,type:`button`,disabled:s.length===0,className:v({active:g}),onClick:()=>{s.length!==0&&_(e=>!e)},children:s.length}),g&&(0,Y.jsxs)(Mr,{ref:x,style:{top:S?.top??0,left:S?.left??0,visibility:S?`visible`:`hidden`},children:[(0,Y.jsx)(Nr,{children:t(o)}),(0,Y.jsx)(Pr,{children:s.map(e=>(0,Y.jsxs)(Fr,{children:[(0,Y.jsx)(`span`,{children:u(e)}),(0,Y.jsx)(`button`,{type:`button`,"aria-label":t(`Remove date {date}`,{date:u(e)}),onClick:()=>m(e),children:`×`})]},e))})]})]}),(0,Y.jsx)(Or,{children:(0,Y.jsx)(de,{...d(),selected:null,onChange:e=>{e&&p(r(h(e)))},customInput:(0,Y.jsx)(ea,{label:i,className:v(`btn`,a)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,renderCustomHeader:e=>(0,Y.jsx)(fe,{...e}),todayButton:t(`Today`),openToDate:c,calendarStartDay:l,filterDate:f})})]})]})},ea=(0,j.forwardRef)(({label:e,...n},r)=>(0,Y.jsx)(kr,{type:`button`,ref:r,...n,children:t(e)}));ea.displayName=`PickerTrigger`;var ta=f.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,na=()=>{let t=N(),n=P(q.state),{start:i,rrule:a}=n,o=(0,j.useMemo)(()=>Te(a,i),[a,i]),{startTimestamp:s,baseRule:u,recurrenceSet:d}=o,f=(0,j.useMemo)(()=>d?Array.from(new Set(d.rdates().map(t=>r(h(e(t)))).filter(e=>u?!0:e!==s))).sort((e,t)=>e-t):[],[u,d,s]),p=(0,j.useMemo)(()=>d?Array.from(new Set(d.exdates().map(t=>r(h(e(t)))))).sort((e,t)=>e-t):[],[d]),m=(0,j.useMemo)(()=>new Set(f),[f]),g=(0,j.useMemo)(()=>new Set(p),[p]),_=(0,j.useCallback)(e=>{let t=l(h(e)),n=c(le(e)),i=u?u.between(t,n,!0).length>0:!1,a=d?d.between(t,n,!0).length>0:r(h(e))===s;return{full:a,base:i,excluded:i&&!a}},[u,d,s]),v=i=>{let a=i({baseRule:u,rdates:d?.rdates().filter(t=>u?!0:r(h(e(t)))!==s)??[],exdates:d?.exdates()??[]});t(K.setRRule(Se(n,a.baseRule,ra(a.rdates),ra(a.exdates))))};return{addedDates:f,excludedDates:p,addFixedDate:(e,t)=>{if(e===`exdate`&&Ee(o,t))return;let r=xe(n,t);v(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:we(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&Ee(o,t))return;let r=xe(n,t).getTime();v(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?we(n,r):n,exdates:e===`exdate`?we(i,r):i}))},canAddOccurrence:(0,j.useCallback)(e=>{let t=r(h(e)),n=_(e);return!n.full&&!n.excluded&&!m.has(t)},[m,_]),canExcludeOccurrence:(0,j.useCallback)(e=>{let t=r(h(e)),n=_(e);return n.base&&!n.excluded&&!g.has(t)&&!Ee(o,t)},[g,_,o]),getStatus:_}},ra=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},ia=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],aa=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],oa=e=>[{value:E.DAILY,label:e?`Days`:`Day`},{value:E.WEEKLY,label:e?`Weeks`:`Week`},{value:E.MONTHLY,label:e?`Months`:`Month`},{value:E.YEARLY,label:e?`Years`:`Year`}],sa=300,ca=()=>{let e=N(),t=P(q.state),n=P(J.weekStartDay),r=P(J.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:o,until:s,freq:c,start:l,interval:u}=t,d=i!==`NEVER`,{addedDates:f,excludedDates:p,addFixedDate:m,removeFixedDate:h,canAddOccurrence:_,canExcludeOccurrence:v}=na(),b=(0,j.useMemo)(()=>x(l),[l]),S=e=>g(x(e),r,{locale:y()});return(0,Y.jsxs)(ta,{children:[(0,Y.jsxs)(k,{$alignItems:`end`,style:{width:`100%`},children:[(0,Y.jsx)(X,{translateOptions:!0,label:`Repeats`,value:i,options:ia,onChange:t=>e(K.setRepeatType(t))}),i===`CUSTOM`&&(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(Gi,{}),(0,Y.jsx)(X,{translateOptions:!0,label:``,value:c,options:oa(u>1),onChange:t=>e(K.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,Y.jsx)(Hi,{}),i!==`NEVER`&&(0,Y.jsxs)(k,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,Y.jsx)(X,{translateOptions:!0,label:`Ends`,options:aa,value:a,onChange:t=>e(K.setRepeatEndType(t))}),a===`AFTER`&&(0,Y.jsx)(yi,{label:`Times`,value:o,min:1,debounceMs:sa,onChange:t=>e(K.setCount(t))}),a===`ON_DATE`&&(0,Y.jsx)(me,{label:``,value:s||null,onChange:t=>e(K.setUntil(t)),datePickerProps:{dateFormat:r,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:b}})]}),(0,Y.jsxs)(k,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,Y.jsx)($i,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:f,openToDate:b,formatDate:S,filterDate:_,weekStartDay:n,onAdd:e=>m(`rdate`,e),onRemove:e=>h(`rdate`,e)}),d&&(0,Y.jsx)($i,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:p,openToDate:b,formatDate:S,filterDate:v,weekStartDay:n,onAdd:e=>m(`exdate`,e),onRemove:e=>h(`exdate`,e)})]})]})},la=({context:e,onOccurrenceSaved:n})=>{let r=(0,j.useId)(),i=(0,j.useId)(),a=(0,j.useId)(),[o,s]=(0,j.useState)(0),[c,l]=(0,j.useState)([]),u=N(),{start:d,end:f,allDay:p}=P(q.state),{date:m,time:h,datetime:g}=P(J.formats),_=P(J.weekStartDay),v=P(J.timeInterval),y=P(J.eventDuration),b=(0,j.useMemo)(()=>p?m.short.icu:g.short.icu,[p,m,g]),S=(0,j.useMemo)(()=>p?fi(f):f,[p,f]);return(0,Y.jsxs)(li,{children:[(0,Y.jsxs)(ui,{children:[(0,Y.jsxs)(di,{children:[(0,Y.jsx)(me,{id:i,label:`Starts`,value:d,onChange:e=>u(K.setStart(e)),datePickerProps:{id:i,showIcon:!0,icon:(0,Y.jsx)(ce,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!p,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:b,timeFormat:h.short.icu,todayButton:t(`Today`),calendarStartDay:_,timeIntervals:v}}),(0,Y.jsx)(me,{id:a,label:`Ends`,value:S,onChange:e=>{e!=null&&u(K.setEnd(mi({value:e,start:d,allDay:p,timeInterval:v})))},datePickerProps:{id:a,showIcon:!0,icon:(0,Y.jsx)(ce,{}),toggleCalendarOnIconClick:!0,minDate:x(d),showTimeSelect:!p,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:b,timeFormat:h.short.icu,todayButton:t(`Today`),calendarStartDay:_,timeIntervals:v,filterTime:e=>pi(new Date(e),d,v)}}),(0,Y.jsx)(ge,{id:r,label:`All Day`,enabled:p,style:{margin:0},onClick:e=>u(K.setAllDay({enabled:e,eventDuration:y}))})]}),(0,Y.jsx)(ci,{context:e,refreshKey:o}),(0,Y.jsx)(ca,{}),e?.eventId&&(0,Y.jsx)(Gr,{context:e,refreshKey:o,onOccurrencesChanged:l})]}),(0,Y.jsx)(si,{context:e,editedOccurrences:c,onOccurrenceSaved:()=>{s(e=>e+1),n?.()}})]})},ua=f.div`
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
`,da=f.div`
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
`,fa=({context:n})=>{let{allDay:r}=P(q.state),i=P(J.formats),a=(t,n=!1)=>g(e(new Date(t*1e3)),n?i?.datetime.short.icu??`Pp`:i?.date.short.icu??`P`,{locale:y()}),{splitAt:o,series:s}=n,c=s?.earlier??null,l=s?.later??null;return!o&&!c&&!l?null:(0,Y.jsxs)(da,{children:[o&&(0,Y.jsx)(`p`,{children:t(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:a(o,!r)})}),(c||l)&&(0,Y.jsxs)(`nav`,{children:[(0,Y.jsx)(`span`,{children:t(`Part of a series`)}),c&&(0,Y.jsxs)(`a`,{href:c.url,children:[`← `,t(`Earlier part, from {date}`,{date:a(c.start)})]}),l&&(0,Y.jsxs)(`a`,{href:l.url,children:[t(`Later part, from {date}`,{date:a(l.start)}),` →`]})]})]})},pa=({context:t})=>{let{rrule:n}=P(q.state),r=(0,j.useMemo)(lt,[]),i=n?ye(n,{forceset:!0}).all((e,t)=>t<10).map(t=>`${g(e(t),`yyyy-MM-dd HH:mm`)} [${Ne(t)}]`):[];return(0,Y.jsxs)(ua,{children:[t&&(0,Y.jsx)(fa,{context:t}),(0,Y.jsx)(la,{context:t}),r&&(0,Y.jsxs)(`code`,{children:[(0,Y.jsx)(`pre`,{children:n}),(0,Y.jsx)(`pre`,{children:JSON.stringify(i,null,2)})]})]})},ma=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,ha(n)),$(t,`end`,ha(r)),$(t,`until`,i?ha(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},ha=e=>g(x(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},ga=e=>{let t=Me(e.event.rrule),{byweekday:n,bysetpos:r}=vr(t?.options.byweekday),i=yr(e.event.repeatType),a=br(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||E.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?xr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Jn({reducer:{app:zr,event:Cr},preloadedState:o})},_a=new WeakSet,va=e=>{if(_a.has(e))return;_a.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=ga(r),a=Ie.createRoot(n);i.subscribe(()=>{ma(i,e)}),ma(i,e),a.render((0,Y.jsx)(Ye,{store:i,children:(0,Y.jsx)(pa,{context:r.context})}))},ya=(e=document)=>{e.querySelectorAll(`[data-calendar-transfer-select]`).forEach(ot),e.querySelectorAll(`[data-calendar-transfer]`).forEach(ct),e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(va)},ba=()=>{ya(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-calendar-transfer-select]`)&&ot(e),e.matches(`[data-calendar-transfer]`)&&ct(e),e.matches(`[data-event-builder]`)&&va(e),ya(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ba):ba();