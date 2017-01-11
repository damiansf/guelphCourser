function courseObj(term, stat, name, locat, lectureTime, labTime, seminarTime, examTime, faculty, avail, selectButton)
{
    this.term = term;
    this.stat = stat;
    this.name = name;
    this.locat = locat;
    this.lectureTime = lectureTime;
    this.labTime = labTime;
    this.seminarTime = seminarTime;
    this.examTime = examTime;
    this.faculty = faculty;
    this.avail = avail;
    this.selectButton = selectButton;
}

//linked list node
function Node(course)
{
    this.course = course;
    this.next = null;
}

//linked list
function List()
{
    this.size = 0;
    this.head = null;
}

//add to list alphabetically, returns added node
List.prototype.add = function(course)
{
    var node = new Node(course),
        curr = this.head,
        prev = null;

    while(curr && curr.course.name < node.course.name)
    {
        prev = curr;
        curr = curr.next;
    }

    if(!prev)
    {
        this.head = node;
    }
    else
    {
        prev.next = node;
    }
    if(curr)
    {
        node.next = curr;
    }

    this.size += 1;
    return node;
};

//delete function, deletes at p, returns deleted node
List.prototype.remove = function(i)
{
    var curr = this.head;
    var prev = null;

    if(i == 0)
    {
        this.head = curr.next;
    }
    else if (i > 0)
    {
        while(i > 0 && curr.next)
        {
            i -= 1;
            prev = curr;
            curr = curr.next;
        }
        if(i != 0)
        {
            throw new Error();
        }
        if(prev && curr.next)
        {
            prev.next = curr.next;
        }
    }
    else
    {
        throw new Error();
    }
    this.size -= 1;
    return curr;
};

List.prototype.getNode = function(i)
{
    var curr = this.head;
    if(i < 0 || i > this.size - 1)
    {
        throw new Error();
    }
    while(i > 0)
    {
        i -= 1;
        curr = curr.next;
    }

    return curr;

};

