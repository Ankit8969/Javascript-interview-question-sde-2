
function cancelableTimeout(timer) {
    const timeout = {
        id: null,
        cancel: function () {
            if (this.id !== null) {
                console.log("Clear the timer");
                clearTimeout(this.id);
                this.id = null; 
            }
        },
    };

    timeout.id = setTimeout(() => {
        console.log("Print after timeout");
        timeout.id = null; 
    }, timer);

    return timeout;
}

let temp = cancelableTimeout(4000);


setTimeout(() => {
    temp.cancel();
}, 6000);
