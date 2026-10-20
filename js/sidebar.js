    function sidebarItem(item) {
        const $content = $("#content");
        $("#rimenu").load("./block/m" + item + ".html");
        $content.stop(true).css({ opacity: 0 }).load("./components/pages/" + item + ".html", function (_response, status) {
            if (status === "error") {
                console.error("Failed to load page:", item);
                return;
            }
            $content.animate({ opacity: 1 }, 500);
        });
        $(".sdlcontent-active").switchClass("sdlcontent-active", "sdlcontent", 150, "easeOutQuad");
        $("#" + item).switchClass("sdlcontent", "sdlcontent-active", 500, "easeInOutQuad");
    }
