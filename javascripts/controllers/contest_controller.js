import{Controller}from"https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";import{spinner}from"../spinner.js";export default class extends Controller{static targets=["email","input","spinner"];async connect(){const t=new URLSearchParams(window.location.search).get("email"),e=this.inputTarget;t&&(e.style.display="none",this.checkSwalLoaded=setInterval((async()=>{window.Swal&&(clearInterval(this.checkSwalLoaded),await this.promptEntry(t))}),100))}async promptEntry(t){const e=this.inputTarget;let n=this.element.dataset.confirm;n=n.replace("EMAIL_PLACEHOLDER",t);const i=await Swal.fire({title:"Confirm Entry",text:n,showDenyButton:!0,showCancelButton:!1,confirmButtonText:"Yes, Enter Me",denyButtonText:"Nevermind",icon:"question"});i.isConfirmed?(Swal.fire({title:"Please wait",html:spinner,showCloseButton:!1,showCancelButton:!1,showConfirmButton:!1,allowOutsideClick:!1}),await this.confirmEntry(t)):i.isDenied&&(Swal.fire("Contest entry cancelled","You haven't entered the draw.","info"),e.style.display="flex",window.history.replaceState({},document.title,window.location.pathname))}async submit(t){t.preventDefault();const e=this.emailTarget,n=this.inputTarget;e.value=e.value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value))return console.error("Invalid email address"),Swal.fire("Invalid email address","Please check that the email address you entered is valid","error"),!1;n.style.display="none",await this.confirmEntry(e.value)}async confirmEntry(t){const e=this.spinnerTarget,n=this.element.dataset.contest;if(t&&n){var i={email:t,contest:n};e.innerHTML=spinner;try{const t=await fetch("https://api.someparty.ca/some_party_enter_contest",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}),n=await t.text();e.innerHTML="",inputEl.style.display="",await Swal.fire("Entry Submitted",n,"success")}catch(t){e.innerHTML="",inputEl.style.display="",await Swal.fire("Contest Entry Error",t,"error")}}}}