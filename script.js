// script.js
document.addEventListener('DOMContentLoaded', () => {
    const showForm = document.getElementById('show-form');
    const showList = document.getElementById('show-list');

    // Function to load shows from local storage
    function loadShows() {
        const shows = JSON.parse(localStorage.getItem('shows')) || [];
        shows.forEach(show => {
            addShowToList(show);
        });
    }

    // Function to add show details to the list and local storage
    function addShowToList(show) {
        const showItem = document.createElement('li');
        showItem.textContent = `Name: ${show.name}, Date Watched: ${show.date}, Time Spent: ${show.time} hours, Times Watched: ${show.timesWatched}`;
        showList.appendChild(showItem);
    }

    // Load shows on page load
    loadShows();

    showForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        let date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const timesWatched = document.getElementById('timesWatched').value;

        if (!date) {
            date = new Date().toISOString().split('T')[0];
        }

        const show = {
            name,
            date,
            time,
            timesWatched
        };

        // Add show to list
        addShowToList(show);

        // Save show to local storage
        const shows = JSON.parse(localStorage.getItem('shows')) || [];
        shows.push(show);
        localStorage.setItem('shows', JSON.stringify(shows));

        showForm.reset();
    });
});
