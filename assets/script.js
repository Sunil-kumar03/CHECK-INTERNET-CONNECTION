let popup = document.querySelector('.popup'),
 wifiIcon = document.querySelector('.icon i'),
 popupTitle = document.querySelector('.title'),
 popupDesc = document.querySelector('.desc');
 reconnectBtn = document.querySelector(".reconnect");



let isOnline = true,intervalId,timer=10;

const checkConnection = async ()=>{
    try {
        /*
        Try to fetch random data from the Api
        if the status code is between the 200 and 300,the network connection is considered online
         */
        const response = await fetch("http://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status<300;
    } catch (error) {
        //if there is an error ,the connection is considered offline
        isOnline=false // If there is an error, the connection is considered offline
    }
    timer =10;
    clearInterval(intervalId);
    handlePop(isOnline);
}

const handlePop=(status)=>{
    if(status){// If the status is true (online), update icon, title, and description accordingly
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "You Are Back Into Online";
        popupDesc.innerText="Your Device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(()=>popup.classList.remove("show","online"),2000);
    }
    // If the status is false (offline), update the icon, title, and description accordingly
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "YOUR IN OFFLINE";
    popupDesc.innerHTML="your network is unavailable. We will Attempt to reconnect you in <b>10</b> seconds";

    popup.classList.add('show');

    intervalId = setInterval(()=>{// Set an interval to decrease the timer by 1 every second
        timer--;
        if(timer ===0) checkConnection();// If the timer reaches 0, check the connection again
        popup.querySelector(".desc b").innerText = timer;
    },1000)
}

// Only if isOnline is true, check the connection status every 3 seconds
setInterval(()=>isOnline && checkConnection(),3000);
reconnectBtn.addEventListener("click", checkConnection);