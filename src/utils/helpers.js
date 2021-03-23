const helpers = {
    getRandomInt: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    },
    shuffle: array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

            // поменять элементы местами
            // мы используем для этого синтаксис "деструктурирующее присваивание"
            // то же самое можно записать как:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
};

export default helpers;