
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var modal = (function(){
    var init = function () {

        var close = function(ev) {
            ev.preventDefault();
            $('.curtain').fadeOut();
            $('.modal-wrapper').fadeOut();
        };

        $('.modal').find('button').click(close);
        $('.modal-wrapper').click(close);
    };

    var show = function(str) {
        $('.modal').find('.msg').empty().append('<p>' + str + '</p>');
        $('.curtain').fadeIn();
        $('.modal-wrapper').fadeIn();
    };

    return {
        show: show,
        init: init
    };
})();

var scroll = (function(){
    var animationInProgress = false;
    var scrollTo = function(id, offset) {
        var _offset = offset != null ? offset : 0;
        animationInProgress = true;
        $('html body').animate({
            scrollTop: $(id).offset().top - $('nav').height() - _offset
        }, 1000, function(){
            animationInProgress = false;
        });
    };

    var init = function() {
        $('#aMain').click(function(ev) {
            ev.preventDefault();
            scrollTo('.highlight');
        });
        $('#aAbout').click(function(ev) {
            ev.preventDefault();
            scrollTo('#about h2', 50);
        });
        $('#aPortifolio').click(function(ev) {
            ev.preventDefault();
            scrollTo('#portifolio');
        });
        $('#aSkills').click(function(ev) {
            ev.preventDefault();
            scrollTo('#skills');
        });
        $('#aContact').click(function(ev) {
            ev.preventDefault();
            scrollTo('#contact');
        });
        $('h1').find('a').click(function(ev) {
            ev.preventDefault();
            scrollTo('.highlight');
        });
    };

    return {
        scrollTo: scrollTo,
        init : init
    };
})();

var navControl = (function() {
    var articles = null;

    var updateArticles = function() {
        articles = $('article');
    };

    var findCurrentArticle = function() {
        var scrollTop = $(window).scrollTop() + $('nav').height() + 5;
        for(var i = 0; i < articles.length; i++) {
            var current = $(articles[i]);
            var y1 = current.offset().top;
            var y2 = y1 + current.height();
            if (scrollTop >= y1 && scrollTop <= y2) {
                return current;
            }
        }
        return null;
    };

    var init = function() {
        updateArticles();
    };

    return {
        findCurrentArticle : findCurrentArticle,
        updateArticles : updateArticles,
        init: init
    };
})();

var resizer = (function(){
    var width, height;

    var resize = function(){
        width = $(window).width();
        height = $(window).height();

        if(height < 758) {
            height = 758;
        } else if(height > 1080) {
            height = 900;
        }

        height += $('nav').height();

        $('.resize').height(height);

        if(isMobile.any()) return;

        $('.highlight').parallax("50%", 0.5, null, function(y) {
            var blur = Math.abs(y) / 20;
            $('.headline').removeClass('no-blur');
            $('.headline').css({
                '-webkit-filter' : 'blur(' + blur + 'px)',
                '-moz-filter' : 'blur(' + blur + 'px)',
                '-o-filter' : 'blur(' + blur + 'px)',
                '-ms-filter' : 'blur(' + blur + 'px)',
                'filter' : 'blur(' + blur + 'px)'
            });
        });
        $('.bg2').parallax("50%", 0.5, true);
    };

    var init = function(){
        //$(window).resize(resize);
        resize();
    };

    return {
        init: init
    };
})();

