limit = 0;
d = new Date();

window.onload = function() {
    config();
    
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
    url = "../php/news.php?mod=journal&author=" + user + "&num=" + limit + "&ord=" + sessionStorage.getItem("Sort By") + "&dis=" + sessionStorage.getItem("Displays");
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            news = JSON.parse(d);
            build(news);
            
            limit += news.length;
        }
    });
}
function build(news) {
    if(news.length > 0) {
        for (var i=0; i<news.length; i++) {
            div = document.createElement("div");
            div.className = "new-cont";
            div.style = "margin-bottom: 20px; min-height: 0px; overflow: hidden;";

            img = document.createElement("img");
            img.src = "../res/leads/" + news[i].img;
            img.style = "cursor: pointer; width: 30%;";
            img.id = news[i].id;
            img.onclick = function() {
                window.location = "../news/" + this.id + "/";
            }

            p = document.createElement("p");
            p.style.width = "65%";
            p.innerHTML = news[i].headline;

            date = document.createElement("span");
            date.style = "color: grey; font-size: 15px; display: inline; font-weight: 100;";
            date.innerHTML = "<br>By <a href='../journalist/" + news[i].author.replace(" ", "-") + "' style='color: grey; font-family: arial;'>" + news[i].author + "</a>&emsp;" + calcTime(d, news[i].time);

            info = document.createElement("span");
            info.style = "color: grey; font-size: 15px; display: inline; font-weight: 100;";
            info.innerHTML = "<br>" + news[i].traffic + " Views &emsp;<a href='#' class='wiz'>Edit</a> &emsp;<a id='" + news[i].id + "' href='#' class='wiz' onclick='del(this.id, this.parentNode.parentNode.parentNode.childNodes[0].src, this.parentNode.parentNode.parentNode.childNodes[1].innerHTML)'>Delete</a>";

            if (mobile == true) {
                img.style.width = "100%";
                p.style.width = "100%";
            }

            div.appendChild(img);
            p.appendChild(date);
            p.appendChild(info);
            div.appendChild(p);

            document.getElementById("dash-box").appendChild(div);
        }   
    } else if (limit == 0) {
        none = document.createElement("p");
        none.style = "color: #aaa; font-size: 36px; text-align: center;";
        none.innerHTML = "No Articles Written";
        
        document.getElementById("dash-box").appendChild(none);
    }
}

function del(id, src, head) {
    document.getElementById("delImg").src = src
    document.getElementById("delHead").innerHTML = head.replace(/<a.*<\/a>/, '').replace("By", "");
    
    document.getElementById("delAlert").style.display = "block";
    document.getElementById("del-but").parentNode.id = id;
    document.getElementById("del-but").onclick = function() {
        deleteArticle(this.parentNode.id);
        window.location = "./";
    }
}

function deleteArticle(id) {
    url = "../php/change.php?mod=del&art=" + id;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            console.log(d);
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

function config() {
    if (sessionStorage.getItem("Sort By") == null) {
        sessionStorage.setItem("Sort By", "id");
    }
    if (sessionStorage.getItem("Displays") == null) {
        sessionStorage.setItem("Displays", "DESC");
    }
    
    serch = sessionStorage.getItem("Sort By");
    disp = sessionStorage.getItem("Displays");
    if (serch == "id") {
        document.getElementById("id").style.backgroundColor = "#ddd";
    } else if (serch == "traffic") {
        document.getElementById("traffic").style.backgroundColor = "#ddd";
    }
    
    if (disp == "DESC") {
        document.getElementById("DESC").style.backgroundColor = "#ddd";
    } else if (disp == "ASC") {
        document.getElementById("ASC").style.backgroundColor = "#ddd";
    }
}

function resize() {
    if (mobile == true) {
        document.getElementById("drop-but").style.display = "block";
        
        document.getElementById("title-pic").style.width = "80%";
        document.getElementById("title-pic").style.marginTop = "30px";
        document.getElementById("sub-title").style.marginTop = "0px";
        
        document.getElementById("pol-cont").style.width = "90%";
        document.getElementById("opt-box").style.width = "100%";
        document.getElementById("dash-box").style.width = "100%";
        
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
            document.getElementById("opt-box").style.width = "100%";
            document.getElementById("dash-box").style.width = "100%";
            
            document.getElementById("title-pic").style.width = "80%";
            document.getElementById("title-pic").style.marginTop = "30px";
            document.getElementById("sub-title").style.marginTop = "0px";
            
            document.getElementById("small-div-1").style.width = "100%";
            document.getElementById("small-div-2").style.width = "100%";
            document.getElementById("ref-div").style.height = "560px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "100%";
            }
        } else if (window.innerWidth < screen.width*0.7) {
            document.getElementById("pol-cont").style.width = "90%";
            document.getElementById("opt-box").style.width = "17%";
            document.getElementById("dash-box").style.width = "78%";
            
            document.getElementById("title-pic").style.width = "400px";
            document.getElementById("title-pic").style.marginTop = "0px";
            document.getElementById("sub-title").style.marginTop = "-15px";
            
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
        } else if (window.innerWidth > screen.width*0.7) {
            document.getElementById("pol-cont").style.width = "60%";
            document.getElementById("opt-box").style.width = "17%";
            document.getElementById("dash-box").style.width = "78%";
            
            document.getElementById("title-pic").style.width = "400px";
            document.getElementById("title-pic").style.marginTop = "0px";
            document.getElementById("sub-title").style.marginTop = "-15px";
            
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