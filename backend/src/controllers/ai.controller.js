const aiService = require('../services/ai.service');

module.exports.getReview = async(req, res) => {
    const { code, language } = req.body;
    
    if (!code) {
        return res.status(400).send("Code is required");
    }
    
    if (!language) {
        return res.status(400).send("Language is required");
    }
    
    try {
        const response = await aiService(code, language);
        res.send(response);
    } catch (error) {
        console.error('Error in code review:', error);
        res.status(500).send("Error processing code review");
    }
}