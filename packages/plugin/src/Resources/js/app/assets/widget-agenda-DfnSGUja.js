import{C as e,J as t,K as n,W as r,X as i,y as a}from"./clsx-i4RjRRj2.js";import{o}from"./overlap-warning-DAofkiem.js";import{a as s,i as c,n as l,o as u,r as d}from"./calendar.now-indicator-BKaW0uu6.js";import{n as f,t as p}from"./dist-Co6xHCO2.js";import{a as m,c as h,i as g,r as _,s as v,t as y}from"./calendar.event-content-BygYZYQJ.js";import{n as b,o as x,t as S}from"./calendar.day-preview-D_nbKuIi.js";import{a as C,i as w,n as T,o as E,r as D,s as O,t as k}from"./loader-DFcjaYBE.js";var A=i(t()),j=r(x)`
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
`,M=n(),N=new Set,P={day:`timeGridDay`,week:`timeGridWeek`,month:`dayGridMonth`,agenda:`listMonth`},F={day:`Day`,week:`Week`,month:`Month`,agenda:`Agenda`},I=({config:e})=>(0,M.jsx)(s,{portal:!0,children:(0,M.jsx)(L,{config:e})}),L=({config:t})=>{let n=(0,A.useRef)(null),r=(0,A.useRef)(null),i=d(),s=(0,A.useMemo)(()=>{let e=Object.keys(P),n=e.filter(e=>!t.enabledViews||t.enabledViews.includes(e));return n.length?n:e},[t.enabledViews]),[x,O]=(0,A.useState)(t.view&&s.includes(t.view)?t.view:s.includes(`month`)?`month`:s[0]),[k,I]=(0,A.useState)(i),[L,R]=(0,A.useState)(``),[z,B]=(0,A.useState)(!1),[V,H]=(0,A.useState)(!1),[U,W]=(0,A.useState)(`month`),G=(0,A.useRef)(U),K=(0,A.useCallback)(()=>n.current?.getApi(),[]),{showPopover:q,hidePopover:J}=u(),Y=(0,A.useRef)(new WeakMap);(0,A.useEffect)(()=>{G.current!==U&&(G.current=U,x===`agenda`&&K()?.refetchEvents())},[U,K,x]),C(r,n);let X=(0,A.useCallback)(()=>{let e=r.current?.querySelector(`.calendar-now-agenda-row`),t=e?.closest(`.fc-scroller`);e&&t&&(t.scrollTop+=e.getBoundingClientRect().top-t.getBoundingClientRect().top-48)},[]);(0,A.useEffect)(()=>{if(x!==`agenda`||z)return;let e=()=>{r.current?.querySelector(`.calendar-now-agenda-row`)&&(X(),t.disconnect())},t=new MutationObserver(e);r.current&&t.observe(r.current,{childList:!0,subtree:!0});let n=requestAnimationFrame(e);return()=>{cancelAnimationFrame(n),t.disconnect()}},[x,z,X]);let Z=(0,A.useMemo)(()=>o(N,t.currentSiteId,t.calendars),[t.currentSiteId,t.calendars]);return c(r,K,i,`${e(`Now`)} · ${new Intl.DateTimeFormat(t.language,{...t.formats.time.short.js,timeZone:`UTC`}).format(i)}`,new Intl.DateTimeFormat(t.language,{weekday:`long`,month:`long`,day:`numeric`,timeZone:`UTC`}).format(i),!0),(0,M.jsxs)(j,{ref:r,"data-view":x,"aria-busy":z,children:[(0,M.jsxs)(`div`,{className:`calendar-widget-heading`,children:[(0,M.jsx)(`h3`,{"aria-live":`polite`,children:L}),(0,M.jsxs)(`div`,{className:`calendar-widget-nav`,children:[(0,M.jsx)(`button`,{type:`button`,"aria-label":e(`Previous`),onClick:()=>K()?.prev(),children:(0,M.jsx)(T,{})}),(0,M.jsx)(`button`,{type:`button`,onClick:()=>{K()?.today(),requestAnimationFrame(X)},children:e(`Today`)}),(0,M.jsx)(`button`,{type:`button`,"aria-label":e(`Next`),onClick:()=>K()?.next(),children:(0,M.jsx)(T,{next:!0})})]})]}),s.length>1&&(0,M.jsx)(`fieldset`,{className:`calendar-widget-view-switcher`,"aria-label":e(`Calendar View`),children:s.map(t=>(0,M.jsx)(`button`,{type:`button`,"aria-pressed":x===t,onClick:()=>{O(t),K()?.changeView(P[t])},children:e(F[t])},t))}),x===`agenda`&&(0,M.jsx)(`div`,{className:`calendar-widget-agenda-range`,children:(0,M.jsx)(g,{range:U,onChange:W,disabled:z})}),(0,M.jsx)(`div`,{className:`calendar-widget-grid`,children:(0,M.jsx)(p,{...a(),ref:n,plugins:[f,v,h],views:{listMonth:m(U)},initialView:P[x],initialDate:t.currentDay,locale:t.language,timeZone:`UTC`,now:i,nowIndicator:!0,firstDay:t.weekStartDay,nextDayThreshold:`0${t.overlapThreshold||0}:00:00`,fixedWeekCount:!1,dayMaxEvents:2,moreLinkContent:({num:e})=>`+${e}`,moreLinkDidMount:({el:e})=>{let n=n=>{if(n instanceof KeyboardEvent&&n.key!==`Enter`&&n.key!==` `)return;n.preventDefault(),n.stopImmediatePropagation();let r=e.closest(`[data-date]`)?.dataset.date;if(!r)return;let i=new Date(`${r}T00:00:00Z`),a=b(w(K()?.getEvents()??[],i));q((0,M.jsx)(S,{compact:!0,closable:!0,date:i,events:a,anchor:e,language:t.language,formats:t.formats,onEventSelect:()=>{}}),e,{position:[`bottom`,`top`,`right`,`left`]})};e.setAttribute(`aria-haspopup`,`dialog`),e.removeAttribute(`aria-expanded`),e.addEventListener(`click`,n,!0),e.addEventListener(`keydown`,n,!0),Y.current.set(e,()=>{e.removeEventListener(`click`,n,!0),e.removeEventListener(`keydown`,n,!0)})},moreLinkWillUnmount:({el:e})=>Y.current.get(e)?.(),height:x===`month`?`auto`:400,events:Z,eventClassNames:y,eventContent:_,eventDidMount:e=>{l(e),e.el.title=e.event.title,e.el.setAttribute(`aria-label`,e.event.title)},eventTimeFormat:t.formats.time.short.js,displayEventEnd:x===`agenda`,headerToolbar:!1,navLinks:s.includes(`day`),navLinkDayClick:e=>{O(`day`),K()?.changeView(`timeGridDay`,e)},dayHeaderFormat:{weekday:`short`,day:x===`week`?`numeric`:void 0},listDayFormat:{weekday:`long`,month:`short`,day:`numeric`},listDaySideFormat:!1,noEventsContent:e(V?`Couldn’t load events. Use Refresh to try again.`:z?`Loading events…`:`No events in this date range.`),loading:e=>{e&&(H(!1),J()),B(e)},eventSourceFailure:()=>H(!0),datesSet:({view:e})=>{J(),R(e.title),I(e.calendar.getDate())},editable:!1,selectable:!1})}),V&&(0,M.jsx)(`p`,{className:`calendar-widget-status`,role:`alert`,children:e(`Couldn’t load events. Use Refresh to try again.`)}),(0,M.jsx)(D,{href:E(k,x,t.siteHandle),loading:z,refresh:()=>K()?.refetchEvents()})]})};k(`agenda`,I);