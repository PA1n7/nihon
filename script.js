let hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん']
let hiragana_translation = ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'shi', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'fu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', 'wo', 'n']

let text = ""

function generate(list){   
    for (let i = 0; i<100; i+=1){
        text+=list[Math.floor(Math.random()*list.length)]
    }
    document.getElementById("text").innerText = text;
    console.log(text)
}

generate(hiragana)

function check(){
    let text = document.getElementById("text").innerText;
    let input = document.getElementById("in").value;
    document.getElementById("in").value = input.replace(/ /g, ' ');
    let processed_input = [];
    {
        let temp = ""
        for (let i = 0; i<input.length; i+=1){
            if(input[i] == " "){
                temp = "";
                continue;
            }
            temp = temp + input[i];
            if (["a", "e", "i", "o", "u"].includes(input[i])){
                processed_input.push(temp);
                temp = "";
            }else{if(input[i] == "n" && (i == input.length-1 || !(["a", "e", "i", "o", "u"].includes(input[i+1])))){
                processed_input.push(temp);
                temp = "";
            }}
        }
        if(temp != ""){  
            document.getElementById("visual_in").innerText = temp;
        }else{
            document.getElementById("visual_in").innerText = processed_input[processed_input.length-1]
        }
        if(document.getElementById("visual_in").innerText == "undefined" || document.getElementById("visual_in").innerText == ""){
            document.getElementById("visual_in").innerText = "Start typing...";
            document.getElementById("visual_in").classList.add("gray");
        }else{
            document.getElementById("visual_in").classList.remove("gray");
        }
    }
    let right = false
    let wrong = false
    let new_text = ""
    for (let i = 0; i<text.length; i+=1){
        if (processed_input[i] != undefined){
            if (processed_input[i]==hiragana_translation[hiragana.indexOf(text[i])]){
                if (!right){
                    if(wrong){
                        new_text+="</span>"
                    }
                    right = true;
                    wrong = false;
                    new_text+="<span class='right'>";
                }
            }else{
                if(!wrong){
                    if(right){
                        new_text+="</span>"
                    }
                    right = false;
                    wrong = true;
                    new_text = new_text + "<span class='wrong'>";
                }
            }
        }else{
            if(right || wrong){
                new_text+="</span>"
            }
        }
        new_text+= text[i]
    }
    document.getElementById("text").innerHTML = new_text;
}

// Still very experimental
let current = 0
function linecheck(){
    let text = document.getElementById("text").innerText;
    let input = document.getElementById("in").value;
    let new_text = wrapText(text, current-1, "<span class='right'>", "</span>");
    if(input != undefined){
        if(input==hiragana_translation[hiragana.indexOf(text[current])]){
            document.getElementById("in").value = "";
            new_text = wrapText(new_text, current, "<span class='right'>", "</span>");
            current+=1;
        }else{
            new_text = wrapText(new_text, current, "<span class='wrong'>", "</span>");
        }
    }else{
        new_text+=text[current]
    }
    document.getElementById("text").innerHTML = new_text;
}

function wrapText(x, pos, t1, t2){
    let out = ""
    for (let i = 0; i<pos; i++){
        out+=x[0];
        x = x.substring(1);
    }
    out+=t1 + x[0] + t2;
    x = x.substring(1);
    for(let i = 0; i<x.length; i++){
        out+=x[i]
    }
    return out;
}

document.getElementById("in").focus()

window.onfocus = ()=>{document.getElementById("in").focus()}
window.onclick = ()=>{document.getElementById("in").focus()}