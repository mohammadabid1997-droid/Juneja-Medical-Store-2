/* CATEGORY ACCORDION */

const categoryNodes =
document.querySelectorAll(
".category-node"
);

categoryNodes.forEach((node)=>{

const header =
node.querySelector(
".category-header"
);

header.addEventListener(
"click",
()=>{

const active =
node.classList.contains(
"active"
);

categoryNodes.forEach((n)=>{
n.classList.remove(
"active"
);
});

if(!active){

node.classList.add(
"active"
);
}
});
});

/* CART */

let cart = [];

const cartSidebar =
document.getElementById(
"cartSidebar"
);

const cartOverlay =
document.getElementById(
"cartOverlay"
);

const openCartBtn =
document.getElementById(
"open-cart-btn"
);

const closeCartBtn =
document.getElementById(
"close-cart-btn"
);

const cartBody =
document.querySelector(
".cart-body"
);

const cartCount =
document.getElementById(
"cartCount"
);

/* OPEN CART */

openCartBtn.addEventListener(
"click",
()=>{

cartSidebar.classList.add(
"active"
);

cartOverlay.classList.add(
"active"
);
});

closeCartBtn.addEventListener(
"click",
closeCart
);

cartOverlay.addEventListener(
"click",
closeCart
);

function closeCart(){

cartSidebar.classList.remove(
"active"
);

cartOverlay.classList.remove(
"active"
);
}

/* ADD TO CART */

const addButtons =
document.querySelectorAll(
".add-cart"
);

addButtons.forEach((btn)=>{

btn.addEventListener(
"click",
()=>{

const card =
btn.closest(
".medicine-card"
);

const title =
card.querySelector(
".med-title"
).innerText;

const priceText =
card.querySelector(
".price"
).innerText;

const price =
parseInt(
priceText.replace(
"₹",
""
)
);

addToCart(
title,
price
);
});
});

/* ADD ITEM */

function addToCart(
name,
price
){

const existing =
cart.find(
(item)=>
item.name === name
);

if(existing){

existing.quantity += 1;

}else{

cart.push({

name:name,

price:price,

quantity:1

});
}

updateCart();

showToast(
"Added to Cart"
);
}

/* UPDATE CART */

function updateCart(){

if(cart.length === 0){

cartBody.innerHTML = `

<div class="empty-cart">

<i class="fa-solid fa-cart-shopping"></i>

<p>
Your cart is empty
</p>

</div>

`;

cartCount.innerText = "0";

return;
}

let total = 0;

let cartHTML = "";

cart.forEach((item,index)=>{

const itemTotal =
item.price *
item.quantity;

total += itemTotal;

cartHTML += `

<div class="cart-item">

<div class="cart-item-top">

<div>

<h4>
${item.name}
</h4>

<p>
₹${item.price}
</p>

</div>

<div class="qty-controls">

<button onclick="decreaseQty(${index})">
-
</button>

<span>
${item.quantity}
</span>

<button onclick="increaseQty(${index})">
+
</button>

</div>

</div>

<div class="cart-total-line">

₹${itemTotal}

</div>

</div>

`;
});

cartHTML += `

<div class="checkout-box">

<div class="checkout-total">

<h3>
Total
</h3>

<h2>
₹${total}
</h2>

</div>

<a href="https://wa.me/919811859294?text=${encodeURIComponent(createWhatsAppMessage(total))}"
target="_blank"
class="btn btn-primary btn-full">

Order On WhatsApp

</a>

</div>

`;

cartBody.innerHTML =
cartHTML;

cartCount.innerText =
cart.length;
}

/* QUANTITY */

function increaseQty(index){

cart[index].quantity += 1;

updateCart();
}

function decreaseQty(index){

if(cart[index].quantity > 1){

cart[index].quantity -= 1;

}else{

cart.splice(index,1);
}

updateCart();
}

/* WHATSAPP */

function createWhatsAppMessage(total){

let message =
`Hello Juneja Medical Store

I want to order:

`;

cart.forEach((item)=>{

message += `
${item.name}

Qty: ${item.quantity}

`;
});

message += `

Total Bill: ₹${total}

Please confirm availability.

`;

return message;
}

/* TOAST */

function showToast(text){

const toast =
document.createElement(
"div"
);

toast.className =
"toast";

toast.innerText =
text;

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.classList.add(
"show"
);

},100);

setTimeout(()=>{

toast.classList.remove(
"show"
);

setTimeout(()=>{

toast.remove();

},300);

},2000);
}
