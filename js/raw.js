function fcfs(track,head){
    var seek = 0;
    for(var i=0;i<track.length;i++){
        seek+=Math.abs(track[i]-head);
        head = track[i];
    }
    return seek;
}

function sstf(track,head){
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
    for(var i=0;i<k;i++){
        var start = tracktmp.indexOf(head);
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
    return seek;
}

function scan(track,head,size,dir){
    var tmp = Array();
    for(var i=0;i<track.length;i++){
        tmp.push(parseInt(track[i]));
    }
    tmp.push(head);
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
        }
        tmp[start]=0;
        for(var i=start;i<tmp.length-1;i++){
            seek+=tmp[i+1]-tmp[i];
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
        }
        tmp[start]=size-1;
        for(var i=start;i>0;i--){
            seek+=tmp[i] - tmp[i-1];
        }
    }
    return seek;
}

function cscan(track,head,size,dir){
    var tmp = Array();
    for(var i=0;i<track.length;i++){
        tmp.push(parseInt(track[i]));
    }

    tmp.push(head);
    tmp.sort((a,b)=>{
        return a-b;
    });

    if(tmp[tmp.length-1]>=size){
        error();
        return;
    }
    if(tmp[tmp.length-1]!=size-1) tmp.push(size-1);
    if(tmp[0]!=0) tmp.unshift(0);

    var start = tmp.indexOf(head);
    var seek=0;
    if(dir){
        for(var i=start;i>0;i--){
            seek+=tmp[i] - tmp[i-1];
        }
        seek+=size-1;
        for(var i=tmp.length-2;i>start+1;i--){
            seek+=tmp[i+1] - tmp[i];
        }
    }else{
        for(var i=start;i<tmp.length-1;i++){
            seek+=tmp[i+1] - tmp[i];
        }
        seek+=size-1;
        for(var i=1;i<start;i++){
            seek+=tmp[i]-tmp[i-1];
        }
    }
    return seek;
}

function look(track,head,size,dir){
    var tmp = Array();
    for(var i=0;i<track.length;i++){
        tmp.push(parseInt(track[i]));
    }
    tmp.push(head);
    var seek=0;
    if(dir){
        tmp.sort(function (a,b){
            return a-b;
        });
        var start = tmp.indexOf(head);

        for(var i=start;i>0;i--){
            seek+=tmp[i] - tmp[i-1];
        }
        tmp[start]=tmp[0];
        for(var i=start;i<tmp.length-1;i++){
            seek+=tmp[i+1]-tmp[i];
        }

    }else{

        tmp.sort(function (a,b){
            return a-b;
        });
        var start = tmp.indexOf(head);

        for(var i=start;i<tmp.length-1;i++){
            seek+=tmp[i+1]-tmp[i];
        }
        tmp[start]=tmp[tmp.length-1];
        for(var i=start;i>0;i--){
            seek+=tmp[i] - tmp[i-1];
        }
    }
    return seek;
}

function clook(track,head,size,dir){
    var tmp = Array();
    for (var i = 0; i < track.length; i++) {
        tmp.push(parseInt(track[i]));
    }

    tmp.push(head);
    tmp.sort((a, b) => {
        return a - b;
    });


    var otrack = Array();
    var start = tmp.indexOf(head);
    var seek = 0;
    if (dir) {
        for(var i = start;i>0;i--) {
            seek+=tmp[i]-tmp[i-1];
            otrack.push(tmp[i]);
        }
        otrack.push(tmp[0]);
        seek+=tmp[tmp.length-1] - tmp[0];
        otrack.push(tmp[tmp.length-1]);
        for(var i=track.length-1;i>start+1;i--){
            seek+=tmp[i+1]-tmp[i];
            otrack.push(tmp[i]);
        }
    } else {
        for (var i = start; i < tmp.length - 1; i++) {
            seek += tmp[i + 1] - tmp[i];
            otrack.push(tmp[i]);
        }
        otrack.push(tmp[tmp.length-1]);
        seek+=tmp[tmp.length-1]-tmp[0];
        otrack.push(tmp[0]);
        for (var i = 1; i < start; i++) {
            seek += tmp[i] - tmp[i - 1];
            otrack.push(tmp[i]);
        }
    }
    return seek;
}

document.getElementById('analy').addEventListener('click',function () {
    var track_str = document.getElementById("track").value;
    var head = parseInt(document.getElementById("head").value);
    var size = parseInt(document.getElementById("disk_size").value);
    var track = track_str.split(" ");
    var dir = {
        scan: (document.querySelector('input[name="direction_scan"]:checked').value == "left") ? true : false,
        cscan: (document.querySelector('input[name="direction_cscan"]:checked').value == "left") ? true : false,
        look: (document.querySelector('input[name="direction_look"]:checked').value == "left") ? true : false,
        clook: (document.querySelector('input[name="direction_clook"]:checked').value == "left") ? true : false
    }

    var ans = {
        fcfs: fcfs(track, head),
        sstf: sstf(track, head),
        scan: scan(track, head, size, dir.scan),
        cscan: cscan(track, head, size, dir.cscan),
        look: look(track, head, size, dir.look),
        clook: clook(track, head, size, dir.clook)
    }

var out = [[ans.fcfs,"FCFS"],[ans.sstf,"SSTF"],[ans.scan,"SCAN"],[ans.cscan,"CSCAN"],[ans.look,"LOOK"],[ans.clook,"CLOOK"]]

    out.sort(function (a,b){
        return a[0] - b[0];
    })
    var str = "<table class=\"rwd-table\">\n" +
        "  <tr>\n" +
        "    <th>Algorithm</th>\n" +
        "    <th>Seek Count</th>\n" +
        "  </tr>";
    for(var i=0;i<out.length;i++){
        str += "  <tr>\n" +
            "    <td data-th=\"Algorithm\">"+out[i][1]+"</td>\n" +
            "    <td data-th=\"Seek Count\">"+out[i][0]+"</td>\n" +
            "  </tr>";
    }
    str+="</table>";
    document.getElementById("res").innerHTML = str;
});
