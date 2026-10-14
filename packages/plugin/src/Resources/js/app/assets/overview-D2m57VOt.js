import{a as e,c as t,i as n,l as r,n as i,o as a,s as o,t as s,u as c}from"./translations-CPvEMAbD.js";import{o as l,s as u}from"./create-with-ai.styles-B3GlnHSg.js";import{C as d,S as f,_ as p,b as m,i as h,n as g,r as _,t as v,v as y,y as b}from"./localization-BHnAK9Na.js";import{Ct as x,Dt as S,Et as C,Gt as w,Ht as T,J as E,Lt as D,Nt as O,P as k,Pt as A,Qt as j,R as ee,Vt as M,W as N,Xt as P,_ as te,a as ne,b as re,c as F,cn as ie,d as ae,f as oe,g as I,gn as L,gt as se,i as ce,k as R,l as le,ln as ue,m as de,mn as fe,n as pe,o as z,ot as me,p as he,r as B,s as ge,st as _e,t as ve,u as ye,un as be,v as xe,x as Se}from"./calendar.events-CgSVi6Oj.js";import{t as Ce}from"./interaction-DkjMMopr.js";import{t as we}from"./timegrid-DkP0uxp5.js";import{a as Te,d as Ee,f as De,i as Oe,n as ke,o as Ae,s as V,t as je,v as Me,y as Ne}from"./lightswitch-C4sgii-l.js";import{A as Pe,C as Fe,D as H,E as U,F as Ie,I as Le,L as Re,M as ze,N as Be,P as Ve,R as He,T as Ue,i as We,j as Ge,k as Ke,o as qe,t as Je,w as Ye,x as Xe,y as Ze}from"./create-with-ai-B3RS8HNX.js";import{t as Qe}from"./http-bwzZaFVT.js";import{n as $e,r as et}from"./calendar.styles-CIEulExP.js";import{n as tt,r as nt,t as rt}from"./variables-XTEqmteb.js";import{t as it}from"./components-DAVK9kbC.js";import{t as at}from"./ai-button-DEEwQsMT.js";var ot=`modulepreload`,st=function(e,t){return new URL(e,t).href},ct={},lt=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=st(t,n),t=s(t),t in ct)return;ct[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:ot,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},W=c(t(),1),ut=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,dt=/^[\\/]{2}/;function ft(e,t){return t+e.replace(/\\/g,`/`)}var pt=`popstate`;function mt(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function ht(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return vt(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:yt(t)}return xt(t,n,null,e)}function G(e,t){if(e===!1||e==null)throw Error(t)}function K(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function gt(){return Math.random().toString(36).substring(2,10)}function _t(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function vt(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?bt(t):t,state:n,key:t&&t.key||r||gt(),mask:i}}function yt({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function bt(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function xt(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=mt(e)?e:vt(h.location,e,t);n&&n(r,e),l=u()+1;let d=_t(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=mt(e)?e:vt(h.location,e,t);n&&n(r,e),l=u();let i=_t(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return St(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(pt,d),c=e,()=>{i.removeEventListener(pt,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function St(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),G(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:yt(t);return i=i.replace(/ $/,`%20`),!n&&dt.test(i)&&(i=r+i),new URL(i,r)}function Ct(e,t,n=`/`){return wt(e,t,n,!1)}function wt(e,t,n,r,i){let a=q((typeof t==`string`?bt(t):t).pathname||`/`,n);if(a==null)return null;let o=i??Et(e),s=null,c=Ut(a);for(let e=0;s==null&&e<o.length;++e)s=zt(o[e],c,r);return s}function Tt(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function Et(e){let t=Dt(e);return kt(t),t}function Dt(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;G(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=J([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(G(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),Dt(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:Lt(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=Ht(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of Ot(e.path))a(e,t,!0,n)}),t}function Ot(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=Ot(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function kt(e){e.sort((e,t)=>e.score===t.score?Rt(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var At=/^:[\w-]+$/,jt=3,Mt=2,Nt=1,Pt=10,Ft=-2,It=e=>e===`*`;function Lt(e,t){let n=e.split(`/`),r=n.length;return n.some(It)&&(r+=Ft),t&&(r+=Mt),n.filter(e=>!It(e)).reduce((e,t)=>e+(At.test(t)?jt:t===``?Nt:Pt),r)}function Rt(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function zt(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?Vt(u,l,s.matcher,s.compiledParams):Bt(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=Bt({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:J([a,d.pathname]),pathnameBase:Qt(J([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=J([a,d.pathnameBase]))}return o}function Bt(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Ht(e.path,e.caseSensitive,e.end);return Vt(e,t,n,r)}function Vt(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Ht(e,t=!1,n=!0){K(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Ut(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return K(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function q(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Wt(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?bt(e):e,a;return n?(n=Xt(n),a=n.startsWith(`/`)?Gt(n.substring(1),`/`):Gt(n,t)):a=t,{pathname:a,search:$t(r),hash:en(i)}}function Gt(e,t){let n=Zt(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Kt(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function qt(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Jt(e){let t=qt(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Yt(e,t,n,r=!1){let i;typeof e==`string`?i=bt(e):(i={...e},G(!i.pathname||!i.pathname.includes(`?`),Kt(`?`,`pathname`,`search`,i)),G(!i.pathname||!i.pathname.includes(`#`),Kt(`#`,`pathname`,`hash`,i)),G(!i.search||!i.search.includes(`#`),Kt(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Wt(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Xt=e=>e.replace(/[\\/]{2,}/g,`/`),J=e=>Xt(e.join(`/`)),Zt=e=>e.replace(/\/+$/,``),Qt=e=>Zt(e).replace(/^\/*/,`/`),$t=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,en=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,tn=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function nn(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function rn(e){return J(e.map(e=>e.route.path).filter(Boolean))||`/`}var an=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function on(e,t){let n=e;if(typeof n!=`string`||!ut.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(an)try{let e=new URL(window.location.href),r=dt.test(n)?new URL(ft(n,e.protocol)):new URL(n),a=q(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{K(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var sn=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(sn);var cn=[`GET`,...sn];new Set(cn);var ln=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function un(e){try{return ln.includes(new URL(e).protocol)}catch{return!1}}var dn=W.createContext(null);dn.displayName=`DataRouter`;var fn=W.createContext(null);fn.displayName=`DataRouterState`;var pn=W.createContext(!1);function mn(){return W.useContext(pn)}var hn=W.createContext({isTransitioning:!1});hn.displayName=`ViewTransition`;var gn=W.createContext(new Map);gn.displayName=`Fetchers`;var _n=W.createContext(null);_n.displayName=`Await`;var Y=W.createContext(null);Y.displayName=`Navigation`;var vn=W.createContext(null);vn.displayName=`Location`;var X=W.createContext({outlet:null,matches:[],isDataRoute:!1});X.displayName=`Route`;var yn=W.createContext(null);yn.displayName=`RouteError`;var bn=`REACT_ROUTER_ERROR`,xn=`REDIRECT`,Sn=`ROUTE_ERROR_RESPONSE`;function Cn(e){if(e.startsWith(`${bn}:${xn}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function wn(e){if(e.startsWith(`${bn}:${Sn}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new tn(t.status,t.statusText,t.data)}catch{}}function Tn(e,{relative:t}={}){G(En(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=W.useContext(Y),{hash:i,pathname:a,search:o}=Nn(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:J([n,a])),r.createHref({pathname:s,search:o,hash:i})}function En(){return W.useContext(vn)!=null}function Z(){return G(En(),`useLocation() may be used only in the context of a <Router> component.`),W.useContext(vn).location}var Dn=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function On(e){W.useContext(Y).static||W.useLayoutEffect(e)}function kn(){let{isDataRoute:e}=W.useContext(X);return e?Qn():An()}function An(){G(En(),`useNavigate() may be used only in the context of a <Router> component.`);let e=W.useContext(dn),{basename:t,navigator:n}=W.useContext(Y),{matches:r}=W.useContext(X),{pathname:i}=Z(),a=JSON.stringify(Jt(r)),o=W.useRef(!1);return On(()=>{o.current=!0}),W.useCallback((r,s={})=>{if(K(o.current,Dn),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Yt(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:J([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var jn=W.createContext(null);function Mn(e){let t=W.useContext(X).outlet;return W.useMemo(()=>t&&W.createElement(jn.Provider,{value:e},t),[t,e])}function Nn(e,{relative:t}={}){let{matches:n}=W.useContext(X),{pathname:r}=Z(),i=JSON.stringify(Jt(n));return W.useMemo(()=>Yt(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function Pn(e,t){return Fn(e,t)}function Fn(e,t,n){G(En(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=W.useContext(Y),{matches:i}=W.useContext(X),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;er(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=Z(),d;if(t){let e=typeof t==`string`?bt(t):t;G(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):Ct(e,{pathname:p});K(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),K(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Hn(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:J([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:J([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?W.createElement(vn.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function In(){let e=Zn(),t=nn(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=W.createElement(W.Fragment,null,W.createElement(`p`,null,`💿 Hey developer 👋`),W.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,W.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,W.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),W.createElement(W.Fragment,null,W.createElement(`h2`,null,`Unexpected Application Error!`),W.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?W.createElement(`pre`,{style:i},n):null,o)}var Ln=W.createElement(In,null),Rn=class extends W.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=wn(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:W.createElement(X.Provider,{value:this.props.routeContext},W.createElement(yn.Provider,{value:e,children:this.props.component}));return this.context?W.createElement(Bn,{error:e},t):t}};Rn.contextType=pn;var zn=new WeakMap;function Bn({children:e,error:t}){let{basename:n}=W.useContext(Y);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=Cn(t.digest);if(e){let r=zn.get(t);if(r)throw r;let i=on(e.location,n),a=i.absoluteURL||i.to;if(un(a))throw Error(`Invalid redirect location`);if(an&&!zn.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw zn.set(t,n),n}return W.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function Vn({routeContext:e,match:t,children:n}){let r=W.useContext(dn);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),W.createElement(X.Provider,{value:e},n)}function Hn(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);G(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:rn(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||Ln,o&&(s<0&&c===0?(er(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?W.createElement(n.route.Component,null):n.route.element?n.route.element:e,W.createElement(Vn,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?W.createElement(Rn,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Un(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Wn(e){let t=W.useContext(dn);return G(t,Un(e)),t}function Gn(e){let t=W.useContext(fn);return G(t,Un(e)),t}function Kn(e){let t=W.useContext(X);return G(t,Un(e)),t}function qn(e){let t=Kn(e),n=t.matches[t.matches.length-1];return G(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Jn(){return qn(`useRouteId`)}function Yn(){let e=Gn(`useNavigation`);return W.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function Xn(){let{matches:e,loaderData:t}=Gn(`useMatches`);return W.useMemo(()=>e.map(e=>Tt(e,t)),[e,t])}function Zn(){let e=W.useContext(yn),t=Gn(`useRouteError`),n=qn(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Qn(){let{router:e}=Wn(`useNavigate`),t=qn(`useNavigate`),n=W.useRef(!1);return On(()=>{n.current=!0}),W.useCallback(async(r,i={})=>{K(n.current,Dn),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var $n={};function er(e,t,n){!t&&!$n[e]&&($n[e]=!0,K(!1,n))}W.memo(tr);function tr({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return Fn(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function nr(e){return Mn(e.context)}function rr(e){G(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function ir({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){G(!En(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=W.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=bt(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=W.useMemo(()=>{let e=q(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return K(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:W.createElement(Y.Provider,{value:c},W.createElement(vn.Provider,{children:t,value:h}))}function ar({children:e,location:t}){return Pn(or(e),t)}W.Component;function or(e,t=[]){let n=[];return W.Children.forEach(e,(e,r)=>{if(!W.isValidElement(e))return;let i=[...t,r];if(e.type===W.Fragment){n.push.apply(n,or(e.props.children,i));return}G(e.type===rr,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),G(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=or(e.props.children,i)),n.push(a)}),n}var sr=`get`,cr=`application/x-www-form-urlencoded`;function lr(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function ur(e){return lr(e)&&e.tagName.toLowerCase()===`button`}function dr(e){return lr(e)&&e.tagName.toLowerCase()===`form`}function fr(e){return lr(e)&&e.tagName.toLowerCase()===`input`}function pr(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function mr(e,t){return e.button===0&&(!t||t===`_self`)&&!pr(e)}var hr=null;function gr(){if(hr===null)try{new FormData(document.createElement(`form`),0),hr=!1}catch{hr=!0}return hr}var _r=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function vr(e){return e!=null&&!_r.has(e)?(K(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${cr}"`),null):e}function yr(e,t){let n,r,i,a,o;if(dr(e)){let o=e.getAttribute(`action`);r=o?q(o,t):null,n=e.getAttribute(`method`)||sr,i=vr(e.getAttribute(`enctype`))||cr,a=new FormData(e)}else if(ur(e)||fr(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?q(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||sr,i=vr(e.getAttribute(`formenctype`))||vr(o.getAttribute(`enctype`))||cr,a=new FormData(o,e),!gr()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(lr(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=sr,r=null,i=cr,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var br={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},xr=/[&><\u2028\u2029]/g;function Sr(e){return e.replace(xr,e=>br[e])}function Cr(e,t){if(e===!1||e==null)throw Error(t)}function wr(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&q(i.pathname,t)===`/`?i.pathname=`${Zt(t)}/_root.${r}`:i.pathname=`${Zt(i.pathname)}.${r}`,i}async function Tr(e,t){if(e.id in t)return t[e.id];try{let n=await lt(()=>import(e.module),[],import.meta.url);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Er(e){return e!=null&&typeof e.page==`string`}function Dr(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function Or(e,t,n){return Nr((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Tr(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(Dr).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function kr(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function Ar(e,t,{includeHydrateFallback:n}={}){return jr(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function jr(e){return[...new Set(e)]}function Mr(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function Nr(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!Er(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(Mr(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function Pr(){let e=W.useContext(dn);return Cr(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function Fr(){let e=W.useContext(fn);return Cr(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var Ir=W.createContext(void 0);Ir.displayName=`FrameworkContext`;function Lr(){let e=W.useContext(Ir);return Cr(e,`You must render this element inside a <HydratedRouter> element`),e}function Rr(e,t){let n=W.useContext(Ir),[r,i]=W.useState(!1),[a,o]=W.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=W.useRef(null);W.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),W.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:zr(s,p),onBlur:zr(c,m),onMouseEnter:zr(l,p),onMouseLeave:zr(u,m),onTouchStart:zr(d,p)}]:[a,f,{}]:[!1,f,{}]}function zr(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Br({page:e,...t}){let n=mn(),{nonce:r}=Lr(),{router:i}=Pr(),a=W.useMemo(()=>Ct(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?W.createElement(Hr,{page:e,matches:a,...t}):W.createElement(Ur,{page:e,matches:a,...t})):null}function Vr(e){let{manifest:t,routeModules:n}=Lr(),[r,i]=W.useState([]);return W.useEffect(()=>{let r=!1;return Or(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Hr({page:e,matches:t,...n}){let r=Z(),{future:i}=Lr(),{basename:a}=Pr(),o=W.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=wr(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return W.createElement(W.Fragment,null,o.map(e=>W.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function Ur({page:e,matches:t,...n}){let r=Z(),{future:i,manifest:a,routeModules:o}=Lr(),{basename:s}=Pr(),{loaderData:c,matches:l}=Fr(),u=W.useMemo(()=>kr(e,t,l,a,r,`data`),[e,t,l,a,r]),d=W.useMemo(()=>kr(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=W.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=wr(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=W.useMemo(()=>Ar(d,a),[d,a]),m=Vr(d);return W.createElement(W.Fragment,null,f.map(e=>W.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>W.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>W.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Wr(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}W.Component;var Gr=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Gr&&(window.__reactRouterVersion=`7.18.1`)}catch{}function Kr({basename:e,children:t,useTransitions:n,window:r}){let i=W.useRef();i.current??(i.current=ht({window:r,v5Compat:!0}));let a=i.current,[o,s]=W.useState({action:a.action,location:a.location}),c=W.useCallback(e=>{n===!1?s(e):W.startTransition(()=>s(e))},[n]);return W.useLayoutEffect(()=>a.listen(c),[a,c]),W.createElement(ir,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function qr({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=W.useState({action:n.action,location:n.location}),o=W.useCallback(e=>{r===!1?a(e):W.startTransition(()=>a(e))},[r]);return W.useLayoutEffect(()=>n.listen(o),[n,o]),W.createElement(ir,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}qr.displayName=`unstable_HistoryRouter`;var Jr=W.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=W.useContext(Y),v=typeof l==`string`&&ut.test(l),y=on(l,h);l=y.to;let b=Tn(l,{relative:r}),x=Z(),S=null;if(o){let e=Yt(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:J([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=Rr(n,p),E=ti(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let O=!(y.isExternal||i),k=W.createElement(`a`,{...p,...T,href:(O?S:void 0)||y.absoluteURL||b,onClick:O?D:e,ref:Wr(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?W.createElement(W.Fragment,null,k,W.createElement(Br,{page:b})):k});Jr.displayName=`Link`;var Yr=W.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=Nn(a,{relative:c.relative}),d=Z(),f=W.useContext(fn),{navigator:p,basename:m}=W.useContext(Y),h=f!=null&&di(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=q(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return W.createElement(Jr,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});Yr.displayName=`NavLink`;var Xr=W.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=sr,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=W.useContext(Y),g=ii(),_=ai(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&ut.test(s);return W.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?W.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});Xr.displayName=`Form`;function Zr({getKey:e,storageKey:t,...n}){let r=W.useContext(Ir),{basename:i}=W.useContext(Y),a=Z(),o=Xn();li({getKey:e,storageKey:t});let s=W.useMemo(()=>{if(!r||!e)return null;let t=ci(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),W.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${Sr(JSON.stringify(t||oi))}, ${Sr(JSON.stringify(s))})`}})}Zr.displayName=`ScrollRestoration`;function Qr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function $r(e){let t=W.useContext(dn);return G(t,Qr(e)),t}function ei(e){let t=W.useContext(fn);return G(t,Qr(e)),t}function ti(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=kn(),d=Z(),f=Nn(e,{relative:o});return W.useCallback(p=>{if(mr(p,t)){p.preventDefault();let t=n===void 0?yt(d)===yt(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?W.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var ni=0,ri=()=>`__${String(++ni)}__`;function ii(){let{router:e}=$r(`useSubmit`),{basename:t}=W.useContext(Y),n=Jn(),r=e.fetch,i=e.navigate;return W.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=yr(e,t);if(a.navigate===!1){let e=a.fetcherKey||ri();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function ai(e,{relative:t}={}){let{basename:n}=W.useContext(Y),r=W.useContext(X);G(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...Nn(e||`.`,{relative:t})},o=Z();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:J([n,a.pathname])),yt(a)}var oi=`react-router-scroll-positions`,si={};function ci(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:q(e.pathname,n)||e.pathname},t)),i??(i=e.key),i}function li({getKey:e,storageKey:t}={}){let{router:n}=$r(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=ei(`useScrollRestoration`),{basename:a}=W.useContext(Y),o=Z(),s=Xn(),c=Yn();W.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),ui(W.useCallback(()=>{if(c.state===`idle`){let t=ci(o,s,a,e);si[t]=window.scrollY}try{sessionStorage.setItem(t||oi,JSON.stringify(si))}catch(e){K(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(W.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||oi);e&&(si=JSON.parse(e))}catch{}},[t]),W.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(si,()=>window.scrollY,e?(t,n)=>ci(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),W.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{K(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function ui(e,t){let{capture:n}=t||{};W.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function di(e,{relative:t}={}){let n=W.useContext(hn);G(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=$r(`useViewTransitionState`),i=Nn(e,{relative:t});if(!n.isTransitioning)return!1;let a=q(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=q(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Bt(i.pathname,o)!=null||Bt(i.pathname,a)!=null}var Q=a(),fi=()=>(0,Q.jsx)(nr,{}),pi=r(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),mi=r((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),hi=c(r(((e,t)=>{var n=pi(),r=mi(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function u(e){return(e||``).toString().replace(i,``)}var d=[[`#`,`hash`],[`?`,`query`],function(e,t){return m(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],f={hash:1,query:1};function p(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new _(unescape(e.pathname),{});else if(r===`string`)for(i in n=new _(e,{}),f)delete n[i];else if(r===`object`){for(i in e)i in f||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function m(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function h(e,t){e=u(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):m(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&m(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||m(r),slashesCount:s,rest:l}}function g(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function _(e,t,i){if(e=u(e),e=e.replace(a,``),!(this instanceof _))return new _(e,t,i);var o,s,c,f,v,y,b=d.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=p(t),s=h(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||l.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!m(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(f=b[C],typeof f==`function`){e=f(e,S);continue}c=f[0],y=f[1],c===c?typeof c==`string`?(v=c===`@`?e.lastIndexOf(c):e.indexOf(c),~v&&(typeof f[2]==`number`?(S[y]=e.slice(0,v),e=e.slice(v+f[2])):(S[y]=e.slice(v),e=e.slice(0,v)))):(v=c.exec(e))&&(S[y]=v[1],e=e.slice(0,v.index)):S[y]=e,S[y]=S[y]||o&&f[3]&&t[y]||``,f[4]&&(S[y]=S[y].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=g(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&m(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(v=S.auth.indexOf(`:`),~v?(S.username=S.auth.slice(0,v),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(v+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&m(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function v(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&m(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function y(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||m(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&m(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}_.prototype={set:v,toString:y},_.extractProtocol=h,_.location=p,_.trimLeft=u,_.qs=r,t.exports=_}))()),gi=window.location.href.match(/^(.*?\/calendar)(?=\/|$)/i)?.[1]??window.location.href.replace(/\/[^/]*$/,``),_i=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,hi.default)(`${gi}${e}`);return t?n.href:n.pathname},vi=c(o()),yi=c(e()),bi=class extends xe{constructor(){super(...arguments),this.state={textId:D()}}render(){let{theme:e,dateEnv:t,options:n,viewApi:r}=this.context,{cellId:i,dayDate:a,todayRange:o}=this.props,{textId:s}=this.state,c=C(a,o),l=n.listDayFormat?t.format(a,n.listDayFormat):``,u=n.listDaySideFormat?t.format(a,n.listDaySideFormat):``,d=Object.assign({date:t.toDate(a),view:r,textId:s,text:l,sideText:u,navLinkAttrs:me(this.context,a),sideNavLinkAttrs:me(this.context,a,`day`,!1)},c);return L(re,{elTag:`tr`,elClasses:[`fc-list-day`,...S(c,e)],elAttrs:{"data-date":x(a)},renderProps:d,generatorName:`dayHeaderContent`,customGenerator:n.dayHeaderContent,defaultGenerator:xi,classNameGenerator:n.dayHeaderClassNames,didMount:n.dayHeaderDidMount,willUnmount:n.dayHeaderWillUnmount},t=>L(`th`,{scope:`colgroup`,colSpan:3,id:i,"aria-labelledby":s},L(t,{elTag:`div`,elClasses:[`fc-list-day-cushion`,e.getClass(`tableCellShaded`)]})))}};function xi(e){return L(fe,null,e.text&&L(`a`,Object.assign({id:e.textId,className:`fc-list-day-text`},e.navLinkAttrs),e.text),e.sideText&&L(`a`,Object.assign({"aria-hidden":!0,className:`fc-list-day-side-text`},e.sideNavLinkAttrs),e.sideText))}var Si=se({hour:`numeric`,minute:`2-digit`,meridiem:`short`}),Ci=class extends xe{render(){let{props:e,context:t}=this,{options:n}=t,{seg:r,timeHeaderId:i,eventHeaderId:a,dateHeaderId:o}=e,s=n.eventTimeFormat||Si;return L(R,Object.assign({},e,{elTag:`tr`,elClasses:[`fc-list-event`,r.eventRange.def.url&&`fc-event-forced-url`],defaultGenerator:()=>wi(r,t),seg:r,timeText:``,disableDragging:!0,disableResizing:!0}),(e,n)=>L(fe,null,Ti(r,s,t,i,o),L(`td`,{"aria-hidden":!0,className:`fc-list-event-graphic`},L(`span`,{className:`fc-list-event-dot`,style:{borderColor:n.borderColor||n.backgroundColor}})),L(e,{elTag:`td`,elClasses:[`fc-list-event-title`],elAttrs:{headers:`${a} ${o}`}})))}};function wi(e,t){let n=O(e,t);return L(`a`,Object.assign({},n),e.eventRange.def.title)}function Ti(e,t,n,r,i){let{options:a}=n;if(a.displayEventTime!==!1){let o=e.eventRange.def,s=e.eventRange.instance,c=!1,l;if(o.allDay?c=!0:P(e.eventRange.range)?e.isStart?l=_e(e,t,n,null,null,s.range.start,e.end):e.isEnd?l=_e(e,t,n,null,null,e.start,s.range.end):c=!0:l=_e(e,t,n),c){let e={text:n.options.allDayText,view:n.viewApi};return L(re,{elTag:`td`,elClasses:[`fc-list-event-time`],elAttrs:{headers:`${r} ${i}`},renderProps:e,generatorName:`allDayContent`,customGenerator:a.allDayContent,defaultGenerator:Ei,classNameGenerator:a.allDayClassNames,didMount:a.allDayDidMount,willUnmount:a.allDayWillUnmount})}return L(`td`,{className:`fc-list-event-time`},l)}return null}function Ei(e){return e.text}var Di=class extends Se{constructor(){super(...arguments),this.computeDateVars=j(ki),this.eventStoreToSegs=j(this._eventStoreToSegs),this.state={timeHeaderId:D(),eventHeaderId:D(),dateHeaderIdRoot:D()},this.setRootEl=e=>{e?this.context.registerInteractiveComponent(this,{el:e}):this.context.unregisterInteractiveComponent(this)}}render(){let{props:e,context:t}=this,{dayDates:n,dayRanges:r}=this.computeDateVars(e.dateProfile),i=this.eventStoreToSegs(e.eventStore,e.eventUiBases,r);return L(N,{elRef:this.setRootEl,elClasses:[`fc-list`,t.theme.getClass(`table`),t.options.stickyHeaderDates===!1?``:`fc-list-sticky`],viewSpec:t.viewSpec},L(ee,{liquid:!e.isHeightAuto,overflowX:e.isHeightAuto?`visible`:`hidden`,overflowY:e.isHeightAuto?`visible`:`auto`},i.length>0?this.renderSegList(i,n):this.renderEmptyMessage()))}renderEmptyMessage(){let{options:e,viewApi:t}=this.context;return L(re,{elTag:`div`,elClasses:[`fc-list-empty`],renderProps:{text:e.noEventsText,view:t},generatorName:`noEventsContent`,customGenerator:e.noEventsContent,defaultGenerator:Oi,classNameGenerator:e.noEventsClassNames,didMount:e.noEventsDidMount,willUnmount:e.noEventsWillUnmount},e=>L(e,{elTag:`div`,elClasses:[`fc-list-empty-cushion`]}))}renderSegList(e,t){let{theme:n,options:r}=this.context,{timeHeaderId:i,eventHeaderId:a,dateHeaderIdRoot:o}=this.state,s=Ai(e);return L(k,{unit:`day`},(e,c)=>{let l=[];for(let n=0;n<s.length;n+=1){let u=s[n];if(u){let s=x(t[n]),d=o+`-`+s;l.push(L(bi,{key:s,cellId:d,dayDate:t[n],todayRange:c})),u=ue(u,r.eventOrder);for(let t of u)l.push(L(Ci,Object.assign({key:s+`:`+t.eventRange.instance.instanceId,seg:t,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,timeHeaderId:i,eventHeaderId:a,dateHeaderId:d},A(t,c,e))))}}return L(`table`,{className:`fc-list-table `+n.getClass(`table`)},L(`thead`,null,L(`tr`,null,L(`th`,{scope:`col`,id:i},r.timeHint),L(`th`,{scope:`col`,"aria-hidden":!0}),L(`th`,{scope:`col`,id:a},r.eventHint))),L(`tbody`,null,l))})}_eventStoreToSegs(e,t,n){return this.eventRangesToSegs(ie(e,t,this.props.dateProfile.activeRange,this.context.options.nextDayThreshold).fg,n)}eventRangesToSegs(e,t){let n=[];for(let r of e)n.push(...this.eventRangeToSegs(r,t));return n}eventRangeToSegs(e,t){let{dateEnv:n}=this.context,{nextDayThreshold:r}=this.context.options,i=e.range,a=e.def.allDay,o,s,c,l=[];for(o=0;o<t.length;o+=1)if(s=w(i,t[o]),s&&(c={component:this,eventRange:e,start:s.start,end:s.end,isStart:e.isStart&&s.start.valueOf()===i.start.valueOf(),isEnd:e.isEnd&&s.end.valueOf()===i.end.valueOf(),dayIndex:o},l.push(c),!c.isEnd&&!a&&o+1<t.length&&i.end<n.add(t[o+1].start,r))){c.end=i.end,c.isEnd=!0;break}return l}};function Oi(e){return e.text}function ki(e){let t=be(e.renderRange.start),n=e.renderRange.end,r=[],i=[];for(;t<n;)r.push(t),i.push({start:t,end:E(t,1)}),t=E(t,1);return{dayDates:r,dayRanges:i}}function Ai(e){let t=[],n,r;for(n=0;n<e.length;n+=1)r=e[n],(t[r.dayIndex]||(t[r.dayIndex]=[])).push(r);return t}T(`:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid var(--fc-border-color)}.fc .fc-list-empty{align-items:center;background-color:var(--fc-neutral-bg-color);display:flex;height:100%;justify-content:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{border-style:hidden;width:100%}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{background:var(--fc-page-bg-color);position:sticky;top:0}.fc .fc-list-table thead{left:-10000px;position:absolute}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{clear:both;content:"";display:table}.fc-theme-standard .fc-list-day-cushion{background-color:var(--fc-neutral-bg-color)}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:var(--fc-list-event-hover-bg-color)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{border:calc(var(--fc-list-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-list-event-dot-width)/2);box-sizing:content-box;display:inline-block;height:0;width:0}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}`);var ji={listDayFormat:Mi,listDaySideFormat:Mi,noEventsClassNames:M,noEventsContent:M,noEventsDidMount:M,noEventsWillUnmount:M};function Mi(e){return e===!1?null:se(e)}var Ni=I({name:`@fullcalendar/list`,optionRefiners:ji,views:{list:{component:Di,buttonTextKey:`list`,listDayFormat:{month:`long`,day:`numeric`,year:`numeric`}},listDay:{type:`list`,duration:{days:1},listDayFormat:{weekday:`long`}},listWeek:{type:`list`,duration:{weeks:1},listDayFormat:{weekday:`long`},listDaySideFormat:{month:`long`,day:`numeric`,year:`numeric`}},listMonth:{type:`list`,duration:{month:1},listDaySideFormat:{weekday:`long`}},listYear:{type:`list`,duration:{year:1},listDaySideFormat:{weekday:`long`}}}});r(((e,t)=>{var n=NaN,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt,c=typeof global==`object`&&global&&global.Object===Object&&global,l=typeof self==`object`&&self&&self.Object===Object&&self,u=c||l||Function(`return this`)(),d=Object.prototype.toString,f=Math.max,p=Math.min,m=function(){return u.Date.now()};function h(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,h=!0;if(typeof e!=`function`)throw TypeError(`Expected a function`);t=y(t)||0,g(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?f(y(n.maxWait)||0,t):a,h=`trailing`in n?!!n.trailing:h);function _(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function v(e){return l=e,s=setTimeout(S,t),u?_(e):o}function b(e){var n=e-c,r=e-l,i=t-n;return d?p(i,a-r):i}function x(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function S(){var e=m();if(x(e))return C(e);s=setTimeout(S,b(e))}function C(e){return s=void 0,h&&r?_(e):(r=i=void 0,o)}function w(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function T(){return s===void 0?o:C(m())}function E(){var e=m(),n=x(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return v(c);if(d)return s=setTimeout(S,t),_(c)}return s===void 0&&(s=setTimeout(S,t)),o}return E.cancel=w,E.flush=T,E}function g(e){var t=typeof e;return!!e&&(t==`object`||t==`function`)}function _(e){return!!e&&typeof e==`object`}function v(e){return typeof e==`symbol`||_(e)&&d.call(e)==`[object Symbol]`}function y(e){if(typeof e==`number`)return e;if(v(e))return n;if(g(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=g(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=e.replace(r,``);var c=a.test(e);return c||o.test(e)?s(e.slice(2),c?2:8):i.test(e)?n:+e}t.exports=h}))();var Pi=typeof window<`u`?W.useLayoutEffect:W.useEffect;function Fi(e,t,n,r){let i=(0,W.useRef)(t);Pi(()=>{i.current=t},[t]),(0,W.useEffect)(()=>{let t=n?.current??window;if(!(t&&t.addEventListener))return;let a=e=>{i.current(e)};return t.addEventListener(e,a,r),()=>{t.removeEventListener(e,a,r)}},[e,n,r])}function Ii(e){let t=(0,W.useRef)(()=>{throw Error(`Cannot call an event handler while rendering.`)});return Pi(()=>{t.current=e},[e]),(0,W.useCallback)((...e)=>t.current?.call(t,...e),[t])}var Li=typeof window>`u`;function Ri(e,t,n={}){let{initializeWithValue:r=!0}=n,i=(0,W.useCallback)(e=>n.serializer?n.serializer(e):JSON.stringify(e),[n]),a=(0,W.useCallback)(e=>{if(n.deserializer)return n.deserializer(e);if(e===`undefined`)return;let r=t instanceof Function?t():t,i;try{i=JSON.parse(e)}catch(e){return console.error(`Error parsing JSON:`,e),r}return i},[n,t]),o=(0,W.useCallback)(()=>{let n=t instanceof Function?t():t;if(Li)return n;try{let t=window.localStorage.getItem(e);return t?a(t):n}catch(t){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,t),n}},[t,e,a]),[s,c]=(0,W.useState)(()=>r?o():t instanceof Function?t():t),l=Ii(t=>{Li&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{let n=t instanceof Function?t(o()):t;window.localStorage.setItem(e,i(n)),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))}catch(t){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,t)}}),u=Ii(()=>{Li&&console.warn(`Tried removing localStorage key \u201C${e}\u201D even though environment is not a client`);let n=t instanceof Function?t():t;window.localStorage.removeItem(e),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))});(0,W.useEffect)(()=>{c(o())},[e]);let d=(0,W.useCallback)(t=>{t.key&&t.key!==e||c(o())},[e,o]);return Fi(`storage`,d),Fi(`local-storage`,d),[s,l,u]}var zi={week:{duration:{weeks:1},dateAlignment:`week`,dateIncrement:{weeks:1}},month:{duration:{months:1},dateAlignment:`month`,dateIncrement:{months:1}},threeMonths:{duration:{months:3},dateAlignment:`month`,dateIncrement:{months:3}},year:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1}}},Bi=e=>zi[e],Vi=()=>{let[e,t]=Ri(`solspace-calendar-agenda-range`,`month`);return{range:Object.hasOwn(zi,e)?e:`month`,setRange:t}},Hi=({range:e,onChange:t,disabled:n})=>{let r=(0,W.useId)();return(0,Q.jsxs)(`div`,{className:`calendar-agenda-range`,children:[(0,Q.jsx)(`label`,{htmlFor:r,children:Craft.t(`calendar`,`Range`)}),(0,Q.jsx)(`div`,{className:`select`,children:(0,Q.jsxs)(`select`,{id:r,"aria-label":Craft.t(`calendar`,`Agenda range`),value:e,disabled:n,onChange:e=>t(e.target.value),children:[(0,Q.jsx)(`option`,{value:`week`,children:Craft.t(`calendar`,`Week`)}),(0,Q.jsx)(`option`,{value:`month`,children:Craft.t(`calendar`,`Month`)}),(0,Q.jsx)(`option`,{value:`threeMonths`,children:Craft.t(`calendar`,`3 months`)}),(0,Q.jsx)(`option`,{value:`year`,children:Craft.t(`calendar`,`Year`)})]})})]})},Ui=`solspace-calendar-hidden-calendars`,Wi={day:`timeGridDay`,week:`timeGridWeek`,month:`dayGridMonth`,year:`calendarYear`,agenda:`listMonth`},Gi=()=>{let e=window.location.pathname.split(`/`).filter(Boolean).at(-1);return e&&Wi[e]||null},Ki=e=>Object.entries(Wi).find(([,t])=>t===e)?.[0]??`month`,qi=(e=`month`,t)=>{let n=(0,W.useMemo)(()=>{let e=Object.keys(Wi),n=e.filter(e=>!t||t.includes(e));return(n.length?n:e).map(e=>Wi[e])},[t]),r=(0,W.useCallback)(t=>n.includes(t)?t:n.includes(Wi[e])?Wi[e]:n.includes(`dayGridMonth`)?`dayGridMonth`:n[0],[e,n]),[i,a]=(0,W.useState)(()=>r(Gi()||Wi[e]||`dayGridMonth`)),[o,s]=(0,W.useState)(!1);return(0,W.useEffect)(()=>{s(!0)},[]),{view:i,setView:e=>{a(r(e)),s(!0)},isReady:o,enabledViews:n,resolveView:r}},Ji=()=>{let[e,t]=Ri(Ui,[]);return{hiddenCalendarIds:e,toggleCalendarVisibility:e=>{t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}}},Yi=(e,t)=>{let n=t??Gi(),r=n?`/${Ki(n)}`:``,i=new URL(Craft.getCpUrl(`calendar/${m(e)}${r}`),window.location.origin);i.search=window.location.search,i.toString()!==window.location.href&&history.pushState(`data`,``,i.toString())},Xi=`refresh prev,today,datepicker,next`,Zi=(e,{datePickerButton:t})=>({prev:{text:Craft.t(`calendar`,`Previous`),icon:`chevron-left`,click:()=>{e.prev(),Yi(e.getDate())}},next:{text:Craft.t(`calendar`,`Next`),icon:`chevron-right`,click:()=>{e.next(),Yi(e.getDate())}},refresh:{text:Craft.t(`calendar`,`Refresh`),icon:`refresh`,click:()=>{ve(),e.refetchEvents()}},datepicker:t}),Qi=(0,W.createContext)(null),$i=({config:e,children:t})=>{let n=(0,W.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,Q.jsx)(Qi.Provider,{value:n,children:t})},$=()=>{let e=(0,W.useContext)(Qi);if(!e)throw Error(`ConfigContext is not provided`);return e},ea=(e,t,n)=>{let{weekStartDay:r}=$(),i=(0,W.useRef)(null),[a,o]=(0,W.useState)(!1),[s,c]=(0,W.useState)(null),[l,u]=(0,W.useState)(null),f=(0,W.useCallback)(()=>{o(!1),c(null)},[]);(0,W.useEffect)(()=>{if(!a)return;let e=e=>{let t=e.target;i.current?.contains(t)||t.closest(`.fc-datepicker-button`)||f()},t=e=>{e.key===`Escape`&&f()};return window.addEventListener(`mousedown`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`mousedown`,e),window.removeEventListener(`keydown`,t)}},[f,a]);let m=(0,W.useCallback)(t=>{if(!t)return;let n=p(t);Yi(n),e.gotoDate(n),u(t),f()},[f,e]),h=(0,W.useCallback)((t,n)=>{let{bottom:r,right:i}=n.getBoundingClientRect();u(d(e.getDate())),o(e=>!e),c({top:r+8,left:i})},[e]);return{dateSelector:a&&s?(0,Q.jsx)(ta,{view:t,agendaRange:n,popoverRef:i,position:s,selectedDate:l,weekStartDay:r,onDateSelect:m}):null,datePickerButton:{text:Craft.t(`calendar`,`Pick a Date`),icon:`datepicker`,click:h}}},ta=({view:e,agendaRange:t,popoverRef:n,position:r,selectedDate:i,weekStartDay:a,onDateSelect:o})=>{let s=e===`timeGridWeek`||e===`listMonth`&&t===`week`,c=e===`calendarYear`||e===`listMonth`&&t===`year`,l=e===`dayGridMonth`||e===`listMonth`&&!s&&!c;return(0,Q.jsx)(`div`,{ref:n,className:`fc-datepicker-popover`,style:{top:r.top,left:r.left},children:(0,Q.jsx)(Ae,{...h(),inline:!0,selected:i,onChange:o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:a,showWeekPicker:s,showWeekNumbers:s,showMonthYearPicker:l,showYearPicker:c})})},na=e=>e.view.type===`dayGridMonth`&&!e.event.allDay&&!e.event.extendedProps?.multiDay,ra=e=>{let t=e?.toLowerCase();return t===`black`||t===`white`?`fc-color-${t}`:null},ia=({event:e})=>{let t=[];e.allDay&&t.push(`fc-event-all-day`),e.end&&(!e.extendedProps?.multiDay&&!e.allDay?t.push(`fc-event-single-day`):t.push(`fc-event-multi-day`)),e.extendedProps?.enabled===!1&&t.push(`fc-event-disabled`),e.extendedProps?.cancelled&&t.push(`fc-event-cancelled`);let n=ra(e.textColor);return n&&t.push(n),t},aa=(e,t)=>ze(e)?`ignore`:Be(t,`[data-calendar-event-title-link]`)?`navigate`:`open`,oa=e=>{let{event:t,timeText:n}=e,r=e.view.type===`listMonth`,i=V(`fc-event-title`,na(e)&&`fc-event-title-inline`),a=!ze(t)&&t.url,o=!!t.extendedProps?.cancelled,c=!o&&t.extendedProps?.isEdited?(0,Q.jsx)(`span`,{className:`fc-event-flag`,title:s(`This occurrence has its own changes.`),"aria-hidden":`true`,children:`✎`}):null,l=o&&!r?(0,Q.jsxs)(`span`,{className:`visually-hidden`,children:[`, `,s(`Cancelled`)]}):null,u=(0,Q.jsx)(U,{count:t.extendedProps.overlaps?.count}),d=r?(0,Q.jsxs)(`a`,{href:t.url||`#`,className:i,children:[u,c,t.title]}):a?(0,Q.jsxs)(`button`,{type:`button`,onClick:()=>window.location.href=t.url,className:i,"data-calendar-event-title-link":!0,children:[u,c,t.title,l]}):(0,Q.jsxs)(`div`,{className:i,children:[u,c,t.title,l]});if(r){let{calendarName:e,location:n,description:r}=t.extendedProps;return(0,Q.jsxs)(`div`,{className:`calendar-agenda-event`,children:[(0,Q.jsxs)(`div`,{className:`calendar-agenda-header`,children:[(0,Q.jsxs)(`div`,{className:`calendar-agenda-title`,children:[d,o&&(0,Q.jsx)(`span`,{className:`calendar-agenda-cancelled`,children:s(`Cancelled`)})]}),e&&(0,Q.jsxs)(`span`,{className:`calendar-agenda-calendar`,children:[(0,Q.jsx)(`span`,{className:`calendar-agenda-calendar-dot`,style:{backgroundColor:t.extendedProps.calendarColor||t.backgroundColor},"aria-hidden":`true`}),e]})]}),n&&(0,Q.jsx)(`div`,{className:`calendar-agenda-meta`,children:(0,Q.jsx)(`span`,{className:`calendar-agenda-location`,children:n})}),r&&(0,Q.jsx)(`div`,{className:`calendar-agenda-description`,children:r})]})}return na(e)?(0,Q.jsxs)(`div`,{className:`fc-event-main-frame fc-event-main-frame-inline`,children:[(0,Q.jsx)(`span`,{className:`fc-color-icon`,style:{backgroundColor:t.backgroundColor,borderColor:t.borderColor}}),(0,Q.jsx)(`div`,{className:`fc-event-title-container`,children:d}),n?(0,Q.jsx)(`div`,{className:`fc-event-time`,children:n}):null]}):(0,Q.jsx)(`div`,{className:`fc-event-main-frame`,children:(0,Q.jsx)(`div`,{className:`fc-event-title-container`,children:d})})},sa=`calendar:schedule-history-reset`,ca=e=>{let[t,n]=(0,W.useState)([]),[r,i]=(0,W.useState)([]),[a,o]=(0,W.useState)(!1),s=(0,W.useRef)(!1),c=(0,W.useCallback)(()=>{n([]),i([])},[]);(0,W.useEffect)(()=>(window.addEventListener(sa,c),()=>window.removeEventListener(sa,c)),[c]);let l=(0,W.useCallback)(e=>{n(t=>[...t,e].slice(-50)),i([])},[]),u=(0,W.useCallback)(async e=>{if(s.current)return!1;s.current=!0,o(!0);try{return await e()}finally{s.current=!1,o(!1)}},[]);return{add:l,run:u,replay:(0,W.useCallback)(async a=>{let o=(a===`undo`?t:r).at(-1);o&&await u(async()=>await ye(o,a)?(a===`undo`?(n(e=>e.slice(0,-1)),i(e=>[...e,o])):(i(e=>e.slice(0,-1)),n(e=>[...e,o])),e(),!0):!1)},[t,r,u,e]),clear:c,busy:a,canUndo:t.length>0,canRedo:r.length>0}},la=n.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--medium-border-radius, 4px);
  background: #c4cfe1;
`,ua=n.button`
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
`,da=({canUndo:e,canRedo:t,disabled:n,onReplay:r})=>((0,W.useEffect)(()=>{let i=i=>{if(n||i.defaultPrevented||i.altKey||!(i.metaKey||i.ctrlKey))return;let a=i.target;if(a instanceof HTMLElement&&a.closest(`input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=textbox]`)||document.querySelector(`.modal:not(.hidden), .cp-screen-slideout:not(.hidden)`))return;let o=i.key.toLowerCase(),s=o===`z`?i.shiftKey?`redo`:`undo`:o===`y`&&i.ctrlKey?`redo`:null;!s||!(s===`undo`?e:t)||(i.preventDefault(),r(s))};return document.addEventListener(`keydown`,i),()=>document.removeEventListener(`keydown`,i)},[e,t,n,r]),(0,Q.jsx)(la,{role:`group`,"aria-label":s(`Event history`),children:[`undo`,`redo`].map(i=>(0,Q.jsx)(ua,{type:`button`,disabled:n||!(i===`undo`?e:t),title:s(i===`undo`?`Undo`:`Redo`),"aria-label":s(i===`undo`?`Undo`:`Redo`),onClick:()=>r(i),children:(0,Q.jsx)(`svg`,{viewBox:`0 0 96 80`,width:`18`,height:`16`,"aria-hidden":`true`,focusable:`false`,children:(0,Q.jsx)(`g`,{transform:i===`redo`?`translate(96 0) scale(-1 1)`:void 0,children:(0,Q.jsx)(`path`,{fill:`currentColor`,d:`M37 1 1 30l36 29V41h18c15 0 23 8 23 22 0 6-2 11-5 16 12-8 19-19 19-31 0-20-14-31-37-31H37V1Z`})})})},i))})),fa=()=>new URL(window.location.href).searchParams.get(`search`)?.trim()??``,pa=({initialSearch:e,onSearchChange:t})=>{let[n,r]=(0,W.useState)(e),i=(0,W.useId)(),a=(0,W.useRef)(null);(0,W.useEffect)(()=>{let e=setTimeout(()=>t(n.trim()),250);return()=>clearTimeout(e)},[n,t]);let o=()=>{r(``),t(``),a.current?.focus()};return(0,Q.jsx)($e,{children:(0,Q.jsxs)(`div`,{className:`calendar-search-toolbar`,children:[(0,Q.jsxs)(`div`,{className:`calendar-search-input`,children:[(0,Q.jsx)(`span`,{className:`calendar-search-icon`,"data-icon":`search`,"aria-hidden":`true`}),(0,Q.jsx)(`input`,{type:`search`,ref:a,className:`text fullwidth`,"aria-label":s(`Search events`),"aria-describedby":i,placeholder:Craft.t(`app`,`Search`),value:n,onChange:e=>r(e.target.value),onKeyDown:e=>{e.key===`Escape`&&n&&(e.stopPropagation(),o())}}),n&&(0,Q.jsx)(`button`,{type:`button`,className:`calendar-search-clear`,"aria-label":s(`Clear search`),"data-icon":`remove`,onClick:o})]}),(0,Q.jsx)(`span`,{id:i,className:`visually-hidden`,children:s(`Searches events in the displayed date range.`)})]})})},ma=n.div`
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
`,ha=n.div`
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
`,ga=(e,t,n)=>new Date(Date.UTC(e,t,n)),_a=e=>{let t=new Map;for(let n of e){let e=n.range.start,r=ga(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());for(;r<n.range.end;){let e=b(r),i=t.get(e)??[];i.push(n),t.set(e,i),r.setUTCDate(r.getUTCDate()+1)}}for(let e of t.values())e.sort((e,t)=>Number(t.def.allDay)-Number(e.def.allDay)||(e.instance?.range.start.getTime()??0)-(t.instance?.range.start.getTime()??0)||e.def.title.localeCompare(t.def.title));return t},va=e=>e.def.extendedProps.calendarColor||e.ui.backgroundColor||`#607d9f`,ya=e=>{let t=new Map;for(let n of e){let e=!!n.def.extendedProps.cancelled,r=va(n),i=e?`cancelled`:String(n.def.extendedProps.calendar??r);t.set(i,{color:r,cancelled:e})}return Array.from(t.entries())},ba=({date:e,events:t,anchor:n,onEventSelect:r})=>{let{hidePopover:i}=u(),{language:a,formats:o}=$(),c=(0,W.useRef)(null),l=new Intl.DateTimeFormat(a,{month:`short`,day:`numeric`,year:`numeric`,timeZone:`UTC`}),d=new Intl.DateTimeFormat(a,{...o.time.short.js,timeZone:`UTC`});(0,W.useEffect)(()=>{let e=e=>{e.key===`Escape`&&i()},t=e=>{let t=e.target;!n.contains(t)&&!c.current?.contains(t)&&i()};return document.addEventListener(`keydown`,e),document.addEventListener(`pointerdown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`pointerdown`,t)}},[n,i]);let f=e=>{if(!e.instance)return``;let{start:t,end:n}=e.instance.range;if(e.def.allDay){let e=new Date(n.getTime()-1);return b(t)===b(e)?s(`All Day`):`${s(`All Day`)} · ${l.format(t)} – ${l.format(e)}`}let r=b(t)===b(n),i=d.format(t),a=d.format(n);return r?`${i} – ${a}`:`${l.format(t)} ${i} – ${l.format(n)} ${a}`};return(0,Q.jsxs)(ha,{ref:c,"data-calendar-year-preview":!0,children:[(0,Q.jsx)(`h3`,{children:e.toLocaleDateString(a,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`,timeZone:`UTC`})}),(0,Q.jsx)(`ul`,{children:t.map(e=>(0,Q.jsx)(`li`,{children:(0,Q.jsxs)(`button`,{type:`button`,className:V({"is-cancelled":e.def.extendedProps.cancelled}),onClick:t=>r(e.def.publicId,n,t),children:[(0,Q.jsx)(`span`,{className:`year-preview-dot`,style:{backgroundColor:va(e)}}),(0,Q.jsxs)(`span`,{className:`year-preview-details`,children:[(0,Q.jsxs)(`span`,{className:`year-preview-title`,children:[(0,Q.jsxs)(`strong`,{children:[(0,Q.jsx)(U,{count:e.def.extendedProps.overlaps?.count}),e.def.title]}),e.def.extendedProps.cancelled&&(0,Q.jsx)(`span`,{className:`year-preview-cancelled`,children:s(`Cancelled`)})]}),(0,Q.jsx)(`span`,{className:`year-preview-time`,children:f(e)}),e.def.extendedProps.calendarName&&(0,Q.jsx)(`span`,{className:`year-preview-calendar`,children:e.def.extendedProps.calendarName})]})]})},e.instance?.instanceId??e.def.defId))})]})},xa=({content:e,disabled:t,loading:n,error:r,search:i,onDateSelect:a,onMonthSelect:o,onEventSelect:c})=>{let{language:l,weekStartDay:d}=$(),{showPopover:f,hidePopover:p}=u(),m=(0,W.useRef)(void 0),h=e.dateProfile.currentRange.start.getUTCFullYear(),g=(0,W.useMemo)(()=>_a(te(e,!0)),[e]),_=(0,W.useMemo)(()=>new Intl.DateTimeFormat(l,{month:`long`,timeZone:`UTC`}),[l]),v=(0,W.useMemo)(()=>new Intl.DateTimeFormat(l,{weekday:`narrow`,timeZone:`UTC`}),[l]),y=Array.from({length:7},(e,t)=>ga(2023,0,1+d+t)),x=b(new Date);(0,W.useEffect)(()=>()=>{clearTimeout(m.current),p()},[p]),(0,W.useEffect)(()=>{clearTimeout(m.current),p()},[p,e.eventStore,h,t,n]);let S=(e,r,i)=>{t||n||!r.length||f((0,Q.jsx)(ba,{date:e,events:r,anchor:i,onEventSelect:c}),i,{position:[`bottom`,`top`,`right`,`left`],closeDelayMs:300})};return(0,Q.jsxs)(ma,{children:[(0,Q.jsx)(`div`,{className:`calendar-year-grid`,children:Array.from({length:12},(e,n)=>{let r=ga(h,n,1),i=_.format(r),c=(r.getUTCDay()-d+7)%7,u=ga(h,n+1,0).getUTCDate();return(0,Q.jsxs)(`section`,{className:`calendar-year-month`,"aria-label":i,children:[(0,Q.jsx)(`h3`,{children:(0,Q.jsx)(`button`,{type:`button`,disabled:t,onClick:()=>o(r),children:i})}),(0,Q.jsx)(`div`,{className:`calendar-year-weekdays`,"aria-hidden":`true`,children:y.map(e=>(0,Q.jsx)(`span`,{children:v.format(e)},e.getUTCDay()))}),(0,Q.jsx)(`div`,{className:`calendar-year-days`,children:Array.from({length:42},(e,r)=>{let i=r-c+1;if(i<1||i>u)return(0,Q.jsx)(`span`,{},r);let o=ga(h,n,i),d=b(o),f=g.get(d)??[],_=ya(f),v=o.toLocaleDateString(l,{dateStyle:`full`,timeZone:`UTC`}),y=s(f.length===1?`{count} event`:`{count} events`,{count:f.length}),C=f.filter(e=>e.def.extendedProps.cancelled).length;return(0,Q.jsxs)(`button`,{type:`button`,className:V(`calendar-year-day`,{"is-today":d===x,"has-events":f.length>0}),"data-date":d,"aria-label":`${v}, ${y}${C?`, ${s(`Cancelled`)}: ${C}`:``}`,"aria-current":d===x?`date`:void 0,disabled:t,onClick:()=>{clearTimeout(m.current),a(o)},onMouseEnter:e=>{let t=e.currentTarget;clearTimeout(m.current),m.current=setTimeout(()=>S(o,f,t),300)},onMouseLeave:()=>clearTimeout(m.current),onFocus:e=>{clearTimeout(m.current),S(o,f,e.currentTarget)},onBlur:e=>{(!(e.relatedTarget instanceof HTMLElement)||!e.relatedTarget.closest(`[data-calendar-year-preview]`))&&p()},children:[(0,Q.jsx)(`span`,{className:`calendar-year-day-number`,children:i}),(0,Q.jsxs)(`span`,{className:`calendar-year-markers`,"aria-hidden":`true`,children:[_.slice(0,3).map(([e,t])=>(0,Q.jsx)(`span`,{className:V(`calendar-year-dot`,{"is-cancelled":t.cancelled}),style:{backgroundColor:t.color}},e)),_.length>3&&(0,Q.jsx)(`span`,{className:`calendar-year-more`,children:`+`})]})]},r)})})]},n)})}),(0,Q.jsxs)(`div`,{className:`calendar-year-footer`,children:[(0,Q.jsx)(`span`,{role:`status`,children:s(r?`Couldn’t load events. Use Refresh to try again.`:n?`Loading events…`:g.size?`Hover a date to preview its events.`:i?`No matching events in this date range.`:`No events in this date range.`)}),(0,Q.jsxs)(`span`,{className:`calendar-year-legend`,children:[(0,Q.jsx)(`span`,{className:`calendar-year-dot is-cancelled`,"aria-hidden":`true`}),s(`Cancelled`)]})]})]})},Sa=({options:e,value:t,onChange:n})=>{let r=(0,W.useId)(),i=(0,W.useRef)(null),a=(0,W.useRef)(null),o=(0,W.useRef)(n),c=JSON.stringify(e),l=e.find(e=>e.value===t);return(0,W.useEffect)(()=>{o.current=n},[n]),(0,W.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu`,t.style.minWidth=`${e.getBoundingClientRect().width}px`,t.setAttribute(`aria-label`,s(`Calendar`)),a.current=t;let n=document.createElement(`ul`);t.append(n),JSON.parse(c).forEach(e=>{let t=document.createElement(`li`),r=document.createElement(`a`);r.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),r.append(i,document.createTextNode(e.label)),t.append(r),n.append(t)}),e.after(t);let r=new Garnish.MenuBtn(e,{onOptionSelect:t=>{r.hideMenu(),o.current(Number(t.dataset.calendarId)),e.focus()}}),l=t=>{t.key===`Escape`&&r.showingMenu&&(t.preventDefault(),t.stopPropagation(),r.hideMenu(),e.focus())};return document.addEventListener(`keydown`,l,!0),()=>{document.removeEventListener(`keydown`,l,!0),r.hideMenu(),r.destroy(),t.remove(),a.current=null}},[c]),(0,W.useEffect)(()=>{a.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let n=Number(e.dataset.calendarId)===t;e.classList.toggle(`sel`,n),e.setAttribute(`aria-selected`,String(n))})},[t,c]),(0,Q.jsx)(Te,{label:s(`Calendar`),id:r,required:!0,children:(0,Q.jsxs)(Ca,{ref:i,id:r,type:`button`,className:`btn menubtn fullwidth`,"aria-required":`true`,children:[(0,Q.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:l?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,Q.jsx)(`span`,{className:`calendar-name`,children:l?.label})]})})},Ca=n.button`
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
`,wa=e=>Math.floor(e/86400)*86400,Ta=e=>Math.max(wa(e.start),wa(e.recurrence?.until??e.start))+(e.allDay?0:e.start-wa(e.start)),Ea=e=>{let t=e.recurrence;if(!t||t.type===`NEVER`||!Da(e))return;let n=t.type===`WEEKDAYS`,r=t.type===`WEEKDAYS`?`CUSTOM`:t.type,i={DAILY:Ye.DAILY,WEEKDAYS:Ye.WEEKLY,WEEKLY:Ye.WEEKLY,MONTHLY:Ye.MONTHLY,YEARLY:Ye.YEARLY}[t.type],a=t.endType===`ON_DATE`?Ta(e):void 0,o=t.endType===`AFTER`?t.count:void 0,s=new Date(e.start*1e3),c=new Fe({dtstart:s,freq:i,interval:1,...n&&{byweekday:[Fe.MO,Fe.TU,Fe.WE,Fe.TH,Fe.FR]},...t.type===`WEEKLY`&&{byweekday:[(s.getUTCDay()+6)%7]},...t.type===`MONTHLY`&&{bymonthday:s.getUTCDate()},...t.type===`YEARLY`&&{bymonth:s.getUTCMonth()+1,bymonthday:s.getUTCDate()},count:o,until:a===void 0?void 0:new Date(a*1e3)});return{repeatType:r,repeatEndType:t.endType,rrule:Ze(c.toString(),e.allDay),...a!==void 0&&{until:a}}},Da=e=>!e.recurrence||e.recurrence.type===`NEVER`||e.recurrence.endType!==`AFTER`||Number.isSafeInteger(e.recurrence.count)&&(e.recurrence.count??0)>=1,Oa=e=>e?/(?:^|;)COUNT=\d+/i.test(e)?`AFTER`:/(?:^|;)UNTIL=/i.test(e)?`ON_DATE`:`NEVER`:`NEVER`,ka=e=>{if(e.recurrence)return Ea(e)??{repeatType:`NEVER`,repeatEndType:`NEVER`};if(!e.repeatType||e.repeatType===`NEVER`)return{repeatType:`NEVER`,repeatEndType:`NEVER`};let t=Oa(e.rrule),n=t===`NEVER`?e.repeatEndType||`NEVER`:t;return{repeatType:e.repeatType,repeatEndType:n,rrule:e.rrule||``,...n===`ON_DATE`&&e.until!=null?{until:e.until}:{}}},Aa=(e,t,n,r)=>({title:e.title||s(`New Event`),start:e.start,end:e.end,allDay:e.allDay,calendarId:t,siteId:n,...ka(e),...r&&{details:r}}),ja=({refetchEvents:e,onSuccess:t})=>{let{hidePopover:n}=u(),{currentSiteId:r}=$(),[i,a]=(0,W.useState)(null),[o,c]=(0,W.useState)(null),l=(0,W.useCallback)(async(i,o,l,u)=>{a(u?`prepare`:`create`),c(null);try{let a=Aa(i,o,r,l);u&&(a.title=i.title);let c=await Qe(_i(u?`/api/events/prepare`:`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)});if(!c.ok){let e=null;try{e=await c.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}let d=await c.json();if(u){if(typeof d?.url!=`string`||!d.url)throw Error(s(`Couldn’t create event.`));return d.url}return ve(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),e?.(),t?.(),n(),null}catch(e){return e instanceof Error?c(e.message):c(`Failed to create event`),null}finally{a(null)}},[n,t,e,r]);return{createEvent:(e,t,n)=>l(e,t,n,!1),prepareEvent:(e,t,n)=>l(e,t,n,!0),error:o,isFetching:i!==null,isOpeningEditor:i===`prepare`}},Ma=n.div`
  width: 440px;
  max-width: calc(100vw - 32px);
  max-height: var(--calendar-popover-max-height, calc(100dvh - 32px));
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  label.required::after {
    font-size: 10px;
  }

  hr {
    margin: 15px 0;
  }
`,Na=n.div`
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  padding: 15px;
`,Pa=n(it)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,Fa=n.div`
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
`,Ia=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,La=n.div`
  display: grid;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  background: var(--gray-50);
`,Ra=n.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px;

  > .field { flex: 1 1 140px; min-width: 0; }
  input { width: 100%; }
`,za=n.p`
  && { margin: 0; }
  font-size: 12px;
  line-height: 1.5;
  color: var(--light-text-color);
`,Ba=n.label`
  font-weight: 600;
  cursor: pointer;
`,Va=n(it)`
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  border-top: 1px solid var(--gray-200);
  padding: 12px 15px;

  @media (max-height: 600px) {
    padding-block: 10px;
  }
`,Ha=n.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  .btn + .btn {
    margin-inline-start: 0;
  }
`,Ua=n.button`
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
`,Wa=({draft:e,onChange:t,formats:n,weekStartDay:r,disabled:i})=>{let a=(0,W.useId)(),o=e.recurrence??{type:`NEVER`,endType:`NEVER`},c=f(e.start),l=n.date.short.icu??`P`,u=_(),d=Ea(e),p=d?qe(We(d.rrule,e.start),l):null,m=[{value:`NEVER`,label:s(`Does not repeat`)},{value:`DAILY`,label:s(`Every Day`)},{value:`WEEKDAYS`,label:s(`Weekdays (Monday–Friday)`)},{value:`WEEKLY`,label:s(`Weekly on {weekday}`,{weekday:De(c,`EEEE`,{locale:u})})},{value:`MONTHLY`,label:s(`Monthly on day {day}`,{day:c.getDate()})},{value:`YEARLY`,label:s(`Yearly on {date}`,{date:new Intl.DateTimeFormat(g(),{month:`long`,day:`numeric`}).format(c)})}];return(0,Q.jsxs)(La,{children:[(0,Q.jsx)(Te,{label:`Repeat`,id:`${a}-repeat`,children:(0,Q.jsx)(`div`,{className:`select fullwidth`,children:(0,Q.jsx)(`select`,{id:`${a}-repeat`,className:`fullwidth`,value:o.type,disabled:i,onChange:n=>t({...e,recurrence:{...o,type:n.target.value}}),children:m.map(({value:e,label:t})=>(0,Q.jsx)(`option`,{value:e,children:t},e))})})}),o.type!==`NEVER`&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(Ra,{children:[(0,Q.jsx)(Te,{label:`Repeat ends`,id:`${a}-ends`,children:(0,Q.jsx)(`div`,{className:`select fullwidth`,children:(0,Q.jsxs)(`select`,{id:`${a}-ends`,className:`fullwidth`,value:o.endType,disabled:i,onChange:n=>t({...e,recurrence:{...o,endType:n.target.value,count:o.count??10,until:o.until??y(Me(c,1))}}),children:[(0,Q.jsx)(`option`,{value:`NEVER`,children:s(`Never`)}),(0,Q.jsx)(`option`,{value:`ON_DATE`,children:s(`On a date`)}),(0,Q.jsx)(`option`,{value:`AFTER`,children:s(`After...`)})]})})}),o.endType===`AFTER`&&(0,Q.jsx)(Te,{label:`Occurrences`,id:`${a}-count`,required:!0,children:(0,Q.jsx)(`input`,{id:`${a}-count`,className:`text fullwidth`,type:`number`,min:1,step:1,required:!0,disabled:i,value:o.count??``,onChange:n=>t({...e,recurrence:{...o,count:n.target.value===``?void 0:n.target.valueAsNumber}})})}),o.endType===`ON_DATE`&&(0,Q.jsx)(ke,{portal:!0,id:`${a}-until`,label:s(`Last date`),value:Ta(e),required:!0,datePickerProps:{disabled:i,showIcon:!0,icon:(0,Q.jsx)(Oe,{}),toggleCalendarOnIconClick:!0,dateFormat:l,minDate:c,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:r},onChange:n=>{n!==null&&t({...e,recurrence:{...o,until:n}})}})]}),p&&(0,Q.jsx)(za,{role:`status`,"aria-live":`polite`,children:p})]})]})},Ga=({draft:e,onChange:t,refetchEvents:n,onConfirm:r,onCancel:i})=>{let{currentSiteId:a,showOverlapWarnings:o,calendars:c,calendarColors:l,calendarAllowRepeating:u,quickCreateFields:d,quickCreateRequiredFields:p,formats:m,weekStartDay:h,eventDuration:g,timeInterval:_}=$(),v=(0,W.useId)(),y=(0,W.useMemo)(()=>Object.entries(c).map(([e,t])=>({value:Number(e),label:t,color:l?.[Number(e)]})),[c,l]),[b,x]=(0,W.useState)(e.calendarId&&y.some(t=>t.value===e.calendarId)?e.calendarId:y[0]?.value??0),[S,C]=(0,W.useState)(()=>{if(!e.calendarId)return{};let t=d?.[e.calendarId];if(!t)return{};let n={};return t.location&&e.location&&(n[t.location]=e.location),t.description&&e.description&&(n[t.description]=e.description),Object.keys(n).length?{[e.calendarId]:n}:{}}),w=u?.[b]??!1,T=w||!e.recurrence&&!e.rrule?e:{...e,recurrence:void 0,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,until:void 0},E=Da(T),D=ka(T),O=d?.[b],k=O?.location,A=O?.description,j=p?.[b],ee=S[b]??{},M=(0,W.useMemo)(()=>!w||e.recurrence||!e.rrule||e.repeatType===`NEVER`?null:Xe(e.rrule),[w,e.recurrence,e.repeatType,e.rrule]),N=k||A?{...k&&{location:ee[k]??``},...A&&{description:ee[A]??``}}:void 0,P=(e,t)=>{C(n=>({...n,[b]:{...n[b],[e]:t}}))},{createEvent:te,prepareEvent:ne,error:re,isFetching:F,isOpeningEditor:ie}=ja({refetchEvents:n,onSuccess:r}),ae=(0,W.useMemo)(()=>e.allDay?m.date.short.icu:m.datetime.short.icu,[m,e.allDay]),oe=(0,W.useMemo)(()=>Ge(e),[e]);return Fi(`keydown`,e=>{e.key===`Escape`&&!F&&i()}),(0,Q.jsxs)(Ma,{children:[(0,Q.jsxs)(Na,{children:[(0,Q.jsx)(Pa,{children:(0,Q.jsx)(nt,{label:s(`Title`),id:`${v}-title`,required:!0,autofocus:!0,value:e.title,placeholder:s(`Event Title`),onChange:n=>t(Re(e,n))})}),(0,Q.jsxs)(Fa,{children:[(0,Q.jsx)(Sa,{value:b,options:y,onChange:n=>{x(n),!u?.[n]&&(e.recurrence||e.rrule)&&t({...e,recurrence:void 0,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,until:void 0})}}),(0,Q.jsx)(`hr`,{}),(0,Q.jsxs)(Ia,{children:[(0,Q.jsx)(je,{enabled:e.allDay,onClick:n=>t(Ve(e,n,{eventDuration:g}))}),(0,Q.jsx)(Ba,{onClick:()=>t(Ve(e,!e.allDay,{eventDuration:g})),children:s(`All Day`)})]}),(0,Q.jsx)(ke,{portal:!0,id:`${v}-start`,required:!0,label:s(`Starts`),value:e.start,datePickerProps:{showIcon:!0,icon:(0,Q.jsx)(Oe,{}),toggleCalendarOnIconClick:!0,dateFormat:ae,timeFormat:m.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:h,timeIntervals:_},onChange:n=>{n!==null&&t(Le(e,n,{eventDuration:g}))}}),(0,Q.jsx)(ke,{portal:!0,id:`${v}-end`,required:!0,label:s(`Ends`),value:oe,datePickerProps:{showIcon:!0,icon:(0,Q.jsx)(Oe,{}),toggleCalendarOnIconClick:!0,minDate:f(e.start),dateFormat:ae,timeFormat:m.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:h,timeIntervals:_,filterTime:t=>{if(!e.start)return!0;let n=f(e.start),r=new Date(t);return n.getTime()<r.getTime()}},onChange:n=>{n!==null&&t(Ie(e,n,{eventDuration:g}))}}),M&&(0,Q.jsxs)(`p`,{children:[(0,Q.jsxs)(`b`,{children:[s(`Repeats`),`:`]}),` `,M]}),w&&!M&&(0,Q.jsx)(Wa,{draft:e,onChange:t,formats:m,weekStartDay:h,disabled:F}),(0,Q.jsx)(Ue,{formats:m,enabled:o&&!!b&&E,schedule:{start:e.start,end:e.allDay?e.end-1:e.end,allDay:e.allDay,calendarId:b,siteId:a,...D}}),(k||A)&&(0,Q.jsx)(`hr`,{}),k&&(0,Q.jsx)(Te,{label:s(`Location`),id:`${v}-location`,required:j?.location,children:(0,Q.jsx)(`input`,{id:`${v}-location`,type:`text`,className:`text fullwidth`,disabled:F,"aria-required":j?.location||void 0,value:ee[k]??``,onChange:e=>P(k,e.target.value)})}),A&&(0,Q.jsx)(Te,{label:s(`Description`),id:`${v}-description`,required:j?.description,children:(0,Q.jsx)(`textarea`,{id:`${v}-description`,className:`text fullwidth`,rows:3,disabled:F,"aria-required":j?.description||void 0,value:ee[A]??``,onChange:e=>P(A,e.target.value)})})]}),re&&(0,Q.jsx)(`p`,{className:`error`,children:re})]}),(0,Q.jsxs)(Va,{$justifyContent:`flex-end`,$gap:8,children:[(0,Q.jsx)(Ua,{type:`button`,disabled:!b||F||!E,onClick:async()=>{let e=await ne(T,b,N);e&&(window.location.href=e)},children:s(ie?`Processing...`:`More details…`)}),(0,Q.jsxs)(Ha,{children:[(0,Q.jsx)(`button`,{type:`button`,className:V(`btn`,F&&`disabled`),disabled:F,onClick:i,children:s(`Cancel`)}),(0,Q.jsx)(`button`,{type:`button`,className:V(`btn submit`,F&&`disabled`),disabled:!e.title||!b||F||!E,onClick:()=>te(T,b,N),children:s(F&&!ie?`Creating Event...`:`Create Event`)})]})]})]})},Ka=n.div`
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
`,qa=n.div`
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
`,Ja=n.button`
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
`,Ya={move:`You are moving an event.`,resize:`You are changing an event’s length.`,delete:`You are deleting an event.`},Xa={move:`Which occurrences do you want to move?`,resize:`Which occurrences do you want to change?`,delete:`Which occurrences do you want to delete?`},Za={occurrence:`Only this occurrence`,following:`This and following`,series:`All occurrences`},Qa=({action:e,onSelect:t,onCancel:n})=>{let{hidePopover:r}=u(),[i,a]=(0,W.useState)(null),o=(0,W.useRef)(!0),c=(0,W.useRef)(!1),l=i!==null;(0,W.useEffect)(()=>()=>{o.current=!1,c.current||n?.()},[]);let d=(0,W.useCallback)(()=>{l||r()},[r,l]);Fi(`keydown`,e=>{e.key===`Escape`&&d()});let f=async e=>{if(!l){c.current=!0,a(e);try{await t(e)&&r()}finally{o.current&&a(null)}}};return(0,Q.jsxs)(Ka,{children:[(0,Q.jsx)(`h3`,{children:s(Ya[e])}),(0,Q.jsx)(`p`,{children:s(Xa[e])}),(0,Q.jsx)(`hr`,{}),(0,Q.jsxs)(it,{$direction:`column`,$alignItems:`center`,$gap:8,children:[[`occurrence`,`following`,`series`].map(e=>(0,Q.jsx)(`button`,{type:`button`,className:V(`btn small`,e===`occurrence`&&`submit`,l&&`disabled`),disabled:l,onClick:()=>f(e),children:s(i===e?`Processing...`:Za[e])},e)),(0,Q.jsx)(`button`,{type:`button`,className:V(`btn small`,l&&`disabled`),disabled:l,onClick:d,children:s(`Cancel`)})]})]})},$a=({actions:e,disabled:t})=>{let{eventActionIcons:n}=$(),{keepPopoverOpen:r}=u(),i=(0,W.useRef)(null),a=(0,W.useRef)({actions:e,disabled:t}),o=JSON.stringify(e.map(({label:e,destructive:t,icon:r,color:i})=>({label:e,destructive:t,icon:r?n?.[r]:void 0,color:i})));return(0,W.useEffect)(()=>{a.current={actions:e,disabled:t}},[e,t]),(0,W.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu menu--disclosure calendar-event-action-menu`,t.setAttribute(`aria-label`,s(`More actions`));let n=document.createElement(`ul`);t.append(n),JSON.parse(o).forEach((e,r)=>{e.destructive&&r>0&&(t.append(document.createElement(`hr`)),n=document.createElement(`ul`),t.append(n));let i=document.createElement(`li`),a=document.createElement(`a`);if(a.className=`menu-item`,e.icon){let t=document.createElement(`span`);t.className=e.color?`icon ${e.color}`:`icon`,t.setAttribute(`aria-hidden`,`true`),t.innerHTML=e.icon,a.append(t)}let o=document.createElement(`span`);o.className=`menu-item-label`,o.textContent=e.label,a.append(o),a.dataset.action=String(r),e.destructive&&a.classList.add(`error`),i.append(a),n.append(i)}),e.after(t);let c=new Garnish.MenuBtn(e,{onOptionSelect:e=>{a.current.disabled||(c.hideMenu(),a.current.actions[Number(e.dataset.action)]?.onSelect())}});c.menu.on(`show`,r);let l=t=>{t.key===`Escape`&&c.showingMenu&&(t.preventDefault(),t.stopPropagation(),c.hideMenu(),e.focus())};return document.addEventListener(`keydown`,l,!0),()=>{document.removeEventListener(`keydown`,l,!0),c.hideMenu(),c.destroy(),t.remove()}},[o,r]),(0,Q.jsx)(`button`,{ref:i,type:`button`,className:`btn menubtn action-btn`,disabled:t,"aria-label":s(`More actions`),title:s(`More actions`)})},eo=({fcEvent:e})=>{let{hidePopover:t,showPopover:n}=u(),{currentSiteId:r,formats:i}=$(),[a,o]=(0,W.useState)(!1),[c,l]=(0,W.useState)(!1),[f,p]=(0,W.useState)(!1),[m,h]=(0,W.useState)(!1),g=a||c||f||m;Fi(`keydown`,e=>{e.key===`Escape`&&t()});let v=e.event,{end:y,allDay:b}=v,x=v.extendedProps.calendarName,S=typeof v.extendedProps.location==`string`?v.extendedProps.location.trim():``,C=typeof v.extendedProps.description==`string`?v.extendedProps.description.trim():``,w=v.extendedProps.calendarColor??v.backgroundColor??v.borderColor??`#607d9f`,T=(0,W.useMemo)(()=>b?Ee(y,1):y,[b,y]),E=!!v.extendedProps.rrule,D=E?qe(We(v.extendedProps.rrule,v.start.getTime()/1e3)):null,O=ge(String(v.id)),k=v.allDay?`PP`:`PPp`,A=v.extendedProps.enabled===!1,j=!!v.extendedProps.cancelled,ee=!!v.extendedProps.isEdited,M=!!v.extendedProps.hasOverride,N=()=>e.view.calendar.refetchEvents(),P=()=>{O&&(t(),le({eventId:z(String(v.id)),recurrenceId:O,siteId:r,onSave:N}))},te=async()=>{if(!O||g)return;p(!0);let e=await ne({event:v,recurrenceId:O,siteId:r});if(e){window.location.href=e;return}p(!1)},re=async()=>{if(!(!O||g)){l(!0);try{await oe({event:v,recurrenceId:O,cancelled:!j,siteId:r,refetchEvents:N})&&t()}finally{l(!1)}}},F=async()=>{if(!a){o(!0);try{await B({event:v,scope:`series`,recurrenceId:O,siteId:r,refetchEvents:N})&&t()}finally{o(!1)}}},ie=()=>{n((0,Q.jsx)(Qa,{action:`delete`,onSelect:async e=>e===`occurrence`&&M&&!window.confirm(s(`This occurrence has its own changes, which are deleted with it. Delete it?`))?!1:B({event:v,scope:e,recurrenceId:O,siteId:r,refetchEvents:N})}),e.el)},ae=async()=>{if(g)return;h(!0);let e=await ce(v,r);if(e){window.location.href=e;return}h(!1)},I=[{label:s(m?`Duplicating...`:`Duplicate Event`),icon:`clone-dashed`,color:`fuchsia`,onSelect:()=>void ae()}];return E&&O&&I.push({label:s(`Edit occurrence`),icon:`pencil`,onSelect:P},{label:s(f?`Processing...`:`Edit this and following occurrences`),icon:`calendar-pen`,onSelect:()=>void te()},{label:s(j?`Restore occurrence`:`Cancel occurrence`),icon:j?`rotate-left`:`ban`,onSelect:()=>void re()}),I.push({label:s(a?`Deleting...`:`Delete`),icon:`trash`,destructive:!0,onSelect:()=>{E?ie():window.confirm(s(`Are you sure you want to delete this event?`))&&F()}}),(0,Q.jsxs)(Ka,{children:[(0,Q.jsx)(Ja,{type:`button`,className:`icon`,"data-icon":`remove`,"aria-label":s(`Close`),title:s(`Close`),disabled:g,onClick:t}),(0,Q.jsx)(`h1`,{className:V(`event-title`,j&&`is-cancelled`),children:v.title}),x&&(0,Q.jsxs)(`div`,{className:`calendar-label`,children:[(0,Q.jsx)(`span`,{className:`calendar-label-dot`,style:{backgroundColor:w},"aria-hidden":`true`}),(0,Q.jsx)(`span`,{children:x})]}),A&&(0,Q.jsx)(`div`,{className:`occurrence-status is-disabled`,children:s(`This event is disabled.`)}),(j||ee)&&(0,Q.jsx)(`div`,{className:V(`occurrence-status`,j?`is-cancelled`:`is-edited`),children:s(j?`This occurrence is cancelled.`:`This occurrence has its own changes.`)}),(0,Q.jsx)(H,{result:v.extendedProps.overlaps,formats:i}),(0,Q.jsx)(`hr`,{}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`b`,{children:[s(`Starts`),`:`]}),` `,De(d(v.start),k,{locale:_()}),(0,Q.jsx)(`br`,{}),(0,Q.jsxs)(`b`,{children:[s(`Ends`),`:`]}),` `,De(d(T),k,{locale:_()})]}),D&&(0,Q.jsxs)(`div`,{children:[(0,Q.jsxs)(`b`,{children:[s(`Repeats`),`:`]}),` `,D]}),(S||C)&&(0,Q.jsxs)(`dl`,{className:`event-details`,children:[S&&(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:s(`Location`)}),(0,Q.jsx)(`dd`,{className:`event-location`,children:S})]}),C&&(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`dt`,{children:s(`Description`)}),(0,Q.jsx)(`dd`,{className:`event-description`,children:C})]})]}),(0,Q.jsx)(`hr`,{}),(0,Q.jsxs)(qa,{children:[(0,Q.jsx)(`a`,{href:v.url,className:V(`btn submit`,g&&`disabled`),"aria-disabled":g,onClick:e=>{g&&e.preventDefault()},children:s(`Edit Event`)}),(0,Q.jsx)($a,{actions:I,disabled:g})]})]})},to=new Intl.DateTimeFormat(_().code,{weekday:`short`,timeZone:`UTC`}),no=new Intl.DateTimeFormat(_().code,{day:`numeric`,timeZone:`UTC`}),ro=new Intl.DateTimeFormat(_().code,{weekday:`long`,timeZone:`UTC`}),io=new Intl.DateTimeFormat(_().code,{month:`long`,year:`numeric`,timeZone:`UTC`}),ao={dayGridMonth:{dayHeaderFormat:{weekday:`long`}},listMonth:{displayEventEnd:!0,listDayFormat:{weekday:`long`,month:`long`,day:`numeric`},listDaySideFormat:!1}},oo={closeDelayMs:300,position:[`bottom`,`top`,`right`,`left`]},so=e=>{let t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}:00`},co=e=>!!(e.extendedProps?.rrule||e.extendedProps?.repeats),lo=({hiddenCalendarIds:e,registerApplyAiDraft:t,selectedDate:n,onDateChange:r,miniDateSelection:i,onMiniDateSelectionHandled:a})=>{let{hidePopover:o,showPopover:s}=u(),{range:c,setRange:l}=Vi(),{currentDay:d,language:f,formats:h,weekStartDay:g,overlapThresholdString:_,allDayDefault:y,eventDuration:x,timeInterval:S,canEditEvents:C,isDragAndDropEnabled:w,isQuickCreateEnabled:T,currentSiteId:E,defaultCalendarView:D,enabledCalendarViews:O}=$(),{view:k,setView:A,isReady:j,enabledViews:ee,resolveView:M}=qi(D,O),N=C&&T,P=(0,W.useRef)(null),te=(0,W.useRef)(null),[ne,re]=(0,W.useState)(null),ie=(0,W.useRef)(c),oe=e.join(`,`),I=(0,W.useRef)(null),L=(0,W.useRef)(void 0),se=(0,W.useRef)(!1),ce=(0,W.useRef)(0),[R,le]=(0,W.useState)(null),[ue,fe]=(0,W.useState)(null),[z,me]=(0,W.useState)(!1),[B,_e]=(0,W.useState)(fa),[ve,ye]=(0,W.useState)(!1);(0,W.useEffect)(()=>{j&&re(te.current?.querySelector(`.fc-header-toolbar .fc-toolbar-chunk:first-child`)??null)},[j]);let be=(0,W.useCallback)(()=>P.current?.getApi(),[P.current]),xe=(0,W.useMemo)(()=>be(),[be]),Se=(0,W.useMemo)(()=>({alignment:`center`,position:[`right`,`left`,`bottom`,`top`]}),[]),{datePickerButton:Te,dateSelector:Ee}=ea(xe,k,c);(0,W.useEffect)(()=>{if(ie.current===c)return;ie.current=c;let e=P.current?.getApi();e?.view.type===`listMonth`&&e.refetchEvents()},[c]);let De=(0,W.useMemo)(()=>new Set(e),[e]),Oe=so(S),ke=(0,W.useMemo)(()=>pe(De,E,void 0,B),[De,E,B]),Ae=(0,W.useMemo)(()=>Zi(xe,{datePickerButton:Te}),[Te,xe]),V=(0,W.useCallback)(()=>{P.current?.getApi().refetchEvents()},[]),je=ca(V),{add:Me,run:Fe,busy:H}=je,[U,Ie]=(0,W.useState)(!1),Le=(0,W.useCallback)((e,t)=>{clearTimeout(L.current),o();let n=M(t);Yi(e,n),P.current?.getApi().changeView(n,e)},[o,M]),Re=(0,W.useCallback)((e,t,n)=>{let r=P.current?.getApi(),i=r?.getEventById(e);!i||!r||H||U||z||s((0,Q.jsx)(eo,{fcEvent:{event:i,el:t,jsEvent:n.nativeEvent,view:r.view}}),t)},[s,H,U,z]),Be=(0,W.useMemo)(()=>({...ao,listMonth:{...ao.listMonth,...Bi(c)},calendarYear:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1},titleFormat:{year:`numeric`},content:e=>(0,Q.jsx)(xa,{content:e,disabled:H||U||R!==null,loading:z,error:ve,search:B,onDateSelect:e=>Le(e,`timeGridDay`),onMonthSelect:e=>Le(e,`dayGridMonth`),onEventSelect:Re})}}),[c,H,U,R,z,ve,B,Le,Re]),Ve=(0,W.useCallback)(()=>{le(null),fe(null)},[]);(0,W.useEffect)(()=>{if(!j)return;let e=P.current?.getApi();if(e){if(I.current===null){I.current=oe;return}I.current!==oe&&(I.current=oe,e.refetchEvents())}},[oe,j]);let Ue=(0,W.useCallback)(()=>{Ve(),o()},[Ve,o]),We=(0,W.useCallback)(e=>{let t=P.current?.getApi();t&&Number.isFinite(e.start)&&t.gotoDate(new Date(e.start*1e3)),le(e);let n=te.current?.querySelector(`.fc-toolbar-title`)??te.current;fe(n??null)},[]);(0,W.useEffect)(()=>{t(We)},[We,t]);let Ge=(0,W.useCallback)(e=>{if(e===B)return;clearTimeout(L.current),Ue(),_e(e);let t=new URL(window.location.href);e?t.searchParams.set(`search`,e):t.searchParams.delete(`search`),history.replaceState(null,``,t)},[B,Ue]);(0,W.useEffect)(()=>{let e=P.current?.getApi();if(!e)return;let t=e.getEvents().find(e=>ze(e));if(!R){t?.remove();return}if(t){He(t,R);return}e.addEvent(Ke(R))},[R]),(0,W.useEffect)(()=>{if(!R){o();return}if(!ue){o();return}s((0,Q.jsx)(Ga,{draft:R,onChange:le,refetchEvents:V,onConfirm:Ve,onCancel:Ue}),ue,Se)},[Ue,Ve,R,ue,o,Se,V,s]);let qe=(0,W.useCallback)(e=>{clearTimeout(L.current),o(),e.view.calendar.getEvents().find(e=>ze(e))?.remove(),fe(null),le(Pe(e,{allDayDefault:y,eventDuration:x})),e.view.calendar.unselect()},[y,x,o]),Je=(0,W.useCallback)(e=>{e.jsEvent.detail<2||(clearTimeout(L.current),o(),xe.getEvents().find(e=>ze(e))?.remove(),fe(null),le(Pe({start:e.date,end:e.allDay?Ne(e.date,1):e.date,allDay:e.allDay},{allDayDefault:y,eventDuration:x})))},[xe,y,x,o]);(0,W.useEffect)(()=>()=>clearTimeout(L.current),[]),(0,W.useEffect)(()=>{let e=P.current?.getApi();if(!e||!i)return;let t=M(e.view.type===`listMonth`?`listMonth`:`timeGridDay`);e.changeView(t,i),Yi(i,t),a()},[i,a,M]),(0,W.useEffect)(()=>{let e=P.current?.getApi();!e||b(e.getDate())===b(n)||e.gotoDate(n)},[n]);let Ye=(0,W.useCallback)(()=>clearTimeout(L.current),[]),Xe=(0,W.useCallback)(()=>{se.current=!0,clearTimeout(L.current),o()},[o]),Ze=(0,W.useCallback)(()=>{se.current=!1},[]),Qe=(0,W.useCallback)(e=>{ze(e.event)&&fe(e.el)},[]),$e=(0,W.useCallback)(e=>{ze(e.event)&&fe(t=>t===e.el?null:t)},[]),tt=(0,W.useCallback)((e,t)=>{if(ze(t.event)||H){t.revert();return}let n=async n=>{let r={event:t.event,recurrenceId:ge(String(t.event.id)),scope:n,siteId:E,refetchEvents:V,revert:t.revert,onHistoryEntry:Me},i=!1,a=await Fe(()=>(i=!0,e===`move`?F(r):ae({...r,oldEvent:t.oldEvent})));return i||t.revert(),a};if(!co(t.event)){n();return}Ie(!0),s((0,Q.jsx)(Qa,{action:e,onSelect:async e=>{let t=await n(e);return Ie(!1),t||o(),t},onCancel:()=>{t.revert(),Ie(!1)}},++ce.current),t.jsEvent)},[E,o,V,s,Me,Fe,H]),nt=(0,W.useCallback)(e=>{let t=p(e),n=M(`timeGridDay`);Yi(t,n),P.current?.getApi().changeView(n,t)},[M]),rt=(0,W.useCallback)(e=>e.view.type===`timeGridWeek`&&b(e.date)===b(d)?[`fc-title-today`]:[],[d]),it=(0,W.useCallback)(e=>{if(e.view.type===`listMonth`){let t=e;return(0,Q.jsxs)(`a`,{...t.navLinkAttrs,href:Craft.getCpUrl(`calendar/${m(e.date)}/${Ki(M(`timeGridDay`))}`),id:t.textId,className:`calendar-agenda-day`,"aria-label":e.text,children:[(0,Q.jsx)(`span`,{className:`calendar-agenda-day-number`,"aria-hidden":`true`,children:no.format(e.date)}),(0,Q.jsxs)(`span`,{className:`calendar-agenda-day-label`,"aria-hidden":`true`,children:[(0,Q.jsx)(`span`,{children:ro.format(e.date)}),(0,Q.jsx)(`span`,{className:`calendar-agenda-day-month`,children:io.format(e.date)})]})]})}if(e.view.type!==`timeGridWeek`)return e.text;let t=to.format(e.date),n=no.format(e.date);return(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`span`,{className:`fc-day-header-label`,children:t}),(0,Q.jsx)(`span`,{className:`fc-day-header-date`,children:n})]})},[M]);if(!j)return null;let at=document.querySelector(`[data-calendar-history-root]`),ot=C&&w?(0,Q.jsx)(da,{canUndo:je.canUndo,canRedo:je.canRedo,disabled:H||z||U||R!==null,onReplay:e=>{o(),je.replay(e)}}):null,st=document.querySelector(`[data-calendar-search-root]`),ct=(0,Q.jsx)(pa,{initialSearch:B,onSearchChange:Ge});return(0,Q.jsxs)(et,{ref:te,className:z?`is-fetching-events`:void 0,children:[st?(0,vi.createPortal)(ct,st):ct,at?(0,vi.createPortal)(ot,at):ot,k===`listMonth`&&ne&&(0,vi.createPortal)((0,Q.jsx)(Hi,{range:c,disabled:H||U||R!==null,onChange:e=>{clearTimeout(L.current),o(),l(e)}}),ne),(0,Q.jsx)(he,{...v(),ref:P,themeSystem:`bootstrap5`,plugins:[de,we,Ni,Ce],customButtons:Ae,initialView:k,initialDate:d,height:k===`listMonth`||k===`calendarYear`?`auto`:void 0,locale:f,views:Be,timeZone:`UTC`,firstDay:g,nextDayThreshold:_,fixedWeekCount:!0,dayMaxEventRows:!0,editable:C&&w&&!H&&!U&&!z,selectable:N,selectMirror:!1,selectMinDistance:5,slotDuration:Oe,snapDuration:Oe,navLinks:!0,navLinkDayClick:nt,select:N?qe:void 0,dateClick:N?Je:void 0,dayHeaderClassNames:rt,dayHeaderContent:it,events:ke,eventClassNames:ia,eventContent:oa,progressiveEventRendering:!0,eventTimeFormat:h.time.short.js,loading:e=>{e&&ye(!1),me(e)},eventSourceFailure:()=>ye(!0),noEventsContent:()=>(0,Q.jsx)(`span`,{role:`status`,children:Craft.t(`calendar`,ve?`Couldn’t load events. Use Refresh to try again.`:z?`Loading events…`:B?`No matching events in this date range.`:`No events in this date range.`)}),eventDidMount:Qe,eventWillUnmount:$e,eventMouseEnter:e=>{e.view.type!==`dayGridMonth`&&e.view.type!==`listMonth`||R!==null||se.current||H||z||U||aa(e.event,e.jsEvent.target)!==`ignore`&&(clearTimeout(L.current),L.current=setTimeout(()=>s((0,Q.jsx)(eo,{fcEvent:e}),e.el,oo),300),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventMouseLeave:Ye,eventDragStart:Xe,eventDragStop:Ze,eventResizeStart:Xe,eventResizeStop:Ze,eventClick:e=>{if(R!==null||H||z||U){e.jsEvent.preventDefault();return}aa(e.event,e.jsEvent.target)===`open`&&(s((0,Q.jsx)(eo,{fcEvent:e}),e.el),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventDrop:e=>tt(`move`,e),eventResize:e=>tt(`resize`,e),headerToolbar:{start:`title`,center:ee.join(`,`),end:Xi},buttonText:{dayGridMonth:Craft.t(`calendar`,`Month`),timeGridWeek:Craft.t(`calendar`,`Week`),timeGridDay:Craft.t(`calendar`,`Day`),listMonth:Craft.t(`calendar`,`Agenda`),calendarYear:Craft.t(`calendar`,`Year`),today:Craft.t(`calendar`,`Today`)},datesSet:({view:e})=>{r(e.calendar.getDate()),setTimeout(()=>{A(e.type),Yi(e.calendar.getDate(),e.type)},50)}}),Ee]})},uo=(0,W.createContext)(null),fo=()=>(0,W.useContext)(uo),po=()=>{window.location.href=Craft.getCpUrl(`calendar/settings/solspaceai`)},mo=({buttonRef:e,isSolspaceAiConnected:t,canEditEvents:n})=>{let{showPopover:r,hidePopover:i}=u(),a=fo();return n?(0,Q.jsx)(at,{ref:e,connected:t,onClick:()=>{if(!t||!a){po();return}let n=e.current;n&&r((0,Q.jsx)(Je,{onCancel:i,onApplyDraft:e=>{a.applyAiDraft(e),i()}}),n,{alignment:`end`,position:[`bottom`,`top`,`right`,`left`]})}}):null},ho=n.div`
  color: var(--gray-600);
`,go=n.div`
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
`,_o=n.button`
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
`,vo=n.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 7px;

  span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
`,yo=n.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 4px;
`,bo=n.button`
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
`,xo=(e,t,n)=>new Date(Date.UTC(e,t,n)),So=e=>xo(e.getUTCFullYear(),e.getUTCMonth(),1),Co=(e,t)=>xo(e.getUTCFullYear(),e.getUTCMonth()+t,1),wo=({selectedDate:e,onDateSelect:t})=>{let{language:n,weekStartDay:r}=$(),[i,a]=(0,W.useState)(()=>So(e));(0,W.useEffect)(()=>{a(So(e))},[e]);let o=(0,W.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`long`,year:`numeric`,timeZone:`UTC`}),[n]),s=(0,W.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`narrow`,timeZone:`UTC`}),[n]),c=(0,W.useMemo)(()=>Array.from({length:7},(e,t)=>s.format(xo(2023,0,1+r+t))),[r,s]),l=(0,W.useMemo)(()=>{let e=i.getUTCFullYear(),t=i.getUTCMonth(),n=xo(e,t,1),a=xo(e,t+1,0),o=(n.getUTCDay()-r+7)%7,s=((r+6)%7-a.getUTCDay()+7)%7,c=o+a.getUTCDate()+s;return Array.from({length:c},(n,r)=>xo(e,t,1-o+r))},[i,r]),u=b(new Date);return(0,Q.jsxs)(ho,{children:[(0,Q.jsxs)(go,{children:[(0,Q.jsx)(_o,{"aria-label":Craft.t(`calendar`,`Previous month`),type:`button`,onClick:()=>a(e=>Co(e,-1))}),(0,Q.jsx)(`span`,{children:o.format(i)}),(0,Q.jsx)(_o,{"aria-label":Craft.t(`calendar`,`Next month`),type:`button`,$next:!0,onClick:()=>a(e=>Co(e,1))})]}),(0,Q.jsx)(vo,{children:c.map((e,t)=>(0,Q.jsx)(`span`,{children:e},`${e}-${t}`))}),(0,Q.jsx)(yo,{children:l.map(e=>{let r=b(e);return(0,Q.jsx)(bo,{"aria-label":e.toLocaleDateString(n,{timeZone:`UTC`}),type:`button`,$isCurrentMonth:e.getUTCMonth()===i.getUTCMonth(),$isToday:r===u,onClick:()=>t(e),children:e.getUTCDate()},r)})})]})},To=i`
  100% {
    transform: translateX(100%);
  }
`,Eo=n.div`
  position: relative;
  overflow: hidden;

  background: ${tt.gray200};

  &::after {
    content: "";

    position: absolute;
    inset: 0;

    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgb(from ${tt.gray050} r g b / 70%),
      transparent
    );

    animation: ${To} 1.4s ${rt.easeInOut} infinite;
  }
`,Do=({width:e=`100%`,height:t=16,borderRadius:n=4,className:r})=>(0,Q.jsx)(Eo,{"aria-hidden":`true`,className:r,style:{borderRadius:n,height:t,width:e}}),Oo=async e=>{let t=await Qe(_i(`/api/calendars`),{signal:e});if(!t.ok)throw Error(`Failed to fetch calendars`);return t.json()},ko=()=>{let[e,t]=(0,W.useState)([]),[n,r]=(0,W.useState)(null),[i,a]=(0,W.useState)(!1),o=(0,W.useCallback)(async e=>{a(!0),r(null);try{let n=await Oo(e);t(n)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;r(e instanceof Error?e:Error(`Failed to fetch calendars`))}finally{a(!1)}},[]);return(0,W.useEffect)(()=>{let e=new AbortController;return o(e.signal),()=>{e.abort()}},[o]),{data:e,error:n,isPending:i,refetch:o}},Ao=n.div`
  padding: 0;
`,jo=n.div`
  display: flex;
  flex-direction: column;
`,Mo=n.hr`
  width: 100%;
  margin: 16px 0;
  border: 0;
  border-top: 1px solid var(--gray-200);
`,No=n.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0;
  padding: 0;

  list-style: none;
`,Po=n.li`
  margin: 0;
`,Fo=n.label`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0;

  border-radius: 4px;

  color: ${tt.gray800};
  cursor: pointer;
`,Io=n.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);

  &:focus-visible + span {
    border: 2px solid ${tt.black};
  }

  &:checked + span {
    border: 1px solid var(--calendar-color);
  }

  &:checked + span:after {
    opacity: 1;
  }
`,Lo=n.span`
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
`,Ro=n.span`
  font-size: 13px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,zo=n.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Bo=n.div`
  font-size: 13px;
  color: ${tt.error};
`,Vo=({hiddenCalendarIds:e,onToggleCalendar:t})=>{let{data:n,error:r,isPending:i}=ko(),a=new Set(e),o=i&&n.length===0;return(0,Q.jsxs)(Ao,{children:[o&&(0,Q.jsxs)(zo,{children:[(0,Q.jsx)(Do,{height:16}),(0,Q.jsx)(Do,{height:16}),(0,Q.jsx)(Do,{height:16})]}),!o&&r&&(0,Q.jsx)(Bo,{children:r.message}),!o&&!r&&(0,Q.jsx)(No,{children:n.map(e=>(0,Q.jsx)(Po,{children:(0,Q.jsxs)(Fo,{style:{"--calendar-color":e.color.base,"--calendar-color-contrast":e.color.contrast},children:[(0,Q.jsx)(Io,{type:`checkbox`,checked:!a.has(e.id),onChange:()=>t(e.id)}),(0,Q.jsx)(Lo,{}),(0,Q.jsx)(Ro,{children:e.title})]})},e.id))})]})},Ho=()=>{let e=document.querySelector(`[data-sidebar-root]`),t=document.querySelector(`[data-ai-create-root]`),{isSolspaceAiConnected:n,canEditEvents:r,currentDay:i}=$(),{hiddenCalendarIds:a,toggleCalendarVisibility:o}=Ji(),s=(0,W.useRef)(null),[c,u]=(0,W.useState)(null),[d,f]=(0,W.useState)(()=>new Date(i)),[p,m]=(0,W.useState)(null),h=(0,W.useCallback)(e=>{u(()=>e)},[]),g=(0,W.useCallback)(e=>{c?.(e)},[c]);return(0,Q.jsx)(l,{children:(0,Q.jsxs)(uo.Provider,{value:{applyAiDraft:g},children:[(0,Q.jsx)(lo,{hiddenCalendarIds:a,registerApplyAiDraft:h,selectedDate:d,onDateChange:f,miniDateSelection:p,onMiniDateSelectionHandled:()=>m(null)}),t&&(0,vi.createPortal)((0,Q.jsx)(mo,{buttonRef:s,isSolspaceAiConnected:n,canEditEvents:r}),t),e&&(0,vi.createPortal)((0,Q.jsxs)(jo,{children:[(0,Q.jsx)(Vo,{hiddenCalendarIds:a,onToggleCalendar:o}),(0,Q.jsx)(Mo,{}),(0,Q.jsx)(wo,{selectedDate:d,onDateSelect:e=>{f(e),m(e)}})]}),e)]})})},Uo=document.getElementById(`calendar-overview`),Wo=Uo.querySelector(`[data-root]`),Go=Uo.querySelector(`[data-config]`),Ko=JSON.parse(Go?.textContent||`{}`);yi.createRoot(Wo).render((0,Q.jsx)($i,{config:Ko,children:(0,Q.jsx)(Kr,{basename:_i(`/`,!1),children:(0,Q.jsx)(ar,{children:(0,Q.jsxs)(rr,{path:`/`,element:(0,Q.jsx)(fi,{}),children:[(0,Q.jsx)(rr,{index:!0,element:(0,Q.jsx)(Ho,{})}),(0,Q.jsx)(rr,{path:`overview`,element:(0,Q.jsx)(Ho,{})}),(0,Q.jsx)(rr,{path:`:year/:month/:day/:view?`,element:(0,Q.jsx)(Ho,{})})]})})})}));