(function($){

    function getBgSize(elem) {
        var id = elem.attr('id');

        if(!$('#cache_'+id).length) {
            return elem.height();
        }

        return $('#cache_'+id).height();
    }

    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function () {
        windowHeight = $window.height();
    });

    $.fn.parallax = function(xpos, speedFactor, outerHeight, callback) {
        var $this = $(this);
        var getHeight;
        var firstTop
        var paddingTop = 0;

        //get the starting position of each element to have parallax applied to it
        $this.each(function(){
            firstTop = $this.offset().top;
        });

        var bgHeight = getBgSize($this);
        var shift = 0;

        if($this.css('backgroundPosition').split(' ')[1] != "50%") {
            shift += parseInt($this.css('backgroundPosition').split(' ')[1]) - 200;
        }

        if(outerHeight) {
            bgHeight = $this.height();
        }

        firstTop += ($this.height() - bgHeight);

        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }

        // setup defaults if arguments aren't specified
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;

        // function to be called whenever the window is scrolled or resized
        function update(){
            var pos = $window.scrollTop();

            $this.each(function(){

                var $element = $(this);

                var top = $element.offset().top;
                var height = getHeight($element);

                // Check if totally above or totally below viewport
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }

                var ypos = Math.round((firstTop - pos) * speedFactor) + shift;

                $element.css('backgroundPosition', xpos + " " + ypos + "px");

                if (callback) {
                    callback(ypos);
                }
            });
        }

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);
