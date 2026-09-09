(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('visyn-cloud-theme');
  const preferred=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  root.dataset.theme=saved||preferred;
  document.querySelectorAll('.theme-button').forEach(button=>button.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('visyn-cloud-theme',root.dataset.theme)}));
  const menu=document.querySelector('.menu-button');const nav=document.querySelector('.site-nav');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});}
  document.querySelectorAll('[data-year]').forEach(node=>node.textContent=new Date().getFullYear());
  const form=document.querySelector('#contact-form');
  if(form){form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const subject=`Visyn Cloud — ${data.get('topic')}`;const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;window.location.href=`mailto:cloud@visyn.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`})}
})();
