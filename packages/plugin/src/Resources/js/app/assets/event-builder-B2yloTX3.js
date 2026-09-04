import{_ as e,c as t,d as n,f as r,g as i,h as a,i as o,n as s,p as c,r as l,s as u,t as d}from"./date-DHm29epU.js";import{a as f,c as p,d as m,i as h,l as g,n as _,o as v,s as y,t as ee}from"./rrule-7b6Rmlwt.js";import{D as b,E as te,S as x,T as ne,a as re,b as ie,c as ae,f as oe,h as S,i as se,l as C,m as w,n as ce,o as le,p as ue,r as T,s as de,t as fe,v as pe,y as me}from"./components-g4Y3Kyg2.js";import{n as he,t as ge}from"./dist-DgGuNF4E.js";import{t as _e}from"./interaction-DMXpF6lk.js";function ve(e,t){let n=te(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=S(n.getDate(),2),t=S(n.getMonth()+1,2);a=`${S(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=S(Math.trunc(t/60),2),r=S(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=S(n.getHours(),2),r=S(n.getMinutes(),2),i=S(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var ye=i((e=>{var t=a();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,o=t.useRef,s=t.useEffect,c=t.useMemo,l=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,a,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!i){if(i=!0,o=e,e=a(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,r(o,e))return t;var n=a(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var i=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,a,u]);var p=i(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),be=i(((e,t)=>{t.exports=ye()})),xe=e(r()),E=e(a(),1),Se=be();function Ce(e){e()}function we(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Ce(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Te={notify(){},get:()=>[]};function Ee(e,t){let n,r=Te,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=we())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Te)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var De=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Oe=typeof navigator<`u`&&navigator.product===`ReactNative`,ke=De||Oe?E.useLayoutEffect:E.useEffect,Ae=Symbol.for(`react-redux-context`),je=typeof globalThis<`u`?globalThis:{};function Me(){if(!E.createContext)return{};let e=je[Ae]??(je[Ae]=new Map),t=e.get(E.createContext);return t||(t=E.createContext(null),e.set(E.createContext,t)),t}var D=Me();function Ne(e){let{children:t,context:n,serverState:r,store:i}=e,a=E.useMemo(()=>{let e=Ee(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=E.useMemo(()=>i.getState(),[i]);ke(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||D;return E.createElement(s.Provider,{value:a},t)}var Pe=Ne;function Fe(e=D){return function(){return E.useContext(e)}}var Ie=Fe();function Le(e=D){let t=e===D?Ie:Fe(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Re=Le();function ze(e=D){let t=e===D?Re:Le(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var O=ze(),Be=(e,t)=>e===t;function Ve(e=D){let t=e===D?Ie:Fe(e),n=(e,n={})=>{let{equalityFn:r=Be}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();E.useRef(!0);let s=E.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Se.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return E.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var k=Ve(),He=()=>!1;function A(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var Ue=typeof Symbol==`function`&&Symbol.observable||`@@observable`,We=()=>Math.random().toString(36).substring(7).split(``).join(`.`),Ge={INIT:`@@redux/INIT${We()}`,REPLACE:`@@redux/REPLACE${We()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${We()}`};function Ke(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function qe(e,t,n){if(typeof e!=`function`)throw Error(A(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(A(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(A(1));return n(qe)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(A(3));return i}function d(e){if(typeof e!=`function`)throw Error(A(4));if(c)throw Error(A(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(A(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!Ke(e))throw Error(A(7));if(e.type===void 0)throw Error(A(8));if(typeof e.type!=`string`)throw Error(A(17));if(c)throw Error(A(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(A(10));r=e,f({type:Ge.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(A(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[Ue](){return this}}}return f({type:Ge.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[Ue]:m}}function Je(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:Ge.INIT})===void 0)throw Error(A(12));if(n(void 0,{type:Ge.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(A(13))})}function Ye(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{Je(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(A(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function Xe(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function Ze(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(A(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=Xe(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function Qe(e){return Ke(e)&&`type`in e&&typeof e.type==`string`}var $e=Symbol.for(`immer-nothing`),et=Symbol.for(`immer-draftable`),j=Symbol.for(`immer-state`);function M(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var N=Object,P=N.getPrototypeOf,tt=`constructor`,nt=`prototype`,rt=`configurable`,it=`enumerable`,at=`writable`,F=`value`,I=e=>!!e&&!!e[j];function L(e){return e?ct(e)||ht(e)||!!e[et]||!!e[tt]?.[et]||gt(e)||_t(e):!1}var ot=N[nt][tt].toString(),st=new WeakMap;function ct(e){if(!e||!vt(e))return!1;let t=P(e);if(t===null||t===N[nt])return!0;let n=N.hasOwnProperty.call(t,tt)&&t[tt];if(n===Object)return!0;if(!R(n))return!1;let r=st.get(n);return r===void 0&&(r=Function.toString.call(n),st.set(n,r)),r===ot}function lt(e,t,n=!0){ut(e)===0?(n?Reflect.ownKeys(e):N.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function ut(e){let t=e[j];return t?t.type_:ht(e)?1:gt(e)?2:_t(e)?3:0}var dt=(e,t,n=ut(e))=>n===2?e.has(t):N[nt].hasOwnProperty.call(e,t),ft=(e,t,n=ut(e))=>n===2?e.get(t):e[t],pt=(e,t,n,r=ut(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function mt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var ht=Array.isArray,gt=e=>e instanceof Map,_t=e=>e instanceof Set,vt=e=>typeof e==`object`,R=e=>typeof e==`function`,yt=e=>typeof e==`boolean`;function bt(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var z=e=>e.copy_||e.base_,xt=e=>e.modified_?e.copy_:e.base_;function St(e,t){if(gt(e))return new Map(e);if(_t(e))return new Set(e);if(ht(e))return Array[nt].slice.call(e);let n=ct(e);if(t===!0||t===`class_only`&&!n){let t=N.getOwnPropertyDescriptors(e);delete t[j];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[at]===!1&&(a[at]=!0,a[rt]=!0),(a.get||a.set)&&(t[i]={[rt]:!0,[at]:!0,[it]:a[it],[F]:e[i]})}return N.create(P(e),t)}else{let t=P(e);if(t!==null&&n)return{...e};let r=N.create(t);return N.assign(r,e)}}function Ct(e,t=!1){return Et(e)||I(e)||!L(e)?e:(ut(e)>1&&N.defineProperties(e,{set:Tt,add:Tt,clear:Tt,delete:Tt}),N.freeze(e),t&&lt(e,(e,t)=>{Ct(t,!0)},!1),e)}function wt(){M(2)}var Tt={[F]:wt};function Et(e){return e===null||!vt(e)?!0:N.isFrozen(e)}var Dt=`MapSet`,Ot=`Patches`,kt=`ArrayMethods`,At={};function B(e){let t=At[e];return t||M(0,e),t}var jt=e=>!!At[e],V,Mt=()=>V,Nt=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:jt(Dt)?B(Dt):void 0,arrayMethodsPlugin_:jt(kt)?B(kt):void 0});function Pt(e,t){t&&(e.patchPlugin_=B(Ot),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Ft(e){It(e),e.drafts_.forEach(Rt),e.drafts_=null}function It(e){e===V&&(V=e.parent_)}var Lt=e=>V=Nt(V,e);function Rt(e){let t=e[j];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function zt(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[j].modified_&&(Ft(t),M(4)),L(e)&&(e=Bt(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[j].base_,e,t)}else e=Bt(t,n);return Vt(t,e,!0),Ft(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===$e?void 0:e}function Bt(e,t){if(Et(t))return t;let n=t[j];if(!n)return Yt(t,e.handledSet_,e);if(!Ut(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);qt(n,e)}return n.copy_}function Vt(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Ct(t,n)}function Ht(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Ut=(e,t)=>e.scope_===t,Wt=[];function Gt(e,t,n,r){let i=z(e),a=e.type_;if(r!==void 0&&ft(i,r,a)===t){pt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;lt(i,(e,n)=>{if(I(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??Wt;for(let e of o)pt(i,e,n,a)}function Kt(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!Ut(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=xt(i);Gt(e,i.draft_??i,a,n),qt(i,r)})}function qt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}Ht(e)}}function Jt(e,t,n){let{scope_:r}=e;if(I(n)){let i=n[j];Ut(i,r)&&i.callbacks_.push(function(){nn(e),Gt(e,n,xt(i),t)})}else L(n)&&e.callbacks_.push(function(){let i=z(e);e.type_===3?i.has(n)&&Yt(n,r.handledSet_,r):ft(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&Yt(ft(e.copy_,t,e.type_),r.handledSet_,r)})}function Yt(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||I(e)||t.has(e)||!L(e)||Et(e)?e:(t.add(e),lt(e,(r,i)=>{if(I(i)){let t=i[j];Ut(t,n)&&(pt(e,r,xt(t),e.type_),Ht(t))}else L(i)&&Yt(i,t,n)}),e)}function Xt(e,t){let n=ht(e),r={type_:+!!n,scope_:t?t.scope_:Mt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=Zt;n&&(i=[r],a=H);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var Zt={get(e,t){if(t===j)return e;if(t===`constructor`||t===`__proto__`){let n=z(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=z(e);if(!dt(i,t,e.type_))return $t(e,i,t);let a=i[t];if(e.finalized_||!L(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&bt(t))return a;if(a===Qt(e.base_,t)){nn(e);let n=e.type_===1?+t:t,r=an(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in z(e)},ownKeys(e){return Reflect.ownKeys(z(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=en(z(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=Qt(z(e),t),i=r?.[j];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(mt(n,r)&&(n!==void 0||dt(e.base_,t,e.type_)))return!0;nn(e),tn(e)}return e.copy_[t]===n&&(n!==void 0||dt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),Jt(e,t,n),!0)},deleteProperty(e,t){return nn(e),Qt(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),tn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=z(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[at]:!0,[rt]:e.type_!==1||t!==`length`,[it]:r[it],[F]:n[t]}},defineProperty(){M(11)},getPrototypeOf(e){return P(e.base_)},setPrototypeOf(){M(12)}},H={};for(let e in Zt){let t=Zt[e];H[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}H.deleteProperty=function(e,t){return H.set.call(this,e,t,void 0)},H.set=function(e,t,n){return Zt.set.call(this,e[0],t,n,e[0])};function Qt(e,t){let n=e[j];return(n?z(n):e)[t]}function $t(e,t,n){let r=en(t,n);return r?F in r?r[F]:r.get?.call(e.draft_):void 0}function en(e,t){if(!(t in e))return;let n=P(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=P(n)}}function tn(e){e.modified_||(e.modified_=!0,e.parent_&&tn(e.parent_))}function nn(e){e.copy_||(e.assigned_=new Map,e.copy_=St(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var rn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(R(e)&&!R(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}R(t)||M(6),n!==void 0&&!R(n)&&M(7);let r;if(L(e)){let i=Lt(this),a=an(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?Ft(i):It(i)}return Pt(i,n),zt(r,i)}else if(!e||!vt(e)){if(r=t(e),r===void 0&&(r=e),r===$e&&(r=void 0),this.autoFreeze_&&Ct(r,!0),n){let t=[],i=[];B(Ot).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else M(1,e)},this.produceWithPatches=(e,t)=>{if(R(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},yt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),yt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),yt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){L(e)||M(8),I(e)&&(e=on(e));let t=Lt(this),n=an(t,e,void 0);return n[j].isManual_=!0,It(t),n}finishDraft(e,t){let n=e&&e[j];(!n||!n.isManual_)&&M(9);let{scope_:r}=n;return Pt(r,t),zt(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=B(Ot).applyPatches_;return I(e)?r(e,t):this.produce(e,e=>r(e,t))}};function an(e,t,n,r){let[i,a]=gt(t)?B(Dt).proxyMap_(t,n):_t(t)?B(Dt).proxySet_(t,n):Xt(t,n);return(n?.scope_??Mt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?Kt(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function on(e){return I(e)||M(10,e),sn(e)}function sn(e){if(!L(e)||Et(e))return e;let t=e[j],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=St(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=St(e,!0);return lt(n,(e,t)=>{pt(n,e,sn(t))},r),t&&(t.finalized_=!1),n}var cn=new rn().produce;function ln(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var un=ln(),dn=ln,fn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?Xe:Xe.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function pn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(U(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>Qe(t)&&t.type===e,n}var mn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function hn(e){return L(e)?cn(e,()=>{}):e}function gn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function _n(e){return typeof e==`boolean`}var vn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new mn;return t&&(_n(t)?a.push(un):a.push(dn(t.extraArgument))),a},yn=`RTK_autoBatch`,bn=e=>t=>{setTimeout(t,e)},xn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Sn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?xn(window.requestAnimationFrame,100):bn(10):e.type===`callback`?e.queueNotification:bn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[yn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Cn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new mn(e);return n&&r.push(Sn(typeof n==`object`?n:void 0)),r};function wn(e){let t=vn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(Ke(n))c=Ye(n);else throw Error(U(1));let l;l=typeof r==`function`?r(t):t();let u=Xe;i&&(u=fn({trace:!1,...typeof i==`object`&&i}));let d=Cn(Ze(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return qe(c,o,p)}function Tn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(U(28));if(r in t)throw Error(U(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function En(e){return typeof e==`function`}function Dn(e,t){let[n,r,i]=Tn(t),a;if(En(e))a=()=>hn(e());else{let t=hn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(I(e)){let r=n(e,t);return r===void 0?e:r}else if(L(e))return cn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var On=Symbol.for(`rtk-slice-createasyncthunk`);function kn(e,t){return`${e}/${t}`}function An({creators:e}={}){let t=e?.asyncThunk?.[On];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(U(11));let i=(typeof e.reducers==`function`?e.reducers(Nn()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(U(12));if(n in o.sliceCaseReducersByType)throw Error(U(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:kn(n,r),createNotation:typeof e.reducers==`function`};Fn(a)?Ln(o,a,s,t):Pn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Tn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Dn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=gn(d,r,m)),i}function i(t=l){return gn(gn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=jn(a,t,()=>gn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function jn(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var Mn=An();function Nn(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function Pn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!In(r))throw Error(U(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?pn(e,o):pn(e))}function Fn(e){return e._reducerDefinitionType===`asyncThunk`}function In(e){return e._reducerDefinitionType===`reducerWithPrepare`}function Ln({type:e,reducerName:t},n,r,i){if(!i)throw Error(U(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||Rn,pending:s||Rn,rejected:c||Rn,settled:l||Rn})}function Rn(){}var zn=`listener`,Bn=`completed`,Vn=`cancelled`;`${Vn}`,`${Bn}`,`${zn}${Vn}`,`${zn}${Bn}`;var{assign:Hn}=Object,Un=`listenerMiddleware`,Wn=Hn(pn(`${Un}/add`),{withTypes:()=>Wn});`${Un}`;var Gn=Hn(pn(`${Un}/remove`),{withTypes:()=>Gn});function U(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var W=e=>{if(!(!e||e.length===0))return Array.from(new Set(e))},Kn=(e,t)=>{let n=u(e.start),r=n.getDate(),i=n.getMonth()+1,a=(n.getDay()+6)%7;switch(e.byweekday=void 0,e.bymonth=void 0,e.bymonthday=void 0,e.byyearday=void 0,e.bysetpos=void 0,t){case p.WEEKLY:e.byweekday=[a];break;case p.MONTHLY:e.bymonthday=[r];break;case p.YEARLY:e.bymonth=[i],e.bymonthday=[r];break;default:break}},G=e=>{let t=Jn(e),n=$n(e.rrule,e.allDay);if(!t&&n.length===0){e.rrule=void 0;return}if(t&&n.length===0){e.rrule=Zn(t.toString(),e.allDay);return}e.rrule=[...Qn(e,t),...n].join(`
`)},qn=e=>{let t=e?.split(/\r?\n/).filter(e=>!e.trim().startsWith(`RDATE`));return t?.length?t.join(`
`):void 0},K=(e,t)=>e.filter(e=>e.getTime()!==t),Jn=e=>{let{repeatEndType:t,allDay:n,interval:r,count:i}=e,a=u(e.start),o=e.until?u(e.until):null,c=n?s(a):d(a),l=t===`ON_DATE`&&o?n?s(o):d(o):void 0,f={dtstart:c,interval:r,count:t===`AFTER`?i:void 0,until:t===`ON_DATE`?l:void 0};switch(e.repeatType){case`DAILY`:f={...f,freq:p.DAILY};break;case`WEEKLY`:f={...f,freq:p.WEEKLY};break;case`MONTHLY`:f={...f,freq:p.MONTHLY};break;case`YEARLY`:f={...f,freq:p.YEARLY};break;case`CUSTOM`:{let t=e.freq===p.YEARLY&&e.bysetpos?.length&&e.byweekday?.length,n=t?void 0:e.bysetpos,r=t?nr(e.byweekday,e.bysetpos?.[0]):e.byweekday;f={...f,freq:e.freq,interval:e.interval,count:e.repeatEndType===`AFTER`?e.count:void 0,byweekday:r,bymonth:e.bymonth,bymonthday:e.bymonthday,byyearday:e.byyearday,bysetpos:n};break}default:return null}return new y(f)},Yn=(e,t)=>{let n=u(t);if(e.allDay)return s(n);let r=u(e.start);return n.setHours(r.getHours(),r.getMinutes(),r.getSeconds(),0),d(n)},Xn=(e,t,n=[],r=[])=>{if(!t&&n.length===0&&r.length===0)return;let i=[...Qn(e,t)];if(n.length>0||r.length>0){let t=new f;n.forEach(e=>{t.rdate(e)}),r.forEach(e=>{t.exdate(e)}),i.push(...Zn(t.toString(),e.allDay).split(`
`))}return i.join(`
`)},Zn=(e,t)=>e.split(`
`).map(e=>h(e,t)).filter(Boolean).join(`
`),Qn=(e,t)=>{if(t)return Zn(t.toString(),e.allDay).split(`
`);let n=er(e),r=new f;return r.dtstart(n),r.rdate(n),Zn(r.toString(),e.allDay).split(`
`)},$n=(e,t)=>{if(!e)return[];let n=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(n.some(e=>e.startsWith(`RRULE`)))return n.filter(e=>e.startsWith(`RDATE`)||e.startsWith(`EXDATE`)).map(e=>h(e,t));let r=n.find(e=>e.startsWith(`DTSTART`))?.split(`:`,2)[1]?.trim();return n.flatMap(e=>{if(!e.startsWith(`RDATE`)&&!e.startsWith(`EXDATE`))return[];if(!r||!e.startsWith(`RDATE`))return[h(e,t)];let[n,i=``]=e.split(`:`,2),a=i.split(`,`).map(e=>e.trim()).filter(Boolean).filter(e=>e!==r);return a.length===0?[]:[h(`${n}:${a.join(`,`)}`,t)]})},er=e=>{let t=u(e.start);return e.allDay?s(t):d(t)},tr=[y.MO,y.TU,y.WE,y.TH,y.FR,y.SA,y.SU],nr=(e,t)=>!e?.length||!t?e:e.map(e=>tr[e]?.nth(t)).filter(Boolean),rr=(e,t)=>{let n=u(t);if(e.allDay)n.setHours(0,0,0,0);else{let t=u(e.start);n.setHours(t.getHours(),t.getMinutes(),t.getSeconds(),0)}return l(n)},ir=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),ar=new Set([`NEVER`,`AFTER`,`ON_DATE`]),or=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},sr=e=>ir.has(e)?e:`NEVER`,cr=e=>ar.has(e)?e:`NEVER`,lr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,ur=Mn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:p.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=rr(e,e.until)),r!==void 0&&(e.until=e.start+r),G(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=rr(e,n),G(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=u(e.start);a.setHours(i,0,0,0),e.start=l(a);let o=u(e.end);n?o=ne(x(o),1):(o=ue(o,1),o=oe(o,a.getHours()),o=ie(o,r)),e.end=l(o),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=rr(e,e.until)),G(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=qn(e.rrule)),e.repeatType=t.payload,G(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=lr(e.count):e.count=null,G(e)},setFreq:(e,t)=>{e.freq=t.payload,Kn(e,t.payload),G(e)},setCount:(e,t)=>{e.count=lr(t.payload),G(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),G(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=W(r),G(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=W(n.byweekday)),`bymonth`in n&&(e.bymonth=W(n.bymonth)),`bymonthday`in n&&(e.bymonthday=W(n.bymonthday)),`byyearday`in n&&(e.byyearday=W(n.byyearday)),`bysetpos`in n&&(e.bysetpos=W(n.bysetpos)),G(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=ur,dr=ur.reducer,J={state:e=>e.event},fr=Mn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:pr}=fr,mr=fr.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},hr=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},gr=e=>l(x(u(e))),_r=e=>l(x(t(e))),vr=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0,0)),yr=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59,999)),br=e=>Math.floor(vr(e).getTime()/1e3),xr=(e,t)=>{let n=gr(t),r=ee(e)??null,i=_(e);return{startTimestamp:n,baseRule:r,recurrenceSet:i,addedDateSet:new Set((i?.rdates()??[]).map(_r).filter(e=>r?!0:e!==n))}},Sr=(e,t)=>{let n=br(t),r=vr(t),i=yr(t),a=e.baseRule?e.baseRule.between(r,i,!0).length>0:!1,o=e.recurrenceSet?e.recurrenceSet.between(r,i,!0).length>0:n===e.startTimestamp;return{timestamp:n,full:o,base:a,excluded:a&&!o,rdate:e.addedDateSet.has(n)}},Cr=(e,t)=>{if(!t)return[];let n=vr(t.start),r=yr(t.end),i=br(t.start),a=br(t.end),s=[];return e.recurrenceSet?s=e.recurrenceSet.between(n,r,!0).map(_r):e.startTimestamp>=i&&e.startTimestamp<=a&&(s=[e.startTimestamp]),Array.from(new Set(s)).map(e=>({id:o(new Date(e*1e3)),start:w(u(e),`yyyy-MM-dd`),allDay:!0}))},wr=(e,t,n)=>{if(!t)return[];if(!e.recurrenceSet){let n=br(t);return e.startTimestamp>=n?[e.startTimestamp]:[]}let r=e.recurrenceSet.between(vr(t),me(yr(t),100),!0,(e,t)=>t<n).map(_r);return Array.from(new Set(r)).slice(0,n)},Tr=(e,t,n,r,i)=>{let a=Yn(e,r),o=a.getTime(),s=Er(t,({baseRule:e,rdates:t,exdates:r})=>{let s=Dr(t,a,o,n===`rdate`,i);return{baseRule:e,rdates:n===`exdate`&&i?K(s,o):s,exdates:Dr(r,a,o,n===`exdate`,i)}});return Xn(e,s.baseRule,hr(s.rdates),hr(s.exdates))},Er=(e,t)=>t({baseRule:e.baseRule,rdates:Or(e),exdates:e.recurrenceSet?.exdates()??[]}),Dr=(e,t,n,r,i)=>r?i?[...e,t]:K(e,n):e,Or=e=>{let t=e.recurrenceSet?.rdates()??[];return e.baseRule?t:t.filter(t=>_r(t)!==e.startTimestamp)},kr=n.div`
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
`,Ar=n.div`
  min-width: 120px;
  max-width: 120px;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,jr=n.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 4px;

  height: 215px;
  margin-top: 57px;
`,Mr=n.li`
  padding: 4px 8px;

  font-size: 13px;
  line-height: 13px;
  font-family: monospace;

  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  border-left: 5px solid var(--gray-200);
`,X=c(),Nr=8,Pr=()=>{let e=O(),t=k(J.state),{repeatType:n,start:r,rrule:i}=t,[a,s]=(0,E.useState)(null),c=(0,E.useMemo)(()=>xr(i,r),[i,r]),l=(0,E.useMemo)(()=>Cr(c,a),[c,a]),u=(0,E.useMemo)(()=>wr(c,a?.start??null,Nr),[c,a]),d=(0,E.useCallback)((n,r,i)=>{e(q.setRRule(Tr(t,c,n,r,i)))},[e,c,t]),f=(0,E.useCallback)(e=>{let t=Sr(c,e);if(t.base&&t.excluded){d(`exdate`,t.timestamp,!1);return}if(t.base&&t.full&&n!==`NEVER`){d(`exdate`,t.timestamp,!0);return}if(!t.base&&t.full&&t.rdate){d(`rdate`,t.timestamp,!1);return}t.full||d(`rdate`,t.timestamp,!0)},[d,c,n]),p=(0,E.useCallback)(e=>Sr(c,e),[c]);return(0,X.jsxs)(kr,{children:[(0,X.jsx)(de,{label:`Schedule Preview`,children:(0,X.jsx)(ge,{aspectRatio:2,height:250,expandRows:!1,themeSystem:`bootstrap5`,plugins:[he,_e],initialView:`dayGridMonth`,timeZone:`UTC`,eventDisplay:`none`,events:l,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>s({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=p(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>f(e.date)})}),(0,X.jsx)(Ar,{children:u.length===0?(0,X.jsxs)(`p`,{children:[b(`No occurrences starting from`),(0,X.jsx)(`br`,{}),w(a?.currentStart??new Date,`PP`)]}):(0,X.jsx)(jr,{$count:u.length,children:u.map(e=>{let t=o(new Date(e*1e3));return(0,X.jsx)(Mr,{children:t},t)})})})]})},Fr=n.div`
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
`,Ir=e=>l(ue(u(e),1)),Lr=(e,t,n)=>{let r=zr(t,n);return e.getTime()>=r.getTime()},Rr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return l(ne(x(u(e)),1));let i=u(e),a=zr(t,r);return i.getTime()>=a.getTime()?e:l(a)},zr=(e,t)=>ie(u(e),t),Br=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Vr=({inputValue:e,value:t,min:n})=>{let r=Br(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Hr=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,E.useState)(e?.toString()??``),o=(0,E.useRef)(void 0),s=(0,E.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,E.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,E.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,E.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,E.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Br(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,E.useCallback)(n=>{n.stopPropagation();let r=Vr({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Ur=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Hr({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(de,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Wr=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Gr=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Kr=({noun:e=`day`})=>{let t=O(),{interval:n}=k(J.state);return(0,X.jsxs)(qr,{children:[(0,X.jsx)(`span`,{children:`Every`}),(0,X.jsx)(Jr,{type:`text`,className:`text`,value:n,onChange:e=>{let n=parseInt(e.target.value,10)||1;t(q.setInterval(n))}}),(0,X.jsxs)(Yr,{children:[(0,X.jsx)(Xr,{type:`button`,onClick:()=>t(q.setInterval(n+1)),children:(0,X.jsx)(Gr,{})}),(0,X.jsx)(Xr,{type:`button`,onClick:()=>t(q.setInterval(n-1)),children:(0,X.jsx)(Wr,{})})]}),(0,X.jsxs)(`span`,{children:[e,n>1?`s`:``]})]})},qr=n.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Jr=n.input`
  width: 60px;
`,Yr=n.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Xr=n.button`
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
`,Zr=()=>(0,X.jsx)(Kr,{noun:`day`}),Z=[{value:`MO`,label:`Monday`,days:[y.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[y.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[y.WE.weekday]},{value:`TH`,label:`Thursday`,days:[y.TH.weekday]},{value:`FR`,label:`Friday`,days:[y.FR.weekday]},{value:`SA`,label:`Saturday`,days:[y.SA.weekday]},{value:`SU`,label:`Sunday`,days:[y.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[y.MO.weekday,y.TU.weekday,y.WE.weekday,y.TH.weekday,y.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[y.SA.weekday,y.SU.weekday]}],Qr=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},$r=(e,t)=>{let n=Qr(e),r=Qr(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},ei=(e,t)=>{if(e){let t=Z.find(t=>$r(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},ti=e=>Z.find(t=>t.value===e)?.days??[y.MO.weekday],Q=`5px`,ni=n.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,ri=n(ni)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,ii=n(ni)`
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

  ${ni} {
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

  ${ni} {
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
`,ci=n(ai)`
  grid-template-columns: repeat(4, 1fr);

  ${ni} {
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
`,li=({label:e,values:t,onChange:n})=>(0,X.jsx)(de,{label:e,children:(0,X.jsxs)(oi,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(ri,{type:`button`,className:C(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(ii,{},e))]})}),ui=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],di=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],fi=()=>{let e=O(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=k(J.state),a=u(t),o=a.getDate(),s=(a.getDay()+6)%7,c=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,l=n?.length?n:[o],d=i?.[0]??1,f=ei(r,s),p=t=>{e(q.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(q.setByRules({bymonthday:void 0,byweekday:ti(t),bysetpos:[n]}))};return(0,X.jsxs)(`div`,{children:[(0,X.jsx)(Kr,{noun:`month`}),(0,X.jsx)(`div`,{className:`field`,children:(0,X.jsx)(T,{label:`Repeat on`,value:c,options:ui,onChange:e=>{e===`WEEKDAY`?m(f,d):p(l)}})}),c===`MONTHDAY`&&(0,X.jsx)(li,{label:`Days of Month`,values:l,onChange:e=>p(e)}),c===`WEEKDAY`&&(0,X.jsxs)(fe,{className:`field`,children:[(0,X.jsx)(T,{label:`Position`,value:d,options:di,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(T,{label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},pi=[{weekday:y.SU,label:`Sun`},{weekday:y.MO,label:`Mon`},{weekday:y.TU,label:`Tue`},{weekday:y.WE,label:`Wed`},{weekday:y.TH,label:`Thu`},{weekday:y.FR,label:`Fri`},{weekday:y.SA,label:`Sat`}],mi=()=>{let e=O(),{byweekday:t}=k(J.state);return(0,X.jsxs)(`div`,{children:[(0,X.jsx)(Kr,{noun:`week`}),(0,X.jsx)(si,{className:`field`,children:pi.map(({weekday:n,label:r})=>(0,X.jsx)(ri,{type:`button`,className:C(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:r},n.weekday))})]})},hi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],gi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],_i=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],vi=()=>{let e=O(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=k(J.state),o=u(t),s=o.getDate(),c=o.getMonth()+1,l=(o.getDay()+6)%7,d=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,f=r?.length?r:[s],p=n?.length?n:[c],m=a?.[0]??1,h=ei(i,l),g=(t,n)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},_=(t,n,r)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:ti(n),bysetpos:[r]}))};return(0,X.jsxs)(`div`,{children:[(0,X.jsx)(Kr,{noun:`year`}),(0,X.jsx)(de,{label:`Month`,children:(0,X.jsx)(ci,{children:_i.map(e=>{let t=p.includes(e.value);return(0,X.jsx)(ri,{type:`button`,className:C(t&&`active`),onClick:()=>{let n=p.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),d===`WEEKDAY`?_(n,h,m):g(n,f))},children:e.label},e.value)})})}),(0,X.jsx)(`div`,{className:`field`,children:(0,X.jsx)(T,{label:`Repeat on`,value:d,options:hi,onChange:e=>{e===`WEEKDAY`?_(p,h,m):g(p,f)}})}),d===`MONTHDAY`&&(0,X.jsx)(li,{label:`Days of Month`,values:f,onChange:e=>g(p,e)}),d===`WEEKDAY`&&(0,X.jsxs)(fe,{className:`field`,children:[(0,X.jsx)(T,{label:`Position`,value:m,options:gi,onChange:e=>_(p,h,Number.parseInt(e,10))}),(0,X.jsx)(T,{label:`Day`,value:h,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>_(p,e,m)})]})]})},yi=()=>{let{freq:e}=k(J.state);return e===p.DAILY?(0,X.jsx)(Zr,{}):e===p.WEEKLY?(0,X.jsx)(mi,{}):e===p.MONTHLY?(0,X.jsx)(fi,{}):e===p.YEARLY?(0,X.jsx)(vi,{}):null},bi=g({position:[`bottom`,`top`],alignment:`end`,padding:8}),xi=(e,t,n,r)=>{let[i,a]=(0,E.useState)();return(0,E.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=m({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:bi}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Si=(e,t,n)=>{(0,E.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Ci=n.div`
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

  ${re}

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
`,Pi=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:f})=>{let[p,m]=(0,E.useState)(!1),h=(0,E.useRef)(null),g=(0,E.useRef)(null),_=(0,E.useRef)(null),v=xi(p,g,_,h);return(0,E.useEffect)(()=>{a.length===0&&m(!1)},[a.length]),Si(p,[g,_],()=>m(!1)),(0,X.jsxs)(Ci,{children:[(0,X.jsx)(wi,{children:b(e)}),t&&(0,X.jsx)(`div`,{className:`instructions`,children:(0,X.jsx)(`p`,{children:t})}),(0,X.jsxs)(Ti,{children:[(0,X.jsxs)(Oi,{ref:h,children:[(0,X.jsx)(ki,{ref:g,type:`button`,disabled:a.length===0,className:C({active:p}),onClick:()=>{a.length!==0&&m(e=>!e)},children:a.length}),p&&(0,X.jsxs)(Ai,{ref:_,style:{top:v?.top??0,left:v?.left??0,visibility:v?`visible`:`hidden`},children:[(0,X.jsx)(ji,{children:b(i)}),(0,X.jsx)(Mi,{children:a.map(e=>(0,X.jsxs)(Ni,{children:[(0,X.jsx)(`span`,{children:c(e)}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>f(e),children:`×`})]},e))})]})]}),(0,X.jsx)(Ei,{children:(0,X.jsx)(ae,{selected:null,onChange:e=>{e&&d(l(x(e)))},customInput:(0,X.jsx)(Fi,{label:n,className:C(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:b(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},Fi=(0,E.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Di,{type:`button`,ref:n,...t,children:b(e)}));Fi.displayName=`PickerTrigger`;var Ii=n.div`
  flex: 1;
`,Li=()=>{let e=O(),n=k(J.state),{start:r,rrule:i}=n,a=(0,E.useMemo)(()=>l(x(u(r))),[r]),o=(0,E.useMemo)(()=>ee(i)??null,[i]),c=(0,E.useMemo)(()=>_(i),[i]),f=(0,E.useMemo)(()=>c?Array.from(new Set(c.rdates().map(e=>l(x(t(e)))).filter(e=>o?!0:e!==a))).sort((e,t)=>e-t):[],[o,c,a]),p=(0,E.useMemo)(()=>c?Array.from(new Set(c.exdates().map(e=>l(x(t(e)))))).sort((e,t)=>e-t):[],[c]),m=(0,E.useMemo)(()=>new Set(f),[f]),h=(0,E.useMemo)(()=>new Set(p),[p]),g=(0,E.useCallback)(e=>{let t=s(x(e)),n=d(pe(e)),r=o?o.between(t,n,!0).length>0:!1,i=c?c.between(t,n,!0).length>0:l(x(e))===a;return{full:i,base:r,excluded:r&&!i}},[o,c,a]),v=r=>{let i=r({baseRule:o,rdates:c?.rdates().filter(e=>o?!0:l(x(t(e)))!==a)??[],exdates:c?.exdates()??[]});e(q.setRRule(Xn(n,i.baseRule,Ri(i.rdates),Ri(i.exdates))))};return{addedDates:f,excludedDates:p,addFixedDate:(e,t)=>{let r=Yn(n,t);v(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:K(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{let r=Yn(n,t).getTime();v(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?K(n,r):n,exdates:e===`exdate`?K(i,r):i}))},canAddOccurrence:(0,E.useCallback)(e=>{let t=l(x(e)),n=g(e);return!n.full&&!n.excluded&&!m.has(t)},[m,g]),canExcludeOccurrence:(0,E.useCallback)(e=>{let t=l(x(e)),n=g(e);return n.base&&!n.excluded&&!h.has(t)},[h,g]),getStatus:g}},Ri=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},zi=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],Bi=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Vi=[{value:p.DAILY,label:`Daily`},{value:p.WEEKLY,label:`Weekly`},{value:p.MONTHLY,label:`Monthly`},{value:p.YEARLY,label:`Yearly`}],Hi=300,Ui=()=>{let e=O(),t=k(J.state),n=k(Y.weekStartDay),{repeatType:r,repeatEndType:i,count:a,until:o,freq:s,start:c}=t,l=r!==`NEVER`,{addedDates:d,excludedDates:f,addFixedDate:p,removeFixedDate:m,canAddOccurrence:h,canExcludeOccurrence:g}=Li(),_=(0,E.useMemo)(()=>u(c),[c]),v=e=>w(u(e),`yyyy-MM-dd`);return(0,X.jsxs)(Ii,{children:[(0,X.jsxs)(fe,{children:[(0,X.jsx)(T,{label:`Repeats`,value:r,options:zi,onChange:t=>e(q.setRepeatType(t))}),r===`CUSTOM`&&(0,X.jsx)(T,{label:``,value:s,options:Vi,onChange:t=>e(q.setFreq(Number.parseInt(t,10)))})]}),r===`CUSTOM`&&(0,X.jsx)(`div`,{className:`field`,children:(0,X.jsx)(yi,{})}),r!==`NEVER`&&(0,X.jsxs)(fe,{className:`field`,children:[(0,X.jsx)(T,{label:`Ends`,options:Bi,value:i,onChange:t=>e(q.setRepeatEndType(t))}),i===`AFTER`&&(0,X.jsx)(Ur,{label:`Times`,value:a,min:1,debounceMs:Hi,onChange:t=>e(q.setCount(t))}),i===`ON_DATE`&&(0,X.jsx)(se,{label:``,value:o||null,onChange:t=>e(q.setUntil(t)),datePickerProps:{showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:_}})]}),(0,X.jsx)(Pi,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:d,openToDate:_,formatDate:v,filterDate:h,weekStartDay:n,onAdd:e=>p(`rdate`,e),onRemove:e=>m(`rdate`,e)}),l&&(0,X.jsx)(Pi,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:f,openToDate:_,formatDate:v,filterDate:g,weekStartDay:n,onAdd:e=>p(`exdate`,e),onRemove:e=>m(`exdate`,e)})]})},Wi=()=>{let e=(0,E.useId)(),t=(0,E.useId)(),n=(0,E.useId)(),r=O(),{start:i,end:a,allDay:o}=k(J.state),{date:s,time:c,datetime:l}=k(Y.formats),d=k(Y.weekStartDay),f=k(Y.timeInterval),p=k(Y.eventDuration),m=(0,E.useMemo)(()=>o?s.short.icu:l.short.icu,[o,s,l]),h=(0,E.useMemo)(()=>o?Ir(a):a,[o,a]);return(0,X.jsxs)(Fr,{children:[(0,X.jsxs)(`div`,{style:{flex:1},children:[(0,X.jsx)(ce,{id:e,label:`All Day`,enabled:o,onClick:e=>r(q.setAllDay({enabled:e,eventDuration:p}))}),(0,X.jsx)(se,{id:t,label:`Starts`,value:i,onChange:e=>r(q.setStart(e)),datePickerProps:{id:t,showIcon:!0,icon:(0,X.jsx)(le,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:m,timeFormat:c.short.icu,todayButton:b(`Today`),calendarStartDay:d,timeIntervals:f}}),(0,X.jsx)(se,{id:n,label:`Ends`,value:h,onChange:e=>{e!=null&&r(q.setEnd(Rr({value:e,start:i,allDay:o,timeInterval:f})))},datePickerProps:{id:n,showIcon:!0,icon:(0,X.jsx)(le,{}),toggleCalendarOnIconClick:!0,minDate:u(i),showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:m,timeFormat:c.short.icu,todayButton:b(`Today`),calendarStartDay:d,timeIntervals:f,filterTime:e=>Lr(new Date(e),i,f)}})]}),(0,X.jsx)(Ui,{}),(0,X.jsx)(Pr,{})]})},Gi=n.div`
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
`,Ki=()=>{let{rrule:e}=k(J.state),n=(0,E.useMemo)(He,[]),r=e?v(e,{forceset:!0}).all((e,t)=>t<10).map(e=>`${w(t(e),`yyyy-MM-dd HH:mm`)} [${ve(e)}]`):[];return(0,X.jsxs)(Gi,{children:[(0,X.jsx)(Wi,{}),n&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:e}),(0,X.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},qi=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,Ji(n)),$(t,`end`,Ji(r)),$(t,`until`,i?Ji(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},Ji=e=>w(u(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},Yi=e=>{let t=ee(e.event.rrule),{byweekday:n,bysetpos:r}=or(t?.options.byweekday),i=sr(e.event.repeatType),a=cr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||p.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?lr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return wn({reducer:{app:mr,event:dr},preloadedState:o})},Xi=new WeakSet,Zi=e=>{if(Xi.has(e))return;Xi.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=Yi(JSON.parse(t.textContent)),i=xe.createRoot(n);r.subscribe(()=>{qi(r,e)}),qi(r,e),i.render((0,X.jsx)(Pe,{store:r,children:(0,X.jsx)(Ki,{})}))},Qi=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(Zi)},$i=()=>{Qi(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&Zi(e),Qi(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,$i):$i();