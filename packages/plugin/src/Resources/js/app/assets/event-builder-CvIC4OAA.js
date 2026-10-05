import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,g as c,i as l,j as u,n as d,r as f,s as p,t as m,v as h,y as g}from"./localization-Dt_HqhpZ.js";import{C as _,S as v,T as y,_ as b,a as ee,b as te,c as ne,d as re,f as ie,g as ae,h as x,i as oe,l as se,m as S,n as ce,o as le,p as ue,r as de,s as fe,t as pe,u as me,v as he,x as C,y as ge}from"./calendar-preview.operations-BIHfc-I8.js";import{n as _e,t as ve}from"./dist-atW_9FYd.js";import{t as ye}from"./interaction-eU4e2uZa.js";import{a as be,b as xe,c as Se,f as Ce,g as we,h as w,i as Te,l as T,m as E,n as Ee,o as De,p as Oe,r as D,s as ke,t as O,v as Ae,y as k}from"./components-B8LQaiF0.js";function je(e,t){let n=p(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=w(n.getDate(),2),t=w(n.getMonth()+1,2);a=`${w(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=w(Math.trunc(t/60),2),r=w(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=w(n.getHours(),2),r=w(n.getMinutes(),2),i=w(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Me=u((t=>{var n=e();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Ne=u(((e,t)=>{t.exports=Me()})),Pe=i(n()),A=i(e(),1),Fe=Ne();function Ie(e){e()}function Le(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Ie(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Re={notify(){},get:()=>[]};function ze(e,t){let n,r=Re,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Le())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Re)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Be=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ve=typeof navigator<`u`&&navigator.product===`ReactNative`,He=Be||Ve?A.useLayoutEffect:A.useEffect,Ue=Symbol.for(`react-redux-context`),We=typeof globalThis<`u`?globalThis:{};function Ge(){if(!A.createContext)return{};let e=We[Ue]??(We[Ue]=new Map),t=e.get(A.createContext);return t||(t=A.createContext(null),e.set(A.createContext,t)),t}var j=Ge();function Ke(e){let{children:t,context:n,serverState:r,store:i}=e,a=A.useMemo(()=>{let e=ze(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=A.useMemo(()=>i.getState(),[i]);He(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||j;return A.createElement(s.Provider,{value:a},t)}var qe=Ke;function Je(e=j){return function(){return A.useContext(e)}}var Ye=Je();function Xe(e=j){let t=e===j?Ye:Je(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Ze=Xe();function Qe(e=j){let t=e===j?Ze:Xe(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var M=Qe(),$e=(e,t)=>e===t;function et(e=j){let t=e===j?Ye:Je(e),n=(e,n={})=>{let{equalityFn:r=$e}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();A.useRef(!0);let s=A.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Fe.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return A.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var N=et(),tt=()=>!1;function P(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var nt=typeof Symbol==`function`&&Symbol.observable||`@@observable`,rt=()=>Math.random().toString(36).substring(7).split(``).join(`.`),it={INIT:`@@redux/INIT${rt()}`,REPLACE:`@@redux/REPLACE${rt()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${rt()}`};function at(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function ot(e,t,n){if(typeof e!=`function`)throw Error(P(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(P(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(P(1));return n(ot)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(P(3));return i}function d(e){if(typeof e!=`function`)throw Error(P(4));if(c)throw Error(P(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(P(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!at(e))throw Error(P(7));if(e.type===void 0)throw Error(P(8));if(typeof e.type!=`string`)throw Error(P(17));if(c)throw Error(P(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(P(10));r=e,f({type:it.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(P(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[nt](){return this}}}return f({type:it.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[nt]:m}}function st(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:it.INIT})===void 0)throw Error(P(12));if(n(void 0,{type:it.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(P(13))})}function ct(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{st(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(P(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function lt(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function ut(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(P(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=lt(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function dt(e){return at(e)&&`type`in e&&typeof e.type==`string`}var ft=Symbol.for(`immer-nothing`),pt=Symbol.for(`immer-draftable`),F=Symbol.for(`immer-state`);function I(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var L=Object,R=L.getPrototypeOf,mt=`constructor`,ht=`prototype`,gt=`configurable`,_t=`enumerable`,vt=`writable`,z=`value`,B=e=>!!e&&!!e[F];function V(e){return e?xt(e)||Dt(e)||!!e[pt]||!!e[mt]?.[pt]||Ot(e)||kt(e):!1}var yt=L[ht][mt].toString(),bt=new WeakMap;function xt(e){if(!e||!At(e))return!1;let t=R(e);if(t===null||t===L[ht])return!0;let n=L.hasOwnProperty.call(t,mt)&&t[mt];if(n===Object)return!0;if(!U(n))return!1;let r=bt.get(n);return r===void 0&&(r=Function.toString.call(n),bt.set(n,r)),r===yt}function St(e,t,n=!0){H(e)===0?(n?Reflect.ownKeys(e):L.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function H(e){let t=e[F];return t?t.type_:Dt(e)?1:Ot(e)?2:kt(e)?3:0}var Ct=(e,t,n=H(e))=>n===2?e.has(t):L[ht].hasOwnProperty.call(e,t),wt=(e,t,n=H(e))=>n===2?e.get(t):e[t],Tt=(e,t,n,r=H(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Et(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Dt=Array.isArray,Ot=e=>e instanceof Map,kt=e=>e instanceof Set,At=e=>typeof e==`object`,U=e=>typeof e==`function`,jt=e=>typeof e==`boolean`;function Mt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var W=e=>e.copy_||e.base_,Nt=e=>e.modified_?e.copy_:e.base_;function Pt(e,t){if(Ot(e))return new Map(e);if(kt(e))return new Set(e);if(Dt(e))return Array[ht].slice.call(e);let n=xt(e);if(t===!0||t===`class_only`&&!n){let t=L.getOwnPropertyDescriptors(e);delete t[F];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[vt]===!1&&(a[vt]=!0,a[gt]=!0),(a.get||a.set)&&(t[i]={[gt]:!0,[vt]:!0,[_t]:a[_t],[z]:e[i]})}return L.create(R(e),t)}else{let t=R(e);if(t!==null&&n)return{...e};let r=L.create(t);return L.assign(r,e)}}function Ft(e,t=!1){return Rt(e)||B(e)||!V(e)?e:(H(e)>1&&L.defineProperties(e,{set:Lt,add:Lt,clear:Lt,delete:Lt}),L.freeze(e),t&&St(e,(e,t)=>{Ft(t,!0)},!1),e)}function It(){I(2)}var Lt={[z]:It};function Rt(e){return e===null||!At(e)?!0:L.isFrozen(e)}var zt=`MapSet`,Bt=`Patches`,Vt=`ArrayMethods`,Ht={};function G(e){let t=Ht[e];return t||I(0,e),t}var Ut=e=>!!Ht[e],Wt,Gt=()=>Wt,Kt=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:Ut(zt)?G(zt):void 0,arrayMethodsPlugin_:Ut(Vt)?G(Vt):void 0});function qt(e,t){t&&(e.patchPlugin_=G(Bt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Jt(e){Yt(e),e.drafts_.forEach(Zt),e.drafts_=null}function Yt(e){e===Wt&&(Wt=e.parent_)}var Xt=e=>Wt=Kt(Wt,e);function Zt(e){let t=e[F];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function Qt(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[F].modified_&&(Jt(t),I(4)),V(e)&&(e=$t(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[F].base_,e,t)}else e=$t(t,n);return en(t,e,!0),Jt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===ft?void 0:e}function $t(e,t){if(Rt(t))return t;let n=t[F];if(!n)return ln(t,e.handledSet_,e);if(!nn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);sn(n,e)}return n.copy_}function en(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Ft(t,n)}function tn(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var nn=(e,t)=>e.scope_===t,rn=[];function an(e,t,n,r){let i=W(e),a=e.type_;if(r!==void 0&&wt(i,r,a)===t){Tt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;St(i,(e,n)=>{if(B(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??rn;for(let e of o)Tt(i,e,n,a)}function on(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!nn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Nt(i);an(e,i.draft_??i,a,n),sn(i,r)})}function sn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}tn(e)}}function cn(e,t,n){let{scope_:r}=e;if(B(n)){let i=n[F];nn(i,r)&&i.callbacks_.push(function(){_n(e),an(e,n,Nt(i),t)})}else V(n)&&e.callbacks_.push(function(){let i=W(e);e.type_===3?i.has(n)&&ln(n,r.handledSet_,r):wt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&ln(wt(e.copy_,t,e.type_),r.handledSet_,r)})}function ln(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||B(e)||t.has(e)||!V(e)||Rt(e)?e:(t.add(e),St(e,(r,i)=>{if(B(i)){let t=i[F];nn(t,n)&&(Tt(e,r,Nt(t),e.type_),tn(t))}else V(i)&&ln(i,t,n)}),e)}function un(e,t){let n=Dt(e),r={type_:+!!n,scope_:t?t.scope_:Gt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=dn;n&&(i=[r],a=fn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var dn={get(e,t){if(t===F)return e;if(t===`constructor`||t===`__proto__`){let n=W(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=W(e);if(!Ct(i,t,e.type_))return mn(e,i,t);let a=i[t];if(e.finalized_||!V(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Mt(t))return a;if(a===pn(e.base_,t)){_n(e);let n=e.type_===1?+t:t,r=yn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in W(e)},ownKeys(e){return Reflect.ownKeys(W(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=hn(W(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=pn(W(e),t),i=r?.[F];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(Et(n,r)&&(n!==void 0||Ct(e.base_,t,e.type_)))return!0;_n(e),gn(e)}return e.copy_[t]===n&&(n!==void 0||Ct(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),cn(e,t,n),!0)},deleteProperty(e,t){return _n(e),pn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),gn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=W(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[vt]:!0,[gt]:e.type_!==1||t!==`length`,[_t]:r[_t],[z]:n[t]}},defineProperty(){I(11)},getPrototypeOf(e){return R(e.base_)},setPrototypeOf(){I(12)}},fn={};for(let e in dn){let t=dn[e];fn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}fn.deleteProperty=function(e,t){return fn.set.call(this,e,t,void 0)},fn.set=function(e,t,n){return dn.set.call(this,e[0],t,n,e[0])};function pn(e,t){let n=e[F];return(n?W(n):e)[t]}function mn(e,t,n){let r=hn(t,n);return r?z in r?r[z]:r.get?.call(e.draft_):void 0}function hn(e,t){if(!(t in e))return;let n=R(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=R(n)}}function gn(e){e.modified_||(e.modified_=!0,e.parent_&&gn(e.parent_))}function _n(e){e.copy_||(e.assigned_=new Map,e.copy_=Pt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var vn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(U(e)&&!U(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}U(t)||I(6),n!==void 0&&!U(n)&&I(7);let r;if(V(e)){let i=Xt(this),a=yn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?Jt(i):Yt(i)}return qt(i,n),Qt(r,i)}else if(!e||!At(e)){if(r=t(e),r===void 0&&(r=e),r===ft&&(r=void 0),this.autoFreeze_&&Ft(r,!0),n){let t=[],i=[];G(Bt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else I(1,e)},this.produceWithPatches=(e,t)=>{if(U(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},jt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),jt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),jt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){V(e)||I(8),B(e)&&(e=bn(e));let t=Xt(this),n=yn(t,e,void 0);return n[F].isManual_=!0,Yt(t),n}finishDraft(e,t){let n=e&&e[F];(!n||!n.isManual_)&&I(9);let{scope_:r}=n;return qt(r,t),Qt(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=G(Bt).applyPatches_;return B(e)?r(e,t):this.produce(e,e=>r(e,t))}};function yn(e,t,n,r){let[i,a]=Ot(t)?G(zt).proxyMap_(t,n):kt(t)?G(zt).proxySet_(t,n):un(t,n);return(n?.scope_??Gt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?on(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function bn(e){return B(e)||I(10,e),xn(e)}function xn(e){if(!V(e)||Rt(e))return e;let t=e[F],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Pt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Pt(e,!0);return St(n,(e,t)=>{Tt(n,e,xn(t))},r),t&&(t.finalized_=!1),n}var Sn=new vn().produce;function Cn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var wn=Cn(),Tn=Cn,En=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?lt:lt.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Dn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(K(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>dt(t)&&t.type===e,n}var On=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function kn(e){return V(e)?Sn(e,()=>{}):e}function An(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function jn(e){return typeof e==`boolean`}var Mn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new On;return t&&(jn(t)?a.push(wn):a.push(Tn(t.extraArgument))),a},Nn=`RTK_autoBatch`,Pn=e=>t=>{setTimeout(t,e)},Fn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},In=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Fn(window.requestAnimationFrame,100):Pn(10):e.type===`callback`?e.queueNotification:Pn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Nn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Ln=e=>function(t){let{autoBatch:n=!0}=t??{},r=new On(e);return n&&r.push(In(typeof n==`object`?n:void 0)),r};function Rn(e){let t=Mn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(at(n))c=ct(n);else throw Error(K(1));let l;l=typeof r==`function`?r(t):t();let u=lt;i&&(u=En({trace:!1,...typeof i==`object`&&i}));let d=Ln(ut(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return ot(c,o,p)}function zn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(K(28));if(r in t)throw Error(K(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Bn(e){return typeof e==`function`}function Vn(e,t){let[n,r,i]=zn(t),a;if(Bn(e))a=()=>kn(e());else{let t=kn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(B(e)){let r=n(e,t);return r===void 0?e:r}else if(V(e))return Sn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Hn=Symbol.for(`rtk-slice-createasyncthunk`);function Un(e,t){return`${e}/${t}`}function Wn({creators:e}={}){let t=e?.asyncThunk?.[Hn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(K(11));let i=(typeof e.reducers==`function`?e.reducers(qn()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(K(12));if(n in o.sliceCaseReducersByType)throw Error(K(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:Un(n,r),createNotation:typeof e.reducers==`function`};Yn(a)?Zn(o,a,s,t):Jn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?zn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Vn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=An(d,r,m)),i}function i(t=l){return An(An(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=Gn(a,t,()=>An(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function Gn(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var Kn=Wn();function qn(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function Jn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!Xn(r))throw Error(K(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Dn(e,o):Dn(e))}function Yn(e){return e._reducerDefinitionType===`asyncThunk`}function Xn(e){return e._reducerDefinitionType===`reducerWithPrepare`}function Zn({type:e,reducerName:t},n,r,i){if(!i)throw Error(K(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||Qn,pending:s||Qn,rejected:c||Qn,settled:l||Qn})}function Qn(){}var $n=`listener`,er=`completed`,tr=`cancelled`;`${tr}`,`${er}`,`${$n}${tr}`,`${$n}${er}`;var{assign:nr}=Object,rr=`listenerMiddleware`,ir=nr(Dn(`${rr}/add`),{withTypes:()=>ir});`${rr}`;var ar=nr(Dn(`${rr}/remove`),{withTypes:()=>ar});function K(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var or=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),sr=new Set([`NEVER`,`AFTER`,`ON_DATE`]),cr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},lr=e=>or.has(e)?e:`NEVER`,ur=e=>sr.has(e)?e:`NEVER`,dr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,fr=Kn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:v.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),r!==void 0&&(e.until=e.start+r),x(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=re(e,n),x(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=o(e.start);a.setHours(i,0,0,0),e.start=h(a);let s=o(e.end);n?s=xe(k(s),1):(s=Oe(s,1),s=Ce(s,a.getHours()),s=Ae(s,r)),e.end=h(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=re(e,e.until)),x(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=b(e.rrule)),e.repeatType=t.payload,x(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=dr(e.count):e.count=null,x(e)},setFreq:(e,t)=>{e.freq=t.payload,he(e,t.payload),x(e)},setCount:(e,t)=>{e.count=dr(t.payload),x(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),x(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=S(r),x(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=S(n.byweekday)),`bymonth`in n&&(e.bymonth=S(n.bymonth)),`bymonthday`in n&&(e.bymonthday=S(n.bymonthday)),`byyearday`in n&&(e.byyearday=S(n.byyearday)),`bysetpos`in n&&(e.bysetpos=S(n.bysetpos)),x(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=fr,pr=fr.reducer,J={state:e=>e.event},mr=Kn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:hr}=mr,gr=mr.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},_r=r.div`
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

  background-color: var(--gray-050);
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
`,X=a(),Er=8,Dr=()=>{let e=M(),n=N(Y.weekStartDay),r=N(Y.formats)?.date.short.icu??`P`,i=N(J.state),{start:a,rrule:o}=i,[s,c]=(0,A.useState)(null),u=(0,A.useMemo)(()=>oe(o,a),[o,a]),f=(0,A.useMemo)(()=>de(u,s),[u,s]),p=(0,A.useMemo)(()=>ee(u,s?.start??null,Er),[u,s]),h=(0,A.useMemo)(()=>fe(u),[u]),_=(0,A.useMemo)(()=>{let e=ce(u,p.length);return e?le(e):null},[u,p]),v=(0,A.useCallback)((t,n,r)=>{e(q.setRRule(pe(i,u,t,n,r)))},[e,u,i]),y=(0,A.useCallback)(e=>{let t=ne(u,e);if(t){let{timestamp:n}=se(u,e);v(t,n,t===`exdate`)}},[v,u]),b=(0,A.useCallback)(e=>{let t=se(u,e);if(t.base&&t.excluded){v(`exdate`,t.timestamp,!1);return}if(t.full){y(e);return}t.full||v(`rdate`,t.timestamp,!0)},[v,u,y]),te=(0,A.useCallback)(e=>se(u,e),[u]);return(0,X.jsx)(_r,{children:(0,X.jsxs)(ke,{children:[(0,X.jsxs)(O,{$direction:`column`,$gap:10,children:[(0,X.jsx)(yr,{children:l(`Schedule Preview`)}),h&&(0,X.jsx)(br,{children:h})]}),(0,X.jsxs)(vr,{children:[(0,X.jsxs)(O,{$direction:`column`,$gap:10,children:[(0,X.jsx)(ve,{...m(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[_e,ye],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(d().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:n,timeZone:`UTC`,eventDisplay:`none`,events:f,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>c({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=te(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>b(e.date)}),_&&(0,X.jsx)(xr,{children:_})]}),(0,X.jsx)(Sr,{children:p.length===0?(0,X.jsxs)(`p`,{children:[l(`No occurrences starting from`),(0,X.jsx)(`br`,{}),E(t(s?.currentStart??new Date),`PP`,{locale:d()})]}):(0,X.jsx)(Cr,{$count:p.length,children:p.map(e=>{let n=new Date(e*1e3),i=E(t(n),r,{locale:d()}),a=ne(u,n),o=l(a===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:i});return(0,X.jsxs)(wr,{children:[(0,X.jsx)(`span`,{children:i}),a&&(0,X.jsx)(Tr,{type:`button`,"aria-label":o,title:o,onClick:()=>y(n),children:`×`})]},g(n))})})})]})]})})},Or=r.div`
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
`,jr=e=>h(Oe(o(e),1)),Mr=(e,t,n)=>{let r=Pr(t,n);return e.getTime()>=r.getTime()},Nr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return h(xe(k(o(e)),1));let i=o(e),a=Pr(t,r);return i.getTime()>=a.getTime()?e:h(a)},Pr=(e,t)=>Ae(o(e),t),Fr=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Ir=({inputValue:e,value:t,min:n})=>{let r=Fr(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Lr=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,A.useState)(e?.toString()??``),o=(0,A.useRef)(void 0),s=(0,A.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,A.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,A.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,A.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,A.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Fr(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,A.useCallback)(n=>{n.stopPropagation();let r=Ir({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Rr=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Lr({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(ke,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},zr=()=>null,Z=[{value:`MO`,label:`Monday`,days:[C.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[C.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[C.WE.weekday]},{value:`TH`,label:`Thursday`,days:[C.TH.weekday]},{value:`FR`,label:`Friday`,days:[C.FR.weekday]},{value:`SA`,label:`Saturday`,days:[C.SA.weekday]},{value:`SU`,label:`Sunday`,days:[C.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[C.MO.weekday,C.TU.weekday,C.WE.weekday,C.TH.weekday,C.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[C.SA.weekday,C.SU.weekday]}],Br=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},Vr=(e,t)=>{let n=Br(e),r=Br(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Hr=(e,t)=>{if(e){let t=Z.find(t=>Vr(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},Ur=e=>Z.find(t=>t.value===e)?.days??[C.MO.weekday],Q=`5px`,Wr=r.button`
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
`,Zr=({label:e,values:t,onChange:n})=>(0,X.jsx)(ke,{label:e,children:(0,X.jsxs)(Jr,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(Gr,{type:`button`,className:T(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(Kr,{},e))]})}),Qr=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],$r=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],ei=()=>{let e=M(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=N(J.state),a=o(t),s=a.getDate(),c=(a.getDay()+6)%7,l=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[s],d=i?.[0]??1,f=Hr(r,c),p=t=>{e(q.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(q.setByRules({bymonthday:void 0,byweekday:Ur(t),bysetpos:[n]}))};return(0,X.jsxs)(O,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(D,{translateOptions:!0,label:`Repeat on`,value:l,options:Qr,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,X.jsx)(Zr,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,X.jsxs)(O,{children:[(0,X.jsx)(D,{translateOptions:!0,label:`Position`,value:d,options:$r,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(D,{translateOptions:!0,label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},ti=[{weekday:C.SU,label:`Sun`},{weekday:C.MO,label:`Mon`},{weekday:C.TU,label:`Tue`},{weekday:C.WE,label:`Wed`},{weekday:C.TH,label:`Thu`},{weekday:C.FR,label:`Fri`},{weekday:C.SA,label:`Sat`}],ni=()=>{let e=M(),{byweekday:t}=N(J.state);return(0,X.jsx)(O,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,X.jsx)(ke,{label:`On`,children:(0,X.jsx)(Yr,{children:ti.map(({weekday:n,label:r})=>(0,X.jsx)(Gr,{type:`button`,className:T(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:l(r)},n.weekday))})})})},ri=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],ii=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],ai=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],oi=()=>{let e=M(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=N(J.state),s=o(t),c=s.getDate(),u=s.getMonth()+1,d=(s.getDay()+6)%7,f=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,p=r?.length?r:[c],m=n?.length?n:[u],h=a?.[0]??1,g=Hr(i,d),_=(t,n)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(t,n,r)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:Ur(n),bysetpos:[r]}))};return(0,X.jsxs)(O,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(ke,{label:`Month`,children:(0,X.jsx)(Xr,{children:ai.map(e=>{let t=m.includes(e.value);return(0,X.jsx)(Gr,{type:`button`,className:T(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:l(e.label)},e.value)})})}),(0,X.jsx)(D,{translateOptions:!0,label:`Repeat on`,value:f,options:ri,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,X.jsx)(Zr,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,X.jsxs)(O,{children:[(0,X.jsx)(D,{translateOptions:!0,label:`Position`,value:h,options:ii,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,X.jsx)(D,{translateOptions:!0,label:`Day`,value:g,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},si=()=>{let{freq:e}=N(J.state);return e===v.DAILY?(0,X.jsx)(zr,{}):e===v.WEEKLY?(0,X.jsx)(ni,{}):e===v.MONTHLY?(0,X.jsx)(ei,{}):e===v.YEARLY?(0,X.jsx)(oi,{}):null},ci=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),li=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),ui=()=>{let e=M(),{interval:t}=N(J.state);return(0,X.jsxs)(di,{children:[(0,X.jsx)(`span`,{children:l(`Every`)}),(0,X.jsx)(fi,{"aria-label":l(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(q.setInterval(n))}}),(0,X.jsxs)(pi,{children:[(0,X.jsx)(mi,{type:`button`,"aria-label":l(`Increase interval`),onClick:()=>e(q.setInterval(t+1)),children:(0,X.jsx)(li,{})}),(0,X.jsx)(mi,{type:`button`,"aria-label":l(`Decrease interval`),onClick:()=>e(q.setInterval(t-1)),children:(0,X.jsx)(ci,{})})]})]})},di=r.div`
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
`,hi=_({position:[`bottom`,`top`],alignment:`end`,padding:8}),gi=(e,t,n,r)=>{let[i,a]=(0,A.useState)();return(0,A.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=y({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:hi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},_i=(e,t,n)=>{(0,A.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},vi=r.div`
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
`,Ai=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:p})=>{let[m,g]=(0,A.useState)(!1),_=(0,A.useRef)(null),v=(0,A.useRef)(null),y=(0,A.useRef)(null),b=gi(m,v,y,_);return(0,A.useEffect)(()=>{a.length===0&&g(!1)},[a.length]),_i(m,[v,y],()=>g(!1)),(0,X.jsxs)(vi,{children:[(0,X.jsx)(yi,{children:l(e)}),t&&(0,X.jsx)(bi,{children:l(t)}),(0,X.jsxs)(xi,{children:[(0,X.jsxs)(wi,{ref:_,children:[(0,X.jsx)(Ti,{ref:v,type:`button`,disabled:a.length===0,className:T({active:m}),onClick:()=>{a.length!==0&&g(e=>!e)},children:a.length}),m&&(0,X.jsxs)(Ei,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,X.jsx)(Di,{children:l(i)}),(0,X.jsx)(Oi,{children:a.map(e=>(0,X.jsxs)(ki,{children:[(0,X.jsx)(`span`,{children:c(e)}),(0,X.jsx)(`button`,{type:`button`,"aria-label":l(`Remove date {date}`,{date:c(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,X.jsx)(Si,{children:(0,X.jsx)(Se,{...f(),selected:null,onChange:e=>{e&&d(h(k(e)))},customInput:(0,X.jsx)(ji,{label:n,className:T(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:l(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},ji=(0,A.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Ci,{type:`button`,ref:n,...t,children:l(e)}));ji.displayName=`PickerTrigger`;var Mi=r.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,Ni=()=>{let e=M(),n=N(J.state),{start:r,rrule:i}=n,a=(0,A.useMemo)(()=>oe(i,r),[i,r]),{startTimestamp:o,baseRule:l,recurrenceSet:u}=a,d=(0,A.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>h(k(t(e)))).filter(e=>l?!0:e!==o))).sort((e,t)=>e-t):[],[l,u,o]),f=(0,A.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>h(k(t(e)))))).sort((e,t)=>e-t):[],[u]),p=(0,A.useMemo)(()=>new Set(d),[d]),m=(0,A.useMemo)(()=>new Set(f),[f]),g=(0,A.useCallback)(e=>{let t=s(k(e)),n=c(we(e)),r=l?l.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:h(k(e))===o;return{full:i,base:r,excluded:r&&!i}},[l,u,o]),_=r=>{let i=r({baseRule:l,rdates:u?.rdates().filter(e=>l?!0:h(k(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(q.setRRule(ue(n,i.baseRule,Pi(i.rdates),Pi(i.exdates))))};return{addedDates:d,excludedDates:f,addFixedDate:(e,t)=>{if(e===`exdate`&&me(a,t))return;let r=ie(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:ae(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&me(a,t))return;let r=ie(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?ae(n,r):n,exdates:e===`exdate`?ae(i,r):i}))},canAddOccurrence:(0,A.useCallback)(e=>{let t=h(k(e)),n=g(e);return!n.full&&!n.excluded&&!p.has(t)},[p,g]),canExcludeOccurrence:(0,A.useCallback)(e=>{let t=h(k(e)),n=g(e);return n.base&&!n.excluded&&!m.has(t)&&!me(a,t)},[m,g,a]),getStatus:g}},Pi=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},Fi=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],Ii=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Li=e=>[{value:v.DAILY,label:e?`Days`:`Day`},{value:v.WEEKLY,label:e?`Weeks`:`Week`},{value:v.MONTHLY,label:e?`Months`:`Month`},{value:v.YEARLY,label:e?`Years`:`Year`}],Ri=300,zi=()=>{let e=M(),t=N(J.state),n=N(Y.weekStartDay),r=N(Y.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:s,until:c,freq:l,start:u,interval:f}=t,p=i!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=Ni(),b=(0,A.useMemo)(()=>o(u),[u]),ee=e=>E(o(e),r,{locale:d()});return(0,X.jsxs)(Mi,{children:[(0,X.jsxs)(O,{$alignItems:`end`,style:{width:`100%`},children:[(0,X.jsx)(D,{translateOptions:!0,label:`Repeats`,value:i,options:Fi,onChange:t=>e(q.setRepeatType(t))}),i===`CUSTOM`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(ui,{}),(0,X.jsx)(D,{translateOptions:!0,label:``,value:l,options:Li(f>1),onChange:t=>e(q.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,X.jsx)(si,{}),i!==`NEVER`&&(0,X.jsxs)(O,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(D,{translateOptions:!0,label:`Ends`,options:Ii,value:a,onChange:t=>e(q.setRepeatEndType(t))}),a===`AFTER`&&(0,X.jsx)(Rr,{label:`Times`,value:s,min:1,debounceMs:Ri,onChange:t=>e(q.setCount(t))}),a===`ON_DATE`&&(0,X.jsx)(Te,{label:``,value:c||null,onChange:t=>e(q.setUntil(t)),datePickerProps:{showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:b}})]}),(0,X.jsxs)(O,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,X.jsx)(Ai,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:ee,filterDate:v,weekStartDay:n,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),p&&(0,X.jsx)(Ai,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:ee,filterDate:y,weekStartDay:n,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},Bi=()=>{let e=(0,A.useId)(),t=(0,A.useId)(),n=(0,A.useId)(),r=M(),{start:i,end:a,allDay:s}=N(J.state),{date:c,time:u,datetime:d}=N(Y.formats),f=N(Y.weekStartDay),p=N(Y.timeInterval),m=N(Y.eventDuration),h=(0,A.useMemo)(()=>s?c.short.icu:d.short.icu,[s,c,d]),g=(0,A.useMemo)(()=>s?jr(a):a,[s,a]);return(0,X.jsxs)(Or,{children:[(0,X.jsxs)(kr,{children:[(0,X.jsxs)(Ar,{children:[(0,X.jsx)(Te,{id:t,label:`Starts`,value:i,onChange:e=>r(q.setStart(e)),datePickerProps:{id:t,showIcon:!0,icon:(0,X.jsx)(De,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!s,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:h,timeFormat:u.short.icu,todayButton:l(`Today`),calendarStartDay:f,timeIntervals:p}}),(0,X.jsx)(Te,{id:n,label:`Ends`,value:g,onChange:e=>{e!=null&&r(q.setEnd(Nr({value:e,start:i,allDay:s,timeInterval:p})))},datePickerProps:{id:n,showIcon:!0,icon:(0,X.jsx)(De,{}),toggleCalendarOnIconClick:!0,minDate:o(i),showTimeSelect:!s,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:h,timeFormat:u.short.icu,todayButton:l(`Today`),calendarStartDay:f,timeIntervals:p,filterTime:e=>Mr(new Date(e),i,p)}}),(0,X.jsx)(Ee,{id:e,label:`All Day`,enabled:s,style:{margin:0},onClick:e=>r(q.setAllDay({enabled:e,eventDuration:m}))})]}),(0,X.jsx)(zi,{})]}),(0,X.jsx)(Dr,{})]})},Vi=r.div`
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
`,Hi=()=>{let{rrule:e}=N(J.state),n=(0,A.useMemo)(tt,[]),r=e?te(e,{forceset:!0}).all((e,t)=>t<10).map(e=>`${E(t(e),`yyyy-MM-dd HH:mm`)} [${je(e)}]`):[];return(0,X.jsxs)(Vi,{children:[(0,X.jsx)(Bi,{}),n&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:e}),(0,X.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},Ui=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,Wi(n)),$(t,`end`,Wi(r)),$(t,`until`,i?Wi(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},Wi=e=>E(o(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},Gi=e=>{let t=ge(e.event.rrule),{byweekday:n,bysetpos:r}=cr(t?.options.byweekday),i=lr(e.event.repeatType),a=ur(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||v.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?dr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Rn({reducer:{app:gr,event:pr},preloadedState:o})},Ki=new WeakSet,qi=e=>{if(Ki.has(e))return;Ki.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=Gi(JSON.parse(t.textContent)),i=Pe.createRoot(n);r.subscribe(()=>{Ui(r,e)}),Ui(r,e),i.render((0,X.jsx)(qe,{store:r,children:(0,X.jsx)(Hi,{})}))},Ji=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(qi)},Yi=()=>{Ji(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&qi(e),Ji(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Yi):Yi();