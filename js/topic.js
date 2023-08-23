topic = window.location.href.split("/");
topic = topic[topic.length-2];
topNum = 0;
featId = [];

window.onload = function() {
    if (screen.width < 640) {
        mobile = true;
    } else {
        mobile = false;
    }
    resize();
    
    getNews();
}

window.onresize = function() {
    resize();
}

function getNews() {
    url = "../../php/news.php?mod=top&topic=" + topic + "&num=" + topNum;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            news = JSON.parse(d);
            console.log(news);
            if (topNum == 0) {
                create(news);   
            } else {
                build(news);
            }
            topNum += news.length;
        }
    });
}

function create(news) {
    d = new Date();
    lead = document.createElement("img");
    lead.src = "../../res/leads/" + news[0].img;
    lead.style = "width: 100%; cursor: pointer;";
    lead.id = news[0].id;
    lead.onclick = function() {
        window.location = "../../news/" + this.id + "/";
    }
            
    headline = document.createElement("p");
    headline.innerHTML = news[0].headline;
    headline.style = "font-size: 32px; font-weight: bolder; margin: 0; line-height: 30px; margin-top: 10px;";
    
    date = document.createElement("p");
    date.style = "color: grey; font-size: 15px; display: inline; font-weight: 100;";
    date.innerHTML = "By <a href='../../journalist/" + news[0].author.replace(" ", "-") + "' style='color: grey; font-family: arial;'>" + news[0].author + "</a>&emsp;" + calcTime(d, news[0].time) + "<br><br><br>";
    featId.push(parseInt(news[0].id));
    for (var i=1; i<4; i++) {
        if (i < news.length) {
            featId.push(parseInt(news[i].id));
            div = document.createElement("div");
            div.className = "new-cont";
            div.style = "min-height: auto; margin-bottom: 20px; display: flex;";

            imgDiv = document.createElement("div");
            imgDiv.style = "max-width: 36%; float: left; margin-right: 3%;";
            img = document.createElement("img");
            img.src = "../../res/leads/" + news[i].img;
            img.style = "width: 100%; cursor: pointer;";
            img.id = news[i].id;
            img.onclick = function() {
                window.location = "../../news/" + this.id + "/";
            }
            imgDiv.appendChild(img);

            p = document.createElement("p");
            p.innerHTML = news[i].headline;
            p.style = "width: 56%; float: none; display: inline-block"

            dater = document.createElement("span");
            dater.style = "color: grey; font-size: 15px; display: inline; font-weight: 100; font-family: arial;";
            dater.innerHTML = "<br>By <a href='../../journalist/" + news[i].author.replace(" ", "-") + "' style='color: grey; font-family: arial;'>" + news[i].author + "</a>&emsp;" + calcTime(d, news[i].time);

            if (mobile == true) {
                div.style.display = "block";
                imgDiv.style.maxWidth = "100%";
                p.style.width = "100%";
            }

            div.appendChild(imgDiv);
            p.appendChild(dater);
            div.appendChild(p);

            document.getElementById("side-box").appendChild(div);   
        }
    }
    
    feat = document.getElementById("feat-cont");
    feat.appendChild(lead);
    feat.appendChild(headline);
    feat.appendChild(date);
    
    build(news);
}

function build(news) {
    console.log(featId);
    for (var i=0; i<news.length; i++) {
        if (featId.indexOf(parseInt(news[i].id)) == -1) {
            div = document.createElement("div");
            div.className = "new-cont";
            div.style = "margin-bottom: 20px; overflow: auto;";

            img = document.createElement("img");
            img.src = "../../res/leads/" + news[i].img;
            img.style = "cursor: pointer";
            img.id = news[i].id;
            img.onclick = function() {
                window.location = "../../news/" + this.id + "/";
            }
            
            p = document.createElement("p");
            p.innerHTML = news[i].headline;

            date = document.createElement("span");
            date.style = "color: grey; font-size: 15px; display: inline; font-weight: 100;";
            date.innerHTML = "<br>By <a href='../../journalist/" + news[i].author.replace(" ", "-") + "' style='color: grey; font-family: arial;'>" + news[i].author + "</a>&emsp;" + calcTime(d, news[i].time);

            if (mobile == true) {
                img.style.width = "100%";
                p.style.width = "100%";
            }
            
            div.appendChild(img);
            p.appendChild(date);
            div.appendChild(p);

            document.getElementById("pol-feed").appendChild(div);   
        } else {
            console.log("aieeee");
        }
    }
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

function resize() {
    if (mobile == true) {
        document.getElementById("pol-feed").style.width = "100%";
        
        document.getElementById("news-select").style.display = "none";
        document.getElementById("drop-but").style.display = "block";
        document.getElementById("pol-cont").style.width = "100%";
        
        document.getElementById("title-pic").style.width = "80%";
        document.getElementById("title-pic").style.marginTop = "30px";
        document.getElementById("sub-title").style.marginTop = "0px";
        document.getElementById("news-form").style.width = "100%";
        
        document.getElementById("pol-cont").style.width = "90%";
        document.getElementById("feat-cont").style.width = "100%";
        document.getElementById("feat-cont").style.borderRight = "1px solid transparent";
        document.getElementById("side-box").style.width = "100%";
        document.getElementById("side-box").style.float = "none";
        
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
            document.getElementById("pol-cont").style.width = "90%";
            document.getElementById("feat-cont").style.width = "100%";
            document.getElementById("feat-cont").style.borderRight = "1px solid transparent";
            document.getElementById("side-box").style.width = "100%";
            document.getElementById("side-box").style.float = "none";
            
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
            
            document.getElementById("pol-feed-cont").style.width = "90%";
            document.getElementById("pol-feed").style.width = "100%";
        } else if (window.innerWidth < screen.width*0.7) {
            document.getElementById("pol-cont").style.width = "90%";
            document.getElementById("feat-cont").style.width = "100%";
            document.getElementById("feat-cont").style.borderRight = "1px solid transparent";
            document.getElementById("side-box").style.width = "100%";
            document.getElementById("side-box").style.float = "none";
            
            document.getElementById("title-pic").style.width = "400px";
            document.getElementById("title-pic").style.marginTop = "0px";
            document.getElementById("sub-title").style.marginTop = "-15px";
            document.getElementById("news-form").style.width = "20%";
            
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
            
            document.getElementById("pol-feed-cont").style.width = "80%";
            document.getElementById("pol-feed").style.width = "70%";
        } else if (window.innerWidth > screen.width*0.7) {
            document.getElementById("pol-cont").style.width = "80%";
            document.getElementById("feat-cont").style.width = "50%";
            document.getElementById("feat-cont").style.borderRight = "1px solid grey";
            document.getElementById("side-box").style.width = "46%";
            document.getElementById("side-box").style.float = "right";
            
            document.getElementById("title-pic").style.width = "400px";
            document.getElementById("title-pic").style.marginTop = "0px";
            document.getElementById("sub-title").style.marginTop = "-15px";
            document.getElementById("news-form").style.width = "20%";
            
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "80%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
            
            document.getElementById("pol-feed-cont").style.width = "80%";
            document.getElementById("pol-feed").style.width = "70%";
        }
    }
}