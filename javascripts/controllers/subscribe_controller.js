import{Controller}from"https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";import{spinner}from"../spinner.js";export default class extends Controller{static targets=["email","input","spinner"];submit(e){e.preventDefault();const r=this.emailTarget,s=this.inputTarget,t=this.spinnerTarget;t.innerHTML="",r.value=r.value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.value))return console.error("Invalid email address"),Swal.fire("Invalid email address","Please check that the email address you entered is valid","error"),!1;var i={email:r.value};t.innerHTML=spinner,s.style.display="none",fetch("https://api.someparty.ca/some_party_subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then((e=>e.text())).then((e=>{t.innerHTML="",s.style.display="",Swal.fire("You're on the list",e,"success")})).catch((e=>{console.error("Subscribe Error:",e),t.innerHTML="",s.style.display="",Swal.fire("Error subscribing","There was a problem confirming your subscription. Please try again.","error")}))}}