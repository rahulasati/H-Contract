import $ from 'jquery';
let Formats = {};

Formats.DateFormat = (dates) => {
    var date = new Date(dates);
    var month_names = ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];
    var month = month_names[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var formated = day + " " + month + ",\xa0" + year;
    return formated;
}

Formats.DayFormat = (dates) => {
    var date = new Date(dates);
    return date.getDate();
}

Formats.MonthFormat = (dates) => {
    var date = new Date(dates);
    var month_names = ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];
    return month_names[date.getMonth()];
}

Formats.Time = (dates) => {
    var date = new Date(dates);
    var mins = date.getMinutes();
    var hrs = date.getHours();
    return hrs + ":" + mins;
}

Formats.copyToClipboard = (element, event) => {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(element).select();
    document.execCommand("copy");
    $temp.remove();
    $('<div class="copy-notification">Copied to clipboard</div>').prependTo('body').delay(1000).fadeOut(200, function () {
        $('.copy-notification').remove();
    });
}

Formats.calculateAge = (birthday) => { // birthday is a date
    var birthDate = new Date(birthday);
    var currentDate = new Date();
    var age = currentDate.getYear() - birthDate.getYear();
    if (currentDate.getMonth() / 1 < birthDate.getMonth()) {
        age--;
    } else if (currentDate.getMonth() / 1 === (birthDate.getMonth() && currentDate.getDay() / 1 <= birthDate.getDay())) {
        age--;
    }
    if (age < 18) {
        return false;
    }
    return true;
}

export default Formats;