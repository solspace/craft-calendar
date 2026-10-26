import{C as e,I as t,J as n,K as r,R as i,W as a,X as o,m as s,n as c,x as l,z as u}from"./clsx-i4RjRRj2.js";var d={positions:[`bottom`],alignment:`start`,gap:8,padding:8},f=(e,t,n)=>n<=t?t:Math.min(Math.max(e,t),n),p=(e,t,n,r)=>{switch(r){case`center`:return e+(t-n)/2;case`end`:return e+t-n;default:return e}},m=(e,t,n,r,i)=>{switch(e){case`top`:return{position:e,top:t.top-n.height-r,left:p(t.left,t.width,n.width,i)};case`right`:return{position:e,top:p(t.top,t.height,n.height,i),left:t.right+r};case`left`:return{position:e,top:p(t.top,t.height,n.height,i),left:t.left-n.width-r};default:return{position:`bottom`,top:t.bottom+r,left:p(t.left,t.width,n.width,i)}}},h=(e,t,n,r,i)=>{let a=e.top,o=e.left,s=a+t.height,c=o+t.width;return a>=i&&o>=i&&s<=r-i&&c<=n-i},g=(e,t,n,r,i)=>{let a=r-i-t.height,o=n-i-t.width;return{...e,top:f(e.top,i,a),left:f(e.left,i,o)}},_=(e,t,n)=>{let r=e.left,i=e.top,a=r+t.width,o=i+t.height;return Math.max(0,Math.min(a,n.right)-Math.max(r,n.left))*Math.max(0,Math.min(o,n.bottom)-Math.max(i,n.top))},ee=e=>{if(!e)return d;let t=Array.isArray(e.position)?e.position:e.position?[e.position]:d.positions;return{positions:t.length?t:d.positions,alignment:e.alignment??d.alignment,gap:e.gap??d.gap,padding:e.padding??d.padding,closeDelayMs:e.closeDelayMs}},v=({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i})=>{let a=i.positions.map(n=>m(n,e,t,i.gap,i.alignment)),o=a.find(e=>h(e,t,n,r,i.padding));if(o)return o;let s=a.map(e=>g(e,t,n,r,i.padding)),c=s[0],l=_(c,t,e);for(let n of s.slice(1)){let r=_(n,t,e);r<l&&(c=n,l=r)}return c},y=e=>{switch(e){case`top`:return`bottom`;case`right`:return`left`;case`left`:return`right`;default:return`top`}},b=({placement:e,anchorRect:t,popoverRect:n,arrowPadding:r})=>{let i=y(e.position);return i===`top`||i===`bottom`?{side:i,left:f(t.left+t.width/2-e.left,r,n.width-r)}:{side:i,top:f(t.top+t.height/2-e.top,r,n.height-r)}},x=({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i,arrowPadding:a})=>{let o=v({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i});return{top:o.top,left:o.left,position:o.position,arrow:b({placement:o,anchorRect:e,popoverRect:t,arrowPadding:a})}},S=()=>{let e=window.Craft;return e?.csrfTokenValue?e.csrfTokenValue:null},C=e=>{if(!e)return!1;let t=e.toUpperCase();return![`GET`,`HEAD`,`OPTIONS`].includes(t)},w=(e,t={})=>{let n=new Headers(t.headers);if(C(t.method)){let e=S();e&&n.set(`X-CSRF-Token`,e)}return fetch(e,{...t,credentials:t.credentials??`same-origin`,headers:n})},T={success:e=>{Craft.cp.displaySuccess(e)},notice:e=>{Craft.cp.displayNotice(e)},error:e=>{Craft.cp.displayError(e)}},E=new Map,D=new Map,te=e=>{if(e===void 0||e===`*`)return;let t=Array.isArray(e)?e.join(`,`):e;return t===``?void 0:t},ne=(e,t,n,r,i=``)=>JSON.stringify([e,t,n,r,i]),O=(e,n,r,i,a=``)=>{let o=t(e),s=t(n),c=te(i),l=a.trim(),u=ne(o,s,r,c,l),d=E.get(u);if(d)return Promise.resolve(d);let f=D.get(u);if(f)return f;let p=new URL(Craft.getCpUrl(`calendar/api/events`),window.location.origin);p.searchParams.set(`start`,o),p.searchParams.set(`end`,s),r!==void 0&&p.searchParams.set(`siteId`,String(r)),c!==void 0&&p.searchParams.set(`calendars`,c),l&&p.searchParams.set(`criteria[search]`,l);let m=w(p).then(async e=>{if(!e.ok)throw Error(`Network response was not ok`);let t=await e.json();return E.set(u,t),t}).finally(()=>{D.delete(u)});return D.set(u,m),m},k=e=>Number.parseInt(e.split(`-`,1)[0]||e,10),A=(e,n)=>e?n?t(e):i(e):null,j=(e,t)=>!e||!t?null:Math.round((e.getTime()-t.getTime())/1e3),M=class extends Error{},N=async(e,t)=>{let n=await w(Craft.getCpUrl(`calendar/api/events/${e}`),{method:`POST`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>null);if(!n.ok||!r||r.success===!1)throw new M(typeof r?.message==`string`?r.message:``);return r},P=(e,t)=>{T.error(e instanceof M&&e.message?e.message:t)},F=async(e,{event:t,siteId:n,refetchEvents:r,revert:i,onHistoryEntry:a},o,s)=>{try{let r=await N(e,{eventId:k(String(t.id)),siteId:n,...a?{recordHistory:!0}:{},...o});a&&typeof r.historyToken==`string`&&a(r.historyToken)}catch(e){return i?.(),P(e,s),!1}return G(),a||window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),r(),!0},I=e=>{let t=/^\d+-(\d{8})(\d{6})$/.exec(e);if(!t)return null;let[,n,r]=t,i=Number.parseInt(n.slice(0,4),10),a=Number.parseInt(n.slice(4,6),10)-1,o=Number.parseInt(n.slice(6,8),10),s=Number.parseInt(r.slice(0,2),10),c=Number.parseInt(r.slice(2,4),10),l=Number.parseInt(r.slice(4,6),10);return A(new Date(Date.UTC(i,a,o,s,c,l)),!1)},L=t=>{let{event:n,recurrenceId:r,scope:i=`series`}=t;return F(`move`,t,{scope:i,recurrenceId:r,start:A(n.start,n.allDay),end:A(n.end,n.allDay),allDay:n.allDay},e(`Couldn’t save event.`))},R=t=>{let{event:n,oldEvent:r,recurrenceId:i,scope:a=`series`}=t;return F(`resize`,t,{scope:a,recurrenceId:i,start:A(n.start,n.allDay),end:A(n.end,n.allDay),oldStart:A(r.start,r.allDay),oldEnd:A(r.end,r.allDay),startDeltaSeconds:j(n.start,r.start),endDeltaSeconds:j(n.end,r.end),allDay:n.allDay},e(`Couldn’t save event.`))},z=t=>{let{recurrenceId:n,scope:r=`series`}=t;return F(`delete`,t,{scope:r,recurrenceId:n},e(`Couldn’t delete event.`))},B=t=>{let{recurrenceId:n,cancelled:r}=t;return F(`cancel`,t,{recurrenceId:n,cancelled:r},e(`Couldn’t save the occurrence.`))},V=async({event:t,recurrenceId:n,siteId:r})=>{try{let e=await N(`edit-following`,{eventId:k(String(t.id)),recurrenceId:n,siteId:r});if(typeof e.url!=`string`)throw new M(``);return e.url}catch(t){return P(t,e(`Couldn’t open the occurrences for editing.`)),null}},H=async(t,n)=>{try{return await N(`history`,{token:t,direction:n}),G(),!0}catch(t){return P(t,e(`Couldn’t restore the event change.`)),!1}},U=async(t,n)=>{try{let e=await N(`duplicate`,{eventId:k(String(t.id)),siteId:n});if(typeof e.url!=`string`)throw new M(``);return G(),e.url}catch(t){return P(t,e(`Couldn’t duplicate event.`)),null}},W=({eventId:e,recurrenceId:t,siteId:n,onSave:r})=>{let i={eventId:e,recurrenceId:t};n!==void 0&&(i.siteId=n),new Craft.CpScreenSlideout(`calendar/occurrences/edit`,{params:i}).on(`submit`,()=>{G(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),r()})},G=()=>{E.clear(),D.clear()},K=(e,t,n,r=``)=>(i,a,o)=>{let s=i.start,c=i.end;return O(s,c,t,n,r).then(t=>{let n;return n=e.size?t.filter(t=>!e.has(t.calendar)):t,a(n),n}).catch(e=>(o(e),[]))},q=(t,n)=>{let r=u(t.start),i=u(t.end),a={locale:l()},o=n?.date.short.icu??`P`,d=n?.time?.short.icu??`p`,f=c(r,o,a),p=c(i,o,a),m=s(r,i);if(t.allDay)return`${m?f:`${f} - ${p}`} (${e(`all day`)})`;let h=c(r,d,a),g=c(i,d,a);return`${f} ${h} - ${m?g:`${p} ${g}`}`},J=o(n()),Y=r(),X=`rgb(184 115 0)`,Z=a.div`
  display: grid;
  gap: 6px;
  border: 1px solid ${X};
  border-radius: 5px;
  background: var(--warning-bg-color, #fff8e6);
  color: var(--text-color, #33404d);
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.5;
  margin-block: 10px;
  overflow-wrap: anywhere;

  .overlap-summary {
    display: grid;
    gap: 2px;
  }

  && .overlap-heading {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    color: ${X};
    line-height: 1.4;
  }

  .overlap-heading .calendar-overlap-flag {
    flex: 0 0 auto;
    margin: 0;
  }

  && p { margin: 0; text-align: start; }
  && ul {
    display: grid;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  && li {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 2px 8px;
    margin: 0;
  }
  .overlap-event-title {
    flex: 1 1 80px;
    min-width: 0;
  }
  li small {
    margin-inline-start: auto;
    max-width: 100%;
    text-align: end;
    font-variant-numeric: tabular-nums;
  }
  a { text-decoration: underline; }
  small {
    display: block;
    color: var(--light-text-color, #596673);
    font-size: 11px;
    line-height: 1.4;
  }
`,re=a.div`
  display: grid;
  gap: 8px;

  ${Z} { margin: 0; }

  && > p {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    text-align: start;
  }

  && > .overlap-clear {
    color: var(--enabled-color, #008539);
  }
`,ie=a.span`
  display: inline-flex;
  align-items: center;
  vertical-align: -0.1em;
  line-height: 1;
  margin-inline-end: 4px;
  color: ${X};

  svg { display: block; }
`,Q=({count:t})=>t?(0,Y.jsx)(ie,{role:`img`,className:`calendar-overlap-flag`,title:e(`Scheduling conflict`),"aria-label":e(`Scheduling conflict`),children:(0,Y.jsx)(`svg`,{width:`11`,height:`11`,viewBox:`0 0 16 16`,fill:`currentColor`,"aria-hidden":`true`,children:(0,Y.jsx)(`path`,{d:`M8 1a1 1 0 0 1 .87.5l7 12A1 1 0 0 1 15 15H1a1 1 0 0 1-.87-1.5l7-12A1 1 0 0 1 8 1Zm0 3.5a.75.75 0 0 0-.75.75v4a.75.75 0 0 0 1.5 0v-4A.75.75 0 0 0 8 4.5ZM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z`})})}):null,$=({result:t,formats:n,isEditing:r=!1})=>{if(!t?.count)return null;let i=t.events.slice(0,3),a=t.count-i.length;return(0,Y.jsxs)(Z,{role:`status`,"aria-live":`polite`,children:[(0,Y.jsxs)(`div`,{className:`overlap-summary`,children:[(0,Y.jsxs)(`strong`,{className:`overlap-heading`,children:[(0,Y.jsx)(Q,{count:t.count}),(0,Y.jsx)(`span`,{children:e(`Scheduling conflict`)})]}),(0,Y.jsx)(`p`,{children:e(r?`Overlaps with other events in this calendar. You can still save.`:`Overlaps with other events in this calendar.`)})]}),(0,Y.jsx)(`ul`,{children:i.map(e=>(0,Y.jsxs)(`li`,{children:[e.url?(0,Y.jsx)(`a`,{className:`overlap-event-title`,href:e.url,target:`_blank`,rel:`noopener noreferrer`,children:e.title}):(0,Y.jsx)(`span`,{className:`overlap-event-title`,children:e.title}),(0,Y.jsx)(`small`,{children:q({...e,end:e.allDay?e.end-1:e.end},n)})]},e.id))}),a>0&&(0,Y.jsx)(`small`,{children:e(`And {count} more`,{count:a})})]})},ae=({enabled:t,formats:n,schedule:r,resolveEventId:i,refreshKey:a=0})=>{let[o,s]=(0,J.useState)(null),[c,l]=(0,J.useState)(`loading`),u=JSON.stringify(r);if((0,J.useEffect)(()=>{if(s(null),!t)return;l(`loading`);let e=new AbortController,n=setTimeout(async()=>{try{let t=JSON.parse(u);i&&(t.eventId=i());let n=await w(Craft.getCpUrl(`calendar/api/events/overlaps`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify(t),signal:e.signal});if(!n.ok)throw Error();let r=await n.json();e.signal.aborted||(s(r),l(`done`))}catch{e.signal.aborted||l(`error`)}},400);return()=>{clearTimeout(n),e.abort()}},[t,u,i,a]),!t)return null;let d=c===`loading`?e(`Checking for overlaps…`):c===`error`?e(`Couldn’t check for overlaps. You can still save.`):o?.recurring?e(`Checked up to {count} occurrences within one year, through {date}.`,{count:100,date:o.through??``}):o?.count?null:e(`No schedule conflicts found.`);return(0,Y.jsxs)(re,{children:[(0,Y.jsx)($,{result:o,formats:n,isEditing:!0}),d&&(0,Y.jsx)(`p`,{className:c===`done`&&o?.count===0&&!o.recurring?`overlap-clear`:`light`,role:`status`,"aria-live":`polite`,children:d})]})};export{w as _,G as a,v as b,U as c,I as d,L as f,B as g,R as h,q as i,V as l,H as m,Q as n,K as o,W as p,$ as r,z as s,ae as t,k as u,ee as v,x as y};