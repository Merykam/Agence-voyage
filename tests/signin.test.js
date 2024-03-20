
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { signin } = require('../controllers/authController');
const jwt = require('jsonwebtoken');

jest.mock('../models/user', () => ({
    findOne: jest.fn().mockReturnValue({
        email: 'test@example.com',
        password: 'hashedPassword', 
        isVerified: true,
        id: 'user123',
        role: '0',
    }),
}));


jest.mock('bcryptjs', () => ({
    compare: jest.fn().mockReturnValue(true), 
}));


jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('fakeToken'), 
}));

describe('Signin Function', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should sign in a user with correct credentials', async () => {

        req.body.email="test@example.com";
        req.body.password = 'password123';

        await signin(req, res);
       

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith( {success: true, 
            data: {
                userId:'user123',
                email: 'test@example.com',
                token: 'fakeToken',
                role:'0'
              }, });
      
    });

    it('should return an error if user is not verified', async () => {
        User.findOne.mockReturnValueOnce({
            email: 'test@example.com',
            password: 'hashedPassword',
            isVerified: false,
        });
        req.body.email="test@example.com";
        req.body.password = 'password123'; 
        await signin(req, res);
     

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Verify your email' });
    });

    it('should return an error for incorrect credentials', async () => {
        bcryptjs.compare.mockReturnValueOnce(false); 
        req.body.email="test@example.com";
        req.body.password = 'wrongpassword'; 
        await signin(req, res);
      
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Adresse e-mail ou mot de passe incorrect.' });
    });

    it('should handle internal server error', async () => {
        User.findOne.mockRejectedValueOnce(new Error('Database error'));

        req.body.email="test@example.com";
        req.body.password = 'password123'; 
        await signin(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Database error' });
    });
    
});
