import{_ as e,d as t,h as n,p as r}from"./date-DHm29epU.js";import{n as i,t as a}from"./dist-DgGuNF4E.js";import{t as o}from"./timegrid-Drf6zlY9.js";import{i as s,n as c}from"./calendar.styles-BJzDU9pJ.js";import{t as l}from"./loader-Bd6o1-jj.js";var u=t(c)`
  .fc {
    min-height: 500px;
  }

  .fc-col-header-cell {
    &-cushion {
      overflow: hidden;
      white-space: nowrap;
      font-size: 12px;
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
`,d=e(n()),f=r(),p=new Set;l(`agenda`,({config:e})=>{let t=(0,d.useRef)(null),{formats:n,view:r,currentSiteId:c,calendars:l}=e,m=(0,d.useMemo)(()=>s(p,c,l),[c,l]),h;switch(r){case`day`:h=`timeGridDay`;break;case`week`:h=`timeGridWeek`;break;case`month`:h=`dayGridMonth`;break}return(0,d.useLayoutEffect)(()=>{setTimeout(()=>{requestAnimationFrame(()=>{t.current?.getApi().updateSize()})},600)},[]),(0,f.jsx)(u,{children:(0,f.jsx)(a,{ref:t,themeSystem:`bootstrap5`,plugins:[i,o],initialView:h,initialDate:e.currentDay,locale:e.language,timeZone:`UTC`,firstDay:e.weekStartDay,nextDayThreshold:`0${e.overlapThreshold||0}:00:00`,fixedWeekCount:!0,dayMaxEventRows:!0,height:500,events:m,eventTimeFormat:n.time.short.js,headerToolbar:{start:`title`,end:`prev,today,next`},buttonText:{today:Craft.t(`calendar`,`Today`)},editable:!1,selectable:!1})})});