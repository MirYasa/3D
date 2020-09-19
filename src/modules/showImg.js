const showImg = () => {
    const command = document.querySelector('.command');

    command.addEventListener(('mouseover'), (event) => {
        const target = event.target;
        let link;
        if (target.classList.contains('command__photo')) {
            link = target.src;
            target.src = target.dataset.img;
            target.dataset.img = link;
        }
    });

    command.addEventListener(('mouseout'), (event) => {
        const target = event.target;
        let link;
        if (target.classList.contains('command__photo')) {
            link = target.src;
            target.src = target.dataset.img;
            target.dataset.img = link;
        }
    });
};
export default showImg;