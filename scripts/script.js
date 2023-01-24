// let tv = new Swiper(`.trend__tv-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.trend__tv-slider .swiper-button-next`,
//         prevEl: `.trend__tv-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });
// let awaited = new Swiper(`.popular__actors-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.popular__actors-slider .swiper-button-next`,
//         prevEl: `.popular__actors-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });

const seachLink = document.querySelector(".search__link .icon-reg"),
    mainContent = document.querySelector(".main__content"),
    mainClose = document.querySelectorAll(".main__close"),
    mainBlock = document.querySelector(".main__block"),
    movieSolo = document.querySelector(".main__solo"),
    movieLink = document.querySelectorAll(".main__link"),
    formMain = document.querySelector(".form__main"),
    formInput = document.querySelector(".header__input"),
    anime = document.querySelector(".anime"),
    pagination = document.querySelector(".pagination"),
    headerBtn = document.querySelector(".header__btn"),
    headerAbs = document.querySelector(".header__abs"),
    headerItems = document.querySelector(".header__items");

// menu burger

headerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
    headerItems.classList.toggle("active");
    headerAbs.classList.toggle("active");
    body.classList.toggle("active");
})

headerAbs.addEventListener("click", function (e) {
    // console.log(e.target);
    // if (e.target === e.currentTarget) {}
    this.classList.remove("active")
    headerItems.classList.remove("active")
    headerBtn.classList.remove("active")
    body.classList.remove("active")
})

// menu burger

// host

const host = "https://kinopoiskapiunofficial.tech";
const hostName = "X-API-KEY";
const hostValue = "08bb7839-6b49-480f-9fc9-84e337db9aa2";

class Kino {
    constructor() {
        this.date = new Date().getMonth()
        // console.log(this.date);
        this.month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        this.curYear = new Date().getFullYear();
        this.curMonth = this.month[this.date];
        // console.log(this.curMonth);
    }

