import{c as e,i as t,o as n,u as r}from"./translations-CPvEMAbD.js";import{b as i,t as a}from"./localization-BHnAK9Na.js";import{m as o,n as s,p as c}from"./calendar.events-CgSVi6Oj.js";import{t as l}from"./interaction-DkjMMopr.js";import{t as u}from"./calendar.styles-CIEulExP.js";import{t as d}from"./loader-DKETRy5r.js";var f=r(e()),p=t(u)`
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
`,m=n(),h=new Set;d(`mini`,({config:e})=>{let t=(0,f.useRef)(null),n=(0,f.useRef)(null),r=(0,f.useMemo)(()=>s(h,e.currentSiteId,e.calendars),[e.currentSiteId,e.calendars]);(0,f.useLayoutEffect)(()=>{setTimeout(()=>{requestAnimationFrame(()=>{t.current?.getApi().updateSize()})},600)},[]);let u=(0,f.useCallback)(t=>(0,m.jsx)(`span`,{className:`fc-day-header-label`,children:new Intl.DateTimeFormat(e.language,{weekday:`narrow`,timeZone:`UTC`}).format(t.date)}),[e.language]),d=(0,f.useCallback)(e=>{window.location.href=Craft.getCpUrl(`calendar/${i(e.date)}/day`)},[]);return(0,m.jsx)(p,{ref:n,children:(0,m.jsx)(c,{...a(),ref:t,themeSystem:`bootstrap5`,height:280,plugins:[o,l],timeZone:`UTC`,locale:e.language,firstDay:e.weekStartDay,initialView:`dayGridMonth`,initialDate:e.currentDay,nextDayThreshold:`0${e.overlapThreshold||0}:00:00`,events:async(e,t,i)=>{let a=await r(e,t,i);return a.forEach(e=>{let t=e.start.toString().slice(0,10);(n.current?.querySelector(`.fc-day[data-date="${t}"]`))?.classList.add(`fc-has-event`)}),a},dayHeaderContent:u,dateClick:d,showNonCurrentDates:!1,fixedWeekCount:!1,headerToolbar:{start:`prev`,center:`title`,end:`next`}})})});