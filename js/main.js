// $(document).ready(function(){
//     $('.mainImg').slick({
//         setting-name: setting-value
//     });
// });

$('.mainImg').slick({
    rtl: true
});

let bodyFirmingdBtn = $("#bodyFirmingdBtn"),
dropdownContent = $("#dropdownContent")

dropdownContent.hide()

bodyFirmingdBtn.on("click", function () {
    dropdownContent.toggle()
})

