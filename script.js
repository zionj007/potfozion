// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminUploadForm = document.getElementById('admin-upload-form');
    const adminLoginLink = document.getElementById('admin-login-link');
    const loginForm = document.getElementById('login-form');
    const uploadForm = document.getElementById('upload-form');
    const projectsContainer = document.querySelector('.projects');
    const projectModal = document.getElementById('project-modal');
    const closeModalButton = document.querySelector('.close-button');

    let isAdmin = false;

    // Toggle admin login form
    adminLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        adminLoginForm.style.display = 'block';
    });

    // Handle admin login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('admin-password').value;
        // Add authentication logic here
        // For demonstration purposes, let's assume the password is 'admin'
        if (password === 'admin') {
            isAdmin = true;
            adminLoginForm.style.display = 'none';
            adminUploadForm.style.display = 'block';
        } else {
            alert('Invalid password. Please try again.');
        }
    });

    // Handle project upload
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            renderProjects(); // Update projects after upload
        })
        .catch(error => console.error('Error:', error));
    });

    // Close project modal
    closeModalButton.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    // Fetch and render projects
    function renderProjects() {
        fetch('/projects')
        .then(response => response.json())
        .then(projects => {
            projectsContainer.innerHTML = '';
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                const projectMedia = document.createElement('img');
                projectMedia.src = project.media;
                projectCard.appendChild(projectMedia);

                const projectTitle = document.createElement('h3');
                projectTitle.textContent = project.title;
                projectCard.appendChild(projectTitle);

                const projectDescription = document.createElement('p');
                projectDescription.textContent = project.description;
                projectCard.appendChild(projectDescription);

                projectsContainer.appendChild(projectCard);

                projectCard.addEventListener('click', () => {
                    document.getElementById('modal-title').textContent = project.title;
                    document.getElementById('modal-description').textContent = project.description;
                    document.getElementById('modal-media').innerHTML = `<img src="${project.media}" alt="${project.title}">`;
                    projectModal.style.display = 'block';
                });
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Initial render of projects
    renderProjects();
});
