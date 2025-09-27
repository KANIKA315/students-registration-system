// ========================================
// SECTION 1: GLOBAL VARIABLES AND SETUP
// ========================================

// 🎯 Main data storage for students
let studentsData = [];
let editingIndex = -1;

// 🎨 DOM Elements - Getting all the important elements
const elements = {
    // Loading and main container
    loadingSpinner: document.getElementById('loadingSpinner'),
    mainContainer: document.getElementById('mainContainer'),
    
    // Form elements
    registrationForm: document.getElementById('registrationForm'),
    studentName: document.getElementById('studentName'),
    studentId: document.getElementById('studentId'),
    emailId: document.getElementById('emailId'),
    contactNumber: document.getElementById('contactNumber'),
    submitBtn: document.getElementById('submitBtn'),
    resetBtn: document.getElementById('resetBtn'),
    
    // Message container
    messageContainer: document.getElementById('messageContainer'),
    
    // Display elements
    studentsTableBody: document.getElementById('studentsTableBody'),
    emptyState: document.getElementById('emptyState'),
    totalStudents: document.getElementById('totalStudents'),
    searchInput: document.getElementById('searchInput'),
    
    // Modal elements
    editModal: document.getElementById('editModal'),
    editForm: document.getElementById('editForm'),
    editIndex: document.getElementById('editIndex'),
    editName: document.getElementById('editName'),
    editId: document.getElementById('editId'),
    editEmail: document.getElementById('editEmail'),
    editContact: document.getElementById('editContact'),
    closeModal: document.getElementById('closeModal'),
    cancelEdit: document.getElementById('cancelEdit'),
    
    // Confirmation modal
    confirmModal: document.getElementById('confirmModal'),
    confirmDelete: document.getElementById('confirmDelete'),
    cancelDelete: document.getElementById('cancelDelete')
};

// 🎭 Animation delays for staggered effects
const animationDelays = {
    headerSection: 800,
    formSection: 1000,
    displaySection: 1200,
    statsContainer: 1500
};

// ========================================
// SECTION 2: PAGE LOADING ANIMATIONS
// ========================================

// 🌟 Beautiful page load sequence
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Student Registration System Loading...');
    
    // Hide loading spinner after 2 seconds with smooth animation
    setTimeout(() => {
        elements.loadingSpinner.classList.add('hidden');
        
        // Start the magical entrance animations
        setTimeout(() => {
            initializeAnimations();
            loadStudentsFromStorage();
            setupEventListeners();
            updateStatistics();
            console.log('✨ System Ready! All animations loaded!');
        }, 600);
    }, 2000);
});

// 🎨 Initialize all entrance animations
function initializeAnimations() {
    // Staggered animation for main sections
    const sections = [
        { element: document.getElementById('headerSection'), delay: 0 },
        { element: document.getElementById('formSection'), delay: 200 },
        { element: document.getElementById('displaySection'), delay: 400 }
    ];
    
    sections.forEach(({ element, delay }) => {
        if (element) {
            setTimeout(() => {
                element.style.animationPlayState = 'running';
            }, delay);
        }
    });
    
    // Add floating particles animation
    createFloatingParticles();
    
    // Initialize typewriter effect for title
    typewriterEffect();
}

// ✨ Create floating particles for magical background
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    // Add more particles dynamically
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ⌨️ Typewriter effect for main title
function typewriterEffect() {
    const title = document.getElementById('mainTitle');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            // Add blinking cursor effect
            title.innerHTML += '<span class="cursor">|</span>';
        }
    }, 100);
}

// ========================================
// SECTION 3: EVENT LISTENERS SETUP
// ========================================

// 🎯 Setup all event listeners with amazing animations
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Form submission with validation and animations
    elements.registrationForm.addEventListener('submit', handleFormSubmit);
    
    // Reset button with confirmation
    elements.resetBtn.addEventListener('click', handleFormReset);
    
    // Real-time input validation with animations
    elements.studentName.addEventListener('input', validateName);
    elements.studentId.addEventListener('input', validateStudentId);
    elements.emailId.addEventListener('input', validateEmail);
    elements.contactNumber.addEventListener('input', validateContact);
    
    // Search functionality with live filtering
    elements.searchInput.addEventListener('input', handleSearch);
    
    // Modal event listeners
    elements.closeModal.addEventListener('click', closeEditModal);
    elements.cancelEdit.addEventListener('click', closeEditModal);
    elements.editForm.addEventListener('submit', handleEditSubmit);
    
    // Confirmation modal listeners
    elements.cancelDelete.addEventListener('click', closeConfirmModal);
    
    // Click outside modal to close
    elements.editModal.addEventListener('click', (e) => {
        if (e.target === elements.editModal) closeEditModal();
    });
    
    elements.confirmModal.addEventListener('click', (e) => {
        if (e.target === elements.confirmModal) closeConfirmModal();
    });
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Add floating label animations
    addFloatingLabelEffects();
    
    console.log('✅ All event listeners ready!');
}

// ========================================
// SECTION 4: FORM VALIDATION WITH ANIMATIONS
// ========================================

// 👤 Validate student name (only letters and spaces)
function validateName() {
    const name = elements.studentName.value.trim();
    const nameError = document.getElementById('nameError');
    const nameRegex = /^[a-zA-Z\s]+$/;
    
    if (name === '') {
        showFieldError(nameError, '');
        return false;
    } else if (!nameRegex.test(name)) {
        showFieldError(nameError, 'Name should contain only letters and spaces');
        shakeInput(elements.studentName);
        return false;
    } else if (name.length < 2) {
        showFieldError(nameError, 'Name should be at least 2 characters long');
        return false;
    } else {
        hideFieldError(nameError);
        glowInput(elements.studentName, 'success');
        return true;
    }
}

