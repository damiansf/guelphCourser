//course object with course information
function courseObj(term, stat, name, locat, meetingInfo, faculty, avail, selectButton)
{
    this.term = term;
    this.stat = stat;
    this.name = name;
    this.locat = locat;
    this.meetingInfo = meetingInfo;
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
            meetingText = "",

            facultyText = $("#SEC_FACULTY_INFO_" + index).text(),
            availText = $("#LIST_VAR3_" + index).text();
            selectButton =("LIST_VAR1_" + index);

            for(var i = 0; i < meetingLec.length; i += 1)
            {
                meetingText += $(meetingLec[i]).text() + "\n";
            }

            for(var k = 0; k < meetingLab.length; k += 1)
            {
                meetingText += $(meetingLab[k]).text() + "\n";
            }

            for(var t = 0; t < meetingSem.length; t += 1)
            {
                meetingText += $(meetingSem[t]).text() + "\n";
            }

            for(var x = 0; x < meetingExam.length; x += 1)
            {
                meetingText += $(meetingExam[x]).text() + "\n";
            }

            var course = new courseObj(termText, statText, nameText, locationText, meetingText, facultyText, availText, selectButton);
            allCourses.add(course);
        }
    });
}
function search(input,head)
{
    var keySplit = input.split(" ");
    var tempArr = [];
    var positionArr = [];

    for(var j = 0;j < head.size;j += 1)
    {
        for(var i = 0; i < keySplit.length;i += 1)
        {
            if(head.getNode(j).course.name.toLowerCase().includes(keySplit[i]) == true)
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
        positionArr+=tempArr;
    }
    for(i = 0;i < positionArr.length;i += 1)
    {
        console.log(head.getNode(positionArr[i]).course.name);
    }
}

//takes in node number to remove node from all courses
function selectCourse(allCourses, pickedCourses, nodeNum)
{
    document.getElementById(allCourses.getNode(nodeNum).course.selectButton).checked = true;
    pickedCourses.add(allCourses.getNode(nodeNum).course);
    allCourses.remove(nodeNum);
}

//takes in node number to remove node from picked courses
function deSelectCourse(allCourses, pickedCourses, nodeNum)
{
    document.getElementById(pickedCourses.getNode(nodeNum).course.selectButton).checked = false;
    allCourses.add(pickedCourses.getNode(nodeNum).course);
    pickedCourses.remove(nodeNum);
}
function submit()
{
    document.datatelform.submit();
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
        /*Tests search and select/deselecting courses, tested using winter 2017 Accounting as search param's*/
        search("intro 01",allCourses);
        selectCourse(allCourses, pickedCourses, 0);
        selectCourse(allCourses, pickedCourses, 5);
        deSelectCourse(allCourses, pickedCourses, 0);
        submit();

        //removes all courses inside it, tests remove function
        /*while(allCourses.size)
        {
            allCourses.remove(allCourses.size-1);
        }*/
        //outputs all the courses in the list, tests the get function
        for(k = 0; k < allCourses.size; k += 1)
        {
            console.log(allCourses.getNode(k).course.meetingInfo + "\n");
        }

    }
});
