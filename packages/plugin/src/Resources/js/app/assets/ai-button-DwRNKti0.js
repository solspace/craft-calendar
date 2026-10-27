import{a as e,d as t,l as n,s as r,t as i}from"./translations-BT7AJKOt.js";var a=t(n()),o=e.button`
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
`,s=r(),c=(0,a.forwardRef)(({connected:e=!0,label:t,icon:n=`create`,children:r,className:a,...c},l)=>{let u=r??(e?t??i(`Create with AI`):i(`Enable AI`)),d=n===`create`;return(0,s.jsx)(o,{ref:l,type:`button`,className:[`btn`,`icon`,d&&`add`,a].filter(Boolean).join(` `),...d?{}:{"data-icon":`edit`},...c,children:u})});c.displayName=`AiButton`;export{c as t};