// 🆔 Validate student ID (only numbers, unique)
function validateStudentId() {
    const id = elements.studentId.value.trim();
    const idError = document.getElementById('idError');
    const numberRegex = /^\d+$/;
    
    if (id === '') {
        showFieldError(idError, '');
        return false;
    } else if (!numberRegex.test(id)) {
        showFieldError(idError, 'Student ID should contain only numbers');
        shakeInput(elements.studentId);
        return false;
    } else if (id.length < 3) {
        showFieldError(idError, 'Student ID should be at least 3 digits long');
        return false;
    } else {
        // Check if ID already exists (only when adding new student)
        const existingStudent = studentsData.find(student => student.id === id);
        if (existingStudent && editingIndex === -1) {
            showFieldError(idError, 'This Student ID already exists');
            shakeInput(elements.studentId);
            return false;
        } else {
            hideFieldError(idError);
            glowInput(elements.studentId, 'success');
            return true;
        }
    }
}

// 📧 Validate email address with proper format
function validateEmail() {
    const email = elements.emailId.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showFieldError(emailError, '');
        return false;
    } else if (!emailRegex.test(email)) {
        showFieldError(emailError, 'Please enter a valid email address');
        shakeInput(elements.emailId);
        return false;
    } else {
        // Check if email already exists (only when adding new student)
        const existingStudent = studentsData.find(student => student.email === email);
        if (existingStudent && editingIndex === -1) {
            showFieldError(emailError, 'This email address is already registered');
            shakeInput(elements.emailId);
            return false;
        } else {
            hideFieldError(emailError);
            glowInput(elements.emailId, 'success');
            return true;
        }
    }
}

// 📱 Validate contact number (only numbers, minimum 10 digits)
function validateContact() {
    const contact = elements.contactNumber.value.trim();
    const contactError = document.getElementById('contactError');
    const numberRegex = /^\d+$/;
    
    if (contact === '') {
        showFieldError(contactError, '');
        return false;
    } else if (!numberRegex.test(contact)) {
        showFieldError(contactError, 'Contact number should contain only numbers');
        shakeInput(elements.contactNumber);
        return false;
    } else if (contact.length < 10) {
        showFieldError(contactError, 'Contact number should be at least 10 digits long');
        return false;
    } else if (contact.length > 15) {
        showFieldError(contactError, 'Contact number should not exceed 15 digits');
        return false;
    } else {
        hideFieldError(contactError);
        glowInput(elements.contactNumber, 'success');
        return true;
    }
}

// 🎨 Show field error with animation
function showFieldError(errorElement, message) {
    if (errorElement && message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// ✅ Hide field error with animation
function hideFieldError(errorElement) {
    if (errorElement) {
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 300);
    }
}

// 🔥 Shake input animation for errors
function shakeInput(inputElement) {
    inputElement.style.animation = 'shake 0.5s ease';
    inputElement.style.borderColor = 'var(--danger-red)';
    
    setTimeout(() => {
        inputElement.style.animation = '';
        inputElement.style.borderColor = '';
    }, 500);
}

// ✨ Glow input animation for success
function glowInput(inputElement, type = 'success') {
    const color = type === 'success' ? 'var(--success-green)' : 'var(--hot-pink)';
    inputElement.style.borderColor = color;
    inputElement.style.boxShadow = `0 0 10px ${color}40`;
    
    setTimeout(() => {
        inputElement.style.borderColor = '';
        inputElement.style.boxShadow = '';
    }, 2000);
}

// ========================================
// SECTION 5: FORM SUBMISSION HANDLING
// ========================================

// 📝 Handle form submission with validation and animations
function handleFormSubmit(e) {
    e.preventDefault();
    console.log('📝 Form submission started...');
    
    // Show loading state on submit button
    showButtonLoading(elements.submitBtn, true);
    
    // Validate all fields
    const isNameValid = validateName();
    const isIdValid = validateStudentId();
    const isEmailValid = validateEmail();
    const isContactValid = validateContact();
    
    // Check if all validations pass
    if (isNameValid && isIdValid && isEmailValid && isContactValid) {
        // Create student object
        const studentData = {
            name: elements.studentName.value.trim(),
            id: elements.studentId.value.trim(),
            email: elements.emailId.value.trim(),
            contact: elements.contactNumber.value.trim(),
            dateAdded: new Date().toISOString()
        };
        
        // Add student with animation
        setTimeout(() => {
            addStudent(studentData);
            showButtonLoading(elements.submitBtn, false);
        }, 1000);
        
    } else {
        // Show error message
        setTimeout(() => {
            showMessage('Please fix all errors before submitting', 'error');
            showButtonLoading(elements.submitBtn, false);
        }, 500);
    }
}

// 🎯 Add new student to the system
function addStudent(studentData) {
    console.log('➕ Adding new student:', studentData);
    
    // Add to students array
    studentsData.push(studentData);
    
    // Save to localStorage
    saveStudentsToStorage();
    
    // Update display with animation
    renderStudentsTable();
    updateStatistics();
    
    // Show success message
    showMessage(`🎉 Student "${studentData.name}" added successfully!`, 'success');
    
    // Reset form with animation
    resetFormWithAnimation();
    
    // Scroll to the new student row
    setTimeout(() => {
        const tableRows = document.querySelectorAll('#studentsTableBody tr');
        if (tableRows.length > 0) {
            const lastRow = tableRows[tableRows.length - 1];
            lastRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight the new row
            lastRow.style.background = 'linear-gradient(90deg, rgba(255, 20, 147, 0.2), rgba(138, 43, 226, 0.2))';
            setTimeout(() => {
                lastRow.style.background = '';
            }, 3000);
        }
    }, 500);
}

// 🔄 Handle form reset with confirmation
function handleFormReset(e) {
    e.preventDefault();
    
    // Check if form has data
    const hasData = elements.studentName.value || elements.studentId.value || 
                   elements.emailId.value || elements.contactNumber.value;
    
    if (hasData) {
        // Show confirmation with animation
        if (confirm('🤔 Are you sure you want to clear all form data?')) {
            resetFormWithAnimation();
            showMessage('📝 Form cleared successfully!', 'success');
        }
    } else {
        showMessage('📝 Form is already empty!', 'error');
    }
}

// 🎨 Reset form with beautiful animation
function resetFormWithAnimation() {
    // Add fade out animation
    elements.registrationForm.style.opacity = '0.5';
    elements.registrationForm.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        // Clear all form fields
        elements.registrationForm.reset();
        
        // Clear all error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
        
        // Reset form animation
        elements.registrationForm.style.opacity = '1';
        elements.registrationForm.style.transform = 'scale(1)';
        
        // Focus on first input
        elements.studentName.focus();
        
    }, 300);
}

