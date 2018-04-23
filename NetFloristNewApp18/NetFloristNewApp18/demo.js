
var angularApp = angular.module("myApp", ['ngRoute', 'UserService']);

angularApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/CustRegistration', {
            templateUrl: 'CViews/CustRegistration.html', controller: 'CustRegistrationController'
        }).
        when('/DRegister', {
            templateUrl: 'DViews/DRegister.html', controller: 'DRegisterController'
        }).
        when('/ALogin', {
            templateUrl: 'AViews/ALogin.html', controller: 'ALoginController'
        }).
        when('/Login', {
            templateUrl: 'CViews/Login.html', controller: 'LoginController'
        }).
                when('/Cash', {
                    templateUrl: 'CViews/Cash.html', controller: 'CheckOutController'
                }).
        when('/DLogin', {
            templateUrl: 'DViews/DLogin.html', controller: 'DLoginController', controler: 'DriverR'
        }).
        when('/Profile', {
            templateUrl: 'CViews/Profile.html', controller: 'CProfileController'
        }).
        when('/DProfile', {
            templateUrl: 'DViews/DProfile.html', controller: 'DProfileController'
        }).
        when('/AddProduct', {
            templateUrl: 'AViews/AddProduct.html', controller: 'AAddProductController', controller: 'UploadRestImageController'
        }).
        when('/ViewCustomers', {
            templateUrl: 'AViews/ViewCustomers.html', controller: 'ViewCustomersController'
        }).
        when('/Products', {
            templateUrl: 'CViews/Products.html', controller: 'CViewProductsController'
        }).
        when('/SProducts', {
            templateUrl: 'SViews/SProducts.html', controller: 'SViewProductsController'
        }).
                when('/SLogin', {
                    templateUrl: 'SViews/SLogin.html', controller: 'SLoginController'
                }).
        when('/ViewProducts', {
            templateUrl: 'AViews/ViewProducts.html', controller: 'CViewProductsController'
        }).
                when('/DeleteStuff', {
                    templateUrl: 'AViews/DeleteStuff.html', controller: 'DeleteProductsController'
                }).
        when('/UploadRestImage', {
            templateUrl: 'AViews/UploadRestImage.html', controller: 'UploadRestImageController'
        }).
        when('/UploadPic', {
            templateUrl: 'AViews/UploadPic.html', controller: 'UploadPicController'
        }).
        when('/Cart', {
            templateUrl: 'CViews/Cart.html', controller: 'CartController'
        }).
        when('/CheckOut', {
            templateUrl: 'CViews/CheckOut.html', controller: 'CheckOutController'
        }).
        when('/Payment', {
            templateUrl: 'CViews/Payment.html', controller: 'CPaymentController'
        }).
        when('/Order', {
            templateUrl: 'CViews/Order.html', controller: 'COrderController'
        }).
        when('/ViewOrders', {
            templateUrl: 'AViews/ViewOrders.html', controller: 'AViewOrdersController'
        }).
        when('/Home', {
            templateUrl: 'CViews/Home.html', controller: 'HomeController'
        }).
        when('/SHome', {
            templateUrl: 'sViews/SHome.html', controller: 'SHomeController'
        }).
        when('/AHome', {
            templateUrl: 'AViews/AHome.html', controller: 'AHomeController'
        }).
        when('/DHome', {
            templateUrl: 'DViews/DHome.html', controller: 'DHomeController'
        }).
        when('/DOrderss', {
            templateUrl: 'DViews/DOrderss.html', controller: 'DOrdersController'
        }).
                when('/ViewAllOrders', {
                    templateUrl: 'AViews/ViewAllOrders.html', controller: 'ViewOrdersController'
                }).
        when('/PickedOrders', {
            templateUrl: 'DViews/PickedOrders.html', controller: 'DOrdersController'
        }).
        when('/ThankYou', {
            templateUrl: 'CViews/ThankYou.html', controller: 'CThankYouController'
        }).
         otherwise({
             redirectTo: '/index'
         });
}]).constant('FIREBASE_URL', 'something');

angularApp.factory('generator', function() {
    function buildRandArray(length) {
        var arr = [];

        for(var i = 0; i < (length || 10); i++) {
            var fill = [];
            for (var j = 0; j < 3; j++) {
                fill.push(Math.floor((Math.random()*1000)+1));
            }
            arr.push(fill);
        }

        return arr;
    }

    return {
        buildRandArray : buildRandArray
    }
})

