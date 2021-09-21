var myChart;

document.getElementById('calc').addEventListener('click',function (){
    if(myChart!=undefined) myChart.destroy();
    var track = document.getElementById('track').value.split(' ');
    var head = document.getElementById('head').value;
    var seek = 0;
    for(var i=0;i<track.length;i++){
        seek+=Math.abs(track[i]-head);
        head = track[i];
    }
    head = document.getElementById('head').value;
    var str = "<b class='clr'>Seek Sequence: </b>"+head+" ";
    for(var k in track){
        str+=track[k]+" ";
    }
    str+="<br><b class='clr'>Total number of seek operations: </b>"+seek+"<br>";
    track.unshift(head);
    document.getElementById('res').innerHTML = str;
    var ctx = document.getElementById('myChart').getContext('2d');
    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / track.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    };
    var tempL = Array();
    for(var k=0;k<track.length;k++) tempL.push(k);
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tempL,
            datasets: [{
                label: 'Position',
                data: track,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation,
            interaction: {
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    myChart.resize(250, 600);
});