function parseAndStore(allCourses)
{
    $("#GROUP_Grp_WSS_COURSE_SECTIONS tr").each(function(index){
        if(index !== 0) //skip the first since fields start at 1
        {
            var termText = $("#SEC_TERM_" + index).text(),
            statText = $("#LIST_VAR2_" + index).text(),
            nameText = $("#SEC_SHORT_TITLE_" + index).text(),
            locationText = $("#SEC_LOCATION_" + index).text(),

            meetingLec = $('div.meet.LEC', this).children(),
            meetingLab = $('div.meet.LAB', this).children(),
            meetingSem = $('div.meet.SEM', this).children(),
            meetingExam = $('div.meet.EXAM', this).children(),
            meetingLecText = "",
            meetingLabText = "",
            meetingSemText = "",
            meetingExamText = "",

            facultyText = $("#SEC_FACULTY_INFO_" + index).text(),
            availText = $("#LIST_VAR3_" + index).text();
            selectButton =("LIST_VAR1_" + index);
            for(var i = 0; i < meetingLec.length; i += 1)
            {
                meetingLecText += $(meetingLec[i]).text() + "\n";
            }

            for(var k = 0; k < meetingLab.length; k += 1)
            {
                meetingLabText += $(meetingLab[k]).text() + "\n";
            }

            for(var t = 0; t < meetingSem.length; t += 1)
            {
                meetingSemText += $(meetingSem[t]).text() + "\n";
            }

            for(var x = 0; x < meetingExam.length; x += 1)
            {
                meetingExamText += $(meetingExam[x]).text() + "\n";
            }

            var course = new courseObj(termText, statText, nameText, locationText, meetingLecText, meetingLabText, meetingSemText, meetingExamText, facultyText, availText, selectButton);
            allCourses.add(course);
        }
    });
}
function search(input,head, pickedCourses)
{
    var keySplit = input.split(" ");
    var tempArr = [];
    var positionArr = [];
    var tbl = document.createElement('table');
    var rowDetails = null;
    var rowEl = [];

    tbl.style.width = '100%';
    tbl.id = "searchResults";
    tbl.setAttribute('border', '1');
    if(document.getElementById("searchResults") != null)
    {
        document.getElementById("searchResults").parentNode.removeChild(document.getElementById("searchResults"));
    }
    for(var j = 0;j < head.size;j += 1)
    {
        tempArr.length = 0;
        for(var i = 0; i < keySplit.length;i += 1)
        {
            if(head.getNode(j).course.name.toLowerCase().includes(keySplit[i].toLowerCase()) == true)
            {
                if(tempArr.includes(j) == false)
                {
                    tempArr.push(j);
                }
            }
            else
            {
                tempArr.length = 0;
                break;
            }
        }
        positionArr = positionArr.concat(tempArr);
    }
    rowDetails = tbl.insertRow();  // DOM method for creating table rows
    rowDetails.insertCell().textContent = "Term";
    rowDetails.insertCell().textContent = "Status";
    rowDetails.insertCell().textContent = "Name";
    rowDetails.insertCell().textContent = "Location";
    rowDetails.insertCell().textContent = "Meeting Information";
    rowDetails.insertCell().textContent = "Faculty";
    rowDetails.insertCell().textContent = "Avalible/Capacity";
    for(var i = 0;i < positionArr.length;i += 1)
    {
        rowEl[i] = tbl.insertRow();  // DOM method for creating table rows
        rowEl[i].id = positionArr[i];
        rowEl[i].insertCell().textContent = head.getNode(positionArr[i]).course.term;
        rowEl[i].insertCell().textContent = head.getNode(positionArr[i]).course.stat;
        rowEl[i].insertCell().textContent = head.getNode(positionArr[i]).course.name;
        rowEl[i].insertCell().textContent = head.getNode(positionArr[i]).course.locat;
        rowEl[i].insertCell().innerText = head.getNode(positionArr[i]).course.lectureTime + head.getNode(positionArr[i]).course.labTime + head.getNode(positionArr[i]).course.seminarTime + head.getNode(positionArr[i]).course.examTime;
        rowEl[i].insertCell().textContent = head.getNode(positionArr[i]).course.faculty;
        rowEl[i].insertCell().textContent = head.getNode(positionArr[i]).course.avail;
        rowEl[i].addEventListener("click",function(){selectCourse(head,pickedCourses,this.id);});
    }
    document.getElementById("main").appendChild(tbl);
}
//takes in node number to remove node from all courses
function selectCourse(allCourses, pickedCourses, nodeNum)
{
    document.getElementById(allCourses.getNode(nodeNum).course.selectButton).checked = true;
    pickedCourses.add(allCourses.getNode(nodeNum).course);
    allCourses.remove(nodeNum);
    search(document.getElementById("search").value,allCourses,pickedCourses);
    selectedCoursesTable(allCourses,pickedCourses);
}

