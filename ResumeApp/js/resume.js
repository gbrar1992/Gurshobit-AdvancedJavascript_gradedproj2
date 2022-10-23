if(checkLocalStorage()){
    console.log('Local Storage is Available');
    function checkLogin(){
        return localStorage.getItem('isLogin') == 'true' ? true:false;
    }

    if(checkLogin()){
        redirect('index.html');
    }

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'assets/data.json', false);
    httpRequest.send(null);
    let responseData = JSON.parse(httpRequest.responseText);

    let resumes = [];
    let primaryResumes = [];
    let currentResumeIndex = 0;
    let nextResumeIndex = 0;
    let previousResumeIndex = 0;
    let resumeDivElement = document.getElementById('resumeDiv'); 
    let noResultsDivElement = document.getElementById('noResultsDiv'); 
    let searchResumeElement = document.getElementById('searchResumeInput'); 
    let previousResumeButtonElement = document.getElementById('previousResumeButton'); 
    let nextResumeButtonElement = document.getElementById('nextResumeButton'); 

    if(responseData.resume){
        primaryResumes = responseData.resume;
        loadResumesData(responseData.resume);
    }

    function loadResumesData(data = []){
        noResultsDivElement.style.display = 'none';
        resumeDivElement.style.display = 'none';
        resumes = data;
        if(resumes.length > 0){
            loadResume(resumes[0]);
            resumeDivElement.style.display = 'flex';
        } else {
            noResultsDivElement.style.display = 'flex';
        }
    }

    function loadResume(resume){
        
    }

    function nextResume(){

    }

    function previousResume(){

    }

    function getResumes(){
        console.log(resumes);
    }

    function searchResume(searchKeyword){
        return resumes.filter((singleResume) => singleResume.basics.AppliedFor.toLowerCase().includes(searchKeyword.toLowerCase()))
    }

    searchResumeElement.addEventListener('change',function(event){
        loadResumesData(primaryResumes)
        let searchKeyword = searchResumeElement.value;
        console.log(searchKeyword);
        var d = searchResume(searchKeyword);
        console.log(d); 
        loadResumesData(d);
    });

    console.log(resumes);

    // Giving Error: Chrome Cross Site Policy
    // console.log(fetch('../assets/data.json').then((response) => response.json()));

} else {
    console.log('Local Storage is not Available');
    redirect('index.html');
}