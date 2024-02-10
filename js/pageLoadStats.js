function measurePageLoadTime() {
    const loadTime = performance.now();
    const loadingInfo = document.getElementById("loading-info");

    if (loadingInfo) {
        loadingInfo.textContent = `The page is loaded in ${loadTime.toFixed(2)} milliseconds`;
    } else {
        console.error("Element with id 'loading-info' not found");
    }
}

window.addEventListener("load", measurePageLoadTime);

