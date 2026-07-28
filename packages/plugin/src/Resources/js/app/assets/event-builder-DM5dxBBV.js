import{_ as e,c as t,d as n,f as r,g as i,h as a,i as o,n as s,p as c,r as l,s as u,t as d}from"./date-DHm29epU.js";import{a as f,c as p,d as m,i as h,l as g,n as _,o as v,s as y,t as ee}from"./rrule-7b6Rmlwt.js";import{S as b,_ as te,a as ne,b as re,c as ie,f as ae,g as oe,h as x,i as se,l as ce,m as S,n as le,o as ue,p as de,r as C,s as fe,t as pe,v as me,x as he,y as w}from"./components-Cmuoz9Sa.js";import{n as ge,t as _e}from"./dist-DgGuNF4E.js";import{t as ve}from"./interaction-DMXpF6lk.js";function ye(e,t){let n=he(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=x(n.getDate(),2),t=x(n.getMonth()+1,2);a=`${x(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=x(Math.trunc(t/60),2),r=x(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=x(n.getHours(),2),r=x(n.getMinutes(),2),i=x(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var be=i((e=>{var t=a();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,o=t.useRef,s=t.useEffect,c=t.useMemo,l=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,a,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!i){if(i=!0,o=e,e=a(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,r(o,e))return t;var n=a(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var i=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,a,u]);var p=i(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),xe=i(((e,t)=>{t.exports=be()})),Se=e(r()),T=e(a(),1),Ce=xe();function we(e){e()}function Te(){let e=null,t=null;return{clear(){e=null,t=null},notify(){we(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Ee={notify(){},get:()=>[]};function De(e,t){let n,r=Ee,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Te())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Ee)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Oe=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,ke=typeof navigator<`u`&&navigator.product===`ReactNative`,Ae=Oe||ke?T.useLayoutEffect:T.useEffect,je=Symbol.for(`react-redux-context`),Me=typeof globalThis<`u`?globalThis:{};function Ne(){if(!T.createContext)return{};let e=Me[je]??(Me[je]=new Map),t=e.get(T.createContext);return t||(t=T.createContext(null),e.set(T.createContext,t)),t}var E=Ne();function Pe(e){let{children:t,context:n,serverState:r,store:i}=e,a=T.useMemo(()=>{let e=De(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=T.useMemo(()=>i.getState(),[i]);Ae(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||E;return T.createElement(s.Provider,{value:a},t)}var Fe=Pe;function Ie(e=E){return function(){return T.useContext(e)}}var Le=Ie();function Re(e=E){let t=e===E?Le:Ie(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var ze=Re();function Be(e=E){let t=e===E?ze:Re(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var D=Be(),Ve=(e,t)=>e===t;function He(e=E){let t=e===E?Le:Ie(e),n=(e,n={})=>{let{equalityFn:r=Ve}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();T.useRef(!0);let s=T.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Ce.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return T.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var O=He(),Ue=()=>!1;function k(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var We=typeof Symbol==`function`&&Symbol.observable||`@@observable`,Ge=()=>Math.random().toString(36).substring(7).split(``).join(`.`),Ke={INIT:`@@redux/INIT${Ge()}`,REPLACE:`@@redux/REPLACE${Ge()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${Ge()}`};function qe(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function Je(e,t,n){if(typeof e!=`function`)throw Error(k(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(k(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(k(1));return n(Je)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(k(3));return i}function d(e){if(typeof e!=`function`)throw Error(k(4));if(c)throw Error(k(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(k(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!qe(e))throw Error(k(7));if(e.type===void 0)throw Error(k(8));if(typeof e.type!=`string`)throw Error(k(17));if(c)throw Error(k(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(k(10));r=e,f({type:Ke.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(k(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[We](){return this}}}return f({type:Ke.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[We]:m}}function Ye(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:Ke.INIT})===void 0)throw Error(k(12));if(n(void 0,{type:Ke.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(k(13))})}function Xe(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{Ye(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(k(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function Ze(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function Qe(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(k(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=Ze(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function $e(e){return qe(e)&&`type`in e&&typeof e.type==`string`}var et=Symbol.for(`immer-nothing`),tt=Symbol.for(`immer-draftable`),A=Symbol.for(`immer-state`);function j(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var M=Object,N=M.getPrototypeOf,nt=`constructor`,rt=`prototype`,it=`configurable`,at=`enumerable`,ot=`writable`,P=`value`,F=e=>!!e&&!!e[A];function I(e){return e?lt(e)||ht(e)||!!e[tt]||!!e[nt]?.[tt]||gt(e)||_t(e):!1}var st=M[rt][nt].toString(),ct=new WeakMap;function lt(e){if(!e||!vt(e))return!1;let t=N(e);if(t===null||t===M[rt])return!0;let n=M.hasOwnProperty.call(t,nt)&&t[nt];if(n===Object)return!0;if(!R(n))return!1;let r=ct.get(n);return r===void 0&&(r=Function.toString.call(n),ct.set(n,r)),r===st}function ut(e,t,n=!0){L(e)===0?(n?Reflect.ownKeys(e):M.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function L(e){let t=e[A];return t?t.type_:ht(e)?1:gt(e)?2:_t(e)?3:0}var dt=(e,t,n=L(e))=>n===2?e.has(t):M[rt].hasOwnProperty.call(e,t),ft=(e,t,n=L(e))=>n===2?e.get(t):e[t],pt=(e,t,n,r=L(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function mt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var ht=Array.isArray,gt=e=>e instanceof Map,_t=e=>e instanceof Set,vt=e=>typeof e==`object`,R=e=>typeof e==`function`,yt=e=>typeof e==`boolean`;function bt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var z=e=>e.copy_||e.base_,xt=e=>e.modified_?e.copy_:e.base_;function St(e,t){if(gt(e))return new Map(e);if(_t(e))return new Set(e);if(ht(e))return Array[rt].slice.call(e);let n=lt(e);if(t===!0||t===`class_only`&&!n){let t=M.getOwnPropertyDescriptors(e);delete t[A];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[ot]===!1&&(a[ot]=!0,a[it]=!0),(a.get||a.set)&&(t[i]={[it]:!0,[ot]:!0,[at]:a[at],[P]:e[i]})}return M.create(N(e),t)}else{let t=N(e);if(t!==null&&n)return{...e};let r=M.create(t);return M.assign(r,e)}}function Ct(e,t=!1){return Et(e)||F(e)||!I(e)?e:(L(e)>1&&M.defineProperties(e,{set:Tt,add:Tt,clear:Tt,delete:Tt}),M.freeze(e),t&&ut(e,(e,t)=>{Ct(t,!0)},!1),e)}function wt(){j(2)}var Tt={[P]:wt};function Et(e){return e===null||!vt(e)?!0:M.isFrozen(e)}var Dt=`MapSet`,Ot=`Patches`,kt=`ArrayMethods`,At={};function B(e){let t=At[e];return t||j(0,e),t}var jt=e=>!!At[e],Mt,Nt=()=>Mt,Pt=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:jt(Dt)?B(Dt):void 0,arrayMethodsPlugin_:jt(kt)?B(kt):void 0});function Ft(e,t){t&&(e.patchPlugin_=B(Ot),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function It(e){Lt(e),e.drafts_.forEach(zt),e.drafts_=null}function Lt(e){e===Mt&&(Mt=e.parent_)}var Rt=e=>Mt=Pt(Mt,e);function zt(e){let t=e[A];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function Bt(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[A].modified_&&(It(t),j(4)),I(e)&&(e=Vt(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[A].base_,e,t)}else e=Vt(t,n);return Ht(t,e,!0),It(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===et?void 0:e}function Vt(e,t){if(Et(t))return t;let n=t[A];if(!n)return Xt(t,e.handledSet_,e);if(!Wt(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);Jt(n,e)}return n.copy_}function Ht(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Ct(t,n)}function Ut(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Wt=(e,t)=>e.scope_===t,Gt=[];function Kt(e,t,n,r){let i=z(e),a=e.type_;if(r!==void 0&&ft(i,r,a)===t){pt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;ut(i,(e,n)=>{if(F(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??Gt;for(let e of o)pt(i,e,n,a)}function qt(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!Wt(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=xt(i);Kt(e,i.draft_??i,a,n),Jt(i,r)})}function Jt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}Ut(e)}}function Yt(e,t,n){let{scope_:r}=e;if(F(n)){let i=n[A];Wt(i,r)&&i.callbacks_.push(function(){rn(e),Kt(e,n,xt(i),t)})}else I(n)&&e.callbacks_.push(function(){let i=z(e);e.type_===3?i.has(n)&&Xt(n,r.handledSet_,r):ft(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&Xt(ft(e.copy_,t,e.type_),r.handledSet_,r)})}function Xt(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||F(e)||t.has(e)||!I(e)||Et(e)?e:(t.add(e),ut(e,(r,i)=>{if(F(i)){let t=i[A];Wt(t,n)&&(pt(e,r,xt(t),e.type_),Ut(t))}else I(i)&&Xt(i,t,n)}),e)}function Zt(e,t){let n=ht(e),r={type_:+!!n,scope_:t?t.scope_:Nt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=Qt;n&&(i=[r],a=V);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var Qt={get(e,t){if(t===A)return e;if(t===`constructor`||t===`__proto__`){let n=z(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=z(e);if(!dt(i,t,e.type_))return en(e,i,t);let a=i[t];if(e.finalized_||!I(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&bt(t))return a;if(a===$t(e.base_,t)){rn(e);let n=e.type_===1?+t:t,r=on(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in z(e)},ownKeys(e){return Reflect.ownKeys(z(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=tn(z(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=$t(z(e),t),i=r?.[A];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(mt(n,r)&&(n!==void 0||dt(e.base_,t,e.type_)))return!0;rn(e),nn(e)}return e.copy_[t]===n&&(n!==void 0||dt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),Yt(e,t,n),!0)},deleteProperty(e,t){return rn(e),$t(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),nn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=z(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[ot]:!0,[it]:e.type_!==1||t!==`length`,[at]:r[at],[P]:n[t]}},defineProperty(){j(11)},getPrototypeOf(e){return N(e.base_)},setPrototypeOf(){j(12)}},V={};for(let e in Qt){let t=Qt[e];V[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}V.deleteProperty=function(e,t){return V.set.call(this,e,t,void 0)},V.set=function(e,t,n){return Qt.set.call(this,e[0],t,n,e[0])};function $t(e,t){let n=e[A];return(n?z(n):e)[t]}function en(e,t,n){let r=tn(t,n);return r?P in r?r[P]:r.get?.call(e.draft_):void 0}function tn(e,t){if(!(t in e))return;let n=N(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=N(n)}}function nn(e){e.modified_||(e.modified_=!0,e.parent_&&nn(e.parent_))}function rn(e){e.copy_||(e.assigned_=new Map,e.copy_=St(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var an=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(R(e)&&!R(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}R(t)||j(6),n!==void 0&&!R(n)&&j(7);let r;if(I(e)){let i=Rt(this),a=on(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?It(i):Lt(i)}return Ft(i,n),Bt(r,i)}else if(!e||!vt(e)){if(r=t(e),r===void 0&&(r=e),r===et&&(r=void 0),this.autoFreeze_&&Ct(r,!0),n){let t=[],i=[];B(Ot).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else j(1,e)},this.produceWithPatches=(e,t)=>{if(R(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},yt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),yt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),yt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){I(e)||j(8),F(e)&&(e=sn(e));let t=Rt(this),n=on(t,e,void 0);return n[A].isManual_=!0,Lt(t),n}finishDraft(e,t){let n=e&&e[A];(!n||!n.isManual_)&&j(9);let{scope_:r}=n;return Ft(r,t),Bt(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=B(Ot).applyPatches_;return F(e)?r(e,t):this.produce(e,e=>r(e,t))}};function on(e,t,n,r){let[i,a]=gt(t)?B(Dt).proxyMap_(t,n):_t(t)?B(Dt).proxySet_(t,n):Zt(t,n);return(n?.scope_??Nt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?qt(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function sn(e){return F(e)||j(10,e),cn(e)}function cn(e){if(!I(e)||Et(e))return e;let t=e[A],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=St(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=St(e,!0);return ut(n,(e,t)=>{pt(n,e,cn(t))},r),t&&(t.finalized_=!1),n}var ln=new an().produce;function un(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var dn=un(),fn=un,pn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?Ze:Ze.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function mn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(H(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>$e(t)&&t.type===e,n}var hn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function gn(e){return I(e)?ln(e,()=>{}):e}function _n(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function vn(e){return typeof e==`boolean`}var yn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new hn;return t&&(vn(t)?a.push(dn):a.push(fn(t.extraArgument))),a},bn=`RTK_autoBatch`,xn=e=>t=>{setTimeout(t,e)},Sn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Cn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Sn(window.requestAnimationFrame,100):xn(10):e.type===`callback`?e.queueNotification:xn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[bn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},wn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new hn(e);return n&&r.push(Cn(typeof n==`object`?n:void 0)),r};function Tn(e){let t=yn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(qe(n))c=Xe(n);else throw Error(H(1));let l;l=typeof r==`function`?r(t):t();let u=Ze;i&&(u=pn({trace:!1,...typeof i==`object`&&i}));let d=wn(Qe(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return Je(c,o,p)}function En(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(H(28));if(r in t)throw Error(H(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Dn(e){return typeof e==`function`}function On(e,t){let[n,r,i]=En(t),a;if(Dn(e))a=()=>gn(e());else{let t=gn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(F(e)){let r=n(e,t);return r===void 0?e:r}else if(I(e))return ln(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var kn=Symbol.for(`rtk-slice-createasyncthunk`);function An(e,t){return`${e}/${t}`}function jn({creators:e}={}){let t=e?.asyncThunk?.[kn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(H(11));let i=(typeof e.reducers==`function`?e.reducers(Pn()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(H(12));if(n in o.sliceCaseReducersByType)throw Error(H(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:An(n,r),createNotation:typeof e.reducers==`function`};In(a)?Rn(o,a,s,t):Fn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?En(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return On(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=_n(d,r,m)),i}function i(t=l){return _n(_n(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=Mn(a,t,()=>_n(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function Mn(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var Nn=jn();function Pn(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function Fn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!Ln(r))throw Error(H(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?mn(e,o):mn(e))}function In(e){return e._reducerDefinitionType===`asyncThunk`}function Ln(e){return e._reducerDefinitionType===`reducerWithPrepare`}function Rn({type:e,reducerName:t},n,r,i){if(!i)throw Error(H(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||zn,pending:s||zn,rejected:c||zn,settled:l||zn})}function zn(){}var Bn=`listener`,Vn=`completed`,Hn=`cancelled`;`${Hn}`,`${Vn}`,`${Bn}${Hn}`,`${Bn}${Vn}`;var{assign:Un}=Object,Wn=`listenerMiddleware`,Gn=Un(mn(`${Wn}/add`),{withTypes:()=>Gn});`${Wn}`;var Kn=Un(mn(`${Wn}/remove`),{withTypes:()=>Kn});function H(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var U=e=>{if(!(!e||e.length===0))return Array.from(new Set(e))},qn=(e,t)=>{let n=u(e.start),r=n.getDate(),i=n.getMonth()+1,a=(n.getDay()+6)%7;switch(e.byweekday=void 0,e.bymonth=void 0,e.bymonthday=void 0,e.byyearday=void 0,e.bysetpos=void 0,t){case p.WEEKLY:e.byweekday=[a];break;case p.MONTHLY:e.bymonthday=[r];break;case p.YEARLY:e.bymonth=[i],e.bymonthday=[r];break;default:break}},W=e=>{let t=Yn(e),n=er(e.rrule,e.allDay);if(!t&&n.length===0){e.rrule=void 0;return}if(t&&n.length===0){e.rrule=Qn(t.toString(),e.allDay);return}e.rrule=[...$n(e,t),...n].join(`
`)},Jn=e=>{let t=e?.split(/\r?\n/).filter(e=>!e.trim().startsWith(`RDATE`));return t?.length?t.join(`
`):void 0},G=(e,t)=>e.filter(e=>e.getTime()!==t),Yn=e=>{let{repeatEndType:t,allDay:n,interval:r,count:i}=e,a=u(e.start),o=e.until?u(e.until):null,c=n?s(a):d(a),l=t===`ON_DATE`&&o?n?s(o):d(o):void 0,f={dtstart:c,interval:r,count:t===`AFTER`?i:void 0,until:t===`ON_DATE`?l:void 0};switch(e.repeatType){case`DAILY`:f={...f,freq:p.DAILY};break;case`WEEKLY`:f={...f,freq:p.WEEKLY};break;case`MONTHLY`:f={...f,freq:p.MONTHLY};break;case`YEARLY`:f={...f,freq:p.YEARLY};break;case`CUSTOM`:{let t=e.freq===p.YEARLY&&e.bysetpos?.length&&e.byweekday?.length,n=t?void 0:e.bysetpos,r=t?rr(e.byweekday,e.bysetpos?.[0]):e.byweekday;f={...f,freq:e.freq,interval:e.interval,count:e.repeatEndType===`AFTER`?e.count:void 0,byweekday:r,bymonth:e.bymonth,bymonthday:e.bymonthday,byyearday:e.byyearday,bysetpos:n};break}default:return null}return new y(f)},Xn=(e,t)=>{let n=u(t);if(e.allDay)return s(n);let r=u(e.start);return n.setHours(r.getHours(),r.getMinutes(),r.getSeconds(),0),d(n)},Zn=(e,t,n=[],r=[])=>{if(!t&&n.length===0&&r.length===0)return;let i=[...$n(e,t)];if(n.length>0||r.length>0){let t=new f;n.forEach(e=>{t.rdate(e)}),r.forEach(e=>{t.exdate(e)}),i.push(...Qn(t.toString(),e.allDay).split(`
`))}return i.join(`
`)},Qn=(e,t)=>e.split(`
`).map(e=>h(e,t)).filter(Boolean).join(`
`),$n=(e,t)=>{if(t)return Qn(t.toString(),e.allDay).split(`
`);let n=tr(e),r=new f;return r.dtstart(n),r.rdate(n),Qn(r.toString(),e.allDay).split(`
`)},er=(e,t)=>{if(!e)return[];let n=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(n.some(e=>e.startsWith(`RRULE`)))return n.filter(e=>e.startsWith(`RDATE`)||e.startsWith(`EXDATE`)).map(e=>h(e,t));let r=n.find(e=>e.startsWith(`DTSTART`))?.split(`:`,2)[1]?.trim();return n.flatMap(e=>{if(!e.startsWith(`RDATE`)&&!e.startsWith(`EXDATE`))return[];if(!r||!e.startsWith(`RDATE`))return[h(e,t)];let[n,i=``]=e.split(`:`,2),a=i.split(`,`).map(e=>e.trim()).filter(Boolean).filter(e=>e!==r);return a.length===0?[]:[h(`${n}:${a.join(`,`)}`,t)]})},tr=e=>{let t=u(e.start);return e.allDay?s(t):d(t)},nr=[y.MO,y.TU,y.WE,y.TH,y.FR,y.SA,y.SU],rr=(e,t)=>!e?.length||!t?e:e.map(e=>nr[e]?.nth(t)).filter(Boolean),ir=(e,t)=>{let n=u(t);if(e.allDay)n.setHours(0,0,0,0);else{let t=u(e.start);n.setHours(t.getHours(),t.getMinutes(),t.getSeconds(),0)}return l(n)},ar=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),or=new Set([`NEVER`,`AFTER`,`ON_DATE`]),sr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},cr=e=>ar.has(e)?e:`NEVER`,lr=e=>or.has(e)?e:`NEVER`,ur=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,dr=Nn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:p.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=ir(e,e.until)),r!==void 0&&(e.until=e.start+r),W(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=ir(e,n),W(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=u(e.start);a.setHours(i,0,0,0),e.start=l(a);let o=u(e.end);n?o=re(w(o),1):(o=de(o,1),o=ae(o,a.getHours()),o=me(o,r)),e.end=l(o),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=ir(e,e.until)),W(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=Jn(e.rrule)),e.repeatType=t.payload,W(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=ur(e.count):e.count=null,W(e)},setFreq:(e,t)=>{e.freq=t.payload,qn(e,t.payload),W(e)},setCount:(e,t)=>{e.count=ur(t.payload),W(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),W(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=U(r),W(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=U(n.byweekday)),`bymonth`in n&&(e.bymonth=U(n.bymonth)),`bymonthday`in n&&(e.bymonthday=U(n.bymonthday)),`byyearday`in n&&(e.byyearday=U(n.byyearday)),`bysetpos`in n&&(e.bysetpos=U(n.bysetpos)),W(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:K}=dr,fr=dr.reducer,q={state:e=>e.event},pr=Nn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:mr}=pr,hr=pr.reducer,J={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},gr=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},_r=e=>l(w(u(e))),vr=e=>l(w(t(e))),yr=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0,0)),br=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59,999)),xr=e=>Math.floor(yr(e).getTime()/1e3),Sr=(e,t)=>{let n=_r(t),r=ee(e)??null,i=_(e);return{startTimestamp:n,baseRule:r,recurrenceSet:i,addedDateSet:new Set((i?.rdates()??[]).map(vr).filter(e=>r?!0:e!==n))}},Cr=(e,t)=>{let n=xr(t),r=yr(t),i=br(t),a=e.baseRule?e.baseRule.between(r,i,!0).length>0:!1,o=e.recurrenceSet?e.recurrenceSet.between(r,i,!0).length>0:n===e.startTimestamp;return{timestamp:n,full:o,base:a,excluded:a&&!o,rdate:e.addedDateSet.has(n)}},wr=(e,t)=>{if(!t)return[];let n=yr(t.start),r=br(t.end),i=xr(t.start),a=xr(t.end),s=[];return e.recurrenceSet?s=e.recurrenceSet.between(n,r,!0).map(vr):e.startTimestamp>=i&&e.startTimestamp<=a&&(s=[e.startTimestamp]),Array.from(new Set(s)).map(e=>({id:o(new Date(e*1e3)),start:S(u(e),`yyyy-MM-dd`),allDay:!0}))},Tr=(e,t,n)=>{if(!t)return[];if(!e.recurrenceSet){let n=xr(t);return e.startTimestamp>=n?[e.startTimestamp]:[]}let r=e.recurrenceSet.between(yr(t),te(br(t),100),!0,(e,t)=>t<n).map(vr);return Array.from(new Set(r)).slice(0,n)},Er=(e,t,n,r,i)=>{let a=Xn(e,r),o=a.getTime(),s=Dr(t,({baseRule:e,rdates:t,exdates:r})=>{let s=Or(t,a,o,n===`rdate`,i);return{baseRule:e,rdates:n===`exdate`&&i?G(s,o):s,exdates:Or(r,a,o,n===`exdate`,i)}});return Zn(e,s.baseRule,gr(s.rdates),gr(s.exdates))},Dr=(e,t)=>t({baseRule:e.baseRule,rdates:kr(e),exdates:e.recurrenceSet?.exdates()??[]}),Or=(e,t,n,r,i)=>r?i?[...e,t]:G(e,n):e,kr=e=>{let t=e.recurrenceSet?.rdates()??[];return e.baseRule?t:t.filter(t=>vr(t)!==e.startTimestamp)},Ar=n.div`
  flex: 2;

  display: flex;
  justify-content: end;
  gap: 18px;

  @container (max-width: 1084px) {
    justify-content: start;
  }

  > .field {
    margin: 0;
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
    width: 260px;

    .fc-header-toolbar {
        margin-bottom: 1em;

      .fc-toolbar-title {
        font-size: 16px;
      }

      .fc-button {
        font-size: 8px;
      }
    }

    .fc-scrollgrid {
      user-select: none;

      > thead {
        font-size: 10px;
      }

      >tbody {

        td.fc-day  {
          padding-inline-start: 0;
          padding-inline-end: 0;
          cursor: pointer;

          &.fc-has-event {
            background: var(--gray-100);

            &.fc-day-today {
              background: var(--custom-bg-color, var(--gray-200));
            }
          }

          &.fc-extra-date {
            background: color-mix(in srgb, var(--green-100) 72%, white);
          }

          &.fc-excluded-date {
            background: color-mix(in srgb, var(--red-100) 72%, white);
            color: var(--gray-600);
          }

          div.fc-daygrid-day-frame {
            .fc-daygrid-day-top {
              font-size: 10px;
              flex-direction: row;
              justify-content: center;
            }

            .fc-daygrid-day-events {
              display: none;
            }
          }
        }
      }
    }
  }
`,jr=n.div`
  min-width: 120px;
  max-width: 120px;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,Mr=n.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 4px;

  height: 215px;
  margin-top: 57px;
`,Nr=n.li`
  padding: 4px 8px;

  font-size: 13px;
  line-height: 13px;
  font-family: monospace;

  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  border-left: 5px solid var(--gray-200);
`,Y=c(),Pr=8,Fr=()=>{let e=D(),t=O(q.state),{repeatType:n,start:r,rrule:i}=t,[a,s]=(0,T.useState)(null),c=(0,T.useMemo)(()=>Sr(i,r),[i,r]),l=(0,T.useMemo)(()=>wr(c,a),[c,a]),u=(0,T.useMemo)(()=>Tr(c,a?.start??null,Pr),[c,a]),d=(0,T.useCallback)((n,r,i)=>{e(K.setRRule(Er(t,c,n,r,i)))},[e,c,t]),f=(0,T.useCallback)(e=>{let t=Cr(c,e);if(t.base&&t.excluded){d(`exdate`,t.timestamp,!1);return}if(t.base&&t.full&&n!==`NEVER`){d(`exdate`,t.timestamp,!0);return}if(!t.base&&t.full&&t.rdate){d(`rdate`,t.timestamp,!1);return}t.full||d(`rdate`,t.timestamp,!0)},[d,c,n]),p=(0,T.useCallback)(e=>Cr(c,e),[c]);return(0,Y.jsxs)(Ar,{children:[(0,Y.jsx)(fe,{label:`Recurrence Preview`,children:(0,Y.jsx)(_e,{aspectRatio:2,height:250,expandRows:!1,themeSystem:`bootstrap5`,plugins:[ge,ve],initialView:`dayGridMonth`,timeZone:`UTC`,eventDisplay:`none`,events:l,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>s({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=p(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>f(e.date)})}),(0,Y.jsx)(jr,{children:u.length===0?(0,Y.jsxs)(`p`,{children:[b(`No occurrences starting from`),(0,Y.jsx)(`br`,{}),S(a?.currentStart??new Date,`PP`)]}):(0,Y.jsx)(Mr,{$count:u.length,children:u.map(e=>{let t=o(new Date(e*1e3));return(0,Y.jsx)(Nr,{children:t},t)})})})]})},Ir=n.div`
  container-type: inline-size;

  display: flex;
  flex-direction: row;
  gap: 60px;

  padding: var(--l);

  background-color: var(--custom-bg-color,var(--gray-050));
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 6px -1px rgba(0,0,0,.05);

  @container (max-width: 1084px) {
    flex-direction: column;
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
`,Lr=e=>l(de(u(e),1)),Rr=(e,t,n)=>{let r=Br(t,n);return e.getTime()>=r.getTime()},zr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return l(re(w(u(e)),1));let i=u(e),a=Br(t,r);return i.getTime()>=a.getTime()?e:l(a)},Br=(e,t)=>me(u(e),t),Vr=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Hr=({inputValue:e,value:t,min:n})=>{let r=Vr(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Ur=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,T.useState)(e?.toString()??``),o=(0,T.useRef)(void 0),s=(0,T.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,T.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,T.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,T.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,T.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Vr(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,T.useCallback)(n=>{n.stopPropagation();let r=Hr({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Wr=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Ur({value:e,min:t,debounceMs:n,onChange:r});return(0,Y.jsx)(fe,{...i,children:(0,Y.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Gr=e=>(0,Y.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Y.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Kr=e=>(0,Y.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Y.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),qr=({noun:e=`day`})=>{let t=D(),{interval:n}=O(q.state);return(0,Y.jsxs)(Jr,{children:[(0,Y.jsx)(`span`,{children:`Every`}),(0,Y.jsx)(Yr,{type:`text`,className:`text`,value:n,onChange:e=>{let n=parseInt(e.target.value,10)||1;t(K.setInterval(n))}}),(0,Y.jsxs)(Xr,{children:[(0,Y.jsx)(Zr,{type:`button`,onClick:()=>t(K.setInterval(n+1)),children:(0,Y.jsx)(Kr,{})}),(0,Y.jsx)(Zr,{type:`button`,onClick:()=>t(K.setInterval(n-1)),children:(0,Y.jsx)(Gr,{})})]}),(0,Y.jsxs)(`span`,{children:[e,n>1?`s`:``]})]})},Jr=n.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Yr=n.input`
  width: 60px;
`,Xr=n.div`
  display: flex;
  flex-direction: column;
`,Zr=n.button`
  cursor: pointer;
  padding: 2px 4px;

  border: 1px solid var(--gray-200);
  background: var(--gray-100);

  svg {
    width: 12px;
    height: 12px;
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:hover {
    background: var(--gray-200);
    border: 1px solid var(--gray-300);
  }
`,Qr=()=>(0,Y.jsx)(qr,{noun:`day`}),X=[{value:`MO`,label:`Monday`,days:[y.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[y.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[y.WE.weekday]},{value:`TH`,label:`Thursday`,days:[y.TH.weekday]},{value:`FR`,label:`Friday`,days:[y.FR.weekday]},{value:`SA`,label:`Saturday`,days:[y.SA.weekday]},{value:`SU`,label:`Sunday`,days:[y.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[y.MO.weekday,y.TU.weekday,y.WE.weekday,y.TH.weekday,y.FR.weekday]},{value:`WEK`,label:`Weekend Day (Sat/Sun)`,days:[y.SA.weekday,y.SU.weekday]}],$r=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},ei=(e,t)=>{let n=$r(e),r=$r(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},ti=(e,t)=>{if(e){let t=X.find(t=>ei(t.days,e));if(t)return t.value}if(t!==void 0){let e=X.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return X[0].value},ni=e=>X.find(t=>t.value===e)?.days??[y.MO.weekday],Z=`5px`,Q=n.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,ri=n(Q)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,ii=n(Q)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,ai=n.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,oi=n(ai)`
  grid-template-columns: repeat(7, 1fr);

  ${Q} {
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
`,si=n(ai)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${Q} {
    border-bottom: none;

    &:first-child {
      border-top-left-radius: ${Z};
      border-bottom-left-radius: ${Z};
    }

    &:last-child {
      border-right: none;
      border-top-right-radius: ${Z};
      border-bottom-right-radius: ${Z};
    }
  }
`,ci=n(ai)`
  grid-template-columns: repeat(4, 1fr);

  ${Q} {
    &:first-child {
      border-top-left-radius: ${Z};
    }

    &:nth-child(4) {
      border-top-right-radius: ${Z};
    }

    &:nth-child(9) {
      border-bottom-left-radius: ${Z};
    }

    &:last-child {
      border-bottom-right-radius: ${Z};
    }

    &:nth-child(4n) {
      border-right: none;
    }

    &:nth-child(n + 9) {
      border-bottom: none;
    }
  }
`,li=({label:e,values:t,onChange:n})=>(0,Y.jsx)(fe,{label:e,children:(0,Y.jsxs)(oi,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,Y.jsx)(ri,{type:`button`,className:ce(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,Y.jsx)(ii,{},e))]})}),ui=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],di=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],fi=()=>{let e=D(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=O(q.state),a=u(t),o=a.getDate(),s=(a.getDay()+6)%7,c=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,l=n?.length?n:[o],d=i?.[0]??1,f=ti(r,s),p=t=>{e(K.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(K.setByRules({bymonthday:void 0,byweekday:ni(t),bysetpos:[n]}))};return(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(qr,{noun:`month`}),(0,Y.jsx)(`div`,{className:`field`,children:(0,Y.jsx)(C,{label:`Repeat On`,value:c,options:ui,onChange:e=>{e===`WEEKDAY`?m(f,d):p(l)}})}),c===`MONTHDAY`&&(0,Y.jsx)(li,{label:`Days of month`,values:l,onChange:e=>p(e)}),c===`WEEKDAY`&&(0,Y.jsxs)(pe,{className:`field`,children:[(0,Y.jsx)(C,{label:`Position`,value:d,options:di,onChange:e=>m(f,Number.parseInt(e,10))}),(0,Y.jsx)(C,{label:`Day`,value:f,options:X.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},pi=[{weekday:y.SU,label:`Sun`},{weekday:y.MO,label:`Mon`},{weekday:y.TU,label:`Tue`},{weekday:y.WE,label:`Wed`},{weekday:y.TH,label:`Thu`},{weekday:y.FR,label:`Fri`},{weekday:y.SA,label:`Sat`}],mi=()=>{let e=D(),{byweekday:t}=O(q.state);return(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(qr,{noun:`week`}),(0,Y.jsx)(si,{className:`field`,children:pi.map(({weekday:n,label:r})=>(0,Y.jsx)(ri,{type:`button`,className:ce(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(K.setDays({type:`byweekday`,values:r}))},children:r},n.weekday))})]})},hi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],gi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],_i=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],vi=()=>{let e=D(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=O(q.state),o=u(t),s=o.getDate(),c=o.getMonth()+1,l=(o.getDay()+6)%7,d=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,f=r?.length?r:[s],p=n?.length?n:[c],m=a?.[0]??1,h=ti(i,l),g=(t,n)=>{e(K.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},_=(t,n,r)=>{e(K.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:ni(n),bysetpos:[r]}))};return(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(qr,{noun:`year`}),(0,Y.jsx)(fe,{label:`Month`,children:(0,Y.jsx)(ci,{children:_i.map(e=>{let t=p.includes(e.value);return(0,Y.jsx)(ri,{type:`button`,className:ce(t&&`active`),onClick:()=>{let n=p.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),d===`WEEKDAY`?_(n,h,m):g(n,f))},children:e.label},e.value)})})}),(0,Y.jsx)(`div`,{className:`field`,children:(0,Y.jsx)(C,{label:`Repeat On`,value:d,options:hi,onChange:e=>{e===`WEEKDAY`?_(p,h,m):g(p,f)}})}),d===`MONTHDAY`&&(0,Y.jsx)(li,{label:`Days of month`,values:f,onChange:e=>g(p,e)}),d===`WEEKDAY`&&(0,Y.jsxs)(pe,{className:`field`,children:[(0,Y.jsx)(C,{label:`Position`,value:m,options:gi,onChange:e=>_(p,h,Number.parseInt(e,10))}),(0,Y.jsx)(C,{label:`Day`,value:h,options:X.map(e=>({value:e.value,label:e.label})),onChange:e=>_(p,e,m)})]})]})},yi=()=>{let{freq:e}=O(q.state);return e===p.DAILY?(0,Y.jsx)(Qr,{}):e===p.WEEKLY?(0,Y.jsx)(mi,{}):e===p.MONTHLY?(0,Y.jsx)(fi,{}):e===p.YEARLY?(0,Y.jsx)(vi,{}):null},bi=g({position:[`bottom`,`top`],alignment:`end`,padding:8}),xi=(e,t,n,r)=>{let[i,a]=(0,T.useState)();return(0,T.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=m({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:bi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Si=(e,t,n)=>{(0,T.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Ci=n.div`
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--gray-200);
`,wi=n.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`,Ti=n.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ei=n.div`
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
`,Di=n.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Oi=n.div`
  position: relative;
  flex-shrink: 0;
`,ki=n.button`
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
    color: white;
    background: var(--teal-600);
    border-color: var(--teal-600);

    &:hover:not(:disabled) {
      background: var(--teal-700);
    }
  }
`,Ai=n.div`
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
`,ji=n.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Mi=n.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Ni=n.li`
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
`,Pi=({title:e,actionLabel:t,actionClass:n,popoverTitle:r,dates:i,openToDate:a,weekStartDay:o,formatDate:s,filterDate:c,onAdd:u,onRemove:d})=>{let[f,p]=(0,T.useState)(!1),m=(0,T.useRef)(null),h=(0,T.useRef)(null),g=(0,T.useRef)(null),_=xi(f,h,g,m);return(0,T.useEffect)(()=>{i.length===0&&p(!1)},[i.length]),Si(f,[h,g],()=>p(!1)),(0,Y.jsxs)(Ci,{children:[(0,Y.jsx)(wi,{children:b(e)}),(0,Y.jsxs)(Ti,{children:[(0,Y.jsxs)(Oi,{ref:m,children:[(0,Y.jsx)(ki,{ref:h,type:`button`,disabled:i.length===0,className:ce({active:f}),onClick:()=>{i.length!==0&&p(e=>!e)},children:i.length}),f&&(0,Y.jsxs)(Ai,{ref:g,style:{top:_?.top??0,left:_?.left??0,visibility:_?`visible`:`hidden`},children:[(0,Y.jsx)(ji,{children:b(r)}),(0,Y.jsx)(Mi,{children:i.map(e=>(0,Y.jsxs)(Ni,{children:[(0,Y.jsx)(`span`,{children:s(e)}),(0,Y.jsx)(`button`,{type:`button`,onClick:()=>d(e),children:`×`})]},e))})]})]}),(0,Y.jsx)(Ei,{children:(0,Y.jsx)(ie,{selected:null,onChange:e=>{e&&u(l(w(e)))},customInput:(0,Y.jsx)(Fi,{label:t,className:ce(`btn`,n)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:b(`Today`),openToDate:a,calendarStartDay:o,filterDate:c})})]})]})},Fi=(0,T.forwardRef)(({label:e,...t},n)=>(0,Y.jsx)(Di,{type:`button`,ref:n,...t,children:b(e)}));Fi.displayName=`PickerTrigger`;var Ii=n.div`
  flex: 1;
`,Li=()=>{let e=D(),n=O(q.state),{start:r,rrule:i}=n,a=(0,T.useMemo)(()=>l(w(u(r))),[r]),o=(0,T.useMemo)(()=>ee(i)??null,[i]),c=(0,T.useMemo)(()=>_(i),[i]),f=(0,T.useMemo)(()=>c?Array.from(new Set(c.rdates().map(e=>l(w(t(e)))).filter(e=>o?!0:e!==a))).sort((e,t)=>e-t):[],[o,c,a]),p=(0,T.useMemo)(()=>c?Array.from(new Set(c.exdates().map(e=>l(w(t(e)))))).sort((e,t)=>e-t):[],[c]),m=(0,T.useMemo)(()=>new Set(f),[f]),h=(0,T.useMemo)(()=>new Set(p),[p]),g=(0,T.useCallback)(e=>{let t=s(w(e)),n=d(oe(e)),r=o?o.between(t,n,!0).length>0:!1,i=c?c.between(t,n,!0).length>0:l(w(e))===a;return{full:i,base:r,excluded:r&&!i}},[o,c,a]),v=r=>{let i=r({baseRule:o,rdates:c?.rdates().filter(e=>o?!0:l(w(t(e)))!==a)??[],exdates:c?.exdates()??[]});e(K.setRRule(Zn(n,i.baseRule,Ri(i.rdates),Ri(i.exdates))))};return{addedDates:f,excludedDates:p,addFixedDate:(e,t)=>{let r=Xn(n,t);v(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:G(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{let r=Xn(n,t).getTime();v(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?G(n,r):n,exdates:e===`exdate`?G(i,r):i}))},canAddOccurrence:(0,T.useCallback)(e=>{let t=l(w(e)),n=g(e);return!n.full&&!n.excluded&&!m.has(t)},[m,g]),canExcludeOccurrence:(0,T.useCallback)(e=>{let t=l(w(e)),n=g(e);return n.base&&!n.excluded&&!h.has(t)},[h,g]),getStatus:g}},Ri=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},zi=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],Bi=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Vi=[{value:p.DAILY,label:`Daily`},{value:p.WEEKLY,label:`Weekly`},{value:p.MONTHLY,label:`Monthly`},{value:p.YEARLY,label:`Yearly`}],Hi=300,Ui=()=>{let e=D(),t=O(q.state),n=O(J.weekStartDay),{repeatType:r,repeatEndType:i,count:a,until:o,freq:s,start:c}=t,l=r!==`NEVER`,{addedDates:d,excludedDates:f,addFixedDate:p,removeFixedDate:m,canAddOccurrence:h,canExcludeOccurrence:g}=Li(),_=(0,T.useMemo)(()=>u(c),[c]),v=e=>S(u(e),`yyyy-MM-dd`);return(0,Y.jsxs)(Ii,{children:[(0,Y.jsxs)(pe,{children:[(0,Y.jsx)(C,{label:`Repeat`,value:r,options:zi,onChange:t=>e(K.setRepeatType(t))}),r===`CUSTOM`&&(0,Y.jsx)(C,{label:``,value:s,options:Vi,onChange:t=>e(K.setFreq(Number.parseInt(t,10)))})]}),r===`CUSTOM`&&(0,Y.jsx)(`div`,{className:`field`,children:(0,Y.jsx)(yi,{})}),r!==`NEVER`&&(0,Y.jsxs)(pe,{className:`field`,children:[(0,Y.jsx)(C,{label:`Repeat End`,options:Bi,value:i,onChange:t=>e(K.setRepeatEndType(t))}),i===`AFTER`&&(0,Y.jsx)(Wr,{label:`Times`,value:a,min:1,debounceMs:Hi,onChange:t=>e(K.setCount(t))}),i===`ON_DATE`&&(0,Y.jsx)(se,{label:``,value:o||null,onChange:t=>e(K.setUntil(t)),datePickerProps:{showTimeInput:!1,calendarStartDay:n,minDate:_}})]}),(0,Y.jsx)(Pi,{title:`Custom Occurrences`,actionLabel:`Add Occurrence`,actionClass:`icon add dashed`,popoverTitle:`Added Occurrences`,dates:d,openToDate:_,formatDate:v,filterDate:h,weekStartDay:n,onAdd:e=>p(`rdate`,e),onRemove:e=>m(`rdate`,e)}),l&&(0,Y.jsx)(Pi,{title:`Exceptions`,actionLabel:`Exclude Occurrence`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Occurrences`,dates:f,openToDate:_,formatDate:v,filterDate:g,weekStartDay:n,onAdd:e=>p(`exdate`,e),onRemove:e=>m(`exdate`,e)})]})},Wi=()=>{let e=(0,T.useId)(),t=(0,T.useId)(),n=(0,T.useId)(),r=D(),{start:i,end:a,allDay:o}=O(q.state),{date:s,time:c,datetime:l}=O(J.formats),d=O(J.weekStartDay),f=O(J.timeInterval),p=O(J.eventDuration),m=(0,T.useMemo)(()=>o?s.short.icu:l.short.icu,[o,s,l]),h=(0,T.useMemo)(()=>o?Lr(a):a,[o,a]);return(0,Y.jsxs)(Ir,{children:[(0,Y.jsxs)(`div`,{style:{flex:1},children:[(0,Y.jsx)(le,{id:e,label:`All Day`,enabled:o,onClick:e=>r(K.setAllDay({enabled:e,eventDuration:p}))}),(0,Y.jsx)(se,{id:t,label:`Starts`,value:i,onChange:e=>r(K.setStart(e)),datePickerProps:{id:t,showIcon:!0,icon:(0,Y.jsx)(ue,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:m,timeFormat:c.short.icu,todayButton:b(`Today`),calendarStartDay:d,timeIntervals:f}}),(0,Y.jsx)(se,{id:n,label:`Ends`,value:h,onChange:e=>{e!=null&&r(K.setEnd(zr({value:e,start:i,allDay:o,timeInterval:f})))},datePickerProps:{id:n,showIcon:!0,icon:(0,Y.jsx)(ue,{}),toggleCalendarOnIconClick:!0,minDate:u(i),showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:m,timeFormat:c.short.icu,todayButton:b(`Today`),calendarStartDay:d,timeIntervals:f,filterTime:e=>Rr(new Date(e),i,f)}})]}),(0,Y.jsx)(Ui,{}),(0,Y.jsx)(Fr,{})]})},Gi=n.div`
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
`,Ki=()=>{let{rrule:e}=O(q.state),n=(0,T.useMemo)(Ue,[]),r=e?v(e,{forceset:!0}).all((e,t)=>t<10).map(e=>`${S(t(e),`yyyy-MM-dd HH:mm`)} [${ye(e)}]`):[];return(0,Y.jsxs)(Gi,{children:[(0,Y.jsx)(Wi,{}),n&&(0,Y.jsxs)(`code`,{children:[(0,Y.jsx)(`pre`,{children:e}),(0,Y.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},qi=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,Ji(n)),$(t,`end`,Ji(r)),$(t,`until`,i?Ji(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},Ji=e=>S(u(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},Yi=e=>{let t=ee(e.event.rrule),{byweekday:n,bysetpos:r}=sr(t?.options.byweekday),i=cr(e.event.repeatType),a=lr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||p.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?ur(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Tn({reducer:{app:hr,event:fr},preloadedState:o})},Xi=new WeakSet,Zi=e=>{if(Xi.has(e))return;Xi.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=Yi(JSON.parse(t.textContent)),i=Se.createRoot(n);r.subscribe(()=>{qi(r,e)}),qi(r,e),i.render((0,Y.jsx)(Fe,{store:r,children:(0,Y.jsx)(Ki,{})}))},Qi=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(Zi)},$i=()=>{Qi(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&Zi(e),Qi(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,$i):$i();