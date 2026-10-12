import{c as e,i as t,o as n,u as r}from"./translations-CPvEMAbD.js";import{t as i}from"./localization-Mf36Vfg7.js";import{m as a,n as o,p as s}from"./calendar.events-B0-G7rS_.js";import{t as c}from"./timegrid-dPK_ini7.js";import{r as l}from"./calendar.styles-CIEulExP.js";import{t as u}from"./loader-DKETRy5r.js";var d=t(l)`
  .fc {
    min-height: 500px;
  }

  .fc-col-header-cell {
    &-cushion {
      overflow: hidden;
      white-space: nowrap;
      font-size: 11px;
    }
  }

  .fc-header-toolbar.fc-toolbar {
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;

    .fc-toolbar-chunk {
      flex: 1 1 auto;
      min-width: 0;

      &:first-child,
      &:last-child {
        flex-basis: auto;
      }
    }
  }

  .fc-toolbar-title {
    font-size: 22px;
  }

  .fc-button-group {
    flex-wrap: wrap;
  }

  .fc-view-harness {
    min-height: 420px;
  }
`,f=r(e()),p=n(),m=new Set;u(`agenda`,({config:e})=>{let t=(0,f.useRef)(null),{formats:n,view:r,currentSiteId:l,calendars:u}=e,h=(0,f.useMemo)(()=>o(m,l,u),[l,u]),g;switch(r){case`day`:g=`timeGridDay`;break;case`week`:g=`timeGridWeek`;break;case`month`:g=`dayGridMonth`;break}return(0,f.useLayoutEffect)(()=>{setTimeout(()=>{requestAnimationFrame(()=>{t.current?.getApi().updateSize()})},600)},[]),(0,p.jsx)(d,{children:(0,p.jsx)(s,{...i(),ref:t,themeSystem:`bootstrap5`,plugins:[a,c],initialView:g,initialDate:e.currentDay,locale:e.language,timeZone:`UTC`,firstDay:e.weekStartDay,nextDayThreshold:`0${e.overlapThreshold||0}:00:00`,fixedWeekCount:!0,dayMaxEventRows:!0,height:500,events:h,eventTimeFormat:n.time.short.js,headerToolbar:{start:`title`,end:`prev,today,next`},buttonText:{today:Craft.t(`calendar`,`Today`)},editable:!1,selectable:!1})})});