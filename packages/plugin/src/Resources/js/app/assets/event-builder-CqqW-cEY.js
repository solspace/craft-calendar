import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,g as c,i as l,j as u,n as d,r as f,s as p,t as m,v as h,y as g}from"./localization-Dt_HqhpZ.js";import{C as _,E as v,S as y,_ as b,a as ee,b as x,c as te,d as S,f as ne,g as C,h as w,i as re,l as ie,m as ae,n as oe,o as se,p as ce,r as le,s as ue,t as de,u as fe,v as pe,w as me,x as he,y as ge}from"./calendar-preview.operations-BO-Gm4gT.js";import{c as _e,d as ve,f as ye,p as be}from"./calendar.events-BsoNrhOC.js";import{t as xe}from"./interaction-CRxFL9NJ.js";import{a as Se,b as Ce,c as we,f as Te,g as Ee,h as T,i as De,l as E,m as D,n as Oe,o as ke,p as Ae,r as O,s as k,t as A,v as je,y as j}from"./components-B8LQaiF0.js";function Me(e,t){let n=p(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=T(n.getDate(),2),t=T(n.getMonth()+1,2);a=`${T(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=T(Math.trunc(t/60),2),r=T(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=T(n.getHours(),2),r=T(n.getMinutes(),2),i=T(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Ne=u((t=>{var n=e();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Pe=u(((e,t)=>{t.exports=Ne()})),Fe=i(n()),M=i(e(),1),Ie=Pe();function Le(e){e()}function Re(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Le(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var ze={notify(){},get:()=>[]};function Be(e,t){let n,r=ze,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=Re())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=ze)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var Ve=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,He=typeof navigator<`u`&&navigator.product===`ReactNative`,Ue=Ve||He?M.useLayoutEffect:M.useEffect,We=Symbol.for(`react-redux-context`),Ge=typeof globalThis<`u`?globalThis:{};function Ke(){if(!M.createContext)return{};let e=Ge[We]??(Ge[We]=new Map),t=e.get(M.createContext);return t||(t=M.createContext(null),e.set(M.createContext,t)),t}var N=Ke();function qe(e){let{children:t,context:n,serverState:r,store:i}=e,a=M.useMemo(()=>{let e=Be(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=M.useMemo(()=>i.getState(),[i]);Ue(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||N;return M.createElement(s.Provider,{value:a},t)}var Je=qe;function Ye(e=N){return function(){return M.useContext(e)}}var Xe=Ye();function Ze(e=N){let t=e===N?Xe:Ye(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var Qe=Ze();function $e(e=N){let t=e===N?Qe:Ze(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var P=$e(),et=(e,t)=>e===t;function tt(e=N){let t=e===N?Xe:Ye(e),n=(e,n={})=>{let{equalityFn:r=et}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();M.useRef(!0);let s=M.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Ie.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return M.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var F=tt(),nt=()=>!1;function I(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var rt=typeof Symbol==`function`&&Symbol.observable||`@@observable`,it=()=>Math.random().toString(36).substring(7).split(``).join(`.`),at={INIT:`@@redux/INIT${it()}`,REPLACE:`@@redux/REPLACE${it()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${it()}`};function ot(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function st(e,t,n){if(typeof e!=`function`)throw Error(I(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(I(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(I(1));return n(st)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(I(3));return i}function d(e){if(typeof e!=`function`)throw Error(I(4));if(c)throw Error(I(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(I(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!ot(e))throw Error(I(7));if(e.type===void 0)throw Error(I(8));if(typeof e.type!=`string`)throw Error(I(17));if(c)throw Error(I(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(I(10));r=e,f({type:at.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(I(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[rt](){return this}}}return f({type:at.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[rt]:m}}function ct(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:at.INIT})===void 0)throw Error(I(12));if(n(void 0,{type:at.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(I(13))})}function lt(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{ct(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(I(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function ut(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function dt(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(I(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=ut(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function ft(e){return ot(e)&&`type`in e&&typeof e.type==`string`}var pt=Symbol.for(`immer-nothing`),mt=Symbol.for(`immer-draftable`),L=Symbol.for(`immer-state`);function R(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var z=Object,B=z.getPrototypeOf,ht=`constructor`,gt=`prototype`,_t=`configurable`,vt=`enumerable`,yt=`writable`,bt=`value`,V=e=>!!e&&!!e[L];function H(e){return e?Ct(e)||At(e)||!!e[mt]||!!e[ht]?.[mt]||jt(e)||Mt(e):!1}var xt=z[gt][ht].toString(),St=new WeakMap;function Ct(e){if(!e||!Nt(e))return!1;let t=B(e);if(t===null||t===z[gt])return!0;let n=z.hasOwnProperty.call(t,ht)&&t[ht];if(n===Object)return!0;if(!U(n))return!1;let r=St.get(n);return r===void 0&&(r=Function.toString.call(n),St.set(n,r)),r===xt}function wt(e,t,n=!0){Tt(e)===0?(n?Reflect.ownKeys(e):z.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function Tt(e){let t=e[L];return t?t.type_:At(e)?1:jt(e)?2:Mt(e)?3:0}var Et=(e,t,n=Tt(e))=>n===2?e.has(t):z[gt].hasOwnProperty.call(e,t),Dt=(e,t,n=Tt(e))=>n===2?e.get(t):e[t],Ot=(e,t,n,r=Tt(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function kt(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var At=Array.isArray,jt=e=>e instanceof Map,Mt=e=>e instanceof Set,Nt=e=>typeof e==`object`,U=e=>typeof e==`function`,Pt=e=>typeof e==`boolean`;function Ft(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var W=e=>e.copy_||e.base_,It=e=>e.modified_?e.copy_:e.base_;function Lt(e,t){if(jt(e))return new Map(e);if(Mt(e))return new Set(e);if(At(e))return Array[gt].slice.call(e);let n=Ct(e);if(t===!0||t===`class_only`&&!n){let t=z.getOwnPropertyDescriptors(e);delete t[L];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[yt]===!1&&(a[yt]=!0,a[_t]=!0),(a.get||a.set)&&(t[i]={[_t]:!0,[yt]:!0,[vt]:a[vt],[bt]:e[i]})}return z.create(B(e),t)}else{let t=B(e);if(t!==null&&n)return{...e};let r=z.create(t);return z.assign(r,e)}}function Rt(e,t=!1){return Vt(e)||V(e)||!H(e)?e:(Tt(e)>1&&z.defineProperties(e,{set:Bt,add:Bt,clear:Bt,delete:Bt}),z.freeze(e),t&&wt(e,(e,t)=>{Rt(t,!0)},!1),e)}function zt(){R(2)}var Bt={[bt]:zt};function Vt(e){return e===null||!Nt(e)?!0:z.isFrozen(e)}var Ht=`MapSet`,Ut=`Patches`,Wt=`ArrayMethods`,Gt={};function G(e){let t=Gt[e];return t||R(0,e),t}var Kt=e=>!!Gt[e],qt,Jt=()=>qt,Yt=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:Kt(Ht)?G(Ht):void 0,arrayMethodsPlugin_:Kt(Wt)?G(Wt):void 0});function Xt(e,t){t&&(e.patchPlugin_=G(Ut),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Zt(e){Qt(e),e.drafts_.forEach(en),e.drafts_=null}function Qt(e){e===qt&&(qt=e.parent_)}var $t=e=>qt=Yt(qt,e);function en(e){let t=e[L];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function tn(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[L].modified_&&(Zt(t),R(4)),H(e)&&(e=nn(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[L].base_,e,t)}else e=nn(t,n);return rn(t,e,!0),Zt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===pt?void 0:e}function nn(e,t){if(Vt(t))return t;let n=t[L];if(!n)return fn(t,e.handledSet_,e);if(!on(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);un(n,e)}return n.copy_}function rn(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Rt(t,n)}function an(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var on=(e,t)=>e.scope_===t,sn=[];function cn(e,t,n,r){let i=W(e),a=e.type_;if(r!==void 0&&Dt(i,r,a)===t){Ot(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;wt(i,(e,n)=>{if(V(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??sn;for(let e of o)Ot(i,e,n,a)}function ln(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!on(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=It(i);cn(e,i.draft_??i,a,n),un(i,r)})}function un(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}an(e)}}function dn(e,t,n){let{scope_:r}=e;if(V(n)){let i=n[L];on(i,r)&&i.callbacks_.push(function(){bn(e),cn(e,n,It(i),t)})}else H(n)&&e.callbacks_.push(function(){let i=W(e);e.type_===3?i.has(n)&&fn(n,r.handledSet_,r):Dt(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&fn(Dt(e.copy_,t,e.type_),r.handledSet_,r)})}function fn(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||V(e)||t.has(e)||!H(e)||Vt(e)?e:(t.add(e),wt(e,(r,i)=>{if(V(i)){let t=i[L];on(t,n)&&(Ot(e,r,It(t),e.type_),an(t))}else H(i)&&fn(i,t,n)}),e)}function pn(e,t){let n=At(e),r={type_:+!!n,scope_:t?t.scope_:Jt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=mn;n&&(i=[r],a=hn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var mn={get(e,t){if(t===L)return e;if(t===`constructor`||t===`__proto__`){let n=W(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=W(e);if(!Et(i,t,e.type_))return _n(e,i,t);let a=i[t];if(e.finalized_||!H(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Ft(t))return a;if(a===gn(e.base_,t)){bn(e);let n=e.type_===1?+t:t,r=Sn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in W(e)},ownKeys(e){return Reflect.ownKeys(W(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=vn(W(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=gn(W(e),t),i=r?.[L];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(kt(n,r)&&(n!==void 0||Et(e.base_,t,e.type_)))return!0;bn(e),yn(e)}return e.copy_[t]===n&&(n!==void 0||Et(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),dn(e,t,n),!0)},deleteProperty(e,t){return bn(e),gn(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),yn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=W(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[yt]:!0,[_t]:e.type_!==1||t!==`length`,[vt]:r[vt],[bt]:n[t]}},defineProperty(){R(11)},getPrototypeOf(e){return B(e.base_)},setPrototypeOf(){R(12)}},hn={};for(let e in mn){let t=mn[e];hn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}hn.deleteProperty=function(e,t){return hn.set.call(this,e,t,void 0)},hn.set=function(e,t,n){return mn.set.call(this,e[0],t,n,e[0])};function gn(e,t){let n=e[L];return(n?W(n):e)[t]}function _n(e,t,n){let r=vn(t,n);return r?bt in r?r[bt]:r.get?.call(e.draft_):void 0}function vn(e,t){if(!(t in e))return;let n=B(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=B(n)}}function yn(e){e.modified_||(e.modified_=!0,e.parent_&&yn(e.parent_))}function bn(e){e.copy_||(e.assigned_=new Map,e.copy_=Lt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var xn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(U(e)&&!U(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}U(t)||R(6),n!==void 0&&!U(n)&&R(7);let r;if(H(e)){let i=$t(this),a=Sn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?Zt(i):Qt(i)}return Xt(i,n),tn(r,i)}else if(!e||!Nt(e)){if(r=t(e),r===void 0&&(r=e),r===pt&&(r=void 0),this.autoFreeze_&&Rt(r,!0),n){let t=[],i=[];G(Ut).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else R(1,e)},this.produceWithPatches=(e,t)=>{if(U(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Pt(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Pt(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Pt(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){H(e)||R(8),V(e)&&(e=Cn(e));let t=$t(this),n=Sn(t,e,void 0);return n[L].isManual_=!0,Qt(t),n}finishDraft(e,t){let n=e&&e[L];(!n||!n.isManual_)&&R(9);let{scope_:r}=n;return Xt(r,t),tn(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=G(Ut).applyPatches_;return V(e)?r(e,t):this.produce(e,e=>r(e,t))}};function Sn(e,t,n,r){let[i,a]=jt(t)?G(Ht).proxyMap_(t,n):Mt(t)?G(Ht).proxySet_(t,n):pn(t,n);return(n?.scope_??Jt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?ln(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function Cn(e){return V(e)||R(10,e),wn(e)}function wn(e){if(!H(e)||Vt(e))return e;let t=e[L],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Lt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Lt(e,!0);return wt(n,(e,t)=>{Ot(n,e,wn(t))},r),t&&(t.finalized_=!1),n}var Tn=new xn().produce;function En(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var Dn=En(),On=En,kn=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?ut:ut.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function An(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(K(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>ft(t)&&t.type===e,n}var jn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Mn(e){return H(e)?Tn(e,()=>{}):e}function Nn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Pn(e){return typeof e==`boolean`}var Fn=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new jn;return t&&(Pn(t)?a.push(Dn):a.push(On(t.extraArgument))),a},In=`RTK_autoBatch`,Ln=e=>t=>{setTimeout(t,e)},Rn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},zn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Rn(window.requestAnimationFrame,100):Ln(10):e.type===`callback`?e.queueNotification:Ln(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[In],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Bn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new jn(e);return n&&r.push(zn(typeof n==`object`?n:void 0)),r};function Vn(e){let t=Fn(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(ot(n))c=lt(n);else throw Error(K(1));let l;l=typeof r==`function`?r(t):t();let u=ut;i&&(u=kn({trace:!1,...typeof i==`object`&&i}));let d=Bn(dt(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return st(c,o,p)}function Hn(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(K(28));if(r in t)throw Error(K(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Un(e){return typeof e==`function`}function Wn(e,t){let[n,r,i]=Hn(t),a;if(Un(e))a=()=>Mn(e());else{let t=Mn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(V(e)){let r=n(e,t);return r===void 0?e:r}else if(H(e))return Tn(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Gn=Symbol.for(`rtk-slice-createasyncthunk`);function Kn(e,t){return`${e}/${t}`}function qn({creators:e}={}){let t=e?.asyncThunk?.[Gn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(K(11));let i=(typeof e.reducers==`function`?e.reducers(Xn()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(K(12));if(n in o.sliceCaseReducersByType)throw Error(K(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:Kn(n,r),createNotation:typeof e.reducers==`function`};Qn(a)?er(o,a,s,t):Zn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Hn(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Wn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Nn(d,r,m)),i}function i(t=l){return Nn(Nn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=Jn(a,t,()=>Nn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function Jn(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var Yn=qn();function Xn(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function Zn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!$n(r))throw Error(K(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?An(e,o):An(e))}function Qn(e){return e._reducerDefinitionType===`asyncThunk`}function $n(e){return e._reducerDefinitionType===`reducerWithPrepare`}function er({type:e,reducerName:t},n,r,i){if(!i)throw Error(K(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||tr,pending:s||tr,rejected:c||tr,settled:l||tr})}function tr(){}var nr=`listener`,rr=`completed`,ir=`cancelled`;`${ir}`,`${rr}`,`${nr}${ir}`,`${nr}${rr}`;var{assign:ar}=Object,or=`listenerMiddleware`,sr=ar(An(`${or}/add`),{withTypes:()=>sr});`${or}`;var cr=ar(An(`${or}/remove`),{withTypes:()=>cr});function K(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var lr=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),ur=new Set([`NEVER`,`AFTER`,`ON_DATE`]),dr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},fr=e=>lr.has(e)?e:`NEVER`,pr=e=>ur.has(e)?e:`NEVER`,mr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,hr=Yn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:_.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=ne(e,e.until)),r!==void 0&&(e.until=e.start+r),C(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=ne(e,n),C(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=o(e.start);a.setHours(i,0,0,0),e.start=h(a);let s=o(e.end);n?s=Ce(j(s),1):(s=Ae(s,1),s=Te(s,a.getHours()),s=je(s,r)),e.end=h(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=ne(e,e.until)),C(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=pe(e.rrule)),e.repeatType=t.payload,C(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=mr(e.count):e.count=null,C(e)},setFreq:(e,t)=>{e.freq=t.payload,ge(e,t.payload),C(e)},setCount:(e,t)=>{e.count=mr(t.payload),C(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),C(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=w(r),C(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=w(n.byweekday)),`bymonth`in n&&(e.bymonth=w(n.bymonth)),`bymonthday`in n&&(e.bymonthday=w(n.bymonthday)),`byyearday`in n&&(e.byyearday=w(n.byyearday)),`bysetpos`in n&&(e.bysetpos=w(n.bysetpos)),C(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:q}=hr,gr=hr.reducer,J={state:e=>e.event},_r=r.button`
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
`,vr=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`form`).data(`elementEditor`)},yr=async e=>{let t=vr(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},br=Yn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:xr}=br,Sr=br.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},Cr=r.div`
  &:empty {
    display: none;
  }

  margin: 0 20px 20px;
  padding: 18px 0 0;
  border-top: 1px solid var(--gray-200);

  h3 {
    margin: 0 0 6px;
    color: var(--gray-700);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    line-height: 20px;
  }

  > p {
    margin: 0 0 8px;
    color: var(--gray-600);
    font-size: 13px;
    line-height: 20px;
  }

  > p.warning {
    color: var(--error-color, #cf1124);
  }
`,wr=r.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`,Tr=r.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  margin: 0;
  padding: 8px 0;
  line-height: 1.5;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  &.is-orphaned .date {
    color: var(--gray-500);
  }

  .details {
    flex: 1 1 220px;
    min-width: 0;
  }

  .date {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 8px;
    font-size: 13px;
    font-weight: 400;
  }

  .title {
    margin-top: 2px;
    font-size: 13px;
  }

  .changes {
    margin-top: 2px;
    color: var(--gray-600);
    font-size: 12px;
  }

  .state {
    padding: 1px 6px;
    border-radius: var(--small-border-radius, 3px);
    background-color: var(--gray-100);
    font-size: 11px;
    font-weight: 400;
    color: var(--gray-600);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    flex: 0 0 auto;
    align-items: center;
    gap: 2px;

    .btn {
      min-height: 26px;
      padding-inline: 10px;
      font-size: 12px;
    }
  }
`,X=a(),Er=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],Dr=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of Er){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},Or=({context:e,refreshKey:n})=>{let r=(0,M.useRef)(null),[i,a]=(0,M.useState)([]),[o,s]=(0,M.useState)(null),[c,u]=(0,M.useState)(null),f=(0,M.useRef)(0),p=F(J.state),m=F(Y.formats),h=e=>D(t(new Date(e.start*1e3)),e.allDay?m?.date.short.icu??`P`:m?.datetime.short.icu??`Pp`,{locale:d()}),g=(0,M.useCallback)(()=>vr(r.current)?.settings.elementId??e.eventId,[e.eventId]),_=(0,M.useCallback)(async()=>{let t=g();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let r=await ve(n,{headers:{Accept:`application/json`}});if(!r.ok)return;let i=await r.json();a(i.occurrences??[])},[e.siteId,g]);(0,M.useEffect)(()=>{_()},[_,n]);let v=(0,M.useCallback)(async()=>{let t=g();if(!t)return;let n=++f.current,i=await ve(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...Dr(r.current)})});if(!i.ok)return;let a=await i.json();n===f.current&&u(new Set(a.orphaned??[]))},[e.siteId,g]);(0,M.useEffect)(()=>{if(i.length===0)return;let e=setTimeout(()=>void v(),400);return()=>clearTimeout(e)},[p,i.length,v]);let y=e=>c?c.has(e.recurrenceId):e.orphaned,b=async t=>{s(t.recurrenceId);try{let n=await yr(r.current);if(!n)return;_e({eventId:n,recurrenceId:t.recurrenceId,siteId:e.siteId,onSave:()=>void _()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{s(null)}},ee=async t=>{if(window.confirm(l(`Remove everything this occurrence changes?`))){s(t.recurrenceId);try{let n=await yr(r.current);if(!n)return;let i=await ve(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:n,siteId:e.siteId,recurrenceId:t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||l(`Couldn’t reset the occurrence.`));return}await _()}catch{Craft.cp.displayError(l(`Couldn’t reset the occurrence.`))}finally{s(null)}}};return(0,X.jsx)(Cr,{ref:r,children:i.length>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(`h3`,{children:l(`Edited occurrences`)}),(0,X.jsx)(`p`,{children:l(`Occurrences with their own changes. Changes made here go live with the event.`)}),i.some(y)&&(0,X.jsx)(`p`,{className:`warning`,children:l(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,X.jsx)(wr,{children:i.map(e=>(0,X.jsxs)(Tr,{className:E(y(e)&&`is-orphaned`),children:[(0,X.jsxs)(`div`,{className:`details`,children:[(0,X.jsxs)(`div`,{className:`date`,children:[h(e),e.cancelled&&(0,X.jsx)(`span`,{className:`state`,children:l(`Cancelled`)}),y(e)&&(0,X.jsx)(`span`,{className:`state`,children:l(`No longer on the schedule`)})]}),e.title&&(0,X.jsx)(`div`,{className:`title`,children:e.title}),e.changes.length>0&&(0,X.jsx)(`div`,{className:`changes`,children:e.changes.join(`, `)})]}),(0,X.jsxs)(`div`,{className:`actions`,children:[!y(e)&&(0,X.jsx)(_r,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":l(`Edit occurrence on {date}`,{date:h(e)}),title:l(`Edit occurrence`),disabled:o!==null,onClick:()=>void b(e)}),(0,X.jsx)(`button`,{type:`button`,className:E(`btn small`,o!==null&&`disabled`),disabled:o!==null,onClick:()=>void ee(e),children:l(`Discard`)})]})]},e.recurrenceId))})]})})},kr=r.div`
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
`,Ar=r.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  margin-top: 10px;
  width: 455px;
  max-width: 100%;
  box-sizing: border-box;
`,jr=r.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,Mr=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Nr=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Pr=r.div`
  min-width: max-content;
  flex: 1;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,Fr=r.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,Ir=r.li`
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
`,Lr=8,Rr=({context:e,onOccurrenceSaved:n})=>{let r=(0,M.useRef)(null),[i,a]=(0,M.useState)(!1),o=P(),s=F(Y.weekStartDay),c=F(Y.formats)?.date.short.icu??`P`,u=F(J.state),{start:f,rrule:p}=u,h=!!(e?.eventId&&p),[_,v]=(0,M.useState)(null),y=(0,M.useMemo)(()=>re(p,f),[p,f]),b=(0,M.useMemo)(()=>le(y,_),[y,_]),x=(0,M.useMemo)(()=>ee(y,_?.start??null,Lr),[y,_]),S=(0,M.useMemo)(()=>ue(y,c),[y,c]),ne=(0,M.useMemo)(()=>{let e=oe(y,x.length);return e?se(e):null},[y,x]),C=(0,M.useCallback)((e,t,n)=>{o(q.setRRule(de(u,y,e,t,n)))},[o,y,u]),w=(0,M.useCallback)(e=>{let t=ie(y,e);if(t){let{timestamp:n}=fe(y,e);C(t,n,t===`exdate`)}},[C,y]),ae=(0,M.useCallback)(e=>{let t=fe(y,e);if(t.base&&t.excluded){C(`exdate`,t.timestamp,!1);return}if(t.full){w(e);return}t.full||C(`rdate`,t.timestamp,!0)},[C,y,w]),ce=(0,M.useCallback)(e=>fe(y,e),[y]),pe=async t=>{if(!(!e||i)){a(!0);try{_e({eventId:await yr(r.current),recurrenceId:t,siteId:e.siteId,onSave:()=>n?.()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{a(!1)}}};return(0,X.jsx)(kr,{ref:r,children:(0,X.jsxs)(k,{children:[(0,X.jsxs)(A,{$direction:`column`,$gap:10,children:[(0,X.jsx)(jr,{children:l(`Schedule Preview`)}),S&&(0,X.jsx)(Mr,{children:S})]}),(0,X.jsxs)(Ar,{children:[(0,X.jsxs)(A,{$direction:`column`,$gap:10,children:[(0,X.jsx)(ye,{...m(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[be,xe],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(d().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:s,timeZone:`UTC`,eventDisplay:`none`,events:b,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>v({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=ce(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>ae(e.date)}),ne&&(0,X.jsx)(Nr,{children:ne})]}),(0,X.jsx)(Pr,{children:x.length===0?(0,X.jsxs)(`p`,{children:[l(`No occurrences starting from`),(0,X.jsx)(`br`,{}),D(t(_?.currentStart??new Date),`PP`,{locale:d()})]}):(0,X.jsx)(Fr,{$count:x.length,children:x.map(e=>{let n=new Date(e*1e3),r=D(t(n),c,{locale:d()}),a=ie(y,n),o=h?te(y,n):null,s=l(a===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:r});return(0,X.jsxs)(Ir,{children:[(0,X.jsx)(`span`,{children:r}),(0,X.jsxs)(`div`,{className:`occurrence-actions`,children:[o&&(0,X.jsx)(_r,{type:`button`,className:`icon occurrence-edit`,"data-icon":`edit`,"aria-label":l(`Edit occurrence on {date}`,{date:r}),title:l(`Edit occurrence`),disabled:i,onClick:()=>void pe(o)}),a&&(0,X.jsx)(_r,{type:`button`,className:`icon occurrence-remove`,"data-icon":`remove`,disabled:i,"aria-label":s,title:s,onClick:()=>w(n)})]})]},g(n))})})})]})]})})},zr=r.div`
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
`,Br=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,Vr=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,Hr=e=>h(Ae(o(e),1)),Ur=(e,t,n)=>{let r=Gr(t,n);return e.getTime()>=r.getTime()},Wr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return h(Ce(j(o(e)),1));let i=o(e),a=Gr(t,r);return i.getTime()>=a.getTime()?e:h(a)},Gr=(e,t)=>je(o(e),t),Kr=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},qr=({inputValue:e,value:t,min:n})=>{let r=Kr(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Jr=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,M.useState)(e?.toString()??``),o=(0,M.useRef)(void 0),s=(0,M.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,M.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,M.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,M.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,M.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Kr(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,M.useCallback)(n=>{n.stopPropagation();let r=qr({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Yr=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Jr({value:e,min:t,debounceMs:n,onChange:r});return(0,X.jsx)(k,{...i,children:(0,X.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Xr=()=>null,Z=[{value:`MO`,label:`Monday`,days:[y.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[y.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[y.WE.weekday]},{value:`TH`,label:`Thursday`,days:[y.TH.weekday]},{value:`FR`,label:`Friday`,days:[y.FR.weekday]},{value:`SA`,label:`Saturday`,days:[y.SA.weekday]},{value:`SU`,label:`Sunday`,days:[y.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[y.MO.weekday,y.TU.weekday,y.WE.weekday,y.TH.weekday,y.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[y.SA.weekday,y.SU.weekday]}],Zr=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},Qr=(e,t)=>{let n=Zr(e),r=Zr(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},$r=(e,t)=>{if(e){let t=Z.find(t=>Qr(t.days,e));if(t)return t.value}if(t!==void 0){let e=Z.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return Z[0].value},ei=e=>Z.find(t=>t.value===e)?.days??[y.MO.weekday],Q=`5px`,ti=r.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,ni=r(ti)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,ri=r(ti)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,ii=r.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,ai=r(ii)`
  grid-template-columns: repeat(7, 1fr);

  ${ti} {
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
`,oi=r(ii)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${ti} {
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
`,si=r(ii)`
  grid-template-columns: repeat(4, 1fr);

  ${ti} {
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
`,ci=({label:e,values:t,onChange:n})=>(0,X.jsx)(k,{label:e,children:(0,X.jsxs)(ai,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,X.jsx)(ni,{type:`button`,className:E(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,X.jsx)(ri,{},e))]})}),li=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],ui=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],di=()=>{let e=P(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=F(J.state),a=o(t),s=a.getDate(),c=(a.getDay()+6)%7,l=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[s],d=i?.[0]??1,f=$r(r,c),p=t=>{e(q.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(q.setByRules({bymonthday:void 0,byweekday:ei(t),bysetpos:[n]}))};return(0,X.jsxs)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(O,{translateOptions:!0,label:`Repeat on`,value:l,options:li,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,X.jsx)(ci,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,X.jsxs)(A,{children:[(0,X.jsx)(O,{translateOptions:!0,label:`Position`,value:d,options:ui,onChange:e=>m(f,Number.parseInt(e,10))}),(0,X.jsx)(O,{translateOptions:!0,label:`Day`,value:f,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},fi=[{weekday:y.SU,label:`Sun`},{weekday:y.MO,label:`Mon`},{weekday:y.TU,label:`Tue`},{weekday:y.WE,label:`Wed`},{weekday:y.TH,label:`Thu`},{weekday:y.FR,label:`Fri`},{weekday:y.SA,label:`Sat`}],pi=()=>{let e=P(),{byweekday:t}=F(J.state);return(0,X.jsx)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,X.jsx)(k,{label:`On`,children:(0,X.jsx)(oi,{children:fi.map(({weekday:n,label:r})=>(0,X.jsx)(ni,{type:`button`,className:E(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(q.setDays({type:`byweekday`,values:r}))},children:l(r)},n.weekday))})})})},mi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],hi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],gi=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],_i=()=>{let e=P(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=F(J.state),s=o(t),c=s.getDate(),u=s.getMonth()+1,d=(s.getDay()+6)%7,f=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,p=r?.length?r:[c],m=n?.length?n:[u],h=a?.[0]??1,g=$r(i,d),_=(t,n)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(t,n,r)=>{e(q.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:ei(n),bysetpos:[r]}))};return(0,X.jsxs)(A,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(k,{label:`Month`,children:(0,X.jsx)(si,{children:gi.map(e=>{let t=m.includes(e.value);return(0,X.jsx)(ni,{type:`button`,className:E(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:l(e.label)},e.value)})})}),(0,X.jsx)(O,{translateOptions:!0,label:`Repeat on`,value:f,options:mi,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,X.jsx)(ci,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,X.jsxs)(A,{children:[(0,X.jsx)(O,{translateOptions:!0,label:`Position`,value:h,options:hi,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,X.jsx)(O,{translateOptions:!0,label:`Day`,value:g,options:Z.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},vi=()=>{let{freq:e}=F(J.state);return e===_.DAILY?(0,X.jsx)(Xr,{}):e===_.WEEKLY?(0,X.jsx)(pi,{}):e===_.MONTHLY?(0,X.jsx)(di,{}):e===_.YEARLY?(0,X.jsx)(_i,{}):null},yi=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),bi=e=>(0,X.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,X.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),xi=()=>{let e=P(),{interval:t}=F(J.state);return(0,X.jsxs)(Si,{children:[(0,X.jsx)(`span`,{children:l(`Every`)}),(0,X.jsx)(Ci,{"aria-label":l(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(q.setInterval(n))}}),(0,X.jsxs)(wi,{children:[(0,X.jsx)(Ti,{type:`button`,"aria-label":l(`Increase interval`),onClick:()=>e(q.setInterval(t+1)),children:(0,X.jsx)(bi,{})}),(0,X.jsx)(Ti,{type:`button`,"aria-label":l(`Decrease interval`),onClick:()=>e(q.setInterval(t-1)),children:(0,X.jsx)(yi,{})})]})]})},Si=r.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,Ci=r.input`
  width: 60px;
`,wi=r.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Ti=r.button`
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
`,Ei=me({position:[`bottom`,`top`],alignment:`end`,padding:8}),Di=(e,t,n,r)=>{let[i,a]=(0,M.useState)();return(0,M.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=v({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Ei}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},Oi=(e,t,n)=>{(0,M.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},ki=r.div`
  padding-top: 18px;
  width: 100%;
`,Ai=r.div`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`,ji=r.p`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 400;
`,Mi=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ni=r.div`
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
`,Pi=r.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Fi=r.div`
  position: relative;
  flex-shrink: 0;
`,Ii=r.button`
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
`,Li=r.div`
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
`,Ri=r.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,zi=r.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Bi=r.li`
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
`,Vi=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:p})=>{let[m,g]=(0,M.useState)(!1),_=(0,M.useRef)(null),v=(0,M.useRef)(null),y=(0,M.useRef)(null),b=Di(m,v,y,_);return(0,M.useEffect)(()=>{a.length===0&&g(!1)},[a.length]),Oi(m,[v,y],()=>g(!1)),(0,X.jsxs)(ki,{children:[(0,X.jsx)(Ai,{children:l(e)}),t&&(0,X.jsx)(ji,{children:l(t)}),(0,X.jsxs)(Mi,{children:[(0,X.jsxs)(Fi,{ref:_,children:[(0,X.jsx)(Ii,{ref:v,type:`button`,disabled:a.length===0,className:E({active:m}),onClick:()=>{a.length!==0&&g(e=>!e)},children:a.length}),m&&(0,X.jsxs)(Li,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,X.jsx)(Ri,{children:l(i)}),(0,X.jsx)(zi,{children:a.map(e=>(0,X.jsxs)(Bi,{children:[(0,X.jsx)(`span`,{children:c(e)}),(0,X.jsx)(`button`,{type:`button`,"aria-label":l(`Remove date {date}`,{date:c(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,X.jsx)(Ni,{children:(0,X.jsx)(we,{...f(),selected:null,onChange:e=>{e&&d(h(j(e)))},customInput:(0,X.jsx)(Hi,{label:n,className:E(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:l(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},Hi=(0,M.forwardRef)(({label:e,...t},n)=>(0,X.jsx)(Pi,{type:`button`,ref:n,...t,children:l(e)}));Hi.displayName=`PickerTrigger`;var Ui=r.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,Wi=()=>{let e=P(),n=F(J.state),{start:r,rrule:i}=n,a=(0,M.useMemo)(()=>re(i,r),[i,r]),{startTimestamp:o,baseRule:l,recurrenceSet:u}=a,d=(0,M.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>h(j(t(e)))).filter(e=>l?!0:e!==o))).sort((e,t)=>e-t):[],[l,u,o]),f=(0,M.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>h(j(t(e)))))).sort((e,t)=>e-t):[],[u]),p=(0,M.useMemo)(()=>new Set(d),[d]),m=(0,M.useMemo)(()=>new Set(f),[f]),g=(0,M.useCallback)(e=>{let t=s(j(e)),n=c(Ee(e)),r=l?l.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:h(j(e))===o;return{full:i,base:r,excluded:r&&!i}},[l,u,o]),_=r=>{let i=r({baseRule:l,rdates:u?.rdates().filter(e=>l?!0:h(j(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(q.setRRule(ae(n,i.baseRule,Gi(i.rdates),Gi(i.exdates))))};return{addedDates:d,excludedDates:f,addFixedDate:(e,t)=>{if(e===`exdate`&&S(a,t))return;let r=ce(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:b(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&S(a,t))return;let r=ce(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?b(n,r):n,exdates:e===`exdate`?b(i,r):i}))},canAddOccurrence:(0,M.useCallback)(e=>{let t=h(j(e)),n=g(e);return!n.full&&!n.excluded&&!p.has(t)},[p,g]),canExcludeOccurrence:(0,M.useCallback)(e=>{let t=h(j(e)),n=g(e);return n.base&&!n.excluded&&!m.has(t)&&!S(a,t)},[m,g,a]),getStatus:g}},Gi=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},Ki=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],qi=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Ji=e=>[{value:_.DAILY,label:e?`Days`:`Day`},{value:_.WEEKLY,label:e?`Weeks`:`Week`},{value:_.MONTHLY,label:e?`Months`:`Month`},{value:_.YEARLY,label:e?`Years`:`Year`}],Yi=300,Xi=()=>{let e=P(),t=F(J.state),n=F(Y.weekStartDay),r=F(Y.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:s,until:c,freq:l,start:u,interval:f}=t,p=i!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=Wi(),b=(0,M.useMemo)(()=>o(u),[u]),ee=e=>D(o(e),r,{locale:d()});return(0,X.jsxs)(Ui,{children:[(0,X.jsxs)(A,{$alignItems:`end`,style:{width:`100%`},children:[(0,X.jsx)(O,{translateOptions:!0,label:`Repeats`,value:i,options:Ki,onChange:t=>e(q.setRepeatType(t))}),i===`CUSTOM`&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)(xi,{}),(0,X.jsx)(O,{translateOptions:!0,label:``,value:l,options:Ji(f>1),onChange:t=>e(q.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,X.jsx)(vi,{}),i!==`NEVER`&&(0,X.jsxs)(A,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,X.jsx)(O,{translateOptions:!0,label:`Ends`,options:qi,value:a,onChange:t=>e(q.setRepeatEndType(t))}),a===`AFTER`&&(0,X.jsx)(Yr,{label:`Times`,value:s,min:1,debounceMs:Yi,onChange:t=>e(q.setCount(t))}),a===`ON_DATE`&&(0,X.jsx)(De,{label:``,value:c||null,onChange:t=>e(q.setUntil(t)),datePickerProps:{dateFormat:r,showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:b}})]}),(0,X.jsxs)(A,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,X.jsx)(Vi,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:ee,filterDate:v,weekStartDay:n,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),p&&(0,X.jsx)(Vi,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:ee,filterDate:y,weekStartDay:n,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},Zi=({context:e,onOccurrenceSaved:t})=>{let n=(0,M.useId)(),r=(0,M.useId)(),i=(0,M.useId)(),[a,s]=(0,M.useState)(0),c=P(),{start:u,end:d,allDay:f}=F(J.state),{date:p,time:m,datetime:h}=F(Y.formats),g=F(Y.weekStartDay),_=F(Y.timeInterval),v=F(Y.eventDuration),y=(0,M.useMemo)(()=>f?p.short.icu:h.short.icu,[f,p,h]),b=(0,M.useMemo)(()=>f?Hr(d):d,[f,d]);return(0,X.jsxs)(zr,{children:[(0,X.jsxs)(Br,{children:[(0,X.jsxs)(Vr,{children:[(0,X.jsx)(De,{id:r,label:`Starts`,value:u,onChange:e=>c(q.setStart(e)),datePickerProps:{id:r,showIcon:!0,icon:(0,X.jsx)(ke,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!f,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:y,timeFormat:m.short.icu,todayButton:l(`Today`),calendarStartDay:g,timeIntervals:_}}),(0,X.jsx)(De,{id:i,label:`Ends`,value:b,onChange:e=>{e!=null&&c(q.setEnd(Wr({value:e,start:u,allDay:f,timeInterval:_})))},datePickerProps:{id:i,showIcon:!0,icon:(0,X.jsx)(ke,{}),toggleCalendarOnIconClick:!0,minDate:o(u),showTimeSelect:!f,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:y,timeFormat:m.short.icu,todayButton:l(`Today`),calendarStartDay:g,timeIntervals:_,filterTime:e=>Ur(new Date(e),u,_)}}),(0,X.jsx)(Oe,{id:n,label:`All Day`,enabled:f,style:{margin:0},onClick:e=>c(q.setAllDay({enabled:e,eventDuration:v}))})]}),(0,X.jsx)(Xi,{}),e?.eventId&&(0,X.jsx)(Or,{context:e,refreshKey:a})]}),(0,X.jsx)(Rr,{context:e,onOccurrenceSaved:()=>{s(e=>e+1),t?.()}})]})},Qi=r.div`
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
`,$i=r.div`
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
`,ea=({context:e})=>{let{allDay:n}=F(J.state),r=F(Y.formats),i=(e,n=!1)=>D(t(new Date(e*1e3)),n?r?.datetime.short.icu??`Pp`:r?.date.short.icu??`P`,{locale:d()}),{splitAt:a,series:o}=e,s=o?.earlier??null,c=o?.later??null;return!a&&!s&&!c?null:(0,X.jsxs)($i,{children:[a&&(0,X.jsx)(`p`,{children:l(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:i(a,!n)})}),(s||c)&&(0,X.jsxs)(`nav`,{children:[(0,X.jsx)(`span`,{children:l(`Part of a series`)}),s&&(0,X.jsxs)(`a`,{href:s.url,children:[`← `,l(`Earlier part, from {date}`,{date:i(s.start)})]}),c&&(0,X.jsxs)(`a`,{href:c.url,children:[l(`Later part, from {date}`,{date:i(c.start)}),` →`]})]})]})},ta=({context:e})=>{let{rrule:n}=F(J.state),r=(0,M.useMemo)(nt,[]),i=n?he(n,{forceset:!0}).all((e,t)=>t<10).map(e=>`${D(t(e),`yyyy-MM-dd HH:mm`)} [${Me(e)}]`):[];return(0,X.jsxs)(Qi,{children:[e&&(0,X.jsx)(ea,{context:e}),(0,X.jsx)(Zi,{context:e}),r&&(0,X.jsxs)(`code`,{children:[(0,X.jsx)(`pre`,{children:n}),(0,X.jsx)(`pre`,{children:JSON.stringify(i,null,2)})]})]})},na=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,ra(n)),$(t,`end`,ra(r)),$(t,`until`,i?ra(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},ra=e=>D(o(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},ia=e=>{let t=x(e.event.rrule),{byweekday:n,bysetpos:r}=dr(t?.options.byweekday),i=fr(e.event.repeatType),a=pr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||_.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?mr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Vn({reducer:{app:Sr,event:gr},preloadedState:o})},aa=new WeakSet,oa=e=>{if(aa.has(e))return;aa.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=ia(r),a=Fe.createRoot(n);i.subscribe(()=>{na(i,e)}),na(i,e),a.render((0,X.jsx)(Je,{store:i,children:(0,X.jsx)(ta,{context:r.context})}))},sa=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(oa)},ca=()=>{sa(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&oa(e),sa(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ca):ca();