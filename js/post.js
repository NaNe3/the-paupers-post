window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.getElementById('leadImg');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            document.getElementById("lead").style.display = "none";
            document.getElementById("lead-cont").style.display = "block";
        }
    });
});

function removeImg() {
    document.getElementById("lead").value = "";
    document.getElementById("lead").style.display = "block";
    document.getElementById("lead-cont").style.display = "none";
}

function createTag() {
    var tagName = document.getElementById("tag-create-name").value;
    var tagColor = document.getElementById("tag-create-color").value;
    
    var div = document.createElement("div");
    div.className = "tag";
    div.innerHTML = tagName;
    div.style = "position: static; display: inline-block; cursor: pointer; margin: 0px 20px 20px 0px;";
    div.style.backgroundColor = tagColor;
    
    document.getElementById("tag-div").appendChild(div);
    if (document.getElementById("tags").value == "[") {
        document.getElementById("tags").value += "{'tag': '" + tagName + "', 'color': '" + tagColor + "'}";   
    } else {
        document.getElementById("tags").value += ", {'tag': '" + tagName + "', 'color': '" + tagColor + "'}";
    }
}

function prepPub() {
    document.getElementById("head-line").value.replace("'", "\'");
    document.getElementById("head-line").value.replace('"', '\"');
    
    document.getElementById("tags").value.replace("'", "\'");
    document.getElementById("tags").value.replace('"', '\"');
    
    document.getElementById("article-box").value.replace("'", "\'");
    document.getElementById("article-box").value.replace('"', '\"');
    document.getElementById("tags").value.replace("\n", "<br>");
    
    //document.getElementById("sub-but").click();
}