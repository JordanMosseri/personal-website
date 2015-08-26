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
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.iconsSize = 'fa-lg';




    function startsWith(mot, debut){
      var length = debut.length;
      return (substr(mot, 0, length) === debut);
    }

    function recup_auto(chemin_dossier){
      var arr = [];

      if(!is_dir(chemin_dossier))
        return null;

      var dossier = opendir(chemin_dossier);
      var fichier;
      while (false !== (fichier = readdir(dossier))) {
        if (fichier != '.' && fichier != '..' && fichier != 'index.php' && !startsWith(fichier, '.')) {
          arr.push( array(chemin_dossier + fichier, 'description test') );
        }
      }

      closedir(dossier);

      return arr;
    }

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


  });
