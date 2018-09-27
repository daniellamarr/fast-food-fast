import orderControl from "../controllers/orderControl";
import UserControl from "../controllers/userControl";
import AdminControl from "../controllers/adminControl";
import Middleware from "../helpers/middleware";
import CheckUser from "../helpers/checkUser";
import tokendecode from "../jwt/tokendecode";
import MenuControl from "../controllers/menuControl";

const Route = (app) => {
    app.get(
        '/api/v1/orders',
        orderControl.getAllOrders
    );

    app.post('/api/v1/orders',
        Middleware.validatePlaceOrder,
        orderControl.placeOrder
    );

    app.get('/api/v1/orders/:id',
        Middleware.validateGetOneOrder,
        orderControl.getOneOrder
    );

    app.put('/api/v1/orders/:id',
        Middleware.validateUpdateOrderStatus,
        orderControl.updateOrderStatus
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
        MenuControl.getMenu
    )
}

export default Route;
