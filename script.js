
const equipment = [
 {id:1,name:"Digital Multimeter",category:"Electronics",description:"Measures voltage, current and resistance.",available:true,image:"multimeter.svg"},
 {id:2,name:"Microscope",category:"Optics",description:"For viewing small samples in detail.",available:true,image:"microscope.svg"},
 {id:3,name:"Oscilloscope",category:"Electronics",description:"Displays electrical signals as waveforms.",available:true,image:"oscilloscope.svg"},
 {id:4,name:"Lab Glassware Set",category:"General Lab",description:"Basic glassware for laboratory experiments.",available:true,image:"glassware.svg"},
 {id:5,name:"Optical Bench",category:"Optics",description:"Supports basic light and lens experiments.",available:false,image:"optical-bench.svg"},
 {id:6,name:"Hot Plate",category:"General Lab",description:"Used for controlled heating in the lab.",available:true,image:"hotplate.svg"}
];

let bookings = [];
let currentEmail = "";

const $ = id => document.getElementById(id);

function toast(message){
  const t=$("toast");
  t.textContent=message;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2400);
}

$("emailForm").addEventListener("submit",e=>{
  e.preventDefault();
  currentEmail=$("email").value.trim();
  $("emailForm").classList.add("hidden");
  $("otpForm").classList.remove("hidden");
  $("loginTitle").textContent="Check your inbox.";
  $("loginDescription").textContent="Enter the 6-digit verification code to continue.";
  $("otpHint").textContent="Demo verification code: 123456";
});

$("otpForm").addEventListener("submit",e=>{
  e.preventDefault();
  if($("otp").value.trim()!=="123456"){
    toast("Incorrect code. Try the demo code 123456.");
    return;
  }
  $("loginView").classList.add("hidden");
  $("appView").classList.remove("hidden");
  const name=currentEmail.split("@")[0]||"Student";
  $("sideUser").textContent=name;
  $("topUser").textContent=currentEmail;
  $("avatar");
  renderAll();
});

$("backBtn").addEventListener("click",()=>{
  $("otpForm").classList.add("hidden");
  $("emailForm").classList.remove("hidden");
  $("loginTitle").textContent="Welcome back.";
  $("loginDescription").textContent="Sign in with your college email to explore and book laboratory equipment.";
});

$("logoutBtn").addEventListener("click",()=>{
  $("appView").classList.add("hidden");
  $("loginView").classList.remove("hidden");
  $("otp").value="";
});

function card(item){
  return `<article class="equipment-card">
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <div class="card-bottom">
      <span class="availability ${item.available?"":"unavailable"}">${item.available?"● Available":"● Unavailable"}</span>
      <button class="book-btn" ${item.available?"":"disabled"} onclick="bookItem(${item.id})">Request booking</button>
    </div>
  </article>`;
}

function renderEquipment(){
  const search=($("searchInput")?.value||"").toLowerCase();
  const category=$("categoryFilter")?.value||"All";
  const filtered=equipment.filter(x=>
    (x.name.toLowerCase().includes(search)||x.category.toLowerCase().includes(search))&&
    (category==="All"||x.category===category)
  );
  $("equipmentGrid").innerHTML=filtered.length
    ?filtered.map(card).join("")
    :'<div class="empty-state">No equipment found. Try another search.</div>';
}

function renderBookings(){
  $("bookingCount").textContent=bookings.length;
  $("totalBookings").textContent=bookings.length;
  $("bookingList").innerHTML=bookings.length
    ?bookings.map(b=>`<article class="booking-item">
      <div><h3>${b.name}</h3><p>Requested on ${b.date}</p></div>
      <span class="pill">${b.status}</span>
    </article>`).join("")
    :'<div class="empty-state"><strong>No bookings yet</strong>Your equipment requests will appear here.</div>';
  renderAdmin();
}

function renderAdmin(){
  const list=$("adminBookingList");
  if(!bookings.length){
    list.innerHTML='<div class="empty-state"><strong>No requests to review</strong>Student booking requests will appear here.</div>';
    return;
  }
  list.innerHTML=bookings.map((b,index)=>`<article class="booking-item">
    <div>
      <h3>${b.name}</h3>
      <p>Student: ${b.email} · Requested: ${b.date}</p>
      <p>Status: <strong>${b.status}</strong></p>
    </div>
    <div class="admin-actions">
      ${b.status==="Pending"
        ?`<button class="book-btn" onclick="updateBooking(${index}, 'Approved')">Approve</button>
          <button class="reject-btn" onclick="updateBooking(${index}, 'Rejected')">Reject</button>`
        :`<span class="pill">${b.status}</span>`}
    </div>
  </article>`).join("");
}

function updateBooking(index,status){
  const booking=bookings[index];
  if(!booking || booking.status!=="Pending") return;

  if(status==="Approved"){
    const item=equipment.find(x=>x.id===booking.id);
    if(!item || !item.available){
      toast("This equipment is no longer available.");
      booking.status="Rejected";
    } else {
      item.available=false;
      booking.status="Approved";
      toast("Booking approved.");
    }
  } else {
    booking.status="Rejected";
    toast("Booking rejected.");
  }
  renderAll();
}

function renderAll(){
  $("totalEquipment").textContent=equipment.length;
  $("availableEquipment").textContent=equipment.filter(x=>x.available).length;
  $("popularGrid").innerHTML=equipment.slice(0,3).map(card).join("");
  renderEquipment();
  renderBookings();
}

function bookItem(id){
  const item=equipment.find(x=>x.id===id);
  if(!item||!item.available)return;
  if(bookings.some(b=>b.id===id)){
    toast("You already requested this equipment.");
    return;
  }
  bookings.push({
    id:item.id,
    name:item.name,
    email:currentEmail,
    date:new Date().toLocaleDateString(),
    status:"Pending"
  });
  renderBookings();
  toast("Booking request submitted!");
}

function showPage(page){
  ["dashboard","equipment","bookings","admin"].forEach(p=>
    $(p+"Page").classList.toggle("hidden",p!==page)
  );
  document.querySelectorAll(".nav-link").forEach(b=>
    b.classList.toggle("active",b.dataset.page===page)
  );
  $("pageHeading").textContent=
    page==="dashboard"?"Overview":
    page==="equipment"?"Equipment catalogue":
    page==="bookings"?"My bookings":"Admin approvals";

  if(page==="admin") renderAdmin();
}

document.querySelectorAll(".nav-link").forEach(b=>
  b.addEventListener("click",()=>showPage(b.dataset.page))
);

document.querySelectorAll("[data-go]").forEach(b=>
  b.addEventListener("click",()=>showPage(b.dataset.go))
);

$("searchInput").addEventListener("input",renderEquipment);
$("categoryFilter").addEventListener("change",renderEquipment);
