(function() {
    [...document.querySelectorAll("a")]
        .filter(a => document.URL.startsWith(a.href))
        .forEach(a => a.classList.add("active"));
}());