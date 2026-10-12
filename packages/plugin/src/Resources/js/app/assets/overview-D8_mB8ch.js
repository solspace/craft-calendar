import{a as e,c as t,i as n,l as r,n as i,o as a,s as o,t as s,u as c}from"./translations-CPvEMAbD.js";import{_ as l,a as u,c as d,d as f,f as p,i as m,l as h,m as g,n as _,o as v,p as y,r as b,s as x,t as S,u as C}from"./create-with-ai-VMBt3tWt.js";import{S as w,g as T,n as E,r as D,t as O,v as k,x as ee,y as A}from"./localization-Mf36Vfg7.js";import{Ct as te,Dt as j,Et as ne,Gt as M,Ht as re,J as N,Lt as P,Nt as F,P as ie,Pt as I,Qt as ae,R as oe,Vt as se,W as ce,Xt as L,_ as le,a as ue,b as R,c as de,cn as fe,d as pe,f as me,g as he,gn as z,gt as ge,i as B,k as _e,l as ve,ln as ye,m as be,mn as xe,n as Se,o as Ce,ot as we,p as Te,r as Ee,s as De,st as Oe,t as ke,u as Ae,un as je,v as Me,x as Ne}from"./calendar.events-B0-G7rS_.js";import{t as Pe}from"./interaction-DqG35pqf.js";import{t as Fe}from"./timegrid-dPK_ini7.js";import{a as Ie,d as Le,f as Re,i as V,n as H,o as ze,s as U,t as Be,y as Ve}from"./lightswitch-Bj0mJjdb.js";import{t as He}from"./http-bwzZaFVT.js";import{D as Ue,E as We,O as Ge,S as Ke,i as qe,s as Je}from"./calendar-preview.operations-lGmjIM0w.js";import{n as Ye,r as Xe}from"./calendar.styles-CIEulExP.js";import{n as Ze,r as Qe,t as $e}from"./variables-BbBDeNZ7.js";import{t as et}from"./create-event.operations-ozEgpbIl.js";import{t as tt}from"./components-DAVK9kbC.js";var nt=`modulepreload`,rt=function(e,t){return new URL(e,t).href},it={},at=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=rt(t,n),t=s(t),t in it)return;it[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:nt,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},W=c(t(),1),ot=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,st=/^[\\/]{2}/;function ct(e,t){return t+e.replace(/\\/g,`/`)}var lt=`popstate`;function ut(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function dt(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return mt(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ht(t)}return _t(t,n,null,e)}function G(e,t){if(e===!1||e==null)throw Error(t)}function K(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function ft(){return Math.random().toString(36).substring(2,10)}function pt(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function mt(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?gt(t):t,state:n,key:t&&t.key||r||ft(),mask:i}}function ht({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function gt(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function _t(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=ut(e)?e:mt(h.location,e,t);n&&n(r,e),l=u()+1;let d=pt(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=ut(e)?e:mt(h.location,e,t);n&&n(r,e),l=u();let i=pt(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return vt(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(lt,d),c=e,()=>{i.removeEventListener(lt,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function vt(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),G(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:ht(t);return i=i.replace(/ $/,`%20`),!n&&st.test(i)&&(i=r+i),new URL(i,r)}function yt(e,t,n=`/`){return bt(e,t,n,!1)}function bt(e,t,n,r,i){let a=q((typeof t==`string`?gt(t):t).pathname||`/`,n);if(a==null)return null;let o=i??St(e),s=null,c=zt(a);for(let e=0;s==null&&e<o.length;++e)s=Ft(o[e],c,r);return s}function xt(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function St(e){let t=Ct(e);return Tt(t),t}function Ct(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;G(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=J([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(G(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),Ct(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:Nt(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=Rt(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of wt(e.path))a(e,t,!0,n)}),t}function wt(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=wt(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function Tt(e){e.sort((e,t)=>e.score===t.score?Pt(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var Et=/^:[\w-]+$/,Dt=3,Ot=2,kt=1,At=10,jt=-2,Mt=e=>e===`*`;function Nt(e,t){let n=e.split(`/`),r=n.length;return n.some(Mt)&&(r+=jt),t&&(r+=Ot),n.filter(e=>!Mt(e)).reduce((e,t)=>e+(Et.test(t)?Dt:t===``?kt:At),r)}function Pt(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function Ft(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?Lt(u,l,s.matcher,s.compiledParams):It(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=It({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:J([a,d.pathname]),pathnameBase:Jt(J([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=J([a,d.pathnameBase]))}return o}function It(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Rt(e.path,e.caseSensitive,e.end);return Lt(e,t,n,r)}function Lt(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Rt(e,t=!1,n=!0){K(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function zt(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return K(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function q(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Bt(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?gt(e):e,a;return n?(n=Kt(n),a=n.startsWith(`/`)?Vt(n.substring(1),`/`):Vt(n,t)):a=t,{pathname:a,search:Yt(r),hash:Xt(i)}}function Vt(e,t){let n=qt(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Ht(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ut(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Wt(e){let t=Ut(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Gt(e,t,n,r=!1){let i;typeof e==`string`?i=gt(e):(i={...e},G(!i.pathname||!i.pathname.includes(`?`),Ht(`?`,`pathname`,`search`,i)),G(!i.pathname||!i.pathname.includes(`#`),Ht(`#`,`pathname`,`hash`,i)),G(!i.search||!i.search.includes(`#`),Ht(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Bt(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Kt=e=>e.replace(/[\\/]{2,}/g,`/`),J=e=>Kt(e.join(`/`)),qt=e=>e.replace(/\/+$/,``),Jt=e=>qt(e).replace(/^\/*/,`/`),Yt=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Xt=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Zt=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Qt(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function $t(e){return J(e.map(e=>e.route.path).filter(Boolean))||`/`}var en=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function tn(e,t){let n=e;if(typeof n!=`string`||!ot.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(en)try{let e=new URL(window.location.href),r=st.test(n)?new URL(ct(n,e.protocol)):new URL(n),a=q(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{K(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var nn=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(nn);var rn=[`GET`,...nn];new Set(rn);var an=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function on(e){try{return an.includes(new URL(e).protocol)}catch{return!1}}var sn=W.createContext(null);sn.displayName=`DataRouter`;var cn=W.createContext(null);cn.displayName=`DataRouterState`;var ln=W.createContext(!1);function un(){return W.useContext(ln)}var dn=W.createContext({isTransitioning:!1});dn.displayName=`ViewTransition`;var fn=W.createContext(new Map);fn.displayName=`Fetchers`;var pn=W.createContext(null);pn.displayName=`Await`;var Y=W.createContext(null);Y.displayName=`Navigation`;var mn=W.createContext(null);mn.displayName=`Location`;var X=W.createContext({outlet:null,matches:[],isDataRoute:!1});X.displayName=`Route`;var hn=W.createContext(null);hn.displayName=`RouteError`;var gn=`REACT_ROUTER_ERROR`,_n=`REDIRECT`,vn=`ROUTE_ERROR_RESPONSE`;function yn(e){if(e.startsWith(`${gn}:${_n}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function bn(e){if(e.startsWith(`${gn}:${vn}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Zt(t.status,t.statusText,t.data)}catch{}}function xn(e,{relative:t}={}){G(Sn(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=W.useContext(Y),{hash:i,pathname:a,search:o}=kn(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:J([n,a])),r.createHref({pathname:s,search:o,hash:i})}function Sn(){return W.useContext(mn)!=null}function Z(){return G(Sn(),`useLocation() may be used only in the context of a <Router> component.`),W.useContext(mn).location}var Cn=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function wn(e){W.useContext(Y).static||W.useLayoutEffect(e)}function Tn(){let{isDataRoute:e}=W.useContext(X);return e?Jn():En()}function En(){G(Sn(),`useNavigate() may be used only in the context of a <Router> component.`);let e=W.useContext(sn),{basename:t,navigator:n}=W.useContext(Y),{matches:r}=W.useContext(X),{pathname:i}=Z(),a=JSON.stringify(Wt(r)),o=W.useRef(!1);return wn(()=>{o.current=!0}),W.useCallback((r,s={})=>{if(K(o.current,Cn),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Gt(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:J([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var Dn=W.createContext(null);function On(e){let t=W.useContext(X).outlet;return W.useMemo(()=>t&&W.createElement(Dn.Provider,{value:e},t),[t,e])}function kn(e,{relative:t}={}){let{matches:n}=W.useContext(X),{pathname:r}=Z(),i=JSON.stringify(Wt(n));return W.useMemo(()=>Gt(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function An(e,t){return jn(e,t)}function jn(e,t,n){G(Sn(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=W.useContext(Y),{matches:i}=W.useContext(X),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Xn(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=Z(),d;if(t){let e=typeof t==`string`?gt(t):t;G(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):yt(e,{pathname:p});K(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),K(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Rn(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:J([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:J([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?W.createElement(mn.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function Mn(){let e=qn(),t=Qt(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=W.createElement(W.Fragment,null,W.createElement(`p`,null,`💿 Hey developer 👋`),W.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,W.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,W.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),W.createElement(W.Fragment,null,W.createElement(`h2`,null,`Unexpected Application Error!`),W.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?W.createElement(`pre`,{style:i},n):null,o)}var Nn=W.createElement(Mn,null),Pn=class extends W.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=bn(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:W.createElement(X.Provider,{value:this.props.routeContext},W.createElement(hn.Provider,{value:e,children:this.props.component}));return this.context?W.createElement(In,{error:e},t):t}};Pn.contextType=ln;var Fn=new WeakMap;function In({children:e,error:t}){let{basename:n}=W.useContext(Y);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=yn(t.digest);if(e){let r=Fn.get(t);if(r)throw r;let i=tn(e.location,n),a=i.absoluteURL||i.to;if(on(a))throw Error(`Invalid redirect location`);if(en&&!Fn.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw Fn.set(t,n),n}return W.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function Ln({routeContext:e,match:t,children:n}){let r=W.useContext(sn);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),W.createElement(X.Provider,{value:e},n)}function Rn(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);G(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:$t(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||Nn,o&&(s<0&&c===0?(Xn(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?W.createElement(n.route.Component,null):n.route.element?n.route.element:e,W.createElement(Ln,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?W.createElement(Pn,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function zn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Bn(e){let t=W.useContext(sn);return G(t,zn(e)),t}function Vn(e){let t=W.useContext(cn);return G(t,zn(e)),t}function Hn(e){let t=W.useContext(X);return G(t,zn(e)),t}function Un(e){let t=Hn(e),n=t.matches[t.matches.length-1];return G(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Wn(){return Un(`useRouteId`)}function Gn(){let e=Vn(`useNavigation`);return W.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function Kn(){let{matches:e,loaderData:t}=Vn(`useMatches`);return W.useMemo(()=>e.map(e=>xt(e,t)),[e,t])}function qn(){let e=W.useContext(hn),t=Vn(`useRouteError`),n=Un(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Jn(){let{router:e}=Bn(`useNavigate`),t=Un(`useNavigate`),n=W.useRef(!1);return wn(()=>{n.current=!0}),W.useCallback(async(r,i={})=>{K(n.current,Cn),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Yn={};function Xn(e,t,n){!t&&!Yn[e]&&(Yn[e]=!0,K(!1,n))}W.memo(Zn);function Zn({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return jn(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Qn(e){return On(e.context)}function $n(e){G(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function er({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){G(!Sn(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=W.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=gt(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=W.useMemo(()=>{let e=q(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return K(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:W.createElement(Y.Provider,{value:c},W.createElement(mn.Provider,{children:t,value:h}))}function tr({children:e,location:t}){return An(nr(e),t)}W.Component;function nr(e,t=[]){let n=[];return W.Children.forEach(e,(e,r)=>{if(!W.isValidElement(e))return;let i=[...t,r];if(e.type===W.Fragment){n.push.apply(n,nr(e.props.children,i));return}G(e.type===$n,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),G(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=nr(e.props.children,i)),n.push(a)}),n}var rr=`get`,ir=`application/x-www-form-urlencoded`;function ar(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function or(e){return ar(e)&&e.tagName.toLowerCase()===`button`}function sr(e){return ar(e)&&e.tagName.toLowerCase()===`form`}function cr(e){return ar(e)&&e.tagName.toLowerCase()===`input`}function lr(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function ur(e,t){return e.button===0&&(!t||t===`_self`)&&!lr(e)}var dr=null;function fr(){if(dr===null)try{new FormData(document.createElement(`form`),0),dr=!1}catch{dr=!0}return dr}var pr=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function mr(e){return e!=null&&!pr.has(e)?(K(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ir}"`),null):e}function hr(e,t){let n,r,i,a,o;if(sr(e)){let o=e.getAttribute(`action`);r=o?q(o,t):null,n=e.getAttribute(`method`)||rr,i=mr(e.getAttribute(`enctype`))||ir,a=new FormData(e)}else if(or(e)||cr(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?q(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||rr,i=mr(e.getAttribute(`formenctype`))||mr(o.getAttribute(`enctype`))||ir,a=new FormData(o,e),!fr()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(ar(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=rr,r=null,i=ir,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var gr={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},_r=/[&><\u2028\u2029]/g;function vr(e){return e.replace(_r,e=>gr[e])}function yr(e,t){if(e===!1||e==null)throw Error(t)}function br(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&q(i.pathname,t)===`/`?i.pathname=`${qt(t)}/_root.${r}`:i.pathname=`${qt(i.pathname)}.${r}`,i}async function xr(e,t){if(e.id in t)return t[e.id];try{let n=await at(()=>import(e.module),[],import.meta.url);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Sr(e){return e!=null&&typeof e.page==`string`}function Cr(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function wr(e,t,n){return kr((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await xr(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(Cr).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function Tr(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function Er(e,t,{includeHydrateFallback:n}={}){return Dr(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function Dr(e){return[...new Set(e)]}function Or(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function kr(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!Sr(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(Or(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function Ar(){let e=W.useContext(sn);return yr(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function jr(){let e=W.useContext(cn);return yr(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var Mr=W.createContext(void 0);Mr.displayName=`FrameworkContext`;function Nr(){let e=W.useContext(Mr);return yr(e,`You must render this element inside a <HydratedRouter> element`),e}function Pr(e,t){let n=W.useContext(Mr),[r,i]=W.useState(!1),[a,o]=W.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=W.useRef(null);W.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),W.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:Fr(s,p),onBlur:Fr(c,m),onMouseEnter:Fr(l,p),onMouseLeave:Fr(u,m),onTouchStart:Fr(d,p)}]:[a,f,{}]:[!1,f,{}]}function Fr(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Ir({page:e,...t}){let n=un(),{nonce:r}=Nr(),{router:i}=Ar(),a=W.useMemo(()=>yt(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?W.createElement(Rr,{page:e,matches:a,...t}):W.createElement(zr,{page:e,matches:a,...t})):null}function Lr(e){let{manifest:t,routeModules:n}=Nr(),[r,i]=W.useState([]);return W.useEffect(()=>{let r=!1;return wr(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Rr({page:e,matches:t,...n}){let r=Z(),{future:i}=Nr(),{basename:a}=Ar(),o=W.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=br(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return W.createElement(W.Fragment,null,o.map(e=>W.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function zr({page:e,matches:t,...n}){let r=Z(),{future:i,manifest:a,routeModules:o}=Nr(),{basename:s}=Ar(),{loaderData:c,matches:l}=jr(),u=W.useMemo(()=>Tr(e,t,l,a,r,`data`),[e,t,l,a,r]),d=W.useMemo(()=>Tr(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=W.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=br(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=W.useMemo(()=>Er(d,a),[d,a]),m=Lr(d);return W.createElement(W.Fragment,null,f.map(e=>W.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>W.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>W.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Br(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}W.Component;var Vr=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Vr&&(window.__reactRouterVersion=`7.18.1`)}catch{}function Hr({basename:e,children:t,useTransitions:n,window:r}){let i=W.useRef();i.current??(i.current=dt({window:r,v5Compat:!0}));let a=i.current,[o,s]=W.useState({action:a.action,location:a.location}),c=W.useCallback(e=>{n===!1?s(e):W.startTransition(()=>s(e))},[n]);return W.useLayoutEffect(()=>a.listen(c),[a,c]),W.createElement(er,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function Ur({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=W.useState({action:n.action,location:n.location}),o=W.useCallback(e=>{r===!1?a(e):W.startTransition(()=>a(e))},[r]);return W.useLayoutEffect(()=>n.listen(o),[n,o]),W.createElement(er,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}Ur.displayName=`unstable_HistoryRouter`;var Wr=W.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=W.useContext(Y),v=typeof l==`string`&&ot.test(l),y=tn(l,h);l=y.to;let b=xn(l,{relative:r}),x=Z(),S=null;if(o){let e=Gt(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:J([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=Pr(n,p),E=Zr(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let O=!(y.isExternal||i),k=W.createElement(`a`,{...p,...T,href:(O?S:void 0)||y.absoluteURL||b,onClick:O?D:e,ref:Br(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?W.createElement(W.Fragment,null,k,W.createElement(Ir,{page:b})):k});Wr.displayName=`Link`;var Gr=W.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=kn(a,{relative:c.relative}),d=Z(),f=W.useContext(cn),{navigator:p,basename:m}=W.useContext(Y),h=f!=null&&si(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=q(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return W.createElement(Wr,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});Gr.displayName=`NavLink`;var Kr=W.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=rr,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=W.useContext(Y),g=ei(),_=ti(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&ot.test(s);return W.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?W.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});Kr.displayName=`Form`;function qr({getKey:e,storageKey:t,...n}){let r=W.useContext(Mr),{basename:i}=W.useContext(Y),a=Z(),o=Kn();ai({getKey:e,storageKey:t});let s=W.useMemo(()=>{if(!r||!e)return null;let t=ii(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),W.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${vr(JSON.stringify(t||ni))}, ${vr(JSON.stringify(s))})`}})}qr.displayName=`ScrollRestoration`;function Jr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Yr(e){let t=W.useContext(sn);return G(t,Jr(e)),t}function Xr(e){let t=W.useContext(cn);return G(t,Jr(e)),t}function Zr(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=Tn(),d=Z(),f=kn(e,{relative:o});return W.useCallback(p=>{if(ur(p,t)){p.preventDefault();let t=n===void 0?ht(d)===ht(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?W.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Qr=0,$r=()=>`__${String(++Qr)}__`;function ei(){let{router:e}=Yr(`useSubmit`),{basename:t}=W.useContext(Y),n=Wn(),r=e.fetch,i=e.navigate;return W.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=hr(e,t);if(a.navigate===!1){let e=a.fetcherKey||$r();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function ti(e,{relative:t}={}){let{basename:n}=W.useContext(Y),r=W.useContext(X);G(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...kn(e||`.`,{relative:t})},o=Z();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:J([n,a.pathname])),ht(a)}var ni=`react-router-scroll-positions`,ri={};function ii(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:q(e.pathname,n)||e.pathname},t)),i??(i=e.key),i}function ai({getKey:e,storageKey:t}={}){let{router:n}=Yr(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Xr(`useScrollRestoration`),{basename:a}=W.useContext(Y),o=Z(),s=Kn(),c=Gn();W.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),oi(W.useCallback(()=>{if(c.state===`idle`){let t=ii(o,s,a,e);ri[t]=window.scrollY}try{sessionStorage.setItem(t||ni,JSON.stringify(ri))}catch(e){K(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(W.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||ni);e&&(ri=JSON.parse(e))}catch{}},[t]),W.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(ri,()=>window.scrollY,e?(t,n)=>ii(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),W.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{K(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function oi(e,t){let{capture:n}=t||{};W.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function si(e,{relative:t}={}){let n=W.useContext(dn);G(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Yr(`useViewTransitionState`),i=kn(e,{relative:t});if(!n.isTransitioning)return!1;let a=q(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=q(n.nextLocation.pathname,r)||n.nextLocation.pathname;return It(i.pathname,o)!=null||It(i.pathname,a)!=null}var Q=a(),ci=()=>(0,Q.jsx)(Qn,{}),li=c(o()),ui=c(e()),di=class extends Me{constructor(){super(...arguments),this.state={textId:P()}}render(){let{theme:e,dateEnv:t,options:n,viewApi:r}=this.context,{cellId:i,dayDate:a,todayRange:o}=this.props,{textId:s}=this.state,c=ne(a,o),l=n.listDayFormat?t.format(a,n.listDayFormat):``,u=n.listDaySideFormat?t.format(a,n.listDaySideFormat):``,d=Object.assign({date:t.toDate(a),view:r,textId:s,text:l,sideText:u,navLinkAttrs:we(this.context,a),sideNavLinkAttrs:we(this.context,a,`day`,!1)},c);return z(R,{elTag:`tr`,elClasses:[`fc-list-day`,...j(c,e)],elAttrs:{"data-date":te(a)},renderProps:d,generatorName:`dayHeaderContent`,customGenerator:n.dayHeaderContent,defaultGenerator:fi,classNameGenerator:n.dayHeaderClassNames,didMount:n.dayHeaderDidMount,willUnmount:n.dayHeaderWillUnmount},t=>z(`th`,{scope:`colgroup`,colSpan:3,id:i,"aria-labelledby":s},z(t,{elTag:`div`,elClasses:[`fc-list-day-cushion`,e.getClass(`tableCellShaded`)]})))}};function fi(e){return z(xe,null,e.text&&z(`a`,Object.assign({id:e.textId,className:`fc-list-day-text`},e.navLinkAttrs),e.text),e.sideText&&z(`a`,Object.assign({"aria-hidden":!0,className:`fc-list-day-side-text`},e.sideNavLinkAttrs),e.sideText))}var pi=ge({hour:`numeric`,minute:`2-digit`,meridiem:`short`}),mi=class extends Me{render(){let{props:e,context:t}=this,{options:n}=t,{seg:r,timeHeaderId:i,eventHeaderId:a,dateHeaderId:o}=e,s=n.eventTimeFormat||pi;return z(_e,Object.assign({},e,{elTag:`tr`,elClasses:[`fc-list-event`,r.eventRange.def.url&&`fc-event-forced-url`],defaultGenerator:()=>hi(r,t),seg:r,timeText:``,disableDragging:!0,disableResizing:!0}),(e,n)=>z(xe,null,gi(r,s,t,i,o),z(`td`,{"aria-hidden":!0,className:`fc-list-event-graphic`},z(`span`,{className:`fc-list-event-dot`,style:{borderColor:n.borderColor||n.backgroundColor}})),z(e,{elTag:`td`,elClasses:[`fc-list-event-title`],elAttrs:{headers:`${a} ${o}`}})))}};function hi(e,t){let n=F(e,t);return z(`a`,Object.assign({},n),e.eventRange.def.title)}function gi(e,t,n,r,i){let{options:a}=n;if(a.displayEventTime!==!1){let o=e.eventRange.def,s=e.eventRange.instance,c=!1,l;if(o.allDay?c=!0:L(e.eventRange.range)?e.isStart?l=Oe(e,t,n,null,null,s.range.start,e.end):e.isEnd?l=Oe(e,t,n,null,null,e.start,s.range.end):c=!0:l=Oe(e,t,n),c){let e={text:n.options.allDayText,view:n.viewApi};return z(R,{elTag:`td`,elClasses:[`fc-list-event-time`],elAttrs:{headers:`${r} ${i}`},renderProps:e,generatorName:`allDayContent`,customGenerator:a.allDayContent,defaultGenerator:_i,classNameGenerator:a.allDayClassNames,didMount:a.allDayDidMount,willUnmount:a.allDayWillUnmount})}return z(`td`,{className:`fc-list-event-time`},l)}return null}function _i(e){return e.text}var vi=class extends Ne{constructor(){super(...arguments),this.computeDateVars=ae(bi),this.eventStoreToSegs=ae(this._eventStoreToSegs),this.state={timeHeaderId:P(),eventHeaderId:P(),dateHeaderIdRoot:P()},this.setRootEl=e=>{e?this.context.registerInteractiveComponent(this,{el:e}):this.context.unregisterInteractiveComponent(this)}}render(){let{props:e,context:t}=this,{dayDates:n,dayRanges:r}=this.computeDateVars(e.dateProfile),i=this.eventStoreToSegs(e.eventStore,e.eventUiBases,r);return z(ce,{elRef:this.setRootEl,elClasses:[`fc-list`,t.theme.getClass(`table`),t.options.stickyHeaderDates===!1?``:`fc-list-sticky`],viewSpec:t.viewSpec},z(oe,{liquid:!e.isHeightAuto,overflowX:e.isHeightAuto?`visible`:`hidden`,overflowY:e.isHeightAuto?`visible`:`auto`},i.length>0?this.renderSegList(i,n):this.renderEmptyMessage()))}renderEmptyMessage(){let{options:e,viewApi:t}=this.context;return z(R,{elTag:`div`,elClasses:[`fc-list-empty`],renderProps:{text:e.noEventsText,view:t},generatorName:`noEventsContent`,customGenerator:e.noEventsContent,defaultGenerator:yi,classNameGenerator:e.noEventsClassNames,didMount:e.noEventsDidMount,willUnmount:e.noEventsWillUnmount},e=>z(e,{elTag:`div`,elClasses:[`fc-list-empty-cushion`]}))}renderSegList(e,t){let{theme:n,options:r}=this.context,{timeHeaderId:i,eventHeaderId:a,dateHeaderIdRoot:o}=this.state,s=xi(e);return z(ie,{unit:`day`},(e,c)=>{let l=[];for(let n=0;n<s.length;n+=1){let u=s[n];if(u){let s=te(t[n]),d=o+`-`+s;l.push(z(di,{key:s,cellId:d,dayDate:t[n],todayRange:c})),u=ye(u,r.eventOrder);for(let t of u)l.push(z(mi,Object.assign({key:s+`:`+t.eventRange.instance.instanceId,seg:t,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,timeHeaderId:i,eventHeaderId:a,dateHeaderId:d},I(t,c,e))))}}return z(`table`,{className:`fc-list-table `+n.getClass(`table`)},z(`thead`,null,z(`tr`,null,z(`th`,{scope:`col`,id:i},r.timeHint),z(`th`,{scope:`col`,"aria-hidden":!0}),z(`th`,{scope:`col`,id:a},r.eventHint))),z(`tbody`,null,l))})}_eventStoreToSegs(e,t,n){return this.eventRangesToSegs(fe(e,t,this.props.dateProfile.activeRange,this.context.options.nextDayThreshold).fg,n)}eventRangesToSegs(e,t){let n=[];for(let r of e)n.push(...this.eventRangeToSegs(r,t));return n}eventRangeToSegs(e,t){let{dateEnv:n}=this.context,{nextDayThreshold:r}=this.context.options,i=e.range,a=e.def.allDay,o,s,c,l=[];for(o=0;o<t.length;o+=1)if(s=M(i,t[o]),s&&(c={component:this,eventRange:e,start:s.start,end:s.end,isStart:e.isStart&&s.start.valueOf()===i.start.valueOf(),isEnd:e.isEnd&&s.end.valueOf()===i.end.valueOf(),dayIndex:o},l.push(c),!c.isEnd&&!a&&o+1<t.length&&i.end<n.add(t[o+1].start,r))){c.end=i.end,c.isEnd=!0;break}return l}};function yi(e){return e.text}function bi(e){let t=je(e.renderRange.start),n=e.renderRange.end,r=[],i=[];for(;t<n;)r.push(t),i.push({start:t,end:N(t,1)}),t=N(t,1);return{dayDates:r,dayRanges:i}}function xi(e){let t=[],n,r;for(n=0;n<e.length;n+=1)r=e[n],(t[r.dayIndex]||(t[r.dayIndex]=[])).push(r);return t}re(`:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid var(--fc-border-color)}.fc .fc-list-empty{align-items:center;background-color:var(--fc-neutral-bg-color);display:flex;height:100%;justify-content:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{border-style:hidden;width:100%}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{background:var(--fc-page-bg-color);position:sticky;top:0}.fc .fc-list-table thead{left:-10000px;position:absolute}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{clear:both;content:"";display:table}.fc-theme-standard .fc-list-day-cushion{background-color:var(--fc-neutral-bg-color)}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:var(--fc-list-event-hover-bg-color)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{border:calc(var(--fc-list-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-list-event-dot-width)/2);box-sizing:content-box;display:inline-block;height:0;width:0}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}`);var Si={listDayFormat:Ci,listDaySideFormat:Ci,noEventsClassNames:se,noEventsContent:se,noEventsDidMount:se,noEventsWillUnmount:se};function Ci(e){return e===!1?null:ge(e)}var wi=he({name:`@fullcalendar/list`,optionRefiners:Si,views:{list:{component:vi,buttonTextKey:`list`,listDayFormat:{month:`long`,day:`numeric`,year:`numeric`}},listDay:{type:`list`,duration:{days:1},listDayFormat:{weekday:`long`}},listWeek:{type:`list`,duration:{weeks:1},listDayFormat:{weekday:`long`},listDaySideFormat:{month:`long`,day:`numeric`,year:`numeric`}},listMonth:{type:`list`,duration:{month:1},listDaySideFormat:{weekday:`long`}},listYear:{type:`list`,duration:{year:1},listDaySideFormat:{weekday:`long`}}}});r(((e,t)=>{var n=NaN,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt,c=typeof global==`object`&&global&&global.Object===Object&&global,l=typeof self==`object`&&self&&self.Object===Object&&self,u=c||l||Function(`return this`)(),d=Object.prototype.toString,f=Math.max,p=Math.min,m=function(){return u.Date.now()};function h(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,h=!0;if(typeof e!=`function`)throw TypeError(`Expected a function`);t=y(t)||0,g(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?f(y(n.maxWait)||0,t):a,h=`trailing`in n?!!n.trailing:h);function _(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function v(e){return l=e,s=setTimeout(S,t),u?_(e):o}function b(e){var n=e-c,r=e-l,i=t-n;return d?p(i,a-r):i}function x(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function S(){var e=m();if(x(e))return C(e);s=setTimeout(S,b(e))}function C(e){return s=void 0,h&&r?_(e):(r=i=void 0,o)}function w(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function T(){return s===void 0?o:C(m())}function E(){var e=m(),n=x(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return v(c);if(d)return s=setTimeout(S,t),_(c)}return s===void 0&&(s=setTimeout(S,t)),o}return E.cancel=w,E.flush=T,E}function g(e){var t=typeof e;return!!e&&(t==`object`||t==`function`)}function _(e){return!!e&&typeof e==`object`}function v(e){return typeof e==`symbol`||_(e)&&d.call(e)==`[object Symbol]`}function y(e){if(typeof e==`number`)return e;if(v(e))return n;if(g(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=g(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=e.replace(r,``);var c=a.test(e);return c||o.test(e)?s(e.slice(2),c?2:8):i.test(e)?n:+e}t.exports=h}))();var Ti=typeof window<`u`?W.useLayoutEffect:W.useEffect;function Ei(e,t,n,r){let i=(0,W.useRef)(t);Ti(()=>{i.current=t},[t]),(0,W.useEffect)(()=>{let t=n?.current??window;if(!(t&&t.addEventListener))return;let a=e=>{i.current(e)};return t.addEventListener(e,a,r),()=>{t.removeEventListener(e,a,r)}},[e,n,r])}function Di(e){let t=(0,W.useRef)(()=>{throw Error(`Cannot call an event handler while rendering.`)});return Ti(()=>{t.current=e},[e]),(0,W.useCallback)((...e)=>t.current?.call(t,...e),[t])}var Oi=typeof window>`u`;function ki(e,t,n={}){let{initializeWithValue:r=!0}=n,i=(0,W.useCallback)(e=>n.serializer?n.serializer(e):JSON.stringify(e),[n]),a=(0,W.useCallback)(e=>{if(n.deserializer)return n.deserializer(e);if(e===`undefined`)return;let r=t instanceof Function?t():t,i;try{i=JSON.parse(e)}catch(e){return console.error(`Error parsing JSON:`,e),r}return i},[n,t]),o=(0,W.useCallback)(()=>{let n=t instanceof Function?t():t;if(Oi)return n;try{let t=window.localStorage.getItem(e);return t?a(t):n}catch(t){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,t),n}},[t,e,a]),[s,c]=(0,W.useState)(()=>r?o():t instanceof Function?t():t),l=Di(t=>{Oi&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{let n=t instanceof Function?t(o()):t;window.localStorage.setItem(e,i(n)),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))}catch(t){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,t)}}),u=Di(()=>{Oi&&console.warn(`Tried removing localStorage key \u201C${e}\u201D even though environment is not a client`);let n=t instanceof Function?t():t;window.localStorage.removeItem(e),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))});(0,W.useEffect)(()=>{c(o())},[e]);let d=(0,W.useCallback)(t=>{t.key&&t.key!==e||c(o())},[e,o]);return Ei(`storage`,d),Ei(`local-storage`,d),[s,l,u]}var Ai={week:{duration:{weeks:1},dateAlignment:`week`,dateIncrement:{weeks:1}},month:{duration:{months:1},dateAlignment:`month`,dateIncrement:{months:1}},threeMonths:{duration:{months:3},dateAlignment:`month`,dateIncrement:{months:3}},year:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1}}},ji=e=>Ai[e],Mi=()=>{let[e,t]=ki(`solspace-calendar-agenda-range`,`month`);return{range:Object.hasOwn(Ai,e)?e:`month`,setRange:t}},Ni=({range:e,onChange:t,disabled:n})=>{let r=(0,W.useId)();return(0,Q.jsxs)(`div`,{className:`calendar-agenda-range`,children:[(0,Q.jsx)(`label`,{htmlFor:r,children:Craft.t(`calendar`,`Range`)}),(0,Q.jsx)(`div`,{className:`select`,children:(0,Q.jsxs)(`select`,{id:r,"aria-label":Craft.t(`calendar`,`Agenda range`),value:e,disabled:n,onChange:e=>t(e.target.value),children:[(0,Q.jsx)(`option`,{value:`week`,children:Craft.t(`calendar`,`Week`)}),(0,Q.jsx)(`option`,{value:`month`,children:Craft.t(`calendar`,`Month`)}),(0,Q.jsx)(`option`,{value:`threeMonths`,children:Craft.t(`calendar`,`3 months`)}),(0,Q.jsx)(`option`,{value:`year`,children:Craft.t(`calendar`,`Year`)})]})})]})},Pi=`solspace-calendar-hidden-calendars`,Fi={day:`timeGridDay`,week:`timeGridWeek`,month:`dayGridMonth`,year:`calendarYear`,agenda:`listMonth`},Ii=()=>{let e=window.location.pathname.split(`/`).filter(Boolean).at(-1);return e&&Fi[e]||null},Li=e=>Object.entries(Fi).find(([,t])=>t===e)?.[0]??`month`,Ri=(e=`month`,t)=>{let n=(0,W.useMemo)(()=>{let e=Object.keys(Fi),n=e.filter(e=>!t||t.includes(e));return(n.length?n:e).map(e=>Fi[e])},[t]),r=(0,W.useCallback)(t=>n.includes(t)?t:n.includes(Fi[e])?Fi[e]:n.includes(`dayGridMonth`)?`dayGridMonth`:n[0],[e,n]),[i,a]=(0,W.useState)(()=>r(Ii()||Fi[e]||`dayGridMonth`)),[o,s]=(0,W.useState)(!1);return(0,W.useEffect)(()=>{s(!0)},[]),{view:i,setView:e=>{a(r(e)),s(!0)},isReady:o,enabledViews:n,resolveView:r}},zi=()=>{let[e,t]=ki(Pi,[]);return{hiddenCalendarIds:e,toggleCalendarVisibility:e=>{t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}}},Bi=(e,t)=>{let n=t??Ii(),r=n?`/${Li(n)}`:``,i=new URL(Craft.getCpUrl(`calendar/${A(e)}${r}`),window.location.origin);i.search=window.location.search,i.toString()!==window.location.href&&history.pushState(`data`,``,i.toString())},Vi=`refresh prev,today,datepicker,next`,Hi=(e,{datePickerButton:t})=>({prev:{text:Craft.t(`calendar`,`Previous`),icon:`chevron-left`,click:()=>{e.prev(),Bi(e.getDate())}},next:{text:Craft.t(`calendar`,`Next`),icon:`chevron-right`,click:()=>{e.next(),Bi(e.getDate())}},refresh:{text:Craft.t(`calendar`,`Refresh`),icon:`refresh`,click:()=>{ke(),e.refetchEvents()}},datepicker:t}),Ui=(0,W.createContext)(null),Wi=({config:e,children:t})=>{let n=(0,W.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,Q.jsx)(Ui.Provider,{value:n,children:t})},$=()=>{let e=(0,W.useContext)(Ui);if(!e)throw Error(`ConfigContext is not provided`);return e},Gi=(e,t,n)=>{let{weekStartDay:r}=$(),i=(0,W.useRef)(null),[a,o]=(0,W.useState)(!1),[s,c]=(0,W.useState)(null),[l,u]=(0,W.useState)(null),d=(0,W.useCallback)(()=>{o(!1),c(null)},[]);(0,W.useEffect)(()=>{if(!a)return;let e=e=>{let t=e.target;i.current?.contains(t)||t.closest(`.fc-datepicker-button`)||d()},t=e=>{e.key===`Escape`&&d()};return window.addEventListener(`mousedown`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`mousedown`,e),window.removeEventListener(`keydown`,t)}},[d,a]);let f=(0,W.useCallback)(t=>{if(!t)return;let n=T(t);Bi(n),e.gotoDate(n),u(t),d()},[d,e]),p=(0,W.useCallback)((t,n)=>{let{bottom:r,right:i}=n.getBoundingClientRect();u(w(e.getDate())),o(e=>!e),c({top:r+8,left:i})},[e]);return{dateSelector:a&&s?(0,Q.jsx)(Ki,{view:t,agendaRange:n,popoverRef:i,position:s,selectedDate:l,weekStartDay:r,onDateSelect:f}):null,datePickerButton:{text:Craft.t(`calendar`,`Pick a Date`),icon:`datepicker`,click:p}}},Ki=({view:e,agendaRange:t,popoverRef:n,position:r,selectedDate:i,weekStartDay:a,onDateSelect:o})=>{let s=e===`timeGridWeek`||e===`listMonth`&&t===`week`,c=e===`calendarYear`||e===`listMonth`&&t===`year`,l=e===`dayGridMonth`||e===`listMonth`&&!s&&!c;return(0,Q.jsx)(`div`,{ref:n,className:`fc-datepicker-popover`,style:{top:r.top,left:r.left},children:(0,Q.jsx)(ze,{...D(),inline:!0,selected:i,onChange:o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:a,showWeekPicker:s,showWeekNumbers:s,showMonthYearPicker:l,showYearPicker:c})})},qi=e=>e.view.type===`dayGridMonth`&&!e.event.allDay&&!e.event.extendedProps?.multiDay,Ji=e=>{let t=e?.toLowerCase();return t===`black`||t===`white`?`fc-color-${t}`:null},Yi=({event:e})=>{let t=[];e.allDay&&t.push(`fc-event-all-day`),e.end&&(!e.extendedProps?.multiDay&&!e.allDay?t.push(`fc-event-single-day`):t.push(`fc-event-multi-day`)),e.extendedProps?.enabled===!1&&t.push(`fc-event-disabled`),e.extendedProps?.cancelled&&t.push(`fc-event-cancelled`);let n=Ji(e.textColor);return n&&t.push(n),t},Xi=(e,t)=>v(e)?`ignore`:x(t,`[data-calendar-event-title-link]`)?`navigate`:`open`,Zi=e=>{let{event:t,timeText:n}=e,r=e.view.type===`listMonth`,i=U(`fc-event-title`,qi(e)&&`fc-event-title-inline`),a=!v(t)&&t.url,o=!!t.extendedProps?.cancelled,c=!o&&t.extendedProps?.isEdited?(0,Q.jsx)(`span`,{className:`fc-event-flag`,title:s(`This occurrence has its own changes.`),"aria-hidden":`true`,children:`✎`}):null,l=o&&!r?(0,Q.jsxs)(`span`,{className:`visually-hidden`,children:[`, `,s(`Cancelled`)]}):null,u=(0,Q.jsx)(Ue,{count:t.extendedProps.overlaps?.count}),d=r?(0,Q.jsxs)(`a`,{href:t.url||`#`,className:i,children:[u,c,t.title]}):a?(0,Q.jsxs)(`button`,{type:`button`,onClick:()=>window.location.href=t.url,className:i,"data-calendar-event-title-link":!0,children:[u,c,t.title,l]}):(0,Q.jsxs)(`div`,{className:i,children:[u,c,t.title,l]});if(r){let{calendarName:e,location:n,description:r}=t.extendedProps;return(0,Q.jsxs)(`div`,{className:`calendar-agenda-event`,children:[(0,Q.jsxs)(`div`,{className:`calendar-agenda-header`,children:[(0,Q.jsxs)(`div`,{className:`calendar-agenda-title`,children:[d,o&&(0,Q.jsx)(`span`,{className:`calendar-agenda-cancelled`,children:s(`Cancelled`)})]}),e&&(0,Q.jsxs)(`span`,{className:`calendar-agenda-calendar`,children:[(0,Q.jsx)(`span`,{className:`calendar-agenda-calendar-dot`,style:{backgroundColor:t.extendedProps.calendarColor||t.backgroundColor},"aria-hidden":`true`}),e]})]}),n&&(0,Q.jsx)(`div`,{className:`calendar-agenda-meta`,children:(0,Q.jsx)(`span`,{className:`calendar-agenda-location`,children:n})}),r&&(0,Q.jsx)(`div`,{className:`calendar-agenda-description`,children:r})]})}return qi(e)?(0,Q.jsxs)(`div`,{className:`fc-event-main-frame fc-event-main-frame-inline`,children:[(0,Q.jsx)(`span`,{className:`fc-color-icon`,style:{backgroundColor:t.backgroundColor,borderColor:t.borderColor}}),(0,Q.jsx)(`div`,{className:`fc-event-title-container`,children:d}),n?(0,Q.jsx)(`div`,{className:`fc-event-time`,children:n}):null]}):(0,Q.jsx)(`div`,{className:`fc-event-main-frame`,children:(0,Q.jsx)(`div`,{className:`fc-event-title-container`,children:d})})},Qi=`calendar:schedule-history-reset`,$i=e=>{let[t,n]=(0,W.useState)([]),[r,i]=(0,W.useState)([]),[a,o]=(0,W.useState)(!1),s=(0,W.useRef)(!1),c=(0,W.useCallback)(()=>{n([]),i([])},[]);(0,W.useEffect)(()=>(window.addEventListener(Qi,c),()=>window.removeEventListener(Qi,c)),[c]);let l=(0,W.useCallback)(e=>{n(t=>[...t,e].slice(-50)),i([])},[]),u=(0,W.useCallback)(async e=>{if(s.current)return!1;s.current=!0,o(!0);try{return await e()}finally{s.current=!1,o(!1)}},[]);return{add:l,run:u,replay:(0,W.useCallback)(async a=>{let o=(a===`undo`?t:r).at(-1);o&&await u(async()=>await Ae(o,a)?(a===`undo`?(n(e=>e.slice(0,-1)),i(e=>[...e,o])):(i(e=>e.slice(0,-1)),n(e=>[...e,o])),e(),!0):!1)},[t,r,u,e]),clear:c,busy:a,canUndo:t.length>0,canRedo:r.length>0}},ea=n.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--medium-border-radius, 4px);
  background: #c4cfe1;
`,ta=n.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 39px;
  height: 34px;
  padding: 0;
  border: 0;
  background: #c4cfe1;
  color: #5a6875;
  cursor: pointer;
  & + & { border-left: 1px solid #e3ecfb; }
  &:hover:not(:disabled) { background: #b5c4d8; }
  &:active:not(:disabled) { background: #a6b4c9; }
  &:focus-visible { outline: 2px solid currentColor; outline-offset: -2px; }
  &:disabled { background: #d5dfeb; color: #a0aab4; cursor: default; }
`,na=({canUndo:e,canRedo:t,disabled:n,onReplay:r})=>((0,W.useEffect)(()=>{let i=i=>{if(n||i.defaultPrevented||i.altKey||!(i.metaKey||i.ctrlKey))return;let a=i.target;if(a instanceof HTMLElement&&a.closest(`input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=textbox]`)||document.querySelector(`.modal:not(.hidden), .cp-screen-slideout:not(.hidden)`))return;let o=i.key.toLowerCase(),s=o===`z`?i.shiftKey?`redo`:`undo`:o===`y`&&i.ctrlKey?`redo`:null;!s||!(s===`undo`?e:t)||(i.preventDefault(),r(s))};return document.addEventListener(`keydown`,i),()=>document.removeEventListener(`keydown`,i)},[e,t,n,r]),(0,Q.jsx)(ea,{role:`group`,"aria-label":s(`Event history`),children:[`undo`,`redo`].map(i=>(0,Q.jsx)(ta,{type:`button`,disabled:n||!(i===`undo`?e:t),title:s(i===`undo`?`Undo`:`Redo`),"aria-label":s(i===`undo`?`Undo`:`Redo`),onClick:()=>r(i),children:(0,Q.jsx)(`svg`,{viewBox:`0 0 96 80`,width:`18`,height:`16`,"aria-hidden":`true`,focusable:`false`,children:(0,Q.jsx)(`g`,{transform:i===`redo`?`translate(96 0) scale(-1 1)`:void 0,children:(0,Q.jsx)(`path`,{fill:`currentColor`,d:`M37 1 1 30l36 29V41h18c15 0 23 8 23 22 0 6-2 11-5 16 12-8 19-19 19-31 0-20-14-31-37-31H37V1Z`})})})},i))})),ra=()=>new URL(window.location.href).searchParams.get(`search`)?.trim()??``,ia=({initialSearch:e,onSearchChange:t})=>{let[n,r]=(0,W.useState)(e),i=(0,W.useId)(),a=(0,W.useRef)(null);(0,W.useEffect)(()=>{let e=setTimeout(()=>t(n.trim()),250);return()=>clearTimeout(e)},[n,t]);let o=()=>{r(``),t(``),a.current?.focus()};return(0,Q.jsx)(Ye,{children:(0,Q.jsxs)(`div`,{className:`calendar-search-toolbar`,children:[(0,Q.jsxs)(`div`,{className:`calendar-search-input`,children:[(0,Q.jsx)(`span`,{className:`calendar-search-icon`,"data-icon":`search`,"aria-hidden":`true`}),(0,Q.jsx)(`input`,{type:`search`,ref:a,className:`text fullwidth`,"aria-label":s(`Search events`),"aria-describedby":i,placeholder:Craft.t(`app`,`Search`),value:n,onChange:e=>r(e.target.value),onKeyDown:e=>{e.key===`Escape`&&n&&(e.stopPropagation(),o())}}),n&&(0,Q.jsx)(`button`,{type:`button`,className:`calendar-search-clear`,"aria-label":s(`Clear search`),"data-icon":`remove`,onClick:o})]}),(0,Q.jsx)(`span`,{id:i,className:`visually-hidden`,children:s(`Searches events in the displayed date range.`)})]})})},aa=n.div`
  .calendar-year-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  .calendar-year-month {
    min-width: 0;
    padding: 16px 12px 12px;
    border: 1px solid var(--gray-150);
    border-radius: var(--radius-lg, 5px);
    background: white;

    h3 {
      margin: 0 0 12px;
      text-align: center;
    }

    h3 button {
      padding: 2px 8px;
      border: 0;
      border-radius: 4px;
      background: transparent;
      color: var(--gray-800);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: #f3f7fc;
        color: var(--blue-600);
      }
    }
  }

  .calendar-year-weekdays,
  .calendar-year-days {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    text-align: center;
  }

  .calendar-year-weekdays {
    margin-bottom: 5px;
    color: var(--gray-500);
    font-size: 11px;
    font-weight: 600;
    line-height: 24px;
  }

  .calendar-year-days {
    row-gap: 3px;
  }

  .calendar-year-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-self: center;
    width: 100%;
    max-width: 36px;
    min-height: 34px;
    padding: 3px 0;
    border: 0;
    border-radius: 5px;
    background: transparent;
    color: var(--gray-650, #596673);
    font-size: 12px;
    line-height: 18px;
    cursor: pointer;

    &.has-events {
      color: var(--gray-800);
      font-weight: 600;
    }

    &:hover {
      background: #f3f7fc;
      color: var(--blue-600);
    }

    &.is-today .calendar-year-day-number {
      min-width: 21px;
      border-radius: 50%;
      background: var(--primary-button-bg);
      color: white;
      line-height: 21px;
    }
  }

  button:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
  }

  button:disabled {
    cursor: default;
    opacity: 0.6;
  }

  .calendar-year-markers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    height: 7px;
    margin-top: 2px;
  }

  .calendar-year-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    flex: 0 0 5px;
    box-sizing: border-box;
    border-radius: 50%;

    &.is-cancelled {
      border: 1px solid #bd861a;
      background: #fff7df !important;
    }
  }

  .calendar-year-more {
    color: var(--gray-500);
    font-size: 9px;
    line-height: 7px;
  }

  .calendar-year-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px 16px;
    padding-top: 14px;
    color: var(--gray-500);
    font-size: 12px;
  }

  .calendar-year-legend {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  @container (min-width: 1150px) {
    .calendar-year-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @container (max-width: 760px) {
    .calendar-year-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
  }

  @container (max-width: 480px) {
    .calendar-year-grid {
      grid-template-columns: 1fr;
    }
  }
`,oa=n.div`
  width: min(340px, calc(100vw - 40px));
  padding: 14px 0 6px;
  box-sizing: border-box;

  h3 {
    margin: 0 14px 10px;
    color: var(--gray-800);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
  }

  ul {
    max-height: 280px;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    list-style: none;
  }

  li button {
    display: flex;
    align-items: start;
    gap: 9px;
    width: 100%;
    margin: 0;
    padding: 9px 14px;
    border: 0;
    background: transparent;
    text-align: start;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background: #f3f7fc;
    }

    &.is-cancelled strong {
      text-decoration: line-through;
    }
  }

  .year-preview-dot {
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    margin-top: 5px;
    border-radius: 50%;
  }

  .year-preview-details {
    display: grid;
    gap: 3px;
    min-width: 0;
    font-size: 12px;
    line-height: 1.4;
  }

  .year-preview-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 7px;
    color: var(--gray-800);
    font-size: 13px;
    overflow-wrap: anywhere;
  }

  .year-preview-time,
  .year-preview-calendar {
    color: var(--gray-600);
  }

  .year-preview-cancelled {
    padding: 1px 5px;
    border-radius: 3px;
    background: #fff7df;
    color: #8a6111;
    font-size: 11px;
  }
`,sa=(e,t,n)=>new Date(Date.UTC(e,t,n)),ca=e=>{let t=new Map;for(let n of e){let e=n.range.start,r=sa(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());for(;r<n.range.end;){let e=k(r),i=t.get(e)??[];i.push(n),t.set(e,i),r.setUTCDate(r.getUTCDate()+1)}}for(let e of t.values())e.sort((e,t)=>Number(t.def.allDay)-Number(e.def.allDay)||(e.instance?.range.start.getTime()??0)-(t.instance?.range.start.getTime()??0)||e.def.title.localeCompare(t.def.title));return t},la=e=>e.def.extendedProps.calendarColor||e.ui.backgroundColor||`#607d9f`,ua=e=>{let t=new Map;for(let n of e){let e=!!n.def.extendedProps.cancelled,r=la(n),i=e?`cancelled`:String(n.def.extendedProps.calendar??r);t.set(i,{color:r,cancelled:e})}return Array.from(t.entries())},da=({date:e,events:t,anchor:n,onEventSelect:r})=>{let{hidePopover:i}=g(),{language:a,formats:o}=$(),c=(0,W.useRef)(null),l=new Intl.DateTimeFormat(a,{month:`short`,day:`numeric`,year:`numeric`,timeZone:`UTC`}),u=new Intl.DateTimeFormat(a,{...o.time.short.js,timeZone:`UTC`});(0,W.useEffect)(()=>{let e=e=>{e.key===`Escape`&&i()},t=e=>{let t=e.target;!n.contains(t)&&!c.current?.contains(t)&&i()};return document.addEventListener(`keydown`,e),document.addEventListener(`pointerdown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`pointerdown`,t)}},[n,i]);let d=e=>{if(!e.instance)return``;let{start:t,end:n}=e.instance.range;if(e.def.allDay){let e=new Date(n.getTime()-1);return k(t)===k(e)?s(`All Day`):`${s(`All Day`)} · ${l.format(t)} – ${l.format(e)}`}let r=k(t)===k(n),i=u.format(t),a=u.format(n);return r?`${i} – ${a}`:`${l.format(t)} ${i} – ${l.format(n)} ${a}`};return(0,Q.jsxs)(oa,{ref:c,"data-calendar-year-preview":!0,children:[(0,Q.jsx)(`h3`,{children:e.toLocaleDateString(a,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`,timeZone:`UTC`})}),(0,Q.jsx)(`ul`,{children:t.map(e=>(0,Q.jsx)(`li`,{children:(0,Q.jsxs)(`button`,{type:`button`,className:U({"is-cancelled":e.def.extendedProps.cancelled}),onClick:t=>r(e.def.publicId,n,t),children:[(0,Q.jsx)(`span`,{className:`year-preview-dot`,style:{backgroundColor:la(e)}}),(0,Q.jsxs)(`span`,{className:`year-preview-details`,children:[(0,Q.jsxs)(`span`,{className:`year-preview-title`,children:[(0,Q.jsxs)(`strong`,{children:[(0,Q.jsx)(Ue,{count:e.def.extendedProps.overlaps?.count}),e.def.title]}),e.def.extendedProps.cancelled&&(0,Q.jsx)(`span`,{className:`year-preview-cancelled`,children:s(`Cancelled`)})]}),(0,Q.jsx)(`span`,{className:`year-preview-time`,children:d(e)}),e.def.extendedProps.calendarName&&(0,Q.jsx)(`span`,{className:`year-preview-calendar`,children:e.def.extendedProps.calendarName})]})]})},e.instance?.instanceId??e.def.defId))})]})},fa=({content:e,disabled:t,loading:n,error:r,search:i,onDateSelect:a,onMonthSelect:o,onEventSelect:c})=>{let{language:l,weekStartDay:u}=$(),{showPopover:d,hidePopover:f}=g(),p=(0,W.useRef)(void 0),m=e.dateProfile.currentRange.start.getUTCFullYear(),h=(0,W.useMemo)(()=>ca(le(e,!0)),[e]),_=(0,W.useMemo)(()=>new Intl.DateTimeFormat(l,{month:`long`,timeZone:`UTC`}),[l]),v=(0,W.useMemo)(()=>new Intl.DateTimeFormat(l,{weekday:`narrow`,timeZone:`UTC`}),[l]),y=Array.from({length:7},(e,t)=>sa(2023,0,1+u+t)),b=k(new Date);(0,W.useEffect)(()=>()=>{clearTimeout(p.current),f()},[f]),(0,W.useEffect)(()=>{clearTimeout(p.current),f()},[f,e.eventStore,m,t,n]);let x=(e,r,i)=>{t||n||!r.length||d((0,Q.jsx)(da,{date:e,events:r,anchor:i,onEventSelect:c}),i,{position:[`bottom`,`top`,`right`,`left`],closeDelayMs:300})};return(0,Q.jsxs)(aa,{children:[(0,Q.jsx)(`div`,{className:`calendar-year-grid`,children:Array.from({length:12},(e,n)=>{let r=sa(m,n,1),i=_.format(r),c=(r.getUTCDay()-u+7)%7,d=sa(m,n+1,0).getUTCDate();return(0,Q.jsxs)(`section`,{className:`calendar-year-month`,"aria-label":i,children:[(0,Q.jsx)(`h3`,{children:(0,Q.jsx)(`button`,{type:`button`,disabled:t,onClick:()=>o(r),children:i})}),(0,Q.jsx)(`div`,{className:`calendar-year-weekdays`,"aria-hidden":`true`,children:y.map(e=>(0,Q.jsx)(`span`,{children:v.format(e)},e.getUTCDay()))}),(0,Q.jsx)(`div`,{className:`calendar-year-days`,children:Array.from({length:42},(e,r)=>{let i=r-c+1;if(i<1||i>d)return(0,Q.jsx)(`span`,{},r);let o=sa(m,n,i),u=k(o),g=h.get(u)??[],_=ua(g),v=o.toLocaleDateString(l,{dateStyle:`full`,timeZone:`UTC`}),y=s(g.length===1?`{count} event`:`{count} events`,{count:g.length}),S=g.filter(e=>e.def.extendedProps.cancelled).length;return(0,Q.jsxs)(`button`,{type:`button`,className:U(`calendar-year-day`,{"is-today":u===b,"has-events":g.length>0}),"data-date":u,"aria-label":`${v}, ${y}${S?`, ${s(`Cancelled`)}: ${S}`:``}`,"aria-current":u===b?`date`:void 0,disabled:t,onClick:()=>{clearTimeout(p.current),a(o)},onMouseEnter:e=>{let t=e.currentTarget;clearTimeout(p.current),p.current=setTimeout(()=>x(o,g,t),300)},onMouseLeave:()=>clearTimeout(p.current),onFocus:e=>{clearTimeout(p.current),x(o,g,e.currentTarget)},onBlur:e=>{(!(e.relatedTarget instanceof HTMLElement)||!e.relatedTarget.closest(`[data-calendar-year-preview]`))&&f()},children:[(0,Q.jsx)(`span`,{className:`calendar-year-day-number`,children:i}),(0,Q.jsxs)(`span`,{className:`calendar-year-markers`,"aria-hidden":`true`,children:[_.slice(0,3).map(([e,t])=>(0,Q.jsx)(`span`,{className:U(`calendar-year-dot`,{"is-cancelled":t.cancelled}),style:{backgroundColor:t.color}},e)),_.length>3&&(0,Q.jsx)(`span`,{className:`calendar-year-more`,children:`+`})]})]},r)})})]},n)})}),(0,Q.jsxs)(`div`,{className:`calendar-year-footer`,children:[(0,Q.jsx)(`span`,{role:`status`,children:s(r?`Couldn’t load events. Use Refresh to try again.`:n?`Loading events…`:h.size?`Hover a date to preview its events.`:i?`No matching events in this date range.`:`No events in this date range.`)}),(0,Q.jsxs)(`span`,{className:`calendar-year-legend`,children:[(0,Q.jsx)(`span`,{className:`calendar-year-dot is-cancelled`,"aria-hidden":`true`}),s(`Cancelled`)]})]})]})},pa=({options:e,value:t,onChange:n})=>{let r=(0,W.useId)(),i=(0,W.useRef)(null),a=(0,W.useRef)(null),o=(0,W.useRef)(n),c=JSON.stringify(e),l=e.find(e=>e.value===t);return(0,W.useEffect)(()=>{o.current=n},[n]),(0,W.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu`,t.style.minWidth=`${e.getBoundingClientRect().width}px`,t.setAttribute(`aria-label`,s(`Calendar`)),a.current=t;let n=document.createElement(`ul`);t.append(n),JSON.parse(c).forEach(e=>{let t=document.createElement(`li`),r=document.createElement(`a`);r.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),r.append(i,document.createTextNode(e.label)),t.append(r),n.append(t)}),e.after(t);let r=new Garnish.MenuBtn(e,{onOptionSelect:t=>{r.hideMenu(),o.current(Number(t.dataset.calendarId)),e.focus()}}),l=t=>{t.key===`Escape`&&r.showingMenu&&(t.preventDefault(),t.stopPropagation(),r.hideMenu(),e.focus())};return document.addEventListener(`keydown`,l,!0),()=>{document.removeEventListener(`keydown`,l,!0),r.hideMenu(),r.destroy(),t.remove(),a.current=null}},[c]),(0,W.useEffect)(()=>{a.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let n=Number(e.dataset.calendarId)===t;e.classList.toggle(`sel`,n),e.setAttribute(`aria-selected`,String(n))})},[t,c]),(0,Q.jsx)(Ie,{label:s(`Calendar`),id:r,required:!0,children:(0,Q.jsxs)(ma,{ref:i,id:r,type:`button`,className:`btn menubtn fullwidth`,"aria-required":`true`,children:[(0,Q.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:l?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,Q.jsx)(`span`,{className:`calendar-name`,children:l?.label})]})})},ma=n.button`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 7px;
    text-align: start;
  }

  .color-indicator {
    flex: 0 0 10px;
    width: 10px;
    height: 10px;
    margin: 0;
  }

  .calendar-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,ha=({refetchEvents:e,onSuccess:t})=>{let{hidePopover:n}=g(),{currentSiteId:r}=$(),[i,a]=(0,W.useState)(null),[o,c]=(0,W.useState)(null),u=(0,W.useCallback)(async(i,o,u,d)=>{a(d?`prepare`:`create`),c(null);try{let a=et(i,o,r,u);d&&(a.title=i.title);let c=await He(l(d?`/api/events/prepare`:`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)});if(!c.ok){let e=null;try{e=await c.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}let f=await c.json();if(d){if(typeof f?.url!=`string`||!f.url)throw Error(s(`Couldn’t create event.`));return f.url}return ke(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),e?.(),t?.(),n(),null}catch(e){return e instanceof Error?c(e.message):c(`Failed to create event`),null}finally{a(null)}},[n,t,e,r]);return{createEvent:(e,t,n)=>u(e,t,n,!1),prepareEvent:(e,t,n)=>u(e,t,n,!0),error:o,isFetching:i!==null,isOpeningEditor:i===`prepare`}},ga=n.div`
  width: 440px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  padding: 15px;

  label.required::after {
    font-size: 10px;
  }

  hr {
    margin: 15px 0;
  }
`,_a=n(tt)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,va=n.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .field {
    margin-block: 0;
  }

  hr {
    margin: 3px 0;
  }

  textarea.text {
    resize: vertical;
    min-height: 72px;
  }
`,ya=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ba=n.label`
  font-weight: 600;
  cursor: pointer;
`,xa=n(tt)`
  flex-wrap: wrap;
  align-items: center;
`,Sa=n.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  .btn + .btn {
    margin-inline-start: 0;
  }
`,Ca=n.button`
  margin-inline-end: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--link-color);
  cursor: pointer;

  &:hover:not(:disabled) {
    text-decoration: underline;
  }

  &:disabled {
    opacity: .5;
    cursor: default;
  }
`,wa=({draft:e,onChange:t,refetchEvents:n,onConfirm:r,onCancel:i})=>{let{currentSiteId:a,showOverlapWarnings:o,calendars:c,calendarColors:l,quickCreateFields:p,quickCreateRequiredFields:m,formats:g,weekStartDay:_,eventDuration:v,timeInterval:y}=$(),b=(0,W.useId)(),x=(0,W.useMemo)(()=>Object.entries(c).map(([e,t])=>({value:Number(e),label:t,color:l?.[Number(e)]})),[c,l]),[S,w]=(0,W.useState)(e.calendarId&&x.some(t=>t.value===e.calendarId)?e.calendarId:x[0]?.value??0),[T,E]=(0,W.useState)(()=>{if(!e.calendarId)return{};let t=p?.[e.calendarId];if(!t)return{};let n={};return t.location&&e.location&&(n[t.location]=e.location),t.description&&e.description&&(n[t.description]=e.description),Object.keys(n).length?{[e.calendarId]:n}:{}}),D=p?.[S],O=D?.location,k=D?.description,A=m?.[S],te=T[S]??{},j=(0,W.useMemo)(()=>!e.rrule||e.repeatType===`NEVER`?null:Ke(e.rrule),[e.repeatType,e.rrule]),ne=O||k?{...O&&{location:te[O]??``},...k&&{description:te[k]??``}}:void 0,M=(e,t)=>{E(n=>({...n,[S]:{...n[S],[e]:t}}))},{createEvent:re,prepareEvent:N,error:P,isFetching:F,isOpeningEditor:ie}=ha({refetchEvents:n,onSuccess:r}),I=(0,W.useMemo)(()=>e.allDay?g.date.short.icu:g.datetime.short.icu,[g,e.allDay]),ae=(0,W.useMemo)(()=>u(e),[e]);return Ei(`keydown`,e=>{e.key===`Escape`&&!F&&i()}),(0,Q.jsxs)(ga,{children:[(0,Q.jsx)(_a,{children:(0,Q.jsx)(Qe,{label:s(`Title`),id:`${b}-title`,required:!0,autofocus:!0,value:e.title,placeholder:s(`Event Title`),onChange:n=>t(f(e,n))})}),(0,Q.jsxs)(va,{children:[(0,Q.jsx)(pa,{value:S,options:x,onChange:w}),(0,Q.jsx)(`hr`,{}),(0,Q.jsxs)(ya,{children:[(0,Q.jsx)(Be,{enabled:e.allDay,onClick:n=>t(d(e,n,{eventDuration:v}))}),(0,Q.jsx)(ba,{onClick:()=>t(d(e,!e.allDay,{eventDuration:v})),children:s(`All Day`)})]}),(0,Q.jsx)(H,{id:`${b}-start`,required:!0,label:s(`Starts`),value:e.start,datePickerProps:{showIcon:!0,icon:(0,Q.jsx)(V,{}),toggleCalendarOnIconClick:!0,dateFormat:I,timeFormat:g.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:_,timeIntervals:y},onChange:n=>{n!==null&&t(C(e,n,{eventDuration:v}))}}),(0,Q.jsx)(H,{id:`${b}-end`,required:!0,label:s(`Ends`),value:ae,datePickerProps:{showIcon:!0,icon:(0,Q.jsx)(V,{}),toggleCalendarOnIconClick:!0,minDate:ee(e.start),dateFormat:I,timeFormat:g.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:_,timeIntervals:y,filterTime:t=>{if(!e.start)return!0;let n=ee(e.start),r=new Date(t);return n.getTime()<r.getTime()}},onChange:n=>{n!==null&&t(h(e,n,{eventDuration:v}))}}),j&&(0,Q.jsxs)(`p`,{children:[(0,Q.jsxs)(`b`,{children:[s(`Repeats`),`:`]}),` `,j]}),(0,Q.jsx)(We,{formats:g,enabled:o&&!!S,schedule:{start:e.start,end:e.allDay?e.end-1:e.end,allDay:e.allDay,calendarId:S,siteId:a}}),(O||k)&&(0,Q.jsx)(`hr`,{}),O&&(0,Q.jsx)(Ie,{label:s(`Location`),id:`${b}-location`,required:A?.location,children:(0,Q.jsx)(`input`,{id:`${b}-location`,type:`text`,className:`text fullwidth`,disabled:F,"aria-required":A?.location||void 0,value:te[O]??``,onChange:e=>M(O,e.target.value)})}),k&&(0,Q.jsx)(Ie,{label:s(`Description`),id:`${b}-description`,required:A?.description,children:(0,Q.jsx)(`textarea`,{id:`${b}-description`,className:`text fullwidth`,rows:3,disabled:F,"aria-required":A?.description||void 0,value:te[k]??``,onChange:e=>M(k,e.target.value)})})]}),(0,Q.jsx)(`hr`,{}),P&&(0,Q.jsx)(`p`,{className:`error`,children:P}),(0,Q.jsxs)(xa,{$justifyContent:`flex-end`,$gap:8,children:[(0,Q.jsx)(Ca,{type:`button`,disabled:!S||F,onClick:async()=>{let t=await N(e,S,ne);t&&(window.location.href=t)},children:s(ie?`Processing...`:`More details…`)}),(0,Q.jsxs)(Sa,{children:[(0,Q.jsx)(`button`,{type:`button`,className:U(`btn`,F&&`disabled`),disabled:F,onClick:i,children:s(`Cancel`)}),(0,Q.jsx)(`button`,{type:`button`,className:U(`btn submit`,F&&`disabled`),disabled:!e.title||!S||F,onClick:()=>re(e,S,ne),children:s(F&&!ie?`Creating Event...`:`Create Event`)})]})]})]})},Ta=n.div`
  position: relative;
  width: max-content;
  max-width: min(360px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 15px;
  overflow-wrap: anywhere;

  .btn:not(.action-btn) {
    max-width: 100%;
    height: auto;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  hr {
    margin: 15px 0;
  }

  h3,
  p {
    text-align: center;
  }

  .calendar-label {
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 0;
    color: var(--gray-600);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
  }

  .event-title {
    margin: 0 0 6px;
    padding-inline-end: 28px;
    font-size: 18px;
    line-height: 24px;
  }

  h1.is-cancelled {
    text-decoration: line-through;
  }

  .occurrence-status {
    margin: 12px 0 0;
    padding: 8px 10px;
    border: 1px solid;
    border-radius: var(--radius-sm);
    font-size: 13px;
    line-height: 1.4;
  }

  .occurrence-status.is-edited {
    border-color: var(--blue-200);
    background: var(--blue-050);
    color: var(--blue-800);
  }

  .occurrence-status.is-cancelled {
    border-color: var(--amber-200);
    background: var(--amber-100);
    color: var(--amber-800);
  }

  .occurrence-status.is-disabled {
    border-color: var(--gray-200);
    background: var(--gray-050);
    color: var(--gray-700);
  }

  .calendar-label-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    flex: 0 0 10px;
    border-radius: 50%;
  }

  .event-details {
    display: grid;
    gap: 8px;
    margin: 12px 0 0;
    line-height: 1.4;
  }

  .event-details dt {
    font-weight: 600;
  }

  .event-details > div {
    min-width: 0;
  }

  .event-details dd {
    margin: 2px 0 0;
    color: var(--gray-600);
    overflow: hidden;
  }

  .event-location {
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .event-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`,Ea=n.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-end;
  gap: 8px;

  && .btn.action-btn {
    width: 40px;
    min-height: var(--input-height, 34px);
    height: auto;
    padding: 0;
    border: 1px solid var(--gray-200);
    background: var(--gray-050);

    &:hover:not(:disabled) {
      border-color: var(--gray-300);
      background: var(--gray-100);
    }

    &:active:not(:disabled),
    &.active {
      border-color: var(--gray-300);
      background: var(--gray-100);
    }
  }
`,Da=n.button`
  && {
    position: absolute;
    top: 12px;
    inset-inline-end: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--gray-600);
    cursor: pointer;
  }

  &::before {
    color: inherit;
    font-size: 16px;
  }

  &:hover:not(:disabled) {
    color: var(--link-color);
  }

  &:focus-visible {
    outline: 2px solid var(--link-color);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: .5;
    cursor: default;
  }
`,Oa={move:`You are moving an event.`,resize:`You are changing an event’s length.`,delete:`You are deleting an event.`},ka={move:`Which occurrences do you want to move?`,resize:`Which occurrences do you want to change?`,delete:`Which occurrences do you want to delete?`},Aa={occurrence:`Only this occurrence`,following:`This and following`,series:`All occurrences`},ja=({action:e,onSelect:t,onCancel:n})=>{let{hidePopover:r}=g(),[i,a]=(0,W.useState)(null),o=(0,W.useRef)(!0),c=(0,W.useRef)(!1),l=i!==null;(0,W.useEffect)(()=>()=>{o.current=!1,c.current||n?.()},[]);let u=(0,W.useCallback)(()=>{l||r()},[r,l]);Ei(`keydown`,e=>{e.key===`Escape`&&u()});let d=async e=>{if(!l){c.current=!0,a(e);try{await t(e)&&r()}finally{o.current&&a(null)}}};return(0,Q.jsxs)(Ta,{children:[(0,Q.jsx)(`h3`,{children:s(Oa[e])}),(0,Q.jsx)(`p`,{children:s(ka[e])}),(0,Q.jsx)(`hr`,{}),(0,Q.jsxs)(tt,{$direction:`column`,$alignItems:`center`,$gap:8,children:[[`occurrence`,`following`,`series`].map(e=>(0,Q.jsx)(`button`,{type:`button`,className:U(`btn small`,e===`occurrence`&&`submit`,l&&`disabled`),disabled:l,onClick:()=>d(e),children:s(i===e?`Processing...`:Aa[e])},e)),(0,Q.jsx)(`button`,{type:`button`,className:U(`btn small`,l&&`disabled`),disabled:l,onClick:u,children:s(`Cancel`)})]})]})},Ma=({actions:e,disabled:t})=>{let{eventActionIcons:n}=$(),{keepPopoverOpen:r}=g(),i=(0,W.useRef)(null),a=(0,W.useRef)({actions:e,disabled:t}),o=JSON.stringify(e.map(({label:e,destructive:t,icon:r,color:i})=>({label:e,destructive:t,icon:r?n?.[r]:void 0,color:i})));return(0,W.useEffect)(()=>{a.current={actions:e,disabled:t}},[e,t]),(0,W.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu menu--disclosure calendar-event-action-menu`,t.setAttribute(`aria-label`,s(`More actions`));let n=document.createElement(`ul`);t.append(n),JSON.parse(o).forEach((e,r)=>{e.destructive&&r>0&&(t.append(document.createElement(`hr`)),n=document.createElement(`ul`),t.append(n));let i=document.createElement(`li`),a=document.createElement(`a`);if(a.className=`menu-item`,e.icon){let t=document.createElement(`span`);t.className=e.color?`icon ${e.color}`:`icon`,t.setAttribute(`aria-hidden`,`true`),t.innerHTML=e.icon,a.append(t)}let o=document.createElement(`span`);o.className=`menu-item-label`,o.textContent=e.label,a.append(o),a.dataset.action=String(r),e.destructive&&a.classList.add(`error`),i.append(a),n.append(i)}),e.after(t);let c=new Garnish.MenuBtn(e,{onOptionSelect:e=>{a.current.disabled||(c.hideMenu(),a.current.actions[Number(e.dataset.action)]?.onSelect())}});c.menu.on(`show`,r);let l=t=>{t.key===`Escape`&&c.showingMenu&&(t.preventDefault(),t.stopPropagation(),c.hideMenu(),e.focus())};return document.addEventListener(`keydown`,l,!0),()=>{document.removeEventListener(`keydown`,l,!0),c.hideMenu(),c.destroy(),t.remove()}},[o,r]),(0,Q.jsx)(`button`,{ref:i,type:`button`,className:`btn menubtn action-btn`,disabled:t,"aria-label":s(`More actions`),title:s(`More actions`)})},Na=({fcEvent:e})=>{let{hidePopover:t,showPopover:n}=g(),{currentSiteId:r,formats:i}=$(),[a,o]=(0,W.useState)(!1),[c,l]=(0,W.useState)(!1),[u,d]=(0,W.useState)(!1),[f,p]=(0,W.useState)(!1),m=a||c||u||f;Ei(`keydown`,e=>{e.key===`Escape`&&t()});let h=e.event,{end:_,allDay:v}=h,y=h.extendedProps.calendarName,b=typeof h.extendedProps.location==`string`?h.extendedProps.location.trim():``,x=typeof h.extendedProps.description==`string`?h.extendedProps.description.trim():``,S=h.extendedProps.calendarColor??h.backgroundColor??h.borderColor??`#607d9f`,C=(0,W.useMemo)(()=>v?Le(_,1):_,[v,_]),T=!!h.extendedProps.rrule,D=T?Je(qe(h.extendedProps.rrule,h.start.getTime()/1e3)):null,O=De(String(h.id)),k=h.allDay?`PP`:`PPp`,ee=h.extendedProps.enabled===!1,A=!!h.extendedProps.cancelled,te=!!h.extendedProps.isEdited,j=!!h.extendedProps.hasOverride,ne=()=>e.view.calendar.refetchEvents(),M=()=>{O&&(t(),ve({eventId:Ce(String(h.id)),recurrenceId:O,siteId:r,onSave:ne}))},re=async()=>{if(!O||m)return;d(!0);let e=await ue({event:h,recurrenceId:O,siteId:r});if(e){window.location.href=e;return}d(!1)},N=async()=>{if(!(!O||m)){l(!0);try{await me({event:h,recurrenceId:O,cancelled:!A,siteId:r,refetchEvents:ne})&&t()}finally{l(!1)}}},P=async()=>{if(!a){o(!0);try{await Ee({event:h,scope:`series`,recurrenceId:O,siteId:r,refetchEvents:ne})&&t()}finally{o(!1)}}},F=()=>{n((0,Q.jsx)(ja,{action:`delete`,onSelect:async e=>e===`occurrence`&&j&&!window.confirm(s(`This occurrence has its own changes, which are deleted with it. Delete it?`))?!1:Ee({event:h,scope:e,recurrenceId:O,siteId:r,refetchEvents:ne})}),e.el)},ie=async()=>{if(m)return;p(!0);let e=await B(h,r);if(e){window.location.href=e;return}p(!1)},I=[{label:s(f?`Duplicating...`:`Duplicate Event`),icon:`clone-dashed`,color:`fuchsia`,onSelect:()=>void ie()}];return T&&O&&I.push({label:s(`Edit occurrence`),icon:`pencil`,onSelect:M},{label:s(u?`Processing...`:`Edit this and following occurrences`),icon:`calendar-pen`,onSelect:()=>void re()},{label:s(A?`Restore occurrence`:`Cancel occurrence`),icon:A?`rotate-left`:`ban`,onSelect:()=>void N()}),I.push({label:s(a?`Deleting...`:`Delete`),icon:`trash`,destructive:!0,onSelect:()=>{T?F():window.confirm(s(`Are you sure you want to delete this event?`))&&P()}}),(0,Q.jsxs)(Ta,{children:[(0,Q.jsx)(Da,{type:`button`,className:`icon`,"data-icon":`remove`,"aria-label":s(`Close`),title:s(`Close`),disabled:m,onClick:t}),(0,Q.jsx)(`h1`,{className:U(`event-title`,A&&`is-cancelled`),children:h.title}),y&&(0,Q.jsxs)(`div`,{className:`calendar-label`,children:[(0,Q.jsx)(`span`,{className:`calendar-label-dot`,style:{backgroundColor:S},"aria-hidden":`true`}),(0,Q.jsx)(`span`,{children:y})]}),ee&&(0,Q.jsx)(`div`,{className:`occurrence-status is-disabled`,children:s(`This event is disabled.`)}),(A||te)&&(0,Q.jsx)(`div`,{className:U(`occurrence-status`,A?`is-cancelled`:`is-edited`),children:s(A?`This occurrence is cancelled.`:`This occurrence has its own changes.`)}),(0,Q.jsx)(Ge,{result:h.extendedProps.overlaps,formats:i}),(0,Q.jsx)(`hr`,{}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`b`,{children:[s(`Starts`),`:`]}),` `,Re(w(h.start),k,{locale:E()}),(0,Q.jsx)(`br`,{}),(0,Q.jsxs)(`b`,{children:[s(`Ends`),`:`]}),` `,Re(w(C),k,{locale:E()})]}),D&&(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`b`,{children:[s(`Repeats`),`:`]}),` `,D]}),(b||x)&&(0,Q.jsxs)(`dl`,{className:`event-details`,children:[b&&(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:s(`Location`)}),(0,Q.jsx)(`dd`,{className:`event-location`,children:b})]}),x&&(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:s(`Description`)}),(0,Q.jsx)(`dd`,{className:`event-description`,children:x})]})]}),(0,Q.jsx)(`hr`,{}),(0,Q.jsxs)(Ea,{children:[(0,Q.jsx)(`a`,{href:h.url,className:U(`btn submit`,m&&`disabled`),"aria-disabled":m,onClick:e=>{m&&e.preventDefault()},children:s(`Edit Event`)}),(0,Q.jsx)(Ma,{actions:I,disabled:m})]})]})},Pa=new Intl.DateTimeFormat(E().code,{weekday:`short`,timeZone:`UTC`}),Fa=new Intl.DateTimeFormat(E().code,{day:`numeric`,timeZone:`UTC`}),Ia=new Intl.DateTimeFormat(E().code,{weekday:`long`,timeZone:`UTC`}),La=new Intl.DateTimeFormat(E().code,{month:`long`,year:`numeric`,timeZone:`UTC`}),Ra={dayGridMonth:{dayHeaderFormat:{weekday:`long`}},listMonth:{displayEventEnd:!0,listDayFormat:{weekday:`long`,month:`long`,day:`numeric`},listDaySideFormat:!1}},za={closeDelayMs:300,position:[`bottom`,`top`,`right`,`left`]},Ba=e=>{let t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}:00`},Va=e=>!!(e.extendedProps?.rrule||e.extendedProps?.repeats),Ha=({hiddenCalendarIds:e,registerApplyAiDraft:t,selectedDate:n,onDateChange:r,miniDateSelection:i,onMiniDateSelectionHandled:a})=>{let{hidePopover:o,showPopover:s}=g(),{range:c,setRange:l}=Mi(),{currentDay:u,language:d,formats:f,weekStartDay:h,overlapThresholdString:_,allDayDefault:y,eventDuration:x,timeInterval:S,canEditEvents:C,isDragAndDropEnabled:w,isQuickCreateEnabled:E,currentSiteId:D,defaultCalendarView:ee,enabledCalendarViews:te}=$(),{view:j,setView:ne,isReady:M,enabledViews:re,resolveView:N}=Ri(ee,te),P=C&&E,F=(0,W.useRef)(null),ie=(0,W.useRef)(null),[I,ae]=(0,W.useState)(null),oe=(0,W.useRef)(c),se=e.join(`,`),ce=(0,W.useRef)(null),L=(0,W.useRef)(void 0),le=(0,W.useRef)(!1),ue=(0,W.useRef)(0),[R,fe]=(0,W.useState)(null),[me,he]=(0,W.useState)(null),[z,ge]=(0,W.useState)(!1),[B,_e]=(0,W.useState)(ra),[ve,ye]=(0,W.useState)(!1);(0,W.useEffect)(()=>{M&&ae(ie.current?.querySelector(`.fc-header-toolbar .fc-toolbar-chunk:first-child`)??null)},[M]);let xe=(0,W.useCallback)(()=>F.current?.getApi(),[F.current]),Ce=(0,W.useMemo)(()=>xe(),[xe]),we=(0,W.useMemo)(()=>({alignment:`center`,position:[`right`,`left`,`bottom`,`top`]}),[]),{datePickerButton:Ee,dateSelector:Oe}=Gi(Ce,j,c);(0,W.useEffect)(()=>{if(oe.current===c)return;oe.current=c;let e=F.current?.getApi();e?.view.type===`listMonth`&&e.refetchEvents()},[c]);let ke=(0,W.useMemo)(()=>new Set(e),[e]),Ae=Ba(S),je=(0,W.useMemo)(()=>Se(ke,D,void 0,B),[ke,D,B]),Me=(0,W.useMemo)(()=>Hi(Ce,{datePickerButton:Ee}),[Ee,Ce]),Ne=(0,W.useCallback)(()=>{F.current?.getApi().refetchEvents()},[]),Ie=$i(Ne),{add:Le,run:Re,busy:V}=Ie,[H,ze]=(0,W.useState)(!1),U=(0,W.useCallback)((e,t)=>{clearTimeout(L.current),o();let n=N(t);Bi(e,n),F.current?.getApi().changeView(n,e)},[o,N]),Be=(0,W.useCallback)((e,t,n)=>{let r=F.current?.getApi(),i=r?.getEventById(e);!i||!r||V||H||z||s((0,Q.jsx)(Na,{fcEvent:{event:i,el:t,jsEvent:n.nativeEvent,view:r.view}}),t)},[s,V,H,z]),He=(0,W.useMemo)(()=>({...Ra,listMonth:{...Ra.listMonth,...ji(c)},calendarYear:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1},titleFormat:{year:`numeric`},content:e=>(0,Q.jsx)(fa,{content:e,disabled:V||H||R!==null,loading:z,error:ve,search:B,onDateSelect:e=>U(e,`timeGridDay`),onMonthSelect:e=>U(e,`dayGridMonth`),onEventSelect:Be})}}),[c,V,H,R,z,ve,B,U,Be]),Ue=(0,W.useCallback)(()=>{fe(null),he(null)},[]);(0,W.useEffect)(()=>{if(!M)return;let e=F.current?.getApi();if(e){if(ce.current===null){ce.current=se;return}ce.current!==se&&(ce.current=se,e.refetchEvents())}},[se,M]);let We=(0,W.useCallback)(()=>{Ue(),o()},[Ue,o]),Ge=(0,W.useCallback)(e=>{let t=F.current?.getApi();t&&Number.isFinite(e.start)&&t.gotoDate(new Date(e.start*1e3)),fe(e);let n=ie.current?.querySelector(`.fc-toolbar-title`)??ie.current;he(n??null)},[]);(0,W.useEffect)(()=>{t(Ge)},[Ge,t]);let Ke=(0,W.useCallback)(e=>{if(e===B)return;clearTimeout(L.current),We(),_e(e);let t=new URL(window.location.href);e?t.searchParams.set(`search`,e):t.searchParams.delete(`search`),history.replaceState(null,``,t)},[B,We]);(0,W.useEffect)(()=>{let e=F.current?.getApi();if(!e)return;let t=e.getEvents().find(e=>v(e));if(!R){t?.remove();return}if(t){p(t,R);return}e.addEvent(b(R))},[R]),(0,W.useEffect)(()=>{if(!R){o();return}if(!me){o();return}s((0,Q.jsx)(wa,{draft:R,onChange:fe,refetchEvents:Ne,onConfirm:Ue,onCancel:We}),me,we)},[We,Ue,R,me,o,we,Ne,s]);let qe=(0,W.useCallback)(e=>{clearTimeout(L.current),o(),e.view.calendar.getEvents().find(e=>v(e))?.remove(),he(null),fe(m(e,{allDayDefault:y,eventDuration:x})),e.view.calendar.unselect()},[y,x,o]),Je=(0,W.useCallback)(e=>{e.jsEvent.detail<2||(clearTimeout(L.current),o(),Ce.getEvents().find(e=>v(e))?.remove(),he(null),fe(m({start:e.date,end:e.allDay?Ve(e.date,1):e.date,allDay:e.allDay},{allDayDefault:y,eventDuration:x})))},[Ce,y,x,o]);(0,W.useEffect)(()=>()=>clearTimeout(L.current),[]),(0,W.useEffect)(()=>{let e=F.current?.getApi();if(!e||!i)return;let t=N(e.view.type===`listMonth`?`listMonth`:`timeGridDay`);e.changeView(t,i),Bi(i,t),a()},[i,a,N]),(0,W.useEffect)(()=>{let e=F.current?.getApi();!e||k(e.getDate())===k(n)||e.gotoDate(n)},[n]);let Ye=(0,W.useCallback)(()=>clearTimeout(L.current),[]),Ze=(0,W.useCallback)(()=>{le.current=!0,clearTimeout(L.current),o()},[o]),Qe=(0,W.useCallback)(()=>{le.current=!1},[]),$e=(0,W.useCallback)(e=>{v(e.event)&&he(e.el)},[]),et=(0,W.useCallback)(e=>{v(e.event)&&he(t=>t===e.el?null:t)},[]),tt=(0,W.useCallback)((e,t)=>{if(v(t.event)||V){t.revert();return}let n=async n=>{let r={event:t.event,recurrenceId:De(String(t.event.id)),scope:n,siteId:D,refetchEvents:Ne,revert:t.revert,onHistoryEntry:Le},i=!1,a=await Re(()=>(i=!0,e===`move`?de(r):pe({...r,oldEvent:t.oldEvent})));return i||t.revert(),a};if(!Va(t.event)){n();return}ze(!0),s((0,Q.jsx)(ja,{action:e,onSelect:async e=>{let t=await n(e);return ze(!1),t||o(),t},onCancel:()=>{t.revert(),ze(!1)}},++ue.current),t.jsEvent)},[D,o,Ne,s,Le,Re,V]),nt=(0,W.useCallback)(e=>{let t=T(e),n=N(`timeGridDay`);Bi(t,n),F.current?.getApi().changeView(n,t)},[N]),rt=(0,W.useCallback)(e=>e.view.type===`timeGridWeek`&&k(e.date)===k(u)?[`fc-title-today`]:[],[u]),it=(0,W.useCallback)(e=>{if(e.view.type===`listMonth`){let t=e;return(0,Q.jsxs)(`a`,{...t.navLinkAttrs,href:Craft.getCpUrl(`calendar/${A(e.date)}/${Li(N(`timeGridDay`))}`),id:t.textId,className:`calendar-agenda-day`,"aria-label":e.text,children:[(0,Q.jsx)(`span`,{className:`calendar-agenda-day-number`,"aria-hidden":`true`,children:Fa.format(e.date)}),(0,Q.jsxs)(`span`,{className:`calendar-agenda-day-label`,"aria-hidden":`true`,children:[(0,Q.jsx)(`span`,{children:Ia.format(e.date)}),(0,Q.jsx)(`span`,{className:`calendar-agenda-day-month`,children:La.format(e.date)})]})]})}if(e.view.type!==`timeGridWeek`)return e.text;let t=Pa.format(e.date),n=Fa.format(e.date);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`span`,{className:`fc-day-header-label`,children:t}),(0,Q.jsx)(`span`,{className:`fc-day-header-date`,children:n})]})},[N]);if(!M)return null;let at=document.querySelector(`[data-calendar-history-root]`),ot=C&&w?(0,Q.jsx)(na,{canUndo:Ie.canUndo,canRedo:Ie.canRedo,disabled:V||z||H||R!==null,onReplay:e=>{o(),Ie.replay(e)}}):null,st=document.querySelector(`[data-calendar-search-root]`),ct=(0,Q.jsx)(ia,{initialSearch:B,onSearchChange:Ke});return(0,Q.jsxs)(Xe,{ref:ie,className:z?`is-fetching-events`:void 0,children:[st?(0,li.createPortal)(ct,st):ct,at?(0,li.createPortal)(ot,at):ot,j===`listMonth`&&I&&(0,li.createPortal)((0,Q.jsx)(Ni,{range:c,disabled:V||H||R!==null,onChange:e=>{clearTimeout(L.current),o(),l(e)}}),I),(0,Q.jsx)(Te,{...O(),ref:F,themeSystem:`bootstrap5`,plugins:[be,Fe,wi,Pe],customButtons:Me,initialView:j,initialDate:u,height:j===`listMonth`||j===`calendarYear`?`auto`:void 0,locale:d,views:He,timeZone:`UTC`,firstDay:h,nextDayThreshold:_,fixedWeekCount:!0,dayMaxEventRows:!0,editable:C&&w&&!V&&!H&&!z,selectable:P,selectMirror:!1,selectMinDistance:5,slotDuration:Ae,snapDuration:Ae,navLinks:!0,navLinkDayClick:nt,select:P?qe:void 0,dateClick:P?Je:void 0,dayHeaderClassNames:rt,dayHeaderContent:it,events:je,eventClassNames:Yi,eventContent:Zi,progressiveEventRendering:!0,eventTimeFormat:f.time.short.js,loading:e=>{e&&ye(!1),ge(e)},eventSourceFailure:()=>ye(!0),noEventsContent:()=>(0,Q.jsx)(`span`,{role:`status`,children:Craft.t(`calendar`,ve?`Couldn’t load events. Use Refresh to try again.`:z?`Loading events…`:B?`No matching events in this date range.`:`No events in this date range.`)}),eventDidMount:$e,eventWillUnmount:et,eventMouseEnter:e=>{e.view.type!==`dayGridMonth`&&e.view.type!==`listMonth`||R!==null||le.current||V||z||H||Xi(e.event,e.jsEvent.target)!==`ignore`&&(clearTimeout(L.current),L.current=setTimeout(()=>s((0,Q.jsx)(Na,{fcEvent:e}),e.el,za),300),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventMouseLeave:Ye,eventDragStart:Ze,eventDragStop:Qe,eventResizeStart:Ze,eventResizeStop:Qe,eventClick:e=>{if(R!==null||V||z||H){e.jsEvent.preventDefault();return}Xi(e.event,e.jsEvent.target)===`open`&&(s((0,Q.jsx)(Na,{fcEvent:e}),e.el),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventDrop:e=>tt(`move`,e),eventResize:e=>tt(`resize`,e),headerToolbar:{start:`title`,center:re.join(`,`),end:Vi},buttonText:{dayGridMonth:Craft.t(`calendar`,`Month`),timeGridWeek:Craft.t(`calendar`,`Week`),timeGridDay:Craft.t(`calendar`,`Day`),listMonth:Craft.t(`calendar`,`Agenda`),calendarYear:Craft.t(`calendar`,`Year`),today:Craft.t(`calendar`,`Today`)},datesSet:({view:e})=>{r(e.calendar.getDate()),setTimeout(()=>{ne(e.type),Bi(e.calendar.getDate(),e.type)},50)}}),Oe]})},Ua=(0,W.createContext)(null),Wa=()=>(0,W.useContext)(Ua),Ga=()=>{window.location.href=Craft.getCpUrl(`calendar/settings/solspaceai`)},Ka=({buttonRef:e,isSolspaceAiConnected:t,canEditEvents:n})=>{let{showPopover:r,hidePopover:i}=g(),a=Wa();return n?(0,Q.jsx)(_,{ref:e,connected:t,onClick:()=>{if(!t||!a){Ga();return}let n=e.current;n&&r((0,Q.jsx)(S,{onCancel:i,onApplyDraft:e=>{a.applyAiDraft(e),i()}}),n,{alignment:`end`,position:[`bottom`,`top`,`right`,`left`]})}}):null},qa=n.div`
  color: var(--gray-600);
`,Ja=n.div`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  margin-bottom: 10px;

  > span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
  }
`,Ya=n.button`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 3px;
  background: transparent;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: ${({$next:e})=>e?`4px`:`7px`};
    width: 7px;
    height: 7px;
    border: solid var(--gray-600);
    border-width: 0 0 2px 2px;
    transform: rotate(${({$next:e})=>e?`225deg`:`45deg`});
  }

  &:hover {
    background: var(--gray-100);
  }
`,Xa=n.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 7px;

  span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
`,Za=n.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 4px;
`,Qa=n.button`
  justify-self: center;
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: ${({$isToday:e})=>e?`50%`:`3px`};
  background: ${({$isToday:e})=>e?`var(--primary-button-bg)`:`transparent`};
  color: ${({$isCurrentMonth:e,$isToday:t})=>t?`var(--white)`:e?`var(--gray-500)`:`var(--gray-300)`};
  cursor: pointer;
  font-size: 13px;
  line-height: 1;

  &:hover {
    background: ${({$isToday:e})=>e?`var(--primary-button-bg)`:`var(--gray-200)`};
  }
`,$a=(e,t,n)=>new Date(Date.UTC(e,t,n)),eo=e=>$a(e.getUTCFullYear(),e.getUTCMonth(),1),to=(e,t)=>$a(e.getUTCFullYear(),e.getUTCMonth()+t,1),no=({selectedDate:e,onDateSelect:t})=>{let{language:n,weekStartDay:r}=$(),[i,a]=(0,W.useState)(()=>eo(e));(0,W.useEffect)(()=>{a(eo(e))},[e]);let o=(0,W.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`long`,year:`numeric`,timeZone:`UTC`}),[n]),s=(0,W.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`narrow`,timeZone:`UTC`}),[n]),c=(0,W.useMemo)(()=>Array.from({length:7},(e,t)=>s.format($a(2023,0,1+r+t))),[r,s]),l=(0,W.useMemo)(()=>{let e=i.getUTCFullYear(),t=i.getUTCMonth(),n=$a(e,t,1),a=$a(e,t+1,0),o=(n.getUTCDay()-r+7)%7,s=((r+6)%7-a.getUTCDay()+7)%7,c=o+a.getUTCDate()+s;return Array.from({length:c},(n,r)=>$a(e,t,1-o+r))},[i,r]),u=k(new Date);return(0,Q.jsxs)(qa,{children:[(0,Q.jsxs)(Ja,{children:[(0,Q.jsx)(Ya,{"aria-label":Craft.t(`calendar`,`Previous month`),type:`button`,onClick:()=>a(e=>to(e,-1))}),(0,Q.jsx)(`span`,{children:o.format(i)}),(0,Q.jsx)(Ya,{"aria-label":Craft.t(`calendar`,`Next month`),type:`button`,$next:!0,onClick:()=>a(e=>to(e,1))})]}),(0,Q.jsx)(Xa,{children:c.map((e,t)=>(0,Q.jsx)(`span`,{children:e},`${e}-${t}`))}),(0,Q.jsx)(Za,{children:l.map(e=>{let r=k(e);return(0,Q.jsx)(Qa,{"aria-label":e.toLocaleDateString(n,{timeZone:`UTC`}),type:`button`,$isCurrentMonth:e.getUTCMonth()===i.getUTCMonth(),$isToday:r===u,onClick:()=>t(e),children:e.getUTCDate()},r)})})]})},ro=i`
  100% {
    transform: translateX(100%);
  }
`,io=n.div`
  position: relative;
  overflow: hidden;

  background: ${Ze.gray200};

  &::after {
    content: "";

    position: absolute;
    inset: 0;

    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgb(from ${Ze.gray050} r g b / 70%),
      transparent
    );

    animation: ${ro} 1.4s ${$e.easeInOut} infinite;
  }
`,ao=({width:e=`100%`,height:t=16,borderRadius:n=4,className:r})=>(0,Q.jsx)(io,{"aria-hidden":`true`,className:r,style:{borderRadius:n,height:t,width:e}}),oo=async e=>{let t=await He(l(`/api/calendars`),{signal:e});if(!t.ok)throw Error(`Failed to fetch calendars`);return t.json()},so=()=>{let[e,t]=(0,W.useState)([]),[n,r]=(0,W.useState)(null),[i,a]=(0,W.useState)(!1),o=(0,W.useCallback)(async e=>{a(!0),r(null);try{let n=await oo(e);t(n)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;r(e instanceof Error?e:Error(`Failed to fetch calendars`))}finally{a(!1)}},[]);return(0,W.useEffect)(()=>{let e=new AbortController;return o(e.signal),()=>{e.abort()}},[o]),{data:e,error:n,isPending:i,refetch:o}},co=n.div`
  padding: 0;
`,lo=n.div`
  display: flex;
  flex-direction: column;
`,uo=n.hr`
  width: 100%;
  margin: 16px 0;
  border: 0;
  border-top: 1px solid var(--gray-200);
`,fo=n.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0;
  padding: 0;

  list-style: none;
`,po=n.li`
  margin: 0;
`,mo=n.label`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0;

  border-radius: 4px;

  color: ${Ze.gray800};
  cursor: pointer;
`,ho=n.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);

  &:focus-visible + span {
    border: 2px solid ${Ze.black};
  }

  &:checked + span {
    border: 1px solid var(--calendar-color);
  }

  &:checked + span:after {
    opacity: 1;
  }
`,go=n.span`
  position: relative;

  width: 15px;
  height: 15px;

  border: 1px solid var(--calendar-color);
  border-radius: 50%;
  background-color: var(--calendar-color);

  &:after {
    content: "";

    position: absolute;
    top: 50%;
    left: 50%;

    width: 4px;
    height: 7px;

    border: solid var(--calendar-color-contrast);
    border-width: 0 2px 2px 0;

    opacity: 0;
    transform: translate(-50%, -60%) rotate(45deg);
  }
`,_o=n.span`
  font-size: 13px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,vo=n.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,yo=n.div`
  font-size: 13px;
  color: ${Ze.error};
`,bo=({hiddenCalendarIds:e,onToggleCalendar:t})=>{let{data:n,error:r,isPending:i}=so(),a=new Set(e),o=i&&n.length===0;return(0,Q.jsxs)(co,{children:[o&&(0,Q.jsxs)(vo,{children:[(0,Q.jsx)(ao,{height:16}),(0,Q.jsx)(ao,{height:16}),(0,Q.jsx)(ao,{height:16})]}),!o&&r&&(0,Q.jsx)(yo,{children:r.message}),!o&&!r&&(0,Q.jsx)(fo,{children:n.map(e=>(0,Q.jsx)(po,{children:(0,Q.jsxs)(mo,{style:{"--calendar-color":e.color.base,"--calendar-color-contrast":e.color.contrast},children:[(0,Q.jsx)(ho,{type:`checkbox`,checked:!a.has(e.id),onChange:()=>t(e.id)}),(0,Q.jsx)(go,{}),(0,Q.jsx)(_o,{children:e.title})]})},e.id))})]})},xo=()=>{let e=document.querySelector(`[data-sidebar-root]`),t=document.querySelector(`[data-ai-create-root]`),{isSolspaceAiConnected:n,canEditEvents:r,currentDay:i}=$(),{hiddenCalendarIds:a,toggleCalendarVisibility:o}=zi(),s=(0,W.useRef)(null),[c,l]=(0,W.useState)(null),[u,d]=(0,W.useState)(()=>new Date(i)),[f,p]=(0,W.useState)(null),m=(0,W.useCallback)(e=>{l(()=>e)},[]),h=(0,W.useCallback)(e=>{c?.(e)},[c]);return(0,Q.jsx)(y,{children:(0,Q.jsxs)(Ua.Provider,{value:{applyAiDraft:h},children:[(0,Q.jsx)(Ha,{hiddenCalendarIds:a,registerApplyAiDraft:m,selectedDate:u,onDateChange:d,miniDateSelection:f,onMiniDateSelectionHandled:()=>p(null)}),t&&(0,li.createPortal)((0,Q.jsx)(Ka,{buttonRef:s,isSolspaceAiConnected:n,canEditEvents:r}),t),e&&(0,li.createPortal)((0,Q.jsxs)(lo,{children:[(0,Q.jsx)(bo,{hiddenCalendarIds:a,onToggleCalendar:o}),(0,Q.jsx)(uo,{}),(0,Q.jsx)(no,{selectedDate:u,onDateSelect:e=>{d(e),p(e)}})]}),e)]})})},So=document.getElementById(`calendar-overview`),Co=So.querySelector(`[data-root]`),wo=So.querySelector(`[data-config]`),To=JSON.parse(wo?.textContent||`{}`);ui.createRoot(Co).render((0,Q.jsx)(Wi,{config:To,children:(0,Q.jsx)(Hr,{basename:l(`/`,!1),children:(0,Q.jsx)(tr,{children:(0,Q.jsxs)($n,{path:`/`,element:(0,Q.jsx)(ci,{}),children:[(0,Q.jsx)($n,{index:!0,element:(0,Q.jsx)(xo,{})}),(0,Q.jsx)($n,{path:`overview`,element:(0,Q.jsx)(xo,{})}),(0,Q.jsx)($n,{path:`:year/:month/:day/:view?`,element:(0,Q.jsx)(xo,{})})]})})})}));