document.getElementById("searchIds1").onclick = function () {
    let xhttp = new XMLHttpRequest(); //create new ajax request

    xhttp.onreadystatechange = function () {
        if (this.status === 200) {
            document.getElementById("result1").innerHTML = this.responseText;
            console.log(this.responseText);
        } else {
            document.getElementById("result1").innerHTML = "پیدا نشد";
        }
    }
    xhttp.open("POST", "/goods-management/search-id1", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const t = document.getElementById('example-text-input1').value
    xhttp.send(`searchId=${t}`);
}