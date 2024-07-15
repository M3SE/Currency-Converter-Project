# Currency-Converter-Project

##Requirements:
1. Use the provided HTML and CSS files for the user interface
2. Display a user interface that allows users to choose two currencies (base and target) and input an amount
3. Fetch exchange rate data from an API, such as the free Exchange Rates API (https://freecurrencyapi.com/ Links to an external site.)
4. Perform currency conversion calculations based on the exchange rate data
5. Display the converted amount in the target currency
6. Add functionality to view historical exchange rates between the selected currency pair
7. Allow users to save and access their favorite currency pairs for quick conversion
 

##Instructions:
1. Use the provided index.html and style.css files for the user interface. Make any necessary modifications to include additional features such as historical exchange rates and favorite currency pairs.

2. In script.js, write the JavaScript code to handle the currency conversion and additional features:

*Add event listeners for user actions like selecting currencies, inputting an amount, viewing historical exchange rates, and managing favorite currency pairs
 *Fetch the exchange rate data from the API using the selected base currency
 *Perform the currency conversion calculation using the fetched exchange rate data and the input amount
 *Update the displayed converted amount in the target currency
 *Implement the functionality to fetch and display historical exchange rates between the selected currency pair
 *Allow users to save their favorite currency pairs and access them for quick conversion using Sequelize ( use and express app to hold the DB and have your sequelize there and just call the express api to fetch and create data into the db.)
3. Test your currency converter application to ensure it meets all requirements and behaves correctly in various scenarios, such as selecting different currencies, inputting various amounts, viewing historical exchange rates, and managing favorite currency pairs.

 

##More Detailed Instructions:
1. Currency conversion:

 *Allow users to select a base currency and a target currency using two dropdown menus.
 *Provide an input field for users to enter the amount they want to convert from the base currency to the target currency.
 *Fetch the current exchange rate data from an API, such as the free Exchange Rates API, for the selected base currency.
 *Perform the currency conversion calculation using the fetched exchange rate data and the input amount.
 *Display the converted amount in the target currency.
2. Historical exchange rates:

 *Add a button to fetch and display historical exchange rates between the selected currency pair.
 *When the button is clicked, fetch historical exchange rate data from the API for a specific date (hardcoded or user-selected) for the 
 selected base and target currencies.
 *Display the historical exchange rate data in a readable format, such as: "Historical exchange rate on [date]: 1 [base currency] = [rate] 
 [target currency]".
  *Example 1: "Historical exchange rate on 2021-01-01: 1 USD = 0.8150 EUR"
  *Example 2: "Historical exchange rate on 2021-06-15: 1 GBP = 1.4102 USD"
 *The historical rates can be displayed as a simple text message, showing the historical exchange rate between the selected currency pair on a specific date.
3. Favorite currency pairs:

 *Add a button to save the currently selected currency pair as a favorite.
 *When the button is clicked, store the selected currency pair using Sequelize.
 *Use express to server the static HTML pages and css and the APP to handle your db calls.

 *Have express run on npm start. 

 *Use an express app to hold the DB and have your sequelize there and just call the express api to fetch and create data into the db.
 *Display a list of the user's saved favorite currency pairs in a dedicated section.
 *Allow users to access their favorite currency pairs for quick conversion by clicking on them, which should automatically update the base 
 and target currency dropdown menus to the selected favorite pair.
 Example 1: ["USD/EUR", "GBP/USD", "JPY/USD"]
 Example 2: ["EUR/GBP", "CAD/USD", "AUD/USD"]
 *The favorite currency pairs can be displayed as a list, with each item showing the base currency and target currency separated by a 
 forward slash. When the user clicks on a favorite currency pair, the base and target currency dropdown menus should automatically update to 
 the selected favorite pair.
 *As an example of how that would look, each favorite currency pair can be displayed as a button within a list item, allowing users to click 
 on them to update the base and target currency dropdown menus accordingly.
 *Alternatively, you can create another drop-down list that does the same thing. 
 *You might also have to add some styling to this so that it is clear to the user how to use those.
4. Error handling:

 *Handle invalid input by providing informative error messages when users enter invalid amounts, such as negative numbers or non-numeric 
 characters.
 *Handle API-related errors, such as issues with fetching data or reaching request limits, by displaying an appropriate error message or 
 providing alternative data sources.
 *Manage edge cases, such as when the base and target currencies are the same, by providing an informative message or handling the situation 
 gracefully.
