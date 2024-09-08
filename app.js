document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumeContent = document.getElementById('resume-content');
    var skillsContainer = document.getElementById('skills-container');
    var skillCount = 1;
    // Add new skill input field
    var addSkillButton = document.getElementById('add-skill');
    addSkillButton.addEventListener('click', function () {
        skillCount++;
        var newSkillInput = document.createElement('div');
        newSkillInput.innerHTML = "\n            <label for=\"skill".concat(skillCount, "\">Skill ").concat(skillCount, ":</label>\n            <input type=\"text\" id=\"skill").concat(skillCount, "\" name=\"skills[]\">\n        ");
        skillsContainer.appendChild(newSkillInput);
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        // Gather input values
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var profilePicture = document.getElementById('profile-picture').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('work-experience').value;
        // Collect all skills
        var skillInputs = document.querySelectorAll('input[name="skills[]"]');
        var skillArray = Array.prototype.slice.call(skillInputs);
        var skills = skillArray.map(function (input) { return input.value.trim(); }).filter(function (skill) { return skill; });
        // Validate required fields
        if (!name || !email || !education || !workExperience || !skills.length) {
            alert('Please fill out all required fields.');
            return;
        }
        // Generate resume content
        var resumeHTML = "\n           <div class=\"border\"> <header>\n                <h1 contenteditable=\"true\">".concat(name, "</h1>\n                ").concat(profilePicture ? "<img src=\"".concat(profilePicture, "\" alt=\"Profile Picture\" class=\"profile-picture\" contenteditable=\"true\">") : '', "\n                <p contenteditable=\"true\">Email: ").concat(email, "</p>\n                <p contenteditable=\"true\">Phone: ").concat(phone, "</p>\n            </header>\n\n          <ul>\n            <section>\n                <h2 contenteditable=\"true\">Education</h2>\n                <li class=\"center\" contenteditable=\"true\">").concat(education, "</li>\n            </section>\n            <section>\n                <h2 contenteditable=\"true\">Work Experience</h2>\n                <li  class=\"center\" contenteditable=\"true\">").concat(workExperience, "</li>\n            </section>\n          </ul>\n            <section>\n                <h2 contenteditable=\"true\">Skills</h2>\n                <ul  class=\"center\" id=\"skills-list\">\n                    ").concat(skills.map(function (skill) { return "<li contenteditable=\"true\">".concat(skill, "</li>"); }).join(''), "\n                </ul>\n                <button class=\"btn\" id=\"toggle-skills\">Hide Skills</button>\n            </section>\n            </div>\n        ");
        // Insert the resume HTML into the resume section
        resumeContent.innerHTML = resumeHTML;
        // Handle toggle skills button functionality
        var toggleSkillsButton = document.getElementById('toggle-skills');
        var skillsList = document.getElementById('skills-list');
        if (toggleSkillsButton && skillsList) {
            toggleSkillsButton.addEventListener('click', function () {
                // Toggle the display property
                if (skillsList.style.display === 'none') {
                    skillsList.style.display = 'block';
                    toggleSkillsButton.textContent = 'Hide Skills';
                }
                else {
                    skillsList.style.display = 'none';
                    toggleSkillsButton.textContent = 'Show Skills';
                }
            });
        }
    });
});
