import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,g as c,i as l,j as u,n as d,r as f,s as p,t as m,v as h,y as g}from"./localization-Dt_HqhpZ.js";import{C as _,E as v,S as y,_ as b,a as ee,b as x,c as te,d as ne,f as S,g as C,h as w,i as re,l as ie,m as ae,n as oe,o as se,p as ce,r as le,s as ue,t as de,u as fe,v as pe,w as me,x as he,y as ge}from"./calendar-preview.operations-Cdbhjdve.js";import{c as _e,d as ve,f as ye,p as be}from"./calendar.events-BsoNrhOC.js";import{t as xe}from"./interaction-CRxFL9NJ.js";import{a as Se,b as Ce,c as we,f as Te,g as Ee,h as T,i as De,l as E,m as D,n as Oe,o as ke,p as Ae,r as O,s as je,t as k,v as Me,y as A}from"./components-B8LQaiF0.js";function Ne(e,t){let n=p(e,t?.in);if(isNaN(+n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=``,s=r===`extended`?`-`:``,c=r===`extended`?`:`:``;if(i!==`time`){let e=T(n.getDate(),2),t=T(n.getMonth()+1,2);a=`${T(n.getFullYear(),4)}${s}${t}${s}${e}`}if(i!==`date`){let e=n.getTimezoneOffset();if(e!==0){let t=Math.abs(e),n=T(Math.trunc(t/60),2),r=T(t%60,2);o=`${e<0?`+`:`-`}${n}:${r}`}else o=`Z`;let t=T(n.getHours(),2),r=T(n.getMinutes(),2),i=T(n.getSeconds(),2),s=a===``?``:`T`,l=[t,r,i].join(c);a=`${a}${s}${l}${o}`}return a}var Pe=u((t=>{var n=e();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=n.useRef,s=n.useEffect,c=n.useMemo,l=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),Fe=u(((e,t)=>{t.exports=Pe()})),Ie=i(n()),j=i(e(),1),Le=Fe();function Re(e){e()}function ze(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Re(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var Be={notify(){},get:()=>[]};function Ve(e,t){let n,r=Be,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=ze())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=Be)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var He=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ue=typeof navigator<`u`&&navigator.product===`ReactNative`,We=He||Ue?j.useLayoutEffect:j.useEffect,Ge=Symbol.for(`react-redux-context`),Ke=typeof globalThis<`u`?globalThis:{};function qe(){if(!j.createContext)return{};let e=Ke[Ge]??(Ke[Ge]=new Map),t=e.get(j.createContext);return t||(t=j.createContext(null),e.set(j.createContext,t)),t}var M=qe();function Je(e){let{children:t,context:n,serverState:r,store:i}=e,a=j.useMemo(()=>{let e=Ve(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=j.useMemo(()=>i.getState(),[i]);We(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||M;return j.createElement(s.Provider,{value:a},t)}var Ye=Je;function Xe(e=M){return function(){return j.useContext(e)}}var Ze=Xe();function Qe(e=M){let t=e===M?Ze:Xe(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var $e=Qe();function et(e=M){let t=e===M?$e:Qe(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var N=et(),tt=(e,t)=>e===t;function nt(e=M){let t=e===M?Ze:Xe(e),n=(e,n={})=>{let{equalityFn:r=tt}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();j.useRef(!0);let s=j.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,Le.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return j.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var P=nt(),rt=()=>!1;function F(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var it=typeof Symbol==`function`&&Symbol.observable||`@@observable`,at=()=>Math.random().toString(36).substring(7).split(``).join(`.`),ot={INIT:`@@redux/INIT${at()}`,REPLACE:`@@redux/REPLACE${at()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${at()}`};function st(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function ct(e,t,n){if(typeof e!=`function`)throw Error(F(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(F(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(F(1));return n(ct)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(F(3));return i}function d(e){if(typeof e!=`function`)throw Error(F(4));if(c)throw Error(F(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(F(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!st(e))throw Error(F(7));if(e.type===void 0)throw Error(F(8));if(typeof e.type!=`string`)throw Error(F(17));if(c)throw Error(F(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(F(10));r=e,f({type:ot.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(F(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[it](){return this}}}return f({type:ot.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[it]:m}}function lt(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:ot.INIT})===void 0)throw Error(F(12));if(n(void 0,{type:ot.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(F(13))})}function ut(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{lt(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(F(14));o[s]=u,a=a||u!==l}return a=a||r.length!==Object.keys(e).length,a?o:e}}function dt(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function ft(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(F(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=dt(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function pt(e){return st(e)&&`type`in e&&typeof e.type==`string`}var mt=Symbol.for(`immer-nothing`),ht=Symbol.for(`immer-draftable`),I=Symbol.for(`immer-state`);function L(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var R=Object,z=R.getPrototypeOf,gt=`constructor`,_t=`prototype`,vt=`configurable`,yt=`enumerable`,bt=`writable`,xt=`value`,B=e=>!!e&&!!e[I];function V(e){return e?wt(e)||jt(e)||!!e[ht]||!!e[gt]?.[ht]||Mt(e)||Nt(e):!1}var St=R[_t][gt].toString(),Ct=new WeakMap;function wt(e){if(!e||!Pt(e))return!1;let t=z(e);if(t===null||t===R[_t])return!0;let n=R.hasOwnProperty.call(t,gt)&&t[gt];if(n===Object)return!0;if(!H(n))return!1;let r=Ct.get(n);return r===void 0&&(r=Function.toString.call(n),Ct.set(n,r)),r===St}function Tt(e,t,n=!0){Et(e)===0?(n?Reflect.ownKeys(e):R.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function Et(e){let t=e[I];return t?t.type_:jt(e)?1:Mt(e)?2:Nt(e)?3:0}var Dt=(e,t,n=Et(e))=>n===2?e.has(t):R[_t].hasOwnProperty.call(e,t),Ot=(e,t,n=Et(e))=>n===2?e.get(t):e[t],kt=(e,t,n,r=Et(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function At(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var jt=Array.isArray,Mt=e=>e instanceof Map,Nt=e=>e instanceof Set,Pt=e=>typeof e==`object`,H=e=>typeof e==`function`,Ft=e=>typeof e==`boolean`;function It(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var U=e=>e.copy_||e.base_,Lt=e=>e.modified_?e.copy_:e.base_;function Rt(e,t){if(Mt(e))return new Map(e);if(Nt(e))return new Set(e);if(jt(e))return Array[_t].slice.call(e);let n=wt(e);if(t===!0||t===`class_only`&&!n){let t=R.getOwnPropertyDescriptors(e);delete t[I];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[bt]===!1&&(a[bt]=!0,a[vt]=!0),(a.get||a.set)&&(t[i]={[vt]:!0,[bt]:!0,[yt]:a[yt],[xt]:e[i]})}return R.create(z(e),t)}else{let t=z(e);if(t!==null&&n)return{...e};let r=R.create(t);return R.assign(r,e)}}function zt(e,t=!1){return Ht(e)||B(e)||!V(e)?e:(Et(e)>1&&R.defineProperties(e,{set:Vt,add:Vt,clear:Vt,delete:Vt}),R.freeze(e),t&&Tt(e,(e,t)=>{zt(t,!0)},!1),e)}function Bt(){L(2)}var Vt={[xt]:Bt};function Ht(e){return e===null||!Pt(e)?!0:R.isFrozen(e)}var Ut=`MapSet`,Wt=`Patches`,Gt=`ArrayMethods`,Kt={};function W(e){let t=Kt[e];return t||L(0,e),t}var qt=e=>!!Kt[e],Jt,Yt=()=>Jt,Xt=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:qt(Ut)?W(Ut):void 0,arrayMethodsPlugin_:qt(Gt)?W(Gt):void 0});function Zt(e,t){t&&(e.patchPlugin_=W(Wt),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Qt(e){$t(e),e.drafts_.forEach(tn),e.drafts_=null}function $t(e){e===Jt&&(Jt=e.parent_)}var en=e=>Jt=Xt(Jt,e);function tn(e){let t=e[I];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function nn(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[I].modified_&&(Qt(t),L(4)),V(e)&&(e=rn(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[I].base_,e,t)}else e=rn(t,n);return an(t,e,!0),Qt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===mt?void 0:e}function rn(e,t){if(Ht(t))return t;let n=t[I];if(!n)return pn(t,e.handledSet_,e);if(!sn(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);dn(n,e)}return n.copy_}function an(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&zt(t,n)}function on(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var sn=(e,t)=>e.scope_===t,cn=[];function ln(e,t,n,r){let i=U(e),a=e.type_;if(r!==void 0&&Ot(i,r,a)===t){kt(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;Tt(i,(e,n)=>{if(B(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??cn;for(let e of o)kt(i,e,n,a)}function un(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!sn(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=Lt(i);ln(e,i.draft_??i,a,n),dn(i,r)})}function dn(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}on(e)}}function fn(e,t,n){let{scope_:r}=e;if(B(n)){let i=n[I];sn(i,r)&&i.callbacks_.push(function(){xn(e),ln(e,n,Lt(i),t)})}else V(n)&&e.callbacks_.push(function(){let i=U(e);e.type_===3?i.has(n)&&pn(n,r.handledSet_,r):Ot(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&pn(Ot(e.copy_,t,e.type_),r.handledSet_,r)})}function pn(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||B(e)||t.has(e)||!V(e)||Ht(e)?e:(t.add(e),Tt(e,(r,i)=>{if(B(i)){let t=i[I];sn(t,n)&&(kt(e,r,Lt(t),e.type_),on(t))}else V(i)&&pn(i,t,n)}),e)}function mn(e,t){let n=jt(e),r={type_:+!!n,scope_:t?t.scope_:Yt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=hn;n&&(i=[r],a=gn);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var hn={get(e,t){if(t===I)return e;if(t===`constructor`||t===`__proto__`){let n=U(e)[t];return new Proxy(n||{},{get:(e,t)=>t===`__proto__`||t===`prototype`?Object.freeze(Object.create(null)):Reflect.get(e,t),set:()=>!0,apply:(e,t,n)=>Reflect.apply(e,t,n)})}let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=U(e);if(!Dt(i,t,e.type_))return vn(e,i,t);let a=i[t];if(e.finalized_||!V(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&It(t))return a;if(a===_n(e.base_,t)){xn(e);let n=e.type_===1?+t:t,r=Cn(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t===`constructor`||t===`__proto__`||t===`prototype`?!1:t in U(e)},ownKeys(e){return Reflect.ownKeys(U(e))},set(e,t,n){if(t===`constructor`||t===`__proto__`||t===`prototype`)return!0;let r=yn(U(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=_n(U(e),t),i=r?.[I];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(At(n,r)&&(n!==void 0||Dt(e.base_,t,e.type_)))return!0;xn(e),bn(e)}return e.copy_[t]===n&&(n!==void 0||Dt(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])?!0:(e.copy_[t]=n,e.assigned_.set(t,!0),fn(e,t,n),!0)},deleteProperty(e,t){return xn(e),_n(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),bn(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=U(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[bt]:!0,[vt]:e.type_!==1||t!==`length`,[yt]:r[yt],[xt]:n[t]}},defineProperty(){L(11)},getPrototypeOf(e){return z(e.base_)},setPrototypeOf(){L(12)}},gn={};for(let e in hn){let t=hn[e];gn[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}gn.deleteProperty=function(e,t){return gn.set.call(this,e,t,void 0)},gn.set=function(e,t,n){return hn.set.call(this,e[0],t,n,e[0])};function _n(e,t){let n=e[I];return(n?U(n):e)[t]}function vn(e,t,n){let r=yn(t,n);return r?xt in r?r[xt]:r.get?.call(e.draft_):void 0}function yn(e,t){if(!(t in e))return;let n=z(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=z(n)}}function bn(e){e.modified_||(e.modified_=!0,e.parent_&&bn(e.parent_))}function xn(e){e.copy_||(e.assigned_=new Map,e.copy_=Rt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var Sn=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(H(e)&&!H(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}H(t)||L(6),n!==void 0&&!H(n)&&L(7);let r;if(V(e)){let i=en(this),a=Cn(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?Qt(i):$t(i)}return Zt(i,n),nn(r,i)}else if(!e||!Pt(e)){if(r=t(e),r===void 0&&(r=e),r===mt&&(r=void 0),this.autoFreeze_&&zt(r,!0),n){let t=[],i=[];W(Wt).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}else L(1,e)},this.produceWithPatches=(e,t)=>{if(H(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Ft(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Ft(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Ft(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){V(e)||L(8),B(e)&&(e=wn(e));let t=en(this),n=Cn(t,e,void 0);return n[I].isManual_=!0,$t(t),n}finishDraft(e,t){let n=e&&e[I];(!n||!n.isManual_)&&L(9);let{scope_:r}=n;return Zt(r,t),nn(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=W(Wt).applyPatches_;return B(e)?r(e,t):this.produce(e,e=>r(e,t))}};function Cn(e,t,n,r){let[i,a]=Mt(t)?W(Ut).proxyMap_(t,n):Nt(t)?W(Ut).proxySet_(t,n):mn(t,n);return(n?.scope_??Yt()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?un(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function wn(e){return B(e)||L(10,e),Tn(e)}function Tn(e){if(!V(e)||Ht(e))return e;let t=e[I],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Rt(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Rt(e,!0);return Tt(n,(e,t)=>{kt(n,e,Tn(t))},r),t&&(t.finalized_=!1),n}var En=new Sn().produce;function Dn(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var On=Dn(),kn=Dn,An=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?dt:dt.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function jn(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(G(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>pt(t)&&t.type===e,n}var Mn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Nn(e){return V(e)?En(e,()=>{}):e}function Pn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Fn(e){return typeof e==`boolean`}var In=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new Mn;return t&&(Fn(t)?a.push(On):a.push(kn(t.extraArgument))),a},Ln=`RTK_autoBatch`,Rn=e=>t=>{setTimeout(t,e)},zn=(e,t)=>n=>{let r=!1,i=()=>{r||(r=!0,cancelAnimationFrame(a),clearTimeout(o),n())},a=e(i),o=setTimeout(i,t)},Bn=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?zn(window.requestAnimationFrame,100):Rn(10):e.type===`callback`?e.queueNotification:Rn(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[Ln],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Vn=e=>function(t){let{autoBatch:n=!0}=t??{},r=new Mn(e);return n&&r.push(Bn(typeof n==`object`?n:void 0)),r};function Hn(e){let t=In(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(st(n))c=ut(n);else throw Error(G(1));let l;l=typeof r==`function`?r(t):t();let u=dt;i&&(u=An({trace:!1,...typeof i==`object`&&i}));let d=Vn(ft(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return ct(c,o,p)}function Un(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(G(28));if(r in t)throw Error(G(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Wn(e){return typeof e==`function`}function Gn(e,t){let[n,r,i]=Un(t),a;if(Wn(e))a=()=>Nn(e());else{let t=Nn(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n)if(B(e)){let r=n(e,t);return r===void 0?e:r}else if(V(e))return En(e,e=>n(e,t));else{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(`A case reducer on a non-draftable value must not return undefined`)}return r}return e},e)}return o.getInitialState=a,o}var Kn=Symbol.for(`rtk-slice-createasyncthunk`);function qn(e,t){return`${e}/${t}`}function Jn({creators:e}={}){let t=e?.asyncThunk?.[Kn];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(G(11));let i=(typeof e.reducers==`function`?e.reducers(Zn()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(G(12));if(n in o.sliceCaseReducersByType)throw Error(G(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:qn(n,r),createNotation:typeof e.reducers==`function`};$n(a)?tr(o,a,s,t):Qn(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Un(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return Gn(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||(f=c()),f(e,t)}function m(){return f||(f=c()),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=Pn(d,r,m)),i}function i(t=l){return Pn(Pn(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=Yn(a,t,()=>Pn(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function Yn(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var Xn=Jn();function Zn(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function Qn({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!er(r))throw Error(G(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?jn(e,o):jn(e))}function $n(e){return e._reducerDefinitionType===`asyncThunk`}function er(e){return e._reducerDefinitionType===`reducerWithPrepare`}function tr({type:e,reducerName:t},n,r,i){if(!i)throw Error(G(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||nr,pending:s||nr,rejected:c||nr,settled:l||nr})}function nr(){}var rr=`listener`,ir=`completed`,ar=`cancelled`;`${ar}`,`${ir}`,`${rr}${ar}`,`${rr}${ir}`;var{assign:or}=Object,sr=`listenerMiddleware`,cr=or(jn(`${sr}/add`),{withTypes:()=>cr});`${sr}`;var lr=or(jn(`${sr}/remove`),{withTypes:()=>lr});function G(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var ur=new Set([`DAILY`,`WEEKLY`,`MONTHLY`,`YEARLY`,`CUSTOM`,`NEVER`]),dr=new Set([`NEVER`,`AFTER`,`ON_DATE`]),fr=e=>{if(!e)return{};let t=Array.isArray(e)?e:[e],n=[],r=new Set;return t.forEach(e=>{if(typeof e==`number`){n.push(e);return}n.push(e.weekday),typeof e.n==`number`&&r.add(e.n)}),{byweekday:n.length?n:void 0,bysetpos:r.size?Array.from(r):void 0}},pr=e=>ur.has(e)?e:`NEVER`,mr=e=>dr.has(e)?e:`NEVER`,hr=e=>typeof e==`number`&&Number.isFinite(e)&&e>=1?e:1,gr=Xn({name:`event`,initialState:{start:Math.floor(Date.now()/1e3),end:Math.floor(Date.now()/1e3)+3600,until:void 0,allDay:!1,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,freq:_.DAILY,interval:1,count:void 0,byweekday:void 0,bymonth:void 0,bymonthday:void 0,byyearday:void 0,bysetpos:void 0},reducers:{setStart:(e,t)=>{let n=e.end-e.start,r=e.until?e.until-e.start:void 0;e.start=t.payload,e.end=e.start+n,e.until&&e.repeatEndType===`ON_DATE`&&(e.until=S(e,e.until)),r!==void 0&&(e.until=e.start+r),C(e)},setEnd:(e,t)=>{e.end=t.payload},setUntil:(e,t)=>{let n=t.payload;n==null?e.until=void 0:e.until=S(e,n),C(e)},setAllDay:(e,t)=>{let{enabled:n,eventDuration:r}=t.payload;e.allDay=n;let i=n?0:new Date().getUTCHours(),a=o(e.start);a.setHours(i,0,0,0),e.start=h(a);let s=o(e.end);n?s=Ce(A(s),1):(s=Ae(s,1),s=Te(s,a.getHours()),s=Me(s,r)),e.end=h(s),e.until&&e.repeatEndType===`ON_DATE`&&(e.until=S(e,e.until)),C(e)},setRepeatType:(e,t)=>{e.repeatType===`NEVER`&&t.payload!==`NEVER`&&(e.rrule=pe(e.rrule)),e.repeatType=t.payload,C(e)},setRepeatEndType:(e,t)=>{let n=t.payload;e.repeatEndType=n,n===`AFTER`?e.count=hr(e.count):e.count=null,C(e)},setFreq:(e,t)=>{e.freq=t.payload,ge(e,t.payload),C(e)},setCount:(e,t)=>{e.count=hr(t.payload),C(e)},setInterval:(e,t)=>{e.interval=Math.max(1,t.payload),C(e)},setDays:(e,t)=>{let{type:n,values:r}=t.payload;e[n]=w(r),C(e)},setByRules:(e,t)=>{let n=t.payload;`byweekday`in n&&(e.byweekday=w(n.byweekday)),`bymonth`in n&&(e.bymonth=w(n.bymonth)),`bymonthday`in n&&(e.bymonthday=w(n.bymonthday)),`byyearday`in n&&(e.byyearday=w(n.byyearday)),`bysetpos`in n&&(e.bysetpos=w(n.bysetpos)),C(e)},setRRule:(e,t)=>{e.rrule=t.payload||void 0}}}),{actions:K}=gr,_r=gr.reducer,q={state:e=>e.event},vr=e=>{let t=window.jQuery;if(!(!e||!t))return t(e).closest(`form`).data(`elementEditor`)},yr=async e=>{let t=vr(e);if(!t)throw Error(`The event editor is unavailable.`);return await t.ensureIsDraftOrRevision(),await t.checkForm(!1,!0),t.settings.elementId},br=r.div`
  &:empty {
    display: none;
  }

  margin-top: 20px;
  padding: 20px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg, var(--large-border-radius, 5px));
  background-color: var(--gray-050);

  h3 {
    margin: 0 0 4px;
    font-size: 14px;
    line-height: 20px;
  }

  > p {
    margin: 0 0 16px;
    color: var(--gray-600);
    font-size: 13px;
    line-height: 20px;
  }

  > p.warning {
    color: var(--error-color, #cf1124);
  }
`,xr=r.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--gray-200);
  border-radius: var(--large-border-radius, 5px);
  background-color: var(--custom-bg-color, var(--gray-050));
  overflow: hidden;
`,Sr=r.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  margin: 0;
  padding: 12px 16px;
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
    font-weight: 600;
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
    gap: 6px;

    .btn {
      min-height: 26px;
      padding-inline: 10px;
      font-size: 12px;
    }
  }

  @media (max-width: 600px) {
    padding: 12px;
  }
`,J=a(),Cr=[`start`,`end`,`until`,`timezone`,`allDay`,`repeatType`,`repeatEndType`,`rrule`],wr=e=>{let t=e?.closest(`[data-event-builder]`),n={};for(let e of Cr){let r=t?.querySelector(`input[name="${e}"]`);r&&(n[e]=r.value)}return n},Tr=e=>D(t(new Date(e.start*1e3)),e.allDay?`EEE, PP`:`EEE, PP, p`,{locale:d()}),Er=({context:e,refreshKey:t})=>{let n=(0,j.useRef)(null),[r,i]=(0,j.useState)([]),[a,o]=(0,j.useState)(null),[s,c]=(0,j.useState)(null),u=(0,j.useRef)(0),d=P(q.state),f=(0,j.useCallback)(()=>vr(n.current)?.settings.elementId??e.eventId,[e.eventId]),p=(0,j.useCallback)(async()=>{let t=f();if(!t)return;let n=new URL(Craft.getActionUrl(`calendar/occurrences/list`),window.location.origin);n.searchParams.set(`eventId`,String(t)),n.searchParams.set(`siteId`,String(e.siteId));let r=await ve(n,{headers:{Accept:`application/json`}});if(!r.ok)return;let a=await r.json();i(a.occurrences??[])},[e.siteId,f]);(0,j.useEffect)(()=>{p()},[p,t]);let m=(0,j.useCallback)(async()=>{let t=f();if(!t)return;let r=++u.current,i=await ve(Craft.getActionUrl(`calendar/occurrences/check-schedule`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:t,siteId:e.siteId,...wr(n.current)})});if(!i.ok)return;let a=await i.json();r===u.current&&c(new Set(a.orphaned??[]))},[e.siteId,f]);(0,j.useEffect)(()=>{if(r.length===0)return;let e=setTimeout(()=>void m(),400);return()=>clearTimeout(e)},[d,r.length,m]);let h=e=>s?s.has(e.recurrenceId):e.orphaned,g=async t=>{o(t.recurrenceId);try{let r=await yr(n.current);if(!r)return;_e({eventId:r,recurrenceId:t.recurrenceId,siteId:e.siteId,onSave:()=>void p()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{o(null)}},_=async t=>{if(window.confirm(l(`Remove everything this occurrence changes?`))){o(t.recurrenceId);try{let r=await yr(n.current);if(!r)return;let i=await ve(Craft.getActionUrl(`calendar/occurrences/reset`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify({eventId:r,siteId:e.siteId,recurrenceId:t.recurrenceId})});if(!i.ok){let e=await i.json().catch(()=>null);Craft.cp.displayError(e?.message||l(`Couldn’t reset the occurrence.`));return}await p()}catch{Craft.cp.displayError(l(`Couldn’t reset the occurrence.`))}finally{o(null)}}};return(0,J.jsx)(br,{ref:n,children:r.length>0&&(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(`h3`,{children:l(`Edited occurrences`)}),(0,J.jsx)(`p`,{children:l(`Occurrences with their own changes. Changes made here go live with the event.`)}),r.some(h)&&(0,J.jsx)(`p`,{className:`warning`,children:l(`Edited occurrences that don’t fall on the schedule are kept, but hidden, until you discard them.`)}),(0,J.jsx)(xr,{children:r.map(e=>(0,J.jsxs)(Sr,{className:E(h(e)&&`is-orphaned`),children:[(0,J.jsxs)(`div`,{className:`details`,children:[(0,J.jsxs)(`div`,{className:`date`,children:[Tr(e),e.cancelled&&(0,J.jsx)(`span`,{className:`state`,children:l(`Cancelled`)}),h(e)&&(0,J.jsx)(`span`,{className:`state`,children:l(`No longer on the schedule`)})]}),e.title&&(0,J.jsx)(`div`,{className:`title`,children:e.title}),e.changes.length>0&&(0,J.jsx)(`div`,{className:`changes`,children:e.changes.join(`, `)})]}),(0,J.jsxs)(`div`,{className:`actions`,children:[!h(e)&&(0,J.jsx)(`button`,{type:`button`,className:E(`btn small`,a!==null&&`disabled`),disabled:a!==null,onClick:()=>void g(e),children:l(`Edit`)}),(0,J.jsx)(`button`,{type:`button`,className:E(`btn small`,a!==null&&`disabled`),disabled:a!==null,onClick:()=>void _(e),children:l(`Discard`)})]})]},e.recurrenceId))})]})})},Dr=Xn({name:`app`,initialState:{pro:!1},reducers:{}}),{actions:Or}=Dr,kr=Dr.reducer,Y={config:e=>e.app,isPro:e=>e.app.pro,formats:e=>e.app.formats,weekStartDay:e=>e.app.weekStartDay??0,timeInterval:e=>e.app.timeInterval??30,eventDuration:e=>e.app.eventDuration??60,allDayDefault:e=>e.app.allDayDefault??!1,overlapThreshold:e=>e.app.overlapThreshold??0},Ar=r.div`
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
`,jr=r.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  margin-top: 10px;
  width: 455px;
  max-width: 100%;
  box-sizing: border-box;
`,Mr=r.h4`
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gray-700);
`,Nr=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Pr=r.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: var(--gray-600);
`,Fr=r.div`
  min-width: max-content;
  flex: 1;
  height: 100%;

  p {
    padding-top: 57px;
    word-wrap: break-word;
  }
`,Ir=r.ul`
  display: flex;
  flex-direction: column;
  justify-content: ${e=>e.$count>7?`space-between`:`start`};
  gap: 5px;

  margin: 0;
  padding: 0;
  list-style: none;
`,Lr=r.li`
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

  .occurrence-edit {
    flex-shrink: 0;
    min-height: 0;
    height: 20px;
    padding: 0 5px;
    font-size: 12px;
    line-height: 20px;
  }
`,Rr=r.button`
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
`,zr=8,Br=({context:e,onOccurrenceSaved:n})=>{let r=(0,j.useRef)(null),[i,a]=(0,j.useState)(!1),o=N(),s=P(Y.weekStartDay),c=P(Y.formats)?.date.short.icu??`P`,u=P(q.state),{start:f,rrule:p}=u,h=!!(e?.eventId&&p),[_,v]=(0,j.useState)(null),y=(0,j.useMemo)(()=>re(p,f),[p,f]),b=(0,j.useMemo)(()=>le(y,_),[y,_]),x=(0,j.useMemo)(()=>ee(y,_?.start??null,zr),[y,_]),ne=(0,j.useMemo)(()=>ue(y),[y]),S=(0,j.useMemo)(()=>{let e=oe(y,x.length);return e?se(e):null},[y,x]),C=(0,j.useCallback)((e,t,n)=>{o(K.setRRule(de(u,y,e,t,n)))},[o,y,u]),w=(0,j.useCallback)(e=>{let t=ie(y,e);if(t){let{timestamp:n}=fe(y,e);C(t,n,t===`exdate`)}},[C,y]),ae=(0,j.useCallback)(e=>{let t=fe(y,e);if(t.base&&t.excluded){C(`exdate`,t.timestamp,!1);return}if(t.full){w(e);return}t.full||C(`rdate`,t.timestamp,!0)},[C,y,w]),ce=(0,j.useCallback)(e=>fe(y,e),[y]),pe=async t=>{if(!(!e||i)){a(!0);try{_e({eventId:await yr(r.current),recurrenceId:t,siteId:e.siteId,onSave:()=>n?.()})}catch{Craft.cp.displayError(l(`Couldn’t open the occurrence for editing.`))}finally{a(!1)}}};return(0,J.jsx)(Ar,{ref:r,children:(0,J.jsxs)(je,{children:[(0,J.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,J.jsx)(Mr,{children:l(`Schedule Preview`)}),ne&&(0,J.jsx)(Nr,{children:ne})]}),(0,J.jsxs)(jr,{children:[(0,J.jsxs)(k,{$direction:`column`,$gap:10,children:[(0,J.jsx)(ye,{...m(),height:`auto`,expandRows:!1,themeSystem:`bootstrap5`,plugins:[be,xe],initialView:`dayGridMonth`,dayHeaderFormat:{weekday:`narrow`},dayHeaderDidMount:e=>e.el.setAttribute(`aria-label`,new Intl.DateTimeFormat(d().code,{weekday:`long`,timeZone:`UTC`}).format(e.date)),firstDay:s,timeZone:`UTC`,eventDisplay:`none`,events:b,headerToolbar:{start:`title`,end:`prev,today,next`},datesSet:e=>v({start:e.start,end:e.end,currentStart:e.view.currentStart}),dayCellClassNames:e=>{let t=ce(e.date);return[t.full?`fc-has-event`:``,t.rdate?`fc-extra-date`:``,t.excluded?`fc-excluded-date`:``].filter(Boolean)},dateClick:e=>ae(e.date)}),S&&(0,J.jsx)(Pr,{children:S})]}),(0,J.jsx)(Fr,{children:x.length===0?(0,J.jsxs)(`p`,{children:[l(`No occurrences starting from`),(0,J.jsx)(`br`,{}),D(t(_?.currentStart??new Date),`PP`,{locale:d()})]}):(0,J.jsx)(Ir,{$count:x.length,children:x.map(e=>{let n=new Date(e*1e3),r=D(t(n),c,{locale:d()}),a=ie(y,n),o=h?te(y,n):null,s=l(a===`rdate`?`Remove additional date {date}`:`Exclude occurrence on {date}`,{date:r});return(0,J.jsxs)(Lr,{children:[(0,J.jsx)(`span`,{children:r}),o&&(0,J.jsx)(`button`,{type:`button`,className:`btn small occurrence-edit`,"aria-label":l(`Edit occurrence on {date}`,{date:r}),title:l(`Edit occurrence`),disabled:i,onClick:()=>void pe(o),children:l(`Edit`)}),a&&(0,J.jsx)(Rr,{type:`button`,disabled:i,"aria-label":s,title:s,onClick:()=>w(n),children:`×`})]},g(n))})})})]})]})})},Vr=r.div`
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
`,Hr=r.div`
  container-type: inline-size;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0;
  width: 100%;
  min-width: 0;

  background-color: var(--custom-bg-color,var(--gray-050));
`,Ur=r.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  padding: 20px;
  width: 100%;
`,Wr=e=>h(Ae(o(e),1)),Gr=(e,t,n)=>{let r=qr(t,n);return e.getTime()>=r.getTime()},Kr=({value:e,start:t,allDay:n,timeInterval:r})=>{if(n)return h(Ce(A(o(e)),1));let i=o(e),a=qr(t,r);return i.getTime()>=a.getTime()?e:h(a)},qr=(e,t)=>Me(o(e),t),Jr=e=>{if(!e.trim())return null;let t=Number(e);return Number.isFinite(t)?Math.trunc(t):null},Yr=({inputValue:e,value:t,min:n})=>{let r=Jr(e)??n??t??0;return n===void 0?r:Math.max(r,n)},Xr=({value:e,min:t,debounceMs:n,onChange:r})=>{let[i,a]=(0,j.useState)(e?.toString()??``),o=(0,j.useRef)(void 0),s=(0,j.useCallback)(()=>{o.current!==void 0&&(window.clearTimeout(o.current),o.current=void 0)},[]),c=(0,j.useCallback)((e,t=`debounced`)=>{if(s(),r){if(!n||t===`immediate`){r(e);return}o.current=window.setTimeout(()=>{o.current=void 0,r(e)},n)}},[s,n,r]);return(0,j.useEffect)(()=>{a(e?.toString()??``)},[e]),(0,j.useEffect)(()=>s,[s]),{inputValue:i,handleChange:(0,j.useCallback)(e=>{e.stopPropagation();let n=e.currentTarget.value;a(n);let r=Jr(n);if(r===null||t!==void 0&&r<t){s();return}c(r)},[s,c,t]),handleBlur:(0,j.useCallback)(n=>{n.stopPropagation();let r=Yr({inputValue:i,value:e,min:t});a(r.toString()),c(r,`immediate`)},[c,i,t,e])}},Zr=({value:e,min:t,debounceMs:n,onChange:r,...i})=>{let{inputValue:a,handleChange:o,handleBlur:s}=Xr({value:e,min:t,debounceMs:n,onChange:r});return(0,J.jsx)(je,{...i,children:(0,J.jsx)(`input`,{type:`number`,className:`text number`,min:t,step:1,value:a,onChange:o,onBlur:s})})},Qr=()=>null,X=[{value:`MO`,label:`Monday`,days:[y.MO.weekday]},{value:`TU`,label:`Tuesday`,days:[y.TU.weekday]},{value:`WE`,label:`Wednesday`,days:[y.WE.weekday]},{value:`TH`,label:`Thursday`,days:[y.TH.weekday]},{value:`FR`,label:`Friday`,days:[y.FR.weekday]},{value:`SA`,label:`Saturday`,days:[y.SA.weekday]},{value:`SU`,label:`Sunday`,days:[y.SU.weekday]},{value:`WD`,label:`Weekday (Mon-Fri)`,days:[y.MO.weekday,y.TU.weekday,y.WE.weekday,y.TH.weekday,y.FR.weekday]},{value:`WEK`,label:`Weekend (Sat/Sun)`,days:[y.SA.weekday,y.SU.weekday]}],$r=e=>{if(!(!e||e.length===0))return Array.from(new Set(e)).sort((e,t)=>e-t)},ei=(e,t)=>{let n=$r(e),r=$r(t);return!n||!r||n.length!==r.length?!1:n.every((e,t)=>e===r[t])},ti=(e,t)=>{if(e){let t=X.find(t=>ei(t.days,e));if(t)return t.value}if(t!==void 0){let e=X.find(e=>e.days.length===1&&e.days[0]===t);if(e)return e.value}return X[0].value},ni=e=>X.find(t=>t.value===e)?.days??[y.MO.weekday],Z=`5px`,Q=r.button`
  width: 100%;
  padding: 0.5rem;

  background-color: var(--gray-150);
  border-right: 1px solid var(--gray-050);
  border-bottom: 1px solid var(--gray-050);
  border-left: none;
  border-top: none;
`,ri=r(Q)`
  cursor: pointer;
  width: 100%;

  &:hover {
    background: var(--gray-200);
  }

  &.active {
    color: white;
    background: var(--gray-600);
  }
`,ii=r(Q)`
  background: var(--gray-150);

  user-select: none;
  pointer-events: none;
`,ai=r.div`
  display: grid;
  gap: 0;
  padding: 0;

  background: var(--button-bg);
  border: 1px solid var(--gray-050);
  border-radius: var(--button-border-radius);

  &, &:after, &:before {
    box-sizing: initial !important;
  }
`,oi=r(ai)`
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
`,si=r(ai)`
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
`,ci=r(ai)`
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
`,li=({label:e,values:t,onChange:n})=>(0,J.jsx)(je,{label:e,children:(0,J.jsxs)(oi,{children:[Array.from({length:31},(e,t)=>t+1).map(e=>(0,J.jsx)(ri,{type:`button`,className:E(t.includes(e)&&`active`),onClick:()=>{let r=t.filter(t=>t!==e);t.includes(e)||(r=[...r,e]),r.length!==0&&(r.sort((e,t)=>e-t),n(r))},children:e},e)),Array.from({length:4},(e,t)=>t+1).map(e=>(0,J.jsx)(ii,{},e))]})}),ui=[{value:`MONTHDAY`,label:`On day of month`},{value:`WEEKDAY`,label:`On the nth weekday`}],di=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],fi=()=>{let e=N(),{start:t,bymonthday:n,byweekday:r,bysetpos:i}=P(q.state),a=o(t),s=a.getDate(),c=(a.getDay()+6)%7,l=i?.length&&r?.length?`WEEKDAY`:`MONTHDAY`,u=n?.length?n:[s],d=i?.[0]??1,f=ti(r,c),p=t=>{e(K.setByRules({bymonthday:t.length?t:void 0,byweekday:void 0,bysetpos:void 0}))},m=(t,n)=>{e(K.setByRules({bymonthday:void 0,byweekday:ni(t),bysetpos:[n]}))};return(0,J.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,J.jsx)(O,{translateOptions:!0,label:`Repeat on`,value:l,options:ui,onChange:e=>{e===`WEEKDAY`?m(f,d):p(u)}}),l===`MONTHDAY`&&(0,J.jsx)(li,{label:`Days of Month`,values:u,onChange:e=>p(e)}),l===`WEEKDAY`&&(0,J.jsxs)(k,{children:[(0,J.jsx)(O,{translateOptions:!0,label:`Position`,value:d,options:di,onChange:e=>m(f,Number.parseInt(e,10))}),(0,J.jsx)(O,{translateOptions:!0,label:`Day`,value:f,options:X.map(e=>({value:e.value,label:e.label})),onChange:e=>m(e,d)})]})]})},pi=[{weekday:y.SU,label:`Sun`},{weekday:y.MO,label:`Mon`},{weekday:y.TU,label:`Tue`},{weekday:y.WE,label:`Wed`},{weekday:y.TH,label:`Thu`},{weekday:y.FR,label:`Fri`},{weekday:y.SA,label:`Sat`}],mi=()=>{let e=N(),{byweekday:t}=P(q.state);return(0,J.jsx)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:(0,J.jsx)(je,{label:`On`,children:(0,J.jsx)(si,{children:pi.map(({weekday:n,label:r})=>(0,J.jsx)(ri,{type:`button`,className:E(t?.includes(n.weekday)&&`active`),onClick:()=>{let r=t?[...t]:[];r.includes(n.weekday)?r=r.filter(e=>e!==n.weekday):r.push(n.weekday),r.length!==0&&e(K.setDays({type:`byweekday`,values:r}))},children:l(r)},n.weekday))})})})},hi=[{value:`MONTHDAY`,label:`On specific date`},{value:`WEEKDAY`,label:`On the nth weekday`}],gi=[{value:1,label:`First`},{value:2,label:`Second`},{value:3,label:`Third`},{value:4,label:`Fourth`},{value:-1,label:`Last`}],_i=[{value:1,label:`Jan`},{value:2,label:`Feb`},{value:3,label:`Mar`},{value:4,label:`Apr`},{value:5,label:`May`},{value:6,label:`Jun`},{value:7,label:`Jul`},{value:8,label:`Aug`},{value:9,label:`Sep`},{value:10,label:`Oct`},{value:11,label:`Nov`},{value:12,label:`Dec`}],vi=()=>{let e=N(),{start:t,bymonth:n,bymonthday:r,byweekday:i,bysetpos:a}=P(q.state),s=o(t),c=s.getDate(),u=s.getMonth()+1,d=(s.getDay()+6)%7,f=a?.length&&i?.length?`WEEKDAY`:`MONTHDAY`,p=r?.length?r:[c],m=n?.length?n:[u],h=a?.[0]??1,g=ti(i,d),_=(t,n)=>{e(K.setByRules({bymonth:t.length?t:void 0,bymonthday:n.length?n:void 0,byweekday:void 0,bysetpos:void 0}))},v=(t,n,r)=>{e(K.setByRules({bymonth:t.length?t:void 0,bymonthday:void 0,byweekday:ni(n),bysetpos:[r]}))};return(0,J.jsxs)(k,{$direction:`column`,style:{margin:`20px 0 0`,width:`100%`},children:[(0,J.jsx)(je,{label:`Month`,children:(0,J.jsx)(ci,{children:_i.map(e=>{let t=m.includes(e.value);return(0,J.jsx)(ri,{type:`button`,className:E(t&&`active`),onClick:()=>{let n=m.filter(t=>t!==e.value);t||(n=[...n,e.value]),n.length!==0&&(n.sort((e,t)=>e-t),f===`WEEKDAY`?v(n,g,h):_(n,p))},children:l(e.label)},e.value)})})}),(0,J.jsx)(O,{translateOptions:!0,label:`Repeat on`,value:f,options:hi,onChange:e=>{e===`WEEKDAY`?v(m,g,h):_(m,p)}}),f===`MONTHDAY`&&(0,J.jsx)(li,{label:`Days of Month`,values:p,onChange:e=>_(m,e)}),f===`WEEKDAY`&&(0,J.jsxs)(k,{children:[(0,J.jsx)(O,{translateOptions:!0,label:`Position`,value:h,options:gi,onChange:e=>v(m,g,Number.parseInt(e,10))}),(0,J.jsx)(O,{translateOptions:!0,label:`Day`,value:g,options:X.map(e=>({value:e.value,label:e.label})),onChange:e=>v(m,e,h)})]})]})},yi=()=>{let{freq:e}=P(q.state);return e===_.DAILY?(0,J.jsx)(Qr,{}):e===_.WEEKLY?(0,J.jsx)(mi,{}):e===_.MONTHLY?(0,J.jsx)(fi,{}):e===_.YEARLY?(0,J.jsx)(vi,{}):null},bi=e=>(0,J.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,J.jsx)(`path`,{d:`M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z`})}),xi=e=>(0,J.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,fill:`currentColor`,"aria-hidden":`true`,focusable:`false`,...e,children:(0,J.jsx)(`path`,{d:`M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z`})}),Si=()=>{let e=N(),{interval:t}=P(q.state);return(0,J.jsxs)(Ci,{children:[(0,J.jsx)(`span`,{children:l(`Every`)}),(0,J.jsx)(wi,{"aria-label":l(`Repeat interval`),type:`text`,className:`text`,value:t,onChange:t=>{let n=parseInt(t.target.value,10)||1;e(K.setInterval(n))}}),(0,J.jsxs)(Ti,{children:[(0,J.jsx)(Ei,{type:`button`,"aria-label":l(`Increase interval`),onClick:()=>e(K.setInterval(t+1)),children:(0,J.jsx)(xi,{})}),(0,J.jsx)(Ei,{type:`button`,"aria-label":l(`Decrease interval`),onClick:()=>e(K.setInterval(t-1)),children:(0,J.jsx)(bi,{})})]})]})},Ci=r.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`,wi=r.input`
  width: 60px;
`,Ti=r.div`
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: 26px;
`,Ei=r.button`
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
`,Di=me({position:[`bottom`,`top`],alignment:`end`,padding:8}),Oi=(e,t,n,r)=>{let[i,a]=(0,j.useState)();return(0,j.useLayoutEffect)(()=>{if(!e)return;let i=t.current,o=n.current,s=r.current;if(!i||!o||!s)return;let c=()=>{let e=v({anchorRect:i.getBoundingClientRect(),popoverRect:o.getBoundingClientRect(),viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:Di}),t=s.getBoundingClientRect(),n={top:e.top-t.top,left:e.left-t.left};a(e=>e?.top===n.top&&e.left===n.left?e:n)};c();let l=new ResizeObserver(c);return l.observe(i),l.observe(o),window.addEventListener(`resize`,c),window.addEventListener(`scroll`,c,!0),()=>{l.disconnect(),window.removeEventListener(`resize`,c),window.removeEventListener(`scroll`,c,!0)}},[e,t,n,r]),i},ki=(e,t,n)=>{(0,j.useEffect)(()=>{if(!e)return;let r=e=>{let r=e.target;t.some(e=>e.current?.contains(r))||n()},i=e=>{e.key===`Escape`&&n()};return window.addEventListener(`mousedown`,r),window.addEventListener(`keydown`,i),()=>{window.removeEventListener(`mousedown`,r),window.removeEventListener(`keydown`,i)}},[e,n,t])},Ai=r.div`
  padding-top: 18px;
  width: 100%;
`,ji=r.div`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`,Mi=r.p`
  margin: 0 0 6px 0;
  padding: 0;
  color: var(--gray-700);
  font-size: 13px;
  font-weight: 400;
`,Ni=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Pi=r.div`
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
`,Fi=r.button`
  cursor: pointer;

  &.icon.minus {
    &::before {
      content: "minus";
    }
  }
`,Ii=r.div`
  position: relative;
  flex-shrink: 0;
`,Li=r.button`
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
`,Ri=r.div`
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
`,zi=r.div`
  margin-bottom: 10px;
  color: var(--gray-700);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`,Bi=r.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`,Vi=r.li`
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
`,Hi=({title:e,description:t,actionLabel:n,actionClass:r,popoverTitle:i,dates:a,openToDate:o,weekStartDay:s,formatDate:c,filterDate:u,onAdd:d,onRemove:p})=>{let[m,g]=(0,j.useState)(!1),_=(0,j.useRef)(null),v=(0,j.useRef)(null),y=(0,j.useRef)(null),b=Oi(m,v,y,_);return(0,j.useEffect)(()=>{a.length===0&&g(!1)},[a.length]),ki(m,[v,y],()=>g(!1)),(0,J.jsxs)(Ai,{children:[(0,J.jsx)(ji,{children:l(e)}),t&&(0,J.jsx)(Mi,{children:l(t)}),(0,J.jsxs)(Ni,{children:[(0,J.jsxs)(Ii,{ref:_,children:[(0,J.jsx)(Li,{ref:v,type:`button`,disabled:a.length===0,className:E({active:m}),onClick:()=>{a.length!==0&&g(e=>!e)},children:a.length}),m&&(0,J.jsxs)(Ri,{ref:y,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`},children:[(0,J.jsx)(zi,{children:l(i)}),(0,J.jsx)(Bi,{children:a.map(e=>(0,J.jsxs)(Vi,{children:[(0,J.jsx)(`span`,{children:c(e)}),(0,J.jsx)(`button`,{type:`button`,"aria-label":l(`Remove date {date}`,{date:c(e)}),onClick:()=>p(e),children:`×`})]},e))})]})]}),(0,J.jsx)(Pi,{children:(0,J.jsx)(we,{...f(),selected:null,onChange:e=>{e&&d(h(A(e)))},customInput:(0,J.jsx)(Ui,{label:n,className:E(`btn`,r)}),shouldCloseOnSelect:!0,showTimeSelect:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,todayButton:l(`Today`),openToDate:o,calendarStartDay:s,filterDate:u})})]})]})},Ui=(0,j.forwardRef)(({label:e,...t},n)=>(0,J.jsx)(Fi,{type:`button`,ref:n,...t,children:l(e)}));Ui.displayName=`PickerTrigger`;var Wi=r.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  width: 100%;
`,Gi=()=>{let e=N(),n=P(q.state),{start:r,rrule:i}=n,a=(0,j.useMemo)(()=>re(i,r),[i,r]),{startTimestamp:o,baseRule:l,recurrenceSet:u}=a,d=(0,j.useMemo)(()=>u?Array.from(new Set(u.rdates().map(e=>h(A(t(e)))).filter(e=>l?!0:e!==o))).sort((e,t)=>e-t):[],[l,u,o]),f=(0,j.useMemo)(()=>u?Array.from(new Set(u.exdates().map(e=>h(A(t(e)))))).sort((e,t)=>e-t):[],[u]),p=(0,j.useMemo)(()=>new Set(d),[d]),m=(0,j.useMemo)(()=>new Set(f),[f]),g=(0,j.useCallback)(e=>{let t=s(A(e)),n=c(Ee(e)),r=l?l.between(t,n,!0).length>0:!1,i=u?u.between(t,n,!0).length>0:h(A(e))===o;return{full:i,base:r,excluded:r&&!i}},[l,u,o]),_=r=>{let i=r({baseRule:l,rdates:u?.rdates().filter(e=>l?!0:h(A(t(e)))!==o)??[],exdates:u?.exdates()??[]});e(K.setRRule(ae(n,i.baseRule,Ki(i.rdates),Ki(i.exdates))))};return{addedDates:d,excludedDates:f,addFixedDate:(e,t)=>{if(e===`exdate`&&ne(a,t))return;let r=ce(n,t);_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?[...n,r]:b(n,r.getTime()),exdates:e===`exdate`?[...i,r]:i}))},removeFixedDate:(e,t)=>{if(e===`rdate`&&ne(a,t))return;let r=ce(n,t).getTime();_(({baseRule:t,rdates:n,exdates:i})=>({baseRule:t,rdates:e===`rdate`?b(n,r):n,exdates:e===`exdate`?b(i,r):i}))},canAddOccurrence:(0,j.useCallback)(e=>{let t=h(A(e)),n=g(e);return!n.full&&!n.excluded&&!p.has(t)},[p,g]),canExcludeOccurrence:(0,j.useCallback)(e=>{let t=h(A(e)),n=g(e);return n.base&&!n.excluded&&!m.has(t)&&!ne(a,t)},[m,g,a]),getStatus:g}},Ki=e=>{let t=new Map(e.map(e=>[e.getTime(),e])).values();return Array.from(t).sort((e,t)=>e.getTime()-t.getTime())},qi=[{value:`NEVER`,label:`Never`},{value:`DAILY`,label:`Every Day`},{value:`WEEKLY`,label:`Every Week`},{value:`MONTHLY`,label:`Every Month`},{value:`YEARLY`,label:`Every Year`},{value:`CUSTOM`,label:`Custom...`}],Ji=[{value:`NEVER`,label:`Never`},{value:`AFTER`,label:`After...`},{value:`ON_DATE`,label:`On Date...`}],Yi=e=>[{value:_.DAILY,label:e?`Days`:`Day`},{value:_.WEEKLY,label:e?`Weeks`:`Week`},{value:_.MONTHLY,label:e?`Months`:`Month`},{value:_.YEARLY,label:e?`Years`:`Year`}],Xi=300,Zi=()=>{let e=N(),t=P(q.state),n=P(Y.weekStartDay),r=P(Y.formats)?.date.short.icu??`P`,{repeatType:i,repeatEndType:a,count:s,until:c,freq:l,start:u,interval:f}=t,p=i!==`NEVER`,{addedDates:m,excludedDates:h,addFixedDate:g,removeFixedDate:_,canAddOccurrence:v,canExcludeOccurrence:y}=Gi(),b=(0,j.useMemo)(()=>o(u),[u]),ee=e=>D(o(e),r,{locale:d()});return(0,J.jsxs)(Wi,{children:[(0,J.jsxs)(k,{$alignItems:`end`,style:{width:`100%`},children:[(0,J.jsx)(O,{translateOptions:!0,label:`Repeats`,value:i,options:qi,onChange:t=>e(K.setRepeatType(t))}),i===`CUSTOM`&&(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(Si,{}),(0,J.jsx)(O,{translateOptions:!0,label:``,value:l,options:Yi(f>1),onChange:t=>e(K.setFreq(Number.parseInt(t,10)))})]})]}),i===`CUSTOM`&&(0,J.jsx)(yi,{}),i!==`NEVER`&&(0,J.jsxs)(k,{style:{margin:`20px 0 0`,width:`100%`},children:[(0,J.jsx)(O,{translateOptions:!0,label:`Ends`,options:Ji,value:a,onChange:t=>e(K.setRepeatEndType(t))}),a===`AFTER`&&(0,J.jsx)(Zr,{label:`Times`,value:s,min:1,debounceMs:Xi,onChange:t=>e(K.setCount(t))}),a===`ON_DATE`&&(0,J.jsx)(De,{label:``,value:c||null,onChange:t=>e(K.setUntil(t)),datePickerProps:{showTimeInput:!1,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:n,minDate:b}})]}),(0,J.jsxs)(k,{style:{margin:`20px 0 0`,borderTop:`1px solid var(--gray-200)`,width:`100%`},children:[(0,J.jsx)(Hi,{title:`Additional Dates`,description:`Add dates outside the recurring pattern.`,actionLabel:`Add Dates`,actionClass:`icon add dashed`,popoverTitle:`Additional Dates`,dates:m,openToDate:b,formatDate:ee,filterDate:v,weekStartDay:n,onAdd:e=>g(`rdate`,e),onRemove:e=>_(`rdate`,e)}),p&&(0,J.jsx)(Hi,{title:`Excluded Dates`,description:`Remove dates generated by the recurring pattern.`,actionLabel:`Remove Dates`,actionClass:`icon dashed minus`,popoverTitle:`Excluded Dates`,dates:h,openToDate:b,formatDate:ee,filterDate:y,weekStartDay:n,onAdd:e=>g(`exdate`,e),onRemove:e=>_(`exdate`,e)})]})]})},Qi=({context:e,onOccurrenceSaved:t})=>{let n=(0,j.useId)(),r=(0,j.useId)(),i=(0,j.useId)(),a=N(),{start:s,end:c,allDay:u}=P(q.state),{date:d,time:f,datetime:p}=P(Y.formats),m=P(Y.weekStartDay),h=P(Y.timeInterval),g=P(Y.eventDuration),_=(0,j.useMemo)(()=>u?d.short.icu:p.short.icu,[u,d,p]),v=(0,j.useMemo)(()=>u?Wr(c):c,[u,c]);return(0,J.jsxs)(Vr,{children:[(0,J.jsxs)(Hr,{children:[(0,J.jsxs)(Ur,{children:[(0,J.jsx)(De,{id:r,label:`Starts`,value:s,onChange:e=>a(K.setStart(e)),datePickerProps:{id:r,showIcon:!0,icon:(0,J.jsx)(ke,{}),toggleCalendarOnIconClick:!0,showTimeSelect:!u,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:_,timeFormat:f.short.icu,todayButton:l(`Today`),calendarStartDay:m,timeIntervals:h}}),(0,J.jsx)(De,{id:i,label:`Ends`,value:v,onChange:e=>{e!=null&&a(K.setEnd(Kr({value:e,start:s,allDay:u,timeInterval:h})))},datePickerProps:{id:i,showIcon:!0,icon:(0,J.jsx)(ke,{}),toggleCalendarOnIconClick:!0,minDate:o(s),showTimeSelect:!u,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,dateFormat:_,timeFormat:f.short.icu,todayButton:l(`Today`),calendarStartDay:m,timeIntervals:h,filterTime:e=>Gr(new Date(e),s,h)}}),(0,J.jsx)(Oe,{id:n,label:`All Day`,enabled:u,style:{margin:0},onClick:e=>a(K.setAllDay({enabled:e,eventDuration:g}))})]}),(0,J.jsx)(Zi,{})]}),(0,J.jsx)(Br,{context:e,onOccurrenceSaved:t})]})},$i=r.div`
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
`,ea=r.div`
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
`,ta=(e,n=!1)=>D(t(new Date(e*1e3)),n?`PP, p`:`PP`,{locale:d()}),na=({context:e})=>{let{allDay:t}=P(q.state),{splitAt:n,series:r}=e,i=r?.earlier??null,a=r?.later??null;return!n&&!i&&!a?null:(0,J.jsxs)(ea,{children:[n&&(0,J.jsx)(`p`,{children:l(`This draft changes the event from {date} on. Applying it makes the occurrences before then a separate event in the same series.`,{date:ta(n,!t)})}),(i||a)&&(0,J.jsxs)(`nav`,{children:[(0,J.jsx)(`span`,{children:l(`Part of a series`)}),i&&(0,J.jsxs)(`a`,{href:i.url,children:[`← `,l(`Earlier part, from {date}`,{date:ta(i.start)})]}),a&&(0,J.jsxs)(`a`,{href:a.url,children:[l(`Later part, from {date}`,{date:ta(a.start)}),` →`]})]})]})},ra=({context:e})=>{let[n,r]=(0,j.useState)(0),{rrule:i}=P(q.state),a=(0,j.useMemo)(rt,[]),o=i?he(i,{forceset:!0}).all((e,t)=>t<10).map(e=>`${D(t(e),`yyyy-MM-dd HH:mm`)} [${Ne(e)}]`):[];return(0,J.jsxs)($i,{children:[e&&(0,J.jsx)(na,{context:e}),(0,J.jsx)(Qi,{context:e,onOccurrenceSaved:()=>r(e=>e+1)}),e?.eventId&&(0,J.jsx)(Er,{context:e,refreshKey:n}),a&&(0,J.jsxs)(`code`,{children:[(0,J.jsx)(`pre`,{children:i}),(0,J.jsx)(`pre`,{children:JSON.stringify(o,null,2)})]})]})},ia=(e,t)=>{let{start:n,end:r,until:i,timezone:a,allDay:o,rrule:s,repeatType:c,repeatEndType:l}=e.getState().event;$(t,`start`,aa(n)),$(t,`end`,aa(r)),$(t,`until`,i?aa(i):``),$(t,`timezone`,a||`UTC`),$(t,`allDay`,o?`1`:`0`),$(t,`repeatType`,c??`NEVER`),$(t,`repeatEndType`,l??`NEVER`),$(t,`rrule`,s??``)},aa=e=>D(o(e),`yyyy-MM-dd'T'HH:mm:ss`),$=(e,t,n)=>{let r=e.querySelector(`input[name="${t}"]`);if(!r)return;let i=n.toString();r.value!==i&&(r.value=i,r.dispatchEvent(new Event(`input`,{bubbles:!0})),r.dispatchEvent(new Event(`change`,{bubbles:!0})))},oa=e=>{let t=x(e.event.rrule),{byweekday:n,bysetpos:r}=fr(t?.options.byweekday),i=pr(e.event.repeatType),a=mr(e.event.repeatEndType),o={app:e.app,event:{start:e.event.start,end:e.event.end,until:e.event.until,timezone:e.event.timezone,allDay:e.event.allDay,repeatType:i,repeatEndType:a,rrule:e.event.rrule,freq:t?.options.freq||_.DAILY,interval:t?.options.interval||1,count:a===`AFTER`?hr(t?.options.count):t?.options.count||null,byweekday:n,bymonth:t?.options.bymonth,bymonthday:t?.options.bymonthday,byyearday:t?.options.byyearday,bysetpos:t?.options.bysetpos??r}};return Hn({reducer:{app:kr,event:_r},preloadedState:o})},sa=new WeakSet,ca=e=>{if(sa.has(e))return;sa.add(e),e.dataset.eventBuilderMounted=`true`;let t=e.querySelector(`script[data-config]`),n=e.querySelector(`div[data-root]`),r=JSON.parse(t.textContent),i=oa(r),a=Ie.createRoot(n);i.subscribe(()=>{ia(i,e)}),ia(i,e),a.render((0,J.jsx)(Ye,{store:i,children:(0,J.jsx)(ra,{context:r.context})}))},la=(e=document)=>{e.querySelectorAll(`[data-event-builder]:not([data-event-builder-mounted])`).forEach(ca)},ua=()=>{la(),new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e instanceof HTMLElement&&(e.matches(`[data-event-builder]`)&&ca(e),la(e))})})}).observe(document.documentElement,{childList:!0,subtree:!0})};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,ua):ua();