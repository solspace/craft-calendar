import{C as e,J as t,K as n,W as r,X as i,y as a}from"./clsx-i4RjRRj2.js";import{o}from"./overlap-warning-DAofkiem.js";import{a as s,o as c,r as l}from"./calendar.now-indicator-BKaW0uu6.js";import{n as u,t as d}from"./dist-Co6xHCO2.js";import{i as f,n as p,t as m}from"./calendar.day-preview-D_nbKuIi.js";import{a as h,i as g,n as _,o as v,r as y,s as b,t as x}from"./loader-DFcjaYBE.js";var S=i(t()),C=r(f)`
  ${b}

  && .fc-scrollgrid, && .fc-theme-standard td, && .fc-theme-standard th { border: 0; }
  .fc-view, .fc-scrollgrid { background: transparent; }
  .fc-col-header-cell { background: transparent; }
  && .fc-col-header-cell-cushion {
    padding: 0 0 8px;
    color: var(--gray-500);
    font-size: 11px;
    font-weight: 600;
    text-align: center;
  }
  .fc-daygrid-day-frame { min-height: 40px; }
  .fc-daygrid-day-top { display: flex; justify-content: center; padding: 0; }
  && .fc-daygrid-day { background: transparent; }
  && .fc-daygrid-day-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 36px;
    padding: 0;
    border-radius: 6px;
    color: var(--gray-600);
    font-size: 13px;
    line-height: 1;
    &:hover { background: var(--gray-100); }
    &:focus-visible { outline: 2px solid var(--link-color); outline-offset: 1px; }
  }
  && .fc-day-today .fc-daygrid-day-number {
    background: var(--primary-button-bg);
    color: white;
    .calendar-mini-dots i { background: currentColor !important; }
  }
  .calendar-mini-date { display: grid; justify-items: center; gap: 5px; }
  .calendar-mini-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    height: 4px;
    i { width: 4px; height: 4px; border-radius: 50%; }
  }
  .fc-daygrid-day-events, .fc-daygrid-day-bg { display: none; }
`,w=n(),T=new Set,E=({config:e})=>(0,w.jsx)(s,{portal:!0,children:(0,w.jsx)(D,{config:e})}),D=({config:t})=>{let n=(0,S.useRef)(null),r=(0,S.useRef)(null),i=l(),[s,f]=(0,S.useState)(i),[b,x]=(0,S.useState)(``),[E,D]=(0,S.useState)([]),[O,k]=(0,S.useState)(!1),[A,j]=(0,S.useState)(!1),{showPopover:M,hidePopover:N}=c(),P=(0,S.useCallback)(e=>{if(O||A)return;let n=e.closest(`[data-date]`)?.dataset.date;if(!n)return;let r=new Date(`${n}T00:00:00Z`),i=g(E,r);M((0,w.jsx)(m,{compact:!0,date:r,anchor:e,language:t.language,formats:t.formats,events:p(i),onEventSelect:e=>{let t=i.find(t=>t.id===e);t?.url&&(window.location.href=t.url)}}),e,{position:[`bottom`,`top`,`right`,`left`],closeDelayMs:300})},[O,A,E,t.language,t.formats,M]);(0,S.useEffect)(()=>{let e=r.current;if(!e)return;let t;N();let n=e=>e.target instanceof HTMLElement?e.target.closest(`.fc-daygrid-day-number[href]`):null,i=e=>{let r=n(e);!r||e.relatedTarget instanceof Node&&r.contains(e.relatedTarget)||(clearTimeout(t),t=setTimeout(()=>P(r),300))},a=e=>{let r=n(e);r&&!(e.relatedTarget instanceof Node&&r.contains(e.relatedTarget))&&clearTimeout(t)},o=e=>{let r=n(e);r&&(clearTimeout(t),P(r))},s=e=>{(!(e.relatedTarget instanceof HTMLElement)||!e.relatedTarget.closest(`[data-calendar-year-preview]`))&&N()},c=e=>{if(e.key!==`ArrowDown`||!n(e))return;let t=document.querySelector(`[data-calendar-year-preview] :is(a[href], button)`);t&&(e.preventDefault(),t.focus())};return e.addEventListener(`mouseover`,i),e.addEventListener(`mouseout`,a),e.addEventListener(`focusin`,o),e.addEventListener(`focusout`,s),e.addEventListener(`keydown`,c),()=>{clearTimeout(t),N(),e.removeEventListener(`mouseover`,i),e.removeEventListener(`mouseout`,a),e.removeEventListener(`focusin`,o),e.removeEventListener(`focusout`,s),e.removeEventListener(`keydown`,c)}},[N,P]),h(r,n);let F=(0,S.useCallback)(e=>D(e),[]),I=(0,S.useMemo)(()=>o(T,t.currentSiteId,t.calendars),[t.currentSiteId,t.calendars]);return(0,w.jsxs)(C,{ref:r,"aria-busy":O,children:[(0,w.jsxs)(`div`,{className:`calendar-widget-heading`,children:[(0,w.jsx)(`h3`,{"aria-live":`polite`,children:b}),(0,w.jsxs)(`div`,{className:`calendar-widget-nav`,children:[(0,w.jsx)(`button`,{type:`button`,"aria-label":e(`Previous month`),onClick:()=>n.current?.getApi().prev(),children:(0,w.jsx)(_,{})}),(0,w.jsx)(`button`,{type:`button`,onClick:()=>n.current?.getApi().today(),children:e(`Today`)}),(0,w.jsx)(`button`,{type:`button`,"aria-label":e(`Next month`),onClick:()=>n.current?.getApi().next(),children:(0,w.jsx)(_,{next:!0})})]})]}),(0,w.jsx)(d,{...a(),ref:n,plugins:[u],initialView:`dayGridMonth`,initialDate:t.currentDay,locale:t.language,timeZone:`UTC`,now:i,firstDay:t.weekStartDay,height:`auto`,events:I,eventsSet:F,eventContent:()=>null,dayHeaderFormat:{weekday:`narrow`},dayCellContent:t=>{let n=g(E,t.date),r=[...new Set(n.map(e=>e.backgroundColor))].slice(0,3);return(0,w.jsxs)(`span`,{className:`calendar-mini-date`,children:[(0,w.jsx)(`span`,{children:t.dayNumberText}),(0,w.jsx)(`span`,{className:`visually-hidden`,children:e(n.length===1?`1 event`:`{count} events`,{count:n.length})}),(0,w.jsx)(`span`,{className:`calendar-mini-dots`,"aria-hidden":`true`,children:r.map(e=>(0,w.jsx)(`i`,{style:{background:e||`var(--gray-500)`}},e))})]})},dayCellDidMount:({el:e,date:n,isDisabled:r})=>{r||e.querySelector(`.fc-daygrid-day-number`)?.setAttribute(`href`,v(n,`day`,t.siteHandle))},showNonCurrentDates:!1,fixedWeekCount:!1,headerToolbar:!1,loading:e=>{e&&j(!1),k(e)},eventSourceFailure:()=>j(!0),datesSet:({view:e})=>{f(e.calendar.getDate()),x(e.title)}}),A&&(0,w.jsx)(`p`,{className:`calendar-widget-status`,role:`alert`,children:e(`Couldn’t load events. Use Refresh to try again.`)}),(0,w.jsx)(y,{href:v(s,`month`,t.siteHandle),loading:O,refresh:()=>n.current?.getApi().refetchEvents()})]})};x(`mini`,E);