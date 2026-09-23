// Ejemplos de representación; no captura hardware ni modifica el esquema del editor.
const eventExamples = {
 button: {id:'south',name:'A',kind:'Botón',events:[
  ['Pulsación corta','Soltar antes de 400 ms','Interactuar'],
  ['Mantener','400 ms o más','Abrir menú radial']
 ]},
 trigger: {id:'rightTrigger',name:'RT',kind:'Gatillo · eje 0…1',events:[
  ['Recorrido','Valor continuo 0…1','Acelerar'],
  ['Cruzar umbral','Subir de < 0.9 a ≥ 0.9','Activar turbo'],
  ['Mantener umbral','≥ 0.9 durante 400 ms','Cargar impulso']
 ]},
 stick: {id:'leftStick',name:'LS',kind:'Stick · ejes X/Y + clic',events:[
  ['Mover X/Y','Vector continuo −1…1 por eje','Mover personaje'],
  ['Pulsar stick','Clic al presionar','Alternar carrera']
 ]},
 mouse: {id:'LeftClick',name:'Izquierdo',kind:'Botón del mouse',events:[
  ['Pulsación corta','Soltar antes de 400 ms','Seleccionar'],
  ['Mantener','400 ms o más','Arrastrar objeto']
 ]},
 wheel: {id:'wheel',name:'Rueda',kind:'Desplazamiento · 1 eje + clic',events:[
  ['Desplazar ↑','Delta positivo según convención del esquema','Herramienta anterior'],
  ['Desplazar ↓','Delta negativo según convención del esquema','Herramienta siguiente'],
  ['Pulsación corta','Clic central: soltar antes de 400 ms','Marcar objetivo'],
  ['Mantener clic','Clic central: 400 ms o más','Abrir menú de herramientas']
 ]},
 key: {id:'Space',name:'Espacio',kind:'Tecla',events:[
  ['Pulsación corta','Soltar antes de 400 ms','Saltar'],
  ['Mantener','400 ms o más','Cargar salto']
 ]}
};
let selectedControl='south';
function currentControlExamples(){
 if(!['GAMEPLAY','MENU'].includes(currentContext))return [];
 let examples;
 if($('device').value==='keyboard')examples=[eventExamples.mouse,eventExamples.wheel,eventExamples.key];
 else if($('device').value==='xbox')examples=[eventExamples.button,eventExamples.trigger,eventExamples.stick];
 else{
  const joy=$('device').value==='joycon',sw=$('device').value==='switch';
  examples=[{...eventExamples.button,id:joy?'dPadDown':'south',name:joy?'↓':sw?'B':'A'},
   {...eventExamples.stick,name:joy?'Stick':sw?'Stick izquierdo':'L3'}];
 }
 if(currentContext==='MENU')return examples.slice(0,1).map(control=>({...control,events:[['Pulsar','Al presionar','Confirmar selección']]}));
 return examples;
}
function eventElement(tag,className,text){
 const el=document.createElement(tag);el.className=className;if(text!==undefined)el.textContent=text;return el;
}
function eventRows(control){
 const list=eventElement('dl','event-list');
 control.events.forEach(([event,condition,action])=>{
  const row=eventElement('div','event-row');const term=eventElement('dt','event-label',event);
  term.append(eventElement('small','event-condition',condition));
  row.append(term,eventElement('dd','event-action',action));list.append(row);
 });return list;
}
function controlHeading(control){
 const heading=eventElement('span','control-heading');
 const name=eventElement('span','control-identity');name.append(eventElement('strong','',control.name),eventElement('small','',control.kind));
 heading.append(name,eventElement('span','event-count',control.events.length+' acciones'));return heading;
}
function renderMappings(){
 const rows=document.querySelector('.rows');rows.replaceChildren();rows.classList.add('event-groups');
 const examples=currentControlExamples();
 const total=examples.reduce((count,control)=>count+control.events.length,0);
 $('eventSummary').textContent=examples.length+' controles · '+total+' asociaciones por evento · ejemplos de diseño, sin entrada de hardware.';
 if(!examples.length){rows.append(eventElement('p','empty-state','Sin asociaciones en este contexto.'));return;}
 if(!examples.some(control=>control.id===selectedControl))selectedControl=examples[0].id;
 if(layout==='c'){
  const selected=examples.find(control=>control.id===selectedControl);
  const detail=eventElement('section','control-card selected-control');detail.append(controlHeading(selected),eventRows(selected));
  rows.append(detail,eventElement('p','control-picker-title','Seleccionar otro control'));
  const picker=eventElement('div','control-picker');
  examples.forEach(control=>{
   const button=eventElement('button','control-pick');button.type='button';button.dataset.controlId=control.id;
   button.setAttribute('aria-pressed',String(control.id===selectedControl));button.append(controlHeading(control));
   button.addEventListener('click',()=>{
    selectedControl=control.id;renderMappings();
    const newButton=Array.from(rows.querySelectorAll('.control-pick')).find(b=>b.dataset.controlId===selectedControl);newButton?.focus({preventScroll:true});
   });picker.append(button);
  });rows.append(picker);
 }else{
  examples.forEach(control=>{
   const card=eventElement(layout==='d'?'details':'section','control-card');
   if(layout==='d'){
    card.open=control.id===selectedControl;const summary=document.createElement('summary');summary.append(controlHeading(control));card.append(summary);
    card.addEventListener('toggle',()=>{
     if(!card.isConnected || !card.open)return;selectedControl=control.id;
     rows.querySelectorAll('details').forEach(other=>{if(other!==card)other.open=false;});
    });
   }else card.append(controlHeading(control));
   card.append(eventRows(control));rows.append(card);
  });
 }
}
