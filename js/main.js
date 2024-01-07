'use strict';

let startBtn = document.querySelector('#start');
let budgetValue = document.querySelector('.budget-value');
let dayBudgetValue = document.querySelector('.daybudget-value');
let levelValue = document.querySelector('.level-value');
let expensesValue = document.querySelector('.expenses-value');
let optionalExpensesValue = document.querySelector('.optionalexpenses-value');
let incomeValue = document.querySelector('.income-value');
let monthSavingsValue = document.querySelector('.monthsavings-value');
let yearSavingsValue = document.querySelector('.yearsavings-value');
let expensesItems = document.querySelectorAll('.expenses-item');
let expensesBtn = document.querySelectorAll('button')[0];
let optionalExpensesBtn = document.querySelectorAll('button')[1];
let countBtn = document.querySelectorAll('button')[2];
let optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item');
let chooseIncome = document.querySelector('.choose-income');
let savingsCheckbox = document.querySelector('#savings');
let sumValue = document.querySelector('#sum');
let percentValue = document.querySelector('#percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

let money, time, sum;



startBtn.addEventListener('click', function() {
    expensesBtn.removeAttribute('disabled');
    optionalExpensesBtn.removeAttribute('disabled');
    countBtn.removeAttribute('disabled');

    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});


    

expensesBtn.addEventListener('click', function() {
    sum = 0;

    for (let i = 0; i < expensesItems.length; i++) {
        let a = expensesItems[i].value,
            b = expensesItems[++i].value;
    
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }
    expensesValue.textContent = sum;
});




optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i <= optionalExpensesItems.length; i++) {
        let opt = optionalExpensesItems[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + " "; 
    }
});




countBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - sum) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        } else {
            levelValue.textContent = "Ошибочка...!";
        }
    } else {
        dayBudgetValue.textContent = "Произошла ошибка!";
    } 
});




chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});




savingsCheckbox.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
}); 




sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});




let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

// for (let key in appData) {
//     console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
// };