angularApp.controller('TableCtrl', function($scope, generator) {
    $scope.items = generator.buildRandArray(10);
});

// ###################### LOGIN ############################
angularApp.controller("ALoginController", function ($scope, $http, UserApi, $rootScope, $location, $window) {
    $scope.EmpLogin = function () {
        UserApi.GetAdminInfo($scope.ad_email, $scope.ad_password).then(function (response) {
            if (response.data === null) {
                alert("You've entered an invalid email and password");
            } else {
                alert("Login Successful. Welcome to Admin Dashboard");
                $rootScope.currentUser = response.data;
                $location.path('/AHome');
            }
        }), function (response) {
            alert("Error in logging in the system");
        }
    };
});

angularApp.controller("SLoginController", function ($scope, $http, UserApi, $rootScope, $location, $window) {
    $scope.Login = function () {
        UserApi.GetSupplyInfo($scope.s_email, $scope.s_password).then(function (response) {
            if (response.data === null) {
                alert("You've entered an invalid email and password");
            } else {
                alert("Login Successful. Welcome to Supplier Dashboard");
                $rootScope.currentUser = response.data;
                $location.path('/SHome');
            }
        }), function (response) {
            alert("Error in logging in the system");
        }
    };
});

angularApp.controller("DLoginController", function ($scope, $http, UserApi, $rootScope, $location, $window) {
    $scope.Log = function () {
        UserApi.GetDriverssss($scope.d_email, $scope.d_password).then(function (response) {
            if (response.data === null) {
                alert("You've entered an invalid email and password");
            } else {
                alert("Login Successful. Welcome to Driver Dashboard");
                $rootScope.currentUser = response.data;
                $location.path('/DHome');
            }
        }), function (response) {
            alert("Error in logging in the system");
        }
    };
});

angularApp.controller('LoginController', function ($scope, $http, UserApi, $rootScope, $location, $window) {
    $scope.loginClick = function () {
        UserApi.GetUser($scope.email, $scope.password).then(function (response) {
            if (response.data == null) {
                $window.alert("Bad");
            }
            else {
                $window.alert("Hello " + response.data.firstname);
                //console.log(response.data.firstname);
                $rootScope.currentUser = response.data;
                $location.path('/Home');
            }
        }),
        function (response) {
            $window.alert("Bad");
        }
    };

});

