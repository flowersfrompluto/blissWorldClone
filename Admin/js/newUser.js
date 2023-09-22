$(document).ready(function () {
    $("#myUserTable").DataTable({
    })
});

let fName = $("#fName").val()
lName = $("#lName").val()
phoneNumber = $("#phoneNumber").val()
email = $("#email").val()
password = $("#password").val()
createAcct = $("#createAcct")
myUserTable = $("#myUserTable")

let index
let listOfUser = []
loadUsersView()

createAcct.click(function (e) {
    e.preventDefault()
})

createAcct.on("click", function () {

    if (index != null) {
        updateUsers()
    } else {
        createUsers()
    }

})

myUserTable.on("click", ".editBtn", function () {
    index = $(this).attr("index")

    fName.val(listOfUser[index]["name"])
    lName.val(listOfUser[index]["phone"])
    phoneNumber.val(listOfUser[index]["email"])
    email.val(listOfUser[index]["email"])
    password.val(listOfUser[index]["password"])
})

myUserTable.on("click", ".deleteBtn", function () {
    if (confirm("Are you sure you want to delete this data")) {

        let i = $(this).attr("index")
        let user_id = listOfUser[i]["_id"]

        $.ajax({
            type: "delete",
            url: "http://159.65.21.42:9000/user/" + user_id,
            success: function (data) {
                console.log(data);
                if (data["success"]) {
                    alert(`${data["success"]}`)
                    loadUsersView()
                }
            },
            error: function (err) {
                console.log(err);
                alert(err.statusText)
            }
        })
    }
})

function createUsers() {
    


    let fName = $("#fName").val()
    lName = $("#lName").val()
    phoneNumber = $("#phoneNumber").val()
    email = $("#email").val()
    password = $("#password").val()

    
    if (fName.trim() === "" || lName.trim() === "" || phoneNumber.trim() === "" || email.trim() === "" || password.trim() === "") {
        $(".error").html("*all fields required");
        return;
    }

    let userObj = { name: fName + " " + lName, phone: phoneNumber, email: email, password: password}

    // userObj = JSON.stringify(userObj)

    console.log(userObj);

    $.ajax({
        type: "POST",
        url: "http://159.65.21.42:9000/register",
        contentType: "application/json",
        data: JSON.stringify(userObj),
        success: function (data) {

            alert(`${data["name"]} registration successful`)
            // if (data["error"]) {
            //     alert(`${data["name"]} registration successful`)
            // } else {
            //     alert(data["error"])
            // }
        },
        error: function (err) {
            // console.log(err);
            alert(err.statusText)
        }
        // console.log(data);
    })

    loadUsersView()
}

function updateUsers() {

    let userObj = { "name": fName + " " + lName, "phone": phoneNumber, "email": email, "password": password }

    let user_id = listOfUser[index]["_id"]

    $.ajax({
        type: "put",
        url: "http://159.65.21.42:9000/user/" + user_id,
        data: userObj,
        success: function (data) {
            console.log(data);

            if (data["error"]) {
                alert(data["error"])
            } else {
                alert(`${data["name"]} update successful`)
                loadUsersView()

                index = null
            }
        },
        error: function (err) {
            console.log(err);
            alert(err.statusText)
        }
    })
}

function loadUsersView() {

    $.ajax({
        type: "get",
        url: "http://159.65.21.42:9000/users",
        success: function (data) {
            listOfUser = data
            listOfUser = listOfUser.reverse()
            let row = ""

            for (let i = 0; i < listOfUser.length; i++) {

                row += `<tr>
                <td>${i + 1}</td>
                <td>${listOfUser[i]["name"]}</td>
                <td>${listOfUser[i]["phone"]}</td>
                <td>${listOfUser[i]["email"]}</td>
                <td>${listOfUser[i]["password"]}</td>
                <td><a href="#" class="editBtn"  index="${i}">Edit</a>  |  <a href="#" class="deleteBtn" index="${i}">Delete</a></td>
                </tr>`
            }
            myUserTable.html(row)
        },
        error: function (err) {
            console.log(err);
            alert(err.statusText)
        }
    })

}