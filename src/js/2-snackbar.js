import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const formEl = document.querySelector('.form');
const inptElemMs = formEl.querySelector('input[name="delay"]');

formEl.addEventListener('submit', e => {
    e.preventDefault();
    
    const delayValue = inptElemMs.value;
    // Використовуємо оператор об'єктної властивості, це дозволяє уникнути помилок,якщо елемент не знайдено
    const state = formEl.querySelector("input[name='state']:checked")?.value;
    // створення обіцянки
    new Promise((resolve, reject) => setTimeout(() => {
        state === "fulfilled" ? resolve(delayValue) : reject(delayValue);
    }, delayValue))
        // Коли дiя промісу успiшниа в (resolved) передаюсться в обробник (then) буде викликаний i виконаний.
    .then(delay => {
        iziToast.success({
            title: 'OK',
            titleColor: '#fff',
            message: `✅ Fulfilled promise in ${delay} ms`,
            messageColor: '#fff',
            backgroundColor:'#59a10d',
            position: "topRight",
            theme: 'dark'
        });
    })
        // Помилки, які виникають (rejected) передаюсться в обробник (catch) буде викликаний i виконаний.
    .catch(delay => {
        iziToast.error({
            title: 'Error',
            titleColor: '#fff',
            message: `❌ Rejected promise in ${delay} ms`,
            messageColor: '#fff',
            backgroundColor:'#ef4040',
            position: "topRight",
            theme: 'dark'
        });
    });
});