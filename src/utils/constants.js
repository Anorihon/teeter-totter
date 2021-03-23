import helpers from "./helpers";

export const SHAPES = Object.freeze({
    square: 1,
    triangle: 2,
    circle: 3
});
export const WEIGHT = Object.freeze({
    min: 1,
    max: 10,
});
export const SHAPE = () => {
    const SHAPES_KEYS = Object.keys(SHAPES);

    return {
        id: Date.now().toString(),
        type: SHAPES[SHAPES_KEYS[helpers.getRandomInt(0, SHAPES_KEYS.length)]],
        weight: helpers.getRandomInt(WEIGHT.min, WEIGHT.max + 1),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16), // taked from here https://css-tricks.com/snippets/javascript/random-hex-color/
        column: helpers.getRandomInt(0, 4),
    }
}