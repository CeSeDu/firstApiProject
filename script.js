async function Api() {
    const url = 'https://restcountries.com/v3/all';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('API çağrısı başarısız');
        }
        const element = await response.json();
        country(element);
    } catch (err) {
        console.error("API doğru çalışmadı: " + err.message);
    }
}

function country(element) {
    for (let data of element) {
        const countryName = data.name.common;
        const countryCapital = data.capital[0];
        const countryPopulation = data.population;
        const countryGini = data.gini || 'Bilgi yok';
        const countryFlag = data.flags.png;

        creat(countryName, countryCapital, countryPopulation, countryGini, countryFlag);
    }
}

function creat(name, capital, population, gini, flags) {
    let add = `<div class="card">
    <div class="country__name">${name}</div>
    <div class="country__flag"><img class="flag" src="${flags}" alt=""></div>
    <div class="country__capital"><span>Capital :</span>${capital}</div>
    <div class="country__population"><span>Population :</span>${population}</div>
    <div class="country__gini"><span>Gini :</span>${gini}</div>
</div>`;

    const generalcard = document.querySelector(".general__card");
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = add;
    generalcard.appendChild(card);
}

Api();
