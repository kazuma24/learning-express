const mainController = {};

mainController.getMainPage = (req, res) => {
    res.send('get MainPage !');
};

module.exports = mainController;