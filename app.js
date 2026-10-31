const groups=[
 {name:"श्री राम",icon:"🏹",songs:[]},
 {name:"श्री कृष्ण",icon:"🦚",songs:[]},
 {name:"महादेव",icon:"🔱",songs:[]},
 {name:"हनुमान जी",icon:"🚩",songs:[]},
 {name:"माता रानी",icon:"🌺",songs:[]},
 {name:"आरती और मंत्र",icon:"🪔",songs:[]}
];
let selected=-1;
const categories=document.getElementById('categories');
const songs=document.getElementById('songs');
const audio=document.getElementById('audio');
function renderGroups(){
 categories.innerHTML='';
 groups.forEach((g,i)=>{
  const b=document.createElement('button');b.className='category'+(selected===i?' active':'');
  b.innerHTML=`<span>${g.icon}</span>${g.name}`;
  b.onclick=()=>{selected=i;renderGroups();renderSongs();};
  categories.appendChild(b);
 });
}
function renderSongs(){
 const q=document.getElementById('search').value.trim().toLowerCase();
 const title=document.getElementById('listTitle');
 title.textContent=selected<0?'आपके भजन':groups[selected].name+' के भजन';
 let items=[];
 groups.forEach((g,i)=>g.songs.forEach(s=>items.push({...s,group:i})));
 if(selected>=0)items=items.filter(s=>s.group===selected);
 if(q)items=items.filter(s=>(s.name+' '+groups[s.group].name).toLowerCase().includes(q));
 songs.innerHTML='';
 if(!items.length){songs.innerHTML='<div class="song"><div><p>अभी भजन उपलब्ध नहीं हैं</p><small>ऊपर “अपना भजन लिंक जोड़ें” से अपना वैध audio link जोड़ें।</small></div></div>';return;}
 items.forEach(s=>{
  const row=document.createElement('div');row.className='song';
  const info=document.createElement('div');info.innerHTML=`<p></p><small></small>`;
  info.querySelector('p').textContent=s.name;info.querySelector('small').textContent=groups[s.group].name;
  const btn=document.createElement('button');btn.textContent='▶ सुनें';
  btn.onclick=()=>{audio.src=s.url;audio.play();document.getElementById('nowPlaying').textContent=s.name;};
  row.append(info,btn);songs.appendChild(row);
 });
}
document.getElementById('search').addEventListener('input',renderSongs);
document.getElementById('addSong').onclick=()=>{
 const name=document.getElementById('songName').value.trim();
 const url=document.getElementById('songUrl').value.trim();
 if(!name||!url){alert('भजन का नाम और audio URL दोनों भरें।');return;}
 if(!/^https:\/\//i.test(url)){alert('कृपया https:// से शुरू होने वाला लिंक डालें।');return;}
 groups[Math.max(selected,0)].songs.push({name,url});
 document.getElementById('songName').value='';document.getElementById('songUrl').value='';
 renderSongs();alert('भजन इस ऐप सेशन में जोड़ दिया गया।');
};
renderGroups();renderSongs();
