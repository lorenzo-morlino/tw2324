const SECS = 1000;
const MINS = 60 * SECS;
const HRS = 60 * MINS;

var activeDisplay = "studytime"; //possibili valori: {"studytime" | "pausetime"}
var state = "stopped"; //possibili valori: {"stopped" | "running" | "paused"}
var intervalId;
/*le funzioni non sono generiche, mi baso sul fatto che tanto oltre le ore non ci andrò*/

/* funziona!!!!!!!!!! */
function msToStr(time){
    let hrs = Math.floor(time / HRS);
    time -= hrs * HRS;
    let mins = Math.floor(time / MINS);
    time -= mins * MINS;
    let secs = Math.floor(time / SECS);
    time -= secs * SECS;
    return 'PT' + hrs.toString() + 'H' + mins.toString() + 'M' + secs.toString() + 'S';
}

/* funziona!!!!!!!! */
function strToMs(string){
    let time = 0;
    //considerare start = length - 1 e i = start - 1
    let start = string.length - 2; //voglio saltare la S
    let i = start;
    while(string.charAt(i) != 'M'){
        i--;
    }
    time += parseInt(string.substring(i + 1, start + 1)) * SECS;
    start = i - 1;
    i = start;
    while(string.charAt(i) != 'H'){
        i--;
    }
    time += parseInt(string.substring(i + 1, start + 1)) * MINS;
    start = i - 1;
    i = start;
    while(string.charAt(i) != 'T'){
        i--;
    }
    time += parseInt(string.substring(i + 1, start + 1)) * HRS;
    return time;
}

/* funziona!!!!!!!!!!!!! */
function strToDisplaytime(string){
    let display = '';
    let start = 2;
    let i = start;
    while(string.charAt(i) != 'H'){
        i++;
    }
    display += string.substring(start, i).padStart(2, '0') + ':';
    start = i + 1;
    while(string.charAt(i) != 'M'){
        i++;
    }
    display += string.substring(start, i).padStart(2, '0');
    return display;
}

function addTime(addedInterval){
    //get timer node
    const timer = document.getElementById(activeDisplay);
    //get timestring and convert
    let prevTimeStr = timer.getAttribute('datetime');
    let prevTimeMs = strToMs(prevTimeStr);
    //calculate new time and timestring
    let newTimeMs = prevTimeMs + addedInterval;
    let newTimeStr = msToStr(newTimeMs);
    //set datetime attribute
    timer.setAttribute('datetime', newTimeStr);
    //change innerhtml
    timer.innerHTML = strToDisplaytime(newTimeStr);
}

function startTimer(){
    intervalId = setInterval(function(){
        if(strToMs(document.getElementById(activeDisplay).getAttribute('datetime')) <= 0){
            clearInterval(interval);
        } else { //nel blocco else se no fa underflow all'ultima chiamata
        addTime(-SECS);
        }
    }, 1000);
}

function resetTime(){

}

function stopTimer(){
    clearInterval(intervalId);
}


/*var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
  
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
*/

/*ritorna la data unix epoch + la durata*/
//function durationStringToDate(durationstring){
    /*la regexp non l'ho fatta tutta da solo però:
        -l'ho dovuta correggere
        -so cosa sto facendo e posso spiegare cosa c'è scritto giuro*/
    /*
    GRUPPI
    0: stringa
    1: post-P
    2: [0-9]+Y
    3: [0-9]+M
    4: [0-9]+W
    5: [0-9]+D
    6: post-T
    7: [0-9]+H
    8: [0-9]+M
    9: [0-9]+.[0-9]{1,3}S
    10:[0-9]{1,3}
    */
    /*let durationRegExp = new RegExp(/^P(([0-9]+Y)?([0-9]+M)?([0-9]+W)?([0-9]+D)?(T([0-9]+H)?([0-9]+M)?([0-9]+(\.?[0-9]{1,3})?S)?))?$/);
    if(!durationRegExp.exec(durationstring)) return null;
    //ISO 8601 Time Duration String Format - vedi [https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-duration-string]
    let matchgroups = durationstring.match(durationRegExp);
    let durationDigits = [];
    for(const i of [2, 3, 4, 5, 7, 8]){
        if(i > matchgroups.length) break
        durationDigits.push(matchgroups[i] ? parseInt(matchgroups[i].substr(0, matchgroups[i].length-1)) : 0);
    }
    //caso speciale per il gruppo 9 faccio prima così
    durationDigits.push(matchgroups[9] ? parseInt(matchgroups[9].split('.')[0]) : 0);
    durationDigits.push(matchgroups[10] ? parseInt(matchgroups[10].substring(1)) : 0);

    durationDigits[3] += durationDigits[2]*7;
    
    return new Date(1970+durationDigits[0], 0+durationDigits[1], 1+durationDigits[3], 0+durationDigits[4], 0+durationDigits[5], 0+durationDigits[6], 0+durationDigits[7]);
}*/