// ########################### RGISTRATION ##########################
angularApp.controller("CustRegistrationController", function ($scope, UserApi, $rootScope, $location, $http, $window) {
    $scope.RegisterUser = function () {

        var addingUser = $http({
            method: "post", //Post data to the api
            url: "/api/Tables/",
            datatype: "json",
            data: {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                contact: $scope.contact,
                email: $scope.email,
                password: $scope.password
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Your Account Has Been Successfully Registered");
            $location.path('/Login');

        }, function (error) {
            $window.alert(error);
        });
    }
});

angularApp.controller("DriverR", function ($scope, $location, $http, $window) {
    $scope.DRegister = function () {
        var userR = $http({
            method: "post", //Post data to the api
            url: "http://localhost:12317/api/Drivers/",
            datatype: "json",
            data: {
                d_firstname: $scope.d_firstname,
                d_lastname: $scope.d_lastname,
                d_cell: $scope.d_cell,
                d_email: $scope.d_email,
                d_password: $scope.d_password,
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Your Account Has Been Successfully Registered");
            $location.path('/DHome');

        }, function (error) {
            $window.alert(error);
        });
    }
});

// ############################### CUSTOMER ##############################
angularApp.controller("OrderController", function ($scope, UserApi, $rootScope, $location, $http, CommonProp, $window) {
    GetUsers();     //  Get users
    function GetUsers() {
        UserApi.getUser().then(function (response) {
            $scope.user = response.data;
        }), function () {
            alert("Unable to load users info");
        }
    }
    getProd();  //  Get products
    function getProd() {
        UserApi.getProduct().then(function (response) {
            $scope.Product = response.data;
        }), function () {
            alert('No products Found');
        }
    }

    $scope.totalPice = CommonProp.getTotal();
    $scope.ord_street = $scope.ord_street;
    $scope.ord_city = $scope.ord_city;
    $scope.ord_province = $scope.ord_province;
    $scope.ord_country = $scope.ord_country;
    $scope.email = $rootScope.currentUser.email;
    $scope.contact = $rootScope.currentUser.contact;
    $scope.firstname = $rootScope.currentUser.firstname;

    $scope.AdOrder = function ()    //button
    {

        var OrderToAdd = $http({
            method: "post", //Post data to the api
            url: "/api/Orderrs/",
            datatype: "json",
            data: {
                totalPrice: $scope.totalPrice,
                    ord_street : $scope.ord_street,
   ord_city : $scope.ord_city,
   ord_province : $scope.ord_province,
    ord_country : $scope.ord_country,
                email: $scope.email,
                prod_id: $scope.prod_id,

            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Order has been placed successfully");
            $location.path('/ThankYou');

        }, function (error) {
            $window.alert(error);
        });
    }

    $scope.AddAssociative = function () //  Adding to tblOrder_Product table
    {
        for (var i = 0; i <= $rootScope.myItems.length; i++) {
            $scope.pro_id = $rootScope.myItems[i].prod_id;

            var orderItems = {
                'pro_id': $scope.pro_id,
                'ord_id': $scope.Orderr.ord_id
            }

            UserApi.AddToAssociative(orderItems).then(function (response) {
                console.log(response);
            }),
            function (response) {
                alert("Unable to add");
            }
        }
    };

});

angularApp.controller("CViewProductsController", function ($scope, UserApi, $location, $rootScope) {
    GetProduct();  //  Get products
    function GetProduct() {
        UserApi.GetProduct().then(function (response) {
            $scope.Products = response.data;
            console.log(response.data)
        }), function () {
            alert('No products Found');
        }
    }

    //$scope.prod_id = $scope.prod_id;
    //$scope.prod_name = $scope.prod_name;
    //$scope.prod_price = $scope.prod_price;
    //$scope.prod_desc = $scope.prod_desc;
    //$scope.prod_type = $scope.prod_type;
    //$scope.prod_quantity = $scope.prod_quantity;
    //$scope.prod_threshold = $scope.prod_threshold;
    //$scope.prod_instock = $scope.prod_instock;

    $scope.Edit = function (prd) {
        var ToEdit = {
            'prod_id': prd.prod_id,
            'prod_name': prd.prod_name,
            'prod_price': prd.prod_price,
            'prod_desc': prd.prod_desc,
            'prod_type': prd.prod_type,
            'prod_quantity': prd.prod_quantity,
            'prod_threshold': prd.prod_threshold,
            'prod_instock': prd.prod_instock
        };
        console.log(ToEdit);
        UserApi.Edit(ToEdit).then(function (response) {
            alert("Quantity Successfully Updated");
            //$scope.prod_id = undefined;
            //$scope.prod_name = undefined;
            //$scope.prod_price = undefined;
            //$scope.prod_desc = undefined;
            //$scope.prod_type = undefined;
            $scope.prod_quantity = prd.prod_quantity;
            //$scope.prod_threshold = undefined;
            //$scope.prod_instock = undefined;
            GetProduct();
            $location.path('/SProduct');
        }),
        function (response) {
            alert("Couldn't update the quantity");
        }
    };

});

angularApp.controller('CheckOutController', function ($scope, $location, CommonProp, $rootScope, UserApi, $http, checkout) {
    $scope.selectedItems = CommonProp.getItems();
    $scope.amountDue = CommonProp.getTotal();

    $scope.removeItem = function () {
        $scope.selectedItems.splice(1, $rootScope.selectedItems.length);
        $rootScope.updatePrice();
    }

    //prodid + quantity
    //$scope.total = function () {
    //    var totalPrice = CommonProp.getTotal();
    //    return totalPrice;
    //}
});

angularApp.controller("CartController", function ($scope, $location, CommonProp, $rootScope, UserApi, $http) {

    GetProductImages();
    function GetProductImages() {
        UserApi.GetProductImage().then(function (response) {
            $scope.image_data = response.data;
        }), function () {
            alert("Couldn't get all the information");
        }
    };
    // DEFINING SHOPPING CART ARRAY THAT WILL WILL STORE THE ITEMS
    $rootScope.myItems = [];

    // ADD TO SHOPPING CART  DONE!!!!!!!!!!!!
    $scope.addItem = function (newItem) {
        console.log("Activated");
        if ($scope.myItems.length == 0) {
            newItem.count = 1;
            $scope.myItems.push(newItem);
        } else {
            var repeat = false;

            for (var i = 0; i < $scope.myItems.length; i++) {
                if ($scope.myItems[i].prod_id == newItem.prod_id) {
                    $scope.myItems[i].count++;
                    repeat = true;
                }
            }
            if (!repeat) {
                newItem.count = 1;
                $scope.myItems.push(newItem);
            }
        }

    };
    // REMOVING ALL THE ITEMS IN CART AT ONCE
    $scope.removeBasket = function () {
        $scope.myItems.splice(0, $scope.myItems.length);
       updatePrice();
    };

    $scope.totalPice = function () {
        $scope.totalPrice = 0;
        for (var i = 0; i < $scope.myItems.length; i++) {
            $scope.totalPrice += $scope.myItems[i].count * $scope.myItems[i].prod_price;
        }
        return $scope.totalPrice;
        CommonProp.setTotal($scope.totalPrice);
    }

    // REMOVE JUST ONE ITEM
    $scope.remove = function (index) {
        console.log("Deleted");
        $scope.myItems.splice(index, 1);
        $scope.myItems.push(newItem);
      //  updatePrice();
    };

    // TO GET ITEMS SELECTED IN CART AND VIEW THEM IN NEW PAGE
    $scope.$watch('myItems', function () {
        CommonProp.setItems($scope.myItems);
    });

    //Updating the price for the next page ??
    $scope.$watch(function () {
        CommonProp.setTotal($scope.totalPrice);
    })
});

angularApp.controller("HomeController", function ($scope, UserApi, $location, $rootScope) { });

angularApp.controller("SHomeController", function ($scope, UserApi, $location, $rootScope) { });
angularApp.controller("CPaymentController", function ($scope, UserApi, $rootScope, $location, $http, $window) {
    GetUsers();     //Get user details first
    function GetUsers() {
        UserApi.getUser().then(function (response) {
            $scope.user = response.data;
        }), function () {
            aler("Unable to load users info");
        }
    }

    $scope.email = $rootScope.currentUser.email;
    $scope.Pay = function () {

        var addingPayment = $http({
            method: "post", //Post data to the api
            url: "/api/Payments/",
            datatype: "json",
            data: {
                card_name: $scope.card_name,
                card_CCV: $scope.card_CCV,
                card_expMonth: $scope.card_expMonth,
                card_expYear: $scope.card_expYear,
                pay_date: $scope.pay_date,
                email: $scope.email
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Done");
            $location.path('/Order');

        }, function (error) {
            $window.alert(error);
        });
    }

});
angularApp.controller("CProfileController", function ($scope, UserApi, $rootScope, $location) {
    GetUsers();
    function GetUsers() {
        UserApi.getUser().then(function (response) {
            $scope.user = response.data;
        }), function () {
            alert("Unable to load users info");
        }
    };

    $scope.id = $rootScope.currentUser.id;
    $scope.firstname = $rootScope.currentUser.firstname;
    $scope.lastname = $rootScope.currentUser.lastname;
    $scope.contact = $rootScope.currentUser.contact;
    $scope.cardnumber = $rootScope.currentUser.cardnumber;
    $scope.email = $rootScope.currentUser.email;
    $scope.password = $rootScope.currentUser.password;

    $scope.EditUser = function () {
        var UserToEdit = {
            'id': $scope.id,
            'email': $scope.email,
            'firstname': $scope.firstname,
            'lastname': $scope.lastname,
            'contact': $scope.contact,
            'cardnumber': $scope.cardnumber,
            'password': $scope.password
        };

        UserApi.EditUser(UserToEdit).then(function (response) {
            alert("User is successfully edited");
            $scope.id = undefined;
            $scope.email = undefined;
            $scope.firstname = undefined;
            $scope.lastname = undefined;
            $scope.contact = undefined;
            $scope.cardnumber = undefined;
            $scope.password = undefined
            GetUsers();
            $location.path('/Products');
        }),
        function (response) {
            alert("unable to edit user");
        }
    }
});

angularApp.controller("CThankYouController", function ($scope, UserApi, $location, $rootScope) {
});
//  customer checking out the order controller to get items from an array
angularApp.service('CommonProp', function () {
    var itemss = '';
    var total = 0.0;

    return {
        getItems: function () {
            return itemss;
        },
        setItems: function (value) {
            itemss = value;
        },
        setTotal: function (value) {
            total = value;
        },
        getTotal: function () {
            return total;
        },

    }
});
// ############################### DRIVER ##############################

//  driver home controller
angularApp.controller("DHomeController", function ($scope, UserApi, $location, $rootScope) { });
//  driver edit profile
angularApp.controller("DProfileController", function ($scope, UserApi, $rootScope, $location) {
    GetDrivers();
    function GetDrivers() {
        UserApi.getDriver().then(function (response) {
            $scope.driver = response.data;
        }), function () {
            alert("Unable to load users info");
        }
    };

    $scope.d_id = $rootScope.currentUser.d_id;
    $scope.d_firstname = $rootScope.currentUser.d_firstname;
    $scope.d_lastname = $rootScope.currentUser.d_lastname;
    $scope.d_cell = $rootScope.currentUser.d_cell;
    $scope.d_email = $rootScope.currentUser.d_email;
    $scope.d_password = $rootScope.currentUser.d_password;

    $scope.EditDriver = function () {
        var DriverToEdit = {
            'd_id': $scope.d_id,
            'd_firstname': $scope.d_firstname,
            'd_lastname': $scope.d_lastname,
            'd_cell': $scope.d_cell,
            'd_email': $scope.d_email,
            'd_password': $scope.d_password
        };

        UserApi.EditDriver(DriverToEdit).then(function (response) {
            alert("Driver is successfully edited");
            $scope.d_id = undefined;
            $scope.d_firstname = undefined;
            $scope.d_lastname = undefined;
            $scope.d_cell = undefined;
            $scope.d_email = undefined;
            $scope.d_password = undefined
            GetDrivers();
            $location.path('/DHome');
        }),
        function (response) {
            alert("unable to edit driver");
        }
    }
});
//  file access
angularApp.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {

        var Change = $parse(attrs.ngFiles);

        element.on('change', function (event) {
            Change(scope, { $files: event.target.files });
        })
    }
    return {
        link: fn_link
    }
}])
//  admin upload restuarant -logo- image
angularApp.controller("UploadRestImageController", function ($scope, $location, UserApi, $http) {
    var formdata = new FormData();

    $scope.GetImages = function ($files) {
        $scope.imagesrc = [];

        for (var g = 0; g < $files.length; g++) {
            var reader = new FileReader();
            reader.Filename = $files[g].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.Filename;
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = event.target.result;
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[g]);
        };
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        })
    };
    $scope.loadup = function () {
        var reqs = {
            method: 'POST',
            url: 'http://localhost:12317/api/ProImages',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        }

        $http(reqs).then(function (gm) {
            alert("Image saved successfully");
            $scope.reset();
        }), function () {
            alert("Failed to upload image");
            $scope.reset();
        }
    }

    $scope.reset = function () {
        angular.forEach(
            angular.element("Input [Type = 'file']"),
        function (inElem) {
            angular.element(inElem).val(null);
        }
            );
        $scope.imagesrc = [];
        formdata = new FormData();
    }

})

