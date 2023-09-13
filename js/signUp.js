let fNameField = $("#fName"),
    lNameField = $("#lName"),
    emailField = $("#email"),
    passwordField = $("#password"),
    createAcct = $("#createAcct")

let index
let newUser = []
loadUsers()

createAcct.on("click", function () {

    //Check if the index dose not have any value, if it has a value, update the data using the index value else create a new data
    if (index != null) {
        newUser()
    } else {
        createUsers()
    }

})

loginRow1.on("click", function () {
    //Assign value to the global index
    index = $(this).attr("index")
    //Assign the index of the object to the form field
    fNameField.val(newUser[index]["fName"])
    lNameField.val(newUser[index]["lName"])
    emailField.val(newUser[index]["email"])
    passwordField.val(newUser[index]["password"])
})

loginRow1.on("click", "#createAcct", function () {

    if (confirm("Kindly Confirm your password")) {

        //Get the attribute saved using the (this) keyword
        let i = $(this).attr("index")

        //Save to local storage
        localStorage.setItem("users", JSON.stringify(newUser))
        //Relaod the array
        loadUsers()
    }

})


function createUsers() {
    //Create an object of the record
    let empObj = { "fName": fNameField.val(), "lName": lNameField.val(), "email": emailField.val(), "password": passwordField.val(), }

    //Add record to array
    newUser.push(empObj)

    //Save to local storage
    localStorage.setItem("users", JSON.stringify(newUser))

    //load array to html view
    // loadUsers()
}