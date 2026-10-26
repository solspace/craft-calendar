import{C as e,J as t,K as n,W as r,X as i}from"./clsx-i4RjRRj2.js";import{a,c as o,i as s,n as c,o as l,r as u,s as d}from"./create-event-CZVwy69O.js";import{a as f,t as p}from"./calendar.now-indicator-BKaW0uu6.js";import{s as m,t as h}from"./loader-DFcjaYBE.js";var g=i(t()),_=r.div`
  ${m}
  container-type: inline-size;

  [data-quick-create-variant="widget"] { width: 100%; max-width: none; max-height: none; }
  ${a} { padding: 0; overflow: visible; scrollbar-gutter: auto; }
  ${l} { padding-bottom: 14px; }
  ${s} { margin-top: 14px; padding: 12px 0 0; gap: 10px; border-top: 0; }
  ${u} { min-height: 24px; }
  ${d} { padding: 10px; }
  .field { min-width: 0; margin: 0; }
  .heading { margin-bottom: 5px; }
  label { font-size: 12px; }
  input.text, select { min-height: 34px; width: 100%; }
  textarea.text { font-size: 13px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; min-height: 34px; }
  .btn:disabled { opacity: 0.5; cursor: default; }
  .error { margin: 12px 0 0; font-size: 12px; line-height: 1.5; }
  .calendar-widget-success {
    display: grid;
    gap: 4px;
    margin: 12px 0 0;
    padding: 10px 12px;
    border: 1px solid var(--gray-150);
    border-radius: 5px;
    color: var(--enabled-color, #008539);
    background: var(--green-050, #f1fcf5);
    font-size: 12px;
    line-height: 1.5;
  }
`,v=n(),y=e=>{let t=p();t.setUTCMinutes(0,0,0),e.allDayDefault&&t.setUTCHours(0);let n=t.getTime()/1e3;return{id:`widget-create-event`,title:``,allDay:e.allDayDefault,start:n,end:n+(e.allDayDefault?86400:Math.max(1,e.eventDuration)*60)}};h(`event`,({config:t})=>{let[n,r]=(0,g.useState)(()=>y(t)),[i,a]=(0,g.useState)(0),[s,l]=(0,g.useState)(null),u=()=>{r(y(t)),a(e=>e+1)};return Object.keys(t.calendars).length?(0,v.jsx)(o,{config:{...t,language:t.language||`en-US`,isMultiSite:!1,isDragAndDropEnabled:!1,isQuickCreateEnabled:!0,canEditEvents:!0},children:(0,v.jsx)(f,{children:(0,v.jsxs)(_,{children:[(0,v.jsx)(c,{variant:`widget`,showMoreDetails:t.showMoreDetails??!0,draft:n,onChange:r,onCancel:()=>{u(),l(null)},onConfirm:e=>{l({...e,title:e?.title||n.title}),u()},refetchEvents:()=>window.dispatchEvent(new Event(`calendar:events-changed`))},i),s&&(0,v.jsxs)(`div`,{className:`calendar-widget-success`,role:`status`,children:[(0,v.jsx)(`strong`,{children:e(`Event created successfully`)}),s.url&&(0,v.jsxs)(`a`,{href:s.url,children:[e(`View event`),`: `,s.title]})]})]})})}):(0,v.jsx)(_,{children:(0,v.jsx)(`p`,{className:`calendar-widget-status`,children:e(`No calendars are available.`)})})});