import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,b as c,i as l,j as u,k as d,n as f,r as p,t as m,w as h,y as g}from"./localization-Dt_HqhpZ.js";import{T as _,i as v,s as y,w as b}from"./calendar-preview.operations-DLg5NIyx.js";import{$t as x,A as S,Dt as C,F as w,Ft as T,G as E,Ht as D,Kt as O,Ot as k,Pt as A,Rt as j,S as ee,Ut as M,Y as te,Zt as ne,_ as re,_n as N,_t as ie,a as ae,c as oe,ct as P,d as se,dn as ce,f as le,h as ue,hn as de,i as F,l as fe,ln as I,m as pe,n as me,o as he,p as ge,r as _e,s as ve,st as ye,t as be,u as xe,un as Se,v as Ce,wt as we,x as Te,y as Ee,z as De}from"./calendar.events-DxgmBNw7.js";import{t as Oe}from"./interaction-D2VE812o.js";import{t as ke}from"./timegrid-Bwykp3PL.js";import{a as Ae,b as je,c as L,f as Me,n as Ne,o as R,p as z,r as Pe,s as Fe,t as Ie}from"./components-CefPxcP5.js";import{n as Le,r as Re}from"./calendar.styles-CRMIVgex.js";import{n as B,r as ze,t as Be}from"./variables-CkfOKRDd.js";var Ve=`modulepreload`,He=function(e,t){return new URL(e,t).href},Ue={},We=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=He(t,n),t=s(t),t in Ue)return;Ue[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Ve,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},V=i(e(),1),Ge=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,Ke=/^[\\/]{2}/;function qe(e,t){return t+e.replace(/\\/g,`/`)}var Je=`popstate`;function Ye(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function Xe(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return $e(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:et(t)}return nt(t,n,null,e)}function H(e,t){if(e===!1||e==null)throw Error(t)}function U(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function Ze(){return Math.random().toString(36).substring(2,10)}function Qe(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function $e(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?tt(t):t,state:n,key:t&&t.key||r||Ze(),mask:i}}function et({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function tt(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function nt(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=Ye(e)?e:$e(h.location,e,t);n&&n(r,e),l=u()+1;let d=Qe(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=Ye(e)?e:$e(h.location,e,t);n&&n(r,e),l=u();let i=Qe(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return rt(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(Je,d),c=e,()=>{i.removeEventListener(Je,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function rt(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),H(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:et(t);return i=i.replace(/ $/,`%20`),!n&&Ke.test(i)&&(i=r+i),new URL(i,r)}function it(e,t,n=`/`){return at(e,t,n,!1)}function at(e,t,n,r,i){let a=W((typeof t==`string`?tt(t):t).pathname||`/`,n);if(a==null)return null;let o=i??st(e),s=null,c=wt(a);for(let e=0;s==null&&e<o.length;++e)s=bt(o[e],c,r);return s}function ot(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function st(e){let t=ct(e);return ut(t),t}function ct(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;H(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=G([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(H(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),ct(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:vt(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=Ct(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of lt(e.path))a(e,t,!0,n)}),t}function lt(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=lt(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function ut(e){e.sort((e,t)=>e.score===t.score?yt(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var dt=/^:[\w-]+$/,ft=3,pt=2,mt=1,ht=10,gt=-2,_t=e=>e===`*`;function vt(e,t){let n=e.split(`/`),r=n.length;return n.some(_t)&&(r+=gt),t&&(r+=pt),n.filter(e=>!_t(e)).reduce((e,t)=>e+(dt.test(t)?ft:t===``?mt:ht),r)}function yt(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function bt(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?St(u,l,s.matcher,s.compiledParams):xt(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=xt({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:G([a,d.pathname]),pathnameBase:Nt(G([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=G([a,d.pathnameBase]))}return o}function xt(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Ct(e.path,e.caseSensitive,e.end);return St(e,t,n,r)}function St(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Ct(e,t=!1,n=!0){U(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function wt(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return U(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function W(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Tt(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?tt(e):e,a;return n?(n=jt(n),a=n.startsWith(`/`)?Et(n.substring(1),`/`):Et(n,t)):a=t,{pathname:a,search:Pt(r),hash:Ft(i)}}function Et(e,t){let n=Mt(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Dt(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ot(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function kt(e){let t=Ot(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function At(e,t,n,r=!1){let i;typeof e==`string`?i=tt(e):(i={...e},H(!i.pathname||!i.pathname.includes(`?`),Dt(`?`,`pathname`,`search`,i)),H(!i.pathname||!i.pathname.includes(`#`),Dt(`#`,`pathname`,`hash`,i)),H(!i.search||!i.search.includes(`#`),Dt(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Tt(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var jt=e=>e.replace(/[\\/]{2,}/g,`/`),G=e=>jt(e.join(`/`)),Mt=e=>e.replace(/\/+$/,``),Nt=e=>Mt(e).replace(/^\/*/,`/`),Pt=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ft=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,It=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Lt(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Rt(e){return G(e.map(e=>e.route.path).filter(Boolean))||`/`}var zt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Bt(e,t){let n=e;if(typeof n!=`string`||!Ge.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(zt)try{let e=new URL(window.location.href),r=Ke.test(n)?new URL(qe(n,e.protocol)):new URL(n),a=W(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{U(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Vt=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Vt);var Ht=[`GET`,...Vt];new Set(Ht);var Ut=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Wt(e){try{return Ut.includes(new URL(e).protocol)}catch{return!1}}var Gt=V.createContext(null);Gt.displayName=`DataRouter`;var Kt=V.createContext(null);Kt.displayName=`DataRouterState`;var qt=V.createContext(!1);function Jt(){return V.useContext(qt)}var Yt=V.createContext({isTransitioning:!1});Yt.displayName=`ViewTransition`;var Xt=V.createContext(new Map);Xt.displayName=`Fetchers`;var Zt=V.createContext(null);Zt.displayName=`Await`;var K=V.createContext(null);K.displayName=`Navigation`;var Qt=V.createContext(null);Qt.displayName=`Location`;var q=V.createContext({outlet:null,matches:[],isDataRoute:!1});q.displayName=`Route`;var $t=V.createContext(null);$t.displayName=`RouteError`;var en=`REACT_ROUTER_ERROR`,tn=`REDIRECT`,nn=`ROUTE_ERROR_RESPONSE`;function rn(e){if(e.startsWith(`${en}:${tn}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function an(e){if(e.startsWith(`${en}:${nn}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new It(t.status,t.statusText,t.data)}catch{}}function on(e,{relative:t}={}){H(sn(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=V.useContext(K),{hash:i,pathname:a,search:o}=mn(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:G([n,a])),r.createHref({pathname:s,search:o,hash:i})}function sn(){return V.useContext(Qt)!=null}function J(){return H(sn(),`useLocation() may be used only in the context of a <Router> component.`),V.useContext(Qt).location}var cn=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function ln(e){V.useContext(K).static||V.useLayoutEffect(e)}function un(){let{isDataRoute:e}=V.useContext(q);return e?Nn():dn()}function dn(){H(sn(),`useNavigate() may be used only in the context of a <Router> component.`);let e=V.useContext(Gt),{basename:t,navigator:n}=V.useContext(K),{matches:r}=V.useContext(q),{pathname:i}=J(),a=JSON.stringify(kt(r)),o=V.useRef(!1);return ln(()=>{o.current=!0}),V.useCallback((r,s={})=>{if(U(o.current,cn),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=At(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:G([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var fn=V.createContext(null);function pn(e){let t=V.useContext(q).outlet;return V.useMemo(()=>t&&V.createElement(fn.Provider,{value:e},t),[t,e])}function mn(e,{relative:t}={}){let{matches:n}=V.useContext(q),{pathname:r}=J(),i=JSON.stringify(kt(n));return V.useMemo(()=>At(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function hn(e,t){return gn(e,t)}function gn(e,t,n){H(sn(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=V.useContext(K),{matches:i}=V.useContext(q),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Fn(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=J(),d;if(t){let e=typeof t==`string`?tt(t):t;H(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):it(e,{pathname:p});U(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),U(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Cn(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:G([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:G([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?V.createElement(Qt.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function _n(){let e=Mn(),t=Lt(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=V.createElement(V.Fragment,null,V.createElement(`p`,null,`💿 Hey developer 👋`),V.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,V.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,V.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),V.createElement(V.Fragment,null,V.createElement(`h2`,null,`Unexpected Application Error!`),V.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?V.createElement(`pre`,{style:i},n):null,o)}var vn=V.createElement(_n,null),yn=class extends V.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=an(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:V.createElement(q.Provider,{value:this.props.routeContext},V.createElement($t.Provider,{value:e,children:this.props.component}));return this.context?V.createElement(xn,{error:e},t):t}};yn.contextType=qt;var bn=new WeakMap;function xn({children:e,error:t}){let{basename:n}=V.useContext(K);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=rn(t.digest);if(e){let r=bn.get(t);if(r)throw r;let i=Bt(e.location,n),a=i.absoluteURL||i.to;if(Wt(a))throw Error(`Invalid redirect location`);if(zt&&!bn.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw bn.set(t,n),n}return V.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function Sn({routeContext:e,match:t,children:n}){let r=V.useContext(Gt);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),V.createElement(q.Provider,{value:e},n)}function Cn(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);H(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Rt(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||vn,o&&(s<0&&c===0?(Fn(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?V.createElement(n.route.Component,null):n.route.element?n.route.element:e,V.createElement(Sn,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?V.createElement(yn,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function wn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Tn(e){let t=V.useContext(Gt);return H(t,wn(e)),t}function En(e){let t=V.useContext(Kt);return H(t,wn(e)),t}function Dn(e){let t=V.useContext(q);return H(t,wn(e)),t}function On(e){let t=Dn(e),n=t.matches[t.matches.length-1];return H(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function kn(){return On(`useRouteId`)}function An(){let e=En(`useNavigation`);return V.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function jn(){let{matches:e,loaderData:t}=En(`useMatches`);return V.useMemo(()=>e.map(e=>ot(e,t)),[e,t])}function Mn(){let e=V.useContext($t),t=En(`useRouteError`),n=On(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Nn(){let{router:e}=Tn(`useNavigate`),t=On(`useNavigate`),n=V.useRef(!1);return ln(()=>{n.current=!0}),V.useCallback(async(r,i={})=>{U(n.current,cn),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Pn={};function Fn(e,t,n){!t&&!Pn[e]&&(Pn[e]=!0,U(!1,n))}V.memo(In);function In({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return gn(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Ln(e){return pn(e.context)}function Rn(e){H(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function zn({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){H(!sn(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=V.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=tt(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=V.useMemo(()=>{let e=W(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return U(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:V.createElement(K.Provider,{value:c},V.createElement(Qt.Provider,{children:t,value:h}))}function Bn({children:e,location:t}){return hn(Vn(e),t)}V.Component;function Vn(e,t=[]){let n=[];return V.Children.forEach(e,(e,r)=>{if(!V.isValidElement(e))return;let i=[...t,r];if(e.type===V.Fragment){n.push.apply(n,Vn(e.props.children,i));return}H(e.type===Rn,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),H(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Vn(e.props.children,i)),n.push(a)}),n}var Hn=`get`,Un=`application/x-www-form-urlencoded`;function Wn(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Gn(e){return Wn(e)&&e.tagName.toLowerCase()===`button`}function Kn(e){return Wn(e)&&e.tagName.toLowerCase()===`form`}function qn(e){return Wn(e)&&e.tagName.toLowerCase()===`input`}function Jn(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Yn(e,t){return e.button===0&&(!t||t===`_self`)&&!Jn(e)}var Xn=null;function Zn(){if(Xn===null)try{new FormData(document.createElement(`form`),0),Xn=!1}catch{Xn=!0}return Xn}var Qn=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function $n(e){return e!=null&&!Qn.has(e)?(U(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Un}"`),null):e}function er(e,t){let n,r,i,a,o;if(Kn(e)){let o=e.getAttribute(`action`);r=o?W(o,t):null,n=e.getAttribute(`method`)||Hn,i=$n(e.getAttribute(`enctype`))||Un,a=new FormData(e)}else if(Gn(e)||qn(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?W(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Hn,i=$n(e.getAttribute(`formenctype`))||$n(o.getAttribute(`enctype`))||Un,a=new FormData(o,e),!Zn()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Wn(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Hn,r=null,i=Un,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var tr={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},nr=/[&><\u2028\u2029]/g;function rr(e){return e.replace(nr,e=>tr[e])}function ir(e,t){if(e===!1||e==null)throw Error(t)}function ar(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&W(i.pathname,t)===`/`?i.pathname=`${Mt(t)}/_root.${r}`:i.pathname=`${Mt(i.pathname)}.${r}`,i}async function or(e,t){if(e.id in t)return t[e.id];try{let n=await We(()=>import(e.module),[],import.meta.url);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function sr(e){return e!=null&&typeof e.page==`string`}function cr(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function lr(e,t,n){return mr((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await or(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(cr).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function ur(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function dr(e,t,{includeHydrateFallback:n}={}){return fr(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function fr(e){return[...new Set(e)]}function pr(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function mr(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!sr(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(pr(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function hr(){let e=V.useContext(Gt);return ir(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function gr(){let e=V.useContext(Kt);return ir(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var _r=V.createContext(void 0);_r.displayName=`FrameworkContext`;function vr(){let e=V.useContext(_r);return ir(e,`You must render this element inside a <HydratedRouter> element`),e}function yr(e,t){let n=V.useContext(_r),[r,i]=V.useState(!1),[a,o]=V.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=V.useRef(null);V.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),V.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:br(s,p),onBlur:br(c,m),onMouseEnter:br(l,p),onMouseLeave:br(u,m),onTouchStart:br(d,p)}]:[a,f,{}]:[!1,f,{}]}function br(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function xr({page:e,...t}){let n=Jt(),{nonce:r}=vr(),{router:i}=hr(),a=V.useMemo(()=>it(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?V.createElement(Cr,{page:e,matches:a,...t}):V.createElement(wr,{page:e,matches:a,...t})):null}function Sr(e){let{manifest:t,routeModules:n}=vr(),[r,i]=V.useState([]);return V.useEffect(()=>{let r=!1;return lr(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Cr({page:e,matches:t,...n}){let r=J(),{future:i}=vr(),{basename:a}=hr(),o=V.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=ar(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return V.createElement(V.Fragment,null,o.map(e=>V.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function wr({page:e,matches:t,...n}){let r=J(),{future:i,manifest:a,routeModules:o}=vr(),{basename:s}=hr(),{loaderData:c,matches:l}=gr(),u=V.useMemo(()=>ur(e,t,l,a,r,`data`),[e,t,l,a,r]),d=V.useMemo(()=>ur(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=V.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=ar(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=V.useMemo(()=>dr(d,a),[d,a]),m=Sr(d);return V.createElement(V.Fragment,null,f.map(e=>V.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>V.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>V.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Tr(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}V.Component;var Er=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Er&&(window.__reactRouterVersion=`7.18.1`)}catch{}function Dr({basename:e,children:t,useTransitions:n,window:r}){let i=V.useRef();i.current??(i.current=Xe({window:r,v5Compat:!0}));let a=i.current,[o,s]=V.useState({action:a.action,location:a.location}),c=V.useCallback(e=>{n===!1?s(e):V.startTransition(()=>s(e))},[n]);return V.useLayoutEffect(()=>a.listen(c),[a,c]),V.createElement(zn,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function Or({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=V.useState({action:n.action,location:n.location}),o=V.useCallback(e=>{r===!1?a(e):V.startTransition(()=>a(e))},[r]);return V.useLayoutEffect(()=>n.listen(o),[n,o]),V.createElement(zn,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}Or.displayName=`unstable_HistoryRouter`;var kr=V.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=V.useContext(K),v=typeof l==`string`&&Ge.test(l),y=Bt(l,h);l=y.to;let b=on(l,{relative:r}),x=J(),S=null;if(o){let e=At(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:G([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=yr(n,p),E=Ir(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let O=!(y.isExternal||i),k=V.createElement(`a`,{...p,...T,href:(O?S:void 0)||y.absoluteURL||b,onClick:O?D:e,ref:Tr(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?V.createElement(V.Fragment,null,k,V.createElement(xr,{page:b})):k});kr.displayName=`Link`;var Ar=V.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=mn(a,{relative:c.relative}),d=J(),f=V.useContext(Kt),{navigator:p,basename:m}=V.useContext(K),h=f!=null&&Kr(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=W(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return V.createElement(kr,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});Ar.displayName=`NavLink`;var jr=V.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Hn,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=V.useContext(K),g=zr(),_=Br(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&Ge.test(s);return V.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?V.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});jr.displayName=`Form`;function Mr({getKey:e,storageKey:t,...n}){let r=V.useContext(_r),{basename:i}=V.useContext(K),a=J(),o=jn();Wr({getKey:e,storageKey:t});let s=V.useMemo(()=>{if(!r||!e)return null;let t=Ur(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),V.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${rr(JSON.stringify(t||Vr))}, ${rr(JSON.stringify(s))})`}})}Mr.displayName=`ScrollRestoration`;function Nr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Pr(e){let t=V.useContext(Gt);return H(t,Nr(e)),t}function Fr(e){let t=V.useContext(Kt);return H(t,Nr(e)),t}function Ir(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=un(),d=J(),f=mn(e,{relative:o});return V.useCallback(p=>{if(Yn(p,t)){p.preventDefault();let t=n===void 0?et(d)===et(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?V.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Lr=0,Rr=()=>`__${String(++Lr)}__`;function zr(){let{router:e}=Pr(`useSubmit`),{basename:t}=V.useContext(K),n=kn(),r=e.fetch,i=e.navigate;return V.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=er(e,t);if(a.navigate===!1){let e=a.fetcherKey||Rr();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Br(e,{relative:t}={}){let{basename:n}=V.useContext(K),r=V.useContext(q);H(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...mn(e||`.`,{relative:t})},o=J();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:G([n,a.pathname])),et(a)}var Vr=`react-router-scroll-positions`,Hr={};function Ur(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:W(e.pathname,n)||e.pathname},t)),i??(i=e.key),i}function Wr({getKey:e,storageKey:t}={}){let{router:n}=Pr(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Fr(`useScrollRestoration`),{basename:a}=V.useContext(K),o=J(),s=jn(),c=An();V.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Gr(V.useCallback(()=>{if(c.state===`idle`){let t=Ur(o,s,a,e);Hr[t]=window.scrollY}try{sessionStorage.setItem(t||Vr,JSON.stringify(Hr))}catch(e){U(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(V.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Vr);e&&(Hr=JSON.parse(e))}catch{}},[t]),V.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Hr,()=>window.scrollY,e?(t,n)=>Ur(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),V.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{U(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Gr(e,t){let{capture:n}=t||{};V.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Kr(e,{relative:t}={}){let n=V.useContext(Yt);H(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Pr(`useViewTransitionState`),i=mn(e,{relative:t});if(!n.isTransitioning)return!1;let a=W(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=W(n.nextLocation.pathname,r)||n.nextLocation.pathname;return xt(i.pathname,o)!=null||xt(i.pathname,a)!=null}var Y=a(),qr=()=>(0,Y.jsx)(Ln,{}),Jr=u(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),Yr=u((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),Xr=i(u(((e,t)=>{var n=Jr(),r=Yr(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function u(e){return(e||``).toString().replace(i,``)}var d=[[`#`,`hash`],[`?`,`query`],function(e,t){return m(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],f={hash:1,query:1};function p(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new _(unescape(e.pathname),{});else if(r===`string`)for(i in n=new _(e,{}),f)delete n[i];else if(r===`object`){for(i in e)i in f||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function m(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function h(e,t){e=u(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):m(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&m(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||m(r),slashesCount:s,rest:l}}function g(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function _(e,t,i){if(e=u(e),e=e.replace(a,``),!(this instanceof _))return new _(e,t,i);var o,s,c,f,v,y,b=d.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=p(t),s=h(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||l.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!m(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(f=b[C],typeof f==`function`){e=f(e,S);continue}c=f[0],y=f[1],c===c?typeof c==`string`?(v=c===`@`?e.lastIndexOf(c):e.indexOf(c),~v&&(typeof f[2]==`number`?(S[y]=e.slice(0,v),e=e.slice(v+f[2])):(S[y]=e.slice(v),e=e.slice(0,v)))):(v=c.exec(e))&&(S[y]=v[1],e=e.slice(0,v.index)):S[y]=e,S[y]=S[y]||o&&f[3]&&t[y]||``,f[4]&&(S[y]=S[y].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=g(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&m(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(v=S.auth.indexOf(`:`),~v?(S.username=S.auth.slice(0,v),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(v+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&m(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function v(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&m(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function y(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||m(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&m(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}_.prototype={set:v,toString:y},_.extractProtocol=h,_.location=p,_.trimLeft=u,_.qs=r,t.exports=_}))()),Zr=window.location.href.replace(/(.*\/calendar).*/i,`$1`),Qr=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,Xr.default)(`${Zr}${e}`);return t?n.href:n.pathname},$r=i(n()),ei=14,ti=e=>{if(e instanceof MouseEvent){let t=e.target;if(t instanceof HTMLElement){let n=t.getBoundingClientRect(),r=n.left+e.offsetX,i=n.top+e.offsetY;return new DOMRect(r,i,1,1)}return new DOMRect(e.clientX,e.clientY,1,1)}return e.getBoundingClientRect()},ni=({state:e,bridgeRef:t,popoverRef:n})=>{let[r,i]=(0,V.useState)(),a=(0,V.useMemo)(()=>{if(e)return b(e.options)},[e]),o=(0,V.useCallback)(()=>{if(!e||!a){i(void 0);return}let r=t.current,o=n.current;if(!r||!o)return;let s=ti(e.anchor),c=o.getBoundingClientRect(),l=r.getBoundingClientRect(),u=_({anchorRect:s,popoverRect:c,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:a,arrowPadding:ei});i({...u,top:u.top-l.top,left:u.left-l.left})},[e,a,t,n]);return(0,V.useLayoutEffect)(()=>{o()},[o]),(0,V.useEffect)(()=>{if(!e)return;let t=()=>o();return window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0)}},[e,o]),r},ri=r.div`
  position: relative;
`,ii=r.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`,ai=r.span`
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
`,oi=(0,V.createContext)(null),si=()=>{let e=(0,V.useContext)(oi);if(!e)throw Error(`usePopover must be used within a PopoverProvider`);return e},ci=({children:e})=>{let[t,n]=(0,V.useState)(),r=(0,V.useRef)(null),i=(0,V.useRef)(null),a=(0,V.useRef)(void 0),o=(0,V.useRef)(!1),s=(0,V.useCallback)((e,t,r)=>{clearTimeout(a.current),o.current=!1,n({content:e,anchor:t,options:r})},[]),c=(0,V.useCallback)(()=>{clearTimeout(a.current),n(void 0)},[]),l=(0,V.useCallback)(()=>{clearTimeout(a.current),o.current=!0},[]),u=(0,V.useMemo)(()=>({showPopover:s,hidePopover:c,keepPopoverOpen:l}),[s,c,l]),d=ni({state:t,bridgeRef:r,popoverRef:i}),f=t?.options?.closeDelayMs,p=(0,V.useCallback)(()=>clearTimeout(a.current),[]),m=(0,V.useCallback)(()=>{f===void 0||o.current||(clearTimeout(a.current),a.current=setTimeout(()=>n(void 0),f))},[f]);(0,V.useEffect)(()=>{let e=t?.anchor;if(!(f===void 0||!(e instanceof HTMLElement)))return e.addEventListener(`mouseleave`,m),()=>e.removeEventListener(`mouseleave`,m)},[t,f,m]),(0,V.useEffect)(()=>()=>clearTimeout(a.current),[]);let h=t?.content&&(0,Y.jsxs)(ii,{ref:i,onMouseEnter:p,onMouseLeave:m,style:{top:d?.top??0,left:d?.left??0,visibility:d?`visible`:`hidden`},children:[d&&(0,Y.jsx)(ai,{side:d.arrow.side,top:d.arrow.top,left:d.arrow.left}),t.content]});return(0,Y.jsx)(oi.Provider,{value:u,children:(0,Y.jsxs)(ri,{ref:r,children:[h,e]})})},li=i(d()),ui=class extends Ee{constructor(){super(...arguments),this.state={textId:j()}}render(){let{theme:e,dateEnv:t,options:n,viewApi:r}=this.context,{cellId:i,dayDate:a,todayRange:o}=this.props,{textId:s}=this.state,c=C(a,o),l=n.listDayFormat?t.format(a,n.listDayFormat):``,u=n.listDaySideFormat?t.format(a,n.listDaySideFormat):``,d=Object.assign({date:t.toDate(a),view:r,textId:s,text:l,sideText:u,navLinkAttrs:ye(this.context,a),sideNavLinkAttrs:ye(this.context,a,`day`,!1)},c);return N(Te,{elTag:`tr`,elClasses:[`fc-list-day`,...k(c,e)],elAttrs:{"data-date":we(a)},renderProps:d,generatorName:`dayHeaderContent`,customGenerator:n.dayHeaderContent,defaultGenerator:di,classNameGenerator:n.dayHeaderClassNames,didMount:n.dayHeaderDidMount,willUnmount:n.dayHeaderWillUnmount},t=>N(`th`,{scope:`colgroup`,colSpan:3,id:i,"aria-labelledby":s},N(t,{elTag:`div`,elClasses:[`fc-list-day-cushion`,e.getClass(`tableCellShaded`)]})))}};function di(e){return N(de,null,e.text&&N(`a`,Object.assign({id:e.textId,className:`fc-list-day-text`},e.navLinkAttrs),e.text),e.sideText&&N(`a`,Object.assign({"aria-hidden":!0,className:`fc-list-day-side-text`},e.sideNavLinkAttrs),e.sideText))}var fi=ie({hour:`numeric`,minute:`2-digit`,meridiem:`short`}),pi=class extends Ee{render(){let{props:e,context:t}=this,{options:n}=t,{seg:r,timeHeaderId:i,eventHeaderId:a,dateHeaderId:o}=e,s=n.eventTimeFormat||fi;return N(S,Object.assign({},e,{elTag:`tr`,elClasses:[`fc-list-event`,r.eventRange.def.url&&`fc-event-forced-url`],defaultGenerator:()=>mi(r,t),seg:r,timeText:``,disableDragging:!0,disableResizing:!0}),(e,n)=>N(de,null,hi(r,s,t,i,o),N(`td`,{"aria-hidden":!0,className:`fc-list-event-graphic`},N(`span`,{className:`fc-list-event-dot`,style:{borderColor:n.borderColor||n.backgroundColor}})),N(e,{elTag:`td`,elClasses:[`fc-list-event-title`],elAttrs:{headers:`${a} ${o}`}})))}};function mi(e,t){let n=A(e,t);return N(`a`,Object.assign({},n),e.eventRange.def.title)}function hi(e,t,n,r,i){let{options:a}=n;if(a.displayEventTime!==!1){let o=e.eventRange.def,s=e.eventRange.instance,c=!1,l;if(o.allDay?c=!0:ne(e.eventRange.range)?e.isStart?l=P(e,t,n,null,null,s.range.start,e.end):e.isEnd?l=P(e,t,n,null,null,e.start,s.range.end):c=!0:l=P(e,t,n),c){let e={text:n.options.allDayText,view:n.viewApi};return N(Te,{elTag:`td`,elClasses:[`fc-list-event-time`],elAttrs:{headers:`${r} ${i}`},renderProps:e,generatorName:`allDayContent`,customGenerator:a.allDayContent,defaultGenerator:gi,classNameGenerator:a.allDayClassNames,didMount:a.allDayDidMount,willUnmount:a.allDayWillUnmount})}return N(`td`,{className:`fc-list-event-time`},l)}return null}function gi(e){return e.text}var _i=class extends ee{constructor(){super(...arguments),this.computeDateVars=x(yi),this.eventStoreToSegs=x(this._eventStoreToSegs),this.state={timeHeaderId:j(),eventHeaderId:j(),dateHeaderIdRoot:j()},this.setRootEl=e=>{e?this.context.registerInteractiveComponent(this,{el:e}):this.context.unregisterInteractiveComponent(this)}}render(){let{props:e,context:t}=this,{dayDates:n,dayRanges:r}=this.computeDateVars(e.dateProfile),i=this.eventStoreToSegs(e.eventStore,e.eventUiBases,r);return N(E,{elRef:this.setRootEl,elClasses:[`fc-list`,t.theme.getClass(`table`),t.options.stickyHeaderDates===!1?``:`fc-list-sticky`],viewSpec:t.viewSpec},N(De,{liquid:!e.isHeightAuto,overflowX:e.isHeightAuto?`visible`:`hidden`,overflowY:e.isHeightAuto?`visible`:`auto`},i.length>0?this.renderSegList(i,n):this.renderEmptyMessage()))}renderEmptyMessage(){let{options:e,viewApi:t}=this.context;return N(Te,{elTag:`div`,elClasses:[`fc-list-empty`],renderProps:{text:e.noEventsText,view:t},generatorName:`noEventsContent`,customGenerator:e.noEventsContent,defaultGenerator:vi,classNameGenerator:e.noEventsClassNames,didMount:e.noEventsDidMount,willUnmount:e.noEventsWillUnmount},e=>N(e,{elTag:`div`,elClasses:[`fc-list-empty-cushion`]}))}renderSegList(e,t){let{theme:n,options:r}=this.context,{timeHeaderId:i,eventHeaderId:a,dateHeaderIdRoot:o}=this.state,s=bi(e);return N(w,{unit:`day`},(e,c)=>{let l=[];for(let n=0;n<s.length;n+=1){let u=s[n];if(u){let s=we(t[n]),d=o+`-`+s;l.push(N(ui,{key:s,cellId:d,dayDate:t[n],todayRange:c})),u=Se(u,r.eventOrder);for(let t of u)l.push(N(pi,Object.assign({key:s+`:`+t.eventRange.instance.instanceId,seg:t,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,timeHeaderId:i,eventHeaderId:a,dateHeaderId:d},T(t,c,e))))}}return N(`table`,{className:`fc-list-table `+n.getClass(`table`)},N(`thead`,null,N(`tr`,null,N(`th`,{scope:`col`,id:i},r.timeHint),N(`th`,{scope:`col`,"aria-hidden":!0}),N(`th`,{scope:`col`,id:a},r.eventHint))),N(`tbody`,null,l))})}_eventStoreToSegs(e,t,n){return this.eventRangesToSegs(I(e,t,this.props.dateProfile.activeRange,this.context.options.nextDayThreshold).fg,n)}eventRangesToSegs(e,t){let n=[];for(let r of e)n.push(...this.eventRangeToSegs(r,t));return n}eventRangeToSegs(e,t){let{dateEnv:n}=this.context,{nextDayThreshold:r}=this.context.options,i=e.range,a=e.def.allDay,o,s,c,l=[];for(o=0;o<t.length;o+=1)if(s=O(i,t[o]),s&&(c={component:this,eventRange:e,start:s.start,end:s.end,isStart:e.isStart&&s.start.valueOf()===i.start.valueOf(),isEnd:e.isEnd&&s.end.valueOf()===i.end.valueOf(),dayIndex:o},l.push(c),!c.isEnd&&!a&&o+1<t.length&&i.end<n.add(t[o+1].start,r))){c.end=i.end,c.isEnd=!0;break}return l}};function vi(e){return e.text}function yi(e){let t=ce(e.renderRange.start),n=e.renderRange.end,r=[],i=[];for(;t<n;)r.push(t),i.push({start:t,end:te(t,1)}),t=te(t,1);return{dayDates:r,dayRanges:i}}function bi(e){let t=[],n,r;for(n=0;n<e.length;n+=1)r=e[n],(t[r.dayIndex]||(t[r.dayIndex]=[])).push(r);return t}M(`:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid var(--fc-border-color)}.fc .fc-list-empty{align-items:center;background-color:var(--fc-neutral-bg-color);display:flex;height:100%;justify-content:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{border-style:hidden;width:100%}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{background:var(--fc-page-bg-color);position:sticky;top:0}.fc .fc-list-table thead{left:-10000px;position:absolute}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{clear:both;content:"";display:table}.fc-theme-standard .fc-list-day-cushion{background-color:var(--fc-neutral-bg-color)}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:var(--fc-list-event-hover-bg-color)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{border:calc(var(--fc-list-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-list-event-dot-width)/2);box-sizing:content-box;display:inline-block;height:0;width:0}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}`);var xi={listDayFormat:Si,listDaySideFormat:Si,noEventsClassNames:D,noEventsContent:D,noEventsDidMount:D,noEventsWillUnmount:D};function Si(e){return e===!1?null:ie(e)}var Ci=re({name:`@fullcalendar/list`,optionRefiners:xi,views:{list:{component:_i,buttonTextKey:`list`,listDayFormat:{month:`long`,day:`numeric`,year:`numeric`}},listDay:{type:`list`,duration:{days:1},listDayFormat:{weekday:`long`}},listWeek:{type:`list`,duration:{weeks:1},listDayFormat:{weekday:`long`},listDaySideFormat:{month:`long`,day:`numeric`,year:`numeric`}},listMonth:{type:`list`,duration:{month:1},listDaySideFormat:{weekday:`long`}},listYear:{type:`list`,duration:{year:1},listDaySideFormat:{weekday:`long`}}}});u(((e,t)=>{var n=NaN,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt,c=typeof global==`object`&&global&&global.Object===Object&&global,l=typeof self==`object`&&self&&self.Object===Object&&self,u=c||l||Function(`return this`)(),d=Object.prototype.toString,f=Math.max,p=Math.min,m=function(){return u.Date.now()};function h(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,h=!0;if(typeof e!=`function`)throw TypeError(`Expected a function`);t=y(t)||0,g(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?f(y(n.maxWait)||0,t):a,h=`trailing`in n?!!n.trailing:h);function _(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function v(e){return l=e,s=setTimeout(S,t),u?_(e):o}function b(e){var n=e-c,r=e-l,i=t-n;return d?p(i,a-r):i}function x(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function S(){var e=m();if(x(e))return C(e);s=setTimeout(S,b(e))}function C(e){return s=void 0,h&&r?_(e):(r=i=void 0,o)}function w(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function T(){return s===void 0?o:C(m())}function E(){var e=m(),n=x(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return v(c);if(d)return s=setTimeout(S,t),_(c)}return s===void 0&&(s=setTimeout(S,t)),o}return E.cancel=w,E.flush=T,E}function g(e){var t=typeof e;return!!e&&(t==`object`||t==`function`)}function _(e){return!!e&&typeof e==`object`}function v(e){return typeof e==`symbol`||_(e)&&d.call(e)==`[object Symbol]`}function y(e){if(typeof e==`number`)return e;if(v(e))return n;if(g(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=g(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=e.replace(r,``);var c=a.test(e);return c||o.test(e)?s(e.slice(2),c?2:8):i.test(e)?n:+e}t.exports=h}))();var wi=typeof window<`u`?V.useLayoutEffect:V.useEffect;function Ti(e,t,n,r){let i=(0,V.useRef)(t);wi(()=>{i.current=t},[t]),(0,V.useEffect)(()=>{let t=n?.current??window;if(!(t&&t.addEventListener))return;let a=e=>{i.current(e)};return t.addEventListener(e,a,r),()=>{t.removeEventListener(e,a,r)}},[e,n,r])}function Ei(e){let t=(0,V.useRef)(()=>{throw Error(`Cannot call an event handler while rendering.`)});return wi(()=>{t.current=e},[e]),(0,V.useCallback)((...e)=>t.current?.call(t,...e),[t])}var Di=typeof window>`u`;function Oi(e,t,n={}){let{initializeWithValue:r=!0}=n,i=(0,V.useCallback)(e=>n.serializer?n.serializer(e):JSON.stringify(e),[n]),a=(0,V.useCallback)(e=>{if(n.deserializer)return n.deserializer(e);if(e===`undefined`)return;let r=t instanceof Function?t():t,i;try{i=JSON.parse(e)}catch(e){return console.error(`Error parsing JSON:`,e),r}return i},[n,t]),o=(0,V.useCallback)(()=>{let n=t instanceof Function?t():t;if(Di)return n;try{let t=window.localStorage.getItem(e);return t?a(t):n}catch(t){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,t),n}},[t,e,a]),[s,c]=(0,V.useState)(()=>r?o():t instanceof Function?t():t),l=Ei(t=>{Di&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{let n=t instanceof Function?t(o()):t;window.localStorage.setItem(e,i(n)),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))}catch(t){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,t)}}),u=Ei(()=>{Di&&console.warn(`Tried removing localStorage key \u201C${e}\u201D even though environment is not a client`);let n=t instanceof Function?t():t;window.localStorage.removeItem(e),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))});(0,V.useEffect)(()=>{c(o())},[e]);let d=(0,V.useCallback)(t=>{t.key&&t.key!==e||c(o())},[e,o]);return Ti(`storage`,d),Ti(`local-storage`,d),[s,l,u]}var ki={week:{duration:{weeks:1},dateAlignment:`week`,dateIncrement:{weeks:1}},month:{duration:{months:1},dateAlignment:`month`,dateIncrement:{months:1}},threeMonths:{duration:{months:3},dateAlignment:`month`,dateIncrement:{months:3}},year:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1}}},Ai=e=>ki[e],ji=()=>{let[e,t]=Oi(`solspace-calendar-agenda-range`,`month`);return{range:Object.hasOwn(ki,e)?e:`month`,setRange:t}},Mi=({range:e,onChange:t,disabled:n})=>{let r=(0,V.useId)();return(0,Y.jsxs)(`div`,{className:`calendar-agenda-range`,children:[(0,Y.jsx)(`label`,{htmlFor:r,children:Craft.t(`calendar`,`Range`)}),(0,Y.jsx)(`div`,{className:`select`,children:(0,Y.jsxs)(`select`,{id:r,"aria-label":Craft.t(`calendar`,`Agenda range`),value:e,disabled:n,onChange:e=>t(e.target.value),children:[(0,Y.jsx)(`option`,{value:`week`,children:Craft.t(`calendar`,`Week`)}),(0,Y.jsx)(`option`,{value:`month`,children:Craft.t(`calendar`,`Month`)}),(0,Y.jsx)(`option`,{value:`threeMonths`,children:Craft.t(`calendar`,`3 months`)}),(0,Y.jsx)(`option`,{value:`year`,children:Craft.t(`calendar`,`Year`)})]})})]})},Ni=1440*60,Pi=`draft-create-event`,Fi=`New Event`,Ii=e=>Math.floor(e.getTime()/1e3),X=e=>{let t=new Date(e*1e3);return Math.floor(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())/1e3)},Z=(e,t)=>e+t*Ni,Li=e=>Math.max(1,e.eventDuration)*60,Ri=(e,t)=>e.preserveDuration?Math.max(60,e.end-e.start):Li(t),zi=e=>Math.max(1,Math.round((e.end-e.start)/Ni)),Bi=e=>!!(e&&typeof e==`object`&&`closest`in e&&e.closest),Vi=(e,t)=>{let n=Ii(e.start),r=Ii(e.end),i=e.allDay?r-n>Ni:X(r-1)>X(n),a=e.allDay?i:t.allDayDefault,o=i||!a&&!e.allDay&&r>n,s=a?X(n):e.allDay?X(n)+new Date().getHours()*60*60:n,c=a?Z(i?X(r-1):s,1):o?r:s+Li(t);return{id:Pi,title:l(Fi),allDay:a,start:s,end:c,preserveDuration:o}},Hi=e=>({id:e.id,title:e.title,start:new Date(e.start*1e3),end:new Date(e.end*1e3),allDay:e.allDay,editable:!1,startEditable:!1,durationEditable:!1,extendedProps:{isDraftCreate:!0}}),Ui=e=>e.allDay?Z(e.end,-1):e.end,Wi=(e,t)=>({...e,title:t}),Gi=(e,t,n)=>{if(e.allDay===t)return e;if(t){let t=X(e.start),n=Z(X(e.end-1),1);return{...e,allDay:!0,start:t,end:Math.max(n,Z(t,1))}}return{...e,allDay:!1,end:e.start+(e.preserveDuration?(zi(e)-1)*Ni:0)+Li(n)}},Ki=(e,t,n)=>{if(e.allDay){let n=X(t);return{...e,start:n,end:Z(n,zi(e))}}return{...e,start:t,end:t+Ri(e,n)}},qi=(e,t,n)=>{if(e.allDay){let n=Z(X(t),1);return{...e,end:Math.max(n,Z(X(e.start),1))}}return{...e,end:Math.max(t,e.start+(e.preserveDuration?60:Li(n)))}},Ji=(e,t)=>{e.setProp(`title`,t.title),e.setAllDay(t.allDay,{maintainDuration:!1}),e.setDates(new Date(t.start*1e3),new Date(t.end*1e3),{allDay:t.allDay})},Q=e=>!!(e?.extendedProps&&`isDraftCreate`in e.extendedProps&&e.extendedProps.isDraftCreate),Yi=(e,t)=>Bi(e)&&!!e.closest(t),Xi=`solspace-calendar-hidden-calendars`,Zi={month:`dayGridMonth`,week:`timeGridWeek`,day:`timeGridDay`,agenda:`listMonth`,year:`calendarYear`},Qi=()=>{let e=window.location.pathname.split(`/`).filter(Boolean).at(-1);return e&&Zi[e]||null},$i=e=>Object.entries(Zi).find(([,t])=>t===e)?.[0]??`month`,ea=(e=`month`)=>{let[t,n]=(0,V.useState)(()=>Qi()||Zi[e]||`dayGridMonth`),[r,i]=(0,V.useState)(!1);return(0,V.useEffect)(()=>{i(!0)},[]),{view:t,setView:e=>{n(e),i(!0)},isReady:r}},ta=()=>{let[e,t]=Oi(Xi,[]);return{hiddenCalendarIds:e,toggleCalendarVisibility:e=>{t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}}},na=(e,t)=>{let n=t??Qi(),r=n?`/${$i(n)}`:``,i=new URL(Craft.getCpUrl(`calendar/${c(e)}${r}`),window.location.origin);i.search=window.location.search,i.toString()!==window.location.href&&history.pushState(`data`,``,i.toString())},ra=`refresh prev,today,datepicker,next`,ia=(e,{datePickerButton:t})=>({prev:{text:Craft.t(`calendar`,`Previous`),icon:`chevron-left`,click:()=>{e.prev(),na(e.getDate())}},next:{text:Craft.t(`calendar`,`Next`),icon:`chevron-right`,click:()=>{e.next(),na(e.getDate())}},refresh:{text:Craft.t(`calendar`,`Refresh`),icon:`refresh`,click:()=>{be(),e.refetchEvents()}},datepicker:t}),aa=(0,V.createContext)(null),oa=({config:e,children:t})=>{let n=(0,V.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,Y.jsx)(aa.Provider,{value:n,children:t})},$=()=>{let e=(0,V.useContext)(aa);if(!e)throw Error(`ConfigContext is not provided`);return e},sa=(e,n,r)=>{let{weekStartDay:i}=$(),a=(0,V.useRef)(null),[o,c]=(0,V.useState)(!1),[l,u]=(0,V.useState)(null),[d,f]=(0,V.useState)(null),p=(0,V.useCallback)(()=>{c(!1),u(null)},[]);(0,V.useEffect)(()=>{if(!o)return;let e=e=>{let t=e.target;a.current?.contains(t)||t.closest(`.fc-datepicker-button`)||p()},t=e=>{e.key===`Escape`&&p()};return window.addEventListener(`mousedown`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`mousedown`,e),window.removeEventListener(`keydown`,t)}},[p,o]);let m=(0,V.useCallback)(t=>{if(!t)return;let n=s(t);na(n),e.gotoDate(n),f(t),p()},[p,e]),h=(0,V.useCallback)((n,r)=>{let{bottom:i,right:a}=r.getBoundingClientRect();f(t(e.getDate())),c(e=>!e),u({top:i+8,left:a})},[e]);return{dateSelector:o&&l?(0,Y.jsx)(ca,{view:n,agendaRange:r,popoverRef:a,position:l,selectedDate:d,weekStartDay:i,onDateSelect:m}):null,datePickerButton:{text:Craft.t(`calendar`,`Pick a Date`),icon:`datepicker`,click:h}}},ca=({view:e,agendaRange:t,popoverRef:n,position:r,selectedDate:i,weekStartDay:a,onDateSelect:o})=>{let s=e===`timeGridWeek`||e===`listMonth`&&t===`week`,c=e===`calendarYear`||e===`listMonth`&&t===`year`,l=e===`dayGridMonth`||e===`listMonth`&&!s&&!c;return(0,Y.jsx)(`div`,{ref:n,className:`fc-datepicker-popover`,style:{top:r.top,left:r.left},children:(0,Y.jsx)(Fe,{...p(),inline:!0,selected:i,onChange:o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:a,showWeekPicker:s,showWeekNumbers:s,showMonthYearPicker:l,showYearPicker:c})})},la=e=>e.view.type===`dayGridMonth`&&!e.event.allDay&&!e.event.extendedProps?.multiDay,ua=e=>{let t=e?.toLowerCase();return t===`black`||t===`white`?`fc-color-${t}`:null},da=({event:e})=>{let t=[];e.allDay&&t.push(`fc-event-all-day`),e.end&&(!e.extendedProps?.multiDay&&!e.allDay?t.push(`fc-event-single-day`):t.push(`fc-event-multi-day`)),e.extendedProps?.enabled===!1&&t.push(`fc-event-disabled`),e.extendedProps?.cancelled&&t.push(`fc-event-cancelled`);let n=ua(e.textColor);return n&&t.push(n),t},fa=(e,t)=>Q(e)?`ignore`:Yi(t,`[data-calendar-event-title-link]`)?`navigate`:`open`,pa=e=>{let{event:t,timeText:n}=e,r=e.view.type===`listMonth`,i=L(`fc-event-title`,la(e)&&`fc-event-title-inline`),a=!Q(t)&&t.url,o=!!t.extendedProps?.cancelled,s=!o&&t.extendedProps?.isEdited?(0,Y.jsx)(`span`,{className:`fc-event-flag`,title:l(`This occurrence has its own changes.`),"aria-hidden":`true`,children:`✎`}):null,c=o&&!r?(0,Y.jsxs)(`span`,{className:`visually-hidden`,children:[`, `,l(`Cancelled`)]}):null,u=r?(0,Y.jsxs)(`a`,{href:t.url||`#`,className:i,children:[s,t.title]}):a?(0,Y.jsxs)(`button`,{type:`button`,onClick:()=>window.location.href=t.url,className:i,"data-calendar-event-title-link":!0,children:[s,t.title,c]}):(0,Y.jsxs)(`div`,{className:i,children:[s,t.title,c]});if(r){let{calendarName:e,location:n,description:r}=t.extendedProps;return(0,Y.jsxs)(`div`,{className:`calendar-agenda-event`,children:[(0,Y.jsxs)(`div`,{className:`calendar-agenda-title`,children:[u,o&&(0,Y.jsx)(`span`,{className:`calendar-agenda-cancelled`,children:l(`Cancelled`)})]}),(0,Y.jsxs)(`div`,{className:`calendar-agenda-meta`,children:[e&&(0,Y.jsxs)(`span`,{className:`calendar-agenda-calendar`,children:[(0,Y.jsx)(`span`,{className:`calendar-agenda-calendar-dot`,style:{backgroundColor:t.extendedProps.calendarColor||t.backgroundColor},"aria-hidden":`true`}),e]}),n&&(0,Y.jsx)(`span`,{className:`calendar-agenda-location`,children:n})]}),r&&(0,Y.jsx)(`div`,{className:`calendar-agenda-description`,children:r})]})}return la(e)?(0,Y.jsxs)(`div`,{className:`fc-event-main-frame fc-event-main-frame-inline`,children:[(0,Y.jsx)(`span`,{className:`fc-color-icon`,style:{backgroundColor:t.backgroundColor,borderColor:t.borderColor}}),(0,Y.jsx)(`div`,{className:`fc-event-title-container`,children:u}),n?(0,Y.jsx)(`div`,{className:`fc-event-time`,children:n}):null]}):(0,Y.jsx)(`div`,{className:`fc-event-main-frame`,children:(0,Y.jsx)(`div`,{className:`fc-event-title-container`,children:u})})},ma=`calendar:schedule-history-reset`,ha=e=>{let[t,n]=(0,V.useState)([]),[r,i]=(0,V.useState)([]),[a,o]=(0,V.useState)(!1),s=(0,V.useRef)(!1),c=(0,V.useCallback)(()=>{n([]),i([])},[]);(0,V.useEffect)(()=>(window.addEventListener(ma,c),()=>window.removeEventListener(ma,c)),[c]);let l=(0,V.useCallback)(e=>{n(t=>[...t,e].slice(-50)),i([])},[]),u=(0,V.useCallback)(async e=>{if(s.current)return!1;s.current=!0,o(!0);try{return await e()}finally{s.current=!1,o(!1)}},[]);return{add:l,run:u,replay:(0,V.useCallback)(async a=>{let o=(a===`undo`?t:r).at(-1);o&&await u(async()=>await xe(o,a)?(a===`undo`?(n(e=>e.slice(0,-1)),i(e=>[...e,o])):(i(e=>e.slice(0,-1)),n(e=>[...e,o])),e(),!0):!1)},[t,r,u,e]),clear:c,busy:a,canUndo:t.length>0,canRedo:r.length>0}},ga=r.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--medium-border-radius, 4px);
  background: #c4cfe1;
`,_a=r.button`
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
`,va=({canUndo:e,canRedo:t,disabled:n,onReplay:r})=>((0,V.useEffect)(()=>{let i=i=>{if(n||i.defaultPrevented||i.altKey||!(i.metaKey||i.ctrlKey))return;let a=i.target;if(a instanceof HTMLElement&&a.closest(`input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=textbox]`)||document.querySelector(`.modal:not(.hidden), .cp-screen-slideout:not(.hidden)`))return;let o=i.key.toLowerCase(),s=o===`z`?i.shiftKey?`redo`:`undo`:o===`y`&&i.ctrlKey?`redo`:null;!s||!(s===`undo`?e:t)||(i.preventDefault(),r(s))};return document.addEventListener(`keydown`,i),()=>document.removeEventListener(`keydown`,i)},[e,t,n,r]),(0,Y.jsx)(ga,{role:`group`,"aria-label":l(`Event history`),children:[`undo`,`redo`].map(i=>(0,Y.jsx)(_a,{type:`button`,disabled:n||!(i===`undo`?e:t),title:l(i===`undo`?`Undo`:`Redo`),"aria-label":l(i===`undo`?`Undo`:`Redo`),onClick:()=>r(i),children:(0,Y.jsx)(`svg`,{viewBox:`0 0 96 80`,width:`18`,height:`16`,"aria-hidden":`true`,focusable:`false`,children:(0,Y.jsx)(`g`,{transform:i===`redo`?`translate(96 0) scale(-1 1)`:void 0,children:(0,Y.jsx)(`path`,{fill:`currentColor`,d:`M37 1 1 30l36 29V41h18c15 0 23 8 23 22 0 6-2 11-5 16 12-8 19-19 19-31 0-20-14-31-37-31H37V1Z`})})})},i))})),ya=()=>new URL(window.location.href).searchParams.get(`search`)?.trim()??``,ba=({initialSearch:e,onSearchChange:t})=>{let[n,r]=(0,V.useState)(e),i=(0,V.useId)(),a=(0,V.useRef)(null);(0,V.useEffect)(()=>{let e=setTimeout(()=>t(n.trim()),250);return()=>clearTimeout(e)},[n,t]);let o=()=>{r(``),t(``),a.current?.focus()};return(0,Y.jsx)(Le,{children:(0,Y.jsxs)(`div`,{className:`calendar-search-toolbar`,children:[(0,Y.jsxs)(`div`,{className:`calendar-search-input`,children:[(0,Y.jsx)(`span`,{className:`calendar-search-icon`,"data-icon":`search`,"aria-hidden":`true`}),(0,Y.jsx)(`input`,{type:`search`,ref:a,className:`text fullwidth`,"aria-label":l(`Search events`),"aria-describedby":i,placeholder:Craft.t(`app`,`Search`),value:n,onChange:e=>r(e.target.value),onKeyDown:e=>{e.key===`Escape`&&n&&(e.stopPropagation(),o())}}),n&&(0,Y.jsx)(`button`,{type:`button`,className:`calendar-search-clear`,"aria-label":l(`Clear search`),"data-icon":`remove`,onClick:o})]}),(0,Y.jsx)(`span`,{id:i,className:`visually-hidden`,children:l(`Searches events in the displayed date range.`)})]})})},xa=r.div`
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
`,Sa=r.div`
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
`,Ca=(e,t,n)=>new Date(Date.UTC(e,t,n)),wa=e=>{let t=new Map;for(let n of e){let e=n.range.start,r=Ca(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());for(;r<n.range.end;){let e=g(r),i=t.get(e)??[];i.push(n),t.set(e,i),r.setUTCDate(r.getUTCDate()+1)}}for(let e of t.values())e.sort((e,t)=>Number(t.def.allDay)-Number(e.def.allDay)||(e.instance?.range.start.getTime()??0)-(t.instance?.range.start.getTime()??0)||e.def.title.localeCompare(t.def.title));return t},Ta=e=>e.def.extendedProps.calendarColor||e.ui.backgroundColor||`#607d9f`,Ea=e=>{let t=new Map;for(let n of e){let e=!!n.def.extendedProps.cancelled,r=Ta(n),i=e?`cancelled`:String(n.def.extendedProps.calendar??r);t.set(i,{color:r,cancelled:e})}return Array.from(t.entries())},Da=({date:e,events:t,anchor:n,onEventSelect:r})=>{let{hidePopover:i}=si(),{language:a,formats:o}=$(),s=(0,V.useRef)(null),c=new Intl.DateTimeFormat(a,{month:`short`,day:`numeric`,year:`numeric`,timeZone:`UTC`}),u=new Intl.DateTimeFormat(a,{...o.time.short.js,timeZone:`UTC`});(0,V.useEffect)(()=>{let e=e=>{e.key===`Escape`&&i()},t=e=>{let t=e.target;!n.contains(t)&&!s.current?.contains(t)&&i()};return document.addEventListener(`keydown`,e),document.addEventListener(`pointerdown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`pointerdown`,t)}},[n,i]);let d=e=>{if(!e.instance)return``;let{start:t,end:n}=e.instance.range;if(e.def.allDay){let e=new Date(n.getTime()-1);return g(t)===g(e)?l(`All Day`):`${l(`All Day`)} · ${c.format(t)} – ${c.format(e)}`}let r=g(t)===g(n),i=u.format(t),a=u.format(n);return r?`${i} – ${a}`:`${c.format(t)} ${i} – ${c.format(n)} ${a}`};return(0,Y.jsxs)(Sa,{ref:s,"data-calendar-year-preview":!0,children:[(0,Y.jsx)(`h3`,{children:e.toLocaleDateString(a,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`,timeZone:`UTC`})}),(0,Y.jsx)(`ul`,{children:t.map(e=>(0,Y.jsx)(`li`,{children:(0,Y.jsxs)(`button`,{type:`button`,className:L({"is-cancelled":e.def.extendedProps.cancelled}),onClick:t=>r(e.def.publicId,n,t),children:[(0,Y.jsx)(`span`,{className:`year-preview-dot`,style:{backgroundColor:Ta(e)}}),(0,Y.jsxs)(`span`,{className:`year-preview-details`,children:[(0,Y.jsxs)(`span`,{className:`year-preview-title`,children:[(0,Y.jsx)(`strong`,{children:e.def.title}),e.def.extendedProps.cancelled&&(0,Y.jsx)(`span`,{className:`year-preview-cancelled`,children:l(`Cancelled`)})]}),(0,Y.jsx)(`span`,{className:`year-preview-time`,children:d(e)}),e.def.extendedProps.calendarName&&(0,Y.jsx)(`span`,{className:`year-preview-calendar`,children:e.def.extendedProps.calendarName})]})]})},e.instance?.instanceId??e.def.defId))})]})},Oa=({content:e,disabled:t,loading:n,error:r,search:i,onDateSelect:a,onMonthSelect:o,onEventSelect:s})=>{let{language:c,weekStartDay:u}=$(),{showPopover:d,hidePopover:f}=si(),p=(0,V.useRef)(void 0),m=e.dateProfile.currentRange.start.getUTCFullYear(),h=(0,V.useMemo)(()=>wa(Ce(e,!0)),[e]),_=(0,V.useMemo)(()=>new Intl.DateTimeFormat(c,{month:`long`,timeZone:`UTC`}),[c]),v=(0,V.useMemo)(()=>new Intl.DateTimeFormat(c,{weekday:`narrow`,timeZone:`UTC`}),[c]),y=Array.from({length:7},(e,t)=>Ca(2023,0,1+u+t)),b=g(new Date);(0,V.useEffect)(()=>()=>{clearTimeout(p.current),f()},[f]),(0,V.useEffect)(()=>{clearTimeout(p.current),f()},[f,e.eventStore,m,t,n]);let x=(e,r,i)=>{t||n||!r.length||d((0,Y.jsx)(Da,{date:e,events:r,anchor:i,onEventSelect:s}),i,{position:[`bottom`,`top`,`right`,`left`],closeDelayMs:300})};return(0,Y.jsxs)(xa,{children:[(0,Y.jsx)(`div`,{className:`calendar-year-grid`,children:Array.from({length:12},(e,n)=>{let r=Ca(m,n,1),i=_.format(r),s=(r.getUTCDay()-u+7)%7,d=Ca(m,n+1,0).getUTCDate();return(0,Y.jsxs)(`section`,{className:`calendar-year-month`,"aria-label":i,children:[(0,Y.jsx)(`h3`,{children:(0,Y.jsx)(`button`,{type:`button`,disabled:t,onClick:()=>o(r),children:i})}),(0,Y.jsx)(`div`,{className:`calendar-year-weekdays`,"aria-hidden":`true`,children:y.map(e=>(0,Y.jsx)(`span`,{children:v.format(e)},e.getUTCDay()))}),(0,Y.jsx)(`div`,{className:`calendar-year-days`,children:Array.from({length:42},(e,r)=>{let i=r-s+1;if(i<1||i>d)return(0,Y.jsx)(`span`,{},r);let o=Ca(m,n,i),u=g(o),_=h.get(u)??[],v=Ea(_),y=o.toLocaleDateString(c,{dateStyle:`full`,timeZone:`UTC`}),S=l(_.length===1?`{count} event`:`{count} events`,{count:_.length}),C=_.filter(e=>e.def.extendedProps.cancelled).length;return(0,Y.jsxs)(`button`,{type:`button`,className:L(`calendar-year-day`,{"is-today":u===b,"has-events":_.length>0}),"data-date":u,"aria-label":`${y}, ${S}${C?`, ${l(`Cancelled`)}: ${C}`:``}`,"aria-current":u===b?`date`:void 0,disabled:t,onClick:()=>{clearTimeout(p.current),a(o)},onMouseEnter:e=>{let t=e.currentTarget;clearTimeout(p.current),p.current=setTimeout(()=>x(o,_,t),300)},onMouseLeave:()=>clearTimeout(p.current),onFocus:e=>{clearTimeout(p.current),x(o,_,e.currentTarget)},onBlur:e=>{(!(e.relatedTarget instanceof HTMLElement)||!e.relatedTarget.closest(`[data-calendar-year-preview]`))&&f()},children:[(0,Y.jsx)(`span`,{className:`calendar-year-day-number`,children:i}),(0,Y.jsxs)(`span`,{className:`calendar-year-markers`,"aria-hidden":`true`,children:[v.slice(0,3).map(([e,t])=>(0,Y.jsx)(`span`,{className:L(`calendar-year-dot`,{"is-cancelled":t.cancelled}),style:{backgroundColor:t.color}},e)),v.length>3&&(0,Y.jsx)(`span`,{className:`calendar-year-more`,children:`+`})]})]},r)})})]},n)})}),(0,Y.jsxs)(`div`,{className:`calendar-year-footer`,children:[(0,Y.jsx)(`span`,{role:`status`,children:l(r?`Couldn’t load events. Use Refresh to try again.`:n?`Loading events…`:h.size?`Hover a date to preview its events.`:i?`No matching events in this date range.`:`No events in this date range.`)}),(0,Y.jsxs)(`span`,{className:`calendar-year-legend`,children:[(0,Y.jsx)(`span`,{className:`calendar-year-dot is-cancelled`,"aria-hidden":`true`}),l(`Cancelled`)]})]})]})},ka=({options:e,value:t,onChange:n})=>{let r=(0,V.useId)(),i=(0,V.useRef)(null),a=(0,V.useRef)(null),o=(0,V.useRef)(n),s=JSON.stringify(e),c=e.find(e=>e.value===t);return(0,V.useEffect)(()=>{o.current=n},[n]),(0,V.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu`,t.style.minWidth=`${e.getBoundingClientRect().width}px`,t.setAttribute(`aria-label`,l(`Calendar`)),a.current=t;let n=document.createElement(`ul`);t.append(n),JSON.parse(s).forEach(e=>{let t=document.createElement(`li`),r=document.createElement(`a`);r.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),r.append(i,document.createTextNode(e.label)),t.append(r),n.append(t)}),e.after(t);let r=new Garnish.MenuBtn(e,{onOptionSelect:t=>{r.hideMenu(),o.current(Number(t.dataset.calendarId)),e.focus()}}),c=t=>{t.key===`Escape`&&r.showingMenu&&(t.preventDefault(),t.stopPropagation(),r.hideMenu(),e.focus())};return document.addEventListener(`keydown`,c,!0),()=>{document.removeEventListener(`keydown`,c,!0),r.hideMenu(),r.destroy(),t.remove(),a.current=null}},[s]),(0,V.useEffect)(()=>{a.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let n=Number(e.dataset.calendarId)===t;e.classList.toggle(`sel`,n),e.setAttribute(`aria-selected`,String(n))})},[t,s]),(0,Y.jsx)(R,{label:l(`Calendar`),id:r,required:!0,children:(0,Y.jsxs)(Aa,{ref:i,id:r,type:`button`,className:`btn menubtn fullwidth`,"aria-required":`true`,children:[(0,Y.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:c?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,Y.jsx)(`span`,{className:`calendar-name`,children:c?.label})]})})},Aa=r.button`
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
`,ja=(e,t,n,r)=>({title:e.title||l(`New Event`),start:e.start,end:e.end,allDay:e.allDay,calendarId:t,siteId:n,...r&&{details:r}}),Ma=({refetchEvents:e,onSuccess:t})=>{let{hidePopover:n}=si(),{currentSiteId:r}=$(),[i,a]=(0,V.useState)(null),[o,s]=(0,V.useState)(null),c=(0,V.useCallback)(async(i,o,c,u)=>{a(u?`prepare`:`create`),s(null);try{let a=ja(i,o,r,c);u&&(a.title=i.title);let s=await ge(Qr(u?`/api/events/prepare`:`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)});if(!s.ok){let e=null;try{e=await s.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}let d=await s.json();if(u){if(typeof d?.url!=`string`||!d.url)throw Error(l(`Couldn’t create event.`));return d.url}return be(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),e?.(),t?.(),n(),null}catch(e){return e instanceof Error?s(e.message):s(`Failed to create event`),null}finally{a(null)}},[n,t,e,r]);return{createEvent:(e,t,n)=>c(e,t,n,!1),prepareEvent:(e,t,n)=>c(e,t,n,!0),error:o,isFetching:i!==null,isOpeningEditor:i===`prepare`}},Na=r.div`
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
`,Pa=r(Ie)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,Fa=r.div`
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
`,Ia=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,La=r.label`
  font-weight: 600;
  cursor: pointer;
`,Ra=r(Ie)`
  flex-wrap: wrap;
  align-items: center;
`,za=r.button`
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
`,Ba=({draft:e,onChange:t,refetchEvents:n,onConfirm:r,onCancel:i})=>{let{calendars:a,calendarColors:s,quickCreateFields:c,quickCreateRequiredFields:u,formats:d,weekStartDay:f,eventDuration:p,timeInterval:m}=$(),h=(0,V.useId)(),g=(0,V.useMemo)(()=>Object.entries(a).map(([e,t])=>({value:Number(e),label:t,color:s?.[Number(e)]})),[a,s]),[_,v]=(0,V.useState)(g[0]?.value??0),[y,b]=(0,V.useState)({}),x=c?.[_],S=x?.location,C=x?.description,w=u?.[_],T=y[_]??{},E=S||C?{...S&&{location:T[S]??``},...C&&{description:T[C]??``}}:void 0,D=(e,t)=>{b(n=>({...n,[_]:{...n[_],[e]:t}}))},{createEvent:O,prepareEvent:k,error:A,isFetching:j,isOpeningEditor:ee}=Ma({refetchEvents:n,onSuccess:r}),M=(0,V.useMemo)(()=>e.allDay?d.date.short.icu:d.datetime.short.icu,[d,e.allDay]),te=(0,V.useMemo)(()=>Ui(e),[e]);return Ti(`keydown`,e=>{e.key===`Escape`&&!j&&i()}),(0,Y.jsxs)(Na,{children:[(0,Y.jsx)(Pa,{children:(0,Y.jsx)(ze,{label:l(`Title`),id:`${h}-title`,required:!0,autofocus:!0,value:e.title,placeholder:l(`Event Title`),onChange:n=>t(Wi(e,n))})}),(0,Y.jsxs)(Fa,{children:[(0,Y.jsx)(ka,{value:_,options:g,onChange:v}),(0,Y.jsx)(`hr`,{}),(0,Y.jsxs)(Ia,{children:[(0,Y.jsx)(Ne,{enabled:e.allDay,onClick:n=>t(Gi(e,n,{eventDuration:p}))}),(0,Y.jsx)(La,{onClick:()=>t(Gi(e,!e.allDay,{eventDuration:p})),children:l(`All Day`)})]}),(0,Y.jsx)(Pe,{id:`${h}-start`,required:!0,label:l(`Starts`),value:e.start,datePickerProps:{showIcon:!0,icon:(0,Y.jsx)(Ae,{}),toggleCalendarOnIconClick:!0,dateFormat:M,timeFormat:d.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:f,timeIntervals:m},onChange:n=>{n!==null&&t(Ki(e,n,{eventDuration:p}))}}),(0,Y.jsx)(Pe,{id:`${h}-end`,required:!0,label:l(`Ends`),value:te,datePickerProps:{showIcon:!0,icon:(0,Y.jsx)(Ae,{}),toggleCalendarOnIconClick:!0,minDate:o(e.start),dateFormat:M,timeFormat:d.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:f,timeIntervals:m,filterTime:t=>{if(!e.start)return!0;let n=o(e.start),r=new Date(t);return n.getTime()<r.getTime()}},onChange:n=>{n!==null&&t(qi(e,n,{eventDuration:p}))}}),(S||C)&&(0,Y.jsx)(`hr`,{}),S&&(0,Y.jsx)(R,{label:l(`Location`),id:`${h}-location`,required:w?.location,children:(0,Y.jsx)(`input`,{id:`${h}-location`,type:`text`,className:`text fullwidth`,disabled:j,"aria-required":w?.location||void 0,value:T[S]??``,onChange:e=>D(S,e.target.value)})}),C&&(0,Y.jsx)(R,{label:l(`Description`),id:`${h}-description`,required:w?.description,children:(0,Y.jsx)(`textarea`,{id:`${h}-description`,className:`text fullwidth`,rows:3,disabled:j,"aria-required":w?.description||void 0,value:T[C]??``,onChange:e=>D(C,e.target.value)})})]}),(0,Y.jsx)(`hr`,{}),A&&(0,Y.jsx)(`p`,{className:`error`,children:A}),(0,Y.jsxs)(Ra,{$justifyContent:`flex-end`,$gap:8,children:[(0,Y.jsx)(za,{type:`button`,disabled:!_||j,onClick:async()=>{let t=await k(e,_,E);t&&(window.location.href=t)},children:l(ee?`Processing...`:`More details…`)}),(0,Y.jsx)(`button`,{type:`button`,className:L(`btn submit`,j&&`disabled`),disabled:!e.title||!_||j,onClick:()=>O(e,_,E),children:l(j&&!ee?`Creating Event...`:`Create Event`)}),(0,Y.jsx)(`button`,{type:`button`,className:L(`btn`,j&&`disabled`),disabled:j,onClick:i,children:l(`Cancel`)})]})]})},Va=r.div`
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
`,Ha=r.div`
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
`,Ua=r.button`
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
`,Wa={move:`You are moving an event.`,resize:`You are changing an event’s length.`,delete:`You are deleting an event.`},Ga={move:`Which occurrences do you want to move?`,resize:`Which occurrences do you want to change?`,delete:`Which occurrences do you want to delete?`},Ka={occurrence:`Only this occurrence`,following:`This and following`,series:`All occurrences`},qa=({action:e,onSelect:t,onCancel:n})=>{let{hidePopover:r}=si(),[i,a]=(0,V.useState)(null),o=(0,V.useRef)(!0),s=(0,V.useRef)(!1),c=i!==null;(0,V.useEffect)(()=>()=>{o.current=!1,s.current||n?.()},[]);let u=(0,V.useCallback)(()=>{c||r()},[r,c]);Ti(`keydown`,e=>{e.key===`Escape`&&u()});let d=async e=>{if(!c){s.current=!0,a(e);try{await t(e)&&r()}finally{o.current&&a(null)}}};return(0,Y.jsxs)(Va,{children:[(0,Y.jsx)(`h3`,{children:l(Wa[e])}),(0,Y.jsx)(`p`,{children:l(Ga[e])}),(0,Y.jsx)(`hr`,{}),(0,Y.jsxs)(Ie,{$direction:`column`,$alignItems:`center`,$gap:8,children:[[`occurrence`,`following`,`series`].map(e=>(0,Y.jsx)(`button`,{type:`button`,className:L(`btn small`,e===`occurrence`&&`submit`,c&&`disabled`),disabled:c,onClick:()=>d(e),children:l(i===e?`Processing...`:Ka[e])},e)),(0,Y.jsx)(`button`,{type:`button`,className:L(`btn small`,c&&`disabled`),disabled:c,onClick:u,children:l(`Cancel`)})]})]})},Ja=({actions:e,disabled:t})=>{let{eventActionIcons:n}=$(),{keepPopoverOpen:r}=si(),i=(0,V.useRef)(null),a=(0,V.useRef)({actions:e,disabled:t}),o=JSON.stringify(e.map(({label:e,destructive:t,icon:r,color:i})=>({label:e,destructive:t,icon:r?n?.[r]:void 0,color:i})));return(0,V.useEffect)(()=>{a.current={actions:e,disabled:t}},[e,t]),(0,V.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu menu--disclosure calendar-event-action-menu`,t.setAttribute(`aria-label`,l(`More actions`));let n=document.createElement(`ul`);t.append(n),JSON.parse(o).forEach((e,r)=>{e.destructive&&r>0&&(t.append(document.createElement(`hr`)),n=document.createElement(`ul`),t.append(n));let i=document.createElement(`li`),a=document.createElement(`a`);if(a.className=`menu-item`,e.icon){let t=document.createElement(`span`);t.className=e.color?`icon ${e.color}`:`icon`,t.setAttribute(`aria-hidden`,`true`),t.innerHTML=e.icon,a.append(t)}let o=document.createElement(`span`);o.className=`menu-item-label`,o.textContent=e.label,a.append(o),a.dataset.action=String(r),e.destructive&&a.classList.add(`error`),i.append(a),n.append(i)}),e.after(t);let s=new Garnish.MenuBtn(e,{onOptionSelect:e=>{a.current.disabled||(s.hideMenu(),a.current.actions[Number(e.dataset.action)]?.onSelect())}});s.menu.on(`show`,r);let c=t=>{t.key===`Escape`&&s.showingMenu&&(t.preventDefault(),t.stopPropagation(),s.hideMenu(),e.focus())};return document.addEventListener(`keydown`,c,!0),()=>{document.removeEventListener(`keydown`,c,!0),s.hideMenu(),s.destroy(),t.remove()}},[o,r]),(0,Y.jsx)(`button`,{ref:i,type:`button`,className:`btn menubtn action-btn`,disabled:t,"aria-label":l(`More actions`),title:l(`More actions`)})},Ya=({fcEvent:e})=>{let{hidePopover:n,showPopover:r}=si(),{currentSiteId:i}=$(),[a,o]=(0,V.useState)(!1),[s,c]=(0,V.useState)(!1),[u,d]=(0,V.useState)(!1),[p,m]=(0,V.useState)(!1),h=a||s||u||p;Ti(`keydown`,e=>{e.key===`Escape`&&n()});let g=e.event,{end:_,allDay:b}=g,x=g.extendedProps.calendarName,S=typeof g.extendedProps.location==`string`?g.extendedProps.location.trim():``,C=typeof g.extendedProps.description==`string`?g.extendedProps.description.trim():``,w=g.extendedProps.calendarColor??g.backgroundColor??g.borderColor??`#607d9f`,T=(0,V.useMemo)(()=>b?Me(_,1):_,[b,_]),E=!!g.extendedProps.rrule,D=E?y(v(g.extendedProps.rrule,g.start.getTime()/1e3)):null,O=ve(String(g.id)),k=g.allDay?`PP`:`PPp`,A=!!g.extendedProps.cancelled,j=!!g.extendedProps.isEdited,ee=!!g.extendedProps.hasOverride,M=()=>e.view.calendar.refetchEvents(),te=()=>{O&&(n(),fe({eventId:he(String(g.id)),recurrenceId:O,siteId:i,onSave:M}))},ne=async()=>{if(!O||h)return;d(!0);let e=await ae({event:g,recurrenceId:O,siteId:i});if(e){window.location.href=e;return}d(!1)},re=async()=>{if(!(!O||h)){c(!0);try{await le({event:g,recurrenceId:O,cancelled:!A,siteId:i,refetchEvents:M})&&n()}finally{c(!1)}}},N=async()=>{if(!a){o(!0);try{await _e({event:g,scope:`series`,recurrenceId:O,siteId:i,refetchEvents:M})&&n()}finally{o(!1)}}},ie=()=>{r((0,Y.jsx)(qa,{action:`delete`,onSelect:async e=>e===`occurrence`&&ee&&!window.confirm(l(`This occurrence has its own changes, which are deleted with it. Delete it?`))?!1:_e({event:g,scope:e,recurrenceId:O,siteId:i,refetchEvents:M})}),e.el)},oe=async()=>{if(h)return;m(!0);let e=await F(g,i);if(e){window.location.href=e;return}m(!1)},P=[{label:l(p?`Duplicating...`:`Duplicate Event`),icon:`clone-dashed`,color:`fuchsia`,onSelect:()=>void oe()}];return E&&O&&P.push({label:l(`Edit occurrence`),icon:`pencil`,onSelect:te},{label:l(u?`Processing...`:`Edit this and following occurrences`),icon:`calendar-pen`,onSelect:()=>void ne()},{label:l(A?`Restore occurrence`:`Cancel occurrence`),icon:A?`rotate-left`:`ban`,onSelect:()=>void re()}),P.push({label:l(a?`Deleting...`:`Delete`),icon:`trash`,destructive:!0,onSelect:()=>{E?ie():window.confirm(l(`Are you sure you want to delete this event?`))&&N()}}),(0,Y.jsxs)(Va,{children:[(0,Y.jsx)(Ua,{type:`button`,className:`icon`,"data-icon":`remove`,"aria-label":l(`Close`),title:l(`Close`),disabled:h,onClick:n}),(0,Y.jsx)(`h1`,{className:L(`event-title`,A&&`is-cancelled`),children:g.title}),x&&(0,Y.jsxs)(`div`,{className:`calendar-label`,children:[(0,Y.jsx)(`span`,{className:`calendar-label-dot`,style:{backgroundColor:w},"aria-hidden":`true`}),(0,Y.jsx)(`span`,{children:x})]}),(A||j)&&(0,Y.jsx)(`div`,{className:L(`occurrence-status`,!A&&`is-edited`),children:l(A?`This occurrence is cancelled.`:`This occurrence has its own changes.`)}),(0,Y.jsx)(`hr`,{}),(0,Y.jsxs)(`div`,{children:[(0,Y.jsxs)(`b`,{children:[l(`Starts`),`:`]}),` `,z(t(g.start),k,{locale:f()}),(0,Y.jsx)(`br`,{}),(0,Y.jsxs)(`b`,{children:[l(`Ends`),`:`]}),` `,z(t(T),k,{locale:f()})]}),D&&(0,Y.jsxs)(`div`,{children:[(0,Y.jsxs)(`b`,{children:[l(`Repeats`),`:`]}),` `,D]}),(S||C)&&(0,Y.jsxs)(`dl`,{className:`event-details`,children:[S&&(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(`dt`,{children:l(`Location`)}),(0,Y.jsx)(`dd`,{className:`event-location`,children:S})]}),C&&(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(`dt`,{children:l(`Description`)}),(0,Y.jsx)(`dd`,{className:`event-description`,children:C})]})]}),(0,Y.jsx)(`hr`,{}),(0,Y.jsxs)(Ha,{children:[(0,Y.jsx)(`a`,{href:g.url,className:L(`btn submit`,h&&`disabled`),"aria-disabled":h,onClick:e=>{h&&e.preventDefault()},children:l(`Edit Event`)}),(0,Y.jsx)(Ja,{actions:P,disabled:h})]})]})},Xa=new Intl.DateTimeFormat(f().code,{weekday:`short`,timeZone:`UTC`}),Za=new Intl.DateTimeFormat(f().code,{day:`numeric`,timeZone:`UTC`}),Qa=new Intl.DateTimeFormat(f().code,{weekday:`long`,timeZone:`UTC`}),$a=new Intl.DateTimeFormat(f().code,{month:`long`,year:`numeric`,timeZone:`UTC`}),eo={dayGridMonth:{dayHeaderFormat:{weekday:`long`}},listMonth:{displayEventEnd:!0,listDayFormat:{weekday:`long`,month:`long`,day:`numeric`},listDaySideFormat:!1}},to={closeDelayMs:300,position:[`bottom`,`top`,`right`,`left`]},no=e=>{let t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}:00`},ro=e=>!!(e.extendedProps?.rrule||e.extendedProps?.repeats),io=({hiddenCalendarIds:e,selectedDate:t,onDateChange:n,miniDateSelection:r,onMiniDateSelectionHandled:i})=>{let{hidePopover:a,showPopover:o}=si(),{range:l,setRange:u}=ji(),{currentDay:d,language:f,formats:p,weekStartDay:h,overlapThresholdString:_,allDayDefault:v,eventDuration:y,timeInterval:b,canEditEvents:x,isDragAndDropEnabled:S,isQuickCreateEnabled:C,currentSiteId:w,defaultCalendarView:T}=$(),{view:E,setView:D,isReady:O}=ea(T),k=x&&C,A=(0,V.useRef)(null),j=(0,V.useRef)(null),[ee,M]=(0,V.useState)(null),te=(0,V.useRef)(l),ne=e.join(`,`),re=(0,V.useRef)(null),N=(0,V.useRef)(void 0),ie=(0,V.useRef)(!1),ae=(0,V.useRef)(0),[P,ce]=(0,V.useState)(null),[le,de]=(0,V.useState)(null),[F,fe]=(0,V.useState)(!1),[I,he]=(0,V.useState)(ya),[ge,_e]=(0,V.useState)(!1);(0,V.useEffect)(()=>{O&&M(j.current?.querySelector(`.fc-header-toolbar .fc-toolbar-chunk:first-child`)??null)},[O]);let ye=(0,V.useCallback)(()=>A.current?.getApi(),[A.current]),be=(0,V.useMemo)(()=>ye(),[ye]),xe=(0,V.useMemo)(()=>({alignment:`center`,position:[`right`,`left`,`bottom`,`top`]}),[]),{datePickerButton:Se,dateSelector:Ce}=sa(be,E,l);(0,V.useEffect)(()=>{if(te.current===l)return;te.current=l;let e=A.current?.getApi();e?.view.type===`listMonth`&&e.refetchEvents()},[l]);let we=(0,V.useMemo)(()=>new Set(e),[e]),Te=no(b),Ee=(0,V.useMemo)(()=>me(we,w,void 0,I),[we,w,I]),De=(0,V.useMemo)(()=>ia(be,{datePickerButton:Se}),[Se,be]),Ae=(0,V.useCallback)(()=>{A.current?.getApi().refetchEvents()},[]),L=ha(Ae),{add:Me,run:Ne,busy:R}=L,[z,Pe]=(0,V.useState)(!1),Fe=(0,V.useCallback)((e,t)=>{clearTimeout(N.current),a(),na(e),A.current?.getApi().changeView(t,e)},[a]),Ie=(0,V.useCallback)((e,t,n)=>{let r=A.current?.getApi(),i=r?.getEventById(e);!i||!r||R||z||F||o((0,Y.jsx)(Ya,{fcEvent:{event:i,el:t,jsEvent:n.nativeEvent,view:r.view}}),t)},[o,R,z,F]),Le=(0,V.useMemo)(()=>({...eo,listMonth:{...eo.listMonth,...Ai(l)},calendarYear:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1},titleFormat:{year:`numeric`},content:e=>(0,Y.jsx)(Oa,{content:e,disabled:R||z||P!==null,loading:F,error:ge,search:I,onDateSelect:e=>Fe(e,`timeGridDay`),onMonthSelect:e=>Fe(e,`dayGridMonth`),onEventSelect:Ie})}}),[l,R,z,P,F,ge,I,Fe,Ie]),B=(0,V.useCallback)(()=>{ce(null),de(null)},[]);(0,V.useEffect)(()=>{if(!O)return;let e=A.current?.getApi();if(e){if(re.current===null){re.current=ne;return}re.current!==ne&&(re.current=ne,e.refetchEvents())}},[ne,O]);let ze=(0,V.useCallback)(()=>{B(),a()},[B,a]),Be=(0,V.useCallback)(e=>{if(e===I)return;clearTimeout(N.current),ze(),he(e);let t=new URL(window.location.href);e?t.searchParams.set(`search`,e):t.searchParams.delete(`search`),history.replaceState(null,``,t)},[I,ze]);(0,V.useEffect)(()=>{let e=A.current?.getApi();if(!e)return;let t=e.getEvents().find(e=>Q(e));if(!P){t?.remove();return}if(t){Ji(t,P);return}e.addEvent(Hi(P))},[P]),(0,V.useEffect)(()=>{if(!P){a();return}if(!le){a();return}o((0,Y.jsx)(Ba,{draft:P,onChange:ce,refetchEvents:Ae,onConfirm:B,onCancel:ze}),le,xe)},[ze,B,P,le,a,xe,Ae,o]);let Ve=(0,V.useCallback)(e=>{a(),e.view.calendar.getEvents().find(e=>Q(e))?.remove(),de(null),ce(Vi(e,{allDayDefault:v,eventDuration:y})),e.view.calendar.unselect()},[v,y,a]),He=(0,V.useCallback)(e=>{e.jsEvent.detail<2||(a(),be.getEvents().find(e=>Q(e))?.remove(),de(null),ce(Vi({start:e.date,end:e.allDay?je(e.date,1):e.date,allDay:e.allDay},{allDayDefault:v,eventDuration:y})))},[be,v,y,a]);(0,V.useEffect)(()=>()=>clearTimeout(N.current),[]),(0,V.useEffect)(()=>{let e=A.current?.getApi();!e||!r||(e.changeView(e.view.type===`listMonth`?`listMonth`:`timeGridDay`,r),na(r),i())},[r,i]),(0,V.useEffect)(()=>{let e=A.current?.getApi();!e||g(e.getDate())===g(t)||e.gotoDate(t)},[t]);let Ue=(0,V.useCallback)(()=>clearTimeout(N.current),[]),We=(0,V.useCallback)(()=>{ie.current=!0,clearTimeout(N.current),a()},[a]),Ge=(0,V.useCallback)(()=>{ie.current=!1},[]),Ke=(0,V.useCallback)(e=>{Q(e.event)&&de(e.el)},[]),qe=(0,V.useCallback)(e=>{Q(e.event)&&de(t=>t===e.el?null:t)},[]),Je=(0,V.useCallback)((e,t)=>{if(Q(t.event)||R){t.revert();return}let n=async n=>{let r={event:t.event,recurrenceId:ve(String(t.event.id)),scope:n,siteId:w,refetchEvents:Ae,revert:t.revert,onHistoryEntry:Me},i=!1,a=await Ne(()=>(i=!0,e===`move`?oe(r):se({...r,oldEvent:t.oldEvent})));return i||t.revert(),a};if(!ro(t.event)){n();return}Pe(!0),o((0,Y.jsx)(qa,{action:e,onSelect:async e=>{let t=await n(e);return Pe(!1),t||a(),t},onCancel:()=>{t.revert(),Pe(!1)}},++ae.current),t.jsEvent)},[w,a,Ae,o,Me,Ne,R]),Ye=(0,V.useCallback)(e=>{let t=s(e);na(t),A.current?.getApi().changeView(`timeGridDay`,t)},[]),Xe=(0,V.useCallback)(e=>e.view.type===`timeGridWeek`&&g(e.date)===g(d)?[`fc-title-today`]:[],[d]),H=(0,V.useCallback)(e=>{if(e.view.type===`listMonth`){let t=e;return(0,Y.jsxs)(`a`,{...t.navLinkAttrs,href:Craft.getCpUrl(`calendar/${c(e.date)}/day`),id:t.textId,className:`calendar-agenda-day`,"aria-label":e.text,children:[(0,Y.jsx)(`span`,{className:`calendar-agenda-day-number`,"aria-hidden":`true`,children:Za.format(e.date)}),(0,Y.jsxs)(`span`,{className:`calendar-agenda-day-label`,"aria-hidden":`true`,children:[(0,Y.jsx)(`span`,{children:Qa.format(e.date)}),(0,Y.jsx)(`span`,{className:`calendar-agenda-day-month`,children:$a.format(e.date)})]})]})}if(e.view.type!==`timeGridWeek`)return e.text;let t=Xa.format(e.date),n=Za.format(e.date);return(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(`span`,{className:`fc-day-header-label`,children:t}),(0,Y.jsx)(`span`,{className:`fc-day-header-date`,children:n})]})},[]);if(!O)return null;let U=document.querySelector(`[data-calendar-history-root]`),Ze=x&&S?(0,Y.jsx)(va,{canUndo:L.canUndo,canRedo:L.canRedo,disabled:R||F||z||P!==null,onReplay:e=>{a(),L.replay(e)}}):null,Qe=document.querySelector(`[data-calendar-search-root]`),$e=(0,Y.jsx)(ba,{initialSearch:I,onSearchChange:Be});return(0,Y.jsxs)(Re,{ref:j,className:F?`is-fetching-events`:void 0,children:[Qe?(0,li.createPortal)($e,Qe):$e,U?(0,li.createPortal)(Ze,U):Ze,E===`listMonth`&&ee&&(0,li.createPortal)((0,Y.jsx)(Mi,{range:l,disabled:R||z||P!==null,onChange:e=>{clearTimeout(N.current),a(),u(e)}}),ee),(0,Y.jsx)(pe,{...m(),ref:A,themeSystem:`bootstrap5`,plugins:[ue,ke,Ci,Oe],customButtons:De,initialView:E,initialDate:d,height:E===`listMonth`||E===`calendarYear`?`auto`:void 0,locale:f,views:Le,timeZone:`UTC`,firstDay:h,nextDayThreshold:_,fixedWeekCount:!0,dayMaxEventRows:!0,editable:x&&S&&!R&&!z&&!F,selectable:k,selectMirror:!1,selectMinDistance:5,slotDuration:Te,snapDuration:Te,navLinks:!0,navLinkDayClick:Ye,select:k?Ve:void 0,dateClick:k?He:void 0,dayHeaderClassNames:Xe,dayHeaderContent:H,events:Ee,eventClassNames:da,eventContent:pa,progressiveEventRendering:!0,eventTimeFormat:p.time.short.js,loading:e=>{e&&_e(!1),fe(e)},eventSourceFailure:()=>_e(!0),noEventsContent:()=>(0,Y.jsx)(`span`,{role:`status`,children:Craft.t(`calendar`,ge?`Couldn’t load events. Use Refresh to try again.`:F?`Loading events…`:I?`No matching events in this date range.`:`No events in this date range.`)}),eventDidMount:Ke,eventWillUnmount:qe,eventMouseEnter:e=>{e.view.type!==`dayGridMonth`&&e.view.type!==`listMonth`||ie.current||R||F||z||fa(e.event,e.jsEvent.target)!==`ignore`&&(clearTimeout(N.current),N.current=setTimeout(()=>o((0,Y.jsx)(Ya,{fcEvent:e}),e.el,to),300),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventMouseLeave:Ue,eventDragStart:We,eventDragStop:Ge,eventResizeStart:We,eventResizeStop:Ge,eventClick:e=>{if(R||F||z){e.jsEvent.preventDefault();return}fa(e.event,e.jsEvent.target)===`open`&&(o((0,Y.jsx)(Ya,{fcEvent:e}),e.el),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventDrop:e=>Je(`move`,e),eventResize:e=>Je(`resize`,e),headerToolbar:{start:`title`,center:`timeGridDay,timeGridWeek,dayGridMonth,calendarYear,listMonth`,end:ra},buttonText:{dayGridMonth:Craft.t(`calendar`,`Month`),timeGridWeek:Craft.t(`calendar`,`Week`),timeGridDay:Craft.t(`calendar`,`Day`),listMonth:Craft.t(`calendar`,`Agenda`),calendarYear:Craft.t(`calendar`,`Year`),today:Craft.t(`calendar`,`Today`)},datesSet:({view:e})=>{n(e.calendar.getDate()),setTimeout(()=>{D(e.type),na(e.calendar.getDate(),e.type)},50)}}),Ce]})},ao=r.div`
  color: var(--gray-600);
`,oo=r.div`
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
`,so=r.button`
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
`,co=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 7px;

  span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
`,lo=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 4px;
`,uo=r.button`
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
`,fo=(e,t,n)=>new Date(Date.UTC(e,t,n)),po=e=>fo(e.getUTCFullYear(),e.getUTCMonth(),1),mo=(e,t)=>fo(e.getUTCFullYear(),e.getUTCMonth()+t,1),ho=({selectedDate:e,onDateSelect:t})=>{let{language:n,weekStartDay:r}=$(),[i,a]=(0,V.useState)(()=>po(e));(0,V.useEffect)(()=>{a(po(e))},[e]);let o=(0,V.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`long`,year:`numeric`,timeZone:`UTC`}),[n]),s=(0,V.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`narrow`,timeZone:`UTC`}),[n]),c=(0,V.useMemo)(()=>Array.from({length:7},(e,t)=>s.format(fo(2023,0,1+r+t))),[r,s]),l=(0,V.useMemo)(()=>{let e=i.getUTCFullYear(),t=i.getUTCMonth(),n=fo(e,t,1),a=fo(e,t+1,0),o=(n.getUTCDay()-r+7)%7,s=((r+6)%7-a.getUTCDay()+7)%7,c=o+a.getUTCDate()+s;return Array.from({length:c},(n,r)=>fo(e,t,1-o+r))},[i,r]),u=g(new Date);return(0,Y.jsxs)(ao,{children:[(0,Y.jsxs)(oo,{children:[(0,Y.jsx)(so,{"aria-label":Craft.t(`calendar`,`Previous month`),type:`button`,onClick:()=>a(e=>mo(e,-1))}),(0,Y.jsx)(`span`,{children:o.format(i)}),(0,Y.jsx)(so,{"aria-label":Craft.t(`calendar`,`Next month`),type:`button`,$next:!0,onClick:()=>a(e=>mo(e,1))})]}),(0,Y.jsx)(co,{children:c.map((e,t)=>(0,Y.jsx)(`span`,{children:e},`${e}-${t}`))}),(0,Y.jsx)(lo,{children:l.map(e=>{let r=g(e);return(0,Y.jsx)(uo,{"aria-label":e.toLocaleDateString(n,{timeZone:`UTC`}),type:`button`,$isCurrentMonth:e.getUTCMonth()===i.getUTCMonth(),$isToday:r===u,onClick:()=>t(e),children:e.getUTCDate()},r)})})]})},go=h`
  100% {
    transform: translateX(100%);
  }
`,_o=r.div`
  position: relative;
  overflow: hidden;

  background: ${B.gray200};

  &::after {
    content: "";

    position: absolute;
    inset: 0;

    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgb(from ${B.gray050} r g b / 70%),
      transparent
    );

    animation: ${go} 1.4s ${Be.easeInOut} infinite;
  }
`,vo=({width:e=`100%`,height:t=16,borderRadius:n=4,className:r})=>(0,Y.jsx)(_o,{"aria-hidden":`true`,className:r,style:{borderRadius:n,height:t,width:e}}),yo=async e=>{let t=await ge(Qr(`/api/calendars`),{signal:e});if(!t.ok)throw Error(`Failed to fetch calendars`);return t.json()},bo=()=>{let[e,t]=(0,V.useState)([]),[n,r]=(0,V.useState)(null),[i,a]=(0,V.useState)(!1),o=(0,V.useCallback)(async e=>{a(!0),r(null);try{let n=await yo(e);t(n)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;r(e instanceof Error?e:Error(`Failed to fetch calendars`))}finally{a(!1)}},[]);return(0,V.useEffect)(()=>{let e=new AbortController;return o(e.signal),()=>{e.abort()}},[o]),{data:e,error:n,isPending:i,refetch:o}},xo=r.div`
  padding: 0;
`,So=r.div`
  display: flex;
  flex-direction: column;
`,Co=r.hr`
  width: 100%;
  margin: 16px 0;
  border: 0;
  border-top: 1px solid var(--gray-200);
`,wo=r.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0;
  padding: 0;

  list-style: none;
`,To=r.li`
  margin: 0;
`,Eo=r.label`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0;

  border-radius: 4px;

  color: ${B.gray800};
  cursor: pointer;
`,Do=r.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);

  &:focus-visible + span {
    border: 2px solid ${B.black};
  }

  &:checked + span {
    border: 1px solid var(--calendar-color);
  }

  &:checked + span:after {
    opacity: 1;
  }
`,Oo=r.span`
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
`,ko=r.span`
  font-size: 13px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ao=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,jo=r.div`
  font-size: 13px;
  color: ${B.error};
`,Mo=({hiddenCalendarIds:e,onToggleCalendar:t})=>{let{data:n,error:r,isPending:i}=bo(),a=new Set(e),o=i&&n.length===0;return(0,Y.jsxs)(xo,{children:[o&&(0,Y.jsxs)(Ao,{children:[(0,Y.jsx)(vo,{height:16}),(0,Y.jsx)(vo,{height:16}),(0,Y.jsx)(vo,{height:16})]}),!o&&r&&(0,Y.jsx)(jo,{children:r.message}),!o&&!r&&(0,Y.jsx)(wo,{children:n.map(e=>(0,Y.jsx)(To,{children:(0,Y.jsxs)(Eo,{style:{"--calendar-color":e.color.base,"--calendar-color-contrast":e.color.contrast},children:[(0,Y.jsx)(Do,{type:`checkbox`,checked:!a.has(e.id),onChange:()=>t(e.id)}),(0,Y.jsx)(Oo,{}),(0,Y.jsx)(ko,{children:e.title})]})},e.id))})]})},No=()=>{let e=document.querySelector(`[data-sidebar-root]`),{hiddenCalendarIds:t,toggleCalendarVisibility:n}=ta(),{currentDay:r}=$(),[i,a]=(0,V.useState)(()=>new Date(r)),[o,s]=(0,V.useState)(null);return(0,Y.jsxs)(ci,{children:[(0,Y.jsx)(io,{hiddenCalendarIds:t,selectedDate:i,onDateChange:a,miniDateSelection:o,onMiniDateSelectionHandled:()=>s(null)}),e&&(0,li.createPortal)((0,Y.jsxs)(So,{children:[(0,Y.jsx)(Mo,{hiddenCalendarIds:t,onToggleCalendar:n}),(0,Y.jsx)(Co,{}),(0,Y.jsx)(ho,{selectedDate:i,onDateSelect:e=>{a(e),s(e)}})]}),e)]})},Po=document.getElementById(`calendar-overview`),Fo=Po.querySelector(`[data-root]`),Io=Po.querySelector(`[data-config]`),Lo=JSON.parse(Io?.textContent||`{}`);$r.createRoot(Fo).render((0,Y.jsx)(oa,{config:Lo,children:(0,Y.jsx)(Dr,{basename:Qr(`/`,!1),children:(0,Y.jsx)(Bn,{children:(0,Y.jsxs)(Rn,{path:`/`,element:(0,Y.jsx)(qr,{}),children:[(0,Y.jsx)(Rn,{index:!0,element:(0,Y.jsx)(No,{})}),(0,Y.jsx)(Rn,{path:`overview`,element:(0,Y.jsx)(No,{})}),(0,Y.jsx)(Rn,{path:`:year/:month/:day/:view?`,element:(0,Y.jsx)(No,{})})]})})})}));