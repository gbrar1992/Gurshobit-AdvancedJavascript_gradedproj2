if(checkLocalStorage()){
    console.log('Local Storage is Available');
    if(!localStorage.getItem('isLogin')){
        console.log('Loading...  isLogin into LocalStorage')
        localStorage.setItem('isLogin',false);
    }

    if(!localStorage.getItem('loginUsername')){
        console.log('Loading...  loginUsername into LocalStorage')
        localStorage.setItem('loginUsername','hr@company.com');
    }
    
    if(!localStorage.getItem('loginPassword')){
        // Not a got Practice to Set Password in plain text into Local Storage
        console.log('Loading...  loginPassword into LocalStorage')
        localStorage.setItem('loginPassword','Password@2022!');
    }

    function checkData(dataValue,fieldName = 'loginUsername'){
        return (dataValue === localStorage.getItem(fieldName)) ? true:false;
    }

    function checkLogin(){
        return localStorage.getItem('isLogin') == 'true' ? true:false;
    }

    if(checkLogin()){
        redirect();
    }
    
    const usernameElement = document.getElementById('usernameInput');
    const usernameErrorElement = document.getElementById('usernameErrorText');
    const passwordElement = document.getElementById('passwordInput');
    const passwordErrorElement = document.getElementById('passwordErrorText');
    const loginButtonElement = document.getElementById('loginButton');

    loginButtonElement.addEventListener('click',function(event){
        usernameErrorElement.innerText = '';
        passwordErrorElement.innerText = '';
        usernameErrorElement.style.display = "none";
        passwordErrorElement.style.display = "none";

        loginButtonElement.innerText = 'Processing ...';
        loginButtonElement.disabled = true;
        let isValidUsername = checkData(usernameElement.value,'loginUsername');
        let isValidPassword = checkData(passwordElement.value,'loginPassword');

        if(isValidUsername && isValidPassword){
            usernameErrorElement.innerText = '';
            passwordErrorElement.innerText = '';
            usernameElement.style.display = "none";
            passwordElement.style.display = "none";
            loginButtonElement.innerText = 'LoggedIn';
            localStorage.setItem('isLogin',true);
            redirect();
        } else {
            loginButtonElement.innerText = 'Login';
            loginButtonElement.disabled = false;

            if(!isValidUsername){
                usernameErrorElement.innerText = 'Username is not valid.';
                usernameErrorElement.style.display = "block";
            }
            
            if(!isValidPassword){
                passwordErrorElement.innerText = "Password is not valid.";
                passwordErrorElement.style.display = "block";
            }
        }
    });

} else {
    console.log('Local Storage is not Available');
}