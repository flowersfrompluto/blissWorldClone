let fileUpload = $("#fileUpload")
nameField = $("#name")
categoryField = $("#category")
priceField = $("#price")
quantityField = $("#quantity")
descriptionField = $("#description")
addBtn = $("#addBtn")
editBtn = $(".edit")
deleteBtn = $(".delete")
bodyRow2 = $("#bodyRow2")
myTable = $("#myTable")
bodyCol1 = $(".bodyCol1")

let index
let listOfProducts = []
loadProductsView()

function loadProductsView() {

    $.ajax({
        type: "get",
        url: "http://159.65.21.42:9000/products",
        success: function (data) {
            listOfProducts = data
            listOfProducts = listOfProducts.reverse()
            let row = ""
            let i = $(this).attr("index")

            row = listOfProducts[i]
            for (let i = 0; i < listOfProducts.length; i++) {
                if (listOfProducts[i].category == "SparkleJumpRopeQueen") {
        row += 
        `<div>
            <a href="">
                <div>
                    <img src="${listOfProducts[i]["image"]}" alt="unable to get image">
                </div>
                <div class="rating flex">
                    <div class="star">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star "></span>
                    </div>
                    <div class="flex">
                        <p>3.7 <span>${listOfProducts[i]["quantity"]}pcs</span></p>
                    </div>
                </div>
                <h3>${listOfProducts[i]["name"]}</h3>
            </a>
            <p>$${listOfProducts[i]["price"]}</p>
            <p class="italic">${listOfProducts[i]["description"]}</p>
            <div class="btnbodyRow2" data-id="1" data-name="Product 1" data-price="10.00">
                <button class="addToCart">ADD TO BAG</button>
            </div>
        </div>`
                }
            }
            // myTable.append(row)
            bodyCol1.html(row)
            // bodyRow2.html(row)
        },
        error: function (err) {
            // console.log(err);
            alert(err.statusText)
        }
    })

}
