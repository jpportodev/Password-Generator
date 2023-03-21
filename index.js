let passwordLenght = 16



const upperCaseCheck = document.querySelector('#uppercase-check')
const numberCheck = document.querySelector('#number-check')
const symbolCheck = document.querySelector('#symbol-check')
const securityIndicatorBar = document.querySelector('#security-indicator-bar')

const inputPassword = document.querySelector("#password")

function generatePassword(){
    let chars = "abcdefghijklmnpqrstuvwxyz"
    const upperCaseChars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'
    const numberChars = '123456789'
    const symbolChars = '?!@&*()[]'
    
    if(upperCaseCheck.checked){
        chars += upperCaseChars
    }
    if(numberCheck.checked){
        chars += numberChars
    }
    if(symbolCheck.checked){
        chars += symbolChars
    }

    let password = ""
    for (let index = 0; index < passwordLenght; index++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
        
    }
    inputPassword.value = password
    
    calculateQuality()
    calculateFontSize()
}
function calculateQuality(){
    const percent = Math.round((passwordLenght / 64) * 25 + 
    (upperCaseCheck.checked ? 15 : 0))  + (numberCheck.checked ? 25 : 0) +
    (symbolCheck.checked ? 35 : 0)

    securityIndicatorBar.style.width = `${percent}%`

    if(percent > 69){
        //safe
        securityIndicatorBar.classList.remove('critical')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.add('safe')
    }else if(percent > 50){
        //warning
        securityIndicatorBar.classList.remove('critical')
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.add('warning')
    }else{
        //critical
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.add('critical')
    }

    if( percent >= 100){
        securityIndicatorBar.classList.add('completed')
    }else{
        securityIndicatorBar.classList.remove('completed')
    }
}

function calculateFontSize(){
    if(passwordLenght > 45){
        inputPassword.classList.remove('font-sm')
        inputPassword.classList.remove('font-xs')
        inputPassword.classList.add('font-xxs')

    }else if( passwordLenght > 32){
        inputPassword.classList.remove('font-sm')
        inputPassword.classList.remove('font-xxs')
        inputPassword.classList.add('font-xs')
    }else if( passwordLenght > 22){
        inputPassword.classList.remove('font-xs')
        inputPassword.classList.remove('font-xxs')
        inputPassword.classList.add('font-sm')
    }else{
        inputPassword.classList.remove('font-sm')
        inputPassword.classList.remove('font-xs')
        inputPassword.classList.remove('font-xxs')
    }   

}

const inputRange = document.querySelector("#password-lenght")
inputRange.addEventListener("input", function(){
    passwordLenght = inputRange.value
    document.querySelector('#password-lenght-text').innerText= passwordLenght
    generatePassword()
})

upperCaseCheck.addEventListener('click', generatePassword)
numberCheck.addEventListener('click', generatePassword)
symbolCheck.addEventListener('click', generatePassword)

// Copia a senha p/ área de transferência
function copy(){
    setTimeout(async() => {
        await navigator.clipboard.writeText(inputPassword.value)
        alert("Senha Copiada !")
    }, 100);
}
const buttonCopy = document.getElementById("button_copy")
buttonCopy.addEventListener('click', copy)

const buttonCopy2 = document.getElementById('copy2')
buttonCopy2.addEventListener('click', copy)

//refresh

const buttonRefresh = document.querySelector('button_refresh')
buttonRefresh.addEventListener('click', generatePassword)
generatePassword()