import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,g as c,i as l,j as u,n as d,r as f,s as p,t as m,v as h,y as g}from"./localization-Dt_HqhpZ.js";import{C as _,S as v,T as y,_ as b,a as ee,b as te,c as ne,d as re,f as ie,g as ae,h as x,i as oe,l as se,m as S,n as ce,o as le,p as ue,r as de,s as fe,t as pe,u as me,v as he,x as C,y as ge}from"./calendar-preview.operations-BIHfc-I8.js";import{d as _e,f as ve,s as ye,u as be}from"./calendar.events-Dj_r9DHe.js";import{t as xe}from"./interaction-D6rn368C.js";import{a as Se,b as Ce,c as we,f as Te,g as Ee,h as w,i as De,l as T,m as E,n as Oe,o as ke,p as Ae,r as D,s as O,t as k,v as je,y as A}from"./components-B8LQaiF0.js";function Me(e,t){let n=p(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=w(n.getDate(),2),t=w(n.getMonth()+1,2);a=`${w(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=w(Math.trunc(t/60),2),r=w(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=w(n.getHours(),2),r=w(n.getMinutes(),2),i=w(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Ne=u((t=>{var n=e();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Pe=u(((e,t)=>{t.exports=Ne()})),Fe=i(n()),j=i(e(),1),Ie=Pe();function Le(e){e()}function Re(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Le(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var ze={notify(){},get:()=>[]};function Be(e,t){let n,r=ze,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Re())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=ze)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Ve=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,He=typeof navigator<`u`&&navigator.product===`ReactNative`,Ue=Ve||He?j.useLayoutEffect:j.useEffect,We=Symbol.for(`react-redux-context`),Ge=typeof globalThis<`u`?globalThis:{};function Ke(){if(!j.createContext)return{};let e=Ge[We]??(Ge[We]=new Map),t=e.get(j.createContext);return t||(t=j.createContext(null),e.set(j.createContext,t)),t}var M=Ke();function qe(e){let{children:t,context:n,serverState:r,store:i}=e,a=j.useMemo(()=>{let e=Be(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=j.useMemo(()=>i.getState(),[i]);Ue(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||M;return j.createElement(s.Provider,{value:a},t)}var Je=qe;function Ye(e=M){return function(){return j.useContext(e)}}var Xe=Ye();function Ze(e=M){let t=e===M?Xe:Ye(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Qe=Ze();function $e(e=M){let t=e===M?Qe:Ze(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var N=$e(),et=(e,t)=>e===t;function tt(e=M){let t=e===M?Xe:Ye(e),n=(e,n={})=>{let{equalityFn:r=et}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();j.useRef(!0);let s=j.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Ie.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return j.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var P=tt(),nt=()=>!1,rt=r.div`
  &:empty {
    display: none;
  }

  margin-top: 24px;

  h3 {
    margin: 0 0 4px;
  }

  > p {
    margin: 0 0 10px;
    color: var(--gray-600);
  }
`,it=r.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--gray-200);
  border-radius: var(--large-border-radius, 5px);
`,at=r.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  &.is-orphaned .date {
    color: var(--gray-500);
  }

  .details {
    flex: 1 1 auto;
    min-width: 0;
  }

  .date {
    font-weight: 600;
  }

  .changes {
    color: var(--gray-600);
    font-size: 13px;
  }

  .state {
    margin-inline-start: 6px;
    font-weight: 400;
    color: var(--gray-600);
  }

  .actions {
    display: flex;
    flex: 0 0 auto;
    gap: 6px;
  }
`,F=a(),ot=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`form`).data(`elementEditor`)},st=e=>E(t(new Date(e.start*1e3)),e.allDay?`EEE, PP`:`EEE, PP, p`,{locale:d()}),ct=({context:e})=>{let t=(0,j.useRef)(null),[n,r]=(0,j.useState)([]),[i,a]=(0,j.useState)(null),o=(0,j.useCallback)(()=>ot(t.current)?.settings.elementId??e.eventId,[e.eventId]),s=(0,j.useCallback)(async()=>{let t=o();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let i=await be(n,{headers:{Accept:`application/json`}});if(!i.ok)return;let a=await i.json();r(a.occurrences??[])},[e.siteId,o]);(0,j.useEffect)(()=>{s()},[s]);let c=async()=>{let n=ot(t.current);return await n?.ensureIsDraftOrRevision(),n?.settings.elementId??e.eventId},u=async t=>{let n=await c();n&&ye({eventId:n,recurrenceId:t.recurrenceId,siteId:e.siteId,onSave:()=>void s()})},d=async t=>{if(window.confirm(l(`Remove everything this occurrence changes?`))){a(t.recurrenceId);try{let n=await c();if(!n)return;if(!(await be(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:t.recurrenceId})})).ok){Craft.cp.displayError(l(`Couldn’t reset the occurrence.`));return}await s()}finally{a(null)}}};return(0,F.jsx)(rt,{ref:t,children:n.length>0&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`h3`,{children:l(`Edited occurrences`)}),(0,F.jsx)(`p`,{children:l(`Occurrences with their own changes. Changes made here go live with the event.`)}),(0,F.jsx)(it,{children:n.map(e=>(0,F.jsxs)(at,{className:T(e.orphaned&&`is-orphaned`),children:[(0,F.jsxs)(`div`,{className:`details`,children:[(0,F.jsxs)(`div`,{className:`date`,children:[st(e),e.cancelled&&(0,F.jsx)(`span`,{className:`state`,children:l(`Cancelled`)}),e.orphaned&&(0,F.jsx)(`span`,{className:`state`,children:l(`No longer on the schedule`)})]}),e.title&&(0,F.jsx)(`div`,{children:e.title}),e.changes.length>0&&(0,F.jsx)(`div`,{className:`changes`,children:e.changes.join(`, `)})]}),(0,F.jsxs)(`div`,{className:`actions`,children:[!e.orphaned&&(0,F.jsx)(`button`,{type:`button`,className:`btn small`,disabled:i!==null,onClick:()=>void u(e),children:l(`Edit`)}),(0,F.jsx)(`button`,{type:`button`,className:T(`btn small`,i!==null&&`disabled`),disabled:i!==null,onClick:()=>void d(e),children:l(`Discard`)})]})]},e.recurrenceId))})]})})};function I(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var lt=typeof Symbol==`function`&&Symbol.observable||`@@observable`,ut=()=>Math.random().toString(36).substring(7).split(``).join(`.`),dt={INIT:`@@redux/INIT${ut()}`,REPLACE:`@@redux/REPLACE${ut()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${ut()}`};function ft(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function pt(e,t,n){if(typeof e!=`function`)throw Error(I(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(I(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(I(1));return n(pt)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(I(3));return i}function d(e){if(typeof e!=`function`)throw Error(I(4));if(c)throw Error(I(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(I(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!ft(e))throw Error(I(7));if(e.type===void 0)throw Error(I(8));if(typeof e.type!=`string`)throw Error(I(17));if(c)throw Error(I(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(I(10));r=e,f({type:dt.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(I(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[lt](){return this}}}return f({type:dt.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[lt]:m}}function mt(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:dt.INIT})===void 0)throw Error(I(12));if(n(void 0,{type:dt.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(I(13))})}function ht(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{mt(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(I(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function gt(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function _t(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(I(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=gt(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function vt(e){return ft(e)&&`type`in e&&typeof e.type==`string`}var yt=Symbol.for(`immer-nothing`),bt=Symbol.for(`immer-draftable`),L=Symbol.for(`immer-state`);function R(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var z=Object,B=z.getPrototypeOf,xt=`constructor`,St=`prototype`,Ct=`configurable`,wt=`enumerable`,Tt=`writable`,Et=`value`,V=e=>!!e&&!!e[L];function H(e){return e?kt(e)||Ft(e)||!!e[bt]||!!e[xt]?.[bt]||It(e)||Lt(e):!1}var Dt=z[St][xt].toString(),Ot=new WeakMap;function kt(e){if(!e||!Rt(e))return!1;let t=B(e);if(t===null||t===z[St])return!0;let n=z.hasOwnProperty.call(t,xt)&&t[xt];if(n===Object)return!0;if(!W(n))return!1;let r=Ot.get(n);return r===void 0&&(r=Function.toString.call(n),Ot.set(n,r)),r===Dt}function At(e,t,n=!0){U(e)===0?(n?Reflect.ownKeys(e):z.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function U(e){let t=e[L];return t?t.type_:Ft(e)?1:It(e)?2:Lt(e)?3:0}var jt=(e,t,n=U(e))=>n===2?e.has(t):z[St].hasOwnProperty.call(e,t),Mt=(e,t,n=U(e))=>n===2?e.get(t):e[t],Nt=(e,t,n,r=U(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Pt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Ft=Array.isArray,It=e=>e instanceof Map,Lt=e=>e instanceof Set,Rt=e=>typeof e==`object`,W=e=>typeof e==`function`,zt=e=>typeof e==`boolean`;function Bt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var G=e=>e.copy_||e.base_,Vt=e=>e.modified_?e.copy_:e.base_;function Ht(e,t){if(It(e))return new Map(e);if(Lt(e))return new Set(e);if(Ft(e))return Array[St].slice.call(e);let n=kt(e);if(t===!0||t===`class_only`&&!n){let t=z.getOwnPropertyDescriptors(e);delete t[L];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[Tt]===!1&&(a[Tt]=!0,a[Ct]=!0),(a.get||a.set)&&(t[i]={[Ct]:!0,[Tt]:!0,[wt]:a[wt],[Et]:e[i]})}return z.create(B(e),t)}else{let t=B(e);if(t!==null&&n)return{...e};let r=z.create(t);return z.assign(r,e)}}function Ut(e,t=!1){return Kt(e)||V(e)||!H(e)?e:(U(e)>1&&z.defineProperties(e,{set:Gt,add:Gt,clear:Gt,delete:Gt}),z.freeze(e),t&&At(e,(e,t)=>{Ut(t,!0)},!1),e)}function Wt(){R(2)}var Gt={[Et]:Wt};function Kt(e){return e===null||!Rt(e)?!0:z.isFrozen(e)}var qt=`MapSet`,Jt=`Patches`,Yt=`ArrayMethods`,Xt={};function K(e){let t=Xt[e];return t||R(0,e),t}var Zt=e=>!!Xt[e],Qt,$t=()=>Qt,en=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:Zt(qt)?K(qt):void 0,arrayMethodsPlugin_:Zt(Yt)?K(Yt):void 0});function tn(e,t){t&&(e.patchPlugin_=K(Jt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function nn(e){rn(e),e.drafts_.forEach(on),e.drafts_=null}function rn(e){e===Qt&&(Qt=e.parent_)}var an=e=>Qt=en(Qt,e);function on(e){let t=e[L];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function sn(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[L].modified_&&(nn(t),R(4)),H(e)&&(e=cn(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[L].base_,e,t)}else e=cn(t,n);return ln(t,e,!0),nn(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===yt?void 0:e}function cn(e,t){if(Kt(t))return t;let n=t[L];if(!n)return _n(t,e.handledSet_,e);if(!dn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);hn(n,e)}return n.copy_}function ln(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Ut(t,n)}function un(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var dn=(e,t)=>e.scope_===t,fn=[];function pn(e,t,n,r){let i=G(e),a=e.type_;if(r!==void 0&&Mt(i,r,a)===t){Nt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;At(i,(e,n)=>{if(V(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??fn;for(let e of o)Nt(i,e,n,a)}function mn(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!dn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Vt(i);pn(e,i.draft_??i,a,n),hn(i,r)})}function hn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}un(e)}}function gn(e,t,n){let{scope_:r}=e;if(V(n)){let i=n[L];dn(i,r)&&i.callbacks_.push(function(){Tn(e),pn(e,n,Vt(i),t)})}else H(n)&&e.callbacks_.push(function(){let i=G(e);e.type_===3?i.has(n)&&_n(n,r.handledSet_,r):Mt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&_n(Mt(e.copy_,t,e.type_),r.handledSet_,r)})}function _n(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||V(e)||t.has(e)||!H(e)||Kt(e)?e:(t.add(e),At(e,(r,i)=>{if(V(i)){let t=i[L];dn(t,n)&&(Nt(e,r,Vt(t),e.type_),un(t))}else H(i)&&_n(i,t,n)}),e)}function vn(e,t){let n=Ft(e),r={type_:+!!n,scope_:t?t.scope_:$t(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=yn;n&&(i=[r],a=bn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var yn={get(e,t){if(t===L)return e;if(t===`constructor`||t===`__proto__`){let n=G(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=G(e);if(!jt(i,t,e.type_))return Sn(e,i,t);let a=i[t];if(e.finalized_||!H(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Bt(t))return a;if(a===xn(e.base_,t)){Tn(e);let n=e.type_===1?+t:t,r=Dn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in G(e)},ownKeys(e){return Reflect.ownKeys(G(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=Cn(G(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=xn(G(e),t),i=r?.[L];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Pt(n,r)&&(n!==void 0||jt(e.base_,t,e.type_)))return!0;Tn(e),wn(e)}return e.copy_[t]===n&&(n!==void 0||jt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),gn(e,t,n),!0)},deleteProperty(e,t){return Tn(e),xn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),wn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=G(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Tt]:!0,[Ct]:e.type_!==1||t!==`length`,[wt]:r[wt],[Et]:n[t]}},defineProperty(){R(11)},getPrototypeOf(e){return B(e.base_)},setPrototypeOf(){R(12)}},bn={};for(let e in yn){let t=yn[e];bn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}bn.deleteProperty=function(e,t){return bn.set.call(this,e,t,void 0)},bn.set=function(e,t,n){return yn.set.call(this,e[0],t,n,e[0])};function xn(e,t){let n=e[L];return(n?G(n):e)[t]}function Sn(e,t,n){let r=Cn(t,n);return r?Et in r?r[Et]:r.get?.call(e.draft_):void 0}function Cn(e,t){if(!(t in e))return;let n=B(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=B(n)}}function wn(e){e.modified_||(e.modified_=!0,e.parent_&&wn(e.parent_))}function Tn(e){e.copy_||(e.assigned_=new Map,e.copy_=Ht(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var En=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(W(e)&&!W(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}W(t)||R(6),n!==void 0&&!W(n)&&R(7);let r;if(H(e)){let i=an(this),a=Dn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?nn(i):rn(i)}return tn(i,n),sn(r,i)}else if(!e||!Rt(e)){if(r=t(e),r===void 0&&(r=e),r===yt&&(r=void 0),this.autoFreeze_&&Ut(r,!0),n){let t=[],i=[];K(Jt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else R(1,e)},this.produceWithPatches=(e,t)=>{if(W(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},zt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),zt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),zt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){H(e)||R(8),V(e)&&(e=On(e));let t=an(this),n=Dn(t,e,void 0);return n[L].isManual_=!0,rn(t),n}finishDraft(e,t){let n=e&&e[L];(!n||!n.isManual_)&&R(9);let{scope_:r}=n;return tn(r,t),sn(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=K(Jt).applyPatches_;return V(e)?r(e,t):this.produce(e,e=>r(e,t))}};function Dn(e,t,n,r){let[i,a]=It(t)?K(qt).proxyMap_(t,n):Lt(t)?K(qt).proxySet_(t,n):vn(t,n);return(n?.scope_??$t()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?mn(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function On(e){return V(e)||R(10,e),kn(e)}function kn(e){if(!H(e)||Kt(e))return e;let t=e[L],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Ht(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Ht(e,!0);return At(n,(e,t)=>{Nt(n,e,kn(t))},r),t&&(t.finalized_=!1),n}var An=new En().produce;function jn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Mn=jn(),Nn=jn,Pn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?gt:gt.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Fn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(q(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>vt(t)&&t.type===e,n}var In=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Ln(e){return H(e)?An(e,()=>{}):e}function Rn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function zn(e){return typeof e==`boolean`}var Bn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new In;return t&&(zn(t)?a.push(Mn):a.push(Nn(t.extraArgument))),a},Vn=`RTK_autoBatch`,Hn=e=>t=>{setTimeout(t,e)},Un=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Wn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Un(window.requestAnimationFrame,100):Hn(10):e.type===`callback`?e.queueNotification:Hn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Vn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Gn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new In(e);return n&&r.push(Wn(typeof n==`object`?n:void 0)),r};function Kn(e){let t=Bn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(ft(n))c=ht(n);else throw Error(q(1));let l;l=typeof r==`function`?r(t):t();let u=gt;i&&(u=Pn({trace:!1,...typeof i==`object`&&i}));let d=Gn(_t(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return pt(c,o,p)}function qn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(q(28));if(r in t)throw Error(q(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Jn(e){return typeof e==`function`}function Yn(e,t){let[n,r,i]=qn(t),a;if(Jn(e))a=()=>Ln(e());else{let t=Ln(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(V(e)){let r=n(e,t);return r===void 0?e:r}else if(H(e))return An(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Xn=Symbol.for(`rtk-slice-createasyncthunk`);function Zn(e,t){return`${e}/${t}`}function Qn({creators:e}={}){let t=e?.asyncThunk?.[Xn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(q(11));let i=(typeof e.reducers==`function`?e.reducers(tr()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(q(12));if(n in o.sliceCaseReducersByType)throw Error(q(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:Zn(n,r),createNotation:typeof e.reducers==`function`};rr(a)?ar(o,a,s,t):nr(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?qn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Yn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Rn(d,r,m)),i}function i(t=l){return Rn(Rn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=$n(a,t,()=>Rn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function $n(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var er=Qn();function tr(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function nr({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!ir(r))throw Error(q(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Fn(e,o):Fn(e))}function rr(e){return e._reducerDefinitionType===`asyncThunk`}function ir(e){return e._reducerDefinitionType===`reducerWithPrepare`}function ar({type:e,reducerName:t},n,r,i){if(!i)throw Error(q(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||or,pending:s||or,rejected:c||or,settled:l||or})}function or(){}var sr=`listener`,cr=`completed`,lr=`cancelled`;`${lr}`,`${cr}`,`${sr}${lr}`,`${sr}${cr}`;var{assign:ur}=Object,dr=`listenerMiddleware`,fr=ur(Fn(`${dr}/add`),{withTypes:()=>fr});`${dr}`;var pr=ur(Fn(`${dr}/remove`),{withTypes:()=>pr});function q(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var mr=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),hr=new Set([`NEVER`,`AFTER`,`ON_DATE`]),gr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},_r=e=>mr.has(e)?e:`NEVER`,vr=e=>hr.has(e)?e:`NEVER`,yr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,br=er({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:v.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),r!==void 0&&(e.until=e.start+r),x(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=re(e,n),x(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=o(e.start);a.setHours(i,0,0,0),e.start=h(a);let s=o(e.end);n?s=Ce(A(s),1):(s=Ae(s,1),s=Te(s,a.getHours()),s=je(s,r)),e.end=h(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),x(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=b(e.rrule)),e.repeatType=t.payload,x(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=yr(e.count):e.count=null,x(e)},setFreq:(e,t)=>{e.freq=t.payload,he(e,t.payload),x(e)},setCount:(e,t)=>{e.count=yr(t.payload),x(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),x(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=S(r),x(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=S(n.byweekday)),`bymonth`in n&&(e.bymonth=S(n.bymonth)),`bymonthday`in n&&(e.bymonthday=S(n.bymonthday)),`byyearday`in n&&(e.byyearday=S(n.byyearday)),`bysetpos`in n&&(e.bysetpos=S(n.bysetpos)),x(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:J}=br,xr=br.reducer,Y={state:e=>e.event},Sr=er({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:Cr}=Sr,wr=Sr.reducer,X={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},Tr=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
  flex: 0 0 440px;
  box-sizing: border-box;
    
  @container (min-width: 1024px) {
    width: 440px;
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
`,Er=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  margin-top: 10px;
  width: 400px;
  flex: 0 0 400px;
  box-sizing: border-box;
`,Dr=r.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,Or=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,kr=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Ar=r.div`
  min-width: 120px;
  max-width: 120px;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,jr=r.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 4px;

  height: 100%;
  max-height: 215px;
  margin-top: 0;
`,Mr=r.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 4px 5px 4px 8px;

  font-size: 13px;
  line-height: 13px;
  font-family: monospace;
  white-space: nowrap;

  background-color: var(--gray-050);
  border: 1px solid var(--gray-200);
  border-left: 5px solid var(--gray-200);
`,Nr=r.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 14px;
  height: 13px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 2px;
  background: transparent;
  color: var(--gray-500);
  font: inherit;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: var(--gray-150);
    color: var(--gray-700);
  }

  &:focus-visible {
    outline: 2px solid var(--gray-400);
    outline-offset: 1px;
  }
`,Pr=8,Fr=()=>{let e=N(),n=P(X.weekStartDay),r=P(X.formats)?.date.short.icu??`P`,i=P(Y.state),{start:a,rrule:o}=i,[s,c]=(0,j.useState)(null),u=(0,j.useMemo)(()=>oe(o,a),[o,a]),f=(0,j.useMemo)(()=>de(u,s),[u,s]),p=(0,j.useMemo)(()=>ee(u,s?.start??null,Pr),[u,s]),h=(0,j.useMemo)(()=>fe(u),[u]),_=(0,j.useMemo)(()=>{let e=ce(u,p.length);return e?le(e):null},[u,p]),v=(0,j.useCallback)((t,n,r)=>{e(J.setRRule(pe(i,u,t,n,r)))},[e,u,i]),y=(0,j.useCallback)(e=>{let t=ne(u,e);if(t){let{timestamp:n}=se(u,e);v(t,n,t===`exdate`)}},[v,u]),b=(0,j.useCallback)(e=>{let t=se(u,e);if(t.base&&t.excluded){v(`exdate`,t.timestamp,!1);return}if(t.full){y(e);return}t.full||v(`rdate`,t.timestamp,!0)},[v,u,y]),te=(0,j.useCallback)(e=>se(u,e),[u]);return(0,F.jsx)(Tr,{children:(0,F.jsxs)(O,{children:[(0,F.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,F.jsx)(Dr,{children:l(`Schedule Preview`)}),h&&(0,F.jsx)(Or,{children:h})]}),(0,F.jsxs)(Er,{children:[(0,F.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,F.jsx)(_e,{...m(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[ve,xe],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(d().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:n,timeZone:`UTC`,eventDisplay:`none`,events:f,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>c({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=te(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>b(e.date)}),_&&(0,F.jsx)(kr,{children:_})]}),(0,F.jsx)(Ar,{children:p.length===0?(0,F.jsxs)(`p`,{children:[l(`No occurrences starting from`),(0,F.jsx)(`br`,{}),E(t(s?.currentStart??new Date),`PP`,{locale:d()})]}):(0,F.jsx)(jr,{$count:p.length,children:p.map(e=>{let n=new Date(e*1e3),i=E(t(n),r,{locale:d()}),a=ne(u,n),o=l(a===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:i});return(0,F.jsxs)(Mr,{children:[(0,F.jsx)(`span`,{children:i}),a&&(0,F.jsx)(Nr,{type:`button`,"aria-label":o,title:o,onClick:()=>y(n),children:`×`})]},g(n))})})})]})]})})},Ir=r.div`
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
`,Lr=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,Rr=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,zr=e=>h(Ae(o(e),1)),Br=(e,t,n)=>{let r=Hr(t,n);return e.getTime()>=r.getTime()},Vr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return h(Ce(A(o(e)),1));let i=o(e),a=Hr(t,r);return i.getTime()>=a.getTime()?e:h(a)},Hr=(e,t)=>je(o(e),t),Ur=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Wr=({inputValue:e,value:t,min:n})=>{let r=Ur(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Gr=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,j.useState)(e?.toString()??``),o=(0,j.useRef)(void 0),s=(0,j.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,j.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,j.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,j.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,j.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Ur(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,j.useCallback)(n=>{n.stopPropagation();let r=Wr({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Kr=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Gr({value:e,min:t,debounceMs:n,onChange:r});return(0,F.jsx)(O,{...i,children:(0,F.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},qr=()=>null,Z=[{value:`MO`,label:`Monday`,days:[C.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[C.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[C.WE.weekday]},{value:`TH`,label:`Thursday`,days:[C.TH.weekday]},{value:`FR`,label:`Friday`,days:[C.FR.weekday]},{value:`SA`,label:`Saturday`,days:[C.SA.weekday]},{value:`SU`,label:`Sunday`,days:[C.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[C.MO.weekday,C.TU.weekday,C.WE.weekday,C.TH.weekday,C.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[C.SA.weekday,C.SU.weekday]}],Jr=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},Yr=(e,t)=>{let n=Jr(e),r=Jr(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Xr=(e,t)=>{if(e){let t=Z.find(t=>Yr(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},Zr=e=>Z.find(t=>t.value===e)?.days??[C.MO.weekday],Q=`5px`,Qr=r.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,$r=r(Qr)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,ei=r(Qr)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,ti=r.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,ni=r(ti)`
  grid-template-columns: repeat(7, 1fr);

  ${Qr} {
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
`,ri=r(ti)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${Qr} {
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
`,ii=r(ti)`
  grid-template-columns: repeat(4, 1fr);

  ${Qr} {
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
`,ai=({label:e,values:t,onChange:n})=>(0,F.jsx)(O,{label:e,children:(0,F.jsxs)(ni,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,F.jsx)($r,{type:`button`,className:T(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,F.jsx)(ei,{},e))]})}),oi=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],si=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],ci=()=>{let e=N(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=P(Y.state),a=o(t),s=a.getDate(),c=(a.getDay()+6)%7,l=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[s],d=i?.[0]??1,f=Xr(r,c),p=t=>{e(J.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(J.setByRules({bymonthday:void 0,byweekday:Zr(t),bysetpos:[n]}))};return(0,F.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,F.jsx)(D,{translateOptions:!0,label:`Repeat on`,value:l,options:oi,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,F.jsx)(ai,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,F.jsxs)(k,{children:[(0,F.jsx)(D,{translateOptions:!0,label:`Position`,value:d,options:si,onChange:e=>m(f,Number.parseInt(e,10))}),(0,F.jsx)(D,{translateOptions:!0,label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},li=[{weekday:C.SU,label:`Sun`},{weekday:C.MO,label:`Mon`},{weekday:C.TU,label:`Tue`},{weekday:C.WE,label:`Wed`},{weekday:C.TH,label:`Thu`},{weekday:C.FR,label:`Fri`},{weekday:C.SA,label:`Sat`}],ui=()=>{let e=N(),{byweekday:t}=P(Y.state);return(0,F.jsx)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,F.jsx)(O,{label:`On`,children:(0,F.jsx)(ri,{children:li.map(({weekday:n,label:r})=>(0,F.jsx)($r,{type:`button`,className:T(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(J.setDays({type:`byweekday`,values:r}))},children:l(r)},n.weekday))})})})},di=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],fi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],pi=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],mi=()=>{let e=N(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=P(Y.state),s=o(t),c=s.getDate(),u=s.getMonth()+1,d=(s.getDay()+6)%7,f=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,p=r?.length?r:[c],m=n?.length?n:[u],h=a?.[0]??1,g=Xr(i,d),_=(t,n)=>{e(J.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(t,n,r)=>{e(J.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:Zr(n),bysetpos:[r]}))};return(0,F.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,F.jsx)(O,{label:`Month`,children:(0,F.jsx)(ii,{children:pi.map(e=>{let t=m.includes(e.value);return(0,F.jsx)($r,{type:`button`,className:T(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:l(e.label)},e.value)})})}),(0,F.jsx)(D,{translateOptions:!0,label:`Repeat on`,value:f,options:di,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,F.jsx)(ai,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,F.jsxs)(k,{children:[(0,F.jsx)(D,{translateOptions:!0,label:`Position`,value:h,options:fi,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,F.jsx)(D,{translateOptions:!0,label:`Day`,value:g,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},hi=()=>{let{freq:e}=P(Y.state);return e===v.DAILY?(0,F.jsx)(qr,{}):e===v.WEEKLY?(0,F.jsx)(ui,{}):e===v.MONTHLY?(0,F.jsx)(ci,{}):e===v.YEARLY?(0,F.jsx)(mi,{}):null},gi=e=>(0,F.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,F.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),_i=e=>(0,F.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,F.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),vi=()=>{let e=N(),{interval:t}=P(Y.state);return(0,F.jsxs)(yi,{children:[(0,F.jsx)(`span`,{children:l(`Every`)}),(0,F.jsx)(bi,{"aria-label":l(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(J.setInterval(n))}}),(0,F.jsxs)(xi,{children:[(0,F.jsx)(Si,{type:`button`,"aria-label":l(`Increase interval`),onClick:()=>e(J.setInterval(t+1)),children:(0,F.jsx)(_i,{})}),(0,F.jsx)(Si,{type:`button`,"aria-label":l(`Decrease interval`),onClick:()=>e(J.setInterval(t-1)),children:(0,F.jsx)(gi,{})})]})]})},yi=r.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,bi=r.input`
  width: 60px;
`,xi=r.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Si=r.button`
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
`,Ci=_({position:[`bottom`,`top`],alignment:`end`,padding:8}),wi=(e,t,n,r)=>{let[i,a]=(0,j.useState)();return(0,j.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=y({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Ci}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Ti=(e,t,n)=>{(0,j.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Ei=r.div`
  padding-top: 18px;
  width: 100%;
`,Di=r.div`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`,Oi=r.p`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 400;
`,ki=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ai=r.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  ${Se}

  .react-datepicker__current-month {
    display: none;
  }
`,ji=r.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Mi=r.div`
  position: relative;
  flex-shrink: 0;
`,Ni=r.button`
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
`,Pi=r.div`
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
`,Fi=r.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Ii=r.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Li=r.li`
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
`,Ri=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:p})=>{let[m,g]=(0,j.useState)(!1),_=(0,j.useRef)(null),v=(0,j.useRef)(null),y=(0,j.useRef)(null),b=wi(m,v,y,_);return(0,j.useEffect)(()=>{a.length===0&&g(!1)},[a.length]),Ti(m,[v,y],()=>g(!1)),(0,F.jsxs)(Ei,{children:[(0,F.jsx)(Di,{children:l(e)}),t&&(0,F.jsx)(Oi,{children:l(t)}),(0,F.jsxs)(ki,{children:[(0,F.jsxs)(Mi,{ref:_,children:[(0,F.jsx)(Ni,{ref:v,type:`button`,disabled:a.length===0,className:T({active:m}),onClick:()=>{a.length!==0&&g(e=>!e)},children:a.length}),m&&(0,F.jsxs)(Pi,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,F.jsx)(Fi,{children:l(i)}),(0,F.jsx)(Ii,{children:a.map(e=>(0,F.jsxs)(Li,{children:[(0,F.jsx)(`span`,{children:c(e)}),(0,F.jsx)(`button`,{type:`button`,"aria-label":l(`Remove date {date}`,{date:c(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,F.jsx)(Ai,{children:(0,F.jsx)(we,{...f(),selected:null,onChange:e=>{e&&d(h(A(e)))},customInput:(0,F.jsx)(zi,{label:n,className:T(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:l(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},zi=(0,j.forwardRef)(({label:e,...t},n)=>(0,F.jsx)(ji,{type:`button`,ref:n,...t,children:l(e)}));zi.displayName=`PickerTrigger`;var Bi=r.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,Vi=()=>{let e=N(),n=P(Y.state),{start:r,rrule:i}=n,a=(0,j.useMemo)(()=>oe(i,r),[i,r]),{startTimestamp:o,baseRule:l,recurrenceSet:u}=a,d=(0,j.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>h(A(t(e)))).filter(e=>l?!0:e!==o))).sort((e,t)=>e-t):[],[l,u,o]),f=(0,j.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>h(A(t(e)))))).sort((e,t)=>e-t):[],[u]),p=(0,j.useMemo)(()=>new Set(d),[d]),m=(0,j.useMemo)(()=>new Set(f),[f]),g=(0,j.useCallback)(e=>{let t=s(A(e)),n=c(Ee(e)),r=l?l.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:h(A(e))===o;return{full:i,base:r,excluded:r&&!i}},[l,u,o]),_=r=>{let i=r({baseRule:l,rdates:u?.rdates().filter(e=>l?!0:h(A(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(J.setRRule(ue(n,i.baseRule,Hi(i.rdates),Hi(i.exdates))))};return{addedDates:d,excludedDates:f,addFixedDate:(e,t)=>{if(e===`exdate`&&me(a,t))return;let r=ie(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:ae(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&me(a,t))return;let r=ie(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?ae(n,r):n,exdates:e===`exdate`?ae(i,r):i}))},canAddOccurrence:(0,j.useCallback)(e=>{let t=h(A(e)),n=g(e);return!n.full&&!n.excluded&&!p.has(t)},[p,g]),canExcludeOccurrence:(0,j.useCallback)(e=>{let t=h(A(e)),n=g(e);return n.base&&!n.excluded&&!m.has(t)&&!me(a,t)},[m,g,a]),getStatus:g}},Hi=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},Ui=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],Wi=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Gi=e=>[{value:v.DAILY,label:e?`Days`:`Day`},{value:v.WEEKLY,label:e?`Weeks`:`Week`},{value:v.MONTHLY,label:e?`Months`:`Month`},{value:v.YEARLY,label:e?`Years`:`Year`}],Ki=300,qi=()=>{let e=N(),t=P(Y.state),n=P(X.weekStartDay),r=P(X.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:s,until:c,freq:l,start:u,interval:f}=t,p=i!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=Vi(),b=(0,j.useMemo)(()=>o(u),[u]),ee=e=>E(o(e),r,{locale:d()});return(0,F.jsxs)(Bi,{children:[(0,F.jsxs)(k,{$alignItems:`end`,style:{width:`100%`},children:[(0,F.jsx)(D,{translateOptions:!0,label:`Repeats`,value:i,options:Ui,onChange:t=>e(J.setRepeatType(t))}),i===`CUSTOM`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(vi,{}),(0,F.jsx)(D,{translateOptions:!0,label:``,value:l,options:Gi(f>1),onChange:t=>e(J.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,F.jsx)(hi,{}),i!==`NEVER`&&(0,F.jsxs)(k,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,F.jsx)(D,{translateOptions:!0,label:`Ends`,options:Wi,value:a,onChange:t=>e(J.setRepeatEndType(t))}),a===`AFTER`&&(0,F.jsx)(Kr,{label:`Times`,value:s,min:1,debounceMs:Ki,onChange:t=>e(J.setCount(t))}),a===`ON_DATE`&&(0,F.jsx)(De,{label:``,value:c||null,onChange:t=>e(J.setUntil(t)),datePickerProps:{showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:b}})]}),(0,F.jsxs)(k,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,F.jsx)(Ri,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:ee,filterDate:v,weekStartDay:n,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),p&&(0,F.jsx)(Ri,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:ee,filterDate:y,weekStartDay:n,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},Ji=()=>{let e=(0,j.useId)(),t=(0,j.useId)(),n=(0,j.useId)(),r=N(),{start:i,end:a,allDay:s}=P(Y.state),{date:c,time:u,datetime:d}=P(X.formats),f=P(X.weekStartDay),p=P(X.timeInterval),m=P(X.eventDuration),h=(0,j.useMemo)(()=>s?c.short.icu:d.short.icu,[s,c,d]),g=(0,j.useMemo)(()=>s?zr(a):a,[s,a]);return(0,F.jsxs)(Ir,{children:[(0,F.jsxs)(Lr,{children:[(0,F.jsxs)(Rr,{children:[(0,F.jsx)(De,{id:t,label:`Starts`,value:i,onChange:e=>r(J.setStart(e)),datePickerProps:{id:t,showIcon:!0,icon:(0,F.jsx)(ke,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!s,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:h,timeFormat:u.short.icu,todayButton:l(`Today`),calendarStartDay:f,timeIntervals:p}}),(0,F.jsx)(De,{id:n,label:`Ends`,value:g,onChange:e=>{e!=null&&r(J.setEnd(Vr({value:e,start:i,allDay:s,timeInterval:p})))},datePickerProps:{id:n,showIcon:!0,icon:(0,F.jsx)(ke,{}),toggleCalendarOnIconClick:!0,minDate:o(i),showTimeSelect:!s,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:h,timeFormat:u.short.icu,todayButton:l(`Today`),calendarStartDay:f,timeIntervals:p,filterTime:e=>Br(new Date(e),i,p)}}),(0,F.jsx)(Oe,{id:e,label:`All Day`,enabled:s,style:{margin:0},onClick:e=>r(J.setAllDay({enabled:e,eventDuration:m}))})]}),(0,F.jsx)(qi,{})]}),(0,F.jsx)(Fr,{})]})},Yi=r.div`
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
`,Xi=({context:e})=>{let{rrule:n}=P(Y.state),r=(0,j.useMemo)(nt,[]),i=n?te(n,{forceset:!0}).all((e,t)=>t<10).map(e=>`${E(t(e),`yyyy-MM-dd HH:mm`)} [${Me(e)}]`):[];return(0,F.jsxs)(Yi,{children:[(0,F.jsx)(Ji,{}),e?.eventId&&(0,F.jsx)(ct,{context:e}),r&&(0,F.jsxs)(`code`,{children:[(0,F.jsx)(`pre`,{children:n}),(0,F.jsx)(`pre`,{children:JSON.stringify(i,null,2)})]})]})},Zi=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,Qi(n)),$(t,`end`,Qi(r)),$(t,`until`,i?Qi(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},Qi=e=>E(o(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},$i=e=>{let t=ge(e.event.rrule),{byweekday:n,bysetpos:r}=gr(t?.options.byweekday),i=_r(e.event.repeatType),a=vr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||v.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?yr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Kn({reducer:{app:wr,event:xr},preloadedState:o})},ea=new WeakSet,ta=e=>{if(ea.has(e))return;ea.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=$i(r),a=Fe.createRoot(n);i.subscribe(()=>{Zi(i,e)}),Zi(i,e),a.render((0,F.jsx)(Je,{store:i,children:(0,F.jsx)(Xi,{context:r.context})}))},na=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(ta)},ra=()=>{na(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&ta(e),na(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ra):ra();