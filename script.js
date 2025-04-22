document.getElementById('profile-pic').addEventListener('click', function() {
    document.getElementById('profile-upload').click();
});

document.getElementById('profile-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgData = event.target.result;
            document.getElementById('profile-pic').src = imgData;
            localStorage.setItem('profile-pic', imgData);
        };
        reader.readAsDataURL(file);
    }
});

function addEducation() {
    const educationList = document.querySelector('.education-list');
    const newEntry = document.createElement('div');
    newEntry.classList.add('item');
    newEntry.innerHTML = `
        <span class="year" contenteditable="true">YYYY</span>
        <p contenteditable="true">Degree/Course<br>#Tags<br>Institution</p>
    `;
    educationList.appendChild(newEntry);
    saveEducationToLocalStorage();
}

function addExperience() {
    const experienceList = document.querySelector('.experience-list');
    const newEntry = document.createElement('div');
    newEntry.classList.add('item');
    newEntry.innerHTML = `
        <span class="date" contenteditable="true">Mon. YYYY - Mon. YYYY</span>
        <h4 contenteditable="true">Job Title</h4>
        <p contenteditable="true">Company | Employment Type</p>
        <ul>
            <li contenteditable="true">Responsibility 1</li>
            <li contenteditable="true">Responsibility 2</li>
        </ul>
    `;
    experienceList.appendChild(newEntry);
    saveExperienceToLocalStorage();
}

function addLanguage() {
    const languageList = document.querySelector('.language-list');
    const newEntry = document.createElement('span');
    newEntry.setAttribute('contenteditable', 'true');
    newEntry.innerText = 'New Language';
    languageList.appendChild(newEntry);
    saveLanguagesToLocalStorage();
}

function addTool() {
    const toolsList = document.querySelector('.tools-list');
    const newEntry = document.createElement('span');
    newEntry.setAttribute('contenteditable', 'true');
    newEntry.innerText = 'New Tool';
    toolsList.appendChild(newEntry);
    saveToolsToLocalStorage();
}

function addNoCodeTool() {
    const noCodeToolsList = document.querySelector('.no-code-tools-list');
    const newEntry = document.createElement('span');
    newEntry.setAttribute('contenteditable', 'true');
    newEntry.innerText = 'New No-Code Tool';
    noCodeToolsList.appendChild(newEntry);
    saveNoCodeToolsToLocalStorage();
}

function addInterest() {
    const interestTags = document.querySelector('.interest-tags');
    const newEntry = document.createElement('span');
    newEntry.setAttribute('contenteditable', 'true');
    newEntry.innerText = 'new interest';
    interestTags.appendChild(newEntry);
    saveInterestsToLocalStorage();
}

function saveEducationToLocalStorage() {
    const educationList = document.querySelector('.education-list');
    const entries = Array.from(educationList.children).map(entry => ({
        year: entry.querySelector('.year').innerText,
        description: entry.querySelector('p').innerText
    }));
    localStorage.setItem('education', JSON.stringify(entries));
}

function saveExperienceToLocalStorage() {
    const experienceList = document.querySelector('.experience-list');
    const entries = Array.from(experienceList.children).map(entry => ({
        date: entry.querySelector('.date').innerText,
        title: entry.querySelector('h4').innerText,
        company: entry.querySelector('p').innerText,
        responsibilities: Array.from(entry.querySelectorAll('li')).map(li => li.innerText)
    }));
    localStorage.setItem('experience', JSON.stringify(entries));
}

function saveLanguagesToLocalStorage() {
    const languageList = document.querySelector('.language-list');
    const entries = Array.from(languageList.children).map(entry => ({
        language: entry.innerText
    }));
    localStorage.setItem('languages', JSON.stringify(entries));
}

function saveToolsToLocalStorage() {
    const toolsList = document.querySelector('.tools-list');
    const entries = Array.from(toolsList.children).map(entry => ({
        name: entry.innerText
    }));
    localStorage.setItem('tools', JSON.stringify(entries));
}

function saveNoCodeToolsToLocalStorage() {
    const noCodeToolsList = document.querySelector('.no-code-tools-list');
    const entries = Array.from(noCodeToolsList.children).map(entry => ({
        name: entry.innerText
    }));
    localStorage.setItem('no-code-tools', JSON.stringify(entries));
}

function saveInterestsToLocalStorage() {
    const interestTags = document.querySelector('.interest-tags');
    const entries = Array.from(interestTags.children).map(entry => ({
        interest: entry.innerText
    }));
    localStorage.setItem('interests', JSON.stringify(entries));
}

