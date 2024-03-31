const username = 'IgorPono';

const repositoryNames = ['operating-system',  'Comp324Project', 'DiscordBot', 'android-timer',];

const repositoryImages = [
    '/images/profile_picture.jpg',
    '/images/',
    '/images/',
    '/images/'
]

const repositoryDescriptions = [
    'Operating System Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Website Project Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Discord Bot Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Android Timer Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
]

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

    repositoryNames.forEach((repoName, index) => {

        const repo = repositories.find(repo => repo.name === repoName);

        if(repo) {
            const contentRow = document.createElement('section');
            contentRow.classList.add('projects-content-row');

            const repoSection = document.createElement('section');
            repoSection.classList.add('repo-container')

            const repoImage = document.createElement('img');
            repoImage.setAttribute('src', repositoryImages[0]); // Placeholder image
            repoImage.setAttribute('alt', repo.name + ' Image');
            repoImage.setAttribute('width', '100');

            repoSection.appendChild(repoImage);

            const repoDescription = document.createElement('p');
            repoDescription.textContent = repositoryDescriptions[index]; 
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