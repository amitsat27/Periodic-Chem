$(document).ready(function()
{
    var count = 0;

    var elements = ["H","Li","Na","K","Rb","Cs","Fr"];

    var solution = {"H" : 1 , "Li" : 3 , "Na" : 11 , "K" : 19 , "Rb" : 37 , "Cs" : 55 , "Fr" : 87};

    elements.sort(function() {return Math.random() - 0.5})

    for(var i=0;i<elements.length;i++)
    {
        $('<div>'+elements[i]+'</div>').data('element',elements[i]).attr('id',elements[i]).appendTo('#available_elements').draggable(
            {
                containment : '#root' ,
                cursor : 'move' ,
                revert : true ,
                stack : '#available_slots div'
            }
        );
    }

    var slots = [1,3,11,19,37,55,87];

    for(var i=0;i<slots.length;i++)
    {
        $('<div>'+slots[i]+'</div>').data('atomic_no',slots[i]).attr('id',slots[i]).appendTo('#available_slots').droppable(
            {
                accept : '#available_elements div' ,
                hoverClass : 'hovered' ,
                drop : handleElementDrop
            }
        );
    }
    function handleElementDrop(event , ui)
    {
        var dropped_upon_element = $(this).data('atomic_no');
        var temp = ui.draggable.data('element');
        var dragged_element = solution[temp];

        if(dropped_upon_element == dragged_element)
        {
            ui.draggable.addClass('correct');
            ui.draggable.draggable('disable');
            $(this).droppable('disable');
            ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
            ui.draggable.draggable( 'option', 'revert', false );
            $('#'+temp).html('<sub><sub><sub>'+dragged_element+'</sub></sub></sub>'+temp)
            count = count + 1 ;
        }
        if(count == 7)
        {
            alert('You did it !!!!!!');
        }
    }


});