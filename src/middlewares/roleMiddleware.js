const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user; // Assuming `role` is part of the authenticated user object

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        status: 403,
        data: null,
        message: 'Forbidden Access',
        error: 'You do not have the required permissions to perform this action.',
      });
    }

    next();
  };
};

module.exports = roleMiddleware