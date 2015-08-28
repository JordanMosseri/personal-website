
var vue_grand_affichee = false;
var duree_animation = 280;
var agrandissement = 50;
var top_miniature;
var left_miniature;
var height_miniature;
var width_miniature;
var width_grand;
var height_grand;

var seuil_accepted_anim_debut = 50;

var scroll_changed_pdt_vueGrand = false;

var couleur_base_text_cv;



function positionner_bg_parallax(){
    var delta = $(window).scrollTop()+$(window).height()-$("#lien-cv-test-parallax").offset().top;
    $("#lien-cv-test-parallax").css('background-position','center '+ (
        -400+delta*0.25
    ) +'px');
}

function animer_header(element, y_init, duree){
    $(element).css('position','relative');
    $(element).css('top',y_init);
    $(element).delay(800).animate({
        top:0+'px'
        }, duree, 'easeOutQuint', function() {
    });
}
function animer_reste(){
    $("#partie-2").css('margin-top',$(window).height()-$("#partie-2").offset().top+seuil_accepted_anim_debut);
    $("#partie-2").delay(1150).animate({
        "margin-top": 0+'px'
        }, 1700, 'easeOutQuint', function() {
            pret();
    });
}

function animer_voile_debut(duree){
    $('#voile-anim-debut').animate({
        opacity:0
    }, duree, function(){
        $('#voile-anim-debut').css('display','none');
    });

}

$(window).load(function(){
    return;

    couleur_base_text_cv = $('.curriculum-vitae').css('color');
    if( $(window).scrollTop()<seuil_accepted_anim_debut ){
        var y_init = -$("#inside-1").outerHeight()-70;
        var duree1 = 1700;
        var delta = 400;

        animer_voile_debut(2800);

        animer_header("#inside-1 p", y_init, duree1);
        animer_header("#inside-1 h1", y_init, duree1-delta);
        animer_header("#inside-1 h2", y_init, duree1-delta*2);

        animer_reste();
    }
    else{
        animer_voile_debut(500);

        pret();
    }
});

