import{a as e,d as t,l as n,s as r,t as i}from"./translations-BT7AJKOt.js";import{n as a,r as o}from"./http-CmK6H-J6.js";import{y as s}from"./clsx-DI7HwU81.js";import{n as c,t as l}from"./dist-D9JxHDLW.js";import{a as u,c as d,i as f,r as p,s as m,t as h}from"./calendar.event-content-WbooYZf0.js";import{o as g}from"./overlap-warning-Bvuu2odu.js";import{i as _,n as v,r as y}from"./calendar.now-indicator-yvTSfd9O.js";import{n as b,o as x,t as S}from"./calendar.day-preview-BAF5DJwp.js";import{a as C,i as w,n as T,o as E,r as D,s as O,t as k}from"./loader-BOhj6sYn.js";var A=t(n()),j=e(x)`
  ${O}

  .calendar-widget-grid {
    overflow: visible;
  }

  &[data-view="week"] .calendar-widget-grid {
    overflow-x: auto;
    overflow-y: hidden;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }
  &[data-view="week"] .fc { min-width: 560px; }
  .calendar-widget-agenda-range {
    margin-bottom: 12px;
    .calendar-agenda-range { display: flex; align-items: center; gap: 8px; font-size: 12px; }
    .select { flex: 0 1 160px; margin: 0; }
    select { width: 100%; min-height: 28px; font-size: 12px; }
    label { color: var(--gray-600); }
  }
  && .fc-col-header-cell-cushion {
    padding: 6px 2px;
    min-height: 0;
    color: var(--gray-600);
    font-size: 11px;
    line-height: 20px;
    text-align: center;
  }
  && .fc-daygrid-day-number { width: 24px; height: 24px; font-size: 12px; }
  .fc-daygrid-day-top { padding: 3px; }
  .fc-daygrid-day-events { margin-bottom: 8px; }
  .fc-daygrid-event .fc-event-title { font-size: 11px; }
  .fc-more-link {
    display: inline-flex; align-items: center; justify-content: center;
    min-height: 18px; padding: 0 4px; border-radius: 3px;
    color: var(--gray-600); font-size: 10px; line-height: 18px; text-decoration: none;
    &:hover, &:focus-visible { background: var(--gray-150); color: var(--link-color); }
  }
  .fc-timegrid-slot-label-cushion { font-size: 11px; }
  && .fc-timegrid-axis-cushion { padding: 2px 4px; font-size: 11px; line-height: 16px; }
  && .fc-timegrid .fc-daygrid-day-frame { min-height: 24px; }
  && .fc-timegrid .fc-daygrid-day-events { min-height: 20px; margin: 2px 0; }
  .fc-timegrid-event .fc-event-title { font-size: 11px; }
  .fc-list-day-cushion { font-size: 12px; }
  && .fc-list-event td { padding: 10px; }
  && .fc-list-event-time { min-width: 0; width: 76px; padding-inline-end: 16px; white-space: normal; font-size: 11px; }
  .calendar-agenda-title { flex-basis: 100px; font-size: 12px; }
  .calendar-agenda-calendar { margin-inline-start: 0; }
  .calendar-agenda-description { display: none; }
  .calendar-agenda-meta { font-size: 11px; }
  && .calendar-now-agenda-row td { padding: 8px 10px; }
  && .fc-list-empty { min-height: 120px; font-size: 12px; }

  @container (max-width: 720px) {
    .fc-daygrid-dot-event .fc-event-time { display: none; }
  }
  @container (max-width: 360px) {
    && .fc-daygrid-day-number { width: 22px; height: 22px; font-size: 11px; }
    .fc-daygrid-day-top { padding: 1px; }
    .fc-daygrid-day-events { margin-bottom: 4px; }
    .fc-more-link { line-height: 12px; }
    .fc-daygrid-event .fc-event-time,
    .fc-daygrid-event .fc-event-title-container { display: none; }
    && .fc-daygrid-dot-event .fc-event-main-frame-inline { justify-content: center; height: 10px; }
    && .fc-daygrid-dot-event .fc-color-icon { width: 6px; height: 6px; border-radius: 50%; }
    .fc-daygrid-block-event { min-height: 8px; }
    .calendar-agenda-calendar { max-width: 100%; }
  }
  @container (min-width: 480px) {
    && .fc-list-event-time { width: 110px; white-space: nowrap; }
  }
`,M=r(),N=new Set,P={day:`timeGridDay`,week:`timeGridWeek`,month:`dayGridMonth`,agenda:`listMonth`},F={day:`Day`,week:`Week`,month:`Month`,agenda:`Agenda`},I=({config:e})=>(0,M.jsx)(a,{children:(0,M.jsx)(L,{config:e})}),L=({config:e})=>{let t=(0,A.useRef)(null),n=(0,A.useRef)(null),r=y(),a=(0,A.useMemo)(()=>{let t=Object.keys(P),n=t.filter(t=>!e.enabledViews||e.enabledViews.includes(t));return n.length?n:t},[e.enabledViews]),[x,O]=(0,A.useState)(e.view&&a.includes(e.view)?e.view:a.includes(`month`)?`month`:a[0]),[k,I]=(0,A.useState)(r),[L,R]=(0,A.useState)(``),[z,B]=(0,A.useState)(!1),[V,H]=(0,A.useState)(!1),[U,W]=(0,A.useState)(`month`),G=(0,A.useRef)(U),K=(0,A.useCallback)(()=>t.current?.getApi(),[]),{showPopover:q,hidePopover:J}=o(),Y=(0,A.useRef)(new WeakMap);(0,A.useEffect)(()=>{G.current!==U&&(G.current=U,x===`agenda`&&K()?.refetchEvents())},[U,K,x]),C(n,t);let X=(0,A.useCallback)(()=>{let e=n.current?.querySelector(`.calendar-now-agenda-row`),t=e?.closest(`.fc-scroller`);e&&t&&(t.scrollTop+=e.getBoundingClientRect().top-t.getBoundingClientRect().top-48)},[]);(0,A.useEffect)(()=>{if(x!==`agenda`||z)return;let e=()=>{n.current?.querySelector(`.calendar-now-agenda-row`)&&(X(),t.disconnect())},t=new MutationObserver(e);n.current&&t.observe(n.current,{childList:!0,subtree:!0});let r=requestAnimationFrame(e);return()=>{cancelAnimationFrame(r),t.disconnect()}},[x,z,X]);let Z=(0,A.useMemo)(()=>g(N,e.currentSiteId,e.calendars),[e.currentSiteId,e.calendars]);return _(n,K,r,`${i(`Now`)} · ${new Intl.DateTimeFormat(e.language,{...e.formats.time.short.js,timeZone:`UTC`}).format(r)}`,new Intl.DateTimeFormat(e.language,{weekday:`long`,month:`long`,day:`numeric`,timeZone:`UTC`}).format(r),!0),(0,M.jsxs)(j,{ref:n,"data-view":x,"aria-busy":z,children:[(0,M.jsxs)(`div`,{className:`calendar-widget-heading`,children:[(0,M.jsx)(`h3`,{"aria-live":`polite`,children:L}),(0,M.jsxs)(`div`,{className:`calendar-widget-nav`,children:[(0,M.jsx)(`button`,{type:`button`,"aria-label":i(`Previous`),onClick:()=>K()?.prev(),children:(0,M.jsx)(T,{})}),(0,M.jsx)(`button`,{type:`button`,onClick:()=>{K()?.today(),requestAnimationFrame(X)},children:i(`Today`)}),(0,M.jsx)(`button`,{type:`button`,"aria-label":i(`Next`),onClick:()=>K()?.next(),children:(0,M.jsx)(T,{next:!0})})]})]}),a.length>1&&(0,M.jsx)(`fieldset`,{className:`calendar-widget-view-switcher`,"aria-label":i(`Calendar View`),children:a.map(e=>(0,M.jsx)(`button`,{type:`button`,"aria-pressed":x===e,onClick:()=>{O(e),K()?.changeView(P[e])},children:i(F[e])},e))}),x===`agenda`&&(0,M.jsx)(`div`,{className:`calendar-widget-agenda-range`,children:(0,M.jsx)(f,{range:U,onChange:W,disabled:z})}),(0,M.jsx)(`div`,{className:`calendar-widget-grid`,children:(0,M.jsx)(l,{...s(),ref:t,plugins:[c,m,d],views:{listMonth:u(U)},initialView:P[x],initialDate:e.currentDay,locale:e.language,timeZone:`UTC`,now:r,nowIndicator:!0,firstDay:e.weekStartDay,nextDayThreshold:`0${e.overlapThreshold||0}:00:00`,fixedWeekCount:!1,dayMaxEvents:2,moreLinkContent:({num:e})=>`+${e}`,moreLinkDidMount:({el:t})=>{let n=n=>{if(n instanceof KeyboardEvent&&n.key!==`Enter`&&n.key!==` `)return;n.preventDefault(),n.stopImmediatePropagation();let r=t.closest(`[data-date]`)?.dataset.date;if(!r)return;let i=new Date(`${r}T00:00:00Z`),a=b(w(K()?.getEvents()??[],i));q((0,M.jsx)(S,{compact:!0,closable:!0,date:i,events:a,anchor:t,language:e.language,formats:e.formats,onEventSelect:()=>{}}),t,{position:[`bottom`,`top`,`right`,`left`]})};t.setAttribute(`aria-haspopup`,`dialog`),t.removeAttribute(`aria-expanded`),t.addEventListener(`click`,n,!0),t.addEventListener(`keydown`,n,!0),Y.current.set(t,()=>{t.removeEventListener(`click`,n,!0),t.removeEventListener(`keydown`,n,!0)})},moreLinkWillUnmount:({el:e})=>Y.current.get(e)?.(),height:x===`month`?`auto`:400,events:Z,eventClassNames:h,eventContent:p,eventDidMount:e=>{v(e),e.el.title=e.event.title,e.el.setAttribute(`aria-label`,e.event.title)},eventTimeFormat:e.formats.time.short.js,displayEventEnd:x===`agenda`,headerToolbar:!1,navLinks:a.includes(`day`),navLinkDayClick:e=>{O(`day`),K()?.changeView(`timeGridDay`,e)},dayHeaderFormat:{weekday:`short`,day:x===`week`?`numeric`:void 0},listDayFormat:{weekday:`long`,month:`short`,day:`numeric`},listDaySideFormat:!1,noEventsContent:i(V?`Couldn’t load events. Use Refresh to try again.`:z?`Loading events…`:`No events in this date range.`),loading:e=>{e&&(H(!1),J()),B(e)},eventSourceFailure:()=>H(!0),datesSet:({view:e})=>{J(),R(e.title),I(e.calendar.getDate())},editable:!1,selectable:!1})}),V&&(0,M.jsx)(`p`,{className:`calendar-widget-status`,role:`alert`,children:i(`Couldn’t load events. Use Refresh to try again.`)}),(0,M.jsx)(D,{href:E(k,x,e.siteHandle),loading:z,refresh:()=>K()?.refetchEvents()})]})};k(`agenda`,I);