(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('visyn-cloud-theme');
  const preferred=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  root.dataset.theme=saved||preferred;
  document.querySelectorAll('.theme-button').forEach(button=>button.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('visyn-cloud-theme',root.dataset.theme)}));
  const menu=document.querySelector('.menu-button');const nav=document.querySelector('.site-nav');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});}
  document.querySelectorAll('[data-year]').forEach(node=>node.textContent=new Date().getFullYear());
  const stack=document.querySelector('.tool-stack');
  if(stack){
    let startX=0,startY=0,moved=false,pointerActive=false;
    const cycle=()=>{if(stack.classList.contains('is-cycling'))return;stack.classList.add('is-cycling');stack.append(stack.firstElementChild);window.setTimeout(()=>stack.classList.remove('is-cycling'),220)};
    stack.addEventListener('pointerdown',event=>{startX=event.clientX;startY=event.clientY;moved=false;pointerActive=true;stack.setPointerCapture(event.pointerId)});
    stack.addEventListener('pointermove',event=>{if(pointerActive&&Math.hypot(event.clientX-startX,event.clientY-startY)>12)moved=true});
    stack.addEventListener('pointerup',()=>{pointerActive=false;if(moved)cycle()});
    stack.addEventListener('click',()=>{if(!moved)cycle();moved=false});
    stack.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();cycle()}});
  }
  const form=document.querySelector('#contact-form');
  if(form){form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const subject=`Visyn Studio software — ${data.get('topic')}`;const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;window.location.href=`mailto:cloud@visyn.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`})}
  // ── Help page: support ticket ──────────────────────────────────────────
  // Tickets are emailed to hello@visyn.cloud via FormSubmit. The FIRST
  // submission sends a one-time "Activate form" email to that inbox; tickets
  // are only delivered after that link is clicked. Until then — or if the
  // service is ever unreachable — the visitor is offered a pre-filled email
  // instead, so a ticket is never silently lost.
  const TICKET_ENDPOINT='https://formsubmit.co/ajax/hello@visyn.cloud';
  const TICKET_EMAIL='hello@visyn.cloud';
  const ticket=document.querySelector('#ticket-form');
  if(ticket){
    const appSelect=ticket.querySelector('#ticket-app');
    const wanted=(new URLSearchParams(location.search).get('app')||'').toLowerCase();
    const match=[...appSelect.options].find(o=>o.value.toLowerCase()===wanted);
    if(match)appSelect.value=match.value;

    const status=ticket.querySelector('.form-status');
    const submit=ticket.querySelector('button[type=submit]');
    const show=(kind,nodes)=>{status.className='form-status is-'+kind;status.replaceChildren(...nodes);status.hidden=false};

    ticket.addEventListener('submit',async event=>{
      event.preventDefault();
      const data=Object.fromEntries(new FormData(ticket));
      if(data._honey)return;                       // bot filled the hidden field
      delete data._honey;
      const subject=`Help ticket: ${data.app} — ${data.topic}`;
      const mailto=`mailto:${TICKET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nStore: ${data.store||'(not given)'}\nApp: ${data.app}\nTopic: ${data.topic}\n\n${data.message}`)}`;

      submit.disabled=true;submit.textContent='Sending…';status.hidden=true;
      try{
        const res=await fetch(TICKET_ENDPOINT,{method:'POST',
          headers:{'Content-Type':'application/json',Accept:'application/json'},
          body:JSON.stringify({...data,_subject:subject,_replyto:data.email,_template:'table',_captcha:'false'})});
        const json=await res.json().catch(()=>({}));
        if(!res.ok||String(json.success)!=='true')throw new Error(json.message||`HTTP ${res.status}`);
        ticket.reset();if(match)appSelect.value=match.value;
        show('success',[document.createTextNode(`Thanks — your ticket is in. We’ll reply to ${data.email}.`)]);
      }catch(err){
        const link=document.createElement('a');link.href=mailto;link.textContent='Email it to us instead';
        show('error',[document.createTextNode('We couldn’t send that just now. '),link,
          document.createTextNode(' — your message is already filled in.')]);
      }finally{
        submit.disabled=false;submit.textContent='Submit ticket';
      }
    });
  }
})();
