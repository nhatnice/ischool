    function sidebarItem(item)
    {
        $("#rimenu").load("./block/m"+item+".html");
        $("#content").css({"opacity":"0"});
        $("#content").load("./components/pages/"+item+".html");
        $("#content").animate({opacity:1},500);
        $(".sdlcontent-active").switchClass("sdlcontent-active","sdlcontent",150,"easeOutQuad");
        $("#"+item).switchClass("sdlcontent","sdlcontent-active", 500, "easeInOutQuad");
      console.log("load " + item);
    }
