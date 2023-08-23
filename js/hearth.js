months = ["January",  "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

weekOffset = 0;

window.onload = function() {
    if (screen.width < 640) {
        mobile = true;
        document.getElementById("latest-div").style = "margin: 0px";
        document.getElementById("feat-parent").style = "margin: 0px";
        document.getElementById("feat-box").style.borderRight = "1px solid #eee";
        document.getElementById("week-left").style.borderRight = "0px solid white";
        
        document.getElementById("drop-but").style.display = "block";
        document.getElementById("drop-but").style.width = "30px";
        document.getElementById("pro-but").style.width = "30px";
        document.getElementById("news-select").style.display = "none";
        document.getElementById("news-form").style.width = "100%";
    } else {
        mobile = false;
    }
    
    featId = [];
    grabLeads();
    //alert(new Date(year, month, day date));
    
//    var ourDate = new Date();
//    var regDate = new Date();
//    var pastDate = ourDate.getDate() - 7;
//    ourDate.setDate(pastDate);
//    document.getElementById("week-date").innerHTML = months[ourDate.getMonth()] + " " + ourDate.getDate() + ", " + ourDate.getFullYear() + " - " + months[regDate.getMonth()] + " " + regDate.getDate() + ", " + regDate.getFullYear();
    
    resize();
}

function grabLeads() {
    url = "./php/news.php?mod=featured";
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            news = JSON.parse(d);
            //console.log(news);
            grabNews();
//            grabOld();
            grabAgg();
            grabSpot();
            featured(news);
        }
    });
}

function grabNews() {
    url = "./php/news.php?mod=week&off=" + weekOffset;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            wnews = JSON.parse(d);
            //console.log(wnews);
            week(wnews);
            weekOffset += wnews.length;
        }
    });
}

function grabAgg() {
    url = "./php/news.php?mod=agg";
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            agg = JSON.parse(d);
            console.log(agg);
            
            buildAgg(agg);
        }
    });
}

function grabSpot() {
    url = "./php/news.php?mod=spot";
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            spot = JSON.parse(d);
            console.log(spot);
            
            buildSpot(spot);
        }
    });
}

//function grabOld() {
//    url = "./php/news.php?mod=old&off=" + oldOffset;
//    $.ajax({
//        type: 'GET',
//        data:$(this).serialize(),
//        dataType: 'html',
//        url: url,
//        success: function (d) {
//            onews = JSON.parse(d);
//            buildOld(onews);
//            oldOffset += onews.length;
//        }
//    });
//}

