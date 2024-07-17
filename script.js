// script.js
document.addEventListener('DOMContentLoaded', () => {
    const showForm = document.getElementById('show-form');
    const showList = document.getElementById('show-list');
    const pagination = document.getElementById('pagination');
    const showDetailContainer = document.getElementById('show-detail-container');
    const showDetail = document.getElementById('show-detail');
    const backButton = document.getElementById('back-button');
    const showsPerPage = 30;
    let currentPage = 1;
    let shows = [];

    // Function to load shows from JSON file (simulated with local storage here)
    function loadShows() {
        fetch('shows.json')
            .then(response => response.json())
            .then(data => {
                shows = data;
                displayShows();
            })
            .catch(() => {
                shows = JSON.parse(localStorage.getItem('shows')) || [];
                displayShows();
            });
    }

    // Function to save shows to JSON file (simulated with local storage here)
    function saveShows() {
        localStorage.setItem('shows', JSON.stringify(shows));
    }

    // Function to display shows with pagination
    function displayShows() {
        showList.innerHTML = '';
        const startIndex = (currentPage - 1) * showsPerPage;
        const endIndex = startIndex + showsPerPage;
        const currentShows = shows.slice(startIndex, endIndex);
        currentShows.forEach(show => {
            addShowToList(show);
        });
        updatePagination();
    }

    // Function to add show details to the list
    function addShowToList(show) {
        const showItem = document.createElement('li');
        showItem.textContent = `Name: ${show.name}, Date Watched: ${show.date}, Time Spent: ${show.time} hours, Times Watched: ${show.timesWatched}`;
        showItem.addEventListener('click', () => {
            showDetailContainer.style.display = 'block';
            document.querySelector('.container').style.display = 'none';
            showDetail.textContent = `Name: ${show.name}\nDate Watched: ${show.date}\nTime Spent: ${show.time} hours\nTimes Watched: ${show.timesWatched}`;
        });
        showList.appendChild(showItem);
    }

    // Function to update pagination
    function updatePagination() {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(shows.length / showsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayShows();
            });
            pagination.appendChild(pageButton);
        }
    }

    // Load shows on page load
    loadShows();

    showForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const timesWatched = document.getElementById('timesWatched').value;

        if (!name || !date || !time || !timesWatched) {
            alert('All fields are required.');
            return;
        }

        const show = {
            name,
            date,
            time,
            timesWatched
        };

        shows.push(show);
        saveShows();
        displayShows();
        showForm.reset();
    });

    backButton.addEventListener('click', () => {
        showDetailContainer.style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    });
});

