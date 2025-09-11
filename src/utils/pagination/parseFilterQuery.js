import { category } from '../../constants/dbStaticData.js';
import parseString from '../parseValues/parseString.js';

/**
 * Parses and normalizes filter query parameters for searching.
 *
 * @function parseFilterQuery
 * @param {Object} query - The raw query object from the request.
 * @param {string} [query.username] - Optional username filter.
 * @param {string} [query.product] - Optional product name filter.
 * @param {string} [query.category] - Optional category filter.
 *
 * @returns {Object} A normalized filter object containing only valid filters.
 * @returns {string} [return.username] - Parsed username (if provided).
 * @returns {string} [return.product] - Parsed product name (if provided).
 * @returns {string} [return.category] - Parsed category (defaults to the first value in `categoryNames` if not provided).
 */
const parseFilterQuery = query => {
  let username = '';
  let productName = '';
  let categoryId = '';
  let sortBy = 'newest'
  const parseQuery = {};
  if (query.username) {
    const temp = parseString(query.username);
    username = temp ? temp : username;
    parseQuery.username = username;
  }
  if (query.product) {
    const temp = parseString(query.product);
    productName = temp ? temp : productName;
    parseQuery.product = productName;
  }
  if (query.category) {
    const temp = parseString(query.category);
    categoryId = temp ? temp : categoryId;
    parseQuery.categoryId = categoryId;
  }
  if (query.sortBy) {
    const temp = parseString(query.sortBy);
    sortBy = temp ? temp : sortBy;
    parseQuery.sortBy = sortBy;
  }
  return parseQuery;
};

export default parseFilterQuery;
