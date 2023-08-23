article = window.location.href.split("/");
article = article[article.length-2];

window.onresize = function() {
    resize();
}

if (screen.width < 640) {
    mobile = true;
    document.getElementById("title-pic").style.width = "80%";
    document.getElementById("parent-info").style.width = "90%";
    document.getElementById("article").style.margin = "30px 10px";
    document.getElementById("next-div").style.width = "100%";
} else {
    mobile = false;
}

getArticle();
viewInc();

function getArticle() {
    url = "../../php/news.php?mod=single&art=" + article + "&off=0";
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            article = JSON.parse(d);
            document.title = article[0].headline + " | The Pauper's Post";
            console.log(article);
            
            document.getElementById("headline").innerHTML = article[0].headline;
            document.getElementById("info").innerHTML = "By <a href='../../journalist/" + article[0].author.replace(" ", "-") + "' style='color: brown; font-family: arial;'>" + article[0].author + "</a> &emsp; • &emsp; " + article[0].date + " &emsp; The Pauper's Post";
            document.getElementById("lead").src = "../../res/leads/" + article[0].img;
            document.getElementById("article").innerHTML = article[0].article.replace(/\n/g, "<br>");
            
            document.getElementById("lead-next").src = "../../res/leads/" + article[1].img;
            document.getElementById("lead-next").className = article[1].id;
            document.getElementById("lead-next").onclick = function() {
                window.location = "../../news/" + this.className + "/";
            }
            document.getElementById("head-next").innerHTML = article[1].headline;
            document.getElementById("name-next").innerHTML = "By <a href='../../journalist/" + article[1].author.replace(" ", "-") + "' style='color: brown; font-family: arial;'>" + article[1].author + "</a>";
        }
    });
}

function viewInc() {
    url = "../../php/change.php?mod=view&art=" + article;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            console.log("Congratulations.. You found me!");
        }
    });
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
        
        document.getElementById("next-div").style.width = "100%";
    } else if (mobile == false) {
        
        if (window.innerWidth < screen.width*0.4) {
            document.getElementById("small-div-1").style.width = "100%";
            document.getElementById("small-div-2").style.width = "100%";
            document.getElementById("ref-div").style.height = "560px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "100%";
            }
        } else if (window.innerWidth < screen.width*0.7) {
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
        } else if (window.innerWidth > screen.width*0.7) {
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