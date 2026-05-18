// ==========================================
// 1. PRELOADER UI HANDLING LOGIC
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('opacity-0');
        preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
    }
});

// ==========================================
// 2. MOBILE LAYOUT DROPDOWN CONTROL LOGIC
// ==========================================
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

if (menuBtn && mobileMenu && menuIcon) {
    menuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuIcon.className = isHidden 
            ? 'fa-solid fa-bars text-2xl transition-transform' 
            : 'fa-solid fa-xmark text-2xl transition-transform';
    });
}

// ==========================================
// 3. ADMISSION FORM SUBMISSION LOGIC (FIXED)
// ==========================================

// ==========================================
// 4. MOCK DATABASE RECORD ARRAYS (NAME, ROLL NO & CLASS MATCHING)
// ==========================================

const mockResultDatabase = {};

// 25 असली भारतीय नामों की लिस्ट
const studentNamesList = [
    "Aarav Sharma", "Ananya Verma", "Vihaan Gupta", "Diya Iyer", 
    "Kabir Malhotra", "Anika Joshi", "Reyansh Singh", "Ishani Choudhury", 
    "Arjun Reddy", "Meera Nair", "Sai Prasad", "Riya Saxena", 
    "Vivaan Banerjee", "Kavya Tripathi", "Aditya Mishra", "Aadhya Rao", 
    "Krishna Kumar", "Sana Khan", "Aryan Patel", "Tanvi Bhat", 
    "Rohan Deshmukh", "Sneha Kulkarni", "Devansh Joshi", "Prisha Shah", 
    "Ishaan Kapoor"
];

const classSubjects = {
    "NURSERY": ["English Oral & Rhymes", "Maths Numbers (1-20)", "Hindi Oral", "Drawing & Coloring", "General Awareness"],
    "LKG": ["English Written & Oral", "Mathematics (1-50)", "Hindi Alphabet", "Rhymes & Conversation", "Drawing & Craft"],
    "UKG": ["English Literacy & Phonics", "Mathematics (1-100)", "Hindi Language Basics", "EVS (Our Environment)", "Art & Creativity"],
    1: ["English Literacy", "Mathematics Analytics", "EVS Discovery", "Hindi Language", "General Knowledge"],
    2: ["English Literacy", "Mathematics Analytics", "EVS Discovery", "Hindi Language", "General Knowledge"],
    3: ["English Literacy", "Mathematics Analytics", "Science & Discovery", "Social Studies", "Hindi Language", "Computer Basics"],
    4: ["English Literacy", "Mathematics Analytics", "Science & Discovery", "Social Studies", "Hindi Language", "Computer Basics"],
    5: ["English Literacy", "Mathematics Analytics", "Science & Discovery", "Social Studies", "Hindi Language", "Computer Basics"],
    6: ["English Literacy", "Mathematics Analytics", "Science & Technology", "Social Science Studies", "Hindi Communication", "Information Technology"],
    7: ["English Literacy", "Mathematics Analytics", "Science & Technology", "Social Science Studies", "Hindi Communication", "Information Technology"],
    8: ["English Literacy", "Mathematics Analytics", "Science & Technology", "Social Science Studies", "Hindi Communication", "Information Technology"],
    9: ["English Advanced", "Mathematics Core", "Physics & Chemistry", "Life Sciences", "Social History & Civics", "Hindi Literature", "Information Technology"],
    10: ["English Advanced", "Mathematics Core", "Physics & Chemistry", "Life Sciences", "Social History & Civics", "Hindi Literature", "Information Technology"]
};

