let LoadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayData(json.data))
}


let loadLevelWords = (id) => {
    manageSpinner(true);
    let url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            removeClass();
            let lessonBtn = document.getElementById(`lesson-btn-${id}`);
            lessonBtn.classList.add("active");
            displayWord(json.data)
        })
}

let removeClass = () => {
    let removeActiveClass = document.querySelectorAll(".lesson-btn");
    removeActiveClass.forEach((btn) => {
        btn.classList.remove("active");
    })
}
let displayWord = (words) => {
    let wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full flex flex-col ">
            <img src="./assets/alert-error.png" alt="" class="w-20 h-20 mx-auto">
            <p>এই লেসনে কোনো Vocabulary যুক্ত করা হয়নি</p>
            <p>Next Lesson এ যান</p>
        </div>
        `;
        manageSpinner(false)
        return;
    }
    words.forEach((word) => {
        let wordCards = document.createElement("div");
        wordCards.innerHTML = `
            <div class="bg-white rounded-xl shadow-md text-center pt-20 pb-10 px-5">
                <h1 class="font-bold text-3xl mb-3">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h1>
                <p class="text-xl font-semibold mb-3">Meaning /Pronounciation</p>
                <h2 class="font-medium text-2xl">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায় নি"}</h2>

                <div class="flex justify-between items-center mt-10">
                <button onclick="loadWordDetail(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;

        wordContainer.appendChild(wordCards);
    })
    manageSpinner(false);
}

let displayData = (lessons) => {
    let lessonContainer = document.getElementById("level-container");
    lessonContainer.innerHTML = "";
    lessons.forEach((lesson) => {
        let btn = document.createElement("div");
        btn.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(btn);

    })
}

let loadWordDetail = async (id) => {
    let url = `https://openapi.programming-hero.com/api/word/${id}`;
    let res = await fetch(url);
    let details = await res.json();
    displayWordDetails(details.data);
}

const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};

let displayWordDetails = (words) => {
    let wordDetails = document.getElementById("details-Container");

    wordDetails.innerHTML = `
          <div class="">
            <h2 class="text-2xl font-bold">${words.word}(<i class="fa-solid fa-microphone-lines"></i> :${words.pronunciation})</h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${words.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${words.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(words.synonyms)}
          </div>
    
    
    `;
    document.getElementById("my_modal_5").showModal();

}

let manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }
    else {
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}
LoadLesson();

document.getElementById("btn-search").addEventListener("click", () => {
    removeClass();
    let input = document.getElementById("input-search")
    let searchWord = input.value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            let allWords = data.data;
            let filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchWord))
            displayWord(filterWords);
        })
})

