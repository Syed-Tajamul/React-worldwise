import{d as u,r as t,e as p,j as s,B as h}from"./index--dLJ-GIQ.js";import{P as f}from"./PageNav-qLBncGbz.js";import"./Logo-Voxqwxts.js";const g="_login_c4qch_1",x="_form_c4qch_15",j="_row_c4qch_43",a={login:g,form:x,row:j};function y(){const o=u(),[r,l]=t.useState("syedtawseef0@gmail.com"),[i,c]=t.useState("qwerty"),{isAuthenticated:n,login:m}=p();function d(e){e.preventDefault(),m(r,i)}return t.useEffect(()=>{n===!0&&o("/app")},[n,o]),s.jsxs("main",{className:a.login,children:[s.jsx(f,{}),s.jsxs("form",{className:a.form,onSubmit:d,children:[s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"email",children:"Email address"}),s.jsx("input",{type:"email",id:"email",onChange:e=>l(e.target.value),value:r})]}),s.jsxs("div",{className:a.row,children:[s.jsx("label",{htmlFor:"password",children:"Password"}),s.jsx("input",{type:"password",id:"password",onChange:e=>c(e.target.value),value:i})]}),s.jsx("div",{children:s.jsx(h,{type:"primary",children:"login"})})]})]})}export{y as default};
