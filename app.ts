document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeContent = document.getElementById('resume-content') as HTMLDivElement;
    const skillsContainer = document.getElementById('skills-container') as HTMLDivElement;
    let skillCount = 1;

    // Add new skill input field
    const addSkillButton = document.getElementById('add-skill') as HTMLButtonElement;
    addSkillButton.addEventListener('click', () => {
        skillCount++;
        const newSkillInput = document.createElement('div');
        newSkillInput.innerHTML = `
            <label for="skill${skillCount}">Skill ${skillCount}:</label>
            <input type="text" id="skill${skillCount}" name="skills[]">
        `;
        skillsContainer.appendChild(newSkillInput);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        // Gather input values
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const profilePicture = (document.getElementById('profile-picture') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;

        // Collect all skills
        const skillInputs = document.querySelectorAll('input[name="skills[]"]') as NodeListOf<HTMLInputElement>;
        const skillArray = Array.prototype.slice.call(skillInputs) as HTMLInputElement[];
        const skills = skillArray.map(input => input.value.trim()).filter(skill => skill);

        // Validate required fields
        if (!name || !email || !education || !workExperience || !skills.length) {
            alert('Please fill out all required fields.');
            return;
        }

        // Generate resume content
        const resumeHTML = `
           <div class="border"> <header>
                <h1 contenteditable="true">${name}</h1>
                ${profilePicture ? `<img src="${profilePicture}" alt="Profile Picture" class="profile-picture" contenteditable="true">` : ''}
                <p contenteditable="true">Email: ${email}</p>
                <p contenteditable="true">Phone: ${phone}</p>
            </header>

          <ul>
            <section>
                <h2 contenteditable="true">Education</h2>
                <li class="center" contenteditable="true">${education}</li>
            </section>
            <section>
                <h2 contenteditable="true">Work Experience</h2>
                <li  class="center" contenteditable="true">${workExperience}</li>
            </section>
          </ul>
            <section>
                <h2 contenteditable="true">Skills</h2>
                <ul  class="center" id="skills-list">
                    ${skills.map(skill => `<li contenteditable="true">${skill}</li>`).join('')}
                </ul>
                <button class="btn" id="toggle-skills">Hide Skills</button>
            </section>
            </div>
        `;

        // Insert the resume HTML into the resume section
        resumeContent.innerHTML = resumeHTML;

        // Handle toggle skills button functionality
        const toggleSkillsButton = document.getElementById('toggle-skills') as HTMLButtonElement;
        const skillsList = document.getElementById('skills-list') as HTMLUListElement;

        if (toggleSkillsButton && skillsList) {
            toggleSkillsButton.addEventListener('click', () => {
                // Toggle the display property
                if (skillsList.style.display === 'none') {
                    skillsList.style.display = 'block';
                    toggleSkillsButton.textContent = 'Hide Skills';
                } else {
                    skillsList.style.display = 'none';
                    toggleSkillsButton.textContent = 'Show Skills';
                }
            });
        }
    });
});
