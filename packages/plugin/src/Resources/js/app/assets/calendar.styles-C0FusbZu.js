import{d as e,i as t,o as n}from"./date-DHm29epU.js";var r=()=>{let e=window.Craft;return e?.csrfTokenValue?e.csrfTokenValue:null},i=e=>{if(!e)return!1;let t=e.toUpperCase();return![`GET`,`HEAD`,`OPTIONS`].includes(t)},a=(e,t={})=>{let n=new Headers(t.headers);if(i(t.method)){let e=r();e&&n.set(`X-CSRF-Token`,e)}return fetch(e,{...t,credentials:t.credentials??`same-origin`,headers:n})},o=new Map,s=new Map,c=e=>{if(e===void 0||e===`*`)return;let t=Array.isArray(e)?e.join(`,`):e;return t===``?void 0:t},l=(e,t,n,r)=>`${e}|${t}|${n??``}|${r??``}`,u=(e,n,r,i)=>{let u=t(e),d=t(n),f=c(i),p=l(u,d,r,f),m=o.get(p);if(m)return Promise.resolve(m);let h=s.get(p);if(h)return h;let g=new URL(Craft.getCpUrl(`calendar/api/events`),window.location.origin);g.searchParams.set(`start`,u),g.searchParams.set(`end`,d),r!==void 0&&g.searchParams.set(`siteId`,String(r)),f!==void 0&&g.searchParams.set(`calendars`,f);let _=a(g).then(async e=>{if(!e.ok)throw Error(`Network response was not ok`);let t=await e.json();return o.set(p,t),t}).finally(()=>{s.delete(p)});return s.set(p,_),_},d=e=>Number.parseInt(e.split(`-`,1)[0]||e,10),f=(e,r)=>e?r?t(e):n(e):null,p=(e,t)=>!e||!t?null:Math.round((e.getTime()-t.getTime())/1e3),m=async(e,t)=>{let n=await a(Craft.getCpUrl(`calendar/api/events/${e}`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`Network response was not ok`);let r=await n.json();if(r?.success===!1)throw Error(r?.message||`Failed to ${e} event`)},h=(e,t)=>{let n=/^\d+-(\d{8})(\d{6})$/.exec(e);if(!n)return null;let[,r,i]=n,a=Number.parseInt(r.slice(0,4),10),o=Number.parseInt(r.slice(4,6),10)-1,s=Number.parseInt(r.slice(6,8),10),c=Number.parseInt(i.slice(0,2),10),l=Number.parseInt(i.slice(2,4),10),u=Number.parseInt(i.slice(4,6),10);return f(new Date(Date.UTC(a,o,s,c,l,u)),t)},g=async({event:e,occurrenceDate:t,scope:n=`series`,refetchEvents:r,revert:i})=>{try{return await m(`move`,{eventId:d(String(e.id)),scope:n,occurrenceDate:t,start:f(e.start,e.allDay),end:f(e.end,e.allDay),allDay:e.allDay}),y(),r(),!0}catch(e){return console.error(`Error moving event:`,e),i?.(),!1}},_=async({event:e,oldEvent:t,refetchEvents:n,revert:r})=>{try{return await m(`resize`,{eventId:d(String(e.id)),scope:`series`,start:f(e.start,e.allDay),end:f(e.end,e.allDay),oldStart:f(t.start,t.allDay),oldEnd:f(t.end,t.allDay),startDeltaSeconds:p(e.start,t.start),endDeltaSeconds:p(e.end,t.end),allDay:e.allDay}),y(),n(),!0}catch(e){return console.error(`Error resizing event:`,e),r?.(),!1}},v=async({event:e,occurrenceDate:t,scope:n=`series`,refetchEvents:r,revert:i})=>{try{return await m(`delete`,{eventId:d(String(e.id)),scope:n,occurrenceDate:t}),y(),r(),!0}catch(e){return console.error(`Error deleting event:`,e),i?.(),!1}},y=()=>{o.clear(),s.clear()},b=(e,t,n)=>(r,i,a)=>{let o=r.start,s=r.end;return u(o,s,t,n).then(t=>{let n;return n=e.size?t.filter(t=>!e.has(t.calendar)):t,i(n),n}).catch(e=>(a(e),[]))},x=`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik01MDAuNyAxMzguN0w1MTIgMTQ5LjRMNTEyIDk2QzUxMiA3OC4zIDUyNi4zIDY0IDU0NCA2NEM1NjEuNyA2NCA1NzYgNzguMyA1NzYgOTZMNTc2IDIyNEM1NzYgMjQxLjcgNTYxLjcgMjU2IDU0NCAyNTZMNDE2IDI1NkMzOTguMyAyNTYgMzg0IDI0MS43IDM4NCAyMjRDMzg0IDIwNi4zIDM5OC4zIDE5MiA0MTYgMTkyTDQ2My45IDE5Mkw0NTYuMyAxODQuOEM0NTYuMSAxODQuNiA0NTUuOSAxODQuNCA0NTUuNyAxODQuMkMzODAuNyAxMDkuMiAyNTkuMiAxMDkuMiAxODQuMiAxODQuMkMxMDkuMiAyNTkuMiAxMDkuMiAzODAuNyAxODQuMiA0NTUuN0MyNTkuMiA1MzAuNyAzODAuNyA1MzAuNyA0NTUuNyA0NTUuN0M0NjMuOSA0NDcuNSA0NzEuMiA0MzguOCA0NzcuNiA0MjkuNkM0ODcuNyA0MTUuMSA1MDcuNyA0MTEuNiA1MjIuMiA0MjEuN0M1MzYuNyA0MzEuOCA1NDAuMiA0NTEuOCA1MzAuMSA0NjYuM0M1MjEuNiA0NzguNSA1MTEuOSA0OTAuMSA1MDEgNTAxQzQwMSA2MDEgMjM4LjkgNjAxIDEzOSA1MDFDMzkuMSA0MDEgMzkgMjM5IDEzOSAxMzlDMjM4LjkgMzkuMSA0MDAuNyAzOSA1MDAuNyAxMzguN3oiLz48L3N2Zz4=`,S=`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik0yMTYgNjRDMjI5LjMgNjQgMjQwIDc0LjcgMjQwIDg4TDI0MCAxMjhMNDAwIDEyOEw0MDAgODhDNDAwIDc0LjcgNDEwLjcgNjQgNDI0IDY0QzQzNy4zIDY0IDQ0OCA3NC43IDQ0OCA4OEw0NDggMTI4TDQ4MCAxMjhDNTE1LjMgMTI4IDU0NCAxNTYuNyA1NDQgMTkyTDU0NCA0ODBDNTQ0IDUxNS4zIDUxNS4zIDU0NCA0ODAgNTQ0TDE2MCA1NDRDMTI0LjcgNTQ0IDk2IDUxNS4zIDk2IDQ4MEw5NiAxOTJDOTYgMTU2LjcgMTI0LjcgMTI4IDE2MCAxMjhMMTkyIDEyOEwxOTIgODhDMTkyIDc0LjcgMjAyLjcgNjQgMjE2IDY0ek0yMTYgMTc2TDE2MCAxNzZDMTUxLjIgMTc2IDE0NCAxODMuMiAxNDQgMTkyTDE0NCAyNDBMNDk2IDI0MEw0OTYgMTkyQzQ5NiAxODMuMiA0ODguOCAxNzYgNDgwIDE3NkwyMTYgMTc2ek0xNDQgMjg4TDE0NCA0ODBDMTQ0IDQ4OC44IDE1MS4yIDQ5NiAxNjAgNDk2TDQ4MCA0OTZDNDg4LjggNDk2IDQ5NiA0ODguOCA0OTYgNDgwTDQ5NiAyODhMMTQ0IDI4OHoiLz48L3N2Zz4=`,C=e.div`
  position: relative;

  table:not(.data) {
    td,
    th {
      padding-block: 0;

      &:not(:last-child) {
        padding-inline-end: 0;
      }

      &:not(:first-child) {
        padding-inline-start: 0;
      }
    }
  }

  .fc {
    --fc-border-color: var(--gray-150);
    --fc-page-bg-color: #ffffff;
    --fc-neutral-bg-color: #f4f7fc;
    --fc-today-bg-color: #ffffff;
    --fc-button-text-color: #29323d;
    --fc-button-bg-color: rgb(96 125 159 / 25%);
    --fc-button-border-color: rgb(96 125 159 / 25%);
    --fc-button-hover-bg-color: #bac6d6;
    --fc-button-hover-border-color: #bac6d6;
    --fc-button-active-bg-color: var(--gray-500);
    --fc-button-active-border-color: #ffffff;
    --fc-more-link-bg-color: transparent;
    --fc-more-link-text-color: #606060;
    --fc-event-selected-overlay-color: rgb(0 0 0 / 15%);
  }

  .fc .fc-button:not(.fc-button-group > .fc-button) {
    border-radius: var(--radius-lg);
  }

  .fc .fc-button-group > .fc-button:first-child {
    border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  }

  .fc .fc-button-group > .fc-button:last-child {
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  }

  .fc-button.fc-button-primary {
    background-color: var(--button-bg);
    box-shadow: none;
    border: 1px solid white;
    padding: 7px 14px;
    outline: none;
    text-shadow: none;
    font-weight: 400;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 20px;
  }

  .fc .fc-button.fc-button-primary {
    &:focus,
    &:active,
    &:active:focus,
    &.fc-button-active,
    &.fc-button-active:focus,
    &:not(:disabled):active:focus,
    &:not(:disabled).fc-button-active:focus {
      box-shadow: none;
      outline: none;
    }

    &.fc-button-active,
    &.fc-button-active:focus {
      color: #ffffff;
    }

    &:focus-visible {
      outline: 2px solid var(--button-bg--active);
      outline-offset: 1px;
    }
  }

  .fc-view,
  .fc-scrollgrid {
    overflow: hidden;
    border-radius: 4px;
    background: #fcfdff;
    box-sizing: border-box;
  }

  .fc-scrollgrid,
  .fc-scrollgrid table,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: var(--gray-200);
  }

  .fc-col-header-cell {
    background: var(--gray-150);
  }

  .fc-col-header-cell-cushion {
    display: block;
    padding: 5px 7px;
    color: var(--gray-700);
    font-size: 18px;
    font-weight: 400;
    text-align: right;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  .fc-dayGridMonth-view {
    .fc-col-header-cell-cushion {
      font-size: 16px;
    }

    .fc-daygrid-day {
      background: #ffffff;
    }
    
    .fc-daygrid-day.fc-day-sat:not(.fc-day-other):not(.fc-day-today),
    .fc-daygrid-day.fc-day-sun:not(.fc-day-other):not(.fc-day-today) {
      background-color: #fcfdff;
    }

    .fc-daygrid-day.fc-day-other {
      background-color: var(--gray-050);

      .fc-daygrid-day-top {
        opacity: 1;
      }

      .fc-daygrid-day-number {
        color: var(--gray-300);
      }
    }
  }

  .fc-daygrid-day-top {
    padding: 2px;
  }

  .fc-day-today .fc-daygrid-day-number {
    background-color: var(--primary-button-bg);
    color: #ffffff;
    font-weight: 400;
  }

  .fc-timeGridWeek-view {
    .fc-col-header-cell-cushion {
      position: relative;
      display: flex;
      align-items: center;
      padding-right: 35px;
      min-height: 30px;
      text-align: left;
    }

    .fc-day-header-label {
      color: var(--gray-500);
    }

    .fc-day-header-date {
      position: absolute;
      top: 50%;
      right: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border: 1px solid transparent;
      border-radius: 30px;
      transform: translateY(-50%);
      text-align: center;
    }

    .fc-title-today .fc-day-header-date {
      color: #ffffff;
      background-color: var(--primary-button-bg);
    }

    .fc-timegrid-col.fc-day-today {
      background-color: #ffffff;
    }

    .fc-day-today.fc-col-header-cell {
      background-color: #ffffff;
    }

    .fc-timegrid-col.fc-day-sat:not(.fc-day-today),
    .fc-timegrid-col.fc-day-sun:not(.fc-day-today) {
      background-color: #fcfdff;
    }
  }

  .fc-timeGridDay-view {
    .fc-col-header {
      display: none;
    }

    .fc-timegrid-col.fc-day-today {
      background-color: #ffffff;
    }
  }

  .fc-timegrid-axis {
    border-color: transparent;
  }

  .fc-timegrid-axis-cushion,
  .fc-timegrid-slot-label-cushion {
    padding-right: 4px;
    color: #000000;
  }

  .fc-timegrid-event {
    padding: 0;
    border: none !important;
    border-radius: 0;
    opacity: 0.8;

    .fc-event-main {
      padding: 3px 5px;
    }

    .fc-event-time {
      margin-bottom: 0;
      font-size: 10px;
      white-space: normal;
    }

    .fc-event-title {
      font-size: 11px;
      font-weight: 700;
    }
  }

  .fc-daygrid-event-harness .fc-daygrid-event {
    margin: 1px 3px 0;
    border-radius: 3px;
  }

  .fc-daygrid-event {
    .fc-event-time {
      font-size: 10px;
      font-weight: 400;
    }

    .fc-event-title {
      font-size: 11px;
    }

    &.fc-event-all-day,
    &.fc-event-multi-day {
      padding: 0px 5px 0px;
      border: none !important;
      border-radius: 4px;
    }
  }

  .fc-daygrid-dot-event {
    padding: 0px;
  }

  .fc-daygrid-dot-event.fc-event-single-day,
  .fc-daygrid-dot-event.fc-event-single-day:hover {
    background: transparent;
  }

  .fc-daygrid-dot-event.fc-event-single-day {
    .fc-event-main {
      width: 100%;
      flex: 1 1 auto;
      min-width: 0;
    }

    .fc-event-main-frame-inline {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
      width: 100%;
    }

    .fc-color-icon {
      display: inline-block;
      flex: 0 0 auto;
      width: 4px;
      height: 12px;
      border: 0px solid transparent;
      border-radius: 2px;
    }

    .fc-event-title {
      color: #606060;
      font-weight: 400;
    }

    .fc-event-title-container {
      flex: 1 1 auto;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .fc-event-title-inline {
      display: inline;
    }

    .fc-event-time {
      color: #929292;
      font-weight: 400;
      flex: 0 0 auto;
      white-space: nowrap;
      margin-left: auto;
    }
  }

  .fc-color-black .fc-event-time {
    color: #000000;
  }

  .fc-color-white .fc-event-time {
    color: #ffffff;
  }

  .fc-event-disabled {
    opacity: 0.3 !important;

    .fc-event-time {
      color: #000000;
    }
  }

  .fc-more-link {
    margin: 1px 5px 0;
    padding: 0;
    color: #606060;
  }

  .fc-datepicker-popover {
    position: fixed;
    z-index: 40;

    width: max-content;

    transform: translateX(-100%);
    box-shadow: 0 8px 18px rgb(0 0 0 / 20%);
    border-radius: 8px;

    .react-datepicker {
      display: block;

      border: 1px solid #d6d9de;
      border-radius: 8px;

      &__month-container {
        float: none;
      }
    }
  }

  .fc-event [data-calendar-event-title-link] {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }`,w=e(C)`
  .fc-header-toolbar.fc-toolbar {
    align-items: center;
    margin-bottom: 24px;

    .fc-toolbar-chunk {
      display: flex;
      align-items: center;

      &:first-child {
        flex: 0 0 300px;
      }

      &:last-child {
        display: flex;
        justify-content: end;

        flex: 0 0 300px;
      }
    }
  }

  .fc-toolbar-title {
    margin: 0;
    font-size: 28px;
    font-weight: 400;
    line-height: 1.2;
    color: #000000;
  }

  .fc-refresh-button,
  .fc-datepicker-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .fc-button .fc-icon.fc-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 1;
    vertical-align: middle;
  }

  .fc-icon.fc-icon {
    &-refresh,
    &-datepicker {
      width: 20px;
      height: 20px;
      background-color: currentColor;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;

      &::before, &::after {
        content: none;
      }
    }

    &-refresh {
      mask-image: url("${x}");
    }

    &-datepicker {
      mask-image: url("${S}");
    }
  }

  &.is-fetching-events .fc-icon-refresh {
    animation: calendar-refresh-spin 0.8s linear infinite;
  }

  @keyframes calendar-refresh-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .fc-daygrid-day-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    padding: 0;
    border-radius: 27px;
    color: var(--gray-500);
    font-size: 16px;
    line-height: 1;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
`;export{v as a,_ as c,b as i,a as l,w as n,h as o,y as r,g as s,C as t};