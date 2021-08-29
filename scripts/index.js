const quoteContainer = document.querySelector('.quote__container');
const quoteText = quoteContainer.querySelector('.quote__text');
const quoteAuthor = quoteContainer.querySelector('.quote__author');
const twitterButton = quoteContainer.querySelector('.quote__button_type_tweet');
const newQuoteButton = quoteContainer.querySelector('.quote__button_type_new-quote');
const loader = document.querySelector('.loader');

let apiQuotes = [];

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const loadingComplete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const newQuote = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    if(quote.text.length > 120) {
       quoteText.classList.add('quote__text_long')
    } else {
        quoteText.classList.remove('quote__text_long')
    }

    if(!quote.author) {
        quoteAuthor.textContent = 'Unknown'
    } else {
        quoteAuthor.textContent = quote.author;
    }
    quoteText.textContent = quote.text;
    loadingComplete();
}

const getQuotes = async () => {
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        newQuote();
    } catch (err) {
        console.warn(`Something went wrong - ${err}`);
    }
}

const tweetQuote = () => {
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterButton.addEventListener('click', tweetQuote)
newQuoteButton.addEventListener('click', newQuote);
document.addEventListener('keydown', evt => {
    if (evt.key === 'Enter'){
        newQuote();
    }
})

getQuotes();
