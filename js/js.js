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
    //FUNCTIONALITY FOR NUMBER INPUT (LIMITED TO 9 DIGITS)
    $(".numberBtn").click(function () {
        numberInput($(this).text());
    });

    function numberInput(number) {
        if (value[i][0] === "0" && value[i].indexOf(".") < 0) {
            value[i] = number;
            $("#math").html(number);
        }
        else if (value[i].length < 9) {
            value[i] += number;
            $("#math").append(number);
        }
        else {
            alert("Enter a number less than or equal to 999,999,999!");
        }
    }
    //FUNCTIONALITY FOR ZERO (9 DIGITS MAX, DOES NOT ALLOW NUMBER TO START WITH ZERO)
    $("#zero").click(function () {
        zeroInput($(this).text());
    });

    function zeroInput(zero) {
        if (value[i].length < 9 && value[i][0] !== "0") {
            value[i] += zero;
            $("#math").append(zero);
        }
        else if (value[i].length >= 9) {
            alert("Enter a number less than or equal to 999,999,999!");
        }
    }
    //FUNCTIONALITY FOR DECIMAL
    $("#decimal").click(function () {
        decimalInput($(this).text());
    });

    function decimalInput(decimal) {
        if (value[i].indexOf(".") === -1) {
            if (value[i][0] === "0") {
                value[i] = decimal;
                $("#math").html(decimal);
            }
            else {
                value[i] += decimal;
                $("#math").append(decimal);
            }
        }
    }
    //FUNCTIONALITY FOR OPERATOR BUTTONS
    $(".operatorBtn").click(function () {
        operatorInput($(this).text());
    });

    function operatorInput(operator) {
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
            value[i] += operator;
            i++;
            $("#history").html(value[0] + value[1]);
            $("#math").html("0");
            value[i] = "0";
        }
        //ALLOWS FOR CHAINING
        else {
            var holder = Math.round(eval(value[0] + value[1] + value[2]) * 100) / 100;
            if (holder < 999999999) {
                $("#history").html(value[0] + value[1] + value[2] + "=" + holder + operator);
                value = ["", "", ""];
                value[0] = holder;
                value[1] = operator;
                i = 2;
                $("#math").html("0");
                value[i] = "0";
            }
            else {
                alert("Cannot chain operation, number too large! Press = for answer!");
            }
        }
    }
    //EQUAL BTN FUNCTIONALITY
    $("#equal").click(function () {
        equalsInput();
    });

    function equalsInput() {
        if (value.length === 3) {
            var holder = Math.round(eval(value[0] + value[1] + value[2]) * 100) / 100;
            $("#math").html(holder);
            $("#history").html(value[0] + value[1] + value[2] + "=");
            value = [""];
            value[0] = holder.toString();
            i = 0;
        }
        else {
            alert("Enter a complete equation!");
        }
    }
    //KEYBOARD INPUT
    window.onkeydown = function (event) {
        var keyPress = event.key;
        switch (keyPress) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            numberInput(keyPress);
            break;
        case "0":
            zeroInput(keyPress);
            break;
        case ".":
            decimalInput(keyPress);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            operatorInput(keyPress);
            break;
        case "Enter":
            equalsInput();
            break;
        }
    };
});