import{Controller}from"https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";export default class extends Controller{static targets=["container"];connect(){const e=this.containerTarget,t=document.getElementById("canonical");let n=`${document.location.origin}${document.location.pathname}`;t&&(n=t.href);const i=this.element.previousElementSibling.id;if(i){let t=`${n}#${i}`;var o=document.createElement("a");o.classList.add("black","no-underline","fw4","bb","b--black");var l=document.createTextNode("Link here");o.appendChild(l),o.title="Link directly to this section of the newsletter",o.href=t,e.innerHTML=" - ",e.appendChild(o)}}}