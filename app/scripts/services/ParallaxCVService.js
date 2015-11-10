'use strict';
angular.module('ajs5BisApp')
    .service('ParallaxCVService', function () {

        this.iniiit = function() {
            $(window).load(function () {
                positionner_cv_parallax();
                //Effet parallax
                $(window).scroll(function () {
                    //scroll_changed_pdt_vueGrand = true;//

                    //bouge les elements html
                    //$( "#div-fixe" ).css( "top", -$(window).scrollTop()*0.75);

                    //bouge le fond
                    //$( "#fonfonfond" ).css( "background-position", "center "+($(window).scrollTop()*0.3)+"px");
                    //$( "#fonfonfond2" ).css( "background-position", "center "+(($(window).scrollTop())*0.3)+"px");

                    positionner_cv_parallax();
                });
            });

        };
        function positionner_cv_parallax() {
            var delta = $(window).scrollTop() + $(window).height() - $("#lien-cv-test-parallax").offset().top;
            $("#lien-cv-test-parallax").css('background-position', 'center ' + (
                -400 + delta * 0.25
                ) + 'px');
        }

    });