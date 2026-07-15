import{i as e,o as t,u as n}from"./date-B-YCzvOK.js";var r=()=>{let e=window.Craft;return e?.csrfTokenValue?e.csrfTokenValue:null},i=e=>{if(!e)return!1;let t=e.toUpperCase();return![`GET`,`HEAD`,`OPTIONS`].includes(t)},a=(e,t={})=>{let n=new Headers(t.headers);if(i(t.method)){let e=r();e&&n.set(`X-CSRF-Token`,e)}return fetch(e,{...t,credentials:t.credentials??`same-origin`,headers:n})},o=new Map,s=new Map,c=(e,t,n)=>`${e}|${t}|${n??``}`,l=(t,n,r)=>{let i=e(t),l=e(n),u=c(i,l,r),d=o.get(u);if(d)return Promise.resolve(d);let f=s.get(u);if(f)return f;let p=new URL(Craft.getCpUrl(`calendar/api/events`),window.location.origin);p.searchParams.set(`start`,i),p.searchParams.set(`end`,l),r!==void 0&&p.searchParams.set(`siteId`,String(r));let m=a(p).then(async e=>{if(!e.ok)throw Error(`Network response was not ok`);let t=await e.json();return o.set(u,t),t}).finally(()=>{s.delete(u)});return s.set(u,m),m},u=e=>Number.parseInt(e.split(`-`,1)[0]||e,10),d=(n,r)=>n?r?e(n):t(n):null,f=(e,t)=>!e||!t?null:Math.round((e.getTime()-t.getTime())/1e3),p=async(e,t)=>{let n=await a(Craft.getCpUrl(`calendar/api/events/${e}`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`Network response was not ok`);let r=await n.json();if(r?.success===!1)throw Error(r?.message||`Failed to ${e} event`)},m=(e,t)=>{let n=/^\d+-(\d{8})(\d{6})$/.exec(e);if(!n)return null;let[,r,i]=n,a=Number.parseInt(r.slice(0,4),10),o=Number.parseInt(r.slice(4,6),10)-1,s=Number.parseInt(r.slice(6,8),10),c=Number.parseInt(i.slice(0,2),10),l=Number.parseInt(i.slice(2,4),10),u=Number.parseInt(i.slice(4,6),10);return d(new Date(Date.UTC(a,o,s,c,l,u)),t)},h=async({event:e,occurrenceDate:t,scope:n=`series`,refetchEvents:r,revert:i})=>{try{return await p(`move`,{eventId:u(String(e.id)),scope:n,occurrenceDate:t,start:d(e.start,e.allDay),end:d(e.end,e.allDay),allDay:e.allDay}),v(),r(),!0}catch(e){return console.error(`Error moving event:`,e),i?.(),!1}},g=async({event:e,oldEvent:t,refetchEvents:n,revert:r})=>{try{return await p(`resize`,{eventId:u(String(e.id)),scope:`series`,start:d(e.start,e.allDay),end:d(e.end,e.allDay),oldStart:d(t.start,t.allDay),oldEnd:d(t.end,t.allDay),startDeltaSeconds:f(e.start,t.start),endDeltaSeconds:f(e.end,t.end),allDay:e.allDay}),v(),n(),!0}catch(e){return console.error(`Error resizing event:`,e),r?.(),!1}},_=async({event:e,occurrenceDate:t,scope:n=`series`,refetchEvents:r,revert:i})=>{try{return await p(`delete`,{eventId:u(String(e.id)),scope:n,occurrenceDate:t}),v(),r(),!0}catch(e){return console.error(`Error deleting event:`,e),i?.(),!1}},v=()=>{o.clear(),s.clear()},y=(e,t)=>(n,r,i)=>{let a=n.start,o=n.end;return l(a,o,t).then(t=>{let n;return n=e.size?t.filter(t=>!e.has(t.calendar)):t,r(n),n}).catch(e=>(i(e),[]))},b=y(new Set),x=`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik01MDAuNyAxMzguN0w1MTIgMTQ5LjRMNTEyIDk2QzUxMiA3OC4zIDUyNi4zIDY0IDU0NCA2NEM1NjEuNyA2NCA1NzYgNzguMyA1NzYgOTZMNTc2IDIyNEM1NzYgMjQxLjcgNTYxLjcgMjU2IDU0NCAyNTZMNDE2IDI1NkMzOTguMyAyNTYgMzg0IDI0MS43IDM4NCAyMjRDMzg0IDIwNi4zIDM5OC4zIDE5MiA0MTYgMTkyTDQ2My45IDE5Mkw0NTYuMyAxODQuOEM0NTYuMSAxODQuNiA0NTUuOSAxODQuNCA0NTUuNyAxODQuMkMzODAuNyAxMDkuMiAyNTkuMiAxMDkuMiAxODQuMiAxODQuMkMxMDkuMiAyNTkuMiAxMDkuMiAzODAuNyAxODQuMiA0NTUuN0MyNTkuMiA1MzAuNyAzODAuNyA1MzAuNyA0NTUuNyA0NTUuN0M0NjMuOSA0NDcuNSA0NzEuMiA0MzguOCA0NzcuNiA0MjkuNkM0ODcuNyA0MTUuMSA1MDcuNyA0MTEuNiA1MjIuMiA0MjEuN0M1MzYuNyA0MzEuOCA1NDAuMiA0NTEuOCA1MzAuMSA0NjYuM0M1MjEuNiA0NzguNSA1MTEuOSA0OTAuMSA1MDEgNTAxQzQwMSA2MDEgMjM4LjkgNjAxIDEzOSA1MDFDMzkuMSA0MDEgMzkgMjM5IDEzOSAxMzlDMjM4LjkgMzkuMSA0MDAuNyAzOSA1MDAuNyAxMzguN3oiLz48L3N2Zz4=`,S=`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik0yMTYgNjRDMjI5LjMgNjQgMjQwIDc0LjcgMjQwIDg4TDI0MCAxMjhMNDAwIDEyOEw0MDAgODhDNDAwIDc0LjcgNDEwLjcgNjQgNDI0IDY0QzQzNy4zIDY0IDQ0OCA3NC43IDQ0OCA4OEw0NDggMTI4TDQ4MCAxMjhDNTE1LjMgMTI4IDU0NCAxNTYuNyA1NDQgMTkyTDU0NCA0ODBDNTQ0IDUxNS4zIDUxNS4zIDU0NCA0ODAgNTQ0TDE2MCA1NDRDMTI0LjcgNTQ0IDk2IDUxNS4zIDk2IDQ4MEw5NiAxOTJDOTYgMTU2LjcgMTI0LjcgMTI4IDE2MCAxMjhMMTkyIDEyOEwxOTIgODhDMTkyIDc0LjcgMjAyLjcgNjQgMjE2IDY0ek0yMTYgMTc2TDE2MCAxNzZDMTUxLjIgMTc2IDE0NCAxODMuMiAxNDQgMTkyTDE0NCAyNDBMNDk2IDI0MEw0OTYgMTkyQzQ5NiAxODMuMiA0ODguOCAxNzYgNDgwIDE3NkwyMTYgMTc2ek0xNDQgMjg4TDE0NCA0ODBDMTQ0IDQ4OC44IDE1MS4yIDQ5NiAxNjAgNDk2TDQ4MCA0OTZDNDg4LjggNDk2IDQ5NiA0ODguOCA0OTYgNDgwTDQ5NiAyODhMMTQ0IDI4OHoiLz48L3N2Zz4=`,C=n.div`

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
    --fc-border-color: #e9e9e9;
    --fc-page-bg-color: #fffffe;
    --fc-neutral-bg-color: #f4f7fc;
    --fc-today-bg-color: #fffedd;
    --fc-button-text-color: #29323d;
    --fc-button-bg-color: rgb(96 125 159 / 25%);
    --fc-button-border-color: rgb(96 125 159 / 25%);
    --fc-button-hover-bg-color: #bac6d6;
    --fc-button-hover-border-color: #bac6d6;
    --fc-button-active-bg-color: #bac6d6;
    --fc-button-active-border-color: #bac6d6;
    --fc-more-link-bg-color: transparent;
    --fc-more-link-text-color: #606060;
    --fc-event-selected-overlay-color: rgb(0 0 0 / 15%);
  }

  .fc-button.fc-button-primary {
    box-shadow: none;
    border: none;
    border-radius: 0;
    padding: 7px 14px;
    outline: none;
    text-shadow: none;
    font-weight: 400;

    &:focus,
    &:active,
    &.fc-button-active {
      box-shadow: none;
      outline: none;
    }
  }

  .fc-scrollgrid,
  .fc-scrollgrid table,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: #e9e9e9;
  }

  .fc-col-header-cell-cushion {
    display: block;
    padding: 5px 7px;
    color: #000;
    font-size: 18px;
    font-weight: 400;
    text-align: right;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  .fc-dayGridMonth-view {
    .fc-daygrid-day.fc-day-sat:not(.fc-day-other):not(.fc-day-today),
    .fc-daygrid-day.fc-day-sun:not(.fc-day-other):not(.fc-day-today) {
      background-color: #fbfdff;
    }

    .fc-daygrid-day.fc-day-other {
      background-color: #f4f7fc;

      .fc-daygrid-day-top {
        opacity: 1;
      }
    }
  }

  .fc-daygrid-day-top {
    padding: 2px;
  }

  .fc-day-today .fc-daygrid-day-number {
    background-color: #e5422b;
    color: #fff;
    font-weight: 700;
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
      color: #000;
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
      color: #fff;
      background-color: #e5422b;
    }

    .fc-timegrid-col.fc-day-sat:not(.fc-day-today),
    .fc-timegrid-col.fc-day-sun:not(.fc-day-today) {
      background-color: #fbfdff;
    }
  }

  .fc-timeGridDay-view {
    .fc-col-header {
      display: none;
    }

    .fc-timegrid-col.fc-day-today {
      background-color: #fffffe;
    }
  }

  .fc-timegrid-axis {
    border-color: transparent;
  }

  .fc-timegrid-axis-cushion,
  .fc-timegrid-slot-label-cushion {
    padding-right: 4px;
    color: #000;
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
      font-size: 12px;
      font-weight: 700;
    }
  }

  .fc-daygrid-event-harness .fc-daygrid-event {
    margin: 1px 5px 0;
    border-radius: 0;
  }

  .fc-daygrid-event {
    .fc-event-time {
      font-size: 10px;
      font-weight: 400;
    }

    .fc-event-title {
      font-size: 12px;
    }

    &.fc-event-all-day,
    &.fc-event-multi-day {
      padding: 2px 4px 1px;
      border: none !important;
      border-radius: 0;
    }
  }

  .fc-daygrid-dot-event.fc-event-single-day,
  .fc-daygrid-dot-event.fc-event-single-day:hover {
    background: transparent;
  }

  .fc-daygrid-dot-event.fc-event-single-day {
    .fc-event-main {
      width: 100%;
    }

    .fc-event-main-frame-inline {
      display: flex;
      align-items: center;
      gap: 5px;
      min-width: 0;
    }

    .fc-color-icon {
      display: inline-block;
      flex: 0 0 auto;
      width: 6px;
      height: 6px;
      border: 1px solid transparent;
      border-radius: 999px;
    }

    .fc-event-title {
      color: #606060;
      font-weight: 400;
    }

    .fc-event-title-container {
      min-width: 0;
    }

    .fc-event-title-inline {
      display: inline;
    }

    .fc-event-time {
      color: #929292;
      font-weight: 400;
      flex: 0 0 auto;
      white-space: nowrap;
    }
  }

  .fc-color-black .fc-event-time {
    color: #000;
  }

  .fc-color-white .fc-event-time {
    color: #fff;
  }

  .fc-event-disabled {
    opacity: 0.3 !important;

    .fc-event-time {
      color: #000;
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
  }`,w=n(C)`
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
    color: #000;
  }

  .fc-sitepicker-button,
  .fc-refresh-button,
  .fc-datepicker-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .calendar-sitepicker-craft-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    line-height: 1;
  }

  .calendar-sitepicker-craft-icon::before {
    font-size: 20px;
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
    color: inherit;
    font-size: 16px;
    line-height: 1;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }
`;export{y as a,h as c,v as i,g as l,w as n,_ as o,b as r,m as s,C as t,a as u};