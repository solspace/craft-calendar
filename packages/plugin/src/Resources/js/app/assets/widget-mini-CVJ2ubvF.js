import{_ as e,a as t,d as n,h as r,p as i}from"./date-DHm29epU.js";import{n as a,t as o}from"./dist-DgGuNF4E.js";import{t as s}from"./interaction-DMXpF6lk.js";import{i as c,t as l}from"./calendar.styles-BJzDU9pJ.js";import{t as u}from"./loader-Bd6o1-jj.js";var d=e(r()),f=n(l)`
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
`,p=i(),m=new Set;u(`mini`,({config:e})=>{let n=(0,d.useRef)(null),r=(0,d.useRef)(null),i=(0,d.useMemo)(()=>c(m,e.currentSiteId,e.calendars),[e.currentSiteId,e.calendars]);(0,d.useLayoutEffect)(()=>{setTimeout(()=>{requestAnimationFrame(()=>{n.current?.getApi().updateSize()})},600)},[]);let l=(0,d.useCallback)(e=>(0,p.jsx)(`span`,{className:`fc-day-header-label`,children:new Intl.DateTimeFormat(void 0,{weekday:`narrow`}).format(e.date)}),[]),u=(0,d.useCallback)(e=>{window.location.href=Craft.getCpUrl(`calendar/${t(e.date)}/day`)},[]);return(0,p.jsx)(f,{ref:r,children:(0,p.jsx)(o,{ref:n,themeSystem:`bootstrap5`,height:280,plugins:[a,s],timeZone:`UTC`,locale:e.language,firstDay:e.weekStartDay,initialView:`dayGridMonth`,initialDate:e.currentDay,nextDayThreshold:`0${e.overlapThreshold||0}:00:00`,events:async(e,t,n)=>{let a=await i(e,t,n);return a.forEach(e=>{let t=e.start.toString().slice(0,10);(r.current?.querySelector(`.fc-day[data-date="${t}"]`))?.classList.add(`fc-has-event`)}),a},dayHeaderContent:l,dateClick:u,showNonCurrentDates:!1,fixedWeekCount:!1,headerToolbar:{start:`prev`,center:`title`,end:`next`}})})});