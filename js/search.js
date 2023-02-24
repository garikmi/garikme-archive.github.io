// debounce executes function after timeout
function debounce(func, wait) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timeout);

        timeout = setTimeout(function () {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}

// makeTeaser highlights (or bolds) characters in the title and returns it
function makeTeaser(text, test) {
    let formatted = [];
    for (let i = 0; i < text.length; i++) {
        if (test.toLowerCase().includes(text[i].toLowerCase())) {
            formatted.push("<b>");
            formatted.push(text[i]);
            formatted.push("</b>");
        } else {
            formatted.push(text[i]);
        }
    }
    return formatted.join("");
}

// formatSearchResultItem creates a search item
function formatSearchResultItem(item, test) {
    return '<div class="search-results__item">'
        + `<a class="search-item" href="${window.location.origin + "/" + item.uri}">${makeTeaser(item.title, test)} • ${item.date}</a>`
        + '</div>';
}

// initSearch initializes search
function initSearch() {
    let $searchInput = document.getElementById("search_input");
    let $searchResultsItems = document.getElementById("posts"); // querySelector(".search-results__items")
    let MAX_ITEMS = 10;

    let currentTerm = "";
    let index = [];

    // load search.json index
    let request = new XMLHttpRequest();
    request.open("GET", "/search.json");
    request.responseType = "json";
    request.addEventListener("load", function (event) {
        for (let doc of request.response) {
            index.push(doc);
        }
    }, false);
    request.send(null);

    // preserve div content
    const preserved = $searchResultsItems.innerHTML;

    // search on input change
    $searchInput.addEventListener("keyup", debounce(function () {
        let term = $searchInput.value.trim();
        if (term === currentTerm) {
            return;
        }
        $searchResultsItems.innerHTML = "";
        currentTerm = term;
        if (term === "") {
            $searchResultsItems.innerHTML = preserved;
            return;
        }

        // search for items
        let results = getSearchResults(index, term);

        // set result div to preserved if results are empty
        if (results.length === 0) {
            $searchResultsItems.innerHTML = preserved;
            return;
        }

        // construct search result items and append to results div
        for (let i = 0; i < Math.min(results.length, MAX_ITEMS); i++) {
            let item = document.createElement("div");
            item.innerHTML = formatSearchResultItem(index[results[i]], term);
            $searchResultsItems.appendChild(item);
        }
    }, 150));
}

// initialize search on page load
if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    initSearch();
} else {
    document.addEventListener("DOMContentLoaded", initSearch);
}

// getSearchResults uses Levenshtein Distance to rank search results in order and returns sorted indices
function getSearchResults(items, test) {
    const map1 = new Map();

    let keys = [];
    for (let i = 0; i < items.length; i++) {
        keys.push(i);
        map1.set(i, levenshteinDistance(items[i].title, test));
    }

    keys.sort((a, b) => {
        return map1.get(keys[a]) - map1.get(keys[b]);
    });

    return keys;
}

// LevenshteinDistance computes a distance between two strings using wagner-fisher algorithm
function levenshteinDistance(s, t) {
    s = s.toLowerCase();
    t = t.toLowerCase();
    const m = s.length;
    const n = t.length;
    if (m === 0) {
        return n;
    }
    if (n === 0) {
        return m;
    }
    let prevRow = new Array(n + 1);
    for (let j = 0; j <= n; j++) {
        prevRow[j] = j;
    }
    for (let i = 0; i < m; i++) {
        let currRow = new Array(n + 1);
        currRow[0] = i + 1;
        for (let j = 0; j < n; j++) {
            const insertions = prevRow[j + 1] + 1;
            const deletions = currRow[j] + 1;
            const substitutions = prevRow[j] + (s[i] !== t[j] ? 1 : 0);
            currRow[j + 1] = Math.min(insertions, deletions, substitutions);
        }
        prevRow = currRow;
    }
    return prevRow[n];
}