// ========================================
// SECTION 6: DISPLAY AND TABLE MANAGEMENT
// ========================================

// 📊 Render students table with animations
function renderStudentsTable() {
    console.log('📊 Rendering students table...');
    
    const tableBody = elements.studentsTableBody;
    const emptyState = elements.emptyState;
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    if (studentsData.length === 0) {
        // Show empty state with animation
        emptyState.classList.add('show');
        return;
    }
    
    // Hide empty state
    emptyState.classList.remove('show');
    
    // Create table rows with staggered animation
    studentsData.forEach((student, index) => {
        const row = createStudentRow(student, index);
        tableBody.appendChild(row);
        
        // Add staggered animation
        setTimeout(() => {
            row.style.animationDelay = `${index * 0.1}s`;
            row.classList.add('fade-in');
        }, 50);
    });
    
    // Add dynamic scrollbar if needed
    addDynamicScrollbar();
}

// 🏗️ Create individual student row with actions
function createStudentRow(student, index) {
    const row = document.createElement('tr');
    row.className = 'student-row';
    row.style.animationDelay = `${index * 0.1}s`;
    
    row.innerHTML = `
        <td class="student-id">
            <span class="id-badge">${student.id}</span>
        </td>
        <td class="student-name">
            <div class="name-container">
                <i class="fas fa-user-circle"></i>
                <span>${student.name}</span>
            </div>
        </td>
        <td class="student-email">
            <div class="email-container">
                <i class="fas fa-envelope"></i>
                <span>${student.email}</span>
            </div>
        </td>
        <td class="student-contact">
            <div class="contact-container">
                <i class="fas fa-phone"></i>
                <span>${student.contact}</span>
            </div>
        </td>
        <td class="student-actions">
            <div class="action-buttons">
                <button class="edit-btn" onclick="editStudent(${index})" title="Edit Student">
                    <i class="fas fa-edit"></i>
                    <span>Edit</span>
                </button>
                <button class="delete-btn" onclick="confirmDeleteStudent(${index})" title="Delete Student">
                    <i class="fas fa-trash"></i>
                    <span>Delete</span>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// 📈 Update statistics with animation
function updateStatistics() {
    const totalElement = elements.totalStudents;
    const currentTotal = parseInt(totalElement.textContent) || 0;
    const newTotal = studentsData.length;
    
    // Animate number counting
    animateNumber(totalElement, currentTotal, newTotal, 1000);
    
    // Update other statistics if needed
    console.log(`📈 Statistics updated: ${newTotal} total students`);
}

// 🔢 Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (difference * easeOutQuart));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// ========================================
// SECTION 7: SEARCH FUNCTIONALITY
// ========================================

// 🔍 Handle search with live filtering
function handleSearch() {
    const searchTerm = elements.searchInput.value.toLowerCase().trim();
    console.log('🔍 Searching for:', searchTerm);
    
    // Add search animation
    elements.searchInput.style.transform = 'scale(1.02)';
    setTimeout(() => {
        elements.searchInput.style.transform = 'scale(1)';
    }, 200);
    
    if (searchTerm === '') {
        // Show all students
        renderStudentsTable();
        return;
    }
    
    // Filter students based on search term
    const filteredStudents = studentsData.filter(student => {
        return student.name.toLowerCase().includes(searchTerm) ||
               student.id.includes(searchTerm) ||
               student.email.toLowerCase().includes(searchTerm) ||
               student.contact.includes(searchTerm);
    });
    
    // Render filtered results with animation
    renderFilteredResults(filteredStudents, searchTerm);
}

// 🎯 Render filtered search results
function renderFilteredResults(filteredStudents, searchTerm) {
    const tableBody = elements.studentsTableBody;
    const emptyState = elements.emptyState;
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    if (filteredStudents.length === 0) {
        // Show no results message
        emptyState.innerHTML = `
            <div class="empty-icon">
                <i class="fas fa-search"></i>
            </div>
            <h3>No Results Found</h3>
            <p>No students match your search for "<strong>${searchTerm}</strong>"</p>
            <button onclick="clearSearch()" class="clear-search-btn">
                <i class="fas fa-times"></i>
                Clear Search
            </button>
        `;
        emptyState.classList.add('show');
        return;
    }
    
    // Hide empty state
    emptyState.classList.remove('show');
    
    // Create rows for filtered results
    filteredStudents.forEach((student, index) => {
        const originalIndex = studentsData.findIndex(s => s.id === student.id);
        const row = createStudentRow(student, originalIndex);
        
        // Highlight search terms
        highlightSearchTerms(row, searchTerm);
        
        tableBody.appendChild(row);
        
        // Add staggered animation
        setTimeout(() => {
            row.style.animationDelay = `${index * 0.1}s`;
            row.classList.add('slide-up');
        }, 50);
    });
}

// 🎨 Highlight search terms in results
function highlightSearchTerms(row, searchTerm) {
    const textElements = row.querySelectorAll('span');
    
    textElements.forEach(element => {
        const text = element.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        if (regex.test(text)) {
            element.innerHTML = text.replace(regex, '<mark class="highlight">$1</mark>');
        }
    });
}

// 🧹 Clear search function
function clearSearch() {
    elements.searchInput.value = '';
    renderStudentsTable();
    elements.searchInput.focus();
    
    // Add clear animation
    elements.searchInput.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        elements.searchInput.style.animation = '';
    }, 500);
}

// ========================================
// SECTION 8: EDIT FUNCTIONALITY
// ========================================

// ✏️ Edit student with modal animation
function editStudent(index) {
    console.log('✏️ Editing student at index:', index);
    
    editingIndex = index;
    const student = studentsData[index];
    
    // Populate edit form
    elements.editIndex.value = index;
    elements.editName.value = student.name;
    elements.editId.value = student.id;
    elements.editEmail.value = student.email;
    elements.editContact.value = student.contact;
    
    // Show modal with animation
    elements.editModal.classList.add('show');
    
    // Focus on first input
    setTimeout(() => {
        elements.editName.focus();
        elements.editName.select();
    }, 300);
    
    // Add modal entrance animation
    const modalContainer = elements.editModal.querySelector('.modal-container');
    modalContainer.style.animation = 'bounceIn 0.5s ease';
}

// 💾 Handle edit form submission
function handleEditSubmit(e) {
    e.preventDefault();
    console.log('💾 Saving edited student...');
    
    const index = parseInt(elements.editIndex.value);
    const updatedStudent = {
        name: elements.editName.value.trim(),
        id: elements.editId.value.trim(),
        email: elements.editEmail.value.trim(),
        contact: elements.editContact.value.trim(),
        dateAdded: studentsData[index].dateAdded, // Keep original date
        dateModified: new Date().toISOString()
    };
    
    // Validate edited data
    if (validateEditedData(updatedStudent, index)) {
        // Update student data
        studentsData[index] = updatedStudent;
        
        // Save to localStorage
        saveStudentsToStorage();
        
        // Update display
        renderStudentsTable();
        updateStatistics();
        
        // Close modal
        closeEditModal();
        
        // Show success message
        showMessage(`✅ Student "${updatedStudent.name}" updated successfully!`, 'success');
        
        // Highlight updated row
        setTimeout(() => {
            const rows = document.querySelectorAll('#studentsTableBody tr');
            if (rows[index]) {
                rows[index].style.background = 'linear-gradient(90deg, rgba(40, 167, 69, 0.2), rgba(32, 201, 151, 0.2))';
                rows[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                setTimeout(() => {
                    rows[index].style.background = '';
                }, 3000);
            }
        }, 500);
        
        editingIndex = -1;
    }
}

// ✅ Validate edited student data
function validateEditedData(student, currentIndex) {
    let isValid = true;
    
    // Check for empty fields
    if (!student.name || !student.id || !student.email || !student.contact) {
        showMessage('❌ All fields are required!', 'error');
        return false;
    }
    
    // Check for duplicate ID (excluding current student)
    const duplicateId = studentsData.find((s, index) => 
        s.id === student.id && index !== currentIndex
    );
    if (duplicateId) {
        showMessage('❌ Student ID already exists!', 'error');
        return false;
    }
    
    // Check for duplicate email (excluding current student)
    const duplicateEmail = studentsData.find((s, index) => 
        s.email === student.email && index !== currentIndex
    );
    if (duplicateEmail) {
        showMessage('❌ Email address already exists!', 'error');
        return false;
    }
    
    // Validate formats
    const nameRegex = /^[a-zA-Z\s]+$/;
    const numberRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!nameRegex.test(student.name)) {
        showMessage('❌ Name should contain only letters and spaces!', 'error');
        return false;
    }
    
    if (!numberRegex.test(student.id)) {
        showMessage('❌ Student ID should contain only numbers!', 'error');
        return false;
    }
    
    if (!emailRegex.test(student.email)) {
        showMessage('❌ Please enter a valid email address!', 'error');
        return false;
    }
    
    if (!numberRegex.test(student.contact) || student.contact.length < 10) {
        showMessage('❌ Contact number should be at least 10 digits!', 'error');
        return false;
    }
    
    return true;
}

// ❌ Close edit modal with animation
function closeEditModal() {
    const modalContainer = elements.editModal.querySelector('.modal-container');
    modalContainer.style.animation = 'fadeOut 0.3s ease';
    
    setTimeout(() => {
        elements.editModal.classList.remove('show');
        elements.editForm.reset();
        editingIndex = -1;
        modalContainer.style.animation = '';
    }, 300);
}

// ========================================
// SECTION 9: DELETE FUNCTIONALITY
// ========================================

let deleteIndex = -1;

// 🗑️ Confirm delete student
function confirmDeleteStudent(index) {
    console.log('🗑️ Confirming delete for student at index:', index);
    
    deleteIndex = index;
    const student = studentsData[index];
    
    // Update confirmation message
    const confirmModal = elements.confirmModal;
    const modalBody = confirmModal.querySelector('.modal-body p');
    modalBody.innerHTML = `
        Are you sure you want to delete <strong>"${student.name}"</strong>?<br>
        <small class="text-muted">This action cannot be undone.</small>
    `;
    
    // Show confirmation modal
    confirmModal.classList.add('show');
    
    // Setup delete confirmation
    elements.confirmDelete.onclick = () => deleteStudent(deleteIndex);
}

// 💥 Delete student with animation
function deleteStudent(index) {
    console.log('💥 Deleting student at index:', index);
    
    const student = studentsData[index];
    const row = document.querySelectorAll('#studentsTableBody tr')[index];
    
    // Animate row deletion
    if (row) {
        row.style.animation = 'slideOutRight 0.5s ease';
        row.style.background = 'rgba(220, 53, 69, 0.1)';
        
        setTimeout(() => {
            // Remove from data array
            studentsData.splice(index, 1);
            
            // Save to localStorage
            saveStudentsToStorage();
            
            // Update display
            renderStudentsTable();
            updateStatistics();
            
            // Show success message
            showMessage(`🗑️ Student "${student.name}" deleted successfully!`, 'success');
            
        }, 500);
    }
    
    // Close confirmation modal
    closeConfirmModal();
    deleteIndex = -1;
}

// ❌ Close confirmation modal
function closeConfirmModal() {
    elements.confirmModal.classList.remove('show');
    deleteIndex = -1;
}

// ========================================
// SECTION 10: LOCAL STORAGE MANAGEMENT
// ========================================

// 💾 Save students data to localStorage
function saveStudentsToStorage() {
    try {
        localStorage.setItem('studentsData', JSON.stringify(studentsData));
        console.log('💾 Data saved to localStorage successfully');
    } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
        showMessage('⚠️ Error saving data to local storage!', 'error');
    }
}

// 📂 Load students data from localStorage
function loadStudentsFromStorage() {
    try {
        const savedData = localStorage.getItem('studentsData');
        if (savedData) {
            studentsData = JSON.parse(savedData);
            console.log('📂 Loaded', studentsData.length, 'students from localStorage');
            
            // Render loaded data
            renderStudentsTable();
            updateStatistics();
        } else {
            console.log('📂 No saved data found in localStorage');
        }
    } catch (error) {
        console.error('❌ Error loading from localStorage:', error);
        showMessage('⚠️ Error loading saved data!', 'error');
        studentsData = []; // Reset to empty array
    }
}

// 🧹 Clear all data (for testing purposes)
function clearAllData() {
    if (confirm('🚨 Are you sure you want to delete ALL student records? This cannot be undone!')) {
        studentsData = [];
        saveStudentsToStorage();
        renderStudentsTable();
        updateStatistics();
        showMessage('🧹 All data cleared successfully!', 'success');
    }
}

// ========================================
// SECTION 11: MESSAGE SYSTEM
// ========================================

// 💬 Show message with animation
function showMessage(text, type = 'success') {
    const messageContainer = elements.messageContainer;
    
    // Clear existing messages
    messageContainer.innerHTML = '';
    
    // Create message element
    const message = document.createElement('div');
    message.className = `message ${type}`;
    
    // Add appropriate icon
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    message.innerHTML = `
        <i class="${icon}"></i>
        <span>${text}</span>
    `;
    
    // Add to container
    messageContainer.appendChild(message);
    
    // Show with animation
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideMessage(message);
    }, 5000);
}

// 🙈 Hide message with animation
function hideMessage(messageElement) {
    if (messageElement && messageElement.classList.contains('show')) {
        messageElement.classList.remove('show');
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 300);
    }
}

// ========================================
// SECTION 12: ANIMATION UTILITIES
// ========================================

// 🎭 Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.submit-btn, .reset-btn, .edit-btn, .delete-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-ripple') || document.createElement('span');
            ripple.className = 'btn-ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// 🏷️ Add floating label effects
function addFloatingLabelEffects() {
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Add event listeners
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
            
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// 🔄 Show button loading state
function showButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        
        const originalText = button.querySelector('.btn-text').textContent;
        button.querySelector('.btn-text').textContent = 'Processing...';
        button.dataset.originalText = originalText;
        
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        
        if (button.dataset.originalText) {
            button.querySelector('.btn-text').textContent = button.dataset.originalText;
        }
    }
}

// 📏 Add dynamic scrollbar when needed
function addDynamicScrollbar() {
    const tableWrapper = document.querySelector('.table-wrapper');
    const table = document.querySelector('.students-table');
    
    if (tableWrapper && table) {
        // Check if content overflows
        if (table.scrollHeight > tableWrapper.clientHeight) {
            tableWrapper.classList.add('custom-scrollbar');
            console.log('📏 Dynamic scrollbar added');
        } else {
            tableWrapper.classList.remove('custom-scrollbar');
        }
    }
}

// ========================================
// SECTION 13: UTILITY FUNCTIONS
// ========================================

// 🎲 Generate random student data (for testing)
function generateSampleData() {
    const sampleStudents = [
        {
            name: "Alice Johnson",
            id: "12345",
            email: "alice.johnson@email.com",
            contact: "1234567890",
            dateAdded: new Date().toISOString()
        },
        {
            name: "Bob Smith",
            id: "12346",
            email: "bob.smith@email.com",
            contact: "1234567891",
            dateAdded: new Date().toISOString()
        },
        {
            name: "Carol Davis",
            id: "12347",
            email: "carol.davis@email.com",
            contact: "1234567892",
            dateAdded: new Date().toISOString()
        }
    ];
    
    studentsData = [...studentsData, ...sampleStudents];
    saveStudentsToStorage();
    renderStudentsTable();
    updateStatistics();
    showMessage('🎲 Sample data generated successfully!', 'success');
}

// 📊 Export data to CSV
function exportToCSV() {
    if (studentsData.length === 0) {
        showMessage('❌ No data to export!', 'error');
        return;
    }
    
    const headers = ['Student ID', 'Name', 'Email', 'Contact', 'Date Added'];
    const csvContent = [
        headers.join(','),
        ...studentsData.map(student => [
            student.id,
            `"${student.name}"`,
            student.email,
            student.contact,
            new Date(student.dateAdded).toLocaleDateString()
        ].join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `students_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showMessage('📊 Data exported to CSV successfully!', 'success');
}

