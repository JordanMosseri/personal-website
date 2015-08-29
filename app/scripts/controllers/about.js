'use strict';

/*
 TODO cv hover en degrade
 TODO fix gallerie
 */

/**
 * @ngdoc function
 * @name ajs5BisApp.controller:AboutCtrl
 * @author Jordan Mosseri
 * @description
 * # AboutCtrl
 * Controller of the ajs5BisApp
 */
angular.module('ajs5BisApp')
	.controller('AboutCtrl', function ($scope, OpeningService) {

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
		
		OpeningService.runWhenReady();

		$('#lien-cv-test-parallax').mouseenter(function(){
			$('.curriculum-vitae').css('color','orange');
		}).mouseleave(function(){
			$('.curriculum-vitae').css('color',couleur_base_text_cv);
		});

		//--------------------

		function positionner_bg_parallax() {
			$('#content-front').css('top', $(window).scrollTop() * 0.25);
		}

		positionner_bg_parallax();

		$(window).scroll(function() {
			positionner_bg_parallax();
		});
	});
