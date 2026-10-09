import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,b as c,i as l,j as u,k as d,n as f,r as p,t as m,w as h,y as g}from"./localization-Dt_HqhpZ.js";import{E as _,O as v,T as y,i as b,k as x,s as S,w as C}from"./calendar-preview.operations-B8u7G7d9.js";import{$t as w,A as T,Dt as E,F as D,Ft as O,G as k,Ht as A,Kt as j,Ot as M,Pt as N,Rt as P,S as F,Ut as ee,Y as te,Zt as ne,_ as re,_n as I,_t as ie,a as ae,c as oe,ct as L,d as se,dn as ce,f as le,h as ue,hn as de,i as R,l as fe,ln as pe,m as me,n as he,o as ge,p as _e,r as ve,s as ye,st as be,t as xe,u as Se,un as Ce,v as we,wt as Te,x as Ee,y as De,z as Oe}from"./calendar.events-DxgmBNw7.js";import{t as ke}from"./interaction-D2VE812o.js";import{t as Ae}from"./timegrid-Bwykp3PL.js";import{a as je,b as Me,c as z,f as Ne,n as Pe,o as B,p as V,r as Fe,s as Ie,t as Le}from"./components-CefPxcP5.js";import{n as Re,r as ze}from"./calendar.styles-DP1OTNWf.js";import{n as H,r as Be,t as Ve}from"./variables-CkfOKRDd.js";var He=`modulepreload`,Ue=function(e,t){return new URL(e,t).href},We={},Ge=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=Ue(t,n),t=s(t),t in We)return;We[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:He,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},U=i(e(),1),Ke=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,qe=/^[\\/]{2}/;function Je(e,t){return t+e.replace(/\\/g,`/`)}var Ye=`popstate`;function Xe(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function Ze(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return et(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:tt(t)}return rt(t,n,null,e)}function W(e,t){if(e===!1||e==null)throw Error(t)}function G(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function Qe(){return Math.random().toString(36).substring(2,10)}function $e(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function et(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?nt(t):t,state:n,key:t&&t.key||r||Qe(),mask:i}}function tt({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function nt(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function rt(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=Xe(e)?e:et(h.location,e,t);n&&n(r,e),l=u()+1;let d=$e(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=Xe(e)?e:et(h.location,e,t);n&&n(r,e),l=u();let i=$e(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return it(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(Ye,d),c=e,()=>{i.removeEventListener(Ye,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function it(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),W(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:tt(t);return i=i.replace(/ $/,`%20`),!n&&qe.test(i)&&(i=r+i),new URL(i,r)}function at(e,t,n=`/`){return ot(e,t,n,!1)}function ot(e,t,n,r,i){let a=K((typeof t==`string`?nt(t):t).pathname||`/`,n);if(a==null)return null;let o=i??ct(e),s=null,c=Tt(a);for(let e=0;s==null&&e<o.length;++e)s=xt(o[e],c,r);return s}function st(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function ct(e){let t=lt(e);return dt(t),t}function lt(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;W(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=q([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(W(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),lt(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:yt(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=wt(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of ut(e.path))a(e,t,!0,n)}),t}function ut(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=ut(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function dt(e){e.sort((e,t)=>e.score===t.score?bt(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ft=/^:[\w-]+$/,pt=3,mt=2,ht=1,gt=10,_t=-2,vt=e=>e===`*`;function yt(e,t){let n=e.split(`/`),r=n.length;return n.some(vt)&&(r+=_t),t&&(r+=mt),n.filter(e=>!vt(e)).reduce((e,t)=>e+(ft.test(t)?pt:t===``?ht:gt),r)}function bt(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function xt(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?Ct(u,l,s.matcher,s.compiledParams):St(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=St({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:q([a,d.pathname]),pathnameBase:Pt(q([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=q([a,d.pathnameBase]))}return o}function St(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=wt(e.path,e.caseSensitive,e.end);return Ct(e,t,n,r)}function Ct(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function wt(e,t=!1,n=!0){G(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Tt(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return G(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function K(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Et(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?nt(e):e,a;return n?(n=Mt(n),a=n.startsWith(`/`)?Dt(n.substring(1),`/`):Dt(n,t)):a=t,{pathname:a,search:Ft(r),hash:It(i)}}function Dt(e,t){let n=Nt(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Ot(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function kt(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function At(e){let t=kt(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function jt(e,t,n,r=!1){let i;typeof e==`string`?i=nt(e):(i={...e},W(!i.pathname||!i.pathname.includes(`?`),Ot(`?`,`pathname`,`search`,i)),W(!i.pathname||!i.pathname.includes(`#`),Ot(`#`,`pathname`,`hash`,i)),W(!i.search||!i.search.includes(`#`),Ot(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Et(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Mt=e=>e.replace(/[\\/]{2,}/g,`/`),q=e=>Mt(e.join(`/`)),Nt=e=>e.replace(/\/+$/,``),Pt=e=>Nt(e).replace(/^\/*/,`/`),Ft=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,It=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Lt=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Rt(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function zt(e){return q(e.map(e=>e.route.path).filter(Boolean))||`/`}var Bt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Vt(e,t){let n=e;if(typeof n!=`string`||!Ke.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Bt)try{let e=new URL(window.location.href),r=qe.test(n)?new URL(Je(n,e.protocol)):new URL(n),a=K(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{G(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ht=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ht);var Ut=[`GET`,...Ht];new Set(Ut);var Wt=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Gt(e){try{return Wt.includes(new URL(e).protocol)}catch{return!1}}var Kt=U.createContext(null);Kt.displayName=`DataRouter`;var qt=U.createContext(null);qt.displayName=`DataRouterState`;var Jt=U.createContext(!1);function Yt(){return U.useContext(Jt)}var Xt=U.createContext({isTransitioning:!1});Xt.displayName=`ViewTransition`;var Zt=U.createContext(new Map);Zt.displayName=`Fetchers`;var Qt=U.createContext(null);Qt.displayName=`Await`;var J=U.createContext(null);J.displayName=`Navigation`;var $t=U.createContext(null);$t.displayName=`Location`;var Y=U.createContext({outlet:null,matches:[],isDataRoute:!1});Y.displayName=`Route`;var en=U.createContext(null);en.displayName=`RouteError`;var tn=`REACT_ROUTER_ERROR`,nn=`REDIRECT`,rn=`ROUTE_ERROR_RESPONSE`;function an(e){if(e.startsWith(`${tn}:${nn}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function on(e){if(e.startsWith(`${tn}:${rn}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Lt(t.status,t.statusText,t.data)}catch{}}function sn(e,{relative:t}={}){W(cn(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=U.useContext(J),{hash:i,pathname:a,search:o}=hn(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:q([n,a])),r.createHref({pathname:s,search:o,hash:i})}function cn(){return U.useContext($t)!=null}function X(){return W(cn(),`useLocation() may be used only in the context of a <Router> component.`),U.useContext($t).location}var ln=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function un(e){U.useContext(J).static||U.useLayoutEffect(e)}function dn(){let{isDataRoute:e}=U.useContext(Y);return e?Pn():fn()}function fn(){W(cn(),`useNavigate() may be used only in the context of a <Router> component.`);let e=U.useContext(Kt),{basename:t,navigator:n}=U.useContext(J),{matches:r}=U.useContext(Y),{pathname:i}=X(),a=JSON.stringify(At(r)),o=U.useRef(!1);return un(()=>{o.current=!0}),U.useCallback((r,s={})=>{if(G(o.current,ln),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=jt(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:q([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var pn=U.createContext(null);function mn(e){let t=U.useContext(Y).outlet;return U.useMemo(()=>t&&U.createElement(pn.Provider,{value:e},t),[t,e])}function hn(e,{relative:t}={}){let{matches:n}=U.useContext(Y),{pathname:r}=X(),i=JSON.stringify(At(n));return U.useMemo(()=>jt(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function gn(e,t){return _n(e,t)}function _n(e,t,n){W(cn(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=U.useContext(J),{matches:i}=U.useContext(Y),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;In(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=X(),d;if(t){let e=typeof t==`string`?nt(t):t;W(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):at(e,{pathname:p});G(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),G(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=wn(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:q([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:q([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?U.createElement($t.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function vn(){let e=Nn(),t=Rt(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=U.createElement(U.Fragment,null,U.createElement(`p`,null,`💿 Hey developer 👋`),U.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,U.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,U.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),U.createElement(U.Fragment,null,U.createElement(`h2`,null,`Unexpected Application Error!`),U.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?U.createElement(`pre`,{style:i},n):null,o)}var yn=U.createElement(vn,null),bn=class extends U.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=on(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:U.createElement(Y.Provider,{value:this.props.routeContext},U.createElement(en.Provider,{value:e,children:this.props.component}));return this.context?U.createElement(Sn,{error:e},t):t}};bn.contextType=Jt;var xn=new WeakMap;function Sn({children:e,error:t}){let{basename:n}=U.useContext(J);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=an(t.digest);if(e){let r=xn.get(t);if(r)throw r;let i=Vt(e.location,n),a=i.absoluteURL||i.to;if(Gt(a))throw Error(`Invalid redirect location`);if(Bt&&!xn.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw xn.set(t,n),n}return U.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function Cn({routeContext:e,match:t,children:n}){let r=U.useContext(Kt);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),U.createElement(Y.Provider,{value:e},n)}function wn(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);W(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:zt(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||yn,o&&(s<0&&c===0?(In(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?U.createElement(n.route.Component,null):n.route.element?n.route.element:e,U.createElement(Cn,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?U.createElement(bn,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Tn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function En(e){let t=U.useContext(Kt);return W(t,Tn(e)),t}function Dn(e){let t=U.useContext(qt);return W(t,Tn(e)),t}function On(e){let t=U.useContext(Y);return W(t,Tn(e)),t}function kn(e){let t=On(e),n=t.matches[t.matches.length-1];return W(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function An(){return kn(`useRouteId`)}function jn(){let e=Dn(`useNavigation`);return U.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function Mn(){let{matches:e,loaderData:t}=Dn(`useMatches`);return U.useMemo(()=>e.map(e=>st(e,t)),[e,t])}function Nn(){let e=U.useContext(en),t=Dn(`useRouteError`),n=kn(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Pn(){let{router:e}=En(`useNavigate`),t=kn(`useNavigate`),n=U.useRef(!1);return un(()=>{n.current=!0}),U.useCallback(async(r,i={})=>{G(n.current,ln),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Fn={};function In(e,t,n){!t&&!Fn[e]&&(Fn[e]=!0,G(!1,n))}U.memo(Ln);function Ln({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return _n(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Rn(e){return mn(e.context)}function zn(e){W(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Bn({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){W(!cn(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=U.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=nt(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=U.useMemo(()=>{let e=K(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return G(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:U.createElement(J.Provider,{value:c},U.createElement($t.Provider,{children:t,value:h}))}function Vn({children:e,location:t}){return gn(Hn(e),t)}U.Component;function Hn(e,t=[]){let n=[];return U.Children.forEach(e,(e,r)=>{if(!U.isValidElement(e))return;let i=[...t,r];if(e.type===U.Fragment){n.push.apply(n,Hn(e.props.children,i));return}W(e.type===zn,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),W(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Hn(e.props.children,i)),n.push(a)}),n}var Un=`get`,Wn=`application/x-www-form-urlencoded`;function Gn(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Kn(e){return Gn(e)&&e.tagName.toLowerCase()===`button`}function qn(e){return Gn(e)&&e.tagName.toLowerCase()===`form`}function Jn(e){return Gn(e)&&e.tagName.toLowerCase()===`input`}function Yn(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Xn(e,t){return e.button===0&&(!t||t===`_self`)&&!Yn(e)}var Zn=null;function Qn(){if(Zn===null)try{new FormData(document.createElement(`form`),0),Zn=!1}catch{Zn=!0}return Zn}var $n=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function er(e){return e!=null&&!$n.has(e)?(G(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Wn}"`),null):e}function tr(e,t){let n,r,i,a,o;if(qn(e)){let o=e.getAttribute(`action`);r=o?K(o,t):null,n=e.getAttribute(`method`)||Un,i=er(e.getAttribute(`enctype`))||Wn,a=new FormData(e)}else if(Kn(e)||Jn(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?K(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Un,i=er(e.getAttribute(`formenctype`))||er(o.getAttribute(`enctype`))||Wn,a=new FormData(o,e),!Qn()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Gn(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Un,r=null,i=Wn,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var nr={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},rr=/[&><\u2028\u2029]/g;function ir(e){return e.replace(rr,e=>nr[e])}function ar(e,t){if(e===!1||e==null)throw Error(t)}function or(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&K(i.pathname,t)===`/`?i.pathname=`${Nt(t)}/_root.${r}`:i.pathname=`${Nt(i.pathname)}.${r}`,i}async function sr(e,t){if(e.id in t)return t[e.id];try{let n=await Ge(()=>import(e.module),[],import.meta.url);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function cr(e){return e!=null&&typeof e.page==`string`}function lr(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function ur(e,t,n){return hr((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await sr(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(lr).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function dr(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function fr(e,t,{includeHydrateFallback:n}={}){return pr(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function pr(e){return[...new Set(e)]}function mr(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function hr(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!cr(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(mr(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function gr(){let e=U.useContext(Kt);return ar(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function _r(){let e=U.useContext(qt);return ar(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var vr=U.createContext(void 0);vr.displayName=`FrameworkContext`;function yr(){let e=U.useContext(vr);return ar(e,`You must render this element inside a <HydratedRouter> element`),e}function br(e,t){let n=U.useContext(vr),[r,i]=U.useState(!1),[a,o]=U.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=U.useRef(null);U.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),U.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:xr(s,p),onBlur:xr(c,m),onMouseEnter:xr(l,p),onMouseLeave:xr(u,m),onTouchStart:xr(d,p)}]:[a,f,{}]:[!1,f,{}]}function xr(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Sr({page:e,...t}){let n=Yt(),{nonce:r}=yr(),{router:i}=gr(),a=U.useMemo(()=>at(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?U.createElement(wr,{page:e,matches:a,...t}):U.createElement(Tr,{page:e,matches:a,...t})):null}function Cr(e){let{manifest:t,routeModules:n}=yr(),[r,i]=U.useState([]);return U.useEffect(()=>{let r=!1;return ur(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function wr({page:e,matches:t,...n}){let r=X(),{future:i}=yr(),{basename:a}=gr(),o=U.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=or(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return U.createElement(U.Fragment,null,o.map(e=>U.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function Tr({page:e,matches:t,...n}){let r=X(),{future:i,manifest:a,routeModules:o}=yr(),{basename:s}=gr(),{loaderData:c,matches:l}=_r(),u=U.useMemo(()=>dr(e,t,l,a,r,`data`),[e,t,l,a,r]),d=U.useMemo(()=>dr(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=U.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=or(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=U.useMemo(()=>fr(d,a),[d,a]),m=Cr(d);return U.createElement(U.Fragment,null,f.map(e=>U.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>U.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>U.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Er(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}U.Component;var Dr=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Dr&&(window.__reactRouterVersion=`7.18.1`)}catch{}function Or({basename:e,children:t,useTransitions:n,window:r}){let i=U.useRef();i.current??(i.current=Ze({window:r,v5Compat:!0}));let a=i.current,[o,s]=U.useState({action:a.action,location:a.location}),c=U.useCallback(e=>{n===!1?s(e):U.startTransition(()=>s(e))},[n]);return U.useLayoutEffect(()=>a.listen(c),[a,c]),U.createElement(Bn,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function kr({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=U.useState({action:n.action,location:n.location}),o=U.useCallback(e=>{r===!1?a(e):U.startTransition(()=>a(e))},[r]);return U.useLayoutEffect(()=>n.listen(o),[n,o]),U.createElement(Bn,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}kr.displayName=`unstable_HistoryRouter`;var Ar=U.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=U.useContext(J),v=typeof l==`string`&&Ke.test(l),y=Vt(l,h);l=y.to;let b=sn(l,{relative:r}),x=X(),S=null;if(o){let e=jt(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:q([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=br(n,p),E=Lr(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let O=!(y.isExternal||i),k=U.createElement(`a`,{...p,...T,href:(O?S:void 0)||y.absoluteURL||b,onClick:O?D:e,ref:Er(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?U.createElement(U.Fragment,null,k,U.createElement(Sr,{page:b})):k});Ar.displayName=`Link`;var jr=U.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=hn(a,{relative:c.relative}),d=X(),f=U.useContext(qt),{navigator:p,basename:m}=U.useContext(J),h=f!=null&&qr(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=K(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return U.createElement(Ar,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});jr.displayName=`NavLink`;var Mr=U.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Un,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=U.useContext(J),g=Br(),_=Vr(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&Ke.test(s);return U.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?U.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});Mr.displayName=`Form`;function Nr({getKey:e,storageKey:t,...n}){let r=U.useContext(vr),{basename:i}=U.useContext(J),a=X(),o=Mn();Gr({getKey:e,storageKey:t});let s=U.useMemo(()=>{if(!r||!e)return null;let t=Wr(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),U.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${ir(JSON.stringify(t||Hr))}, ${ir(JSON.stringify(s))})`}})}Nr.displayName=`ScrollRestoration`;function Pr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Fr(e){let t=U.useContext(Kt);return W(t,Pr(e)),t}function Ir(e){let t=U.useContext(qt);return W(t,Pr(e)),t}function Lr(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=dn(),d=X(),f=hn(e,{relative:o});return U.useCallback(p=>{if(Xn(p,t)){p.preventDefault();let t=n===void 0?tt(d)===tt(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?U.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Rr=0,zr=()=>`__${String(++Rr)}__`;function Br(){let{router:e}=Fr(`useSubmit`),{basename:t}=U.useContext(J),n=An(),r=e.fetch,i=e.navigate;return U.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=tr(e,t);if(a.navigate===!1){let e=a.fetcherKey||zr();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Vr(e,{relative:t}={}){let{basename:n}=U.useContext(J),r=U.useContext(Y);W(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...hn(e||`.`,{relative:t})},o=X();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:q([n,a.pathname])),tt(a)}var Hr=`react-router-scroll-positions`,Ur={};function Wr(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:K(e.pathname,n)||e.pathname},t)),i??(i=e.key),i}function Gr({getKey:e,storageKey:t}={}){let{router:n}=Fr(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Ir(`useScrollRestoration`),{basename:a}=U.useContext(J),o=X(),s=Mn(),c=jn();U.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Kr(U.useCallback(()=>{if(c.state===`idle`){let t=Wr(o,s,a,e);Ur[t]=window.scrollY}try{sessionStorage.setItem(t||Hr,JSON.stringify(Ur))}catch(e){G(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(U.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Hr);e&&(Ur=JSON.parse(e))}catch{}},[t]),U.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Ur,()=>window.scrollY,e?(t,n)=>Wr(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),U.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{G(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Kr(e,t){let{capture:n}=t||{};U.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function qr(e,{relative:t}={}){let n=U.useContext(Xt);W(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Fr(`useViewTransitionState`),i=hn(e,{relative:t});if(!n.isTransitioning)return!1;let a=K(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=K(n.nextLocation.pathname,r)||n.nextLocation.pathname;return St(i.pathname,o)!=null||St(i.pathname,a)!=null}var Z=a(),Jr=()=>(0,Z.jsx)(Rn,{}),Yr=u(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),Xr=u((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),Zr=i(u(((e,t)=>{var n=Yr(),r=Xr(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function u(e){return(e||``).toString().replace(i,``)}var d=[[`#`,`hash`],[`?`,`query`],function(e,t){return m(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],f={hash:1,query:1};function p(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new _(unescape(e.pathname),{});else if(r===`string`)for(i in n=new _(e,{}),f)delete n[i];else if(r===`object`){for(i in e)i in f||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function m(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function h(e,t){e=u(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):m(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&m(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||m(r),slashesCount:s,rest:l}}function g(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function _(e,t,i){if(e=u(e),e=e.replace(a,``),!(this instanceof _))return new _(e,t,i);var o,s,c,f,v,y,b=d.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=p(t),s=h(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||l.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!m(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(f=b[C],typeof f==`function`){e=f(e,S);continue}c=f[0],y=f[1],c===c?typeof c==`string`?(v=c===`@`?e.lastIndexOf(c):e.indexOf(c),~v&&(typeof f[2]==`number`?(S[y]=e.slice(0,v),e=e.slice(v+f[2])):(S[y]=e.slice(v),e=e.slice(0,v)))):(v=c.exec(e))&&(S[y]=v[1],e=e.slice(0,v.index)):S[y]=e,S[y]=S[y]||o&&f[3]&&t[y]||``,f[4]&&(S[y]=S[y].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=g(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&m(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(v=S.auth.indexOf(`:`),~v?(S.username=S.auth.slice(0,v),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(v+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&m(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function v(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&m(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function y(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||m(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&m(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}_.prototype={set:v,toString:y},_.extractProtocol=h,_.location=p,_.trimLeft=u,_.qs=r,t.exports=_}))()),Qr=window.location.href.replace(/(.*\/calendar).*/i,`$1`),$r=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,Zr.default)(`${Qr}${e}`);return t?n.href:n.pathname},ei=i(n()),ti=14,ni=e=>{if(e instanceof MouseEvent){let t=e.target;if(t instanceof HTMLElement){let n=t.getBoundingClientRect(),r=n.left+e.offsetX,i=n.top+e.offsetY;return new DOMRect(r,i,1,1)}return new DOMRect(e.clientX,e.clientY,1,1)}return e.getBoundingClientRect()},ri=({state:e,bridgeRef:t,popoverRef:n})=>{let[r,i]=(0,U.useState)(),a=(0,U.useMemo)(()=>{if(e)return v(e.options)},[e]),o=(0,U.useCallback)(()=>{if(!e||!a){i(void 0);return}let r=t.current,o=n.current;if(!r||!o)return;let s=ni(e.anchor),c=o.getBoundingClientRect(),l=r.getBoundingClientRect(),u=x({anchorRect:s,popoverRect:c,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:a,arrowPadding:ti});i({...u,top:u.top-l.top,left:u.left-l.left})},[e,a,t,n]);return(0,U.useLayoutEffect)(()=>{o()},[o]),(0,U.useEffect)(()=>{if(!e)return;let t=()=>o();return window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0)}},[e,o]),r},ii=r.div`
  position: relative;
`,ai=r.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`,oi=r.span`
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
`,si=(0,U.createContext)(null),ci=()=>{let e=(0,U.useContext)(si);if(!e)throw Error(`usePopover must be used within a PopoverProvider`);return e},li=({children:e})=>{let[t,n]=(0,U.useState)(),r=(0,U.useRef)(null),i=(0,U.useRef)(null),a=(0,U.useRef)(void 0),o=(0,U.useRef)(!1),s=(0,U.useCallback)((e,t,r)=>{clearTimeout(a.current),o.current=!1,n({content:e,anchor:t,options:r})},[]),c=(0,U.useCallback)(()=>{clearTimeout(a.current),n(void 0)},[]),l=(0,U.useCallback)(()=>{clearTimeout(a.current),o.current=!0},[]),u=(0,U.useMemo)(()=>({showPopover:s,hidePopover:c,keepPopoverOpen:l}),[s,c,l]),d=ri({state:t,bridgeRef:r,popoverRef:i}),f=t?.options?.closeDelayMs,p=(0,U.useCallback)(()=>clearTimeout(a.current),[]),m=(0,U.useCallback)(()=>{f===void 0||o.current||(clearTimeout(a.current),a.current=setTimeout(()=>n(void 0),f))},[f]);(0,U.useEffect)(()=>{let e=t?.anchor;if(!(f===void 0||!(e instanceof HTMLElement)))return e.addEventListener(`mouseleave`,m),()=>e.removeEventListener(`mouseleave`,m)},[t,f,m]),(0,U.useEffect)(()=>()=>clearTimeout(a.current),[]);let h=t?.content&&(0,Z.jsxs)(ai,{ref:i,onMouseEnter:p,onMouseLeave:m,style:{top:d?.top??0,left:d?.left??0,visibility:d?`visible`:`hidden`},children:[d&&(0,Z.jsx)(oi,{side:d.arrow.side,top:d.arrow.top,left:d.arrow.left}),t.content]});return(0,Z.jsx)(si.Provider,{value:u,children:(0,Z.jsxs)(ii,{ref:r,children:[h,e]})})},ui=i(d()),di=class extends De{constructor(){super(...arguments),this.state={textId:P()}}render(){let{theme:e,dateEnv:t,options:n,viewApi:r}=this.context,{cellId:i,dayDate:a,todayRange:o}=this.props,{textId:s}=this.state,c=E(a,o),l=n.listDayFormat?t.format(a,n.listDayFormat):``,u=n.listDaySideFormat?t.format(a,n.listDaySideFormat):``,d=Object.assign({date:t.toDate(a),view:r,textId:s,text:l,sideText:u,navLinkAttrs:be(this.context,a),sideNavLinkAttrs:be(this.context,a,`day`,!1)},c);return I(Ee,{elTag:`tr`,elClasses:[`fc-list-day`,...M(c,e)],elAttrs:{"data-date":Te(a)},renderProps:d,generatorName:`dayHeaderContent`,customGenerator:n.dayHeaderContent,defaultGenerator:fi,classNameGenerator:n.dayHeaderClassNames,didMount:n.dayHeaderDidMount,willUnmount:n.dayHeaderWillUnmount},t=>I(`th`,{scope:`colgroup`,colSpan:3,id:i,"aria-labelledby":s},I(t,{elTag:`div`,elClasses:[`fc-list-day-cushion`,e.getClass(`tableCellShaded`)]})))}};function fi(e){return I(de,null,e.text&&I(`a`,Object.assign({id:e.textId,className:`fc-list-day-text`},e.navLinkAttrs),e.text),e.sideText&&I(`a`,Object.assign({"aria-hidden":!0,className:`fc-list-day-side-text`},e.sideNavLinkAttrs),e.sideText))}var pi=ie({hour:`numeric`,minute:`2-digit`,meridiem:`short`}),mi=class extends De{render(){let{props:e,context:t}=this,{options:n}=t,{seg:r,timeHeaderId:i,eventHeaderId:a,dateHeaderId:o}=e,s=n.eventTimeFormat||pi;return I(T,Object.assign({},e,{elTag:`tr`,elClasses:[`fc-list-event`,r.eventRange.def.url&&`fc-event-forced-url`],defaultGenerator:()=>hi(r,t),seg:r,timeText:``,disableDragging:!0,disableResizing:!0}),(e,n)=>I(de,null,gi(r,s,t,i,o),I(`td`,{"aria-hidden":!0,className:`fc-list-event-graphic`},I(`span`,{className:`fc-list-event-dot`,style:{borderColor:n.borderColor||n.backgroundColor}})),I(e,{elTag:`td`,elClasses:[`fc-list-event-title`],elAttrs:{headers:`${a} ${o}`}})))}};function hi(e,t){let n=N(e,t);return I(`a`,Object.assign({},n),e.eventRange.def.title)}function gi(e,t,n,r,i){let{options:a}=n;if(a.displayEventTime!==!1){let o=e.eventRange.def,s=e.eventRange.instance,c=!1,l;if(o.allDay?c=!0:ne(e.eventRange.range)?e.isStart?l=L(e,t,n,null,null,s.range.start,e.end):e.isEnd?l=L(e,t,n,null,null,e.start,s.range.end):c=!0:l=L(e,t,n),c){let e={text:n.options.allDayText,view:n.viewApi};return I(Ee,{elTag:`td`,elClasses:[`fc-list-event-time`],elAttrs:{headers:`${r} ${i}`},renderProps:e,generatorName:`allDayContent`,customGenerator:a.allDayContent,defaultGenerator:_i,classNameGenerator:a.allDayClassNames,didMount:a.allDayDidMount,willUnmount:a.allDayWillUnmount})}return I(`td`,{className:`fc-list-event-time`},l)}return null}function _i(e){return e.text}var vi=class extends F{constructor(){super(...arguments),this.computeDateVars=w(bi),this.eventStoreToSegs=w(this._eventStoreToSegs),this.state={timeHeaderId:P(),eventHeaderId:P(),dateHeaderIdRoot:P()},this.setRootEl=e=>{e?this.context.registerInteractiveComponent(this,{el:e}):this.context.unregisterInteractiveComponent(this)}}render(){let{props:e,context:t}=this,{dayDates:n,dayRanges:r}=this.computeDateVars(e.dateProfile),i=this.eventStoreToSegs(e.eventStore,e.eventUiBases,r);return I(k,{elRef:this.setRootEl,elClasses:[`fc-list`,t.theme.getClass(`table`),t.options.stickyHeaderDates===!1?``:`fc-list-sticky`],viewSpec:t.viewSpec},I(Oe,{liquid:!e.isHeightAuto,overflowX:e.isHeightAuto?`visible`:`hidden`,overflowY:e.isHeightAuto?`visible`:`auto`},i.length>0?this.renderSegList(i,n):this.renderEmptyMessage()))}renderEmptyMessage(){let{options:e,viewApi:t}=this.context;return I(Ee,{elTag:`div`,elClasses:[`fc-list-empty`],renderProps:{text:e.noEventsText,view:t},generatorName:`noEventsContent`,customGenerator:e.noEventsContent,defaultGenerator:yi,classNameGenerator:e.noEventsClassNames,didMount:e.noEventsDidMount,willUnmount:e.noEventsWillUnmount},e=>I(e,{elTag:`div`,elClasses:[`fc-list-empty-cushion`]}))}renderSegList(e,t){let{theme:n,options:r}=this.context,{timeHeaderId:i,eventHeaderId:a,dateHeaderIdRoot:o}=this.state,s=xi(e);return I(D,{unit:`day`},(e,c)=>{let l=[];for(let n=0;n<s.length;n+=1){let u=s[n];if(u){let s=Te(t[n]),d=o+`-`+s;l.push(I(di,{key:s,cellId:d,dayDate:t[n],todayRange:c})),u=Ce(u,r.eventOrder);for(let t of u)l.push(I(mi,Object.assign({key:s+`:`+t.eventRange.instance.instanceId,seg:t,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,timeHeaderId:i,eventHeaderId:a,dateHeaderId:d},O(t,c,e))))}}return I(`table`,{className:`fc-list-table `+n.getClass(`table`)},I(`thead`,null,I(`tr`,null,I(`th`,{scope:`col`,id:i},r.timeHint),I(`th`,{scope:`col`,"aria-hidden":!0}),I(`th`,{scope:`col`,id:a},r.eventHint))),I(`tbody`,null,l))})}_eventStoreToSegs(e,t,n){return this.eventRangesToSegs(pe(e,t,this.props.dateProfile.activeRange,this.context.options.nextDayThreshold).fg,n)}eventRangesToSegs(e,t){let n=[];for(let r of e)n.push(...this.eventRangeToSegs(r,t));return n}eventRangeToSegs(e,t){let{dateEnv:n}=this.context,{nextDayThreshold:r}=this.context.options,i=e.range,a=e.def.allDay,o,s,c,l=[];for(o=0;o<t.length;o+=1)if(s=j(i,t[o]),s&&(c={component:this,eventRange:e,start:s.start,end:s.end,isStart:e.isStart&&s.start.valueOf()===i.start.valueOf(),isEnd:e.isEnd&&s.end.valueOf()===i.end.valueOf(),dayIndex:o},l.push(c),!c.isEnd&&!a&&o+1<t.length&&i.end<n.add(t[o+1].start,r))){c.end=i.end,c.isEnd=!0;break}return l}};function yi(e){return e.text}function bi(e){let t=ce(e.renderRange.start),n=e.renderRange.end,r=[],i=[];for(;t<n;)r.push(t),i.push({start:t,end:te(t,1)}),t=te(t,1);return{dayDates:r,dayRanges:i}}function xi(e){let t=[],n,r;for(n=0;n<e.length;n+=1)r=e[n],(t[r.dayIndex]||(t[r.dayIndex]=[])).push(r);return t}ee(`:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid var(--fc-border-color)}.fc .fc-list-empty{align-items:center;background-color:var(--fc-neutral-bg-color);display:flex;height:100%;justify-content:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{border-style:hidden;width:100%}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{background:var(--fc-page-bg-color);position:sticky;top:0}.fc .fc-list-table thead{left:-10000px;position:absolute}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{clear:both;content:"";display:table}.fc-theme-standard .fc-list-day-cushion{background-color:var(--fc-neutral-bg-color)}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:var(--fc-list-event-hover-bg-color)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{border:calc(var(--fc-list-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-list-event-dot-width)/2);box-sizing:content-box;display:inline-block;height:0;width:0}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}`);var Si={listDayFormat:Ci,listDaySideFormat:Ci,noEventsClassNames:A,noEventsContent:A,noEventsDidMount:A,noEventsWillUnmount:A};function Ci(e){return e===!1?null:ie(e)}var wi=re({name:`@fullcalendar/list`,optionRefiners:Si,views:{list:{component:vi,buttonTextKey:`list`,listDayFormat:{month:`long`,day:`numeric`,year:`numeric`}},listDay:{type:`list`,duration:{days:1},listDayFormat:{weekday:`long`}},listWeek:{type:`list`,duration:{weeks:1},listDayFormat:{weekday:`long`},listDaySideFormat:{month:`long`,day:`numeric`,year:`numeric`}},listMonth:{type:`list`,duration:{month:1},listDaySideFormat:{weekday:`long`}},listYear:{type:`list`,duration:{year:1},listDaySideFormat:{weekday:`long`}}}});u(((e,t)=>{var n=NaN,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt,c=typeof global==`object`&&global&&global.Object===Object&&global,l=typeof self==`object`&&self&&self.Object===Object&&self,u=c||l||Function(`return this`)(),d=Object.prototype.toString,f=Math.max,p=Math.min,m=function(){return u.Date.now()};function h(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,h=!0;if(typeof e!=`function`)throw TypeError(`Expected a function`);t=y(t)||0,g(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?f(y(n.maxWait)||0,t):a,h=`trailing`in n?!!n.trailing:h);function _(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function v(e){return l=e,s=setTimeout(S,t),u?_(e):o}function b(e){var n=e-c,r=e-l,i=t-n;return d?p(i,a-r):i}function x(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function S(){var e=m();if(x(e))return C(e);s=setTimeout(S,b(e))}function C(e){return s=void 0,h&&r?_(e):(r=i=void 0,o)}function w(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function T(){return s===void 0?o:C(m())}function E(){var e=m(),n=x(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return v(c);if(d)return s=setTimeout(S,t),_(c)}return s===void 0&&(s=setTimeout(S,t)),o}return E.cancel=w,E.flush=T,E}function g(e){var t=typeof e;return!!e&&(t==`object`||t==`function`)}function _(e){return!!e&&typeof e==`object`}function v(e){return typeof e==`symbol`||_(e)&&d.call(e)==`[object Symbol]`}function y(e){if(typeof e==`number`)return e;if(v(e))return n;if(g(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=g(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=e.replace(r,``);var c=a.test(e);return c||o.test(e)?s(e.slice(2),c?2:8):i.test(e)?n:+e}t.exports=h}))();var Ti=typeof window<`u`?U.useLayoutEffect:U.useEffect;function Ei(e,t,n,r){let i=(0,U.useRef)(t);Ti(()=>{i.current=t},[t]),(0,U.useEffect)(()=>{let t=n?.current??window;if(!(t&&t.addEventListener))return;let a=e=>{i.current(e)};return t.addEventListener(e,a,r),()=>{t.removeEventListener(e,a,r)}},[e,n,r])}function Di(e){let t=(0,U.useRef)(()=>{throw Error(`Cannot call an event handler while rendering.`)});return Ti(()=>{t.current=e},[e]),(0,U.useCallback)((...e)=>t.current?.call(t,...e),[t])}var Oi=typeof window>`u`;function ki(e,t,n={}){let{initializeWithValue:r=!0}=n,i=(0,U.useCallback)(e=>n.serializer?n.serializer(e):JSON.stringify(e),[n]),a=(0,U.useCallback)(e=>{if(n.deserializer)return n.deserializer(e);if(e===`undefined`)return;let r=t instanceof Function?t():t,i;try{i=JSON.parse(e)}catch(e){return console.error(`Error parsing JSON:`,e),r}return i},[n,t]),o=(0,U.useCallback)(()=>{let n=t instanceof Function?t():t;if(Oi)return n;try{let t=window.localStorage.getItem(e);return t?a(t):n}catch(t){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,t),n}},[t,e,a]),[s,c]=(0,U.useState)(()=>r?o():t instanceof Function?t():t),l=Di(t=>{Oi&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{let n=t instanceof Function?t(o()):t;window.localStorage.setItem(e,i(n)),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))}catch(t){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,t)}}),u=Di(()=>{Oi&&console.warn(`Tried removing localStorage key \u201C${e}\u201D even though environment is not a client`);let n=t instanceof Function?t():t;window.localStorage.removeItem(e),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))});(0,U.useEffect)(()=>{c(o())},[e]);let d=(0,U.useCallback)(t=>{t.key&&t.key!==e||c(o())},[e,o]);return Ei(`storage`,d),Ei(`local-storage`,d),[s,l,u]}var Ai={week:{duration:{weeks:1},dateAlignment:`week`,dateIncrement:{weeks:1}},month:{duration:{months:1},dateAlignment:`month`,dateIncrement:{months:1}},threeMonths:{duration:{months:3},dateAlignment:`month`,dateIncrement:{months:3}},year:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1}}},ji=e=>Ai[e],Mi=()=>{let[e,t]=ki(`solspace-calendar-agenda-range`,`month`);return{range:Object.hasOwn(Ai,e)?e:`month`,setRange:t}},Ni=({range:e,onChange:t,disabled:n})=>{let r=(0,U.useId)();return(0,Z.jsxs)(`div`,{className:`calendar-agenda-range`,children:[(0,Z.jsx)(`label`,{htmlFor:r,children:Craft.t(`calendar`,`Range`)}),(0,Z.jsx)(`div`,{className:`select`,children:(0,Z.jsxs)(`select`,{id:r,"aria-label":Craft.t(`calendar`,`Agenda range`),value:e,disabled:n,onChange:e=>t(e.target.value),children:[(0,Z.jsx)(`option`,{value:`week`,children:Craft.t(`calendar`,`Week`)}),(0,Z.jsx)(`option`,{value:`month`,children:Craft.t(`calendar`,`Month`)}),(0,Z.jsx)(`option`,{value:`threeMonths`,children:Craft.t(`calendar`,`3 months`)}),(0,Z.jsx)(`option`,{value:`year`,children:Craft.t(`calendar`,`Year`)})]})})]})},Pi=1440*60,Fi=`draft-create-event`,Ii=`New Event`,Li=e=>Math.floor(e.getTime()/1e3),Q=e=>{let t=new Date(e*1e3);return Math.floor(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())/1e3)},Ri=(e,t)=>e+t*Pi,zi=e=>Math.max(1,e.eventDuration)*60,Bi=(e,t)=>e.preserveDuration?Math.max(60,e.end-e.start):zi(t),Vi=e=>Math.max(1,Math.round((e.end-e.start)/Pi)),Hi=e=>!!(e&&typeof e==`object`&&`closest`in e&&e.closest),Ui=(e,t)=>{let n=Li(e.start),r=Li(e.end),i=e.allDay?r-n>Pi:Q(r-1)>Q(n),a=e.allDay?i:t.allDayDefault,o=i||!a&&!e.allDay&&r>n,s=a?Q(n):e.allDay?Q(n)+new Date().getHours()*60*60:n,c=a?Ri(i?Q(r-1):s,1):o?r:s+zi(t);return{id:Fi,title:l(Ii),allDay:a,start:s,end:c,preserveDuration:o}},Wi=e=>({id:e.id,title:e.title,start:new Date(e.start*1e3),end:new Date(e.end*1e3),allDay:e.allDay,editable:!1,startEditable:!1,durationEditable:!1,extendedProps:{isDraftCreate:!0}}),Gi=e=>e.allDay?Ri(e.end,-1):e.end,Ki=(e,t)=>({...e,title:t}),qi=(e,t,n)=>{if(e.allDay===t)return e;if(t){let t=Q(e.start),n=Ri(Q(e.end-1),1);return{...e,allDay:!0,start:t,end:Math.max(n,Ri(t,1))}}return{...e,allDay:!1,end:e.start+(e.preserveDuration?(Vi(e)-1)*Pi:0)+zi(n)}},Ji=(e,t,n)=>{if(e.allDay){let n=Q(t);return{...e,start:n,end:Ri(n,Vi(e))}}return{...e,start:t,end:t+Bi(e,n)}},Yi=(e,t,n)=>{if(e.allDay){let n=Ri(Q(t),1);return{...e,end:Math.max(n,Ri(Q(e.start),1))}}return{...e,end:Math.max(t,e.start+(e.preserveDuration?60:zi(n)))}},Xi=(e,t)=>{e.setProp(`title`,t.title),e.setAllDay(t.allDay,{maintainDuration:!1}),e.setDates(new Date(t.start*1e3),new Date(t.end*1e3),{allDay:t.allDay})},Zi=e=>!!(e?.extendedProps&&`isDraftCreate`in e.extendedProps&&e.extendedProps.isDraftCreate),Qi=(e,t)=>Hi(e)&&!!e.closest(t),$i=`solspace-calendar-hidden-calendars`,ea={day:`timeGridDay`,week:`timeGridWeek`,month:`dayGridMonth`,year:`calendarYear`,agenda:`listMonth`},ta=()=>{let e=window.location.pathname.split(`/`).filter(Boolean).at(-1);return e&&ea[e]||null},na=e=>Object.entries(ea).find(([,t])=>t===e)?.[0]??`month`,ra=(e=`month`,t)=>{let n=(0,U.useMemo)(()=>{let e=Object.keys(ea),n=e.filter(e=>!t||t.includes(e));return(n.length?n:e).map(e=>ea[e])},[t]),r=(0,U.useCallback)(t=>n.includes(t)?t:n.includes(ea[e])?ea[e]:n.includes(`dayGridMonth`)?`dayGridMonth`:n[0],[e,n]),[i,a]=(0,U.useState)(()=>r(ta()||ea[e]||`dayGridMonth`)),[o,s]=(0,U.useState)(!1);return(0,U.useEffect)(()=>{s(!0)},[]),{view:i,setView:e=>{a(r(e)),s(!0)},isReady:o,enabledViews:n,resolveView:r}},ia=()=>{let[e,t]=ki($i,[]);return{hiddenCalendarIds:e,toggleCalendarVisibility:e=>{t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}}},aa=(e,t)=>{let n=t??ta(),r=n?`/${na(n)}`:``,i=new URL(Craft.getCpUrl(`calendar/${c(e)}${r}`),window.location.origin);i.search=window.location.search,i.toString()!==window.location.href&&history.pushState(`data`,``,i.toString())},oa=`refresh prev,today,datepicker,next`,sa=(e,{datePickerButton:t})=>({prev:{text:Craft.t(`calendar`,`Previous`),icon:`chevron-left`,click:()=>{e.prev(),aa(e.getDate())}},next:{text:Craft.t(`calendar`,`Next`),icon:`chevron-right`,click:()=>{e.next(),aa(e.getDate())}},refresh:{text:Craft.t(`calendar`,`Refresh`),icon:`refresh`,click:()=>{xe(),e.refetchEvents()}},datepicker:t}),ca=(0,U.createContext)(null),la=({config:e,children:t})=>{let n=(0,U.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,Z.jsx)(ca.Provider,{value:n,children:t})},$=()=>{let e=(0,U.useContext)(ca);if(!e)throw Error(`ConfigContext is not provided`);return e},ua=(e,n,r)=>{let{weekStartDay:i}=$(),a=(0,U.useRef)(null),[o,c]=(0,U.useState)(!1),[l,u]=(0,U.useState)(null),[d,f]=(0,U.useState)(null),p=(0,U.useCallback)(()=>{c(!1),u(null)},[]);(0,U.useEffect)(()=>{if(!o)return;let e=e=>{let t=e.target;a.current?.contains(t)||t.closest(`.fc-datepicker-button`)||p()},t=e=>{e.key===`Escape`&&p()};return window.addEventListener(`mousedown`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`mousedown`,e),window.removeEventListener(`keydown`,t)}},[p,o]);let m=(0,U.useCallback)(t=>{if(!t)return;let n=s(t);aa(n),e.gotoDate(n),f(t),p()},[p,e]),h=(0,U.useCallback)((n,r)=>{let{bottom:i,right:a}=r.getBoundingClientRect();f(t(e.getDate())),c(e=>!e),u({top:i+8,left:a})},[e]);return{dateSelector:o&&l?(0,Z.jsx)(da,{view:n,agendaRange:r,popoverRef:a,position:l,selectedDate:d,weekStartDay:i,onDateSelect:m}):null,datePickerButton:{text:Craft.t(`calendar`,`Pick a Date`),icon:`datepicker`,click:h}}},da=({view:e,agendaRange:t,popoverRef:n,position:r,selectedDate:i,weekStartDay:a,onDateSelect:o})=>{let s=e===`timeGridWeek`||e===`listMonth`&&t===`week`,c=e===`calendarYear`||e===`listMonth`&&t===`year`,l=e===`dayGridMonth`||e===`listMonth`&&!s&&!c;return(0,Z.jsx)(`div`,{ref:n,className:`fc-datepicker-popover`,style:{top:r.top,left:r.left},children:(0,Z.jsx)(Ie,{...p(),inline:!0,selected:i,onChange:o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:a,showWeekPicker:s,showWeekNumbers:s,showMonthYearPicker:l,showYearPicker:c})})},fa=e=>e.view.type===`dayGridMonth`&&!e.event.allDay&&!e.event.extendedProps?.multiDay,pa=e=>{let t=e?.toLowerCase();return t===`black`||t===`white`?`fc-color-${t}`:null},ma=({event:e})=>{let t=[];e.allDay&&t.push(`fc-event-all-day`),e.end&&(!e.extendedProps?.multiDay&&!e.allDay?t.push(`fc-event-single-day`):t.push(`fc-event-multi-day`)),e.extendedProps?.enabled===!1&&t.push(`fc-event-disabled`),e.extendedProps?.cancelled&&t.push(`fc-event-cancelled`);let n=pa(e.textColor);return n&&t.push(n),t},ha=(e,t)=>Zi(e)?`ignore`:Qi(t,`[data-calendar-event-title-link]`)?`navigate`:`open`,ga=e=>{let{event:t,timeText:n}=e,r=e.view.type===`listMonth`,i=z(`fc-event-title`,fa(e)&&`fc-event-title-inline`),a=!Zi(t)&&t.url,o=!!t.extendedProps?.cancelled,s=!o&&t.extendedProps?.isEdited?(0,Z.jsx)(`span`,{className:`fc-event-flag`,title:l(`This occurrence has its own changes.`),"aria-hidden":`true`,children:`✎`}):null,c=o&&!r?(0,Z.jsxs)(`span`,{className:`visually-hidden`,children:[`, `,l(`Cancelled`)]}):null,u=(0,Z.jsx)(y,{count:t.extendedProps.overlaps?.count}),d=r?(0,Z.jsxs)(`a`,{href:t.url||`#`,className:i,children:[u,s,t.title]}):a?(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>window.location.href=t.url,className:i,"data-calendar-event-title-link":!0,children:[u,s,t.title,c]}):(0,Z.jsxs)(`div`,{className:i,children:[u,s,t.title,c]});if(r){let{calendarName:e,location:n,description:r}=t.extendedProps;return(0,Z.jsxs)(`div`,{className:`calendar-agenda-event`,children:[(0,Z.jsxs)(`div`,{className:`calendar-agenda-title`,children:[d,o&&(0,Z.jsx)(`span`,{className:`calendar-agenda-cancelled`,children:l(`Cancelled`)})]}),(0,Z.jsxs)(`div`,{className:`calendar-agenda-meta`,children:[e&&(0,Z.jsxs)(`span`,{className:`calendar-agenda-calendar`,children:[(0,Z.jsx)(`span`,{className:`calendar-agenda-calendar-dot`,style:{backgroundColor:t.extendedProps.calendarColor||t.backgroundColor},"aria-hidden":`true`}),e]}),n&&(0,Z.jsx)(`span`,{className:`calendar-agenda-location`,children:n})]}),r&&(0,Z.jsx)(`div`,{className:`calendar-agenda-description`,children:r})]})}return fa(e)?(0,Z.jsxs)(`div`,{className:`fc-event-main-frame fc-event-main-frame-inline`,children:[(0,Z.jsx)(`span`,{className:`fc-color-icon`,style:{backgroundColor:t.backgroundColor,borderColor:t.borderColor}}),(0,Z.jsx)(`div`,{className:`fc-event-title-container`,children:d}),n?(0,Z.jsx)(`div`,{className:`fc-event-time`,children:n}):null]}):(0,Z.jsx)(`div`,{className:`fc-event-main-frame`,children:(0,Z.jsx)(`div`,{className:`fc-event-title-container`,children:d})})},_a=`calendar:schedule-history-reset`,va=e=>{let[t,n]=(0,U.useState)([]),[r,i]=(0,U.useState)([]),[a,o]=(0,U.useState)(!1),s=(0,U.useRef)(!1),c=(0,U.useCallback)(()=>{n([]),i([])},[]);(0,U.useEffect)(()=>(window.addEventListener(_a,c),()=>window.removeEventListener(_a,c)),[c]);let l=(0,U.useCallback)(e=>{n(t=>[...t,e].slice(-50)),i([])},[]),u=(0,U.useCallback)(async e=>{if(s.current)return!1;s.current=!0,o(!0);try{return await e()}finally{s.current=!1,o(!1)}},[]);return{add:l,run:u,replay:(0,U.useCallback)(async a=>{let o=(a===`undo`?t:r).at(-1);o&&await u(async()=>await Se(o,a)?(a===`undo`?(n(e=>e.slice(0,-1)),i(e=>[...e,o])):(i(e=>e.slice(0,-1)),n(e=>[...e,o])),e(),!0):!1)},[t,r,u,e]),clear:c,busy:a,canUndo:t.length>0,canRedo:r.length>0}},ya=r.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--medium-border-radius, 4px);
  background: #c4cfe1;
`,ba=r.button`
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
`,xa=({canUndo:e,canRedo:t,disabled:n,onReplay:r})=>((0,U.useEffect)(()=>{let i=i=>{if(n||i.defaultPrevented||i.altKey||!(i.metaKey||i.ctrlKey))return;let a=i.target;if(a instanceof HTMLElement&&a.closest(`input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=textbox]`)||document.querySelector(`.modal:not(.hidden), .cp-screen-slideout:not(.hidden)`))return;let o=i.key.toLowerCase(),s=o===`z`?i.shiftKey?`redo`:`undo`:o===`y`&&i.ctrlKey?`redo`:null;!s||!(s===`undo`?e:t)||(i.preventDefault(),r(s))};return document.addEventListener(`keydown`,i),()=>document.removeEventListener(`keydown`,i)},[e,t,n,r]),(0,Z.jsx)(ya,{role:`group`,"aria-label":l(`Event history`),children:[`undo`,`redo`].map(i=>(0,Z.jsx)(ba,{type:`button`,disabled:n||!(i===`undo`?e:t),title:l(i===`undo`?`Undo`:`Redo`),"aria-label":l(i===`undo`?`Undo`:`Redo`),onClick:()=>r(i),children:(0,Z.jsx)(`svg`,{viewBox:`0 0 96 80`,width:`18`,height:`16`,"aria-hidden":`true`,focusable:`false`,children:(0,Z.jsx)(`g`,{transform:i===`redo`?`translate(96 0) scale(-1 1)`:void 0,children:(0,Z.jsx)(`path`,{fill:`currentColor`,d:`M37 1 1 30l36 29V41h18c15 0 23 8 23 22 0 6-2 11-5 16 12-8 19-19 19-31 0-20-14-31-37-31H37V1Z`})})})},i))})),Sa=()=>new URL(window.location.href).searchParams.get(`search`)?.trim()??``,Ca=({initialSearch:e,onSearchChange:t})=>{let[n,r]=(0,U.useState)(e),i=(0,U.useId)(),a=(0,U.useRef)(null);(0,U.useEffect)(()=>{let e=setTimeout(()=>t(n.trim()),250);return()=>clearTimeout(e)},[n,t]);let o=()=>{r(``),t(``),a.current?.focus()};return(0,Z.jsx)(Re,{children:(0,Z.jsxs)(`div`,{className:`calendar-search-toolbar`,children:[(0,Z.jsxs)(`div`,{className:`calendar-search-input`,children:[(0,Z.jsx)(`span`,{className:`calendar-search-icon`,"data-icon":`search`,"aria-hidden":`true`}),(0,Z.jsx)(`input`,{type:`search`,ref:a,className:`text fullwidth`,"aria-label":l(`Search events`),"aria-describedby":i,placeholder:Craft.t(`app`,`Search`),value:n,onChange:e=>r(e.target.value),onKeyDown:e=>{e.key===`Escape`&&n&&(e.stopPropagation(),o())}}),n&&(0,Z.jsx)(`button`,{type:`button`,className:`calendar-search-clear`,"aria-label":l(`Clear search`),"data-icon":`remove`,onClick:o})]}),(0,Z.jsx)(`span`,{id:i,className:`visually-hidden`,children:l(`Searches events in the displayed date range.`)})]})})},wa=r.div`
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
`,Ta=r.div`
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
`,Ea=(e,t,n)=>new Date(Date.UTC(e,t,n)),Da=e=>{let t=new Map;for(let n of e){let e=n.range.start,r=Ea(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());for(;r<n.range.end;){let e=g(r),i=t.get(e)??[];i.push(n),t.set(e,i),r.setUTCDate(r.getUTCDate()+1)}}for(let e of t.values())e.sort((e,t)=>Number(t.def.allDay)-Number(e.def.allDay)||(e.instance?.range.start.getTime()??0)-(t.instance?.range.start.getTime()??0)||e.def.title.localeCompare(t.def.title));return t},Oa=e=>e.def.extendedProps.calendarColor||e.ui.backgroundColor||`#607d9f`,ka=e=>{let t=new Map;for(let n of e){let e=!!n.def.extendedProps.cancelled,r=Oa(n),i=e?`cancelled`:String(n.def.extendedProps.calendar??r);t.set(i,{color:r,cancelled:e})}return Array.from(t.entries())},Aa=({date:e,events:t,anchor:n,onEventSelect:r})=>{let{hidePopover:i}=ci(),{language:a,formats:o}=$(),s=(0,U.useRef)(null),c=new Intl.DateTimeFormat(a,{month:`short`,day:`numeric`,year:`numeric`,timeZone:`UTC`}),u=new Intl.DateTimeFormat(a,{...o.time.short.js,timeZone:`UTC`});(0,U.useEffect)(()=>{let e=e=>{e.key===`Escape`&&i()},t=e=>{let t=e.target;!n.contains(t)&&!s.current?.contains(t)&&i()};return document.addEventListener(`keydown`,e),document.addEventListener(`pointerdown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`pointerdown`,t)}},[n,i]);let d=e=>{if(!e.instance)return``;let{start:t,end:n}=e.instance.range;if(e.def.allDay){let e=new Date(n.getTime()-1);return g(t)===g(e)?l(`All Day`):`${l(`All Day`)} · ${c.format(t)} – ${c.format(e)}`}let r=g(t)===g(n),i=u.format(t),a=u.format(n);return r?`${i} – ${a}`:`${c.format(t)} ${i} – ${c.format(n)} ${a}`};return(0,Z.jsxs)(Ta,{ref:s,"data-calendar-year-preview":!0,children:[(0,Z.jsx)(`h3`,{children:e.toLocaleDateString(a,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`,timeZone:`UTC`})}),(0,Z.jsx)(`ul`,{children:t.map(e=>(0,Z.jsx)(`li`,{children:(0,Z.jsxs)(`button`,{type:`button`,className:z({"is-cancelled":e.def.extendedProps.cancelled}),onClick:t=>r(e.def.publicId,n,t),children:[(0,Z.jsx)(`span`,{className:`year-preview-dot`,style:{backgroundColor:Oa(e)}}),(0,Z.jsxs)(`span`,{className:`year-preview-details`,children:[(0,Z.jsxs)(`span`,{className:`year-preview-title`,children:[(0,Z.jsxs)(`strong`,{children:[(0,Z.jsx)(y,{count:e.def.extendedProps.overlaps?.count}),e.def.title]}),e.def.extendedProps.cancelled&&(0,Z.jsx)(`span`,{className:`year-preview-cancelled`,children:l(`Cancelled`)})]}),(0,Z.jsx)(`span`,{className:`year-preview-time`,children:d(e)}),e.def.extendedProps.calendarName&&(0,Z.jsx)(`span`,{className:`year-preview-calendar`,children:e.def.extendedProps.calendarName})]})]})},e.instance?.instanceId??e.def.defId))})]})},ja=({content:e,disabled:t,loading:n,error:r,search:i,onDateSelect:a,onMonthSelect:o,onEventSelect:s})=>{let{language:c,weekStartDay:u}=$(),{showPopover:d,hidePopover:f}=ci(),p=(0,U.useRef)(void 0),m=e.dateProfile.currentRange.start.getUTCFullYear(),h=(0,U.useMemo)(()=>Da(we(e,!0)),[e]),_=(0,U.useMemo)(()=>new Intl.DateTimeFormat(c,{month:`long`,timeZone:`UTC`}),[c]),v=(0,U.useMemo)(()=>new Intl.DateTimeFormat(c,{weekday:`narrow`,timeZone:`UTC`}),[c]),y=Array.from({length:7},(e,t)=>Ea(2023,0,1+u+t)),b=g(new Date);(0,U.useEffect)(()=>()=>{clearTimeout(p.current),f()},[f]),(0,U.useEffect)(()=>{clearTimeout(p.current),f()},[f,e.eventStore,m,t,n]);let x=(e,r,i)=>{t||n||!r.length||d((0,Z.jsx)(Aa,{date:e,events:r,anchor:i,onEventSelect:s}),i,{position:[`bottom`,`top`,`right`,`left`],closeDelayMs:300})};return(0,Z.jsxs)(wa,{children:[(0,Z.jsx)(`div`,{className:`calendar-year-grid`,children:Array.from({length:12},(e,n)=>{let r=Ea(m,n,1),i=_.format(r),s=(r.getUTCDay()-u+7)%7,d=Ea(m,n+1,0).getUTCDate();return(0,Z.jsxs)(`section`,{className:`calendar-year-month`,"aria-label":i,children:[(0,Z.jsx)(`h3`,{children:(0,Z.jsx)(`button`,{type:`button`,disabled:t,onClick:()=>o(r),children:i})}),(0,Z.jsx)(`div`,{className:`calendar-year-weekdays`,"aria-hidden":`true`,children:y.map(e=>(0,Z.jsx)(`span`,{children:v.format(e)},e.getUTCDay()))}),(0,Z.jsx)(`div`,{className:`calendar-year-days`,children:Array.from({length:42},(e,r)=>{let i=r-s+1;if(i<1||i>d)return(0,Z.jsx)(`span`,{},r);let o=Ea(m,n,i),u=g(o),_=h.get(u)??[],v=ka(_),y=o.toLocaleDateString(c,{dateStyle:`full`,timeZone:`UTC`}),S=l(_.length===1?`{count} event`:`{count} events`,{count:_.length}),C=_.filter(e=>e.def.extendedProps.cancelled).length;return(0,Z.jsxs)(`button`,{type:`button`,className:z(`calendar-year-day`,{"is-today":u===b,"has-events":_.length>0}),"data-date":u,"aria-label":`${y}, ${S}${C?`, ${l(`Cancelled`)}: ${C}`:``}`,"aria-current":u===b?`date`:void 0,disabled:t,onClick:()=>{clearTimeout(p.current),a(o)},onMouseEnter:e=>{let t=e.currentTarget;clearTimeout(p.current),p.current=setTimeout(()=>x(o,_,t),300)},onMouseLeave:()=>clearTimeout(p.current),onFocus:e=>{clearTimeout(p.current),x(o,_,e.currentTarget)},onBlur:e=>{(!(e.relatedTarget instanceof HTMLElement)||!e.relatedTarget.closest(`[data-calendar-year-preview]`))&&f()},children:[(0,Z.jsx)(`span`,{className:`calendar-year-day-number`,children:i}),(0,Z.jsxs)(`span`,{className:`calendar-year-markers`,"aria-hidden":`true`,children:[v.slice(0,3).map(([e,t])=>(0,Z.jsx)(`span`,{className:z(`calendar-year-dot`,{"is-cancelled":t.cancelled}),style:{backgroundColor:t.color}},e)),v.length>3&&(0,Z.jsx)(`span`,{className:`calendar-year-more`,children:`+`})]})]},r)})})]},n)})}),(0,Z.jsxs)(`div`,{className:`calendar-year-footer`,children:[(0,Z.jsx)(`span`,{role:`status`,children:l(r?`Couldn’t load events. Use Refresh to try again.`:n?`Loading events…`:h.size?`Hover a date to preview its events.`:i?`No matching events in this date range.`:`No events in this date range.`)}),(0,Z.jsxs)(`span`,{className:`calendar-year-legend`,children:[(0,Z.jsx)(`span`,{className:`calendar-year-dot is-cancelled`,"aria-hidden":`true`}),l(`Cancelled`)]})]})]})},Ma=({options:e,value:t,onChange:n})=>{let r=(0,U.useId)(),i=(0,U.useRef)(null),a=(0,U.useRef)(null),o=(0,U.useRef)(n),s=JSON.stringify(e),c=e.find(e=>e.value===t);return(0,U.useEffect)(()=>{o.current=n},[n]),(0,U.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu`,t.style.minWidth=`${e.getBoundingClientRect().width}px`,t.setAttribute(`aria-label`,l(`Calendar`)),a.current=t;let n=document.createElement(`ul`);t.append(n),JSON.parse(s).forEach(e=>{let t=document.createElement(`li`),r=document.createElement(`a`);r.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),r.append(i,document.createTextNode(e.label)),t.append(r),n.append(t)}),e.after(t);let r=new Garnish.MenuBtn(e,{onOptionSelect:t=>{r.hideMenu(),o.current(Number(t.dataset.calendarId)),e.focus()}}),c=t=>{t.key===`Escape`&&r.showingMenu&&(t.preventDefault(),t.stopPropagation(),r.hideMenu(),e.focus())};return document.addEventListener(`keydown`,c,!0),()=>{document.removeEventListener(`keydown`,c,!0),r.hideMenu(),r.destroy(),t.remove(),a.current=null}},[s]),(0,U.useEffect)(()=>{a.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let n=Number(e.dataset.calendarId)===t;e.classList.toggle(`sel`,n),e.setAttribute(`aria-selected`,String(n))})},[t,s]),(0,Z.jsx)(B,{label:l(`Calendar`),id:r,required:!0,children:(0,Z.jsxs)(Na,{ref:i,id:r,type:`button`,className:`btn menubtn fullwidth`,"aria-required":`true`,children:[(0,Z.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:c?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,Z.jsx)(`span`,{className:`calendar-name`,children:c?.label})]})})},Na=r.button`
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
`,Pa=(e,t,n,r)=>({title:e.title||l(`New Event`),start:e.start,end:e.end,allDay:e.allDay,calendarId:t,siteId:n,...r&&{details:r}}),Fa=({refetchEvents:e,onSuccess:t})=>{let{hidePopover:n}=ci(),{currentSiteId:r}=$(),[i,a]=(0,U.useState)(null),[o,s]=(0,U.useState)(null),c=(0,U.useCallback)(async(i,o,c,u)=>{a(u?`prepare`:`create`),s(null);try{let a=Pa(i,o,r,c);u&&(a.title=i.title);let s=await _e($r(u?`/api/events/prepare`:`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)});if(!s.ok){let e=null;try{e=await s.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}let d=await s.json();if(u){if(typeof d?.url!=`string`||!d.url)throw Error(l(`Couldn’t create event.`));return d.url}return xe(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),e?.(),t?.(),n(),null}catch(e){return e instanceof Error?s(e.message):s(`Failed to create event`),null}finally{a(null)}},[n,t,e,r]);return{createEvent:(e,t,n)=>c(e,t,n,!1),prepareEvent:(e,t,n)=>c(e,t,n,!0),error:o,isFetching:i!==null,isOpeningEditor:i===`prepare`}},Ia=r.div`
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
`,La=r(Le)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,Ra=r.div`
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
`,za=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ba=r.label`
  font-weight: 600;
  cursor: pointer;
`,Va=r(Le)`
  flex-wrap: wrap;
  align-items: center;
`,Ha=r.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  .btn + .btn {
    margin-inline-start: 0;
  }
`,Ua=r.button`
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
`,Wa=({draft:e,onChange:t,refetchEvents:n,onConfirm:r,onCancel:i})=>{let{currentSiteId:a,showOverlapWarnings:s,calendars:c,calendarColors:u,quickCreateFields:d,quickCreateRequiredFields:f,formats:p,weekStartDay:m,eventDuration:h,timeInterval:g}=$(),_=(0,U.useId)(),v=(0,U.useMemo)(()=>Object.entries(c).map(([e,t])=>({value:Number(e),label:t,color:u?.[Number(e)]})),[c,u]),[y,b]=(0,U.useState)(v[0]?.value??0),[x,S]=(0,U.useState)({}),w=d?.[y],T=w?.location,E=w?.description,D=f?.[y],O=x[y]??{},k=T||E?{...T&&{location:O[T]??``},...E&&{description:O[E]??``}}:void 0,A=(e,t)=>{S(n=>({...n,[y]:{...n[y],[e]:t}}))},{createEvent:j,prepareEvent:M,error:N,isFetching:P,isOpeningEditor:F}=Fa({refetchEvents:n,onSuccess:r}),ee=(0,U.useMemo)(()=>e.allDay?p.date.short.icu:p.datetime.short.icu,[p,e.allDay]),te=(0,U.useMemo)(()=>Gi(e),[e]);return Ei(`keydown`,e=>{e.key===`Escape`&&!P&&i()}),(0,Z.jsxs)(Ia,{children:[(0,Z.jsx)(La,{children:(0,Z.jsx)(Be,{label:l(`Title`),id:`${_}-title`,required:!0,autofocus:!0,value:e.title,placeholder:l(`Event Title`),onChange:n=>t(Ki(e,n))})}),(0,Z.jsxs)(Ra,{children:[(0,Z.jsx)(Ma,{value:y,options:v,onChange:b}),(0,Z.jsx)(`hr`,{}),(0,Z.jsxs)(za,{children:[(0,Z.jsx)(Pe,{enabled:e.allDay,onClick:n=>t(qi(e,n,{eventDuration:h}))}),(0,Z.jsx)(Ba,{onClick:()=>t(qi(e,!e.allDay,{eventDuration:h})),children:l(`All Day`)})]}),(0,Z.jsx)(Fe,{id:`${_}-start`,required:!0,label:l(`Starts`),value:e.start,datePickerProps:{showIcon:!0,icon:(0,Z.jsx)(je,{}),toggleCalendarOnIconClick:!0,dateFormat:ee,timeFormat:p.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:m,timeIntervals:g},onChange:n=>{n!==null&&t(Ji(e,n,{eventDuration:h}))}}),(0,Z.jsx)(Fe,{id:`${_}-end`,required:!0,label:l(`Ends`),value:te,datePickerProps:{showIcon:!0,icon:(0,Z.jsx)(je,{}),toggleCalendarOnIconClick:!0,minDate:o(e.start),dateFormat:ee,timeFormat:p.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:m,timeIntervals:g,filterTime:t=>{if(!e.start)return!0;let n=o(e.start),r=new Date(t);return n.getTime()<r.getTime()}},onChange:n=>{n!==null&&t(Yi(e,n,{eventDuration:h}))}}),(0,Z.jsx)(C,{formats:p,enabled:s&&!!y,schedule:{start:e.start,end:e.allDay?e.end-1:e.end,allDay:e.allDay,calendarId:y,siteId:a}}),(T||E)&&(0,Z.jsx)(`hr`,{}),T&&(0,Z.jsx)(B,{label:l(`Location`),id:`${_}-location`,required:D?.location,children:(0,Z.jsx)(`input`,{id:`${_}-location`,type:`text`,className:`text fullwidth`,disabled:P,"aria-required":D?.location||void 0,value:O[T]??``,onChange:e=>A(T,e.target.value)})}),E&&(0,Z.jsx)(B,{label:l(`Description`),id:`${_}-description`,required:D?.description,children:(0,Z.jsx)(`textarea`,{id:`${_}-description`,className:`text fullwidth`,rows:3,disabled:P,"aria-required":D?.description||void 0,value:O[E]??``,onChange:e=>A(E,e.target.value)})})]}),(0,Z.jsx)(`hr`,{}),N&&(0,Z.jsx)(`p`,{className:`error`,children:N}),(0,Z.jsxs)(Va,{$justifyContent:`flex-end`,$gap:8,children:[(0,Z.jsx)(Ua,{type:`button`,disabled:!y||P,onClick:async()=>{let t=await M(e,y,k);t&&(window.location.href=t)},children:l(F?`Processing...`:`More details…`)}),(0,Z.jsxs)(Ha,{children:[(0,Z.jsx)(`button`,{type:`button`,className:z(`btn`,P&&`disabled`),disabled:P,onClick:i,children:l(`Cancel`)}),(0,Z.jsx)(`button`,{type:`button`,className:z(`btn submit`,P&&`disabled`),disabled:!e.title||!y||P,onClick:()=>j(e,y,k),children:l(P&&!F?`Creating Event...`:`Create Event`)})]})]})]})},Ga=r.div`
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
`,Ka=r.div`
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
`,qa=r.button`
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
`,Ja={move:`You are moving an event.`,resize:`You are changing an event’s length.`,delete:`You are deleting an event.`},Ya={move:`Which occurrences do you want to move?`,resize:`Which occurrences do you want to change?`,delete:`Which occurrences do you want to delete?`},Xa={occurrence:`Only this occurrence`,following:`This and following`,series:`All occurrences`},Za=({action:e,onSelect:t,onCancel:n})=>{let{hidePopover:r}=ci(),[i,a]=(0,U.useState)(null),o=(0,U.useRef)(!0),s=(0,U.useRef)(!1),c=i!==null;(0,U.useEffect)(()=>()=>{o.current=!1,s.current||n?.()},[]);let u=(0,U.useCallback)(()=>{c||r()},[r,c]);Ei(`keydown`,e=>{e.key===`Escape`&&u()});let d=async e=>{if(!c){s.current=!0,a(e);try{await t(e)&&r()}finally{o.current&&a(null)}}};return(0,Z.jsxs)(Ga,{children:[(0,Z.jsx)(`h3`,{children:l(Ja[e])}),(0,Z.jsx)(`p`,{children:l(Ya[e])}),(0,Z.jsx)(`hr`,{}),(0,Z.jsxs)(Le,{$direction:`column`,$alignItems:`center`,$gap:8,children:[[`occurrence`,`following`,`series`].map(e=>(0,Z.jsx)(`button`,{type:`button`,className:z(`btn small`,e===`occurrence`&&`submit`,c&&`disabled`),disabled:c,onClick:()=>d(e),children:l(i===e?`Processing...`:Xa[e])},e)),(0,Z.jsx)(`button`,{type:`button`,className:z(`btn small`,c&&`disabled`),disabled:c,onClick:u,children:l(`Cancel`)})]})]})},Qa=({actions:e,disabled:t})=>{let{eventActionIcons:n}=$(),{keepPopoverOpen:r}=ci(),i=(0,U.useRef)(null),a=(0,U.useRef)({actions:e,disabled:t}),o=JSON.stringify(e.map(({label:e,destructive:t,icon:r,color:i})=>({label:e,destructive:t,icon:r?n?.[r]:void 0,color:i})));return(0,U.useEffect)(()=>{a.current={actions:e,disabled:t}},[e,t]),(0,U.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu menu--disclosure calendar-event-action-menu`,t.setAttribute(`aria-label`,l(`More actions`));let n=document.createElement(`ul`);t.append(n),JSON.parse(o).forEach((e,r)=>{e.destructive&&r>0&&(t.append(document.createElement(`hr`)),n=document.createElement(`ul`),t.append(n));let i=document.createElement(`li`),a=document.createElement(`a`);if(a.className=`menu-item`,e.icon){let t=document.createElement(`span`);t.className=e.color?`icon ${e.color}`:`icon`,t.setAttribute(`aria-hidden`,`true`),t.innerHTML=e.icon,a.append(t)}let o=document.createElement(`span`);o.className=`menu-item-label`,o.textContent=e.label,a.append(o),a.dataset.action=String(r),e.destructive&&a.classList.add(`error`),i.append(a),n.append(i)}),e.after(t);let s=new Garnish.MenuBtn(e,{onOptionSelect:e=>{a.current.disabled||(s.hideMenu(),a.current.actions[Number(e.dataset.action)]?.onSelect())}});s.menu.on(`show`,r);let c=t=>{t.key===`Escape`&&s.showingMenu&&(t.preventDefault(),t.stopPropagation(),s.hideMenu(),e.focus())};return document.addEventListener(`keydown`,c,!0),()=>{document.removeEventListener(`keydown`,c,!0),s.hideMenu(),s.destroy(),t.remove()}},[o,r]),(0,Z.jsx)(`button`,{ref:i,type:`button`,className:`btn menubtn action-btn`,disabled:t,"aria-label":l(`More actions`),title:l(`More actions`)})},$a=({fcEvent:e})=>{let{hidePopover:n,showPopover:r}=ci(),{currentSiteId:i,formats:a}=$(),[o,s]=(0,U.useState)(!1),[c,u]=(0,U.useState)(!1),[d,p]=(0,U.useState)(!1),[m,h]=(0,U.useState)(!1),g=o||c||d||m;Ei(`keydown`,e=>{e.key===`Escape`&&n()});let v=e.event,{end:y,allDay:x}=v,C=v.extendedProps.calendarName,w=typeof v.extendedProps.location==`string`?v.extendedProps.location.trim():``,T=typeof v.extendedProps.description==`string`?v.extendedProps.description.trim():``,E=v.extendedProps.calendarColor??v.backgroundColor??v.borderColor??`#607d9f`,D=(0,U.useMemo)(()=>x?Ne(y,1):y,[x,y]),O=!!v.extendedProps.rrule,k=O?S(b(v.extendedProps.rrule,v.start.getTime()/1e3)):null,A=ye(String(v.id)),j=v.allDay?`PP`:`PPp`,M=!!v.extendedProps.cancelled,N=!!v.extendedProps.isEdited,P=!!v.extendedProps.hasOverride,F=()=>e.view.calendar.refetchEvents(),ee=()=>{A&&(n(),fe({eventId:ge(String(v.id)),recurrenceId:A,siteId:i,onSave:F}))},te=async()=>{if(!A||g)return;p(!0);let e=await ae({event:v,recurrenceId:A,siteId:i});if(e){window.location.href=e;return}p(!1)},ne=async()=>{if(!(!A||g)){u(!0);try{await le({event:v,recurrenceId:A,cancelled:!M,siteId:i,refetchEvents:F})&&n()}finally{u(!1)}}},re=async()=>{if(!o){s(!0);try{await ve({event:v,scope:`series`,recurrenceId:A,siteId:i,refetchEvents:F})&&n()}finally{s(!1)}}},I=()=>{r((0,Z.jsx)(Za,{action:`delete`,onSelect:async e=>e===`occurrence`&&P&&!window.confirm(l(`This occurrence has its own changes, which are deleted with it. Delete it?`))?!1:ve({event:v,scope:e,recurrenceId:A,siteId:i,refetchEvents:F})}),e.el)},ie=async()=>{if(g)return;h(!0);let e=await R(v,i);if(e){window.location.href=e;return}h(!1)},oe=[{label:l(m?`Duplicating...`:`Duplicate Event`),icon:`clone-dashed`,color:`fuchsia`,onSelect:()=>void ie()}];return O&&A&&oe.push({label:l(`Edit occurrence`),icon:`pencil`,onSelect:ee},{label:l(d?`Processing...`:`Edit this and following occurrences`),icon:`calendar-pen`,onSelect:()=>void te()},{label:l(M?`Restore occurrence`:`Cancel occurrence`),icon:M?`rotate-left`:`ban`,onSelect:()=>void ne()}),oe.push({label:l(o?`Deleting...`:`Delete`),icon:`trash`,destructive:!0,onSelect:()=>{O?I():window.confirm(l(`Are you sure you want to delete this event?`))&&re()}}),(0,Z.jsxs)(Ga,{children:[(0,Z.jsx)(qa,{type:`button`,className:`icon`,"data-icon":`remove`,"aria-label":l(`Close`),title:l(`Close`),disabled:g,onClick:n}),(0,Z.jsx)(`h1`,{className:z(`event-title`,M&&`is-cancelled`),children:v.title}),C&&(0,Z.jsxs)(`div`,{className:`calendar-label`,children:[(0,Z.jsx)(`span`,{className:`calendar-label-dot`,style:{backgroundColor:E},"aria-hidden":`true`}),(0,Z.jsx)(`span`,{children:C})]}),(M||N)&&(0,Z.jsx)(`div`,{className:z(`occurrence-status`,M?`is-cancelled`:`is-edited`),children:l(M?`This occurrence is cancelled.`:`This occurrence has its own changes.`)}),(0,Z.jsx)(_,{result:v.extendedProps.overlaps,formats:a}),(0,Z.jsx)(`hr`,{}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`b`,{children:[l(`Starts`),`:`]}),` `,V(t(v.start),j,{locale:f()}),(0,Z.jsx)(`br`,{}),(0,Z.jsxs)(`b`,{children:[l(`Ends`),`:`]}),` `,V(t(D),j,{locale:f()})]}),k&&(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`b`,{children:[l(`Repeats`),`:`]}),` `,k]}),(w||T)&&(0,Z.jsxs)(`dl`,{className:`event-details`,children:[w&&(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`dt`,{children:l(`Location`)}),(0,Z.jsx)(`dd`,{className:`event-location`,children:w})]}),T&&(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`dt`,{children:l(`Description`)}),(0,Z.jsx)(`dd`,{className:`event-description`,children:T})]})]}),(0,Z.jsx)(`hr`,{}),(0,Z.jsxs)(Ka,{children:[(0,Z.jsx)(`a`,{href:v.url,className:z(`btn submit`,g&&`disabled`),"aria-disabled":g,onClick:e=>{g&&e.preventDefault()},children:l(`Edit Event`)}),(0,Z.jsx)(Qa,{actions:oe,disabled:g})]})]})},eo=new Intl.DateTimeFormat(f().code,{weekday:`short`,timeZone:`UTC`}),to=new Intl.DateTimeFormat(f().code,{day:`numeric`,timeZone:`UTC`}),no=new Intl.DateTimeFormat(f().code,{weekday:`long`,timeZone:`UTC`}),ro=new Intl.DateTimeFormat(f().code,{month:`long`,year:`numeric`,timeZone:`UTC`}),io={dayGridMonth:{dayHeaderFormat:{weekday:`long`}},listMonth:{displayEventEnd:!0,listDayFormat:{weekday:`long`,month:`long`,day:`numeric`},listDaySideFormat:!1}},ao={closeDelayMs:300,position:[`bottom`,`top`,`right`,`left`]},oo=e=>{let t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}:00`},so=e=>!!(e.extendedProps?.rrule||e.extendedProps?.repeats),co=({hiddenCalendarIds:e,selectedDate:t,onDateChange:n,miniDateSelection:r,onMiniDateSelectionHandled:i})=>{let{hidePopover:a,showPopover:o}=ci(),{range:l,setRange:u}=Mi(),{currentDay:d,language:f,formats:p,weekStartDay:h,overlapThresholdString:_,allDayDefault:v,eventDuration:y,timeInterval:b,canEditEvents:x,isDragAndDropEnabled:S,isQuickCreateEnabled:C,currentSiteId:w,defaultCalendarView:T,enabledCalendarViews:E}=$(),{view:D,setView:O,isReady:k,enabledViews:A,resolveView:j}=ra(T,E),M=x&&C,N=(0,U.useRef)(null),P=(0,U.useRef)(null),[F,ee]=(0,U.useState)(null),te=(0,U.useRef)(l),ne=e.join(`,`),re=(0,U.useRef)(null),I=(0,U.useRef)(void 0),ie=(0,U.useRef)(!1),ae=(0,U.useRef)(0),[L,ce]=(0,U.useState)(null),[le,de]=(0,U.useState)(null),[R,fe]=(0,U.useState)(!1),[pe,ge]=(0,U.useState)(Sa),[_e,ve]=(0,U.useState)(!1);(0,U.useEffect)(()=>{k&&ee(P.current?.querySelector(`.fc-header-toolbar .fc-toolbar-chunk:first-child`)??null)},[k]);let be=(0,U.useCallback)(()=>N.current?.getApi(),[N.current]),xe=(0,U.useMemo)(()=>be(),[be]),Se=(0,U.useMemo)(()=>({alignment:`center`,position:[`right`,`left`,`bottom`,`top`]}),[]),{datePickerButton:Ce,dateSelector:we}=ua(xe,D,l);(0,U.useEffect)(()=>{if(te.current===l)return;te.current=l;let e=N.current?.getApi();e?.view.type===`listMonth`&&e.refetchEvents()},[l]);let Te=(0,U.useMemo)(()=>new Set(e),[e]),Ee=oo(b),De=(0,U.useMemo)(()=>he(Te,w,void 0,pe),[Te,w,pe]),Oe=(0,U.useMemo)(()=>sa(xe,{datePickerButton:Ce}),[Ce,xe]),je=(0,U.useCallback)(()=>{N.current?.getApi().refetchEvents()},[]),z=va(je),{add:Ne,run:Pe,busy:B}=z,[V,Fe]=(0,U.useState)(!1),Ie=(0,U.useCallback)((e,t)=>{clearTimeout(I.current),a();let n=j(t);aa(e,n),N.current?.getApi().changeView(n,e)},[a,j]),Le=(0,U.useCallback)((e,t,n)=>{let r=N.current?.getApi(),i=r?.getEventById(e);!i||!r||B||V||R||o((0,Z.jsx)($a,{fcEvent:{event:i,el:t,jsEvent:n.nativeEvent,view:r.view}}),t)},[o,B,V,R]),Re=(0,U.useMemo)(()=>({...io,listMonth:{...io.listMonth,...ji(l)},calendarYear:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1},titleFormat:{year:`numeric`},content:e=>(0,Z.jsx)(ja,{content:e,disabled:B||V||L!==null,loading:R,error:_e,search:pe,onDateSelect:e=>Ie(e,`timeGridDay`),onMonthSelect:e=>Ie(e,`dayGridMonth`),onEventSelect:Le})}}),[l,B,V,L,R,_e,pe,Ie,Le]),H=(0,U.useCallback)(()=>{ce(null),de(null)},[]);(0,U.useEffect)(()=>{if(!k)return;let e=N.current?.getApi();if(e){if(re.current===null){re.current=ne;return}re.current!==ne&&(re.current=ne,e.refetchEvents())}},[ne,k]);let Be=(0,U.useCallback)(()=>{H(),a()},[H,a]),Ve=(0,U.useCallback)(e=>{if(e===pe)return;clearTimeout(I.current),Be(),ge(e);let t=new URL(window.location.href);e?t.searchParams.set(`search`,e):t.searchParams.delete(`search`),history.replaceState(null,``,t)},[pe,Be]);(0,U.useEffect)(()=>{let e=N.current?.getApi();if(!e)return;let t=e.getEvents().find(e=>Zi(e));if(!L){t?.remove();return}if(t){Xi(t,L);return}e.addEvent(Wi(L))},[L]),(0,U.useEffect)(()=>{if(!L){a();return}if(!le){a();return}o((0,Z.jsx)(Wa,{draft:L,onChange:ce,refetchEvents:je,onConfirm:H,onCancel:Be}),le,Se)},[Be,H,L,le,a,Se,je,o]);let He=(0,U.useCallback)(e=>{clearTimeout(I.current),a(),e.view.calendar.getEvents().find(e=>Zi(e))?.remove(),de(null),ce(Ui(e,{allDayDefault:v,eventDuration:y})),e.view.calendar.unselect()},[v,y,a]),Ue=(0,U.useCallback)(e=>{e.jsEvent.detail<2||(clearTimeout(I.current),a(),xe.getEvents().find(e=>Zi(e))?.remove(),de(null),ce(Ui({start:e.date,end:e.allDay?Me(e.date,1):e.date,allDay:e.allDay},{allDayDefault:v,eventDuration:y})))},[xe,v,y,a]);(0,U.useEffect)(()=>()=>clearTimeout(I.current),[]),(0,U.useEffect)(()=>{let e=N.current?.getApi();if(!e||!r)return;let t=j(e.view.type===`listMonth`?`listMonth`:`timeGridDay`);e.changeView(t,r),aa(r,t),i()},[r,i,j]),(0,U.useEffect)(()=>{let e=N.current?.getApi();!e||g(e.getDate())===g(t)||e.gotoDate(t)},[t]);let We=(0,U.useCallback)(()=>clearTimeout(I.current),[]),Ge=(0,U.useCallback)(()=>{ie.current=!0,clearTimeout(I.current),a()},[a]),Ke=(0,U.useCallback)(()=>{ie.current=!1},[]),qe=(0,U.useCallback)(e=>{Zi(e.event)&&de(e.el)},[]),Je=(0,U.useCallback)(e=>{Zi(e.event)&&de(t=>t===e.el?null:t)},[]),Ye=(0,U.useCallback)((e,t)=>{if(Zi(t.event)||B){t.revert();return}let n=async n=>{let r={event:t.event,recurrenceId:ye(String(t.event.id)),scope:n,siteId:w,refetchEvents:je,revert:t.revert,onHistoryEntry:Ne},i=!1,a=await Pe(()=>(i=!0,e===`move`?oe(r):se({...r,oldEvent:t.oldEvent})));return i||t.revert(),a};if(!so(t.event)){n();return}Fe(!0),o((0,Z.jsx)(Za,{action:e,onSelect:async e=>{let t=await n(e);return Fe(!1),t||a(),t},onCancel:()=>{t.revert(),Fe(!1)}},++ae.current),t.jsEvent)},[w,a,je,o,Ne,Pe,B]),Xe=(0,U.useCallback)(e=>{let t=s(e),n=j(`timeGridDay`);aa(t,n),N.current?.getApi().changeView(n,t)},[j]),Ze=(0,U.useCallback)(e=>e.view.type===`timeGridWeek`&&g(e.date)===g(d)?[`fc-title-today`]:[],[d]),W=(0,U.useCallback)(e=>{if(e.view.type===`listMonth`){let t=e;return(0,Z.jsxs)(`a`,{...t.navLinkAttrs,href:Craft.getCpUrl(`calendar/${c(e.date)}/${na(j(`timeGridDay`))}`),id:t.textId,className:`calendar-agenda-day`,"aria-label":e.text,children:[(0,Z.jsx)(`span`,{className:`calendar-agenda-day-number`,"aria-hidden":`true`,children:to.format(e.date)}),(0,Z.jsxs)(`span`,{className:`calendar-agenda-day-label`,"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{children:no.format(e.date)}),(0,Z.jsx)(`span`,{className:`calendar-agenda-day-month`,children:ro.format(e.date)})]})]})}if(e.view.type!==`timeGridWeek`)return e.text;let t=eo.format(e.date),n=to.format(e.date);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`span`,{className:`fc-day-header-label`,children:t}),(0,Z.jsx)(`span`,{className:`fc-day-header-date`,children:n})]})},[j]);if(!k)return null;let G=document.querySelector(`[data-calendar-history-root]`),Qe=x&&S?(0,Z.jsx)(xa,{canUndo:z.canUndo,canRedo:z.canRedo,disabled:B||R||V||L!==null,onReplay:e=>{a(),z.replay(e)}}):null,$e=document.querySelector(`[data-calendar-search-root]`),et=(0,Z.jsx)(Ca,{initialSearch:pe,onSearchChange:Ve});return(0,Z.jsxs)(ze,{ref:P,className:R?`is-fetching-events`:void 0,children:[$e?(0,ui.createPortal)(et,$e):et,G?(0,ui.createPortal)(Qe,G):Qe,D===`listMonth`&&F&&(0,ui.createPortal)((0,Z.jsx)(Ni,{range:l,disabled:B||V||L!==null,onChange:e=>{clearTimeout(I.current),a(),u(e)}}),F),(0,Z.jsx)(me,{...m(),ref:N,themeSystem:`bootstrap5`,plugins:[ue,Ae,wi,ke],customButtons:Oe,initialView:D,initialDate:d,height:D===`listMonth`||D===`calendarYear`?`auto`:void 0,locale:f,views:Re,timeZone:`UTC`,firstDay:h,nextDayThreshold:_,fixedWeekCount:!0,dayMaxEventRows:!0,editable:x&&S&&!B&&!V&&!R,selectable:M,selectMirror:!1,selectMinDistance:5,slotDuration:Ee,snapDuration:Ee,navLinks:!0,navLinkDayClick:Xe,select:M?He:void 0,dateClick:M?Ue:void 0,dayHeaderClassNames:Ze,dayHeaderContent:W,events:De,eventClassNames:ma,eventContent:ga,progressiveEventRendering:!0,eventTimeFormat:p.time.short.js,loading:e=>{e&&ve(!1),fe(e)},eventSourceFailure:()=>ve(!0),noEventsContent:()=>(0,Z.jsx)(`span`,{role:`status`,children:Craft.t(`calendar`,_e?`Couldn’t load events. Use Refresh to try again.`:R?`Loading events…`:pe?`No matching events in this date range.`:`No events in this date range.`)}),eventDidMount:qe,eventWillUnmount:Je,eventMouseEnter:e=>{e.view.type!==`dayGridMonth`&&e.view.type!==`listMonth`||L!==null||ie.current||B||R||V||ha(e.event,e.jsEvent.target)!==`ignore`&&(clearTimeout(I.current),I.current=setTimeout(()=>o((0,Z.jsx)($a,{fcEvent:e}),e.el,ao),300),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventMouseLeave:We,eventDragStart:Ge,eventDragStop:Ke,eventResizeStart:Ge,eventResizeStop:Ke,eventClick:e=>{if(L!==null||B||R||V){e.jsEvent.preventDefault();return}ha(e.event,e.jsEvent.target)===`open`&&(o((0,Z.jsx)($a,{fcEvent:e}),e.el),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventDrop:e=>Ye(`move`,e),eventResize:e=>Ye(`resize`,e),headerToolbar:{start:`title`,center:A.join(`,`),end:oa},buttonText:{dayGridMonth:Craft.t(`calendar`,`Month`),timeGridWeek:Craft.t(`calendar`,`Week`),timeGridDay:Craft.t(`calendar`,`Day`),listMonth:Craft.t(`calendar`,`Agenda`),calendarYear:Craft.t(`calendar`,`Year`),today:Craft.t(`calendar`,`Today`)},datesSet:({view:e})=>{n(e.calendar.getDate()),setTimeout(()=>{O(e.type),aa(e.calendar.getDate(),e.type)},50)}}),we]})},lo=r.div`
  color: var(--gray-600);
`,uo=r.div`
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
`,fo=r.button`
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
`,po=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 7px;

  span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
`,mo=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 4px;
`,ho=r.button`
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
`,go=(e,t,n)=>new Date(Date.UTC(e,t,n)),_o=e=>go(e.getUTCFullYear(),e.getUTCMonth(),1),vo=(e,t)=>go(e.getUTCFullYear(),e.getUTCMonth()+t,1),yo=({selectedDate:e,onDateSelect:t})=>{let{language:n,weekStartDay:r}=$(),[i,a]=(0,U.useState)(()=>_o(e));(0,U.useEffect)(()=>{a(_o(e))},[e]);let o=(0,U.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`long`,year:`numeric`,timeZone:`UTC`}),[n]),s=(0,U.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`narrow`,timeZone:`UTC`}),[n]),c=(0,U.useMemo)(()=>Array.from({length:7},(e,t)=>s.format(go(2023,0,1+r+t))),[r,s]),l=(0,U.useMemo)(()=>{let e=i.getUTCFullYear(),t=i.getUTCMonth(),n=go(e,t,1),a=go(e,t+1,0),o=(n.getUTCDay()-r+7)%7,s=((r+6)%7-a.getUTCDay()+7)%7,c=o+a.getUTCDate()+s;return Array.from({length:c},(n,r)=>go(e,t,1-o+r))},[i,r]),u=g(new Date);return(0,Z.jsxs)(lo,{children:[(0,Z.jsxs)(uo,{children:[(0,Z.jsx)(fo,{"aria-label":Craft.t(`calendar`,`Previous month`),type:`button`,onClick:()=>a(e=>vo(e,-1))}),(0,Z.jsx)(`span`,{children:o.format(i)}),(0,Z.jsx)(fo,{"aria-label":Craft.t(`calendar`,`Next month`),type:`button`,$next:!0,onClick:()=>a(e=>vo(e,1))})]}),(0,Z.jsx)(po,{children:c.map((e,t)=>(0,Z.jsx)(`span`,{children:e},`${e}-${t}`))}),(0,Z.jsx)(mo,{children:l.map(e=>{let r=g(e);return(0,Z.jsx)(ho,{"aria-label":e.toLocaleDateString(n,{timeZone:`UTC`}),type:`button`,$isCurrentMonth:e.getUTCMonth()===i.getUTCMonth(),$isToday:r===u,onClick:()=>t(e),children:e.getUTCDate()},r)})})]})},bo=h`
  100% {
    transform: translateX(100%);
  }
`,xo=r.div`
  position: relative;
  overflow: hidden;

  background: ${H.gray200};

  &::after {
    content: "";

    position: absolute;
    inset: 0;

    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgb(from ${H.gray050} r g b / 70%),
      transparent
    );

    animation: ${bo} 1.4s ${Ve.easeInOut} infinite;
  }
`,So=({width:e=`100%`,height:t=16,borderRadius:n=4,className:r})=>(0,Z.jsx)(xo,{"aria-hidden":`true`,className:r,style:{borderRadius:n,height:t,width:e}}),Co=async e=>{let t=await _e($r(`/api/calendars`),{signal:e});if(!t.ok)throw Error(`Failed to fetch calendars`);return t.json()},wo=()=>{let[e,t]=(0,U.useState)([]),[n,r]=(0,U.useState)(null),[i,a]=(0,U.useState)(!1),o=(0,U.useCallback)(async e=>{a(!0),r(null);try{let n=await Co(e);t(n)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;r(e instanceof Error?e:Error(`Failed to fetch calendars`))}finally{a(!1)}},[]);return(0,U.useEffect)(()=>{let e=new AbortController;return o(e.signal),()=>{e.abort()}},[o]),{data:e,error:n,isPending:i,refetch:o}},To=r.div`
  padding: 0;
`,Eo=r.div`
  display: flex;
  flex-direction: column;
`,Do=r.hr`
  width: 100%;
  margin: 16px 0;
  border: 0;
  border-top: 1px solid var(--gray-200);
`,Oo=r.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0;
  padding: 0;

  list-style: none;
`,ko=r.li`
  margin: 0;
`,Ao=r.label`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0;

  border-radius: 4px;

  color: ${H.gray800};
  cursor: pointer;
`,jo=r.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);

  &:focus-visible + span {
    border: 2px solid ${H.black};
  }

  &:checked + span {
    border: 1px solid var(--calendar-color);
  }

  &:checked + span:after {
    opacity: 1;
  }
`,Mo=r.span`
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
`,No=r.span`
  font-size: 13px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Po=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Fo=r.div`
  font-size: 13px;
  color: ${H.error};
`,Io=({hiddenCalendarIds:e,onToggleCalendar:t})=>{let{data:n,error:r,isPending:i}=wo(),a=new Set(e),o=i&&n.length===0;return(0,Z.jsxs)(To,{children:[o&&(0,Z.jsxs)(Po,{children:[(0,Z.jsx)(So,{height:16}),(0,Z.jsx)(So,{height:16}),(0,Z.jsx)(So,{height:16})]}),!o&&r&&(0,Z.jsx)(Fo,{children:r.message}),!o&&!r&&(0,Z.jsx)(Oo,{children:n.map(e=>(0,Z.jsx)(ko,{children:(0,Z.jsxs)(Ao,{style:{"--calendar-color":e.color.base,"--calendar-color-contrast":e.color.contrast},children:[(0,Z.jsx)(jo,{type:`checkbox`,checked:!a.has(e.id),onChange:()=>t(e.id)}),(0,Z.jsx)(Mo,{}),(0,Z.jsx)(No,{children:e.title})]})},e.id))})]})},Lo=()=>{let e=document.querySelector(`[data-sidebar-root]`),{hiddenCalendarIds:t,toggleCalendarVisibility:n}=ia(),{currentDay:r}=$(),[i,a]=(0,U.useState)(()=>new Date(r)),[o,s]=(0,U.useState)(null);return(0,Z.jsxs)(li,{children:[(0,Z.jsx)(co,{hiddenCalendarIds:t,selectedDate:i,onDateChange:a,miniDateSelection:o,onMiniDateSelectionHandled:()=>s(null)}),e&&(0,ui.createPortal)((0,Z.jsxs)(Eo,{children:[(0,Z.jsx)(Io,{hiddenCalendarIds:t,onToggleCalendar:n}),(0,Z.jsx)(Do,{}),(0,Z.jsx)(yo,{selectedDate:i,onDateSelect:e=>{a(e),s(e)}})]}),e)]})},Ro=document.getElementById(`calendar-overview`),zo=Ro.querySelector(`[data-root]`),Bo=Ro.querySelector(`[data-config]`),Vo=JSON.parse(Bo?.textContent||`{}`);ei.createRoot(zo).render((0,Z.jsx)(la,{config:Vo,children:(0,Z.jsx)(Or,{basename:$r(`/`,!1),children:(0,Z.jsx)(Vn,{children:(0,Z.jsxs)(zn,{path:`/`,element:(0,Z.jsx)(Jr,{}),children:[(0,Z.jsx)(zn,{index:!0,element:(0,Z.jsx)(Lo,{})}),(0,Z.jsx)(zn,{path:`overview`,element:(0,Z.jsx)(Lo,{})}),(0,Z.jsx)(zn,{path:`:year/:month/:day/:view?`,element:(0,Z.jsx)(Lo,{})})]})})})}));