import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,g as c,i as l,j as u,k as d,n as f,r as p,s as m,t as h,v as g,y as _}from"./localization-Dt_HqhpZ.js";import{A as v,D as y,E as b,H as x,S,T as C,U as ee,V as te,W as w,_ as T,a as ne,b as re,c as ie,d as ae,f as oe,g as se,h as E,i as ce,l as le,m as ue,n as de,o as fe,p as pe,r as me,s as he,t as ge,u as _e,v as D,w as ve,x as ye,y as be}from"./create-with-ai-wYdgigQh.js";import{h as xe,l as Se,m as Ce,p as we}from"./calendar.events-DxgmBNw7.js";import{t as Te}from"./interaction-D2VE812o.js";import{a as Ee,b as De,c as O,d as Oe,f as ke,h as Ae,i as je,m as k,n as Me,o as Ne,p as A,r as Pe,s as Fe,t as j,v as Ie,y as M}from"./components-CmYPTuIB.js";import{t as N}from"./dropdown-L5k4x2JL.js";function Le(e,t){let n=m(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=k(n.getDate(),2),t=k(n.getMonth()+1,2);a=`${k(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=k(Math.trunc(t/60),2),r=k(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=k(n.getHours(),2),r=k(n.getMinutes(),2),i=k(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Re=u((t=>{var n=e();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),ze=u(((e,t)=>{t.exports=Re()})),Be=i(n()),P=i(e(),1),Ve=ze();function He(e){e()}function Ue(){let e=null,t=null;return{clear(){e=null,t=null},notify(){He(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var We={notify(){},get:()=>[]};function Ge(e,t){let n,r=We,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Ue())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=We)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Ke=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,qe=typeof navigator<`u`&&navigator.product===`ReactNative`,Je=Ke||qe?P.useLayoutEffect:P.useEffect,Ye=Symbol.for(`react-redux-context`),Xe=typeof globalThis<`u`?globalThis:{};function Ze(){if(!P.createContext)return{};let e=Xe[Ye]??(Xe[Ye]=new Map),t=e.get(P.createContext);return t||(t=P.createContext(null),e.set(P.createContext,t)),t}var F=Ze();function Qe(e){let{children:t,context:n,serverState:r,store:i}=e,a=P.useMemo(()=>{let e=Ge(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=P.useMemo(()=>i.getState(),[i]);Je(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||F;return P.createElement(s.Provider,{value:a},t)}var $e=Qe;function et(e=F){return function(){return P.useContext(e)}}var tt=et();function nt(e=F){let t=e===F?tt:et(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var rt=nt();function it(e=F){let t=e===F?rt:nt(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var I=it(),at=(e,t)=>e===t;function ot(e=F){let t=e===F?tt:et(e),n=(e,n={})=>{let{equalityFn:r=at}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();P.useRef(!0);let s=P.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Ve.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return P.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var L=ot(),st=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`[data-element-editor]`).data(`elementEditor`)??t(e).closest(`form`).data(`elementEditor`)},ct=async e=>{let t=st(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},lt=new WeakSet,ut=e=>{let t=window.jQuery;if(lt.has(e)||!t)return;lt.add(e);let n=Number(e.dataset.calendarId),r=e.querySelector(`button.menubtn`),i=r?.querySelector(`.inline-flex`),a=i?.innerHTML,o=!1;t(e).on(`change`,async()=>{let s=Number(t(e).data(`value`));if(i&&a&&(i.innerHTML=a),t(e).data(`value`,n),e.querySelectorAll(`[data-value]`).forEach(e=>{e.classList.toggle(`sel`,Number(e.dataset.value)===n)}),o||s===n||!s)return;o=!0,r&&(r.disabled=!0);let c=st(e),l=!1;try{let t=await ct(e);c?.pause(),l=!!c;let n=new Craft.CpScreenSlideout(`calendar/event-calendar/edit`,{params:{eventId:t,siteId:Number(e.dataset.siteId),targetCalendarId:s}}),i=!1;n.on(`submit`,e=>{let t=e?.response?.data?.url;i=!0,window.location.assign(t||window.location.href)}),n.on(`close`,()=>{!i&&l&&c?.resume(),o=!1,r&&(r.disabled=!1)})}catch{l&&c?.resume(),o=!1,r&&(r.disabled=!1),Craft.cp.displayError(Craft.t(`calendar`,`Couldn’t open the calendar mapping.`))}})},dt=e=>{let t=JSON.parse(e.dataset.populated||`{}`),n=Array.from(e.querySelectorAll(`select[data-field-mapping]`)),r=n.map(e=>e.value).filter(Boolean),i=r.length!==new Set(r).size,a=new Set(r),o=Object.entries(t).filter(([e])=>!a.has(e)),s=e.querySelector(`[data-unmapped-warning]`),c=e.querySelector(`[data-unmapped-fields]`),l=e.querySelector(`[data-mapping-error]`),u=e.querySelector(`input[data-calendar-transfer-confirm]`)?.checked,d=e.closest(`form.cp-screen`)?.querySelector(`.so-footer button.submit`);if(d){let e=!u||i;d.disabled=e,d.classList.toggle(`disabled`,e),d.setAttribute(`aria-disabled`,String(e))}s&&(s.hidden=o.length===0),l&&(l.hidden=!i),c&&c.replaceChildren(...o.map(([,e])=>{let t=document.createElement(`li`);return t.textContent=e,t})),n.forEach(e=>{e.setCustomValidity(i?Craft.t(`calendar`,`Each source field can only be mapped once.`):``)})},ft=e=>{lt.has(e)||(lt.add(e),e.addEventListener(`change`,()=>dt(e)),dt(e))},pt=()=>!1;function R(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var mt=typeof Symbol==`function`&&Symbol.observable||`@@observable`,ht=()=>Math.random().toString(36).substring(7).split(``).join(`.`),gt={INIT:`@@redux/INIT${ht()}`,REPLACE:`@@redux/REPLACE${ht()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${ht()}`};function _t(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function vt(e,t,n){if(typeof e!=`function`)throw Error(R(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(R(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(R(1));return n(vt)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(R(3));return i}function d(e){if(typeof e!=`function`)throw Error(R(4));if(c)throw Error(R(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(R(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!_t(e))throw Error(R(7));if(e.type===void 0)throw Error(R(8));if(typeof e.type!=`string`)throw Error(R(17));if(c)throw Error(R(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(R(10));r=e,f({type:gt.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(R(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[mt](){return this}}}return f({type:gt.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[mt]:m}}function yt(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:gt.INIT})===void 0)throw Error(R(12));if(n(void 0,{type:gt.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(R(13))})}function bt(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{yt(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(R(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function xt(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function St(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(R(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=xt(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function Ct(e){return _t(e)&&`type`in e&&typeof e.type==`string`}var wt=Symbol.for(`immer-nothing`),Tt=Symbol.for(`immer-draftable`),z=Symbol.for(`immer-state`);function B(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var V=Object,H=V.getPrototypeOf,Et=`constructor`,Dt=`prototype`,Ot=`configurable`,kt=`enumerable`,At=`writable`,jt=`value`,U=e=>!!e&&!!e[z];function W(e){return e?Pt(e)||Vt(e)||!!e[Tt]||!!e[Et]?.[Tt]||Ht(e)||Ut(e):!1}var Mt=V[Dt][Et].toString(),Nt=new WeakMap;function Pt(e){if(!e||!Wt(e))return!1;let t=H(e);if(t===null||t===V[Dt])return!0;let n=V.hasOwnProperty.call(t,Et)&&t[Et];if(n===Object)return!0;if(!Gt(n))return!1;let r=Nt.get(n);return r===void 0&&(r=Function.toString.call(n),Nt.set(n,r)),r===Mt}function Ft(e,t,n=!0){It(e)===0?(n?Reflect.ownKeys(e):V.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function It(e){let t=e[z];return t?t.type_:Vt(e)?1:Ht(e)?2:Ut(e)?3:0}var Lt=(e,t,n=It(e))=>n===2?e.has(t):V[Dt].hasOwnProperty.call(e,t),Rt=(e,t,n=It(e))=>n===2?e.get(t):e[t],zt=(e,t,n,r=It(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Bt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Vt=Array.isArray,Ht=e=>e instanceof Map,Ut=e=>e instanceof Set,Wt=e=>typeof e==`object`,Gt=e=>typeof e==`function`,Kt=e=>typeof e==`boolean`;function qt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var G=e=>e.copy_||e.base_,Jt=e=>e.modified_?e.copy_:e.base_;function Yt(e,t){if(Ht(e))return new Map(e);if(Ut(e))return new Set(e);if(Vt(e))return Array[Dt].slice.call(e);let n=Pt(e);if(t===!0||t===`class_only`&&!n){let t=V.getOwnPropertyDescriptors(e);delete t[z];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[At]===!1&&(a[At]=!0,a[Ot]=!0),(a.get||a.set)&&(t[i]={[Ot]:!0,[At]:!0,[kt]:a[kt],[jt]:e[i]})}return V.create(H(e),t)}else{let t=H(e);if(t!==null&&n)return{...e};let r=V.create(t);return V.assign(r,e)}}function Xt(e,t=!1){return $t(e)||U(e)||!W(e)?e:(It(e)>1&&V.defineProperties(e,{set:Qt,add:Qt,clear:Qt,delete:Qt}),V.freeze(e),t&&Ft(e,(e,t)=>{Xt(t,!0)},!1),e)}function Zt(){B(2)}var Qt={[jt]:Zt};function $t(e){return e===null||!Wt(e)?!0:V.isFrozen(e)}var en=`MapSet`,tn=`Patches`,nn=`ArrayMethods`,rn={};function K(e){let t=rn[e];return t||B(0,e),t}var an=e=>!!rn[e],on,sn=()=>on,cn=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:an(en)?K(en):void 0,arrayMethodsPlugin_:an(nn)?K(nn):void 0});function ln(e,t){t&&(e.patchPlugin_=K(tn),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function un(e){dn(e),e.drafts_.forEach(pn),e.drafts_=null}function dn(e){e===on&&(on=e.parent_)}var fn=e=>on=cn(on,e);function pn(e){let t=e[z];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function mn(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[z].modified_&&(un(t),B(4)),W(e)&&(e=hn(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[z].base_,e,t)}else e=hn(t,n);return gn(t,e,!0),un(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===wt?void 0:e}function hn(e,t){if($t(t))return t;let n=t[z];if(!n)return wn(t,e.handledSet_,e);if(!vn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);Sn(n,e)}return n.copy_}function gn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Xt(t,n)}function _n(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var vn=(e,t)=>e.scope_===t,yn=[];function bn(e,t,n,r){let i=G(e),a=e.type_;if(r!==void 0&&Rt(i,r,a)===t){zt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;Ft(i,(e,n)=>{if(U(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??yn;for(let e of o)zt(i,e,n,a)}function xn(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!vn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Jt(i);bn(e,i.draft_??i,a,n),Sn(i,r)})}function Sn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}_n(e)}}function Cn(e,t,n){let{scope_:r}=e;if(U(n)){let i=n[z];vn(i,r)&&i.callbacks_.push(function(){Mn(e),bn(e,n,Jt(i),t)})}else W(n)&&e.callbacks_.push(function(){let i=G(e);e.type_===3?i.has(n)&&wn(n,r.handledSet_,r):Rt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&wn(Rt(e.copy_,t,e.type_),r.handledSet_,r)})}function wn(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||U(e)||t.has(e)||!W(e)||$t(e)?e:(t.add(e),Ft(e,(r,i)=>{if(U(i)){let t=i[z];vn(t,n)&&(zt(e,r,Jt(t),e.type_),_n(t))}else W(i)&&wn(i,t,n)}),e)}function Tn(e,t){let n=Vt(e),r={type_:+!!n,scope_:t?t.scope_:sn(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=En;n&&(i=[r],a=Dn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var En={get(e,t){if(t===z)return e;if(t===`constructor`||t===`__proto__`){let n=G(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=G(e);if(!Lt(i,t,e.type_))return kn(e,i,t);let a=i[t];if(e.finalized_||!W(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&qt(t))return a;if(a===On(e.base_,t)){Mn(e);let n=e.type_===1?+t:t,r=Pn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in G(e)},ownKeys(e){return Reflect.ownKeys(G(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=An(G(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=On(G(e),t),i=r?.[z];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Bt(n,r)&&(n!==void 0||Lt(e.base_,t,e.type_)))return!0;Mn(e),jn(e)}return e.copy_[t]===n&&(n!==void 0||Lt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),Cn(e,t,n),!0)},deleteProperty(e,t){return Mn(e),On(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),jn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=G(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[At]:!0,[Ot]:e.type_!==1||t!==`length`,[kt]:r[kt],[jt]:n[t]}},defineProperty(){B(11)},getPrototypeOf(e){return H(e.base_)},setPrototypeOf(){B(12)}},Dn={};for(let e in En){let t=En[e];Dn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}Dn.deleteProperty=function(e,t){return Dn.set.call(this,e,t,void 0)},Dn.set=function(e,t,n){return En.set.call(this,e[0],t,n,e[0])};function On(e,t){let n=e[z];return(n?G(n):e)[t]}function kn(e,t,n){let r=An(t,n);return r?jt in r?r[jt]:r.get?.call(e.draft_):void 0}function An(e,t){if(!(t in e))return;let n=H(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=H(n)}}function jn(e){e.modified_||(e.modified_=!0,e.parent_&&jn(e.parent_))}function Mn(e){e.copy_||(e.assigned_=new Map,e.copy_=Yt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var Nn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(Gt(e)&&!Gt(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}Gt(t)||B(6),n!==void 0&&!Gt(n)&&B(7);let r;if(W(e)){let i=fn(this),a=Pn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?un(i):dn(i)}return ln(i,n),mn(r,i)}else if(!e||!Wt(e)){if(r=t(e),r===void 0&&(r=e),r===wt&&(r=void 0),this.autoFreeze_&&Xt(r,!0),n){let t=[],i=[];K(tn).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else B(1,e)},this.produceWithPatches=(e,t)=>{if(Gt(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Kt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Kt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Kt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){W(e)||B(8),U(e)&&(e=Fn(e));let t=fn(this),n=Pn(t,e,void 0);return n[z].isManual_=!0,dn(t),n}finishDraft(e,t){let n=e&&e[z];(!n||!n.isManual_)&&B(9);let{scope_:r}=n;return ln(r,t),mn(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=K(tn).applyPatches_;return U(e)?r(e,t):this.produce(e,e=>r(e,t))}};function Pn(e,t,n,r){let[i,a]=Ht(t)?K(en).proxyMap_(t,n):Ut(t)?K(en).proxySet_(t,n):Tn(t,n);return(n?.scope_??sn()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?xn(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function Fn(e){return U(e)||B(10,e),In(e)}function In(e){if(!W(e)||$t(e))return e;let t=e[z],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Yt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Yt(e,!0);return Ft(n,(e,t)=>{zt(n,e,In(t))},r),t&&(t.finalized_=!1),n}var Ln=new Nn().produce;function Rn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var zn=Rn(),Bn=Rn,Vn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?xt:xt.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Hn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(q(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>Ct(t)&&t.type===e,n}var Un=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Wn(e){return W(e)?Ln(e,()=>{}):e}function Gn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Kn(e){return typeof e==`boolean`}var qn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new Un;return t&&(Kn(t)?a.push(zn):a.push(Bn(t.extraArgument))),a},Jn=`RTK_autoBatch`,Yn=e=>t=>{setTimeout(t,e)},Xn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Zn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Xn(window.requestAnimationFrame,100):Yn(10):e.type===`callback`?e.queueNotification:Yn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Jn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Qn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new Un(e);return n&&r.push(Zn(typeof n==`object`?n:void 0)),r};function $n(e){let t=qn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(_t(n))c=bt(n);else throw Error(q(1));let l;l=typeof r==`function`?r(t):t();let u=xt;i&&(u=Vn({trace:!1,...typeof i==`object`&&i}));let d=Qn(St(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return vt(c,o,p)}function er(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(q(28));if(r in t)throw Error(q(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function tr(e){return typeof e==`function`}function nr(e,t){let[n,r,i]=er(t),a;if(tr(e))a=()=>Wn(e());else{let t=Wn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(U(e)){let r=n(e,t);return r===void 0?e:r}else if(W(e))return Ln(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var rr=Symbol.for(`rtk-slice-createasyncthunk`);function ir(e,t){return`${e}/${t}`}function ar({creators:e}={}){let t=e?.asyncThunk?.[rr];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(q(11));let i=(typeof e.reducers==`function`?e.reducers(cr()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(q(12));if(n in o.sliceCaseReducersByType)throw Error(q(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:ir(n,r),createNotation:typeof e.reducers==`function`};ur(a)?fr(o,a,s,t):lr(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?er(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return nr(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Gn(d,r,m)),i}function i(t=l){return Gn(Gn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=or(a,t,()=>Gn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function or(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var sr=ar();function cr(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function lr({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!dr(r))throw Error(q(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Hn(e,o):Hn(e))}function ur(e){return e._reducerDefinitionType===`asyncThunk`}function dr(e){return e._reducerDefinitionType===`reducerWithPrepare`}function fr({type:e,reducerName:t},n,r,i){if(!i)throw Error(q(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||pr,pending:s||pr,rejected:c||pr,settled:l||pr})}function pr(){}var mr=`listener`,hr=`completed`,gr=`cancelled`;`${gr}`,`${hr}`,`${mr}${gr}`,`${mr}${hr}`;var{assign:_r}=Object,vr=`listenerMiddleware`,yr=_r(Hn(`${vr}/add`),{withTypes:()=>yr});`${vr}`;var br=_r(Hn(`${vr}/remove`),{withTypes:()=>br});function q(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var xr=sr({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:Sr}=xr,Cr=xr.reducer,J={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0,isSolspaceAiConnected:e=>!!e.app.isSolspaceAiConnected},wr=sr({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:b.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=pe(e,e.until)),r!==void 0&&(e.until=e.start+r),D(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=pe(e,n),D(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=o(e.start);a.setHours(i,0,0,0),e.start=g(a);let s=o(e.end);n?s=De(M(s),1):(s=ke(s,1),s=Oe(s,a.getHours()),s=Ie(s,r)),e.end=g(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=pe(e,e.until)),D(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=re(e.rrule)),e.repeatType=t.payload,D(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=S(e.count):e.count=null,D(e)},setFreq:(e,t)=>{e.freq=t.payload,ye(e,t.payload),D(e)},setCount:(e,t)=>{e.count=S(t.payload),D(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),D(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=T(r),D(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=T(n.byweekday)),`bymonth`in n&&(e.bymonth=T(n.bymonth)),`bymonthday`in n&&(e.bymonthday=T(n.bymonthday)),`byyearday`in n&&(e.byyearday=T(n.byyearday)),`bysetpos`in n&&(e.bysetpos=T(n.bysetpos)),D(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0},applyGeneratedSchedule:(e,t)=>{Object.assign(e,ue(t.payload))}}}),{actions:Y}=wr,Tr=wr.reducer,X={state:e=>e.event},Er=i(d()),Z=a(),Dr=(e,t)=>{let n=document.querySelector(e);n&&(n.value=t,n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.dispatchEvent(new Event(`change`,{bubbles:!0})))},Or=e=>{e&&Dr(`#title, input[name='title']`,e)},kr=(e,t)=>{if(!e||!t?.trim())return;let n=CSS.escape(e);Dr(`textarea[name="fields[${n}]"], input[name="fields[${n}]"], #fields-${n}`,t)},Ar=()=>{window.location.href=Craft.getCpUrl(`calendar/settings/solspaceai`)},jr=({context:e})=>{let t=(0,P.useRef)(null),n=I(),r=L(J.isSolspaceAiConnected),{showPopover:i,hidePopover:a}=x(),o=document.querySelector(`[data-event-ai-create-root]`);if(!o)return null;let s=t=>{Or(t.title),kr(e?.descriptionFieldHandle,t.description),kr(e?.locationFieldHandle,t.location),n(Y.applyGeneratedSchedule({start:t.start,end:t.end,allDay:t.allDay,repeatType:t.repeatType||`NEVER`,repeatEndType:t.repeatEndType||void 0,until:t.until??void 0,rrule:t.rrule||void 0})),a()};return(0,Er.createPortal)((0,Z.jsx)(`button`,{ref:t,type:`button`,className:`btn submit`,onClick:()=>{if(!r){Ar();return}let e=t.current;e&&i((0,Z.jsx)(ge,{onCancel:a,onApplyDraft:s}),e,{alignment:`end`,position:[`bottom`,`top`,`right`,`left`]})},children:l(`Create with AI`)}),o)},Mr=r.div`
  padding-top: 16px;
  width: 100%;
`,Nr=r.div`
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
`,Pr=r.p`
  && {
    margin: 0 0 8px;
    padding: 0;
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
`,Fr=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ir=r.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  ${je}

  .react-datepicker__current-month {
    display: none;
  }
`,Lr=r.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Rr=r.div`
  position: relative;
  flex-shrink: 0;
`,zr=r.button`
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
`,Br=r.div`
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
`,Vr=r.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Hr=r.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Ur=r.li`
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
`,Wr=r.button`
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
`,Gr=r.div`
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
`,Kr=r.ul`
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
`,qr=r.li`
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
`,Jr=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],Yr=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of Jr){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},Xr=({context:e,refreshKey:t,onOccurrencesChanged:n})=>{let r=(0,P.useRef)(null),[i,a]=(0,P.useState)([]),[o,s]=(0,P.useState)(null),[c,u]=(0,P.useState)(null),d=(0,P.useRef)(0),f=L(X.state),p=L(J.formats),m=e=>v(e,p),h=(0,P.useCallback)(()=>st(r.current)?.settings.elementId??e.eventId,[e.eventId]),g=(0,P.useCallback)(async()=>{let t=h();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let r=await we(n,{headers:{Accept:`application/json`}});if(!r.ok)return;let i=(await r.json()).occurrences??[];++d.current,a(i),u(null)},[e.siteId,h]);(0,P.useEffect)(()=>{g()},[g,t]);let _=(0,P.useCallback)(async()=>{let t=h();if(!t)return;let n=++d.current,i=await we(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...Yr(r.current)})});if(!i.ok)return;let a=await i.json();n===d.current&&u(new Set(a.orphaned??[]))},[e.siteId,h]);(0,P.useEffect)(()=>{if(++d.current,i.length===0)return;let e=setTimeout(()=>void _(),400);return()=>clearTimeout(e)},[f,i,_]);let y=e=>c?c.has(e.recurrenceId):e.orphaned;(0,P.useEffect)(()=>{n?.(i.map(e=>({...e,orphaned:c?c.has(e.recurrenceId):e.orphaned})))},[i,c,n]);let b=async t=>{s(t.recurrenceId);try{let n=await ct(r.current);if(!n)return;Se({eventId:n,recurrenceId:t.recurrenceId,siteId:e.siteId,onSave:()=>void g()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{s(null)}},x=async t=>{if(window.confirm(l(`Remove everything this occurrence changes?`))){s(t.recurrenceId);try{let n=await ct(r.current);if(!n)return;let i=await we(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||l(`Couldn’t reset the occurrence.`));return}await g()}catch{Craft.cp.displayError(l(`Couldn’t reset the occurrence.`))}finally{s(null)}}};return(0,Z.jsx)(Gr,{ref:r,children:i.length>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Nr,{as:`h3`,children:l(`Edited occurrences`)}),(0,Z.jsx)(Pr,{children:l(`Occurrences with their own changes. Changes made here go live with the event.`)}),i.some(y)&&(0,Z.jsx)(Pr,{className:`warning`,children:l(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,Z.jsx)(Kr,{children:i.map(e=>(0,Z.jsxs)(qr,{className:O(y(e)&&`is-orphaned`,e.cancelled&&`is-cancelled`),children:[(0,Z.jsxs)(`div`,{className:`occurrence-details`,children:[(0,Z.jsx)(`span`,{className:`occurrence-title`,children:e.title}),e.cancelled&&(0,Z.jsx)(`span`,{className:`occurrence-state cancelled`,children:l(`Cancelled`)}),y(e)&&(0,Z.jsx)(`span`,{className:`occurrence-state`,children:l(`No longer on the schedule`)})]}),(0,Z.jsx)(`div`,{className:`occurrence-date`,children:m(e)}),(0,Z.jsx)(`div`,{className:`occurrence-changes`,children:(0,Z.jsx)(`span`,{children:e.changes.join(`, `)})}),(0,Z.jsxs)(`div`,{className:`occurrence-actions`,children:[!y(e)&&(0,Z.jsx)(Wr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":l(`Edit occurrence on {date}`,{date:m(e)}),title:l(`Edit occurrence`),disabled:o!==null,onClick:()=>void b(e)}),(0,Z.jsx)(Wr,{type:`button`,className:`icon occurrence-discard`,"data-icon":`remove`,"aria-label":`${l(`Discard`)}: ${m(e)}`,title:l(`Removes everything this occurrence changes.`),disabled:o!==null,onClick:()=>void x(e)})]})]},e.recurrenceId))})]})})},Zr=r.div`
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
`,Qr=r.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  margin-top: 10px;
  width: 455px;
  max-width: 100%;
  box-sizing: border-box;
`,$r=r.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,ei=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,ti=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,ni=r.div`
  min-width: max-content;
  flex: 1;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,ri=r.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,ii=r.li`
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
`,ai=r.ul`
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
`,oi=(e,t=[])=>{let n=[],r=(e,t,r)=>{e>0&&n.push(l(e===1?t:r,{count:e}))},i=(e.recurrenceSet?.rdates()??[]).filter(t=>{let n=ae(e,t);return n.full&&!n.base&&n.timestamp!==e.startTimestamp}).length,a=(e.recurrenceSet?.exdates()??[]).filter(t=>ae(e,t).excluded).length,o=t.filter(e=>!e.orphaned);return r(i,`{count} additional date`,`{count} additional dates`),r(a,`{count} excluded date`,`{count} excluded dates`),r(o.filter(e=>!e.cancelled).length,`{count} edited occurrence`,`{count} edited occurrences`),r(o.filter(e=>e.cancelled).length,`{count} cancelled occurrence`,`{count} cancelled occurrences`),r(t.filter(e=>e.orphaned).length,`{count} edit off schedule`,`{count} edits off schedule`),n},si=(e,t,n,r=`PP`,i=`PPp`)=>{let a=e=>A(o(e),n?r:i,{locale:f()});return e?.splitAt?l(`This draft changes the series from {date} onward.`,{date:a(e.splitAt)}):e?.series?.later?l(`This part of the series starts on {start} and ends before {end}.`,{start:a(t),end:a(e.series.later.start)}):e?.series?.earlier?l(`This part of the series starts on {date}.`,{date:a(t)}):null},ci=8,li=({context:e,onOccurrenceSaved:n,editedOccurrences:r})=>{let i=(0,P.useRef)(null),[a,o]=(0,P.useState)(!1),s=I(),c=L(J.weekStartDay),u=L(J.formats),d=u?.date.short.icu??`P`,p=u?.datetime?.short.icu??`Pp`,m=L(X.state),{start:g,rrule:v}=m,y=!!(e?.eventId&&v),[b,x]=(0,P.useState)(null),S=(0,P.useMemo)(()=>ne(v,g),[v,g]),C=(0,P.useMemo)(()=>new Set(r?.filter(e=>e.cancelled&&!e.orphaned).map(e=>e.recurrenceId.replace(` `,`T`))),[r]),ee=e=>{let t=le(S,e);return t!==null&&C.has(t)},te=(0,P.useMemo)(()=>ce(S,b),[S,b]),w=(0,P.useMemo)(()=>fe(S,b?.start??null,ci),[S,b]),T=(0,P.useMemo)(()=>ie(S,d),[S,d]),re=(0,P.useMemo)(()=>{let e=me(S,w.length);return e?he(e):null},[S,w]),oe=(0,P.useMemo)(()=>oi(S,r),[S,r]),se=si(e,g,m.allDay,d,p),E=(0,P.useCallback)((e,t,n)=>{s(Y.setRRule(de(m,S,e,t,n)))},[s,S,m]),ue=(0,P.useCallback)(e=>{let t=_e(S,e);if(t){let{timestamp:n}=ae(S,e);E(t,n,t===`exdate`)}},[E,S]),pe=(0,P.useCallback)(e=>{let t=ae(S,e);if(t.base&&t.excluded){E(`exdate`,t.timestamp,!1);return}if(t.full){ue(e);return}t.full||E(`rdate`,t.timestamp,!0)},[E,S,ue]),ge=(0,P.useCallback)(e=>ae(S,e),[S]),D=async t=>{if(!(!e||a)){o(!0);try{Se({eventId:await ct(i.current),recurrenceId:t,siteId:e.siteId,onSave:()=>n?.()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{o(!1)}}};return(0,Z.jsx)(Zr,{ref:i,children:(0,Z.jsxs)(Ne,{children:[(0,Z.jsxs)(j,{$direction:`column`,$gap:10,children:[(0,Z.jsx)($r,{children:l(`Schedule Preview`)}),T&&(0,Z.jsx)(ei,{children:T})]}),oe.length>0&&(0,Z.jsx)(ai,{"aria-label":l(`Schedule changes`),children:oe.map(e=>(0,Z.jsx)(`li`,{children:e},e))}),se&&(0,Z.jsx)(ei,{children:se}),(0,Z.jsxs)(Qr,{children:[(0,Z.jsxs)(j,{$direction:`column`,$gap:10,children:[(0,Z.jsx)(Ce,{...h(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[xe,Te],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(f().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:c,timeZone:`UTC`,eventDisplay:`none`,events:te,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>x({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=ge(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``,ee(e.date)?`fc-cancelled-date`:``].filter(Boolean)},dayCellContent:e=>{let t=ee(e.date),n=t?l(`Cancelled`):void 0;return(0,Z.jsxs)(`span`,{title:n,children:[e.dayNumberText,t&&(0,Z.jsxs)(`span`,{className:`cancelled-date-label`,children:[`, `,n]})]})},dateClick:e=>pe(e.date)}),re&&(0,Z.jsx)(ti,{children:re})]}),(0,Z.jsx)(ni,{children:w.length===0?(0,Z.jsxs)(`p`,{children:[l(`No occurrences starting from`),(0,Z.jsx)(`br`,{}),A(t(b?.currentStart??new Date),`PP`,{locale:f()})]}):(0,Z.jsx)(ri,{$count:w.length,children:w.map(e=>{let n=new Date(e*1e3),r=ee(n),i=A(t(n),d,{locale:f()}),o=_e(S,n),s=y?le(S,n):null,c=l(o===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:i});return(0,Z.jsxs)(ii,{className:r?`is-cancelled`:void 0,children:[(0,Z.jsxs)(`span`,{className:`occurrence-date`,children:[(0,Z.jsx)(`span`,{children:i}),r&&(0,Z.jsx)(`span`,{className:`occurrence-state`,children:l(`Cancelled`)})]}),(0,Z.jsxs)(`div`,{className:`occurrence-actions`,children:[s&&(0,Z.jsx)(Wr,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":l(`Edit occurrence on {date}`,{date:i}),title:l(`Edit occurrence`),disabled:a,onClick:()=>void D(s)}),o&&(0,Z.jsx)(Wr,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:a,"aria-label":c,title:c,onClick:()=>ue(n)})]})]},_(n))})})})]})]})})},ui=({context:e,refreshKey:t})=>{let n=L(X.state),{showOverlapWarnings:r,formats:i}=L(J.config),a=(0,P.useRef)(null),o=(0,P.useCallback)(()=>st(a.current)?.settings.elementId??e?.eventId,[e?.eventId]);return e?.calendarId?(0,Z.jsx)(`div`,{ref:a,style:{padding:r?`0 20px 12px`:`0 20px`,marginTop:r?-8:0},children:(0,Z.jsx)(y,{formats:i,enabled:r,schedule:{...n,rrule:n.rrule??``,calendarId:e.calendarId,siteId:e.siteId},resolveEventId:o,refreshKey:t})}):null},di=r.div`
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
`,fi=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,pi=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,mi=e=>g(ke(o(e),1)),hi=(e,t,n)=>{let r=_i(t,n);return e.getTime()>=r.getTime()},gi=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return g(De(M(o(e)),1));let i=o(e),a=_i(t,r);return i.getTime()>=a.getTime()?e:g(a)},_i=(e,t)=>Ie(o(e),t),vi=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},yi=({inputValue:e,value:t,min:n})=>{let r=vi(e)??n??t??0;return n===void 0?r:Math.max(r,n)},bi=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,P.useState)(e?.toString()??``),o=(0,P.useRef)(void 0),s=(0,P.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,P.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,P.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,P.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,P.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=vi(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,P.useCallback)(n=>{n.stopPropagation();let r=yi({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},xi=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=bi({value:e,min:t,debounceMs:n,onChange:r});return(0,Z.jsx)(Ne,{...i,children:(0,Z.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Si=()=>null,Ci=[{value:`MO`,label:`Monday`,days:[C.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[C.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[C.WE.weekday]},{value:`TH`,label:`Thursday`,days:[C.TH.weekday]},{value:`FR`,label:`Friday`,days:[C.FR.weekday]},{value:`SA`,label:`Saturday`,days:[C.SA.weekday]},{value:`SU`,label:`Sunday`,days:[C.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[C.MO.weekday,C.TU.weekday,C.WE.weekday,C.TH.weekday,C.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[C.SA.weekday,C.SU.weekday]}],wi=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},Ti=(e,t)=>{let n=wi(e),r=wi(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Ei=(e,t)=>{if(e){let t=Ci.find(t=>Ti(t.days,e));if(t)return t.value}if(t!==void 0){let e=Ci.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Ci[0].value},Di=e=>Ci.find(t=>t.value===e)?.days??[C.MO.weekday],Q=`5px`,Oi=r.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,ki=r(Oi)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,Ai=r(Oi)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,ji=r.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,Mi=r(ji)`
  grid-template-columns: repeat(7, 1fr);

  ${Oi} {
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
`,Ni=r(ji)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${Oi} {
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
`,Pi=r(ji)`
  grid-template-columns: repeat(4, 1fr);

  ${Oi} {
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
`,Fi=({label:e,values:t,onChange:n})=>(0,Z.jsx)(Ne,{label:e,children:(0,Z.jsxs)(Mi,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,Z.jsx)(ki,{type:`button`,className:O(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,Z.jsx)(Ai,{},e))]})}),Ii=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],Li=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Ri=()=>{let e=I(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=L(X.state),a=o(t),s=a.getDate(),c=(a.getDay()+6)%7,l=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[s],d=i?.[0]??1,f=Ei(r,c),p=t=>{e(Y.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(Y.setByRules({bymonthday:void 0,byweekday:Di(t),bysetpos:[n]}))};return(0,Z.jsxs)(j,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Repeat on`,value:l,options:Ii,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,Z.jsx)(Fi,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,Z.jsxs)(j,{children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Position`,value:d,options:Li,onChange:e=>m(f,Number.parseInt(e,10))}),(0,Z.jsx)(N,{translateOptions:!0,label:`Day`,value:f,options:Ci.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},zi=[{weekday:C.SU,label:`Sun`},{weekday:C.MO,label:`Mon`},{weekday:C.TU,label:`Tue`},{weekday:C.WE,label:`Wed`},{weekday:C.TH,label:`Thu`},{weekday:C.FR,label:`Fri`},{weekday:C.SA,label:`Sat`}],Bi=()=>{let e=I(),{byweekday:t}=L(X.state);return(0,Z.jsx)(j,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,Z.jsx)(Ne,{label:`On`,children:(0,Z.jsx)(Ni,{children:zi.map(({weekday:n,label:r})=>(0,Z.jsx)(ki,{type:`button`,className:O(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(Y.setDays({type:`byweekday`,values:r}))},children:l(r)},n.weekday))})})})},Vi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],Hi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Ui=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],Wi=()=>{let e=I(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=L(X.state),s=o(t),c=s.getDate(),u=s.getMonth()+1,d=(s.getDay()+6)%7,f=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,p=r?.length?r:[c],m=n?.length?n:[u],h=a?.[0]??1,g=Ei(i,d),_=(t,n)=>{e(Y.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(t,n,r)=>{e(Y.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:Di(n),bysetpos:[r]}))};return(0,Z.jsxs)(j,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(Ne,{label:`Month`,children:(0,Z.jsx)(Pi,{children:Ui.map(e=>{let t=m.includes(e.value);return(0,Z.jsx)(ki,{type:`button`,className:O(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:l(e.label)},e.value)})})}),(0,Z.jsx)(N,{translateOptions:!0,label:`Repeat on`,value:f,options:Vi,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,Z.jsx)(Fi,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,Z.jsxs)(j,{children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Position`,value:h,options:Hi,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,Z.jsx)(N,{translateOptions:!0,label:`Day`,value:g,options:Ci.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},Gi=()=>{let{freq:e}=L(X.state);return e===b.DAILY?(0,Z.jsx)(Si,{}):e===b.WEEKLY?(0,Z.jsx)(Bi,{}):e===b.MONTHLY?(0,Z.jsx)(Ri,{}):e===b.YEARLY?(0,Z.jsx)(Wi,{}):null},Ki=e=>(0,Z.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Z.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),qi=e=>(0,Z.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Z.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Ji=()=>{let e=I(),{interval:t}=L(X.state);return(0,Z.jsxs)(Yi,{children:[(0,Z.jsx)(`span`,{children:l(`Every`)}),(0,Z.jsx)(Xi,{"aria-label":l(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(Y.setInterval(n))}}),(0,Z.jsxs)(Zi,{children:[(0,Z.jsx)(Qi,{type:`button`,"aria-label":l(`Increase interval`),onClick:()=>e(Y.setInterval(t+1)),children:(0,Z.jsx)(qi,{})}),(0,Z.jsx)(Qi,{type:`button`,"aria-label":l(`Decrease interval`),onClick:()=>e(Y.setInterval(t-1)),children:(0,Z.jsx)(Ki,{})})]})]})},Yi=r.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Xi=r.input`
  width: 60px;
`,Zi=r.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Qi=r.button`
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
`,$i=ee({position:[`bottom`,`top`],alignment:`end`,padding:8}),ea=(e,t,n,r)=>{let[i,a]=(0,P.useState)();return(0,P.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=w({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:$i}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},ta=(e,t,n)=>{(0,P.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},na=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:f})=>{let[m,h]=(0,P.useState)(!1),_=(0,P.useRef)(null),v=(0,P.useRef)(null),y=(0,P.useRef)(null),b=ea(m,v,y,_);return(0,P.useEffect)(()=>{a.length===0&&h(!1)},[a.length]),ta(m,[v,y],()=>h(!1)),(0,Z.jsxs)(Mr,{children:[(0,Z.jsx)(Nr,{children:l(e)}),t&&(0,Z.jsx)(Pr,{children:l(t)}),(0,Z.jsxs)(Fr,{children:[(0,Z.jsxs)(Rr,{ref:_,children:[(0,Z.jsx)(zr,{ref:v,type:`button`,disabled:a.length===0,className:O({active:m}),onClick:()=>{a.length!==0&&h(e=>!e)},children:a.length}),m&&(0,Z.jsxs)(Br,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,Z.jsx)(Vr,{children:l(i)}),(0,Z.jsx)(Hr,{children:a.map(e=>(0,Z.jsxs)(Ur,{children:[(0,Z.jsx)(`span`,{children:c(e)}),(0,Z.jsx)(`button`,{type:`button`,"aria-label":l(`Remove date {date}`,{date:c(e)}),onClick:()=>f(e),children:`×`})]},e))})]})]}),(0,Z.jsx)(Ir,{children:(0,Z.jsx)(Fe,{...p(),selected:null,onChange:e=>{e&&d(g(M(e)))},customInput:(0,Z.jsx)(ra,{label:n,className:O(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:l(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},ra=(0,P.forwardRef)(({label:e,...t},n)=>(0,Z.jsx)(Lr,{type:`button`,ref:n,...t,children:l(e)}));ra.displayName=`PickerTrigger`;var ia=r.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,aa=()=>{let e=I(),n=L(X.state),{start:r,rrule:i}=n,a=(0,P.useMemo)(()=>ne(i,r),[i,r]),{startTimestamp:o,baseRule:l,recurrenceSet:u}=a,d=(0,P.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>g(M(t(e)))).filter(e=>l?!0:e!==o))).sort((e,t)=>e-t):[],[l,u,o]),f=(0,P.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>g(M(t(e)))))).sort((e,t)=>e-t):[],[u]),p=(0,P.useMemo)(()=>new Set(d),[d]),m=(0,P.useMemo)(()=>new Set(f),[f]),h=(0,P.useCallback)(e=>{let t=s(M(e)),n=c(Ae(e)),r=l?l.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:g(M(e))===o;return{full:i,base:r,excluded:r&&!i}},[l,u,o]),_=r=>{let i=r({baseRule:l,rdates:u?.rdates().filter(e=>l?!0:g(M(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(Y.setRRule(se(n,i.baseRule,oa(i.rdates),oa(i.exdates))))};return{addedDates:d,excludedDates:f,addFixedDate:(e,t)=>{if(e===`exdate`&&oe(a,t))return;let r=E(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:be(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&oe(a,t))return;let r=E(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?be(n,r):n,exdates:e===`exdate`?be(i,r):i}))},canAddOccurrence:(0,P.useCallback)(e=>{let t=g(M(e)),n=h(e);return!n.full&&!n.excluded&&!p.has(t)},[p,h]),canExcludeOccurrence:(0,P.useCallback)(e=>{let t=g(M(e)),n=h(e);return n.base&&!n.excluded&&!m.has(t)&&!oe(a,t)},[m,h,a]),getStatus:h}},oa=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},sa=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],ca=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],la=e=>[{value:b.DAILY,label:e?`Days`:`Day`},{value:b.WEEKLY,label:e?`Weeks`:`Week`},{value:b.MONTHLY,label:e?`Months`:`Month`},{value:b.YEARLY,label:e?`Years`:`Year`}],ua=300,da=()=>{let e=I(),t=L(X.state),n=L(J.weekStartDay),r=L(J.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:s,until:c,freq:l,start:u,interval:d}=t,p=i!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=aa(),b=(0,P.useMemo)(()=>o(u),[u]),x=e=>A(o(e),r,{locale:f()});return(0,Z.jsxs)(ia,{children:[(0,Z.jsxs)(j,{$alignItems:`end`,style:{width:`100%`},children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Repeats`,value:i,options:sa,onChange:t=>e(Y.setRepeatType(t))}),i===`CUSTOM`&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Ji,{}),(0,Z.jsx)(N,{translateOptions:!0,label:``,value:l,options:la(d>1),onChange:t=>e(Y.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,Z.jsx)(Gi,{}),i!==`NEVER`&&(0,Z.jsxs)(j,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,Z.jsx)(N,{translateOptions:!0,label:`Ends`,options:ca,value:a,onChange:t=>e(Y.setRepeatEndType(t))}),a===`AFTER`&&(0,Z.jsx)(xi,{label:`Times`,value:s,min:1,debounceMs:ua,onChange:t=>e(Y.setCount(t))}),a===`ON_DATE`&&(0,Z.jsx)(Pe,{label:``,value:c||null,onChange:t=>e(Y.setUntil(t)),datePickerProps:{dateFormat:r,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:b}})]}),(0,Z.jsxs)(j,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,Z.jsx)(na,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:x,filterDate:v,weekStartDay:n,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),p&&(0,Z.jsx)(na,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:x,filterDate:y,weekStartDay:n,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},fa=({context:e,onOccurrenceSaved:t})=>{let n=(0,P.useId)(),r=(0,P.useId)(),i=(0,P.useId)(),[a,s]=(0,P.useState)(0),[c,u]=(0,P.useState)([]),d=I(),{start:f,end:p,allDay:m}=L(X.state),{date:h,time:g,datetime:_}=L(J.formats),v=L(J.weekStartDay),y=L(J.timeInterval),b=L(J.eventDuration),x=(0,P.useMemo)(()=>m?h.short.icu:_.short.icu,[m,h,_]),S=(0,P.useMemo)(()=>m?mi(p):p,[m,p]);return(0,Z.jsxs)(di,{children:[(0,Z.jsxs)(fi,{children:[(0,Z.jsxs)(pi,{children:[(0,Z.jsx)(Pe,{id:r,label:`Starts`,value:f,onChange:e=>d(Y.setStart(e)),datePickerProps:{id:r,showIcon:!0,icon:(0,Z.jsx)(Ee,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:g.short.icu,todayButton:l(`Today`),calendarStartDay:v,timeIntervals:y}}),(0,Z.jsx)(Pe,{id:i,label:`Ends`,value:S,onChange:e=>{e!=null&&d(Y.setEnd(gi({value:e,start:f,allDay:m,timeInterval:y})))},datePickerProps:{id:i,showIcon:!0,icon:(0,Z.jsx)(Ee,{}),toggleCalendarOnIconClick:!0,minDate:o(f),showTimeSelect:!m,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:x,timeFormat:g.short.icu,todayButton:l(`Today`),calendarStartDay:v,timeIntervals:y,filterTime:e=>hi(new Date(e),f,y)}}),(0,Z.jsx)(Me,{id:n,label:`All Day`,enabled:m,style:{margin:0},onClick:e=>d(Y.setAllDay({enabled:e,eventDuration:b}))})]}),(0,Z.jsx)(ui,{context:e,refreshKey:a}),(0,Z.jsx)(da,{}),e?.eventId&&(0,Z.jsx)(Xr,{context:e,refreshKey:a,onOccurrencesChanged:u})]}),(0,Z.jsx)(li,{context:e,editedOccurrences:c,onOccurrenceSaved:()=>{s(e=>e+1),t?.()}})]})},pa=r.div`
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
`,ma=r.div`
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
`,ha=({context:e})=>{let{allDay:n}=L(X.state),r=L(J.formats),i=(e,n=!1)=>A(t(new Date(e*1e3)),n?r?.datetime.short.icu??`Pp`:r?.date.short.icu??`P`,{locale:f()}),{splitAt:a,series:o}=e,s=o?.earlier??null,c=o?.later??null;return!a&&!s&&!c?null:(0,Z.jsxs)(ma,{children:[a&&(0,Z.jsx)(`p`,{children:l(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:i(a,!n)})}),(s||c)&&(0,Z.jsxs)(`nav`,{children:[(0,Z.jsx)(`span`,{children:l(`Part of a series`)}),s&&(0,Z.jsxs)(`a`,{href:s.url,children:[`← `,l(`Earlier part, from {date}`,{date:i(s.start)})]}),c&&(0,Z.jsxs)(`a`,{href:c.url,children:[l(`Later part, from {date}`,{date:i(c.start)}),` →`]})]})]})},ga=({context:e})=>{let{rrule:n}=L(X.state),r=(0,P.useMemo)(pt,[]),i=n?ve(n,{forceset:!0}).all((e,t)=>t<10).map(e=>`${A(t(e),`yyyy-MM-dd HH:mm`)} [${Le(e)}]`):[];return(0,Z.jsx)(te,{children:(0,Z.jsxs)(pa,{children:[e&&(0,Z.jsx)(ha,{context:e}),(0,Z.jsx)(jr,{context:e}),(0,Z.jsx)(fa,{context:e}),r&&(0,Z.jsxs)(`code`,{children:[(0,Z.jsx)(`pre`,{children:n}),(0,Z.jsx)(`pre`,{children:JSON.stringify(i,null,2)})]})]})})},_a=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,va(n)),$(t,`end`,va(r)),$(t,`until`,i?va(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},va=e=>A(o(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},ya=e=>{let t={app:e.app,event:ue(e.event)};return $n({reducer:{app:Cr,event:Tr},preloadedState:t})},ba=new WeakSet,xa=e=>{if(ba.has(e))return;ba.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=ya(r),a=Be.createRoot(n);i.subscribe(()=>{_a(i,e)}),_a(i,e),a.render((0,Z.jsx)($e,{store:i,children:(0,Z.jsx)(ga,{context:r.context})}))},Sa=(e=document)=>{e.querySelectorAll(`[data-calendar-transfer-select]`).forEach(ut),e.querySelectorAll(`[data-calendar-transfer]`).forEach(ft),e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(xa)},Ca=()=>{Sa(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-calendar-transfer-select]`)&&ut(e),e.matches(`[data-calendar-transfer]`)&&ft(e),e.matches(`[data-event-builder]`)&&xa(e),Sa(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Ca):Ca();