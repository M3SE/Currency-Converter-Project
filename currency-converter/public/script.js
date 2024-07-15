document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'fca_live_goRa7qcnhXfLVnrdx4FDr9pvJKLBCDSelQtL9CeK';
    const baseCurrency = document.getElementById("base-currency");
    const targetCurrency = document.getElementById("target-currency");
    const amountInput = document.getElementById("amount");
    const convertedAmount = document.getElementById("converted-amount");

    // Fetch exchange rates from the Free Currency API
    const fetchExchangeRates = async (base) => {
        try {
            const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${base}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            return {};
        }
    };

    // Populate currency dropdowns
    const populateCurrencyDropdowns = async () => {
        const rates = await fetchExchangeRates('USD'); // Default base currency to USD
        const currencies = Object.keys(rates);
        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            baseCurrency.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;
            targetCurrency.appendChild(option2);
        });
    };

    // Perform currency conversion
    const convertCurrency = async () => {
        const base = baseCurrency.value;
        const target = targetCurrency.value;
        const amount = amountInput.value;

        if (!amount || amount <= 0 || isNaN(amount)) {
            alert("Please enter a valid amount");
            return;
        }

        if (base === target) {
            alert("Base and target currencies cannot be the same");
            return;
        }

        try {
            const rates = await fetchExchangeRates(base);
            const rate = rates[target];
            const converted = (amount * rate).toFixed(2);
            convertedAmount.textContent = converted;
        } catch (error) {
            alert("Error fetching exchange rates. Please try again later.");
        }
    };

    // Fetch historical exchange rates from the Free Currency API
    const fetchHistoricalExchangeRates = async (base, target, date) => {
        try {
            const response = await fetch(`https://api.freecurrencyapi.com/v1/historical?apikey=${apiKey}&base_currency=${base}&date_from=${date}&date_to=${date}`);
            const data = await response.json();
            
            console.log(data);  // Log the response to see its structure

            if (data && data.data && data.data[date] && data.data[date][target]) {
                return data.data[date][target];
            } else {
                console.error("Invalid response structure:", data);
                return null;
            }
        } catch (error) {
            console.error("Error fetching historical exchange rates:", error);
            return null;
        }
    };

    // Display historical exchange rate
    const displayHistoricalRate = async () => {
        const base = baseCurrency.value;
        const target = targetCurrency.value;
        const date = "2024-07-14";  // Correct date
        const rate = await fetchHistoricalExchangeRates(base, target, date);
        if (rate) {
            document.getElementById("historical-rates-container").textContent = 
                `Historical exchange rate on ${date}: 1 ${base} = ${rate} ${target}`;
        } else {
            document.getElementById("historical-rates-container").textContent = 
                `Historical exchange rate on ${date} not available for ${base} to ${target}`;
        }
    };

    // Save favorite currency pair
    const saveFavoritePair = async () => {
        const base = baseCurrency.value;
        const target = targetCurrency.value;
        try {
            const response = await fetch('/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ base, target })
            });
            const favorite = await response.json();
            addFavoriteToUI(favorite);
        } catch (error) {
            console.error("Error saving favorite pair:", error);
        }
    };

    // Add favorite pair to UI
    const addFavoriteToUI = (favorite) => {
        const favoriteContainer = document.getElementById('favorite-currency-pairs');
        const button = document.createElement('button');
        button.textContent = `${favorite.base}/${favorite.target}`;
        button.addEventListener('click', () => {
            baseCurrency.value = favorite.base;
            targetCurrency.value = favorite.target;
        });
        favoriteContainer.appendChild(button);
    };

    // Fetch and display all favorite pairs
    const loadFavorites = async () => {
        try {
            const response = await fetch('/favorites');
            const favorites = await response.json();
            favorites.forEach(addFavoriteToUI);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    // Event listener for conversion
    document.getElementById("convert-button").addEventListener("click", convertCurrency);
    
    // Event listener for historical rates
    document.getElementById("historical-rates").addEventListener("click", displayHistoricalRate);

    // Event listener for saving favorite pair
    document.getElementById("save-favorite").addEventListener("click", saveFavoritePair);

    // Initial population of currency dropdowns and load favorites
    populateCurrencyDropdowns().then(loadFavorites);
});