window.addEventListener('load', function() {
    const savedImage = localStorage.getItem('profile-pic');
    if (savedImage) {
        document.getElementById('profile-pic').src = savedImage;
    }

    const savedEducation = JSON.parse(localStorage.getItem('education') || '[]');
    if (savedEducation.length > 0) {
        const educationList = document.querySelector('.education-list');
        educationList.innerHTML = '';
        savedEducation.forEach(entry => {
            const newEntry = document.createElement('div');
            newEntry.classList.add('item');
            newEntry.innerHTML = `
                <span class="year" contenteditable="true">${entry.year}</span>
                <p contenteditable="true">${entry.description}</p>
            `;
            educationList.appendChild(newEntry);
        });
    }

    const savedExperience = JSON.parse(localStorage.getItem('experience') || '[]');
    if (savedExperience.length > 0) {
        const experienceList = document.querySelector('.experience-list');
        experienceList.innerHTML = '';
        savedExperience.forEach(entry => {
            const newEntry = document.createElement('div');
            newEntry.classList.add('item');
            newEntry.innerHTML = `
                <span class="date" contenteditable="true">${entry.date}</span>
                <h4 contenteditable="true">${entry.title}</h4>
                <p contenteditable="true">${entry.company}</p>
                <ul>
                    ${entry.responsibilities.map(resp => `<li contenteditable="true">${resp}</li>`).join('')}
                </ul>
            `;
            experienceList.appendChild(newEntry);
        });
    }

    const savedLanguages = JSON.parse(localStorage.getItem('languages') || '[]');
    if (savedLanguages.length > 0) {
        const languageList = document.querySelector('.language-list');
        languageList.innerHTML = '';
        savedLanguages.forEach(entry => {
            const newEntry = document.createElement('span');
            newEntry.setAttribute('contenteditable', 'true');
            newEntry.innerText = entry.language;
            languageList.appendChild(newEntry);
        });
    }

    const savedTools = JSON.parse(localStorage.getItem('tools') || '[]');
    if (savedTools.length > 0) {
        const toolsList = document.querySelector('.tools-list');
        toolsList.innerHTML = '';
        savedTools.forEach(entry => {
            const newEntry = document.createElement('span');
            newEntry.setAttribute('contenteditable', 'true');
            newEntry.innerText = entry.name;
            toolsList.appendChild(newEntry);
        });
    }

    const savedNoCodeTools = JSON.parse(localStorage.getItem('no-code-tools') || '[]');
    if (savedNoCodeTools.length > 0) {
        const noCodeToolsList = document.querySelector('.no-code-tools-list');
        noCodeToolsList.innerHTML = '';
        savedNoCodeTools.forEach(entry => {
            const newEntry = document.createElement('span');
            newEntry.setAttribute('contenteditable', 'true');
            newEntry.innerText = entry.name;
            noCodeToolsList.appendChild(newEntry);
        });
    }

    const savedInterests = JSON.parse(localStorage.getItem('interests') || '[]');
    if (savedInterests.length > 0) {
        const interestTags = document.querySelector('.interest-tags');
        interestTags.innerHTML = '';
        savedInterests.forEach(entry => {
            const newEntry = document.createElement('span');
            newEntry.setAttribute('contenteditable', 'true');
            newEntry.innerText = entry.interest;
            interestTags.appendChild(newEntry);
        });
    }
});

document.querySelectorAll('[contenteditable="true"]').forEach(element => {
    element.addEventListener('input', () => {
        if (element.closest('.education-list')) saveEducationToLocalStorage();
        if (element.closest('.experience-list')) saveExperienceToLocalStorage();
        if (element.closest('.language-list')) saveLanguagesToLocalStorage();
        if (element.closest('.tools-list')) saveToolsToLocalStorage();
        if (element.closest('.no-code-tools-list')) saveNoCodeToolsToLocalStorage();
        if (element.closest('.interest-tags')) saveInterestsToLocalStorage();
        if (element.closest('.profile-info')) {
            const key = element.tagName === 'H1' ? 'profile-name' : 'profile-title';
            localStorage.setItem(key, element.innerText);
        }
        if (element.closest('.contact')) {
            const key = element.tagName === 'H2' ? 'contact-header' : 'contact-info';
            localStorage.setItem(key, element.innerText);
        }
    });
});

window.addEventListener('load', function() {
    const profileName = localStorage.getItem('profile-name');
    const profileTitle = localStorage.getItem('profile-title');
    const contactHeader = localStorage.getItem('contact-header');
    const contactInfo = localStorage.getItem('contact-info');

    if (profileName) document.querySelector('.profile-info h1').innerText = profileName;
    if (profileTitle) document.querySelector('.profile-info p').innerText = profileTitle;
    if (contactHeader) document.querySelector('.contact h2').innerText = contactHeader;
    if (contactInfo) document.querySelector('.contact p').innerText = contactInfo;
});

document.querySelectorAll('[contenteditable="true"], .section, .download-btn, .profile-image-container, .add-btn').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
        ripple.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

document.querySelector('.download-btn').addEventListener('click', () => {
    const element = document.querySelector('.resume-container');
    
    const clone = element.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.background = '#f5f5f5';
    clone.style.width = '800px';
    document.body.appendChild(clone);

    clone.querySelectorAll('.hide-on-export').forEach(btn => btn.remove());

    const profilePic = clone.querySelector('#profile-pic');
    const img = new Image();
    img.src = profilePic.src;

    const generatePDF = () => {
        html2canvas(clone, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#f5f5f5',
            logging: true,
            width: 800,
            windowWidth: 800,
            onclone: (clonedDoc) => {
                clonedDoc.querySelector('.resume-container').style.background = '#f5f5f5';
            }
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter'
            });

            const imgWidth = 8.0;
            const pageHeight = 11.0;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const margin = 0.3;
            const x = margin;
            const y = margin;

            if (imgHeight > pageHeight - 2 * margin) {
                const scale = (pageHeight - 2 * margin) / imgHeight;
                pdf.addImage(imgData, 'JPEG', x, y, imgWidth * scale, imgHeight * scale);
            } else {
                pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
            }

            pdf.save('Resume.pdf');

            document.body.removeChild(clone);
        }).catch(error => {
            console.error('Error generating PDF:', error);
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter'
            });
            pdf.setFontSize(12);
            pdf.text('Error: Unable to render resume. Please try again.', 0.5, 0.5);
            pdf.save('Resume.pdf');
            document.body.removeChild(clone);
        });
    };

    img.onload = () => {
        profilePic.src = img.src;
        setTimeout(generatePDF, 2000);
    };

    img.onerror = () => {
        console.error('Failed to load profile image, using fallback.');
        profilePic.src = 'https://via.placeholder.com/80';
        setTimeout(generatePDF, 2000);
    };
});
