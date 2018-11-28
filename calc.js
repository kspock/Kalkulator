
var numArr = [],   // ARR FOR CREATING AN INT OF STR FROM VALUE in BTN/DOM [every digit of num is stored in var index]
    mAs = [],      // ARR FOR STORING OP/NUM's
    sign,          // VALUE OF OP this.value...
    res,           // ALLROUNDD
    countCtrl = 0, // FOR STOPING USER INPUT WHEN TOO LARGE (INCOMPLETE!!!!) - JUST OP/NO NUMB...
    id = 1;

var Num = [];       //STR JOIN FROM numArr (CREATE THE NUM)
var getNum;         //PUT IN mAs - DRY PROBLEM - (maslo maślane?) (acyually it is the last num...)

const buttons = document.querySelectorAll('.btn');

var opera = {
    pl: document.querySelector(".plus").value,
    mi: document.querySelector(".minus").value,
    mul: document.querySelector(".multi").value,
    di: document.querySelector(".divide").value
};

var operatorsEventsbeforeend = {

    plus: document.querySelector(".plus").addEventListener("click", function () {
        number = numArr.join("", );
    }),

    min: document.querySelector(".minus").addEventListener("click", function () {
        number = numArr.join("", );
    }),

    mul: document.querySelector(".multi").addEventListener("click", function () {
        number = numArr.join("", );
    }),
    div: document.querySelector(".divide").addEventListener("click", function () {
        number = numArr.join("", );
    }),

    eq: document.querySelector(".equal").addEventListener("click", function () {
        if (mAs[1] !== "%") { doMuDi(mAs); prepAre(mAs); finRes(mAs); } percent(mAs);
    }),

    fibo: document.querySelector(".fib").addEventListener("click", function () {
        number = numArr.join("", );
        if (mAs[1] === " - Fibonacci number") {
            fib(mAs[0]);
            showRes(res);
            resNum(res);
        }
    }),

    sqrt: document.querySelector(".sqrt").addEventListener("click", function () {
        number = numArr.join("", );
        if (mAs[1] === "x^") {
            res = Math.sqrt(mAs[0]);
            showRes(res);
            document.querySelector(".domath").insertAdjacentHTML('beforeend', " = " + res);
            resNum(res);
        }
    }),

    pow: document.querySelector(".pow").addEventListener("click", function () {
        number = numArr.join("", );
        if (mAs[1] === "x²") {
            res = Math.pow(mAs[0], 2);
            showRes(res);
            document.querySelector(".domath").insertAdjacentHTML('beforeend', " = " + res);
            resNum(res);
        }
    }),
    gensy: document.querySelector(".gens").addEventListener("click", function () {
        number = numArr.join("", );
    }),
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function doMuDi(arr) {
    for (i = 0; i < arr.length; i++) {

        if (arr[i] === "/" && arr[i + 2] === "*" && arr[i + 4] === "/") {
            sub_res = arr[i - 1] / arr[i + 1];
            sub_res2 = sub_res * arr[i + 3];
            res = sub_res2 / arr[i + 5];
            oper = arr.splice((i - 1), 7, res);     //G
        }

        if (arr[i] === "*" && arr[i + 2] === "/") {  //F
            sub_res = arr[i - 1] * arr[i + 1];
            res = sub_res / arr[i + 3];
            oper = arr.splice((i - 1), 5, res);
        }
        if (arr[i] === "/" && arr[i + 2] === "*") { //E
            mid_res = arr[i - 1] / arr[i + 1];
            res = mid_res * arr[i + 3];
            oper = arr.splice((i - 1), 5, res);
        }
        if (arr[i] === "/" && arr[i + 2] === "/") { //D
            mid_res = arr[i - 1] / arr[i + 1];
            res = mid_res / arr[i + 3];
            oper = arr.splice((i - 1), 5, res);
        }
        if (arr[i] === "*" && arr[i + 2] === "*") {  //C
            mid_res = arr[i - 1] * arr[i + 1];
            res = mid_res * arr[i + 3];
            oper = arr.splice((i - 1), 5, res);
        }
        if (arr[i] === "/") {                           // -> /B
            res = arr[i - 1] / arr[i + 1];
            oper = arr.splice((i - 1), 3, res);
        }
        if (arr[i] === "*") {                           //*A
            res = arr[i - 1] * arr[i + 1];
            oper = arr.splice((i - 1), 3, res);
        }
    }
}

//PREPARE THE ARRAY FOR FINAL_ADD

function prepAre(arr) {
    doMuDi(arr);
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === "-") {
            arr[i] = null;
            arr[i + 1] = -arr[i + 1];
        }
        if (arr[i] === "+") { arr[i] = null; }
    }
}

