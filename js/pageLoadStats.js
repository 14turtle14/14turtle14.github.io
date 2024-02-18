(function measurePageLoadTime() {
    const loadTime = performance.now();
    const loadingInfo = document.getElementById("loading-info");

    if (loadingInfo) {
        loadingInfo.innerHTML = `The page loaded in <span class="load-time">${loadTime.toFixed(2)} </span> milliseconds`;
    } else {
        console.error("Element with id 'loading-info' not found");
    }
})();

