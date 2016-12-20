$(document).ready(function()
{
    //gets html in "body" class
    var htmlString = $('body').html().toString(),

    //The indexOf() method returns the position of the first occurrence of a specified value in a string. This 
    //method returns -1 if the value to search for never occurs.
        indexTitle = htmlString.indexOf("Section Selection Results"),
        indexCourse = htmlString.indexOf("Section Name and Title");

    if (indexTitle != -1 && indexCourse != -1)
    {
        parseAndStore();
    }
});

function parseAndStore()
{
    $("#GROUP_Grp_WSS_COURSE_SECTIONS tr").each(function(index){
        if(index !== 0) //skip the first since fields start at 1
        {
            var termText = $("#SEC_TERM_" + index).text(),
            statText = $("#LIST_VAR2_" + index).text(),
            nameText = $("#SEC_SHORT_TITLE_" + index).text(),
            locationText = $("#SEC_LOCATION_" + index).text(),

            meetingLec = $('div.meet.LEC', this).children(),
            meetingText = "",

            facultyText = $("#SEC_FACULTY_INFO_" + index).text(),
            availText = $("#LIST_VAR3_" + index).text();

            for(i = 0; i < meetingLec.length; i += 1)
            {
                meetingText += $(meetingLec[i]).text() + "\n";
            }

            console.log(termText+" "+statText+" "+nameText+" "+locationText+" "+facultyText+" "+availText + " ");
            console.log(meetingText);
        }
            
        
    });
}

//course object with course information
var courseObj = {
    term:null,
    stat:null,
    name:null,
    locat:null,
    meetingInfo:null,
    faculty:null,
    avail:null,
    credits:null,
    academ:null

};

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
List.prototype.insert = function(course)
{
    var node = new Node(course),
        currentNode = this.head;

    //if empty list
    if(currentNode == null)
    {
        this.head = node;
        this.length += 1;

        return node;
    }

    //non-empty list case, insert in alphabetic course title order and more spots open
    while(currentNode.next != null && currentNode.course.name < node.course.name &&  currentNode.course.avail < node.course.avail)
    {
        currentNode = currentNode.next;
    }

    currentNode.next = node;

    this.length += 1;

    return node;
}

//delete function, deletes at p, returns deleted node
List.prototype.remove = function(position)
{
    var currentNode = this.head,
        size = this.size,
        count = 0,
        message = {failure: 'trying to delete non-existent node'};
        lastNode = null,
        currentNode = null,
        deletedNode = null;

    //bad position
    if(position < 0 || position > size)
    {
        throw new Error(message.failure);
    }

    //deleting head
    if(position === 1)
    {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this.size -= 1;

        return deletedNode;
    }

    //deleting anything else
    while(count < position)
    {
        lastNode = currentNode;
        currentNode = currentNode.next;
        count += 1;
    }

    lastNode.next = currentNode.next;
    deletedNode = currentNode;
    currentNode = null;
    this.size -= 1;

    return deletedNode;

}
