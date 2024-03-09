const username = 'IgorPono';

const repositoryNames = ['operating-system',  'Comp324Project', 'DiscordBot', 'android-timer',];

const apiUrl = `https://api.github.com/users/${username}/repos`;

async function fetchUserRepositories() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user repositories');
        }
        const repositories = await response.json();
        return repositories;
    } catch (error) {
        console.error('Error fetching user repositories:', error);
    }
}

fetchUserRepositories()
.then(repositories => {
    const projectsContainer = document.getElementById('projects-container');

    repositoryNames.forEach(repoName => {

        const repo = repositories.find(repo => repo.name === repoName);

        if(repo) {
            const contentRow = document.createElement('section');
            contentRow.classList.add('projects-content-row');

            const repoSection = document.createElement('section');
            repoSection.classList.add('repo-container')

            const repoImage = document.createElement('img');
            repoImage.setAttribute('src', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'); // Placeholder image
            repoImage.setAttribute('alt', repo.name + ' Image');
            repoImage.setAttribute('width', '100');

            repoSection.appendChild(repoImage);

            const repoDescription = document.createElement('p');
            repoDescription.textContent = 'Custom description for ' + repo.name; 
            repoDescription.classList.add('repo-description'); 
            
            repoSection.appendChild(repoDescription);

            contentRow.appendChild(repoSection);

            const repoLink = document.createElement('a');
            repoLink.setAttribute('href', repo.html_url);
            repoLink.textContent = repo.name;

            contentRow.appendChild(repoLink);

            projectsContainer.appendChild(contentRow);
           
        }
    });
})
.catch(error => {
    console.error('Error fetching user repositories:', error);
});