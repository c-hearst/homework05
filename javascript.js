$(document).ready(function(){
// Variables that allow for display of the time/Date, moment.js formatting, and establishing the hours of the business day 8am to 6pm
    var showDate = $("#displayDate")
    var showMoment = moment()
    var formattedDate = showMoment.format( "dddd MMM do YYYY, hh:mm A")
    var startTime = 8
    var endTime = 18
    showDate.text(formattedDate)


    var itemsinLocalStorage = localStorage.getItem("workDaySchedule")

    if(itemsinLocalStorage == null ){

        var currentHour = showMoment.hour()
        for (let index = startTime; index < endTime; index++) {
        var hour = moment().hour(index).format("hh:00 A")
        if (index<= currentHour && index+1 > currentHour){
            renderTimeSlots(hour, "presentTime")
        } else if( index <= currentHour){
            renderTimeSlots(hour, "pastTime")
        } else {
            renderTimeSlots(hour, "futureTime")
        }
      }
    } else {
        var currentHour = showMoment.hour()
        var currentStuffInLocalStorage = JSON.parse(itemsinLocalStorage)

        for (let index = startTime; index < endTime; index++) {
            var hour = moment().hour(index).format("hh:00 A")

var text;
if(currentStuffInLocalStorage[hour] != undefined){
    text = currentStuffInLocalStorage[hour]
    console.log(hour)
    } else {
        text = ""
    }
    if(index <= currentHour && index+1 > currentHour){
        renderTimeSlots(hour, "presentTime", text)
    } else if( index <= currentHour){
        renderTimeSlots(hour, "pastTime", text)
    } else {
        renderTimeSlots(hour, "futureTime", text)
        }
       }
      }
    })

    function renderTimeSlots (time, colorCode, text){

// Creating style for containers, switching timeslot colors based on whether the time blocks are past hours, the current hour, or a future hour
    var containerEl = $("<div>")
    containerEl.addClass("container")

    switch(colorCode){
        case "presentTime":
            containerEl.attr("style", "background: red")
            break
        case "futureTime":
            containerEl.attr("style", "background: green")
            break
        default:
        containerEl.attr("style", "background: gray")
    }

    var timeSlotEl = $("<div>")
    timeSlotEl.addClass("timeSlot")
    timeSlotEl.text(time)

    var inputField = $("<input>")
    inputField.attr("data-time", time)
    if(text){
        inputField.val(text)
    }

    var saveButton = $("<button>")
    saveButton.text("Save")

    saveButton.on("click", onSave)

    containerEl.append(timeSlotEl, inputField, saveButton)
    $("#overallContainer").append(containerEl)

}
// Establishing function for saving input field text
function onSave(){
    var selectedTimeBlock = $(this).parent()
    var inputField = selectedTimeBlock.find(":input")
    var valueOfField = inputField.val().trim()
    var keyOfInputField = inputField.attr("data-time")


    var currentStuffInLocalStorage = localStorage.getItem("workDaySchedule")
    if(currentStuffInLocalStorage == null){

        var lStorageObj = {
            [keyOfInputField] : valueOfField
        }

        localStorage.setItem("workDaySchedule", JSON.stringify(lStorageObj))
    } else {
        currentStuffInLocalStorage = JSON.parse(currentStuffInLocalStorage)
        console.log(currentStuffInLocalStorage)
            currentStuffInLocalStorage[keyOfInputField] = valueOfField

            localStorage.setItem("workDaySchedule", JSON.stringify(currentStuffInLocalStorage))

    }
    console.log(currentStuffInLocalStorage)
    }