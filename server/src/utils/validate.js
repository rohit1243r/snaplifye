export const sanitize = (str) => {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
};

export const isStrongPassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("one number");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("one special character");
  return errors;
};

export const validateRegisterInput = (body) => {
  const errors = {};

  if (!body.name || body.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.email = "Valid email is required";
  }

  if (!body.password) {
    errors.password = "Password is required";
  } else {
    const pwErrors = isStrongPassword(body.password);
    if (pwErrors.length > 0) {
      errors.password = "Password must contain " + pwErrors.join(", ");
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
