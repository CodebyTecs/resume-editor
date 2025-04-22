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
}

function addLanguage() {
    const languageList = document.querySelector('.language-list');
    const newEntry = document.createElement('span');
    newEntry.setAttribute('contenteditable', 'true');
    newEntry.innerText = 'New Language';
    languageList.appendChild(newEntry);
}

function addTool() {
    const toolsList = document.querySelector('.tools-list');
    const newEntry = document.createElement('span');
    newEntry.setAttribute('contenteditable', 'true');
    newEntry.innerText = 'New Tool';
    toolsList.appendChild(newEntry);
}

function addNoCodeTool() {
    const noCodeToolsList = document.querySelector('.no-code-tools-list');
    const newEntry = document.createElement('span');
    newEntry.setAttribute('contenteditable', 'true');
    newEntry.innerText = 'New No-Code Tool';
    noCodeToolsList.appendChild(newEntry);
}

function addInterest() {
    const interestTags = document.querySelector('.interest-tags');
    const newEntry = document.createElement('span');
    newEntry.setAttribute('contenteditable', 'true');
    newEntry.innerText = 'new interest';
    interestTags.appendChild(newEntry);
}

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