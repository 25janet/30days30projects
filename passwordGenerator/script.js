const passwordBox = document.getElementById("password");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const length = 16;
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
const allCharacters = uppercase + lowercase + numbers + symbols;

function generatePassword(){
    let password = "";
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    while (password.length < length){
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
    passwordBox.value = password;
    shuffle();

}
function shuffle(){
    let shuffled = passwordBox.value.split('').sort(() => Math.random() - 0.4).join('');
    passwordBox.value = shuffled;
}
function copyPassword(){
    passwordBox.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}

generateButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copyPassword);