function curvedArrow(options) {
    
    var ctx = options.ctx;

    var startPointX = options.p0x;
    var startPointY = options.p0y;

    var quadPointX = options.p1x;
    var quadPointY = options.p1y;

    var endPointX = options.p2x;
    var endPointY = options.p2y;

    var ctx = options.ctx;

    ctx.strokeStyle = options.color;
    ctx.lineWidth = 3;

    var arrowAngle = Math.atan2(quadPointX - endPointX, quadPointY - endPointY) + Math.PI;
    var arrowWidth = 20;

    ctx.beginPath();
    ctx.moveTo(startPointX, startPointY);

    //ctx.quadraticCurveTo(quadPointX, quadPointY, endPointX, endPointY);
    //ctx.lineTo(endPointX, endPointY);

    ctx.moveTo(startPointX - (arrowWidth * Math.sin(arrowAngle - Math.PI / 4.5)), 
               startPointY - (arrowWidth * Math.cos(arrowAngle - Math.PI / 4.5)));

    ctx.lineTo(startPointX, startPointY);

    ctx.lineTo(startPointX - (arrowWidth * Math.sin(arrowAngle + Math.PI / 4.5)), startPointY - (arrowWidth * Math.cos(arrowAngle + Math.PI / 4.5)));

    ctx.stroke();
    ctx.closePath();
}

