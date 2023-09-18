let fNameField = $("#fName")
    lNameField = $("#lName")
    emailField = $("#email")
    passwordField = $("#password")
    createAcct = $("#createAcct")

let index
let newUser = []
createUsers()

createAcct.on("click", function (e) {
    e.preventDefault()
    // validateData()
})

createAcct.on("click", function () {

    $("#fNameField").val(newUser["firstName"])
    $("#lNameField").val(newUser["lastName"])
    $("#emailField").val(newUser["email"])
    $("#passwordField").val(newUser["password"])
    
    createUsers()
})

console.log(fNameField.val());
console.log(newUser);


function createUsers(){
    let userObj = { "firstName": fNameField.val(), "lastName": lNameField.val(), "email": emailField.val(), "password": passwordField.val() }

    newUser.push(userObj)
    
    localStorage.setItem("new", JSON.stringify(newUser))

}
