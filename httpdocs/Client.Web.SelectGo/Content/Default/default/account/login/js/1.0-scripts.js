
function togglePassword($element) {
    var newtype = $element.prop('type') == 'password' ? 'text' : 'password';
    $element.prop('type', newtype);
}
$(document).ready(function () {
    $('.pwd-toggle').on("click",function () {
        $(this).toggleClass("fa-eye-slash fa-eye");
        togglePassword($('input[name=password]'));
    });
});