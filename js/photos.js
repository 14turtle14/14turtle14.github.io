const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');
const photoContainer = document.getElementById('photo-container');
const preloaderContainer = document.getElementById('preloader-container');

let pastPhotos = JSON.parse(sessionStorage.getItem('pastPhotos')) || [];
let currentIndex = pastPhotos.length - 1;

nextButton.addEventListener('click', showNextPhoto);
backButton.addEventListener('click', showPreviousPhoto);
window.onload = fetchRandomChinesePhoto()

window.addEventListener('unload', saveToLocalStorage);

async function showNextPhoto() {

    if (currentIndex < pastPhotos.length - 1) {
        currentIndex++;
        showCurrentPhoto();
    } else {
        await fetchRandomChinesePhoto()
    }
}

function hidePhoto() {
    photoContainer.style.display = 'none';
}


function showPreviousPhoto() {
    if (currentIndex > 0) {
        currentIndex--;
        showCurrentPhoto();
    }
    else {
        showToast("You reach the beginning of the list")
    }
}

function showCurrentPhoto() {
    photoContainer.style.display = 'flex';
    if (currentIndex >= 0 && currentIndex < pastPhotos.length) {
        displayPhoto(pastPhotos[currentIndex]);
    }
}

async function fetchRandomChinesePhoto() {
    hidePhoto();
    showPreloader();
    try {
        const randomIndex = Math.floor(Math.random() * 100);
        const response = await fetch("https://pixabay.com/api/?key=" + '42344770-f8625a3f1ee300f7e37ff3a39' + "&q=" + encodeURIComponent('chinese culture') + "&per_page=10" + `&page=${randomIndex}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.hits.length > 0) {
            const imageUrl = data.hits[randomIndex].webformatURL;

            setTimeout(() => {
                pastPhotos.push(imageUrl);
                currentIndex = pastPhotos.length - 1;
                saveToLocalStorage();
                hidePreloader();
                showCurrentPhoto();
            }, 3000);
        } else {
            throw new Error('No images found');
        }
    } catch (error) {
        showToast("Oops, something went wrong");
        hidePreloader();
    }
}


function saveToLocalStorage() {
    sessionStorage.setItem('pastPhotos', JSON.stringify(pastPhotos));
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

function showToast(message) {
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "firebrick",
        className: "toast",
    }).showToast();
}
