const products = [
];


function createCard(p){
return `
<div class="card" data-name="${p.name.toLowerCase()}" data-price="${p.price}">
<div class="img" style="background-image:url('${p.img}')" role="img" aria-label="${p.name}"></div>
<h4>${p.name}</h4>
<div>
<span class="price">₹${p.price.toLocaleString()}</span>
<span class="old">₹${p.old.toLocaleString()}</span>
</div>
<div style="display:flex;gap:8px;align-items:center">
<div class="rating">${p.rate} ★</div>
<div style="color:var(--muted);font-size:13px">Free Delivery</div>
</div>
<div class="actions">
<button class="buy">Buy</button>
<button class="wish">Wishlist</button>
</div>
</div>
`;
}


const grid = document.getElementById('productsGrid');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');


function render(list){
grid.innerHTML = list.map(createCard).join('');
}


render(products);


searchForm.addEventListener('submit', e=>{
e.preventDefault();
const q = searchInput.value.trim().toLowerCase();
const filtered = products.filter(p=>p.name.toLowerCase().includes(q));
render(filtered.length?filtered:products);
});


sortSelect.addEventListener('change', ()=>{
const val = sortSelect.value;
let copy = [...products];
if(val==='price-asc') copy.sort((a,b)=>a.price-b.price);
else if(val==='price-desc') copy.sort((a,b)=>b.price-a.price);
render(copy);
});


// mobile side nav
const sideNav = document.getElementById('sideNav');
const menuBtn = document.getElementById('menuBtn');
const closeSide = document.getElementById('closeSide');
menuBtn.addEventListener('click', ()=> sideNav.classList.add('open'));
closeSide.addEventListener('click', ()=> sideNav.classList.remove('open'));


// Simple carousel
(function carouselAuto(){
const slides = Array.from(document.querySelectorAll('.slide'));
let idx = 0;
setInterval(()=>{
slides[idx].classList.remove('active');
idx = (idx+1) % slides.length;
slides[idx].classList.add('active');
},4000);
})();


// Simple accessibility: focus product cards with keyboard
grid.addEventListener('click', e=>{
if(e.target.classList.contains('buy')) alert('Add to cart — demo only');
});


// Optional: live filter as user types
searchInput.addEventListener('input', ()=>{
const q = searchInput.value.trim().toLowerCase();
if(!q) return render(products);
const filtered = products.filter(p=>p.name.toLowerCase().includes(q));
render(filtered);
});