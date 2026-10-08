import{A as e,C as t,D as n,E as r,M as i,O as a,S as o,_ as s,b as c,i as l,j as u,k as d,n as f,r as p,t as m,w as h,y as g}from"./localization-Dt_HqhpZ.js";import{T as _,i as v,s as y,w as b}from"./calendar-preview.operations-DYihnhqu.js";import{Bt as x,D as S,Ft as C,H as w,I as T,Jt as E,K as D,M as O,Mt as k,Tt as ee,Ut as te,Xt as A,a as ne,at as j,c as M,cn as re,d as N,f as ie,fn as ae,g as P,h as oe,i as se,it as ce,jt as le,l as ue,mn as F,mt as de,n as fe,o as pe,on as me,p as he,r as I,s as ge,sn as _e,t as ve,u as ye,v as be,wt as xe,xt as Se,y as Ce,zt as we}from"./calendar.events-BsoNrhOC.js";import{t as Te}from"./interaction-CRxFL9NJ.js";import{t as Ee}from"./timegrid-CUjWu894.js";import{a as De,b as Oe,c as L,f as ke,n as Ae,o as je,p as Me,r as Ne,s as Pe,t as Fe}from"./components-BwD3hg1D.js";import{n as Ie}from"./calendar.styles-CJM4dtUD.js";import{n as Le,r as Re,t as ze}from"./variables-DgO6IlZm.js";var Be=`modulepreload`,Ve=function(e,t){return new URL(e,t).href},He={},Ue=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=Ve(t,n),t=s(t),t in He)return;He[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Be,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},R=i(e(),1),We=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,Ge=/^[\\/]{2}/;function Ke(e,t){return t+e.replace(/\\/g,`/`)}var qe=`popstate`;function Je(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function Ye(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return Qe(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:$e(t)}return et(t,n,null,e)}function z(e,t){if(e===!1||e==null)throw Error(t)}function B(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function Xe(){return Math.random().toString(36).substring(2,10)}function Ze(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function Qe(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?V(t):t,state:n,key:t&&t.key||r||Xe(),mask:i}}function $e({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function V(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function et(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=Je(e)?e:Qe(h.location,e,t);n&&n(r,e),l=u()+1;let d=Ze(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=Je(e)?e:Qe(h.location,e,t);n&&n(r,e),l=u();let i=Ze(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return tt(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(qe,d),c=e,()=>{i.removeEventListener(qe,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function tt(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),z(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:$e(t);return i=i.replace(/ $/,`%20`),!n&&Ge.test(i)&&(i=r+i),new URL(i,r)}function nt(e,t,n=`/`){return rt(e,t,n,!1)}function rt(e,t,n,r,i){let a=H((typeof t==`string`?V(t):t).pathname||`/`,n);if(a==null)return null;let o=i??at(e),s=null,c=St(a);for(let e=0;s==null&&e<o.length;++e)s=vt(o[e],c,r);return s}function it(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function at(e){let t=ot(e);return ct(t),t}function ot(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;z(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=U([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(z(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),ot(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:gt(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=xt(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of st(e.path))a(e,t,!0,n)}),t}function st(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=st(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function ct(e){e.sort((e,t)=>e.score===t.score?_t(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var lt=/^:[\w-]+$/,ut=3,dt=2,ft=1,pt=10,mt=-2,ht=e=>e===`*`;function gt(e,t){let n=e.split(`/`),r=n.length;return n.some(ht)&&(r+=mt),t&&(r+=dt),n.filter(e=>!ht(e)).reduce((e,t)=>e+(lt.test(t)?ut:t===``?ft:pt),r)}function _t(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function vt(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?bt(u,l,s.matcher,s.compiledParams):yt(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=yt({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:U([a,d.pathname]),pathnameBase:jt(U([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=U([a,d.pathnameBase]))}return o}function yt(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=xt(e.path,e.caseSensitive,e.end);return bt(e,t,n,r)}function bt(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function xt(e,t=!1,n=!0){B(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function St(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return B(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function H(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Ct(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?V(e):e,a;return n?(n=kt(n),a=n.startsWith(`/`)?wt(n.substring(1),`/`):wt(n,t)):a=t,{pathname:a,search:Mt(r),hash:Nt(i)}}function wt(e,t){let n=At(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Tt(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Et(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Dt(e){let t=Et(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Ot(e,t,n,r=!1){let i;typeof e==`string`?i=V(e):(i={...e},z(!i.pathname||!i.pathname.includes(`?`),Tt(`?`,`pathname`,`search`,i)),z(!i.pathname||!i.pathname.includes(`#`),Tt(`#`,`pathname`,`hash`,i)),z(!i.search||!i.search.includes(`#`),Tt(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Ct(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var kt=e=>e.replace(/[\\/]{2,}/g,`/`),U=e=>kt(e.join(`/`)),At=e=>e.replace(/\/+$/,``),jt=e=>At(e).replace(/^\/*/,`/`),Mt=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Nt=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Pt=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ft(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function It(e){return U(e.map(e=>e.route.path).filter(Boolean))||`/`}var Lt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Rt(e,t){let n=e;if(typeof n!=`string`||!We.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Lt)try{let e=new URL(window.location.href),r=Ge.test(n)?new URL(Ke(n,e.protocol)):new URL(n),a=H(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{B(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var zt=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(zt);var Bt=[`GET`,...zt];new Set(Bt);var Vt=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Ht(e){try{return Vt.includes(new URL(e).protocol)}catch{return!1}}var W=R.createContext(null);W.displayName=`DataRouter`;var Ut=R.createContext(null);Ut.displayName=`DataRouterState`;var Wt=R.createContext(!1);function Gt(){return R.useContext(Wt)}var Kt=R.createContext({isTransitioning:!1});Kt.displayName=`ViewTransition`;var qt=R.createContext(new Map);qt.displayName=`Fetchers`;var Jt=R.createContext(null);Jt.displayName=`Await`;var G=R.createContext(null);G.displayName=`Navigation`;var Yt=R.createContext(null);Yt.displayName=`Location`;var K=R.createContext({outlet:null,matches:[],isDataRoute:!1});K.displayName=`Route`;var Xt=R.createContext(null);Xt.displayName=`RouteError`;var Zt=`REACT_ROUTER_ERROR`,Qt=`REDIRECT`,$t=`ROUTE_ERROR_RESPONSE`;function en(e){if(e.startsWith(`${Zt}:${Qt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function tn(e){if(e.startsWith(`${Zt}:${$t}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Pt(t.status,t.statusText,t.data)}catch{}}function nn(e,{relative:t}={}){z(rn(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=R.useContext(G),{hash:i,pathname:a,search:o}=dn(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:U([n,a])),r.createHref({pathname:s,search:o,hash:i})}function rn(){return R.useContext(Yt)!=null}function q(){return z(rn(),`useLocation() may be used only in the context of a <Router> component.`),R.useContext(Yt).location}var an=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function on(e){R.useContext(G).static||R.useLayoutEffect(e)}function sn(){let{isDataRoute:e}=R.useContext(K);return e?An():cn()}function cn(){z(rn(),`useNavigate() may be used only in the context of a <Router> component.`);let e=R.useContext(W),{basename:t,navigator:n}=R.useContext(G),{matches:r}=R.useContext(K),{pathname:i}=q(),a=JSON.stringify(Dt(r)),o=R.useRef(!1);return on(()=>{o.current=!0}),R.useCallback((r,s={})=>{if(B(o.current,an),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Ot(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:U([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var ln=R.createContext(null);function un(e){let t=R.useContext(K).outlet;return R.useMemo(()=>t&&R.createElement(ln.Provider,{value:e},t),[t,e])}function dn(e,{relative:t}={}){let{matches:n}=R.useContext(K),{pathname:r}=q(),i=JSON.stringify(Dt(n));return R.useMemo(()=>Ot(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function fn(e,t){return pn(e,t)}function pn(e,t,n){z(rn(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=R.useContext(G),{matches:i}=R.useContext(K),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Mn(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=q(),d;if(t){let e=typeof t==`string`?V(t):t;z(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):nt(e,{pathname:p});B(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),B(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=bn(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:U([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:U([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?R.createElement(Yt.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function mn(){let e=kn(),t=Ft(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=R.createElement(R.Fragment,null,R.createElement(`p`,null,`💿 Hey developer 👋`),R.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,R.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,R.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),R.createElement(R.Fragment,null,R.createElement(`h2`,null,`Unexpected Application Error!`),R.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?R.createElement(`pre`,{style:i},n):null,o)}var hn=R.createElement(mn,null),gn=class extends R.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=tn(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:R.createElement(K.Provider,{value:this.props.routeContext},R.createElement(Xt.Provider,{value:e,children:this.props.component}));return this.context?R.createElement(vn,{error:e},t):t}};gn.contextType=Wt;var _n=new WeakMap;function vn({children:e,error:t}){let{basename:n}=R.useContext(G);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=en(t.digest);if(e){let r=_n.get(t);if(r)throw r;let i=Rt(e.location,n),a=i.absoluteURL||i.to;if(Ht(a))throw Error(`Invalid redirect location`);if(Lt&&!_n.get(t))if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw _n.set(t,n),n}return R.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function yn({routeContext:e,match:t,children:n}){let r=R.useContext(W);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),R.createElement(K.Provider,{value:e},n)}function bn(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);z(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:It(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||hn,o&&(s<0&&c===0?(Mn(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?R.createElement(n.route.Component,null):n.route.element?n.route.element:e,R.createElement(yn,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?R.createElement(gn,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function xn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Sn(e){let t=R.useContext(W);return z(t,xn(e)),t}function Cn(e){let t=R.useContext(Ut);return z(t,xn(e)),t}function wn(e){let t=R.useContext(K);return z(t,xn(e)),t}function Tn(e){let t=wn(e),n=t.matches[t.matches.length-1];return z(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function En(){return Tn(`useRouteId`)}function Dn(){let e=Cn(`useNavigation`);return R.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function On(){let{matches:e,loaderData:t}=Cn(`useMatches`);return R.useMemo(()=>e.map(e=>it(e,t)),[e,t])}function kn(){let e=R.useContext(Xt),t=Cn(`useRouteError`),n=Tn(`useRouteError`);return e===void 0?t.errors?.[n]:e}function An(){let{router:e}=Sn(`useNavigate`),t=Tn(`useNavigate`),n=R.useRef(!1);return on(()=>{n.current=!0}),R.useCallback(async(r,i={})=>{B(n.current,an),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var jn={};function Mn(e,t,n){!t&&!jn[e]&&(jn[e]=!0,B(!1,n))}R.memo(Nn);function Nn({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return pn(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Pn(e){return un(e.context)}function Fn(e){z(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function In({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){z(!rn(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=R.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=V(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=R.useMemo(()=>{let e=H(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return B(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:R.createElement(G.Provider,{value:c},R.createElement(Yt.Provider,{children:t,value:h}))}function Ln({children:e,location:t}){return fn(Rn(e),t)}R.Component;function Rn(e,t=[]){let n=[];return R.Children.forEach(e,(e,r)=>{if(!R.isValidElement(e))return;let i=[...t,r];if(e.type===R.Fragment){n.push.apply(n,Rn(e.props.children,i));return}z(e.type===Fn,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),z(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Rn(e.props.children,i)),n.push(a)}),n}var zn=`get`,Bn=`application/x-www-form-urlencoded`;function Vn(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Hn(e){return Vn(e)&&e.tagName.toLowerCase()===`button`}function Un(e){return Vn(e)&&e.tagName.toLowerCase()===`form`}function Wn(e){return Vn(e)&&e.tagName.toLowerCase()===`input`}function Gn(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Kn(e,t){return e.button===0&&(!t||t===`_self`)&&!Gn(e)}var qn=null;function Jn(){if(qn===null)try{new FormData(document.createElement(`form`),0),qn=!1}catch{qn=!0}return qn}var Yn=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Xn(e){return e!=null&&!Yn.has(e)?(B(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Bn}"`),null):e}function Zn(e,t){let n,r,i,a,o;if(Un(e)){let o=e.getAttribute(`action`);r=o?H(o,t):null,n=e.getAttribute(`method`)||zn,i=Xn(e.getAttribute(`enctype`))||Bn,a=new FormData(e)}else if(Hn(e)||Wn(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?H(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||zn,i=Xn(e.getAttribute(`formenctype`))||Xn(o.getAttribute(`enctype`))||Bn,a=new FormData(o,e),!Jn()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Vn(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=zn,r=null,i=Bn,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Qn={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},$n=/[&><\u2028\u2029]/g;function er(e){return e.replace($n,e=>Qn[e])}function tr(e,t){if(e===!1||e==null)throw Error(t)}function nr(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&H(i.pathname,t)===`/`?i.pathname=`${At(t)}/_root.${r}`:i.pathname=`${At(i.pathname)}.${r}`,i}async function rr(e,t){if(e.id in t)return t[e.id];try{let n=await Ue(()=>import(e.module),[],import.meta.url);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function ir(e){return e!=null&&typeof e.page==`string`}function ar(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function or(e,t,n){return dr((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await rr(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(ar).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function sr(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function cr(e,t,{includeHydrateFallback:n}={}){return lr(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function lr(e){return[...new Set(e)]}function ur(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function dr(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!ir(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(ur(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function fr(){let e=R.useContext(W);return tr(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function pr(){let e=R.useContext(Ut);return tr(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var mr=R.createContext(void 0);mr.displayName=`FrameworkContext`;function hr(){let e=R.useContext(mr);return tr(e,`You must render this element inside a <HydratedRouter> element`),e}function gr(e,t){let n=R.useContext(mr),[r,i]=R.useState(!1),[a,o]=R.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=R.useRef(null);R.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),R.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:_r(s,p),onBlur:_r(c,m),onMouseEnter:_r(l,p),onMouseLeave:_r(u,m),onTouchStart:_r(d,p)}]:[a,f,{}]:[!1,f,{}]}function _r(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function vr({page:e,...t}){let n=Gt(),{nonce:r}=hr(),{router:i}=fr(),a=R.useMemo(()=>nt(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?R.createElement(br,{page:e,matches:a,...t}):R.createElement(xr,{page:e,matches:a,...t})):null}function yr(e){let{manifest:t,routeModules:n}=hr(),[r,i]=R.useState([]);return R.useEffect(()=>{let r=!1;return or(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function br({page:e,matches:t,...n}){let r=q(),{future:i}=hr(),{basename:a}=fr(),o=R.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=nr(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return R.createElement(R.Fragment,null,o.map(e=>R.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function xr({page:e,matches:t,...n}){let r=q(),{future:i,manifest:a,routeModules:o}=hr(),{basename:s}=fr(),{loaderData:c,matches:l}=pr(),u=R.useMemo(()=>sr(e,t,l,a,r,`data`),[e,t,l,a,r]),d=R.useMemo(()=>sr(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=R.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=nr(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=R.useMemo(()=>cr(d,a),[d,a]),m=yr(d);return R.createElement(R.Fragment,null,f.map(e=>R.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>R.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>R.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Sr(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}R.Component;var Cr=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Cr&&(window.__reactRouterVersion=`7.18.1`)}catch{}function wr({basename:e,children:t,useTransitions:n,window:r}){let i=R.useRef();i.current??(i.current=Ye({window:r,v5Compat:!0}));let a=i.current,[o,s]=R.useState({action:a.action,location:a.location}),c=R.useCallback(e=>{n===!1?s(e):R.startTransition(()=>s(e))},[n]);return R.useLayoutEffect(()=>a.listen(c),[a,c]),R.createElement(In,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function Tr({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=R.useState({action:n.action,location:n.location}),o=R.useCallback(e=>{r===!1?a(e):R.startTransition(()=>a(e))},[r]);return R.useLayoutEffect(()=>n.listen(o),[n,o]),R.createElement(In,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}Tr.displayName=`unstable_HistoryRouter`;var Er=R.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=R.useContext(G),v=typeof l==`string`&&We.test(l),y=Rt(l,h);l=y.to;let b=nn(l,{relative:r}),x=q(),S=null;if(o){let e=Ot(o,[],x.mask?x.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:U([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=gr(n,p),E=Nr(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||E(t)}let O=!(y.isExternal||i),k=R.createElement(`a`,{...p,...T,href:(O?S:void 0)||y.absoluteURL||b,onClick:O?D:e,ref:Sr(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?R.createElement(R.Fragment,null,k,R.createElement(vr,{page:b})):k});Er.displayName=`Link`;var Dr=R.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=dn(a,{relative:c.relative}),d=q(),f=R.useContext(Ut),{navigator:p,basename:m}=R.useContext(G),h=f!=null&&Ur(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=H(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return R.createElement(Er,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});Dr.displayName=`NavLink`;var Or=R.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=zn,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=R.useContext(G),g=Ir(),_=Lr(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&We.test(s);return R.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?R.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});Or.displayName=`Form`;function kr({getKey:e,storageKey:t,...n}){let r=R.useContext(mr),{basename:i}=R.useContext(G),a=q(),o=On();Vr({getKey:e,storageKey:t});let s=R.useMemo(()=>{if(!r||!e)return null;let t=Br(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&r?.nonce&&(n.nonce=r.nonce),R.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${er(JSON.stringify(t||Rr))}, ${er(JSON.stringify(s))})`}})}kr.displayName=`ScrollRestoration`;function Ar(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function jr(e){let t=R.useContext(W);return z(t,Ar(e)),t}function Mr(e){let t=R.useContext(Ut);return z(t,Ar(e)),t}function Nr(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=sn(),d=q(),f=dn(e,{relative:o});return R.useCallback(p=>{if(Kn(p,t)){p.preventDefault();let t=n===void 0?$e(d)===$e(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?R.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Pr=0,Fr=()=>`__${String(++Pr)}__`;function Ir(){let{router:e}=jr(`useSubmit`),{basename:t}=R.useContext(G),n=En(),r=e.fetch,i=e.navigate;return R.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Zn(e,t);if(a.navigate===!1){let e=a.fetcherKey||Fr();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Lr(e,{relative:t}={}){let{basename:n}=R.useContext(G),r=R.useContext(K);z(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...dn(e||`.`,{relative:t})},o=q();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:U([n,a.pathname])),$e(a)}var Rr=`react-router-scroll-positions`,zr={};function Br(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:H(e.pathname,n)||e.pathname},t)),i??(i=e.key),i}function Vr({getKey:e,storageKey:t}={}){let{router:n}=jr(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Mr(`useScrollRestoration`),{basename:a}=R.useContext(G),o=q(),s=On(),c=Dn();R.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Hr(R.useCallback(()=>{if(c.state===`idle`){let t=Br(o,s,a,e);zr[t]=window.scrollY}try{sessionStorage.setItem(t||Rr,JSON.stringify(zr))}catch(e){B(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(R.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Rr);e&&(zr=JSON.parse(e))}catch{}},[t]),R.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(zr,()=>window.scrollY,e?(t,n)=>Br(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),R.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{B(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Hr(e,t){let{capture:n}=t||{};R.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Ur(e,{relative:t}={}){let n=R.useContext(Kt);z(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=jr(`useViewTransitionState`),i=dn(e,{relative:t});if(!n.isTransitioning)return!1;let a=H(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=H(n.nextLocation.pathname,r)||n.nextLocation.pathname;return yt(i.pathname,o)!=null||yt(i.pathname,a)!=null}var J=a(),Wr=()=>(0,J.jsx)(Pn,{}),Gr=u(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),Kr=u((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),qr=i(u(((e,t)=>{var n=Gr(),r=Kr(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function u(e){return(e||``).toString().replace(i,``)}var d=[[`#`,`hash`],[`?`,`query`],function(e,t){return m(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],f={hash:1,query:1};function p(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new _(unescape(e.pathname),{});else if(r===`string`)for(i in n=new _(e,{}),f)delete n[i];else if(r===`object`){for(i in e)i in f||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function m(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function h(e,t){e=u(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):m(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&m(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||m(r),slashesCount:s,rest:l}}function g(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function _(e,t,i){if(e=u(e),e=e.replace(a,``),!(this instanceof _))return new _(e,t,i);var o,s,c,f,v,y,b=d.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=p(t),s=h(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||l.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!m(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(f=b[C],typeof f==`function`){e=f(e,S);continue}c=f[0],y=f[1],c===c?typeof c==`string`?(v=c===`@`?e.lastIndexOf(c):e.indexOf(c),~v&&(typeof f[2]==`number`?(S[y]=e.slice(0,v),e=e.slice(v+f[2])):(S[y]=e.slice(v),e=e.slice(0,v)))):(v=c.exec(e))&&(S[y]=v[1],e=e.slice(0,v.index)):S[y]=e,S[y]=S[y]||o&&f[3]&&t[y]||``,f[4]&&(S[y]=S[y].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=g(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&m(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(v=S.auth.indexOf(`:`),~v?(S.username=S.auth.slice(0,v),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(v+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&m(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function v(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&m(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function y(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||m(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&m(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}_.prototype={set:v,toString:y},_.extractProtocol=h,_.location=p,_.trimLeft=u,_.qs=r,t.exports=_}))()),Jr=window.location.href.replace(/(.*\/calendar).*/i,`$1`),Yr=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,qr.default)(`${Jr}${e}`);return t?n.href:n.pathname},Xr=i(n()),Zr=14,Qr=e=>{if(e instanceof MouseEvent){let t=e.target;if(t instanceof HTMLElement){let n=t.getBoundingClientRect(),r=n.left+e.offsetX,i=n.top+e.offsetY;return new DOMRect(r,i,1,1)}return new DOMRect(e.clientX,e.clientY,1,1)}return e.getBoundingClientRect()},$r=({state:e,bridgeRef:t,popoverRef:n})=>{let[r,i]=(0,R.useState)(),a=(0,R.useMemo)(()=>{if(e)return b(e.options)},[e]),o=(0,R.useCallback)(()=>{if(!e||!a){i(void 0);return}let r=t.current,o=n.current;if(!r||!o)return;let s=Qr(e.anchor),c=o.getBoundingClientRect(),l=r.getBoundingClientRect(),u=_({anchorRect:s,popoverRect:c,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:a,arrowPadding:Zr});i({...u,top:u.top-l.top,left:u.left-l.left})},[e,a,t,n]);return(0,R.useLayoutEffect)(()=>{o()},[o]),(0,R.useEffect)(()=>{if(!e)return;let t=()=>o();return window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0)}},[e,o]),r},ei=r.div`
  position: relative;
`,ti=r.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`,ni=r.span`
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
`,ri=(0,R.createContext)(null),ii=()=>{let e=(0,R.useContext)(ri);if(!e)throw Error(`usePopover must be used within a PopoverProvider`);return e},ai=({children:e})=>{let[t,n]=(0,R.useState)(),r=(0,R.useRef)(null),i=(0,R.useRef)(null),a=(0,R.useRef)(void 0),o=(0,R.useRef)(!1),s=(0,R.useCallback)((e,t,r)=>{clearTimeout(a.current),o.current=!1,n({content:e,anchor:t,options:r})},[]),c=(0,R.useCallback)(()=>{clearTimeout(a.current),n(void 0)},[]),l=(0,R.useCallback)(()=>{clearTimeout(a.current),o.current=!0},[]),u=$r({state:t,bridgeRef:r,popoverRef:i}),d=t?.options?.closeDelayMs,f=(0,R.useCallback)(()=>clearTimeout(a.current),[]),p=(0,R.useCallback)(()=>{d===void 0||o.current||(clearTimeout(a.current),a.current=setTimeout(()=>n(void 0),d))},[d]);(0,R.useEffect)(()=>{let e=t?.anchor;if(!(d===void 0||!(e instanceof HTMLElement)))return e.addEventListener(`mouseleave`,p),()=>e.removeEventListener(`mouseleave`,p)},[t,d,p]),(0,R.useEffect)(()=>()=>clearTimeout(a.current),[]);let m=t?.content&&(0,J.jsxs)(ti,{ref:i,onMouseEnter:f,onMouseLeave:p,style:{top:u?.top??0,left:u?.left??0,visibility:u?`visible`:`hidden`},children:[u&&(0,J.jsx)(ni,{side:u.arrow.side,top:u.arrow.top,left:u.arrow.left}),t.content]});return(0,J.jsx)(ri.Provider,{value:{showPopover:s,hidePopover:c,keepPopoverOpen:l},children:(0,J.jsxs)(ei,{ref:r,children:[m,e]})})},oi=i(d()),si=class extends P{constructor(){super(...arguments),this.state={textId:C()}}render(){let{theme:e,dateEnv:t,options:n,viewApi:r}=this.context,{cellId:i,dayDate:a,todayRange:o}=this.props,{textId:s}=this.state,c=xe(a,o),l=n.listDayFormat?t.format(a,n.listDayFormat):``,u=n.listDaySideFormat?t.format(a,n.listDaySideFormat):``,d=Object.assign({date:t.toDate(a),view:r,textId:s,text:l,sideText:u,navLinkAttrs:ce(this.context,a),sideNavLinkAttrs:ce(this.context,a,`day`,!1)},c);return F(be,{elTag:`tr`,elClasses:[`fc-list-day`,...ee(c,e)],elAttrs:{"data-date":Se(a)},renderProps:d,generatorName:`dayHeaderContent`,customGenerator:n.dayHeaderContent,defaultGenerator:ci,classNameGenerator:n.dayHeaderClassNames,didMount:n.dayHeaderDidMount,willUnmount:n.dayHeaderWillUnmount},t=>F(`th`,{scope:`colgroup`,colSpan:3,id:i,"aria-labelledby":s},F(t,{elTag:`div`,elClasses:[`fc-list-day-cushion`,e.getClass(`tableCellShaded`)]})))}};function ci(e){return F(ae,null,e.text&&F(`a`,Object.assign({id:e.textId,className:`fc-list-day-text`},e.navLinkAttrs),e.text),e.sideText&&F(`a`,Object.assign({"aria-hidden":!0,className:`fc-list-day-side-text`},e.sideNavLinkAttrs),e.sideText))}var li=de({hour:`numeric`,minute:`2-digit`,meridiem:`short`}),ui=class extends P{render(){let{props:e,context:t}=this,{options:n}=t,{seg:r,timeHeaderId:i,eventHeaderId:a,dateHeaderId:o}=e,s=n.eventTimeFormat||li;return F(S,Object.assign({},e,{elTag:`tr`,elClasses:[`fc-list-event`,r.eventRange.def.url&&`fc-event-forced-url`],defaultGenerator:()=>di(r,t),seg:r,timeText:``,disableDragging:!0,disableResizing:!0}),(e,n)=>F(ae,null,fi(r,s,t,i,o),F(`td`,{"aria-hidden":!0,className:`fc-list-event-graphic`},F(`span`,{className:`fc-list-event-dot`,style:{borderColor:n.borderColor||n.backgroundColor}})),F(e,{elTag:`td`,elClasses:[`fc-list-event-title`],elAttrs:{headers:`${a} ${o}`}})))}};function di(e,t){let n=le(e,t);return F(`a`,Object.assign({},n),e.eventRange.def.title)}function fi(e,t,n,r,i){let{options:a}=n;if(a.displayEventTime!==!1){let o=e.eventRange.def,s=e.eventRange.instance,c=!1,l;if(o.allDay?c=!0:E(e.eventRange.range)?e.isStart?l=j(e,t,n,null,null,s.range.start,e.end):e.isEnd?l=j(e,t,n,null,null,e.start,s.range.end):c=!0:l=j(e,t,n),c){let e={text:n.options.allDayText,view:n.viewApi};return F(be,{elTag:`td`,elClasses:[`fc-list-event-time`],elAttrs:{headers:`${r} ${i}`},renderProps:e,generatorName:`allDayContent`,customGenerator:a.allDayContent,defaultGenerator:pi,classNameGenerator:a.allDayClassNames,didMount:a.allDayDidMount,willUnmount:a.allDayWillUnmount})}return F(`td`,{className:`fc-list-event-time`},l)}return null}function pi(e){return e.text}var mi=class extends Ce{constructor(){super(...arguments),this.computeDateVars=A(gi),this.eventStoreToSegs=A(this._eventStoreToSegs),this.state={timeHeaderId:C(),eventHeaderId:C(),dateHeaderIdRoot:C()},this.setRootEl=e=>{e?this.context.registerInteractiveComponent(this,{el:e}):this.context.unregisterInteractiveComponent(this)}}render(){let{props:e,context:t}=this,{dayDates:n,dayRanges:r}=this.computeDateVars(e.dateProfile),i=this.eventStoreToSegs(e.eventStore,e.eventUiBases,r);return F(w,{elRef:this.setRootEl,elClasses:[`fc-list`,t.theme.getClass(`table`),t.options.stickyHeaderDates===!1?``:`fc-list-sticky`],viewSpec:t.viewSpec},F(T,{liquid:!e.isHeightAuto,overflowX:e.isHeightAuto?`visible`:`hidden`,overflowY:e.isHeightAuto?`visible`:`auto`},i.length>0?this.renderSegList(i,n):this.renderEmptyMessage()))}renderEmptyMessage(){let{options:e,viewApi:t}=this.context;return F(be,{elTag:`div`,elClasses:[`fc-list-empty`],renderProps:{text:e.noEventsText,view:t},generatorName:`noEventsContent`,customGenerator:e.noEventsContent,defaultGenerator:hi,classNameGenerator:e.noEventsClassNames,didMount:e.noEventsDidMount,willUnmount:e.noEventsWillUnmount},e=>F(e,{elTag:`div`,elClasses:[`fc-list-empty-cushion`]}))}renderSegList(e,t){let{theme:n,options:r}=this.context,{timeHeaderId:i,eventHeaderId:a,dateHeaderIdRoot:o}=this.state,s=_i(e);return F(O,{unit:`day`},(e,c)=>{let l=[];for(let n=0;n<s.length;n+=1){let u=s[n];if(u){let s=Se(t[n]),d=o+`-`+s;l.push(F(si,{key:s,cellId:d,dayDate:t[n],todayRange:c})),u=_e(u,r.eventOrder);for(let t of u)l.push(F(ui,Object.assign({key:s+`:`+t.eventRange.instance.instanceId,seg:t,isDragging:!1,isResizing:!1,isDateSelecting:!1,isSelected:!1,timeHeaderId:i,eventHeaderId:a,dateHeaderId:d},k(t,c,e))))}}return F(`table`,{className:`fc-list-table `+n.getClass(`table`)},F(`thead`,null,F(`tr`,null,F(`th`,{scope:`col`,id:i},r.timeHint),F(`th`,{scope:`col`,"aria-hidden":!0}),F(`th`,{scope:`col`,id:a},r.eventHint))),F(`tbody`,null,l))})}_eventStoreToSegs(e,t,n){return this.eventRangesToSegs(me(e,t,this.props.dateProfile.activeRange,this.context.options.nextDayThreshold).fg,n)}eventRangesToSegs(e,t){let n=[];for(let r of e)n.push(...this.eventRangeToSegs(r,t));return n}eventRangeToSegs(e,t){let{dateEnv:n}=this.context,{nextDayThreshold:r}=this.context.options,i=e.range,a=e.def.allDay,o,s,c,l=[];for(o=0;o<t.length;o+=1)if(s=te(i,t[o]),s&&(c={component:this,eventRange:e,start:s.start,end:s.end,isStart:e.isStart&&s.start.valueOf()===i.start.valueOf(),isEnd:e.isEnd&&s.end.valueOf()===i.end.valueOf(),dayIndex:o},l.push(c),!c.isEnd&&!a&&o+1<t.length&&i.end<n.add(t[o+1].start,r))){c.end=i.end,c.isEnd=!0;break}return l}};function hi(e){return e.text}function gi(e){let t=re(e.renderRange.start),n=e.renderRange.end,r=[],i=[];for(;t<n;)r.push(t),i.push({start:t,end:D(t,1)}),t=D(t,1);return{dayDates:r,dayRanges:i}}function _i(e){let t=[],n,r;for(n=0;n<e.length;n+=1)r=e[n],(t[r.dayIndex]||(t[r.dayIndex]=[])).push(r);return t}x(`:root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid var(--fc-border-color)}.fc .fc-list-empty{align-items:center;background-color:var(--fc-neutral-bg-color);display:flex;height:100%;justify-content:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{border-style:hidden;width:100%}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{background:var(--fc-page-bg-color);position:sticky;top:0}.fc .fc-list-table thead{left:-10000px;position:absolute}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{clear:both;content:"";display:table}.fc-theme-standard .fc-list-day-cushion{background-color:var(--fc-neutral-bg-color)}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:var(--fc-list-event-hover-bg-color)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{border:calc(var(--fc-list-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-list-event-dot-width)/2);box-sizing:content-box;display:inline-block;height:0;width:0}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}`);var vi={listDayFormat:yi,listDaySideFormat:yi,noEventsClassNames:we,noEventsContent:we,noEventsDidMount:we,noEventsWillUnmount:we};function yi(e){return e===!1?null:de(e)}var bi=oe({name:`@fullcalendar/list`,optionRefiners:vi,views:{list:{component:mi,buttonTextKey:`list`,listDayFormat:{month:`long`,day:`numeric`,year:`numeric`}},listDay:{type:`list`,duration:{days:1},listDayFormat:{weekday:`long`}},listWeek:{type:`list`,duration:{weeks:1},listDayFormat:{weekday:`long`},listDaySideFormat:{month:`long`,day:`numeric`,year:`numeric`}},listMonth:{type:`list`,duration:{month:1},listDaySideFormat:{weekday:`long`}},listYear:{type:`list`,duration:{year:1},listDaySideFormat:{weekday:`long`}}}}),xi=1440*60,Si=`draft-create-event`,Ci=`New Event`,wi=e=>Math.floor(e.getTime()/1e3),Y=e=>{let t=new Date(e*1e3);return Math.floor(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())/1e3)},X=(e,t)=>e+t*xi,Ti=e=>Math.max(1,e.eventDuration)*60,Ei=(e,t)=>e.preserveDuration?Math.max(60,e.end-e.start):Ti(t),Di=e=>Math.max(1,Math.round((e.end-e.start)/xi)),Oi=e=>!!(e&&typeof e==`object`&&`closest`in e&&e.closest),ki=(e,t)=>{let n=wi(e.start),r=wi(e.end),i=e.allDay?r-n>xi:Y(r-1)>Y(n),a=e.allDay?i:t.allDayDefault,o=a?Y(n):n,s=a?X(i?Y(r-1):o,1):i?r:o+Ti(t);return{id:Si,title:l(Ci),allDay:a,start:o,end:s,preserveDuration:i}},Ai=e=>({id:e.id,title:e.title,start:new Date(e.start*1e3),end:new Date(e.end*1e3),allDay:e.allDay,editable:!1,startEditable:!1,durationEditable:!1,extendedProps:{isDraftCreate:!0}}),ji=e=>e.allDay?X(e.end,-1):e.end,Mi=(e,t)=>({...e,title:t}),Ni=(e,t,n)=>{if(e.allDay===t)return e;if(t){let t=Y(e.start),n=X(Y(e.end-1),1);return{...e,allDay:!0,start:t,end:Math.max(n,X(t,1))}}return{...e,allDay:!1,end:e.start+(e.preserveDuration?(Di(e)-1)*xi:0)+Ti(n)}},Pi=(e,t,n)=>{if(e.allDay){let n=Y(t);return{...e,start:n,end:X(n,Di(e))}}return{...e,start:t,end:t+Ei(e,n)}},Fi=(e,t,n)=>{if(e.allDay){let n=X(Y(t),1);return{...e,end:Math.max(n,X(Y(e.start),1))}}return{...e,end:Math.max(t,e.start+Ti(n))}},Ii=(e,t)=>{e.setProp(`title`,t.title),e.setAllDay(t.allDay,{maintainDuration:!1}),e.setDates(new Date(t.start*1e3),new Date(t.end*1e3),{allDay:t.allDay})},Z=e=>!!(e?.extendedProps&&`isDraftCreate`in e.extendedProps&&e.extendedProps.isDraftCreate),Li=(e,t)=>Oi(e)&&!!e.closest(t),Ri=e=>{let t;if(e)t=Craft.getCpUrl(`calendar/${c(e)}`);else{let e=new URL(window.location.href);/\/(day|week|month)$/.test(e.pathname)&&(e.pathname=e.pathname.replace(/\/(day|week|month)$/,``)),t=e.toString()}history.pushState(`data`,``,t)},zi=`refresh prev,today,datepicker,next`,Bi=(e,{datePickerButton:t})=>({prev:{text:Craft.t(`calendar`,`Previous`),icon:`chevron-left`,click:()=>{e.prev(),Ri(e.getDate())}},next:{text:Craft.t(`calendar`,`Next`),icon:`chevron-right`,click:()=>{e.next(),Ri(e.getDate())}},refresh:{text:Craft.t(`calendar`,`Refresh`),icon:`refresh`,click:()=>{ve(),e.refetchEvents()}},datepicker:t});u(((e,t)=>{var n=NaN,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,o=/^0o[0-7]+$/i,s=parseInt,c=typeof global==`object`&&global&&global.Object===Object&&global,l=typeof self==`object`&&self&&self.Object===Object&&self,u=c||l||Function(`return this`)(),d=Object.prototype.toString,f=Math.max,p=Math.min,m=function(){return u.Date.now()};function h(e,t,n){var r,i,a,o,s,c,l=0,u=!1,d=!1,h=!0;if(typeof e!=`function`)throw TypeError(`Expected a function`);t=y(t)||0,g(n)&&(u=!!n.leading,d=`maxWait`in n,a=d?f(y(n.maxWait)||0,t):a,h=`trailing`in n?!!n.trailing:h);function _(t){var n=r,a=i;return r=i=void 0,l=t,o=e.apply(a,n),o}function v(e){return l=e,s=setTimeout(S,t),u?_(e):o}function b(e){var n=e-c,r=e-l,i=t-n;return d?p(i,a-r):i}function x(e){var n=e-c,r=e-l;return c===void 0||n>=t||n<0||d&&r>=a}function S(){var e=m();if(x(e))return C(e);s=setTimeout(S,b(e))}function C(e){return s=void 0,h&&r?_(e):(r=i=void 0,o)}function w(){s!==void 0&&clearTimeout(s),l=0,r=c=i=s=void 0}function T(){return s===void 0?o:C(m())}function E(){var e=m(),n=x(e);if(r=arguments,i=this,c=e,n){if(s===void 0)return v(c);if(d)return s=setTimeout(S,t),_(c)}return s===void 0&&(s=setTimeout(S,t)),o}return E.cancel=w,E.flush=T,E}function g(e){var t=typeof e;return!!e&&(t==`object`||t==`function`)}function _(e){return!!e&&typeof e==`object`}function v(e){return typeof e==`symbol`||_(e)&&d.call(e)==`[object Symbol]`}function y(e){if(typeof e==`number`)return e;if(v(e))return n;if(g(e)){var t=typeof e.valueOf==`function`?e.valueOf():e;e=g(t)?t+``:t}if(typeof e!=`string`)return e===0?e:+e;e=e.replace(r,``);var c=a.test(e);return c||o.test(e)?s(e.slice(2),c?2:8):i.test(e)?n:+e}t.exports=h}))();var Vi=typeof window<`u`?R.useLayoutEffect:R.useEffect;function Hi(e,t,n,r){let i=(0,R.useRef)(t);Vi(()=>{i.current=t},[t]),(0,R.useEffect)(()=>{let t=n?.current??window;if(!(t&&t.addEventListener))return;let a=e=>{i.current(e)};return t.addEventListener(e,a,r),()=>{t.removeEventListener(e,a,r)}},[e,n,r])}function Ui(e){let t=(0,R.useRef)(()=>{throw Error(`Cannot call an event handler while rendering.`)});return Vi(()=>{t.current=e},[e]),(0,R.useCallback)((...e)=>t.current?.call(t,...e),[t])}var Wi=typeof window>`u`;function Gi(e,t,n={}){let{initializeWithValue:r=!0}=n,i=(0,R.useCallback)(e=>n.serializer?n.serializer(e):JSON.stringify(e),[n]),a=(0,R.useCallback)(e=>{if(n.deserializer)return n.deserializer(e);if(e===`undefined`)return;let r=t instanceof Function?t():t,i;try{i=JSON.parse(e)}catch(e){return console.error(`Error parsing JSON:`,e),r}return i},[n,t]),o=(0,R.useCallback)(()=>{let n=t instanceof Function?t():t;if(Wi)return n;try{let t=window.localStorage.getItem(e);return t?a(t):n}catch(t){return console.warn(`Error reading localStorage key \u201C${e}\u201D:`,t),n}},[t,e,a]),[s,c]=(0,R.useState)(()=>r?o():t instanceof Function?t():t),l=Ui(t=>{Wi&&console.warn(`Tried setting localStorage key \u201C${e}\u201D even though environment is not a client`);try{let n=t instanceof Function?t(o()):t;window.localStorage.setItem(e,i(n)),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))}catch(t){console.warn(`Error setting localStorage key \u201C${e}\u201D:`,t)}}),u=Ui(()=>{Wi&&console.warn(`Tried removing localStorage key \u201C${e}\u201D even though environment is not a client`);let n=t instanceof Function?t():t;window.localStorage.removeItem(e),c(n),window.dispatchEvent(new StorageEvent(`local-storage`,{key:e}))});(0,R.useEffect)(()=>{c(o())},[e]);let d=(0,R.useCallback)(t=>{t.key&&t.key!==e||c(o())},[e,o]);return Hi(`storage`,d),Hi(`local-storage`,d),[s,l,u]}var Ki=`solspace-calendar-view`,qi=`solspace-calendar-hidden-calendars`,Ji={view:`dayGridMonth`},Yi={month:`dayGridMonth`,week:`timeGridWeek`,day:`timeGridDay`},Xi=()=>{let e=window.location.pathname.split(`/`).filter(Boolean).at(-1);return e&&Yi[e]||null},Zi=()=>{let[e,t]=Gi(Ki,Ji),[n,r]=(0,R.useState)(e.view),[i,a]=(0,R.useState)(!1);return(0,R.useEffect)(()=>{let t=Xi(),n=t||e.view;t&&r(n),a(!0)},[]),{view:n,setView:e=>{r(e),t({view:e}),a(!0)},isReady:i}},Qi=()=>{let[e,t]=Gi(qi,[]);return{hiddenCalendarIds:e,toggleCalendarVisibility:e=>{t(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}}},$i=(0,R.createContext)(null),ea=({config:e,children:t})=>{let n=(0,R.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,J.jsx)($i.Provider,{value:n,children:t})},Q=()=>{let e=(0,R.useContext)($i);if(!e)throw Error(`ConfigContext is not provided`);return e},ta=e=>{let{view:n}=Zi(),{weekStartDay:r}=Q(),i=(0,R.useRef)(null),[a,o]=(0,R.useState)(!1),[l,u]=(0,R.useState)(null),[d,f]=(0,R.useState)(null),p=(0,R.useCallback)(()=>{o(!1),u(null)},[]);(0,R.useEffect)(()=>{if(!a)return;let e=e=>{let t=e.target;i.current?.contains(t)||t.closest(`.fc-datepicker-button`)||p()},t=e=>{e.key===`Escape`&&p()};return window.addEventListener(`mousedown`,e),window.addEventListener(`keydown`,t),()=>{window.removeEventListener(`mousedown`,e),window.removeEventListener(`keydown`,t)}},[p,a]);let m=(0,R.useCallback)(t=>{if(!t)return;let n=s(t),r=Craft.getCpUrl(`calendar/${c(n)}`);history.pushState(`data`,``,r),e.gotoDate(n),f(t),p()},[p,e]),h=(0,R.useCallback)((n,r)=>{let{bottom:i,right:a}=r.getBoundingClientRect();f(t(e.getDate())),o(e=>!e),u({top:i+8,left:a})},[e]);return{dateSelector:a&&l?(0,J.jsx)(na,{view:n,popoverRef:i,position:l,selectedDate:d,weekStartDay:r,onDateSelect:m}):null,datePickerButton:{text:Craft.t(`calendar`,`Pick a Date`),icon:`datepicker`,click:h}}},na=({view:e,popoverRef:t,position:n,selectedDate:r,weekStartDay:i,onDateSelect:a})=>{let o=e===`timeGridWeek`,s=e===`dayGridMonth`;return(0,J.jsx)(`div`,{ref:t,className:`fc-datepicker-popover`,style:{top:n.top,left:n.left},children:(0,J.jsx)(Pe,{...p(),inline:!0,selected:r,onChange:a,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:i,showWeekPicker:o,showWeekNumbers:o,showMonthYearPicker:s})})},ra=e=>e.view.type===`dayGridMonth`&&!e.event.allDay&&!e.event.extendedProps?.multiDay,ia=e=>{let t=e?.toLowerCase();return t===`black`||t===`white`?`fc-color-${t}`:null},aa=({event:e})=>{let t=[];e.allDay&&t.push(`fc-event-all-day`),e.end&&(!e.extendedProps?.multiDay&&!e.allDay?t.push(`fc-event-single-day`):t.push(`fc-event-multi-day`)),e.extendedProps?.enabled===!1&&t.push(`fc-event-disabled`),e.extendedProps?.cancelled&&t.push(`fc-event-cancelled`);let n=ia(e.textColor);return n&&t.push(n),t},oa=(e,t)=>Z(e)?`ignore`:Li(t,`[data-calendar-event-title-link]`)?`navigate`:`open`,sa=e=>{let{event:t,timeText:n}=e,r=L(`fc-event-title`,ra(e)&&`fc-event-title-inline`),i=!Z(t)&&t.url,a=!!t.extendedProps?.cancelled,o=!a&&t.extendedProps?.isEdited?(0,J.jsx)(`span`,{className:`fc-event-flag`,title:l(`This occurrence has its own changes.`),"aria-hidden":`true`,children:`✎`}):null,s=a?(0,J.jsxs)(`span`,{className:`visually-hidden`,children:[`, `,l(`Cancelled`)]}):null,c=i?(0,J.jsxs)(`button`,{type:`button`,onClick:()=>window.location.href=t.url,className:r,"data-calendar-event-title-link":!0,children:[o,t.title,s]}):(0,J.jsxs)(`div`,{className:r,children:[o,t.title,s]});return ra(e)?(0,J.jsxs)(`div`,{className:`fc-event-main-frame fc-event-main-frame-inline`,children:[(0,J.jsx)(`span`,{className:`fc-color-icon`,style:{backgroundColor:t.backgroundColor,borderColor:t.borderColor}}),(0,J.jsx)(`div`,{className:`fc-event-title-container`,children:c}),n?(0,J.jsx)(`div`,{className:`fc-event-time`,children:n}):null]}):(0,J.jsx)(`div`,{className:`fc-event-main-frame`,children:(0,J.jsx)(`div`,{className:`fc-event-title-container`,children:c})})},ca=({options:e,value:t,onChange:n})=>{let r=(0,R.useId)(),i=(0,R.useRef)(null),a=(0,R.useRef)(null),o=(0,R.useRef)(n),s=JSON.stringify(e),c=e.find(e=>e.value===t);return(0,R.useEffect)(()=>{o.current=n},[n]),(0,R.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu`,t.style.minWidth=`${e.getBoundingClientRect().width}px`,t.setAttribute(`aria-label`,l(`Calendar`)),a.current=t;let n=document.createElement(`ul`);t.append(n),JSON.parse(s).forEach(e=>{let t=document.createElement(`li`),r=document.createElement(`a`);r.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),r.append(i,document.createTextNode(e.label)),t.append(r),n.append(t)}),e.after(t);let r=new Garnish.MenuBtn(e,{onOptionSelect:t=>{r.hideMenu(),o.current(Number(t.dataset.calendarId)),e.focus()}}),c=t=>{t.key===`Escape`&&r.showingMenu&&(t.preventDefault(),t.stopPropagation(),r.hideMenu(),e.focus())};return document.addEventListener(`keydown`,c,!0),()=>{document.removeEventListener(`keydown`,c,!0),r.hideMenu(),r.destroy(),t.remove(),a.current=null}},[s]),(0,R.useEffect)(()=>{a.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let n=Number(e.dataset.calendarId)===t;e.classList.toggle(`sel`,n),e.setAttribute(`aria-selected`,String(n))})},[t,s]),(0,J.jsx)(je,{label:l(`Calendar`),id:r,children:(0,J.jsxs)(la,{ref:i,id:r,type:`button`,className:`btn menubtn fullwidth`,children:[(0,J.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:c?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,J.jsx)(`span`,{className:`calendar-name`,children:c?.label})]})})},la=r.button`
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
`,ua=(e,t,n)=>({title:e.title||l(`New Event`),start:e.start,end:e.end,allDay:e.allDay,calendarId:t,siteId:n}),da=({refetchEvents:e,onSuccess:t})=>{let{hidePopover:n}=ii(),{currentSiteId:r}=Q(),[i,a]=(0,R.useState)(!1),[o,s]=(0,R.useState)(null);return{createEvent:(0,R.useCallback)(async(i,o)=>{a(!0),s(null);try{let a=await N(Yr(`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(ua(i,o,r))});if(!a.ok){let e=null;try{e=await a.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}await a.json(),ve(),e?.(),t?.(),n()}catch(e){e instanceof Error?s(e.message):s(`Failed to create event`)}finally{a(!1)}},[n,t,e,r]),error:o,isFetching:i}},fa=r.div`
  width: 340px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  padding: 15px;

  hr {
    margin: 15px 0;
  }
`,pa=r(Fe)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,ma=r.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .field {
    margin-block: 0;
  }

  hr {
    margin: 3px 0;
  }
`,ha=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ga=r.label`
  font-weight: 600;
  cursor: pointer;
`,_a=({draft:e,onChange:t,refetchEvents:n,onConfirm:r,onCancel:i})=>{let{calendars:a,calendarColors:s,formats:c,weekStartDay:u,eventDuration:d,timeInterval:f}=Q(),p=(0,R.useMemo)(()=>Object.entries(a).map(([e,t])=>({value:Number(e),label:t,color:s?.[Number(e)]})),[a,s]),[m,h]=(0,R.useState)(p[0]?.value??0),{createEvent:g,error:_,isFetching:v}=da({refetchEvents:n,onSuccess:r}),y=(0,R.useMemo)(()=>e.allDay?c.date.short.icu:c.datetime.short.icu,[c,e.allDay]),b=(0,R.useMemo)(()=>ji(e),[e]);return Hi(`keydown`,e=>{e.key===`Escape`&&i()}),(0,J.jsxs)(fa,{children:[(0,J.jsx)(pa,{children:(0,J.jsx)(Re,{autofocus:!0,value:e.title,placeholder:l(`Event Title`),onChange:n=>t(Mi(e,n))})}),(0,J.jsxs)(ma,{children:[(0,J.jsx)(ca,{value:m,options:p,onChange:h}),(0,J.jsx)(`hr`,{}),(0,J.jsxs)(ha,{children:[(0,J.jsx)(Ae,{enabled:e.allDay,onClick:n=>t(Ni(e,n,{eventDuration:d}))}),(0,J.jsx)(ga,{onClick:()=>t(Ni(e,!e.allDay,{eventDuration:d})),children:l(`All Day`)})]}),(0,J.jsx)(Ne,{label:l(`Starts`),value:e.start,datePickerProps:{showIcon:!0,icon:(0,J.jsx)(De,{}),toggleCalendarOnIconClick:!0,dateFormat:y,timeFormat:c.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:u,timeIntervals:f},onChange:n=>{n!==null&&t(Pi(e,n,{eventDuration:d}))}}),(0,J.jsx)(Ne,{label:l(`Ends`),value:b,datePickerProps:{showIcon:!0,icon:(0,J.jsx)(De,{}),toggleCalendarOnIconClick:!0,minDate:o(e.start),dateFormat:y,timeFormat:c.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:u,timeIntervals:f,filterTime:t=>{if(!e.start)return!0;let n=o(e.start),r=new Date(t);return n.getTime()<r.getTime()}},onChange:n=>{n!==null&&t(Fi(e,n,{eventDuration:d}))}})]}),(0,J.jsx)(`hr`,{}),_&&(0,J.jsx)(`p`,{className:`error`,children:_}),(0,J.jsxs)(Fe,{$justifyContent:`flex-end`,$gap:8,children:[(0,J.jsx)(`button`,{type:`button`,className:L(`btn submit`,v&&`disabled`),disabled:!e.title||!m||v,onClick:()=>g(e,m),children:l(v?`Creating Event...`:`Create Event`)}),(0,J.jsx)(`button`,{type:`button`,className:L(`btn`,v&&`disabled`),disabled:v,onClick:i,children:l(`Cancel`)})]})]})},va=r.div`
  position: relative;
  width: max-content;
  max-width: min(360px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 15px;
  overflow-wrap: anywhere;

  .btn {
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

  .calendar-label-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    flex: 0 0 10px;
    border-radius: 50%;
  }
`,ya=r.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`,ba=r.button`
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
`,xa=r.button`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    white-space: nowrap;
  }

  &&::after {
    display: none;
  }

  span {
    font-size: 11px;
    letter-spacing: 1px;
  }
`,Sa={move:`You are moving an event.`,resize:`You are changing an event’s length.`,delete:`You are deleting an event.`},Ca={move:`Which occurrences do you want to move?`,resize:`Which occurrences do you want to change?`,delete:`Which occurrences do you want to delete?`},wa={occurrence:`Only this occurrence`,following:`This and following`,series:`All occurrences`},Ta=({action:e,onSelect:t,onCancel:n})=>{let{hidePopover:r}=ii(),[i,a]=(0,R.useState)(null),o=(0,R.useRef)(!0),s=(0,R.useRef)(!1),c=i!==null;(0,R.useEffect)(()=>()=>{o.current=!1,s.current||n?.()},[]);let u=(0,R.useCallback)(()=>{c||r()},[r,c]);Hi(`keydown`,e=>{e.key===`Escape`&&u()});let d=async e=>{if(!c){s.current=!0,a(e);try{await t(e)&&r()}finally{o.current&&a(null)}}};return(0,J.jsxs)(va,{children:[(0,J.jsx)(`h3`,{children:l(Sa[e])}),(0,J.jsx)(`p`,{children:l(Ca[e])}),(0,J.jsx)(`hr`,{}),(0,J.jsxs)(Fe,{$direction:`column`,$alignItems:`center`,$gap:8,children:[[`occurrence`,`following`,`series`].map(e=>(0,J.jsx)(`button`,{type:`button`,className:L(`btn small`,e===`occurrence`&&`submit`,c&&`disabled`),disabled:c,onClick:()=>d(e),children:l(i===e?`Processing...`:wa[e])},e)),(0,J.jsx)(`button`,{type:`button`,className:L(`btn small`,c&&`disabled`),disabled:c,onClick:u,children:l(`Cancel`)})]})]})},Ea=({actions:e,disabled:t})=>{let{keepPopoverOpen:n}=ii(),r=(0,R.useRef)(null),i=(0,R.useRef)({actions:e,disabled:t}),a=JSON.stringify(e.map(({label:e,destructive:t})=>({label:e,destructive:t})));return(0,R.useEffect)(()=>{i.current={actions:e,disabled:t}},[e,t]),(0,R.useEffect)(()=>{let e=r.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu`,t.setAttribute(`aria-label`,l(`More actions`));let o=document.createElement(`ul`);t.append(o),JSON.parse(a).forEach((e,n)=>{e.destructive&&n>0&&(t.append(document.createElement(`hr`)),o=document.createElement(`ul`),t.append(o));let r=document.createElement(`li`),i=document.createElement(`a`);i.textContent=e.label,i.dataset.action=String(n),e.destructive&&(i.className=`error`),r.append(i),o.append(r)}),e.after(t);let s=new Garnish.MenuBtn(e,{onOptionSelect:e=>{i.current.disabled||(s.hideMenu(),i.current.actions[Number(e.dataset.action)]?.onSelect())}});s.menu.on(`show`,n);let c=t=>{t.key===`Escape`&&s.showingMenu&&(t.preventDefault(),t.stopPropagation(),s.hideMenu(),e.focus())};return document.addEventListener(`keydown`,c,!0),()=>{document.removeEventListener(`keydown`,c,!0),s.hideMenu(),s.destroy(),t.remove()}},[a,n]),(0,J.jsx)(xa,{ref:r,type:`button`,className:`btn menubtn`,disabled:t,"aria-label":l(`More actions`),title:l(`More actions`),children:(0,J.jsx)(`span`,{"aria-hidden":`true`,children:`•••`})})},Da=({fcEvent:e})=>{let{hidePopover:n,showPopover:r}=ii(),{currentSiteId:i}=Q(),[a,o]=(0,R.useState)(!1),[s,c]=(0,R.useState)(!1),[u,d]=(0,R.useState)(!1),p=a||s||u;Hi(`keydown`,e=>{e.key===`Escape`&&n()});let m=e.event,{end:h,allDay:g}=m,_=m.extendedProps.calendarName,b=m.extendedProps.calendarColor??m.backgroundColor??m.borderColor??`#607d9f`,x=(0,R.useMemo)(()=>g?ke(h,1):h,[g,h]),S=!!m.extendedProps.rrule,C=S?y(v(m.extendedProps.rrule,m.start.getTime()/1e3)):null,w=pe(String(m.id)),T=m.allDay?`PP`:`PPp`,E=!!m.extendedProps.cancelled,D=!!m.extendedProps.isEdited,O=!!m.extendedProps.hasOverride,k=()=>e.view.calendar.refetchEvents(),ee=()=>{w&&(n(),M({eventId:ne(String(m.id)),recurrenceId:w,siteId:i,onSave:k}))},te=async()=>{if(!w||p)return;d(!0);let e=await se({event:m,recurrenceId:w,siteId:i});if(e){window.location.href=e;return}d(!1)},A=async()=>{if(!(!w||p)){c(!0);try{await ye({event:m,recurrenceId:w,cancelled:!E,siteId:i,refetchEvents:k})&&n()}finally{c(!1)}}},j=async()=>{if(!a){o(!0);try{await I({event:m,scope:`series`,recurrenceId:w,siteId:i,refetchEvents:k})&&n()}finally{o(!1)}}},re=()=>{r((0,J.jsx)(Ta,{action:`delete`,onSelect:async e=>e===`occurrence`&&O&&!window.confirm(l(`This occurrence has its own changes, which are deleted with it. Delete it?`))?!1:I({event:m,scope:e,recurrenceId:w,siteId:i,refetchEvents:k})}),e.el)},N=[];return S&&w&&N.push({label:l(`Edit occurrence`),onSelect:ee},{label:l(u?`Processing...`:`Edit this and following occurrences`),onSelect:()=>void te()},{label:l(E?`Restore occurrence`:`Cancel occurrence`),onSelect:()=>void A()}),N.push({label:l(a?`Deleting...`:`Delete`),destructive:!0,onSelect:()=>{S?re():window.confirm(l(`Are you sure you want to delete this event?`))&&j()}}),(0,J.jsxs)(va,{children:[(0,J.jsx)(ba,{type:`button`,className:`icon`,"data-icon":`remove`,"aria-label":l(`Close`),title:l(`Close`),disabled:p,onClick:n}),(0,J.jsx)(`h1`,{className:L(`event-title`,E&&`is-cancelled`),children:m.title}),_&&(0,J.jsxs)(`div`,{className:`calendar-label`,children:[(0,J.jsx)(`span`,{className:`calendar-label-dot`,style:{backgroundColor:b},"aria-hidden":`true`}),(0,J.jsx)(`span`,{children:_})]}),(E||D)&&(0,J.jsx)(`div`,{className:`occurrence-status`,children:l(E?`This occurrence is cancelled.`:`This occurrence has its own changes.`)}),(0,J.jsx)(`hr`,{}),(0,J.jsxs)(`div`,{children:[(0,J.jsxs)(`b`,{children:[l(`Starts`),`:`]}),` `,Me(t(m.start),T,{locale:f()}),(0,J.jsx)(`br`,{}),(0,J.jsxs)(`b`,{children:[l(`Ends`),`:`]}),` `,Me(t(x),T,{locale:f()})]}),C&&(0,J.jsxs)(`div`,{children:[(0,J.jsxs)(`b`,{children:[l(`Repeats`),`:`]}),` `,C]}),(0,J.jsx)(`hr`,{}),(0,J.jsxs)(ya,{children:[(0,J.jsx)(`a`,{href:m.url,className:L(`btn submit`,p&&`disabled`),"aria-disabled":p,onClick:e=>{p&&e.preventDefault()},children:l(`Edit`)}),(0,J.jsx)(Ea,{actions:N,disabled:p})]})]})},Oa=new Intl.DateTimeFormat(f().code,{weekday:`short`,timeZone:`UTC`}),ka=new Intl.DateTimeFormat(f().code,{day:`numeric`,timeZone:`UTC`}),Aa={dayGridMonth:{dayHeaderFormat:{weekday:`long`}}},ja={closeDelayMs:300,position:[`bottom`,`top`,`right`,`left`]},Ma=e=>{let t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}:00`},Na=e=>!!(e.extendedProps?.rrule||e.extendedProps?.repeats),Pa=({hiddenCalendarIds:e,selectedDate:t,onDateChange:n,miniDateSelection:r,onMiniDateSelectionHandled:i})=>{let{hidePopover:a,showPopover:o}=ii(),{view:c,setView:l,isReady:u}=Zi(),{currentDay:d,language:f,formats:p,weekStartDay:h,overlapThresholdString:_,allDayDefault:v,eventDuration:y,timeInterval:b,canEditEvents:x,isDragAndDropEnabled:S,isQuickCreateEnabled:C,currentSiteId:w}=Q(),T=x&&C,E=(0,R.useRef)(null),D=e.join(`,`),O=(0,R.useRef)(null),k=(0,R.useRef)(void 0),ee=(0,R.useRef)(!1),te=(0,R.useRef)(0),[A,ne]=(0,R.useState)(null),[j,M]=(0,R.useState)(null),[re,N]=(0,R.useState)(!1),ae=(0,R.useCallback)(()=>E.current?.getApi(),[E.current]),P=(0,R.useMemo)(()=>ae(),[ae]),oe=(0,R.useMemo)(()=>({alignment:`center`,position:[`right`,`left`,`bottom`,`top`]}),[]),{datePickerButton:se,dateSelector:ce}=ta(P),le=(0,R.useMemo)(()=>new Set(e),[e]),F=Ma(b),de=(0,R.useMemo)(()=>fe(le,w),[le,w]),me=(0,R.useMemo)(()=>Bi(P,{datePickerButton:se}),[se,P]),I=(0,R.useCallback)(()=>{E.current?.getApi().refetchEvents()},[]),_e=(0,R.useCallback)(()=>{ne(null),M(null)},[]);(0,R.useEffect)(()=>{if(!u)return;let e=E.current?.getApi();if(e){if(O.current===null){O.current=D;return}O.current!==D&&(O.current=D,e.refetchEvents())}},[D,u]);let ve=(0,R.useCallback)(()=>{_e(),a()},[_e,a]);(0,R.useEffect)(()=>{let e=E.current?.getApi();if(!e)return;let t=e.getEvents().find(e=>Z(e));if(!A){t?.remove();return}if(t){Ii(t,A);return}e.addEvent(Ai(A))},[A]),(0,R.useEffect)(()=>{if(!A){a();return}if(!j){a();return}o((0,J.jsx)(_a,{draft:A,onChange:ne,refetchEvents:I,onConfirm:_e,onCancel:ve}),j,oe)},[ve,_e,A,j,a,oe,I,o]);let ye=(0,R.useCallback)(e=>{a(),e.view.calendar.getEvents().find(e=>Z(e))?.remove(),M(null),ne(ki(e,{allDayDefault:v,eventDuration:y})),e.view.calendar.unselect()},[v,y,a]),be=(0,R.useCallback)(e=>{e.jsEvent.detail<2||(a(),P.getEvents().find(e=>Z(e))?.remove(),M(null),ne(ki({start:e.date,end:e.allDay?Oe(e.date,1):e.date,allDay:e.allDay},{allDayDefault:v,eventDuration:y})))},[P,v,y,a]);(0,R.useEffect)(()=>()=>clearTimeout(k.current),[]),(0,R.useEffect)(()=>{let e=E.current?.getApi();!e||!r||(e.changeView(`timeGridDay`,r),Ri(r),i())},[r,i]),(0,R.useEffect)(()=>{let e=E.current?.getApi();!e||g(e.getDate())===g(t)||e.gotoDate(t)},[t]);let xe=(0,R.useCallback)(()=>clearTimeout(k.current),[]),Se=(0,R.useCallback)(()=>{ee.current=!0,clearTimeout(k.current),a()},[a]),Ce=(0,R.useCallback)(()=>{ee.current=!1},[]),we=(0,R.useCallback)(e=>{Z(e.event)&&M(e.el)},[]),De=(0,R.useCallback)(e=>{Z(e.event)&&M(t=>t===e.el?null:t)},[]),L=(0,R.useCallback)((e,t)=>{if(Z(t.event)){t.revert();return}let n=n=>{let r={event:t.event,recurrenceId:pe(String(t.event.id)),scope:n,siteId:w,refetchEvents:I,revert:t.revert};return e===`move`?ge(r):ue({...r,oldEvent:t.oldEvent})};if(!Na(t.event)){n();return}o((0,J.jsx)(Ta,{action:e,onSelect:async e=>{let t=await n(e);return t||a(),t},onCancel:t.revert},++te.current),t.jsEvent)},[w,a,I,o]),ke=(0,R.useCallback)(e=>{let t=s(e);Ri(t),E.current?.getApi().changeView(`timeGridDay`,t)},[]),Ae=(0,R.useCallback)(e=>e.view.type===`timeGridWeek`&&g(e.date)===g(d)?[`fc-title-today`]:[],[d]),je=(0,R.useCallback)(e=>{if(e.view.type!==`timeGridWeek`)return e.text;let t=Oa.format(e.date),n=ka.format(e.date);return(0,J.jsxs)(J.Fragment,{children:[(0,J.jsx)(`span`,{className:`fc-day-header-label`,children:t}),(0,J.jsx)(`span`,{className:`fc-day-header-date`,children:n})]})},[]);return u?(0,J.jsxs)(Ie,{className:re?`is-fetching-events`:void 0,children:[(0,J.jsx)(ie,{...m(),ref:E,themeSystem:`bootstrap5`,plugins:[he,Ee,bi,Te],customButtons:me,initialView:c,initialDate:d,locale:f,views:Aa,timeZone:`UTC`,firstDay:h,nextDayThreshold:_,fixedWeekCount:!0,dayMaxEventRows:!0,editable:x&&S,selectable:T,selectMirror:!1,selectMinDistance:5,slotDuration:F,snapDuration:F,navLinks:!0,navLinkDayClick:ke,select:T?ye:void 0,dateClick:T?be:void 0,dayHeaderClassNames:Ae,dayHeaderContent:je,events:de,eventClassNames:aa,eventContent:sa,progressiveEventRendering:!0,eventTimeFormat:p.time.short.js,loading:N,eventDidMount:we,eventWillUnmount:De,eventMouseEnter:e=>{e.view.type===`dayGridMonth`&&(ee.current||oa(e.event,e.jsEvent.target)!==`ignore`&&(clearTimeout(k.current),k.current=setTimeout(()=>o((0,J.jsx)(Da,{fcEvent:e}),e.el,ja),300),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation()))},eventMouseLeave:xe,eventDragStart:Se,eventDragStop:Ce,eventResizeStart:Se,eventResizeStop:Ce,eventClick:e=>{oa(e.event,e.jsEvent.target)===`open`&&(o((0,J.jsx)(Da,{fcEvent:e}),e.el),e.jsEvent.preventDefault(),e.jsEvent.stopPropagation())},eventDrop:e=>L(`move`,e),eventResize:e=>L(`resize`,e),headerToolbar:{start:`title`,center:`dayGridMonth,timeGridWeek,timeGridDay`,end:zi},buttonText:{dayGridMonth:Craft.t(`calendar`,`Month`),timeGridWeek:Craft.t(`calendar`,`Week`),timeGridDay:Craft.t(`calendar`,`Day`),today:Craft.t(`calendar`,`Today`)},datesSet:({view:e})=>{n(e.calendar.getDate()),setTimeout(()=>{l(e.type),Ri()},50)}}),ce]}):null},Fa=r.div`
  color: var(--gray-600);
`,Ia=r.div`
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
`,La=r.button`
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
`,Ra=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  margin-bottom: 7px;

  span {
    color: var(--gray-600);
    font-size: 13px;
    font-weight: 600;
    text-align: center;
  }
`,za=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: 4px;
`,Ba=r.button`
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
`,$=(e,t,n)=>new Date(Date.UTC(e,t,n)),Va=e=>$(e.getUTCFullYear(),e.getUTCMonth(),1),Ha=(e,t)=>$(e.getUTCFullYear(),e.getUTCMonth()+t,1),Ua=({selectedDate:e,onDateSelect:t})=>{let{language:n,weekStartDay:r}=Q(),[i,a]=(0,R.useState)(()=>Va(e));(0,R.useEffect)(()=>{a(Va(e))},[e]);let o=(0,R.useMemo)(()=>new Intl.DateTimeFormat(n,{month:`long`,year:`numeric`,timeZone:`UTC`}),[n]),s=(0,R.useMemo)(()=>new Intl.DateTimeFormat(n,{weekday:`narrow`,timeZone:`UTC`}),[n]),c=(0,R.useMemo)(()=>Array.from({length:7},(e,t)=>s.format($(2023,0,1+r+t))),[r,s]),l=(0,R.useMemo)(()=>{let e=i.getUTCFullYear(),t=i.getUTCMonth(),n=$(e,t,1),a=$(e,t+1,0),o=(n.getUTCDay()-r+7)%7,s=((r+6)%7-a.getUTCDay()+7)%7,c=o+a.getUTCDate()+s;return Array.from({length:c},(n,r)=>$(e,t,1-o+r))},[i,r]),u=g(new Date);return(0,J.jsxs)(Fa,{children:[(0,J.jsxs)(Ia,{children:[(0,J.jsx)(La,{"aria-label":Craft.t(`calendar`,`Previous month`),type:`button`,onClick:()=>a(e=>Ha(e,-1))}),(0,J.jsx)(`span`,{children:o.format(i)}),(0,J.jsx)(La,{"aria-label":Craft.t(`calendar`,`Next month`),type:`button`,$next:!0,onClick:()=>a(e=>Ha(e,1))})]}),(0,J.jsx)(Ra,{children:c.map((e,t)=>(0,J.jsx)(`span`,{children:e},`${e}-${t}`))}),(0,J.jsx)(za,{children:l.map(e=>{let r=g(e);return(0,J.jsx)(Ba,{"aria-label":e.toLocaleDateString(n,{timeZone:`UTC`}),type:`button`,$isCurrentMonth:e.getUTCMonth()===i.getUTCMonth(),$isToday:r===u,onClick:()=>t(e),children:e.getUTCDate()},r)})})]})},Wa=h`
  100% {
    transform: translateX(100%);
  }
`,Ga=r.div`
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

    animation: ${Wa} 1.4s ${ze.easeInOut} infinite;
  }
`,Ka=({width:e=`100%`,height:t=16,borderRadius:n=4,className:r})=>(0,J.jsx)(Ga,{"aria-hidden":`true`,className:r,style:{borderRadius:n,height:t,width:e}}),qa=async e=>{let t=await N(Yr(`/api/calendars`),{signal:e});if(!t.ok)throw Error(`Failed to fetch calendars`);return t.json()},Ja=()=>{let[e,t]=(0,R.useState)([]),[n,r]=(0,R.useState)(null),[i,a]=(0,R.useState)(!1),o=(0,R.useCallback)(async e=>{a(!0),r(null);try{let n=await qa(e);t(n)}catch(e){if(e instanceof DOMException&&e.name===`AbortError`)return;r(e instanceof Error?e:Error(`Failed to fetch calendars`))}finally{a(!1)}},[]);return(0,R.useEffect)(()=>{let e=new AbortController;return o(e.signal),()=>{e.abort()}},[o]),{data:e,error:n,isPending:i,refetch:o}},Ya=r.div`
  padding: 0;
`,Xa=r.div`
  display: flex;
  flex-direction: column;
`,Za=r.hr`
  width: 100%;
  margin: 16px 0;
  border: 0;
  border-top: 1px solid var(--gray-200);
`,Qa=r.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0;
  padding: 0;

  list-style: none;
`,$a=r.li`
  margin: 0;
`,eo=r.label`
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0;

  border-radius: 4px;

  color: ${Le.gray800};
  cursor: pointer;
`,to=r.input`
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
`,no=r.span`
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
`,ro=r.span`
  font-size: 13px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,io=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ao=r.div`
  font-size: 13px;
  color: ${Le.error};
`,oo=({hiddenCalendarIds:e,onToggleCalendar:t})=>{let{data:n,error:r,isPending:i}=Ja(),a=new Set(e),o=i&&n.length===0;return(0,J.jsxs)(Ya,{children:[o&&(0,J.jsxs)(io,{children:[(0,J.jsx)(Ka,{height:16}),(0,J.jsx)(Ka,{height:16}),(0,J.jsx)(Ka,{height:16})]}),!o&&r&&(0,J.jsx)(ao,{children:r.message}),!o&&!r&&(0,J.jsx)(Qa,{children:n.map(e=>(0,J.jsx)($a,{children:(0,J.jsxs)(eo,{style:{"--calendar-color":e.color.base,"--calendar-color-contrast":e.color.contrast},children:[(0,J.jsx)(to,{type:`checkbox`,checked:!a.has(e.id),onChange:()=>t(e.id)}),(0,J.jsx)(no,{}),(0,J.jsx)(ro,{children:e.title})]})},e.id))})]})},so=()=>{let e=document.querySelector(`[data-sidebar-root]`),{hiddenCalendarIds:t,toggleCalendarVisibility:n}=Qi(),{currentDay:r}=Q(),[i,a]=(0,R.useState)(()=>new Date(r)),[o,s]=(0,R.useState)(null);return(0,J.jsxs)(ai,{children:[(0,J.jsx)(Pa,{hiddenCalendarIds:t,selectedDate:i,onDateChange:a,miniDateSelection:o,onMiniDateSelectionHandled:()=>s(null)}),e&&(0,oi.createPortal)((0,J.jsxs)(Xa,{children:[(0,J.jsx)(oo,{hiddenCalendarIds:t,onToggleCalendar:n}),(0,J.jsx)(Za,{}),(0,J.jsx)(Ua,{selectedDate:i,onDateSelect:e=>{a(e),s(e)}})]}),e)]})},co=document.getElementById(`calendar-overview`),lo=co.querySelector(`[data-root]`),uo=co.querySelector(`[data-config]`),fo=JSON.parse(uo?.textContent||`{}`);Xr.createRoot(lo).render((0,J.jsx)(ea,{config:fo,children:(0,J.jsx)(wr,{basename:Yr(`/`,!1),children:(0,J.jsx)(Ln,{children:(0,J.jsxs)(Fn,{path:`/`,element:(0,J.jsx)(Wr,{}),children:[(0,J.jsx)(Fn,{index:!0,element:(0,J.jsx)(so,{})}),(0,J.jsx)(Fn,{path:`overview`,element:(0,J.jsx)(so,{})}),(0,J.jsx)(Fn,{path:`:year/:month/:day/:view?`,element:(0,J.jsx)(so,{})})]})})})}));