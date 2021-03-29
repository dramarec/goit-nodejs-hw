const app = require('./src/app');
const { connect } = require('./src/db');

const PORT = process.env.PORT || 3000;

(async connect => {
    try {
        await connect;
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    } catch (err) {
        console.log(`Server not running. Error message: ${err.message}`);
    }
})(connect);
//
// connect
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server running. Use our API on: ${PORT}`);
//         });
//     })
//     .catch(err =>
//         console.log(`Server not running. Error message: ${err.message}`),
//     );
