import{c as e,d as t,f as n,g as r,h as i,i as a,m as o,n as s,r as c,s as l,t as u,u as d}from"./date-B-YCzvOK.js";import{a as f,c as p,d as m,i as h,l as g,n as _,o as v,s as y,t as ee}from"./rrule-CObB8Nrs.js";import{C as b,S as te,_ as ne,a as x,b as S,c as re,g as C,h as ie,l as ae,m as oe,n as se,o as ce,p as le,s as ue,t as de,u as w,v as fe,x as pe,y as me}from"./components-001DraCV.js";import{n as he,t as ge}from"./dist-Dxlx9seu.js";import{t as _e}from"./interaction-D4ecfs1r.js";function ve(e,t){let n=te(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=C(n.getDate(),2),t=C(n.getMonth()+1,2);a=`${C(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=C(Math.trunc(t/60),2),r=C(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=C(n.getHours(),2),r=C(n.getMinutes(),2),i=C(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var ye=i((e=>{var t=o();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,a=t.useRef,s=t.useEffect,c=t.useMemo,l=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,o,u){var d=a(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!i){if(i=!0,a=e,e=o(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,r(a,e))return t;var n=o(e);return u!==void 0&&u(t,n)?(a=e,t):(a=e,s=n)}var i=!1,a,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,o,u]);var p=i(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),be=i(((e,t)=>{t.exports=ye()})),xe=r(t()),T=r(o(),1),Se=be();function Ce(e){e()}function we(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Ce(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Te={notify(){},get:()=>[]};function Ee(e,t){let n,r=Te,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=we())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Te)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var De=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Oe=typeof navigator<`u`&&navigator.product===`ReactNative`,ke=De||Oe?T.useLayoutEffect:T.useEffect,Ae=Symbol.for(`react-redux-context`),je=typeof globalThis<`u`?globalThis:{};function Me(){if(!T.createContext)return{};let e=je[Ae]??(je[Ae]=new Map),t=e.get(T.createContext);return t||(t=T.createContext(null),e.set(T.createContext,t)),t}var E=Me();function Ne(e){let{children:t,context:n,serverState:r,store:i}=e,a=T.useMemo(()=>{let e=Ee(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=T.useMemo(()=>i.getState(),[i]);ke(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||E;return T.createElement(s.Provider,{value:a},t)}var Pe=Ne;function Fe(e=E){return function(){return T.useContext(e)}}var Ie=Fe();function Le(e=E){let t=e===E?Ie:Fe(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Re=Le();function ze(e=E){let t=e===E?Re:Le(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var D=ze(),Be=(e,t)=>e===t;function Ve(e=E){let t=e===E?Ie:Fe(e),n=(e,n={})=>{let{equalityFn:r=Be}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();T.useRef(!0);let s=T.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Se.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return T.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var O=Ve(),He=()=>!1;function k(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var Ue=typeof Symbol==`function`&&Symbol.observable||`@@observable`,We=()=>Math.random().toString(36).substring(7).split(``).join(`.`),Ge={INIT:`@@redux/INIT${We()}`,REPLACE:`@@redux/REPLACE${We()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${We()}`};function Ke(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function qe(e,t,n){if(typeof e!=`function`)throw Error(k(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(k(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(k(1));return n(qe)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(k(3));return i}function d(e){if(typeof e!=`function`)throw Error(k(4));if(c)throw Error(k(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(k(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!Ke(e))throw Error(k(7));if(e.type===void 0)throw Error(k(8));if(typeof e.type!=`string`)throw Error(k(17));if(c)throw Error(k(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(k(10));r=e,f({type:Ge.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(k(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[Ue](){return this}}}return f({type:Ge.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[Ue]:m}}function Je(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:Ge.INIT})===void 0)throw Error(k(12));if(n(void 0,{type:Ge.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(k(13))})}function Ye(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{Je(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(k(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function Xe(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function Ze(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(k(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=Xe(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function Qe(e){return Ke(e)&&`type`in e&&typeof e.type==`string`}var $e=Symbol.for(`immer-nothing`),et=Symbol.for(`immer-draftable`),A=Symbol.for(`immer-state`);function j(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var M=Object,N=M.getPrototypeOf,tt=`constructor`,nt=`prototype`,rt=`configurable`,it=`enumerable`,at=`writable`,P=`value`,F=e=>!!e&&!!e[A];function I(e){return e?ct(e)||mt(e)||!!e[et]||!!e[tt]?.[et]||ht(e)||gt(e):!1}var ot=M[nt][tt].toString(),st=new WeakMap;function ct(e){if(!e||!_t(e))return!1;let t=N(e);if(t===null||t===M[nt])return!0;let n=M.hasOwnProperty.call(t,tt)&&t[tt];if(n===Object)return!0;if(!R(n))return!1;let r=st.get(n);return r===void 0&&(r=Function.toString.call(n),st.set(n,r)),r===ot}function lt(e,t,n=!0){L(e)===0?(n?Reflect.ownKeys(e):M.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function L(e){let t=e[A];return t?t.type_:mt(e)?1:ht(e)?2:gt(e)?3:0}var ut=(e,t,n=L(e))=>n===2?e.has(t):M[nt].hasOwnProperty.call(e,t),dt=(e,t,n=L(e))=>n===2?e.get(t):e[t],ft=(e,t,n,r=L(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function pt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var mt=Array.isArray,ht=e=>e instanceof Map,gt=e=>e instanceof Set,_t=e=>typeof e==`object`,R=e=>typeof e==`function`,vt=e=>typeof e==`boolean`;function yt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var z=e=>e.copy_||e.base_,bt=e=>e.modified_?e.copy_:e.base_;function xt(e,t){if(ht(e))return new Map(e);if(gt(e))return new Set(e);if(mt(e))return Array[nt].slice.call(e);let n=ct(e);if(t===!0||t===`class_only`&&!n){let t=M.getOwnPropertyDescriptors(e);delete t[A];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[at]===!1&&(a[at]=!0,a[rt]=!0),(a.get||a.set)&&(t[i]={[rt]:!0,[at]:!0,[it]:a[it],[P]:e[i]})}return M.create(N(e),t)}else{let t=N(e);if(t!==null&&n)return{...e};let r=M.create(t);return M.assign(r,e)}}function St(e,t=!1){return Tt(e)||F(e)||!I(e)?e:(L(e)>1&&M.defineProperties(e,{set:wt,add:wt,clear:wt,delete:wt}),M.freeze(e),t&&lt(e,(e,t)=>{St(t,!0)},!1),e)}function Ct(){j(2)}var wt={[P]:Ct};function Tt(e){return e===null||!_t(e)?!0:M.isFrozen(e)}var Et=`MapSet`,Dt=`Patches`,Ot=`ArrayMethods`,kt={};function B(e){let t=kt[e];return t||j(0,e),t}var At=e=>!!kt[e],jt,Mt=()=>jt,Nt=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:At(Et)?B(Et):void 0,arrayMethodsPlugin_:At(Ot)?B(Ot):void 0});function Pt(e,t){t&&(e.patchPlugin_=B(Dt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Ft(e){It(e),e.drafts_.forEach(Rt),e.drafts_=null}function It(e){e===jt&&(jt=e.parent_)}var Lt=e=>jt=Nt(jt,e);function Rt(e){let t=e[A];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function zt(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[A].modified_&&(Ft(t),j(4)),I(e)&&(e=Bt(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[A].base_,e,t)}else e=Bt(t,n);return Vt(t,e,!0),Ft(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===$e?void 0:e}function Bt(e,t){if(Tt(t))return t;let n=t[A];if(!n)return Yt(t,e.handledSet_,e);if(!Ut(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);qt(n,e)}return n.copy_}function Vt(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&St(t,n)}function Ht(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Ut=(e,t)=>e.scope_===t,Wt=[];function Gt(e,t,n,r){let i=z(e),a=e.type_;if(r!==void 0&&dt(i,r,a)===t){ft(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;lt(i,(e,n)=>{if(F(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??Wt;for(let e of o)ft(i,e,n,a)}function Kt(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!Ut(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=bt(i);Gt(e,i.draft_??i,a,n),qt(i,r)})}function qt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}Ht(e)}}function Jt(e,t,n){let{scope_:r}=e;if(F(n)){let i=n[A];Ut(i,r)&&i.callbacks_.push(function(){nn(e),Gt(e,n,bt(i),t)})}else I(n)&&e.callbacks_.push(function(){let i=z(e);e.type_===3?i.has(n)&&Yt(n,r.handledSet_,r):dt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&Yt(dt(e.copy_,t,e.type_),r.handledSet_,r)})}function Yt(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||F(e)||t.has(e)||!I(e)||Tt(e)?e:(t.add(e),lt(e,(r,i)=>{if(F(i)){let t=i[A];Ut(t,n)&&(ft(e,r,bt(t),e.type_),Ht(t))}else I(i)&&Yt(i,t,n)}),e)}function Xt(e,t){let n=mt(e),r={type_:+!!n,scope_:t?t.scope_:Mt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=Zt;n&&(i=[r],a=V);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var Zt={get(e,t){if(t===A)return e;if(t===`constructor`||t===`__proto__`){let n=z(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=z(e);if(!ut(i,t,e.type_))return $t(e,i,t);let a=i[t];if(e.finalized_||!I(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&yt(t))return a;if(a===Qt(e.base_,t)){nn(e);let n=e.type_===1?+t:t,r=an(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in z(e)},ownKeys(e){return Reflect.ownKeys(z(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=en(z(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=Qt(z(e),t),i=r?.[A];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(pt(n,r)&&(n!==void 0||ut(e.base_,t,e.type_)))return!0;nn(e),tn(e)}return e.copy_[t]===n&&(n!==void 0||ut(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),Jt(e,t,n),!0)},deleteProperty(e,t){return nn(e),Qt(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),tn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=z(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[at]:!0,[rt]:e.type_!==1||t!==`length`,[it]:r[it],[P]:n[t]}},defineProperty(){j(11)},getPrototypeOf(e){return N(e.base_)},setPrototypeOf(){j(12)}},V={};for(let e in Zt){let t=Zt[e];V[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}V.deleteProperty=function(e,t){return V.set.call(this,e,t,void 0)},V.set=function(e,t,n){return Zt.set.call(this,e[0],t,n,e[0])};function Qt(e,t){let n=e[A];return(n?z(n):e)[t]}function $t(e,t,n){let r=en(t,n);return r?P in r?r[P]:r.get?.call(e.draft_):void 0}function en(e,t){if(!(t in e))return;let n=N(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=N(n)}}function tn(e){e.modified_||(e.modified_=!0,e.parent_&&tn(e.parent_))}function nn(e){e.copy_||(e.assigned_=new Map,e.copy_=xt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var rn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(R(e)&&!R(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}R(t)||j(6),n!==void 0&&!R(n)&&j(7);let r;if(I(e)){let i=Lt(this),a=an(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?Ft(i):It(i)}return Pt(i,n),zt(r,i)}else if(!e||!_t(e)){if(r=t(e),r===void 0&&(r=e),r===$e&&(r=void 0),this.autoFreeze_&&St(r,!0),n){let t=[],i=[];B(Dt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else j(1,e)},this.produceWithPatches=(e,t)=>{if(R(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},vt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),vt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),vt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){I(e)||j(8),F(e)&&(e=on(e));let t=Lt(this),n=an(t,e,void 0);return n[A].isManual_=!0,It(t),n}finishDraft(e,t){let n=e&&e[A];(!n||!n.isManual_)&&j(9);let{scope_:r}=n;return Pt(r,t),zt(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=B(Dt).applyPatches_;return F(e)?r(e,t):this.produce(e,e=>r(e,t))}};function an(e,t,n,r){let[i,a]=ht(t)?B(Et).proxyMap_(t,n):gt(t)?B(Et).proxySet_(t,n):Xt(t,n);return(n?.scope_??Mt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?Kt(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function on(e){return F(e)||j(10,e),sn(e)}function sn(e){if(!I(e)||Tt(e))return e;let t=e[A],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=xt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=xt(e,!0);return lt(n,(e,t)=>{ft(n,e,sn(t))},r),t&&(t.finalized_=!1),n}var cn=new rn().produce;function ln(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var un=ln(),dn=ln,fn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?Xe:Xe.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function pn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(H(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>Qe(t)&&t.type===e,n}var mn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function hn(e){return I(e)?cn(e,()=>{}):e}function gn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function _n(e){return typeof e==`boolean`}var vn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new mn;return t&&(_n(t)?a.push(un):a.push(dn(t.extraArgument))),a},yn=`RTK_autoBatch`,bn=e=>t=>{setTimeout(t,e)},xn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Sn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?xn(window.requestAnimationFrame,100):bn(10):e.type===`callback`?e.queueNotification:bn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[yn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Cn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new mn(e);return n&&r.push(Sn(typeof n==`object`?n:void 0)),r};function wn(e){let t=vn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(Ke(n))c=Ye(n);else throw Error(H(1));let l;l=typeof r==`function`?r(t):t();let u=Xe;i&&(u=fn({trace:!1,...typeof i==`object`&&i}));let d=Cn(Ze(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return qe(c,o,p)}function Tn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(H(28));if(r in t)throw Error(H(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function En(e){return typeof e==`function`}function Dn(e,t){let[n,r,i]=Tn(t),a;if(En(e))a=()=>hn(e());else{let t=hn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(F(e)){let r=n(e,t);return r===void 0?e:r}else if(I(e))return cn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var On=Symbol.for(`rtk-slice-createasyncthunk`);function kn(e,t){return`${e}/${t}`}function An({creators:e}={}){let t=e?.asyncThunk?.[On];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(H(11));let i=(typeof e.reducers==`function`?e.reducers(Nn()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(H(12));if(n in o.sliceCaseReducersByType)throw Error(H(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:kn(n,r),createNotation:typeof e.reducers==`function`};Fn(a)?Ln(o,a,s,t):Pn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Tn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Dn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=gn(d,r,m)),i}function i(t=l){return gn(gn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=jn(a,t,()=>gn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function jn(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var Mn=An();function Nn(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function Pn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!In(r))throw Error(H(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?pn(e,o):pn(e))}function Fn(e){return e._reducerDefinitionType===`asyncThunk`}function In(e){return e._reducerDefinitionType===`reducerWithPrepare`}function Ln({type:e,reducerName:t},n,r,i){if(!i)throw Error(H(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||Rn,pending:s||Rn,rejected:c||Rn,settled:l||Rn})}function Rn(){}var zn=`listener`,Bn=`completed`,Vn=`cancelled`;`${Vn}`,`${Bn}`,`${zn}${Vn}`,`${zn}${Bn}`;var{assign:Hn}=Object,Un=`listenerMiddleware`,Wn=Hn(pn(`${Un}/add`),{withTypes:()=>Wn});`${Un}`;var Gn=Hn(pn(`${Un}/remove`),{withTypes:()=>Gn});function H(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var U=e=>{if(!(!e||e.length===0))return Array.from(new Set(e))},Kn=(e,t)=>{let n=l(e.start),r=n.getDate(),i=n.getMonth()+1,a=(n.getDay()+6)%7;switch(e.byweekday=void 0,e.bymonth=void 0,e.bymonthday=void 0,e.byyearday=void 0,e.bysetpos=void 0,t){case p.WEEKLY:e.byweekday=[a];break;case p.MONTHLY:e.bymonthday=[r];break;case p.YEARLY:e.bymonth=[i],e.bymonthday=[r];break;default:break}},W=e=>{let t=Jn(e),n=$n(e.rrule,e.allDay);if(!t&&n.length===0){e.rrule=void 0;return}if(t&&n.length===0){e.rrule=Zn(t.toString(),e.allDay);return}e.rrule=[...Qn(e,t),...n].join(`
`)},qn=e=>{let t=e?.split(/\r?\n/).filter(e=>!e.trim().startsWith(`RDATE`));return t?.length?t.join(`
`):void 0},G=(e,t)=>e.filter(e=>e.getTime()!==t),Jn=e=>{let{repeatEndType:t,allDay:n,interval:r,count:i}=e,a=l(e.start),o=e.until?l(e.until):null,c=n?s(a):u(a),d=t===`ON_DATE`&&o?n?s(o):u(o):void 0,f={dtstart:c,interval:r,count:t===`AFTER`?i:void 0,until:t===`ON_DATE`?d:void 0};switch(e.repeatType){case`DAILY`:f={...f,freq:p.DAILY};break;case`WEEKLY`:f={...f,freq:p.WEEKLY};break;case`MONTHLY`:f={...f,freq:p.MONTHLY};break;case`YEARLY`:f={...f,freq:p.YEARLY};break;case`CUSTOM`:{let t=e.freq===p.YEARLY&&e.bysetpos?.length&&e.byweekday?.length,n=t?void 0:e.bysetpos,r=t?nr(e.byweekday,e.bysetpos?.[0]):e.byweekday;f={...f,freq:e.freq,interval:e.interval,count:e.repeatEndType===`AFTER`?e.count:void 0,byweekday:r,bymonth:e.bymonth,bymonthday:e.bymonthday,byyearday:e.byyearday,bysetpos:n};break}default:return null}return new y(f)},Yn=(e,t)=>{let n=l(t);if(e.allDay)return s(n);let r=l(e.start);return n.setHours(r.getHours(),r.getMinutes(),r.getSeconds(),0),u(n)},Xn=(e,t,n=[],r=[])=>{if(!t&&n.length===0&&r.length===0)return;let i=[...Qn(e,t)];if(n.length>0||r.length>0){let t=new f;n.forEach(e=>{t.rdate(e)}),r.forEach(e=>{t.exdate(e)}),i.push(...Zn(t.toString(),e.allDay).split(`
`))}return i.join(`
`)},Zn=(e,t)=>e.split(`
`).map(e=>h(e,t)).filter(Boolean).join(`
`),Qn=(e,t)=>{if(t)return Zn(t.toString(),e.allDay).split(`
`);let n=er(e),r=new f;return r.dtstart(n),r.rdate(n),Zn(r.toString(),e.allDay).split(`
`)},$n=(e,t)=>{if(!e)return[];let n=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(n.some(e=>e.startsWith(`RRULE`)))return n.filter(e=>e.startsWith(`RDATE`)||e.startsWith(`EXDATE`)).map(e=>h(e,t));let r=n.find(e=>e.startsWith(`DTSTART`))?.split(`:`,2)[1]?.trim();return n.flatMap(e=>{if(!e.startsWith(`RDATE`)&&!e.startsWith(`EXDATE`))return[];if(!r||!e.startsWith(`RDATE`))return[h(e,t)];let[n,i=``]=e.split(`:`,2),a=i.split(`,`).map(e=>e.trim()).filter(Boolean).filter(e=>e!==r);return a.length===0?[]:[h(`${n}:${a.join(`,`)}`,t)]})},er=e=>{let t=l(e.start);return e.allDay?s(t):u(t)},tr=[y.MO,y.TU,y.WE,y.TH,y.FR,y.SA,y.SU],nr=(e,t)=>!e?.length||!t?e:e.map(e=>tr[e]?.nth(t)).filter(Boolean),rr=(e,t)=>{let n=l(t);if(e.allDay)n.setHours(0,0,0,0);else{let t=l(e.start);n.setHours(t.getHours(),t.getMinutes(),t.getSeconds(),0)}return c(n)},ir=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),ar=new Set([`NEVER`,`AFTER`,`ON_DATE`]),or=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},sr=e=>ir.has(e)?e:`NEVER`,cr=e=>ar.has(e)?e:`NEVER`,lr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,ur=Mn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:p.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=rr(e,e.until)),r!==void 0&&(e.until=e.start+r),W(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=rr(e,n),W(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=l(e.start);a.setHours(i,0,0,0),e.start=c(a);let o=l(e.end);n?o=pe(S(o),1):(o=oe(o,1),o=le(o,a.getHours()),o=me(o,r)),e.end=c(o),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=rr(e,e.until)),W(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=qn(e.rrule)),e.repeatType=t.payload,W(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=lr(e.count):e.count=null,W(e)},setFreq:(e,t)=>{e.freq=t.payload,Kn(e,t.payload),W(e)},setCount:(e,t)=>{e.count=lr(t.payload),W(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),W(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=U(r),W(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=U(n.byweekday)),`bymonth`in n&&(e.bymonth=U(n.bymonth)),`bymonthday`in n&&(e.bymonthday=U(n.bymonthday)),`byyearday`in n&&(e.byyearday=U(n.byyearday)),`bysetpos`in n&&(e.bysetpos=U(n.bysetpos)),W(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:K}=ur,dr=ur.reducer,q={state:e=>e.event},fr=Mn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:pr}=fr,mr=fr.reducer,J={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},hr=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},gr=e=>c(S(l(e))),_r=t=>c(S(e(t))),vr=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0,0)),yr=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59,999)),br=e=>Math.floor(vr(e).getTime()/1e3),xr=(e,t)=>{let n=gr(t),r=ee(e)??null,i=_(e);return{startTimestamp:n,baseRule:r,recurrenceSet:i,addedDateSet:new Set((i?.rdates()??[]).map(_r).filter(e=>r?!0:e!==n))}},Sr=(e,t)=>{let n=br(t),r=vr(t),i=yr(t),a=e.baseRule?e.baseRule.between(r,i,!0).length>0:!1,o=e.recurrenceSet?e.recurrenceSet.between(r,i,!0).length>0:n===e.startTimestamp;return{timestamp:n,full:o,base:a,excluded:a&&!o,rdate:e.addedDateSet.has(n)}},Cr=(e,t)=>{if(!t)return[];let n=vr(t.start),r=yr(t.end),i=br(t.start),o=br(t.end),s=[];return e.recurrenceSet?s=e.recurrenceSet.between(n,r,!0).map(_r):e.startTimestamp>=i&&e.startTimestamp<=o&&(s=[e.startTimestamp]),Array.from(new Set(s)).map(e=>({id:a(new Date(e*1e3)),start:ie(l(e),`yyyy-MM-dd`),allDay:!0}))},wr=(e,t,n)=>{if(!t)return[];if(!e.recurrenceSet){let n=br(t);return e.startTimestamp>=n?[e.startTimestamp]:[]}let r=e.recurrenceSet.between(vr(t),fe(yr(t),100),!0,(e,t)=>t<n).map(_r);return Array.from(new Set(r)).slice(0,n)},Tr=(e,t,n,r,i)=>{let a=Yn(e,r),o=a.getTime(),s=Er(t,({baseRule:e,rdates:t,exdates:r})=>{let s=Dr(t,a,o,n===`rdate`,i);return{baseRule:e,rdates:n===`exdate`&&i?G(s,o):s,exdates:Dr(r,a,o,n===`exdate`,i)}});return Xn(e,s.baseRule,hr(s.rdates),hr(s.exdates))},Er=(e,t)=>t({baseRule:e.baseRule,rdates:Or(e),exdates:e.recurrenceSet?.exdates()??[]}),Dr=(e,t,n,r,i)=>r?i?[...e,t]:G(e,n):e,Or=e=>{let t=e.recurrenceSet?.rdates()??[];return e.baseRule?t:t.filter(t=>_r(t)!==e.startTimestamp)},kr=d.div`
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
`,Ar=d.div`
  min-width: 120px;
  max-width: 120px;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,jr=d.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 4px;

  height: 215px;
  margin-top: 57px;
`,Mr=d.li`
  padding: 4px 8px;

  font-size: 13px;
  line-height: 13px;
  font-family: monospace;

  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  border-left: 5px solid var(--gray-200);
`,Y=n(),Nr=8,Pr=()=>{let e=D(),t=O(q.state),{repeatType:n,start:r,rrule:i}=t,[o,s]=(0,T.useState)(null),c=(0,T.useMemo)(()=>xr(i,r),[i,r]),l=(0,T.useMemo)(()=>Cr(c,o),[c,o]),u=(0,T.useMemo)(()=>wr(c,o?.start??null,Nr),[c,o]),d=(0,T.useCallback)((n,r,i)=>{e(K.setRRule(Tr(t,c,n,r,i)))},[e,c,t]),f=(0,T.useCallback)(e=>{let t=Sr(c,e);if(t.base&&t.excluded){d(`exdate`,t.timestamp,!1);return}if(t.base&&t.full&&n!==`NEVER`){d(`exdate`,t.timestamp,!0);return}if(!t.base&&t.full&&t.rdate){d(`rdate`,t.timestamp,!1);return}t.full||d(`rdate`,t.timestamp,!0)},[d,c,n]),p=(0,T.useCallback)(e=>Sr(c,e),[c]);return(0,Y.jsxs)(kr,{children:[(0,Y.jsx)(re,{label:`Recurrence Preview`,children:(0,Y.jsx)(ge,{aspectRatio:2,height:250,expandRows:!1,themeSystem:`bootstrap5`,plugins:[he,_e],initialView:`dayGridMonth`,timeZone:`UTC`,eventDisplay:`none`,events:l,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>s({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=p(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>f(e.date)})}),(0,Y.jsx)(Ar,{children:u.length===0?(0,Y.jsxs)(`p`,{children:[b(`No occurrences starting from`),(0,Y.jsx)(`br`,{}),ie(o?.currentStart??new Date,`PP`)]}):(0,Y.jsx)(jr,{$count:u.length,children:u.map(e=>{let t=a(new Date(e*1e3));return(0,Y.jsx)(Mr,{children:t},t)})})})]})},Fr=d.div`
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
`,Ir=e=>c(oe(l(e),1)),Lr=(e,t,n)=>{let r=zr(t,n);return e.getTime()>=r.getTime()},Rr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return c(pe(S(l(e)),1));let i=l(e),a=zr(t,r);return i.getTime()>=a.getTime()?e:c(a)},zr=(e,t)=>me(l(e),t),Br=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Vr=({inputValue:e,value:t,min:n})=>{let r=Br(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Hr=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,T.useState)(e?.toString()??``),o=(0,T.useRef)(void 0),s=(0,T.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,T.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,T.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,T.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,T.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Br(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,T.useCallback)(n=>{n.stopPropagation();let r=Vr({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Ur=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Hr({value:e,min:t,debounceMs:n,onChange:r});return(0,Y.jsx)(re,{...i,children:(0,Y.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Wr=e=>(0,Y.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Y.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Gr=e=>(0,Y.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,Y.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Kr=({noun:e=`day`})=>{let t=D(),{interval:n}=O(q.state);return(0,Y.jsxs)(qr,{children:[(0,Y.jsx)(`span`,{children:`Every`}),(0,Y.jsx)(Jr,{type:`text`,className:`text`,value:n,onChange:e=>{let n=parseInt(e.target.value,10)||1;t(K.setInterval(n))}}),(0,Y.jsxs)(Yr,{children:[(0,Y.jsx)(Xr,{type:`button`,onClick:()=>t(K.setInterval(n+1)),children:(0,Y.jsx)(Gr,{})}),(0,Y.jsx)(Xr,{type:`button`,onClick:()=>t(K.setInterval(n-1)),children:(0,Y.jsx)(Wr,{})})]}),(0,Y.jsxs)(`span`,{children:[e,n>1?`s`:``]})]})},qr=d.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Jr=d.input`
  width: 60px;
`,Yr=d.div`
  display: flex;
  flex-direction: column;
`,Xr=d.button`
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
`,Zr=()=>(0,Y.jsx)(Kr,{noun:`day`}),X=[{value:`MO`,label:`Monday`,days:[y.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[y.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[y.WE.weekday]},{value:`TH`,label:`Thursday`,days:[y.TH.weekday]},{value:`FR`,label:`Friday`,days:[y.FR.weekday]},{value:`SA`,label:`Saturday`,days:[y.SA.weekday]},{value:`SU`,label:`Sunday`,days:[y.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[y.MO.weekday,y.TU.weekday,y.WE.weekday,y.TH.weekday,y.FR.weekday]},{value:`WEK`,label:`Weekend Day (Sat/Sun)`,days:[y.SA.weekday,y.SU.weekday]}],Qr=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},$r=(e,t)=>{let n=Qr(e),r=Qr(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},ei=(e,t)=>{if(e){let t=X.find(t=>$r(t.days,e));if(t)return t.value}if(t!==void 0){let e=X.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return X[0].value},ti=e=>X.find(t=>t.value===e)?.days??[y.MO.weekday],Z=`5px`,Q=d.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-100);
  border-right: 1px solid var(--gray-300);
  border-bottom: 1px solid var(--gray-300);
  border-left: none;
  border-top: none;
`,ni=d(Q)`
  cursor: pointer;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--teal-600);
  }
`,ri=d(Q)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,ii=d.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--gray-300);
  border: 1px solid var(--gray-300);
  border-radius: ${Z};

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,ai=d(ii)`
  grid-template-columns: repeat(7, 1fr);

  ${Q} {
    &:first-child {
      border-top-left-radius: ${Z};
    }

    &:nth-child(7) {
      border-top-right-radius: ${Z};
    }

    &:last-child {
      border-bottom-right-radius: ${Z};
    }

    &:nth-child(29) {
      border-bottom-left-radius: ${Z};
    }

    &:nth-child(7n) {
      border-right: none;
    }

    &:nth-child(n + 29) {
      border-bottom: none;
    }
  }
`,oi=d(ii)`
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
`,si=d(ii)`
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
`,ci=({label:e,values:t,onChange:n})=>(0,Y.jsx)(re,{label:e,children:(0,Y.jsxs)(ai,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,Y.jsx)(ni,{type:`button`,className:w(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,Y.jsx)(ri,{},e))]})}),li=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],ui=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],di=()=>{let e=D(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=O(q.state),a=l(t),o=a.getDate(),s=(a.getDay()+6)%7,c=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[o],d=i?.[0]??1,f=ei(r,s),p=t=>{e(K.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(K.setByRules({bymonthday:void 0,byweekday:ti(t),bysetpos:[n]}))};return(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(Kr,{noun:`month`}),(0,Y.jsx)(`div`,{className:`field`,children:(0,Y.jsx)(x,{label:`Repeat On`,value:c,options:li,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}})}),c===`MONTHDAY`&&(0,Y.jsx)(ci,{label:`Days of month`,values:u,onChange:e=>p(e)}),c===`WEEKDAY`&&(0,Y.jsxs)(de,{className:`field`,children:[(0,Y.jsx)(x,{label:`Position`,value:d,options:ui,onChange:e=>m(f,Number.parseInt(e,10))}),(0,Y.jsx)(x,{label:`Day`,value:f,options:X.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},fi=[y.MO,y.TU,y.WE,y.TH,y.FR,y.SA,y.SU],pi=()=>{let e=D(),{byweekday:t}=O(q.state);return(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(Kr,{noun:`week`}),(0,Y.jsx)(oi,{className:`field`,children:fi.map(n=>(0,Y.jsx)(ni,{type:`button`,className:w(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(K.setDays({type:`byweekday`,values:r}))},children:n.toString()},n.weekday))})]})},mi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],hi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],gi=[{value:1,label:`January`},{value:2,label:`February`},{value:3,label:`March`},{value:4,label:`April`},{value:5,label:`May`},{value:6,label:`June`},{value:7,label:`July`},{value:8,label:`August`},{value:9,label:`September`},{value:10,label:`October`},{value:11,label:`November`},{value:12,label:`December`}],_i=()=>{let e=D(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=O(q.state),o=l(t),s=o.getDate(),c=o.getMonth()+1,u=(o.getDay()+6)%7,d=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,f=r?.length?r:[s],p=n?.length?n:[c],m=a?.[0]??1,h=ei(i,u),g=(t,n)=>{e(K.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},_=(t,n,r)=>{e(K.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:ti(n),bysetpos:[r]}))};return(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(Kr,{noun:`year`}),(0,Y.jsx)(re,{label:`Month`,children:(0,Y.jsx)(si,{children:gi.map(e=>{let t=p.includes(e.value);return(0,Y.jsx)(ni,{type:`button`,className:w(t&&`active`),onClick:()=>{let n=p.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),d===`WEEKDAY`?_(n,h,m):g(n,f))},children:e.label},e.value)})})}),(0,Y.jsx)(`div`,{className:`field`,children:(0,Y.jsx)(x,{label:`Repeat On`,value:d,options:mi,onChange:e=>{e===`WEEKDAY`?_(p,h,m):g(p,f)}})}),d===`MONTHDAY`&&(0,Y.jsx)(ci,{label:`Days of month`,values:f,onChange:e=>g(p,e)}),d===`WEEKDAY`&&(0,Y.jsxs)(de,{className:`field`,children:[(0,Y.jsx)(x,{label:`Position`,value:m,options:hi,onChange:e=>_(p,h,Number.parseInt(e,10))}),(0,Y.jsx)(x,{label:`Day`,value:h,options:X.map(e=>({value:e.value,label:e.label})),onChange:e=>_(p,e,m)})]})]})},vi=()=>{let{freq:e}=O(q.state);return e===p.DAILY?(0,Y.jsx)(Zr,{}):e===p.WEEKLY?(0,Y.jsx)(pi,{}):e===p.MONTHLY?(0,Y.jsx)(di,{}):e===p.YEARLY?(0,Y.jsx)(_i,{}):null},yi=g({position:[`bottom`,`top`],alignment:`end`,padding:8}),bi=(e,t,n,r)=>{let[i,a]=(0,T.useState)();return(0,T.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=m({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:yi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},xi=(e,t,n)=>{(0,T.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Si=d.div`
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--gray-200);
`,Ci=d.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`,wi=d.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ti=d.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }
`,Ei=d.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Di=d.div`
  position: relative;
  flex-shrink: 0;
`,Oi=d.button`
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
`,ki=d.div`
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
`,Ai=d.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,ji=d.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Mi=d.li`
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
`,Ni=({title:e,actionLabel:t,actionClass:n,popoverTitle:r,dates:i,openToDate:a,weekStartDay:o,formatDate:s,filterDate:l,onAdd:u,onRemove:d})=>{let[f,p]=(0,T.useState)(!1),m=(0,T.useRef)(null),h=(0,T.useRef)(null),g=(0,T.useRef)(null),_=bi(f,h,g,m);return(0,T.useEffect)(()=>{i.length===0&&p(!1)},[i.length]),xi(f,[h,g],()=>p(!1)),(0,Y.jsxs)(Si,{children:[(0,Y.jsx)(Ci,{children:b(e)}),(0,Y.jsxs)(wi,{children:[(0,Y.jsxs)(Di,{ref:m,children:[(0,Y.jsx)(Oi,{ref:h,type:`button`,disabled:i.length===0,className:w({active:f}),onClick:()=>{i.length!==0&&p(e=>!e)},children:i.length}),f&&(0,Y.jsxs)(ki,{ref:g,style:{top:_?.top??0,left:_?.left??0,visibility:_?`visible`:`hidden`},children:[(0,Y.jsx)(Ai,{children:b(r)}),(0,Y.jsx)(ji,{children:i.map(e=>(0,Y.jsxs)(Mi,{children:[(0,Y.jsx)(`span`,{children:s(e)}),(0,Y.jsx)(`button`,{type:`button`,onClick:()=>d(e),children:`×`})]},e))})]})]}),(0,Y.jsx)(Ti,{children:(0,Y.jsx)(ae,{selected:null,onChange:e=>{e&&u(c(S(e)))},customInput:(0,Y.jsx)(Pi,{label:t,className:w(`btn`,n)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:b(`Today`),openToDate:a,calendarStartDay:o,filterDate:l})})]})]})},Pi=(0,T.forwardRef)(({label:e,...t},n)=>(0,Y.jsx)(Ei,{type:`button`,ref:n,...t,children:b(e)}));Pi.displayName=`PickerTrigger`;var Fi=d.div`
  flex: 1;
`,Ii=()=>{let t=D(),n=O(q.state),{start:r,rrule:i}=n,a=(0,T.useMemo)(()=>c(S(l(r))),[r]),o=(0,T.useMemo)(()=>ee(i)??null,[i]),d=(0,T.useMemo)(()=>_(i),[i]),f=(0,T.useMemo)(()=>d?Array.from(new Set(d.rdates().map(t=>c(S(e(t)))).filter(e=>o?!0:e!==a))).sort((e,t)=>e-t):[],[o,d,a]),p=(0,T.useMemo)(()=>d?Array.from(new Set(d.exdates().map(t=>c(S(e(t)))))).sort((e,t)=>e-t):[],[d]),m=(0,T.useMemo)(()=>new Set(f),[f]),h=(0,T.useMemo)(()=>new Set(p),[p]),g=(0,T.useCallback)(e=>{let t=s(S(e)),n=u(ne(e)),r=o?o.between(t,n,!0).length>0:!1,i=d?d.between(t,n,!0).length>0:c(S(e))===a;return{full:i,base:r,excluded:r&&!i}},[o,d,a]),v=r=>{let i=r({baseRule:o,rdates:d?.rdates().filter(t=>o?!0:c(S(e(t)))!==a)??[],exdates:d?.exdates()??[]});t(K.setRRule(Xn(n,i.baseRule,Li(i.rdates),Li(i.exdates))))};return{addedDates:f,excludedDates:p,addFixedDate:(e,t)=>{let r=Yn(n,t);v(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:G(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{let r=Yn(n,t).getTime();v(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?G(n,r):n,exdates:e===`exdate`?G(i,r):i}))},canAddOccurrence:(0,T.useCallback)(e=>{let t=c(S(e)),n=g(e);return!n.full&&!n.excluded&&!m.has(t)},[m,g]),canExcludeOccurrence:(0,T.useCallback)(e=>{let t=c(S(e)),n=g(e);return n.base&&!n.excluded&&!h.has(t)},[h,g]),getStatus:g}},Li=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},Ri=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],zi=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Bi=[{value:p.DAILY,label:`Daily`},{value:p.WEEKLY,label:`Weekly`},{value:p.MONTHLY,label:`Monthly`},{value:p.YEARLY,label:`Yearly`}],Vi=300,Hi=()=>{let e=D(),t=O(q.state),n=O(J.weekStartDay),{repeatType:r,repeatEndType:i,count:a,until:o,freq:s,start:c}=t,u=r!==`NEVER`,{addedDates:d,excludedDates:f,addFixedDate:p,removeFixedDate:m,canAddOccurrence:h,canExcludeOccurrence:g}=Ii(),_=(0,T.useMemo)(()=>l(c),[c]),v=e=>ie(l(e),`yyyy-MM-dd`);return(0,Y.jsxs)(Fi,{children:[(0,Y.jsxs)(de,{children:[(0,Y.jsx)(x,{label:`Repeat`,value:r,options:Ri,onChange:t=>e(K.setRepeatType(t))}),r===`CUSTOM`&&(0,Y.jsx)(x,{label:``,value:s,options:Bi,onChange:t=>e(K.setFreq(Number.parseInt(t,10)))})]}),r===`CUSTOM`&&(0,Y.jsx)(`div`,{className:`field`,children:(0,Y.jsx)(vi,{})}),r!==`NEVER`&&(0,Y.jsxs)(de,{className:`field`,children:[(0,Y.jsx)(x,{label:`Repeat End`,options:zi,value:i,onChange:t=>e(K.setRepeatEndType(t))}),i===`AFTER`&&(0,Y.jsx)(Ur,{label:`Times`,value:a,min:1,debounceMs:Vi,onChange:t=>e(K.setCount(t))}),i===`ON_DATE`&&(0,Y.jsx)(ce,{label:``,value:o||null,onChange:t=>e(K.setUntil(t)),datePickerProps:{showTimeInput:!1,calendarStartDay:n,minDate:_}})]}),(0,Y.jsx)(Ni,{title:`Custom Occurrences`,actionLabel:`Add Occurrence`,actionClass:`icon add dashed`,popoverTitle:`Added Occurrences`,dates:d,openToDate:_,formatDate:v,filterDate:h,weekStartDay:n,onAdd:e=>p(`rdate`,e),onRemove:e=>m(`rdate`,e)}),u&&(0,Y.jsx)(Ni,{title:`Exceptions`,actionLabel:`Exclude Occurrence`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Occurrences`,dates:f,openToDate:_,formatDate:v,filterDate:g,weekStartDay:n,onAdd:e=>p(`exdate`,e),onRemove:e=>m(`exdate`,e)})]})},Ui=()=>{let e=(0,T.useId)(),t=(0,T.useId)(),n=(0,T.useId)(),r=D(),{start:i,end:a,allDay:o}=O(q.state),{date:s,time:c,datetime:u}=O(J.formats),d=O(J.weekStartDay),f=O(J.timeInterval),p=O(J.eventDuration),m=(0,T.useMemo)(()=>o?s.short.icu:u.short.icu,[o,s,u]),h=(0,T.useMemo)(()=>o?Ir(a):a,[o,a]);return(0,Y.jsxs)(Fr,{children:[(0,Y.jsxs)(`div`,{style:{flex:1},children:[(0,Y.jsx)(se,{id:e,label:`All Day`,enabled:o,onClick:e=>r(K.setAllDay({enabled:e,eventDuration:p}))}),(0,Y.jsx)(ce,{id:t,label:`Starts`,value:i,onChange:e=>r(K.setStart(e)),datePickerProps:{id:t,showIcon:!0,icon:(0,Y.jsx)(ue,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:m,timeFormat:c.short.icu,todayButton:b(`Today`),calendarStartDay:d,timeIntervals:f}}),(0,Y.jsx)(ce,{id:n,label:`Ends`,value:h,onChange:e=>{e!=null&&r(K.setEnd(Rr({value:e,start:i,allDay:o,timeInterval:f})))},datePickerProps:{id:n,showIcon:!0,icon:(0,Y.jsx)(ue,{}),toggleCalendarOnIconClick:!0,minDate:l(i),showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:m,timeFormat:c.short.icu,todayButton:b(`Today`),calendarStartDay:d,timeIntervals:f,filterTime:e=>Lr(new Date(e),i,f)}})]}),(0,Y.jsx)(Hi,{}),(0,Y.jsx)(Pr,{})]})},Wi=d.div`
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
`,Gi=()=>{let{rrule:t}=O(q.state),n=(0,T.useMemo)(He,[]),r=t?v(t,{forceset:!0}).all((e,t)=>t<10).map(t=>`${ie(e(t),`yyyy-MM-dd HH:mm`)} [${ve(t)}]`):[];return(0,Y.jsxs)(Wi,{children:[(0,Y.jsx)(Ui,{}),n&&(0,Y.jsxs)(`code`,{children:[(0,Y.jsx)(`pre`,{children:t}),(0,Y.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},Ki=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,qi(n)),$(t,`end`,qi(r)),$(t,`until`,i?qi(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},qi=e=>ie(l(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},Ji=e=>{let t=ee(e.event.rrule),{byweekday:n,bysetpos:r}=or(t?.options.byweekday),i=sr(e.event.repeatType),a=cr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||p.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?lr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return wn({reducer:{app:mr,event:dr},preloadedState:o})},Yi=new WeakSet,Xi=e=>{if(Yi.has(e))return;Yi.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=Ji(JSON.parse(t.textContent)),i=xe.createRoot(n);r.subscribe(()=>{Ki(r,e)}),Ki(r,e),i.render((0,Y.jsx)(Pe,{store:r,children:(0,Y.jsx)(Gi,{})}))},Zi=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(Xi)},Qi=()=>{Zi(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&Xi(e),Zi(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Qi):Qi();