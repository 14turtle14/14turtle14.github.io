const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');
const photoContainer = document.getElementById('photo-container');
const preloaderContainer = document.getElementById('preloader-container');

let pastPhotos = JSON.parse(sessionStorage.getItem('pastPhotos')) || [];
let currentIndex = pastPhotos.length - 1;

nextButton.addEventListener('click', showNextPhoto);
backButton.addEventListener('click', showPreviousPhoto);
window.onload = showCurrentPhoto;

window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('pastPhotos', JSON.stringify(pastPhotos));
});

function showNextPhoto() {
    if (currentIndex < pastPhotos.length - 1) {
        currentIndex++;
        displayPhoto(pastPhotos[currentIndex]);
    } else {
        fetchRandomChinesePhotoWithDelay();
    }
}

function showPreviousPhoto() {
    if (currentIndex > 0) {
        currentIndex--;
        displayPhoto(pastPhotos[currentIndex]);
    }
}

function showCurrentPhoto() {
    if (currentIndex >= 0 && currentIndex < pastPhotos.length) {
        displayPhoto(pastPhotos[currentIndex]);
    }
}

async function fetchRandomChinesePhotoWithDelay() {
    photoContainer.innerHTML = '';

    showPreloader();

    try {
        const response = await fetch("https://pixabay.com/api/?key=" + '42344770-f8625a3f1ee300f7e37ff3a39' + "&q=" + encodeURIComponent('chinese culture'));

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.hits.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.hits.length);
            const imageUrl = data.hits[randomIndex].webformatURL;

            setTimeout(() => {
                displayPhoto(imageUrl);
                pastPhotos.push(imageUrl);
                currentIndex = pastPhotos.length - 1;
                sessionStorage.setItem('pastPhotos', JSON.stringify(pastPhotos));
                hidePreloader();
            }, 2000);
        } else {
            throw new Error('No images found');
        }
    } catch (error) {
        console.error('Error fetching random Chinese photo:', error);
    }
}

function showPreloader() {
    preloaderContainer.style.display = 'flex';
}

function hidePreloader() {
    preloaderContainer.style.display = 'none';
}

function displayPhoto(imageUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = 'Chinese photo';
    photoContainer.innerHTML = '';
    photoContainer.appendChild(imageElement);
}

fetchRandomChinesePhotoWithDelay()