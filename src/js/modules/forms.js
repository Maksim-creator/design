import {postData} from '../services/requests';

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('inpit'),
        upload = document.querySelectorAll('[name="upload"]');
        
        
    const message = {
        success: 'Отлично! Мы с вами свяжемся!',
        loading: 'Обработка данных...',
        failed: 'Что-то пошло не так',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
        spinner: 'assets/img/spinner.gif'
    };

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = ''
        })

        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        })
    }

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots, arr = item.files[0].name.split('.');
            arr[0].length > 5 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0,6) + dots + arr[1];

            item.previousElementSibling.textContent = name;
        })
    })

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let resultMessage = document.createElement('div');
            resultMessage.classList.add('status');
            item.parentNode.appendChild(resultMessage);

            item.classList.add('animated', 'fadeOutDown');
            setTimeout(() => {
                item.style.display = 'none'
            }, 400);

            let resultImg = document.createElement('img');
            resultImg.setAttribute('src', message.spinner);
            resultImg.classList.add('animated', 'fadeInUp');
            resultMessage.appendChild(resultImg);

            let resultText = document.createElement('div');
            resultText.classList.add('animated', 'fadeInUp');
            resultText.textContent = message.loading;
            resultMessage.appendChild(resultText)

            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('form_calc')  ? api = path.designer : api = path.question;

            postData(api, formData)
                .then((res) => {
                    resultImg.setAttribute('src', message.ok);
                    resultText.textContent = message.success                    
                })
                .catch(err => {
                    resultImg.setAttribute('src', message.fail)
                    resultText.textContent = message.failed
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        resultMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutDown');
                        item.classList.add('fadeInUp');
                        clearInputs();
                    }, 4000);
                })   
        })
    })
    
}

export default forms;