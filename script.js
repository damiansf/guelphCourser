//gets html in "body" class
var htmlString = $('body').html().toString();

//The indexOf() method returns the position of the first occurrence of a specified value in a string. This 
//method returns -1 if the value to search for never occurs.
var index = htmlString.indexOf("Sections");

if (index != -1)
{
    alert("FOUND SECTIONS IN PAGE");
}

function storeData()
{
}

function parse()
{
}
