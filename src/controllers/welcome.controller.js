export function getWelcome(req, res) {
    return res.render('welcome', { userEmail: req.session.userEmail });
}