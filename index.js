// Import stylesheets
import './style.css';

// Write Javascript code!
import Darkmode from 'darkmode-js';

// new Darkmode().showWidget();


const url = 'https://proekt-ds.firebaseio.com/';
const getSkins = async () => {
  const res = await fetch(url+`skins.json`);
  return res.json();
};
let skins = [];
const skinsBlock = document.querySelector('.skins');
const randomSkinBlock = document.querySelector('.random-skin');
const createSkin = ({name,cover,sale,float,type,outputPrice}) => (`<div class="skin">
    <h2 class="skin-price">${name} ${outputPrice}€</h2>
    <h5>${type}</h5>
    <div class="skin-cover " style='background-image: url(${cover})'></div>
    <div class="skin-sale">${sale}%</div>
    <div class="skin-float-name">${float.name}</div>
    <div class="skin-float-value">${float.value}</div>
</div>`);
const renderSkins = () => skinsBlock.innerHTML = skins.map(createSkin).join('');
const random = (min=0,max=1) => Math.floor(Math.random() * (max - min) + min);

const setRandomSkin = () => {
  const randomSkin = () => skins[random(0,skins.length-1)];
  randomSkinBlock.style.backgroundImage = `url(${randomSkin().cover})`;  
  randomSkinBlock.textContent = randomSkin().name + " " + randomSkin().price + '$';
}

randomSkinBlock.addEventListener('click', e=>setRandomSkin());

(async ()=>{
  const res = await getSkins();
  skins = (Object.entries(res).map(x=>({...x[1],id:x[0]})));
  renderSkins();
  setRandomSkin();
})()
