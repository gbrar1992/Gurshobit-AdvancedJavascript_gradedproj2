if(checkLocalStorage()){
    console.log('Local Storage is Available');
    function checkLogin(){
        return localStorage.getItem('isLogin') == 'true' ? true:false;
    }

    if(!checkLogin()){
        redirect('index.html');
    }

    // Giving Error: Chrome Cross Site Policy without Local Server
    // console.log(fetch('../assets/data.json').then((response) => response.json()));

    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'assets/data.json', false);
    httpRequest.send(null);
    let responseData = JSON.parse(httpRequest.responseText);

    let resumes = [];
    let primaryResumes = [];
    let currentResume = {};
    let currentResumeIndex = 0;
    let nextResumeIndex = 0;
    let previousResumeIndex = 0;
    let lastResumeIndex = 0;
    let resumeDivElement = document.getElementById('resumeDiv'); 
    let noResultsDivElement = document.getElementById('noResultsDiv'); 
    let searchResumeElement = document.getElementById('searchResumeInput'); 
    let previousResumeButtonElement = document.getElementById('previousResumeButton'); 
    let nextResumeButtonElement = document.getElementById('nextResumeButton'); 
    let logoutButtonElement = document.getElementById('logoutButton'); 

    if(responseData.resume){
        primaryResumes = responseData.resume;
        nextResumeIndex = (primaryResumes.length > 1) ? 1 : 0;
        loadResumesData(responseData.resume);
        updatePreviousNextButtons();
    }

    function loadResumesData(data = []){
        noResultsDivElement.style.display = 'none';
        resumeDivElement.style.display = 'none';
        resumes = data;
        if(resumes.length > 0){
            lastResumeIndex = (resumes.length > 1) ? resumes.length: 0;
            loadResume(currentResumeIndex);
            resumeDivElement.style.display = 'flex';
        } else {
            noResultsDivElement.style.display = 'flex';
        }
        updatePreviousNextButtons();
    }

    function loadResume(resumeIndex){
        currentResume = resumes[resumeIndex];
        loadResumeHeader(currentResume.basics);
        loadResumePersonalInfo(currentResume.basics);
        loadResumeTechSkillsAndHobbies(currentResume.skills.keywords,currentResume.interests.hobbies);
        loadResumeWorkAndProjectsInfo(currentResume.work,currentResume.projects);
        loadResumeEducation(currentResume.education);
        loadResumeInternshipsInfo(currentResume.Internship);
        loadResumeAchievements(currentResume.achievements.Summary);
    }

    function loadResumeHeader(data){
        const personNameTextElement = document.getElementById('personNameText'); 
        const appliedForTextElement = document.getElementById('appliedForText'); 

        personNameTextElement.innerText = data.name;
        appliedForTextElement.innerText = data.AppliedFor;
    }

    function loadResumePersonalInfo(data){
        const mobileTextElement = document.getElementById('mobileText'); 
        const emailTextElement = document.getElementById('emailText'); 
        const profileTextElement = document.getElementById('profileText'); 
        
        mobileTextElement.innerText = data.phone;
        emailTextElement.innerText = data.email;
        profileTextElement.innerHTML = `<a href="${data.profiles.url}">${data.profiles.network}</a>`;
    }
    
    function loadResumeTechSkillsAndHobbies(skills,hobbies){
        const technicalSkillsElement = document.getElementById('technicalSkills'); 
        const hobbiesElement = document.getElementById('hobbies'); 
        technicalSkillsElement.innerHTML = skills.map((ts) => `<li class="p-1">${ts}</li>` ).join('');
        hobbiesElement.innerHTML = hobbies.map((hs) => `<li class="p-1">${hs}</li>` ).join('');
    }

    function loadResumeWorkAndProjectsInfo(work,projects){
        const companyNameTextElement = document.getElementById('companyNameText');
        const positionTextElement = document.getElementById('positionText');
        const startDateTextElement = document.getElementById('startDateText');
        const endDateTextElement = document.getElementById('endDateText');
        const summaryTextElement = document.getElementById('summaryText');
        const projectNameTextElement = document.getElementById('projectNameText');
        const projectSummaryTextElement = document.getElementById('projectSummaryText');

        companyNameTextElement.innerText = work['Company Name'];
        positionTextElement.innerText = work['Position'];
        startDateTextElement.innerText = work['Start Date'];
        endDateTextElement.innerText = work['End Date'];
        summaryTextElement.innerHTML = work['Summary'];
        projectNameTextElement.innerText = projects.name + ': ';
        projectSummaryTextElement.innerText = projects.description;
    }

    function loadResumeEducation(education){
        const educationTextElement = document.getElementById('educationText');
        let educationKeys = Object.keys(education);

        let educationTextData = educationKeys.map(value => {
            let educationQualifications = education[value];
            let educationQualificationsKeys = Object.keys(educationQualifications);

            let educationText = educationQualificationsKeys.map(
                (eqk) => {
                    return educationQualifications[eqk];
                }
            ).join(', ');

            return `<li class="p-1"><b>${value}:</b> <span>${educationText}</span></li>`;
        }).join('');

        educationTextElement.innerHTML = educationTextData;
    }

    function loadResumeInternshipsInfo(internships){
        const companyNameTextElement = document.getElementById('internshipCompanyNameText');
        const positionTextElement = document.getElementById('internshipPositionText');
        const startDateTextElement = document.getElementById('internshipStartDateText');
        const endDateTextElement = document.getElementById('internshipEndDateText');
        const summaryTextElement = document.getElementById('internshipSummaryText');

        companyNameTextElement.innerText = internships['Company Name'];
        positionTextElement.innerText = internships['Position'];
        startDateTextElement.innerText = internships['Start Date'];
        endDateTextElement.innerText = internships['End Date'];
        summaryTextElement.innerHTML = internships['Summary'];
    }
    
    function loadResumeAchievements(achievements){
        const achievementsTextElement = document.getElementById('achievementsText'); 
        achievementsTextElement.innerHTML = achievements.map((ach) => `<li class="p-1">${ach}</li>` ).join('');
    }

    function nextResume(){
        const resumeIds = getResumeIds();
        const currentIndex = resumeIds.indexOf(currentResume.id);
        
        let tempNext = currentIndex + 1;
        if(tempNext < lastResumeIndex){
            nextResumeIndex = ((tempNext + 1) <= lastResumeIndex) ? tempNext + 1 : lastResumeIndex;
            previousResumeIndex = currentIndex;
            currentResumeIndex = tempNext;
        }
        loadResume(currentResumeIndex);
        updatePreviousNextButtons();
    }

    function previousResume(){
        const resumeIds = getResumeIds();
        const currentIndex = resumeIds.indexOf(currentResume.id);
        let tempPrevious = currentIndex - 1;
        if(currentIndex > 0 && tempPrevious >= 0){
            previousResumeIndex = ((tempPrevious - 1) >= 0) ? tempPrevious - 1 : 0;
            currentResumeIndex = tempPrevious;
            nextResumeIndex = currentIndex;
        }
        loadResume(currentResumeIndex);
        updatePreviousNextButtons();

    }

    function getResumeIds(){
        return resumes.map(
            (rd) => rd.id
        );
    }

    function updatePreviousNextButtons(){
        previousResumeButtonElement.style.display = 'none';
        nextResumeButtonElement.style.display = 'none';
        if(resumes.length > 0){
            if(currentResumeIndex > 0 && previousResumeIndex < lastResumeIndex){
                previousResumeButtonElement.style.display = 'inline-block';
            }
            
            if(currentResumeIndex < nextResumeIndex && nextResumeIndex < lastResumeIndex){
                nextResumeButtonElement.style.display = 'inline-block';
            }

        }
    }

    function searchResume(searchKeyword){
        return resumes.filter((singleResume) => singleResume.basics.AppliedFor.toLowerCase().includes(searchKeyword.toLowerCase()))
    }

    searchResumeElement.addEventListener('input',function(event){
        currentResumeIndex = 0;
        nextResumeIndex = 0;
        previousResumeIndex = 0;
        resumes = primaryResumes;
        let searchKeyword = searchResumeElement.value;
        let newResumeData = searchResume(searchKeyword);
        nextResumeIndex = (newResumeData.length > 1) ? 1 : 0;
        lastResumeIndex = (newResumeData.length < 1) ? 0 : newResumeData.length;
        loadResumesData(newResumeData);
    });

    previousResumeButtonElement.addEventListener('click',function(event){
        previousResume();
    });

    nextResumeButtonElement.addEventListener('click',function(event){
        nextResume();
    });

    logoutButtonElement.addEventListener('click',function(event){
        localStorage.setItem('isLogin',false);
        redirect('index.html');       
    });

} else {
    console.log('Local Storage is not Available');
    redirect('index.html');
}