function featured(news) {
//    big box
    
//    document.getElementById("feat-author").innerHTML = "By <a href='./journalist/" + news[0].author.replace(" ", "-") + "' style='color: brown; font-family: arial; font-weight: normal; font-size: 14px;'>" + news[0].author + "</a>&emsp;•";
//    
//    document.getElementById("feat-date").innerHTML = news[0].date;
//    document.getElementById("date-span").innerHTML = news[news.length-1].date + " - " + news[0].date;
    
    div = document.createElement("div");
    div.className = "breaking-news-box";
    div.style = "overflow: hidden;";
    
    lead = document.createElement("img");
    lead.src = "./res/leads/" + news[0].img;
    lead.style = "width: 100%; display: inline-block; margin-bottom: 70px;";
    lead.onclick = function() {
        window.location = "./news/" + news[0].id + "/";
    }
    
    headline = document.createElement("p");
    headline.innerHTML = news[0].headline;
    if (mobile == false) {
        headline.style = "font-size: 42px; font-weight: bolder; margin: 0; line-height: 42px; font-family: sans-serif; text-align: center; margin-bottom: 20px;";   
    } else {
        headline.style = "font-size: 22px; font-weight: bolder; margin: 0; line-height: 20px; font-family: sans-serif; text-align: center; margin-bottom: 20px;";
    }
    
//    leadLine = document.createElement("p");
//    leadLine.style = "color: grey; text-align: center; font-weight: 200;";
//    leadLine.innerHTML = "By <a href='../../journalist/" + news[0].author.replace(" ", "-") + "' style='color: brown; font-family: arial;'>" + news[0].author + "</a> &emsp; • &emsp; " + news[0].date + " &emsp; The Pauper's Post";
    
//    article = document.createElement("p");
//    if (mobile == false) {
//        article.innerHTML = news[0].article.split(' ').slice(0,70).join(' ') + "...";   
//    } else {
//        article.innerHTML = news[0].article.split(' ').slice(0,20).join(' ') + "...";
//    }
//    article.style = "font-size: 18px; font-weight: lighter; font-family: serif;";
    
    document.getElementById("feat-box").appendChild(headline);
//    document.getElementById("feat-box").appendChild(leadLine);
    featId.push(news[0].id);
    div.appendChild(lead);
    
    document.getElementById("feat-box").appendChild(div);
//    document.getElementById("feat-box").appendChild(headline);
//    document.getElementById("feat-box").appendChild(article);
    
    var d = new Date();
    // LITTLE BOXES
    collected = 0;
    
    for (var i=0; i<Math.ceil(news.length/2); i+=2) {
        row = document.createElement("div");
        row.style = "width: 100%; margin-bottom: 20px;";
        if (mobile == false) {
            row.style.display = "flex";
        }
        for (var k=1; k<3; k++) {
            cont = document.createElement("div");
            if (mobile == false) {
                cont.style = "width: 48%; display: inline-block;";
            } else {
                cont.style = "width: 100%; display: inline-block;";
            }
            if (k == 1 && mobile == false) {
                cont.style.marginRight = "auto";
            }

            div = document.createElement("div");
            div.className = "news-box";

            lead = document.createElement("img");
            lead.style = "width: 100%; cursor: pointer; margin-bottom: 10px;";
            lead.src = "./res/leads/" + news[i+k].img;
            lead.id = news[i+k].id;
            lead.onclick = function() {
                window.location = "./news/" + this.id + "/";
            }
            
            littleTagList = JSON.parse(news[i+k].tags.split("'").join('"'))
            littleTags = document.createElement("div");
            littleTags.style = "position: absolute; top: 0px;";
            for (var j=0; j<littleTagList.length; j++) {
                p = document.createElement("p");
                p.className = "tag";
                p.style = "position: static; display: inline-block; margin-left: 10px;";
                p.style.backgroundColor = littleTagList[j].color;
                p.innerHTML = littleTagList[j].tag;

                littleTags.appendChild(p);
                featId.push(news[i+k].id);
            }

            headline = document.createElement("p");
            headline.className = "head";
            headline.style = "margin-bottom: 10px;";
            headline.innerHTML = news[i+k].headline;

            date = document.createElement("span");
            date.style = "color: grey; font-size: 15px; display: inline; font-weight: 100;";
            
            timeString = calcTime(d, news[i+k].time);
//            timeDay = Math.floor(((d.getTime() / 1000) - news[i+k].time)/60/60/24);
//            timeHour = Math.floor(((d.getTime() / 1000) - news[i+k].time)/60/60);
//            timeMin = Math.floor(((d.getTime() / 1000) - news[i+k].time)/60);
//            timeSec = Math.floor(((d.getTime() / 1000) - news[i+k].time));
//            if (timeSec < 60) {
//                timeString = Math.floor(((d.getTime() / 1000) - news[i+k].time)) + "s";
//            } else if (timeMin < 60) {
//                timeString = Math.floor(((d.getTime() / 1000) - news[i+k].time)/60) + "m";
//            } else if (timeHour < 24) {
//                timeString = Math.floor(((d.getTime() / 1000) - news[i+k].time)/60/60) + "h";
//            } else {
//                timeString = Math.floor(((d.getTime() / 1000) - news[i+k].time)/60/60/24) + "d";
//            }
            
            date.innerHTML = "<br>By <a href='./journalist/" + news[i+k].author.replace(" ", "-") + "' style='color: grey; font-family: arial;'>" + news[i+k].author + "</a>&emsp;" + timeString;

            div.appendChild(lead);
            headline.appendChild(date);
            div.appendChild(headline);
            div.appendChild(littleTags);

            cont.appendChild(div);
            row.appendChild(cont);   
        }
        
        document.getElementById("feat-stories-box").appendChild(row);
    }
}

