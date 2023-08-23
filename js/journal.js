journalist = window.location.href.split("/");
journalist = journalist[journalist.length-2].split("-");
journalist = journalist[0].charAt(0).toUpperCase() + journalist[0].slice(1) + " " + journalist[1].charAt(0).toUpperCase() + journalist[1].slice(1);
limit = 0;

document.title = journalist + " | The Pauper's Post";

document.getElementById("jName").innerHTML = journalist;

window.onresize = function() {
    resize();
}

if (screen.width < 640) {
    mobile = true;
    document.getElementById("title-pic").style.width = "80%";
    document.getElementById("parent-info").style.width = "90%";
    document.getElementById("news-cont").style.width = "100%";
} else {
    mobile = false;
}
resize();
grabNews();

function grabNews() {
    url = "../../php/news.php?mod=journal&author=" + journalist + "&num=" + limit + "&ord=id&dis=DESC";
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            wnews = JSON.parse(d);
            week(wnews);
            
            limit += wnews.length;
        }
    });
}


function calcTime(d, time) {
    timeYear = Math.floor(((d.getTime() / 1000) - time)/60/60/24/7/52);
    timeMonth = Math.floor(((d.getTime() / 1000) - time)/60/60/24/30);
    timeWeek = Math.floor(((d.getTime() / 1000) - time)/60/60/24/7);
    timeDay = Math.floor(((d.getTime() / 1000) - time)/60/60/24);
    timeHour = Math.floor(((d.getTime() / 1000) - time)/60/60);
    timeMin = Math.floor(((d.getTime() / 1000) - time)/60);
    timeSec = Math.floor(((d.getTime() / 1000) - time));
    if (timeSec < 60) {
        timeString = timeSec + "s";
    } else if (timeMin < 60) {
        timeString = timeMin + "m";
    } else if (timeHour < 24) {
        timeString = timeHour + "h";
    } else if (timeDay < 7) {
        timeString = timeDay + "d";
    } else if (timeDay < 30) {
        timeString = timeWeek + "w";
    } else if (timeMonth < 12) {
        timeString = timeMonth + "m";
    } else {
        timeString = timeYear + "y";
    }
    
    return timeString;
}

function week(news) {
    if (news.length > 0) {
        var d = new Date();
        for (var i=0; i<news.length; i++) {
            div = document.createElement("div");
            div.className = "new-cont";
            div.style = "display: block; margin-bottom: 20px; position: relative; overflow: auto;";

            img = document.createElement("img");
            img.src = "../../res/leads/" + news[i].img;
            img.style = "cursor: pointer";
            img.id = news[i].id;
            img.onclick = function() {
                window.location = "../../news/" + this.id + "/";
            }
            
            littleTagList = JSON.parse(news[i].tags.split("'").join('"'))
            littleTags = document.createElement("div");
            littleTags.style = "position: absolute; top: 5px; left: 0px;";
            for (var j=0; j<littleTagList.length; j++) {
                p = document.createElement("p");
                p.className = "tag";
                p.style = "margin: 5px 0px 0px 10px; width: auto; font-size: 13px; padding: 3px 5px; color: white; border-radius: 3px; font-family: monospace; max-width: auto;";
                p.style.backgroundColor = littleTagList[j].color;
                p.innerHTML = littleTagList[j].tag;

                littleTags.appendChild(p);
            }
            
            p = document.createElement("p");
            p.innerHTML = news[i].headline;

            date = document.createElement("span");
            date.style = "color: grey; font-size: 15px; display: inline; font-weight: 100;";
            date.innerHTML = "<br>By " + news[i].author + "&emsp;" + calcTime(new Date(), news[i].time);

            div.appendChild(img);
            div.appendChild(littleTags);
            p.appendChild(date);
            div.appendChild(p);

            if (mobile == true) {
                img.style.width = "100%";
                p.style.width = "100%";
            }

            document.getElementById("news-cont").appendChild(div);

        }
    }
}

function resize() {
    if (mobile == true) {
        document.getElementById("title-pic").style.width = "80%";
        document.getElementById("title-pic").style.marginTop = "30px";
        document.getElementById("sub-title").style.marginTop = "0px";
        document.getElementById("news-form").style.width = "100%";
        
        document.getElementById("small-div-1").style.width = "100%";
        document.getElementById("small-div-2").style.width = "100%";
        document.getElementById("ref-div").style.height = "560px";
        document.getElementById("ref-div").style.width = "100%";
        infobox = document.getElementsByClassName("info-box");
        for (var i=0; i<infobox.length; i++) {
            infobox[i].style.width = "100%";
        }
    } else if (mobile == false) {
        
        if (window.innerWidth < screen.width*0.4) {
            document.getElementById("parent-info").style.width = "100%";
            document.getElementById("news-cont").style.width = "95%";
            
            document.getElementById("small-div-1").style.width = "100%";
            document.getElementById("small-div-2").style.width = "100%";
            document.getElementById("ref-div").style.height = "560px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "100%";
            }
        } else if (window.innerWidth < screen.width*0.7) {
            document.getElementById("parent-info").style.width = "80%";
            document.getElementById("news-cont").style.width = "85%";
            
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
        } else if (window.innerWidth > screen.width*0.7) {
            document.getElementById("parent-info").style.width = "60%";
            document.getElementById("news-cont").style.width = "85%";
            
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "80%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
        }
    }
}