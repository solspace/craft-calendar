import{a as e,d as t,l as n,s as r,t as i}from"./translations-BT7AJKOt.js";import{a,c as o,i as s,n as c,o as l,r as u,s as d}from"./create-event-CUry2Hn8.js";import{n as f}from"./http-CmK6H-J6.js";import{t as p}from"./calendar.now-indicator-yvTSfd9O.js";import{s as m,t as h}from"./loader-BOhj6sYn.js";var g=t(n()),_=e.div`
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
`,v=r(),y=e=>{let t=p();t.setUTCMinutes(0,0,0),e.allDayDefault&&t.setUTCHours(0);let n=t.getTime()/1e3;return{id:`widget-create-event`,title:``,allDay:e.allDayDefault,start:n,end:n+(e.allDayDefault?86400:Math.max(1,e.eventDuration)*60)}};h(`event`,({config:e})=>{let[t,n]=(0,g.useState)(()=>y(e)),[r,a]=(0,g.useState)(0),[s,l]=(0,g.useState)(null),u=()=>{n(y(e)),a(e=>e+1)};return Object.keys(e.calendars).length?(0,v.jsx)(o,{config:{...e,language:e.language||`en-US`,timezone:e.timezone||`UTC`,isSolspaceAiConnected:!1,isMultiSite:!1,isDragAndDropEnabled:!1,isQuickCreateEnabled:!0,canEditEvents:!0},children:(0,v.jsx)(f,{children:(0,v.jsxs)(_,{children:[(0,v.jsx)(c,{variant:`widget`,showMoreDetails:e.showMoreDetails??!0,draft:t,onChange:n,onCancel:()=>{u(),l(null)},onConfirm:e=>{l({...e,title:e?.title||t.title}),u()},refetchEvents:()=>window.dispatchEvent(new Event(`calendar:events-changed`))},r),s&&(0,v.jsxs)(`div`,{className:`calendar-widget-success`,role:`status`,children:[(0,v.jsx)(`strong`,{children:i(`Event created successfully`)}),s.url&&(0,v.jsxs)(`a`,{href:s.url,children:[i(`View event`),`: `,s.title]})]})]})})}):(0,v.jsx)(_,{children:(0,v.jsx)(`p`,{className:`calendar-widget-status`,children:i(`No calendars are available.`)})})});