// 📄 Print student records
function printStudentRecords() {
    if (studentsData.length === 0) {
        showMessage('❌ No data to print!', 'error');
        return;
    }
    
    // Create print window
    const printWindow = window.open('', '_blank');
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Student Records - ${new Date().toLocaleDateString()}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .header h1 { color: #FF1493; margin-bottom: 10px; }
                .header p { color: #666; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #FF1493; color: white; }
                tr:nth-child(even) { background-color: #f9f9f9; }
                .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🎓 Student Registration System</h1>
                <p>Complete Student Records Report</p>
                <p>Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    ${studentsData.map(student => `
                        <tr>
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.email}</td>
                            <td>${student.contact}</td>
                            <td>${new Date(student.dateAdded).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="footer">
                <p>Total Students: ${studentsData.length}</p>
                <p>Student Registration System © ${new Date().getFullYear()}</p>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
    
    showMessage('📄 Print dialog opened successfully!', 'success');
}

// 🔍 Advanced search with filters
function advancedSearch(filters = {}) {
    let filteredData = [...studentsData];
    
    // Apply name filter
    if (filters.name) {
        filteredData = filteredData.filter(student => 
            student.name.toLowerCase().includes(filters.name.toLowerCase())
        );
    }
    
    // Apply ID filter
    if (filters.id) {
        filteredData = filteredData.filter(student => 
            student.id.includes(filters.id)
        );
    }
    
    // Apply email filter
    if (filters.email) {
        filteredData = filteredData.filter(student => 
            student.email.toLowerCase().includes(filters.email.toLowerCase())
        );
    }
    
    // Apply date range filter
    if (filters.dateFrom || filters.dateTo) {
        filteredData = filteredData.filter(student => {
            const studentDate = new Date(student.dateAdded);
            const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : new Date('1900-01-01');
            const toDate = filters.dateTo ? new Date(filters.dateTo) : new Date();
            
            return studentDate >= fromDate && studentDate <= toDate;
        });
    }
    
    return filteredData;
}

// 📊 Get statistics about students
function getStudentStatistics() {
    const stats = {
        total: studentsData.length,
        recentlyAdded: 0,
        emailDomains: {},
        contactAreaCodes: {},
        averageIdLength: 0,
        longestName: '',
        shortestName: ''
    };
    
    if (studentsData.length === 0) return stats;
    
    // Calculate recent additions (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    stats.recentlyAdded = studentsData.filter(student => 
        new Date(student.dateAdded) > weekAgo
    ).length;
    
    // Analyze email domains
    studentsData.forEach(student => {
        const domain = student.email.split('@')[1];
        stats.emailDomains[domain] = (stats.emailDomains[domain] || 0) + 1;
    });
    
    // Analyze contact area codes (first 3 digits)
    studentsData.forEach(student => {
        const areaCode = student.contact.substring(0, 3);
        stats.contactAreaCodes[areaCode] = (stats.contactAreaCodes[areaCode] || 0) + 1;
    });
    
    // Calculate average ID length
    const totalIdLength = studentsData.reduce((sum, student) => sum + student.id.length, 0);
    stats.averageIdLength = (totalIdLength / studentsData.length).toFixed(1);
    
    // Find longest and shortest names
    const names = studentsData.map(student => student.name);
    stats.longestName = names.reduce((a, b) => a.length > b.length ? a : b, '');
    stats.shortestName = names.reduce((a, b) => a.length < b.length ? a : b, names[0] || '');
    
    return stats;
}

// 🔄 Sort students by different criteria
function sortStudents(criteria = 'name', order = 'asc') {
    const sortedData = [...studentsData].sort((a, b) => {
        let valueA, valueB;
        
        switch (criteria) {
            case 'name':
                valueA = a.name.toLowerCase();
                valueB = b.name.toLowerCase();
                break;
            case 'id':
                valueA = parseInt(a.id);
                valueB = parseInt(b.id);
                break;
            case 'email':
                valueA = a.email.toLowerCase();
                valueB = b.email.toLowerCase();
                break;
            case 'contact':
                valueA = a.contact;
                valueB = b.contact;
                break;
            case 'date':
                valueA = new Date(a.dateAdded);
                valueB = new Date(b.dateAdded);
                break;
            default:
                valueA = a.name.toLowerCase();
                valueB = b.name.toLowerCase();
        }
        
        if (order === 'desc') {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        } else {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        }
    });
    
    // Update display with sorted data
    const originalData = [...studentsData];
    studentsData = sortedData;
    renderStudentsTable();
    
    // Show sort message
    showMessage(`📊 Students sorted by ${criteria} (${order}ending)`, 'success');
    
    // Restore original data after 5 seconds
    setTimeout(() => {
        studentsData = originalData;
        renderStudentsTable();
    }, 5000);
}

// 🎯 Validate all student data integrity
function validateDataIntegrity() {
    const issues = [];
    const duplicateIds = [];
    const duplicateEmails = [];
    const invalidEmails = [];
    const invalidContacts = [];
    const invalidNames = [];
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const numberRegex = /^\d+$/;
    
    studentsData.forEach((student, index) => {
        // Check for duplicate IDs
        const idDuplicates = studentsData.filter((s, i) => s.id === student.id && i !== index);
        if (idDuplicates.length > 0) {
            duplicateIds.push(`Student ID ${student.id} (${student.name})`);
        }
        
        // Check for duplicate emails
        const emailDuplicates = studentsData.filter((s, i) => s.email === student.email && i !== index);
        if (emailDuplicates.length > 0) {
            duplicateEmails.push(`Email ${student.email} (${student.name})`);
        }
        
        // Validate email format
        if (!emailRegex.test(student.email)) {
            invalidEmails.push(`${student.name}: ${student.email}`);
        }
        
        // Validate contact format
        if (!numberRegex.test(student.contact) || student.contact.length < 10) {
            invalidContacts.push(`${student.name}: ${student.contact}`);
        }
        
        // Validate name format
        if (!nameRegex.test(student.name)) {
            invalidNames.push(`${student.name}: Contains invalid characters`);
        }
    });
    
    // Compile issues
    if (duplicateIds.length > 0) issues.push(`Duplicate IDs: ${duplicateIds.join(', ')}`);
    if (duplicateEmails.length > 0) issues.push(`Duplicate Emails: ${duplicateEmails.join(', ')}`);
    if (invalidEmails.length > 0) issues.push(`Invalid Emails: ${invalidEmails.join(', ')}`);
    if (invalidContacts.length > 0) issues.push(`Invalid Contacts: ${invalidContacts.join(', ')}`);
    if (invalidNames.length > 0) issues.push(`Invalid Names: ${invalidNames.join(', ')}`);
    
    if (issues.length === 0) {
        showMessage('✅ Data integrity check passed! All records are valid.', 'success');
    } else {
        console.warn('Data integrity issues found:', issues);
        showMessage(`⚠️ Found ${issues.length} data integrity issues. Check console for details.`, 'error');
    }
    
    return {
        isValid: issues.length === 0,
        issues: issues,
        totalRecords: studentsData.length
    };
}

// 🔧 Repair data issues automatically
function repairDataIssues() {
    let repairCount = 0;
    const repairedData = [];
    const seenIds = new Set();
    const seenEmails = new Set();
    
    studentsData.forEach((student, index) => {
        const repairedStudent = { ...student };
        let wasRepaired = false;
        
        // Fix duplicate IDs by appending index
        if (seenIds.has(student.id)) {
            repairedStudent.id = student.id + '_' + index;
            wasRepaired = true;
        }
        seenIds.add(repairedStudent.id);
        
        // Fix duplicate emails by appending number
        if (seenEmails.has(student.email)) {
            const emailParts = student.email.split('@');
            repairedStudent.email = emailParts[0] + '_' + index + '@' + emailParts[1];
            wasRepaired = true;
        }
        seenEmails.add(repairedStudent.email);
        
        // Fix invalid names (remove non-letter characters except spaces)
        const cleanName = student.name.replace(/[^a-zA-Z\s]/g, '').trim();
        if (cleanName !== student.name) {
            repairedStudent.name = cleanName || 'Unknown Student';
            wasRepaired = true;
        }
        
        // Fix invalid contacts (keep only numbers, pad if too short)
        const cleanContact = student.contact.replace(/\D/g, '');
        if (cleanContact.length < 10) {
            repairedStudent.contact = cleanContact.padEnd(10, '0');
            wasRepaired = true;
        } else {
            repairedStudent.contact = cleanContact;
        }
        
        if (wasRepaired) {
            repairCount++;
            repairedStudent.dateModified = new Date().toISOString();
        }
        
        repairedData.push(repairedStudent);
    });
    
    if (repairCount > 0) {
        studentsData = repairedData;
        saveStudentsToStorage();
        renderStudentsTable();
        showMessage(`🔧 Repaired ${repairCount} data issues successfully!`, 'success');
    } else {
        showMessage('✅ No data issues found to repair!', 'success');
    }
    
    return repairCount;
}

// 📱 Check if device is mobile
function isMobileDevice() {
    return window.innerWidth <= 640 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 🎨 Toggle theme (if implemented)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    showMessage(`🎨 Switched to ${newTheme} theme!`, 'success');
}

// 🔄 Backup data to file
function backupData() {
    if (studentsData.length === 0) {
        showMessage('❌ No data to backup!', 'error');
        return;
    }
    
    const backupData = {
        students: studentsData,
        backupDate: new Date().toISOString(),
        version: '1.0',
        totalRecords: studentsData.length
    };
    
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `student_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showMessage('💾 Data backup created successfully!', 'success');
}

// 📂 Restore data from backup file
function restoreData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const backupData = JSON.parse(e.target.result);
                
                if (backupData.students && Array.isArray(backupData.students)) {
                    if (confirm(`🔄 This will replace all current data with ${backupData.totalRecords} records from backup. Continue?`)) {
                        studentsData = backupData.students;
                        saveStudentsToStorage();
                        renderStudentsTable();
                        updateStatistics();
                        showMessage(`📂 Successfully restored ${backupData.totalRecords} student records!`, 'success');
                    }
                } else {
                    showMessage('❌ Invalid backup file format!', 'error');
                }
            } catch (error) {
                console.error('Error parsing backup file:', error);
                showMessage('❌ Error reading backup file!', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ========================================
// SECTION 14: KEYBOARD SHORTCUTS
// ========================================

// ⌨️ Setup keyboard shortcuts for power users
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + N: Focus on name input (New student)
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            elements.studentName.focus();
            showMessage('⌨️ Quick shortcut: New student form focused!', 'success');
        }
        
        // Ctrl/Cmd + S: Submit form (Save)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (document.activeElement.closest('.registration-form')) {
                elements.registrationForm.dispatchEvent(new Event('submit'));
            }
        }
        
        // Ctrl/Cmd + F: Focus on search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            elements.searchInput.focus();
            elements.searchInput.select();
            showMessage('⌨️ Quick shortcut: Search focused!', 'success');
        }
        
        // Ctrl/Cmd + R: Reset form
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            if (confirm('🔄 Reset the form?')) {
                resetFormWithAnimation();
            }
        }
        
        // Escape: Close modals
        if (e.key === 'Escape') {
            if (elements.editModal.classList.contains('show')) {
                closeEditModal();
            }
            if (elements.confirmModal.classList.contains('show')) {
                closeConfirmModal();
            }
        }
        
        // Ctrl/Cmd + E: Export data
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            exportToCSV();
        }
        
        // Ctrl/Cmd + P: Print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            printStudentRecords();
        }
    });
    
    console.log('⌨️ Keyboard shortcuts enabled!');
}

