const promptBox = document.getElementById('promptPreview');
const form = document.getElementById('generatorForm');
const out = document.getElementById('generatedGrid');
const garmentInput = document.getElementById('garmentUpload');
const logoInput = document.getElementById('logoUpload');
const garmentPreview = document.getElementById('garmentPreview');

const urls=[
'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
];

function buildPrompt(data){
 return `Generate a realistic ${data.modelType} fashion model (${data.bodyType}, ${data.skinTone}) wearing the EXACT uploaded garment with zero alterations. Pose: ${data.pose}. Background: ${data.background}. Style: ${data.style}. Ratio: ${data.ratio}. Quality: ${data.quality}. Preserve garment color, fabric texture, shape, seams, logos, graphics, and all fine details.`
}

function renderPrompt(){
  const d=Object.fromEntries(new FormData(form).entries());
  if(promptBox) promptBox.textContent=buildPrompt(d);
}

function renderImgs(){
 const d=Object.fromEntries(new FormData(form).entries());
 const count=Number(d.count||4); out.innerHTML='';
 for(let i=0;i<count;i++){
   const div=document.createElement('div');div.className='preview-card';
   div.innerHTML=`<img src="${urls[i%urls.length]}" alt="generated"><span class="chip">${d.modelType} · ${d.pose}</span>`;
   out.appendChild(div);
 }
}

if(form){form.addEventListener('change',renderPrompt);form.addEventListener('submit',e=>{e.preventDefault();renderPrompt();renderImgs();});renderPrompt();}
if(garmentInput){garmentInput.addEventListener('change',e=>{const f=e.target.files[0];if(f){garmentPreview.src=URL.createObjectURL(f);}})}
if(logoInput){logoInput.addEventListener('change',()=>{});}
