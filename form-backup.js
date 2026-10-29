(function(){
var TO="carsondemny@gmail.com";
document.querySelectorAll('form[action*="web3forms.com"]').forEach(function(f){
  f.addEventListener("submit",function(e){
    if(!window.fetch||!window.FormData)return;
    e.preventDefault();
    var btn=f.querySelector('button[type=submit]'),old=btn?btn.textContent:"";
    if(btn){btn.disabled=true;btn.textContent="Sending…";}
    var fd=new FormData(f),next=fd.get("redirect")||"/thanks.html",subj=fd.get("subject")||"Website form";
    fd.delete("redirect");
    var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){ctl&&ctl.abort();},12000);
    fetch(f.action,{method:"POST",body:fd,headers:{Accept:"application/json"},signal:ctl&&ctl.signal})
    .then(function(r){return r.json().catch(function(){return {};}).then(function(j){return r.ok&&j.success===true;});})
    .catch(function(){return false;})
    .then(function(ok){
      clearTimeout(t);
      if(ok){location.href=next;return;}
      var lines=[];fd.forEach(function(v,k){if(["access_key","from_name","subject","botcheck"].indexOf(k)<0&&v)lines.push(k.replace(/_/g," ")+": "+v);});
      if(btn){btn.disabled=false;btn.textContent=old;}
      var msg=f.querySelector(".fb-msg");
      if(!msg){msg=document.createElement("p");msg.className="fb-msg";msg.setAttribute("role","alert");msg.style.cssText="margin:12px 0 0;font-size:15px;line-height:1.5;color:#b91c1c";f.appendChild(msg);}
      msg.innerHTML='Our form is having trouble right now. Your email app should open with your info filled in. Just hit send. Or call/text <a href="tel:+18327453523">(832) 745-3523</a>.';
      location.href="mailto:"+TO+"?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(lines.join("\n"));
    });
  });
});
})();
