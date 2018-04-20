
var UserService = angular.module('UserService', []);

UserService.factory('UserApi', function ($http) {
    var urlBase = "http://localhost:12317/api/";
    var UserApi = {};

    /*      ******************************************      */
    /*      ================ Customer ================      */

    //  Get all users
    UserApi.getUser = function () {
        return $http.get(urlBase + 'Tables');
    
    }

    UserApi.GetProImage = function () {
        return $http.get(urlBase + 'ProImages/');

    }

    UserApi.DeleteProImage = function (img_id) {
        return $http.delete(urlBase + 'ProImages/' + img_id);

    }

    UserApi.DeleteProduct = function (prod_id) {
        return $http.delete(urlBase + 'Products/' + prod_id);

    }

    //  Login User
    UserApi.GetUser = function (Email, Password) {
        return $http.get(urlBase + 'Tables?email=' + Email + '&password=' + Password);
    }

    //  Update user's profile
    UserApi.EditUser = function (UserToEdit) {

        var request = $http({
            method: 'PUT',
            url: urlBase + 'Tables/' + UserToEdit.id,
            data: UserToEdit

        });
        return request;
    }
    /*      ******************************************      */
    /*      ================= Admin ==================      */

    //Admin login
    UserApi.GetAdminInfo = function (ad_email, ad_password) {
        return $http.get(urlBase + 'Admins?ad_email=' + ad_email + '&ad_password=' + ad_password);
    }

    //  Get all users
    UserApi.getAdmin = function () {
        return $http.get(urlBase + 'Admins');
    }

    /*      ******************************************      */
    /*      ================ Products ================      */

    //  Get all products
    UserApi.GetProduct = function () {
        return $http.get(urlBase + 'Products/');
    }


    //  Get all picture
    UserApi.GetProImage = function () {
        return $http.get(urlBase + 'ProImages');
    }

    //  Get Prod
    UserApi.getProdInfo = function () {
        return $http.get(urlBase + 'Products');
    };

    /*      ******************************************      */
    /*      ================ Payments ================      */

    //  Add payment
    UserApi.AddPayment = function (payment) {
        return $http.post(urlBase + 'Payments', payment);
    }


    /*      ******************************************      */
    /*      ================= Order ==================      */

    //  Add to order table
    UserApi.AddOrders = function (Order) {
        return $http.post(urlBase + 'Orderrs', Order);
    }

    //Restuarant get view all orders
    UserApi.GetAllOrders = function () {
        return $http.get(urlBase + 'GetOrders');
    }

    //  Get and view all the Orders   (Can't view orders yet)
    UserApi.RetreiveOrders = function () {
        return $http.get(urlBase + 'GetOrderDetails');
    }

    /*      ******************************************      */
    /*      ============== Order_Product =============      */

    //  Add to associative table
    UserApi.AddToAssociative = function (Orders) {
        return $http.post(urlBase + 'Ord_Tbl', Orders);
    }


    /*      ******************************************      */
    /*      ================ Driver ================      */

    //  Get all drivers
    UserApi.getDriver = function () {
        return $http.get(urlBase + 'Drivers');
    }

    UserApi.GetDriverssss = function (d_email, d_password) {
        return $http.get(urlBase + 'Drivers?d_email=' + d_email + '&d_password=' + d_password);
    }

    //  Update driver's profile

    UserApi.EditDriver = function (DriverToEdit) {

        var dar = $http({
            method: 'PUT',
            url: urlBase + 'Drivers/' + DriverToEdit.d_id,
            data: DriverToEdit

        });
        return dar;
    }

    //  Status update
    UserApi.updateStatus = function (OrderToEdit) {
        var dattta = $http({
            method: 'PUT',
            url: urlBase + 'Orderrs/' + OrderToEdit.ord_id,
            data: OrderToEdit
        });
        return dattta;
    };

    //UserApi.updateProduct = function (ProToEdit) {
    //    var a = $http({
    //        method: 'PUT',
    //        url: urlBase + 'Products/' + ProToEdit.prod_id,
    //        data: ProToEdit
    //    });
    //    return a;
    //};



    UserApi.Edit = function (ToEdit) {

        var dar = $http({
            method: 'PUT',
            url: urlBase + 'Products/' + ToEdit.prod_id,
            data: ToEdit

        });
        return dar;
    }

    //  Retreive all the orders
    UserApi.RetreiveOrders = function () {
        return $http.get(urlBase + 'Orderrs');
    }

    //  Retreive all the orders
    UserApi.RetrieverDriverOrder = function () {
        return $http.get(urlBase + 'GetDriverOrders');
    }

    UserApi.GetProductImage = function () {
        return $http.get(urlBase + 'GetProductImage');
    }

    UserApi.GetOrderDetails = function () {
        return $http.get(urlBase + 'GetOrderDetails');
    }
    
    //  Retreive all the orders
    UserApi.RetrieveDriverOrders = function () {
        return $http.get(urlBase + 'DriverOrderss');
    }

    UserApi.GetSupplyInfo = function (s_email, s_password) {
        return $http.get(urlBase + 'suppliers?s_email=' + s_email + '&s_password=' + s_password);
    }

    return UserApi;
});

UserService.factory('checkout', function () {
    var totalPrice = {}

    function set(data) {
        totalPrice = data;
    }
    function get() {
        return totalPrice;
    }

    return {
        set: set,
        get: set
    }
});