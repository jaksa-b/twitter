angular.module('twitter')
    .filter('highlight', function($sce) {
        return function(text, phrase) {
            if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
                '<strong class="highlighted">$1</strong>');

            return $sce.trustAsHtml(text)
        }
    });
