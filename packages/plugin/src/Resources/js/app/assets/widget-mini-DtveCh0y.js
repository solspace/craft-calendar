import{C as e,T as t,a as n,x as r,y as i}from"./date-CqyulfH7.js";import{n as a,t as o}from"./dist-D-H955b-.js";import{t as s}from"./interaction-8_BZYLKT.js";import{r as c,t as l}from"./calendar.styles-9GPkdaey.js";import{t as u}from"./loader-qUj2lxcw.js";var d=t(e()),f=i(l)`
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
`,p=r();u(`mini`,({config:e})=>{let t=(0,d.useRef)(null),r=(0,d.useRef)(null);(0,d.useLayoutEffect)(()=>{setTimeout(()=>{requestAnimationFrame(()=>{t.current?.getApi().updateSize()})},600)},[]);let i=(0,d.useCallback)(e=>(0,p.jsx)(`span`,{className:`fc-day-header-label`,children:new Intl.DateTimeFormat(void 0,{weekday:`narrow`}).format(e.date)}),[]),l=(0,d.useCallback)(e=>{window.location.href=Craft.getCpUrl(`calendar/${n(e.date)}/day`)},[]);return(0,p.jsx)(f,{ref:r,children:(0,p.jsx)(o,{ref:t,themeSystem:`bootstrap5`,height:280,plugins:[a,s],timeZone:`UTC`,locale:e.language,firstDay:e.weekStartDay,initialView:`dayGridMonth`,initialDate:e.currentDay,nextDayThreshold:`0${e.overlapThreshold||0}:00:00`,events:async(e,t,n)=>{let i=await c(e,t,n);return i.forEach(e=>{let t=e.start.toString().slice(0,10);r.current.querySelector(`.fc-day[data-date="${t}"]`).classList.add(`fc-has-event`)}),i},dayHeaderContent:i,dateClick:l,showNonCurrentDates:!1,fixedWeekCount:!1,headerToolbar:{start:`prev`,center:`title`,end:`next`}})})});