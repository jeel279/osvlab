var myChart;
document.getElementById('calc').addEventListener('click',function (){
    if(myChart!=undefined) myChart.destroy();
    var head = parseInt(document.getElementById('head').value);
    var size = parseInt(document.getElementById('disk_size').value);
    var track = document.getElementById('track').value.split(' ');
    var dir = (document.querySelector( 'input[name="direction"]:checked').value=="left") ? true : false;
    var tmp = Array();
    for(var i=0;i<track.length;i++){
        tmp.push(parseInt(track[i]));
    }
    tmp.push(head);
    var otrack = Array();
    var seek=0;
    if(dir){
        tmp.push(0);
        tmp.sort(function (a,b){
            return a-b;
        });
        if(tmp[tmp.length-1]>=size){
            error();
            return;
        }

        var start = tmp.indexOf(head);

        for(var i=start;i>0;i--){
            seek+=tmp[i] - tmp[i-1];
            otrack.push(tmp[i]);
        }
        tmp[start]=0;
        otrack.push(0);
        for(var i=start;i<tmp.length-1;i++){
            seek+=tmp[i+1]-tmp[i];
            otrack.push(tmp[i+1]);
        }

    }else{
        tmp.push(size-1);
        tmp.sort(function (a,b){
            return a-b;
        });
        if(tmp[tmp.length-1]>=size){
            error();
            return;
        }
        var start = tmp.indexOf(head);

        for(var i=start;i<tmp.length-1;i++){
            seek+=tmp[i+1]-tmp[i];
            otrack.push(tmp[i]);
        }
        tmp[start]=size-1;
        otrack.push(size-1);
        for(var i=start;i>0;i--){
            seek+=tmp[i] - tmp[i-1];
            otrack.push(tmp[i-1]);
        }
    }
    var str="<b style=\"color:#345F90\">Seek Sequence: </b>"+otrack.join(" ")+"<br>"+"<b style=\"color:#345F90\">Total number of seek operations: </b>"+seek;

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
    for(var k=0;k<tmp.length;k++) tempL.push(k);
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
                    'rgba(153, 102, 2515, 1)',
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