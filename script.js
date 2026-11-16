/* =================================================================
   1. CAT DATA & MANAGEMENT (YOUR 12 SANCTUARY CATS)
   ================================================================= */
const catsData = [
    {
        id: 1,
        name: "Ace",
        age: "2 years",
        sex: "Male",
        status: "Looking for love",
        bio: "A gentle soul with a big heart and an even bigger purr.",
        tags: ["Good with cats", "Good with kids"],
        image: "assets/ace.jpg"
    },
    {
        id: 2,
        name: "Ashlad",
        age: "3 years",
        sex: "Male",
        status: "Looking for love",
        bio: "Your new sunbeam-seeking, couch-sharing best friend.",
        tags: ["Good with cats", "Good with dogs"],
        image: "assets/ashlad.jpg"
    },
    {
        id: 3,
        name: "Bri Bri Pig Pie",
        age: "4 years",
        sex: "Female",
        status: "Looking for love",
        bio: "A little personality. A whole lot of love.",
        tags: ["Good with kids", "Good with cats"],
        image: "assets/bribripigbre.jpg"
    },
    {
        id: 4,
        name: "Dizzy",
        age: "1 year",
        sex: "Female",
        status: "Looking for love",
        bio: "Playful paws and a curious little nose.",
        tags: ["Good with cats", "Good with dogs"],
        image: "assets/dizzy.avif"
    },
    {
        id: 5,
        name: "Fumi",
        age: "2 years",
        sex: "Female",
        status: "Looking for love",
        bio: "Sweet, gentle companion who loves sunny window perches.",
        tags: ["Good with cats"],
        image: "assets/fumi.jpg"
    },
    {
        id: 6,
        name: "Indy",
        age: "3 years",
        sex: "Male",
        status: "Looking for love",
        bio: "Curious explorer ready for cozy evenings on the couch.",
        tags: ["Good with cats", "Good with kids"],
        image: "assets/indy.jpg"
    },
    {
        id: 7,
        name: "Lemi",
        age: "2 years",
        sex: "Female",
        status: "Looking for love",
        bio: "Soft-spoken sweetheart who adores chin scratches.",
        tags: ["Good with cats"],
        image: "assets/lemi.jpg"
    },
    {
        id: 8,
        name: "Madeline",
        age: "4 years",
        sex: "Female",
        status: "Looking for love",
        bio: "Graceful, affectionate friend looking for a loving home.",
        tags: ["Good with kids", "Good with cats"],
        image: "assets/madeline.jpg"
    },
    {
        id: 9,
        name: "Marble",
        age: "3 years",
        sex: "Male",
        status: "Looking for love",
        bio: "Stunning coat and an even sweeter personality.",
        tags: ["Good with cats", "Good with dogs"],
        image: "assets/marble.jpg"
    },
    {
        id: 10,
        name: "Matilda",
        age: "5 years",
        sex: "Female",
        status: "Looking for love",
        bio: "Calm, loving lap cat who enjoys peaceful afternoons.",
        tags: ["Good with cats", "Special needs"],
        image: "assets/matilda.jpg"
    },
    {
        id: 11,
        name: "Penny Dash",
        age: "1 year",
        sex: "Female",
        status: "Looking for love",
        bio: "Playful little dash of energy and affection.",
        tags: ["Good with kids", "Good with cats"],
        image: "assets/pennydash.jpg"
    },
    {
        id: 12,
        name: "Smokey",
        age: "4 years",
        sex: "Male",
        status: "Looking for love",
        bio: "Loyal, velvety friend ready to be your constant companion.",
        tags: ["Good with cats", "Good with dogs"],
        image: "assets/smokey.jpg"
    },
    {
        id: 13,
        name: "Lucky",
        age: "5 months",
        sex: "Female",
        status: "Looking for love",
        bio: "Tiny but mighty, with a heart full of love to give.",
        tags: ["Good with cats", "Good with kids"],
        image: "assets/lucky.jpg"
    },
];

/* =================================================================
   2. RENDER CATS TO THE PAGE
   ================================================================= */
