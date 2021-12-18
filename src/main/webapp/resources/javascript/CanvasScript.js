let axis_separator_offset = 5;
let step = 50;
let canvasArray = document.getElementsByTagName("canvas")
let canvas = canvasArray[0];
let ctx = canvas.getContext("2d");
canvas.width = 510;
canvas.height = 510;
let width = canvas.width;
let height = canvas.height;
let valueR = 1;
canvas.addEventListener('mousedown', event => clickOnCanvas(canvas, event));

function clickOnCanvas(canvas, event) {
    let rect = canvas.getBoundingClientRect()
    let width = canvas.width;
    let height = canvas.height;
    let x = (event.clientX - rect.left - width / 2) / step;
    let y = (height / 2 - event.clientY + rect.top) / step;
    x = x.toFixed(2).replace(".00", "");
    y = y.toFixed(2).replace(".00", "");
    let r = valueR;
    console.log(x, y, r);
    if (isLegal(x, y, r)) {
        $('input[name="form:x_input"]').val(x);
        $('.textY').val(y);
        $('.submit').click();
    }
}

function isLegal(x, y, r) {
    return (isNumber(x) && isNumber(y) && isNumber(r) &&
        x >= -3 && x <= 3 && y > -3 && y < 5 && r >= 1 && r <= 3);
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function updateR(){
    valueR = $('input[name="form:r"]:checked').val();
}

function loadCanvas(){
    clearCanvas();
    updateR();
    if (valueR === undefined || valueR > 3 || valueR < 1){
        valueR = 1.0;
    }
    drawCanvas();
}

function drawCanvas() {
    let valR = valueR * step;
    ctx.globalAlpha = 1;
    drawRectangle(valR);
    drawTriangle(valR);
    drawCircle(valR);
    drawAXIS();
    drawPoints();
}

function drawTriangle(rValue) {
    ctx.fillStyle = '#FF7400';
    ctx.beginPath();
    ctx.moveTo((width / 2) - rValue, height / 2);
    ctx.lineTo(width / 2, height / 2 - rValue / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
}

function drawCircle(rValue) {
    ctx.beginPath();
    ctx.fillStyle = '#FF7400';
    ctx.strokeStyle = '#FF7400';
    ctx.arc(width / 2, height / 2, rValue, Math.PI / 2, Math.PI);
    ctx.lineTo(width / 2, height / 2)
    ctx.fill();
    ctx.stroke();
}

function drawRectangle(rValue) {
    ctx.fillStyle = '#FF7400';
    ctx.strokeStyle = '#FF7400';
    ctx.beginPath();
    ctx.fillRect(width / 2, height / 2, rValue, rValue / 2);
}

function drawAXIS() {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.strokeText("Y", 240, 10);
    ctx.strokeText("X", 500, height / 2 - 10);
    ctx.stroke();
    for (let i = -5; i <= 5; i++) {
        ctx.beginPath();
        let x = width / 2 + step * i;
        ctx.moveTo(x, height / 2 + axis_separator_offset);
        ctx.lineTo(x, height / 2 - axis_separator_offset);
        if (i !== 0) {
            ctx.fillText(i.toString(), x - axis_separator_offset / 2, height / 2 + 3 * axis_separator_offset);
        }
        ctx.stroke();
    }

    for (let i = -5; i <= 5; i++) {
        ctx.beginPath();
        let y = height / 2 + step * i;
        ctx.moveTo(width / 2 + axis_separator_offset, y);
        ctx.lineTo(width / 2 - axis_separator_offset, y);
        if (i !== 0) {
            ctx.fillText((-i).toString(), width / 2 + axis_separator_offset, y + axis_separator_offset);
        }
        ctx.stroke();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPoints() {
    let pointsTable = document.getElementsByClassName("result_table")[0];
    if (pointsTable) {
        let rows = pointsTable.tBodies[0].rows;
        for (let i = 0; i < rows.length; i++) {
            let columns = rows[i].children;
            drawPoint(
                columns[0].textContent,
                columns[1].textContent,
                columns[2].textContent,
                columns[3].textContent
            );
        }
    }
}

function drawPoint(x, y, r, hit) {
    if (Number(r) === Number(valueR)){
        let pointColor;
        if (hit === "true")
            pointColor = '#00ff0b';
        else pointColor = '#ff0000';
        ctx.beginPath();
        ctx.arc(canvas.width / 2 + x * step, canvas.height / 2 - y * step, axis_separator_offset, 0, Math.PI * 2);
        ctx.fillStyle = pointColor;
        ctx.strokeStyle = pointColor;
        ctx.fill();
        ctx.stroke();
    }
}

window.onload = loadCanvas;