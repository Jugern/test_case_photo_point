function addItems(list, data){
    var newItem = document.createElement("li");
    newItem.className = "list-group-item";
    newItem.innerText = data;
    list.insertBefore(newItem, list.firstChild);
    return list
}

function delItems(items, list) {
    // Проверяем количество строк
    while (items.length > 10) {
        list.removeChild(items[10]);
    }
}

function addNull(number_old) {
    if (number_old < 10) {
        return number_new = '0' + number_old
    }
    return number_old
}

function dateUnix(second) {
    var date = new Date(second);
    var year = date.getFullYear();
    var month = addNull(date.getMonth() + 1);
    var day = addNull(date.getDate());
    var hours = addNull(date.getHours());
    var minutes = addNull(date.getMinutes());
    var seconds = addNull(date.getSeconds());

    return formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

function sendRequest() {
    var list = document.getElementById("list-usd-rub");
    var items = list.getElementsByTagName("li");

    // Отправляем запрос в Тинькоф
    fetch('https://api.tinkoff.ru/v1/currency_rates?from=USD&to=RUB')
        .then(response => response.json())
        .then(data => {
            let date = dateUnix(data['payload']['lastUpdate']['milliseconds']);
            let buyDollars = data['payload']['rates'][0]['buy'];
            let sellDollars = data['payload']['rates'][0]['sell'];
            let dict = {
                date: date,
                buy: buyDollars,
                sell: sellDollars,
            }
            addItems(list, JSON.stringify(dict));
            delItems(items, list);
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    sendRequest();
    setInterval(sendRequest, 9000);
});