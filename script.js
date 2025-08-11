

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard by default
    showSection('dashboard');
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize sample data
    initializeData();
});

// Navigation and section management
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    updateActiveNav(sectionId);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateActiveNav(sectionId) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Event listeners setup
function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Form submissions
    document.getElementById('addStudentForm').addEventListener('submit', addStudent);
    document.getElementById('addTeacherForm').addEventListener('submit', addTeacher);
    document.getElementById('schoolInfoForm').addEventListener('submit', saveSchoolInfo);
    document.getElementById('academicYearForm').addEventListener('submit', saveAcademicYear);
    
    // Search functionality
    document.getElementById('studentSearch').addEventListener('input', searchStudents);
    document.getElementById('teacherSearch').addEventListener('input', searchTeachers);
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Student management
let students = [
    { id: 1001, name: 'Alice Johnson', grade: 10, class: '10A', email: 'alice@email.com', phone: '+1-234-567-8901' },
    { id: 1002, name: 'Bob Williams', grade: 11, class: '11B', email: 'bob@email.com', phone: '+1-234-567-8902' },
    { id: 1003, name: 'Charlie Brown', grade: 10, class: '10A', email: 'charlie@email.com', phone: '+1-234-567-8903' },
    { id: 1004, name: 'Diana Prince', grade: 12, class: '12C', email: 'diana@email.com', phone: '+1-234-567-8904' }
];

function addStudent(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newStudent = {
        id: 1000 + students.length + 1,
        name: e.target.elements[0].value,
        grade: parseInt(e.target.elements[1].value),
        class: e.target.elements[1].value + e.target.elements[2].value,
        email: e.target.elements[3].value,
        phone: e.target.elements[4].value
    };
    
    students.push(newStudent);
    renderStudentsTable();
    closeModal('addStudentModal');
    e.target.reset();
    
    // Show success message
    showNotification('Student added successfully!');
}

function editStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        // In a real app, this would open an edit modal
        alert(`Edit student: ${student.name}`);
    }
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== studentId);
        renderStudentsTable();
        showNotification('Student deleted successfully!');
    }
}

function renderStudentsTable() {
    const tbody = document.getElementById('studentsTable');
    if (!tbody) return;
    
    tbody.innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.class}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn-small" onclick="editStudent(${student.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-danger" onclick="deleteStudent(${student.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function searchStudents(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('studentsTable');
    if (!tbody) return;
    
    tbody.innerHTML = filteredStudents.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.class}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn-small" onclick="editStudent(${student.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-danger" onclick="deleteStudent(${student.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Teacher management
let teachers = [
    { id: 'T001', name: 'Sarah Davis', subject: 'Mathematics', email: 'sarah@school.edu', phone: '+1-234-567-8901' },
    { id: 'T002', name: 'John Smith', subject: 'Science', email: 'john@school.edu', phone: '+1-234-567-8902' },
    { id: 'T003', name: 'Emily Johnson', subject: 'English', email: 'emily@school.edu', phone: '+1-234-567-8903' }
];

function addTeacher(e) {
    e.preventDefault();
    
    const newTeacher = {
        id: `T00${teachers.length + 1}`,
        name: e.target.elements[0].value,
        subject: e.target.elements[1].value,
        email: e.target.elements[2].value,
        phone: e.target.elements[3].value
    };
    
    teachers.push(newTeacher);
    renderTeachersTable();
    closeModal('addTeacherModal');
    e.target.reset();
    
    showNotification('Teacher added successfully!');
}

function editTeacher(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (teacher) {
        alert(`Edit teacher: ${teacher.name}`);
    }
}

function deleteTeacher(teacherId) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        teachers = teachers.filter(t => t.id !== teacherId);
        renderTeachersTable();
        showNotification('Teacher deleted successfully!');
    }
}

function renderTeachersTable() {
    const tbody = document.getElementById('teachersTable');
    if (!tbody) return;
    
    tbody.innerHTML = teachers.map(teacher => `
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.email}</td>
            <td>${teacher.phone}</td>
            <td>
                <button class="btn-small" onclick="editTeacher('${teacher.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-danger" onclick="deleteTeacher('${teacher.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function searchTeachers(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTeachers = teachers.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm) ||
        teacher.subject.toLowerCase().includes(searchTerm) ||
        teacher.email.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('teachersTable');
    if (!tbody) return;
    
    tbody.innerHTML = filteredTeachers.map(teacher => `
        <tr>
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.email}</td>
            <td>${teacher.phone}</td>
            <td>
                <button class="btn-small" onclick="editTeacher('${teacher.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-small btn-danger" onclick="deleteTeacher('${teacher.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Attendance management
function markAttendance() {
    const classSelect = document.getElementById('attendanceClass');
    const dateInput = document.getElementById('attendanceDate');
    
    if (!classSelect.value || !dateInput.value) {
        alert('Please select a class and date');
        return;
    }
    
    const classStudents = students.filter(s => s.class === classSelect.value);
    const attendanceBody = document.getElementById('attendanceBody');
    const attendanceTable = document.getElementById('attendanceTable');
    
    if (!attendanceBody || !attendanceTable) return;
    
    attendanceBody.innerHTML = classStudents.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>
                <select class="attendance-status" data-student-id="${student.id}">
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                </select>
            </td>
        </tr>
    `).join('');
    
    attendanceTable.style.display = 'block';
}

function saveAttendance() {
    const statusElements = document.querySelectorAll('.attendance-status');
    const attendanceData = Array.from(statusElements).map(el => ({
        studentId: el.dataset.studentId,
        status: el.value
    }));
    
    console.log('Saving attendance:', attendanceData);
    showNotification('Attendance saved successfully!');
}

// Grade management
function loadGrades() {
    const classSelect = document.getElementById('gradesClass');
    const subjectSelect = document.getElementById('gradesSubject');
    
    if (!classSelect.value || !subjectSelect.value) {
        alert('Please select a class and subject');
        return;
    }
    
    const classStudents = students.filter(s => s.class === classSelect.value);
    const gradesBody = document.getElementById('gradesBody');
    const gradesTable = document.getElementById('gradesTable');
    
    if (!gradesBody || !gradesTable) return;
    
    gradesBody.innerHTML = classStudents.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>
                <input type="number" class="grade-input" data-student-id="${student.id}" 
                       min="0" max="100" placeholder="Enter grade">
            </td>
        </tr>
    `).join('');
    
    gradesTable.style.display = 'block';
}

function saveGrades() {
    const gradeElements = document.querySelectorAll('.grade-input');
    const gradesData = Array.from(gradeElements).map(el => ({
        studentId: el.dataset.studentId,
        grade: el.value
    }));
    
    console.log('Saving grades:', gradesData);
    showNotification('Grades saved successfully!');
}

// Report generation
function generateReport(type) {
    console.log(`Generating ${type} report...`);
    showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated successfully!`);
}

// Settings management
function saveSchoolInfo(e) {
    e.preventDefault();
    showNotification('School information updated successfully!');
}

function saveAcademicYear(e) {
    e.preventDefault();
    showNotification('Academic year updated successfully!');
}

// Utility functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize data
function initializeData() {
    renderStudentsTable();
    renderTeachersTable();
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

