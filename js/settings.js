window.onload = function() {
    config();
    getUser();
    
    if (screen.width < 640) {
        mobile = true;
        document.getElementById("title-pic").style.width = "80%";
    } else {
        mobile = false;
    }
    resize();
}

window.onresize = function() {
    resize();
}

function config() {
    console.log(sessionStorage.getItem("settings"));
    if (sessionStorage.getItem("settings") == null) {
        sessionStorage.setItem("settings", "acc");
    }
    
    set = sessionStorage.getItem("settings");
    if (set == "acc") {
        document.getElementById("acc-box").style.display = "block";
    } else {
        document.getElementById("news-box").style.display = "block";   
    }
    
    document.getElementById(sessionStorage.getItem("settings")).style.backgroundColor = "#ddd";
}

function getUser() {
    url = "../php/news.php?mod=user";
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            user = JSON.parse(d);
            
            set = sessionStorage.getItem("settings");
            if (set == "news") {
                conNews(user);    
            } else if (set == "acc") {
                conAcc(user);
            }
        }
    });
}

function add() {
    if (user[0].nmail.indexOf(document.getElementById("email-input").value) == -1) {
        url = "../php/change.php?mod=adde&email=" + document.getElementById("email-input").value;
        $.ajax({
            type: 'GET',
            data:$(this).serialize(),
            dataType: 'html',
            url: url,
            success: function (d) {
                window.location = "./";
            }
        });   
    } else {
        alert("email already exists");
    }
}

function rem(art) {
    url = "../php/change.php?mod=reme&email=" + art;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            window.location = "./";
        }
    });
}

function conNews(user) {
    if (user[0].newsletter != -1) {
        document.getElementById("check-me-out").checked = 1;   
    }
    
    nmail = user[0].nmail.split(",");
    for (var i=1; i<nmail.length; i++) {
        p = document.createElement("p");
        p.style = "background-color: #ddd; border-radius: 3px; padding: 4px 8px; font-size: 14px; float: left; margin: 0px 10px 10px 0px;";
        p.innerHTML = nmail[i] + ' <span id="' + nmail[i] + '" style="cursor: pointer;" onclick="rem(this.id)">&times;</span>';
        
        document.getElementById("email-box").appendChild(p);
    }
}

function conAcc(user) {
    fname = user[0].fname;
    lname = user[0].lname;
    pname = user[0].pname;
    email = user[0].email;
    
    document.getElementById("email").value = user[0].email;
    document.getElementById("change-div").style.display = "block";
    
    document.getElementById("fname").oninput = function() {
        if (fname != this.value) {
            document.getElementById("fc").innerHTML = "*Change First Name to " + this.value;
            document.getElementById("fc").style.display = "block";
            
            if (this.value == "" || this.value == " ") {
                document.getElementById("fname").style.backgroundColor = "red";
            } else {
                document.getElementById("fname").style.backgroundColor = "#ddd";
            }
        } else {
            document.getElementById("fc").style.display = "none";
        }
    }
    document.getElementById("lname").oninput = function() {
        if (lname != this.value) {
            document.getElementById("lc").innerHTML = "*Change Last Name to " + this.value;
            document.getElementById("lc").style.display = "block";
            
            if (this.value == "" || this.value == " ") {
                document.getElementById("lname").style.backgroundColor = "red";
            } else {
                document.getElementById("lname").style.backgroundColor = "#ddd";
            }
        } else {
            document.getElementById("lc").style.display = "none";
        }
    }
    document.getElementById("pname").oninput = function() {
        if (pname != this.value) {
            document.getElementById("pc").innerHTML = "*Change Pen Name to " + this.value;
            document.getElementById("pc").style.display = "block";
            
            if (this.value == "" || this.value == " ") {
                document.getElementById("pname").style.backgroundColor = "red";
            } else {
                document.getElementById("pname").style.backgroundColor = "#ddd";
            }
        } else {
            document.getElementById("pc").style.display = "none";
        }
    }
    document.getElementById("email").oninput = function() {
        if (email != this.value) {
            document.getElementById("ec").innerHTML = "*Change Email to " + this.value;
            document.getElementById("ec").style.display = "block";
            
            if (this.value == "" || this.value == " " || this.value.indexOf("@") == -1) {
                document.getElementById("email").style.backgroundColor = "red";
            } else {
                document.getElementById("email").style.backgroundColor = "#ddd";
            }
        } else {
            document.getElementById("ec").style.display = "none";
        }
    }
}

function changeId() {
    if (document.getElementById("fname").style.backgroundColor != "red" && document.getElementById("lname").style.backgroundColor != "red" && document.getElementById("pname").style.backgroundColor != "red" && document.getElementById("email").style.backgroundColor != "red") {
        url = "../php/change.php?mod=usr&fname=" + document.getElementById("fname").value + "&lname=" + document.getElementById("lname").value + "&pname=" + document.getElementById("pname").value + "&email=" + document.getElementById("email").value;
        $.ajax({
            type: 'GET',
            data:$(this).serialize(),
            dataType: 'html',
            url: url,
            success: function (d) {
                document.write(d);
            }
        });
    } else {
        alert("You Have Some Problems With Your Changes...");
    }
}

function changePass() {
    if (document.getElementById("curPass").value != "" && document.getElementById("curPass").value != " " && document.getElementById("newPass").value != "" && document.getElementById("newPass").value != " " && document.getElementById("newPassCon").value != "" && document.getElementById("newPassCon").value != " ") {
        if (document.getElementById("curPass").value == user[0].pass && document.getElementById("newPass").value == document.getElementById("newPassCon").value && document.getElementById("newPass").value.length > 6) {
            url = "../php/change.php?mod=pass&pass=" + document.getElementById("newPass").value;
            $.ajax({
                type: 'GET',
                data:$(this).serialize(),
                dataType: 'html',
                url: url,
                success: function (d) {
                    document.write(d);
                }
            });
        } else {
            alert("Either your Passwords dont match, or the password you have entered is less than 6 characters...");
        }
    } else {
        alert("Your password cannot be blank...")
    }
}

function resize() {
    if (mobile == true) {
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
        document.getElementById("opt-box").style.width = "100%";
        document.getElementById("opt-box").style.float = "none";
        document.getElementById("dash-box").style.width = "100%";
        document.getElementById("pol-cont").style.width = "100%";
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
            
            document.getElementById("opt-box").style.width = "100%";
            document.getElementById("opt-box").style.float = "none";
            document.getElementById("dash-box").style.width = "100%";
            document.getElementById("pol-cont").style.width = "100%";
        } else if (window.innerWidth < screen.width*0.7) {
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "100%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
            
            document.getElementById("opt-box").style.width = "15%";
            document.getElementById("opt-box").style.float = "left";
            document.getElementById("dash-box").style.width = "60%";
            document.getElementById("pol-cont").style.width = "1000px";
        } else if (window.innerWidth > screen.width*0.7) {
            document.getElementById("small-div-1").style.width = "70%";
            document.getElementById("small-div-2").style.width = "30%";
            document.getElementById("ref-div").style.height = "260px";
            document.getElementById("ref-div").style.width = "80%";
            infobox = document.getElementsByClassName("info-box");
            for (var i=0; i<infobox.length; i++) {
                infobox[i].style.width = "30%";
            }
            
            document.getElementById("opt-box").style.width = "15%";
            document.getElementById("opt-box").style.float = "left";
            document.getElementById("dash-box").style.width = "60%";
            document.getElementById("pol-cont").style.width = "1000px";
        }
    }
}



















