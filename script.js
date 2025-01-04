const API_KEY = 'db95f6a24896411da96e8f05cb8fff08';  // Replace this with your actual News API key
const API_URL = 'https://newsapi.org/v2/top-headlines?apiKey=' + API_KEY + '&category=';

const loadingElement = document.getElementById('loading');
const articlesElement = document.getElementById('articles');

function fetchNews(category) {
  loadingElement.style.display = 'block';
  articlesElement.innerHTML = '';

  fetch(API_URL + category)
    .then(response => response.json())
    .then(data => {
      loadingElement.style.display = 'none';
      if (data.articles && data.articles.length > 0) {
        data.articles.forEach(article => {
          displayArticle(article);
        });
      } else {
        articlesElement.innerHTML = '<p>No articles found.</p>';
      }
    })
    .catch(error => {
      loadingElement.style.display = 'none';
      articlesElement.innerHTML = '<p>Error fetching the news.</p>';
      console.error('Error fetching news:', error);
    });
}

function displayArticle(article) {
  const articleCard = document.createElement('div');
  articleCard.classList.add('article-card');

  const articleImage = article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}">` : '';
  const articleTitle = article.title ? `<h3><a href="${article.url}" target="_blank">${article.title}</a></h3>` : '';
  const articleDescription = article.description ? `<p>${article.description}</p>` : '';

  articleCard.innerHTML = `
    ${articleImage}
    <div class="content">
      ${articleTitle}
      ${articleDescription}
    </div>
  `;

  articlesElement.appendChild(articleCard);
}

// Load default category (Top Headlines)
fetchNews('general');



