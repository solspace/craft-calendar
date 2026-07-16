import{a as e,f as t,g as n,m as r,u as i}from"./date-B-YCzvOK.js";import{n as a,t as o}from"./dist-Dxlx9seu.js";import{t as s}from"./interaction-D4ecfs1r.js";import{i as c,t as l}from"./calendar.styles-D4bT7epO.js";import{t as u}from"./loader-CPRzIl78.js";var d=n(r()),f=i(l)`
  && .fc {
    &-header-toolbar {
      margin-bottom: 0.5em;
    }

    &-col-header-cell {
      &-cushion {
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
      }
    }

    &-daygrid-day-events {
      display: none;
    }

    &-day {
      cursor: pointer;

      &.fc-has-event {
        background-color: #cfd8e3 !important;

        &.fc-day-other {
          background-color: #9f9f9f !important;
          color: white;
        }
      }

      &-today {
        &:not(.fc-has-event) {
          background-color: #e5422b !important;
        }

        &.fc-has-event, .fc-daygrid-day-number {
          background-color: #9c2212 !important;
        }
      }
    }

    &-button-primary {
      padding: 2px 5px !important;
    }
  }
`,p=t(),m=new Set;u(`mini`,({config:t})=>{let n=(0,d.useRef)(null),r=(0,d.useRef)(null),i=(0,d.useMemo)(()=>c(m,t.currentSiteId,t.calendars),[t.currentSiteId,t.calendars]);(0,d.useLayoutEffect)(()=>{setTimeout(()=>{requestAnimationFrame(()=>{n.current?.getApi().updateSize()})},600)},[]);let l=(0,d.useCallback)(e=>(0,p.jsx)(`span`,{className:`fc-day-header-label`,children:new Intl.DateTimeFormat(void 0,{weekday:`narrow`}).format(e.date)}),[]),u=(0,d.useCallback)(t=>{window.location.href=Craft.getCpUrl(`calendar/${e(t.date)}/day`)},[]);return(0,p.jsx)(f,{ref:r,children:(0,p.jsx)(o,{ref:n,themeSystem:`bootstrap5`,height:280,plugins:[a,s],timeZone:`UTC`,locale:t.language,firstDay:t.weekStartDay,initialView:`dayGridMonth`,initialDate:t.currentDay,nextDayThreshold:`0${t.overlapThreshold||0}:00:00`,events:async(e,t,n)=>{let a=await i(e,t,n);return a.forEach(e=>{let t=e.start.toString().slice(0,10);(r.current?.querySelector(`.fc-day[data-date="${t}"]`))?.classList.add(`fc-has-event`)}),a},dayHeaderContent:l,dateClick:u,showNonCurrentDates:!1,fixedWeekCount:!1,headerToolbar:{start:`prev`,center:`title`,end:`next`}})})});