// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Toggle navigatie menu en hamburger animatie
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Sluit het menu wanneer een link wordt aangeklikt (voor betere UX)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Zoekfunctionaliteit op Verhalen Pagina
    const searchInput = document.getElementById('searchInput');
    if (searchInput) { // Controleer of de zoekbalk bestaat
        const stories = document.querySelectorAll('.stories-list .story');

        searchInput.addEventListener('keyup', () => {
            const filter = searchInput.value.toLowerCase();
            stories.forEach(story => {
                const title = story.querySelector('h3 a').textContent.toLowerCase();
                const summary = story.querySelector('p').textContent.toLowerCase();
                if (title.includes(filter) || summary.includes(filter)) {
                    story.style.display = 'block';
                } else {
                    story.style.display = 'none';
                }
            });
        });
    }

    // Dynamisch laden van recente verhalen op de indexpagina
    const recentStoriesContainer = document.getElementById('recent-stories');
    if (recentStoriesContainer) {
        fetch('stories.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Sorteer verhalen op datum, nieuwste eerst
                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Selecteer de nieuwste 3 verhalen (pas dit aan indien gewenst)
                const recentStories = data.slice(0, 3);

                recentStories.forEach(story => {
                    // Creëer een HTML element voor elk verhaal
                    const storyElement = document.createElement('article');
                    storyElement.classList.add('story');

                    storyElement.innerHTML = `
                        <h3><a href="${story.link}">${story.title}</a></h3>
                        <p>${story.summary}</p>
                        <a href="${story.link}" class="btn">Lees Verhaal</a>
                    `;

                    // Voeg het verhaal toe aan de container
                    recentStoriesContainer.appendChild(storyElement);
                });
            })
            .catch(error => {
                console.error('Error fetching stories:', error);
                recentStoriesContainer.innerHTML = '<p>Er is een fout opgetreden bij het laden van de verhalen.</p>';
            });
    }

    // Zoekfunctionaliteit op Stories Page
    const storiesList = document.querySelector('.stories-list');
    if (storiesList) {
        fetch('stories.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Sorteer verhalen op datum, nieuwste eerst
                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Voeg alle verhalen toe aan de stories-list
                data.forEach(story => {
                    const storyElement = document.createElement('article');
                    storyElement.classList.add('story');

                    storyElement.innerHTML = `
                        <h3><a href="${story.link}">${story.title}</a></h3>
                        <p>${story.summary}</p>
                        <a href="${story.link}" class="btn">Lees Verhaal</a>
                    `;

                    storiesList.appendChild(storyElement);
                });
            })
            .catch(error => {
                console.error('Error fetching stories:', error);
                storiesList.innerHTML = '<p>Er is een fout opgetreden bij het laden van de verhalen.</p>';
            });
    }
});
