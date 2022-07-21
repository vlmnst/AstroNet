const { v2: cloudinary } = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'cloud-img-commerce', 
    api_key: '824718996357433', 
    api_secret: 'QS4UJ9WbOcauj-RwzehUX3L2Q8M' 
});

module.exports = { cloudinary };