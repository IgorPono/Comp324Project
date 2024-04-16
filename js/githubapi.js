const username = 'IgorPono';

const repositoryNames = ['operating-system',  'Comp324Project', 'DiscordBot', 'android-timer',];

const repositoryImages = [
    '/images/profile_picture.jpg',
    '/images/',
    '/images/',
    '/images/'
]

const repositoryDescriptions = [
    '32 Bit operating system based on the i386 PC using a combination of C and assembly. Ran using QEMU emulator. OS contains drivers for terminal writing, I/O polling, virtual memory and fat filesystem',
    'Personal resume website written using html/css/javascript. Connects to MongoDB database to store users contact forms as json',
    'Using Discord API, created an automated user that plays back YouTube audio in public void channel. Written in Python. Utilized FFmpeg to process and convert audio',
    'Android Timer app using Java. Worked on to gain experience in coding for phone applications and made using various software enginnering practices such as composite, visitor and state patterns'
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


            const headerLink = document.createElement('a');
            headerLink.classList.add('project-header-link');
            headerLink.setAttribute('href', repo.html_url);
           

            const header = document.createElement('h2');
            header.classList.add('project-header');
            header.textContent = repo.name;

            headerLink.appendChild(header);

            contentRow.appendChild(headerLink);


            const repoSection = document.createElement('section');
            repoSection.classList.add('repo-container')

            /*const repoImage = document.createElement('img');
            repoImage.setAttribute('src', repositoryImages[0]); // Placeholder image
            repoImage.setAttribute('alt', repo.name + ' Image');
            repoImage.setAttribute('width', '100');

            repoSection.appendChild(repoImage);*/

            const repoDescription = document.createElement('p');
            repoDescription.textContent = repositoryDescriptions[index]; 
            repoDescription.classList.add('repo-description'); 
            
            repoSection.appendChild(repoDescription);

            contentRow.appendChild(repoSection);

            /*const repoLink = document.createElement('a');
            repoLink.setAttribute('href', repo.html_url);
            repoLink.textContent = repo.name;

            contentRow.appendChild(repoLink);*/

            projectsContainer.appendChild(contentRow);
           
        }
    });
})
.catch(error => {
    console.error('Error fetching user repositories:', error);
});