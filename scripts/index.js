const quoteContainer = document.querySelector('.quote__container');
const quoteText = quoteContainer.querySelector('.quote__text');
const quoteAuthor = quoteContainer.querySelector('.quote__author');
const twitterButton = quoteContainer.querySelector('.quote__button_type_tweet');
const newQuoteButton = quoteContainer.querySelector('.quote__button_type_new-quote');
const loader = document.querySelector('.loader');

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const loadingComplete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const displayQuote = (quote) => {
    loading();
    if(quote.quoteText.length > 120) {
       quoteText.classList.add('quote__text_long')
    } else {
        quoteText.classList.remove('quote__text_long')
    }

    if(!quote.quoteAuthor) {
        quoteAuthor.textContent = 'Unknown'
    } else {
        quoteAuthor.textContent = quote.quoteAuthor;
    }
    quoteText.textContent = quote.quoteText;
    loadingComplete();
}

const getQuote = async () => {
    loading()
    const proxyUrl = 'https://peaceful-eyrie-13335.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const apiQuote = await response.json()
        displayQuote(apiQuote);
    } catch (err) {
        getQuote();
        console.warn(`Something went wrong - ${err}`);
    }
}

const tweetQuote = () => {
    const quote = quoteText.textContent;
    const author = quoteText.textContent;
    const twitterUrl = `http://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

twitterButton.addEventListener('click', tweetQuote)
newQuoteButton.addEventListener('click', getQuote);
document.addEventListener('keydown', evt => {
    if (evt.key === 'Enter'){
        getQuote();
    }
})

getQuote();
