import{a as e,d as t,l as n,s as r,t as i}from"./translations-CL8ZheTP.js";import{t as a}from"./http-CR9t7coc.js";import{F as o,L as s,R as c,m as l,n as u,x as d}from"./clsx-cTcqfvCk.js";var f={success:e=>{Craft.cp.displaySuccess(e)},notice:e=>{Craft.cp.displayNotice(e)},error:e=>{Craft.cp.displayError(e)}},p=new Map,m=new Map,h=e=>{if(e===void 0||e===`*`)return;let t=Array.isArray(e)?e.join(`,`):e;return t===``?void 0:t},g=(e,t,n,r,i=``)=>JSON.stringify([e,t,n,r,i]),_=(e,t,n,r,i=``)=>{let s=o(e),c=o(t),l=h(r),u=i.trim(),d=g(s,c,n,l,u),f=p.get(d);if(f)return Promise.resolve(f);let _=m.get(d);if(_)return _;let v=new URL(Craft.getCpUrl(`calendar/api/events`),window.location.origin);v.searchParams.set(`start`,s),v.searchParams.set(`end`,c),n!==void 0&&v.searchParams.set(`siteId`,String(n)),l!==void 0&&v.searchParams.set(`calendars`,l),u&&v.searchParams.set(`criteria[search]`,u);let y=a(v).then(async e=>{if(!e.ok)throw Error(`Network response was not ok`);let t=await e.json();return p.set(d,t),t}).finally(()=>{m.delete(d)});return m.set(d,y),y},v=e=>Number.parseInt(e.split(`-`,1)[0]||e,10),y=(e,t)=>e?t?o(e):s(e):null,b=(e,t)=>!e||!t?null:Math.round((e.getTime()-t.getTime())/1e3),x=class extends Error{},S=async(e,t)=>{let n=await a(Craft.getCpUrl(`calendar/api/events/${e}`),{method:`POST`,headers:{Accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify(t)}),r=await n.json().catch(()=>null);if(!n.ok||!r||r.success===!1)throw new x(typeof r?.message==`string`?r.message:``);return r},C=(e,t)=>{f.error(e instanceof x&&e.message?e.message:t)},w=async(e,{event:t,siteId:n,refetchEvents:r,revert:i,onHistoryEntry:a},o,s)=>{try{let r=await S(e,{eventId:v(String(t.id)),siteId:n,...a?{recordHistory:!0}:{},...o});a&&typeof r.historyToken==`string`&&a(r.historyToken)}catch(e){return i?.(),C(e,s),!1}return P(),a||window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),r(),!0},T=e=>{let t=/^\d+-(\d{8})(\d{6})$/.exec(e);if(!t)return null;let[,n,r]=t,i=Number.parseInt(n.slice(0,4),10),a=Number.parseInt(n.slice(4,6),10)-1,o=Number.parseInt(n.slice(6,8),10),s=Number.parseInt(r.slice(0,2),10),c=Number.parseInt(r.slice(2,4),10),l=Number.parseInt(r.slice(4,6),10);return y(new Date(Date.UTC(i,a,o,s,c,l)),!1)},E=e=>{let{event:t,recurrenceId:n,scope:r=`series`}=e;return w(`move`,e,{scope:r,recurrenceId:n,start:y(t.start,t.allDay),end:y(t.end,t.allDay),allDay:t.allDay},i(`Couldn’t save event.`))},D=e=>{let{event:t,oldEvent:n,recurrenceId:r,scope:a=`series`}=e;return w(`resize`,e,{scope:a,recurrenceId:r,start:y(t.start,t.allDay),end:y(t.end,t.allDay),oldStart:y(n.start,n.allDay),oldEnd:y(n.end,n.allDay),startDeltaSeconds:b(t.start,n.start),endDeltaSeconds:b(t.end,n.end),allDay:t.allDay},i(`Couldn’t save event.`))},O=e=>{let{recurrenceId:t,scope:n=`series`}=e;return w(`delete`,e,{scope:n,recurrenceId:t},i(`Couldn’t delete event.`))},k=e=>{let{recurrenceId:t,cancelled:n}=e;return w(`cancel`,e,{recurrenceId:t,cancelled:n},i(`Couldn’t save the occurrence.`))},A=async({event:e,recurrenceId:t,siteId:n})=>{try{let r=await S(`edit-following`,{eventId:v(String(e.id)),recurrenceId:t,siteId:n});if(typeof r.url!=`string`)throw new x(``);return r.url}catch(e){return C(e,i(`Couldn’t open the occurrences for editing.`)),null}},j=async(e,t)=>{try{return await S(`history`,{token:e,direction:t}),P(),!0}catch(e){return C(e,i(`Couldn’t restore the event change.`)),!1}},M=async(e,t)=>{try{let n=await S(`duplicate`,{eventId:v(String(e.id)),siteId:t});if(typeof n.url!=`string`)throw new x(``);return P(),n.url}catch(e){return C(e,i(`Couldn’t duplicate event.`)),null}},N=({eventId:e,recurrenceId:t,siteId:n,onSave:r})=>{let i={eventId:e,recurrenceId:t};n!==void 0&&(i.siteId=n),new Craft.CpScreenSlideout(`calendar/occurrences/edit`,{params:i}).on(`submit`,()=>{P(),window.dispatchEvent(new Event(`calendar:schedule-history-reset`)),r()})},P=()=>{p.clear(),m.clear()},F=(e,t,n,r=``)=>(i,a,o)=>{let s=i.start,c=i.end;return _(s,c,t,n,r).then(t=>{let n;return n=e.size?t.filter(t=>!e.has(t.calendar)):t,a(n),n}).catch(e=>(o(e),[]))},I=(e,t)=>{let n=c(e.start),r=c(e.end),a={locale:d()},o=t?.date.short.icu??`P`,s=t?.time?.short.icu??`p`,f=u(n,o,a),p=u(r,o,a),m=l(n,r);if(e.allDay)return`${m?f:`${f} - ${p}`} (${i(`all day`)})`;let h=u(n,s,a),g=u(r,s,a);return`${f} ${h} - ${m?g:`${p} ${g}`}`},L=t(n()),R=r(),z=`rgb(184 115 0)`,B=e.div`
  display: grid;
  gap: 6px;
  border: 1px solid ${z};
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
    color: ${z};
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
`,V=e.div`
  display: grid;
  gap: 8px;

  ${B} { margin: 0; }

  && > p {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    text-align: start;
  }

  && > .overlap-clear {
    color: var(--enabled-color, #008539);
  }
`,H=e.span`
  display: inline-flex;
  align-items: center;
  vertical-align: -0.1em;
  line-height: 1;
  margin-inline-end: 4px;
  color: ${z};

  svg { display: block; }
`,U=({count:e})=>e?(0,R.jsx)(H,{role:`img`,className:`calendar-overlap-flag`,title:i(`Scheduling conflict`),"aria-label":i(`Scheduling conflict`),children:(0,R.jsx)(`svg`,{width:`11`,height:`11`,viewBox:`0 0 16 16`,fill:`currentColor`,"aria-hidden":`true`,children:(0,R.jsx)(`path`,{d:`M8 1a1 1 0 0 1 .87.5l7 12A1 1 0 0 1 15 15H1a1 1 0 0 1-.87-1.5l7-12A1 1 0 0 1 8 1Zm0 3.5a.75.75 0 0 0-.75.75v4a.75.75 0 0 0 1.5 0v-4A.75.75 0 0 0 8 4.5ZM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z`})})}):null,W=({result:e,formats:t,isEditing:n=!1})=>{if(!e?.count)return null;let r=e.events.slice(0,3),a=e.count-r.length;return(0,R.jsxs)(B,{role:`status`,"aria-live":`polite`,children:[(0,R.jsxs)(`div`,{className:`overlap-summary`,children:[(0,R.jsxs)(`strong`,{className:`overlap-heading`,children:[(0,R.jsx)(U,{count:e.count}),(0,R.jsx)(`span`,{children:i(`Scheduling conflict`)})]}),(0,R.jsx)(`p`,{children:i(n?`Overlaps with other events in this calendar. You can still save.`:`Overlaps with other events in this calendar.`)})]}),(0,R.jsx)(`ul`,{children:r.map(e=>(0,R.jsxs)(`li`,{children:[e.url?(0,R.jsx)(`a`,{className:`overlap-event-title`,href:e.url,target:`_blank`,rel:`noopener noreferrer`,children:e.title}):(0,R.jsx)(`span`,{className:`overlap-event-title`,children:e.title}),(0,R.jsx)(`small`,{children:I({...e,end:e.allDay?e.end-1:e.end},t)})]},e.id))}),a>0&&(0,R.jsx)(`small`,{children:i(`And {count} more`,{count:a})})]})},G=({enabled:e,formats:t,schedule:n,resolveEventId:r,refreshKey:o=0})=>{let[s,c]=(0,L.useState)(null),[l,u]=(0,L.useState)(`loading`),d=JSON.stringify(n);if((0,L.useEffect)(()=>{if(c(null),!e)return;u(`loading`);let t=new AbortController,n=setTimeout(async()=>{try{let e=JSON.parse(d);r&&(e.eventId=r());let n=await a(Craft.getCpUrl(`calendar/api/events/overlaps`),{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify(e),signal:t.signal});if(!n.ok)throw Error();let i=await n.json();t.signal.aborted||(c(i),u(`done`))}catch{t.signal.aborted||u(`error`)}},400);return()=>{clearTimeout(n),t.abort()}},[e,d,r,o]),!e)return null;let f=l===`loading`?i(`Checking for overlaps…`):l===`error`?i(`Couldn’t check for overlaps. You can still save.`):s?.recurring?i(`Checked up to {count} occurrences within one year, through {date}.`,{count:100,date:s.through??``}):s?.count?null:i(`No schedule conflicts found.`);return(0,R.jsxs)(V,{children:[(0,R.jsx)(W,{result:s,formats:t,isEditing:!0}),f&&(0,R.jsx)(`p`,{className:l===`done`&&s?.count===0&&!s.recurring?`overlap-clear`:`light`,role:`status`,"aria-live":`polite`,children:f})]})};export{P as a,M as c,T as d,E as f,k as g,D as h,I as i,A as l,j as m,U as n,F as o,N as p,W as r,O as s,G as t,v as u};