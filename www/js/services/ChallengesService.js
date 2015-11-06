angular.module("gc.services")

.service("Lectures", function($http, $q, Settings) {

    /*
     * Returns the metadata of all challanges
     */
    var loadChallangeOverview = function() {
        return ["asd", "asd"];
    };

    return {
        loadChallangeOverview: loadChallangeOverview,
    };
});
