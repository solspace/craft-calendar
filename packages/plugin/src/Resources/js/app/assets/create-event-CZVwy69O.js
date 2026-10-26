import{C as e,F as t,H as n,J as r,K as i,U as a,W as o,X as s,Y as c,b as l,n as u,t as d,x as f,z as p}from"./clsx-i4RjRRj2.js";import{_ as m,a as h,t as g}from"./overlap-warning-DAofkiem.js";import{o as _}from"./calendar.now-indicator-BKaW0uu6.js";import{a as v,d as y,i as b,t as x}from"./date-picker-Bjh6aDMF.js";import{c as S,d as C,l as ee,o as w,r as te,s as ne}from"./calendar.create-session-pjL2bsU7.js";import{C as re,S as T,i as E,o as D,t as O,v as k,x as A}from"./components-gAeKq-bt.js";var ie=c(((e,t)=>{t.exports=function(e,t){if(t=t.split(`:`)[0],e=+e,!e)return!1;switch(t){case`http`:case`ws`:return e!==80;case`https`:case`wss`:return e!==443;case`ftp`:return e!==21;case`gopher`:return e!==70;case`file`:return!1}return e!==0}})),j=c((e=>{var t=Object.prototype.hasOwnProperty,n;function r(e){try{return decodeURIComponent(e.replace(/\+/g,` `))}catch{return null}}function i(e){try{return encodeURIComponent(e)}catch{return null}}function a(e){for(var t=/([^=?#&]+)=?([^&]*)/g,n={},i;i=t.exec(e);){var a=r(i[1]),o=r(i[2]);a===null||o===null||a in n||(n[a]=o)}return n}function o(e,r){r=r||``;var a=[],o,s;for(s in typeof r!=`string`&&(r=`?`),e)if(t.call(e,s)){if(o=e[s],!o&&(o===null||o===n||isNaN(o))&&(o=``),s=i(s),o=i(o),s===null||o===null)continue;a.push(s+`=`+o)}return a.length?r+a.join(`&`):``}e.stringify=o,e.parse=a})),M=c(((e,t)=>{var n=ie(),r=j(),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,a=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,s=/:\d+$/,c=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,l=/^[a-zA-Z]:/;function u(e){return(e||``).toString().replace(i,``)}var d=[[`#`,`hash`],[`?`,`query`],function(e,t){return m(t.protocol)?e.replace(/\\/g,`/`):e},[`/`,`pathname`],[`@`,`auth`,1],[NaN,`host`,void 0,1,1],[/:(\d*)$/,`port`,void 0,1],[NaN,`hostname`,void 0,1,1]],f={hash:1,query:1};function p(e){var t=(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{}).location||{};e=e||t;var n={},r=typeof e,i;if(e.protocol===`blob:`)n=new _(unescape(e.pathname),{});else if(r===`string`)for(i in n=new _(e,{}),f)delete n[i];else if(r===`object`){for(i in e)i in f||(n[i]=e[i]);n.slashes===void 0&&(n.slashes=o.test(e.href))}return n}function m(e){return e===`file:`||e===`ftp:`||e===`http:`||e===`https:`||e===`ws:`||e===`wss:`}function h(e,t){e=u(e),e=e.replace(a,``),t=t||{};var n=c.exec(e),r=n[1]?n[1].toLowerCase():``,i=!!n[2],o=!!n[3],s=0,l;return i?o?(l=n[2]+n[3]+n[4],s=n[2].length+n[3].length):(l=n[2]+n[4],s=n[2].length):o?(l=n[3]+n[4],s=n[3].length):l=n[4],r===`file:`?s>=2&&(l=l.slice(2)):m(r)?l=n[4]:r?i&&(l=l.slice(2)):s>=2&&m(t.protocol)&&(l=n[4]),{protocol:r,slashes:i||m(r),slashesCount:s,rest:l}}function g(e,t){if(e===``)return t;for(var n=(t||`/`).split(`/`).slice(0,-1).concat(e.split(`/`)),r=n.length,i=n[r-1],a=!1,o=0;r--;)n[r]===`.`?n.splice(r,1):n[r]===`..`?(n.splice(r,1),o++):o&&(r===0&&(a=!0),n.splice(r,1),o--);return a&&n.unshift(``),(i===`.`||i===`..`)&&n.push(``),n.join(`/`)}function _(e,t,i){if(e=u(e),e=e.replace(a,``),!(this instanceof _))return new _(e,t,i);var o,s,c,f,v,y,b=d.slice(),x=typeof t,S=this,C=0;for(x!==`object`&&x!==`string`&&(i=t,t=null),i&&typeof i!=`function`&&(i=r.parse),t=p(t),s=h(e||``,t),o=!s.protocol&&!s.slashes,S.slashes=s.slashes||o&&t.slashes,S.protocol=s.protocol||t.protocol||``,e=s.rest,(s.protocol===`file:`&&(s.slashesCount!==2||l.test(e))||!s.slashes&&(s.protocol||s.slashesCount<2||!m(S.protocol)))&&(b[3]=[/(.*)/,`pathname`]);C<b.length;C++){if(f=b[C],typeof f==`function`){e=f(e,S);continue}c=f[0],y=f[1],c===c?typeof c==`string`?(v=c===`@`?e.lastIndexOf(c):e.indexOf(c),~v&&(typeof f[2]==`number`?(S[y]=e.slice(0,v),e=e.slice(v+f[2])):(S[y]=e.slice(v),e=e.slice(0,v)))):(v=c.exec(e))&&(S[y]=v[1],e=e.slice(0,v.index)):S[y]=e,S[y]=S[y]||o&&f[3]&&t[y]||``,f[4]&&(S[y]=S[y].toLowerCase())}i&&(S.query=i(S.query)),o&&t.slashes&&S.pathname.charAt(0)!==`/`&&(S.pathname!==``||t.pathname!==``)&&(S.pathname=g(S.pathname,t.pathname)),S.pathname.charAt(0)!==`/`&&m(S.protocol)&&(S.pathname=`/`+S.pathname),n(S.port,S.protocol)||(S.host=S.hostname,S.port=``),S.username=S.password=``,S.auth&&(v=S.auth.indexOf(`:`),~v?(S.username=S.auth.slice(0,v),S.username=encodeURIComponent(decodeURIComponent(S.username)),S.password=S.auth.slice(v+1),S.password=encodeURIComponent(decodeURIComponent(S.password))):S.username=encodeURIComponent(decodeURIComponent(S.auth)),S.auth=S.password?S.username+`:`+S.password:S.username),S.origin=S.protocol!==`file:`&&m(S.protocol)&&S.host?S.protocol+`//`+S.host:`null`,S.href=S.toString()}function v(e,t,i){var a=this;switch(e){case`query`:typeof t==`string`&&t.length&&(t=(i||r.parse)(t)),a[e]=t;break;case`port`:a[e]=t,n(t,a.protocol)?t&&(a.host=a.hostname+`:`+t):(a.host=a.hostname,a[e]=``);break;case`hostname`:a[e]=t,a.port&&(t+=`:`+a.port),a.host=t;break;case`host`:a[e]=t,s.test(t)?(t=t.split(`:`),a.port=t.pop(),a.hostname=t.join(`:`)):(a.hostname=t,a.port=``);break;case`protocol`:a.protocol=t.toLowerCase(),a.slashes=!i;break;case`pathname`:case`hash`:if(t){var o=e===`pathname`?`/`:`#`;a[e]=t.charAt(0)===o?t:o+t}else a[e]=t;break;case`username`:case`password`:a[e]=encodeURIComponent(t);break;case`auth`:var c=t.indexOf(`:`);~c?(a.username=t.slice(0,c),a.username=encodeURIComponent(decodeURIComponent(a.username)),a.password=t.slice(c+1),a.password=encodeURIComponent(decodeURIComponent(a.password))):a.username=encodeURIComponent(decodeURIComponent(t))}for(var l=0;l<d.length;l++){var u=d[l];u[4]&&(a[u[1]]=a[u[1]].toLowerCase())}return a.auth=a.password?a.username+`:`+a.password:a.username,a.origin=a.protocol!==`file:`&&m(a.protocol)&&a.host?a.protocol+`//`+a.host:`null`,a.href=a.toString(),a}function y(e){(!e||typeof e!=`function`)&&(e=r.stringify);var t,n=this,i=n.host,a=n.protocol;a&&a.charAt(a.length-1)!==`:`&&(a+=`:`);var o=a+(n.protocol&&n.slashes||m(n.protocol)?`//`:``);return n.username?(o+=n.username,n.password&&(o+=`:`+n.password),o+=`@`):n.password?(o+=`:`+n.password,o+=`@`):n.protocol!==`file:`&&m(n.protocol)&&!i&&n.pathname!==`/`&&(o+=`@`),(i[i.length-1]===`:`||s.test(n.hostname)&&!n.port)&&(i+=`:`),o+=i+n.pathname,t=typeof n.query==`object`?e(n.query):n.query,t&&(o+=t.charAt(0)===`?`?t:`?`+t),n.hash&&(o+=n.hash),o}_.prototype={set:v,toString:y},_.extractProtocol=h,_.location=p,_.trimLeft=u,_.qs=r,t.exports=_})),N=s(r()),P=i(),F=s(M()),ae=window.location.href.replace(/(.*\/calendar).*/i,`$1`),I=(e,t=!0)=>{e=(e??``).replace(/\/+/g,`/`).replace(/^\/(.*)/,`$1`).replace(/\/$/,``),e=e.length?`/${e}`:``;let n=(0,F.default)(`${ae}${e}`);return t?n.href:n.pathname},L=(0,N.createContext)(null),R=({config:e,children:t})=>{let n=(0,N.useMemo)(()=>({...e,overlapThresholdString:`0${e.overlapThreshold||0}:00:00`}),[e]);return(0,P.jsx)(L.Provider,{value:n,children:t})},z=()=>{let e=(0,N.useContext)(L);if(!e)throw Error(`ConfigContext is not provided`);return e},oe=({value:e,placeholder:t,autofocus:n,className:r,onChange:i,...a})=>{let o=(0,N.useRef)(null);return(0,N.useEffect)(()=>{n&&setTimeout(()=>{o.current?.focus()},10)},[n]),(0,P.jsx)(v,{...a,children:(0,P.jsx)(`input`,{ref:o,id:a.id,"aria-required":a.required||void 0,type:`text`,className:d(`text`,r),placeholder:t,value:e??``,onChange:e=>i?.(e.target.value)})})},se=({options:t,value:n,onChange:r})=>{let i=(0,N.useId)(),a=(0,N.useRef)(null),o=(0,N.useRef)(null),s=(0,N.useRef)(r),c=JSON.stringify(t),l=t.find(e=>e.value===n);return(0,N.useEffect)(()=>{s.current=r},[r]),(0,N.useEffect)(()=>{let t=a.current;if(!t)return;let n=document.createElement(`div`);n.className=`menu calendar-quick-create-menu`,n.style.minWidth=`${t.getBoundingClientRect().width}px`,n.setAttribute(`aria-label`,e(`Calendar`)),o.current=n;let r=document.createElement(`ul`);n.append(r),JSON.parse(c).forEach(e=>{let t=document.createElement(`li`),n=document.createElement(`a`);n.dataset.calendarId=String(e.value);let i=document.createElement(`span`);i.className=`color-indicator`,i.style.backgroundColor=e.color||`var(--gray-400)`,i.setAttribute(`aria-hidden`,`true`),n.append(i,document.createTextNode(e.label)),t.append(n),r.append(t)}),t.after(n);let i=new Garnish.MenuBtn(t,{onOptionSelect:e=>{i.hideMenu(),s.current(Number(e.dataset.calendarId)),t.focus()}}),l=e=>{e.key===`Escape`&&i.showingMenu&&(e.preventDefault(),e.stopPropagation(),i.hideMenu(),t.focus())};return document.addEventListener(`keydown`,l,!0),()=>{document.removeEventListener(`keydown`,l,!0),i.hideMenu(),i.destroy(),n.remove(),o.current=null}},[c]),(0,N.useEffect)(()=>{o.current?.querySelectorAll(`[data-calendar-id]`).forEach(e=>{let t=Number(e.dataset.calendarId)===n;e.classList.toggle(`sel`,t),e.setAttribute(`aria-selected`,String(t))})},[n,c]),(0,P.jsxs)(v,{label:e(`Calendar`),id:i,required:!0,children:[(0,P.jsx)(V,{}),(0,P.jsxs)(H,{ref:a,id:i,type:`button`,className:`btn menubtn fullwidth`,"aria-required":`true`,children:[(0,P.jsx)(`span`,{className:`color-indicator`,style:{backgroundColor:l?.color||`var(--gray-400)`},"aria-hidden":`true`}),(0,P.jsx)(`span`,{className:`calendar-name`,children:l?.label})]})]})},B=a`
  display: inline-block;
  flex: 0 0 10px;
  width: 10px;
  height: 10px;
  margin: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.6);
`,V=n`
  .menu.calendar-quick-create-menu [data-calendar-id] {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .calendar-quick-create-menu .color-indicator { ${B} }
`,H=o.button`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 7px;
    text-align: start;
  }

  .color-indicator {
    ${B}
  }

  .calendar-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,U=e=>Math.floor(e/86400)*86400,W=e=>Math.max(U(e.start),U(e.recurrence?.until??e.start))+(e.allDay?0:e.start-U(e.start)),G=e=>{let t=e.recurrence;if(!t||t.type===`NEVER`||!K(e))return;let n=t.type===`WEEKDAYS`,r=t.type===`WEEKDAYS`?`CUSTOM`:t.type,i={DAILY:T.DAILY,WEEKDAYS:T.WEEKLY,WEEKLY:T.WEEKLY,MONTHLY:T.MONTHLY,YEARLY:T.YEARLY}[t.type],a=t.endType===`ON_DATE`?W(e):void 0,o=t.endType===`AFTER`?t.count:void 0,s=new Date(e.start*1e3),c=new A({dtstart:s,freq:i,interval:1,...n&&{byweekday:[A.MO,A.TU,A.WE,A.TH,A.FR]},...t.type===`WEEKLY`&&{byweekday:[(s.getUTCDay()+6)%7]},...t.type===`MONTHLY`&&{bymonthday:s.getUTCDate()},...t.type===`YEARLY`&&{bymonth:s.getUTCMonth()+1,bymonthday:s.getUTCDate()},count:o,until:a===void 0?void 0:new Date(a*1e3)});return{repeatType:r,repeatEndType:t.endType,rrule:k(c.toString(),e.allDay),...a!==void 0&&{until:a}}},K=e=>!e.recurrence||e.recurrence.type===`NEVER`||e.recurrence.endType!==`AFTER`||Number.isSafeInteger(e.recurrence.count)&&(e.recurrence.count??0)>=1,q=(t,n,r,i)=>({title:t.title||e(`New Event`),start:t.start,end:t.end,allDay:t.allDay,calendarId:n,siteId:r,...G(t),...i&&{details:i}}),ce=({refetchEvents:t,onSuccess:n,getUrl:r=I})=>{let{hidePopover:i}=_(),{currentSiteId:a}=z(),[o,s]=(0,N.useState)(null),[c,l]=(0,N.useState)(null),u=(0,N.useCallback)(async(o,c,u,d)=>{s(d?`prepare`:`create`),l(null);try{let s=q(o,c,a,u);d&&(s.title=o.title);let l=await m(r(d?`/api/events/prepare`:`/api/events`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(s)});if(!l.ok){let e=null;try{e=await l.json()}catch{}let t=e?.message||`Failed to create event`;throw Array.isArray(e?.errors)&&(t=e.errors.join(` `)),Error(t)}let f=await l.json();if(d){if(typeof f?.url!=`string`||!f.url)throw Error(e(`Couldn’t create event.`));return f.url}return h(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),t?.(),n?.(f),i(),null}catch(e){return e instanceof Error?l(e.message):l(`Failed to create event`),null}finally{s(null)}},[i,n,t,a,r]);return{createEvent:(e,t,n)=>u(e,t,n,!1),prepareEvent:(e,t,n)=>u(e,t,n,!0),error:c,isFetching:o!==null,isOpeningEditor:o===`prepare`}},le=o.div`
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
`,J=o.div`
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  padding: 15px;
`,Y=o(O)`
  align-items: center;

  padding-bottom: 15px;

  .field {
    flex: 1;
  }

  input.text {
    width: 100%;
  }
`,ue=o.div`
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
`,de=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,X=o.div`
  display: grid;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  background: var(--gray-50);
`,fe=o.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px;

  > .field { flex: 1 1 140px; min-width: 0; }
  input { width: 100%; }
`,Z=o.p`
  && { margin: 0; }
  font-size: 12px;
  line-height: 1.5;
  color: var(--light-text-color);
`,pe=o.label`
  font-weight: 600;
  cursor: pointer;
`,me=o(O)`
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  border-top: 1px solid var(--gray-200);
  padding: 12px 15px;

  @media (max-height: 600px) {
    padding-block: 10px;
  }
`,he=o.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;

  .btn + .btn {
    margin-inline-start: 0;
  }
`,ge=o.button`
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
`,_e=({draft:n,onChange:r,formats:i,weekStartDay:a,disabled:o})=>{let s=(0,N.useId)(),c=n.recurrence??{type:`NEVER`,endType:`NEVER`},d=p(n.start),m=i.date.short.icu??`P`,h=f(),g=G(n),_=g?D(E(g.rrule,n.start),m):null,S=[{value:`NEVER`,label:e(`Does not repeat`)},{value:`DAILY`,label:e(`Every Day`)},{value:`WEEKDAYS`,label:e(`Weekdays (Monday–Friday)`)},{value:`WEEKLY`,label:e(`Weekly on {weekday}`,{weekday:u(d,`EEEE`,{locale:h})})},{value:`MONTHLY`,label:e(`Monthly on day {day}`,{day:d.getDate()})},{value:`YEARLY`,label:e(`Yearly on {date}`,{date:new Intl.DateTimeFormat(l(),{month:`long`,day:`numeric`}).format(d)})}];return(0,P.jsxs)(X,{children:[(0,P.jsx)(v,{label:`Repeat`,id:`${s}-repeat`,children:(0,P.jsx)(`div`,{className:`select fullwidth`,children:(0,P.jsx)(`select`,{id:`${s}-repeat`,className:`fullwidth`,value:c.type,disabled:o,onChange:e=>r({...n,recurrence:{...c,type:e.target.value}}),children:S.map(({value:e,label:t})=>(0,P.jsx)(`option`,{value:e,children:t},e))})})}),c.type!==`NEVER`&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(fe,{children:[(0,P.jsx)(v,{label:`Repeat ends`,id:`${s}-ends`,children:(0,P.jsx)(`div`,{className:`select fullwidth`,children:(0,P.jsxs)(`select`,{id:`${s}-ends`,className:`fullwidth`,value:c.endType,disabled:o,onChange:e=>r({...n,recurrence:{...c,endType:e.target.value,count:c.count??10,until:c.until??t(y(d,1))}}),children:[(0,P.jsx)(`option`,{value:`NEVER`,children:e(`Never`)}),(0,P.jsx)(`option`,{value:`ON_DATE`,children:e(`On a date`)}),(0,P.jsx)(`option`,{value:`AFTER`,children:e(`After...`)})]})})}),c.endType===`AFTER`&&(0,P.jsx)(v,{label:`Occurrences`,id:`${s}-count`,required:!0,children:(0,P.jsx)(`input`,{id:`${s}-count`,className:`text fullwidth`,type:`number`,min:1,step:1,required:!0,disabled:o,value:c.count??``,onChange:e=>r({...n,recurrence:{...c,count:e.target.value===``?void 0:e.target.valueAsNumber}})})}),c.endType===`ON_DATE`&&(0,P.jsx)(x,{portal:!0,id:`${s}-until`,label:e(`Last date`),value:W(n),required:!0,datePickerProps:{disabled:o,showIcon:!0,icon:(0,P.jsx)(b,{}),toggleCalendarOnIconClick:!0,dateFormat:m,minDate:d,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:a},onChange:e=>{e!==null&&r({...n,recurrence:{...c,until:e}})}})]}),_&&(0,P.jsx)(Z,{role:`status`,"aria-live":`polite`,children:_})]})]})},ve=e=>Craft.getCpUrl(`calendar${e}`),Q=({draft:t,onChange:n,refetchEvents:r,onConfirm:i,onCancel:a,variant:o=`popover`,showMoreDetails:s=!0})=>{let{currentSiteId:c,showOverlapWarnings:l,calendars:u,calendarColors:f,calendarAllowRepeating:m,quickCreateFields:h,quickCreateRequiredFields:_,formats:y,weekStartDay:T,eventDuration:E,timeInterval:D}=z(),O=(0,N.useId)(),k=(0,N.useMemo)(()=>Object.entries(u).map(([e,t])=>({value:Number(e),label:t,color:f?.[Number(e)]})),[u,f]),[A,ie]=(0,N.useState)(k[0]?.value??0),j=m?.[A]??!1,M=j||!t.recurrence?t:{...t,recurrence:void 0},F=K(M),ae=G(M),[I,L]=(0,N.useState)({}),R=h?.[A],B=R?.location,V=R?.description,H=_?.[A],U=I[A]??{},W=B||V?{...B&&{location:U[B]??``},...V&&{description:U[V]??``}}:void 0,q=(e,t)=>{L(n=>({...n,[A]:{...n[A],[e]:t}}))},{createEvent:X,prepareEvent:fe,error:Z,isFetching:Q,isOpeningEditor:$}=ce({refetchEvents:r,onSuccess:i,getUrl:o===`widget`?ve:void 0}),ye=(0,N.useMemo)(()=>t.allDay?y.date.short.icu:y.datetime.short.icu,[y,t.allDay]),be=(0,N.useMemo)(()=>te(t),[t]);return C(`keydown`,e=>{o===`popover`&&e.key===`Escape`&&!Q&&a()}),(0,P.jsxs)(le,{"data-quick-create-variant":o,children:[(0,P.jsxs)(J,{children:[(0,P.jsx)(Y,{children:(0,P.jsx)(oe,{label:e(`Title`),id:`${O}-title`,required:!0,autofocus:o===`popover`,value:t.title,placeholder:e(`Event Title`),onChange:e=>n(ee(t,e))})}),(0,P.jsxs)(ue,{children:[(0,P.jsx)(se,{value:A,options:k,onChange:e=>{ie(e),!m?.[e]&&t.recurrence&&n({...t,recurrence:void 0})}}),(0,P.jsx)(`hr`,{}),(0,P.jsxs)(de,{children:[(0,P.jsx)(re,{enabled:t.allDay,onClick:e=>n(w(t,e,{eventDuration:E}))}),(0,P.jsx)(pe,{onClick:()=>n(w(t,!t.allDay,{eventDuration:E})),children:e(`All Day`)})]}),(0,P.jsx)(x,{portal:!0,id:`${O}-start`,required:!0,label:e(`Starts`),value:t.start,datePickerProps:{showIcon:!0,icon:(0,P.jsx)(b,{}),toggleCalendarOnIconClick:!0,dateFormat:ye,timeFormat:y.time.short.icu,showTimeSelect:!t.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:T,timeIntervals:D},onChange:e=>{e!==null&&n(S(t,e,{eventDuration:E}))}}),(0,P.jsx)(x,{portal:!0,id:`${O}-end`,required:!0,label:e(`Ends`),value:be,datePickerProps:{showIcon:!0,icon:(0,P.jsx)(b,{}),toggleCalendarOnIconClick:!0,minDate:p(t.start),dateFormat:ye,timeFormat:y.time.short.icu,showTimeSelect:!t.allDay,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:`select`,calendarStartDay:T,timeIntervals:D,filterTime:e=>{if(!t.start)return!0;let n=p(t.start),r=new Date(e);return n.getTime()<r.getTime()}},onChange:e=>{e!==null&&n(ne(t,e,{eventDuration:E}))}}),j&&(0,P.jsx)(_e,{draft:t,onChange:n,formats:y,weekStartDay:T,disabled:Q}),(0,P.jsx)(g,{formats:y,enabled:l&&!!A&&F,schedule:{start:t.start,end:t.allDay?t.end-1:t.end,allDay:t.allDay,calendarId:A,siteId:c,...ae}}),(B||V)&&(0,P.jsx)(`hr`,{}),B&&(0,P.jsx)(v,{label:e(`Location`),id:`${O}-location`,required:H?.location,children:(0,P.jsx)(`input`,{id:`${O}-location`,type:`text`,className:`text fullwidth`,disabled:Q,"aria-required":H?.location||void 0,value:U[B]??``,onChange:e=>q(B,e.target.value)})}),V&&(0,P.jsx)(v,{label:e(`Description`),id:`${O}-description`,required:H?.description,children:(0,P.jsx)(`textarea`,{id:`${O}-description`,className:`text fullwidth`,rows:3,disabled:Q,"aria-required":H?.description||void 0,value:U[V]??``,onChange:e=>q(V,e.target.value)})})]}),Z&&(0,P.jsx)(`p`,{className:`error`,role:`alert`,children:Z})]}),(0,P.jsxs)(me,{$justifyContent:`flex-end`,$gap:8,children:[s&&(0,P.jsx)(ge,{type:`button`,disabled:!A||Q||!F,onClick:async()=>{let e=await fe(M,A,W);e&&(window.location.href=e)},children:e($?`Processing...`:`More details…`)}),(0,P.jsxs)(he,{children:[o===`popover`&&(0,P.jsx)(`button`,{type:`button`,className:d(`btn`,Q&&`disabled`),disabled:Q,onClick:a,children:e(`Cancel`)}),(0,P.jsx)(`button`,{type:`button`,className:d(`btn submit`,Q&&`disabled`),disabled:!t.title.trim()||!A||Q||!F,onClick:()=>X(M,A,W),children:e(Q&&!$?`Creating Event...`:`Create Event`)})]})]})]})},$=Q;export{J as a,R as c,me as i,z as l,Q as n,Y as o,de as r,X as s,$ as t,I as u};