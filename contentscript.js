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
                if(i==meetingLec.length-1)
                {
                    meetingLecText+="\n";
                }
            }

            for(var k = 0; k < meetingLab.length; k += 1)
            {
                meetingLabText += $(meetingLab[k]).text() + "\n";
                if(k==meetingLab.length-1)
                {
                    meetingLabText+="\n";
                }
            }

            for(var t = 0; t < meetingSem.length; t += 1)
            {
                meetingSemText += $(meetingSem[t]).text() + "\n";
                if(t==meetingSem.length-1)
                {
                    meetingSemText+="\n";
                }
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
    var keySplit = input.split(" "),
    tempArr = [],
    positionArr = [],
    tbl = document.createElement('table'),
    rowDetails = null,
    rowEl = [];
    
    tbl.style.maxWidth = '100px';
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
    document.getElementById("searchPanel").appendChild(tbl);
}
//takes in node number to remove node from all courses
function selectCourse(allCourses, pickedCourses, nodeNum)
{
    document.getElementById(allCourses.getNode(nodeNum).course.selectButton).checked = true;
    pickedCourses.add(allCourses.getNode(nodeNum).course);
    allCourses.remove(nodeNum);
    search(document.getElementById("searchBar").value,allCourses,pickedCourses);
    selectedCoursesTable(allCourses,pickedCourses);
}

//takes in node number to remove node from picked courses
function deSelectCourse(allCourses, pickedCourses, nodeNum)
{
    document.getElementById(pickedCourses.getNode(nodeNum).course.selectButton).checked = false;
    allCourses.add(pickedCourses.getNode(nodeNum).course);
    pickedCourses.remove(nodeNum);
    search(document.getElementById("searchBar").value,allCourses,pickedCourses);
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
    }
    document.getElementById("selectedCoursesDiv").appendChild(tbl);
}
function submit()
{
    document.forms['datatelform'].submit();
}
function initCalendar()
{
    $('#content').before( $('<div>').load(chrome.extension.getURL('table.html')));
    $('head').append($('<style>').load(chrome.extension.getURL('table.css')));
    $('#content').hide();
}

function updateCalendar(pickedCourses)
{
    calendarClear();
    var curr = pickedCourses.head.course;
    while(curr !== null)
    {
        addToDisplay(curr);
        curr = curr.next;
    }
}

function addToDisplay(curr)
{

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
        initCalendar();
        $(document).on('keyup', '#searchBar', function(e)
        {
            search(document.getElementById("searchBar").value,allCourses,pickedCourses);
        });
        $(document).on('mouseup', '#submitButton', function(e)
        {
            submit();
        });
        parseAndStore(allCourses);
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
    }

});
