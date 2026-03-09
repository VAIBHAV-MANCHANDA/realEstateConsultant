// ===== SET COUNTDOWN DATE =====
const launchDate = new Date("2026-04-12 12:00:00").getTime();

document.body.innerHTML = `
<div class="bg"></div>

<div class="container">
    <div class="card">

        <div class="icon">🚧</div>

        <h1>Website Under Maintenance</h1>

        <p>
        We are improving our website to serve you better.
        The site will be back very soon.
        </p>

        <div class="countdown">
            <div>
                <span id="days">00</span>
                <p>Days</p>
            </div>

            <div>
                <span id="hours">00</span>
                <p>Hours</p>
            </div>

            <div>
                <span id="minutes">00</span>
                <p>Minutes</p>
            </div>

            <div>
                <span id="seconds">00</span>
                <p>Seconds</p>
            </div>
        </div>

        <div class="status">
            <span class="pulse"></span>
            Maintenance in progress
        </div>

    </div>
</div>
`;

const style = document.createElement("style");

style.textContent = `
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:system-ui;
}

body{
height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:#0f172a;
color:white;
overflow:hidden;
}

/* animated background */

.bg{
position:absolute;
width:200%;
height:200%;
background:linear-gradient(45deg,#2563eb,#9333ea,#06b6d4);
animation:move 12s infinite alternate;
filter:blur(120px);
}

@keyframes move{
from{transform:translate(-20%,-20%)}
to{transform:translate(20%,20%)}
}

/* card */

.container{
position:relative;
z-index:2;
}

.card{
text-align:center;
padding:60px;
border-radius:20px;
background:rgba(255,255,255,0.08);
backdrop-filter:blur(15px);
box-shadow:0 25px 50px rgba(0,0,0,0.5);
max-width:500px;
}

.icon{
font-size:60px;
margin-bottom:20px;
animation:bounce 2s infinite;
}

@keyframes bounce{
0%,100%{transform:translateY(0)}
50%{transform:translateY(-10px)}
}

h1{
font-size:34px;
margin-bottom:15px;
}

p{
opacity:.8;
margin-bottom:30px;
}

/* countdown */

.countdown{
display:flex;
justify-content:center;
gap:20px;
margin-bottom:30px;
}

.countdown div{
background:rgba(255,255,255,0.1);
padding:15px;
border-radius:10px;
width:70px;
}

.countdown span{
font-size:26px;
font-weight:bold;
display:block;
}

.countdown p{
font-size:12px;
opacity:.7;
margin-top:4px;
}

/* status */

.status{
display:flex;
align-items:center;
justify-content:center;
gap:10px;
font-weight:500;
}

.pulse{
width:10px;
height:10px;
background:#22c55e;
border-radius:50%;
animation:pulse 1.5s infinite;
}

@keyframes pulse{
0%{opacity:1}
50%{opacity:.4}
100%{opacity:1}
}
`;

document.head.appendChild(style);

// ===== COUNTDOWN TIMER =====

setInterval(()=>{

const now = new Date().getTime();
const distance = launchDate - now;

const days = Math.floor(distance/(1000*60*60*24));
const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
const seconds = Math.floor((distance%(1000*60))/1000);

document.getElementById("days").innerText = days;
document.getElementById("hours").innerText = hours;
document.getElementById("minutes").innerText = minutes;
document.getElementById("seconds").innerText = seconds;

},1000);