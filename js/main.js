let bodyFirmingdBtn = $("#bodyFirmingdBtn"),
dropdownContent = $("#dropdownContent")

dropdownContent.hide()

bodyFirmingdBtn.on("click", function () {
    dropdownContent.toggle()
})
