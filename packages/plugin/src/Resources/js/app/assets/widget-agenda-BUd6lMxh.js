import{C as e,T as t,x as n,y as r}from"./date-CqyulfH7.js";import{n as i,t as a}from"./dist-D-H955b-.js";import{t as o}from"./timegrid-BfG3sl7z.js";import{n as s,r as c}from"./calendar.styles-9GPkdaey.js";import{t as l}from"./loader-qUj2lxcw.js";var u=r(s)`
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
`,d=t(e()),f=n();l(`agenda`,({config:e})=>{let t=(0,d.useRef)(null),{formats:n,view:r}=e,s;switch(r){case`day`:s=`timeGridDay`;break;case`week`:s=`timeGridWeek`;break;case`month`:s=`dayGridMonth`;break}return(0,d.useLayoutEffect)(()=>{setTimeout(()=>{requestAnimationFrame(()=>{t.current?.getApi().updateSize()})},600)},[]),(0,f.jsx)(u,{children:(0,f.jsx)(a,{ref:t,themeSystem:`bootstrap5`,plugins:[i,o],initialView:s,initialDate:e.currentDay,locale:e.language,timeZone:`UTC`,firstDay:e.weekStartDay,nextDayThreshold:`0${e.overlapThreshold||0}:00:00`,fixedWeekCount:!0,dayMaxEventRows:!0,height:500,events:c,eventTimeFormat:n.time.short.js,headerToolbar:{start:`title`,end:`prev,today,next`},buttonText:{today:Craft.t(`calendar`,`Today`)},editable:!1,selectable:!1})})});