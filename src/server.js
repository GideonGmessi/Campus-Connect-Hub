
require('dotenv').config({
    path: require('path').join(__dirname, 'config', '.env')
})

const app = require('./app');
const connnectDB = require('./config/db.config')
const PORT  = process.env.PORT || 5000;

(async () => {
    try {
        await connnectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }catch (error) {
        console.error(`Error starting server: ${error}`);
        process.exit(1);
    }   
})();