function renderCats(catsToDisplay) {
    const gridContainer = document.getElementById("catsGrid");
    const countDisplay = document.getElementById("catCountText");
    
    if (!gridContainer) return;

    if (countDisplay) {
        countDisplay.textContent = `${catsToDisplay.length} cats · Photos and personality details are samples; confirm availability with our team.`;
    }

    gridContainer.innerHTML = "";

    if (catsToDisplay.length === 0) {
        gridContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); padding: 3rem;">No cats found matching your search. Try changing your filters!</p>`;
        return;
    }

catsToDisplay.forEach(cat => {
        const card = document.createElement("div");
        card.className = "cat-card";

        const tagsHtml = cat.tags.map(tag => `<span class="tag">${tag}</span>`).join("");

        card.innerHTML = `
            <div class="cat-img-placeholder">
                <img src="${cat.image}" alt="${cat.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="cat-info">
                <h3>${cat.name}</h3>
                <div class="cat-meta">${cat.age} · ${cat.sex}</div>
                <p class="cat-bio">${cat.bio}</p>
                <div class="cat-tags">${tagsHtml}</div>
                <div class="cat-status-text" style="margin-top: 0.75rem; font-size: 0.85rem; font-weight: 600; color: var(--color-dark-pink);">♡ ${cat.status}</div>
            </div>
            <button class="cat-card-footer" onclick="openAdoptFormForCat('${cat.name}')">
                <span>Meet ${cat.name}</span>
                <span>→</span>
            </button>
        `;

        gridContainer.appendChild(card);
    });
}

/* =================================================================
   3. FILTER AND SEARCH LOGIC
   ================================================================= */
function filterCats() {
    const searchInput = document.getElementById("catSearchInput");
    const ageSelect = document.getElementById("ageFilterSelect");
    const sexSelect = document.getElementById("sexFilterSelect");
    
    const goodWithKids = document.getElementById("filterKids")?.checked || false;
    const goodWithCats = document.getElementById("filterCats")?.checked || false;
    const goodWithDogs = document.getElementById("filterDogs")?.checked || false;
    const specialNeeds = document.getElementById("filterSpecial")?.checked || false;

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedAge = ageSelect ? ageSelect.value : "all";
    const selectedSex = sexSelect ? sexSelect.value : "all";

    const filtered = catsData.filter(cat => {
        const matchesSearch = cat.name.toLowerCase().includes(searchTerm) || 
                              cat.bio.toLowerCase().includes(searchTerm);
        const matchesAge = selectedAge === "all" || cat.age.toLowerCase().includes(selectedAge);
        const matchesSex = selectedSex === "all" || cat.sex.toLowerCase() === selectedSex.toLowerCase();

        const matchesKids = !goodWithKids || cat.tags.includes("Good with kids");
        const matchesCatTag = !goodWithCats || cat.tags.includes("Good with cats");
        const matchesDogTag = !goodWithDogs || cat.tags.includes("Good with dogs");
        const matchesSpecial = !specialNeeds || cat.tags.includes("Special needs");

        return matchesSearch && matchesAge && matchesSex && matchesKids && matchesCatTag && matchesDogTag && matchesSpecial;
    });

    renderCats(filtered);
}

function openAdoptFormForCat(catName) {
    const catInput = document.getElementById("preferredCatInput");
    if (catInput) {
        catInput.value = catName;
        catInput.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert(`You are interested in adopting ${catName}! Head over to our Adopt page form to submit your application.`);
    }
}

/* =================================================================
   4. MOBILE MENU & EVENT LISTENERS
   ================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    renderCats(catsData);

    const searchInput = document.getElementById("catSearchInput");
    const ageSelect = document.getElementById("ageFilterSelect");
    const sexSelect = document.getElementById("sexFilterSelect");
    const checkboxes = document.querySelectorAll(".checkbox-filters input");

    if (searchInput) searchInput.addEventListener("input", filterCats);
    if (ageSelect) ageSelect.addEventListener("change", filterCats);
    if (sexSelect) sexSelect.addEventListener("change", filterCats);
    checkboxes.forEach(box => box.addEventListener("change", filterCats));

    // Mobile Hamburger Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinksMenu = document.getElementById("navLinksMenu");

    if (mobileMenuBtn && navLinksMenu) {
        mobileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinksMenu.classList.toggle("active");
        });

        // Close menu when clicking any link inside
        const menuLinks = navLinksMenu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                navLinksMenu.classList.remove("active");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinksMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinksMenu.classList.remove("active");
            }
        });
    }

    // FAQ Click-to-Reveal Logic
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
});