//ADD ALL EL IN ARR AFTER "OP-PREP"
// DODAC FUNKCJE WIECEJ MIEJSC PO PRZECINKU!!!, DLA USERA

function finRes(arr) {
    prepAre(arr);
    result = 0;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] !== "=") { result += arr[i]; }
        res = result.toFixed(3);
        if (res[res.length - 4] === ".") {
            res = result;
        }
    }

    // DECIMAL FIX  

    if (res[res.length - 3] === "0") {
        res = result.toFixed(0);
    }
    if (res[res.length - 2] === "0" && res[res.length - 3] !== "0") {
        res = result.toFixed(1);
    }
    if (res[res.length - 1] === "0") {
        res = result.toFixed(2);
    }

    id++;
    document.querySelector(".display").innerHTML = "&nbsp;";
    document.querySelector(".display").insertAdjacentHTML('beforeend', res);
    document.querySelector(".domath").insertAdjacentHTML('beforeend', res);
    document.querySelector(".domath").insertAdjacentHTML('beforeend', "<br />" + id + ")" + "<br />");
    countCtrl = 0;
    resNum(res);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// UI with (some)DATA

function getOpVal(op) {
    getNum = Num.pop(); if (typeof (mAs[0]) === "number" && mAs[1] === undefined) { mAs.push(op); } //IPHONE CALCU HACK
    else { mAs.push(getNum, op) };
    if (countCtrl >= 40) {
        eq = "=";
        return document.querySelector(".domath").insertAdjacentHTML('beforeend', eq),  //FORCE RESULT WHEN TOO MUCH CHARs
            ctrlLength(mAs), countCtrl = 0;
    }
    return sign = op, numArr = [],
        showOp(op), countCtrl++;
}

function getNumVal(num) {
    numArr.push(num); number = numArr.join(""); Num.push(parseFloat(number));
    if (countCtrl >= 40) {
        countCtrl = 0;
    }
    return num, showNum(num), countCtrl++;
}


//DISPLAY USER INPUT ON DISPLAY

function showNum(num) {
    dataDisplayHTML = num;
    document.querySelector(".display").insertAdjacentHTML('beforeend', dataDisplayHTML);
    document.querySelector(".domath").insertAdjacentHTML('beforeend', dataDisplayHTML);
}
function showOp(op) {
    dataDisplayHTML = '<span>' + op + '</span>';
    document.querySelector(".display").insertAdjacentHTML('beforeend', dataDisplayHTML);
    document.querySelector(".domath").insertAdjacentHTML('beforeend', "&nbsp;" + dataDisplayHTML);
}

//CLEAR DISPLAY

document.querySelector(".ac").addEventListener("click", function () {
    mAs = [];
    result = 0;
    number = undefined;
    getNum = undefined;
    numArr = [];
    document.querySelector(".display").innerHTML = "&nbsp;";
})

// FACTORY

document.querySelector(".fact").addEventListener("click", function () {
    facto(number);
    showRes(res), mathLog("=" + res);
    resNum(res);
})
function facto(n) {
    if (n === 1) { return 1; }
    res = n * facto(n - 1);
    return res;
}

// PRIME NUMBER CHECK

document.querySelector(".prime").addEventListener("click", function () {
    if (number === "1" || number === "0") {
        document.querySelector(".display").innerHTML = "&nbsp;" + number + " is not a prime number!";
    }
    if (number === "2") {
        document.querySelector(".display").innerHTML = "&nbsp;" + number + " is a prime number!";
    }
    PrimeCheck(number);
})

