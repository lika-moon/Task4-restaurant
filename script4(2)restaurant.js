// (30) № 2 Задача: Система управления заказами в ресторане


//  Цель: создать систему для управления заказами в ресторане. Ваша задача - разработать функционал для
//     отслеживания заказов, учета запасов ингредиентов и обновления статуса заказов.
//  Базовые требования:
// У вас есть массив объектов ingredients, где каждый объект представляет ингредиент с полями: id (уникальный
//     идентификатор), name (название), и quantity (количество на складе).
//  Есть массив объектов dishes, где каждый объект содержит id (уникальный идентификатор), name (название
//     блюда), и ingredients (массив идентификаторов ингредиентов, необходимых для приготовления).
//  Есть массив объектов orders, где каждый объект содержит orderId (уникальный идентификатор заказа), dishId
//     (идентификатор заказанного блюда), и status (статус заказа, например, "новый", "в процессе", "готово",
//     "отменено").
//  Задачи: 
// 1. Проверка возможности приготовления блюда: Напишите функцию, которая принимает dishId и проверяет,
//     достаточно ли ингредиентов на складе для приготовления этого блюда. Функция должна возвращать true, если
//     блюдо можно приготовить, и false - в противном случае.
//  2. Обновление запасов ингредиентов: Разработайте функцию, которая обновляет количество ингредиентов на
//     складе после приготовления блюда.
//  3. Изменение статуса заказа: Создайте функцию, которая изменяет статус заказа в массиве orders на основе
//     переданного orderId и нового статуса.
//  4. Автоматическая обработка заказов: Напишите функцию, которая автоматически обрабатывает все новые заказы,
//     проверяя возможность их приготовления и, в случае возможности, обновляя запасы и статус заказа.
//  Пример данных:
// constingredients = [
//  { id: 1, name: "Томаты", quantity: 10 },
//  { id: 2, name: "Моцарелла", quantity: 5 },
//  { id: 3, name: "Базилик", quantity: 8 }
//  ];
//  const dishes = [
//  { id: 1, name: "Маргарита", ingredients: [1, 2, 3] }
//  ];
//  const orders = [
//  { orderId: 1, dishId: 1, status: "новый" }
//  ];

// Требования к выполнению:
//  Используйте циклы для обхода массивов.
// Примените условные конструкции для проверки наличия ингредиентов и изменения статусов заказов.
//  Управляйте объектами для обновления их состояния в соответствии с логикой приложения.



const ingredients = [ //id (уникальный  идентификатор), name (название), и quantity (количество на складе)
    { id: 1, name: "Томаты", quantity: 1 },
    { id: 2, name: "Моцарелла", quantity: 1 },
    { id: 3, name: "Базилик", quantity: 1 }
];

const dishes = [   //id (уникальный идентификатор), name (название блюда), 
    // и ingredients (массив идентификаторов ингредиентов, необходимых для приготовления)
    { id: 1, name: "Маргарита", ingredients: [1, 2, 3] }
];

const orders = [   //orderId (уникальный идентификатор заказа), dishId
    //(идентификатор заказанного блюда), и status (статус заказа, например, "новый", "в процессе", "готово","отменено").
    { orderId: 1, dishId: 1, status: "новый" }
];


function opportunityCook(dishId, dishes, ingredients) {
    //вытаскиваем массив с ингридиентами для определенного блюда
    let needIingridient = [];
    for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].id === dishId) {
            needIingridient = dishes[i].ingredients
            console.log(needIingridient)
        }
    }
    //вытаскиваем массив с остатками ингридиентов 
    let quantityIngredients = [];
    for (i = 0;i < ingredients.length; i++) {
        if (needIingridient.includes(ingredients[i].id)) {
            quantityIngredients.push(ingredients[i])
            console.log(quantityIngredients)
        }
    }
    //проверка что бы нужные элементы были больше нуля 0
        let needQuantity = quantityIngredients.every(ind => {
            return ind.quantity > 0;

        })
        console.log(needQuantity)
    }
opportunityCook( 1, dishes, ingredients);




// 2.	Обновление запасов ингредиентов: Разработайте функцию,
// которая обновляет количество ингредиентов на складе после приготовления блюда.