function week(news) {
    if (news.length > 0) {
        var d = new Date();
        for (var i=0; i<news.length; i++) {
            run = true;
            for (var j=0; j<featId.length; j++) {
                if (featId[j] == news[i].id) {
                    run = false;
                }
            }
            if (run == true) {
                div = document.createElement("div");
                div.className = "new-cont";
                div.style = "position: relative; display: block; overflow: auto; margin-bottom: 20px;";

                img = document.createElement("img");
                img.src = "./res/leads/" + news[i].img;
                img.style= "cursor: pointer";
                img.id = news[i].id;
                img.onclick = function() {
                    window.location = "./news/" + this.id + "/";
                }
                
                p = document.createElement("p");
                p.innerHTML = news[i].headline;
                
                date = document.createElement("span");
                date.style = "color: grey; font-size: 15px; display: inline; font-weight: 100;";
                date.innerHTML = "<br>By <a href='./journalist/" + news[i].author.replace(" ", "-") + "' style='color: grey; font-family: arial;'>" + news[i].author + "</a>&emsp;" + calcTime(new Date(), news[i].time);
                
                littleTagList = JSON.parse(news[i].tags.split("'").join('"'));
                littleTags = document.createElement("div");
                littleTags.style = "position: absolute; top: 10px; overflow: hidden;";
                for (var j=0; j<littleTagList.length; j++) {
                    p2 = document.createElement("span");
                    p2.className = "tag";
                    p2.style = "display: inline-block; margin-left: 10px; font-family: monospace;";
                    p2.style.backgroundColor = littleTagList[j].color;
                    p2.innerHTML = littleTagList[j].tag;

                    littleTags.appendChild(p2);
                }
                
                div.appendChild(img);
                p.appendChild(date);
                div.appendChild(p);
                div.appendChild(littleTags);
                
                if (mobile == true) {
                    img.style.width = "100%";
                    p.style.width = "100%";
                }
                
//                if (i%2 == 1) {
//                    document.getElementById("new-cont-right").appendChild(div);
//                } else {
//                    document.getElementById("new-cont-left").appendChild(div);
//                }
                document.getElementById("new-cont-right").appendChild(div);
            }
        }
    } else if (weekOffset == 0){
        document.getElementById("week-box-cont").style.display = "none";
        
        no = document.createElement("p");
        no.style = "font-size: 58px; text-align: center; color: grey; margin-top: 40px;";
        no.innerHTML = "THERE'S NOTHING HERE...";
        document.getElementById("week-articles-box").appendChild(no);
    }
}

function buildAgg(agg) {
    if (agg.length > 0) {
        for (var i=0; i<agg.length; i++) {
            a = document.createElement("a");
            a.href = agg[i].link;
            a.target = "_blank";
            a.style = "text-decoration: none;";
            
            p = document.createElement("p");
            p.className = "ag-link";
            p.innerHTML = agg[i].title;
            
            hr = document.createElement("hr");
            
            a.appendChild(p);
            document.getElementById("link-box").appendChild(a);
            document.getElementById("link-box").appendChild(hr);
        }
    }
}

function buildSpot(spot) {
    if (spot.length > 0) {
        for (var i=0; i<spot.length; i++) {
            a = document.createElement("a");
            a.href = "./news/" + spot[i].id + "/";
            a.style = "text-decoration: none;";
            
            p = document.createElement("p");
            p.className = "ag-link";
            p.innerHTML = spot[i].headline;
            
            hr = document.createElement("hr");
            
            a.appendChild(p);
            document.getElementById("spot-box").appendChild(a);
            document.getElementById("spot-box").appendChild(hr);
        }
    }
}