//takes in node number to remove node from picked courses
function deSelectCourse(allCourses, pickedCourses, nodeNum)
{
    document.getElementById(pickedCourses.getNode(nodeNum).course.selectButton).checked = false;
    allCourses.add(pickedCourses.getNode(nodeNum).course);
    pickedCourses.remove(nodeNum);
    search(document.getElementById("search").value,allCourses,pickedCourses);
    selectedCoursesTable(allCourses,pickedCourses);
}
function selectedCoursesTable(head, pickedCourses)
{
    var tbl = document.createElement('table');
    var rowDetails = null;
    var rowEl = [];

    tbl.id = "selectedCourses";
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    if(document.getElementById("selectedCourses") != null)
    {
        document.getElementById("selectedCourses").parentNode.removeChild(document.getElementById("selectedCourses"));
    }
    rowDetails = tbl.insertRow();  // DOM method for creating table rows
    rowDetails.insertCell().textContent = "Term";
    rowDetails.insertCell().textContent = "Status";
    rowDetails.insertCell().textContent = "Name";
    rowDetails.insertCell().textContent = "Location";
    rowDetails.insertCell().textContent = "Meeting Information";
    rowDetails.insertCell().textContent = "Faculty";
    rowDetails.insertCell().textContent = "Avalible/Capacity";
    for(var i = 0;i < pickedCourses.size;i += 1)
    {
        rowEl[i] = tbl.insertRow();  // DOM method for creating table rows
        rowEl[i].id = i;
        rowEl[i].insertCell().textContent = pickedCourses.getNode(i).course.term;
        rowEl[i].insertCell().textContent = pickedCourses.getNode(i).course.stat;
        rowEl[i].insertCell().textContent = pickedCourses.getNode(i).course.name;
        rowEl[i].insertCell().textContent = pickedCourses.getNode(i).course.locat;
        rowEl[i].insertCell().innerText = pickedCourses.getNode(i).course.lectureTime + pickedCourses.getNode(i).course.labTime + pickedCourses.getNode(i).course.seminarTime + pickedCourses.getNode(i).course.examTime;
        rowEl[i].insertCell().textContent = pickedCourses.getNode(i).course.faculty;
        rowEl[i].insertCell().textContent = pickedCourses.getNode(i).course.avail;
        rowEl[i].addEventListener("click",function(){deSelectCourse(head,pickedCourses,this.id);});
    }b
    document.getElementById("main").appendChild(tbl);
}
function submit()
{
    document.datatelform.submit();
}

//initializes the table, and refreshes it with new stuff if needed
function initCalendar(newThing)
{
    var table = $('<div>').load(chrome.extension.getURL('table.html'));
    if(newThing)
    {
        $(table).append(newThing);
    }
    $('#content').before(table);
    $('head').append($('<style>').load(chrome.extension.getURL('table.css')));

    //$('#content').hide(); //this hides the content div

}

function updateCalendar(pickedCourses)
{
    //clear the entire claendar
    //calendarClear();
    //add the courses from the head of pickedCourses list
    var curr = pickedCourses.head;
    var tableSlots = [];

    //fetch all the course slots in array form
    while(curr !== null)
    {
        tableSlots = tableSlots.concat(getAllSlots(getAllTimes(curr.course)));
        curr = curr.next;
    }

    //add all the course slots to a tableslotsdiv
    var tableSlotsDiv = document.createElement("div");
    tableSlotsDiv.setAttribute('id','tableSlots');
    tableSlots.forEach(function(slotDiv){
        tableSlotsDiv.appendChild(slotDiv);
    });

    //remove the table if it already exists
    if(document.getElementById("table_content"))
    {
        $("#table_content").remove();
    }

    //remake the calendar
    initCalendar(tableSlotsDiv);

}

function getAllSlots(allTimes)
{
    var allSlots = [];
    if("lecTime" in allTimes)
    {
        allSlots = allSlots.concat(getSingleSlots(allTimes.lecTime));
    }
    if("labTime" in allTimes)
    {
        allSlots = allSlots.concat(getSingleSlots(allTimes.labTime));
    }
    if("semTime" in allTimes)
    {
        allSlots = allSlots.concat(getSingleSlots(allTimes.semTime));
    }
    return allSlots;
}

//not yet fully implemented
function getSingleSlots(time)
{
    var slots = [];
    time.days.forEach(function(day){
        var slotDiv = document.createElement('div');
        slotDiv.setAttribute('id','slotDiv')
        var xpos = 0;
        var ypos = 0;
        var gridStartTime = 480;
        var startXPos = 51;
        var startYPos = 22;
        var xWidth = 120;
        var yScale = 30;
        var yBorder = 2;
        var yHeight = 28;
        xpos = startXPos + (day)*xWidth;
        //ypos = startYPos + (startTime - gridStartTime)*(yHeight + yBorder)/yScale;
        ypos = startYPos + (time.timeStart - gridStartTime)*(yHeight)/yScale;
        //duration = (endTime - startTime)*yHeight/yScale;
        duration = (time.timeEnd - time.timeStart)*yHeight/yScale - yBorder;
        slotDiv.style.left = 0 + 'px';
        slotDiv.style.top = 100 + 'px';
        slotDiv.style.height = 100 + 'px';
        console.log(slotDiv.style.left+" "+slotDiv.style.top+" "+slotDiv.style.height);
        slots.push(slotDiv);
    });
    console.log(slots);
    return slots;
}

