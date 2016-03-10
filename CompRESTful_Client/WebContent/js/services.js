
//Angualar js App configuration for the Company App to StripTralingSlashed by Default.
angular.module('CompanyApp').config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);


//Factory Services for Company Record Add/Query/Delete by Company Id
    angular.module('CompanyApp').factory('Company', function($resource) {
        return $resource('http://localhost:8080/CompRESTful/company/:compid', {
            compid: "@compid"
        });
    });
    //Factory Services to Update the company record by Company ID
    angular.module('CompanyApp').factory('CompanyUpdate', function($resource) {
        return $resource('http://localhost:8080/CompRESTful/company/update/:compid', {
            compid: "@compid"
        }, {
            update: {
                method: 'PUT'
            }
       
        });
    });
  //Factory Services for Owner Record to Query/Add by Company Id
    angular.module('CompanyApp').factory('Owner', function($resource) {
        return $resource('http://localhost:8080/CompRESTful/company/owner/:compid', {
            compid: "@compid"
        });
    });
    
    //Factory Services to Delete by Company Id
    angular.module('CompanyApp').factory('DelOwnerByCompId', function($resource) {
        return $resource('http://localhost:8080/CompRESTful/company/owner/del/:compid', {
            compid: "@compid"
        });
    });
    //Factory Services to Query/update/delete by Owner Id
    angular.module('CompanyApp').factory('ByOwnerId', function($resource) {
        return $resource('http://localhost:8080/CompRESTful/company/owner/:ownerId', {
            ownerId: "@ownerId"
        });
    });
  
    //Factory Services to Update the Owner by Owner Id.
    angular.module('CompanyApp').factory('OwnerUpdate', function($resource) {
        return $resource('http://localhost:8080/CompRESTful/company/owner/update/:ownerId', {
            ownerId: "@ownerId"
        }, {
            update: {
                method: 'PUT'
            }
        
        });
    });