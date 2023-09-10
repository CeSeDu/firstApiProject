async function Api() {
    const url = 'https://restcountries.com/v2/all';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('API çağrısı başarısız: ' + response.statusText);
        }
        const countries = await response.json();
        createCards(countries); // Tüm ülke verilerini kullanarak kartları oluşturun
        console.log(countries)
    } catch (err) {
        console.error("API doğru çalışmadı: " + err.message);
    }
}

function createCards(countries) {
    const generalcard = document.querySelector(".general__card");

    for (let data of countries) {
        const countryName = data.name;
        const countryCapital = data.capital ? data.capital : 'Bilgi yok'; // capital özelliği mevcut değilse 'Bilgi yok' olarak ayarlayın
        const countryPopulation = data.population;
        const countryGini = data.gini || 'Bilgi yok';
        const countryLanguage = data.languages[0].name || 'Bilgi yok';
        const countryFlag = data.flags.png || 'Bilgi yok'; // flags.png özelliği mevcut değilse 'Bilgi yok' olarak ayarlayın

        createCard(countryName, countryCapital, countryPopulation, countryGini, countryLanguage, countryFlag, generalcard);
    }
}

function createCard(name, capital, population, gini, languages, flags, container) {
    let add = `
    <div class="country__name">${name}</div>
    <div class="country__flag"><img class="flag" src="${flags}" alt=""></div>
    <div class="country__capital"><span>Capital :</span>${capital}</div>
    <div class="country__population"><span>Population :</span>${population}</div>
    <div class="country__border"><span>Language :</span>${languages}</div>
    <div class="country__gini"><span>Gini :</span>${gini}</div>
`;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = add;
    container.appendChild(card);
}

Api();