//gets all time information from lectures, labs and seminars
function getAllTimes(course)
{
    var allTimes = {};
    if(course.lectureTime)
    {
        allTimes.lecTime = getSingleTime(course.lectureTime);
    }
    if(course.labTime)
    {
        allTimes.labTime = getSingleTime(course.labTime);
    }

    if(course.semTime)
    {
        allTimes.semTime = getSingleTime(course.seminarTime);
    }

    return allTimes;
}

function getSingleTime(time)
{
    let dayEnum = {"Mon": 0,"Tues": 1,"Wed": 2,"Thur": 3,"Fri": 4};

    //parsing the object information to get times
    var days = [];

    //breaks down time selection by line
    var timeBlock = time.split('\n');

    //takes first line of time section, translates days to numbers and returns an array of them
    timeBlock[0].split(/[\s,]+/).forEach(function(key){ //splits by spaces and commas
        if(key in dayEnum)
        {
            days.push(dayEnum[key]);
        }
    });

    //get time from second line, this will always be the same(in format) so i will be taking it by position
    var timeStart = Number(timeBlock[1].slice(0,2)+timeBlock[1].slice(3,5));
    var timeEnd = Number(timeBlock[1].slice(10,12)+timeBlock[1].slice(13,15));

    //timestart time adjuster(accounting for 12PM and AM weirdness)
    if(timeBlock[1].slice(5,7) === "PM" && !(timeStart >= 1200 && timeStart <= 1259))
    {
        timeStart += 1200;
    }
    else if(timeBlock[1].slice(5,7) === "AM" && (timeStart >= 1200 && timeStart <= 1259))
    {
        timeStart -= 1200;
    }

    //timeend time adjuster(accounting for 12PM and AM weirdness)
    if(timeBlock[1].slice(15,17) === "PM" && !(timeEnd >= 1200 && timeEnd <= 1259))
    {
        timeEnd += 1200;
    }
    else if(timeBlock[1].slice(15,17) === "AM" && (timeEnd >= 1200 && timeEnd <= 1259))
    {
        timeEnd -= 1200;
    }

    //return an object with all the time information
    return {days:days, timeStart:timeStart, timeEnd:timeEnd};
}

//main function, runs on page load
$(document).ready(function()
{
    //gets html in "body" class
    var htmlString = $('body').html().toString(),

    //The indexOf() method returns the position of the first occurrence of a specified value in a string. This
    //method returns -1 if the value to search for never occurs.
    indexTitle = htmlString.indexOf("Section Selection Results"),
    indexCourse = htmlString.indexOf("Section Name and Title");

    var allCourses = new List();
    var pickedCourses = new List();

    if (indexTitle != -1 && indexCourse != -1)
    {
        parseAndStore(allCourses);
        //document.getElementById("content").style.visibility="hidden";
        var input = document.createElement('input');
        input.type = "text";
        input.id = "search";
        document.getElementById("main").appendChild(input);
        document.getElementById("search").addEventListener("keyup", function(){search(document.getElementById("search").value,allCourses,pickedCourses);});
        /*Tests search and select/deselecting courses, tested using winter 2017 Accounting as search param's
        search("intro",allCourses);
        selectCourse(allCourses, pickedCourses, 0);
        selectCourse(allCourses, pickedCourses, 5);
        deSelectCourse(allCourses, pickedCoureses, 0);
        submit();*/

        //removes all courses inside it, tests remove function
        /*while(allCourses.size)
        {
            allCourses.remove(allCourses.size-1);
        }*/
        /*
        //outputs all the courses in the list, tests the get function
        for(k = 0; k < allCourses.size; k += 1)
        {
            console.log(allCourses.getNode(k).course.meetingInfo + "\n");
        }
        */


        initCalendar();
        pickedCourses.add(allCourses.head.course);
        updateCalendar(pickedCourses);
    }

});
