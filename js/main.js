let bodyFirmingBtn = $("#bodyFirmingBtn"),
    dropdownContent = $("#dropdownContent"),
    ingredientsBtn = $("#ingredientsBtn"),
    ingredientsContent = $("#ingredientsContent"),
    whatBtn = $("#whatBtn"),
    whatContent = $("#whatContent"),
    resultsBtn = $("#resultsBtn"),
    resultContent = $("#resultContent")

$('.mainImg').slick({
    rtl: true
});

dropdownContent.hide()
bodyFirmingBtn.on("click", function () {
    dropdownContent.toggle()
})

whatContent.show()
whatBtn.on("click", function () {
    whatContent.toggle()
})

resultContent.hide()
resultsBtn.on("click", function () {
    resultContent.toggle()
})

ingredientsContent.hide()
ingredientsBtn.on("click", function () {
    ingredientsContent.toggle()
})

