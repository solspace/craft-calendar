import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,g as c,i as l,j as u,n as d,r as f,s as p,t as m,v as h,y as g}from"./localization-Dt_HqhpZ.js";import{C as _,S as v,T as y,_ as b,a as ee,b as te,c as ne,d as re,f as ie,g as ae,h as x,i as oe,l as se,m as S,n as ce,o as le,p as ue,r as de,s as fe,t as pe,u as me,v as he,x as C,y as ge}from"./calendar-preview.operations-BIHfc-I8.js";import{n as _e,t as ve}from"./dist-atW_9FYd.js";import{t as ye}from"./interaction-eU4e2uZa.js";import{a as be,b as xe,c as Se,f as Ce,g as we,h as w,i as Te,l as Ee,m as De,n as Oe,o as ke,p as Ae,r as T,s as E,t as D,v as je,y as O}from"./components-B8LQaiF0.js";function Me(e,t){let n=p(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=w(n.getDate(),2),t=w(n.getMonth()+1,2);a=`${w(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=w(Math.trunc(t/60),2),r=w(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=w(n.getHours(),2),r=w(n.getMinutes(),2),i=w(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Ne=u((t=>{var n=e();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Pe=u(((e,t)=>{t.exports=Ne()})),Fe=i(n()),k=i(e(),1),Ie=Pe();function Le(e){e()}function Re(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Le(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var ze={notify(){},get:()=>[]};function Be(e,t){let n,r=ze,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Re())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=ze)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Ve=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,He=typeof navigator<`u`&&navigator.product===`ReactNative`,Ue=Ve||He?k.useLayoutEffect:k.useEffect,We=Symbol.for(`react-redux-context`),Ge=typeof globalThis<`u`?globalThis:{};function Ke(){if(!k.createContext)return{};let e=Ge[We]??(Ge[We]=new Map),t=e.get(k.createContext);return t||(t=k.createContext(null),e.set(k.createContext,t)),t}var A=Ke();function qe(e){let{children:t,context:n,serverState:r,store:i}=e,a=k.useMemo(()=>{let e=Be(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=k.useMemo(()=>i.getState(),[i]);Ue(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||A;return k.createElement(s.Provider,{value:a},t)}var Je=qe;function Ye(e=A){return function(){return k.useContext(e)}}var Xe=Ye();function Ze(e=A){let t=e===A?Xe:Ye(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Qe=Ze();function $e(e=A){let t=e===A?Qe:Ze(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var j=$e(),et=(e,t)=>e===t;function tt(e=A){let t=e===A?Xe:Ye(e),n=(e,n={})=>{let{equalityFn:r=et}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();k.useRef(!0);let s=k.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Ie.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return k.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var M=tt(),nt=()=>!1;function N(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var rt=typeof Symbol==`function`&&Symbol.observable||`@@observable`,it=()=>Math.random().toString(36).substring(7).split(``).join(`.`),at={INIT:`@@redux/INIT${it()}`,REPLACE:`@@redux/REPLACE${it()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${it()}`};function ot(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function st(e,t,n){if(typeof e!=`function`)throw Error(N(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(N(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(N(1));return n(st)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(N(3));return i}function d(e){if(typeof e!=`function`)throw Error(N(4));if(c)throw Error(N(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(N(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!ot(e))throw Error(N(7));if(e.type===void 0)throw Error(N(8));if(typeof e.type!=`string`)throw Error(N(17));if(c)throw Error(N(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(N(10));r=e,f({type:at.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(N(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[rt](){return this}}}return f({type:at.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[rt]:m}}function ct(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:at.INIT})===void 0)throw Error(N(12));if(n(void 0,{type:at.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(N(13))})}function lt(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{ct(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(N(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function ut(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function dt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(N(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=ut(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function ft(e){return ot(e)&&`type`in e&&typeof e.type==`string`}var pt=Symbol.for(`immer-nothing`),mt=Symbol.for(`immer-draftable`),P=Symbol.for(`immer-state`);function F(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var I=Object,L=I.getPrototypeOf,ht=`constructor`,gt=`prototype`,_t=`configurable`,vt=`enumerable`,yt=`writable`,R=`value`,z=e=>!!e&&!!e[P];function B(e){return e?St(e)||kt(e)||!!e[mt]||!!e[ht]?.[mt]||At(e)||jt(e):!1}var bt=I[gt][ht].toString(),xt=new WeakMap;function St(e){if(!e||!Mt(e))return!1;let t=L(e);if(t===null||t===I[gt])return!0;let n=I.hasOwnProperty.call(t,ht)&&t[ht];if(n===Object)return!0;if(!V(n))return!1;let r=xt.get(n);return r===void 0&&(r=Function.toString.call(n),xt.set(n,r)),r===bt}function Ct(e,t,n=!0){wt(e)===0?(n?Reflect.ownKeys(e):I.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function wt(e){let t=e[P];return t?t.type_:kt(e)?1:At(e)?2:jt(e)?3:0}var Tt=(e,t,n=wt(e))=>n===2?e.has(t):I[gt].hasOwnProperty.call(e,t),Et=(e,t,n=wt(e))=>n===2?e.get(t):e[t],Dt=(e,t,n,r=wt(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Ot(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var kt=Array.isArray,At=e=>e instanceof Map,jt=e=>e instanceof Set,Mt=e=>typeof e==`object`,V=e=>typeof e==`function`,Nt=e=>typeof e==`boolean`;function Pt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var H=e=>e.copy_||e.base_,Ft=e=>e.modified_?e.copy_:e.base_;function It(e,t){if(At(e))return new Map(e);if(jt(e))return new Set(e);if(kt(e))return Array[gt].slice.call(e);let n=St(e);if(t===!0||t===`class_only`&&!n){let t=I.getOwnPropertyDescriptors(e);delete t[P];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[yt]===!1&&(a[yt]=!0,a[_t]=!0),(a.get||a.set)&&(t[i]={[_t]:!0,[yt]:!0,[vt]:a[vt],[R]:e[i]})}return I.create(L(e),t)}else{let t=L(e);if(t!==null&&n)return{...e};let r=I.create(t);return I.assign(r,e)}}function Lt(e,t=!1){return Bt(e)||z(e)||!B(e)?e:(wt(e)>1&&I.defineProperties(e,{set:zt,add:zt,clear:zt,delete:zt}),I.freeze(e),t&&Ct(e,(e,t)=>{Lt(t,!0)},!1),e)}function Rt(){F(2)}var zt={[R]:Rt};function Bt(e){return e===null||!Mt(e)?!0:I.isFrozen(e)}var Vt=`MapSet`,Ht=`Patches`,Ut=`ArrayMethods`,Wt={};function U(e){let t=Wt[e];return t||F(0,e),t}var Gt=e=>!!Wt[e],W,Kt=()=>W,qt=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:Gt(Vt)?U(Vt):void 0,arrayMethodsPlugin_:Gt(Ut)?U(Ut):void 0});function Jt(e,t){t&&(e.patchPlugin_=U(Ht),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Yt(e){Xt(e),e.drafts_.forEach(Qt),e.drafts_=null}function Xt(e){e===W&&(W=e.parent_)}var Zt=e=>W=qt(W,e);function Qt(e){let t=e[P];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function $t(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[P].modified_&&(Yt(t),F(4)),B(e)&&(e=en(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[P].base_,e,t)}else e=en(t,n);return tn(t,e,!0),Yt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===pt?void 0:e}function en(e,t){if(Bt(t))return t;let n=t[P];if(!n)return un(t,e.handledSet_,e);if(!rn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);cn(n,e)}return n.copy_}function tn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Lt(t,n)}function nn(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var rn=(e,t)=>e.scope_===t,an=[];function on(e,t,n,r){let i=H(e),a=e.type_;if(r!==void 0&&Et(i,r,a)===t){Dt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;Ct(i,(e,n)=>{if(z(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??an;for(let e of o)Dt(i,e,n,a)}function sn(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!rn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Ft(i);on(e,i.draft_??i,a,n),cn(i,r)})}function cn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}nn(e)}}function ln(e,t,n){let{scope_:r}=e;if(z(n)){let i=n[P];rn(i,r)&&i.callbacks_.push(function(){_n(e),on(e,n,Ft(i),t)})}else B(n)&&e.callbacks_.push(function(){let i=H(e);e.type_===3?i.has(n)&&un(n,r.handledSet_,r):Et(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&un(Et(e.copy_,t,e.type_),r.handledSet_,r)})}function un(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||z(e)||t.has(e)||!B(e)||Bt(e)?e:(t.add(e),Ct(e,(r,i)=>{if(z(i)){let t=i[P];rn(t,n)&&(Dt(e,r,Ft(t),e.type_),nn(t))}else B(i)&&un(i,t,n)}),e)}function dn(e,t){let n=kt(e),r={type_:+!!n,scope_:t?t.scope_:Kt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=fn;n&&(i=[r],a=G);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var fn={get(e,t){if(t===P)return e;if(t===`constructor`||t===`__proto__`){let n=H(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=H(e);if(!Tt(i,t,e.type_))return mn(e,i,t);let a=i[t];if(e.finalized_||!B(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Pt(t))return a;if(a===pn(e.base_,t)){_n(e);let n=e.type_===1?+t:t,r=yn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in H(e)},ownKeys(e){return Reflect.ownKeys(H(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=hn(H(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=pn(H(e),t),i=r?.[P];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Ot(n,r)&&(n!==void 0||Tt(e.base_,t,e.type_)))return!0;_n(e),gn(e)}return e.copy_[t]===n&&(n!==void 0||Tt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),ln(e,t,n),!0)},deleteProperty(e,t){return _n(e),pn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),gn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=H(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[yt]:!0,[_t]:e.type_!==1||t!==`length`,[vt]:r[vt],[R]:n[t]}},defineProperty(){F(11)},getPrototypeOf(e){return L(e.base_)},setPrototypeOf(){F(12)}},G={};for(let e in fn){let t=fn[e];G[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}G.deleteProperty=function(e,t){return G.set.call(this,e,t,void 0)},G.set=function(e,t,n){return fn.set.call(this,e[0],t,n,e[0])};function pn(e,t){let n=e[P];return(n?H(n):e)[t]}function mn(e,t,n){let r=hn(t,n);return r?R in r?r[R]:r.get?.call(e.draft_):void 0}function hn(e,t){if(!(t in e))return;let n=L(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=L(n)}}function gn(e){e.modified_||(e.modified_=!0,e.parent_&&gn(e.parent_))}function _n(e){e.copy_||(e.assigned_=new Map,e.copy_=It(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var vn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(V(e)&&!V(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}V(t)||F(6),n!==void 0&&!V(n)&&F(7);let r;if(B(e)){let i=Zt(this),a=yn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?Yt(i):Xt(i)}return Jt(i,n),$t(r,i)}else if(!e||!Mt(e)){if(r=t(e),r===void 0&&(r=e),r===pt&&(r=void 0),this.autoFreeze_&&Lt(r,!0),n){let t=[],i=[];U(Ht).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else F(1,e)},this.produceWithPatches=(e,t)=>{if(V(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Nt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Nt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Nt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){B(e)||F(8),z(e)&&(e=bn(e));let t=Zt(this),n=yn(t,e,void 0);return n[P].isManual_=!0,Xt(t),n}finishDraft(e,t){let n=e&&e[P];(!n||!n.isManual_)&&F(9);let{scope_:r}=n;return Jt(r,t),$t(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=U(Ht).applyPatches_;return z(e)?r(e,t):this.produce(e,e=>r(e,t))}};function yn(e,t,n,r){let[i,a]=At(t)?U(Vt).proxyMap_(t,n):jt(t)?U(Vt).proxySet_(t,n):dn(t,n);return(n?.scope_??Kt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?sn(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function bn(e){return z(e)||F(10,e),xn(e)}function xn(e){if(!B(e)||Bt(e))return e;let t=e[P],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=It(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=It(e,!0);return Ct(n,(e,t)=>{Dt(n,e,xn(t))},r),t&&(t.finalized_=!1),n}var Sn=new vn().produce;function Cn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var wn=Cn(),Tn=Cn,En=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?ut:ut.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Dn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(K(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>ft(t)&&t.type===e,n}var On=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function kn(e){return B(e)?Sn(e,()=>{}):e}function An(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function jn(e){return typeof e==`boolean`}var Mn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new On;return t&&(jn(t)?a.push(wn):a.push(Tn(t.extraArgument))),a},Nn=`RTK_autoBatch`,Pn=e=>t=>{setTimeout(t,e)},Fn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},In=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Fn(window.requestAnimationFrame,100):Pn(10):e.type===`callback`?e.queueNotification:Pn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Nn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Ln=e=>function(t){let{autoBatch:n=!0}=t??{},r=new On(e);return n&&r.push(In(typeof n==`object`?n:void 0)),r};function Rn(e){let t=Mn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(ot(n))c=lt(n);else throw Error(K(1));let l;l=typeof r==`function`?r(t):t();let u=ut;i&&(u=En({trace:!1,...typeof i==`object`&&i}));let d=Ln(dt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return st(c,o,p)}function zn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(K(28));if(r in t)throw Error(K(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Bn(e){return typeof e==`function`}function Vn(e,t){let[n,r,i]=zn(t),a;if(Bn(e))a=()=>kn(e());else{let t=kn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(z(e)){let r=n(e,t);return r===void 0?e:r}else if(B(e))return Sn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Hn=Symbol.for(`rtk-slice-createasyncthunk`);function Un(e,t){return`${e}/${t}`}function Wn({creators:e}={}){let t=e?.asyncThunk?.[Hn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(K(11));let i=(typeof e.reducers==`function`?e.reducers(qn()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(K(12));if(n in o.sliceCaseReducersByType)throw Error(K(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:Un(n,r),createNotation:typeof e.reducers==`function`};Yn(a)?Zn(o,a,s,t):Jn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?zn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Vn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=An(d,r,m)),i}function i(t=l){return An(An(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=Gn(a,t,()=>An(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function Gn(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var Kn=Wn();function qn(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function Jn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!Xn(r))throw Error(K(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Dn(e,o):Dn(e))}function Yn(e){return e._reducerDefinitionType===`asyncThunk`}function Xn(e){return e._reducerDefinitionType===`reducerWithPrepare`}function Zn({type:e,reducerName:t},n,r,i){if(!i)throw Error(K(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||Qn,pending:s||Qn,rejected:c||Qn,settled:l||Qn})}function Qn(){}var $n=`listener`,er=`completed`,tr=`cancelled`;`${tr}`,`${er}`,`${$n}${tr}`,`${$n}${er}`;var{assign:nr}=Object,rr=`listenerMiddleware`,ir=nr(Dn(`${rr}/add`),{withTypes:()=>ir});`${rr}`;var ar=nr(Dn(`${rr}/remove`),{withTypes:()=>ar});function K(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var or=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),sr=new Set([`NEVER`,`AFTER`,`ON_DATE`]),cr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},lr=e=>or.has(e)?e:`NEVER`,ur=e=>sr.has(e)?e:`NEVER`,dr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,fr=Kn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:v.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),r!==void 0&&(e.until=e.start+r),x(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=re(e,n),x(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=o(e.start);a.setHours(i,0,0,0),e.start=h(a);let s=o(e.end);n?s=xe(O(s),1):(s=Ae(s,1),s=Ce(s,a.getHours()),s=je(s,r)),e.end=h(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),x(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=b(e.rrule)),e.repeatType=t.payload,x(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=dr(e.count):e.count=null,x(e)},setFreq:(e,t)=>{e.freq=t.payload,he(e,t.payload),x(e)},setCount:(e,t)=>{e.count=dr(t.payload),x(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),x(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=S(r),x(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=S(n.byweekday)),`bymonth`in n&&(e.bymonth=S(n.bymonth)),`bymonthday`in n&&(e.bymonthday=S(n.bymonthday)),`byyearday`in n&&(e.byyearday=S(n.byyearday)),`bysetpos`in n&&(e.bysetpos=S(n.bysetpos)),x(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=fr,pr=fr.reducer,J={state:e=>e.event},mr=Kn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:hr}=mr,gr=mr.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},_r=r.div`
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
`,vr=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  margin-top: 10px;
  width: 400px;
  flex: 0 0 400px;
  box-sizing: border-box;
`,yr=r.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,br=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,xr=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Sr=r.div`
  min-width: 120px;
  max-width: 120px;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,Cr=r.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 4px;

  height: 100%;
  max-height: 215px;
  margin-top: 0;
`,wr=r.li`
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
`,Tr=r.button`
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
`,X=a(),Er=8,Dr=()=>{let e=j(),n=M(Y.weekStartDay),r=M(J.state),{start:i,rrule:a}=r,[o,s]=(0,k.useState)(null),c=(0,k.useMemo)(()=>oe(a,i),[a,i]),u=(0,k.useMemo)(()=>de(c,o),[c,o]),f=(0,k.useMemo)(()=>ee(c,o?.start??null,Er),[c,o]),p=(0,k.useMemo)(()=>fe(c),[c]),h=(0,k.useMemo)(()=>{let e=ce(c,f.length);return e?le(e):null},[c,f]),_=(0,k.useCallback)((t,n,i)=>{e(q.setRRule(pe(r,c,t,n,i)))},[e,c,r]),v=(0,k.useCallback)(e=>{let t=ne(c,e);if(t){let{timestamp:n}=se(c,e);_(t,n,t===`exdate`)}},[_,c]),y=(0,k.useCallback)(e=>{let t=se(c,e);if(t.base&&t.excluded){_(`exdate`,t.timestamp,!1);return}if(t.full){v(e);return}t.full||_(`rdate`,t.timestamp,!0)},[_,c,v]),b=(0,k.useCallback)(e=>se(c,e),[c]);return(0,X.jsx)(_r,{children:(0,X.jsxs)(E,{children:[(0,X.jsxs)(D,{$direction:`column`,$gap:10,children:[(0,X.jsx)(yr,{children:l(`Schedule Preview`)}),p&&(0,X.jsx)(br,{children:p})]}),(0,X.jsxs)(vr,{children:[(0,X.jsxs)(D,{$direction:`column`,$gap:10,children:[(0,X.jsx)(ve,{...m(),aspectRatio:2,height:250,expandRows:!1,themeSystem:`bootstrap5`,plugins:[_e,ye],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(d().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:n,timeZone:`UTC`,eventDisplay:`none`,events:u,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>s({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=b(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>y(e.date)}),h&&(0,X.jsx)(xr,{children:h})]}),(0,X.jsx)(Sr,{children:f.length===0?(0,X.jsxs)(`p`,{children:[l(`No occurrences starting from`),(0,X.jsx)(`br`,{}),De(t(o?.currentStart??new Date),`PP`,{locale:d()})]}):(0,X.jsx)(Cr,{$count:f.length,children:f.map(e=>{let t=new Date(e*1e3),n=g(t),r=ne(c,t),i=l(r===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:n});return(0,X.jsxs)(wr,{children:[(0,X.jsx)(`span`,{children:n}),r&&(0,X.jsx)(Tr,{type:`button`,"aria-label":i,title:i,onClick:()=>v(t),children:`×`})]},n)})})})]})]})})},Or=r.div`
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
`,kr=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,Ar=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,jr=e=>h(Ae(o(e),1)),Mr=(e,t,n)=>{let r=Pr(t,n);return e.getTime()>=r.getTime()},Nr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return h(xe(O(o(e)),1));let i=o(e),a=Pr(t,r);return i.getTime()>=a.getTime()?e:h(a)},Pr=(e,t)=>je(o(e),t),Fr=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Ir=({inputValue:e,value:t,min:n})=>{let r=Fr(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Lr=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,k.useState)(e?.toString()??``),o=(0,k.useRef)(void 0),s=(0,k.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,k.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,k.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,k.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,k.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Fr(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,k.useCallback)(n=>{n.stopPropagation();let r=Ir({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Rr=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Lr({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(E,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},zr=()=>null,Z=[{value:`MO`,label:`Monday`,days:[C.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[C.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[C.WE.weekday]},{value:`TH`,label:`Thursday`,days:[C.TH.weekday]},{value:`FR`,label:`Friday`,days:[C.FR.weekday]},{value:`SA`,label:`Saturday`,days:[C.SA.weekday]},{value:`SU`,label:`Sunday`,days:[C.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[C.MO.weekday,C.TU.weekday,C.WE.weekday,C.TH.weekday,C.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[C.SA.weekday,C.SU.weekday]}],Br=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},Vr=(e,t)=>{let n=Br(e),r=Br(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Hr=(e,t)=>{if(e){let t=Z.find(t=>Vr(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},Ur=e=>Z.find(t=>t.value===e)?.days??[C.MO.weekday],Q=`5px`,Wr=r.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,Gr=r(Wr)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,Kr=r(Wr)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,qr=r.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,Jr=r(qr)`
  grid-template-columns: repeat(7, 1fr);

  ${Wr} {
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
`,Yr=r(qr)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${Wr} {
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
`,Xr=r(qr)`
  grid-template-columns: repeat(4, 1fr);

  ${Wr} {
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
`,Zr=({label:e,values:t,onChange:n})=>(0,X.jsx)(E,{label:e,children:(0,X.jsxs)(Jr,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(Gr,{type:`button`,className:Ee(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(Kr,{},e))]})}),Qr=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],$r=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],ei=()=>{let e=j(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=M(J.state),a=o(t),s=a.getDate(),c=(a.getDay()+6)%7,l=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[s],d=i?.[0]??1,f=Hr(r,c),p=t=>{e(q.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(q.setByRules({bymonthday:void 0,byweekday:Ur(t),bysetpos:[n]}))};return(0,X.jsxs)(D,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(T,{translateOptions:!0,label:`Repeat on`,value:l,options:Qr,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,X.jsx)(Zr,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,X.jsxs)(D,{children:[(0,X.jsx)(T,{translateOptions:!0,label:`Position`,value:d,options:$r,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(T,{translateOptions:!0,label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},ti=[{weekday:C.SU,label:`Sun`},{weekday:C.MO,label:`Mon`},{weekday:C.TU,label:`Tue`},{weekday:C.WE,label:`Wed`},{weekday:C.TH,label:`Thu`},{weekday:C.FR,label:`Fri`},{weekday:C.SA,label:`Sat`}],ni=()=>{let e=j(),{byweekday:t}=M(J.state);return(0,X.jsx)(D,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,X.jsx)(E,{label:`On`,children:(0,X.jsx)(Yr,{children:ti.map(({weekday:n,label:r})=>(0,X.jsx)(Gr,{type:`button`,className:Ee(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:l(r)},n.weekday))})})})},ri=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],ii=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],ai=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],oi=()=>{let e=j(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=M(J.state),s=o(t),c=s.getDate(),u=s.getMonth()+1,d=(s.getDay()+6)%7,f=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,p=r?.length?r:[c],m=n?.length?n:[u],h=a?.[0]??1,g=Hr(i,d),_=(t,n)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(t,n,r)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:Ur(n),bysetpos:[r]}))};return(0,X.jsxs)(D,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(E,{label:`Month`,children:(0,X.jsx)(Xr,{children:ai.map(e=>{let t=m.includes(e.value);return(0,X.jsx)(Gr,{type:`button`,className:Ee(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:l(e.label)},e.value)})})}),(0,X.jsx)(T,{translateOptions:!0,label:`Repeat on`,value:f,options:ri,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,X.jsx)(Zr,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,X.jsxs)(D,{children:[(0,X.jsx)(T,{translateOptions:!0,label:`Position`,value:h,options:ii,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,X.jsx)(T,{translateOptions:!0,label:`Day`,value:g,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},si=()=>{let{freq:e}=M(J.state);return e===v.DAILY?(0,X.jsx)(zr,{}):e===v.WEEKLY?(0,X.jsx)(ni,{}):e===v.MONTHLY?(0,X.jsx)(ei,{}):e===v.YEARLY?(0,X.jsx)(oi,{}):null},ci=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),li=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),ui=()=>{let e=j(),{interval:t}=M(J.state);return(0,X.jsxs)(di,{children:[(0,X.jsx)(`span`,{children:l(`Every`)}),(0,X.jsx)(fi,{"aria-label":l(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(q.setInterval(n))}}),(0,X.jsxs)(pi,{children:[(0,X.jsx)(mi,{type:`button`,"aria-label":l(`Increase interval`),onClick:()=>e(q.setInterval(t+1)),children:(0,X.jsx)(li,{})}),(0,X.jsx)(mi,{type:`button`,"aria-label":l(`Decrease interval`),onClick:()=>e(q.setInterval(t-1)),children:(0,X.jsx)(ci,{})})]})]})},di=r.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,fi=r.input`
  width: 60px;
`,pi=r.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,mi=r.button`
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
`,hi=_({position:[`bottom`,`top`],alignment:`end`,padding:8}),gi=(e,t,n,r)=>{let[i,a]=(0,k.useState)();return(0,k.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=y({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:hi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},_i=(e,t,n)=>{(0,k.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},vi=r.div`
  padding-top: 18px;
  width: 100%;
`,yi=r.div`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`,bi=r.p`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 400;
`,xi=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Si=r.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }

  ${be}

  .react-datepicker__current-month {
    display: none;
  }
`,Ci=r.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,wi=r.div`
  position: relative;
  flex-shrink: 0;
`,Ti=r.button`
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
`,Ei=r.div`
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
`,Di=r.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Oi=r.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,ki=r.li`
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
`,Ai=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:p})=>{let[m,g]=(0,k.useState)(!1),_=(0,k.useRef)(null),v=(0,k.useRef)(null),y=(0,k.useRef)(null),b=gi(m,v,y,_);return(0,k.useEffect)(()=>{a.length===0&&g(!1)},[a.length]),_i(m,[v,y],()=>g(!1)),(0,X.jsxs)(vi,{children:[(0,X.jsx)(yi,{children:l(e)}),t&&(0,X.jsx)(bi,{children:l(t)}),(0,X.jsxs)(xi,{children:[(0,X.jsxs)(wi,{ref:_,children:[(0,X.jsx)(Ti,{ref:v,type:`button`,disabled:a.length===0,className:Ee({active:m}),onClick:()=>{a.length!==0&&g(e=>!e)},children:a.length}),m&&(0,X.jsxs)(Ei,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,X.jsx)(Di,{children:l(i)}),(0,X.jsx)(Oi,{children:a.map(e=>(0,X.jsxs)(ki,{children:[(0,X.jsx)(`span`,{children:c(e)}),(0,X.jsx)(`button`,{type:`button`,"aria-label":l(`Remove date {date}`,{date:c(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,X.jsx)(Si,{children:(0,X.jsx)(Se,{...f(),selected:null,onChange:e=>{e&&d(h(O(e)))},customInput:(0,X.jsx)(ji,{label:n,className:Ee(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:l(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},ji=(0,k.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Ci,{type:`button`,ref:n,...t,children:l(e)}));ji.displayName=`PickerTrigger`;var Mi=r.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,Ni=()=>{let e=j(),n=M(J.state),{start:r,rrule:i}=n,a=(0,k.useMemo)(()=>oe(i,r),[i,r]),{startTimestamp:o,baseRule:l,recurrenceSet:u}=a,d=(0,k.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>h(O(t(e)))).filter(e=>l?!0:e!==o))).sort((e,t)=>e-t):[],[l,u,o]),f=(0,k.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>h(O(t(e)))))).sort((e,t)=>e-t):[],[u]),p=(0,k.useMemo)(()=>new Set(d),[d]),m=(0,k.useMemo)(()=>new Set(f),[f]),g=(0,k.useCallback)(e=>{let t=s(O(e)),n=c(we(e)),r=l?l.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:h(O(e))===o;return{full:i,base:r,excluded:r&&!i}},[l,u,o]),_=r=>{let i=r({baseRule:l,rdates:u?.rdates().filter(e=>l?!0:h(O(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(q.setRRule(ue(n,i.baseRule,Pi(i.rdates),Pi(i.exdates))))};return{addedDates:d,excludedDates:f,addFixedDate:(e,t)=>{if(e===`exdate`&&me(a,t))return;let r=ie(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:ae(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&me(a,t))return;let r=ie(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?ae(n,r):n,exdates:e===`exdate`?ae(i,r):i}))},canAddOccurrence:(0,k.useCallback)(e=>{let t=h(O(e)),n=g(e);return!n.full&&!n.excluded&&!p.has(t)},[p,g]),canExcludeOccurrence:(0,k.useCallback)(e=>{let t=h(O(e)),n=g(e);return n.base&&!n.excluded&&!m.has(t)&&!me(a,t)},[m,g,a]),getStatus:g}},Pi=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},Fi=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],Ii=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Li=e=>[{value:v.DAILY,label:e?`Days`:`Day`},{value:v.WEEKLY,label:e?`Weeks`:`Week`},{value:v.MONTHLY,label:e?`Months`:`Month`},{value:v.YEARLY,label:e?`Years`:`Year`}],Ri=300,zi=()=>{let e=j(),t=M(J.state),n=M(Y.weekStartDay),{repeatType:r,repeatEndType:i,count:a,until:s,freq:c,start:l,interval:u}=t,d=r!==`NEVER`,{addedDates:f,excludedDates:p,addFixedDate:m,removeFixedDate:h,canAddOccurrence:g,canExcludeOccurrence:_}=Ni(),v=(0,k.useMemo)(()=>o(l),[l]),y=e=>De(o(e),`yyyy-MM-dd`);return(0,X.jsxs)(Mi,{children:[(0,X.jsxs)(D,{$alignItems:`end`,style:{width:`100%`},children:[(0,X.jsx)(T,{translateOptions:!0,label:`Repeats`,value:r,options:Fi,onChange:t=>e(q.setRepeatType(t))}),r===`CUSTOM`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(ui,{}),(0,X.jsx)(T,{translateOptions:!0,label:``,value:c,options:Li(u>1),onChange:t=>e(q.setFreq(Number.parseInt(t,10)))})]})]}),r===`CUSTOM`&&(0,X.jsx)(si,{}),r!==`NEVER`&&(0,X.jsxs)(D,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(T,{translateOptions:!0,label:`Ends`,options:Ii,value:i,onChange:t=>e(q.setRepeatEndType(t))}),i===`AFTER`&&(0,X.jsx)(Rr,{label:`Times`,value:a,min:1,debounceMs:Ri,onChange:t=>e(q.setCount(t))}),i===`ON_DATE`&&(0,X.jsx)(Te,{label:``,value:s||null,onChange:t=>e(q.setUntil(t)),datePickerProps:{showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:v}})]}),(0,X.jsxs)(D,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,X.jsx)(Ai,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:f,openToDate:v,formatDate:y,filterDate:g,weekStartDay:n,onAdd:e=>m(`rdate`,e),onRemove:e=>h(`rdate`,e)}),d&&(0,X.jsx)(Ai,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:p,openToDate:v,formatDate:y,filterDate:_,weekStartDay:n,onAdd:e=>m(`exdate`,e),onRemove:e=>h(`exdate`,e)})]})]})},Bi=()=>{let e=(0,k.useId)(),t=(0,k.useId)(),n=(0,k.useId)(),r=j(),{start:i,end:a,allDay:s}=M(J.state),{date:c,time:u,datetime:d}=M(Y.formats),f=M(Y.weekStartDay),p=M(Y.timeInterval),m=M(Y.eventDuration),h=(0,k.useMemo)(()=>s?c.short.icu:d.short.icu,[s,c,d]),g=(0,k.useMemo)(()=>s?jr(a):a,[s,a]);return(0,X.jsxs)(Or,{children:[(0,X.jsxs)(kr,{children:[(0,X.jsxs)(Ar,{children:[(0,X.jsx)(Te,{id:t,label:`Starts`,value:i,onChange:e=>r(q.setStart(e)),datePickerProps:{id:t,showIcon:!0,icon:(0,X.jsx)(ke,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!s,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:h,timeFormat:u.short.icu,todayButton:l(`Today`),calendarStartDay:f,timeIntervals:p}}),(0,X.jsx)(Te,{id:n,label:`Ends`,value:g,onChange:e=>{e!=null&&r(q.setEnd(Nr({value:e,start:i,allDay:s,timeInterval:p})))},datePickerProps:{id:n,showIcon:!0,icon:(0,X.jsx)(ke,{}),toggleCalendarOnIconClick:!0,minDate:o(i),showTimeSelect:!s,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:h,timeFormat:u.short.icu,todayButton:l(`Today`),calendarStartDay:f,timeIntervals:p,filterTime:e=>Mr(new Date(e),i,p)}}),(0,X.jsx)(Oe,{id:e,label:`All Day`,enabled:s,style:{margin:0},onClick:e=>r(q.setAllDay({enabled:e,eventDuration:m}))})]}),(0,X.jsx)(zi,{})]}),(0,X.jsx)(Dr,{})]})},Vi=r.div`
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
`,Hi=()=>{let{rrule:e}=M(J.state),n=(0,k.useMemo)(nt,[]),r=e?te(e,{forceset:!0}).all((e,t)=>t<10).map(e=>`${De(t(e),`yyyy-MM-dd HH:mm`)} [${Me(e)}]`):[];return(0,X.jsxs)(Vi,{children:[(0,X.jsx)(Bi,{}),n&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:e}),(0,X.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},Ui=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,Wi(n)),$(t,`end`,Wi(r)),$(t,`until`,i?Wi(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},Wi=e=>De(o(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},Gi=e=>{let t=ge(e.event.rrule),{byweekday:n,bysetpos:r}=cr(t?.options.byweekday),i=lr(e.event.repeatType),a=ur(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||v.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?dr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Rn({reducer:{app:gr,event:pr},preloadedState:o})},Ki=new WeakSet,qi=e=>{if(Ki.has(e))return;Ki.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=Gi(JSON.parse(t.textContent)),i=Fe.createRoot(n);r.subscribe(()=>{Ui(r,e)}),Ui(r,e),i.render((0,X.jsx)(Je,{store:r,children:(0,X.jsx)(Hi,{})}))},Ji=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(qi)},Yi=()=>{Ji(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&qi(e),Ji(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Yi):Yi();