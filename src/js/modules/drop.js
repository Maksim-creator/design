import {postData} from '../services/requests';

const drop = () => {
    console.log(1);
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            
            input.addEventListener(eventName, preventDefaults, false)
        })
    })

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropogation();
    }

    const highlight = (elem) => {
        elem.closest('.file_upload').style.border = '4px solid yellow';
        elem.closest('.file_upload').style.backgroundColor = 'red';
    }

    const unhighlight = (elem) => {
        elem.closest('.file_upload').style.border = 'none';
        elem.closest('.file_upload').style.backgroundColor = 'inherit';
    };

    const leave = ['dragleave', 'drop'],
        enter = ['dragenter', 'dragover'];

    leave.forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false)
        })
    })

    enter.forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false)
        })
    })

    fileInputs.forEach((input, i) => {
        input.addEventListener('drop', e => {
            input.files = e.dataTransfer.files

            if(i == 0){
                let formData = new FormData();
                formData.append('file', input.files[0]);

                postData('assets/server.php', formData)
                    .then(res => console.log(res))
                    .catch(e => console.log('ERRROR'))

                console.log(formData);
            }

            let dots, arr = input.files[0].name.split('.');
            arr[0].length > 5 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0,6) + dots + arr[1];

            input.previousElementSibling.textContent = name;
        })
    })
    
}

export default drop;