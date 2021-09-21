// CHANGE THEMES
const themesInput = document.querySelectorAll(".switch-toggle .input-container input")

if(localStorage.getItem("theme")){
    const themeNumber = localStorage.getItem("theme")
    document.body.className = `theme-${themeNumber}`
    document.getElementById(`theme-slider-${themeNumber}`).checked = true
}

themesInput.forEach(input => {
    input.addEventListener("click", (e) => {
        document.body.className = `theme-${e.target.value}`
        localStorage.setItem("theme", e.target.value)
    })
})

// CALCULATOR
const numbers = document.querySelectorAll(".body .number")
const result = document.getElementById("result")

const dot = document.getElementById("dot-button")
const del = document.getElementById("del-button")
const plus = document.getElementById("plus-button")
const minus = document.getElementById("minus-button")
const divide = document.getElementById("divide-button")
const multiply = document.getElementById("multiply-button")
const reset = document.getElementById("reset-button")
const equal = document.getElementById("equal-button")

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if(result.innerText === "0" || result.innerText === "Error"){
            result.innerHTML = e.target.firstChild.textContent
        } else{
            result.innerHTML = result.innerText + e.target.firstChild.textContent
        }
    })
})

dot.addEventListener("click", () => {
    const fields = result.innerText.split(/[\s*/+-]+/g)
    if(!fields[fields.length - 1].includes(",") && fields[fields.length - 1] !== "" && result.innerText !== "Error"){
        result.innerHTML = result.innerText + ","
    }
})

equal.addEventListener("click", () => {
    const newResult = eval(result.innerText.replace(new RegExp("\\,", 'g'), "."))
    if(isFinite(newResult)){
        if(newResult.toString().includes(".")){
            result.innerHTML = newResult.toFixed(2).toString().replace(new RegExp("\\.", 'g'), ",")
        } else{
            result.innerHTML = newResult
        }
    } else{
        result.innerHTML = "Error"
    }
})

// OPERATORS
const operatorVerifyError = (opr) => {
    if( result.innerText !== "Error" &&
        !result.innerText.endsWith("+") &&
        !result.innerText.endsWith("-") &&
        !result.innerText.endsWith("/") &&
        !result.innerText.endsWith("*")
    ){
        result.innerHTML = result.innerText + opr
    }
}

plus.addEventListener("click", () => {
    operatorVerifyError("+")
})

minus.addEventListener("click", () => {
    operatorVerifyError("-")
})

divide.addEventListener("click", () => {
    operatorVerifyError("/")
})

multiply.addEventListener("click", () => {
    operatorVerifyError("*")
})

del.addEventListener("click", () => {
    if(result.innerText !== "0"){
        if(result.innerText.length === 1 || result.innerText === "Error"){
            result.innerHTML = "0"
        } else {
            result.innerHTML = result.innerText.slice(0, -1)
        }
    }
})

reset.addEventListener("click", () => {result.innerHTML = "0"})