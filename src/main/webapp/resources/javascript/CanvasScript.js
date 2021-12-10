let axis_separator_offset = 5;
let step = 50;
let canvasArray = document.getElementsByTagName("canvas")
let canvas = canvasArray[0];
let ctx = canvas.getContext("2d");
let pointsXArray;
let pointsYArray;
let pointsRArray;
let pointsHitArray;
canvas.width = 510;
canvas.height = 510;
let width = canvas.width;
let height = canvas.height;
let valueR = 1;

function updateR(){
    for (let i = 0; i < 6; i++){
        let path = "form:r:";
        path += i;
        if (document.getElementById(path).checked()){
            valueR = document.getElementById(path).value;
            return;
        }
    }
}

function loadCanvas(){
    pointsXArray = $("#point_x td").map(v => v.innerHTML);
    pointsYArray = $("#point_y td").map(v => v.innerHTML);
    pointsRArray = $("#point_r td").map(v => v.innerHTML);
    pointsHitArray = $("#point_hit td").map(v => v.innerHTML);
    updateR();
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
    ctx.moveTo((width / 2) + rValue / 2, height / 2);
    ctx.lineTo(width / 2, height / 2 + rValue);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
}

function drawCircle(rValue) {
    ctx.beginPath();
    ctx.fillStyle = '#FF7400';
    ctx.strokeStyle = '#FF7400';
    ctx.arc(width / 2, height / 2, rValue, Math.PI, 3 * Math.PI / 2);
    ctx.lineTo(width / 2, height / 2)
    ctx.fill();
    ctx.stroke();
}

function drawRectangle(rValue) {
    ctx.fillStyle = '#FF7400';
    ctx.strokeStyle = '#FF7400';
    ctx.beginPath();
    ctx.fillRect(width / 2, height / 2, rValue / 2, -rValue);
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
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    drawPoints();
}

function drawPoints() {
    for (let i = 0; i < pointsXArray.length; i++) {
        if (pointsRArray[i] === valueR.value)
            drawPoint(pointsXArray[i], pointsYArray[i]);
    }
}

function drawPoint(x, y) {
    let pointColor;
    pointColor = '#06266F';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + x * step, canvas.height / 2 - y * step, axis_separator_offset, 0, Math.PI * 2);
    ctx.fillStyle = pointColor;
    ctx.strokeStyle = pointColor;
    ctx.fill();
    ctx.stroke();
}

window.onload = loadCanvas();