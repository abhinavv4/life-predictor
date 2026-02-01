# Expense Tracker

A comprehensive web application designed to help users track daily expenses, manage budgets, and visualize spending habits through an intuitive interface.

## 🚀 Features

- **Expense Logging**: Add transactions with descriptions, amounts, categories (Food, Transport, Utilities, Entertainment, Other), and custom dates.
- **Budget Management**: Set a specific budget limit. The app provides visual alerts showing remaining funds or the amount exceeded.
- **Visual Analytics**: Includes a dynamic Doughnut chart (powered by Chart.js) to visualize spending breakdown by category.
- **Data Persistence**: All data (transactions, budget, and theme preference) is saved to the browser's Local Storage, ensuring data remains available after refreshing.
- **CSV Export**: Easily export your entire transaction history to a `.csv` file for external analysis.
- **Dark/Light Mode**: Built-in theme toggler to switch between dark and light visual modes.
- **Transaction History**: View a list of past transactions with the ability to delete individual entries.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Styling and layout (assumed `style.css`).
- **JavaScript (ES6+)**: Core logic for DOM manipulation, state management, and local storage integration.
- **Chart.js**: For rendering the expense breakdown chart.
- **Font Awesome**: For UI icons.
- **Google Fonts**: Uses the 'Poppins' font family.

## 📖 How to Run

1. Ensure the following files are in the same directory:
   - `index.html`
   - `script.js`
   - `style.css`
2. Open `index.html` in any modern web browser.
3. Start tracking your expenses!

## 📂 Project Structure

```text
├── index.html      # Main HTML structure
├── script.js       # Application logic (Add/Remove items, Chart updates, Local Storage)
├── style.css       # Stylesheet
└── README.md       # Project documentation
```

## 📝 Usage Tips

- **Setting a Budget**: Enter a number in the "Budget Limit" input field. The alert text below the total will update automatically.
- **Exporting**: Click the "Export to CSV" button in the History section to download your data.
- **Deleting**: Click the 'x' button next to any transaction in the history list to remove it.
