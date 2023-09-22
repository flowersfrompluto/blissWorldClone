$(document).ready(function () {
    $("#myTable").DataTable({
    })
});

let fileUpload = $("#fileUpload")
nameField = $("#name")
categoryField = $("#category")
priceField = $("#price")
quantityField = $("#quantity")
descriptionField = $("#description")
addBtn = $("#addBtn")
editBtn = $(".edit")
deleteBtn = $(".delete")
myTable = $("#myTable")

let index
let listOfProducts = []
loadProductsView()

$("button").click(function (e) {
    e.preventDefault()
})

addBtn.on("click", function () {

    if (index != null) {
        updateProducts()
    } else {
        createProducts()
    }

})

myTable.on("click", ".editBtn", function () {
    index = $(this).attr("index")

    nameField.val(listOfProducts[index]["name"])
    categoryField.val(listOfProducts[index]["category"])
    priceField.val(listOfProducts[index]["price"])
    quantityField.val(listOfProducts[index]["quantity"])
    fileUpload.val(listOfProducts[index]["image"])
    descriptionField.val(listOfProducts[index]["description"])
})

myTable.on("click", ".deleteBtn", function () {
    if (confirm("Are you sure you want to delete this data")) {

        let i = $(this).attr("index")
        let product_id = listOfProducts[i]["_id"]

        $.ajax({
            type: "delete",
            url: "http://159.65.21.42:9000/product/" + product_id,
            success: function (data) {
                console.log(data);
                if (data["success"]) {
                    alert(`${data["success"]}`)
                    loadProductsView()
                }
            },
            error: function (err) {
                console.log(err);
                alert(err.statusText)
            }
        })
        windows.location.reload()
    }
})

function createProducts() {
    
    if (nameField === "" || categoryField === "" || priceField === "" || quantityField === "" || fileUpload === "" || descriptionField === "") {
        // alert("Fill in All Fields")
        $(".errorTxt").html("*all fields required");
        return;
    }

    let productObj = { "name": nameField.val(), "category": categoryField.val(), "price": priceField.val(), "quantity": quantityField.val(), "image": fileUpload.val(), "description": descriptionField.val() }

    $.ajax({
        type: "post",
        url: "http://159.65.21.42:9000/create/product",
        data: productObj,
        success: function (data) {
            console.log(data);

            if (data["error"]) {
                alert(data["error"])
            } else {
                alert(`${data["name"]} registration successful`)
            }
        },
        error: function (err) {
            console.log(err);
            alert(err.statusText)
        }
    })

    windows.location.reload()

    loadProductsView()
}

function updateProducts() {

    let productObj = { "name": nameField.val(), "category": categoryField.val(), "price": priceField.val(), "quantity": quantityField.val(), "image": fileUpload.val(), "description": descriptionField.val() }

    let product_id = listOfProducts[index]["_id"]

    $.ajax({
        type: "put",
        url: "http://159.65.21.42:9000/update/product/" + product_id,
        data: productObj,
        success: function (data) {
            console.log(data);

            if (data["error"]) {
                alert(data["error"])
            } else {
                alert(`${data["name"]} update successful`)
                loadProductsView()

                index = null
            }
        },
        error: function (err) {
            console.log(err);
            alert(err.statusText)
        }
    })
}

function loadProductsView() {

    $.ajax({
        type: "get",
        url: "http://159.65.21.42:9000/products",
        success: function (data) {
            // console.log(data);
            listOfProducts = data
            // listOfProducts = listOfProducts.reverse()
            let row = ""

            for (let i = 0; i < listOfProducts.length; i++) {
                // i=10;
                if (listOfProducts[i].category == "SparkleJumpRopeQueen") {
                    row +=
                    `<tr>
                    <td>${i + 1}</td>
                    <td>${listOfProducts[i]["name"]}</td>
                    <td>${listOfProducts[i]["category"]}</td>
                    <td>${listOfProducts[i]["price"]}</td>
                    <td>${listOfProducts[i]["quantity"]}</td>
                    <td>${listOfProducts[i]["description"]}</td>
                    <td><a href="#" class="editBtn"  index="${i}">Edit</a>  |  <a href="#" class="deleteBtn" index="${i}">Delete</a></td>
                    </tr>`
                }
            }
            myTable.append(row)
        },
        error: function (err) {
            // console.log(err);
            alert(err.statusText)
        }
    })

}