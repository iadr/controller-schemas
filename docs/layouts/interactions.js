// Layout 03: selection and mappings live only for this prototype session.
const prototypeMappings = new Map();
let activeControl = null;
let activeScope = '';
const interactionRoots = [];
function mappingScope(){return currentContext+'|'+$('device').value;}
function prototypeControls(){
 const scope=mappingScope();
 if(!prototypeMappings.has(scope)){
  prototypeMappings.set(scope,currentControlExamples().map(control=>({...control,events:control.events.map(event=>[...event])})));
 }
 return prototypeMappings.get(scope);
}
function controlInfo(id){
 const existing=prototypeControls().find(control=>control.id===id);
 if(existing)return existing;
 const labels={south:'A',east:'B',west:'X',north:'Y',leftTrigger:'LT',rightTrigger:'RT',leftButton:'LB',rightButton:'RB',leftStick:'LS',rightStick:'RS',MiddleClick:'Rueda'};
 const switchLabels={south:'B',east:'A',west:'Y',north:'X'};
 const device=$('device').value;
 const name=(['switch','joycon'].includes(device)?switchLabels[id]:null)||labels[id]||id;
 return {id,name,kind:id.toLowerCase().includes('stick')?'Stick':'Boton',events:[]};
}
function highlightControl(id){
 document.querySelectorAll('.control-card[data-control-id]').forEach(card=>{
  const selected=card.dataset.controlId===activeControl;
  card.classList.toggle('is-selected',selected);
  card.classList.toggle('is-hovered',card.dataset.controlId===id);
  card.querySelector('.select-control')?.setAttribute('aria-pressed',String(selected));
 });
 interactionRoots.forEach(root=>root.querySelectorAll('[data-button-id]').forEach(region=>{
  const controlId=region.dataset.buttonId;
  region.classList.toggle('is-selected',controlId===activeControl);
  region.classList.toggle('is-hovered',controlId===id);
  region.classList.toggle('is-mapped',prototypeControls().some(control=>control.id===controlId && control.events.length));
 }));
}
function selectPrototypeControl(id){
 activeControl=id;highlightControl(null);
}
function renderInteractiveControls(){
 const enabled=layout==='c';
 if(activeScope!==mappingScope()){activeScope=mappingScope();activeControl=null;}
 for(const [index,img] of [$('controller'),$('mouse')].entries()){
  let root=interactionRoots[index];
  if(!root){
   const wrapper=document.createElement('div');wrapper.className='interactive-device';
   img.before(wrapper);wrapper.append(img);
   root=document.createElement('div');root.className='control-overlay';wrapper.append(root);
   interactionRoots[index]=root;
  }
  img.parentElement.hidden=index===1 && $('device').value!=='keyboard';
  root.hidden=!enabled || (index===1 && $('device').value!=='keyboard');
  if(root.hidden)continue;
  const device=index===1?'mouse':$('device').value;
  if(root.dataset.device!==device){
   root.dataset.device=device;root.innerHTML=controlRegions[device];
   root.querySelector('svg').setAttribute('aria-label','Controles de '+devices[$('device').value][3]);
   root.querySelectorAll('[data-button-id]').forEach(region=>{
    const id=region.dataset.buttonId;
    region.setAttribute('tabindex','0');region.setAttribute('role','button');
    region.setAttribute('aria-haspopup','dialog');region.setAttribute('aria-controls','actionDialog');
    region.setAttribute('aria-label','Registrar acciones: '+controlInfo(id).name);
    region.addEventListener('mouseenter',()=>highlightControl(id));
    region.addEventListener('mouseleave',()=>highlightControl(null));
    region.addEventListener('focus',()=>highlightControl(id));
    region.addEventListener('blur',()=>highlightControl(null));
    region.addEventListener('click',()=>{selectPrototypeControl(id);openActionDialog(controlInfo(id),region);});
    region.addEventListener('keydown',event=>{
     if(event.key==='Enter'||event.key===' '){event.preventDefault();region.dispatchEvent(new MouseEvent('click'));}
    });
   });
  }
 }
 highlightControl(null);
}
function bindMappingCard(card,control){
 card.dataset.controlId=control.id;
 const heading=card.querySelector('.control-heading');
 const select=document.createElement('button');select.type='button';select.className='select-control';
 select.setAttribute('aria-label','Seleccionar '+control.name);select.setAttribute('aria-pressed',String(control.id===activeControl));
 heading.replaceWith(select);select.append(heading);
 const edit=document.createElement('button');edit.type='button';edit.className='edit-control';edit.textContent='Editar acciones';
 edit.setAttribute('aria-haspopup','dialog');edit.setAttribute('aria-controls','actionDialog');
 edit.addEventListener('click',()=>{selectPrototypeControl(control.id);openActionDialog(control,edit);});
 card.append(edit);
 card.addEventListener('click',()=>selectPrototypeControl(control.id));
 card.addEventListener('mouseenter',()=>highlightControl(control.id));
 card.addEventListener('mouseleave',()=>highlightControl(null));
 select.addEventListener('focus',()=>highlightControl(control.id));
 select.addEventListener('blur',()=>highlightControl(null));
}
