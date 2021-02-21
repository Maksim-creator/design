const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no');
    
    const typeFilter = (markType) => {
        markAll.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('animated', 'fadeIn')
        })

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if(markType){
            markType.forEach(item => {
                item.style.display = 'block';
                item.classList.add('animated', 'fadeIn')
            })
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    }

    const filterAll =(one, two, three=false) => {
        const btn = menu.querySelector(one);
        
        if (three) {
            btn.addEventListener('click', ()=> {
                typeFilter(wrapper.querySelectorAll(two));
            });
        } else {
            btn.addEventListener('click', ()=> {
                typeFilter();
            });
        }
    };
 
    filterAll('.all','.all', true);
    filterAll('.lovers','.lovers', true);
    filterAll('.chef','.chef', true);
    filterAll('.girl','.girl', true);
    filterAll('.guy','.guy', true);
    filterAll('.grandmother');
    filterAll('.granddad');

    menu.addEventListener('click', (e) => {
        const target = e.target;

        let btnClass = target.className;

        if(target && target.tagName === 'LI'){
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active')
        }
    })
}

export default filter