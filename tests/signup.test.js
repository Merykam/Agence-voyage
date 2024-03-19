const { signup } = require('../controllers/authController');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mocking User.findOne to return null (user does not exist in the database)
// Mocking the User model
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
}));

// Mocking bcryptjs.hash
jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
}));

// Mocking jwt.sign
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

// Mocking sendMail function
jest.mock('../utils/sendMail', () => ({
    sendMail: jest.fn(),
}));

describe('Signup Function', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'StrongPassword123.',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error if name length is invalid', async () => {
        req.body.name = ''; // Invalid name (empty)
        await signup(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Le nom est requis.' });
    });

    it('should return an error if email format is invalid', async () => {
        req.body.email = 'invalidemail'; // Invalid email format
        await signup(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Adresse e-mail invalide.' });
    });

    it('should return an error if password is not strong enough', async () => {
        req.body.password = 'weak'; // Weak password
        await signup(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Le mot de passe doit être fort.' });
    });

    it('should return an error if user already exists', async () => {
        User.findOne.mockResolvedValue({ email: req.body.email }); // Mocking existing user
        await signup(req, res, next);
        expect(res.json).toHaveBeenCalledWith({ error: 'user already exists' });
    });
    

    // it('should create a new user and send verification email', async () => {
    //     User.findOne.mockResolvedValue(null); // Mocking user not found
    //     bcryptjs.hash.mockResolvedValue('hashedPassword');
    //     jwt.sign.mockReturnValue('fakeToken');
        
    //     await signup(req, res, next);
        
        
    //     expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    //     expect(bcryptjs.hash).toHaveBeenCalledWith(req.body.password, 10);
    //     expect(User.create).toHaveBeenCalledWith({
    //         email: req.body.email,
    //         name: req.body.name,
    //         password: 'hashedPassword',
    //         role: '0',
    //     });
    //     expect(sendMail).toHaveBeenCalled();
    //     expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Check your email to verify.' });
    // });
    
    

    it('should handle internal server error', async () => {
        User.findOne.mockRejectedValue(new Error('Database error')); // Mocking database error
        await signup(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Database error' });
    });
    
});