function PrimeCheck(num) {
    for (i = 2; i < num; i++) {
        if (num % i === 0) {
            document.querySelector(".display").innerHTML = "&nbsp;" + number + " is not a prime number!";
            break;
        }
        if (num % i !== 0) {
            document.querySelector(".display").innerHTML = "&nbsp;" + number + " is a prime number!";
        }
    }
}

//PERCENTAGES

function percent(arr) {
    if (mAs[1] === "%") {
        res = (mAs[0] * mAs[2]) / 100;
        mathLog(res);
        showRes(res);
        resNum(res);
    }
}

// n'th FIBONACI NUMBER

function fib(n) {
    if (n === 1 || n === 2) { res = 1; }
    else { res = fib(n - 2) + fib(n - 1); }
    return res;
}

// CHECKING IF NOT TOO MUSCH CHARS IN DISPAY, IF YES GIVE RES

function ctrlLength(arr) {
    if (arr[arr.length - 1] === "-" || arr[arr.length - 1] === "*" || arr[arr.length - 1] === "+" || arr[arr.length - 1] === "/"
        && typeof (arr[arr.length - 1]) !== "number") {
        arr[arr.length - 1] = "="
    }
    doMuDi(arr), prepAre(arr), finRes(arr)
}

//DRY - (P) - DIFFERS and IS NOT COMAPTIBLE

function showRes(res) {
    document.querySelector(".display").innerHTML = "&nbsp;" + res;
}
function mathLog(res) {
    id++
    document.querySelector(".domath").insertAdjacentHTML('beforeend', res);
    document.querySelector(".domath").insertAdjacentHTML('beforeend', "<br />" + id + ")" + "<br />");
}




// source - > W3SCHOOL
// Get the modal   //Crt-V - W3SCHOOL.com
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



// CHANGING COLOR OF CALCULATOR  -- DRY ONE FUNCTION!?
document.querySelector('.black').addEventListener("click", function () {

    document.querySelector("#myBtn").style.color = "snow";
    document.querySelector("#myBtn").style.background = "rgb(9, 9, 9)";
    document.querySelector("#myBtn").style.border = "2px solid snow";

    document.querySelector(".display").style.background = "rgb(9, 9, 9)";
    document.querySelector(".display").style.border = "4px solid white";
    document.querySelector(".display").style.color = "snow";

    changeBtnCol("rgb(9, 9, 9)", "snow", "1px 2px snow");
})

document.querySelector('.white').addEventListener("click", function () {

    document.querySelector("#myBtn").style.color = "black";
    document.querySelector("#myBtn").style.background = "white";
    document.querySelector("#myBtn").style.border = "2px solid gray";

    document.querySelector(".display").style.background = "white";
    document.querySelector(".display").style.color = "black";
    document.querySelector(".display").style.border = "4px solid gray";

    changeBtnCol("white", "black", "1px 2px darkgray");
})


// ADD RESULT AS ONE EL IN ARR FOR NEXT MATH OP
function resNum(num) {
    mAs = [];
    mAs[0] = parseFloat(res);
}

//DOM NODE-LIST MANIPULATION
function changeBtnCol(colorBtn, col, btn_shad) {
    var buttonArr = Array.prototype.slice.call(buttons);
    buttonArr.forEach(function (cur) {
        cur.style.backgroundColor = colorBtn;
        cur.style.color = col;
        cur.style.boxShadow = btn_shad;
    });
}

//COS, SIN, TAN, CTANG - onclick invoked fn, .html

function gensy(a, num){
    num = mAs[0];
    if(a === "cos"){
        res = Math.cos(num);
    }
    if(a === "sin"){
        res = Math.sin(num);
    }
    if(a === "tan"){
        res = Math.tan(num);
    }
    if(a === "ctan"){
        res = 1/Math.tan(num);
    }
    showRes(res);
    document.querySelector(".domath").insertAdjacentHTML('beforeend', " = " + res);
    resNum(res)
}
