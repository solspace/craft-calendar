import{a as e,d as t,l as n,s as r,t as i}from"./translations-BT7AJKOt.js";import{n as a,r as o}from"./http-CmK6H-J6.js";import{y as s}from"./clsx-DI7HwU81.js";import{n as c,t as l}from"./dist-D9JxHDLW.js";import{o as u}from"./overlap-warning-Bvuu2odu.js";import{r as d}from"./calendar.now-indicator-yvTSfd9O.js";import{i as f,n as p,t as m}from"./calendar.day-preview-BAF5DJwp.js";import{a as h,i as g,n as _,o as v,r as y,s as b,t as x}from"./loader-BOhj6sYn.js";var S=t(n()),C=e(f)`
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
`,w=r(),T=new Set,E=({config:e})=>(0,w.jsx)(a,{children:(0,w.jsx)(D,{config:e})}),D=({config:e})=>{let t=(0,S.useRef)(null),n=(0,S.useRef)(null),r=d(),[a,f]=(0,S.useState)(r),[b,x]=(0,S.useState)(``),[E,D]=(0,S.useState)([]),[O,k]=(0,S.useState)(!1),[A,j]=(0,S.useState)(!1),{showPopover:M,hidePopover:N}=o(),P=(0,S.useCallback)(t=>{if(O||A)return;let n=t.closest(`[data-date]`)?.dataset.date;if(!n)return;let r=new Date(`${n}T00:00:00Z`),i=g(E,r);M((0,w.jsx)(m,{compact:!0,date:r,anchor:t,language:e.language,formats:e.formats,events:p(i),onEventSelect:e=>{let t=i.find(t=>t.id===e);t?.url&&(window.location.href=t.url)}}),t,{position:[`bottom`,`top`,`right`,`left`],closeDelayMs:300})},[O,A,E,e.language,e.formats,M]);(0,S.useEffect)(()=>{let e=n.current;if(!e)return;let t;N();let r=e=>e.target instanceof HTMLElement?e.target.closest(`.fc-daygrid-day-number[href]`):null,i=e=>{let n=r(e);!n||e.relatedTarget instanceof Node&&n.contains(e.relatedTarget)||(clearTimeout(t),t=setTimeout(()=>P(n),300))},a=e=>{let n=r(e);n&&!(e.relatedTarget instanceof Node&&n.contains(e.relatedTarget))&&clearTimeout(t)},o=e=>{let n=r(e);n&&(clearTimeout(t),P(n))},s=e=>{(!(e.relatedTarget instanceof HTMLElement)||!e.relatedTarget.closest(`[data-calendar-year-preview]`))&&N()},c=e=>{if(e.key!==`ArrowDown`||!r(e))return;let t=document.querySelector(`[data-calendar-year-preview] :is(a[href], button)`);t&&(e.preventDefault(),t.focus())};return e.addEventListener(`mouseover`,i),e.addEventListener(`mouseout`,a),e.addEventListener(`focusin`,o),e.addEventListener(`focusout`,s),e.addEventListener(`keydown`,c),()=>{clearTimeout(t),N(),e.removeEventListener(`mouseover`,i),e.removeEventListener(`mouseout`,a),e.removeEventListener(`focusin`,o),e.removeEventListener(`focusout`,s),e.removeEventListener(`keydown`,c)}},[N,P]),h(n,t);let F=(0,S.useCallback)(e=>D(e),[]),I=(0,S.useMemo)(()=>u(T,e.currentSiteId,e.calendars),[e.currentSiteId,e.calendars]);return(0,w.jsxs)(C,{ref:n,"aria-busy":O,children:[(0,w.jsxs)(`div`,{className:`calendar-widget-heading`,children:[(0,w.jsx)(`h3`,{"aria-live":`polite`,children:b}),(0,w.jsxs)(`div`,{className:`calendar-widget-nav`,children:[(0,w.jsx)(`button`,{type:`button`,"aria-label":i(`Previous month`),onClick:()=>t.current?.getApi().prev(),children:(0,w.jsx)(_,{})}),(0,w.jsx)(`button`,{type:`button`,onClick:()=>t.current?.getApi().today(),children:i(`Today`)}),(0,w.jsx)(`button`,{type:`button`,"aria-label":i(`Next month`),onClick:()=>t.current?.getApi().next(),children:(0,w.jsx)(_,{next:!0})})]})]}),(0,w.jsx)(l,{...s(),ref:t,plugins:[c],initialView:`dayGridMonth`,initialDate:e.currentDay,locale:e.language,timeZone:`UTC`,now:r,firstDay:e.weekStartDay,height:`auto`,events:I,eventsSet:F,eventContent:()=>null,dayHeaderFormat:{weekday:`narrow`},dayCellContent:e=>{let t=g(E,e.date),n=[...new Set(t.map(e=>e.backgroundColor))].slice(0,3);return(0,w.jsxs)(`span`,{className:`calendar-mini-date`,children:[(0,w.jsx)(`span`,{children:e.dayNumberText}),(0,w.jsx)(`span`,{className:`visually-hidden`,children:i(t.length===1?`1 event`:`{count} events`,{count:t.length})}),(0,w.jsx)(`span`,{className:`calendar-mini-dots`,"aria-hidden":`true`,children:n.map(e=>(0,w.jsx)(`i`,{style:{background:e||`var(--gray-500)`}},e))})]})},dayCellDidMount:({el:t,date:n,isDisabled:r})=>{r||t.querySelector(`.fc-daygrid-day-number`)?.setAttribute(`href`,v(n,`day`,e.siteHandle))},showNonCurrentDates:!1,fixedWeekCount:!1,headerToolbar:!1,loading:e=>{e&&j(!1),k(e)},eventSourceFailure:()=>j(!0),datesSet:({view:e})=>{f(e.calendar.getDate()),x(e.title)}}),A&&(0,w.jsx)(`p`,{className:`calendar-widget-status`,role:`alert`,children:i(`Couldn’t load events. Use Refresh to try again.`)}),(0,w.jsx)(y,{href:v(a,`month`,e.siteHandle),loading:O,refresh:()=>t.current?.getApi().refetchEvents()})]})};x(`mini`,E);