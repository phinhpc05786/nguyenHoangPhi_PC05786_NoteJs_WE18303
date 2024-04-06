const User = require('../../models/User');

exports.signUpUser = async (req, res) => { 
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        img: req.body.img,
        description: req.body.description,
        phone: req.body.phone
    };

    try {
        const userResponse = await User.create(user, { 
            fields: ['id', 'name', 'email', 'password', 'img', 'description', 'phone']
        });
        res.status(200).json({
            data: userResponse
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
