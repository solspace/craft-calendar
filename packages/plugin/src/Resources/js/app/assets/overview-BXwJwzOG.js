import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,b as c,i as l,j as u,k as d,n as f,r as p,t as m,w as h,y as g}from"./localization-Dt_HqhpZ.js";import{T as _,i as v,s as y,w as b}from"./calendar-preview.operations-DLg5NIyx.js";import{Ct as x,Dt as S,Et as C,Gt as w,Ht as T,J as E,Lt as D,Nt as O,P as k,Pt as A,Qt as j,R as ee,Vt as M,W as N,Xt as te,_ as P,a as F,b as ne,c as re,cn as I,d as ie,f as ae,gn as L,gt as oe,h as se,i as ce,k as le,l as ue,ln as de,m as fe,mn as pe,n as me,o as he,ot as ge,p as _e,r as ve,s as ye,st as R,t as be,u as xe,un as Se,v as z,x as Ce}from"./calendar.events-VqdZ-FD_.js";import{t as we}from"./interaction-CtZpX2nG.js";import{t as Te}from"./timegrid-CJkql3oa.js";import{a as Ee,b as De,c as B,f as Oe,n as ke,o as Ae,p as je,r as Me,s as Ne,t as Pe}from"./components-CefPxcP5.js";import{n as Fe,r as Ie}from"./calendar.styles-Bxwye59v.js";import{n as Le,r as Re,t as ze}from"./variables-CkfOKRDd.js";var Be=`modulepreload`,Ve=function(e,t){return new URL(e,t).href},He={},Ue=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=Ve(t,n),t=s(t),t in He)return;He[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Be,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},V=i(e(),1),We=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,Ge=/^[\\/]{2}/;function Ke(e,t){return t+e.replace(/\\/g,`/`)}var qe=`popstate`;function Je(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function Ye(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return Qe(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:$e(t)}return tt(t,n,null,e)}function H(e,t){if(e===!1||e==null)throw Error(t)}function U(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function Xe(){return Math.random().toString(36).substring(2,10)}function Ze(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function Qe(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?et(t):t,state:n,key:t&&t.key||r||Xe(),mask:i}}function $e({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function et(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function tt(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=Je(e)?e:Qe(h.location,e,t);n&&n(r,e),l=u()+1;let d=Ze(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=Je(e)?e:Qe(h.location,e,t);n&&n(r,e),l=u();let i=Ze(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return nt(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(qe,d),c=e,()=>{i.removeEventListener(qe,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function nt(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),H(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:$e(t);return i=i.replace(/ $/,`%20`),!n&&Ge.test(i)&&(i=r+i),new URL(i,r)}function rt(e,t,n=`/`){return it(e,t,n,!1)}function it(e,t,n,r,i){let a=W((typeof t==`string`?et(t):t).pathname||`/`,n);if(a==null)return null;let o=i??ot(e),s=null,c=Ct(a);for(let e=0;s==null&&e<o.length;++e)s=yt(o[e],c,r);return s}function at(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function ot(e){let t=st(e);return lt(t),t}function st(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;H(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=G([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(H(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),st(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:_t(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=St(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of ct(e.path))a(e,t,!0,n)}),t}function ct(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=ct(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function lt(e){e.sort((e,t)=>e.score===t.score?vt(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ut=/^:[\w-]+$/,dt=3,ft=2,pt=1,mt=10,ht=-2,gt=e=>e===`*`;function _t(e,t){let n=e.split(`/`),r=n.length;return n.some(gt)&&(r+=ht),t&&(r+=ft),n.filter(e=>!gt(e)).reduce((e,t)=>e+(ut.test(t)?dt:t===``?pt:mt),r)}function vt(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function yt(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?xt(u,l,s.matcher,s.compiledParams):bt(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=bt({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:G([a,d.pathname]),pathnameBase:Mt(G([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=G([a,d.pathnameBase]))}return o}function bt(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=St(e.path,e.caseSensitive,e.end);return xt(e,t,n,r)}function xt(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function St(e,t=!1,n=!0){U(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Ct(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return U(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function W(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function wt(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?et(e):e,a;return n?(n=At(n),a=n.startsWith(`/`)?Tt(n.substring(1),`/`):Tt(n,t)):a=t,{pathname:a,search:Nt(r),hash:Pt(i)}}function Tt(e,t){let n=jt(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Et(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Dt(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ot(e){let t=Dt(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function kt(e,t,n,r=!1){let i;typeof e==`string`?i=et(e):(i={...e},H(!i.pathname||!i.pathname.includes(`?`),Et(`?`,`pathname`,`search`,i)),H(!i.pathname||!i.pathname.includes(`#`),Et(`#`,`pathname`,`hash`,i)),H(!i.search||!i.search.includes(`#`),Et(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=wt(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var At=e=>e.replace(/[\\/]{2,}/g,`/`),G=e=>At(e.join(`/`)),jt=e=>e.replace(/\/+$/,``),Mt=e=>jt(e).replace(/^\/*/,`/`),Nt=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Pt=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Ft=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function It(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Lt(e){return G(e.map(e=>e.route.path).filter(Boolean))||`/`}var Rt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function zt(e,t){let n=e;if(typeof n!=`string`||!We.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Rt)try{let e=new URL(window.location.href),r=Ge.test(n)?new URL(Ke(n,e.protocol)):new URL(n),a=W(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{U(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Bt=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Bt);var Vt=[`GET`,...Bt];new Set(Vt);var Ht=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Ut(e){try{return Ht.includes(new URL(e).protocol)}catch{return!1}}var Wt=V.createContext(null);Wt.displayName=`DataRouter`;var Gt=V.createContext(null);Gt.displayName=`DataRouterState`;var Kt=V.createContext(!1);function qt(){return V.useContext(Kt)}var Jt=V.createContext({isTransitioning:!1});Jt.displayName=`ViewTransition`;var Yt=V.createContext(new Map);Yt.displayName=`Fetchers`;var Xt=V.createContext(null);Xt.displayName=`Await`;var K=V.createContext(null);K.displayName=`Navigation`;var Zt=V.createContext(null);Zt.displayName=`Location`;var q=V.createContext({outlet:null,matches:[],isDataRoute:!1});q.displayName=`Route`;var Qt=V.createContext(null);Qt.displayName=`RouteError`;var $t=`REACT_ROUTER_ERROR`,en=`REDIRECT`,tn=`ROUTE_ERROR_RESPONSE`;function nn(e){if(e.startsWith(`${$t}:${en}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function rn(e){if(e.startsWith(`${$t}:${tn}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Ft(t.status,t.statusText,t.data)}catch{}}function an(e,{relative:t}={}){H(on(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=V.useContext(K),{hash:i,pathname:a,search:o}=pn(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:G([n,a])),r.createHref({pathname:s,search:o,hash:i})}function on(){return V.useContext(Zt)!=null}function J(){return H(on(),`useLocation() may be used only in the context of a <Router> component.`),V.useContext(Zt).location}var sn=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function cn(e){V.useContext(K).static||V.useLayoutEffect(e)}function ln(){let{isDataRoute:e}=V.useContext(q);return e?Mn():un()}function un(){H(on(),`useNavigate() may be used only in the context of a <Router> component.`);let e=V.useContext(Wt),{basename:t,navigator:n}=V.useContext(K),{matches:r}=V.useContext(q),{pathname:i}=J(),a=JSON.stringify(Ot(r)),o=V.useRef(!1);return cn(()=>{o.current=!0}),V.useCallback((r,s={})=>{if(U(o.current,sn),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=kt(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:G([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var dn=V.createContext(null);function fn(e){let t=V.useContext(q).outlet;return V.useMemo(()=>t&&V.createElement(dn.Provider,{value:e},t),[t,e])}function pn(e,{relative:t}={}){let{matches:n}=V.useContext(q),{pathname:r}=J(),i=JSON.stringify(Ot(n));return V.useMemo(()=>kt(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function mn(e,t){return hn(e,t)}function hn(e,t,n){H(on(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=V.useContext(K),{matches:i}=V.useContext(q),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Pn(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=J(),d;if(t){let e=typeof t==`string`?et(t):t;H(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):rt(e,{pathname:p});U(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),U(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Sn(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:G([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:G([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?V.createElement(Zt.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function gn(){let e=jn(),t=It(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=V.createElement(V.Fragment,null,V.createElement(`p`,null,`💿 Hey developer 👋`),V.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,V.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,V.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),V.createElement(V.Fragment,null,V.createElement(`h2`,null,`Unexpected Application Error!`),V.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?V.createElement(`pre`,{style:i},n):null,o)}var _n=V.createElement(gn,null),vn=class extends V.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=rn(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:V.createElement(q.Provider,{value:this.props.routeContext},V.createElement(Qt.Provider,{value:e,children:this.props.component}));return this.context?V.createElement(bn,{error:e},t):t}};vn.contextType=Kt;var yn=new WeakMap;function bn({children:e,error:t}){let{basename:n}=V.useContext(K);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=nn(t.digest);if(e){let r=yn.get(t);if(r)throw r;let i=zt(e.location,n),a=i.absoluteURL||i.to;if(Ut(a))throw Error(`Invalid redirect location`);if(Rt&&!yn.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw yn.set(t,n),n}return V.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function xn({routeContext:e,match:t,children:n}){let r=V.useContext(Wt);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),V.createElement(q.Provider,{value:e},n)}function Sn(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);H(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Lt(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||_n,o&&(s<0&&c===0?(Pn(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?V.createElement(n.route.Component,null):n.route.element?n.route.element:e,V.createElement(xn,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?V.createElement(vn,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Cn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function wn(e){let t=V.useContext(Wt);return H(t,Cn(e)),t}function Tn(e){let t=V.useContext(Gt);return H(t,Cn(e)),t}function En(e){let t=V.useContext(q);return H(t,Cn(e)),t}function Dn(e){let t=En(e),n=t.matches[t.matches.length-1];return H(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function On(){return Dn(`useRouteId`)}function kn(){let e=Tn(`useNavigation`);return V.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function An(){let{matches:e,loaderData:t}=Tn(`useMatches`);return V.useMemo(()=>e.map(e=>at(e,t)),[e,t])}function jn(){let e=V.useContext(Qt),t=Tn(`useRouteError`),n=Dn(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Mn(){let{router:e}=wn(`useNavigate`),t=Dn(`useNavigate`),n=V.useRef(!1);return cn(()=>{n.current=!0}),V.useCallback(async(r,i={})=>{U(n.current,sn),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Nn={};function Pn(e,t,n){!t&&!Nn[e]&&(Nn[e]=!0,U(!1,n))}V.memo(Fn);function Fn({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return hn(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function In(e){return fn(e.context)}function Ln(e){H(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Rn({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){H(!on(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=V.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=et(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=V.useMemo(()=>{let e=W(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return U(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:V.createElement(K.Provider,{value:c},V.createElement(Zt.Provider,{children:t,value:h}))}function zn({children:e,location:t}){return mn(Bn(e),t)}V.Component;function Bn(e,t=[]){let n=[];return V.Children.forEach(e,(e,r)=>{if(!V.isValidElement(e))return;let i=[...t,r];if(e.type===V.Fragment){n.push.apply(n,Bn(e.props.children,i));return}H(e.type===Ln,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),H(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Bn(e.props.children,i)),n.push(a)}),n}var Vn=`get`,Hn=`application/x-www-form-urlencoded`;function Un(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Wn(e){return Un(e)&&e.tagName.toLowerCase()===`button`}function Gn(e){return Un(e)&&e.tagName.toLowerCase()===`form`}function Kn(e){return Un(e)&&e.tagName.toLowerCase()===`input`}function qn(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Jn(e,t){return e.button===0&&(!t||t===`_self`)&&!qn(e)}var Yn=null;function Xn(){if(Yn===null)try{new FormData(document.createElement(`form`),0),Yn=!1}catch{Yn=!0}return Yn}var Zn=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Qn(e){return e!=null&&!Zn.has(e)?(U(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Hn}"`),null):e}function $n(e,t){let n,r,i,a,o;if(Gn(e)){let o=e.getAttribute(`action`);r=o?W(o,t):null,n=e.getAttribute(`method`)||Vn,i=Qn(e.getAttribute(`enctype`))||Hn,a=new FormData(e)}else if(Wn(e)||Kn(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?W(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Vn,i=Qn(e.getAttribute(`formenctype`))||Qn(o.getAttribute(`enctype`))||Hn,a=new FormData(o,e),!Xn()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Un(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Vn,r=null,i=Hn,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var er={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},tr=/[&><\u2028\u2029]/g;function nr(e){return e.replace(tr,e=>er[e])}function rr(e,t){if(e===!1||e==null)throw Error(t)}function ir(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&W(i.pathname,t)===`/`?i.pathname=`${jt(t)}/_root.${r}`:i.pathname=`${jt(i.pathname)}.${r}`,i}async function ar(e,t){if(e.id in t)return t[e.id];try{let n=await Ue(()=>import(e.module),[],import.meta.url);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function or(e){return e!=null&&typeof e.page==`string`}function sr(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function cr(e,t,n){return pr((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await ar(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(sr).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function lr(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function ur(e,t,{includeHydrateFallback:n}={}){return dr(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function dr(e){return[...new Set(e)]}function fr(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function pr(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!or(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(fr(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function mr(){let e=V.useContext(Wt);return rr(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function hr(){let e=V.useContext(Gt);return rr(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var gr=V.createContext(void 0);gr.displayName=`FrameworkContext`;function _r(){let e=V.useContext(gr);return rr(e,`You must render this element inside a <HydratedRouter> element`),e}function vr(e,t){let n=V.useContext(gr),[r,i]=V.useState(!1),[a,o]=V.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=V.useRef(null);V.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),V.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:yr(s,p),onBlur:yr(c,m),onMouseEnter:yr(l,p),onMouseLeave:yr(u,m),onTouchStart:yr(d,p)}]:[a,f,{}]:[!1,f,{}]}function yr(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function br({page:e,...t}){let n=qt(),{nonce:r}=_r(),{router:i}=mr(),a=V.useMemo(()=>rt(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?V.createElement(Sr,{page:e,matches:a,...t}):V.createElement(Cr,{page:e,matches:a,...t})):null}function xr(e){let{manifest:t,routeModules:n}=_r(),[r,i]=V.useState([]);return V.useEffect(()=>{let r=!1;return cr(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Sr({page:e,matches:t,...n}){let r=J(),{future:i}=_r(),{basename:a}=mr(),o=V.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=ir(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return V.createElement(V.Fragment,null,o.map(e=>V.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function Cr({page:e,matches:t,...n}){let r=J(),{future:i,manifest:a,routeModules:o}=_r(),{basename:s}=mr(),{loaderData:c,matches:l}=hr(),u=V.useMemo(()=>lr(e,t,l,a,r,`data`),[e,t,l,a,r]),d=V.useMemo(()=>lr(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=V.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=ir(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=V.useMemo(()=>ur(d,a),[d,a]),m=xr(d);return V.createElement(V.Fragment,null,f.map(e=>V.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>V.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>V.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function wr(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}V.Component;var Tr=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Tr&&(window.__reactRouterVersion=`7.18.1`)}catch{}function Er({basename:e,children:t,useTransitions:n,window:r}){let i=V.useRef();i.current??(i.current=Ye({window:r,v5Compat:!0}));let a=i.current,[o,s]=V.useState({action:a.action,location:a.location}),c=V.useCallback(e=>{n===!1?s(e):V.startTransition(()=>s(e))},[n]);return V.useLayoutEffect(()=>a.listen(c),[a,c]),V.createElement(Rn,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function Dr({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=V.useState({action:n.action,location:n.location}),o=V.useCallback(e=>{r===!1?a(e):V.startTransition(()=>a(e))},[r]);return V.useLayoutEffect(()=>n.listen(o),[n,o]),V.createElement(Rn,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}Dr.displayName=`unstable_HistoryRouter`;var Or=V.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=V.useContext(K),v=typeof l==`string`&&We.test(l),y=zt(l,h);l=y.to;let b=an(l,{relative:r}),x=J(),S=null;if(o){let e=kt(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:G([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=vr(n,p),E=Fr(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let O=!(y.isExternal||i),k=V.createElement(`a`,{...p,...T,href:(O?S:void 0)||y.absoluteURL||b,onClick:O?D:e,ref:wr(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?V.createElement(V.Fragment,null,k,V.createElement(br,{page:b})):k});Or.displayName=`Link`;var kr=V.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=pn(a,{relative:c.relative}),d=J(),f=V.useContext(Gt),{navigator:p,basename:m}=V.useContext(K),h=f!=null&&Gr(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=W(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return V.createElement(Or,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});kr.displayName=`NavLink`;var Ar=V.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Vn,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=V.useContext(K),g=Rr(),_=zr(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&We.test(s);return V.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?V.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});Ar.displayName=`Form`;function jr({getKey:e,storageKey:t,...n}){let r=V.useContext(gr),{basename:i}=V.useContext(K),a=J(),o=An();Ur({getKey:e,storageKey:t});let s=V.useMemo(()=>{if(!r||!e)return null;let t=Hr(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),V.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${nr(JSON.stringify(t||Br))}, ${nr(JSON.stringify(s))})`}})}jr.displayName=`ScrollRestoration`;function Mr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Nr(e){let t=V.useContext(Wt);return H(t,Mr(e)),t}function Pr(e){let t=V.useContext(Gt);return H(t,Mr(e)),t}function Fr(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=ln(),d=J(),f=pn(e,{relative:o});return V.useCallback(p=>{if(Jn(p,t)){p.preventDefault();let t=n===void 0?$e(d)===$e(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?V.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Ir=0,Lr=()=>`__${String(++Ir)}__`;function Rr(){let{router:e}=Nr(`useSubmit`),{basename:t}=V.useContext(K),n=On(),r=e.fetch,i=e.navigate;return V.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=$n(e,t);if(a.navigate===!1){let e=a.fetcherKey||Lr();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function zr(e,{relative:t}={}){let{basename:n}=V.useContext(K),r=V.useContext(q);H(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...pn(e||`.`,{relative:t})},o=J();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:G([n,a.pathname])),$e(a)}var Br=`react-router-scroll-positions`,Vr={};function Hr(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:W(e.pathname,n)||e.pathname},t)),i??(i=e.key),i}function Ur({getKey:e,storageKey:t}={}){let{router:n}=Nr(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Pr(`useScrollRestoration`),{basename:a}=V.useContext(K),o=J(),s=An(),c=kn();V.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Wr(V.useCallback(()=>{if(c.state===`idle`){let t=Hr(o,s,a,e);Vr[t]=window.scrollY}try{sessionStorage.setItem(t||Br,JSON.stringify(Vr))}catch(e){U(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(V.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Br);e&&(Vr=JSON.parse(e))}catch{}},[t]),V.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Vr,()=>window.scrollY,e?(t,n)=>Hr(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),V.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{U(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Wr(e,t){let{capture:n}=t||{};V.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Gr(e,{relative:t}={}){let n=V.useContext(Jt);H(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Nr(`useViewTransitionState`),i=pn(e,{relative:t});if(!n.isTransitioning)return!1;let a=W(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=W(n.nextLocation.pathname,r)||n.nextLocation.pathname;return bt(i.pathname,o)!=null||bt(i.pathname,a)!=null}var Y=a(),Kr=()=>(0,Y.jsx)(In,{}),qr=u(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),Jr=u((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),Yr=i(u(((e,t)=>{var n=qr(),r=Jr(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function u(e){return(e||``).toString().replace(i,``)}var d=[[`#`,`hash`],[`?`,`query`],function(e,t){return m(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],f={hash:1,query:1};function p(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new _(unescape(e.pathname),{});else if(r===`string`)for(i in n=new _(e,{}),f)delete n[i];else if(r===`object`){for(i in e)i in f||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function m(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function h(e,t){e=u(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):m(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&m(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||m(r),slashesCount:s,rest:l}}function g(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function _(e,t,i){if(e=u(e),e=e.replace(a,``),!(this instanceof _))return new _(e,t,i);var o,s,c,f,v,y,b=d.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=p(t),s=h(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||l.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!m(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(f=b[C],typeof f==`function`){e=f(e,S);continue}c=f[0],y=f[1],c===c?typeof c==`string`?(v=c===`@`?e.lastIndexOf(c):e.indexOf(c),~v&&(typeof f[2]==`number`?(S[y]=e.slice(0,v),e=e.slice(v+f[2])):(S[y]=e.slice(v),e=e.slice(0,v)))):(v=c.exec(e))&&(S[y]=v[1],e=e.slice(0,v.index)):S[y]=e,S[y]=S[y]||o&&f[3]&&t[y]||``,f[4]&&(S[y]=S[y].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=g(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&m(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(v=S.auth.indexOf(`:`),~v?(S.username=S.auth.slice(0,v),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(v+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&m(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function v(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&m(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function y(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||m(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&m(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}_.prototype={set:v,toString:y},_.extractProtocol=h,_.location=p,_.trimLeft=u,_.qs=r,t.exports=_}))()),Xr=window.location.href.replace(/(.*\/calendar).*/i,`$1`),Zr=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,Yr.default)(`${Xr}${e}`);return t?n.href:n.pathname},Qr=i(n()),$r=14,ei=e=>{if(e instanceof MouseEvent){let t=e.target;if(t instanceof HTMLElement){let n=t.getBoundingClientRect(),r=n.left+e.offsetX,i=n.top+e.offsetY;return new DOMRect(r,i,1,1)}return new DOMRect(e.clientX,e.clientY,1,1)}return e.getBoundingClientRect()},ti=({state:e,bridgeRef:t,popoverRef:n})=>{let[r,i]=(0,V.useState)(),a=(0,V.useMemo)(()=>{if(e)return b(e.options)},[e]),o=(0,V.useCallback)(()=>{if(!e||!a){i(void 0);return}let r=t.current,o=n.current;if(!r||!o)return;let s=ei(e.anchor),c=o.getBoundingClientRect(),l=r.getBoundingClientRect(),u=_({anchorRect:s,popoverRect:c,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:a,arrowPadding:$r});i({...u,top:u.top-l.top,left:u.left-l.left})},[e,a,t,n]);return(0,V.useLayoutEffect)(()=>{o()},[o]),(0,V.useEffect)(()=>{if(!e)return;let t=()=>o();return window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0)}},[e,o]),r},ni=r.div`
  position: relative;
`,ri=r.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`,ii=r.span`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 12;

  ${({side:e,left:t,top:n})=>{switch(e){case`top`:return`
          top: -9px;
          left: ${t??0}px;
          transform: translateX(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &::before {
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-bottom: 9px solid var(--border-hairline-dark);
          }

          &::after {
            top: 1px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid white;
          }
        `;case`bottom`:return`
          bottom: -1px;
          left: ${t??0}px;
          transform: translateX(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &::before {
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-top: 9px solid var(--border-hairline-dark);
          }

          &::after {
            top: -1px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
          }
        `;case`left`:return`
          left: -9px;
          top: ${n??0}px;
          transform: translateY(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          &::before {
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-right: 9px solid var(--border-hairline-dark);
          }

          &::after {
            left: 1px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid white;
          }
        `;default:return`
          right: -1px;
          top: ${n??0}px;
          transform: translateY(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          &::before {
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-left: 9px solid var(--border-hairline-dark);
          }

          &::after {
            left: -1px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid white;
          }
        `}}}
`,ai=(0,V.createContext)(null),oi=()=>{let e=(0,V.useContext)(ai);if(!e)throw Error(`usePopover must be used within a PopoverProvider`);return e},si=({children:e})=>{let[t,n]=(0,V.useState)(),r=(0,V.useRef)(null),i=(0,V.useRef)(null),a=(0,V.useRef)(void 0),o=(0,V.useRef)(!1),s=(0,V.useCallback)((e,t,r)=>{clearTimeout(a.current),o.current=!1,n({content:e,anchor:t,options:r})},[]),c=(0,V.useCallback)(()=>{clearTimeout(a.current),n(void 0)},[]),l=(0,V.useCallback)(()=>{clearTimeout(a.current),o.current=!0},[]),u=ti({state:t,bridgeRef:r,popoverRef:i}),d=t?.options?.closeDelayMs,f=(0,V.useCallback)(()=>clearTimeout(a.current),[]),p=(0,V.useCallback)(()=>{d===void 0||o.current||(clearTimeout(a.current),a.current=setTimeout(()=>n(void 0),d))},[d]);(0,V.useEffect)(()=>{let e=t?.anchor;if(!(d===void 0||!(e instanceof HTMLElement)))return e.addEventListener(`mouseleave`,p),()=>e.removeEventListener(`mouseleave`,p)},[t,d,p]),(0,V.useEffect)(()=>()=>clearTimeout(a.current),[]);let m=t?.content&&(0,Y.jsxs)(ri,{ref:i,onMouseEnter:f,onMouseLeave:p,style:{top:u?.top??0,left:u?.left??0,visibility:u?`visible`:`hidden`},children:[u&&(0,Y.jsx)(ii,{side:u.arrow.side,top:u.arrow.top,left:u.arrow.left}),t.content]});return(0,Y.jsx)(ai.Provider,{value:{showPopover:s,hidePopover:c,keepPopoverOpen:l},children:(0,Y.jsxs)(ni,{ref:r,children:[m,e]})})},ci=i(d()),li=class extends z{constructor(){super(...arguments),this.state={textId:D()}}render(){let{theme:e,dateEnv:t,options:n,viewApi:r}=this.context,{cellId:i,dayDate:a,todayRange:o}=this.props,{textId:s}=this.state,c=C(a,o),l=n.listDayFormat?t.format(a,n.listDayFormat):``,u=n.listDaySideFormat?t.format(a,n.listDaySideFormat):``,d=Object.assign({date:t.toDate(a),view:r,textId:s,text:l,sideText:u,navLinkAttrs:ge(this.context,a),sideNavLinkAttrs:ge(this.context,a,`day`,!1)},c);return L(ne,{elTag:`tr`,elClasses:[`fc-list-day`,...S(c,e)],elAttrs:{"data-date":x(a)},renderProps:d,generatorName:`dayHeaderContent`,customGenerator:n.dayHeaderContent,defaultGenerator:ui,classNameGenerator:n.dayHeaderClassNames,didMount:n.dayHeaderDidMount,willUnmount:n.dayHeaderWillUnmount},t=>L(`th`,{scope:`colgroup`,colSpan:3,id:i,"aria-labelledby":s},L(t,{elTag:`div`,elClasses:[`fc-list-day-cushion`,e.getClass(`tableCellShaded`)]})))}};function ui(e){return L(pe,null,e.text&&L(`a`,Object.assign({id:e.textId,className:`fc-list-day-text`},e.navLinkAttrs),e.text),e.sideText&&L(`a`,Object.assign({"aria-hidden":!0,className:`fc-list-day-side-text`},e.sideNavLinkAttrs),e.sideText))}var di=oe({hour:`numeric`,minute:`2-digit`,meridiem:`short`}),fi=class extends z{render(){let{props:e,context:t}=this,{options:n}=t,{seg:r,timeHeaderId:i,eventHeaderId:a,dateHeaderId:o}=e,s=n.eventTimeFormat||di;return L(le,Object.assign({},e,{elTag:`tr`,elClasses:[`fc-list-event`,r.eventRange.def.url&&`fc-event-forced-url`],defaultGenerator:()=>pi(r,t),seg:r,timeText:``,disableDragging:!0,disableResizing:!0}),(e,n)=>L(pe,null,mi(r,s,t,i,o),L(`td`,{"aria-hidden":!0,className:`fc-list-event-graphic`},L(`span`,{className:`fc-list-event-dot`,style:{borderColor:n.borderColor||n.backgroundColor}})),L(e,{elTag:`td`,elClasses:[`fc-list-event-title`],elAttrs:{headers:`${a} ${o}`}})))}};function pi(e,t){let n=O(e,t);return L(`a`,Object.assign({},n),e.eventRange.def.title)}function mi(e,t,n,r,i){let{options:a}=n;if(a.displayEventTime!==!1){let o=e.eventRange.def,s=e.eventRange.instance,c=!1,l;if(o.allDay?c=!0:te(e.eventRange.range)?e.isStart?l=R(e,t,n,null,null,s.range.start,e.end):e.isEnd?l=R(e,t,n,null,null,e.start,s.range.end):c=!0:l=R(e,t,n),c){let e={text:n.options.allDayText,view:n.viewApi};return L(ne,{elTag:`td`,elClasses:[`fc-list-event-time`],elAttrs:{headers:`${r} ${i}`},renderProps:e,generatorName:`allDayContent`,customGenerator:a.allDayContent,defaultGenerator:hi,classNameGenerator:a.allDayClassNames,didMount:a.allDayDidMount,willUnmount:a.allDayWillUnmount})}return L(`td`,{className:`fc-list-event-time`},l)}return null}function hi(e){return e.text}var gi=class extends Ce{constructor(){super(...arguments),this.computeDateVars=j(vi),this.eventStoreToSegs=j(this._eventStoreToSegs),this.state={timeHeaderId:D(),eventHeaderId:D(),dateHeaderIdRoot:D()},this.setRootEl=e=>{e?this.context.registerInteractiveComponent(this,{el:e}):this.context.unregisterInteractiveComponent(this)}}render(){let{props:e,context:t}=this,{dayDates:n,dayRanges:r}=this.computeDateVars(e.dateProfile),i=this.eventStoreToSegs(e.eventStore,e.eventUiBases,r);return L(N,{elRef:this.setRootEl,elClasses:[`fc-list`,t.theme.getClass(`table`),t.options.stickyHeaderDates===!1?``:`fc-list-sticky`],viewSpec:t.viewSpec},L(ee,{liquid:!e.isHeightAuto,overflowX:e.isHeightAuto?`visible`:`hidden`,overflowY:e.isHeightAuto?`visible`:`auto`},i.length>0?this.renderSegList(i,n):this.renderEmptyMessage()))}renderEmptyMessage(){let{options:e,viewApi:t}=this.context;return L(ne,{elTag:`div`,elClasses:[`fc-list-empty`],renderProps:{text:e.noEventsText,view:t},generatorName:`noEventsContent`,customGenerator:e.noEventsContent,defaultGenerator:_i,classNameGenerator:e.noEventsClassNames,didMount:e.noEventsDidMount,willUnmount:e.noEventsWillUnmount},e=>L(e,{elTag:`div`,elClasses:[`fc-list-empty-cushion`]}))}renderSegList(e,t){let{theme:n,options:r}=this.context,{timeHeaderId:i,eventHeaderId:a,dateHeaderIdRoot:o}=this.state,s=yi(e);return L(k,{unit:`day`},(e,c)=>{let l=[];for(let n=0;n<s.length;n+=1){let u=s[n];if(u){let s=x(t[n]),d=o+`-`+s;l.push(L(li,{key:s,cellId:d,dayDate:t[n],todayRange:c})),u=de(u,r.eventOrder);for(let t of u)l.push(L(fi,Object.assign({key:s+`:`+t.eventRange.instance.instanceId,seg:t,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,timeHeaderId:i,eventHeaderId:a,dateHeaderId:d},A(t,c,e))))}}return L(`table`,{className:`fc-list-table `+n.getClass(`table`)},L(`thead`,null,L(`tr`,null,L(`th`,{scope:`col`,id:i},r.timeHint),L(`th`,{scope:`col`,"aria-hidden":!0}),L(`th`,{scope:`col`,id:a},r.eventHint))),L(`tbody`,null,l))})}_eventStoreToSegs(e,t,n){return this.eventRangesToSegs(I(e,t,this.props.dateProfile.activeRange,this.context.options.nextDayThreshold).fg,n)}eventRangesToSegs(e,t){let n=[];for(let r of e)n.push(...this.eventRangeToSegs(r,t));return n}eventRangeToSegs(e,t){let{dateEnv:n}=this.context,{nextDayThreshold:r}=this.context.options,i=e.range,a=e.def.allDay,o,s,c,l=[];for(o=0;o<t.length;o+=1)if(s=w(i,t[o]),s&&(c={component:this,eventRange:e,start:s.start,end:s.end,isStart:e.isStart&&s.start.valueOf()===i.start.valueOf(),isEnd:e.isEnd&&s.end.valueOf()===i.end.valueOf(),dayIndex:o},l.push(c),!c.isEnd&&!a&&o+1<t.length&&i.end<n.add(t[o+1].start,r))){c.end=i.end,c.isEnd=!0;break}return l}};function _i(e){return e.text}function vi(e){let t=Se(e.renderRange.start),n=e.renderRange.end,r=[],i=[];for(;t<n;)r.push(t),i.push({start:t,end:E(t,1)}),t=E(t,1);return{dayDates:r,dayRanges:i}}function yi(e){let t=[],n,r;for(n=0;n<e.length;n+=1)r=e[n],(t[r.dayIndex]||(t[r.dayIndex]=[])).push(r);return t}T(`:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid var(--fc-border-color)}.fc .fc-list-empty{align-items:center;background-color:var(--fc-neutral-bg-color);display:flex;height:100%;justify-content:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{border-style:hidden;width:100%}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{background:var(--fc-page-bg-color);position:sticky;top:0}.fc .fc-list-table thead{left:-10000px;position:absolute}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{clear:both;content:"";display:table}.fc-theme-standard .fc-list-day-cushion{background-color:var(--fc-neutral-bg-color)}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:var(--fc-list-event-hover-bg-color)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{border:calc(var(--fc-list-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-list-event-dot-width)/2);box-sizing:content-box;display:inline-block;height:0;width:0}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}`);var bi={listDayFormat:xi,listDaySideFormat:xi,noEventsClassNames:M,noEventsContent:M,noEventsDidMount:M,noEventsWillUnmount:M};function xi(e){return e===!1?null:oe(e)}var Si=P({name:`@fullcalendar/list`,optionRefiners:bi,views:{list:{component:gi,buttonTextKey:`list`,listDayFormat:{month:`long`,day:`numeric`,year:`numeric`}},listDay:{type:`list`,duration:{days:1},listDayFormat:{weekday:`long`}},listWeek:{type:`list`,duration:{weeks:1},listDayFormat:{weekday:`long`},listDaySideFormat:{month:`long`,day:`numeric`,year:`numeric`}},listMonth:{type:`list`,duration:{month:1},listDaySideFormat:{weekday:`long`}},listYear:{type:`list`,duration:{year:1},listDaySideFormat:{weekday:`long`}}}}),Ci=1440*60,wi=`draft-create-event`,Ti=`New Event`,Ei=e=>Math.floor(e.getTime()/1e3),X=e=>{let t=new Date(e*1e3);return Math.floor(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())/1e3)},Z=(e,t)=>e+t*Ci,Di=e=>Math.max(1,e.eventDuration)*60,Oi=(e,t)=>e.preserveDuration?Math.max(60,e.end-e.start):Di(t),ki=e=>Math.max(1,Math.round((e.end-e.start)/Ci)),Ai=e=>!!(e&&typeof e==`object`&&`closest`in e&&e.closest),ji=(e,t)=>{let n=Ei(e.start),r=Ei(e.end),i=e.allDay?r-n>Ci:X(r-1)>X(n),a=e.allDay?i:t.allDayDefault,o=i||!a&&!e.allDay&&r>n,s=a?X(n):e.allDay?X(n)+new Date().getHours()*60*60:n,c=a?Z(i?X(r-1):s,1):o?r:s+Di(t);return{id:wi,title:l(Ti),allDay:a,start:s,end:c,preserveDuration:o}},Mi=e=>({id:e.id,title:e.title,start:new Date(e.start*1e3),end:new Date(e.end*1e3),allDay:e.allDay,editable:!1,startEditable:!1,durationEditable:!1,extendedProps:{isDraftCreate:!0}}),Ni=e=>e.allDay?Z(e.end,-1):e.end,Pi=(e,t)=>({...e,title:t}),Fi=(e,t,n)=>{if(e.allDay===t)return e;if(t){let t=X(e.start),n=Z(X(e.end-1),1);return{...e,allDay:!0,start:t,end:Math.max(n,Z(t,1))}}return{...e,allDay:!1,end:e.start+(e.preserveDuration?(ki(e)-1)*Ci:0)+Di(n)}},Ii=(e,t,n)=>{if(e.allDay){let n=X(t);return{...e,start:n,end:Z(n,ki(e))}}return{...e,start:t,end:t+Oi(e,n)}},Li=(e,t,n)=>{if(e.allDay){let n=Z(X(t),1);return{...e,end:Math.max(n,Z(X(e.start),1))}}return{...e,end:Math.max(t,e.start+(e.preserveDuration?60:Di(n)))}},Ri=(e,t)=>{e.setProp(`title`,t.title),e.setAllDay(t.allDay,{maintainDuration:!1}),e.setDates(new Date(t.start*1e3),new Date(t.end*1e3),{allDay:t.allDay})},Q=e=>!!(e?.extendedProps&&`isDraftCreate`in e.extendedProps&&e.extendedProps.isDraftCreate),zi=(e,t)=>Ai(e)&&!!e.closest(t),Bi=e=>{let t;if(e){let n=new URL(Craft.getCpUrl(`calendar/${c(e)}`),window.location.origin);n.search=window.location.search,t=n.toString()}else{let e=new URL(window.location.href);/\/(day|week|month|agenda)$/.test(e.pathname)&&(e.pathname=e.pathname.replace(/\/(day|week|month|agenda)$/,``)),t=e.toString()}history.pushState(`data`,``,t)},Vi=`refresh prev,today,datepicker,next`,Hi=(e,{datePickerButton:t})=>({prev:{text:Craft.t(`calendar`,`Previous`),icon:`chevron-left`,click:()=>{e.prev(),Bi(e.getDate())}},next:{text:Craft.t(`calendar`,`Next`),icon:`chevron-right`,click:()=>{e.next(),Bi(e.getDate())}},refresh:{text:Craft.t(`calendar`,`Refresh`),icon:`refresh`,click:()=>{be(),e.refetchEvents()}},datepicker:t});u(((e,t)=>{var n=NaN,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt,c=typeof global==`object`&&global&&global.Object===Object&&global,l=typeof self==`object`&&self&&self.Object===Object&&self,u=c||l||Function(`return this`)(),d=Object.prototype.toString,f=Math.max,p=Math.min,m=function(){return u.Date.now()};function h(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,h=!0;if(typeof e!=`function`)throw TypeError(`Expected a function`);t=y(t)||0,g(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?f(y(n.maxWait)||0,t):a,h=`trailing`in n?!!n.trailing:h);function _(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function v(e){return l=e,s=setTimeout(S,t),u?_(e):o}function b(e){var n=e-c,r=e-l,i=t-n;return d?p(i,a-r):i}function x(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function S(){var e=m();if(x(e))return C(e);s=setTimeout(S,b(e))}function C(e){return s=void 0,h&&r?_(e):(r=i=void 0,o)}function w(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function T(){return s===void 0?o:C(m())}function E(){var e=m(),n=x(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return v(c);if(d)return s=setTimeout(S,t),_(c)}return s===void 0&&(s=setTimeout(S,t)),o}return E.cancel=w,E.flush=T,E}function g(e){var t=typeof e;return!!e&&(t==`object`||t==`function`)}function _(e){return!!e&&typeof e==`object`}function v(e){return typeof e==`symbol`||_(e)&&d.call(e)==`[object Symbol]`}function y(e){if(typeof e==`number`)return e;if(v(e))return n;if(g(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=g(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=e.replace(r,``);var c=a.test(e);return c||o.test(e)?s(e.slice(2),c?2:8):i.test(e)?n:+e}t.exports=h}))();var Ui=typeof window<`u`?V.useLayoutEffect:V.useEffect;function Wi(e,t,n,r){let i=(0,V.useRef)(t);Ui(()=>{i.current=t},[t]),(0,V.useEffect)(()=>{let t=n?.current??window;if(!(t&&t.addEventListener))return;let a=e=>{i.current(e)};return t.addEventListener(e,a,r),()=>{t.removeEventListener(e,a,r)}},[e,n,r])}function Gi(e){let t=(0,V.useRef)(()=>{throw Error(`Cannot call an event handler while rendering.`)});return Ui(()=>{t.current=e},[e]),(0,V.useCallback)((...e)=>t.current?.call(t,...e),[t])}var Ki=typeof window>`u`;function qi(e,t,n={}){let{initializeWithValue:r=!0}=n,i=(0,V.useCallback)(e=>n.serializer?n.serializer(e):JSON.stringify(e),[n]),a=(0,V.useCallback)(e=>{if(n.deserializer)return n.deserializer(e);if(e===`undefined`)return;let r=t instanceof Function?t():t,i;try{i=JSON.parse(e)}catch(e){return console.error(`Error parsing JSON:`,e),r}return i},[n,t]),o=(0,V.useCallback)(()=>{let n=t instanceof Function?t():t;if(Ki)return n;try{let t=window.localStorage.getItem(e);return t?a(t):n}catch(t){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,t),n}},[t,e,a]),[s,c]=(0,V.useState)(()=>r?o():t instanceof Function?t():t),l=Gi(t=>{Ki&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{let n=t instanceof Function?t(o()):t;window.localStorage.setItem(e,i(n)),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))}catch(t){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,t)}}),u=Gi(()=>{Ki&&console.warn(`Tried removing localStorage key \u201C${e}\u201D even though environment is not a client`);let n=t instanceof Function?t():t;window.localStorage.removeItem(e),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))});(0,V.useEffect)(()=>{c(o())},[e]);let d=(0,V.useCallback)(t=>{t.key&&t.key!==e||c(o())},[e,o]);return Wi(`storage`,d),Wi(`local-storage`,d),[s,l,u]}var Ji=`solspace-calendar-view`,Yi=`solspace-calendar-hidden-calendars`,Xi={view:`dayGridMonth`},Zi={month:`dayGridMonth`,week:`timeGridWeek`,day:`timeGridDay`,agenda:`listMonth`},Qi=()=>{let e=window.location.pathname.split(`/`).filter(Boolean).at(-1);return e&&Zi[e]||null},$i=()=>{let[e,t]=qi(Ji,Xi),[n,r]=(0,V.useState)(e.view),[i,a]=(0,V.useState)(!1);return(0,V.useEffect)(()=>{let t=Qi(),n=t||e.view;t&&r(n),a(!0)},[]),{view:n,setView:e=>{r(e),t({view:e}),a(!0)},isReady:i}},ea=()=>{let[e,t]=qi(Yi,[]);return{hiddenCalendarIds:e,toggleCalendarVisibility:e=>{t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}}},ta=(0,V.createContext)(null),na=({config:e,children:t})=>{let n=(0,V.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,Y.jsx)(ta.Provider,{value:n,children:t})},$=()=>{let e=(0,V.useContext)(ta);if(!e)throw Error(`ConfigContext is not provided`);return e},ra=e=>{let{view:n}=$i(),{weekStartDay:r}=$(),i=(0,V.useRef)(null),[a,o]=(0,V.useState)(!1),[c,l]=(0,V.useState)(null),[u,d]=(0,V.useState)(null),f=(0,V.useCallback)(()=>{o(!1),l(null)},[]);(0,V.useEffect)(()=>{if(!a)return;let e=e=>{let t=e.target;i.current?.contains(t)||t.closest(`.fc-datepicker-button`)||f()},t=e=>{e.key===`Escape`&&f()};return window.addEventListener(`mousedown`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`mousedown`,e),window.removeEventListener(`keydown`,t)}},[f,a]);let p=(0,V.useCallback)(t=>{if(!t)return;let n=s(t);Bi(n),e.gotoDate(n),d(t),f()},[f,e]),m=(0,V.useCallback)((n,r)=>{let{bottom:i,right:a}=r.getBoundingClientRect();d(t(e.getDate())),o(e=>!e),l({top:i+8,left:a})},[e]);return{dateSelector:a&&c?(0,Y.jsx)(ia,{view:n,popoverRef:i,position:c,selectedDate:u,weekStartDay:r,onDateSelect:p}):null,datePickerButton:{text:Craft.t(`calendar`,`Pick a Date`),icon:`datepicker`,click:m}}},ia=({view:e,popoverRef:t,position:n,selectedDate:r,weekStartDay:i,onDateSelect:a})=>{let o=e===`timeGridWeek`,s=e===`dayGridMonth`||e===`listMonth`;return(0,Y.jsx)(`div`,{ref:t,className:`fc-datepicker-popover`,style:{top:n.top,left:n.left},children:(0,Y.jsx)(Ne,{...p(),inline:!0,selected:r,onChange:a,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:i,showWeekPicker:o,showWeekNumbers:o,showMonthYearPicker:s})})},aa=e=>e.view.type===`dayGridMonth`&&!e.event.allDay&&!e.event.extendedProps?.multiDay,oa=e=>{let t=e?.toLowerCase();return t===`black`||t===`white`?`fc-color-${t}`:null},sa=({event:e})=>{let t=[];e.allDay&&t.push(`fc-event-all-day`),e.end&&(!e.extendedProps?.multiDay&&!e.allDay?t.push(`fc-event-single-day`):t.push(`fc-event-multi-day`)),e.extendedProps?.enabled===!1&&t.push(`fc-event-disabled`),e.extendedProps?.cancelled&&t.push(`fc-event-cancelled`);let n=oa(e.textColor);return n&&t.push(n),t},ca=(e,t)=>Q(e)?`ignore`:zi(t,`[data-calendar-event-title-link]`)?`navigate`:`open`,la=e=>{let{event:t,timeText:n}=e,r=e.view.type===`listMonth`,i=B(`fc-event-title`,aa(e)&&`fc-event-title-inline`),a=!Q(t)&&t.url,o=!!t.extendedProps?.cancelled,s=!o&&t.extendedProps?.isEdited?(0,Y.jsx)(`span`,{className:`fc-event-flag`,title:l(`This occurrence has its own changes.`),"aria-hidden":`true`,children:`✎`}):null,c=o&&!r?(0,Y.jsxs)(`span`,{className:`visually-hidden`,children:[`, `,l(`Cancelled`)]}):null,u=r?(0,Y.jsxs)(`a`,{href:t.url||`#`,className:i,children:[s,t.title]}):a?(0,Y.jsxs)(`button`,{type:`button`,onClick:()=>window.location.href=t.url,className:i,"data-calendar-event-title-link":!0,children:[s,t.title,c]}):(0,Y.jsxs)(`div`,{className:i,children:[s,t.title,c]});if(r){let{calendarName:e,location:n,description:r}=t.extendedProps;return(0,Y.jsxs)(`div`,{className:`calendar-agenda-event`,children:[(0,Y.jsxs)(`div`,{className:`calendar-agenda-title`,children:[u,o&&(0,Y.jsx)(`span`,{className:`calendar-agenda-cancelled`,children:l(`Cancelled`)})]}),(0,Y.jsxs)(`div`,{className:`calendar-agenda-meta`,children:[e&&(0,Y.jsxs)(`span`,{className:`calendar-agenda-calendar`,children:[(0,Y.jsx)(`span`,{className:`calendar-agenda-calendar-dot`,style:{backgroundColor:t.extendedProps.calendarColor||t.backgroundColor},"aria-hidden":`true`}),e]}),n&&(0,Y.jsx)(`span`,{className:`calendar-agenda-location`,children:n})]}),r&&(0,Y.jsx)(`div`,{className:`calendar-agenda-description`,children:r})]})}return aa(e)?(0,Y.jsxs)(`div`,{className:`fc-event-main-frame fc-event-main-frame-inline`,children:[(0,Y.jsx)(`span`,{className:`fc-color-icon`,style:{backgroundColor:t.backgroundColor,borderColor:t.borderColor}}),(0,Y.jsx)(`div`,{className:`fc-event-title-container`,children:u}),n?(0,Y.jsx)(`div`,{className:`fc-event-time`,children:n}):null]}):(0,Y.jsx)(`div`,{className:`fc-event-main-frame`,children:(0,Y.jsx)(`div`,{className:`fc-event-title-container`,children:u})})},ua=`calendar:schedule-history-reset`,da=e=>{let[t,n]=(0,V.useState)([]),[r,i]=(0,V.useState)([]),[a,o]=(0,V.useState)(!1),s=(0,V.useRef)(!1),c=(0,V.useCallback)(()=>{n([]),i([])},[]);(0,V.useEffect)(()=>(window.addEventListener(ua,c),()=>window.removeEventListener(ua,c)),[c]);let l=(0,V.useCallback)(e=>{n(t=>[...t,e].slice(-50)),i([])},[]),u=(0,V.useCallback)(async e=>{if(s.current)return!1;s.current=!0,o(!0);try{return await e()}finally{s.current=!1,o(!1)}},[]);return{add:l,run:u,replay:(0,V.useCallback)(async a=>{let o=(a===`undo`?t:r).at(-1);o&&await u(async()=>await xe(o,a)?(a===`undo`?(n(e=>e.slice(0,-1)),i(e=>[...e,o])):(i(e=>e.slice(0,-1)),n(e=>[...e,o])),e(),!0):!1)},[t,r,u,e]),clear:c,busy:a,canUndo:t.length>0,canRedo:r.length>0}},fa=r.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--medium-border-radius, 4px);
  background: #c4cfe1;
`,pa=r.button`
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
`,ma=({canUndo:e,canRedo:t,disabled:n,onReplay:r})=>((0,V.useEffect)(()=>{let i=i=>{if(n||i.defaultPrevented||i.altKey||!(i.metaKey||i.ctrlKey))return;let a=i.target;if(a instanceof HTMLElement&&a.closest(`input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=textbox]`)||document.querySelector(`.modal:not(.hidden), .cp-screen-slideout:not(.hidden)`))return;let o=i.key.toLowerCase(),s=o===`z`?i.shiftKey?`redo`:`undo`:o===`y`&&i.ctrlKey?`redo`:null;!s||!(s===`undo`?e:t)||(i.preventDefault(),r(s))};return document.addEventListener(`keydown`,i),()=>document.removeEventListener(`keydown`,i)},[e,t,n,r]),(0,Y.jsx)(fa,{role:`group`,"aria-label":l(`Event history`),children:[`undo`,`redo`].map(i=>(0,Y.jsx)(pa,{type:`button`,disabled:n||!(i===`undo`?e:t),title:l(i===`undo`?`Undo`:`Redo`),"aria-label":l(i===`undo`?`Undo`:`Redo`),onClick:()=>r(i),children:(0,Y.jsx)(`svg`,{viewBox:`0 0 96 80`,width:`18`,height:`16`,"aria-hidden":`true`,focusable:`false`,children:(0,Y.jsx)(`g`,{transform:i===`redo`?`translate(96 0) scale(-1 1)`:void 0,children:(0,Y.jsx)(`path`,{fill:`currentColor`,d:`M37 1 1 30l36 29V41h18c15 0 23 8 23 22 0 6-2 11-5 16 12-8 19-19 19-31 0-20-14-31-37-31H37V1Z`})})})},i))})),ha=()=>new URL(window.location.href).searchParams.get(`search`)?.trim()??``,ga=({initialSearch:e,onSearchChange:t})=>{let[n,r]=(0,V.useState)(e),i=(0,V.useId)(),a=(0,V.useRef)(null);(0,V.useEffect)(()=>{let e=setTimeout(()=>t(n.trim()),250);return()=>clearTimeout(e)},[n,t]);let o=()=>{r(``),t(``),a.current?.focus()};return(0,Y.jsx)(Fe,{children:(0,Y.jsxs)(`div`,{className:`calendar-search-toolbar`,children:[(0,Y.jsxs)(`div`,{className:`calendar-search-input`,children:[(0,Y.jsx)(`span`,{className:`calendar-search-icon`,"data-icon":`search`,"aria-hidden":`true`}),(0,Y.jsx)(`input`,{type:`search`,ref:a,className:`text fullwidth`,"aria-label":l(`Search events`),"aria-describedby":i,placeholder:Craft.t(`app`,`Search`),value:n,onChange:e=>r(e.target.value),onKeyDown:e=>{e.key===`Escape`&&n&&(e.stopPropagation(),o())}}),n&&(0,Y.jsx)(`button`,{type:`button`,className:`calendar-search-clear`,"aria-label":l(`Clear search`),"data-icon":`remove`,onClick:o})]}),(0,Y.jsx)(`span`,{id:i,className:`visually-hidden`,children:l(`Searches events in the displayed date range.`)})]})})},_a=({options:e,value:t,onChange:n})=>{let r=(0,V.useId)(),i=(0,V.useRef)(null),a=(0,V.useRef)(null),o=(0,V.useRef)(n),s=JSON.stringify(e),c=e.find(e=>e.value===t);return(0,V.useEffect)(()=>{o.current=n},[n]),(0,V.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu`,t.style.minWidth=`${e.getBoundingClientRect().width}px`,t.setAttribute(`aria-label`,l(`Calendar`)),a.current=t;let n=document.createElement(`ul`);t.append(n),JSON.parse(s).forEach(e=>{let t=document.createElement(`li`),r=document.createElement(`a`);r.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),r.append(i,document.createTextNode(e.label)),t.append(r),n.append(t)}),e.after(t);let r=new Garnish.MenuBtn(e,{onOptionSelect:t=>{r.hideMenu(),o.current(Number(t.dataset.calendarId)),e.focus()}}),c=t=>{t.key===`Escape`&&r.showingMenu&&(t.preventDefault(),t.stopPropagation(),r.hideMenu(),e.focus())};return document.addEventListener(`keydown`,c,!0),()=>{document.removeEventListener(`keydown`,c,!0),r.hideMenu(),r.destroy(),t.remove(),a.current=null}},[s]),(0,V.useEffect)(()=>{a.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let n=Number(e.dataset.calendarId)===t;e.classList.toggle(`sel`,n),e.setAttribute(`aria-selected`,String(n))})},[t,s]),(0,Y.jsx)(Ae,{label:l(`Calendar`),id:r,required:!0,children:(0,Y.jsxs)(va,{ref:i,id:r,type:`button`,className:`btn menubtn fullwidth`,"aria-required":`true`,children:[(0,Y.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:c?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,Y.jsx)(`span`,{className:`calendar-name`,children:c?.label})]})})},va=r.button`
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
`,ya=(e,t,n,r)=>({title:e.title||l(`New Event`),start:e.start,end:e.end,allDay:e.allDay,calendarId:t,siteId:n,...r&&{details:r}}),ba=({refetchEvents:e,onSuccess:t})=>{let{hidePopover:n}=oi(),{currentSiteId:r}=$(),[i,a]=(0,V.useState)(null),[o,s]=(0,V.useState)(null),c=(0,V.useCallback)(async(i,o,c,u)=>{a(u?`prepare`:`create`),s(null);try{let a=ya(i,o,r,c);u&&(a.title=i.title);let s=await _e(Zr(u?`/api/events/prepare`:`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)});if(!s.ok){let e=null;try{e=await s.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}let d=await s.json();if(u){if(typeof d?.url!=`string`||!d.url)throw Error(l(`Couldn’t create event.`));return d.url}return be(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),e?.(),t?.(),n(),null}catch(e){return e instanceof Error?s(e.message):s(`Failed to create event`),null}finally{a(null)}},[n,t,e,r]);return{createEvent:(e,t,n)=>c(e,t,n,!1),prepareEvent:(e,t,n)=>c(e,t,n,!0),error:o,isFetching:i!==null,isOpeningEditor:i===`prepare`}},xa=r.div`
  width: 340px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  padding: 15px;

  label.required::after {
    font-size: 10px;
  }

  hr {
    margin: 15px 0;
  }
`,Sa=r(Pe)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,Ca=r.div`
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
`,wa=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ta=r.label`
  font-weight: 600;
  cursor: pointer;
`,Ea=r(Pe)`
  flex-wrap: wrap;
  align-items: center;
`,Da=r.button`
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
`,Oa=({draft:e,onChange:t,refetchEvents:n,onConfirm:r,onCancel:i})=>{let{calendars:a,calendarColors:s,quickCreateFields:c,quickCreateRequiredFields:u,formats:d,weekStartDay:f,eventDuration:p,timeInterval:m}=$(),h=(0,V.useId)(),g=(0,V.useMemo)(()=>Object.entries(a).map(([e,t])=>({value:Number(e),label:t,color:s?.[Number(e)]})),[a,s]),[_,v]=(0,V.useState)(g[0]?.value??0),[y,b]=(0,V.useState)({}),x=c?.[_],S=x?.location,C=x?.description,w=u?.[_],T=y[_]??{},E=S||C?{...S&&{location:T[S]??``},...C&&{description:T[C]??``}}:void 0,D=(e,t)=>{b(n=>({...n,[_]:{...n[_],[e]:t}}))},{createEvent:O,prepareEvent:k,error:A,isFetching:j,isOpeningEditor:ee}=ba({refetchEvents:n,onSuccess:r}),M=(0,V.useMemo)(()=>e.allDay?d.date.short.icu:d.datetime.short.icu,[d,e.allDay]),N=(0,V.useMemo)(()=>Ni(e),[e]);return Wi(`keydown`,e=>{e.key===`Escape`&&!j&&i()}),(0,Y.jsxs)(xa,{children:[(0,Y.jsx)(Sa,{children:(0,Y.jsx)(Re,{label:l(`Title`),id:`${h}-title`,required:!0,autofocus:!0,value:e.title,placeholder:l(`Event Title`),onChange:n=>t(Pi(e,n))})}),(0,Y.jsxs)(Ca,{children:[(0,Y.jsx)(_a,{value:_,options:g,onChange:v}),(0,Y.jsx)(`hr`,{}),(0,Y.jsxs)(wa,{children:[(0,Y.jsx)(ke,{enabled:e.allDay,onClick:n=>t(Fi(e,n,{eventDuration:p}))}),(0,Y.jsx)(Ta,{onClick:()=>t(Fi(e,!e.allDay,{eventDuration:p})),children:l(`All Day`)})]}),(0,Y.jsx)(Me,{id:`${h}-start`,required:!0,label:l(`Starts`),value:e.start,datePickerProps:{showIcon:!0,icon:(0,Y.jsx)(Ee,{}),toggleCalendarOnIconClick:!0,dateFormat:M,timeFormat:d.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:f,timeIntervals:m},onChange:n=>{n!==null&&t(Ii(e,n,{eventDuration:p}))}}),(0,Y.jsx)(Me,{id:`${h}-end`,required:!0,label:l(`Ends`),value:N,datePickerProps:{showIcon:!0,icon:(0,Y.jsx)(Ee,{}),toggleCalendarOnIconClick:!0,minDate:o(e.start),dateFormat:M,timeFormat:d.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:f,timeIntervals:m,filterTime:t=>{if(!e.start)return!0;let n=o(e.start),r=new Date(t);return n.getTime()<r.getTime()}},onChange:n=>{n!==null&&t(Li(e,n,{eventDuration:p}))}}),(S||C)&&(0,Y.jsx)(`hr`,{}),S&&(0,Y.jsx)(Ae,{label:l(`Location`),id:`${h}-location`,required:w?.location,children:(0,Y.jsx)(`input`,{id:`${h}-location`,type:`text`,className:`text fullwidth`,disabled:j,"aria-required":w?.location||void 0,value:T[S]??``,onChange:e=>D(S,e.target.value)})}),C&&(0,Y.jsx)(Ae,{label:l(`Description`),id:`${h}-description`,required:w?.description,children:(0,Y.jsx)(`textarea`,{id:`${h}-description`,className:`text fullwidth`,rows:3,disabled:j,"aria-required":w?.description||void 0,value:T[C]??``,onChange:e=>D(C,e.target.value)})})]}),(0,Y.jsx)(`hr`,{}),A&&(0,Y.jsx)(`p`,{className:`error`,children:A}),(0,Y.jsxs)(Ea,{$justifyContent:`flex-end`,$gap:8,children:[(0,Y.jsx)(Da,{type:`button`,disabled:!_||j,onClick:async()=>{let t=await k(e,_,E);t&&(window.location.href=t)},children:l(ee?`Processing...`:`More details…`)}),(0,Y.jsx)(`button`,{type:`button`,className:B(`btn submit`,j&&`disabled`),disabled:!e.title||!_||j,onClick:()=>O(e,_,E),children:l(j&&!ee?`Creating Event...`:`Create Event`)}),(0,Y.jsx)(`button`,{type:`button`,className:B(`btn`,j&&`disabled`),disabled:j,onClick:i,children:l(`Cancel`)})]})]})},ka=r.div`
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
    margin: 8px 0 0;
    color: var(--gray-600);
    font-size: 13px;
  }

  .occurrence-status.is-edited {
    margin-top: 12px;
    padding: 8px 10px;
    border: 1px solid var(--blue-200);
    border-radius: var(--radius-sm);
    background: var(--blue-050);
    color: var(--blue-800);
    line-height: 1.4;
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
`,Aa=r.div`
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
`,ja=r.button`
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
`,Ma={move:`You are moving an event.`,resize:`You are changing an event’s length.`,delete:`You are deleting an event.`},Na={move:`Which occurrences do you want to move?`,resize:`Which occurrences do you want to change?`,delete:`Which occurrences do you want to delete?`},Pa={occurrence:`Only this occurrence`,following:`This and following`,series:`All occurrences`},Fa=({action:e,onSelect:t,onCancel:n})=>{let{hidePopover:r}=oi(),[i,a]=(0,V.useState)(null),o=(0,V.useRef)(!0),s=(0,V.useRef)(!1),c=i!==null;(0,V.useEffect)(()=>()=>{o.current=!1,s.current||n?.()},[]);let u=(0,V.useCallback)(()=>{c||r()},[r,c]);Wi(`keydown`,e=>{e.key===`Escape`&&u()});let d=async e=>{if(!c){s.current=!0,a(e);try{await t(e)&&r()}finally{o.current&&a(null)}}};return(0,Y.jsxs)(ka,{children:[(0,Y.jsx)(`h3`,{children:l(Ma[e])}),(0,Y.jsx)(`p`,{children:l(Na[e])}),(0,Y.jsx)(`hr`,{}),(0,Y.jsxs)(Pe,{$direction:`column`,$alignItems:`center`,$gap:8,children:[[`occurrence`,`following`,`series`].map(e=>(0,Y.jsx)(`button`,{type:`button`,className:B(`btn small`,e===`occurrence`&&`submit`,c&&`disabled`),disabled:c,onClick:()=>d(e),children:l(i===e?`Processing...`:Pa[e])},e)),(0,Y.jsx)(`button`,{type:`button`,className:B(`btn small`,c&&`disabled`),disabled:c,onClick:u,children:l(`Cancel`)})]})]})},Ia=({actions:e,disabled:t})=>{let{eventActionIcons:n}=$(),{keepPopoverOpen:r}=oi(),i=(0,V.useRef)(null),a=(0,V.useRef)({actions:e,disabled:t}),o=JSON.stringify(e.map(({label:e,destructive:t,icon:r,color:i})=>({label:e,destructive:t,icon:r?n?.[r]:void 0,color:i})));return(0,V.useEffect)(()=>{a.current={actions:e,disabled:t}},[e,t]),(0,V.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu menu--disclosure calendar-event-action-menu`,t.setAttribute(`aria-label`,l(`More actions`));let n=document.createElement(`ul`);t.append(n),JSON.parse(o).forEach((e,r)=>{e.destructive&&r>0&&(t.append(document.createElement(`hr`)),n=document.createElement(`ul`),t.append(n));let i=document.createElement(`li`),a=document.createElement(`a`);if(a.className=`menu-item`,e.icon){let t=document.createElement(`span`);t.className=e.color?`icon ${e.color}`:`icon`,t.setAttribute(`aria-hidden`,`true`),t.innerHTML=e.icon,a.append(t)}let o=document.createElement(`span`);o.className=`menu-item-label`,o.textContent=e.label,a.append(o),a.dataset.action=String(r),e.destructive&&a.classList.add(`error`),i.append(a),n.append(i)}),e.after(t);let s=new Garnish.MenuBtn(e,{onOptionSelect:e=>{a.current.disabled||(s.hideMenu(),a.current.actions[Number(e.dataset.action)]?.onSelect())}});s.menu.on(`show`,r);let c=t=>{t.key===`Escape`&&s.showingMenu&&(t.preventDefault(),t.stopPropagation(),s.hideMenu(),e.focus())};return document.addEventListener(`keydown`,c,!0),()=>{document.removeEventListener(`keydown`,c,!0),s.hideMenu(),s.destroy(),t.remove()}},[o,r]),(0,Y.jsx)(`button`,{ref:i,type:`button`,className:`btn menubtn action-btn`,disabled:t,"aria-label":l(`More actions`),title:l(`More actions`)})},La=({fcEvent:e})=>{let{hidePopover:n,showPopover:r}=oi(),{currentSiteId:i}=$(),[a,o]=(0,V.useState)(!1),[s,c]=(0,V.useState)(!1),[u,d]=(0,V.useState)(!1),[p,m]=(0,V.useState)(!1),h=a||s||u||p;Wi(`keydown`,e=>{e.key===`Escape`&&n()});let g=e.event,{end:_,allDay:b}=g,x=g.extendedProps.calendarName,S=typeof g.extendedProps.location==`string`?g.extendedProps.location.trim():``,C=typeof g.extendedProps.description==`string`?g.extendedProps.description.trim():``,w=g.extendedProps.calendarColor??g.backgroundColor??g.borderColor??`#607d9f`,T=(0,V.useMemo)(()=>b?Oe(_,1):_,[b,_]),E=!!g.extendedProps.rrule,D=E?y(v(g.extendedProps.rrule,g.start.getTime()/1e3)):null,O=ye(String(g.id)),k=g.allDay?`PP`:`PPp`,A=!!g.extendedProps.cancelled,j=!!g.extendedProps.isEdited,ee=!!g.extendedProps.hasOverride,M=()=>e.view.calendar.refetchEvents(),N=()=>{O&&(n(),ue({eventId:he(String(g.id)),recurrenceId:O,siteId:i,onSave:M}))},te=async()=>{if(!O||h)return;d(!0);let e=await F({event:g,recurrenceId:O,siteId:i});if(e){window.location.href=e;return}d(!1)},P=async()=>{if(!(!O||h)){c(!0);try{await ae({event:g,recurrenceId:O,cancelled:!A,siteId:i,refetchEvents:M})&&n()}finally{c(!1)}}},ne=async()=>{if(!a){o(!0);try{await ve({event:g,scope:`series`,recurrenceId:O,siteId:i,refetchEvents:M})&&n()}finally{o(!1)}}},re=()=>{r((0,Y.jsx)(Fa,{action:`delete`,onSelect:async e=>e===`occurrence`&&ee&&!window.confirm(l(`This occurrence has its own changes, which are deleted with it. Delete it?`))?!1:ve({event:g,scope:e,recurrenceId:O,siteId:i,refetchEvents:M})}),e.el)},I=async()=>{if(h)return;m(!0);let e=await ce(g,i);if(e){window.location.href=e;return}m(!1)},ie=[{label:l(p?`Duplicating...`:`Duplicate Event`),icon:`clone-dashed`,color:`fuchsia`,onSelect:()=>void I()}];return E&&O&&ie.push({label:l(`Edit occurrence`),icon:`pencil`,onSelect:N},{label:l(u?`Processing...`:`Edit this and following occurrences`),icon:`calendar-pen`,onSelect:()=>void te()},{label:l(A?`Restore occurrence`:`Cancel occurrence`),icon:A?`rotate-left`:`ban`,onSelect:()=>void P()}),ie.push({label:l(a?`Deleting...`:`Delete`),icon:`trash`,destructive:!0,onSelect:()=>{E?re():window.confirm(l(`Are you sure you want to delete this event?`))&&ne()}}),(0,Y.jsxs)(ka,{children:[(0,Y.jsx)(ja,{type:`button`,className:`icon`,"data-icon":`remove`,"aria-label":l(`Close`),title:l(`Close`),disabled:h,onClick:n}),(0,Y.jsx)(`h1`,{className:B(`event-title`,A&&`is-cancelled`),children:g.title}),x&&(0,Y.jsxs)(`div`,{className:`calendar-label`,children:[(0,Y.jsx)(`span`,{className:`calendar-label-dot`,style:{backgroundColor:w},"aria-hidden":`true`}),(0,Y.jsx)(`span`,{children:x})]}),(A||j)&&(0,Y.jsx)(`div`,{className:B(`occurrence-status`,!A&&`is-edited`),children:l(A?`This occurrence is cancelled.`:`This occurrence has its own changes.`)}),(0,Y.jsx)(`hr`,{}),(0,Y.jsxs)(`div`,{children:[(0,Y.jsxs)(`b`,{children:[l(`Starts`),`:`]}),` `,je(t(g.start),k,{locale:f()}),(0,Y.jsx)(`br`,{}),(0,Y.jsxs)(`b`,{children:[l(`Ends`),`:`]}),` `,je(t(T),k,{locale:f()})]}),D&&(0,Y.jsxs)(`div`,{children:[(0,Y.jsxs)(`b`,{children:[l(`Repeats`),`:`]}),` `,D]}),(S||C)&&(0,Y.jsxs)(`dl`,{className:`event-details`,children:[S&&(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(`dt`,{children:l(`Location`)}),(0,Y.jsx)(`dd`,{className:`event-location`,children:S})]}),C&&(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(`dt`,{children:l(`Description`)}),(0,Y.jsx)(`dd`,{className:`event-description`,children:C})]})]}),(0,Y.jsx)(`hr`,{}),(0,Y.jsxs)(Aa,{children:[(0,Y.jsx)(`a`,{href:g.url,className:B(`btn submit`,h&&`disabled`),"aria-disabled":h,onClick:e=>{h&&e.preventDefault()},children:l(`Edit Event`)}),(0,Y.jsx)(Ia,{actions:ie,disabled:h})]})]})},Ra=new Intl.DateTimeFormat(f().code,{weekday:`short`,timeZone:`UTC`}),za=new Intl.DateTimeFormat(f().code,{day:`numeric`,timeZone:`UTC`}),Ba=new Intl.DateTimeFormat(f().code,{weekday:`long`,timeZone:`UTC`}),Va=new Intl.DateTimeFormat(f().code,{month:`long`,year:`numeric`,timeZone:`UTC`}),Ha={dayGridMonth:{dayHeaderFormat:{weekday:`long`}},listMonth:{displayEventEnd:!0,listDayFormat:{weekday:`long`,month:`long`,day:`numeric`},listDaySideFormat:!1}},Ua={closeDelayMs:300,position:[`bottom`,`top`,`right`,`left`]},Wa=e=>{let t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}:00`},Ga=e=>!!(e.extendedProps?.rrule||e.extendedProps?.repeats),Ka=({hiddenCalendarIds:e,selectedDate:t,onDateChange:n,miniDateSelection:r,onMiniDateSelectionHandled:i})=>{let{hidePopover:a,showPopover:o}=oi(),{view:l,setView:u,isReady:d}=$i(),{currentDay:f,language:p,formats:h,weekStartDay:_,overlapThresholdString:v,allDayDefault:y,eventDuration:b,timeInterval:x,canEditEvents:S,isDragAndDropEnabled:C,isQuickCreateEnabled:w,currentSiteId:T}=$(),E=S&&w,D=(0,V.useRef)(null),O=e.join(`,`),k=(0,V.useRef)(null),A=(0,V.useRef)(void 0),j=(0,V.useRef)(!1),ee=(0,V.useRef)(0),[M,N]=(0,V.useState)(null),[te,P]=(0,V.useState)(null),[F,ne]=(0,V.useState)(!1),[I,ae]=(0,V.useState)(ha),[L,oe]=(0,V.useState)(!1),ce=(0,V.useCallback)(()=>D.current?.getApi(),[D.current]),le=(0,V.useMemo)(()=>ce(),[ce]),ue=(0,V.useMemo)(()=>({alignment:`center`,position:[`right`,`left`,`bottom`,`top`]}),[]),{datePickerButton:de,dateSelector:pe}=ra(le),he=(0,V.useMemo)(()=>new Set(e),[e]),ge=Wa(x),_e=(0,V.useMemo)(()=>me(he,T,void 0,I),[he,T,I]),ve=(0,V.useMemo)(()=>Hi(le,{datePickerButton:de}),[de,le]),R=(0,V.useCallback)(()=>{D.current?.getApi().refetchEvents()},[]),be=da(R),{add:xe,run:Se,busy:z}=be,[Ce,Ee]=(0,V.useState)(!1),B=(0,V.useCallback)(()=>{N(null),P(null)},[]);(0,V.useEffect)(()=>{if(!d)return;let e=D.current?.getApi();if(e){if(k.current===null){k.current=O;return}k.current!==O&&(k.current=O,e.refetchEvents())}},[O,d]);let Oe=(0,V.useCallback)(()=>{B(),a()},[B,a]),ke=(0,V.useCallback)(e=>{if(e===I)return;clearTimeout(A.current),Oe(),ae(e);let t=new URL(window.location.href);e?t.searchParams.set(`search`,e):t.searchParams.delete(`search`),history.replaceState(null,``,t)},[I,Oe]);(0,V.useEffect)(()=>{let e=D.current?.getApi();if(!e)return;let t=e.getEvents().find(e=>Q(e));if(!M){t?.remove();return}if(t){Ri(t,M);return}e.addEvent(Mi(M))},[M]),(0,V.useEffect)(()=>{if(!M){a();return}if(!te){a();return}o((0,Y.jsx)(Oa,{draft:M,onChange:N,refetchEvents:R,onConfirm:B,onCancel:Oe}),te,ue)},[Oe,B,M,te,a,ue,R,o]);let Ae=(0,V.useCallback)(e=>{a(),e.view.calendar.getEvents().find(e=>Q(e))?.remove(),P(null),N(ji(e,{allDayDefault:y,eventDuration:b})),e.view.calendar.unselect()},[y,b,a]),je=(0,V.useCallback)(e=>{e.jsEvent.detail<2||(a(),le.getEvents().find(e=>Q(e))?.remove(),P(null),N(ji({start:e.date,end:e.allDay?De(e.date,1):e.date,allDay:e.allDay},{allDayDefault:y,eventDuration:b})))},[le,y,b,a]);(0,V.useEffect)(()=>()=>clearTimeout(A.current),[]),(0,V.useEffect)(()=>{let e=D.current?.getApi();!e||!r||(e.changeView(e.view.type===`listMonth`?`listMonth`:`timeGridDay`,r),Bi(r),i())},[r,i]),(0,V.useEffect)(()=>{let e=D.current?.getApi();!e||g(e.getDate())===g(t)||e.gotoDate(t)},[t]);let Me=(0,V.useCallback)(()=>clearTimeout(A.current),[]),Ne=(0,V.useCallback)(()=>{j.current=!0,clearTimeout(A.current),a()},[a]),Pe=(0,V.useCallback)(()=>{j.current=!1},[]),Fe=(0,V.useCallback)(e=>{Q(e.event)&&P(e.el)},[]),Le=(0,V.useCallback)(e=>{Q(e.event)&&P(t=>t===e.el?null:t)},[]),Re=(0,V.useCallback)((e,t)=>{if(Q(t.event)||z){t.revert();return}let n=async n=>{let r={event:t.event,recurrenceId:ye(String(t.event.id)),scope:n,siteId:T,refetchEvents:R,revert:t.revert,onHistoryEntry:xe},i=!1,a=await Se(()=>(i=!0,e===`move`?re(r):ie({...r,oldEvent:t.oldEvent})));return i||t.revert(),a};if(!Ga(t.event)){n();return}Ee(!0),o((0,Y.jsx)(Fa,{action:e,onSelect:async e=>{let t=await n(e);return Ee(!1),t||a(),t},onCancel:()=>{t.revert(),Ee(!1)}},++ee.current),t.jsEvent)},[T,a,R,o,xe,Se,z]),ze=(0,V.useCallback)(e=>{let t=s(e);Bi(t),D.current?.getApi().changeView(`timeGridDay`,t)},[]),Be=(0,V.useCallback)(e=>e.view.type===`timeGridWeek`&&g(e.date)===g(f)?[`fc-title-today`]:[],[f]),Ve=(0,V.useCallback)(e=>{if(e.view.type===`listMonth`){let t=e;return(0,Y.jsxs)(`a`,{...t.navLinkAttrs,href:Craft.getCpUrl(`calendar/${c(e.date)}/day`),id:t.textId,className:`calendar-agenda-day`,"aria-label":e.text,children:[(0,Y.jsx)(`span`,{className:`calendar-agenda-day-number`,"aria-hidden":`true`,children:za.format(e.date)}),(0,Y.jsxs)(`span`,{className:`calendar-agenda-day-label`,"aria-hidden":`true`,children:[(0,Y.jsx)(`span`,{children:Ba.format(e.date)}),(0,Y.jsx)(`span`,{className:`calendar-agenda-day-month`,children:Va.format(e.date)})]})]})}if(e.view.type!==`timeGridWeek`)return e.text;let t=Ra.format(e.date),n=za.format(e.date);return(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(`span`,{className:`fc-day-header-label`,children:t}),(0,Y.jsx)(`span`,{className:`fc-day-header-date`,children:n})]})},[]);if(!d)return null;let He=document.querySelector(`[data-calendar-history-root]`),Ue=S&&C?(0,Y.jsx)(ma,{canUndo:be.canUndo,canRedo:be.canRedo,disabled:z||F||Ce||M!==null,onReplay:e=>{a(),be.replay(e)}}):null,We=document.querySelector(`[data-calendar-search-root]`),Ge=(0,Y.jsx)(ga,{initialSearch:I,onSearchChange:ke});return(0,Y.jsxs)(Ie,{className:F?`is-fetching-events`:void 0,children:[We?(0,ci.createPortal)(Ge,We):Ge,He?(0,ci.createPortal)(Ue,He):Ue,(0,Y.jsx)(fe,{...m(),ref:D,themeSystem:`bootstrap5`,plugins:[se,Te,Si,we],customButtons:ve,initialView:l,initialDate:f,height:l===`listMonth`?`auto`:void 0,locale:p,views:Ha,timeZone:`UTC`,firstDay:_,nextDayThreshold:v,fixedWeekCount:!0,dayMaxEventRows:!0,editable:S&&C&&!z&&!Ce&&!F,selectable:E,selectMirror:!1,selectMinDistance:5,slotDuration:ge,snapDuration:ge,navLinks:!0,navLinkDayClick:ze,select:E?Ae:void 0,dateClick:E?je:void 0,dayHeaderClassNames:Be,dayHeaderContent:Ve,events:_e,eventClassNames:sa,eventContent:la,progressiveEventRendering:!0,eventTimeFormat:h.time.short.js,loading:e=>{e&&oe(!1),ne(e)},eventSourceFailure:()=>oe(!0),noEventsContent:()=>(0,Y.jsx)(`span`,{role:`status`,children:Craft.t(`calendar`,L?`Couldn’t load events. Use Refresh to try again.`:F?`Loading events…`:I?`No matching events in this date range.`:`No events in this date range.`)}),eventDidMount:Fe,eventWillUnmount:Le,eventMouseEnter:e=>{e.view.type!==`dayGridMonth`&&e.view.type!==`listMonth`||j.current||z||F||Ce||ca(e.event,e.jsEvent.target)!==`ignore`&&(clearTimeout(A.current),A.current=setTimeout(()=>o((0,Y.jsx)(La,{fcEvent:e}),e.el,Ua),300),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventMouseLeave:Me,eventDragStart:Ne,eventDragStop:Pe,eventResizeStart:Ne,eventResizeStop:Pe,eventClick:e=>{if(z||F||Ce){e.jsEvent.preventDefault();return}ca(e.event,e.jsEvent.target)===`open`&&(o((0,Y.jsx)(La,{fcEvent:e}),e.el),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventDrop:e=>Re(`move`,e),eventResize:e=>Re(`resize`,e),headerToolbar:{start:`title`,center:`dayGridMonth,timeGridWeek,timeGridDay,listMonth`,end:Vi},buttonText:{dayGridMonth:Craft.t(`calendar`,`Month`),timeGridWeek:Craft.t(`calendar`,`Week`),timeGridDay:Craft.t(`calendar`,`Day`),listMonth:Craft.t(`calendar`,`Agenda`),today:Craft.t(`calendar`,`Today`)},datesSet:({view:e})=>{n(e.calendar.getDate()),setTimeout(()=>{u(e.type),Bi()},50)}}),pe]})},qa=r.div`
  color: var(--gray-600);
`,Ja=r.div`
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
`,Ya=r.button`
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
`,Xa=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 7px;

  span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
`,Za=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 4px;
`,Qa=r.button`
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
`,$a=(e,t,n)=>new Date(Date.UTC(e,t,n)),eo=e=>$a(e.getUTCFullYear(),e.getUTCMonth(),1),to=(e,t)=>$a(e.getUTCFullYear(),e.getUTCMonth()+t,1),no=({selectedDate:e,onDateSelect:t})=>{let{language:n,weekStartDay:r}=$(),[i,a]=(0,V.useState)(()=>eo(e));(0,V.useEffect)(()=>{a(eo(e))},[e]);let o=(0,V.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`long`,year:`numeric`,timeZone:`UTC`}),[n]),s=(0,V.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`narrow`,timeZone:`UTC`}),[n]),c=(0,V.useMemo)(()=>Array.from({length:7},(e,t)=>s.format($a(2023,0,1+r+t))),[r,s]),l=(0,V.useMemo)(()=>{let e=i.getUTCFullYear(),t=i.getUTCMonth(),n=$a(e,t,1),a=$a(e,t+1,0),o=(n.getUTCDay()-r+7)%7,s=((r+6)%7-a.getUTCDay()+7)%7,c=o+a.getUTCDate()+s;return Array.from({length:c},(n,r)=>$a(e,t,1-o+r))},[i,r]),u=g(new Date);return(0,Y.jsxs)(qa,{children:[(0,Y.jsxs)(Ja,{children:[(0,Y.jsx)(Ya,{"aria-label":Craft.t(`calendar`,`Previous month`),type:`button`,onClick:()=>a(e=>to(e,-1))}),(0,Y.jsx)(`span`,{children:o.format(i)}),(0,Y.jsx)(Ya,{"aria-label":Craft.t(`calendar`,`Next month`),type:`button`,$next:!0,onClick:()=>a(e=>to(e,1))})]}),(0,Y.jsx)(Xa,{children:c.map((e,t)=>(0,Y.jsx)(`span`,{children:e},`${e}-${t}`))}),(0,Y.jsx)(Za,{children:l.map(e=>{let r=g(e);return(0,Y.jsx)(Qa,{"aria-label":e.toLocaleDateString(n,{timeZone:`UTC`}),type:`button`,$isCurrentMonth:e.getUTCMonth()===i.getUTCMonth(),$isToday:r===u,onClick:()=>t(e),children:e.getUTCDate()},r)})})]})},ro=h`
  100% {
    transform: translateX(100%);
  }
`,io=r.div`
  position: relative;
  overflow: hidden;

  background: ${Le.gray200};

  &::after {
    content: "";

    position: absolute;
    inset: 0;

    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgb(from ${Le.gray050} r g b / 70%),
      transparent
    );

    animation: ${ro} 1.4s ${ze.easeInOut} infinite;
  }
`,ao=({width:e=`100%`,height:t=16,borderRadius:n=4,className:r})=>(0,Y.jsx)(io,{"aria-hidden":`true`,className:r,style:{borderRadius:n,height:t,width:e}}),oo=async e=>{let t=await _e(Zr(`/api/calendars`),{signal:e});if(!t.ok)throw Error(`Failed to fetch calendars`);return t.json()},so=()=>{let[e,t]=(0,V.useState)([]),[n,r]=(0,V.useState)(null),[i,a]=(0,V.useState)(!1),o=(0,V.useCallback)(async e=>{a(!0),r(null);try{let n=await oo(e);t(n)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;r(e instanceof Error?e:Error(`Failed to fetch calendars`))}finally{a(!1)}},[]);return(0,V.useEffect)(()=>{let e=new AbortController;return o(e.signal),()=>{e.abort()}},[o]),{data:e,error:n,isPending:i,refetch:o}},co=r.div`
  padding: 0;
`,lo=r.div`
  display: flex;
  flex-direction: column;
`,uo=r.hr`
  width: 100%;
  margin: 16px 0;
  border: 0;
  border-top: 1px solid var(--gray-200);
`,fo=r.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0;
  padding: 0;

  list-style: none;
`,po=r.li`
  margin: 0;
`,mo=r.label`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0;

  border-radius: 4px;

  color: ${Le.gray800};
  cursor: pointer;
`,ho=r.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);

  &:focus-visible + span {
    border: 2px solid ${Le.black};
  }

  &:checked + span {
    border: 1px solid var(--calendar-color);
  }

  &:checked + span:after {
    opacity: 1;
  }
`,go=r.span`
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
`,_o=r.span`
  font-size: 13px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,vo=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,yo=r.div`
  font-size: 13px;
  color: ${Le.error};
`,bo=({hiddenCalendarIds:e,onToggleCalendar:t})=>{let{data:n,error:r,isPending:i}=so(),a=new Set(e),o=i&&n.length===0;return(0,Y.jsxs)(co,{children:[o&&(0,Y.jsxs)(vo,{children:[(0,Y.jsx)(ao,{height:16}),(0,Y.jsx)(ao,{height:16}),(0,Y.jsx)(ao,{height:16})]}),!o&&r&&(0,Y.jsx)(yo,{children:r.message}),!o&&!r&&(0,Y.jsx)(fo,{children:n.map(e=>(0,Y.jsx)(po,{children:(0,Y.jsxs)(mo,{style:{"--calendar-color":e.color.base,"--calendar-color-contrast":e.color.contrast},children:[(0,Y.jsx)(ho,{type:`checkbox`,checked:!a.has(e.id),onChange:()=>t(e.id)}),(0,Y.jsx)(go,{}),(0,Y.jsx)(_o,{children:e.title})]})},e.id))})]})},xo=()=>{let e=document.querySelector(`[data-sidebar-root]`),{hiddenCalendarIds:t,toggleCalendarVisibility:n}=ea(),{currentDay:r}=$(),[i,a]=(0,V.useState)(()=>new Date(r)),[o,s]=(0,V.useState)(null);return(0,Y.jsxs)(si,{children:[(0,Y.jsx)(Ka,{hiddenCalendarIds:t,selectedDate:i,onDateChange:a,miniDateSelection:o,onMiniDateSelectionHandled:()=>s(null)}),e&&(0,ci.createPortal)((0,Y.jsxs)(lo,{children:[(0,Y.jsx)(bo,{hiddenCalendarIds:t,onToggleCalendar:n}),(0,Y.jsx)(uo,{}),(0,Y.jsx)(no,{selectedDate:i,onDateSelect:e=>{a(e),s(e)}})]}),e)]})},So=document.getElementById(`calendar-overview`),Co=So.querySelector(`[data-root]`),wo=So.querySelector(`[data-config]`),To=JSON.parse(wo?.textContent||`{}`);Qr.createRoot(Co).render((0,Y.jsx)(na,{config:To,children:(0,Y.jsx)(Er,{basename:Zr(`/`,!1),children:(0,Y.jsx)(zn,{children:(0,Y.jsxs)(Ln,{path:`/`,element:(0,Y.jsx)(Kr,{}),children:[(0,Y.jsx)(Ln,{index:!0,element:(0,Y.jsx)(xo,{})}),(0,Y.jsx)(Ln,{path:`overview`,element:(0,Y.jsx)(xo,{})}),(0,Y.jsx)(Ln,{path:`:year/:month/:day/:view?`,element:(0,Y.jsx)(xo,{})})]})})})}));