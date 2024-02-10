(function() {
    [...this.querySelectorAll("a")]
        .filter(a => this.URL.startsWith(a.href))
        .forEach(a => a.classList.add("active"));
}.bind(window.document)());