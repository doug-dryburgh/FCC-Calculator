$(document).ready(function () {
    var value = [""];
    var i = 0;
    // CLEAR BTN FUNCTIONALITY
    $("#clear").click(function () {
        $("#math").html("");
        $("#history").html("");
        value = [""];
        i = 0;
    });
    //FUNCTIONALITY FOR NUMBER INPUT (CURRENTLY LIMITED TO 9 DIGITS)
    $(".numberBtn").click(function () {
        if (value[i][0] === "0" && value[i].indexOf(".") < 0) {
            value[i] = $(this).text();
            $("#math").html($(this).text());
        }
        else if (value[i].length < 9) {
            value[i] += $(this).text();
            $("#math").append($(this).text());
        }
        else {
            alert("Enter a number less than or equal to 999,999,999!");
        }
    });
    //FUNCTIONALITY FOR ZERO (9 DIGITS MAX, DOES NOT ALLOW NUMBER TO START WITH ZERO)
    $("#zero").click(function () {
        if (value[i].length < 9 && value[i][0] !== "0") {
            value[i] += $(this).text();
            $("#math").append($(this).text());
        }
        else if (value[i].length >= 9) {
            alert("Enter a number less than or equal to 999,999,999!");
        }
    });
    //FUNCTIONALITY FOR DECIMAL
    $("#decimal").click(function () {
        if (value[i].indexOf(".") === -1) {
            if (value[i][0] === "0") {
                value[i] = $(this).text();
                $("#math").html($(this).text());
            }
            else {
                value[i] += $(this).text();
                $("#math").append($(this).text());
            }
        }
    });
    //FUNCTIONALITY FOR OPERATOR BUTTONS
    $(".operatorBtn").click(function () {
        if (value[0] === "") {
            alert("Enter a number first!");
        }
        else if (value[0] > 999999999) {
            alert("Number is too large to operate on!");
        }
        //ACCEPTS OPERATION IF A NUMBER HAS BEEN ENTERED
        else if (value.length < 3) {
            i++;
            value[i] = "";
            value[i] += $(this).text();
            i++;
            $("#history").html(value[0] + value[1]);
            $("#math").html("0");
            value[i] = "0";
        }
        //ALLOWS FOR CHAINING
        else {
            var holder = eval(value[0] + value[1] + value[2]);
            if (holder < 999999999) {
                $("#history").html(value[0] + value[1] + value[2] + "=" + holder + $(this).text());
                value = ["", "", ""];
                value[0] = holder;
                value[1] = $(this).text();
                i = 2;
                $("#math").html("0");
                value[i] = "0";
            }
            else {
                alert("Cannot chain operation, number too large! Press = for answer!");
            }
        }
    });
    //EQUAL BTN FUNCTIONALITY
    $("#equal").click(function () {
        if (value.length === 3) {
            var holder = eval(value[0] + value[1] + value[2]);
            $("#math").html(holder);
            $("#history").html(value[0] + value[1] + value[2] + $(this).text());
            value = [""];
            value[0] = holder.toString();
            i = 0;
        }
        else {
            alert("Enter a complete equation!");
        }
    });
});