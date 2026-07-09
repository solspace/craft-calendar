import{i as e,y as t}from"./date-CqyulfH7.js";var n=()=>{let e=window.Craft;return e?.csrfTokenValue?e.csrfTokenValue:null},r=e=>{if(!e)return!1;let t=e.toUpperCase();return![`GET`,`HEAD`,`OPTIONS`].includes(t)},i=(e,t={})=>{let i=new Headers(t.headers);if(r(t.method)){let e=n();e&&i.set(`X-CSRF-Token`,e)}return fetch(e,{...t,credentials:t.credentials??`same-origin`,headers:i})},a=new Map,o=new Map,s=(e,t)=>`${e}|${t}`,c=(t,n)=>{let r=e(t),c=e(n),l=s(r,c),u=a.get(l);if(u)return Promise.resolve(u);let d=o.get(l);if(d)return d;let f=new URL(Craft.getCpUrl(`calendar/api/events`),window.location.origin);f.searchParams.set(`start`,r),f.searchParams.set(`end`,c);let p=i(f).then(async e=>{if(!e.ok)throw Error(`Network response was not ok`);let t=await e.json();return a.set(l,t),t}).finally(()=>{o.delete(l)});return o.set(l,p),p},l=e=>Number.parseInt(e.split(`-`,1)[0]||e,10),u=(e,t)=>e?t?e.toISOString().slice(0,10):e.toISOString():null,d=(e,t)=>!e||!t?null:Math.round((e.getTime()-t.getTime())/1e3),f=async(e,t)=>{let n=await i(Craft.getCpUrl(`calendar/api/events/${e}`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`Network response was not ok`);let r=await n.json();if(r?.success===!1)throw Error(r?.message||`Failed to ${e} event`)},p=(e,t)=>{let n=/^\d+-(\d{8})(\d{6})$/.exec(e);if(!n)return null;let[,r,i]=n,a=Number.parseInt(r.slice(0,4),10),o=Number.parseInt(r.slice(4,6),10)-1,s=Number.parseInt(r.slice(6,8),10),c=Number.parseInt(i.slice(0,2),10),l=Number.parseInt(i.slice(2,4),10),d=Number.parseInt(i.slice(4,6),10);return u(new Date(Date.UTC(a,o,s,c,l,d)),t)},m=async({event:e,occurrenceDate:t,scope:n=`series`,refetchEvents:r,revert:i})=>{try{return await f(`move`,{eventId:l(String(e.id)),scope:n,occurrenceDate:t,start:u(e.start,e.allDay),end:u(e.end,e.allDay),allDay:e.allDay}),_(),r(),!0}catch(e){return console.error(`Error moving event:`,e),i?.(),!1}},h=async({event:e,oldEvent:t,refetchEvents:n,revert:r})=>{try{return await f(`resize`,{eventId:l(String(e.id)),scope:`series`,start:u(e.start,e.allDay),end:u(e.end,e.allDay),oldStart:u(t.start,t.allDay),oldEnd:u(t.end,t.allDay),startDeltaSeconds:d(e.start,t.start),endDeltaSeconds:d(e.end,t.end),allDay:e.allDay}),_(),n(),!0}catch(e){return console.error(`Error resizing event:`,e),r?.(),!1}},g=async({event:e,occurrenceDate:t,scope:n=`series`,refetchEvents:r,revert:i})=>{try{return await f(`delete`,{eventId:l(String(e.id)),scope:n,occurrenceDate:t}),_(),r(),!0}catch(e){return console.error(`Error deleting event:`,e),i?.(),!1}},_=()=>{a.clear(),o.clear()},v=e=>(t,n,r)=>{let i=t.start,a=t.end;return c(i,a).then(t=>{let r;return r=e.size?t.filter(t=>!e.has(t.calendar)):t,n(r),r}).catch(e=>(r(e),[]))},y=v(new Set),b=`data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M8%200a8%208%200%201%200%200%2016A8%208%200%200%200%208%200m5.292%205H9.683a12.6%2012.6%200%200%200-.76-3.029%206.97%206.97%200%200%201%204.369%203.03m-4.54-3.424c.293.746.523%201.705.672%202.924H6.576c.15-1.219.38-2.178.672-2.924A7%207%200%200%201%208%201c.26%200%20.511.054.752.152M5.076%201.971A12.6%2012.6%200%200%200%204.317%205H.708a6.97%206.97%200%200%201%204.368-3.029M.159%206h4.026a13.6%2013.6%200%200%200%200%204H.159a7%207%200%200%201%200-4m.549%205h3.609c.185%201.24.445%202.275.76%203.029A6.97%206.97%200%200%201%20.708%2011m4.54%203.424A7%207%200%200%201%204.576%2011h2.848c-.15%201.219-.38%202.178-.672%202.924A7%207%200%200%201%208%2015a7%207%200%200%201-2.752-.576M8.752%2015.848c-.293-.746-.523-1.705-.672-2.924h2.848c-.15%201.219-.38%202.178-.672%202.924A7%207%200%200%201%208%2015a7%207%200%200%201%20.752.848M11.683%2011h3.609a6.97%206.97%200%200%201-4.368%203.029A12.6%2012.6%200%200%200%2011.683%2011M15.841%2010h-4.026a13.6%2013.6%200%200%200%200-4h4.026a7%207%200%200%201%200%204%22%2F%3E%3C%2Fsvg%3E`,x=`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik01MDAuNyAxMzguN0w1MTIgMTQ5LjRMNTEyIDk2QzUxMiA3OC4zIDUyNi4zIDY0IDU0NCA2NEM1NjEuNyA2NCA1NzYgNzguMyA1NzYgOTZMNTc2IDIyNEM1NzYgMjQxLjcgNTYxLjcgMjU2IDU0NCAyNTZMNDE2IDI1NkMzOTguMyAyNTYgMzg0IDI0MS43IDM4NCAyMjRDMzg0IDIwNi4zIDM5OC4zIDE5MiA0MTYgMTkyTDQ2My45IDE5Mkw0NTYuMyAxODQuOEM0NTYuMSAxODQuNiA0NTUuOSAxODQuNCA0NTUuNyAxODQuMkMzODAuNyAxMDkuMiAyNTkuMiAxMDkuMiAxODQuMiAxODQuMkMxMDkuMiAyNTkuMiAxMDkuMiAzODAuNyAxODQuMiA0NTUuN0MyNTkuMiA1MzAuNyAzODAuNyA1MzAuNyA0NTUuNyA0NTUuN0M0NjMuOSA0NDcuNSA0NzEuMiA0MzguOCA0NzcuNiA0MjkuNkM0ODcuNyA0MTUuMSA1MDcuNyA0MTEuNiA1MjIuMiA0MjEuN0M1MzYuNyA0MzEuOCA1NDAuMiA0NTEuOCA1MzAuMSA0NjYuM0M1MjEuNiA0NzguNSA1MTEuOSA0OTAuMSA1MDEgNTAxQzQwMSA2MDEgMjM4LjkgNjAxIDEzOSA1MDFDMzkuMSA0MDEgMzkgMjM5IDEzOSAxMzlDMjM4LjkgMzkuMSA0MDAuNyAzOSA1MDAuNyAxMzguN3oiLz48L3N2Zz4=`,S=`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik0yMTYgNjRDMjI5LjMgNjQgMjQwIDc0LjcgMjQwIDg4TDI0MCAxMjhMNDAwIDEyOEw0MDAgODhDNDAwIDc0LjcgNDEwLjcgNjQgNDI0IDY0QzQzNy4zIDY0IDQ0OCA3NC43IDQ0OCA4OEw0NDggMTI4TDQ4MCAxMjhDNTE1LjMgMTI4IDU0NCAxNTYuNyA1NDQgMTkyTDU0NCA0ODBDNTQ0IDUxNS4zIDUxNS4zIDU0NCA0ODAgNTQ0TDE2MCA1NDRDMTI0LjcgNTQ0IDk2IDUxNS4zIDk2IDQ4MEw5NiAxOTJDOTYgMTU2LjcgMTI0LjcgMTI4IDE2MCAxMjhMMTkyIDEyOEwxOTIgODhDMTkyIDc0LjcgMjAyLjcgNjQgMjE2IDY0ek0yMTYgMTc2TDE2MCAxNzZDMTUxLjIgMTc2IDE0NCAxODMuMiAxNDQgMTkyTDE0NCAyNDBMNDk2IDI0MEw0OTYgMTkyQzQ5NiAxODMuMiA0ODguOCAxNzYgNDgwIDE3NkwyMTYgMTc2ek0xNDQgMjg4TDE0NCA0ODBDMTQ0IDQ4OC44IDE1MS4yIDQ5NiAxNjAgNDk2TDQ4MCA0OTZDNDg4LjggNDk2IDQ5NiA0ODguOCA0OTYgNDgwTDQ5NiAyODhMMTQ0IDI4OHoiLz48L3N2Zz4=`,C=t.div`

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
  }`,w=t(C)`
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

  .fc-icon.fc-icon {
    &-site,
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

    &-site {
      mask-image: url("${b}");
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
`;export{v as a,m as c,_ as i,h as l,w as n,g as o,y as r,p as s,C as t,i as u};