    fOpen = async (url) => {
        let response = await fetch(url, {
            headers: {
                [hostName]: hostValue
            }
        })
        if (response.ok) return response.json();
        else throw new Error(`Cannot access to ${url}`);
    }
    getTopMovies = (page = 1) => this.fOpen(`${host}/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`);
    getSoloFilm = (id) => this.fOpen(`${host}/api/v2.1/films/${id}`);
    getMostAwaited = (page = 1, year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`);
    getReviews = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`);
    getFrames = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`);
    getPremier = (year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.2/films/premieres?year=${year}&month=${month}`);
    getSearch = (page = 1, keyword) => this.fOpen(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`);
}

const db = new Kino();

// db.getTopMovies().then(res => {
//     console.log(res);
// })

// db.getSoloFilm(312).then(res => {
//     console.log(res);
// })

// db.getMostAwaited().then(res => {
//     console.log(res);
// })

// db.getReviews(312).then(res => {
//     console.log(res);
// })

// db.getFrames(312).then(res => {
//     console.log(res);
// })

// db.getPremier().then(res => {
//     console.log(res);
// })

// db.getSearch(1, "911").then(res => {
//     console.log(res);
// })

// host

// render Trend and Releases movies

function renderMovies(elem = [], fn = [], key = [], page = []) {
    anime.classList.add("active");
    elem.forEach((item, i) => {
        let parent = document.querySelector(`${item} .swiper-wrapper`);
        db[fn[i]](page[i]).then(data => {
                // console.log(data);
                data[key[i]].forEach(el => {
                    // console.log(el);
                    let slide = document.createElement("div");
                    slide.classList.add("swiper-slide");
                    slide.innerHTML = `
                    <div class="movie__item" data-id="${el.filmId}">
                        <img src="${el.posterUrlPreview}" alt="" loading="lazy">
                    </div>
                `
                    parent.append(slide);
                });
                anime.classList.remove("active");
            })
            .then(() => {
                elem.forEach(item => {
                    new Swiper(`${item}`, {
                        slidesPerView: 1,
                        spaceBetween: 27,
                        // slidesPerGroup: 3,
                        // loop: true,
                        // loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: `${item} .swiper-button-next`,
                            prevEl: `${item} .swiper-button-prev`,
                        },
                        breakpoints: {
                            1440: {
                                slidesPerView: 6,
                            },
                            1200: {
                                slidesPerView: 5,
                            },
                            960: {
                                slidesPerView: 4,
                            },
                            720: {
                                slidesPerView: 3,
                            },
                            500: {
                                slidesPerView: 2,
                            },
                        }
                    });
                });
                let movieItem = document.querySelectorAll(".movie__item");
                movieItem.forEach(movies => {
                    movies.addEventListener("click", function (e) {
                      let attr = this.getAttribute("data-id");
                      openSoloFilm(e);
                      renderSolo(attr);
                    })
                });
            })
            .catch(error => {
                console.warn(error);
                anime.classList.remove("active");
            })
    });
}

renderMovies([".trend__tv-slider", ".popular__actors-slider"], ["getTopMovies", "getMostAwaited"], ["films", "releases"], [1, 1]);

// render Trend and Releases movies

function randMoveis(num) {
    return Math.floor(Math.random() * num + 1);
}

// render header

function renderHeader(page) {
    db.getTopMovies(page).then(data => {
        // console.log(data);
        let max = randMoveis(data.films.length);
        let filmId = data.films[max].filmId;
        let filmRating = data.films[max].rating;
        db.getSoloFilm(filmId).then(res => {
            // console.log(res);
            let info = res.data;
            let headerText = document.querySelector(".header__text");
            let url = `https://www.kinopoiskk.ru/film/${info.filmId}/`;
            // console.log(url);
            headerText.innerHTML = `
                <h1 class="header__title">${info.nameRu || info.nameEn}</h1>
                <div class="header__balls">
                    <span class="header__year">${info.year}</span>
                    <span class="logo__span header__rating  header__year ">${info.ratingAgeLimits}+</span>
                    <div class="header__seasons header__year">${info.seasons.length > 0 ? info.seasons[0] : ""}</div>
                    <div class="header__stars header__year"><span class="icon-solid"></span><strong>${filmRating}</strong></div>
                </div>
                <p class="header__descr">
                    ${info.description}
                </p>
                <div class="header__buttons">
                    <a href="${url}" target="_blank" class="header__watch"><span class="icon-solid"></span>watch</a>
                    <a href="#" class="header__more header__watch movie__item" data-id="${info.filmId}">More information</a>
                </div>
            `
        })
        .then(() => {
            let headerMore = document.querySelector(".header__more");
            headerMore.addEventListener("click", function (e) {
                e.preventDefault();
                let attr = this.getAttribute("data-id");
                openSoloFilm(e);
                renderSolo(attr);
            })
        })
    })
}

let pageCount = 13;
let rand = randMoveis(pageCount);
renderHeader(rand);

// render header

// current date

const popularActorsDate = document.querySelector('.popular__actors strong');
const comingSoonBlockImg = document.querySelector('.coming__soon-block img');
const year = document.querySelector('.year');

popularActorsDate.innerHTML = `${db.curMonth} ${db.curYear}`;
year.innerHTML = `${db.curYear}`;

db.getPremier().then(res => {
    // console.log(res);
    let rand = randMoveis(res.total);
    comingSoonBlockImg.src = res.items[rand].posterUrl;
})

// current date

// open solo film

function openSoloFilm(e) {
    e.preventDefault();
    mainContent.classList.add("active");
    body.classList.add("active");
}

mainClose.forEach(closes => {
    closes.addEventListener("click", function (e) {
        e.preventDefault();
        mainContent.classList.remove("active");
        body.classList.remove("active");
    })
})

seachLink.addEventListener("click", function (e) {
    e.preventDefault();
    openSoloFilm(e);
})

// open solo film

// render cards

