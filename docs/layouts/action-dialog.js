const actionDialog=document.createElement('dialog');
actionDialog.id='actionDialog';actionDialog.setAttribute('aria-labelledby','actionDialogTitle');
document.body.append(actionDialog);
let actionOpener=null;
function openActionDialog(control,opener){
 actionOpener=opener;actionDialog.replaceChildren();
 const scope=mappingScope();
 const form=document.createElement('form');
 const title=eventElement('h2','','Acciones de '+control.name);title.id='actionDialogTitle';
 const note=eventElement('p','muted','Contexto: '+currentContext+'. Cambios en memoria hasta recargar.');
 const fields=eventElement('div','action-fields');
 const defaults=control.id.toLowerCase().includes('stick')
  ?[['Mover X/Y','Movimiento continuo',''],['Pulsar stick','Al presionar','']]
  :[['Pulsar','Al presionar',''],['Mantener','Mientras se mantiene','']];
 const rows=control.events.length?control.events:defaults;
 function addRow(event='',condition='',action=''){
  const row=document.createElement('fieldset');
  const legend=eventElement('legend','','Asociacion');row.append(legend);
  for(const [label,value,name] of [['Evento',event,'event'],['Condicion',condition,'condition'],['Accion',action,'action']]){
   const wrapper=document.createElement('label');wrapper.textContent=label;
   const input=document.createElement('input');input.name=name;input.value=value;input.maxLength=120;
   wrapper.append(input);row.append(wrapper);
  }
  const remove=document.createElement('button');remove.type='button';remove.textContent='Quitar';
  remove.addEventListener('click',()=>{row.remove();add.focus();});row.append(remove);fields.append(row);
 }
 const add=document.createElement('button');add.type='button';add.textContent='Agregar accion';
 add.addEventListener('click',()=>{addRow();fields.lastElementChild.querySelector('input').focus();});
 rows.forEach(row=>addRow(...row));
 const error=eventElement('p','error');error.setAttribute('aria-live','polite');
 const footer=eventElement('div','dialog-actions');
 const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Cancelar';cancel.addEventListener('click',()=>actionDialog.close());
 const save=document.createElement('button');save.type='submit';save.className='primary';save.textContent='Guardar acciones';
 footer.append(cancel,save);form.append(title,note,fields,add,error,footer);actionDialog.append(form);
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const events=Array.from(fields.children).map(row=>Array.from(row.querySelectorAll('input')).map(input=>input.value.trim()));
  if(events.some(([name,,action])=>action && !name)){error.textContent='Indica el evento de cada accion.';return;}
  const saved=events.filter(([, , action])=>action);
  const controls=prototypeMappings.get(scope);
  const index=controls.findIndex(item=>item.id===control.id);
  if(saved.length){
   const updated={...control,events:saved};
   if(index>=0)controls[index]=updated;else controls.push(updated);
  }else if(index>=0)controls.splice(index,1);
  actionDialog.close();renderMappings();
  if(!actionOpener?.isConnected){
   const selected=document.querySelector('.control-card.is-selected .select-control')
    ||document.querySelector('.control-overlay:not([hidden]) .is-selected');
   selected?.focus();
  }
 });
 actionDialog.showModal();
}
actionDialog.addEventListener('close',()=>{if(actionOpener?.isConnected)actionOpener.focus();});
