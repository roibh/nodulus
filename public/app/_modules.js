/*                _       _           
                 | |     | |          
  _ __   ___   __| |_   _| |_   _ ___ 
 | '_ \ / _ \ / _` | | | | | | | / __|
 | | | | (_) | (_| | |_| | | |_| \__ \
 |_| |_|\___/ \__,_|\__,_|_|\__,_|___/
 @nodulus open source | �Roi ben haim  �2016    
 */
"use strict";
var loader_count = 0;
/**
 * basic nodulus dependencies
 */
var nodulus_dependecies = ['infinite-scroll', 'anguFixedHeaderTable', 'm43nu.auto-height',
    'mgcrea.ngStrap', 'mj.scrollingTabs', 'ui.bootstrap', 'ui.ace', 'ngSanitize', 'ngRoute', 'ngResource', 'angular.filter', 'angularBootstrapNavTree',
    'treeControl', 'ngMaterial', 'ngMessages', 'ngAnimate', 'RecursionHelper', 'DynamicDataSerivces', 'Cache', 'IDE', 'pascalprecht.translate', 'cfp.hotkeys'];
var delay_bootstraping = false;
angular.element(document).ready(function () {
    for (var module_name in nodulus_mapping) {
        var module = nodulus_mapping[module_name];
        for (var i = 0; i < module.scripts.length; i++) {
            delay_bootstraping = true;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = false;
            script.defer = true;
            script.src = module_name + "/scripts/" + module.scripts[i];
            script.onload = function () {
                loader_count--;
                if (loader_count == 0) {

                    angular.bootstrap(document, ['nodulus']);

                }
            }
            document.getElementsByTagName('body')[0].appendChild(script);
            loader_count++;
        }

        if (module.styles) {
            for (var i = 0; i < module.styles.length; i++) {

                var fileref = document.createElement('link');

                fileref.setAttribute("rel", "stylesheet")
                fileref.setAttribute("type", "text/css")
                fileref.setAttribute("href", module_name + "/styles/" + module.styles[i])


                document.getElementsByTagName('head')[0].appendChild(fileref);
            }

        }

        for (var i = 0; i < module.dependencies.length; i++) {
            nodulus_dependecies.push(module.dependencies[i]);
        }
    }

    if (!delay_bootstraping) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['nodulus']);
    });
}

});
