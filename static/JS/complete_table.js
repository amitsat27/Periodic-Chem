$(document).ready(function(){
    window.openNav = function(){
        $("#mySidenav").css("width","15%");
        $("#main").css("margin-left","15%");
        $("#nav_button").hide();
    }
    window.closeNav = function(){
        $("#mySidenav").css("width","0px");
        $("#main").css("margin-left","0px");
        $("#nav_button").show();
    }
    $(".progress").hide();
    $(".btn").hide();
    ini_block_dict = {"sb":"#s_block","pb":"#p_block","db":"#d_block","fb":"#f_block"};
    var ini_block_name;
    $(".sidenav a").hover(function(){
        console.log($(this).attr("id"));
        ini_block_name = ini_block_dict[$(this).attr("id")];
        $(ini_block_name + ".element").css({"border" : "3px solid" , "border-color" : "black"});
    } , function(){
        $(ini_block_name + ".element").css({"border" : "1px solid" , "border-color" : "rgba(0,0,0,0.05)"});
    });
    window.fade_other_blocks = function(block_name){
        closeNav();
        $("#nav_button").hide();
        $(block_name + ".element").addClass("testing");
        $(".periodic").removeClass("p-lg-5");
        $(".periodic").addClass("p-lg-3");
        $(".progress").show();
        $(".btn").show()
        $(".btn").addClass("mr-2");
        $(".progress-bar").css({"width":"0%"});
        $(".progress").addClass("m-5");
        block_list = ["#s_block","#p_block","#d_block","#f_block"];
        var x = document.querySelectorAll(block_name);
        var new_element;
        var key;
        var child_nodes;
        var score = 0;
        var done_elements = {};
        var count = 0;
        var block_count=0;
        var prog = 0;
        var ele_block;
        var ele_font;
        for(var i=0;i<x.length;i++)
        {
            child_nodes = x[i].children;
            key = child_nodes[1].innerHTML;
            new_element = $('<input>');
            $(new_element).attr('type','text');
            $(new_element).attr('minlength','1');
            $(new_element).attr('maxlength','3');
            $(new_element).attr('tabindex','-1');
            $(new_element).data("key",key);
            done_elements[$(new_element).data("key")] = 0;
            $.each(x[i].attributes, function(i, attrib){
                $(new_element).attr(attrib.name, attrib.value);
            });
            $(x[i]).replaceWith(function(){
                return $(new_element).append($(x[i]).contents());
            });
            block_count = block_count + 1;
        }
        for(var i=0;i<4;i++)
        {
            if(block_list[i] == block_name)
            {
                continue ;
            }
            else
            {
                ele_block = block_list[i];
                x = document.querySelectorAll(block_list[i]);
                for(var j=0;j<x.length;j++)
                {
                    x[j].style.opacity = 0.15 ;
                }
                $(block_list[i] + ".element").addClass("testing_1");
            }
        }
        ele_font = ele_block.replace("#",".");
        $(block_name + ".element").css("width",$(ele_block).css("width"));
        $(block_name + ".element").css("height",$(ele_block).css("height"));
        $(block_name + ".element").click(function(){
            done_elements[$(this).data("key")] = done_elements[$(this).data("key")] + 1;
            count = 0;
            $(this).keyup(function(){
                if($(this).val() == $(this).data("key"))
                {
                    $(this).attr('disabled','disabled');
                    $(this).addClass("end");
                    $(this).css({"font-size" : $(ele_font).css("font-size") , "font-weight" : "bold" , "color" : "rgba(255,255,255,0.9)"});
                    score = score + 1;
                    if(done_elements[$(this).data("key")] > 1)
                    {
                        count = count + 1;
                        if(count != done_elements[$(this).data("key")])
                        {
                            score = score - 1;
                        }
                    }
                    prog = (score / block_count) * 100;
                    $(".progress-bar").css("width", prog + "%");
                }
                if(score == block_count)
                {
                    $(".btn").removeClass("btn-info btn-sm");
                    $(".btn").addClass("btn-success");
                    $("#reset").css("text-align","center");
                    setTimeout(function() { alert("Wow , you achieved 100% accuracy !!!"); }, 700);
                }
            });
        });
        $(window).resize(function(){
            $(block_name + ".element").css("width",$(ele_block).css("width"));
            $(block_name + ".element").css("height",$(ele_block).css("height"));
            $(block_name + ".element").css("font-size",$(ele_font).css("font-size"));
        });
    }
});