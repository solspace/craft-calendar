import{A as e,C as t,D as n,M as r,N as i,O as a,T as o,_ as s,a as c,b as l,i as u,j as d,k as f,n as p,r as m,t as h,v as g,w as _,x as v,y}from"./localization-DftVQMPp.js";import{C as b,D as x,E as S,S as C,_ as w,a as T,b as E,r as ee,w as te,x as D}from"./calendar-preview.operations-Bbr1cAap.js";import{$t as O,A as k,Dt as A,F as j,Ft as ne,G as re,Ht as M,Kt as ie,Ot as ae,Pt as N,Rt as P,S as oe,Ut as se,Y as F,Zt as ce,_ as le,_n as I,_t as L,a as ue,c as de,ct as R,d as fe,dn as pe,f as me,h as he,hn as ge,i as _e,l as ve,ln as ye,m as be,n as xe,o as Se,p as Ce,r as z,s as we,st as Te,t as Ee,u as De,un as Oe,v as ke,wt as Ae,x as je,y as Me,z as B}from"./calendar.events-C1TErcLg.js";import{t as Ne}from"./interaction-Cv-mzU5H.js";import{t as Pe}from"./timegrid-Bv1Oi8IQ.js";import{a as V,b as Fe,c as H,f as Ie,n as Le,o as Re,p as ze,r as Be,s as Ve,t as He,y as Ue}from"./components-BmnYJ2zx.js";import{n as We,r as Ge}from"./calendar.styles-OAg62T4m.js";import{n as Ke,r as qe,t as Je}from"./variables-81fttfBH.js";var Ye=`modulepreload`,Xe=function(e,t){return new URL(e,t).href},Ze={},Qe=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=Xe(t,n),t=s(t),t in Ze)return;Ze[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Ye,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},U=i(d(),1),$e=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,et=/^[\\/]{2}/;function tt(e,t){return t+e.replace(/\\/g,`/`)}var nt=`popstate`;function rt(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function it(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return st(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ct(t)}return ut(t,n,null,e)}function W(e,t){if(e===!1||e==null)throw Error(t)}function G(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function at(){return Math.random().toString(36).substring(2,10)}function ot(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function st(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?lt(t):t,state:n,key:t&&t.key||r||at(),mask:i}}function ct({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function lt(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ut(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=rt(e)?e:st(h.location,e,t);n&&n(r,e),l=u()+1;let d=ot(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=rt(e)?e:st(h.location,e,t);n&&n(r,e),l=u();let i=ot(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return dt(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(nt,d),c=e,()=>{i.removeEventListener(nt,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function dt(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),W(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:ct(t);return i=i.replace(/ $/,`%20`),!n&&et.test(i)&&(i=r+i),new URL(i,r)}function ft(e,t,n=`/`){return pt(e,t,n,!1)}function pt(e,t,n,r,i){let a=K((typeof t==`string`?lt(t):t).pathname||`/`,n);if(a==null)return null;let o=i??ht(e),s=null,c=Mt(a);for(let e=0;s==null&&e<o.length;++e)s=Ot(o[e],c,r);return s}function mt(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function ht(e){let t=gt(e);return vt(t),t}function gt(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;W(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=q([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(W(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),gt(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:Et(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=jt(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of _t(e.path))a(e,t,!0,n)}),t}function _t(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=_t(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function vt(e){e.sort((e,t)=>e.score===t.score?Dt(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var yt=/^:[\w-]+$/,bt=3,xt=2,St=1,Ct=10,wt=-2,Tt=e=>e===`*`;function Et(e,t){let n=e.split(`/`),r=n.length;return n.some(Tt)&&(r+=wt),t&&(r+=xt),n.filter(e=>!Tt(e)).reduce((e,t)=>e+(yt.test(t)?bt:t===``?St:Ct),r)}function Dt(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function Ot(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?At(u,l,s.matcher,s.compiledParams):kt(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=kt({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:q([a,d.pathname]),pathnameBase:Vt(q([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=q([a,d.pathnameBase]))}return o}function kt(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=jt(e.path,e.caseSensitive,e.end);return At(e,t,n,r)}function At(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function jt(e,t=!1,n=!0){G(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Mt(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return G(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function K(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Nt(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?lt(e):e,a;return n?(n=zt(n),a=n.startsWith(`/`)?Pt(n.substring(1),`/`):Pt(n,t)):a=t,{pathname:a,search:Ht(r),hash:Ut(i)}}function Pt(e,t){let n=Bt(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Ft(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function It(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Lt(e){let t=It(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Rt(e,t,n,r=!1){let i;typeof e==`string`?i=lt(e):(i={...e},W(!i.pathname||!i.pathname.includes(`?`),Ft(`?`,`pathname`,`search`,i)),W(!i.pathname||!i.pathname.includes(`#`),Ft(`#`,`pathname`,`hash`,i)),W(!i.search||!i.search.includes(`#`),Ft(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Nt(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var zt=e=>e.replace(/[\\/]{2,}/g,`/`),q=e=>zt(e.join(`/`)),Bt=e=>e.replace(/\/+$/,``),Vt=e=>Bt(e).replace(/^\/*/,`/`),Ht=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ut=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Wt=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Gt(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Kt(e){return q(e.map(e=>e.route.path).filter(Boolean))||`/`}var qt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Jt(e,t){let n=e;if(typeof n!=`string`||!$e.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(qt)try{let e=new URL(window.location.href),r=et.test(n)?new URL(tt(n,e.protocol)):new URL(n),a=K(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{G(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Yt=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Yt);var Xt=[`GET`,...Yt];new Set(Xt);var Zt=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Qt(e){try{return Zt.includes(new URL(e).protocol)}catch{return!1}}var $t=U.createContext(null);$t.displayName=`DataRouter`;var en=U.createContext(null);en.displayName=`DataRouterState`;var tn=U.createContext(!1);function nn(){return U.useContext(tn)}var rn=U.createContext({isTransitioning:!1});rn.displayName=`ViewTransition`;var an=U.createContext(new Map);an.displayName=`Fetchers`;var on=U.createContext(null);on.displayName=`Await`;var J=U.createContext(null);J.displayName=`Navigation`;var sn=U.createContext(null);sn.displayName=`Location`;var Y=U.createContext({outlet:null,matches:[],isDataRoute:!1});Y.displayName=`Route`;var cn=U.createContext(null);cn.displayName=`RouteError`;var ln=`REACT_ROUTER_ERROR`,un=`REDIRECT`,dn=`ROUTE_ERROR_RESPONSE`;function fn(e){if(e.startsWith(`${ln}:${un}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function pn(e){if(e.startsWith(`${ln}:${dn}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Wt(t.status,t.statusText,t.data)}catch{}}function mn(e,{relative:t}={}){W(hn(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=U.useContext(J),{hash:i,pathname:a,search:o}=Sn(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:q([n,a])),r.createHref({pathname:s,search:o,hash:i})}function hn(){return U.useContext(sn)!=null}function X(){return W(hn(),`useLocation() may be used only in the context of a <Router> component.`),U.useContext(sn).location}var gn=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function _n(e){U.useContext(J).static||U.useLayoutEffect(e)}function vn(){let{isDataRoute:e}=U.useContext(Y);return e?Vn():yn()}function yn(){W(hn(),`useNavigate() may be used only in the context of a <Router> component.`);let e=U.useContext($t),{basename:t,navigator:n}=U.useContext(J),{matches:r}=U.useContext(Y),{pathname:i}=X(),a=JSON.stringify(Lt(r)),o=U.useRef(!1);return _n(()=>{o.current=!0}),U.useCallback((r,s={})=>{if(G(o.current,gn),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Rt(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:q([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var bn=U.createContext(null);function xn(e){let t=U.useContext(Y).outlet;return U.useMemo(()=>t&&U.createElement(bn.Provider,{value:e},t),[t,e])}function Sn(e,{relative:t}={}){let{matches:n}=U.useContext(Y),{pathname:r}=X(),i=JSON.stringify(Lt(n));return U.useMemo(()=>Rt(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function Cn(e,t){return wn(e,t)}function wn(e,t,n){W(hn(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=U.useContext(J),{matches:i}=U.useContext(Y),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Un(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=X(),d;if(t){let e=typeof t==`string`?lt(t):t;W(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):ft(e,{pathname:p});G(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),G(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=jn(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:q([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:q([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?U.createElement(sn.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function Tn(){let e=Bn(),t=Gt(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=U.createElement(U.Fragment,null,U.createElement(`p`,null,`💿 Hey developer 👋`),U.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,U.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,U.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),U.createElement(U.Fragment,null,U.createElement(`h2`,null,`Unexpected Application Error!`),U.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?U.createElement(`pre`,{style:i},n):null,o)}var En=U.createElement(Tn,null),Dn=class extends U.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=pn(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:U.createElement(Y.Provider,{value:this.props.routeContext},U.createElement(cn.Provider,{value:e,children:this.props.component}));return this.context?U.createElement(kn,{error:e},t):t}};Dn.contextType=tn;var On=new WeakMap;function kn({children:e,error:t}){let{basename:n}=U.useContext(J);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=fn(t.digest);if(e){let r=On.get(t);if(r)throw r;let i=Jt(e.location,n),a=i.absoluteURL||i.to;if(Qt(a))throw Error(`Invalid redirect location`);if(qt&&!On.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw On.set(t,n),n}return U.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function An({routeContext:e,match:t,children:n}){let r=U.useContext($t);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),U.createElement(Y.Provider,{value:e},n)}function jn(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);W(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Kt(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||En,o&&(s<0&&c===0?(Un(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?U.createElement(n.route.Component,null):n.route.element?n.route.element:e,U.createElement(An,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?U.createElement(Dn,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Mn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Nn(e){let t=U.useContext($t);return W(t,Mn(e)),t}function Pn(e){let t=U.useContext(en);return W(t,Mn(e)),t}function Fn(e){let t=U.useContext(Y);return W(t,Mn(e)),t}function In(e){let t=Fn(e),n=t.matches[t.matches.length-1];return W(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Ln(){return In(`useRouteId`)}function Rn(){let e=Pn(`useNavigation`);return U.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function zn(){let{matches:e,loaderData:t}=Pn(`useMatches`);return U.useMemo(()=>e.map(e=>mt(e,t)),[e,t])}function Bn(){let e=U.useContext(cn),t=Pn(`useRouteError`),n=In(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Vn(){let{router:e}=Nn(`useNavigate`),t=In(`useNavigate`),n=U.useRef(!1);return _n(()=>{n.current=!0}),U.useCallback(async(r,i={})=>{G(n.current,gn),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Hn={};function Un(e,t,n){!t&&!Hn[e]&&(Hn[e]=!0,G(!1,n))}U.memo(Wn);function Wn({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return wn(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Gn(e){return xn(e.context)}function Kn(e){W(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function qn({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){W(!hn(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=U.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=lt(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=U.useMemo(()=>{let e=K(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return G(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:U.createElement(J.Provider,{value:c},U.createElement(sn.Provider,{children:t,value:h}))}function Jn({children:e,location:t}){return Cn(Yn(e),t)}U.Component;function Yn(e,t=[]){let n=[];return U.Children.forEach(e,(e,r)=>{if(!U.isValidElement(e))return;let i=[...t,r];if(e.type===U.Fragment){n.push.apply(n,Yn(e.props.children,i));return}W(e.type===Kn,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),W(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Yn(e.props.children,i)),n.push(a)}),n}var Xn=`get`,Zn=`application/x-www-form-urlencoded`;function Qn(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function $n(e){return Qn(e)&&e.tagName.toLowerCase()===`button`}function er(e){return Qn(e)&&e.tagName.toLowerCase()===`form`}function tr(e){return Qn(e)&&e.tagName.toLowerCase()===`input`}function nr(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function rr(e,t){return e.button===0&&(!t||t===`_self`)&&!nr(e)}var ir=null;function ar(){if(ir===null)try{new FormData(document.createElement(`form`),0),ir=!1}catch{ir=!0}return ir}var or=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function sr(e){return e!=null&&!or.has(e)?(G(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Zn}"`),null):e}function cr(e,t){let n,r,i,a,o;if(er(e)){let o=e.getAttribute(`action`);r=o?K(o,t):null,n=e.getAttribute(`method`)||Xn,i=sr(e.getAttribute(`enctype`))||Zn,a=new FormData(e)}else if($n(e)||tr(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?K(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Xn,i=sr(e.getAttribute(`formenctype`))||sr(o.getAttribute(`enctype`))||Zn,a=new FormData(o,e),!ar()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Qn(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Xn,r=null,i=Zn,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var lr={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},ur=/[&><\u2028\u2029]/g;function dr(e){return e.replace(ur,e=>lr[e])}function fr(e,t){if(e===!1||e==null)throw Error(t)}function pr(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&K(i.pathname,t)===`/`?i.pathname=`${Bt(t)}/_root.${r}`:i.pathname=`${Bt(i.pathname)}.${r}`,i}async function mr(e,t){if(e.id in t)return t[e.id];try{let n=await Qe(()=>import(e.module),[],import.meta.url);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function hr(e){return e!=null&&typeof e.page==`string`}function gr(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function _r(e,t,n){return Sr((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await mr(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(gr).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function vr(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function yr(e,t,{includeHydrateFallback:n}={}){return br(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function br(e){return[...new Set(e)]}function xr(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function Sr(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!hr(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(xr(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function Cr(){let e=U.useContext($t);return fr(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function wr(){let e=U.useContext(en);return fr(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var Tr=U.createContext(void 0);Tr.displayName=`FrameworkContext`;function Er(){let e=U.useContext(Tr);return fr(e,`You must render this element inside a <HydratedRouter> element`),e}function Dr(e,t){let n=U.useContext(Tr),[r,i]=U.useState(!1),[a,o]=U.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=U.useRef(null);U.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),U.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:Or(s,p),onBlur:Or(c,m),onMouseEnter:Or(l,p),onMouseLeave:Or(u,m),onTouchStart:Or(d,p)}]:[a,f,{}]:[!1,f,{}]}function Or(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function kr({page:e,...t}){let n=nn(),{nonce:r}=Er(),{router:i}=Cr(),a=U.useMemo(()=>ft(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?U.createElement(jr,{page:e,matches:a,...t}):U.createElement(Mr,{page:e,matches:a,...t})):null}function Ar(e){let{manifest:t,routeModules:n}=Er(),[r,i]=U.useState([]);return U.useEffect(()=>{let r=!1;return _r(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function jr({page:e,matches:t,...n}){let r=X(),{future:i}=Er(),{basename:a}=Cr(),o=U.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=pr(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return U.createElement(U.Fragment,null,o.map(e=>U.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function Mr({page:e,matches:t,...n}){let r=X(),{future:i,manifest:a,routeModules:o}=Er(),{basename:s}=Cr(),{loaderData:c,matches:l}=wr(),u=U.useMemo(()=>vr(e,t,l,a,r,`data`),[e,t,l,a,r]),d=U.useMemo(()=>vr(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=U.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=pr(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=U.useMemo(()=>yr(d,a),[d,a]),m=Ar(d);return U.createElement(U.Fragment,null,f.map(e=>U.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>U.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>U.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Nr(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}U.Component;var Pr=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Pr&&(window.__reactRouterVersion=`7.18.1`)}catch{}function Fr({basename:e,children:t,useTransitions:n,window:r}){let i=U.useRef();i.current??(i.current=it({window:r,v5Compat:!0}));let a=i.current,[o,s]=U.useState({action:a.action,location:a.location}),c=U.useCallback(e=>{n===!1?s(e):U.startTransition(()=>s(e))},[n]);return U.useLayoutEffect(()=>a.listen(c),[a,c]),U.createElement(qn,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function Ir({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=U.useState({action:n.action,location:n.location}),o=U.useCallback(e=>{r===!1?a(e):U.startTransition(()=>a(e))},[r]);return U.useLayoutEffect(()=>n.listen(o),[n,o]),U.createElement(qn,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}Ir.displayName=`unstable_HistoryRouter`;var Lr=U.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=U.useContext(J),v=typeof l==`string`&&$e.test(l),y=Jt(l,h);l=y.to;let b=mn(l,{relative:r}),x=X(),S=null;if(o){let e=Rt(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:q([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=Dr(n,p),E=Wr(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function ee(t){e&&e(t),t.defaultPrevented||E(t)}let te=!(y.isExternal||i),D=U.createElement(`a`,{...p,...T,href:(te?S:void 0)||y.absoluteURL||b,onClick:te?ee:e,ref:Nr(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?U.createElement(U.Fragment,null,D,U.createElement(kr,{page:b})):D});Lr.displayName=`Link`;var Rr=U.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=Sn(a,{relative:c.relative}),d=X(),f=U.useContext(en),{navigator:p,basename:m}=U.useContext(J),h=f!=null&&ei(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=K(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return U.createElement(Lr,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});Rr.displayName=`NavLink`;var zr=U.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Xn,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=U.useContext(J),g=qr(),_=Jr(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&$e.test(s);return U.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?U.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});zr.displayName=`Form`;function Br({getKey:e,storageKey:t,...n}){let r=U.useContext(Tr),{basename:i}=U.useContext(J),a=X(),o=zn();Qr({getKey:e,storageKey:t});let s=U.useMemo(()=>{if(!r||!e)return null;let t=Zr(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),U.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${dr(JSON.stringify(t||Yr))}, ${dr(JSON.stringify(s))})`}})}Br.displayName=`ScrollRestoration`;function Vr(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Hr(e){let t=U.useContext($t);return W(t,Vr(e)),t}function Ur(e){let t=U.useContext(en);return W(t,Vr(e)),t}function Wr(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=vn(),d=X(),f=Sn(e,{relative:o});return U.useCallback(p=>{if(rr(p,t)){p.preventDefault();let t=n===void 0?ct(d)===ct(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?U.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Gr=0,Kr=()=>`__${String(++Gr)}__`;function qr(){let{router:e}=Hr(`useSubmit`),{basename:t}=U.useContext(J),n=Ln(),r=e.fetch,i=e.navigate;return U.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=cr(e,t);if(a.navigate===!1){let e=a.fetcherKey||Kr();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Jr(e,{relative:t}={}){let{basename:n}=U.useContext(J),r=U.useContext(Y);W(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...Sn(e||`.`,{relative:t})},o=X();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:q([n,a.pathname])),ct(a)}var Yr=`react-router-scroll-positions`,Xr={};function Zr(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:K(e.pathname,n)||e.pathname},t)),i??(i=e.key),i}function Qr({getKey:e,storageKey:t}={}){let{router:n}=Hr(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Ur(`useScrollRestoration`),{basename:a}=U.useContext(J),o=X(),s=zn(),c=Rn();U.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),$r(U.useCallback(()=>{if(c.state===`idle`){let t=Zr(o,s,a,e);Xr[t]=window.scrollY}try{sessionStorage.setItem(t||Yr,JSON.stringify(Xr))}catch(e){G(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(U.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Yr);e&&(Xr=JSON.parse(e))}catch{}},[t]),U.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Xr,()=>window.scrollY,e?(t,n)=>Zr(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),U.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{G(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function $r(e,t){let{capture:n}=t||{};U.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function ei(e,{relative:t}={}){let n=U.useContext(rn);W(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Hr(`useViewTransitionState`),i=Sn(e,{relative:t});if(!n.isTransitioning)return!1;let a=K(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=K(n.nextLocation.pathname,r)||n.nextLocation.pathname;return kt(i.pathname,o)!=null||kt(i.pathname,a)!=null}var Z=f(),ti=()=>(0,Z.jsx)(Gn,{}),ni=r(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),ri=r((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),ii=i(r(((e,t)=>{var n=ni(),r=ri(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function u(e){return(e||``).toString().replace(i,``)}var d=[[`#`,`hash`],[`?`,`query`],function(e,t){return m(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],f={hash:1,query:1};function p(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new _(unescape(e.pathname),{});else if(r===`string`)for(i in n=new _(e,{}),f)delete n[i];else if(r===`object`){for(i in e)i in f||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function m(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function h(e,t){e=u(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):m(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&m(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||m(r),slashesCount:s,rest:l}}function g(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function _(e,t,i){if(e=u(e),e=e.replace(a,``),!(this instanceof _))return new _(e,t,i);var o,s,c,f,v,y,b=d.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=p(t),s=h(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||l.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!m(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(f=b[C],typeof f==`function`){e=f(e,S);continue}c=f[0],y=f[1],c===c?typeof c==`string`?(v=c===`@`?e.lastIndexOf(c):e.indexOf(c),~v&&(typeof f[2]==`number`?(S[y]=e.slice(0,v),e=e.slice(v+f[2])):(S[y]=e.slice(v),e=e.slice(0,v)))):(v=c.exec(e))&&(S[y]=v[1],e=e.slice(0,v.index)):S[y]=e,S[y]=S[y]||o&&f[3]&&t[y]||``,f[4]&&(S[y]=S[y].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=g(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&m(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(v=S.auth.indexOf(`:`),~v?(S.username=S.auth.slice(0,v),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(v+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&m(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function v(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&m(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function y(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||m(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&m(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}_.prototype={set:v,toString:y},_.extractProtocol=h,_.location=p,_.trimLeft=u,_.qs=r,t.exports=_}))()),ai=window.location.href.replace(/(.*\/calendar).*/i,`$1`),oi=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,ii.default)(`${ai}${e}`);return t?n.href:n.pathname},si=i(a()),ci=14,li=e=>{if(e instanceof MouseEvent){let t=e.target;if(t instanceof HTMLElement){let n=t.getBoundingClientRect(),r=n.left+e.offsetX,i=n.top+e.offsetY;return new DOMRect(r,i,1,1)}return new DOMRect(e.clientX,e.clientY,1,1)}return e.getBoundingClientRect()},ui=({state:e,bridgeRef:t,popoverRef:n})=>{let[r,i]=(0,U.useState)(),a=(0,U.useMemo)(()=>{if(e)return S(e.options)},[e]),o=(0,U.useCallback)(()=>{if(!e||!a){i(void 0);return}let r=t.current,o=n.current;if(!r||!o)return;let s=li(e.anchor),c=o.getBoundingClientRect(),l=r.getBoundingClientRect(),u=r.closest(`#content`)?.getBoundingClientRect(),d=Math.max(0,u?.top??0),f=Math.min(window.innerHeight,u?.bottom??window.innerHeight),p=Math.max(0,f-d),m=x({anchorRect:{left:s.left,right:s.right,width:s.width,height:s.height,top:s.top-d,bottom:s.bottom-d},popoverRect:c,viewportWidth:window.innerWidth,viewportHeight:p,options:a,arrowPadding:ci});i({...m,top:m.top+d-l.top,left:m.left-l.left,maxHeight:Math.max(0,p-a.padding*2-2)})},[e,a,t,n]);return(0,U.useLayoutEffect)(()=>{o()},[o]),(0,U.useEffect)(()=>{if(!e)return;let t=()=>o(),r=typeof ResizeObserver>`u`?void 0:new ResizeObserver(t);return n.current&&r?.observe(n.current),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),r?.disconnect()}},[e,o,n]),r},di=n.div`
  position: relative;
`,fi=n.div`
  --calendar-popover-max-height: ${({$maxHeight:e})=>e===void 0?`calc(100dvh - 32px)`:`${e}px`};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`,pi=n.span`
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
`,mi=(0,U.createContext)(null),hi=()=>{let e=(0,U.useContext)(mi);if(!e)throw Error(`usePopover must be used within a PopoverProvider`);return e},gi=({children:e})=>{let[t,n]=(0,U.useState)(),r=(0,U.useRef)(null),i=(0,U.useRef)(null),a=(0,U.useRef)(void 0),o=(0,U.useRef)(!1),s=(0,U.useCallback)((e,t,r)=>{clearTimeout(a.current),o.current=!1,n({content:e,anchor:t,options:r})},[]),c=(0,U.useCallback)(()=>{clearTimeout(a.current),n(void 0)},[]),l=(0,U.useCallback)(()=>{clearTimeout(a.current),o.current=!0},[]),u=(0,U.useMemo)(()=>({showPopover:s,hidePopover:c,keepPopoverOpen:l}),[s,c,l]),d=ui({state:t,bridgeRef:r,popoverRef:i}),f=t?.options?.closeDelayMs,p=(0,U.useCallback)(()=>clearTimeout(a.current),[]),m=(0,U.useCallback)(()=>{f===void 0||o.current||(clearTimeout(a.current),a.current=setTimeout(()=>n(void 0),f))},[f]);(0,U.useEffect)(()=>{let e=t?.anchor;if(!(f===void 0||!(e instanceof HTMLElement)))return e.addEventListener(`mouseleave`,m),()=>e.removeEventListener(`mouseleave`,m)},[t,f,m]),(0,U.useEffect)(()=>()=>clearTimeout(a.current),[]);let h=t?.content&&(0,Z.jsxs)(fi,{$maxHeight:d?.maxHeight,ref:i,onMouseEnter:p,onMouseLeave:m,style:{top:d?.top??0,left:d?.left??0,visibility:d?`visible`:`hidden`},children:[d&&(0,Z.jsx)(pi,{side:d.arrow.side,top:d.arrow.top,left:d.arrow.left}),t.content]});return(0,Z.jsx)(mi.Provider,{value:u,children:(0,Z.jsxs)(di,{ref:r,children:[h,e]})})},_i=i(e()),vi=class extends Me{constructor(){super(...arguments),this.state={textId:P()}}render(){let{theme:e,dateEnv:t,options:n,viewApi:r}=this.context,{cellId:i,dayDate:a,todayRange:o}=this.props,{textId:s}=this.state,c=A(a,o),l=n.listDayFormat?t.format(a,n.listDayFormat):``,u=n.listDaySideFormat?t.format(a,n.listDaySideFormat):``,d=Object.assign({date:t.toDate(a),view:r,textId:s,text:l,sideText:u,navLinkAttrs:Te(this.context,a),sideNavLinkAttrs:Te(this.context,a,`day`,!1)},c);return I(je,{elTag:`tr`,elClasses:[`fc-list-day`,...ae(c,e)],elAttrs:{"data-date":Ae(a)},renderProps:d,generatorName:`dayHeaderContent`,customGenerator:n.dayHeaderContent,defaultGenerator:yi,classNameGenerator:n.dayHeaderClassNames,didMount:n.dayHeaderDidMount,willUnmount:n.dayHeaderWillUnmount},t=>I(`th`,{scope:`colgroup`,colSpan:3,id:i,"aria-labelledby":s},I(t,{elTag:`div`,elClasses:[`fc-list-day-cushion`,e.getClass(`tableCellShaded`)]})))}};function yi(e){return I(ge,null,e.text&&I(`a`,Object.assign({id:e.textId,className:`fc-list-day-text`},e.navLinkAttrs),e.text),e.sideText&&I(`a`,Object.assign({"aria-hidden":!0,className:`fc-list-day-side-text`},e.sideNavLinkAttrs),e.sideText))}var bi=L({hour:`numeric`,minute:`2-digit`,meridiem:`short`}),xi=class extends Me{render(){let{props:e,context:t}=this,{options:n}=t,{seg:r,timeHeaderId:i,eventHeaderId:a,dateHeaderId:o}=e,s=n.eventTimeFormat||bi;return I(k,Object.assign({},e,{elTag:`tr`,elClasses:[`fc-list-event`,r.eventRange.def.url&&`fc-event-forced-url`],defaultGenerator:()=>Si(r,t),seg:r,timeText:``,disableDragging:!0,disableResizing:!0}),(e,n)=>I(ge,null,Ci(r,s,t,i,o),I(`td`,{"aria-hidden":!0,className:`fc-list-event-graphic`},I(`span`,{className:`fc-list-event-dot`,style:{borderColor:n.borderColor||n.backgroundColor}})),I(e,{elTag:`td`,elClasses:[`fc-list-event-title`],elAttrs:{headers:`${a} ${o}`}})))}};function Si(e,t){let n=N(e,t);return I(`a`,Object.assign({},n),e.eventRange.def.title)}function Ci(e,t,n,r,i){let{options:a}=n;if(a.displayEventTime!==!1){let o=e.eventRange.def,s=e.eventRange.instance,c=!1,l;if(o.allDay?c=!0:ce(e.eventRange.range)?e.isStart?l=R(e,t,n,null,null,s.range.start,e.end):e.isEnd?l=R(e,t,n,null,null,e.start,s.range.end):c=!0:l=R(e,t,n),c){let e={text:n.options.allDayText,view:n.viewApi};return I(je,{elTag:`td`,elClasses:[`fc-list-event-time`],elAttrs:{headers:`${r} ${i}`},renderProps:e,generatorName:`allDayContent`,customGenerator:a.allDayContent,defaultGenerator:wi,classNameGenerator:a.allDayClassNames,didMount:a.allDayDidMount,willUnmount:a.allDayWillUnmount})}return I(`td`,{className:`fc-list-event-time`},l)}return null}function wi(e){return e.text}var Ti=class extends oe{constructor(){super(...arguments),this.computeDateVars=O(Di),this.eventStoreToSegs=O(this._eventStoreToSegs),this.state={timeHeaderId:P(),eventHeaderId:P(),dateHeaderIdRoot:P()},this.setRootEl=e=>{e?this.context.registerInteractiveComponent(this,{el:e}):this.context.unregisterInteractiveComponent(this)}}render(){let{props:e,context:t}=this,{dayDates:n,dayRanges:r}=this.computeDateVars(e.dateProfile),i=this.eventStoreToSegs(e.eventStore,e.eventUiBases,r);return I(re,{elRef:this.setRootEl,elClasses:[`fc-list`,t.theme.getClass(`table`),t.options.stickyHeaderDates===!1?``:`fc-list-sticky`],viewSpec:t.viewSpec},I(B,{liquid:!e.isHeightAuto,overflowX:e.isHeightAuto?`visible`:`hidden`,overflowY:e.isHeightAuto?`visible`:`auto`},i.length>0?this.renderSegList(i,n):this.renderEmptyMessage()))}renderEmptyMessage(){let{options:e,viewApi:t}=this.context;return I(je,{elTag:`div`,elClasses:[`fc-list-empty`],renderProps:{text:e.noEventsText,view:t},generatorName:`noEventsContent`,customGenerator:e.noEventsContent,defaultGenerator:Ei,classNameGenerator:e.noEventsClassNames,didMount:e.noEventsDidMount,willUnmount:e.noEventsWillUnmount},e=>I(e,{elTag:`div`,elClasses:[`fc-list-empty-cushion`]}))}renderSegList(e,t){let{theme:n,options:r}=this.context,{timeHeaderId:i,eventHeaderId:a,dateHeaderIdRoot:o}=this.state,s=Oi(e);return I(j,{unit:`day`},(e,c)=>{let l=[];for(let n=0;n<s.length;n+=1){let u=s[n];if(u){let s=Ae(t[n]),d=o+`-`+s;l.push(I(vi,{key:s,cellId:d,dayDate:t[n],todayRange:c})),u=Oe(u,r.eventOrder);for(let t of u)l.push(I(xi,Object.assign({key:s+`:`+t.eventRange.instance.instanceId,seg:t,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,timeHeaderId:i,eventHeaderId:a,dateHeaderId:d},ne(t,c,e))))}}return I(`table`,{className:`fc-list-table `+n.getClass(`table`)},I(`thead`,null,I(`tr`,null,I(`th`,{scope:`col`,id:i},r.timeHint),I(`th`,{scope:`col`,"aria-hidden":!0}),I(`th`,{scope:`col`,id:a},r.eventHint))),I(`tbody`,null,l))})}_eventStoreToSegs(e,t,n){return this.eventRangesToSegs(ye(e,t,this.props.dateProfile.activeRange,this.context.options.nextDayThreshold).fg,n)}eventRangesToSegs(e,t){let n=[];for(let r of e)n.push(...this.eventRangeToSegs(r,t));return n}eventRangeToSegs(e,t){let{dateEnv:n}=this.context,{nextDayThreshold:r}=this.context.options,i=e.range,a=e.def.allDay,o,s,c,l=[];for(o=0;o<t.length;o+=1)if(s=ie(i,t[o]),s&&(c={component:this,eventRange:e,start:s.start,end:s.end,isStart:e.isStart&&s.start.valueOf()===i.start.valueOf(),isEnd:e.isEnd&&s.end.valueOf()===i.end.valueOf(),dayIndex:o},l.push(c),!c.isEnd&&!a&&o+1<t.length&&i.end<n.add(t[o+1].start,r))){c.end=i.end,c.isEnd=!0;break}return l}};function Ei(e){return e.text}function Di(e){let t=pe(e.renderRange.start),n=e.renderRange.end,r=[],i=[];for(;t<n;)r.push(t),i.push({start:t,end:F(t,1)}),t=F(t,1);return{dayDates:r,dayRanges:i}}function Oi(e){let t=[],n,r;for(n=0;n<e.length;n+=1)r=e[n],(t[r.dayIndex]||(t[r.dayIndex]=[])).push(r);return t}se(`:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid var(--fc-border-color)}.fc .fc-list-empty{align-items:center;background-color:var(--fc-neutral-bg-color);display:flex;height:100%;justify-content:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{border-style:hidden;width:100%}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{background:var(--fc-page-bg-color);position:sticky;top:0}.fc .fc-list-table thead{left:-10000px;position:absolute}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{clear:both;content:"";display:table}.fc-theme-standard .fc-list-day-cushion{background-color:var(--fc-neutral-bg-color)}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:var(--fc-list-event-hover-bg-color)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{border:calc(var(--fc-list-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-list-event-dot-width)/2);box-sizing:content-box;display:inline-block;height:0;width:0}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}`);var ki={listDayFormat:Ai,listDaySideFormat:Ai,noEventsClassNames:M,noEventsContent:M,noEventsDidMount:M,noEventsWillUnmount:M};function Ai(e){return e===!1?null:L(e)}var ji=le({name:`@fullcalendar/list`,optionRefiners:ki,views:{list:{component:Ti,buttonTextKey:`list`,listDayFormat:{month:`long`,day:`numeric`,year:`numeric`}},listDay:{type:`list`,duration:{days:1},listDayFormat:{weekday:`long`}},listWeek:{type:`list`,duration:{weeks:1},listDayFormat:{weekday:`long`},listDaySideFormat:{month:`long`,day:`numeric`,year:`numeric`}},listMonth:{type:`list`,duration:{month:1},listDaySideFormat:{weekday:`long`}},listYear:{type:`list`,duration:{year:1},listDaySideFormat:{weekday:`long`}}}});r(((e,t)=>{var n=NaN,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt,c=typeof global==`object`&&global&&global.Object===Object&&global,l=typeof self==`object`&&self&&self.Object===Object&&self,u=c||l||Function(`return this`)(),d=Object.prototype.toString,f=Math.max,p=Math.min,m=function(){return u.Date.now()};function h(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,h=!0;if(typeof e!=`function`)throw TypeError(`Expected a function`);t=y(t)||0,g(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?f(y(n.maxWait)||0,t):a,h=`trailing`in n?!!n.trailing:h);function _(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function v(e){return l=e,s=setTimeout(S,t),u?_(e):o}function b(e){var n=e-c,r=e-l,i=t-n;return d?p(i,a-r):i}function x(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function S(){var e=m();if(x(e))return C(e);s=setTimeout(S,b(e))}function C(e){return s=void 0,h&&r?_(e):(r=i=void 0,o)}function w(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function T(){return s===void 0?o:C(m())}function E(){var e=m(),n=x(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return v(c);if(d)return s=setTimeout(S,t),_(c)}return s===void 0&&(s=setTimeout(S,t)),o}return E.cancel=w,E.flush=T,E}function g(e){var t=typeof e;return!!e&&(t==`object`||t==`function`)}function _(e){return!!e&&typeof e==`object`}function v(e){return typeof e==`symbol`||_(e)&&d.call(e)==`[object Symbol]`}function y(e){if(typeof e==`number`)return e;if(v(e))return n;if(g(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=g(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=e.replace(r,``);var c=a.test(e);return c||o.test(e)?s(e.slice(2),c?2:8):i.test(e)?n:+e}t.exports=h}))();var Mi=typeof window<`u`?U.useLayoutEffect:U.useEffect;function Ni(e,t,n,r){let i=(0,U.useRef)(t);Mi(()=>{i.current=t},[t]),(0,U.useEffect)(()=>{let t=n?.current??window;if(!(t&&t.addEventListener))return;let a=e=>{i.current(e)};return t.addEventListener(e,a,r),()=>{t.removeEventListener(e,a,r)}},[e,n,r])}function Pi(e){let t=(0,U.useRef)(()=>{throw Error(`Cannot call an event handler while rendering.`)});return Mi(()=>{t.current=e},[e]),(0,U.useCallback)((...e)=>t.current?.call(t,...e),[t])}var Fi=typeof window>`u`;function Ii(e,t,n={}){let{initializeWithValue:r=!0}=n,i=(0,U.useCallback)(e=>n.serializer?n.serializer(e):JSON.stringify(e),[n]),a=(0,U.useCallback)(e=>{if(n.deserializer)return n.deserializer(e);if(e===`undefined`)return;let r=t instanceof Function?t():t,i;try{i=JSON.parse(e)}catch(e){return console.error(`Error parsing JSON:`,e),r}return i},[n,t]),o=(0,U.useCallback)(()=>{let n=t instanceof Function?t():t;if(Fi)return n;try{let t=window.localStorage.getItem(e);return t?a(t):n}catch(t){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,t),n}},[t,e,a]),[s,c]=(0,U.useState)(()=>r?o():t instanceof Function?t():t),l=Pi(t=>{Fi&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{let n=t instanceof Function?t(o()):t;window.localStorage.setItem(e,i(n)),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))}catch(t){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,t)}}),u=Pi(()=>{Fi&&console.warn(`Tried removing localStorage key \u201C${e}\u201D even though environment is not a client`);let n=t instanceof Function?t():t;window.localStorage.removeItem(e),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))});(0,U.useEffect)(()=>{c(o())},[e]);let d=(0,U.useCallback)(t=>{t.key&&t.key!==e||c(o())},[e,o]);return Ni(`storage`,d),Ni(`local-storage`,d),[s,l,u]}var Li={week:{duration:{weeks:1},dateAlignment:`week`,dateIncrement:{weeks:1}},month:{duration:{months:1},dateAlignment:`month`,dateIncrement:{months:1}},threeMonths:{duration:{months:3},dateAlignment:`month`,dateIncrement:{months:3}},year:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1}}},Ri=e=>Li[e],zi=()=>{let[e,t]=Ii(`solspace-calendar-agenda-range`,`month`);return{range:Object.hasOwn(Li,e)?e:`month`,setRange:t}},Bi=({range:e,onChange:t,disabled:n})=>{let r=(0,U.useId)();return(0,Z.jsxs)(`div`,{className:`calendar-agenda-range`,children:[(0,Z.jsx)(`label`,{htmlFor:r,children:Craft.t(`calendar`,`Range`)}),(0,Z.jsx)(`div`,{className:`select`,children:(0,Z.jsxs)(`select`,{id:r,"aria-label":Craft.t(`calendar`,`Agenda range`),value:e,disabled:n,onChange:e=>t(e.target.value),children:[(0,Z.jsx)(`option`,{value:`week`,children:Craft.t(`calendar`,`Week`)}),(0,Z.jsx)(`option`,{value:`month`,children:Craft.t(`calendar`,`Month`)}),(0,Z.jsx)(`option`,{value:`threeMonths`,children:Craft.t(`calendar`,`3 months`)}),(0,Z.jsx)(`option`,{value:`year`,children:Craft.t(`calendar`,`Year`)})]})})]})},Vi=1440*60,Hi=`draft-create-event`,Ui=`New Event`,Wi=e=>Math.floor(e.getTime()/1e3),Q=e=>{let t=new Date(e*1e3);return Math.floor(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())/1e3)},Gi=(e,t)=>e+t*Vi,Ki=e=>Math.max(1,e.eventDuration)*60,qi=(e,t)=>e.preserveDuration?Math.max(60,e.end-e.start):Ki(t),Ji=e=>Math.max(1,Math.round((e.end-e.start)/Vi)),Yi=e=>!!(e&&typeof e==`object`&&`closest`in e&&e.closest),Xi=(e,t)=>{let n=Wi(e.start),r=Wi(e.end),i=e.allDay?r-n>Vi:Q(r-1)>Q(n),a=e.allDay?i:t.allDayDefault,o=i||!a&&!e.allDay&&r>n,s=a?Q(n):e.allDay?Q(n)+new Date().getHours()*60*60:n,l=a?Gi(i?Q(r-1):s,1):o?r:s+Ki(t);return{id:Hi,title:c(Ui),allDay:a,start:s,end:l,preserveDuration:o}},Zi=e=>({id:e.id,title:e.title,start:new Date(e.start*1e3),end:new Date(e.end*1e3),allDay:e.allDay,editable:!1,startEditable:!1,durationEditable:!1,extendedProps:{isDraftCreate:!0}}),Qi=e=>e.allDay?Gi(e.end,-1):e.end,$i=(e,t)=>({...e,title:t}),ea=(e,t,n)=>{if(e.allDay===t)return e;if(t){let t=Q(e.start),n=Gi(Q(e.end-1),1);return{...e,allDay:!0,start:t,end:Math.max(n,Gi(t,1))}}return{...e,allDay:!1,end:e.start+(e.preserveDuration?(Ji(e)-1)*Vi:0)+Ki(n)}},ta=(e,t,n)=>{if(e.allDay){let n=Q(t);return{...e,start:n,end:Gi(n,Ji(e))}}return{...e,start:t,end:t+qi(e,n)}},na=(e,t,n)=>{if(e.allDay){let n=Gi(Q(t),1);return{...e,end:Math.max(n,Gi(Q(e.start),1))}}return{...e,end:Math.max(t,e.start+(e.preserveDuration?60:Ki(n)))}},ra=(e,t)=>{e.setProp(`title`,t.title),e.setAllDay(t.allDay,{maintainDuration:!1}),e.setDates(new Date(t.start*1e3),new Date(t.end*1e3),{allDay:t.allDay})},ia=e=>!!(e?.extendedProps&&`isDraftCreate`in e.extendedProps&&e.extendedProps.isDraftCreate),aa=(e,t)=>Yi(e)&&!!e.closest(t),oa=`solspace-calendar-hidden-calendars`,sa={day:`timeGridDay`,week:`timeGridWeek`,month:`dayGridMonth`,year:`calendarYear`,agenda:`listMonth`},ca=()=>{let e=window.location.pathname.split(`/`).filter(Boolean).at(-1);return e&&sa[e]||null},la=e=>Object.entries(sa).find(([,t])=>t===e)?.[0]??`month`,ua=(e=`month`,t)=>{let n=(0,U.useMemo)(()=>{let e=Object.keys(sa),n=e.filter(e=>!t||t.includes(e));return(n.length?n:e).map(e=>sa[e])},[t]),r=(0,U.useCallback)(t=>n.includes(t)?t:n.includes(sa[e])?sa[e]:n.includes(`dayGridMonth`)?`dayGridMonth`:n[0],[e,n]),[i,a]=(0,U.useState)(()=>r(ca()||sa[e]||`dayGridMonth`)),[o,s]=(0,U.useState)(!1);return(0,U.useEffect)(()=>{s(!0)},[]),{view:i,setView:e=>{a(r(e)),s(!0)},isReady:o,enabledViews:n,resolveView:r}},da=()=>{let[e,t]=Ii(oa,[]);return{hiddenCalendarIds:e,toggleCalendarVisibility:e=>{t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}}},fa=(e,t)=>{let n=t??ca(),r=n?`/${la(n)}`:``,i=new URL(Craft.getCpUrl(`calendar/${v(e)}${r}`),window.location.origin);i.search=window.location.search,i.toString()!==window.location.href&&history.pushState(`data`,``,i.toString())},pa=`refresh prev,today,datepicker,next`,ma=(e,{datePickerButton:t})=>({prev:{text:Craft.t(`calendar`,`Previous`),icon:`chevron-left`,click:()=>{e.prev(),fa(e.getDate())}},next:{text:Craft.t(`calendar`,`Next`),icon:`chevron-right`,click:()=>{e.next(),fa(e.getDate())}},refresh:{text:Craft.t(`calendar`,`Refresh`),icon:`refresh`,click:()=>{Ee(),e.refetchEvents()}},datepicker:t}),ha=(0,U.createContext)(null),ga=({config:e,children:t})=>{let n=(0,U.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,Z.jsx)(ha.Provider,{value:n,children:t})},$=()=>{let e=(0,U.useContext)(ha);if(!e)throw Error(`ConfigContext is not provided`);return e},_a=(e,t,n)=>{let{weekStartDay:r}=$(),i=(0,U.useRef)(null),[a,o]=(0,U.useState)(!1),[s,c]=(0,U.useState)(null),[l,u]=(0,U.useState)(null),d=(0,U.useCallback)(()=>{o(!1),c(null)},[]);(0,U.useEffect)(()=>{if(!a)return;let e=e=>{let t=e.target;i.current?.contains(t)||t.closest(`.fc-datepicker-button`)||d()},t=e=>{e.key===`Escape`&&d()};return window.addEventListener(`mousedown`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`mousedown`,e),window.removeEventListener(`keydown`,t)}},[d,a]);let f=(0,U.useCallback)(t=>{if(!t)return;let n=g(t);fa(n),e.gotoDate(n),u(t),d()},[d,e]),p=(0,U.useCallback)((t,n)=>{let{bottom:r,right:i}=n.getBoundingClientRect();u(_(e.getDate())),o(e=>!e),c({top:r+8,left:i})},[e]);return{dateSelector:a&&s?(0,Z.jsx)(va,{view:t,agendaRange:n,popoverRef:i,position:s,selectedDate:l,weekStartDay:r,onDateSelect:f}):null,datePickerButton:{text:Craft.t(`calendar`,`Pick a Date`),icon:`datepicker`,click:p}}},va=({view:e,agendaRange:t,popoverRef:n,position:r,selectedDate:i,weekStartDay:a,onDateSelect:o})=>{let s=e===`timeGridWeek`||e===`listMonth`&&t===`week`,c=e===`calendarYear`||e===`listMonth`&&t===`year`,l=e===`dayGridMonth`||e===`listMonth`&&!s&&!c;return(0,Z.jsx)(`div`,{ref:n,className:`fc-datepicker-popover`,style:{top:r.top,left:r.left},children:(0,Z.jsx)(Ve,{...u(),inline:!0,selected:i,onChange:o,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:a,showWeekPicker:s,showWeekNumbers:s,showMonthYearPicker:l,showYearPicker:c})})},ya=e=>e.view.type===`dayGridMonth`&&!e.event.allDay&&!e.event.extendedProps?.multiDay,ba=e=>{let t=e?.toLowerCase();return t===`black`||t===`white`?`fc-color-${t}`:null},xa=({event:e})=>{let t=[];e.allDay&&t.push(`fc-event-all-day`),e.end&&(!e.extendedProps?.multiDay&&!e.allDay?t.push(`fc-event-single-day`):t.push(`fc-event-multi-day`)),e.extendedProps?.enabled===!1&&t.push(`fc-event-disabled`),e.extendedProps?.cancelled&&t.push(`fc-event-cancelled`);let n=ba(e.textColor);return n&&t.push(n),t},Sa=(e,t)=>ia(e)?`ignore`:aa(t,`[data-calendar-event-title-link]`)?`navigate`:`open`,Ca=e=>{let{event:t,timeText:n}=e,r=e.view.type===`listMonth`,i=H(`fc-event-title`,ya(e)&&`fc-event-title-inline`),a=!ia(t)&&t.url,o=!!t.extendedProps?.cancelled,s=!o&&t.extendedProps?.isEdited?(0,Z.jsx)(`span`,{className:`fc-event-flag`,title:c(`This occurrence has its own changes.`),"aria-hidden":`true`,children:`✎`}):null,l=o&&!r?(0,Z.jsxs)(`span`,{className:`visually-hidden`,children:[`, `,c(`Cancelled`)]}):null,u=(0,Z.jsx)(b,{count:t.extendedProps.overlaps?.count}),d=r?(0,Z.jsxs)(`a`,{href:t.url||`#`,className:i,children:[u,s,t.title]}):a?(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>window.location.href=t.url,className:i,"data-calendar-event-title-link":!0,children:[u,s,t.title,l]}):(0,Z.jsxs)(`div`,{className:i,children:[u,s,t.title,l]});if(r){let{calendarName:e,location:n,description:r}=t.extendedProps;return(0,Z.jsxs)(`div`,{className:`calendar-agenda-event`,children:[(0,Z.jsxs)(`div`,{className:`calendar-agenda-header`,children:[(0,Z.jsxs)(`div`,{className:`calendar-agenda-title`,children:[d,o&&(0,Z.jsx)(`span`,{className:`calendar-agenda-cancelled`,children:c(`Cancelled`)})]}),e&&(0,Z.jsxs)(`span`,{className:`calendar-agenda-calendar`,children:[(0,Z.jsx)(`span`,{className:`calendar-agenda-calendar-dot`,style:{backgroundColor:t.extendedProps.calendarColor||t.backgroundColor},"aria-hidden":`true`}),e]})]}),n&&(0,Z.jsx)(`div`,{className:`calendar-agenda-meta`,children:(0,Z.jsx)(`span`,{className:`calendar-agenda-location`,children:n})}),r&&(0,Z.jsx)(`div`,{className:`calendar-agenda-description`,children:r})]})}return ya(e)?(0,Z.jsxs)(`div`,{className:`fc-event-main-frame fc-event-main-frame-inline`,children:[(0,Z.jsx)(`span`,{className:`fc-color-icon`,style:{backgroundColor:t.backgroundColor,borderColor:t.borderColor}}),(0,Z.jsx)(`div`,{className:`fc-event-title-container`,children:d}),n?(0,Z.jsx)(`div`,{className:`fc-event-time`,children:n}):null]}):(0,Z.jsx)(`div`,{className:`fc-event-main-frame`,children:(0,Z.jsx)(`div`,{className:`fc-event-title-container`,children:d})})},wa=`calendar:schedule-history-reset`,Ta=e=>{let[t,n]=(0,U.useState)([]),[r,i]=(0,U.useState)([]),[a,o]=(0,U.useState)(!1),s=(0,U.useRef)(!1),c=(0,U.useCallback)(()=>{n([]),i([])},[]);(0,U.useEffect)(()=>(window.addEventListener(wa,c),()=>window.removeEventListener(wa,c)),[c]);let l=(0,U.useCallback)(e=>{n(t=>[...t,e].slice(-50)),i([])},[]),u=(0,U.useCallback)(async e=>{if(s.current)return!1;s.current=!0,o(!0);try{return await e()}finally{s.current=!1,o(!1)}},[]);return{add:l,run:u,replay:(0,U.useCallback)(async a=>{let o=(a===`undo`?t:r).at(-1);o&&await u(async()=>await De(o,a)?(a===`undo`?(n(e=>e.slice(0,-1)),i(e=>[...e,o])):(i(e=>e.slice(0,-1)),n(e=>[...e,o])),e(),!0):!1)},[t,r,u,e]),clear:c,busy:a,canUndo:t.length>0,canRedo:r.length>0}},Ea=n.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--medium-border-radius, 4px);
  background: #c4cfe1;
`,Da=n.button`
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
`,Oa=({canUndo:e,canRedo:t,disabled:n,onReplay:r})=>((0,U.useEffect)(()=>{let i=i=>{if(n||i.defaultPrevented||i.altKey||!(i.metaKey||i.ctrlKey))return;let a=i.target;if(a instanceof HTMLElement&&a.closest(`input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=textbox]`)||document.querySelector(`.modal:not(.hidden), .cp-screen-slideout:not(.hidden)`))return;let o=i.key.toLowerCase(),s=o===`z`?i.shiftKey?`redo`:`undo`:o===`y`&&i.ctrlKey?`redo`:null;!s||!(s===`undo`?e:t)||(i.preventDefault(),r(s))};return document.addEventListener(`keydown`,i),()=>document.removeEventListener(`keydown`,i)},[e,t,n,r]),(0,Z.jsx)(Ea,{role:`group`,"aria-label":c(`Event history`),children:[`undo`,`redo`].map(i=>(0,Z.jsx)(Da,{type:`button`,disabled:n||!(i===`undo`?e:t),title:c(i===`undo`?`Undo`:`Redo`),"aria-label":c(i===`undo`?`Undo`:`Redo`),onClick:()=>r(i),children:(0,Z.jsx)(`svg`,{viewBox:`0 0 96 80`,width:`18`,height:`16`,"aria-hidden":`true`,focusable:`false`,children:(0,Z.jsx)(`g`,{transform:i===`redo`?`translate(96 0) scale(-1 1)`:void 0,children:(0,Z.jsx)(`path`,{fill:`currentColor`,d:`M37 1 1 30l36 29V41h18c15 0 23 8 23 22 0 6-2 11-5 16 12-8 19-19 19-31 0-20-14-31-37-31H37V1Z`})})})},i))})),ka=()=>s(new Date),Aa=()=>{let[e,t]=(0,U.useState)(ka);return(0,U.useEffect)(()=>{let e,n=()=>{clearTimeout(e),t(ka()),e=setTimeout(n,6e4-Date.now()%6e4+10)},r=()=>{document.hidden||n()};return n(),document.addEventListener(`visibilitychange`,r),()=>{clearTimeout(e),document.removeEventListener(`visibilitychange`,r)}},[]),e},ja=({el:e,event:t})=>{e.dataset.calendarEventId=t.id},Ma=e=>{let t=document.createElement(`div`);return t.className=`calendar-now-indicator`,t.setAttribute(`aria-label`,e),t},Na=(e,t,n,r,i,a)=>{(0,U.useEffect)(()=>{let o=e.current;if(!a||!o)return;let s,c=[],u=()=>{for(let e of c)e.remove();c.length=0},d=()=>m.observe(o,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`style`,`class`,`data-calendar-event-id`]}),f=()=>{m.disconnect(),u();let e=t(),a=l(n),s=t=>{let r=e?.getEventById(t.dataset.calendarEventId??``);return!r?.allDay&&r?.start&&r.start>n};if(e?.view.type===`dayGridMonth`){let e=o.querySelector(`.fc-daygrid-day[data-date="${a}"] .fc-daygrid-day-events`);if(e){let t=Array.from(e.querySelectorAll(`.fc-event`)).map(e=>({event:e,harness:e.closest(`.fc-daygrid-event-harness`)})).filter(({harness:e})=>e&&getComputedStyle(e).visibility!==`hidden`),n=t.find(({event:e})=>s(e)),i=e.getBoundingClientRect(),a=Math.max(0,...t.map(({harness:e})=>e.getBoundingClientRect().bottom-i.top)),o=e.querySelector(`.fc-daygrid-more-link`),l=n?.harness?.getBoundingClientRect().top??o?.getBoundingClientRect().top,u=Ma(r);u.classList.add(`calendar-now-month`),u.title=r,u.style.top=`${Math.max(4,l===void 0?a+5:l-i.top-2)}px`,e.append(u),c.push(u)}}else if(e?.view.type===`listMonth`&&n>=e.view.activeStart&&n<e.view.activeEnd){let e=o.querySelector(`.fc-list`);if(e){let t=e.querySelector(`.fc-list-table`);t||(t=document.createElement(`table`),t.className=`fc-list-table calendar-now-table`,t.append(document.createElement(`tbody`)),e.prepend(t),c.push(t));let n=t.tBodies[0],o=Array.from(n.querySelectorAll(`.fc-list-day`)),l=o.find(e=>e.dataset.date===a),u=o.find(e=>(e.dataset.date??``)>a)??null;if(!l){l=document.createElement(`tr`),l.className=`fc-list-day fc-day-today calendar-now-day`;let e=document.createElement(`th`);e.colSpan=3,e.scope=`colgroup`;let t=document.createElement(`div`);t.className=`fc-list-day-cushion`,t.textContent=i;let r=document.createElement(`span`);r.className=`calendar-agenda-today`,r.textContent=Craft.t(`calendar`,`Today`),t.append(r),e.append(t),l.append(e),n.insertBefore(l,u),c.push(l)}let d=l.nextElementSibling;for(;d&&!d.classList.contains(`fc-list-day`)&&!s(d);)d=d.nextElementSibling;let f=document.createElement(`tr`);f.className=`calendar-now-agenda-row`;let p=document.createElement(`td`);p.colSpan=3;let m=Ma(r),h=document.createElement(`span`);h.textContent=r,m.append(h),p.append(m),f.append(p),n.insertBefore(f,d),c.push(f)}}d()},p=()=>{clearTimeout(s),s=setTimeout(f,0)},m=new MutationObserver(p),h=typeof ResizeObserver>`u`?null:new ResizeObserver(p);return h?.observe(o),f(),window.addEventListener(`resize`,p),()=>{clearTimeout(s),m.disconnect(),h?.disconnect(),window.removeEventListener(`resize`,p),u()}},[e,t,n,r,i,a])},Pa=()=>new URL(window.location.href).searchParams.get(`search`)?.trim()??``,Fa=({initialSearch:e,onSearchChange:t})=>{let[n,r]=(0,U.useState)(e),i=(0,U.useId)(),a=(0,U.useRef)(null);(0,U.useEffect)(()=>{let e=setTimeout(()=>t(n.trim()),250);return()=>clearTimeout(e)},[n,t]);let o=()=>{r(``),t(``),a.current?.focus()};return(0,Z.jsx)(We,{children:(0,Z.jsxs)(`div`,{className:`calendar-search-toolbar`,children:[(0,Z.jsxs)(`div`,{className:`calendar-search-input`,children:[(0,Z.jsx)(`span`,{className:`calendar-search-icon`,"data-icon":`search`,"aria-hidden":`true`}),(0,Z.jsx)(`input`,{type:`search`,ref:a,className:`text fullwidth`,"aria-label":c(`Search events`),"aria-describedby":i,placeholder:Craft.t(`app`,`Search`),value:n,onChange:e=>r(e.target.value),onKeyDown:e=>{e.key===`Escape`&&n&&(e.stopPropagation(),o())}}),n&&(0,Z.jsx)(`button`,{type:`button`,className:`calendar-search-clear`,"aria-label":c(`Clear search`),"data-icon":`remove`,onClick:o})]}),(0,Z.jsx)(`span`,{id:i,className:`visually-hidden`,children:c(`Searches events in the displayed date range.`)})]})})},Ia=n.div`
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
`,La=n.div`
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
`,Ra=(e,t,n)=>new Date(Date.UTC(e,t,n)),za=e=>{let t=new Map;for(let n of e){let e=n.range.start,r=Ra(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());for(;r<n.range.end;){let e=l(r),i=t.get(e)??[];i.push(n),t.set(e,i),r.setUTCDate(r.getUTCDate()+1)}}for(let e of t.values())e.sort((e,t)=>Number(t.def.allDay)-Number(e.def.allDay)||(e.instance?.range.start.getTime()??0)-(t.instance?.range.start.getTime()??0)||e.def.title.localeCompare(t.def.title));return t},Ba=e=>e.def.extendedProps.calendarColor||e.ui.backgroundColor||`#607d9f`,Va=e=>{let t=new Map;for(let n of e){let e=!!n.def.extendedProps.cancelled,r=Ba(n),i=e?`cancelled`:String(n.def.extendedProps.calendar??r);t.set(i,{color:r,cancelled:e})}return Array.from(t.entries())},Ha=({date:e,events:t,anchor:n,onEventSelect:r})=>{let{hidePopover:i}=hi(),{language:a,formats:o}=$(),s=(0,U.useRef)(null),u=new Intl.DateTimeFormat(a,{month:`short`,day:`numeric`,year:`numeric`,timeZone:`UTC`}),d=new Intl.DateTimeFormat(a,{...o.time.short.js,timeZone:`UTC`});(0,U.useEffect)(()=>{let e=e=>{e.key===`Escape`&&i()},t=e=>{let t=e.target;!n.contains(t)&&!s.current?.contains(t)&&i()};return document.addEventListener(`keydown`,e),document.addEventListener(`pointerdown`,t),()=>{document.removeEventListener(`keydown`,e),document.removeEventListener(`pointerdown`,t)}},[n,i]);let f=e=>{if(!e.instance)return``;let{start:t,end:n}=e.instance.range;if(e.def.allDay){let e=new Date(n.getTime()-1);return l(t)===l(e)?c(`All Day`):`${c(`All Day`)} · ${u.format(t)} – ${u.format(e)}`}let r=l(t)===l(n),i=d.format(t),a=d.format(n);return r?`${i} – ${a}`:`${u.format(t)} ${i} – ${u.format(n)} ${a}`};return(0,Z.jsxs)(La,{ref:s,"data-calendar-year-preview":!0,children:[(0,Z.jsx)(`h3`,{children:e.toLocaleDateString(a,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`,timeZone:`UTC`})}),(0,Z.jsx)(`ul`,{children:t.map(e=>(0,Z.jsx)(`li`,{children:(0,Z.jsxs)(`button`,{type:`button`,className:H({"is-cancelled":e.def.extendedProps.cancelled}),onClick:t=>r(e.def.publicId,n,t),children:[(0,Z.jsx)(`span`,{className:`year-preview-dot`,style:{backgroundColor:Ba(e)}}),(0,Z.jsxs)(`span`,{className:`year-preview-details`,children:[(0,Z.jsxs)(`span`,{className:`year-preview-title`,children:[(0,Z.jsxs)(`strong`,{children:[(0,Z.jsx)(b,{count:e.def.extendedProps.overlaps?.count}),e.def.title]}),e.def.extendedProps.cancelled&&(0,Z.jsx)(`span`,{className:`year-preview-cancelled`,children:c(`Cancelled`)})]}),(0,Z.jsx)(`span`,{className:`year-preview-time`,children:f(e)}),e.def.extendedProps.calendarName&&(0,Z.jsx)(`span`,{className:`year-preview-calendar`,children:e.def.extendedProps.calendarName})]})]})},e.instance?.instanceId??e.def.defId))})]})},Ua=({content:e,disabled:t,loading:n,error:r,search:i,onDateSelect:a,onMonthSelect:o,onEventSelect:s})=>{let{language:u,weekStartDay:d}=$(),{showPopover:f,hidePopover:p}=hi(),m=(0,U.useRef)(void 0),h=e.dateProfile.currentRange.start.getUTCFullYear(),g=(0,U.useMemo)(()=>za(ke(e,!0)),[e]),_=(0,U.useMemo)(()=>new Intl.DateTimeFormat(u,{month:`long`,timeZone:`UTC`}),[u]),v=(0,U.useMemo)(()=>new Intl.DateTimeFormat(u,{weekday:`narrow`,timeZone:`UTC`}),[u]),y=Array.from({length:7},(e,t)=>Ra(2023,0,1+d+t)),b=l(new Date);(0,U.useEffect)(()=>()=>{clearTimeout(m.current),p()},[p]),(0,U.useEffect)(()=>{clearTimeout(m.current),p()},[p,e.eventStore,h,t,n]);let x=(e,r,i)=>{t||n||!r.length||f((0,Z.jsx)(Ha,{date:e,events:r,anchor:i,onEventSelect:s}),i,{position:[`bottom`,`top`,`right`,`left`],closeDelayMs:300})};return(0,Z.jsxs)(Ia,{children:[(0,Z.jsx)(`div`,{className:`calendar-year-grid`,children:Array.from({length:12},(e,n)=>{let r=Ra(h,n,1),i=_.format(r),s=(r.getUTCDay()-d+7)%7,f=Ra(h,n+1,0).getUTCDate();return(0,Z.jsxs)(`section`,{className:`calendar-year-month`,"aria-label":i,children:[(0,Z.jsx)(`h3`,{children:(0,Z.jsx)(`button`,{type:`button`,disabled:t,onClick:()=>o(r),children:i})}),(0,Z.jsx)(`div`,{className:`calendar-year-weekdays`,"aria-hidden":`true`,children:y.map(e=>(0,Z.jsx)(`span`,{children:v.format(e)},e.getUTCDay()))}),(0,Z.jsx)(`div`,{className:`calendar-year-days`,children:Array.from({length:42},(e,r)=>{let i=r-s+1;if(i<1||i>f)return(0,Z.jsx)(`span`,{},r);let o=Ra(h,n,i),d=l(o),_=g.get(d)??[],v=Va(_),y=o.toLocaleDateString(u,{dateStyle:`full`,timeZone:`UTC`}),S=c(_.length===1?`{count} event`:`{count} events`,{count:_.length}),C=_.filter(e=>e.def.extendedProps.cancelled).length;return(0,Z.jsxs)(`button`,{type:`button`,className:H(`calendar-year-day`,{"is-today":d===b,"has-events":_.length>0}),"data-date":d,"aria-label":`${y}, ${S}${C?`, ${c(`Cancelled`)}: ${C}`:``}`,"aria-current":d===b?`date`:void 0,disabled:t,onClick:()=>{clearTimeout(m.current),a(o)},onMouseEnter:e=>{let t=e.currentTarget;clearTimeout(m.current),m.current=setTimeout(()=>x(o,_,t),300)},onMouseLeave:()=>clearTimeout(m.current),onFocus:e=>{clearTimeout(m.current),x(o,_,e.currentTarget)},onBlur:e=>{(!(e.relatedTarget instanceof HTMLElement)||!e.relatedTarget.closest(`[data-calendar-year-preview]`))&&p()},children:[(0,Z.jsx)(`span`,{className:`calendar-year-day-number`,children:i}),(0,Z.jsxs)(`span`,{className:`calendar-year-markers`,"aria-hidden":`true`,children:[v.slice(0,3).map(([e,t])=>(0,Z.jsx)(`span`,{className:H(`calendar-year-dot`,{"is-cancelled":t.cancelled}),style:{backgroundColor:t.color}},e)),v.length>3&&(0,Z.jsx)(`span`,{className:`calendar-year-more`,children:`+`})]})]},r)})})]},n)})}),(0,Z.jsxs)(`div`,{className:`calendar-year-footer`,children:[(0,Z.jsx)(`span`,{role:`status`,children:c(r?`Couldn’t load events. Use Refresh to try again.`:n?`Loading events…`:g.size?`Hover a date to preview its events.`:i?`No matching events in this date range.`:`No events in this date range.`)}),(0,Z.jsxs)(`span`,{className:`calendar-year-legend`,children:[(0,Z.jsx)(`span`,{className:`calendar-year-dot is-cancelled`,"aria-hidden":`true`}),c(`Cancelled`)]})]})]})},Wa=({options:e,value:t,onChange:n})=>{let r=(0,U.useId)(),i=(0,U.useRef)(null),a=(0,U.useRef)(null),o=(0,U.useRef)(n),s=JSON.stringify(e),l=e.find(e=>e.value===t);return(0,U.useEffect)(()=>{o.current=n},[n]),(0,U.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu`,t.style.minWidth=`${e.getBoundingClientRect().width}px`,t.setAttribute(`aria-label`,c(`Calendar`)),a.current=t;let n=document.createElement(`ul`);t.append(n),JSON.parse(s).forEach(e=>{let t=document.createElement(`li`),r=document.createElement(`a`);r.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),r.append(i,document.createTextNode(e.label)),t.append(r),n.append(t)}),e.after(t);let r=new Garnish.MenuBtn(e,{onOptionSelect:t=>{r.hideMenu(),o.current(Number(t.dataset.calendarId)),e.focus()}}),l=t=>{t.key===`Escape`&&r.showingMenu&&(t.preventDefault(),t.stopPropagation(),r.hideMenu(),e.focus())};return document.addEventListener(`keydown`,l,!0),()=>{document.removeEventListener(`keydown`,l,!0),r.hideMenu(),r.destroy(),t.remove(),a.current=null}},[s]),(0,U.useEffect)(()=>{a.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let n=Number(e.dataset.calendarId)===t;e.classList.toggle(`sel`,n),e.setAttribute(`aria-selected`,String(n))})},[t,s]),(0,Z.jsx)(Re,{label:c(`Calendar`),id:r,required:!0,children:(0,Z.jsxs)(Ga,{ref:i,id:r,type:`button`,className:`btn menubtn fullwidth`,"aria-required":`true`,children:[(0,Z.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:l?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,Z.jsx)(`span`,{className:`calendar-name`,children:l?.label})]})})},Ga=n.button`
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
`,Ka=e=>Math.floor(e/86400)*86400,qa=e=>Math.max(Ka(e.start),Ka(e.recurrence?.until??e.start))+(e.allDay?0:e.start-Ka(e.start)),Ja=e=>{let t=e.recurrence;if(!t||t.type===`NEVER`||!Ya(e))return;let n=t.type===`WEEKDAYS`,r=t.type===`WEEKDAYS`?`CUSTOM`:t.type,i={DAILY:D.DAILY,WEEKDAYS:D.WEEKLY,WEEKLY:D.WEEKLY,MONTHLY:D.MONTHLY,YEARLY:D.YEARLY}[t.type],a=t.endType===`ON_DATE`?qa(e):void 0,o=t.endType===`AFTER`?t.count:void 0,s=new Date(e.start*1e3),c=new E({dtstart:s,freq:i,interval:1,...n&&{byweekday:[E.MO,E.TU,E.WE,E.TH,E.FR]},...t.type===`WEEKLY`&&{byweekday:[(s.getUTCDay()+6)%7]},...t.type===`MONTHLY`&&{bymonthday:s.getUTCDate()},...t.type===`YEARLY`&&{bymonth:s.getUTCMonth()+1,bymonthday:s.getUTCDate()},count:o,until:a===void 0?void 0:new Date(a*1e3)});return{repeatType:r,repeatEndType:t.endType,rrule:w(c.toString(),e.allDay),...a!==void 0&&{until:a}}},Ya=e=>!e.recurrence||e.recurrence.type===`NEVER`||e.recurrence.endType!==`AFTER`||Number.isSafeInteger(e.recurrence.count)&&(e.recurrence.count??0)>=1,Xa=(e,t,n,r)=>({title:e.title||c(`New Event`),start:e.start,end:e.end,allDay:e.allDay,calendarId:t,siteId:n,...Ja(e),...r&&{details:r}}),Za=({refetchEvents:e,onSuccess:t})=>{let{hidePopover:n}=hi(),{currentSiteId:r}=$(),[i,a]=(0,U.useState)(null),[o,s]=(0,U.useState)(null),l=(0,U.useCallback)(async(i,o,l,u)=>{a(u?`prepare`:`create`),s(null);try{let a=Xa(i,o,r,l);u&&(a.title=i.title);let s=await Ce(oi(u?`/api/events/prepare`:`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)});if(!s.ok){let e=null;try{e=await s.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}let d=await s.json();if(u){if(typeof d?.url!=`string`||!d.url)throw Error(c(`Couldn’t create event.`));return d.url}return Ee(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),e?.(),t?.(),n(),null}catch(e){return e instanceof Error?s(e.message):s(`Failed to create event`),null}finally{a(null)}},[n,t,e,r]);return{createEvent:(e,t,n)=>l(e,t,n,!1),prepareEvent:(e,t,n)=>l(e,t,n,!0),error:o,isFetching:i!==null,isOpeningEditor:i===`prepare`}},Qa=n.div`
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
`,$a=n.div`
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  padding: 15px;
`,eo=n(He)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,to=n.div`
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
`,no=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ro=n.div`
  display: grid;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  background: var(--gray-50);
`,io=n.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px;

  > .field { flex: 1 1 140px; min-width: 0; }
  input { width: 100%; }
`,ao=n.p`
  && { margin: 0; }
  font-size: 12px;
  line-height: 1.5;
  color: var(--light-text-color);
`,oo=n.label`
  font-weight: 600;
  cursor: pointer;
`,so=n(He)`
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  border-top: 1px solid var(--gray-200);
  padding: 12px 15px;

  @media (max-height: 600px) {
    padding-block: 10px;
  }
`,co=n.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  .btn + .btn {
    margin-inline-start: 0;
  }
`,lo=n.button`
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
`,uo=({draft:e,onChange:n,formats:r,weekStartDay:i,disabled:a})=>{let o=(0,U.useId)(),s=e.recurrence??{type:`NEVER`,endType:`NEVER`},l=t(e.start),u=r.date.short.icu??`P`,d=m(),f=Ja(e),h=f?T(ee(f.rrule,e.start),u):null,g=[{value:`NEVER`,label:c(`Does not repeat`)},{value:`DAILY`,label:c(`Every Day`)},{value:`WEEKDAYS`,label:c(`Weekdays (Monday–Friday)`)},{value:`WEEKLY`,label:c(`Weekly on {weekday}`,{weekday:ze(l,`EEEE`,{locale:d})})},{value:`MONTHLY`,label:c(`Monthly on day {day}`,{day:l.getDate()})},{value:`YEARLY`,label:c(`Yearly on {date}`,{date:new Intl.DateTimeFormat(p(),{month:`long`,day:`numeric`}).format(l)})}];return(0,Z.jsxs)(ro,{children:[(0,Z.jsx)(Re,{label:`Repeat`,id:`${o}-repeat`,children:(0,Z.jsx)(`div`,{className:`select fullwidth`,children:(0,Z.jsx)(`select`,{id:`${o}-repeat`,className:`fullwidth`,value:s.type,disabled:a,onChange:t=>n({...e,recurrence:{...s,type:t.target.value}}),children:g.map(({value:e,label:t})=>(0,Z.jsx)(`option`,{value:e,children:t},e))})})}),s.type!==`NEVER`&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(io,{children:[(0,Z.jsx)(Re,{label:`Repeat ends`,id:`${o}-ends`,children:(0,Z.jsx)(`div`,{className:`select fullwidth`,children:(0,Z.jsxs)(`select`,{id:`${o}-ends`,className:`fullwidth`,value:s.endType,disabled:a,onChange:t=>n({...e,recurrence:{...s,endType:t.target.value,count:s.count??10,until:s.until??y(Ue(l,1))}}),children:[(0,Z.jsx)(`option`,{value:`NEVER`,children:c(`Never`)}),(0,Z.jsx)(`option`,{value:`ON_DATE`,children:c(`On a date`)}),(0,Z.jsx)(`option`,{value:`AFTER`,children:c(`After...`)})]})})}),s.endType===`AFTER`&&(0,Z.jsx)(Re,{label:`Occurrences`,id:`${o}-count`,required:!0,children:(0,Z.jsx)(`input`,{id:`${o}-count`,className:`text fullwidth`,type:`number`,min:1,step:1,required:!0,disabled:a,value:s.count??``,onChange:t=>n({...e,recurrence:{...s,count:t.target.value===``?void 0:t.target.valueAsNumber}})})}),s.endType===`ON_DATE`&&(0,Z.jsx)(Be,{portal:!0,id:`${o}-until`,label:c(`Last date`),value:qa(e),required:!0,datePickerProps:{disabled:a,showIcon:!0,icon:(0,Z.jsx)(V,{}),toggleCalendarOnIconClick:!0,dateFormat:u,minDate:l,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:i},onChange:t=>{t!==null&&n({...e,recurrence:{...s,until:t}})}})]}),h&&(0,Z.jsx)(ao,{role:`status`,"aria-live":`polite`,children:h})]})]})},fo=({draft:e,onChange:n,refetchEvents:r,onConfirm:i,onCancel:a})=>{let{currentSiteId:o,showOverlapWarnings:s,calendars:l,calendarColors:u,calendarAllowRepeating:d,quickCreateFields:f,quickCreateRequiredFields:p,formats:m,weekStartDay:h,eventDuration:g,timeInterval:_}=$(),v=(0,U.useId)(),y=(0,U.useMemo)(()=>Object.entries(l).map(([e,t])=>({value:Number(e),label:t,color:u?.[Number(e)]})),[l,u]),[b,x]=(0,U.useState)(y[0]?.value??0),S=d?.[b]??!1,w=S||!e.recurrence?e:{...e,recurrence:void 0},T=Ya(w),E=Ja(w),[ee,te]=(0,U.useState)({}),D=f?.[b],O=D?.location,k=D?.description,A=p?.[b],j=ee[b]??{},ne=O||k?{...O&&{location:j[O]??``},...k&&{description:j[k]??``}}:void 0,re=(e,t)=>{te(n=>({...n,[b]:{...n[b],[e]:t}}))},{createEvent:M,prepareEvent:ie,error:ae,isFetching:N,isOpeningEditor:P}=Za({refetchEvents:r,onSuccess:i}),oe=(0,U.useMemo)(()=>e.allDay?m.date.short.icu:m.datetime.short.icu,[m,e.allDay]),se=(0,U.useMemo)(()=>Qi(e),[e]);return Ni(`keydown`,e=>{e.key===`Escape`&&!N&&a()}),(0,Z.jsxs)(Qa,{children:[(0,Z.jsxs)($a,{children:[(0,Z.jsx)(eo,{children:(0,Z.jsx)(qe,{label:c(`Title`),id:`${v}-title`,required:!0,autofocus:!0,value:e.title,placeholder:c(`Event Title`),onChange:t=>n($i(e,t))})}),(0,Z.jsxs)(to,{children:[(0,Z.jsx)(Wa,{value:b,options:y,onChange:t=>{x(t),!d?.[t]&&e.recurrence&&n({...e,recurrence:void 0})}}),(0,Z.jsx)(`hr`,{}),(0,Z.jsxs)(no,{children:[(0,Z.jsx)(Le,{enabled:e.allDay,onClick:t=>n(ea(e,t,{eventDuration:g}))}),(0,Z.jsx)(oo,{onClick:()=>n(ea(e,!e.allDay,{eventDuration:g})),children:c(`All Day`)})]}),(0,Z.jsx)(Be,{portal:!0,id:`${v}-start`,required:!0,label:c(`Starts`),value:e.start,datePickerProps:{showIcon:!0,icon:(0,Z.jsx)(V,{}),toggleCalendarOnIconClick:!0,dateFormat:oe,timeFormat:m.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:h,timeIntervals:_},onChange:t=>{t!==null&&n(ta(e,t,{eventDuration:g}))}}),(0,Z.jsx)(Be,{portal:!0,id:`${v}-end`,required:!0,label:c(`Ends`),value:se,datePickerProps:{showIcon:!0,icon:(0,Z.jsx)(V,{}),toggleCalendarOnIconClick:!0,minDate:t(e.start),dateFormat:oe,timeFormat:m.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:h,timeIntervals:_,filterTime:n=>{if(!e.start)return!0;let r=t(e.start),i=new Date(n);return r.getTime()<i.getTime()}},onChange:t=>{t!==null&&n(na(e,t,{eventDuration:g}))}}),S&&(0,Z.jsx)(uo,{draft:e,onChange:n,formats:m,weekStartDay:h,disabled:N}),(0,Z.jsx)(C,{formats:m,enabled:s&&!!b&&T,schedule:{start:e.start,end:e.allDay?e.end-1:e.end,allDay:e.allDay,calendarId:b,siteId:o,...E}}),(O||k)&&(0,Z.jsx)(`hr`,{}),O&&(0,Z.jsx)(Re,{label:c(`Location`),id:`${v}-location`,required:A?.location,children:(0,Z.jsx)(`input`,{id:`${v}-location`,type:`text`,className:`text fullwidth`,disabled:N,"aria-required":A?.location||void 0,value:j[O]??``,onChange:e=>re(O,e.target.value)})}),k&&(0,Z.jsx)(Re,{label:c(`Description`),id:`${v}-description`,required:A?.description,children:(0,Z.jsx)(`textarea`,{id:`${v}-description`,className:`text fullwidth`,rows:3,disabled:N,"aria-required":A?.description||void 0,value:j[k]??``,onChange:e=>re(k,e.target.value)})})]}),ae&&(0,Z.jsx)(`p`,{className:`error`,children:ae})]}),(0,Z.jsxs)(so,{$justifyContent:`flex-end`,$gap:8,children:[(0,Z.jsx)(lo,{type:`button`,disabled:!b||N||!T,onClick:async()=>{let e=await ie(w,b,ne);e&&(window.location.href=e)},children:c(P?`Processing...`:`More details…`)}),(0,Z.jsxs)(co,{children:[(0,Z.jsx)(`button`,{type:`button`,className:H(`btn`,N&&`disabled`),disabled:N,onClick:a,children:c(`Cancel`)}),(0,Z.jsx)(`button`,{type:`button`,className:H(`btn submit`,N&&`disabled`),disabled:!e.title||!b||N||!T,onClick:()=>M(w,b,ne),children:c(N&&!P?`Creating Event...`:`Create Event`)})]})]})]})},po=n.div`
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
`,mo=n.div`
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
`,ho=n.button`
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
`,go={move:`You are moving an event.`,resize:`You are changing an event’s length.`,delete:`You are deleting an event.`},_o={move:`Which occurrences do you want to move?`,resize:`Which occurrences do you want to change?`,delete:`Which occurrences do you want to delete?`},vo={occurrence:`Only this occurrence`,following:`This and following`,series:`All occurrences`},yo=({action:e,onSelect:t,onCancel:n})=>{let{hidePopover:r}=hi(),[i,a]=(0,U.useState)(null),o=(0,U.useRef)(!0),s=(0,U.useRef)(!1),l=i!==null;(0,U.useEffect)(()=>()=>{o.current=!1,s.current||n?.()},[]);let u=(0,U.useCallback)(()=>{l||r()},[r,l]);Ni(`keydown`,e=>{e.key===`Escape`&&u()});let d=async e=>{if(!l){s.current=!0,a(e);try{await t(e)&&r()}finally{o.current&&a(null)}}};return(0,Z.jsxs)(po,{children:[(0,Z.jsx)(`h3`,{children:c(go[e])}),(0,Z.jsx)(`p`,{children:c(_o[e])}),(0,Z.jsx)(`hr`,{}),(0,Z.jsxs)(He,{$direction:`column`,$alignItems:`center`,$gap:8,children:[[`occurrence`,`following`,`series`].map(e=>(0,Z.jsx)(`button`,{type:`button`,className:H(`btn small`,e===`occurrence`&&`submit`,l&&`disabled`),disabled:l,onClick:()=>d(e),children:c(i===e?`Processing...`:vo[e])},e)),(0,Z.jsx)(`button`,{type:`button`,className:H(`btn small`,l&&`disabled`),disabled:l,onClick:u,children:c(`Cancel`)})]})]})},bo=({actions:e,disabled:t})=>{let{eventActionIcons:n}=$(),{keepPopoverOpen:r}=hi(),i=(0,U.useRef)(null),a=(0,U.useRef)({actions:e,disabled:t}),o=JSON.stringify(e.map(({label:e,destructive:t,icon:r,color:i})=>({label:e,destructive:t,icon:r?n?.[r]:void 0,color:i})));return(0,U.useEffect)(()=>{a.current={actions:e,disabled:t}},[e,t]),(0,U.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu menu--disclosure calendar-event-action-menu`,t.setAttribute(`aria-label`,c(`More actions`));let n=document.createElement(`ul`);t.append(n),JSON.parse(o).forEach((e,r)=>{e.destructive&&r>0&&(t.append(document.createElement(`hr`)),n=document.createElement(`ul`),t.append(n));let i=document.createElement(`li`),a=document.createElement(`a`);if(a.className=`menu-item`,e.icon){let t=document.createElement(`span`);t.className=e.color?`icon ${e.color}`:`icon`,t.setAttribute(`aria-hidden`,`true`),t.innerHTML=e.icon,a.append(t)}let o=document.createElement(`span`);o.className=`menu-item-label`,o.textContent=e.label,a.append(o),a.dataset.action=String(r),e.destructive&&a.classList.add(`error`),i.append(a),n.append(i)}),e.after(t);let s=new Garnish.MenuBtn(e,{onOptionSelect:e=>{a.current.disabled||(s.hideMenu(),a.current.actions[Number(e.dataset.action)]?.onSelect())}});s.menu.on(`show`,r);let l=t=>{t.key===`Escape`&&s.showingMenu&&(t.preventDefault(),t.stopPropagation(),s.hideMenu(),e.focus())};return document.addEventListener(`keydown`,l,!0),()=>{document.removeEventListener(`keydown`,l,!0),s.hideMenu(),s.destroy(),t.remove()}},[o,r]),(0,Z.jsx)(`button`,{ref:i,type:`button`,className:`btn menubtn action-btn`,disabled:t,"aria-label":c(`More actions`),title:c(`More actions`)})},xo=({fcEvent:e})=>{let{hidePopover:t,showPopover:n}=hi(),{currentSiteId:r,formats:i}=$(),[a,o]=(0,U.useState)(!1),[s,l]=(0,U.useState)(!1),[u,d]=(0,U.useState)(!1),[f,p]=(0,U.useState)(!1),h=a||s||u||f;Ni(`keydown`,e=>{e.key===`Escape`&&t()});let g=e.event,{end:v,allDay:y}=g,b=g.extendedProps.calendarName,x=typeof g.extendedProps.location==`string`?g.extendedProps.location.trim():``,S=typeof g.extendedProps.description==`string`?g.extendedProps.description.trim():``,C=g.extendedProps.calendarColor??g.backgroundColor??g.borderColor??`#607d9f`,w=(0,U.useMemo)(()=>y?Ie(v,1):v,[y,v]),E=!!g.extendedProps.rrule,D=E?T(ee(g.extendedProps.rrule,g.start.getTime()/1e3)):null,O=we(String(g.id)),k=g.allDay?`PP`:`PPp`,A=g.extendedProps.enabled===!1,j=!!g.extendedProps.cancelled,ne=!!g.extendedProps.isEdited,re=!!g.extendedProps.hasOverride,M=()=>e.view.calendar.refetchEvents(),ie=()=>{O&&(t(),ve({eventId:Se(String(g.id)),recurrenceId:O,siteId:r,onSave:M}))},ae=async()=>{if(!O||h)return;d(!0);let e=await ue({event:g,recurrenceId:O,siteId:r});if(e){window.location.href=e;return}d(!1)},N=async()=>{if(!(!O||h)){l(!0);try{await me({event:g,recurrenceId:O,cancelled:!j,siteId:r,refetchEvents:M})&&t()}finally{l(!1)}}},P=async()=>{if(!a){o(!0);try{await z({event:g,scope:`series`,recurrenceId:O,siteId:r,refetchEvents:M})&&t()}finally{o(!1)}}},oe=()=>{n((0,Z.jsx)(yo,{action:`delete`,onSelect:async e=>e===`occurrence`&&re&&!window.confirm(c(`This occurrence has its own changes, which are deleted with it. Delete it?`))?!1:z({event:g,scope:e,recurrenceId:O,siteId:r,refetchEvents:M})}),e.el)},se=async()=>{if(h)return;p(!0);let e=await _e(g,r);if(e){window.location.href=e;return}p(!1)},F=[{label:c(f?`Duplicating...`:`Duplicate Event`),icon:`clone-dashed`,color:`fuchsia`,onSelect:()=>void se()}];return E&&O&&F.push({label:c(`Edit occurrence`),icon:`pencil`,onSelect:ie},{label:c(u?`Processing...`:`Edit this and following occurrences`),icon:`calendar-pen`,onSelect:()=>void ae()},{label:c(j?`Restore occurrence`:`Cancel occurrence`),icon:j?`rotate-left`:`ban`,onSelect:()=>void N()}),F.push({label:c(a?`Deleting...`:`Delete`),icon:`trash`,destructive:!0,onSelect:()=>{E?oe():window.confirm(c(`Are you sure you want to delete this event?`))&&P()}}),(0,Z.jsxs)(po,{children:[(0,Z.jsx)(ho,{type:`button`,className:`icon`,"data-icon":`remove`,"aria-label":c(`Close`),title:c(`Close`),disabled:h,onClick:t}),(0,Z.jsx)(`h1`,{className:H(`event-title`,j&&`is-cancelled`),children:g.title}),b&&(0,Z.jsxs)(`div`,{className:`calendar-label`,children:[(0,Z.jsx)(`span`,{className:`calendar-label-dot`,style:{backgroundColor:C},"aria-hidden":`true`}),(0,Z.jsx)(`span`,{children:b})]}),A&&(0,Z.jsx)(`div`,{className:`occurrence-status is-disabled`,children:c(`This event is disabled.`)}),(j||ne)&&(0,Z.jsx)(`div`,{className:H(`occurrence-status`,j?`is-cancelled`:`is-edited`),children:c(j?`This occurrence is cancelled.`:`This occurrence has its own changes.`)}),(0,Z.jsx)(te,{result:g.extendedProps.overlaps,formats:i}),(0,Z.jsx)(`hr`,{}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`b`,{children:[c(`Starts`),`:`]}),` `,ze(_(g.start),k,{locale:m()}),(0,Z.jsx)(`br`,{}),(0,Z.jsxs)(`b`,{children:[c(`Ends`),`:`]}),` `,ze(_(w),k,{locale:m()})]}),D&&(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`b`,{children:[c(`Repeats`),`:`]}),` `,D]}),(x||S)&&(0,Z.jsxs)(`dl`,{className:`event-details`,children:[x&&(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`dt`,{children:c(`Location`)}),(0,Z.jsx)(`dd`,{className:`event-location`,children:x})]}),S&&(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`dt`,{children:c(`Description`)}),(0,Z.jsx)(`dd`,{className:`event-description`,children:S})]})]}),(0,Z.jsx)(`hr`,{}),(0,Z.jsxs)(mo,{children:[(0,Z.jsx)(`a`,{href:g.url,className:H(`btn submit`,h&&`disabled`),"aria-disabled":h,onClick:e=>{h&&e.preventDefault()},children:c(`Edit Event`)}),(0,Z.jsx)(bo,{actions:F,disabled:h})]})]})},So=new Intl.DateTimeFormat(m().code,{weekday:`short`,timeZone:`UTC`}),Co=new Intl.DateTimeFormat(m().code,{day:`numeric`,timeZone:`UTC`}),wo=new Intl.DateTimeFormat(m().code,{weekday:`long`,timeZone:`UTC`}),To=new Intl.DateTimeFormat(m().code,{month:`long`,year:`numeric`,timeZone:`UTC`}),Eo={dayGridMonth:{dayHeaderFormat:{weekday:`long`}},listMonth:{displayEventEnd:!0,listDayFormat:{weekday:`long`,month:`long`,day:`numeric`},listDaySideFormat:!1}},Do={closeDelayMs:300,position:[`bottom`,`top`,`right`,`left`]},Oo=e=>{let t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}:00`},ko=e=>!!(e.extendedProps?.rrule||e.extendedProps?.repeats),Ao=({hiddenCalendarIds:e,selectedDate:t,onDateChange:n,miniDateSelection:r,onMiniDateSelectionHandled:i})=>{let{hidePopover:a,showPopover:o}=hi(),{range:s,setRange:c}=zi(),{currentDay:u,language:d,formats:f,weekStartDay:p,overlapThresholdString:m,allDayDefault:_,eventDuration:y,timeInterval:b,canEditEvents:x,isDragAndDropEnabled:S,isQuickCreateEnabled:C,currentSiteId:w,defaultCalendarView:T,enabledCalendarViews:E}=$(),{view:ee,setView:te,isReady:D,enabledViews:O,resolveView:k}=ua(T,E),A=x&&C,j=(0,U.useRef)(null),ne=(0,U.useRef)(null),[re,M]=(0,U.useState)(null),ie=(0,U.useRef)(s),ae=e.join(`,`),N=(0,U.useRef)(null),P=(0,U.useRef)(void 0),oe=(0,U.useRef)(!1),se=(0,U.useRef)(0),[F,ce]=(0,U.useState)(null),[le,I]=(0,U.useState)(null),[L,ue]=(0,U.useState)(!1),[R,pe]=(0,U.useState)(Pa),[me,ge]=(0,U.useState)(!1);(0,U.useEffect)(()=>{D&&M(ne.current?.querySelector(`.fc-header-toolbar .fc-toolbar-chunk:first-child`)??null)},[D]);let _e=(0,U.useCallback)(()=>j.current?.getApi(),[j.current]),ve=(0,U.useMemo)(()=>_e(),[_e]),ye=(0,U.useMemo)(()=>({alignment:`center`,position:[`right`,`left`,`bottom`,`top`]}),[]),{datePickerButton:Se,dateSelector:Ce}=_a(ve,ee,s),z=Aa();Na(ne,_e,z,`${Craft.t(`calendar`,`Now`)} · ${new Intl.DateTimeFormat(d,{...f.time.short.js,timeZone:`UTC`}).format(z)}`,new Intl.DateTimeFormat(d,{weekday:`long`,month:`long`,day:`numeric`,timeZone:`UTC`}).format(z),D),(0,U.useEffect)(()=>{if(ie.current===s)return;ie.current=s;let e=j.current?.getApi();e?.view.type===`listMonth`&&e.refetchEvents()},[s]);let Te=(0,U.useMemo)(()=>new Set(e),[e]),Ee=Oo(b),De=(0,U.useMemo)(()=>xe(Te,w,void 0,R),[Te,w,R]),Oe=(0,U.useMemo)(()=>ma(ve,{datePickerButton:Se}),[Se,ve]),ke=(0,U.useCallback)(()=>{j.current?.getApi().refetchEvents()},[]),Ae=Ta(ke),{add:je,run:Me,busy:B}=Ae,[V,H]=(0,U.useState)(!1),Ie=(0,U.useCallback)((e,t)=>{clearTimeout(P.current),a();let n=k(t);fa(e,n),j.current?.getApi().changeView(n,e)},[a,k]),Le=(0,U.useCallback)((e,t,n)=>{let r=j.current?.getApi(),i=r?.getEventById(e);!i||!r||B||V||L||o((0,Z.jsx)(xo,{fcEvent:{event:i,el:t,jsEvent:n.nativeEvent,view:r.view}}),t)},[o,B,V,L]),Re=(0,U.useMemo)(()=>({...Eo,listMonth:{...Eo.listMonth,...Ri(s)},calendarYear:{duration:{years:1},dateAlignment:`year`,dateIncrement:{years:1},titleFormat:{year:`numeric`},content:e=>(0,Z.jsx)(Ua,{content:e,disabled:B||V||F!==null,loading:L,error:me,search:R,onDateSelect:e=>Ie(e,`timeGridDay`),onMonthSelect:e=>Ie(e,`dayGridMonth`),onEventSelect:Le})}}),[s,B,V,F,L,me,R,Ie,Le]),ze=(0,U.useCallback)(()=>{ce(null),I(null)},[]);(0,U.useEffect)(()=>{if(!D)return;let e=j.current?.getApi();if(e){if(N.current===null){N.current=ae;return}N.current!==ae&&(N.current=ae,e.refetchEvents())}},[ae,D]);let Be=(0,U.useCallback)(()=>{ze(),a()},[ze,a]),Ve=(0,U.useCallback)(e=>{if(e===R)return;clearTimeout(P.current),Be(),pe(e);let t=new URL(window.location.href);e?t.searchParams.set(`search`,e):t.searchParams.delete(`search`),history.replaceState(null,``,t)},[R,Be]);(0,U.useEffect)(()=>{let e=j.current?.getApi();if(!e)return;let t=e.getEvents().find(e=>ia(e));if(!F){t?.remove();return}if(t){ra(t,F);return}e.addEvent(Zi(F))},[F]),(0,U.useEffect)(()=>{if(!F){a();return}if(!le){a();return}o((0,Z.jsx)(fo,{draft:F,onChange:ce,refetchEvents:ke,onConfirm:ze,onCancel:Be}),le,ye)},[Be,ze,F,le,a,ye,ke,o]);let He=(0,U.useCallback)(e=>{clearTimeout(P.current),a(),e.view.calendar.getEvents().find(e=>ia(e))?.remove(),I(null),ce(Xi(e,{allDayDefault:_,eventDuration:y})),e.view.calendar.unselect()},[_,y,a]),Ue=(0,U.useCallback)(e=>{e.jsEvent.detail<2||(clearTimeout(P.current),a(),ve.getEvents().find(e=>ia(e))?.remove(),I(null),ce(Xi({start:e.date,end:e.allDay?Fe(e.date,1):e.date,allDay:e.allDay},{allDayDefault:_,eventDuration:y})))},[ve,_,y,a]);(0,U.useEffect)(()=>()=>clearTimeout(P.current),[]),(0,U.useEffect)(()=>{let e=j.current?.getApi();if(!e||!r)return;let t=k(e.view.type===`listMonth`?`listMonth`:`timeGridDay`);e.changeView(t,r),fa(r,t),i()},[r,i,k]),(0,U.useEffect)(()=>{let e=j.current?.getApi();!e||l(e.getDate())===l(t)||e.gotoDate(t)},[t]);let We=(0,U.useCallback)(()=>clearTimeout(P.current),[]),Ke=(0,U.useCallback)(()=>{oe.current=!0,clearTimeout(P.current),a()},[a]),qe=(0,U.useCallback)(()=>{oe.current=!1},[]),Je=(0,U.useCallback)(e=>{ja(e),ia(e.event)&&I(e.el)},[]),Ye=(0,U.useCallback)(e=>{ia(e.event)&&I(t=>t===e.el?null:t)},[]),Xe=(0,U.useCallback)((e,t)=>{if(ia(t.event)||B){t.revert();return}let n=async n=>{let r={event:t.event,recurrenceId:we(String(t.event.id)),scope:n,siteId:w,refetchEvents:ke,revert:t.revert,onHistoryEntry:je},i=!1,a=await Me(()=>(i=!0,e===`move`?de(r):fe({...r,oldEvent:t.oldEvent})));return i||t.revert(),a};if(!ko(t.event)){n();return}H(!0),o((0,Z.jsx)(yo,{action:e,onSelect:async e=>{let t=await n(e);return H(!1),t||a(),t},onCancel:()=>{t.revert(),H(!1)}},++se.current),t.jsEvent)},[w,a,ke,o,je,Me,B]),Ze=(0,U.useCallback)(e=>{let t=g(e),n=k(`timeGridDay`);fa(t,n),j.current?.getApi().changeView(n,t)},[k]),Qe=(0,U.useCallback)(e=>e.view.type===`timeGridWeek`&&l(e.date)===l(z)?[`fc-title-today`]:[],[z]),$e=(0,U.useCallback)(e=>{if(e.view.type===`listMonth`){let t=e;return(0,Z.jsxs)(`a`,{...t.navLinkAttrs,href:Craft.getCpUrl(`calendar/${v(e.date)}/${la(k(`timeGridDay`))}`),id:t.textId,className:`calendar-agenda-day`,"aria-label":e.text,children:[(0,Z.jsx)(`span`,{className:`calendar-agenda-day-number`,"aria-hidden":`true`,children:Co.format(e.date)}),(0,Z.jsxs)(`span`,{className:`calendar-agenda-day-label`,"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{children:wo.format(e.date)}),(0,Z.jsx)(`span`,{className:`calendar-agenda-day-month`,children:To.format(e.date)})]}),l(e.date)===l(z)&&(0,Z.jsx)(`span`,{className:`calendar-agenda-today`,children:Craft.t(`calendar`,`Today`)})]})}if(e.view.type!==`timeGridWeek`)return e.text;let t=So.format(e.date),n=Co.format(e.date);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`span`,{className:`fc-day-header-label`,children:t}),(0,Z.jsx)(`span`,{className:`fc-day-header-date`,children:n})]})},[k,z]);if(!D)return null;let et=document.querySelector(`[data-calendar-history-root]`),tt=x&&S?(0,Z.jsx)(Oa,{canUndo:Ae.canUndo,canRedo:Ae.canRedo,disabled:B||L||V||F!==null,onReplay:e=>{a(),Ae.replay(e)}}):null,nt=document.querySelector(`[data-calendar-search-root]`),rt=(0,Z.jsx)(Fa,{initialSearch:R,onSearchChange:Ve});return(0,Z.jsxs)(Ge,{ref:ne,className:L?`is-fetching-events`:void 0,children:[nt?(0,_i.createPortal)(rt,nt):rt,et?(0,_i.createPortal)(tt,et):tt,ee===`listMonth`&&re&&(0,_i.createPortal)((0,Z.jsx)(Bi,{range:s,disabled:B||V||F!==null,onChange:e=>{clearTimeout(P.current),a(),c(e)}}),re),(0,Z.jsx)(be,{...h(),ref:j,themeSystem:`bootstrap5`,plugins:[he,Pe,ji,Ne],customButtons:Oe,initialView:ee,initialDate:u,height:ee===`listMonth`||ee===`calendarYear`?`auto`:void 0,locale:d,views:Re,timeZone:`UTC`,now:z,nowIndicator:!0,firstDay:p,nextDayThreshold:m,fixedWeekCount:!0,dayMaxEventRows:!0,editable:x&&S&&!B&&!V&&!L,selectable:A,selectMirror:!1,selectMinDistance:5,slotDuration:Ee,snapDuration:Ee,navLinks:!0,navLinkDayClick:Ze,select:A?He:void 0,dateClick:A?Ue:void 0,dayHeaderClassNames:Qe,dayHeaderContent:$e,events:De,eventClassNames:xa,eventContent:Ca,progressiveEventRendering:!0,eventTimeFormat:f.time.short.js,loading:e=>{e&&ge(!1),ue(e)},eventSourceFailure:()=>ge(!0),noEventsContent:()=>(0,Z.jsx)(`span`,{role:`status`,children:Craft.t(`calendar`,me?`Couldn’t load events. Use Refresh to try again.`:L?`Loading events…`:R?`No matching events in this date range.`:`No events in this date range.`)}),eventDidMount:Je,eventWillUnmount:Ye,eventMouseEnter:e=>{e.view.type!==`dayGridMonth`&&e.view.type!==`listMonth`||F!==null||oe.current||B||L||V||Sa(e.event,e.jsEvent.target)!==`ignore`&&(clearTimeout(P.current),P.current=setTimeout(()=>o((0,Z.jsx)(xo,{fcEvent:e}),e.el,Do),300),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventMouseLeave:We,eventDragStart:Ke,eventDragStop:qe,eventResizeStart:Ke,eventResizeStop:qe,eventClick:e=>{if(F!==null||B||L||V){e.jsEvent.preventDefault();return}Sa(e.event,e.jsEvent.target)===`open`&&(o((0,Z.jsx)(xo,{fcEvent:e}),e.el),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventDrop:e=>Xe(`move`,e),eventResize:e=>Xe(`resize`,e),headerToolbar:{start:`title`,center:O.join(`,`),end:pa},buttonText:{dayGridMonth:Craft.t(`calendar`,`Month`),timeGridWeek:Craft.t(`calendar`,`Week`),timeGridDay:Craft.t(`calendar`,`Day`),listMonth:Craft.t(`calendar`,`Agenda`),calendarYear:Craft.t(`calendar`,`Year`),today:Craft.t(`calendar`,`Today`)},datesSet:({view:e})=>{n(e.calendar.getDate()),setTimeout(()=>{te(e.type),fa(e.calendar.getDate(),e.type)},50)}}),Ce]})},jo=n.div`
  color: var(--gray-600);
`,Mo=n.div`
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
`,No=n.button`
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
`,Po=n.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 7px;

  span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
`,Fo=n.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 4px;
`,Io=n.button`
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
`,Lo=(e,t,n)=>new Date(Date.UTC(e,t,n)),Ro=e=>Lo(e.getUTCFullYear(),e.getUTCMonth(),1),zo=(e,t)=>Lo(e.getUTCFullYear(),e.getUTCMonth()+t,1),Bo=({selectedDate:e,onDateSelect:t})=>{let{language:n,weekStartDay:r}=$(),[i,a]=(0,U.useState)(()=>Ro(e));(0,U.useEffect)(()=>{a(Ro(e))},[e]);let o=(0,U.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`long`,year:`numeric`,timeZone:`UTC`}),[n]),s=(0,U.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`narrow`,timeZone:`UTC`}),[n]),c=(0,U.useMemo)(()=>Array.from({length:7},(e,t)=>s.format(Lo(2023,0,1+r+t))),[r,s]),u=(0,U.useMemo)(()=>{let e=i.getUTCFullYear(),t=i.getUTCMonth(),n=Lo(e,t,1),a=Lo(e,t+1,0),o=(n.getUTCDay()-r+7)%7,s=((r+6)%7-a.getUTCDay()+7)%7,c=o+a.getUTCDate()+s;return Array.from({length:c},(n,r)=>Lo(e,t,1-o+r))},[i,r]),d=l(new Date);return(0,Z.jsxs)(jo,{children:[(0,Z.jsxs)(Mo,{children:[(0,Z.jsx)(No,{"aria-label":Craft.t(`calendar`,`Previous month`),type:`button`,onClick:()=>a(e=>zo(e,-1))}),(0,Z.jsx)(`span`,{children:o.format(i)}),(0,Z.jsx)(No,{"aria-label":Craft.t(`calendar`,`Next month`),type:`button`,$next:!0,onClick:()=>a(e=>zo(e,1))})]}),(0,Z.jsx)(Po,{children:c.map((e,t)=>(0,Z.jsx)(`span`,{children:e},`${e}-${t}`))}),(0,Z.jsx)(Fo,{children:u.map(e=>{let r=l(e);return(0,Z.jsx)(Io,{"aria-label":e.toLocaleDateString(n,{timeZone:`UTC`}),type:`button`,$isCurrentMonth:e.getUTCMonth()===i.getUTCMonth(),$isToday:r===d,onClick:()=>t(e),children:e.getUTCDate()},r)})})]})},Vo=o`
  100% {
    transform: translateX(100%);
  }
`,Ho=n.div`
  position: relative;
  overflow: hidden;

  background: ${Ke.gray200};

  &::after {
    content: "";

    position: absolute;
    inset: 0;

    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgb(from ${Ke.gray050} r g b / 70%),
      transparent
    );

    animation: ${Vo} 1.4s ${Je.easeInOut} infinite;
  }
`,Uo=({width:e=`100%`,height:t=16,borderRadius:n=4,className:r})=>(0,Z.jsx)(Ho,{"aria-hidden":`true`,className:r,style:{borderRadius:n,height:t,width:e}}),Wo=async e=>{let t=await Ce(oi(`/api/calendars`),{signal:e});if(!t.ok)throw Error(`Failed to fetch calendars`);return t.json()},Go=()=>{let[e,t]=(0,U.useState)([]),[n,r]=(0,U.useState)(null),[i,a]=(0,U.useState)(!1),o=(0,U.useCallback)(async e=>{a(!0),r(null);try{let n=await Wo(e);t(n)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;r(e instanceof Error?e:Error(`Failed to fetch calendars`))}finally{a(!1)}},[]);return(0,U.useEffect)(()=>{let e=new AbortController;return o(e.signal),()=>{e.abort()}},[o]),{data:e,error:n,isPending:i,refetch:o}},Ko=n.div`
  padding: 0;
`,qo=n.div`
  display: flex;
  flex-direction: column;
`,Jo=n.hr`
  width: 100%;
  margin: 16px 0;
  border: 0;
  border-top: 1px solid var(--gray-200);
`,Yo=n.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0;
  padding: 0;

  list-style: none;
`,Xo=n.li`
  margin: 0;
`,Zo=n.label`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0;

  border-radius: 4px;

  color: ${Ke.gray800};
  cursor: pointer;
`,Qo=n.input`
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);

  &:focus-visible + span {
    border: 2px solid ${Ke.black};
  }

  &:checked + span {
    border: 1px solid var(--calendar-color);
  }

  &:checked + span:after {
    opacity: 1;
  }
`,$o=n.span`
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
`,es=n.span`
  font-size: 13px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,ts=n.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ns=n.div`
  font-size: 13px;
  color: ${Ke.error};
`,rs=({hiddenCalendarIds:e,onToggleCalendar:t})=>{let{data:n,error:r,isPending:i}=Go(),a=new Set(e),o=i&&n.length===0;return(0,Z.jsxs)(Ko,{children:[o&&(0,Z.jsxs)(ts,{children:[(0,Z.jsx)(Uo,{height:16}),(0,Z.jsx)(Uo,{height:16}),(0,Z.jsx)(Uo,{height:16})]}),!o&&r&&(0,Z.jsx)(ns,{children:r.message}),!o&&!r&&(0,Z.jsx)(Yo,{children:n.map(e=>(0,Z.jsx)(Xo,{children:(0,Z.jsxs)(Zo,{style:{"--calendar-color":e.color.base,"--calendar-color-contrast":e.color.contrast},children:[(0,Z.jsx)(Qo,{type:`checkbox`,checked:!a.has(e.id),onChange:()=>t(e.id)}),(0,Z.jsx)($o,{}),(0,Z.jsx)(es,{children:e.title})]})},e.id))})]})},is=()=>{let e=document.querySelector(`[data-sidebar-root]`),{hiddenCalendarIds:t,toggleCalendarVisibility:n}=da(),{currentDay:r}=$(),[i,a]=(0,U.useState)(()=>new Date(r)),[o,s]=(0,U.useState)(null);return(0,Z.jsxs)(gi,{children:[(0,Z.jsx)(Ao,{hiddenCalendarIds:t,selectedDate:i,onDateChange:a,miniDateSelection:o,onMiniDateSelectionHandled:()=>s(null)}),e&&(0,_i.createPortal)((0,Z.jsxs)(qo,{children:[(0,Z.jsx)(rs,{hiddenCalendarIds:t,onToggleCalendar:n}),(0,Z.jsx)(Jo,{}),(0,Z.jsx)(Bo,{selectedDate:i,onDateSelect:e=>{a(e),s(e)}})]}),e)]})},as=document.getElementById(`calendar-overview`),os=as.querySelector(`[data-root]`),ss=as.querySelector(`[data-config]`),cs=JSON.parse(ss?.textContent||`{}`);si.createRoot(os).render((0,Z.jsx)(ga,{config:cs,children:(0,Z.jsx)(Fr,{basename:oi(`/`,!1),children:(0,Z.jsx)(Jn,{children:(0,Z.jsxs)(Kn,{path:`/`,element:(0,Z.jsx)(ti,{}),children:[(0,Z.jsx)(Kn,{index:!0,element:(0,Z.jsx)(is,{})}),(0,Z.jsx)(Kn,{path:`overview`,element:(0,Z.jsx)(is,{})}),(0,Z.jsx)(Kn,{path:`:year/:month/:day/:view?`,element:(0,Z.jsx)(is,{})})]})})})}));