let texter = document.querySelector("input");
let paragraph = document.querySelector("p");
let pars = document.querySelectorAll("p");
let j = 1;  
let newP = document.createElement("p");
let spn = document.querySelector("span");
let ins;
let textbox = document.getElementById("textbox");

let cmd = "";


document.addEventListener("keydown", function(event) {

    if(event.key == "Enter") {
        texter.value = "";
        paragraph.innerHTML = "\\";
        getCmd();
    }   

});


texter.addEventListener("input", function() {

    if(texter.value == "") paragraph.innerHTML = "\\";

    for(let i = 0; i < j; i++) {
       paragraph.innerHTML = "<span>" + texter.value + "</span>";  
       cmd = texter.value;
    }
}); 


function setPars() {
    for(let i = 0; i < pars.length; i++) {
        pars[i].style.color = "lime";
        pars[i].style.fontFamily = "arial";
        pars[i].style.fontSize = "20px";
    }
}

function setInf(p) {
        p.style.position = "relative";
        p.style.left = "300px";
        p.style.top = "300px";
        p.style.margin =  "20px 20px 20px 20px";

}

function getCmd() {

       if(cmd.startsWith("clear")) {
            clearTextbox(textbox, 0);

        } else if(cmd.startsWith("help")) {

                let cmds = ["clear", "help", "echo", "restart", "curl"];

                let istructions = ["clear console", "help open cmd list", 
                                   "echo print a string/msg", "restart page",
                                   "curl get data from a url"];

                for(let i = 0; i < cmd.length; i++) {
                newP.style.fontFamily = "arial";
                newP.innerHTML = "" + cmds[i] + ": " + istructions[i] + "\n";
                ins = newP.cloneNode(true);
                setInf(ins);

                if(textbox.innerHTML.includes("\n")) {
                    textbox.rows += 2;       
                } else {
                    textbox.rows = 1;
                }

                textbox.innerHTML += ins.innerHTML;

                }

            } else if(cmd.startsWith("echo")) {

                let echoMsg = cmd.split("echo ")[1];

                newP.style.fontFamily = "arial";
                newP.innerHTML = echoMsg;
                newP.className = "info";
                setInf(newP);
                textbox.innerHTML += newP.innerHTML;

                if(textbox.innerHTML.includes("\n")) {
                    textbox.rows += 2;       
                } else {
                    textbox.rows = 1;
                }

            } else if(cmd.startsWith("curl")) {
                let url = cmd.split("curl ")[1];

                let xhttp = new XMLHttpRequest();
                xhttp.onload = function() {
                   textbox.innerHTML += this.responseText;
                if(textbox.innerHTML.includes("\n")) {
                    textbox.rows += 2;       
                } else {
                    textbox.rows = 1;
                }

                }
                xhttp.open("GET", url);
                xhttp.send();
            

            } else if(cmd.startsWith("restart")) {
                location.reload();

            } else {           
              newP.innerHTML = "command not found: " + cmd + "\n";
              textbox.innerHTML += newP.innerHTML;

               if(textbox.innerHTML.includes("\n")) {
                    textbox.rows += 2;
                } else {
                    textbox.rows = 1;
                }

       }

}

setPars();


function killString(string, delay) {
     let timer = setTimeout(() => {
        string.remove();
      }, delay); 
}


function clearTextbox(textbox, delay) {
   let timer = setTimeout(() => {
    textbox.innerHTML = "";
    }, delay);
}