var navBar = (function(){
    var nav = null;
    var stickyNavTop = 0;
    var scroll = function(){
        var scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            nav.removeClass('back-to-top');
            nav.addClass('sticky');
        } else {
            nav.addClass('back-to-top');
            nav.removeClass('sticky');
        }
        var article = navControl.findCurrentArticle();
        var id = article.attr('id');
        nav.find('li a').removeClass('selected');
        $('.arrow-right, .arrow-left ').css({
            'animation' : 'none',
            '-webkit-animation' : 'none'
        });
        switch(id) {
            case 'main':
                nav.removeClass('inverse');
                $('.semi-circle').css('opacity', 1);
                break;
            case 'about':
                nav.removeClass('inverse');
                nav.find('#aAbout').addClass('selected');
                $('.semi-circle').css('opacity', 1);
                break;
            case 'portifolio':
                nav.removeClass('inverse');
                nav.find('#aPortifolio').addClass('selected');
                $('.semi-circle').css('opacity', 1);
                break;
            case 'skills':
                nav.addClass('inverse');
                nav.find('#aSkills').addClass('selected');
                $('.semi-circle').css('opacity', 1);
                break;
            case 'contact':
                nav.removeClass('inverse');
                nav.find('#aContact').addClass('selected');
                $('.semi-circle').css('opacity', 0);
                break;
            default:
                nav.removeClass('inverse');
                $('.semi-circle').css('opacity', 0);
                nav.find('#aContact').addClass('selected');
                break;
        }
    };
    var bindArrow = function() {
        $('.semi-circle').click(function(ev) {
            var article = navControl.findCurrentArticle();
            article = article.next();
            var id = article.attr('id');
            switch(id) {
                case 'about':
                    nav.find('#aAbout').click();
                    break;
                case 'portifolio':
                    nav.find('#aPortifolio').click();
                    break;
                case 'skills':
                    nav.find('#aSkills').click();
                    break;
                case 'contact':
                    nav.find('#aContact').click();
                    break;
            }
            ev.preventDefault();
        });
    };
    var init = function(){
        navControl.init();
        nav = $('nav');
        stickyNavTop = nav.offset().top;
        scroll();
        $(window).scroll(scroll);
        bindArrow();
    };
    return {
        init: init
    };
})();

var github = (function(){
    var username = 'raphaelcruzeiro';
    var serviceUrl = 'https://api.github.com/';

    var init = function() {
        var items = $('.portifolio-item');
        for (var i = 0; i < items.length; i++) {
            var current = $(items[i]);
            if(current.attr('gh-name')) {
                var repoName = current.attr('gh-name');
                var url = serviceUrl + 'repos/' + username + '/' + repoName;
                $.getJSON(url, function(response) {
                    var current = $('li.portifolio-item[gh-name="' + response.name + '"]');
                    current.find('.forks').empty().append(response.forks_count);
                    current.find('.stars').empty().append(response.stargazers_count);
                });
            }
        }
    };

    return {
        init: init
    };
})();

var video = (function(){
    var init = function(){
        $('a.video').click(function(ev) {
            ev.preventDefault();
            var id = /\d+/.exec($(this).attr('href'));
            var url = 'http://player.vimeo.com/video/' + id;
            var iframe = '<iframe width="810" height="506" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
            $('.video-player').empty().append(iframe);
            $('.video-player').find('iframe').attr('src', url);
            $('.curtain').fadeIn();
            $('.video-wrapper').fadeIn();
        });
        $('.video-player').click(function(ev) {
            ev.preventDefault();
            $('.curtain').fadeOut();
            $('.video-wrapper').fadeOut();
            $('.video-player').empty();
        });
    };

    return {
        init: init
    }
})();

var contactForm = (function(){
    var init = function() {
        $('.yellow').find('form').submit(function(ev){
            ev.preventDefault();
            $('.input-container').removeClass('error');
            var error = false;

            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!$('textarea[name=message]').val().length) {
                error = true;
                $('textarea[name=message]').closest('.input-container').addClass('error');
            }

            if (!$('input[name=subject]').val().length) {
                error = true;
                $('input[name=subject]').closest('.input-container').addClass('error');
            }

            if (!re.test($('input[name=email]').val())) {
                error = true;
                $('input[name=email]').closest('.input-container').addClass('error');
            }

            if (error) return;

            var data = $(this).serialize();
            $.post('/api/contact/', data, function(response) {
                $('.yellow').find('form').find('input, textarea').val('');
                modal.show('Thank you for contacting me. I\'ll get back to you as soon as possible!');
            });
        });
    };

    return {
        init: init
    };
})();

$(document).ready(function(){
    resizer.init()
    scroll.init();
    navBar.init();
    github.init();
    contactForm.init();
    modal.init();
    video.init();
    $('.headline').addClass('no-blur');
});
