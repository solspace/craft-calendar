import{c as e,i as t,l as n,o as r,s as i,t as a,u as o}from"./translations-CPvEMAbD.js";import{t as s}from"./http-bwzZaFVT.js";import{t as c}from"./components-DAVK9kbC.js";var l=n(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),u=n((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),d=n(((e,t)=>{var n=l(),r=u(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,d=/^[a-zA-Z]:/;function f(e){return(e||``).toString().replace(i,``)}var p=[[`#`,`hash`],[`?`,`query`],function(e,t){return g(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],m={hash:1,query:1};function h(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new y(unescape(e.pathname),{});else if(r===`string`)for(i in n=new y(e,{}),m)delete n[i];else if(r===`object`){for(i in e)i in m||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function g(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function _(e,t){e=f(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):g(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&g(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||g(r),slashesCount:s,rest:l}}function v(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function y(e,t,i){if(e=f(e),e=e.replace(a,``),!(this instanceof y))return new y(e,t,i);var o,s,c,l,u,m,b=p.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=h(t),s=_(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||d.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!g(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(l=b[C],typeof l==`function`){e=l(e,S);continue}c=l[0],m=l[1],c===c?typeof c==`string`?(u=c===`@`?e.lastIndexOf(c):e.indexOf(c),~u&&(typeof l[2]==`number`?(S[m]=e.slice(0,u),e=e.slice(u+l[2])):(S[m]=e.slice(u),e=e.slice(0,u)))):(u=c.exec(e))&&(S[m]=u[1],e=e.slice(0,u.index)):S[m]=e,S[m]=S[m]||o&&l[3]&&t[m]||``,l[4]&&(S[m]=S[m].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=v(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&g(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(u=S.auth.indexOf(`:`),~u?(S.username=S.auth.slice(0,u),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(u+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&g(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function b(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<p.length;l++){var u=p[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&g(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function x(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||g(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&g(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}y.prototype={set:b,toString:x},y.extractProtocol=_,y.location=h,y.trimLeft=f,y.qs=r,t.exports=y})),f=o(e()),p=o(i()),m=r(),h=o(d()),g=window.location.href.replace(/(.*\/calendar).*/i,`$1`),_=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,h.default)(`${g}${e}`);return t?n.href:n.pathname},v={positions:[`bottom`],alignment:`start`,gap:8,padding:8},y=(e,t,n)=>n<=t?t:Math.min(Math.max(e,t),n),b=(e,t,n,r)=>{switch(r){case`center`:return e+(t-n)/2;case`end`:return e+t-n;default:return e}},x=(e,t,n,r,i)=>{switch(e){case`top`:return{position:e,top:t.top-n.height-r,left:b(t.left,t.width,n.width,i)};case`right`:return{position:e,top:b(t.top,t.height,n.height,i),left:t.right+r};case`left`:return{position:e,top:b(t.top,t.height,n.height,i),left:t.left-n.width-r};default:return{position:`bottom`,top:t.bottom+r,left:b(t.left,t.width,n.width,i)}}},S=(e,t,n,r,i)=>{let a=e.top,o=e.left,s=a+t.height,c=o+t.width;return a>=i&&o>=i&&s<=r-i&&c<=n-i},C=(e,t,n,r,i)=>{let a=r-i-t.height,o=n-i-t.width;return{...e,top:y(e.top,i,a),left:y(e.left,i,o)}},w=(e,t,n)=>{let r=e.left,i=e.top,a=r+t.width,o=i+t.height;return Math.max(0,Math.min(a,n.right)-Math.max(r,n.left))*Math.max(0,Math.min(o,n.bottom)-Math.max(i,n.top))},T=e=>{if(!e)return v;let t=Array.isArray(e.position)?e.position:e.position?[e.position]:v.positions;return{positions:t.length?t:v.positions,alignment:e.alignment??v.alignment,gap:e.gap??v.gap,padding:e.padding??v.padding,closeDelayMs:e.closeDelayMs}},E=({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i})=>{let a=i.positions.map(n=>x(n,e,t,i.gap,i.alignment)),o=a.find(e=>S(e,t,n,r,i.padding));if(o)return o;let s=a.map(e=>C(e,t,n,r,i.padding)),c=s[0],l=w(c,t,e);for(let n of s.slice(1)){let r=w(n,t,e);r<l&&(c=n,l=r)}return c},D=e=>{switch(e){case`top`:return`bottom`;case`right`:return`left`;case`left`:return`right`;default:return`top`}},O=({placement:e,anchorRect:t,popoverRect:n,arrowPadding:r})=>{let i=D(e.position);return i===`top`||i===`bottom`?{side:i,left:y(t.left+t.width/2-e.left,r,n.width-r)}:{side:i,top:y(t.top+t.height/2-e.top,r,n.height-r)}},k=({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i,arrowPadding:a})=>{let o=E({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i});return{top:o.top,left:o.left,position:o.position,arrow:O({placement:o,anchorRect:e,popoverRect:t,arrowPadding:a})}},A=14,j=e=>{if(e instanceof MouseEvent){let t=e.target;if(t instanceof HTMLElement){let n=t.getBoundingClientRect(),r=n.left+e.offsetX,i=n.top+e.offsetY;return new DOMRect(r,i,1,1)}return new DOMRect(e.clientX,e.clientY,1,1)}return e.getBoundingClientRect()},M=({state:e,popoverRef:t})=>{let[n,r]=(0,f.useState)(),i=(0,f.useMemo)(()=>{if(e)return T(e.options)},[e]),a=(0,f.useCallback)(()=>{if(!e||!i){r(void 0);return}let n=t.current;if(!n)return;let a=j(e.anchor),o=n.getBoundingClientRect();r(k({anchorRect:a,popoverRect:o,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:i,arrowPadding:A}))},[e,i,t]);return(0,f.useLayoutEffect)(()=>{a()},[a]),(0,f.useEffect)(()=>{if(!e)return;let t=()=>a();return window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0)}},[e,a]),n},N=t.div`
  position: relative;
`,P=t.div`
  position: fixed;
  top: 0;
  left: 0;
  /* Above Craft CP header / action buttons when anchored there */
  z-index: 1000;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`,F=t.span`
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
`,I=(0,f.createContext)(null),ee=()=>{let e=(0,f.useContext)(I);if(!e)throw Error(`usePopover must be used within a PopoverProvider`);return e},L=({children:e})=>{let[t,n]=(0,f.useState)(),r=(0,f.useRef)(null),i=(0,f.useRef)(void 0),a=(0,f.useRef)(!1),o=(0,f.useCallback)((e,t,r)=>{clearTimeout(i.current),a.current=!1,n({content:e,anchor:t,options:r})},[]),s=(0,f.useCallback)(()=>{clearTimeout(i.current),n(void 0)},[]),c=(0,f.useCallback)(()=>{clearTimeout(i.current),a.current=!0},[]),l=(0,f.useMemo)(()=>({showPopover:o,hidePopover:s,keepPopoverOpen:c}),[o,s,c]),u=M({state:t,popoverRef:r}),d=t?.options?.closeDelayMs,h=(0,f.useCallback)(()=>clearTimeout(i.current),[]),g=(0,f.useCallback)(()=>{d===void 0||a.current||(clearTimeout(i.current),i.current=setTimeout(()=>n(void 0),d))},[d]);(0,f.useEffect)(()=>{let e=t?.anchor;if(!(d===void 0||!(e instanceof HTMLElement)))return e.addEventListener(`mouseleave`,g),()=>e.removeEventListener(`mouseleave`,g)},[t,d,g]),(0,f.useEffect)(()=>()=>clearTimeout(i.current),[]);let _=t?.content?(0,m.jsxs)(P,{ref:r,onMouseEnter:h,onMouseLeave:g,style:{top:u?.top??0,left:u?.left??0,visibility:u?`visible`:`hidden`},children:[u&&(0,m.jsx)(F,{side:u.arrow.side,top:u.arrow.top,left:u.arrow.left}),t.content]}):null;return(0,m.jsx)(I.Provider,{value:l,children:(0,m.jsxs)(N,{children:[e,_&&(0,p.createPortal)(_,document.body)]})})},R=1440*60,z=`draft-create-event`,B=`New Event`,V=e=>Math.floor(e.getTime()/1e3),H=e=>{let t=new Date(e*1e3);return Math.floor(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())/1e3)},U=(e,t)=>e+t*R,W=e=>Math.max(1,e.eventDuration)*60,G=(e,t)=>e.preserveDuration?Math.max(60,e.end-e.start):W(t),K=e=>Math.max(1,Math.round((e.end-e.start)/R)),q=e=>!!(e&&typeof e==`object`&&`closest`in e&&e.closest),J=(e,t)=>{let n=V(e.start),r=V(e.end),i=e.allDay?r-n>R:H(r-1)>H(n),o=e.allDay?i:t.allDayDefault,s=i||!o&&!e.allDay&&r>n,c=o?H(n):e.allDay?H(n)+new Date().getHours()*60*60:n,l=o?U(i?H(r-1):c,1):s?r:c+W(t);return{id:z,title:a(B),allDay:o,start:c,end:l,preserveDuration:s}},Y=e=>({id:e.id,title:e.title,start:new Date(e.start*1e3),end:new Date(e.end*1e3),allDay:e.allDay,editable:!1,startEditable:!1,durationEditable:!1,extendedProps:{isDraftCreate:!0}}),X=e=>e.allDay?U(e.end,-1):e.end,Z=(e,t)=>({...e,title:t}),Q=(e,t,n)=>{if(e.allDay===t)return e;if(t){let t=H(e.start),n=U(H(e.end-1),1);return{...e,allDay:!0,start:t,end:Math.max(n,U(t,1))}}return{...e,allDay:!1,end:e.start+(e.preserveDuration?(K(e)-1)*R:0)+W(n)}},te=(e,t,n)=>{if(e.allDay){let n=H(t);return{...e,start:n,end:U(n,K(e))}}return{...e,start:t,end:t+G(e,n)}},ne=(e,t,n)=>{if(e.allDay){let n=U(H(t),1);return{...e,end:Math.max(n,U(H(e.start),1))}}return{...e,end:Math.max(t,e.start+(e.preserveDuration?60:W(n)))}},re=(e,t)=>{e.setProp(`title`,t.title),e.setAllDay(t.allDay,{maintainDuration:!1}),e.setDates(new Date(t.start*1e3),new Date(t.end*1e3),{allDay:t.allDay})},ie=e=>!!(e?.extendedProps&&`isDraftCreate`in e.extendedProps&&e.extendedProps.isDraftCreate),ae=(e,t)=>q(e)&&!!e.closest(t),oe=t.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  color: #fff;
  border: none;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%);
    color: #fff;
  }

  &:before {
    color: #fff;
  }
`,$=(0,f.forwardRef)(({connected:e=!0,label:t,icon:n=`create`,children:r,className:i,...o},s)=>{let c=r??(e?t??a(`Create with AI`):a(`Enable AI`)),l=n===`create`;return(0,m.jsx)(oe,{ref:s,type:`button`,className:[`btn`,`icon`,l&&`add`,i].filter(Boolean).join(` `),...l?{}:{"data-icon":`edit`},...o,children:c})});$.displayName=`AiButton`;var se=t.div`
  padding: 20px;
  min-width: 480px;
  max-width: 560px;

  h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }
`,ce=t.p`
  margin: 0 0 16px;
  color: var(--light-text-color, #596673);
  font-size: 13px;
  line-height: 1.5;
`,le=t.textarea`
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  border: 1px solid var(--hairline-color, #d6d9de);
  border-radius: 4px;
  background: var(--white, #fff);
  color: var(--text-color, #29323d);
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--focus-color, #0d78f2);
    box-shadow: 0 0 0 1px var(--focus-color, #0d78f2);
  }

  &::placeholder {
    color: var(--light-text-color, #8f98a3);
  }
`,ue=t.p`
  margin: 8px 0 0;
  color: var(--error-color, #cf1124);
  font-size: 13px;
`,de=t.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: 100%;
  margin-top: 12px;
`,fe=()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||void 0}catch{return}},pe=()=>{let[e,t]=(0,f.useState)(!1),[n,r]=(0,f.useState)(null);return{generateEvent:(0,f.useCallback)(async(e,n)=>{let i=e.trim();if(!i)return{success:!1,error:`Please describe the event.`};t(!0),r(null);try{let e=await s(_(`/api/ai/generate-event`),{method:`POST`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify({prompt:i,timezone:fe(),...n?{currentEvent:n}:{}})}),t=await e.text(),a=null;try{a=JSON.parse(t)}catch{let t=e.ok?`Invalid response from server.`:`Request failed (${e.status}).`;return r(t),{success:!1,error:t}}if(!e.ok||!a.success){let e=a.error??`Failed to generate event.`;return r(e),{success:!1,error:e}}return a}catch{let e=`Could not reach the Calendar AI endpoint.`;return r(e),{success:!1,error:e}}finally{t(!1)}},[]),isGenerating:e,error:n,clearError:()=>r(null)}},me=({onApplyDraft:e,onCancel:t,mode:n=`create`,currentEvent:r=null})=>{let[i,o]=(0,f.useState)(``),s=(0,f.useRef)(null),{generateEvent:l,isGenerating:u,error:d}=pe(),p=n===`edit`,h=a(p?`Update with AI`:`Create with AI`),g=a(p?`Say what to change (for example, move to next Tuesday or make it weekly). Everything else stays as it is.`:`Describe your event in plain language. AI will suggest dates, title, and details.`),_=a(p?`Apply Changes`:`Generate Event`),v=a(p?`e.g. Move to next Tuesday at 3pm`:`e.g. Team standup every Monday at 9am for 30 minutes`);(0,f.useEffect)(()=>{let e=window.setTimeout(()=>{s.current?.focus()},10);return()=>window.clearTimeout(e)},[]);let y=async()=>{let t=await l(i,p?r:null);if(!t.success)return;let{event:n}=t,a=Number(n.startTimestamp),o=Number(n.endTimestamp);!Number.isFinite(a)||!Number.isFinite(o)||o<=a||e({id:z,title:n.title,allDay:!!n.allDay,start:a,end:o,preserveDuration:!0,calendarId:n.calendarId,description:n.description,location:n.location,repeatType:n.repeatType||`NEVER`,repeatEndType:n.repeatEndType||`NEVER`,until:n.until??void 0,rrule:n.rrule||``,changedFields:n.changedFields})};return(0,m.jsxs)(se,{children:[(0,m.jsx)(`h3`,{children:h}),(0,m.jsx)(ce,{children:g}),(0,m.jsx)(le,{ref:s,value:i,rows:6,placeholder:v,onChange:e=>o(e.target.value),onKeyDown:e=>{(e.metaKey||e.ctrlKey)&&e.key===`Enter`&&i.trim()&&!u&&(e.preventDefault(),y())}}),d&&(0,m.jsx)(ue,{children:d}),(0,m.jsx)(c,{children:(0,m.jsxs)(de,{children:[(0,m.jsx)(`button`,{type:`button`,className:`btn`,onClick:t,disabled:u,children:a(`Cancel`)}),(0,m.jsx)(`button`,{type:`button`,className:`btn submit`,onClick:()=>void y(),disabled:u||!i.trim(),children:u?a(`Generating…`):_})]})})]})};export{_,X as a,Q as c,Z as d,re as f,E as g,T as h,J as i,ne as l,ee as m,$ as n,ie as o,L as p,Y as r,ae as s,me as t,te as u};