// ========================================
// SECTION 15: PERFORMANCE OPTIMIZATION
// ========================================

// 🚀 Debounce function for search optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 🎯 Optimized search with debouncing
const optimizedSearch = debounce(handleSearch, 300);

// 📊 Lazy loading for large datasets
function lazyLoadStudents(startIndex = 0, batchSize = 50) {
    const endIndex = Math.min(startIndex + batchSize, studentsData.length);
    const batch = studentsData.slice(startIndex, endIndex);
    
    batch.forEach((student, index) => {
        const globalIndex = startIndex + index;
        const row = createStudentRow(student, globalIndex);
        elements.studentsTableBody.appendChild(row);
        
        // Staggered animation
        setTimeout(() => {
            row.classList.add('fade-in');
        }, index * 50);
    });
    
    // Load next batch if there are more students
    if (endIndex < studentsData.length) {
        setTimeout(() => {
            lazyLoadStudents(endIndex, batchSize);
        }, 100);
    }
}

// 🔄 Virtual scrolling for very large datasets
function setupVirtualScrolling() {
    const tableWrapper = document.querySelector('.table-wrapper');
    if (!tableWrapper) return;
    
    let isScrolling = false;
    
    tableWrapper.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollTop = tableWrapper.scrollTop;
                const scrollHeight = tableWrapper.scrollHeight;
                const clientHeight = tableWrapper.clientHeight;
                
                // Load more data when near bottom
                if (scrollTop + clientHeight >= scrollHeight - 100) {
                    // Implement pagination or lazy loading here
                    console.log('📊 Near bottom - could load more data');
                }
                
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    });
}