function renderCards(page = 1, value = "", fn = "getTopMovies") {
    mainBlock.innerHTML = "";
    movieSolo.innerHTML = "";
    db[fn](page, value).then(data => {
        if (data.films.length > 0) {
            data.films.forEach(films => {
                let someItem = document.createElement("div");
                someItem.classList.add("some__item");
                someItem.innerHTML = `
                <div class="some__img">
                    <img src="${films.posterUrlPreview}" alt="" loading="lazy">
                    <span class="some__rating">${films.rating == "null" ? 0 : films.rating}</span>
                </div>
                <h3 class="some__title">${films.nameRu || films.nameEn}</h3>
                `
                someItem.setAttribute("data-id", films.filmId);
                mainBlock.append(someItem);
            })
        } else {
            mainBlock.innerHTML = `<p class="undefined">Ничего не найдено</p>`;
        }
    })
    .then(() => {
        let film = document.querySelectorAll('.some__item');
        film.forEach(films => {
            films.addEventListener("click", function () {
                let attr = this.getAttribute("data-id");
                renderSolo(attr);
            })
        });
    })
}

formMain.addEventListener("submit", function (e) {
    e.preventDefault();
    renderCards(1, formInput.value, 'getSearch');
})

// render cards

// render solo

async function renderSolo(id) {
    mainBlock.innerHTML = '';
    anime.classList.add("active");
    (async function () {
        const [reviews, frames, solo] = await Promise.all([
            db.getReviews(id),
            db.getFrames(id),
            db.getSoloFilm(id),
        ])
        return { reviews, frames, solo };
    })()
    .then(res => {
        console.log(res);
        let solo = res.solo.data;
        let genres = solo.genres.reduce((acc, item) => acc + `${item.genre} `, '');
        let countries = solo.countries.reduce((acc, item) => acc + `${item.country} `, '');
        let facts = "";
        let frames = "";
        let reviews = "";
        
        let fact = solo.facts.slice(0, 10);
        // console.log(fact);
        fact.forEach((item, i) => {
            facts += `<li class="solo__facts">${i+1}: ${item}</li>`
        });
        let frame = res.frames.items.slice(0, 8);
        frame.forEach(images => {
            frames += `<img src="${images.previewUrl}" alt="image" loading="lazy">`;
        });
        let review = res.reviews.items.slice(0, 10);
        review.forEach(item => {
            reviews += `
            <div class="review__item">
                <span>${item.author}</span>
                <p class="review__descr">${item.description}</p>
            </div>
            `
        });
        
        let url = `https://www.kinopoiskk.ru/film/${solo.filmId}/`;
        
        let div = `
        <div class="solo__img">
            <img src="${solo.posterUrlPreview}" alt="">
            <a href="${url}" target="_blank" class="solo__link header__watch">Смотреть фильм</a>
        </div>
        <div class="solo__content">
            <h3 class="solo__title trend__tv-title">${solo.nameRu || solo.nameEn}</h3>
            <ul>
                <li class="solo__countries">Страны: ${countries}</li>
                <li class="solo__genres">Жанры: ${genres}</li>
                <li class="solo__dur">Продолжительность: ${solo.filmLength == null ? "Неизвестно" : solo.filmLength}</li>
                <li class="solo__year">Год: ${solo.year}</li>
                <li class="solo__premiere">Мировая премьера: ${solo.premiereWorld}</li>
                <li class="solo__rating">Возрастной рейтинг: ${solo.ratingAgeLimits == null ? "Неизвестно" : solo.ratingAgeLimits + "+"}</li>
                <li class="solo__slogan">Слоган: ${solo.slogan == null ? "Неизвестно" : solo.slogan}</li>
                <li class="solo__descr header__descr">Описание: ${solo.description == null ? "Неизвестно" : solo.description}</li>
            </ul>
        </div>
        <div class="solo__facts">
            <h3 class="trend__tv-title">Интересные факты</h3>
            ${facts}
        </div>
        <h3 class="trend__tv-title">Кадры из фильма</h3>
        <ul class="solo__images">${frames}</ul>
        <div class="solo__reviews">
            <h3 class="trend__tv-title">Отзывы</h3>
            ${reviews}
        </div>
        `;
        movieSolo.innerHTML = div;
        anime.classList.remove("active");
    })
    .catch(error => {
        console.log(error);
        anime.classList.remove("active");
    })
}

// renderSolo(448);

// render solo