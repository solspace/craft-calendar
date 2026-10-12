import{c as e,i as t,o as n,s as r,t as i,u as a}from"./translations-CPvEMAbD.js";var o=a(e()),s=a(r()),c={positions:[`bottom`],alignment:`start`,gap:8,padding:8},l=(e,t,n)=>n<=t?t:Math.min(Math.max(e,t),n),u=(e,t,n,r)=>{switch(r){case`center`:return e+(t-n)/2;case`end`:return e+t-n;default:return e}},d=(e,t,n,r,i)=>{switch(e){case`top`:return{position:e,top:t.top-n.height-r,left:u(t.left,t.width,n.width,i)};case`right`:return{position:e,top:u(t.top,t.height,n.height,i),left:t.right+r};case`left`:return{position:e,top:u(t.top,t.height,n.height,i),left:t.left-n.width-r};default:return{position:`bottom`,top:t.bottom+r,left:u(t.left,t.width,n.width,i)}}},f=(e,t,n,r,i)=>{let a=e.top,o=e.left,s=a+t.height,c=o+t.width;return a>=i&&o>=i&&s<=r-i&&c<=n-i},p=(e,t,n,r,i)=>{let a=r-i-t.height,o=n-i-t.width;return{...e,top:l(e.top,i,a),left:l(e.left,i,o)}},m=(e,t,n)=>{let r=e.left,i=e.top,a=r+t.width,o=i+t.height;return Math.max(0,Math.min(a,n.right)-Math.max(r,n.left))*Math.max(0,Math.min(o,n.bottom)-Math.max(i,n.top))},h=e=>{if(!e)return c;let t=Array.isArray(e.position)?e.position:e.position?[e.position]:c.positions;return{positions:t.length?t:c.positions,alignment:e.alignment??c.alignment,gap:e.gap??c.gap,padding:e.padding??c.padding,closeDelayMs:e.closeDelayMs}},g=({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i})=>{let a=i.positions.map(n=>d(n,e,t,i.gap,i.alignment)),o=a.find(e=>f(e,t,n,r,i.padding));if(o)return o;let s=a.map(e=>p(e,t,n,r,i.padding)),c=s[0],l=m(c,t,e);for(let n of s.slice(1)){let r=m(n,t,e);r<l&&(c=n,l=r)}return c},_=e=>{switch(e){case`top`:return`bottom`;case`right`:return`left`;case`left`:return`right`;default:return`top`}},v=({placement:e,anchorRect:t,popoverRect:n,arrowPadding:r})=>{let i=_(e.position);return i===`top`||i===`bottom`?{side:i,left:l(t.left+t.width/2-e.left,r,n.width-r)}:{side:i,top:l(t.top+t.height/2-e.top,r,n.height-r)}},y=({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i,arrowPadding:a})=>{let o=g({anchorRect:e,popoverRect:t,viewportWidth:n,viewportHeight:r,options:i});return{top:o.top,left:o.left,position:o.position,arrow:v({placement:o,anchorRect:e,popoverRect:t,arrowPadding:a})}},b=14,x=e=>{if(e instanceof MouseEvent){let t=e.target;if(t instanceof HTMLElement){let n=t.getBoundingClientRect(),r=n.left+e.offsetX,i=n.top+e.offsetY;return new DOMRect(r,i,1,1)}return new DOMRect(e.clientX,e.clientY,1,1)}return e.getBoundingClientRect()},S=({state:e,popoverRef:t})=>{let[n,r]=(0,o.useState)(),i=(0,o.useMemo)(()=>{if(e)return h(e.options)},[e]),a=(0,o.useCallback)(()=>{if(!e||!i){r(void 0);return}let n=t.current;if(!n)return;let a=x(e.anchor),o=n.getBoundingClientRect();r(y({anchorRect:a,popoverRect:o,viewportWidth:window.innerWidth,viewportHeight:window.innerHeight,options:i,arrowPadding:b}))},[e,i,t]);return(0,o.useLayoutEffect)(()=>{a()},[a]),(0,o.useEffect)(()=>{if(!e)return;let t=()=>a();return window.addEventListener(`resize`,t),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`resize`,t),window.removeEventListener(`scroll`,t,!0)}},[e,a]),n},C=t.div`
  position: relative;
`,w=t.div`
  position: fixed;
  top: 0;
  left: 0;
  /* Above Craft CP header / action buttons when anchored there */
  z-index: 1000;

  border: 1px solid var(--border-hairline-dark);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`,T=t.span`
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
`,E=n(),D=(0,o.createContext)(null),O=()=>{let e=(0,o.useContext)(D);if(!e)throw Error(`usePopover must be used within a PopoverProvider`);return e},k=({children:e})=>{let[t,n]=(0,o.useState)(),r=(0,o.useRef)(null),i=(0,o.useRef)(void 0),a=(0,o.useRef)(!1),c=(0,o.useCallback)((e,t,r)=>{clearTimeout(i.current),a.current=!1,n({content:e,anchor:t,options:r})},[]),l=(0,o.useCallback)(()=>{clearTimeout(i.current),n(void 0)},[]),u=(0,o.useCallback)(()=>{clearTimeout(i.current),a.current=!0},[]),d=(0,o.useMemo)(()=>({showPopover:c,hidePopover:l,keepPopoverOpen:u}),[c,l,u]),f=S({state:t,popoverRef:r}),p=t?.options?.closeDelayMs,m=(0,o.useCallback)(()=>clearTimeout(i.current),[]),h=(0,o.useCallback)(()=>{p===void 0||a.current||(clearTimeout(i.current),i.current=setTimeout(()=>n(void 0),p))},[p]);(0,o.useEffect)(()=>{let e=t?.anchor;if(!(p===void 0||!(e instanceof HTMLElement)))return e.addEventListener(`mouseleave`,h),()=>e.removeEventListener(`mouseleave`,h)},[t,p,h]),(0,o.useEffect)(()=>()=>clearTimeout(i.current),[]);let g=t?.content?(0,E.jsxs)(w,{ref:r,onMouseEnter:m,onMouseLeave:h,style:{top:f?.top??0,left:f?.left??0,visibility:f?`visible`:`hidden`},children:[f&&(0,E.jsx)(T,{side:f.arrow.side,top:f.arrow.top,left:f.arrow.left}),t.content]}):null;return(0,E.jsx)(D.Provider,{value:d,children:(0,E.jsxs)(C,{children:[e,g&&(0,s.createPortal)(g,document.body)]})})},A=t.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  color: #fff;
  border: none;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%);
    color: #fff;
  }

  &:before {
    color: #fff;
  }
