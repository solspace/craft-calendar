import{I as e,J as t,K as n,N as r,W as i,X as a,q as o}from"./clsx-i4RjRRj2.js";import{v as s,y as c}from"./overlap-warning-DAofkiem.js";var l=a(o()),u=a(t()),d=14,f=e=>{if(e instanceof MouseEvent){let t=e.target;if(t instanceof HTMLElement){let n=t.getBoundingClientRect(),r=n.left+e.offsetX,i=n.top+e.offsetY;return new DOMRect(r,i,1,1)}return new DOMRect(e.clientX,e.clientY,1,1)}return e.getBoundingClientRect()},p=({state:e,bridgeRef:t,popoverRef:n})=>{let[r,i]=(0,u.useState)(),a=(0,u.useMemo)(()=>{if(e)return s(e.options)},[e]),o=(0,u.useCallback)(()=>{if(!e||!a){i(void 0);return}let r=t.current,o=n.current;if(!r||!o)return;let s=f(e.anchor),l=o.getBoundingClientRect(),u=r.getBoundingClientRect(),p=r.closest(`#content`)?.getBoundingClientRect(),m=Math.max(0,p?.top??0),h=Math.min(window.innerHeight,p?.bottom??window.innerHeight),g=Math.max(0,h-m),_=c({anchorRect:{left:s.left,right:s.right,width:s.width,height:s.height,top:s.top-m,bottom:s.bottom-m},popoverRect:l,viewportWidth:window.innerWidth,viewportHeight:g,options:a,arrowPadding:d});i({..._,top:_.top+m-u.top,left:_.left-u.left,maxHeight:Math.max(0,g-a.padding*2-2)})},[e,a,t,n]);return(0,u.useLayoutEffect)(()=>{o()},[o]),(0,u.useEffect)(()=>{if(!e)return;let t=()=>o(),r=typeof ResizeObserver>`u`?void 0:new ResizeObserver(t);return n.current&&r?.observe(n.current),window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0),r?.disconnect()}},[e,o,n]),r},m=i.div`
  position: relative;
`,h=i.div`
  --calendar-popover-max-height: ${({$maxHeight:e})=>e===void 0?`calc(100dvh - 32px)`:`${e}px`};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`,g=i.span`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 12;

  ${({side:e,left:t,top:n})=>{switch(e){case`top`:return`
          top: -9px;
          left: ${t??0}px;
          transform: translateX(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &::before {
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-bottom: 9px solid var(--border-hairline-dark);
          }

          &::after {
            top: 1px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid white;
          }
        `;case`bottom`:return`
          bottom: -1px;
          left: ${t??0}px;
          transform: translateX(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &::before {
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-top: 9px solid var(--border-hairline-dark);
          }

          &::after {
            top: -1px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
          }
        `;case`left`:return`
          left: -9px;
          top: ${n??0}px;
          transform: translateY(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          &::before {
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-right: 9px solid var(--border-hairline-dark);
          }

          &::after {
            left: 1px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid white;
          }
        `;default:return`
          right: -1px;
          top: ${n??0}px;
          transform: translateY(-50%);

          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          &::before {
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-left: 9px solid var(--border-hairline-dark);
          }

          &::after {
            left: -1px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid white;
          }
        `}}}
`,_=n(),v=(0,u.createContext)(null),y=()=>{let e=(0,u.useContext)(v);if(!e)throw Error(`usePopover must be used within a PopoverProvider`);return e},b=({children:e,portal:t=!1})=>{let[n,r]=(0,u.useState)(),i=(0,u.useRef)(null),a=(0,u.useRef)(null),o=(0,u.useRef)(void 0),s=(0,u.useRef)(!1),c=(0,u.useCallback)((e,t,n)=>{clearTimeout(o.current),s.current=!1,r({content:e,anchor:t,options:n})},[]),d=(0,u.useCallback)(()=>{clearTimeout(o.current),r(void 0)},[]),f=(0,u.useCallback)(()=>{clearTimeout(o.current),s.current=!0},[]),y=(0,u.useMemo)(()=>({showPopover:c,hidePopover:d,keepPopoverOpen:f}),[c,d,f]),b=p({state:n,bridgeRef:i,popoverRef:a}),x=n?.options?.closeDelayMs,S=(0,u.useCallback)(()=>clearTimeout(o.current),[]),C=(0,u.useCallback)(()=>{x===void 0||s.current||(clearTimeout(o.current),o.current=setTimeout(()=>r(void 0),x))},[x]);(0,u.useEffect)(()=>{let e=n?.anchor;if(!(x===void 0||!(e instanceof HTMLElement)))return e.addEventListener(`mouseleave`,C),()=>e.removeEventListener(`mouseleave`,C)},[n,x,C]),(0,u.useEffect)(()=>()=>clearTimeout(o.current),[]);let w=n?.content&&(0,_.jsxs)(h,{$maxHeight:b?.maxHeight,ref:a,onMouseEnter:S,onMouseLeave:C,style:{top:b?.top??0,left:b?.left??0,visibility:b?`visible`:`hidden`,pointerEvents:`auto`},children:[b&&(0,_.jsx)(g,{side:b.arrow.side,top:b.arrow.top,left:b.arrow.left}),n.content]});return(0,_.jsx)(v.Provider,{value:y,children:t?(0,_.jsxs)(_.Fragment,{children:[(0,l.createPortal)((0,_.jsx)(m,{ref:i,style:{position:`fixed`,top:0,left:0,zIndex:100,pointerEvents:`none`},children:w}),document.body),e]}):(0,_.jsxs)(m,{ref:i,children:[w,e]})})},x=()=>r(new Date),S=()=>{let[e,t]=(0,u.useState)(x);return(0,u.useEffect)(()=>{let e,n=()=>{clearTimeout(e),t(x()),e=setTimeout(n,6e4-Date.now()%6e4+10)},r=()=>{document.hidden||n()};return n(),document.addEventListener(`visibilitychange`,r),()=>{clearTimeout(e),document.removeEventListener(`visibilitychange`,r)}},[]),e},C=({el:e,event:t})=>{e.dataset.calendarEventId=t.id},w=e=>{let t=document.createElement(`div`);return t.className=`calendar-now-indicator`,t.setAttribute(`aria-label`,e),t},T=(t,n,r,i,a,o)=>{(0,u.useEffect)(()=>{let s=t.current;if(!o||!s)return;let c,l=[],u=()=>{for(let e of l)e.remove();l.length=0},d=()=>m.observe(s,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`style`,`class`,`data-calendar-event-id`]}),f=()=>{m.disconnect(),u();let t=n(),o=e(r),c=e=>{let n=t?.getEventById(e.dataset.calendarEventId??``);return!n?.allDay&&n?.start&&n.start>r};if(t?.view.type===`dayGridMonth`){let e=s.querySelector(`.fc-daygrid-day[data-date="${o}"] .fc-daygrid-day-events`);if(e){let t=Array.from(e.querySelectorAll(`.fc-event`)).map(e=>({event:e,harness:e.closest(`.fc-daygrid-event-harness`)})).filter(({harness:e})=>e&&getComputedStyle(e).visibility!==`hidden`),n=t.find(({event:e})=>c(e)),r=e.getBoundingClientRect(),a=Math.max(0,...t.map(({harness:e})=>e.getBoundingClientRect().bottom-r.top)),o=e.querySelector(`.fc-daygrid-more-link`),s=n?.harness?.getBoundingClientRect().top??o?.getBoundingClientRect().top,u=w(i);u.classList.add(`calendar-now-month`),u.title=i,u.style.top=`${Math.max(4,s===void 0?a+5:s-r.top-2)}px`,e.append(u),l.push(u)}}else if(t?.view.type===`listMonth`&&r>=t.view.activeStart&&r<t.view.activeEnd){let e=s.querySelector(`.fc-list`);if(e){let t=e.querySelector(`.fc-list-table`);t||(t=document.createElement(`table`),t.className=`fc-list-table calendar-now-table`,t.append(document.createElement(`tbody`)),e.prepend(t),l.push(t));let n=t.tBodies[0],r=Array.from(n.querySelectorAll(`.fc-list-day`)),s=r.find(e=>e.dataset.date===o),u=r.find(e=>(e.dataset.date??``)>o)??null;if(!s){s=document.createElement(`tr`),s.className=`fc-list-day fc-day-today calendar-now-day`;let e=document.createElement(`th`);e.colSpan=3,e.scope=`colgroup`;let t=document.createElement(`div`);t.className=`fc-list-day-cushion`,t.textContent=a;let r=document.createElement(`span`);r.className=`calendar-agenda-today`,r.textContent=Craft.t(`calendar`,`Today`),t.append(r),e.append(t),s.append(e),n.insertBefore(s,u),l.push(s)}let d=s.nextElementSibling;for(;d&&!d.classList.contains(`fc-list-day`)&&!c(d);)d=d.nextElementSibling;let f=document.createElement(`tr`);f.className=`calendar-now-agenda-row`;let p=document.createElement(`td`);p.colSpan=3;let m=w(i),h=document.createElement(`span`);h.textContent=i,m.append(h),p.append(m),f.append(p),n.insertBefore(f,d),l.push(f)}}d()},p=()=>{clearTimeout(c),c=setTimeout(f,0)},m=new MutationObserver(p),h=typeof ResizeObserver>`u`?null:new ResizeObserver(p);return h?.observe(s),f(),window.addEventListener(`resize`,p),()=>{clearTimeout(c),m.disconnect(),h?.disconnect(),window.removeEventListener(`resize`,p),u()}},[t,n,r,i,a,o])};export{b as a,T as i,C as n,y as o,S as r,x as t};