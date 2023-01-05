module.exports = {
    ensureAuthenticated: (req, res, nxt) => {
        if (req.isAuthenticated()) {
            return nxt();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/user/login');
    },
    forwardAuthenticated: (req, res, nxt) => {
        if (!req.isAuthenticated()) {
            return nxt();
        }
        res.redirect('/user/profile');
    }
};