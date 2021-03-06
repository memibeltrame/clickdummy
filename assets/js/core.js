var longpress = false;
var PageTransitions = (function() {

    var $main = $( '#pt-main' ),
        $pages = $main.children( 'div.pt-page' ),
        $iterate = $( '.goto' ),
        animcursor = 1,
        pagesCount = $pages.length,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        // animation end event name
        animEndEventName = "animationend",
        // support css animations
        support = true;
        

var counter= 1;
    function init() {

        counter++;
        if($("#pt-main").hasClass("wait")){
            //console.log("wait");
            //setTimeout(init(),1000);
            return;
        }

        $pages.each( function() {

            var $page = $( this );
            //console.log($page);

            var i = 0;
            $page.data( 'originalClassList', $page.attr( 'class' ) );
            if($page.hasClass("first-page")){

                $page.addClass("pt-page-current");
            }
        } );




        $( '.goto' ).on( 'click', function() {
            $("#addButton").addClass("hide");
            $("#addButtonWithDropdown").addClass("hide");
             $("#addButtonDropdownBackdrop").addClass("hide");
            $(".buttonDropdown").addClass("hide");
            if( isAnimating ) {
                return false;
            }
            //console.log($(this));
            nextPage( $(this) );
        } );

    }

    function nextPage(scope ) {
        //var animation = (options.animation) ? options.animation : options;
        //console.log($(scope).data("goto"));
        if( isAnimating ) {
            return false;
        }

        if( longpress ) {
            longpress = false;
            return false;
        }

        
        isAnimating = true;

        // var $currPage = $pages.eq( current );
        var $currPage = $(".pt-page-current");

        var animation = $(scope).data("animation");




        // var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
        var $nextPage = $("#page-"+ $(scope).data("goto")),
            outClass = '', inClass = '';
            //console.log($nextPage);
            $nextPage.addClass( 'pt-page-current' );

            if($nextPage.hasClass("hasAddButton")){
                setTimeout(function(){
                    $("#addButton").removeClass("hide");
                    $("#addButton").data("goto",$nextPage.data("addbuttongoto"));

                },400)
            }

            if($nextPage.hasClass("hasAddButtonWithDropdown")){
                $("#addButtonWithDropdown").data("dropdown", $(scope).data("goto"))
                setTimeout(function(){
                    $("#addButtonWithDropdown").removeClass("hide");
                },400)
            }

        // change toppar

        if ( $( "#topbar-"+$(scope).data("goto") ).length ) {
            $(".topbar").removeClass("topbar-current");
            $( "#topbar-"+$(scope).data("goto") ).addClass("topbar-current");
        }


        if ( $( "#tabbar-"+$(scope).data("goto") ).length ) {
            $(".tabbar").removeClass("tabbar-current");
            $( "#tabbar-"+$(scope).data("goto") ).addClass("tabbar-current");

            if($( "#tabbar-"+$(scope).data("goto") ).hasClass("hide")){
                $("#tabbarContainer").addClass("hide");
            } else{
                $("#tabbarContainer").removeClass("hide");
            }
        }
            if($(scope).data("largetabbar") == 1){
                 $("#tabbarContainer").addClass("tabbar-large");
            } else{
                $("#tabbarContainer").removeClass("tabbar-large");
            }

            if($(scope).data("replacegoto") == 1){
                var id = $(scope).data("id");
                $(".gotoReplaceTarget").each(function (it, elem) {
                    if(!$(this).data("pagetype")){
                        return;
                    }
                    var pagetype = $(this).data("pagetype");
                    $(elem).attr("data-goto",pagetype+id);
                });
            }

            if($(scope).data("replaceback") == 1){
                
                    var back = $(scope).data("back");
                if($(scope).data("backid")){
                    $("."+$(scope).data("backid")).each(function (it, elem) {
                        $(elem).data("goto", back);
                    });
                }
            }


            if($(scope).data("hidethem")){

                var idlist = $(scope).data("hidethem").split(" ");
                $(idlist).each(function (it, elem) {
                    $("#"+elem).addClass("hide");
                }); 
            }

            if($(scope).data("showthem")){
                var idlist = $(scope).data("showthem").split(" ");
                $(idlist).each(function (it, elem) {
                    $("#"+elem).removeClass("hide");
                }); 
            }


            if($(scope).hasClass("replaceContent")){
                var idlist = $(scope).data("idlist").split(" ");
                var that = $(scope);
                //console.log(idlist);
                $(idlist).each(function (it, elem) {
                    //console.log(elem);
                    var myattribute = elem;
                    $("."+elem).each(function (it, mycontent) {
                        //console.log(mycontent);
                        $(mycontent).html($(that).data(myattribute));
                    });
                }); 
            }
            

        switch( animation ) {

            case "moveInFromRight":
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case "moveInFromLeft":
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case "moveInFromBottom":
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case "moveInFromTop":
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case "moveOutFromTop":
                outClass = 'pt-page-moveToBottomFade  pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                break;
            case "moveOutToRight":
                outClass = 'pt-page-moveToRightFade';
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case "moveOutFromRight":
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;
            case "moveCamInFromBottom":
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                $("#tabbarContainer").addClass("hide");
                $nextPage.data("topbaraction", 'hide');
                break;
            case "moveInFromRightNoTabbar":
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                $("#tabbarContainer").addClass("hide");
                break;
            case "moveInFromBottomNoTabbar":
                outClass = 'pt-page-moveToTop';
                inClass = 'pt-page-moveFromBottom';
                $("#tabbarContainer").addClass("hide");
                break;
            case "moveOutFromTopNoTabbar":
                outClass = 'pt-page-moveToBottomFade  pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                $("#tabbarContainer").addClass("hide");
                break;
            case "moveOutFromRightNoTabbar":
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                $("#tabbarContainer").addClass("hide");
                break;
            case "moveOutFromRightAddTabbar":
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                $("#tabbarContainer").removeClass("hide");
                break;
            case "moveOutFromTopAddTabbar":
                outClass = 'pt-page-moveToBottomFade  pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                $("#tabbarContainer").removeClass("hide");
                break;
            case "moveCamOutFromTop":
                outClass = 'pt-page-moveToBottomFade  pt-page-ontop';
                inClass = 'pt-page-scaleUp';
                $(".topbarContainer").removeClass("hide");
                $("#tabbarContainer").removeClass("hide");
                break;
            case "noAnimation":
                outClass = 'pt-page-fastfade';
                inClass = 'pt-page-noAnimation';
                break;
            case "moveOutFromTop2":
                outClass = 'pt-page-moveToBottom';
                inClass = 'pt-page-moveFromTop';
                break;
            case "flipRight":
                outClass = 'pt-page-flipOutRight';
                inClass = 'pt-page-flipInLeft pt-page-delay300';
                break;
            case "flipLeft":
                outClass = 'pt-page-flipOutLeft';
                inClass = 'pt-page-flipInRight pt-page-delay300';
                break;

        }

        $currPage.addClass( outClass ).on( animEndEventName, function() {
            $currPage.off( animEndEventName );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );
        $nextPage.addClass( inClass ).on( animEndEventName, function() {
            $nextPage.off( animEndEventName );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );
        if( !support ) {
            onEndAnimation( $currPage, $nextPage );
        }
    }

    function onEndAnimation( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;
        resetPage( $outpage, $inpage );
        isAnimating = false;

    }

    function resetPage( $outpage, $inpage ) {
        $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
        $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
        switch($inpage.data("topbaraction")){
            case 'hide':
                $(".topbarContainer").addClass("hide");
                break;
            case 'show':
                $(".topbarContainer").removeClass("hide");
                break;
        }
    }

    init();

    return {
        init : init,
        nextPage : nextPage,
    };

})();

