// Interacciones de presentación: no importa, convierte ni descarga archivos reales.
const fileVariants = {
 a: [
  ['Bloque en navegación', 'navigation', 'Cuatro acciones explícitas en la columna de 240 px. 1 activación abre cada flujo; ocupa 200 px de alto más márgenes.'],
  ['Menú Archivo', 'header', 'Un botón Archivo de 112 × 44 px en cabecera abre las cuatro opciones. 2 activaciones hasta cada flujo; no resta espacio al mando.']
 ],
 c: [
  ['Importar y Exportar en cabecera', 'header', 'Dos botones separados abren las modales de importacion y exportacion. Cada modal permite elegir el formato.']
 ],
 d: [
  ['Barra inferior', 'footer', 'Importar y Exportar permanecen visibles en una barra de 64 px. A 390 px cada botón mide 175 × 44 px; el lienzo pierde 64 px de alto.'],
  ['Hoja de archivos', 'header', 'Archivo en cabecera abre una hoja inferior con las cuatro opciones. No consume altura permanente adicional.']
 ]
};
const alternatives = {a:0,c:0,d:0};
const actions = document.createElement('div');
actions.className='file-actions';
const dialog=document.createElement('dialog');
dialog.id='fileDialog';dialog.setAttribute('aria-labelledby','fileTitle');
document.body.append(dialog);
let fileOpener=null;
function fileButton(label,operation){
 const button=document.createElement('button');button.type='button';button.textContent=label;button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','fileDialog');
 button.addEventListener('click',()=>{fileOpener=button;openFileFlow(operation);});return button;
}
function renderFileActions(){
 const [name,requested,description]=fileVariants[layout][alternatives[layout]];
 document.querySelector('.alternatives').hidden=layout==='c';
 $('alternativeA').textContent='A · '+fileVariants[layout][0][0];
 $('alternativeB').textContent='B · '+(fileVariants[layout][1] || fileVariants[layout][0])[0];
 $('alternativeA').setAttribute('aria-pressed',String(alternatives[layout]===0));
 $('alternativeB').setAttribute('aria-pressed',String(alternatives[layout]===1));
 const navigationHidden=Number($('width').value)<1000 || Number($('height').value)<600;
 const position=requested==='navigation' && navigationHidden?'header':requested;
 $('fileDescription').textContent=name+' — '+description+(position!==requested?' En esta resolución se traslada a Archivo en cabecera porque la navegación está oculta.':'');
 $('app').classList.toggle('with-footer',position==='footer');
 $('app').classList.toggle('with-header-files',position==='header');
 actions.className='file-actions in-'+position;actions.replaceChildren();
 if(position==='header'){
  if(layout==='c'){
   actions.append(fileButton('Importar','import'),fileButton('Exportar','export'));
  }else{
   const button=fileButton('Archivo','all');button.style.width='112px';actions.append(button);
  }
  document.querySelector('header').append(actions);
 }else if(position==='footer'){
  actions.append(fileButton('Importar…','import'),fileButton('Exportar…','export'));
  $('app').append(actions);
 }else{
  actions.append(fileButton('Exportar imagen PNG','png'),fileButton('Exportar esquema JSON','json'),fileButton('Importar JSON','import-json'),fileButton('Importar .inputactions','unity'));
  if(position==='navigation')$('navigationFiles').append(actions);
  else document.querySelector('.mapping').insertBefore(actions,document.querySelector('.rows'));
 }
}
['alternativeA','alternativeB'].forEach((id,index)=>$(id).addEventListener('click',()=>{alternatives[layout]=index;render();}));
function baseDialog(title){
 dialog.replaceChildren();dialog.classList.toggle('sheet',layout==='d');
 const heading=document.createElement('div');heading.className='file-dialog-heading';
 const h=document.createElement('h2');h.id='fileTitle';h.textContent=title;
 const close=document.createElement('button');close.textContent='Cerrar';close.addEventListener('click',()=>dialog.close());
 heading.append(h,close);dialog.append(heading);
 const note=document.createElement('p');note.className='file-demo-label';note.textContent='Prototipo visual · los flujos de archivo se simulan, sin descargar ni aplicar datos.';dialog.append(note);
 if(!dialog.open)dialog.showModal();
}
function appendText(text,className='review-card'){
 const p=document.createElement('p');p.className=className;p.textContent=text;dialog.append(p);return p;
}
function dialogButton(label,handler){
 const button=document.createElement('button');button.textContent=label;button.addEventListener('click',handler);return button;
}
function openFileFlow(operation){
 const titles={all:'Archivos del proyecto',import:'Importar',export:'Exportar',png:'Exportar imagen PNG',json:'Exportar esquema JSON','import-json':'Importar esquema JSON',unity:'Importar Unity .inputactions'};
 baseDialog(titles[operation]);
 if(['all','import','export'].includes(operation)){
  const grid=document.createElement('div');grid.className='file-options';
  const options=[['png','Imagen PNG','Elegir contextos, mandos y dimensiones'],['json','Esquema JSON','Guardar todos los contextos y asociaciones'],['import-json','Importar JSON','Revisar el esquema antes de reemplazar'],['unity','Importar .inputactions','Elegir Action Maps y revisar bindings']];
  options.filter(([key])=>operation==='all'||(operation==='export'?['png','json'].includes(key):['import-json','unity'].includes(key))).forEach(([key,label,help])=>{
   const button=dialogButton(label,()=>openFileFlow(key));const small=document.createElement('small');small.textContent=help;button.append(small);grid.append(button);
  });dialog.append(grid);return;
 }
 if(operation==='png'){
  const fields=document.createElement('div');fields.className='file-fields';
  function choices(title,items,selected){
   const field=document.createElement('fieldset');const legend=document.createElement('legend');legend.textContent=title;field.append(legend);
   items.forEach(([value,name])=>{const label=document.createElement('label');label.className='check';const input=document.createElement('input');input.type='checkbox';input.value=value;input.checked=value===selected;label.append(input,document.createTextNode(name));field.append(label);});return field;
  }
  const cs=choices('Contextos',contexts.map(c=>[c,c]),currentContext), ds=choices('Mandos',Object.entries(devices).map(([key,d])=>[key,d[3]]),$('device').value);
  fields.append(cs,ds);dialog.append(fields);
  const label=document.createElement('label');label.textContent='Dimensiones de cada imagen';const size=document.createElement('select');['1920 × 1080 px','1440 × 900 px','1080 × 1080 px'].forEach(s=>size.add(new Option(s,s)));label.append(size);dialog.append(label);
  const summary=appendText('');const simulate=dialogButton('Simular exportación PNG',()=>appendText('Simulación: se descargaría una imagen por combinación seleccionada, sin los controles del editor. No se generaron archivos.'));
  const update=()=>{const count=cs.querySelectorAll(':checked').length*ds.querySelectorAll(':checked').length;summary.textContent=count+' imágenes de '+size.value+'. El mando y las asociaciones se ajustan a esas dimensiones, independientemente de la pantalla.';simulate.disabled=count===0;};
  fields.addEventListener('change',update);size.addEventListener('change',update);update();dialog.append(simulate);return;
 }
 if(operation==='json'){
  appendText('Esquema completo: '+contexts.join(', ')+'. Incluye mando seleccionado, asociaciones de todos los contextos, lados y orden. El formato JSON no tiene dimensiones de imagen.');
  dialog.append(dialogButton('Simular descarga JSON',()=>appendText('Simulación: se descargaría controller-scheme.json. No se generó ningún archivo.')));return;
 }
 const unity=operation==='unity';
 const label=document.createElement('label');label.textContent=unity?'Archivo .inputactions':'Archivo .json';const input=document.createElement('input');input.type='file';input.accept=unity?'.inputactions':'.json,application/json';label.append(input);dialog.append(label);
 const fileInfo=appendText('Puedes elegir un archivo para visualizar su nombre. La revisión de abajo usa datos de ejemplo; no analiza su contenido.','file-demo-label');
 input.addEventListener('change',()=>{fileInfo.textContent=input.files[0]?'Seleccionado: '+input.files[0].name+'. No leído ni convertido; la revisión sigue siendo un ejemplo.':'Ningún archivo seleccionado. La revisión usa un ejemplo.';});
 if(unity){
  const fields=document.createElement('div');fields.className='file-fields';
  [['Action Maps del ejemplo',['Gameplay + UI','Gameplay','UI']],['Control Scheme del ejemplo',['Gamepad','Todos']],['Mando de destino',Object.values(devices).map(d=>d[3])]].forEach(([name,values])=>{
   const l=document.createElement('label');l.textContent=name;const select=document.createElement('select');values.forEach(v=>select.add(new Option(v,v)));if(name==='Mando de destino')select.value=devices[$('device').value][3];l.append(select);fields.append(l);
  });dialog.append(fields);
 }
 dialog.append(dialogButton('Ver revisión de ejemplo',()=>{
  baseDialog(unity?'Revisar conversión · ejemplo':'Revisar esquema · ejemplo');
  if(unity){
   appendText('Ejemplo fijo, independiente del archivo y filtros: 2 contextos · 12 bindings convertidos · 3 excluidos · 2 pendientes · 1 conflicto. Cada Action Map origina un contexto.');
   appendText('Conflicto: Jump y Interact compiten por buttonSouth / press. Pendientes: composite 2DVector y control personalizado. La aplicación del resultado requiere resolver el conflicto.');
   const blocked=dialogButton('Aplicar conversión — conflicto pendiente',()=>{});blocked.disabled=true;dialog.append(blocked);
   dialog.append(dialogButton('Ver ejemplo sin conflictos',()=>{
    baseDialog('Conversión lista · ejemplo');appendText('Ejemplo independiente: 1 contexto · 8 bindings convertidos · 0 excluidos · 0 pendientes · 0 conflictos. Aplicar reemplazaría el esquema abierto; cancelar lo conserva.');
    dialog.append(dialogButton('Simular reemplazo del esquema',()=>appendText('Simulación terminada. El esquema del prototipo se conserva.')));
   }));
  }else{
   appendText('Ejemplo fijo: 2 contextos, GAMEPLAY y MENU; 14 asociaciones; mando Xbox. Reemplazar cambiaría el esquema completo, no solo el contexto activo.');
   dialog.append(dialogButton('Simular reemplazo del esquema',()=>appendText('Simulación terminada. Los contextos actuales se conservan; no se importaron datos.')));
  }
  dialog.append(dialogButton('Volver a selección',()=>openFileFlow(operation)));
 }));
}
dialog.addEventListener('close',()=>{if(fileOpener?.isConnected)fileOpener.focus();});
render();
