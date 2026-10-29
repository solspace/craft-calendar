import{d as e,i as t,l as n,o as r,s as i,t as a}from"./translations-CL8ZheTP.js";import{I as o}from"./clsx-cTcqfvCk.js";import{a as s}from"./overlap-warning-D3FRusxs.js";var c=e(n()),l=i(),u=(e,t)=>e.filter(e=>e.start&&e.start.getTime()<t.getTime()+864e5&&(e.end?.getTime()??e.start.getTime()+1)>t.getTime()),d=(e,t=`month`,n)=>{let r=new URL(Craft.getCpUrl(`calendar/${o(e)}/${t}`),window.location.origin),i=n??new URLSearchParams(window.location.search).get(`site`);return i&&r.searchParams.set(`site`,i),r.toString()},f=(e,t)=>{(0,c.useEffect)(()=>{if(!e.current)return;let n,r=typeof ResizeObserver>`u`?null:new ResizeObserver(()=>{cancelAnimationFrame(n),n=requestAnimationFrame(()=>t.current?.getApi().updateSize())});r?.observe(e.current);let i=()=>t.current?.getApi().refetchEvents();return window.addEventListener(`calendar:events-changed`,i),()=>{cancelAnimationFrame(n),r?.disconnect(),window.removeEventListener(`calendar:events-changed`,i)}},[e,t])},p=({next:e=!1})=>(0,l.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{d:e?`m6 3 5 5-5 5`:`m10 3-5 5 5 5`,strokeLinecap:`round`,strokeLinejoin:`round`})}),m=({href:e,refresh:t,loading:n=!1})=>(0,l.jsxs)(`div`,{className:`calendar-widget-footer`,children:[(0,l.jsxs)(`a`,{href:e,children:[a(`View calendar`),` `,(0,l.jsx)(`span`,{"aria-hidden":`true`,children:`→`})]}),t&&(0,l.jsx)(`button`,{type:`button`,disabled:n,onClick:()=>{s(),t()},children:a(n?`Loading…`:`Refresh`)})]}),h=t`
  min-width: 0;
  color: var(--text-color, #33404d);

  .calendar-widget-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 12px;
    margin-bottom: 12px;
    h3 {
      flex: 1 1 120px;
      margin: 0;
      color: var(--gray-700);
      font-size: 15px;
      font-weight: 600;
      line-height: 28px;
    }
  }

  .calendar-widget-nav {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    flex: 0 0 auto;
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      margin: 0;
      padding: 0 5px;
      border: 0;
      border-radius: 4px;
      background: var(--button-bg, #edf0f5);
      color: var(--gray-600);
      font: inherit;
      font-size: 11px;
      cursor: pointer;
      &:hover { background: var(--button-bg--hover, #e1e7ef); }
      svg { display: block; flex: 0 0 auto; }
    }
  }

  .calendar-widget-view-switcher {
    display: flex;
    min-inline-size: 0;
    border: 0;
    margin: 0 0 12px;
    gap: 2px;
    padding: 3px;
    border-radius: 6px;
    background: var(--gray-100, #edf0f5);
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 0;
      min-width: 0;
      min-height: 28px;
      margin: 0;
      padding: 0 6px;
      border: 0;
      border-radius: 4px;
      background: transparent;
      color: var(--gray-600);
      font: inherit;
      font-size: 11px;
      line-height: 20px;
      cursor: pointer;
      &[aria-pressed="true"] { background: var(--gray-500); color: white; }
      &:hover:not([aria-pressed="true"]) { background: var(--gray-200); }
    }
  }

  .calendar-widget-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 12px;
    font-size: 12px;
    line-height: 20px;
    a { display: inline-flex; align-items: center; gap: 6px; }
    button {
      appearance: none;
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--link-color);
      font: inherit;
      cursor: pointer;
      &:hover { text-decoration: underline; }
      &:disabled { opacity: 0.6; cursor: wait; }
    }
  }

  .calendar-widget-status {
    margin: 8px 0 0;
    color: var(--light-text-color, #596673);
    font-size: 12px;
    line-height: 1.5;
  }

  .calendar-widget-nav button:focus-visible,
  .calendar-widget-view-switcher button:focus-visible,
  .calendar-widget-footer button:focus-visible {
    outline: 2px solid var(--link-color);
    outline-offset: 2px;
  }
`,g=e(r()),_=new WeakSet,v=(e,t)=>{let n=n=>{if(_.has(n))return;let r=n.querySelector(`[data-config]`),i=n.querySelector(`[data-root]`);if(!r?.textContent||!i){console.error(`Widget ${e}: Missing config or root element`,n);return}_.add(n),n.dataset.mounted=`true`;let a=JSON.parse(r.textContent);g.createRoot(i).render((0,l.jsx)(t,{config:a}))},r=()=>{i(),new MutationObserver(t=>{t.forEach(t=>{t.addedNodes.forEach(t=>{t instanceof HTMLElement&&(t.matches(`[data-calendar-widget="${e}"]`)&&n(t),i(t))})})}).observe(document.documentElement,{childList:!0,subtree:!0})},i=(t=document)=>{t.querySelectorAll(`[data-calendar-widget="${e}"]:not([data-mounted])`).forEach(n)};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,r):r()};export{f as a,u as i,p as n,d as o,m as r,h as s,v as t};