// ========================================
// SECTION 16: ERROR HANDLING & LOGGING
// ========================================

// 🚨 Global error handler
window.addEventListener('error', function(e) {
    console.error('🚨 Global error caught:', e.error);
    showMessage('⚠️ An unexpected error occurred. Please refresh the page.', 'error');
});

// 📝 Enhanced logging system
const Logger = {
    info: (message, data = null) => {
        console.log(`ℹ️ [INFO] ${message}`, data || '');
    },
    
    warn: (message, data = null) => {
        console.warn(`⚠️ [WARN] ${message}`, data || '');
    },
    
    error: (message, error = null) => {
        console.error(`🚨 [ERROR] ${message}`, error || '');
    },
    
    success: (message, data = null) => {
        console.log(`✅ [SUCCESS] ${message}`, data || '');
    }
};

// 🔍 Performance monitoring
function monitorPerformance() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        Logger.info(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        if (loadTime > 3000) {
            Logger.warn('Page load time is slow', `${loadTime.toFixed(2)}ms`);
        }
    });
    
    // Monitor memory usage (if available)
    if (performance.memory) {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
            const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
            
            if (usedMB > 50) { // Alert if using more than 50MB
                Logger.warn(`High memory usage: ${usedMB}MB / ${totalMB}MB`);
            }
        }, 30000); // Check every 30 seconds
    }
}

