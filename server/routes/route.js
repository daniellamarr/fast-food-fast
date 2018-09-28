import orderControl from "../controllers/orderControl";
import UserControl from "../controllers/userControl";
import AdminControl from "../controllers/adminControl";
import Middleware from "../helpers/middleware";
import CheckUser from "../helpers/checkUser";
import tokendecode from "../jwt/tokendecode";
import MenuControl from "../controllers/menuControl";
import OrderHelper from "../helpers/orderHelper";

const Route = (app) => {
    app.get(
        '/api/v1/orders',
        tokendecode,
        CheckUser.validateAdmin,
        OrderHelper.helpAdminGetOrders,
        OrderHelper.helpGetOrderUser,
        OrderHelper.helpGetUserAndOrderItems,
        orderControl.getAllOrders
    );

    app.post('/api/v1/orders',
        tokendecode,
        CheckUser.userCheck,
        Middleware.validatePlaceOrder,
        OrderHelper.helpPlaceOrder,
        orderControl.placeOrder
    );

    app.get('/api/v1/orders/:id',
        tokendecode,
        CheckUser.validateAdmin,
        Middleware.validateGetOneOrder,
        OrderHelper.helpAdminGetOneOrder,
        OrderHelper.helpGetOrderUser,
        OrderHelper.helpGetUserAndOrderItems,
        orderControl.getOneOrder
    );

    app.put('/api/v1/orders/:id',
        tokendecode,
        CheckUser.validateAdmin,
        Middleware.validateUpdateOrderStatus,
        OrderHelper.helpAdminGetOneOrder,
        OrderHelper.helpUpdateOrderStaus,
        orderControl.updateOrderStatus
    );

    app.get('/api/v1/users/:id/orders',
        tokendecode,
        CheckUser.idVerification,
        OrderHelper.helpGetUserOrders,
        OrderHelper.helpGetOrderItems,
        orderControl.getUserOrders
    );

    app.post('/api/v1/auth/signup',
        CheckUser.validateUser,
        Middleware.validateUserSignup,
        UserControl.userSignup
    );

    app.post('/api/v1/auth/login',
        Middleware.validateLogin,
        CheckUser.loginCredentials,
        UserControl.userLogin
    );

    app.post('/api/v1/auth/admin',
        Middleware.validateLogin,
        CheckUser.adminLoginCredentials,
        AdminControl.adminLogin
    );

    app.post('/api/v1/menu',
        tokendecode,
        CheckUser.validateAdmin,
        Middleware.validateAddMenu,
        MenuControl.addMenu
    );

    app.get('/api/v1/menu',
        MenuControl.getAllMenu
    )

    app.get('/api/v1/menu/:id',
        Middleware.validateGetOneMenu,
        MenuControl.getOneMenu
    )
}

export default Route;
