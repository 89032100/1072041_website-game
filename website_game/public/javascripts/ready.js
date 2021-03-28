var s=3;
function countdown(){
    let t=document.getElementById("showtime");
    t.innerHTML=s;
    setTimeout(countdown,1000);
    s-=1;
    if(s<0){
        t.style.visibility="hidden";
        t.innerText="START";
        t.style.visibility="visible";
    }
    if(s<-1){
        window.location="http://localhost:3000/public/game1.html";
    }
}