const loadNav = () => {
  fetch(" https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayNav(data.data.news_category));
};

const displayNav = (navs) => {
  const navContainer = document.getElementById("nav-container");
  navs.forEach((nav) => {
    const navDiv = document.createElement("div");
    navDiv.innerHTML = `
        <div>
        <button onclick=displayItems('${nav.category_id}') class="btn fs-5 fw-bold">${nav.category_name}</button>
        </div>
        `;
    navContainer.appendChild(navDiv);
  });
};

loadNav();
const displayItems = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};
const displayNews = (news) => {
  const newsId = document.getElementById("news-item");
  newsId.innerHTML = "";
  news.forEach((newses) => {
    const newsdiv = document.createElement("div");
    newsdiv.classList.add("card");
    newsdiv.innerHTML = `
     <div class="row g-0">
                <div class="col-md-4">
                    <img src="${newses.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${newses.title}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                            content. This content is a little bit longer.</p>
                               <button onclick=loadDetail('${newses._id}') type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Details
    </button>
                    </div>
                </div>
            </div>
    `;
    newsId.appendChild(newsdiv);
  });
};
const loadDetail = (data) => {
  fetch(`https://openapi.programming-hero.com/api/news/${data}`)
    .then((res) => res.json())
    .then((data) => showDetails(data.data));

    const showDetails = (data) => {
    const modalContainer =  document.getElementById("modal");
        data.forEach((datas) => {
        console.log(datas)
        modalContainer.innerHTML = `
      <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <img class="w-75" src=${datas.thumbnail_url}>
                <p>${datas.details}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                   
                </div>
        `;
    });
  };
};

displayItems("08");
