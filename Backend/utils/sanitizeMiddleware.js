// utils/sanitize.js
const sanitizeHtml = require("sanitize-html");

// Main sanitize function - removes ALL HTML
const sanitize = (input) => {
  if (typeof input !== "string") return input;

  return sanitizeHtml(input, {
    allowedTags: [], // Remove all HTML tags
    allowedAttributes: {}, // Remove all attributes
    textFilter: function (text) {
      // Replace common HTML entities
      return text
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"');
    },
  });
};

// For allowing basic formatting (blog posts, comments with formatting)
const sanitizeRich = (input) => {
  if (typeof input !== "string") return input;

  return sanitizeHtml(input, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
    ],
    allowedAttributes: {},
    allowedSchemes: ["http", "https", "mailto"],
  });
};

// For URLs and links only
const sanitizeUrl = (input) => {
  if (typeof input !== "string") return input;

  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });
};

// Express middleware to sanitize entire request
const sanitizeMid = (req, res, next) => {
  // Sanitize body
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = sanitize(req.body[key]);
    });
  }

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      if (typeof req.query[key] === "string") {
        req.query[key] = sanitize(req.query[key]);
      }
    });
  }

  next();
};

module.exports = {
  sanitize,
  sanitizeRich,
  sanitizeUrl,
  sanitizeMid,
};