function addEmail() {
    url = "./php/post.php?mod=addMail&mail=" + document.getElementById("news-email-box").value;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            console.log(d);
        }
    });
    document.getElementById("letter-box").style.display = "none";
    document.getElementById("congrat-text").style.display = "block";
}

//function buildOld(news) {
//    d = new Date();
//    if (news.length > 0) {
//        for (var i=0; i<Math.ceil(news.length/4)*4; i+=4) {
//            row = document.createElement("div");
//            row.style = "width: 100%;margin-bottom: 40px;";
//            if (mobile == false) {
//                row.style.display = "flex";
//            }
//            for (var k=0; k<4; k++) {
//                if (i+k < news.length) {
//                    cont = document.createElement("div");
//                    if (mobile == false) {
//                        cont.style = "width: 24%; display: inline-block; margin-right: 1%;";   
//                    } else {
//                        cont.style = "width: 100%; display: inline-block;";
//                    }
//                    if (k == 1 && mobile == false) {
//                        cont.style.marginRight = "auto";
//                    }
//
//                    div = document.createElement("div");
//                    div.className = "news-box";
//
//                    lead = document.createElement("img");
//                    lead.style = "width: 100%; cursor: pointer";
//                    lead.src = "./res/leads/" + news[i+k].img;
//                    lead.id = news[i+k].id;
//                    lead.onclick = function() {
//                        window.location = "./news/" + this.id + "/";
//                    }
//            
//                    littleTagList = JSON.parse(news[i+k].tags.split("'").join('"'))
//                    littleTags = document.createElement("div");
//                    littleTags.style = "position: absolute; top: 0px;";
//                    for (var j=0; j<littleTagList.length; j++) {
//                        p = document.createElement("p");
//                        p.className = "tag";
//                        p.style = "position: static; display: inline-block; margin-left: 10px;";
//                        p.style.backgroundColor = littleTagList[j].color;
//                        p.innerHTML = littleTagList[j].tag;
//
//                        littleTags.appendChild(p);
//                        featId.push(news[i+k].id);
//                    }
//
//                    headline = document.createElement("p");
//                    headline.className = "head";
//                    headline.innerHTML = news[i+k].headline;
//
//                    date = document.createElement("span");
//                    date.style = "color: grey; font-size: 15px; display: inline; font-weight: 100;";
//
//                    timeString = calcTime(d, news[i+k].time);
//
//                    date.innerHTML = "<br>By <a href='./journalist/" + news[i+k].author.replace(" ", "-") + "' style='color: grey; font-family: arial;'>" + news[i+k].author + "</a>&emsp;" + timeString;
//
//                    div.appendChild(lead);
//                    headline.appendChild(date);
//                    div.appendChild(headline);
//                    div.appendChild(littleTags);
//
//                    cont.appendChild(div);
//                    row.appendChild(cont);
//                }
//            }
//
//            document.getElementById("old-cont-box").appendChild(row);
//        }
//    } else if (oldOffset == 0) {
//        document.getElementById("old-cont-box").style.display = "none";
//        
//        no = document.createElement("p");
//        no.style = "font-size: 58px; text-align: center; color: grey; margin-top: 100px;";
//        no.innerHTML = "THERE'S NOTHING HERE...";
//        document.getElementById("feat-parent").appendChild(no);
//    }
//    
////    $('#body-cont').imagesLoaded( function() {
////        //document.getElementById("modal-image").style.visibility = "hidden";
////        $('#load-modal').fadeOut(1000);
////    });
//}

window.onresize = function() {
    resize();
    
}

