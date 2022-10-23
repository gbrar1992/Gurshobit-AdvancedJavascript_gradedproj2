function checkLocalStorage(){
    return (!localStorage) ? false:true;
}

function redirect(fileName = 'resume.html'){
    window.location.href= fileName;
}