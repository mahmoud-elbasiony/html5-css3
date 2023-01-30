this.onmessage =function(){
    var summ = 0;
    for(var i=0;i<1000000000;i++){
        summ+=i;
    }
    // alert(summ)
    this.postMessage(summ);
}

//? self === this 
//& stack - web api - microtasks "promises" ==> event loop