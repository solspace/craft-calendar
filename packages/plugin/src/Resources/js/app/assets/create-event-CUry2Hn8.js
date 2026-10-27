import{a as e,d as t,i as n,l as r,r as i,s as a,t as o,u as s}from"./translations-BT7AJKOt.js";import{r as c,t as l}from"./http-CmK6H-J6.js";import{P as u,R as d,b as f,n as p,t as m,x as h}from"./clsx-DI7HwU81.js";import{a as g,d as _,i as v,t as y}from"./date-picker-DQGXkhFQ.js";import{t as b}from"./dist-D-CrGMuv.js";import{c as x,i as S,l as C,s as ee,u as te}from"./calendar.create-session-BTPY824N.js";import{a as w,t as ne}from"./overlap-warning-Bvuu2odu.js";import{C as T,S as E,a as D,b as re,r as O,v as k,w as ie}from"./calendar-preview.operations-BVVfoGKI.js";import{t as A}from"./components-BB-HKS5a.js";var j=s(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),M=s((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),N=s(((e,t)=>{var n=j(),r=M(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function u(e){return(e||``).toString().replace(i,``)}var d=[[`#`,`hash`],[`?`,`query`],function(e,t){return m(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],f={hash:1,query:1};function p(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new _(unescape(e.pathname),{});else if(r===`string`)for(i in n=new _(e,{}),f)delete n[i];else if(r===`object`){for(i in e)i in f||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function m(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function h(e,t){e=u(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):m(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&m(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||m(r),slashesCount:s,rest:l}}function g(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function _(e,t,i){if(e=u(e),e=e.replace(a,``),!(this instanceof _))return new _(e,t,i);var o,s,c,f,v,y,b=d.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=p(t),s=h(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||l.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!m(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(f=b[C],typeof f==`function`){e=f(e,S);continue}c=f[0],y=f[1],c===c?typeof c==`string`?(v=c===`@`?e.lastIndexOf(c):e.indexOf(c),~v&&(typeof f[2]==`number`?(S[y]=e.slice(0,v),e=e.slice(v+f[2])):(S[y]=e.slice(v),e=e.slice(0,v)))):(v=c.exec(e))&&(S[y]=v[1],e=e.slice(0,v.index)):S[y]=e,S[y]=S[y]||o&&f[3]&&t[y]||``,f[4]&&(S[y]=S[y].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=g(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&m(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(v=S.auth.indexOf(`:`),~v?(S.username=S.auth.slice(0,v),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(v+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&m(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function v(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&m(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function y(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||m(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&m(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}_.prototype={set:v,toString:y},_.extractProtocol=h,_.location=p,_.trimLeft=u,_.qs=r,t.exports=_})),P=t(r()),F=a(),I=t(N()),L=window.location.href.match(/^(.*?\/calendar)(?=\/|$)/i)?.[1]??window.location.href.replace(/\/[^/]*$/,``),R=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,I.default)(`${L}${e}`);return t?n.href:n.pathname},z=(0,P.createContext)(null),B=({config:e,children:t})=>{let n=(0,P.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,F.jsx)(z.Provider,{value:n,children:t})},V=()=>{let e=(0,P.useContext)(z);if(!e)throw Error(`ConfigContext is not provided`);return e},ae=({value:e,placeholder:t,autofocus:n,className:r,onChange:i,...a})=>{let o=(0,P.useRef)(null);return(0,P.useEffect)(()=>{n&&setTimeout(()=>{o.current?.focus()},10)},[n]),(0,F.jsx)(g,{...a,children:(0,F.jsx)(`input`,{ref:o,id:a.id,"aria-required":a.required||void 0,type:`text`,className:m(`text`,r),placeholder:t,value:e??``,onChange:e=>i?.(e.target.value)})})},oe=({options:e,value:t,onChange:n})=>{let r=(0,P.useId)(),i=(0,P.useRef)(null),a=(0,P.useRef)(null),s=(0,P.useRef)(n),c=JSON.stringify(e),l=e.find(e=>e.value===t);return(0,P.useEffect)(()=>{s.current=n},[n]),(0,P.useEffect)(()=>{let e=i.current;if(!e)return;let t=document.createElement(`div`);t.className=`menu calendar-quick-create-menu`,t.style.minWidth=`${e.getBoundingClientRect().width}px`,t.setAttribute(`aria-label`,o(`Calendar`)),a.current=t;let n=document.createElement(`ul`);t.append(n),JSON.parse(c).forEach(e=>{let t=document.createElement(`li`),r=document.createElement(`a`);r.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),r.append(i,document.createTextNode(e.label)),t.append(r),n.append(t)}),e.after(t);let r=new Garnish.MenuBtn(e,{onOptionSelect:t=>{r.hideMenu(),s.current(Number(t.dataset.calendarId)),e.focus()}}),l=t=>{t.key===`Escape`&&r.showingMenu&&(t.preventDefault(),t.stopPropagation(),r.hideMenu(),e.focus())};return document.addEventListener(`keydown`,l,!0),()=>{document.removeEventListener(`keydown`,l,!0),r.hideMenu(),r.destroy(),t.remove(),a.current=null}},[c]),(0,P.useEffect)(()=>{a.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let n=Number(e.dataset.calendarId)===t;e.classList.toggle(`sel`,n),e.setAttribute(`aria-selected`,String(n))})},[t,c]),(0,F.jsxs)(g,{label:o(`Calendar`),id:r,required:!0,children:[(0,F.jsx)(U,{}),(0,F.jsxs)(W,{ref:i,id:r,type:`button`,className:`btn menubtn fullwidth`,"aria-required":`true`,children:[(0,F.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:l?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,F.jsx)(`span`,{className:`calendar-name`,children:l?.label})]})]})},H=n`
  display: inline-block;
  flex: 0 0 10px;
  width: 10px;
  height: 10px;
  margin: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.6);
`,U=i`
  .menu.calendar-quick-create-menu [data-calendar-id] {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .calendar-quick-create-menu .color-indicator { ${H} }
`,W=e.button`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 7px;
    text-align: start;
  }

  .color-indicator {
    ${H}
  }

  .calendar-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,G=e=>Math.floor(e/86400)*86400,K=e=>Math.max(G(e.start),G(e.recurrence?.until??e.start))+(e.allDay?0:e.start-G(e.start)),q=e=>{let t=e.recurrence;if(!t||t.type===`NEVER`||!se(e))return;let n=t.type===`WEEKDAYS`,r=t.type===`WEEKDAYS`?`CUSTOM`:t.type,i={DAILY:T.DAILY,WEEKDAYS:T.WEEKLY,WEEKLY:T.WEEKLY,MONTHLY:T.MONTHLY,YEARLY:T.YEARLY}[t.type],a=t.endType===`ON_DATE`?K(e):void 0,o=t.endType===`AFTER`?t.count:void 0,s=new Date(e.start*1e3),c=new E({dtstart:s,freq:i,interval:1,...n&&{byweekday:[E.MO,E.TU,E.WE,E.TH,E.FR]},...t.type===`WEEKLY`&&{byweekday:[(s.getUTCDay()+6)%7]},...t.type===`MONTHLY`&&{bymonthday:s.getUTCDate()},...t.type===`YEARLY`&&{bymonth:s.getUTCMonth()+1,bymonthday:s.getUTCDate()},count:o,until:a===void 0?void 0:new Date(a*1e3)});return{repeatType:r,repeatEndType:t.endType,rrule:k(c.toString(),e.allDay),...a!==void 0&&{until:a}}},se=e=>!e.recurrence||e.recurrence.type===`NEVER`||e.recurrence.endType!==`AFTER`||Number.isSafeInteger(e.recurrence.count)&&(e.recurrence.count??0)>=1,J=e=>e?/(?:^|;)COUNT=\d+/i.test(e)?`AFTER`:/(?:^|;)UNTIL=/i.test(e)?`ON_DATE`:`NEVER`:`NEVER`,ce=e=>{if(e.recurrence)return q(e)??{repeatType:`NEVER`,repeatEndType:`NEVER`};if(!e.repeatType||e.repeatType===`NEVER`)return{repeatType:`NEVER`,repeatEndType:`NEVER`};let t=J(e.rrule),n=t===`NEVER`?e.repeatEndType||`NEVER`:t;return{repeatType:e.repeatType,repeatEndType:n,rrule:e.rrule||``,...n===`ON_DATE`&&e.until!=null?{until:e.until}:{}}},le=(e,t,n,r)=>({title:e.title||o(`New Event`),start:e.start,end:e.end,allDay:e.allDay,calendarId:t,siteId:n,...ce(e),...r&&{details:r}}),ue=({refetchEvents:e,onSuccess:t,getUrl:n=R})=>{let{hidePopover:r}=c(),{currentSiteId:i}=V(),[a,s]=(0,P.useState)(null),[u,d]=(0,P.useState)(null),f=(0,P.useCallback)(async(a,c,u,f)=>{s(f?`prepare`:`create`),d(null);try{let s=le(a,c,i,u);f&&(s.title=a.title);let d=await l(n(f?`/api/events/prepare`:`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(s)});if(!d.ok){let e=null;try{e=await d.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}let p=await d.json();if(f){if(typeof p?.url!=`string`||!p.url)throw Error(o(`Couldn’t create event.`));return p.url}return w(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),e?.(),t?.(p),r(),null}catch(e){return e instanceof Error?d(e.message):d(`Failed to create event`),null}finally{s(null)}},[r,t,e,i,n]);return{createEvent:(e,t,n)=>f(e,t,n,!1),prepareEvent:(e,t,n)=>f(e,t,n,!0),error:u,isFetching:a!==null,isOpeningEditor:a===`prepare`}},de=e.div`
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
`,fe=e.div`
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  padding: 15px;
`,pe=e(A)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,me=e.div`
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
`,he=e.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Y=e.div`
  display: grid;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  background: var(--gray-50);
`,X=e.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px;

  > .field { flex: 1 1 140px; min-width: 0; }
  input { width: 100%; }
`,Z=e.p`
  && { margin: 0; }
  font-size: 12px;
  line-height: 1.5;
  color: var(--light-text-color);
`,ge=e.label`
  font-weight: 600;
  cursor: pointer;
`,_e=e(A)`
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  border-top: 1px solid var(--gray-200);
  padding: 12px 15px;

  @media (max-height: 600px) {
    padding-block: 10px;
  }
`,ve=e.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  .btn + .btn {
    margin-inline-start: 0;
  }
`,ye=e.button`
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
`,be=({draft:e,onChange:t,formats:n,weekStartDay:r,disabled:i})=>{let a=(0,P.useId)(),s=e.recurrence??{type:`NEVER`,endType:`NEVER`},c=d(e.start),l=n.date.short.icu??`P`,m=h(),b=q(e),x=b?D(O(b.rrule,e.start),l):null,S=[{value:`NEVER`,label:o(`Does not repeat`)},{value:`DAILY`,label:o(`Every Day`)},{value:`WEEKDAYS`,label:o(`Weekdays (Monday–Friday)`)},{value:`WEEKLY`,label:o(`Weekly on {weekday}`,{weekday:p(c,`EEEE`,{locale:m})})},{value:`MONTHLY`,label:o(`Monthly on day {day}`,{day:c.getDate()})},{value:`YEARLY`,label:o(`Yearly on {date}`,{date:new Intl.DateTimeFormat(f(),{month:`long`,day:`numeric`}).format(c)})}];return(0,F.jsxs)(Y,{children:[(0,F.jsx)(g,{label:`Repeat`,id:`${a}-repeat`,children:(0,F.jsx)(`div`,{className:`select fullwidth`,children:(0,F.jsx)(`select`,{id:`${a}-repeat`,className:`fullwidth`,value:s.type,disabled:i,onChange:n=>t({...e,recurrence:{...s,type:n.target.value}}),children:S.map(({value:e,label:t})=>(0,F.jsx)(`option`,{value:e,children:t},e))})})}),s.type!==`NEVER`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(X,{children:[(0,F.jsx)(g,{label:`Repeat ends`,id:`${a}-ends`,children:(0,F.jsx)(`div`,{className:`select fullwidth`,children:(0,F.jsxs)(`select`,{id:`${a}-ends`,className:`fullwidth`,value:s.endType,disabled:i,onChange:n=>t({...e,recurrence:{...s,endType:n.target.value,count:s.count??10,until:s.until??u(_(c,1))}}),children:[(0,F.jsx)(`option`,{value:`NEVER`,children:o(`Never`)}),(0,F.jsx)(`option`,{value:`ON_DATE`,children:o(`On a date`)}),(0,F.jsx)(`option`,{value:`AFTER`,children:o(`After...`)})]})})}),s.endType===`AFTER`&&(0,F.jsx)(g,{label:`Occurrences`,id:`${a}-count`,required:!0,children:(0,F.jsx)(`input`,{id:`${a}-count`,className:`text fullwidth`,type:`number`,min:1,step:1,required:!0,disabled:i,value:s.count??``,onChange:n=>t({...e,recurrence:{...s,count:n.target.value===``?void 0:n.target.valueAsNumber}})})}),s.endType===`ON_DATE`&&(0,F.jsx)(y,{portal:!0,id:`${a}-until`,label:o(`Last date`),value:K(e),required:!0,datePickerProps:{disabled:i,showIcon:!0,icon:(0,F.jsx)(v,{}),toggleCalendarOnIconClick:!0,dateFormat:l,minDate:c,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:r},onChange:n=>{n!==null&&t({...e,recurrence:{...s,until:n}})}})]}),x&&(0,F.jsx)(Z,{role:`status`,"aria-live":`polite`,children:x})]})]})},xe=e=>Craft.getCpUrl(`calendar${e}`),Q=({draft:e,onChange:t,refetchEvents:n,onConfirm:r,onCancel:i,variant:a=`popover`,showMoreDetails:s=!0})=>{let{currentSiteId:c,showOverlapWarnings:l,calendars:u,calendarColors:f,calendarAllowRepeating:p,quickCreateFields:h,quickCreateRequiredFields:_,formats:w,weekStartDay:T,eventDuration:E,timeInterval:D}=V(),O=(0,P.useId)(),k=(0,P.useMemo)(()=>Object.entries(u).map(([e,t])=>({value:Number(e),label:t,color:f?.[Number(e)]})),[u,f]),[A,j]=(0,P.useState)(e.calendarId&&k.some(t=>t.value===e.calendarId)?e.calendarId:k[0]?.value??0),[M,N]=(0,P.useState)(()=>{if(!e.calendarId)return{};let t=h?.[e.calendarId];if(!t)return{};let n={};return t.location&&e.location&&(n[t.location]=e.location),t.description&&e.description&&(n[t.description]=e.description),Object.keys(n).length?{[e.calendarId]:n}:{}}),I=p?.[A]??!1,L=I||!e.recurrence&&!e.rrule?e:{...e,recurrence:void 0,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,until:void 0},R=se(L),z=ce(L),B=h?.[A],H=B?.location,U=B?.description,W=_?.[A],G=M[A]??{},K=(0,P.useMemo)(()=>!I||e.recurrence||!e.rrule||e.repeatType===`NEVER`?null:re(e.rrule),[I,e.recurrence,e.repeatType,e.rrule]),q=H||U?{...H&&{location:G[H]??``},...U&&{description:G[U]??``}}:void 0,J=(e,t)=>{N(n=>({...n,[A]:{...n[A],[e]:t}}))},{createEvent:le,prepareEvent:Y,error:X,isFetching:Z,isOpeningEditor:Q}=ue({refetchEvents:n,onSuccess:r,getUrl:a===`widget`?xe:void 0}),$=(0,P.useMemo)(()=>e.allDay?w.date.short.icu:w.datetime.short.icu,[w,e.allDay]),Se=(0,P.useMemo)(()=>S(e),[e]);return b(`keydown`,e=>{a===`popover`&&e.key===`Escape`&&!Z&&i()}),(0,F.jsxs)(de,{"data-quick-create-variant":a,children:[(0,F.jsxs)(fe,{children:[(0,F.jsx)(pe,{children:(0,F.jsx)(ae,{label:o(`Title`),id:`${O}-title`,required:!0,autofocus:a===`popover`,value:e.title,placeholder:o(`Event Title`),onChange:n=>t(te(e,n))})}),(0,F.jsxs)(me,{children:[(0,F.jsx)(oe,{value:A,options:k,onChange:n=>{j(n),!p?.[n]&&(e.recurrence||e.rrule)&&t({...e,recurrence:void 0,repeatType:`NEVER`,repeatEndType:`NEVER`,rrule:void 0,until:void 0})}}),(0,F.jsx)(`hr`,{}),(0,F.jsxs)(he,{children:[(0,F.jsx)(ie,{enabled:e.allDay,onClick:n=>t(ee(e,n,{eventDuration:E}))}),(0,F.jsx)(ge,{onClick:()=>t(ee(e,!e.allDay,{eventDuration:E})),children:o(`All Day`)})]}),(0,F.jsx)(y,{portal:!0,id:`${O}-start`,required:!0,label:o(`Starts`),value:e.start,datePickerProps:{showIcon:!0,icon:(0,F.jsx)(v,{}),toggleCalendarOnIconClick:!0,dateFormat:$,timeFormat:w.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:T,timeIntervals:D},onChange:n=>{n!==null&&t(C(e,n,{eventDuration:E}))}}),(0,F.jsx)(y,{portal:!0,id:`${O}-end`,required:!0,label:o(`Ends`),value:Se,datePickerProps:{showIcon:!0,icon:(0,F.jsx)(v,{}),toggleCalendarOnIconClick:!0,minDate:d(e.start),dateFormat:$,timeFormat:w.time.short.icu,showTimeSelect:!e.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:T,timeIntervals:D,filterTime:t=>{if(!e.start)return!0;let n=d(e.start),r=new Date(t);return n.getTime()<r.getTime()}},onChange:n=>{n!==null&&t(x(e,n,{eventDuration:E}))}}),K&&(0,F.jsxs)(`p`,{children:[(0,F.jsxs)(`b`,{children:[o(`Repeats`),`:`]}),` `,K]}),I&&!K&&(0,F.jsx)(be,{draft:e,onChange:t,formats:w,weekStartDay:T,disabled:Z}),(0,F.jsx)(ne,{formats:w,enabled:l&&!!A&&R,schedule:{start:e.start,end:e.allDay?e.end-1:e.end,allDay:e.allDay,calendarId:A,siteId:c,...z}}),(H||U)&&(0,F.jsx)(`hr`,{}),H&&(0,F.jsx)(g,{label:o(`Location`),id:`${O}-location`,required:W?.location,children:(0,F.jsx)(`input`,{id:`${O}-location`,type:`text`,className:`text fullwidth`,disabled:Z,"aria-required":W?.location||void 0,value:G[H]??``,onChange:e=>J(H,e.target.value)})}),U&&(0,F.jsx)(g,{label:o(`Description`),id:`${O}-description`,required:W?.description,children:(0,F.jsx)(`textarea`,{id:`${O}-description`,className:`text fullwidth`,rows:3,disabled:Z,"aria-required":W?.description||void 0,value:G[U]??``,onChange:e=>J(U,e.target.value)})})]}),X&&(0,F.jsx)(`p`,{className:`error`,role:`alert`,children:X})]}),(0,F.jsxs)(_e,{$justifyContent:`flex-end`,$gap:8,children:[s&&(0,F.jsx)(ye,{type:`button`,disabled:!A||Z||!R,onClick:async()=>{let e=await Y(L,A,q);e&&(window.location.href=e)},children:o(Q?`Processing...`:`More details…`)}),(0,F.jsxs)(ve,{children:[a===`popover`&&(0,F.jsx)(`button`,{type:`button`,className:m(`btn`,Z&&`disabled`),disabled:Z,onClick:i,children:o(`Cancel`)}),(0,F.jsx)(`button`,{type:`button`,className:m(`btn submit`,Z&&`disabled`),disabled:!e.title.trim()||!A||Z||!R,onClick:()=>le(L,A,q),children:o(Z&&!Q?`Creating Event...`:`Create Event`)})]})]})]})},$=Q;export{fe as a,B as c,_e as i,V as l,Q as n,pe as o,he as r,Y as s,$ as t,R as u};