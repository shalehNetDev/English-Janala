let LoadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayData(json.data))
}

let loadLevelWords = (id) => {
    let url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayWord(json.data))
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
    }
    words.forEach((word) => {
        let wordCards = document.createElement("div");
        wordCards.innerHTML = `
            <div class="bg-white rounded-xl shadow-md text-center pt-20 pb-10 px-5">
                <h1 class="font-bold text-3xl mb-3">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h1>
                <p class="text-xl font-semibold mb-3">Meaning /Pronounciation</p>
                <h2 class="font-medium text-2xl">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায় নি"}</h2>

                <div class="flex justify-between items-center mt-10">
                <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;

        wordContainer.appendChild(wordCards);
    })
}

let displayData = (lessons) => {
    let lessonContainer = document.getElementById("level-container");
    lessonContainer.innerHTML = "";
    lessons.forEach((lesson) => {
        let btn = document.createElement("div");
        btn.innerHTML = `
        <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}</button>
        `;
        lessonContainer.appendChild(btn);

    })
}
LoadLesson();