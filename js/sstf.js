var myChart;

document.getElementById('calc').addEventListener('click',function (){
    if(myChart!=undefined) myChart.destroy();
    var head = parseInt(document.getElementById('head').value);
    var track = document.getElementById('track').value.split(' ');
    track.push(head);
    var tracktmp = Array();
    for(var i=0;i<track.length;i++){
        tracktmp.push(parseInt(track[i]));
    }
    tracktmp.sort(function(a,b){
        return a-b;
    });
    var k=track.length;
    var seek=0;
    var otrack = Array();
    for(var i=0;i<k;i++){
        var start = tracktmp.indexOf(head);
        otrack.push(head);
        if(start==0) head = tracktmp[start+1];
        else if(start==tracktmp.length-1) head = tracktmp[start-1];
        else{
            var r = Math.abs(tracktmp[start]-tracktmp[start+1]);
            var l = Math.abs(tracktmp[start]-tracktmp[start-1]);
            if(r>=l){
                head = tracktmp[start-1];
            }else{
                head = tracktmp[start+1];
            }
        }
        if(i<k-1) seek+=Math.abs(head-tracktmp[start]);
        tracktmp.splice(start,1);
    }
    var str="<b style=\"color:#345F90">Total number of seek operations: </b>"+otrack.join(" ")+"<br>"+"<b style=\"color:#345F90\">Seek Sequence: </b>"+seek;

    document.getElementById('res').innerHTML = str;
    document.getElementById('myChart').innerHTML = "";
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
    for(var k=1;k<=track.length;k++) tempL.push(k);
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tempL,
            datasets: [{
                label: 'Position',
                data: otrack,
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


