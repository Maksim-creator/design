import {getData} from '../services/requests';

const showMoreStyles = (trigger) => {
    const btn = document.querySelector(trigger);

    btn.addEventListener('click', function() {
        getData('http://localhost:3000/styles')
            .then(styles => styles.forEach(style => {
                const {src, title, link} = style

                let res = document.createElement('div');
                res.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp')

                res.innerHTML = `
                    <div class=styles-block>
                        <img src=${src} alt="1">
                        <h4>${title}</h4>
                        <a href="${link}">Подробнее</a>
                    </div>
                `

                document.querySelector('#styles .row').append(res);

                this.remove()
            }))
    })
}

export default showMoreStyles;