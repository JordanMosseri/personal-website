'use strict';

/**
 * @ngdoc function
 * @name ajs5BisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ajs5BisApp
 */
angular.module('ajs5BisApp')
	.controller('AboutCtrl', function ($scope) {

		$scope.iconsSize = 'fa-lg';

		function recup(chemin_dossier){
			var descr_audi = 'Modelisation-texturage-rendu avec Blender 3D - Projet personnel';
			var descr_bmw = 'Modelisation-texturage-rendu avec Blender 3D - Projet personnel';
			var descr_esesame = 'App Android - En équipe';
			var descr_nolarsen = 'App iPhone - Seul executant pour une association';
			return [
				[chemin_dossier + 'audi (1).jpg', descr_audi],
				[chemin_dossier + 'audi (2).jpg', descr_audi],
				[chemin_dossier + 'audi (3).jpg', descr_audi],
				[chemin_dossier + 'audi (4).jpg', descr_audi],
				[chemin_dossier + 'bmw (1).jpg', descr_bmw],
				[chemin_dossier + 'bmw (2).jpg', descr_bmw],
				[chemin_dossier + 'esesame (1).jpg', descr_esesame],
				[chemin_dossier + 'esesame (2).jpg', descr_esesame],
				[chemin_dossier + 'esesame (3).jpg', descr_esesame],
				[chemin_dossier + 'esesame (4).jpg', 'Logo sous Photoshop pour l\'app Android'],
				[chemin_dossier + 'nolarsen (4).jpg', descr_nolarsen],
				[chemin_dossier + 'nolarsen (1).jpg', descr_nolarsen],
				[chemin_dossier + 'nolarsen (2).jpg', descr_nolarsen],
				[chemin_dossier + 'nolarsen (3).jpg', descr_nolarsen]
			];
		}

		$scope.$arr = recup("images/Images/miniatures/");

		$scope.model = {
			name: 'Jordan Mosseri.',
			degree: 'Ingénieur en Systèmes d\'Information.',
			descr: 'Je suis passionné de nouvelles technologies, en particulier dans le domaine du web et du mobile.'+
				'Créatif, je porte une attention particulière à l\'ergonomie et à l\'experience utilisateur.'+
				'Mes différents stages et projets m\'ont permis de développer mon autonomie et ma capacité d\'adaptation.'+
				'Je travaille actuellement sur un projet dans lequel je développe une application Android.'+
				'Je recherche un stage de 6 mois à partir de février 2015, me contacter pour plus d\'infos.'
		};

		function new_SkillsGroup(icon, title, content) {
			return {icon: icon, title: title, content: content};
		}

		$scope.skills = [
			new_SkillsGroup('fa-mobile', 'Mobile', ['Android', 'iOS']),
			new_SkillsGroup('fa-globe', 'Web', ['AngularJS', 'jQuery', 'PHP', 'JEE', 'Joomla']),
			new_SkillsGroup('fa-cube', 'Infographisme', ['Blender 3D', 'Photoshop'])
		];

		//---------------

		//declaration des constantes
		$scope.IMG_HEIGHT = 100;
		var SIDE_INIT;
		var HEIGHT;
		var WIDTH;
		var DURATIONS = {
			DELAI_INIT: 1000,
			FRONT_FADEIN: 1000,
			FRONT_OFFSET: 1000,
			DIV_ARRONDI: 1250
		};
		//$scope.divArrondiDuration = DURATIONS.DIV_ARRONDI / 1000;

		angular.element(document).ready(function() {
			//initialisation des constantes
			//document.documentElement.clientWidth
			HEIGHT = Math.max(window.innerHeight);
			WIDTH = Math.max(window.innerWidth);
			//SIDE_INIT = Math.max(WIDTH, HEIGHT) * 1.5;
			SIDE_INIT = Math.sqrt(WIDTH*WIDTH + HEIGHT*HEIGHT);

			$('#first-screen-wrapper').css('height', HEIGHT);

			//initialisation du div-arrondi
			maj($scope, SIDE_INIT);

			setTimeout(function() {
				//positionne au milieu
				var shouldBe = WIDTH/2 - $scope.IMG_HEIGHT/2;
				//document.getElementById('imggggggggg').getBoundingClientRect().left
				//- $(window).scrollLeft()
				var actualLeftOffset = $('#imggggggggg').offset().left;
				$('#imggggggggg, #texttitlenextgen').css('left', '+='+(shouldBe-actualLeftOffset));

				//fadein du front
				$('#content-front').animate({opacity: 1}, DURATIONS.FRONT_FADEIN, function() {

					//reduit le div-arrondi
					//transition-timing-function: cubic-bezier(.21,.48,.48,.89);/*.64,.13,.9,.55*/
					$('#div-arrondi').animate({
						width: 0,
						height: 0,
						left: WIDTH/2,
						top: HEIGHT/2
					}, DURATIONS.DIV_ARRONDI);

					setTimeout(function() {

						//decalage a gauche du tout
						$('#imggggggggg, #texttitlenextgen').animate({left: '-=200'}, DURATIONS.FRONT_OFFSET);

						//apparition du texte
						$('#texttitlenextgen *').animate({left: '0%'}, DURATIONS.FRONT_OFFSET, function() {
						});
					}, DURATIONS.DIV_ARRONDI);//$('#div-arrondi').css('transition-duration')
				});
			}, DURATIONS.DELAI_INIT);

		});

		function maj($scope, side) {
			$('#div-arrondi').css('width', side);
			$('#div-arrondi').css('height', side);
			$('#div-arrondi').css('left', -(side - WIDTH) / 2);
			$('#div-arrondi').css('top', -(side - HEIGHT) / 2);
		}

	});