function stockUpdate(stat, orders, dishes, ingredients) {
    let statusNow = [];
    // проверяем соответствуют ли наши статусы

    for (let i = 0; i < orders.length; i++) {

        if (orders[i].status.includes(stat)) {
            statusNow.push(orders[i].status)
            console.log(statusNow);
        }
    }

    //находим массив с ингридиентами которые использовались для приготовления блюда
    let needIingridient = [];
    for (let i = 0; i < dishes.length && i < orders.length; i++) {
        if (dishes[i].id === orders[i].dishId) {
            needIingridient = dishes[i].ingredients
            console.log(needIingridient)
        }
    }

    ////вытаскиваем массив с остатками ингридиентов 
    let quantityIngredients = [];
    for (i = 0; i < ingredients.length; i++) {
        if (needIingridient.includes(ingredients[i].id)) {
            quantityIngredients.push(ingredients[i])
            console.log(quantityIngredients)
        }
    }
    //// удаляем израсходованные продукты из массива с остатками 

    let newMassIngridient = [];
    for (i = 0; i < quantityIngredients.length; i++) {
        newMassIngridient = quantityIngredients.map(function (elem) {
            return elem = elem.quantity - 1

        })
        console.log(newMassIngridient);
    }
}
stockUpdate("готово", orders, dishes, ingredients);

// 3. Изменение статуса заказа: Создайте функцию, которая изменяет статус заказа в массиве orders на основе
// переданного orderId и нового статуса.


function changeOrderStatus(ordersId, statusNew, orders) {
//находим по ordersId заказ в объекте orders
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].orderId === ordersId) {
            needOrder = orders[i].status
            console.log(needOrder)
        }
    }
// меняем статус на основе нового переданного
    for (i = 0; i < orders.length; i++) {
        orders.status = statusNew
        console.log(orders)
    }
}

changeOrderStatus(1, "в процессе", orders);


// 4. Автоматическая обработка заказов: Напишите функцию, которая автоматически обрабатывает все новые заказы,
// проверяя возможность их приготовления и, в случае возможности, обновляя запасы и статус заказа.

function orderProcessing(ordersId, statusNew, orders, dishes, ingredients) {
    let needOrder = [];
    //проверяем совпадение заданного и имеющегося id и на его основании выводим массив со статусом
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].orderId === ordersId) {
            needOrder = orders[i].status
            console.log(needOrder)
        }
    }
    // меняем статус на основе нового переданного

    for (i = 0; i < orders.length; i++) {
        orders.status === statusNew
        console.log(orders)
    }
    //вытаскиваем массив с ингридиентами для определенного блюда
    let needIingridient = [];
    for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].id === ordersId) {
            needIingridient = dishes[i].ingredients
            console.log(needIingridient)
        }
    }
    //вытаскиваем массив с остатками ингридиентов 
    let quantityIngredients = [];
    for (i = 0; i < ingredients.length; i++) {
        if (needIingridient.includes(ingredients[i].id)) {
            quantityIngredients.push(ingredients[i])
            console.log(quantityIngredients)
        }
    }
    //проверка что бы нужные элементы были больше нуля 0 нужно вывести статус впроцесс
    for (i = 0; i < quantityIngredients.length; i++) {
        let needQuantity = quantityIngredients.every(ind => {
            return ind.quantity > 0;

        })
        console.log(needQuantity)
    //проверяем если продуктов не хватает, то сделаем заказ отменен
    //если хватает, то в процессе
        if (needQuantity === false) {
            orders.status = 'отмена'
            console.log(orders.status)

        } else {
            orders.status = 'в процессе'
            console.log(orders.status)
        }
    }
    //// готовим и затем удаляем израсходованные продукты из массива с остатками,
    //меняем статус на готово

    let newMassIngridient = [];
    for (i = 0; i < quantityIngredients.length; i++) {
        newMassIngridient = quantityIngredients.map(function (elem) {
            return elem = elem.quantity - 1

        })
        if (newMassIngridient) {
            orders.status = 'готово'
        }
        console.log(orders.status);
    }
}

orderProcessing(1, "новый", orders, dishes, ingredients)
