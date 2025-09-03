import { v4 as uuidv4 } from 'uuid';
import ProductStatus from './models/ProductStatus.js';
import Category from './models/Category.js';
import {productStates as product_statuses, category as categoryNames} from '../constants/dbStaticData.js';

/**
 * Seeds the database with initial sample data for testing or development.
 *
 * This function performs the following operations in order:
 * 1. Creates predefined order statuses.
 * 2. Creates predefined product statuses.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when all data has been seeded.
 *
 * @throws {Error} If any create operation in the database fails.
 *
 * @usage
 * await seedDatabase();
 */
async function seedDatabase() {

  // =================== 1. Seed product statuses ===================
  const productStatuses = [];
  for (let status of product_statuses) {
    const createdStatus = await ProductStatus.create({ id: uuidv4(), status });
    productStatuses.push(createdStatus);
  }

  // =================== 2. Seed categories ===================
  const categories = [];
  for (let name of categoryNames) {
    const category = await Category.create({ id: uuidv4(), name });
    categories.push(category);
  }

  console.log('Database seeded successfully!');
}

export default seedDatabase;