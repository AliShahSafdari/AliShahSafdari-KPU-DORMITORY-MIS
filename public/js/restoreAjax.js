
//get the form from DOM (Document object model)
var form = document.getElementById('restordbButton');
form.onsubmit = function (event) {
    var xhttp = new XMLHttpRequest();
    var data = new FormData();
    var selectedFile = document.getElementById("storeRes").files[0];
    const fileStatus = document.getElementById("fileStatus");

    //Add extra data to form before submission.
    console.log(selectedFile);

    if (selectedFile !== undefined) {

        data.append("restore", selectedFile);

        //open the request
        xhttp.open("POST", "/admin/restore-db");
        //send the form data
        xhttp.send(data);
        console.log("now in restore process");

    } else {
        fileStatus.innerHTML =
            "<span class='alert-danger'>برایی بازگردانی دیتابیس باید ابتدا فایل پشتبان را انتخاب نمایید!</span>";
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            toastr.options = {
                "positionClass": "toast-top-center",
            }
            toastr.success("بازگردانی دیتابیس باموفقیت انجام شد ✅", { timeOut: 6000 });
            form.reset(); //reset form after AJAX success.
        }
    }

    //Dont submit the form.
    return false;
}


document.getElementById("backup").onclick = function () {
    let xhttp = new XMLHttpRequest(); //create new ajax request
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            toastr.options = {
                "positionClass": "toast-top-center",
            }
            toastr.success("پشتبان گیری موفقیت آمیز بود ✅", { timeOut: 6000 });
        }
    }
    xhttp.open("GET", "/admin/take-backup", true);

    xhttp.send();
}


