import{_ as e,c as t,d as n,f as r,g as i,h as a,i as o,n as s,p as c,r as l,s as u,t as d}from"./date-DHm29epU.js";import{a as f,c as p,d as m,i as h,l as g,n as _,o as v,s as y,t as ee}from"./rrule-7b6Rmlwt.js";import{S as b,_ as te,a as ne,b as re,c as ie,f as ae,g as oe,h as x,i as se,l as S,m as C,n as ce,o as le,p as ue,r as w,s as de,t as T,v as fe,x as pe,y as E}from"./components-Diz8d0rU.js";import{n as me,t as he}from"./dist-DgGuNF4E.js";import{t as ge}from"./interaction-DMXpF6lk.js";function _e(e,t){let n=pe(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=x(n.getDate(),2),t=x(n.getMonth()+1,2);a=`${x(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=x(Math.trunc(t/60),2),r=x(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=x(n.getHours(),2),r=x(n.getMinutes(),2),i=x(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var ve=i((e=>{var t=a();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,o=t.useRef,s=t.useEffect,c=t.useMemo,l=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,a,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!i){if(i=!0,o=e,e=a(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,r(o,e))return t;var n=a(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var i=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,a,u]);var p=i(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),ye=i(((e,t)=>{t.exports=ve()})),be=e(r()),D=e(a(),1),xe=ye();function Se(e){e()}function Ce(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Se(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var we={notify(){},get:()=>[]};function Te(e,t){let n,r=we,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Ce())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=we)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Ee=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,De=typeof navigator<`u`&&navigator.product===`ReactNative`,Oe=Ee||De?D.useLayoutEffect:D.useEffect,ke=Symbol.for(`react-redux-context`),Ae=typeof globalThis<`u`?globalThis:{};function je(){if(!D.createContext)return{};let e=Ae[ke]??(Ae[ke]=new Map),t=e.get(D.createContext);return t||(t=D.createContext(null),e.set(D.createContext,t)),t}var O=je();function Me(e){let{children:t,context:n,serverState:r,store:i}=e,a=D.useMemo(()=>{let e=Te(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=D.useMemo(()=>i.getState(),[i]);Oe(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||O;return D.createElement(s.Provider,{value:a},t)}var Ne=Me;function Pe(e=O){return function(){return D.useContext(e)}}var Fe=Pe();function Ie(e=O){let t=e===O?Fe:Pe(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Le=Ie();function Re(e=O){let t=e===O?Le:Ie(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var k=Re(),ze=(e,t)=>e===t;function Be(e=O){let t=e===O?Fe:Pe(e),n=(e,n={})=>{let{equalityFn:r=ze}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();D.useRef(!0);let s=D.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,xe.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return D.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var A=Be(),Ve=()=>!1;function j(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var He=typeof Symbol==`function`&&Symbol.observable||`@@observable`,Ue=()=>Math.random().toString(36).substring(7).split(``).join(`.`),We={INIT:`@@redux/INIT${Ue()}`,REPLACE:`@@redux/REPLACE${Ue()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${Ue()}`};function Ge(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function Ke(e,t,n){if(typeof e!=`function`)throw Error(j(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(j(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(j(1));return n(Ke)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(j(3));return i}function d(e){if(typeof e!=`function`)throw Error(j(4));if(c)throw Error(j(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(j(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!Ge(e))throw Error(j(7));if(e.type===void 0)throw Error(j(8));if(typeof e.type!=`string`)throw Error(j(17));if(c)throw Error(j(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(j(10));r=e,f({type:We.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(j(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[He](){return this}}}return f({type:We.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[He]:m}}function qe(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:We.INIT})===void 0)throw Error(j(12));if(n(void 0,{type:We.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(j(13))})}function Je(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{qe(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(j(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function Ye(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function Xe(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(j(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=Ye(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function Ze(e){return Ge(e)&&`type`in e&&typeof e.type==`string`}var Qe=Symbol.for(`immer-nothing`),$e=Symbol.for(`immer-draftable`),M=Symbol.for(`immer-state`);function N(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var P=Object,F=P.getPrototypeOf,et=`constructor`,tt=`prototype`,nt=`configurable`,rt=`enumerable`,it=`writable`,at=`value`,I=e=>!!e&&!!e[M];function L(e){return e?ct(e)||mt(e)||!!e[$e]||!!e[et]?.[$e]||ht(e)||gt(e):!1}var ot=P[tt][et].toString(),st=new WeakMap;function ct(e){if(!e||!_t(e))return!1;let t=F(e);if(t===null||t===P[tt])return!0;let n=P.hasOwnProperty.call(t,et)&&t[et];if(n===Object)return!0;if(!z(n))return!1;let r=st.get(n);return r===void 0&&(r=Function.toString.call(n),st.set(n,r)),r===ot}function lt(e,t,n=!0){R(e)===0?(n?Reflect.ownKeys(e):P.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function R(e){let t=e[M];return t?t.type_:mt(e)?1:ht(e)?2:gt(e)?3:0}var ut=(e,t,n=R(e))=>n===2?e.has(t):P[tt].hasOwnProperty.call(e,t),dt=(e,t,n=R(e))=>n===2?e.get(t):e[t],ft=(e,t,n,r=R(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function pt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var mt=Array.isArray,ht=e=>e instanceof Map,gt=e=>e instanceof Set,_t=e=>typeof e==`object`,z=e=>typeof e==`function`,vt=e=>typeof e==`boolean`;function yt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var B=e=>e.copy_||e.base_,bt=e=>e.modified_?e.copy_:e.base_;function xt(e,t){if(ht(e))return new Map(e);if(gt(e))return new Set(e);if(mt(e))return Array[tt].slice.call(e);let n=ct(e);if(t===!0||t===`class_only`&&!n){let t=P.getOwnPropertyDescriptors(e);delete t[M];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[it]===!1&&(a[it]=!0,a[nt]=!0),(a.get||a.set)&&(t[i]={[nt]:!0,[it]:!0,[rt]:a[rt],[at]:e[i]})}return P.create(F(e),t)}else{let t=F(e);if(t!==null&&n)return{...e};let r=P.create(t);return P.assign(r,e)}}function St(e,t=!1){return Tt(e)||I(e)||!L(e)?e:(R(e)>1&&P.defineProperties(e,{set:wt,add:wt,clear:wt,delete:wt}),P.freeze(e),t&&lt(e,(e,t)=>{St(t,!0)},!1),e)}function Ct(){N(2)}var wt={[at]:Ct};function Tt(e){return e===null||!_t(e)?!0:P.isFrozen(e)}var Et=`MapSet`,Dt=`Patches`,Ot=`ArrayMethods`,kt={};function V(e){let t=kt[e];return t||N(0,e),t}var At=e=>!!kt[e],H,jt=()=>H,Mt=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:At(Et)?V(Et):void 0,arrayMethodsPlugin_:At(Ot)?V(Ot):void 0});function Nt(e,t){t&&(e.patchPlugin_=V(Dt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Pt(e){Ft(e),e.drafts_.forEach(Lt),e.drafts_=null}function Ft(e){e===H&&(H=e.parent_)}var It=e=>H=Mt(H,e);function Lt(e){let t=e[M];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function Rt(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[M].modified_&&(Pt(t),N(4)),L(e)&&(e=zt(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[M].base_,e,t)}else e=zt(t,n);return Bt(t,e,!0),Pt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===Qe?void 0:e}function zt(e,t){if(Tt(t))return t;let n=t[M];if(!n)return Jt(t,e.handledSet_,e);if(!Ht(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);Kt(n,e)}return n.copy_}function Bt(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&St(t,n)}function Vt(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Ht=(e,t)=>e.scope_===t,Ut=[];function Wt(e,t,n,r){let i=B(e),a=e.type_;if(r!==void 0&&dt(i,r,a)===t){ft(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;lt(i,(e,n)=>{if(I(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??Ut;for(let e of o)ft(i,e,n,a)}function Gt(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!Ht(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=bt(i);Wt(e,i.draft_??i,a,n),Kt(i,r)})}function Kt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}Vt(e)}}function qt(e,t,n){let{scope_:r}=e;if(I(n)){let i=n[M];Ht(i,r)&&i.callbacks_.push(function(){tn(e),Wt(e,n,bt(i),t)})}else L(n)&&e.callbacks_.push(function(){let i=B(e);e.type_===3?i.has(n)&&Jt(n,r.handledSet_,r):dt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&Jt(dt(e.copy_,t,e.type_),r.handledSet_,r)})}function Jt(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||I(e)||t.has(e)||!L(e)||Tt(e)?e:(t.add(e),lt(e,(r,i)=>{if(I(i)){let t=i[M];Ht(t,n)&&(ft(e,r,bt(t),e.type_),Vt(t))}else L(i)&&Jt(i,t,n)}),e)}function Yt(e,t){let n=mt(e),r={type_:+!!n,scope_:t?t.scope_:jt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=Xt;n&&(i=[r],a=U);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var Xt={get(e,t){if(t===M)return e;if(t===`constructor`||t===`__proto__`){let n=B(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=B(e);if(!ut(i,t,e.type_))return Qt(e,i,t);let a=i[t];if(e.finalized_||!L(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&yt(t))return a;if(a===Zt(e.base_,t)){tn(e);let n=e.type_===1?+t:t,r=rn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in B(e)},ownKeys(e){return Reflect.ownKeys(B(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=$t(B(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=Zt(B(e),t),i=r?.[M];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(pt(n,r)&&(n!==void 0||ut(e.base_,t,e.type_)))return!0;tn(e),en(e)}return e.copy_[t]===n&&(n!==void 0||ut(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),qt(e,t,n),!0)},deleteProperty(e,t){return tn(e),Zt(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),en(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=B(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[it]:!0,[nt]:e.type_!==1||t!==`length`,[rt]:r[rt],[at]:n[t]}},defineProperty(){N(11)},getPrototypeOf(e){return F(e.base_)},setPrototypeOf(){N(12)}},U={};for(let e in Xt){let t=Xt[e];U[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}U.deleteProperty=function(e,t){return U.set.call(this,e,t,void 0)},U.set=function(e,t,n){return Xt.set.call(this,e[0],t,n,e[0])};function Zt(e,t){let n=e[M];return(n?B(n):e)[t]}function Qt(e,t,n){let r=$t(t,n);return r?at in r?r[at]:r.get?.call(e.draft_):void 0}function $t(e,t){if(!(t in e))return;let n=F(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=F(n)}}function en(e){e.modified_||(e.modified_=!0,e.parent_&&en(e.parent_))}function tn(e){e.copy_||(e.assigned_=new Map,e.copy_=xt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var nn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(z(e)&&!z(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}z(t)||N(6),n!==void 0&&!z(n)&&N(7);let r;if(L(e)){let i=It(this),a=rn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?Pt(i):Ft(i)}return Nt(i,n),Rt(r,i)}else if(!e||!_t(e)){if(r=t(e),r===void 0&&(r=e),r===Qe&&(r=void 0),this.autoFreeze_&&St(r,!0),n){let t=[],i=[];V(Dt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else N(1,e)},this.produceWithPatches=(e,t)=>{if(z(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},vt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),vt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),vt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){L(e)||N(8),I(e)&&(e=an(e));let t=It(this),n=rn(t,e,void 0);return n[M].isManual_=!0,Ft(t),n}finishDraft(e,t){let n=e&&e[M];(!n||!n.isManual_)&&N(9);let{scope_:r}=n;return Nt(r,t),Rt(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=V(Dt).applyPatches_;return I(e)?r(e,t):this.produce(e,e=>r(e,t))}};function rn(e,t,n,r){let[i,a]=ht(t)?V(Et).proxyMap_(t,n):gt(t)?V(Et).proxySet_(t,n):Yt(t,n);return(n?.scope_??jt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?Gt(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function an(e){return I(e)||N(10,e),on(e)}function on(e){if(!L(e)||Tt(e))return e;let t=e[M],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=xt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=xt(e,!0);return lt(n,(e,t)=>{ft(n,e,on(t))},r),t&&(t.finalized_=!1),n}var sn=new nn().produce;function cn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var ln=cn(),un=cn,dn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?Ye:Ye.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function fn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(W(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>Ze(t)&&t.type===e,n}var pn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function mn(e){return L(e)?sn(e,()=>{}):e}function hn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function gn(e){return typeof e==`boolean`}var _n=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new pn;return t&&(gn(t)?a.push(ln):a.push(un(t.extraArgument))),a},vn=`RTK_autoBatch`,yn=e=>t=>{setTimeout(t,e)},bn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},xn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?bn(window.requestAnimationFrame,100):yn(10):e.type===`callback`?e.queueNotification:yn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[vn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Sn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new pn(e);return n&&r.push(xn(typeof n==`object`?n:void 0)),r};function Cn(e){let t=_n(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(Ge(n))c=Je(n);else throw Error(W(1));let l;l=typeof r==`function`?r(t):t();let u=Ye;i&&(u=dn({trace:!1,...typeof i==`object`&&i}));let d=Sn(Xe(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return Ke(c,o,p)}function wn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(W(28));if(r in t)throw Error(W(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Tn(e){return typeof e==`function`}function En(e,t){let[n,r,i]=wn(t),a;if(Tn(e))a=()=>mn(e());else{let t=mn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(I(e)){let r=n(e,t);return r===void 0?e:r}else if(L(e))return sn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Dn=Symbol.for(`rtk-slice-createasyncthunk`);function On(e,t){return`${e}/${t}`}function kn({creators:e}={}){let t=e?.asyncThunk?.[Dn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(W(11));let i=(typeof e.reducers==`function`?e.reducers(Mn()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(W(12));if(n in o.sliceCaseReducersByType)throw Error(W(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:On(n,r),createNotation:typeof e.reducers==`function`};Pn(a)?In(o,a,s,t):Nn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?wn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return En(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=hn(d,r,m)),i}function i(t=l){return hn(hn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=An(a,t,()=>hn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function An(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var jn=kn();function Mn(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function Nn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!Fn(r))throw Error(W(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?fn(e,o):fn(e))}function Pn(e){return e._reducerDefinitionType===`asyncThunk`}function Fn(e){return e._reducerDefinitionType===`reducerWithPrepare`}function In({type:e,reducerName:t},n,r,i){if(!i)throw Error(W(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||Ln,pending:s||Ln,rejected:c||Ln,settled:l||Ln})}function Ln(){}var Rn=`listener`,zn=`completed`,Bn=`cancelled`;`${Bn}`,`${zn}`,`${Rn}${Bn}`,`${Rn}${zn}`;var{assign:Vn}=Object,Hn=`listenerMiddleware`,Un=Vn(fn(`${Hn}/add`),{withTypes:()=>Un});`${Hn}`;var Wn=Vn(fn(`${Hn}/remove`),{withTypes:()=>Wn});function W(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var G=e=>{if(!(!e||e.length===0))return Array.from(new Set(e))},Gn=(e,t)=>{let n=u(e.start),r=n.getDate(),i=n.getMonth()+1,a=(n.getDay()+6)%7;switch(e.byweekday=void 0,e.bymonth=void 0,e.bymonthday=void 0,e.byyearday=void 0,e.bysetpos=void 0,t){case p.WEEKLY:e.byweekday=[a];break;case p.MONTHLY:e.bymonthday=[r];break;case p.YEARLY:e.bymonth=[i],e.bymonthday=[r];break;default:break}},K=e=>{let t=Jn(e),n=er(e.rrule,e);if(!t&&n.length===0){e.rrule=void 0;return}if(t&&n.length===0){e.rrule=Zn(t.toString(),e.allDay);return}e.rrule=[...Qn(e,t),...n].join(`
`)},Kn=e=>{let t=e?.split(/\r?\n/).filter(e=>!e.trim().startsWith(`RDATE`));return t?.length?t.join(`
`):void 0},qn=(e,t)=>e.filter(e=>e.getTime()!==t),Jn=e=>{let{repeatEndType:t,allDay:n,interval:r,count:i}=e,a=u(e.start),o=e.until?u(e.until):null,c=n?s(a):d(a),l=t===`ON_DATE`&&o?n?s(o):d(o):void 0,f={dtstart:c,interval:r,count:t===`AFTER`?i:void 0,until:t===`ON_DATE`?l:void 0};switch(e.repeatType){case`DAILY`:f={...f,freq:p.DAILY};break;case`WEEKLY`:f={...f,freq:p.WEEKLY};break;case`MONTHLY`:f={...f,freq:p.MONTHLY};break;case`YEARLY`:f={...f,freq:p.YEARLY};break;case`CUSTOM`:{let t=e.freq===p.YEARLY&&e.bysetpos?.length&&e.byweekday?.length,n=t?void 0:e.bysetpos,r=t?rr(e.byweekday,e.bysetpos?.[0]):e.byweekday;f={...f,freq:e.freq,interval:e.interval,count:e.repeatEndType===`AFTER`?e.count:void 0,byweekday:r,bymonth:e.bymonth,bymonthday:e.bymonthday,byyearday:e.byyearday,bysetpos:n};break}default:return null}return new y(f)},Yn=(e,t)=>{let n=u(t);if(e.allDay)return s(n);let r=u(e.start);return n.setHours(r.getHours(),r.getMinutes(),r.getSeconds(),0),d(n)},Xn=(e,t,n=[],r=[])=>{if(!t&&n.length===0&&r.length===0)return;let i=[...Qn(e,t)];if(n.length>0||r.length>0){let t=new f;n.forEach(e=>{t.rdate(e)}),r.forEach(e=>{t.exdate(e)}),i.push(...Zn(t.toString(),e.allDay).split(`
`))}return i.join(`
`)},Zn=(e,t)=>e.split(`
`).map(e=>h(e,t)).filter(Boolean).join(`
`),Qn=(e,t)=>{if(t)return Zn(t.toString(),e.allDay).split(`
`);let n=tr(e),r=new f;return r.dtstart(n),r.rdate(n),Zn(r.toString(),e.allDay).split(`
`)},$n=(e,t)=>{let n=_(e),r=new f;return n?.rdates().forEach(e=>{r.rdate(Yn(t,e.getTime()/1e3))}),n?.exdates().forEach(e=>{r.exdate(Yn(t,e.getTime()/1e3))}),Zn(r.toString(),t.allDay)},er=(e,t)=>{if(!e)return[];let n=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(n.some(e=>e.startsWith(`RRULE`)))return n.filter(e=>e.startsWith(`RDATE`)||e.startsWith(`EXDATE`)).map(e=>$n(e,t));let r=n.find(e=>e.startsWith(`DTSTART`))?.split(`:`,2)[1]?.trim();return n.flatMap(e=>{if(!e.startsWith(`RDATE`)&&!e.startsWith(`EXDATE`))return[];if(!r||!e.startsWith(`RDATE`))return[$n(e,t)];let[n,i=``]=e.split(`:`,2),a=i.split(`,`).map(e=>e.trim()).filter(Boolean).filter(e=>e!==r);return a.length===0?[]:[$n(`${n}:${a.join(`,`)}`,t)]})},tr=e=>{let t=u(e.start);return e.allDay?s(t):d(t)},nr=[y.MO,y.TU,y.WE,y.TH,y.FR,y.SA,y.SU],rr=(e,t)=>!e?.length||!t?e:e.map(e=>nr[e]?.nth(t)).filter(Boolean),ir=(e,t)=>{let n=u(t);if(e.allDay)n.setHours(0,0,0,0);else{let t=u(e.start);n.setHours(t.getHours(),t.getMinutes(),t.getSeconds(),0)}return l(n)},ar=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),or=new Set([`NEVER`,`AFTER`,`ON_DATE`]),sr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},cr=e=>ar.has(e)?e:`NEVER`,lr=e=>or.has(e)?e:`NEVER`,ur=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,dr=jn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:p.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=ir(e,e.until)),r!==void 0&&(e.until=e.start+r),K(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=ir(e,n),K(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=u(e.start);a.setHours(i,0,0,0),e.start=l(a);let o=u(e.end);n?o=re(E(o),1):(o=ue(o,1),o=ae(o,a.getHours()),o=fe(o,r)),e.end=l(o),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=ir(e,e.until)),K(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=Kn(e.rrule)),e.repeatType=t.payload,K(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=ur(e.count):e.count=null,K(e)},setFreq:(e,t)=>{e.freq=t.payload,Gn(e,t.payload),K(e)},setCount:(e,t)=>{e.count=ur(t.payload),K(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),K(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=G(r),K(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=G(n.byweekday)),`bymonth`in n&&(e.bymonth=G(n.bymonth)),`bymonthday`in n&&(e.bymonthday=G(n.bymonthday)),`byyearday`in n&&(e.byyearday=G(n.byyearday)),`bysetpos`in n&&(e.bysetpos=G(n.bysetpos)),K(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=dr,fr=dr.reducer,J={state:e=>e.event},pr=jn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:mr}=pr,hr=pr.reducer,gr={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},_r=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},vr=e=>l(E(u(e))),Y=e=>l(E(t(e))),yr=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0,0)),br=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59,999)),xr=e=>Math.floor(yr(e).getTime()/1e3),Sr=(e,t)=>{let n=vr(t),r=ee(e)??null,i=_(e),a=r?.after(new Date(n*1e3),!0),o=new Set((i?.rdates()??[]).map(Y).filter(e=>r?!0:e!==n));return{startTimestamp:n,firstOccurrenceTimestamp:a?Y(a):n,baseRule:r,recurrenceSet:i,addedDateSet:o}},Cr=(e,t)=>{let n=xr(t),r=yr(t),i=br(t),a=e.baseRule?e.baseRule.between(r,i,!0).length>0:!1,o=e.recurrenceSet?e.recurrenceSet.between(r,i,!0).length>0:n===e.startTimestamp;return{timestamp:n,full:o,base:a,excluded:a&&!o,rdate:e.addedDateSet.has(n)}},wr=(e,t)=>t===e.startTimestamp||t===e.firstOccurrenceTimestamp,Tr=(e,t)=>{let n=Cr(e,t);return!n.full||wr(e,n.timestamp)?null:n.rdate?`rdate`:n.base?`exdate`:null},Er=(e,t)=>{if(!t)return[];let n=yr(t.start),r=br(t.end),i=xr(t.start),a=xr(t.end),s=[];return e.recurrenceSet?s=e.recurrenceSet.between(n,r,!0).map(Y):e.startTimestamp>=i&&e.startTimestamp<=a&&(s=[e.startTimestamp]),Array.from(new Set(s)).map(e=>({id:o(new Date(e*1e3)),start:C(u(e),`yyyy-MM-dd`),allDay:!0}))},Dr=(e,t,n)=>{if(!t)return[];if(!e.recurrenceSet){let n=xr(t);return e.startTimestamp>=n?[e.startTimestamp]:[]}let r=e.recurrenceSet.between(yr(t),te(br(t),100),!0,(e,t)=>t<n).map(Y);return Array.from(new Set(r)).slice(0,n)},Or=(e,t,n,r,i)=>{if((n===`exdate`&&i||n===`rdate`&&!i)&&wr(t,xr(new Date(r*1e3))))return e.rrule;let a=Yn(e,r),o=a.getTime(),s=kr(t,({baseRule:e,rdates:t,exdates:r})=>{let s=Ar(t,a,o,n===`rdate`,i);return{baseRule:e,rdates:n===`exdate`&&i?qn(s,o):s,exdates:Ar(r,a,o,n===`exdate`,i)}});return Xn(e,s.baseRule,_r(s.rdates),_r(s.exdates))},kr=(e,t)=>t({baseRule:e.baseRule,rdates:jr(e),exdates:e.recurrenceSet?.exdates()??[]}),Ar=(e,t,n,r,i)=>r?i?[...e,t]:qn(e,n):e,jr=e=>{let t=e.recurrenceSet?.rdates()??[];return e.baseRule?t:t.filter(t=>Y(t)!==e.startTimestamp)},Mr=[`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`,`Sunday`],Nr=[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`],Pr={1:`first`,2:`second`,3:`third`,4:`fourth`,[-1]:`last`},Fr=e=>e==null?[]:Array.isArray(e)?e:[e],Ir=e=>{if(e.length<=1)return e[0]??``;let t=e[e.length-1];return b(`{list} and {last}`,{list:e.slice(0,-1).join(`, `),last:t})},Lr=e=>{let t=Array.from(new Set(e)).sort((e,t)=>e-t);return t.join()===`0,1,2,3,4`?b(`weekday`):t.join()===`5,6`?b(`weekend day`):Ir(t.map(e=>b(Mr[e])))},Rr=(e,t)=>{let n={[p.DAILY]:[`Every day`,`Every {count} days`,`day`],[p.WEEKLY]:[`Every week`,`Every {count} weeks`,`week`],[p.MONTHLY]:[`Every month`,`Every {count} months`,`month`],[p.YEARLY]:[`Every year`,`Every {count} years`,`year`]},[r,i]=n[e]??n[p.DAILY];return t>1?b(i,{count:t}):b(r)},zr=e=>{let{baseRule:n}=e;if(!n)return null;let r=n.origOptions,i=r.freq??p.DAILY,a=[Rr(i,r.interval??1)],o=Fr(r.byweekday).map(e=>typeof e==`number`?e:typeof e==`string`?y[e].weekday:e.weekday),s=Fr(r.bymonthday),c=Fr(r.bymonth),l=Fr(r.bysetpos);c.length>0&&i===p.YEARLY&&a.push(b(`in {months}`,{months:Ir(c.map(e=>b(Nr[e-1])))})),l.length>0&&o.length>0?a.push(b(`on the {position} {weekday}`,{position:b(Pr[l[0]]??`first`),weekday:Lr(o)})):o.length>0?a.push(b(`on {weekdays}`,{weekdays:Lr(o)})):s.length>0&&a.push(b(`on day {days}`,{days:Ir(s.map(String))}));let u=a.join(` `);return r.count?b(`{description}, ending after {count} {noun}.`,{description:u,count:r.count,noun:b(r.count===1?`occurrence`:`occurrences`)}):r.until?b(`{description}, ending on {date}.`,{description:u,date:C(t(r.until),`PP`)}):`${u}.`},Br=(e,t)=>{let{baseRule:n,recurrenceSet:r}=e;if(!n||!r)return null;let i=!!(n.origOptions.count||n.origOptions.until),a=i?r.all().length:null,o=0,s=r.exdates();if(s.length>0&&i){let e=new Set(n.all().map(e=>Y(e)));o=s.filter(t=>e.has(Y(t))).length}else o=s.length;return{showing:t,total:a,excluded:o}},Vr=e=>{let t=e.total===null?b(`Showing {showing} occurrences`,{showing:e.showing}):b(`Showing {showing} of {total} occurrences`,{showing:e.showing,total:e.total});return e.excluded===0?t:b(`{summary} - {excluded} excluded`,{summary:t,excluded:e.excluded})},Hr=n.div`
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
`,Ur=n.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  margin-top: 10px;
  width: 400px;
  flex: 0 0 400px;
  box-sizing: border-box;
`,Wr=n.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,Gr=n.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Kr=n.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,qr=n.div`
  min-width: 120px;
  max-width: 120px;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,Jr=n.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 4px;

  height: 100%;
  max-height: 215px;
  margin-top: 0;
`,Yr=n.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 4px 5px 4px 8px;

  font-size: 13px;
  line-height: 13px;
  font-family: monospace;
  white-space: nowrap;

  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  border-left: 5px solid var(--gray-200);
`,Xr=n.button`
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
`,X=c(),Zr=8,Qr=()=>{let e=k(),t=A(J.state),{start:n,rrule:r}=t,[i,a]=(0,D.useState)(null),s=(0,D.useMemo)(()=>Sr(r,n),[r,n]),c=(0,D.useMemo)(()=>Er(s,i),[s,i]),l=(0,D.useMemo)(()=>Dr(s,i?.start??null,Zr),[s,i]),u=(0,D.useMemo)(()=>zr(s),[s]),d=(0,D.useMemo)(()=>{let e=Br(s,l.length);return e?Vr(e):null},[s,l]),f=(0,D.useCallback)((n,r,i)=>{e(q.setRRule(Or(t,s,n,r,i)))},[e,s,t]),p=(0,D.useCallback)(e=>{let t=Tr(s,e);if(t){let{timestamp:n}=Cr(s,e);f(t,n,t===`exdate`)}},[f,s]),m=(0,D.useCallback)(e=>{let t=Cr(s,e);if(t.base&&t.excluded){f(`exdate`,t.timestamp,!1);return}if(t.full){p(e);return}t.full||f(`rdate`,t.timestamp,!0)},[f,s,p]),h=(0,D.useCallback)(e=>Cr(s,e),[s]);return(0,X.jsx)(Hr,{children:(0,X.jsxs)(de,{children:[(0,X.jsxs)(T,{$direction:`column`,$gap:10,children:[(0,X.jsx)(Wr,{children:b(`Schedule Preview`)}),u&&(0,X.jsx)(Gr,{children:u})]}),(0,X.jsxs)(Ur,{children:[(0,X.jsxs)(T,{$direction:`column`,$gap:10,children:[(0,X.jsx)(he,{aspectRatio:2,height:250,expandRows:!1,themeSystem:`bootstrap5`,plugins:[me,ge],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,b(C(e.date,`EEEE`))),timeZone:`UTC`,eventDisplay:`none`,events:c,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>a({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=h(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>m(e.date)}),d&&(0,X.jsx)(Kr,{children:d})]}),(0,X.jsx)(qr,{children:l.length===0?(0,X.jsxs)(`p`,{children:[b(`No occurrences starting from`),(0,X.jsx)(`br`,{}),C(i?.currentStart??new Date,`PP`)]}):(0,X.jsx)(Jr,{$count:l.length,children:l.map(e=>{let t=new Date(e*1e3),n=o(t),r=Tr(s,t),i=b(r===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:n});return(0,X.jsxs)(Yr,{children:[(0,X.jsx)(`span`,{children:n}),r&&(0,X.jsx)(Xr,{type:`button`,"aria-label":i,title:i,onClick:()=>p(t),children:`×`})]},n)})})})]})]})})},$r=n.div`
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
`,ei=n.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,ti=n.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,ni=e=>l(ue(u(e),1)),ri=(e,t,n)=>{let r=ai(t,n);return e.getTime()>=r.getTime()},ii=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return l(re(E(u(e)),1));let i=u(e),a=ai(t,r);return i.getTime()>=a.getTime()?e:l(a)},ai=(e,t)=>fe(u(e),t),oi=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},si=({inputValue:e,value:t,min:n})=>{let r=oi(e)??n??t??0;return n===void 0?r:Math.max(r,n)},ci=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,D.useState)(e?.toString()??``),o=(0,D.useRef)(void 0),s=(0,D.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,D.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,D.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,D.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,D.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=oi(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,D.useCallback)(n=>{n.stopPropagation();let r=si({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},li=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=ci({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(de,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},ui=()=>null,Z=[{value:`MO`,label:`Monday`,days:[y.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[y.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[y.WE.weekday]},{value:`TH`,label:`Thursday`,days:[y.TH.weekday]},{value:`FR`,label:`Friday`,days:[y.FR.weekday]},{value:`SA`,label:`Saturday`,days:[y.SA.weekday]},{value:`SU`,label:`Sunday`,days:[y.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[y.MO.weekday,y.TU.weekday,y.WE.weekday,y.TH.weekday,y.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[y.SA.weekday,y.SU.weekday]}],di=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},fi=(e,t)=>{let n=di(e),r=di(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},pi=(e,t)=>{if(e){let t=Z.find(t=>fi(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},mi=e=>Z.find(t=>t.value===e)?.days??[y.MO.weekday],Q=`5px`,hi=n.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,gi=n(hi)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,_i=n(hi)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,vi=n.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,yi=n(vi)`
  grid-template-columns: repeat(7, 1fr);

  ${hi} {
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
`,bi=n(vi)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${hi} {
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
`,xi=n(vi)`
  grid-template-columns: repeat(4, 1fr);

  ${hi} {
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
`,Si=({label:e,values:t,onChange:n})=>(0,X.jsx)(de,{label:e,children:(0,X.jsxs)(yi,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(gi,{type:`button`,className:S(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(_i,{},e))]})}),Ci=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],wi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Ti=()=>{let e=k(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=A(J.state),a=u(t),o=a.getDate(),s=(a.getDay()+6)%7,c=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,l=n?.length?n:[o],d=i?.[0]??1,f=pi(r,s),p=t=>{e(q.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(q.setByRules({bymonthday:void 0,byweekday:mi(t),bysetpos:[n]}))};return(0,X.jsxs)(T,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(w,{label:`Repeat on`,value:c,options:Ci,onChange:e=>{e===`WEEKDAY`?m(f,d):p(l)}}),c===`MONTHDAY`&&(0,X.jsx)(Si,{label:`Days of Month`,values:l,onChange:e=>p(e)}),c===`WEEKDAY`&&(0,X.jsxs)(T,{children:[(0,X.jsx)(w,{label:`Position`,value:d,options:wi,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(w,{label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},Ei=[{weekday:y.SU,label:`Sun`},{weekday:y.MO,label:`Mon`},{weekday:y.TU,label:`Tue`},{weekday:y.WE,label:`Wed`},{weekday:y.TH,label:`Thu`},{weekday:y.FR,label:`Fri`},{weekday:y.SA,label:`Sat`}],Di=()=>{let e=k(),{byweekday:t}=A(J.state);return(0,X.jsx)(T,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,X.jsx)(de,{label:`On`,children:(0,X.jsx)(bi,{children:Ei.map(({weekday:n,label:r})=>(0,X.jsx)(gi,{type:`button`,className:S(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:r},n.weekday))})})})},Oi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],ki=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],Ai=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],ji=()=>{let e=k(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=A(J.state),o=u(t),s=o.getDate(),c=o.getMonth()+1,l=(o.getDay()+6)%7,d=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,f=r?.length?r:[s],p=n?.length?n:[c],m=a?.[0]??1,h=pi(i,l),g=(t,n)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},_=(t,n,r)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:mi(n),bysetpos:[r]}))};return(0,X.jsxs)(T,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(de,{label:`Month`,children:(0,X.jsx)(xi,{children:Ai.map(e=>{let t=p.includes(e.value);return(0,X.jsx)(gi,{type:`button`,className:S(t&&`active`),onClick:()=>{let n=p.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),d===`WEEKDAY`?_(n,h,m):g(n,f))},children:e.label},e.value)})})}),(0,X.jsx)(w,{label:`Repeat on`,value:d,options:Oi,onChange:e=>{e===`WEEKDAY`?_(p,h,m):g(p,f)}}),d===`MONTHDAY`&&(0,X.jsx)(Si,{label:`Days of Month`,values:f,onChange:e=>g(p,e)}),d===`WEEKDAY`&&(0,X.jsxs)(T,{children:[(0,X.jsx)(w,{label:`Position`,value:m,options:ki,onChange:e=>_(p,h,Number.parseInt(e,10))}),(0,X.jsx)(w,{label:`Day`,value:h,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>_(p,e,m)})]})]})},Mi=()=>{let{freq:e}=A(J.state);return e===p.DAILY?(0,X.jsx)(ui,{}):e===p.WEEKLY?(0,X.jsx)(Di,{}):e===p.MONTHLY?(0,X.jsx)(Ti,{}):e===p.YEARLY?(0,X.jsx)(ji,{}):null},Ni=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Pi=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Fi=()=>{let e=k(),{interval:t}=A(J.state);return(0,X.jsxs)(Ii,{children:[(0,X.jsx)(`span`,{children:`Every`}),(0,X.jsx)(Li,{type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(q.setInterval(n))}}),(0,X.jsxs)(Ri,{children:[(0,X.jsx)(zi,{type:`button`,onClick:()=>e(q.setInterval(t+1)),children:(0,X.jsx)(Pi,{})}),(0,X.jsx)(zi,{type:`button`,onClick:()=>e(q.setInterval(t-1)),children:(0,X.jsx)(Ni,{})})]})]})},Ii=n.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Li=n.input`
  width: 60px;
`,Ri=n.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,zi=n.button`
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
`,Bi=g({position:[`bottom`,`top`],alignment:`end`,padding:8}),Vi=(e,t,n,r)=>{let[i,a]=(0,D.useState)();return(0,D.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=m({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Bi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Hi=(e,t,n)=>{(0,D.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Ui=n.div`
  padding-top: 18px;
  width: 100%;
`,Wi=n.div`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`,Gi=n.p`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 400;
`,Ki=n.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,qi=n.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  ${ne}

  .react-datepicker__current-month {
    display: none;
  }
`,Ji=n.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Yi=n.div`
  position: relative;
  flex-shrink: 0;
`,Xi=n.button`
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
`,Zi=n.div`
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
`,Qi=n.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,$i=n.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,ea=n.li`
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
`,ta=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:f})=>{let[p,m]=(0,D.useState)(!1),h=(0,D.useRef)(null),g=(0,D.useRef)(null),_=(0,D.useRef)(null),v=Vi(p,g,_,h);return(0,D.useEffect)(()=>{a.length===0&&m(!1)},[a.length]),Hi(p,[g,_],()=>m(!1)),(0,X.jsxs)(Ui,{children:[(0,X.jsx)(Wi,{children:b(e)}),t&&(0,X.jsx)(Gi,{children:t}),(0,X.jsxs)(Ki,{children:[(0,X.jsxs)(Yi,{ref:h,children:[(0,X.jsx)(Xi,{ref:g,type:`button`,disabled:a.length===0,className:S({active:p}),onClick:()=>{a.length!==0&&m(e=>!e)},children:a.length}),p&&(0,X.jsxs)(Zi,{ref:_,style:{top:v?.top??0,left:v?.left??0,visibility:v?`visible`:`hidden`},children:[(0,X.jsx)(Qi,{children:b(i)}),(0,X.jsx)($i,{children:a.map(e=>(0,X.jsxs)(ea,{children:[(0,X.jsx)(`span`,{children:c(e)}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>f(e),children:`×`})]},e))})]})]}),(0,X.jsx)(qi,{children:(0,X.jsx)(ie,{selected:null,onChange:e=>{e&&d(l(E(e)))},customInput:(0,X.jsx)(na,{label:n,className:S(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:b(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},na=(0,D.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Ji,{type:`button`,ref:n,...t,children:b(e)}));na.displayName=`PickerTrigger`;var ra=n.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,ia=()=>{let e=k(),n=A(J.state),{start:r,rrule:i}=n,a=(0,D.useMemo)(()=>Sr(i,r),[i,r]),{startTimestamp:o,baseRule:c,recurrenceSet:u}=a,f=(0,D.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>l(E(t(e)))).filter(e=>c?!0:e!==o))).sort((e,t)=>e-t):[],[c,u,o]),p=(0,D.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>l(E(t(e)))))).sort((e,t)=>e-t):[],[u]),m=(0,D.useMemo)(()=>new Set(f),[f]),h=(0,D.useMemo)(()=>new Set(p),[p]),g=(0,D.useCallback)(e=>{let t=s(E(e)),n=d(oe(e)),r=c?c.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:l(E(e))===o;return{full:i,base:r,excluded:r&&!i}},[c,u,o]),_=r=>{let i=r({baseRule:c,rdates:u?.rdates().filter(e=>c?!0:l(E(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(q.setRRule(Xn(n,i.baseRule,aa(i.rdates),aa(i.exdates))))};return{addedDates:f,excludedDates:p,addFixedDate:(e,t)=>{if(e===`exdate`&&wr(a,t))return;let r=Yn(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:qn(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&wr(a,t))return;let r=Yn(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?qn(n,r):n,exdates:e===`exdate`?qn(i,r):i}))},canAddOccurrence:(0,D.useCallback)(e=>{let t=l(E(e)),n=g(e);return!n.full&&!n.excluded&&!m.has(t)},[m,g]),canExcludeOccurrence:(0,D.useCallback)(e=>{let t=l(E(e)),n=g(e);return n.base&&!n.excluded&&!h.has(t)&&!wr(a,t)},[h,g,a]),getStatus:g}},aa=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},oa=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],sa=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],ca=e=>[{value:p.DAILY,label:e?`Days`:`Day`},{value:p.WEEKLY,label:e?`Weeks`:`Week`},{value:p.MONTHLY,label:e?`Months`:`Month`},{value:p.YEARLY,label:e?`Years`:`Year`}],la=300,ua=()=>{let e=k(),t=A(J.state),n=A(gr.weekStartDay),{repeatType:r,repeatEndType:i,count:a,until:o,freq:s,start:c,interval:l}=t,d=r!==`NEVER`,{addedDates:f,excludedDates:p,addFixedDate:m,removeFixedDate:h,canAddOccurrence:g,canExcludeOccurrence:_}=ia(),v=(0,D.useMemo)(()=>u(c),[c]),y=e=>C(u(e),`yyyy-MM-dd`);return(0,X.jsxs)(ra,{children:[(0,X.jsxs)(T,{$alignItems:`end`,style:{width:`100%`},children:[(0,X.jsx)(w,{label:`Repeats`,value:r,options:oa,onChange:t=>e(q.setRepeatType(t))}),r===`CUSTOM`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(Fi,{}),(0,X.jsx)(w,{label:``,value:s,options:ca(l>1),onChange:t=>e(q.setFreq(Number.parseInt(t,10)))})]})]}),r===`CUSTOM`&&(0,X.jsx)(Mi,{}),r!==`NEVER`&&(0,X.jsxs)(T,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(w,{label:`Ends`,options:sa,value:i,onChange:t=>e(q.setRepeatEndType(t))}),i===`AFTER`&&(0,X.jsx)(li,{label:`Times`,value:a,min:1,debounceMs:la,onChange:t=>e(q.setCount(t))}),i===`ON_DATE`&&(0,X.jsx)(se,{label:``,value:o||null,onChange:t=>e(q.setUntil(t)),datePickerProps:{showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:v}})]}),(0,X.jsxs)(T,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,X.jsx)(ta,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:f,openToDate:v,formatDate:y,filterDate:g,weekStartDay:n,onAdd:e=>m(`rdate`,e),onRemove:e=>h(`rdate`,e)}),d&&(0,X.jsx)(ta,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:p,openToDate:v,formatDate:y,filterDate:_,weekStartDay:n,onAdd:e=>m(`exdate`,e),onRemove:e=>h(`exdate`,e)})]})]})},da=()=>{let e=(0,D.useId)(),t=(0,D.useId)(),n=(0,D.useId)(),r=k(),{start:i,end:a,allDay:o}=A(J.state),{date:s,time:c,datetime:l}=A(gr.formats),d=A(gr.weekStartDay),f=A(gr.timeInterval),p=A(gr.eventDuration),m=(0,D.useMemo)(()=>o?s.short.icu:l.short.icu,[o,s,l]),h=(0,D.useMemo)(()=>o?ni(a):a,[o,a]);return(0,X.jsxs)($r,{children:[(0,X.jsxs)(ei,{children:[(0,X.jsxs)(ti,{children:[(0,X.jsx)(se,{id:t,label:`Starts`,value:i,onChange:e=>r(q.setStart(e)),datePickerProps:{id:t,showIcon:!0,icon:(0,X.jsx)(le,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:m,timeFormat:c.short.icu,todayButton:b(`Today`),calendarStartDay:d,timeIntervals:f}}),(0,X.jsx)(se,{id:n,label:`Ends`,value:h,onChange:e=>{e!=null&&r(q.setEnd(ii({value:e,start:i,allDay:o,timeInterval:f})))},datePickerProps:{id:n,showIcon:!0,icon:(0,X.jsx)(le,{}),toggleCalendarOnIconClick:!0,minDate:u(i),showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:m,timeFormat:c.short.icu,todayButton:b(`Today`),calendarStartDay:d,timeIntervals:f,filterTime:e=>ri(new Date(e),i,f)}}),(0,X.jsx)(ce,{id:e,label:`All Day`,enabled:o,style:{margin:0},onClick:e=>r(q.setAllDay({enabled:e,eventDuration:p}))})]}),(0,X.jsx)(ua,{})]}),(0,X.jsx)(Qr,{})]})},fa=n.div`
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
`,pa=()=>{let{rrule:e}=A(J.state),n=(0,D.useMemo)(Ve,[]),r=e?v(e,{forceset:!0}).all((e,t)=>t<10).map(e=>`${C(t(e),`yyyy-MM-dd HH:mm`)} [${_e(e)}]`):[];return(0,X.jsxs)(fa,{children:[(0,X.jsx)(da,{}),n&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:e}),(0,X.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},ma=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,ha(n)),$(t,`end`,ha(r)),$(t,`until`,i?ha(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},ha=e=>C(u(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},ga=e=>{let t=ee(e.event.rrule),{byweekday:n,bysetpos:r}=sr(t?.options.byweekday),i=cr(e.event.repeatType),a=lr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||p.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?ur(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Cn({reducer:{app:hr,event:fr},preloadedState:o})},_a=new WeakSet,va=e=>{if(_a.has(e))return;_a.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=ga(JSON.parse(t.textContent)),i=be.createRoot(n);r.subscribe(()=>{ma(r,e)}),ma(r,e),i.render((0,X.jsx)(Ne,{store:r,children:(0,X.jsx)(pa,{})}))},ya=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(va)},ba=()=>{ya(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&va(e),ya(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ba):ba();