function pret(){
    positionner_bg_parallax();

    $('.conteneur-images a').removeAttr('href');

    /*
     * Agrandit les images sur clic
     */
    $('.cliquable-a-agrandir').click(function() {

        scroll_changed_pdt_vueGrand = false;

        /*
         * Recup de tous les $(this)
         */


        /*
         * Recup pour utiliser lors de la fermeture (dans une autre fonction)
         * Dimensions avant l'anim de la grde image
         * Dimensions lorsqu'elle revient en place
         */
        top_miniature = $(this).offset().top -$(document).scrollTop();//PORTAGE
        left_miniature = $(this).offset().left -$(document).scrollLeft();//PORTAGE
        height_miniature = $(this).css('height').replace('px', '');
        width_miniature = $(this).css('width').replace('px', '');

        var texte_descr = $(this).next().html();

        var element_clicked = $(this);

        //$('#vue-grand').attr('src',$(this).attr('src'));
        var newImg = new Image();
        /*
         * Bind une fonction a l'evenement d'image loadee, pour recuperer les dimensions de la grande image
         */
        $(newImg).load(function(){
            height_grand = newImg.height;
            width_grand = newImg.width;

            $('#vue-grand').remove();
            $('#vue-grand-voile').after(newImg);
            $('#vue-grand-voile').next().attr('id','vue-grand');
            //return;

            /*
             * Description sous l'image
             */
            $('#vue-grand-descr').html( texte_descr );
            $('#vue-grand-descr').css('visibility','visible');
            $( "#vue-grand-descr" ).animate({
                    opacity: 1
                }, duree_animation, function() {
            });

            /*
             * Fermer
             */
            $('#vue-grand-fermer').css('visibility','visible');
            $( "#vue-grand-fermer" ).animate({
                    opacity: 1
                }, duree_animation, function() {
            });

            /*
             * Vue voile
             */
            $('#vue-grand-voile').css('visibility','visible');
            $( "#vue-grand-voile" ).animate({
                    opacity: 0.9
                }, duree_animation, function() {
            });

            //$('#vue-grand').attr('src',$(this).attr('src').replace('miniatures','grandes'));

            $('#vue-grand').css('top',top_miniature+'px');
            $('#vue-grand').css('left',left_miniature+'px');
            $('#vue-grand').css('height',height_miniature+'px');


            /*
             * Fin init
             * Debut anim
             */

            var w_h = width_grand/height_grand;

            var tfinal = ($(window).height() - height_grand)/2;//PORTAGE
            var lfinal = ($(window).width() - width_grand)/2;//PORTAGE
            if(height_grand+agrandissement*1.5 > $(window).height()){
                height_grand = $(window).height();
                tfinal = 0;//PORTAGE
                width_grand = w_h * height_grand;
                lfinal = ($(window).width() - width_grand)/2;//inchange//PORTAGE

                width_grand -= agrandissement*2;
                height_grand -= agrandissement*2;
                lfinal += agrandissement;
                tfinal += agrandissement;
            }
            if(width_grand+agrandissement*1.5 > $(window).width()){
                width_grand = $(window).width();
                lfinal = 0;//PORTAGE
                height_grand = width_grand / w_h;
                tfinal = ($(window).height() - height_grand)/2;//inchange//PORTAGE

                width_grand -= agrandissement*2;
                height_grand -= agrandissement*2;
                lfinal += agrandissement;
                tfinal += agrandissement;
            }

            /*
             * Positionne le texte Fermer en fonction de la position de la grande image
             */
            $('#vue-grand-fermer').css('visibility','visible');
            var w_fermer = $('#vue-grand-fermer').width();
            $('#vue-grand-fermer').css('right','initial');
            $('#vue-grand-fermer').css('left',lfinal + width_grand-w_fermer);

            /*
             * Lance l'anim
             */
            $('#vue-grand').css('visibility','visible');
            $( "#vue-grand" ).css('opacity','1');
            $( "#vue-grand" ).delay(duree_animation/4).animate({
                    width: width_grand+'px',
                    height: height_grand+'px',
                    left: lfinal + 'px',
                    top: tfinal + 'px'
                }, duree_animation, function() {
                    vue_grand_affichee = true;
            });

        });
        /*
         * Charge la grande image
         */
        newImg.src = $(this).attr('src').replace('miniatures','grandes');
    });

    /*
     * Clic pour reduire l'image
     */
    $('body').click(function(){
        if(vue_grand_affichee){
            $( "#vue-grand-voile, #vue-grand-descr, #vue-grand-fermer" ).animate({
                    opacity: 0
                }, duree_animation, function() {
                $( "#vue-grand-voile" ).css('visibility','hidden');
                $('#vue-grand-descr').css('visibility','hidden');
                $('#vue-grand-fermer').css('visibility','hidden');
            });
            $( "#vue-grand" ).animate({
                   opacity: scroll_changed_pdt_vueGrand?0:1,
                    left:left_miniature,    //$("#vue-grand").offset().left-agrandissement,//0,
                    top:top_miniature,      //$("#vue-grand").offset().top-agrandissement,//$(document).scrollTop(),
                    width:width_miniature,  //$("#vue-grand").width()+agrandissement*2,//$(window).width(),
                    height:height_miniature //$("#vue-grand").height()+agrandissement*2//$(window).height()
                }, duree_animation, function() {
                    $( "#vue-grand" ).css('visibility','hidden');
            });
            /*$( "#vue-grand" ).delay(duree_animation-600).animate({
                opacity: 0
            }, 300, function(){
                $( "#vue-grand" ).css('visibility','hidden');
            });*/
            vue_grand_affichee = false;
        }
    });


    /*
     * Effet parallax
     */
    $( window ).scroll(function() {
        scroll_changed_pdt_vueGrand = true;

        //bouge les elements html
        //$( "#div-fixe" ).css( "top", -$(window).scrollTop()*0.75);

        //$("#p-log").html(($(window).scrollTop()+$(window).height())+"<br/>"+$("#lien-cv-test-parallax").offset().top);
        //$("#p-log").html( $(window).scrollTop() );

        //bouge le fond
        //$( "#fonfonfond" ).css( "background-position", "center "+($(window).scrollTop()*0.3)+"px");
        //$( "#fonfonfond2" ).css( "background-position", "center "+(($(window).scrollTop())*0.3)+"px");

        positionner_bg_parallax();
    });

    $('#anim-rond').css('opacity',0);
    var left_miniature_sauvg, top_miniature_sauvg;
    var rayon=35;
    $('.cliquable-a-agrandir').mouseenter(function(e){
        var top_miniature = $(this).offset().top,
        left_miniature = $(this).offset().left,
        height_miniature = parseInt($(this).css('height').replace('px', '')),
        width_miniature = parseInt($(this).css('width').replace('px', ''));
        left_miniature_sauvg = left_miniature;
        top_miniature_sauvg = top_miniature;

        var xinit = width_miniature/2, yinit = height_miniature/2;
        xinit = e.pageX - left_miniature, yinit = e.pageY - top_miniature;

        $('#anim-wrapper').css('left',left_miniature+'px');
        $('#anim-wrapper').css('top',top_miniature+'px');
        $('#anim-wrapper').css('width',width_miniature+'px');
        $('#anim-wrapper').css('height',height_miniature+'px');

        $('#anim-rond').css('left',xinit-rayon+'px');
        $('#anim-rond').css('top',yinit-rayon+'px');
        $('#anim-rond').css('width',rayon*2+'px');
        $('#anim-rond').css('height',rayon*2+'px');

        $('#anim-rond').stop().animate({
            left: -height_miniature+'px',
            top: -height_miniature+'px',
            width: (height_miniature*3) + 'px',
            height: (height_miniature*3) + 'px',
            opacity:1
            }, duree_animation, function() {
        });
        /*$('#anim-rond').animate({
            opacity:1
            }, duree_animation*0.1, "easeInOutExpo", function() {
        });*/
    });
    $('.cliquable-a-agrandir').mouseleave(function(e){

        var xinit = e.pageX - left_miniature_sauvg, yinit = e.pageY - top_miniature_sauvg;

        $('#anim-rond').stop().animate({
            left: xinit-rayon+'px',
            top: yinit-rayon+'px',
            width: rayon*2 + 'px',
            height: rayon*2 + 'px',
            opacity:0
            }, duree_animation, function() {
        });
    });

    $('#lien-cv-test-parallax').mouseenter(function(){
        $('.curriculum-vitae').css('color','orange');
    }).mouseleave(function(){
        $('.curriculum-vitae').css('color',couleur_base_text_cv);
    });
}


