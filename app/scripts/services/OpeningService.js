/**
 * Created by Jo on 28/08/2015.
 */

'use strict';
angular.module('ajs5BisApp')
    .service('OpeningService', function () {

        /************************************-*************************************/
        /*****************                                        *****************/
        /*****************            public variable             *****************/
        /*****************                                        *****************/
        /************************************-*************************************/


        /************************************-*************************************/
        /*****************                                        *****************/
        /*****************            private variable            *****************/
        /*****************                                        *****************/
        /************************************-*************************************/

        //declaration des constantes
        var SIDE_INIT;
        var HEIGHT;
        var WIDTH;
        var IMG_HEIGHT = 100;
        var IMG_HEIGHT_INIT = IMG_HEIGHT * 3;//1.5
        var DURATIONS_DELAI_INIT = 300;
        var DURATIONS_FRONT_FADEIN = 600;//900
        var DURATIONS_FRONT_OFFSET = 1200;
        var DURATIONS_DIV_ARRONDI = DURATIONS_FRONT_FADEIN*1.4;//1250
        var DURATIONS_DOWN_ARROW = 650;
        var DEFAUT_EASING = 'easeOutQuint';//easeOutQuart
        var EASINGS = {
            FRONT_OFFSET: DEFAUT_EASING,
            DIV_ARRONDI: DEFAUT_EASING
        };

        //jQuery elements
        var $imggggggggg = $('#imggggggggg');
        var $divArrondi = $('#div-arrondi');

        /************************************-*************************************/
        /*****************                                        *****************/
        /*****************             public function            *****************/
        /*****************                                        *****************/
        /************************************-*************************************/

        this.runWhenReady = function() {

            angular.element(document).ready(function() {
                window.scrollTo(0, 0);

                //initialisation des constantes
                //document.documentElement.clientWidth
                HEIGHT = Math.max(window.innerHeight);
                WIDTH = Math.max(window.innerWidth);
                //SIDE_INIT = Math.max(WIDTH, HEIGHT) * 1.5;
                SIDE_INIT = Math.sqrt(WIDTH*WIDTH + HEIGHT*HEIGHT);

                $imggggggggg.css('height', IMG_HEIGHT);

                $('#first-screen-wrapper').css('height', HEIGHT);

                //initialisation du div-arrondi
                $divArrondi.css('width', SIDE_INIT);
                $divArrondi.css('height', SIDE_INIT);
                $divArrondi.css('left', -(SIDE_INIT - WIDTH) / 2);
                $divArrondi.css('top', -(SIDE_INIT - HEIGHT) / 2);

                setTimeout(function() {
                    //positionne au milieu
                    var shouldBe = WIDTH/2 - IMG_HEIGHT/2;
                    //document.getElementById('imggggggggg').getBoundingClientRect().left
                    //- $(window).scrollLeft()
                    var actualLeftOffset = $imggggggggg.offset().left;
                    $('#imggggggggg, #texttitlenextgen').css('left', '+='+(shouldBe-actualLeftOffset));

                    frontFadinAnim()
                }, DURATIONS_DELAI_INIT);

            });

        };

        /************************************-*************************************/
        /*****************                                        *****************/
        /*****************             private function           *****************/
        /*****************                                        *****************/
        /************************************-*************************************/

        function frontFadinAnim() {
            $imggggggggg.css('height', IMG_HEIGHT_INIT);
            $imggggggggg.animate({height: IMG_HEIGHT}, DURATIONS_FRONT_FADEIN);

            //fadein du front
            $('#content-front').animate({opacity: 1}, DURATIONS_FRONT_FADEIN);

            setTimeout(function() {
                divArrondiAnim();
            }, DURATIONS_FRONT_FADEIN * 0.5);//0.75
        }

        function divArrondiAnim() {
            //reduit le div-arrondi
            //transition-timing-function: cubic-bezier(.21,.48,.48,.89);/*.64,.13,.9,.55*/
            $divArrondi.animate({
                width: 0+IMG_HEIGHT,
                height: 0+IMG_HEIGHT,
                left: WIDTH/2-IMG_HEIGHT/2,
                top: HEIGHT/2-IMG_HEIGHT/2
            }, DURATIONS_DIV_ARRONDI, EASINGS.DIV_ARRONDI, function() {
                $divArrondi.remove();
                frontOffsetAnim();
            });
        }

        function frontOffsetAnim() {
            //decalage a gauche du tout
            $('#imggggggggg, #texttitlenextgen').animate({left: '-=200'}, DURATIONS_FRONT_OFFSET, EASINGS.FRONT_OFFSET);

            //apparition du texte
            $('#texttitlenextgen h1').animate({left: '0%'}, DURATIONS_FRONT_OFFSET, EASINGS.FRONT_OFFSET, function() {
            });
            setTimeout(function() {
                $('#texttitlenextgen h2').animate({left: '0%'}, DURATIONS_FRONT_OFFSET, EASINGS.FRONT_OFFSET, function() {
                    $('body').css('overflow-x', 'auto');

                    inn();
                });
            }, DURATIONS_FRONT_OFFSET * 0.08);
        }

        function inn() {
            $('#bottom-arrow *').animate({opacity: 1, top: '10px'}, DURATIONS_DOWN_ARROW*0.85, function() {
                setTimeout(function() {
                    out();
                }, DURATIONS_DOWN_ARROW * 0.75);
            });
        }

        function out() {
            $('#bottom-arrow *').animate({opacity: 0, top: '0px'}, DURATIONS_DOWN_ARROW*1.5, function() {
                inn();
            });
        }


        /************************************-*************************************/
        /*****************                                        *****************/
        /*****************          Watchers and listeners        *****************/
        /*****************                                        *****************/
        /************************************-*************************************/

        /************************************-*************************************/
        /*****************                                        *****************/
        /*****************           Initialisation bloc          *****************/
        /*****************                                        *****************/
        /************************************-*************************************/

        $('#bottom-arrow *').css({opacity: 0, 'position': 'relative'});

    });