`,j=(0,o.forwardRef)(({connected:e=!0,label:t,icon:n=`create`,children:r,className:a,...o},s)=>{let c=r??(e?t??i(`Create with AI`):i(`Enable AI`)),l=n===`create`;return(0,E.jsx)(A,{ref:s,type:`button`,className:[`btn`,`icon`,l&&`add`,a].filter(Boolean).join(` `),...l?{}:{"data-icon":`edit`},...o,children:c})});j.displayName=`AiButton`;var M=t.div`
  padding: 20px;
  min-width: 480px;
  max-width: 560px;

  h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }
`,N=t.p`
  margin: 0 0 16px;
  color: var(--light-text-color, #596673);
  font-size: 13px;
  line-height: 1.5;
`,P=t.textarea`
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  border: 1px solid var(--hairline-color, #d6d9de);
  border-radius: 4px;
  background: var(--white, #fff);
  color: var(--text-color, #29323d);
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--focus-color, #0d78f2);
    box-shadow: 0 0 0 1px var(--focus-color, #0d78f2);
  }

  &::placeholder {
    color: var(--light-text-color, #8f98a3);
  }
`,F=t.p`
  margin: 8px 0 0;
  color: var(--error-color, #cf1124);
  font-size: 13px;
`,I=t.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: 100%;
  margin-top: 12px;
`;export{M as a,O as c,P as i,h as l,F as n,j as o,N as r,k as s,I as t,g as u};