const allClasses = ["NURSERY", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7"];

// लूप चलाकर 13 क्लासेस का डेटा तैयार करना
allClasses.forEach(className => {
    for (let studentNum = 1; studentNum <= 25; studentNum++) {
        
        const databaseKey = `${className}_${studentNum}`;
        const studentRealName = studentNamesList[studentNum - 1]; 
        
        const subjects = classSubjects[className];
        const marksArray = subjects.map(subject => {
            const obtainedMarks = Math.floor(Math.random() * (99 - 70 + 1)) + 70;
            
            let grade = "B";
            if (obtainedMarks >= 95) grade = "A+";
            else if (obtainedMarks >= 90) grade = "A";
            else if (obtainedMarks >= 80) grade = "B+";

            return {
                subject: subject,
                max: 100,
                pass: 33,
                obtained: obtainedMarks,
                grade: grade
            };
        });

        mockResultDatabase[databaseKey] = {
            name: studentRealName, 
            rollNo: studentNum,    
            class: className.includes("KG") || className === "NURSERY" ? className : `Class ${className}`,
            academicYear: "2026-2027",
            marks: marksArray
        };
    }
});


// ==========================================
// 5. SEARCH & POPULATE REPORT CARD SHEETS
// ==========================================
// function handleResultSearch(e) {
//     e.preventDefault();
    
//     const inputName = document.getElementById('searchName')?.value.trim().toLowerCase();
//     const selectedClass = document.getElementById('searchClass')?.value.trim(); 
//     const inputRollNo = document.getElementById('searchRollNo')?.value.trim();  
    
//     const searchKey = `${selectedClass}_${inputRollNo}`;
//     const record = mockResultDatabase[searchKey];

//     if (!record || record.name.toLowerCase() !== inputName) {
//         alert("त्रुटि: छात्र का नाम, क्लास या रोल नंबर सही नहीं है। कृपया दोबारा जाँचें।");
//         document.getElementById('reportCardContainer')?.classList.add('hidden');
//         return;
//     }

//     // -------------------------------------------------------------
//     // लोगो सेट करना: स्क्रीन पर दिखने वाले इमेज टैग में लोगो डालना
//     // -------------------------------------------------------------
//     const screenLogo = document.getElementById('imgReportCardLogo');
//     if (screenLogo) {
//         screenLogo.src = "logo.jpeg";
//         screenLogo.alt = "Symbiosis Logo";
//     }

//     // स्क्रीन पर बाकी डेटा दिखाना
//     document.getElementById('lblStudentName').innerText = record.name;
//     document.getElementById('lblRollNo').innerText = record.rollNo; 
//     document.getElementById('lblClass').innerText = record.class;
    
//     if (document.getElementById('lblAcademicYear')) {
//         document.getElementById('lblAcademicYear').innerText = record.academicYear;
//     }

//     const tbody = document.getElementById('marksTableBody');
//     if (tbody) {
//         let grandTotalMax = 0;
//         let grandTotalObtained = 0;

//         tbody.innerHTML = record.marks.map(item => {
//             grandTotalMax += item.max;
//             grandTotalObtained += item.obtained;
            
//             return `
//                 <tr class="hover:bg-slate-50 transition-colors">
//                     <td class="py-3 px-4 font-bold text-slate-900">${item.subject}</td>
//                     <td class="py-3 px-4 text-center">${item.max}</td>
//                     <td class="py-3 px-4 text-center text-slate-400">${item.pass}</td>
//                     <td class="py-3 px-4 text-center font-bold text-blue-600">${item.obtained}</td>
//                     <td class="py-3 px-4 text-center font-bold ${item.obtained >= 90 ? 'text-emerald-600' : 'text-slate-700'}">${item.grade}</td>
//                 </tr>
//             `;
//         }).join('');

//         const finalPercentage = ((grandTotalObtained / grandTotalMax) * 100).toFixed(1);
//         document.getElementById('lblTotalMarks').innerText = `${grandTotalObtained} / ${grandTotalMax}`;
//         document.getElementById('lblPercentage').innerText = `${finalPercentage}%`;
        
//         let finalOverallGrade = "B";
//         if (finalPercentage >= 95) finalOverallGrade = "A+ (Excellent)";
//         else if (finalPercentage >= 90) finalOverallGrade = "A (Outstanding)";
//         else if (finalPercentage >= 80) finalOverallGrade = "B+ (Very Good)";
        
//         document.getElementById('lblGrade').innerText = finalOverallGrade;
//     }

//     const container = document.getElementById('reportCardContainer');
//     if (container) {
//         container.classList.remove('hidden');
//         container.classList.add('animate-fade-in');
//         container.scrollIntoView({ behavior: 'smooth' });
//     }
// }

// ==========================================
// 5. SEARCH & POPULATE REPORT CARD SHEETS (FIXED & OPTIMIZED)
// ==========================================
function handleResultSearch(e) {
    if (e) e.preventDefault();
    
    const inputName = document.getElementById('searchName')?.value.trim().toLowerCase();
    const selectedClass = document.getElementById('searchClass')?.value.trim(); 
    const inputRollNo = document.getElementById('searchRollNo')?.value.trim();  
    
    const searchKey = `${selectedClass}_${inputRollNo}`;
    const record = mockResultDatabase[searchKey];

    if (!record || record.name.toLowerCase() !== inputName) {
        alert("त्रुटि: छात्र का नाम, क्लास या रोल नंबर सही नहीं है। कृपया दोबारा जाँचें।");
        document.getElementById('reportCardContainer')?.classList.add('hidden');
        return;
    }

    // -------------------------------------------------------------
    // लोगो सेट करना: सभी लोगो इमेज में पाथ डालना
    // -------------------------------------------------------------
    document.querySelectorAll('#imgReportCardLogo').forEach(screenLogo => {
        screenLogo.src = "logo.jpeg";
        screenLogo.alt = "Symbiosis Logo";
    });

    // -------------------------------------------------------------
    // डुप्लिकेट IDs को संभालने के लिए querySelectorAll का उपयोग
    // -------------------------------------------------------------
    document.querySelectorAll('#lblStudentName').forEach(el => el.innerText = record.name);
    document.querySelectorAll('#lblRollNo').forEach(el => el.innerText = record.rollNo); 
    document.querySelectorAll('#lblClass').forEach(el => el.innerText = record.class);
    
    if (document.getElementById('lblAcademicYear')) {
        document.getElementById('lblAcademicYear').innerText = record.academicYear;
    }

    // मार्क्स कैलकुलेशन और टेबल जनरेशन
    let grandTotalMax = 0;
    let grandTotalObtained = 0;

    const tableRowsHTML = record.marks.map(item => {
        grandTotalMax += item.max;
        grandTotalObtained += item.obtained;
        
        return `
            <tr class="hover:bg-slate-50 transition-colors border-b border-slate-200">
                <td class="py-3 px-4 font-bold text-slate-900">${item.subject}</td>
                <td class="py-3 px-4 text-center">${item.max}</td>
                <td class="py-3 px-4 text-center text-slate-400">${item.pass}</td>
                <td class="py-3 px-4 text-center font-bold text-blue-600">${item.obtained}</td>
                <td class="py-3 px-4 text-center font-bold ${item.obtained >= 90 ? 'text-emerald-600' : 'text-slate-700'}">${item.grade}</td>
            </tr>
        `;
    }).join('');

    // सभी मार्क्स टेबल बॉडीज़ में डेटा इंजेक्ट करना
    document.querySelectorAll('#marksTableBody').forEach(tbody => {
        tbody.innerHTML = tableRowsHTML;
    });

    // प्रतिशत और फाइनल ग्रेड का कैलकुलेशन
    const finalPercentage = ((grandTotalObtained / grandTotalMax) * 100).toFixed(1);
    let finalOverallGrade = "B";
    if (finalPercentage >= 95) finalOverallGrade = "A+ (Excellent)";
    else if (finalPercentage >= 90) finalOverallGrade = "A (Outstanding)";
    else if (finalPercentage >= 80) finalOverallGrade = "B+ (Very Good)";
    
    // सभी टोटल, परसेंटेज और ग्रेड लेबल्स को अपडेट करना
    document.querySelectorAll('#lblTotalMarks').forEach(el => {
        el.innerText = el.tagName === 'SPAN' ? `${grandTotalObtained} / ${grandTotalMax}` : `${grandTotalObtained} / ${grandTotalMax}`;
    });
    
    document.querySelectorAll('#lblPercentage').forEach(el => {
        el.innerText = el.tagName === 'SPAN' ? `${finalPercentage}%` : `${finalPercentage} %`;
    });
    
    document.querySelectorAll('#lblGrade').forEach(el => el.innerText = finalOverallGrade);

    // -------------------------------------------------------------
    // कंटेनर को डिस्प्ले कराना और स्मूथ स्क्रॉल करना
    // -------------------------------------------------------------
    const container = document.getElementById('reportCardContainer');
    if (container) {
        container.style.display = 'block'; // अगर inline-style में display: none लगा हो
        container.classList.remove('hidden');
        container.classList.add('animate-fade-in');
        container.scrollIntoView({ behavior: 'smooth' });
    }
}

// ग्लोबल विंडो स्कोप में फंक्शन बाइंड करना ताकि HTML ऑनसबमिट इसे ढूंढ सके
window.handleResultSearch = handleResultSearch;
     





// ==========================================
// 6. CLEAN PRINT PIPELINE (WITH LOGO)
// ==========================================
function downloadReportCard() {
    const printTarget = document.getElementById('printableReportCard');
    if (!printTarget) return;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
            <head>
                <title>Report Card</title>
                <style>
                    body { font-family: sans-serif; padding: 20px; }
                    .print-header { display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #0f172a; padding-bottom: 15px; }
                    .print-logo { width: 80px; height: auto; margin-right: 20px; }
                    .school-details { flex-grow: 1; }
                    .school-name { font-size: 24px; font-weight: bold; color: #0f172a; margin: 0; }
                    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
                    .text-center { text-align: center; }
                </style>
            </head>
            <body>
                <!-- प्रिंट हेडर जिसमें लोगो और स्कूल का नाम साथ में आएगा -->
                <div class="print-header">
                    <img src="logo.jpeg" class="print-logo" alt="Logo">
                    <div class="school-details">
                        <h1 class="school-name">Symbiosis Education Centre</h1>
                    </div>
                </div>
                
                <!-- छात्र का रिजल्ट डेटा -->
                ${printTarget.innerHTML}
            </body>
        </html>
    `);
    doc.close();

    setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        iframe.remove();
    }, 500);
}

// ========================================================
// 7. ROBUST TYPING ANIMATION LOOP LOGIC
// ========================================================
const words = [
    "Symbiosis Education Centre", 
    "An Ideal Place for Education", 
    "A Bright Future for Your Child"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function handleTypingLoop() {
    const typingTarget = document.getElementById("typing-text");
    if (!typingTarget) return;

    const currentWord = words[wordIndex];
    typingTarget.textContent = currentWord.substring(0, charIndex);

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex > currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
        charIndex = currentWord.length;
    } 
    else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(handleTypingLoop, typingSpeed);
}

setTimeout(handleTypingLoop, 1000);

