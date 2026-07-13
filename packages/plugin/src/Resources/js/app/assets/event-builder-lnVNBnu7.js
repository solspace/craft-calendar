import{c as e,d as t,f as n,g as r,h as i,i as a,m as o,n as s,r as c,s as l,t as u,u as d}from"./date-B-YCzvOK.js";import{C as f,S as p,_ as m,a as h,b as g,c as _,f as v,g as y,h as b,l as ee,m as x,n as te,o as ne,p as re,s as ie,t as ae,v as oe,x as se,y as S}from"./components-DEesaL-G.js";import{n as ce,t as le}from"./dist-Dxlx9seu.js";import{t as ue}from"./interaction-D4ecfs1r.js";import{a as de,c as C,i as fe,n as pe,o as me,s as w,t as he}from"./rrule-DA1ZKeyl.js";function ge(e,t){let n=se(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=b(n.getDate(),2),t=b(n.getMonth()+1,2);a=`${b(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=b(Math.trunc(t/60),2),r=b(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=b(n.getHours(),2),r=b(n.getMinutes(),2),i=b(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var _e=i((e=>{var t=o();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,a=t.useRef,s=t.useEffect,c=t.useMemo,l=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,o,u){var d=a(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!i){if(i=!0,a=e,e=o(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,r(a,e))return t;var n=o(e);return u!==void 0&&u(t,n)?(a=e,t):(a=e,s=n)}var i=!1,a,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,o,u]);var p=i(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),ve=i(((e,t)=>{t.exports=_e()})),ye=r(t()),T=r(o(),1),be=ve();function xe(e){e()}function Se(){let e=null,t=null;return{clear(){e=null,t=null},notify(){xe(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Ce={notify(){},get:()=>[]};function we(e,t){let n,r=Ce,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Se())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Ce)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Te=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ee=typeof navigator<`u`&&navigator.product===`ReactNative`,De=Te||Ee?T.useLayoutEffect:T.useEffect,Oe=Symbol.for(`react-redux-context`),ke=typeof globalThis<`u`?globalThis:{};function Ae(){if(!T.createContext)return{};let e=ke[Oe]??(ke[Oe]=new Map),t=e.get(T.createContext);return t||(t=T.createContext(null),e.set(T.createContext,t)),t}var E=Ae();function je(e){let{children:t,context:n,serverState:r,store:i}=e,a=T.useMemo(()=>{let e=we(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=T.useMemo(()=>i.getState(),[i]);De(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||E;return T.createElement(s.Provider,{value:a},t)}var Me=je;function Ne(e=E){return function(){return T.useContext(e)}}var Pe=Ne();function Fe(e=E){let t=e===E?Pe:Ne(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Ie=Fe();function Le(e=E){let t=e===E?Ie:Fe(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var D=Le(),Re=(e,t)=>e===t;function ze(e=E){let t=e===E?Pe:Ne(e),n=(e,n={})=>{let{equalityFn:r=Re}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();T.useRef(!0);let s=T.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,be.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return T.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var O=ze(),Be=()=>!1;function k(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var Ve=typeof Symbol==`function`&&Symbol.observable||`@@observable`,He=()=>Math.random().toString(36).substring(7).split(``).join(`.`),Ue={INIT:`@@redux/INIT${He()}`,REPLACE:`@@redux/REPLACE${He()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${He()}`};function We(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function Ge(e,t,n){if(typeof e!=`function`)throw Error(k(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(k(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(k(1));return n(Ge)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(k(3));return i}function d(e){if(typeof e!=`function`)throw Error(k(4));if(c)throw Error(k(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(k(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!We(e))throw Error(k(7));if(e.type===void 0)throw Error(k(8));if(typeof e.type!=`string`)throw Error(k(17));if(c)throw Error(k(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(k(10));r=e,f({type:Ue.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(k(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[Ve](){return this}}}return f({type:Ue.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[Ve]:m}}function Ke(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:Ue.INIT})===void 0)throw Error(k(12));if(n(void 0,{type:Ue.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(k(13))})}function qe(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{Ke(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(k(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function Je(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function Ye(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(k(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=Je(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function Xe(e){return We(e)&&`type`in e&&typeof e.type==`string`}var Ze=Symbol.for(`immer-nothing`),Qe=Symbol.for(`immer-draftable`),A=Symbol.for(`immer-state`);function j(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var M=Object,N=M.getPrototypeOf,$e=`constructor`,et=`prototype`,tt=`configurable`,nt=`enumerable`,rt=`writable`,P=`value`,F=e=>!!e&&!!e[A];function I(e){return e?ot(e)||ft(e)||!!e[Qe]||!!e[$e]?.[Qe]||pt(e)||mt(e):!1}var it=M[et][$e].toString(),at=new WeakMap;function ot(e){if(!e||!ht(e))return!1;let t=N(e);if(t===null||t===M[et])return!0;let n=M.hasOwnProperty.call(t,$e)&&t[$e];if(n===Object)return!0;if(!R(n))return!1;let r=at.get(n);return r===void 0&&(r=Function.toString.call(n),at.set(n,r)),r===it}function st(e,t,n=!0){L(e)===0?(n?Reflect.ownKeys(e):M.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function L(e){let t=e[A];return t?t.type_:ft(e)?1:pt(e)?2:mt(e)?3:0}var ct=(e,t,n=L(e))=>n===2?e.has(t):M[et].hasOwnProperty.call(e,t),lt=(e,t,n=L(e))=>n===2?e.get(t):e[t],ut=(e,t,n,r=L(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function dt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var ft=Array.isArray,pt=e=>e instanceof Map,mt=e=>e instanceof Set,ht=e=>typeof e==`object`,R=e=>typeof e==`function`,gt=e=>typeof e==`boolean`;function _t(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var z=e=>e.copy_||e.base_,vt=e=>e.modified_?e.copy_:e.base_;function yt(e,t){if(pt(e))return new Map(e);if(mt(e))return new Set(e);if(ft(e))return Array[et].slice.call(e);let n=ot(e);if(t===!0||t===`class_only`&&!n){let t=M.getOwnPropertyDescriptors(e);delete t[A];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[rt]===!1&&(a[rt]=!0,a[tt]=!0),(a.get||a.set)&&(t[i]={[tt]:!0,[rt]:!0,[nt]:a[nt],[P]:e[i]})}return M.create(N(e),t)}else{let t=N(e);if(t!==null&&n)return{...e};let r=M.create(t);return M.assign(r,e)}}function bt(e,t=!1){return Ct(e)||F(e)||!I(e)?e:(L(e)>1&&M.defineProperties(e,{set:St,add:St,clear:St,delete:St}),M.freeze(e),t&&st(e,(e,t)=>{bt(t,!0)},!1),e)}function xt(){j(2)}var St={[P]:xt};function Ct(e){return e===null||!ht(e)?!0:M.isFrozen(e)}var wt=`MapSet`,Tt=`Patches`,Et=`ArrayMethods`,Dt={};function B(e){let t=Dt[e];return t||j(0,e),t}var Ot=e=>!!Dt[e],V,kt=()=>V,At=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:Ot(wt)?B(wt):void 0,arrayMethodsPlugin_:Ot(Et)?B(Et):void 0});function jt(e,t){t&&(e.patchPlugin_=B(Tt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Mt(e){Nt(e),e.drafts_.forEach(Ft),e.drafts_=null}function Nt(e){e===V&&(V=e.parent_)}var Pt=e=>V=At(V,e);function Ft(e){let t=e[A];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function It(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[A].modified_&&(Mt(t),j(4)),I(e)&&(e=Lt(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[A].base_,e,t)}else e=Lt(t,n);return Rt(t,e,!0),Mt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===Ze?void 0:e}function Lt(e,t){if(Ct(t))return t;let n=t[A];if(!n)return Kt(t,e.handledSet_,e);if(!Bt(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);Wt(n,e)}return n.copy_}function Rt(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&bt(t,n)}function zt(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Bt=(e,t)=>e.scope_===t,Vt=[];function Ht(e,t,n,r){let i=z(e),a=e.type_;if(r!==void 0&&lt(i,r,a)===t){ut(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;st(i,(e,n)=>{if(F(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??Vt;for(let e of o)ut(i,e,n,a)}function Ut(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!Bt(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=vt(i);Ht(e,i.draft_??i,a,n),Wt(i,r)})}function Wt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}zt(e)}}function Gt(e,t,n){let{scope_:r}=e;if(F(n)){let i=n[A];Bt(i,r)&&i.callbacks_.push(function(){$t(e),Ht(e,n,vt(i),t)})}else I(n)&&e.callbacks_.push(function(){let i=z(e);e.type_===3?i.has(n)&&Kt(n,r.handledSet_,r):lt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&Kt(lt(e.copy_,t,e.type_),r.handledSet_,r)})}function Kt(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||F(e)||t.has(e)||!I(e)||Ct(e)?e:(t.add(e),st(e,(r,i)=>{if(F(i)){let t=i[A];Bt(t,n)&&(ut(e,r,vt(t),e.type_),zt(t))}else I(i)&&Kt(i,t,n)}),e)}function qt(e,t){let n=ft(e),r={type_:+!!n,scope_:t?t.scope_:kt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=Jt;n&&(i=[r],a=H);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var Jt={get(e,t){if(t===A)return e;if(t===`constructor`||t===`__proto__`){let n=z(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=z(e);if(!ct(i,t,e.type_))return Xt(e,i,t);let a=i[t];if(e.finalized_||!I(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&_t(t))return a;if(a===Yt(e.base_,t)){$t(e);let n=e.type_===1?+t:t,r=tn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in z(e)},ownKeys(e){return Reflect.ownKeys(z(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=Zt(z(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=Yt(z(e),t),i=r?.[A];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(dt(n,r)&&(n!==void 0||ct(e.base_,t,e.type_)))return!0;$t(e),Qt(e)}return e.copy_[t]===n&&(n!==void 0||ct(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),Gt(e,t,n),!0)},deleteProperty(e,t){return $t(e),Yt(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),Qt(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=z(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[rt]:!0,[tt]:e.type_!==1||t!==`length`,[nt]:r[nt],[P]:n[t]}},defineProperty(){j(11)},getPrototypeOf(e){return N(e.base_)},setPrototypeOf(){j(12)}},H={};for(let e in Jt){let t=Jt[e];H[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}H.deleteProperty=function(e,t){return H.set.call(this,e,t,void 0)},H.set=function(e,t,n){return Jt.set.call(this,e[0],t,n,e[0])};function Yt(e,t){let n=e[A];return(n?z(n):e)[t]}function Xt(e,t,n){let r=Zt(t,n);return r?P in r?r[P]:r.get?.call(e.draft_):void 0}function Zt(e,t){if(!(t in e))return;let n=N(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=N(n)}}function Qt(e){e.modified_||(e.modified_=!0,e.parent_&&Qt(e.parent_))}function $t(e){e.copy_||(e.assigned_=new Map,e.copy_=yt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var en=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(R(e)&&!R(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}R(t)||j(6),n!==void 0&&!R(n)&&j(7);let r;if(I(e)){let i=Pt(this),a=tn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?Mt(i):Nt(i)}return jt(i,n),It(r,i)}else if(!e||!ht(e)){if(r=t(e),r===void 0&&(r=e),r===Ze&&(r=void 0),this.autoFreeze_&&bt(r,!0),n){let t=[],i=[];B(Tt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else j(1,e)},this.produceWithPatches=(e,t)=>{if(R(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},gt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),gt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),gt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){I(e)||j(8),F(e)&&(e=nn(e));let t=Pt(this),n=tn(t,e,void 0);return n[A].isManual_=!0,Nt(t),n}finishDraft(e,t){let n=e&&e[A];(!n||!n.isManual_)&&j(9);let{scope_:r}=n;return jt(r,t),It(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=B(Tt).applyPatches_;return F(e)?r(e,t):this.produce(e,e=>r(e,t))}};function tn(e,t,n,r){let[i,a]=pt(t)?B(wt).proxyMap_(t,n):mt(t)?B(wt).proxySet_(t,n):qt(t,n);return(n?.scope_??kt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?Ut(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function nn(e){return F(e)||j(10,e),rn(e)}function rn(e){if(!I(e)||Ct(e))return e;let t=e[A],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=yt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=yt(e,!0);return st(n,(e,t)=>{ut(n,e,rn(t))},r),t&&(t.finalized_=!1),n}var an=new en().produce;function on(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var sn=on(),cn=on,ln=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?Je:Je.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function un(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(U(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>Xe(t)&&t.type===e,n}var dn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function fn(e){return I(e)?an(e,()=>{}):e}function pn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function mn(e){return typeof e==`boolean`}var hn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new dn;return t&&(mn(t)?a.push(sn):a.push(cn(t.extraArgument))),a},gn=`RTK_autoBatch`,_n=e=>t=>{setTimeout(t,e)},vn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},yn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?vn(window.requestAnimationFrame,100):_n(10):e.type===`callback`?e.queueNotification:_n(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[gn],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},bn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new dn(e);return n&&r.push(yn(typeof n==`object`?n:void 0)),r};function xn(e){let t=hn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(We(n))c=qe(n);else throw Error(U(1));let l;l=typeof r==`function`?r(t):t();let u=Je;i&&(u=ln({trace:!1,...typeof i==`object`&&i}));let d=bn(Ye(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return Ge(c,o,p)}function Sn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(U(28));if(r in t)throw Error(U(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Cn(e){return typeof e==`function`}function wn(e,t){let[n,r,i]=Sn(t),a;if(Cn(e))a=()=>fn(e());else{let t=fn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(F(e)){let r=n(e,t);return r===void 0?e:r}else if(I(e))return an(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Tn=Symbol.for(`rtk-slice-createasyncthunk`);function En(e,t){return`${e}/${t}`}function Dn({creators:e}={}){let t=e?.asyncThunk?.[Tn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(U(11));let i=(typeof e.reducers==`function`?e.reducers(An()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(U(12));if(n in o.sliceCaseReducersByType)throw Error(U(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:En(n,r),createNotation:typeof e.reducers==`function`};Mn(a)?Pn(o,a,s,t):jn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Sn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return wn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=pn(d,r,m)),i}function i(t=l){return pn(pn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=On(a,t,()=>pn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function On(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var kn=Dn();function An(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function jn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!Nn(r))throw Error(U(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?un(e,o):un(e))}function Mn(e){return e._reducerDefinitionType===`asyncThunk`}function Nn(e){return e._reducerDefinitionType===`reducerWithPrepare`}function Pn({type:e,reducerName:t},n,r,i){if(!i)throw Error(U(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||Fn,pending:s||Fn,rejected:c||Fn,settled:l||Fn})}function Fn(){}var In=`listener`,Ln=`completed`,Rn=`cancelled`;`${Rn}`,`${Ln}`,`${In}${Rn}`,`${In}${Ln}`;var{assign:zn}=Object,Bn=`listenerMiddleware`,Vn=zn(un(`${Bn}/add`),{withTypes:()=>Vn});`${Bn}`;var Hn=zn(un(`${Bn}/remove`),{withTypes:()=>Hn});function U(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var W=e=>{if(!(!e||e.length===0))return Array.from(new Set(e))},Un=(e,t)=>{let n=l(e.start),r=n.getDate(),i=n.getMonth()+1,a=(n.getDay()+6)%7;switch(e.byweekday=void 0,e.bymonth=void 0,e.bymonthday=void 0,e.byyearday=void 0,e.bysetpos=void 0,t){case C.WEEKLY:e.byweekday=[a];break;case C.MONTHLY:e.bymonthday=[r];break;case C.YEARLY:e.bymonth=[i],e.bymonthday=[r];break;default:break}},G=e=>{let t=Gn(e),n=Xn(e.rrule,e.allDay);if(!t&&n.length===0){e.rrule=void 0;return}if(t&&n.length===0){e.rrule=Jn(t.toString(),e.allDay);return}e.rrule=[...Yn(e,t),...n].join(`
`)},Wn=e=>{let t=e?.split(/\r?\n/).filter(e=>!e.trim().startsWith(`RDATE`));return t?.length?t.join(`
`):void 0},K=(e,t)=>e.filter(e=>e.getTime()!==t),Gn=e=>{let{repeatEndType:t,allDay:n,interval:r,count:i}=e,a=l(e.start),o=e.until?l(e.until):null,c=n?s(a):u(a),d=t===`ON_DATE`&&o?n?s(o):u(o):void 0,f={dtstart:c,interval:r,count:t===`AFTER`?i:void 0,until:t===`ON_DATE`?d:void 0};switch(e.repeatType){case`DAILY`:f={...f,freq:C.DAILY};break;case`WEEKLY`:f={...f,freq:C.WEEKLY};break;case`MONTHLY`:f={...f,freq:C.MONTHLY};break;case`YEARLY`:f={...f,freq:C.YEARLY};break;case`CUSTOM`:{let t=e.freq===C.YEARLY&&e.bysetpos?.length&&e.byweekday?.length,n=t?void 0:e.bysetpos,r=t?$n(e.byweekday,e.bysetpos?.[0]):e.byweekday;f={...f,freq:e.freq,interval:e.interval,count:e.repeatEndType===`AFTER`?e.count:void 0,byweekday:r,bymonth:e.bymonth,bymonthday:e.bymonthday,byyearday:e.byyearday,bysetpos:n};break}default:return null}return new w(f)},Kn=(e,t)=>{let n=l(t);if(e.allDay)return s(n);let r=l(e.start);return n.setHours(r.getHours(),r.getMinutes(),r.getSeconds(),0),u(n)},qn=(e,t,n=[],r=[])=>{if(!t&&n.length===0&&r.length===0)return;let i=[...Yn(e,t)];if(n.length>0||r.length>0){let t=new de;n.forEach(e=>{t.rdate(e)}),r.forEach(e=>{t.exdate(e)}),i.push(...Jn(t.toString(),e.allDay).split(`
`))}return i.join(`
`)},Jn=(e,t)=>e.split(`
`).map(e=>fe(e,t)).filter(Boolean).join(`
`),Yn=(e,t)=>{if(t)return Jn(t.toString(),e.allDay).split(`
`);let n=Zn(e),r=new de;return r.dtstart(n),r.rdate(n),Jn(r.toString(),e.allDay).split(`
`)},Xn=(e,t)=>{if(!e)return[];let n=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(n.some(e=>e.startsWith(`RRULE`)))return n.filter(e=>e.startsWith(`RDATE`)||e.startsWith(`EXDATE`)).map(e=>fe(e,t));let r=n.find(e=>e.startsWith(`DTSTART`))?.split(`:`,2)[1]?.trim();return n.flatMap(e=>{if(!e.startsWith(`RDATE`)&&!e.startsWith(`EXDATE`))return[];if(!r||!e.startsWith(`RDATE`))return[fe(e,t)];let[n,i=``]=e.split(`:`,2),a=i.split(`,`).map(e=>e.trim()).filter(Boolean).filter(e=>e!==r);return a.length===0?[]:[fe(`${n}:${a.join(`,`)}`,t)]})},Zn=e=>{let t=l(e.start);return e.allDay?s(t):u(t)},Qn=[w.MO,w.TU,w.WE,w.TH,w.FR,w.SA,w.SU],$n=(e,t)=>!e?.length||!t?e:e.map(e=>Qn[e]?.nth(t)).filter(Boolean),er=(e,t)=>{let n=l(t);if(e.allDay)n.setHours(0,0,0,0);else{let t=l(e.start);n.setHours(t.getHours(),t.getMinutes(),t.getSeconds(),0)}return c(n)},tr=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),nr=new Set([`NEVER`,`AFTER`,`ON_DATE`]),rr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},ir=e=>tr.has(e)?e:`NEVER`,ar=e=>nr.has(e)?e:`NEVER`,or=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,sr=kn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:C.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=er(e,e.until)),r!==void 0&&(e.until=e.start+r),G(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=er(e,n),G(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=l(e.start);a.setHours(i,0,0,0),e.start=c(a);let o=l(e.end);n?o=g(S(o),1):(o=re(o,1),o=v(o,a.getHours()),o=oe(o,r)),e.end=c(o),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=er(e,e.until)),G(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=Wn(e.rrule)),e.repeatType=t.payload,G(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=or(e.count):e.count=null,G(e)},setFreq:(e,t)=>{e.freq=t.payload,Un(e,t.payload),G(e)},setCount:(e,t)=>{e.count=or(t.payload),G(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),G(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=W(r),G(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=W(n.byweekday)),`bymonth`in n&&(e.bymonth=W(n.bymonth)),`bymonthday`in n&&(e.bymonthday=W(n.bymonthday)),`byyearday`in n&&(e.byyearday=W(n.byyearday)),`bysetpos`in n&&(e.bysetpos=W(n.bysetpos)),G(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=sr,cr=sr.reducer,J={state:e=>e.event},lr=kn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:ur}=lr,dr=lr.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},fr=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},pr=e=>c(S(l(e))),mr=t=>c(S(e(t))),hr=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0,0)),gr=e=>new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),23,59,59,999)),_r=e=>Math.floor(hr(e).getTime()/1e3),vr=(e,t)=>{let n=pr(t),r=he(e)??null,i=pe(e);return{startTimestamp:n,baseRule:r,recurrenceSet:i,addedDateSet:new Set((i?.rdates()??[]).map(mr).filter(e=>r?!0:e!==n))}},yr=(e,t)=>{let n=_r(t),r=hr(t),i=gr(t),a=e.baseRule?e.baseRule.between(r,i,!0).length>0:!1,o=e.recurrenceSet?e.recurrenceSet.between(r,i,!0).length>0:n===e.startTimestamp;return{timestamp:n,full:o,base:a,excluded:a&&!o,rdate:e.addedDateSet.has(n)}},br=(e,t)=>{if(!t)return[];let n=hr(t.start),r=gr(t.end),i=_r(t.start),o=_r(t.end),s=[];return e.recurrenceSet?s=e.recurrenceSet.between(n,r,!0).map(mr):e.startTimestamp>=i&&e.startTimestamp<=o&&(s=[e.startTimestamp]),Array.from(new Set(s)).map(e=>({id:a(new Date(e*1e3)),start:x(l(e),`yyyy-MM-dd`),allDay:!0}))},xr=(e,t,n)=>{if(!t)return[];if(!e.recurrenceSet){let n=_r(t);return e.startTimestamp>=n?[e.startTimestamp]:[]}let r=e.recurrenceSet.between(hr(t),m(gr(t),100),!0,(e,t)=>t<n).map(mr);return Array.from(new Set(r)).slice(0,n)},Sr=(e,t,n,r,i)=>{let a=Kn(e,r),o=a.getTime(),s=Cr(t,({baseRule:e,rdates:t,exdates:r})=>{let s=wr(t,a,o,n===`rdate`,i);return{baseRule:e,rdates:n===`exdate`&&i?K(s,o):s,exdates:wr(r,a,o,n===`exdate`,i)}});return qn(e,s.baseRule,fr(s.rdates),fr(s.exdates))},Cr=(e,t)=>t({baseRule:e.baseRule,rdates:Tr(e),exdates:e.recurrenceSet?.exdates()??[]}),wr=(e,t,n,r,i)=>r?i?[...e,t]:K(e,n):e,Tr=e=>{let t=e.recurrenceSet?.rdates()??[];return e.baseRule?t:t.filter(t=>mr(t)!==e.startTimestamp)},Er=d.div`
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
`,Dr=d.div`
  min-width: 120px;
  max-width: 120px;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,Or=d.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 4px;

  height: 215px;
  margin-top: 57px;
`,kr=d.li`
  padding: 4px 8px;

  font-size: 13px;
  line-height: 13px;
  font-family: monospace;

  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  border-left: 5px solid var(--gray-200);
`,X=n(),Ar=8,jr=()=>{let e=D(),t=O(J.state),{repeatType:n,start:r,rrule:i}=t,[o,s]=(0,T.useState)(null),c=(0,T.useMemo)(()=>vr(i,r),[i,r]),l=(0,T.useMemo)(()=>br(c,o),[c,o]),u=(0,T.useMemo)(()=>xr(c,o?.start??null,Ar),[c,o]),d=(0,T.useCallback)((n,r,i)=>{e(q.setRRule(Sr(t,c,n,r,i)))},[e,c,t]),p=(0,T.useCallback)(e=>{let t=yr(c,e);if(t.base&&t.excluded){d(`exdate`,t.timestamp,!1);return}if(t.base&&t.full&&n!==`NEVER`){d(`exdate`,t.timestamp,!0);return}if(!t.base&&t.full&&t.rdate){d(`rdate`,t.timestamp,!1);return}t.full||d(`rdate`,t.timestamp,!0)},[d,c,n]),m=(0,T.useCallback)(e=>yr(c,e),[c]);return(0,X.jsxs)(Er,{children:[(0,X.jsx)(_,{label:`Recurrence Preview`,children:(0,X.jsx)(le,{aspectRatio:2,height:250,expandRows:!1,themeSystem:`bootstrap5`,plugins:[ce,ue],initialView:`dayGridMonth`,timeZone:`UTC`,eventDisplay:`none`,events:l,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>s({start:e.start,end:e.end}),dayCellClassNames:e=>{let t=m(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>p(e.date)})}),(0,X.jsx)(Dr,{children:u.length===0?(0,X.jsxs)(`p`,{children:[f(`No occurrences starting from`),(0,X.jsx)(`br`,{}),x(o?.start||new Date,`PP`)]}):(0,X.jsx)(Or,{$count:u.length,children:u.map(e=>{let t=a(new Date(e*1e3));return(0,X.jsx)(kr,{children:t},t)})})})]})},Mr=d.div`
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
`,Nr=e=>c(re(l(e),1)),Pr=(e,t,n)=>{let r=Ir(t,n);return e.getTime()>=r.getTime()},Fr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return c(g(S(l(e)),1));let i=l(e),a=Ir(t,r);return i.getTime()>=a.getTime()?e:c(a)},Ir=(e,t)=>oe(l(e),t),Lr=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Rr=({inputValue:e,value:t,min:n})=>{let r=Lr(e)??n??t??0;return n===void 0?r:Math.max(r,n)},zr=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,T.useState)(e?.toString()??``),o=(0,T.useRef)(void 0),s=(0,T.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,T.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,T.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,T.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,T.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Lr(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,T.useCallback)(n=>{n.stopPropagation();let r=Rr({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Br=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=zr({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(_,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Vr=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),Hr=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Ur=({noun:e=`day`})=>{let t=D(),{interval:n}=O(J.state);return(0,X.jsxs)(Wr,{children:[(0,X.jsx)(`span`,{children:`Every`}),(0,X.jsx)(Gr,{type:`text`,className:`text`,value:n,onChange:e=>{let n=parseInt(e.target.value,10)||1;t(q.setInterval(n))}}),(0,X.jsxs)(Kr,{children:[(0,X.jsx)(qr,{type:`button`,onClick:()=>t(q.setInterval(n+1)),children:(0,X.jsx)(Hr,{})}),(0,X.jsx)(qr,{type:`button`,onClick:()=>t(q.setInterval(n-1)),children:(0,X.jsx)(Vr,{})})]}),(0,X.jsxs)(`span`,{children:[e,n>1?`s`:``]})]})},Wr=d.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Gr=d.input`
  width: 60px;
`,Kr=d.div`
  display: flex;
  flex-direction: column;
`,qr=d.button`
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
`,Jr=()=>(0,X.jsx)(Ur,{noun:`day`}),Z=[{value:`MO`,label:`Monday`,days:[w.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[w.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[w.WE.weekday]},{value:`TH`,label:`Thursday`,days:[w.TH.weekday]},{value:`FR`,label:`Friday`,days:[w.FR.weekday]},{value:`SA`,label:`Saturday`,days:[w.SA.weekday]},{value:`SU`,label:`Sunday`,days:[w.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[w.MO.weekday,w.TU.weekday,w.WE.weekday,w.TH.weekday,w.FR.weekday]},{value:`WEK`,label:`Weekend Day (Sat/Sun)`,days:[w.SA.weekday,w.SU.weekday]}],Yr=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},Xr=(e,t)=>{let n=Yr(e),r=Yr(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},Zr=(e,t)=>{if(e){let t=Z.find(t=>Xr(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},Qr=e=>Z.find(t=>t.value===e)?.days??[w.MO.weekday],Q=`5px`,$r=d.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-100);
  border-right: 1px solid var(--gray-300);
  border-bottom: 1px solid var(--gray-300);
  border-left: none;
  border-top: none;
`,ei=d($r)`
  cursor: pointer;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--teal-600);
  }
`,ti=d($r)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,ni=d.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--gray-300);
  border: 1px solid var(--gray-300);
  border-radius: ${Q};

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,ri=d(ni)`
  grid-template-columns: repeat(7, 1fr);

  ${$r} {
    &:first-child {
      border-top-left-radius: ${Q};
    }

    &:nth-child(7) {
      border-top-right-radius: ${Q};
    }

    &:last-child {
      border-bottom-right-radius: ${Q};
    }

    &:nth-child(29) {
      border-bottom-left-radius: ${Q};
    }

    &:nth-child(7n) {
      border-right: none;
    }

    &:nth-child(n + 29) {
      border-bottom: none;
    }
  }
`,ii=d(ni)`
  grid-template-columns: repeat(7, 1fr);

  ${$r} {
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
`,ai=d(ni)`
  grid-template-columns: repeat(4, 1fr);

  ${$r} {
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
`,oi=({label:e,values:t,onChange:n})=>(0,X.jsx)(_,{label:e,children:(0,X.jsxs)(ri,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(ei,{type:`button`,className:p(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(ti,{},e))]})}),si=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],ci=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],li=()=>{let e=D(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=O(J.state),a=l(t),o=a.getDate(),s=(a.getDay()+6)%7,c=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[o],d=i?.[0]??1,f=Zr(r,s),p=t=>{e(q.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(q.setByRules({bymonthday:void 0,byweekday:Qr(t),bysetpos:[n]}))};return(0,X.jsxs)(`div`,{children:[(0,X.jsx)(Ur,{noun:`month`}),(0,X.jsx)(`div`,{className:`field`,children:(0,X.jsx)(h,{label:`Repeat On`,value:c,options:si,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}})}),c===`MONTHDAY`&&(0,X.jsx)(oi,{label:`Days of month`,values:u,onChange:e=>p(e)}),c===`WEEKDAY`&&(0,X.jsxs)(ae,{className:`field`,children:[(0,X.jsx)(h,{label:`Position`,value:d,options:ci,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(h,{label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},ui=[w.MO,w.TU,w.WE,w.TH,w.FR,w.SA,w.SU],di=()=>{let e=D(),{byweekday:t}=O(J.state);return(0,X.jsxs)(`div`,{children:[(0,X.jsx)(Ur,{noun:`week`}),(0,X.jsx)(ii,{className:`field`,children:ui.map(n=>(0,X.jsx)(ei,{type:`button`,className:p(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:n.toString()},n.weekday))})]})},fi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],pi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],mi=[{value:1,label:`January`},{value:2,label:`February`},{value:3,label:`March`},{value:4,label:`April`},{value:5,label:`May`},{value:6,label:`June`},{value:7,label:`July`},{value:8,label:`August`},{value:9,label:`September`},{value:10,label:`October`},{value:11,label:`November`},{value:12,label:`December`}],hi=()=>{let e=D(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=O(J.state),o=l(t),s=o.getDate(),c=o.getMonth()+1,u=(o.getDay()+6)%7,d=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,f=r?.length?r:[s],m=n?.length?n:[c],g=a?.[0]??1,v=Zr(i,u),y=(t,n)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},b=(t,n,r)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:Qr(n),bysetpos:[r]}))};return(0,X.jsxs)(`div`,{children:[(0,X.jsx)(Ur,{noun:`year`}),(0,X.jsx)(_,{label:`Month`,children:(0,X.jsx)(ai,{children:mi.map(e=>{let t=m.includes(e.value);return(0,X.jsx)(ei,{type:`button`,className:p(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),d===`WEEKDAY`?b(n,v,g):y(n,f))},children:e.label},e.value)})})}),(0,X.jsx)(`div`,{className:`field`,children:(0,X.jsx)(h,{label:`Repeat On`,value:d,options:fi,onChange:e=>{e===`WEEKDAY`?b(m,v,g):y(m,f)}})}),d===`MONTHDAY`&&(0,X.jsx)(oi,{label:`Days of month`,values:f,onChange:e=>y(m,e)}),d===`WEEKDAY`&&(0,X.jsxs)(ae,{className:`field`,children:[(0,X.jsx)(h,{label:`Position`,value:g,options:pi,onChange:e=>b(m,v,Number.parseInt(e,10))}),(0,X.jsx)(h,{label:`Day`,value:v,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>b(m,e,g)})]})]})},gi=()=>{let{freq:e}=O(J.state);return e===C.DAILY?(0,X.jsx)(Jr,{}):e===C.WEEKLY?(0,X.jsx)(di,{}):e===C.MONTHLY?(0,X.jsx)(li,{}):e===C.YEARLY?(0,X.jsx)(hi,{}):null},_i=(e,t,n)=>{(0,T.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},vi=d.div`
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--gray-200);
`,yi=d.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`,bi=d.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,xi=d.div`
  position: relative;
  flex: 1;

  .react-datepicker-wrapper {
    display: block;
  }

  .react-datepicker-popper {
    z-index: 20;
  }
`,Si=d.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Ci=d.div`
  position: relative;
  flex-shrink: 0;
`,wi=d.button`
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
`,Ti=d.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 20;

  width: min(350px, 80vw);
  padding: 14px;

  background: white;
  border: 1px solid var(--gray-250, var(--gray-200));
  border-radius: var(--radius-lg, 10px);
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);

  ul {
    margin: 0;
  }
`,Ei=d.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Di=d.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Oi=d.li`
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
`,ki=({title:e,actionLabel:t,actionClass:n,popoverTitle:r,dates:i,openToDate:a,weekStartDay:o,formatDate:s,filterDate:l,onAdd:u,onRemove:d})=>{let[m,h]=(0,T.useState)(!1),g=(0,T.useRef)(null),_=(0,T.useRef)(null);return(0,T.useEffect)(()=>{i.length===0&&h(!1)},[i.length]),_i(m,[g,_],()=>h(!1)),(0,X.jsxs)(vi,{children:[(0,X.jsx)(yi,{children:f(e)}),(0,X.jsxs)(bi,{children:[(0,X.jsxs)(Ci,{children:[(0,X.jsx)(wi,{ref:g,type:`button`,disabled:i.length===0,className:p({active:m}),onClick:()=>{i.length!==0&&h(e=>!e)},children:i.length}),m&&(0,X.jsxs)(Ti,{ref:_,children:[(0,X.jsx)(Ei,{children:f(r)}),(0,X.jsx)(Di,{children:i.map(e=>(0,X.jsxs)(Oi,{children:[(0,X.jsx)(`span`,{children:s(e)}),(0,X.jsx)(`button`,{type:`button`,onClick:()=>d(e),children:`×`})]},e))})]})]}),(0,X.jsx)(xi,{children:(0,X.jsx)(ee,{selected:null,onChange:e=>{e&&u(c(S(e)))},customInput:(0,X.jsx)(Ai,{label:t,className:p(`btn`,n)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:f(`Today`),openToDate:a,calendarStartDay:o,filterDate:l})})]})]})},Ai=(0,T.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Si,{type:`button`,ref:n,...t,children:f(e)}));Ai.displayName=`PickerTrigger`;var ji=d.div`
  flex: 1;
`,Mi=()=>{let t=D(),n=O(J.state),{start:r,rrule:i}=n,a=(0,T.useMemo)(()=>c(S(l(r))),[r]),o=(0,T.useMemo)(()=>he(i)??null,[i]),d=(0,T.useMemo)(()=>pe(i),[i]),f=(0,T.useMemo)(()=>d?Array.from(new Set(d.rdates().map(t=>c(S(e(t)))).filter(e=>o?!0:e!==a))).sort((e,t)=>e-t):[],[o,d,a]),p=(0,T.useMemo)(()=>d?Array.from(new Set(d.exdates().map(t=>c(S(e(t)))))).sort((e,t)=>e-t):[],[d]),m=(0,T.useMemo)(()=>new Set(f),[f]),h=(0,T.useMemo)(()=>new Set(p),[p]),g=(0,T.useCallback)(e=>{let t=s(S(e)),n=u(y(e)),r=o?o.between(t,n,!0).length>0:!1,i=d?d.between(t,n,!0).length>0:c(S(e))===a;return{full:i,base:r,excluded:r&&!i}},[o,d,a]),_=r=>{let i=r({baseRule:o,rdates:d?.rdates().filter(t=>o?!0:c(S(e(t)))!==a)??[],exdates:d?.exdates()??[]});t(q.setRRule(qn(n,i.baseRule,Ni(i.rdates),Ni(i.exdates))))};return{addedDates:f,excludedDates:p,addFixedDate:(e,t)=>{let r=Kn(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:K(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{let r=Kn(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?K(n,r):n,exdates:e===`exdate`?K(i,r):i}))},canAddOccurrence:(0,T.useCallback)(e=>{let t=c(S(e)),n=g(e);return!n.full&&!n.excluded&&!m.has(t)},[m,g]),canExcludeOccurrence:(0,T.useCallback)(e=>{let t=c(S(e)),n=g(e);return n.base&&!n.excluded&&!h.has(t)},[h,g]),getStatus:g}},Ni=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},Pi=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],Fi=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Ii=[{value:C.DAILY,label:`Daily`},{value:C.WEEKLY,label:`Weekly`},{value:C.MONTHLY,label:`Monthly`},{value:C.YEARLY,label:`Yearly`}],Li=300,Ri=()=>{let e=D(),t=O(J.state),n=O(Y.weekStartDay),{repeatType:r,repeatEndType:i,count:a,until:o,freq:s,start:c}=t,u=r!==`NEVER`,{addedDates:d,excludedDates:f,addFixedDate:p,removeFixedDate:m,canAddOccurrence:g,canExcludeOccurrence:_}=Mi(),v=(0,T.useMemo)(()=>l(c),[c]),y=e=>x(l(e),`yyyy-MM-dd`);return(0,X.jsxs)(ji,{children:[(0,X.jsxs)(ae,{children:[(0,X.jsx)(h,{label:`Repeat`,value:r,options:Pi,onChange:t=>e(q.setRepeatType(t))}),r===`CUSTOM`&&(0,X.jsx)(h,{label:``,value:s,options:Ii,onChange:t=>e(q.setFreq(Number.parseInt(t,10)))})]}),r===`CUSTOM`&&(0,X.jsx)(`div`,{className:`field`,children:(0,X.jsx)(gi,{})}),r!==`NEVER`&&(0,X.jsxs)(ae,{className:`field`,children:[(0,X.jsx)(h,{label:`Repeat End`,options:Fi,value:i,onChange:t=>e(q.setRepeatEndType(t))}),i===`AFTER`&&(0,X.jsx)(Br,{label:`Times`,value:a,min:1,debounceMs:Li,onChange:t=>e(q.setCount(t))}),i===`ON_DATE`&&(0,X.jsx)(ne,{label:``,value:o||null,onChange:t=>e(q.setUntil(t)),datePickerProps:{showTimeInput:!1,calendarStartDay:n}})]}),(0,X.jsx)(ki,{title:`Custom Occurrences`,actionLabel:`Add Occurrence`,actionClass:`icon add dashed`,popoverTitle:`Added Occurrences`,dates:d,openToDate:v,formatDate:y,filterDate:g,weekStartDay:n,onAdd:e=>p(`rdate`,e),onRemove:e=>m(`rdate`,e)}),u&&(0,X.jsx)(ki,{title:`Exceptions`,actionLabel:`Exclude Occurrence`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Occurrences`,dates:f,openToDate:v,formatDate:y,filterDate:_,weekStartDay:n,onAdd:e=>p(`exdate`,e),onRemove:e=>m(`exdate`,e)})]})},zi=()=>{let e=(0,T.useId)(),t=(0,T.useId)(),n=(0,T.useId)(),r=D(),{start:i,end:a,allDay:o}=O(J.state),{date:s,time:c,datetime:u}=O(Y.formats),d=O(Y.weekStartDay),p=O(Y.timeInterval),m=O(Y.eventDuration),h=(0,T.useMemo)(()=>o?s.short.icu:u.short.icu,[o,s,u]),g=(0,T.useMemo)(()=>o?Nr(a):a,[o,a]);return(0,X.jsxs)(Mr,{children:[(0,X.jsxs)(`div`,{style:{flex:1},children:[(0,X.jsx)(te,{id:e,label:`All Day`,enabled:o,onClick:e=>r(q.setAllDay({enabled:e,eventDuration:m}))}),(0,X.jsx)(ne,{id:t,label:`Starts`,value:i,onChange:e=>r(q.setStart(e)),datePickerProps:{id:t,showIcon:!0,icon:(0,X.jsx)(ie,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:h,timeFormat:c.short.icu,todayButton:f(`Today`),calendarStartDay:d,timeIntervals:p}}),(0,X.jsx)(ne,{id:n,label:`Ends`,value:g,onChange:e=>{e!=null&&r(q.setEnd(Fr({value:e,start:i,allDay:o,timeInterval:p})))},datePickerProps:{id:n,showIcon:!0,icon:(0,X.jsx)(ie,{}),toggleCalendarOnIconClick:!0,minDate:l(i),showTimeSelect:!o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:h,timeFormat:c.short.icu,todayButton:f(`Today`),calendarStartDay:d,timeIntervals:p,filterTime:e=>Pr(new Date(e),i,p)}})]}),(0,X.jsx)(Ri,{}),(0,X.jsx)(jr,{})]})},Bi=d.div`
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
`,Vi=()=>{let{rrule:t}=O(J.state),n=(0,T.useMemo)(Be,[]),r=t?me(t,{forceset:!0}).all((e,t)=>t<10).map(t=>`${x(e(t),`yyyy-MM-dd HH:mm`)} [${ge(t)}]`):[];return(0,X.jsxs)(Bi,{children:[(0,X.jsx)(zi,{}),n&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:t}),(0,X.jsx)(`pre`,{children:JSON.stringify(r,null,2)})]})]})},Hi=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,Ui(n)),$(t,`end`,Ui(r)),$(t,`until`,i?Ui(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},Ui=e=>x(l(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},Wi=e=>{let t=he(e.event.rrule),{byweekday:n,bysetpos:r}=rr(t?.options.byweekday),i=ir(e.event.repeatType),a=ar(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||C.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?or(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return xn({reducer:{app:dr,event:cr},preloadedState:o})},Gi=new WeakSet,Ki=e=>{if(Gi.has(e))return;Gi.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=Wi(JSON.parse(t.textContent)),i=ye.createRoot(n);r.subscribe(()=>{Hi(r,e)}),Hi(r,e),i.render((0,X.jsx)(Me,{store:r,children:(0,X.jsx)(Vi,{})}))},qi=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(Ki)},Ji=()=>{qi(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&Ki(e),qi(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Ji):Ji();