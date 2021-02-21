const showImage = (blocksSelector) => {
    const blocks = document.querySelectorAll(blocksSelector);

    blocks.forEach(block => {
        const img = block.querySelector('img');
            

        block.addEventListener('mouseover', () => {
            img.src = img.src.slice(0, -4) + '-1.png';
            
            block.querySelectorAll(`.${block.className} p:not(.sizes-hit)`).forEach(p => p.style.display = 'none')
        });

        block.addEventListener('mouseout', () => {
            img.src = img.src.slice(0, -6) + '.png';

            block.querySelectorAll('p:not(.sizes-hit)').forEach(p => p.style.display = 'block')
        });
    })
}

export default showImage