document.getElementById("searchIds").onclick = function () {
    let xhttp = new XMLHttpRequest(); //create new ajax request

    xhttp.onreadystatechange = function () {
        if (this.status === 200) {
            document.getElementById("result").innerHTML = this.responseText;
            console.log(this.responseText);
        } else {
            document.getElementById("result").innerHTML = "پیدا نشد";
        }
    }
    xhttp.open("POST", "/goods-management/search-id", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const t = document.getElementById('example-text-input1').value
    xhttp.send(`searchId=${t}`);
}

// document.getElementById("button").onclick = function () {
//     let xhttp = new XMLHttpRequest(); //create new ajax request

//     xhttp.onreadystatechange = function () {
//         if (this.status === 200) {
//             document.getElementById("name").innerHTML = this.responseText;
//         } else {
//             document.getElementById("result").innerHTML = "پیدا نشد";
//         }
//     }


//     xhttp.open("POST", "/goods-management/search-id", true);
//     let formData = new FormData();

//     formData.append("searchId", document.getElementById("example-text-input1").value)


//     xhttp.send(formData);
// }