function resize() {
    if (screen.width < 640) {
        mobile = true;
    } else {
        mobile = false;
    }
    
    if (mobile == true) {
        //document.body.style = "width: " + screen.width + ";";
        document.getElementById("title-pic").style.width = "80%";
        document.getElementById("title-pic").style.marginTop = "30px";
        document.getElementById("sub-title").style.marginTop = "0px";
        
        document.getElementById("agg-cont").style.width = "100%";
        document.getElementById("feat-cont").style.width = "100%";
        
        document.getElementById("week-left").style.width = "100%";
        document.getElementById("new-cont-right").style.float = "none";
        document.getElementById("new-cont-right").style.margin = "auto";
        
        document.getElementById("small-div-1").style.width = "100%";
        document.getElementById("small-div-2").style.width = "100%";
        document.getElementById("ref-div").style.height = "560px";
        document.getElementById("ref-div").style.width = "100%";
        infobox = document.getElementsByClassName("info-box");
        for (var i=0; i<infobox.length; i++) {
            infobox[i].style.width = "100%";
        }
        
        document.getElementById("news-form").style.width = "80%";
        document.getElementById("news-email-box").style.width = "100%";
        document.getElementById("go-but").style.width = "100%";
    } else if (mobile == false) {
        
        if (window.innerWidth < screen.width*0.4) {
            document.getElementById("agg-cont").style.width = "100%";
            document.getElementById("latest-div").style.width = "100%";
            document.getElementById("feat-cont").style.width = "100%";
            
            document.getElementById("week-box-cont").style.width = "100%";
            document.getElementById("week-left").style.width = "100%";
            document.getElementById("week-right").style.width = "100%";

            featCont = document.getElementsByClassName("news-box");
            for (var i=0; i<featCont.length-1; i++) {
                featCont[i].style.height = "360px";
            }
            
            document.getElementById("new-cont-right").style.float = "none";
            document.getElementById("new-cont-right").style.margin = "auto";
            
            document.getElementById("small-div-1").style.width = "100%";
            document.getElementById("small-div-2").style.width = "100%";
            document.getElementById("ref-div").style.height = "560px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "100%";
            }
            document.getElementById("news-form").style.width = "80%";
            document.getElementById("news-email-box").style.width = "100%";
            document.getElementById("go-but").style.width = "100%";
        } else if (window.innerWidth < screen.width*0.7) {
            //FEATURED
            document.getElementById("agg-cont").style.width = "100%";
            document.getElementById("latest-div").style.width = "100%";
            document.getElementById("feat-cont").style.width = "80%";
            
            document.getElementById("week-box-cont").style.width = "80%";
            document.getElementById("week-left").style.width = "100%";
            document.getElementById("week-right").style.width = "100%";

            featCont = document.getElementsByClassName("news-box");
            for (var i=0; i<featCont.length-1; i++) {
                featCont[i].style.minHeight = "320px";
            }
            
            document.getElementById("new-cont-right").style.float = "none";
            document.getElementById("new-cont-right").style.margin = "auto";
            
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
            
            document.getElementById("news-form").style.width = "40%";
            document.getElementById("news-email-box").style.width = "68%";
            document.getElementById("go-but").style.width = "28%";
        } else if (window.innerWidth > screen.width*0.7) {
            document.getElementById("agg-cont").style.width = "36%";
            document.getElementById("latest-div").style.width = "62%";
            document.getElementById("feat-cont").style.width = "80%";
            
            document.getElementById("week-box-cont").style.width = "80%";
            document.getElementById("week-left").style.width = "62%";
            document.getElementById("week-right").style.width = "36%";

            featCont = document.getElementsByClassName("news-box");
            for (var i=0; i<featCont.length-1; i++) {
                featCont[i].style.minHeight = "320px";
            }
            
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "80%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
            
            document.getElementById("news-form").style.width = "30%";
            document.getElementById("news-email-box").style.width = "68%";
            document.getElementById("go-but").style.width = "28%";
        }
    }
}


























