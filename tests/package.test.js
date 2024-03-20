
const { insertPackage } = require('../controllers/packageController');
const newPackage = require('../models/Package');
const City = require('../models/City');
const Hotel = require('../models/Hotels');
const validator = require('validator');
const jwt = require('jsonwebtoken');

jest.mock('../models/Package');
jest.mock('../models/City');
jest.mock('../models/Hotels');
jest.mock('validator');
jest.mock('jsonwebtoken');

describe('Insert newPackage Function', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                destination: 'Paris',
                hotel: 'Hilton',
                depart_date: '2024-12-31',
                trip_duration: 7,
                number_of_seats: 100,
                price: 1000,
                description: 'Amazing trip to Paris',
                status: 'available',
            },
            headers: {
                cookie: 'token=validToken',
            },
            file: {
                filename: 'image.jpg',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        validator.isLength.mockReturnValue(true);
        validator.isISO8601.mockReturnValue(true);
        validator.isNumeric.mockReturnValue(true);
        jwt.verify.mockReturnValue({ userId: { _id: 'validUserId' } });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error if destination is missing', async () => {
        req.body.destination = '';
        await insertPackage(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({  "error": "Destination not found.",});
    });

    

    it('should insert newPackage successfully', async () => {
        newPackage.findOne.mockResolvedValue(null);
        City.findOne.mockResolvedValue({ _id: 'validCityId' });
        Hotel.findOne.mockResolvedValue({ _id: 'validHotelId' });
        const savednewPackage = {
            _id: 'validnewPackageId',
            destination: 'validCityId',
            hotel: 'validHotelId',
            depart_date: '2024-12-31',
            trip_duration: 7,
            number_of_seats: 100,
            available_seats: 100,
            price: 1000,
            description: 'Amazing trip to Paris',
            status: 'available',
            image: 'image.jpg',
            user_id: 'validUserId',
        };
        newPackage.prototype.save.mockResolvedValue(savednewPackage);

        await insertPackage(req, res);
        expect(res.json).toHaveBeenCalledWith({ success: true, "message": "Package inserted successfully", });
    });

    it('should handle internal server error', async () => {
        newPackage.prototype.save.mockRejectedValue(new Error('Database error'));
        await insertPackage(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Database error' });
    });
});
