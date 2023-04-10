//rgb values
const colors = {
    "neutral": [255, 255, 255],
    "happy": [252, 186, 3],
    "angry": [214, 93, 56],
    "sad": [62, 188, 230],
    "fearful": [235, 180, 99],
    "disgusted": [140, 209, 146],
    "surprised": [167, 116, 212]
};

//responsible for changing background color depending on current facial expression
function colorChanger() {
    //pull label from html
    const label = document.querySelector('#label');

    //determine current color
    const facialExpression = label.innerHTML.toLowerCase();
    const color = colors[facialExpression];

    //default background
    if (!color) {
        color = colors["neutral"];
    }

    //converts rgb values into a string for css animation
    const rgbString = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    //css gradual animation from old background to new one
    document.body.style.transition = `background-color ${1000}ms ease`;
    document.body.style.backgroundColor = rgbString;
}
  
//called on load and any time innerHTML of label changes
colorChanger();
document.querySelector('#label').addEventListener('DOMSubtreeModified', colorChanger);