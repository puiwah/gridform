var lastClicked;
var grid = clickableGrid(3,3,function(el,row,col,i){
    if (el.className!='clicked') {
        el.className='clicked';
    }
    else {
        el.className = '';
    }
    lastClicked = el;
});

document.body.appendChild(grid);

function clickableGrid( rows, cols, callback ){
    var words = ["Aristry", "Art project A", "Philosophy", "The space", "Luca Leung", "Rara", "Art project B", "Entry fee", "Art project C"];
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.setAttribute("id", "grid");
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = words[i];
            ++i;
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}

function SubForm (){
    words = [];

    formdata = $("#myForm").serializeArray();
    $(".clicked").each(function(){
        console.log("clicked: " + $(this).html());
        words.push($(this).html());
    })

    console.log(words);
    formdata.push({"name" : "grid", "value" : words.toString()});
    console.log(formdata);

    $.ajax({
        url: 'https://api.apispreadsheets.com/data/NG49CkITLNr4SxID/',
        type: 'post',
        data: formdata,
        success: function(){
          alert("Form Data Submitted :)")
        },
        error: function(){
          alert("There was an error :(")
        }
    });
}