//  admin adding a product
angularApp.controller("AAddProductController", function ($scope, $http, $location, $window) {
    $scope.AddProd = function () {

        $http({
            method: "post", //Post data to the api
            url: "http://localhost:12317/api/Products/",
            contentType: "application/json",
            dataType: "json",
            data: {

                prod_name: $scope.prod_name,
                prod_price: $scope.prod_price,
                prod_type: $scope.prod_type,
                prod_desc: $scope.prod_desc
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (success) {
            $window.alert("Product Added");
        }, function (error) {
            $window.alert("Product Not Added");
        });
    }

});

angularApp.controller("RHomeController", function ($scope, UserApi, $location, $rootScope) { });

//  admin home controller
angularApp.controller("AHomeController", function ($scope, UserApi, $location, $rootScope) { });

//-***-*--**-*-*-*-*-*****===++++++++++++++++++++++=-=-=-=-=-=-=-=--=-=-=-=-=-=*****************************

angularApp.controller("AViewOrdersController", function ($scope, UserApi, $location, $http, $rootScope) {
    $scope.selectedItem = "Selected Order";
    $scope.isDeleteItemVisible = false;
    getOrders();
    function getOrders() {  //  get all the orders
        UserApi.GetAllOrders().then(function (response) {
            $scope.order_data = response.data;
        }), function () {
            alert("Couldn't get all the Orders");
        }
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.ord_id;
        $scope.totalPrice = item.totalPrice;
        $scope.ord_street = item.ord_street;
        $scope.ord_city = item.ord_city;
        $scope.ord_province = item.ord_province;
        $scope.ord_country = item.ord_country;
        $scope.email = item.email;
    };

    $scope.updateStatus = function () {
        var statusToEdit = {
            'ord_id': $scope.selectedItem,
            'totalPrice': $scope.totalPrice,
            'ord_street': $scope.ord_street,
            'ord_city': $scope.ord_city,
            'ord_province': $scope.ord_province,
            'ord_country': $scope.ord_country,
            'email': $scope.email,
            'ord_status': $scope.ord_status
        };

        UserApi.updateStatus(statusToEdit).then(function (response) {
            alert("Order Status Successfully Updated");
            $scope.totalPrice = undefined;
            $scope.ord_street = undefined;
            $scope.ord_city = undefined;
            $scope.ord_province = undefined;
            $scope.ord_country = undefined;
            $scope.email = undefined;
            $scope.ord_status = undefined;
            getOrders();
            $location.path('/AHome');
        }),
            function (response) {
                alert("Couldn't update the status");
            }
    };
});

angularApp.controller("DeleteProductsController", function ($scope, UserApi, $location, $http, $rootScope) {
    getProImages();
    function getProImages() {
        UserApi.GetProImage().then(function (response) {
            $scope.img = response.data;
        }), function () {
            alert('No images Found');
        }
    }

    $scope.delete = function (img) {
        UserApi.DeleteProImage(img.img_id).then(function () {
            removebyid(img.img_id);
        });
    };

    var removebyid = function (img_id) {
        for (var i = 0; i < $scope.img_id; i++) {
            if ($scope.img[i].img_id == img_id) {
                $scope.img.splice(i, 1);
                break;
            }
        };
    };
});

angularApp.controller("DeleteProdDeetsController", function ($scope, UserApi, $location, $http, $rootScope) {

    GetProduct();  //  Get products
    function GetProduct() {
        UserApi.GetProduct().then(function (response) {
            $scope.Products = response.data;
            console.log(response.data)
        }), function () {
            alert('No products Found');
        }
    }

    $scope.delete = function (prod) {
        UserApi.DeleteProduct(prod.prod_id).then(function () {
            removebyid(prod.prod_id);
        });
    };

    var removebyid = function (prod_id) {
        for (var i = 0; i < $scope.prod_id; i++) {
            if ($scope.prod[i].prod_id = prod_id) {
                $scope.prod.splice(i, 1);
                break;
            }
        };
    };
});

angularApp.controller("DOrdersController", function ($scope, UserApi, $location, $http, $rootScope) {
    $scope.selectedItem = "Selected Order";
    $scope.isDeleteItemVisible = false;
    getOrders()  //  Get all the orders
    function getOrders() {
        UserApi.RetrieverDriverOrder().then(function (response) {
            $scope.order_data = response.data;
        }), function () {
            alert("Couldn't get all the orders");
        }
    };
    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.ord_id;
        $scope.totalPrice = item.totalPrice;
        $scope.ord_street = item.ord_street;
        $scope.ord_city = item.ord_city;
        $scope.ord_province = item.ord_province;
        $scope.ord_country = item.ord_country;
        $scope.email = item.email;
        $scope.ord_status = "Picked Up";
    };

    $scope.updateStatus = function () {
        var statusToEdit = {
            'ord_id': $scope.selectedItem,
            'totalPrice': $scope.totalPrice,
            'ord_street': $scope.ord_street,
            'ord_city': $scope.ord_city,
            'ord_province': $scope.ord_province,
            'ord_country': $scope.ord_country,
            'email': $scope.email,
            'ord_status': $scope.ord_status,
            'ord_deliveryStatus': $scope.ord_deliveryStatus
        };

        UserApi.updateStatus(statusToEdit).then(function (response) {
            alert("Delivery Status Successfully updated");
            $scope.totalPrice = undefined;
            $scope.ord_street = undefined;
            $scope.ord_city = undefined;
            $scope.ord_province = undefined;
            $scope.ord_country = undefined;
            $scope.email = undefined;
            $scope.ord_status = undefined;
            $scope.ord_deliveryStatus = undefined;
            getOrders();
            $location.path('/DHome');
        }),
        function (response) {
            alert("Couldn't update the status");
        }
    };
});

angularApp.controller("COrderController", function ($scope, UserApi, $rootScope, $location, $http, CommonProp) {
    GetUsers();     //  Get users
    function GetUsers() {
        UserApi.getUser().then(function (response) {
            $scope.user = response.data;
        }), function () {
            alert("Unable to load users info");
        }
    }

    //getProd();  //  Get products
    //function getProd() {
    //    UserApi.getProduct().then(function (response) {
    //        $scope.Product = response.data;
    //    }), function () {
    //        alert('No products Found');
    //    }
    //}



    $scope.totalPrice = CommonProp.getTotal();
    $scope.ord_street = $scope.ord_street;
    $scope.ord_city = $scope.ord_city;
    $scope.ord_province = $scope.ord_province;
    $scope.ord_country = $scope.ord_country;
    $scope.email = $rootScope.currentUser.email;
    $scope.contact = $rootScope.currentUser.contact;
    $scope.firstname = $rootScope.currentUser.firstname;

    $scope.AdOrder = function ()    //button
    {
        var OrderToAdd =
        {
            'totalPrice': $scope.totalPrice,
            'ord_street': $scope.ord_street,
            'ord_city': $scope.ord_city,
            'ord_province': $scope.ord_province,
            'ord_country': $scope.ord_country,
            'email': $scope.email,
        };


        UserApi.AddOrders(OrderToAdd).then(function (response) {
            $scope.Order = response.data;
            alert("Order has been placed successfully");
            $scope.totalPrice = undefined;
            $scope.ord_street = undefined;
            $scope.ord_city = undefined;
            $scope.ord_province = undefined;
            $scope.ord_country = undefined;
            $scope.email = undefined;
            $scope.firstname = undefined;
            $scope.contact = undefined;
            $location.path('/ThankYou');
            $scope.AddAssociative();    //
        }),
        function (response) {
            alert("Unable to add order");
        };
    };

    $scope.AddAssociative = function () //  Adding to tblOrder_Product table
    {
        for (var i = 0; i <= $rootScope.myItems.length; i++) {
            $scope.pro_id = $rootScope.myItems[i].prod_id;

            var orderItems = {
                'pro_id': $scope.pro_id,
                'order_id': $scope.Order.ord_id
            }

            UserApi.AddToAssociative(orderItems).then(function (response) {
                console.log(response);
            }),
            function (response) {
                alert("Unable to add");
            }
        }
    };

});

angularApp.controller("SViewProductsController", function ($scope, UserApi, $location) {

    GetProduct();  //  Get products
    function GetProduct() {
        UserApi.GetProduct().then(function (response) {
            $scope.Products = response.data;
            console.log(response.data)
        }), function () {
            alert('No products Found');
        }
    }

    $scope.Edit = function (prd) {
        var ToEdit = {
            'prod_id': prd.prod_id,
            'prod_name': prd.prod_name,
            'prod_price': prd.prod_price,
            'prod_desc': prd.prod_desc,
            'prod_type': prd.prod_type,
            'prod_quantity': prd.prod_quantity,
            'prod_threshold': prd.prod_threshold,
            'prod_instock': prd.prod_instock
        };
        console.log(ToEdit);
        UserApi.Edit(ToEdit).then(function (response) {
            alert("Quantity Successfully Updated");
            //$scope.prod_id = undefined;
            //$scope.prod_name = undefined;
            //$scope.prod_price = undefined;
            //$scope.prod_desc = undefined;
            //$scope.prod_type = undefined;
            $scope.prod_quantity = prd.prod_quantity;
            //$scope.prod_threshold = undefined;
            //$scope.prod_instock = undefined;
            GetProduct();
            $location.path('/SProduct');
        }),
        function (response) {
            alert("Couldn't update the quantity");
        }
    };
});

angularApp.controller("ViewCustomersController", function ($scope, UserApi, $location, $http, $rootScope) {
    getCust();
    function getCust() {
        UserApi.getUser().then(function (response) {
            $scope.Customer = response.data;
        }), function () {
            alert('No customers Found');
        }
    }
});