// ========================================
// SECTION 17: ACCESSIBILITY FEATURES
// ========================================

// ♿ Setup accessibility features
function setupAccessibility() {
    // Add ARIA labels dynamically
    elements.searchInput.setAttribute('aria-label', 'Search students by name, ID, email, or contact');
    elements.studentsTable.setAttribute('aria-label', 'Students data table');
    
    // Add keyboard navigation for table
    const tableRows = document.querySelectorAll('#studentsTableBody tr');
    tableRows.forEach((row, index) => {
        row.setAttribute('tabindex', '0');
        row.setAttribute('role', 'row');
        
        row.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Focus on first action button
                const editBtn = row.querySelector('.edit-btn');
                if (editBtn) editBtn.focus();
            }
        });
    });
    
    // Announce changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    
    // Function to announce changes
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
    
    Logger.info('♿ Accessibility features enabled');
}

// ========================================
// SECTION 18: FINAL INITIALIZATION
// ========================================

// 🎉 Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Setup accessibility
    setupAccessibility();
    
    // Setup performance monitoring
    monitorPerformance();
    
    // Setup virtual scrolling for large datasets
    setupVirtualScrolling();
    
    // Replace search input event with optimized version
    elements.searchInput.removeEventListener('input', handleSearch);
    elements.searchInput.addEventListener('input', optimizedSearch);
    
    Logger.success('🎉 Student Registration System fully initialized!');
    Logger.info('Available keyboard shortcuts:', {
        'Ctrl+N': 'New student (focus name field)',
        'Ctrl+S': 'Save form',
        'Ctrl+F': 'Focus search',
        'Ctrl+R': 'Reset form',
        'Ctrl+E': 'Export to CSV',
        'Ctrl+P': 'Print records',
        'Escape': 'Close modals'
    });
});

// 🌟 Console welcome message
console.log(`
🎓✨ STUDENT REGISTRATION SYSTEM ✨🎓
═══════════════════════════════════════
🎨 Beautiful animations and transitions
📱 Fully responsive design
💾 Local storage persistence
🔍 Advanced search functionality
⌨️ Keyboard shortcuts enabled
♿ Accessibility features included
🚀 Performance optimized
═══════════════════════════════════════
Ready to manage students with style! 🌈
`);

// ========================================
// END OF JAVASCRIPT - SYSTEM READY! 🚀
// ========================================


