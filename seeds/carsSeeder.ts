// Import your Knex configuration
import type { Knex } from "knex";

exports.seed = async function (knex: Knex) {
    // Deletes ALL existing entries in the "cars" table
    await knex('cars').del();

    // Inserts seed entries
    await knex('cars').insert([
        {
            name: 'Car 1',
            price: 25000,
            size: 'Compact',
            image: 'car1.jpg',
        },
        {
            name: 'Car 2',
            price: 35000,
            size: 'Midsize',
            image: 'car2.jpg',
        },
        {
            name: 'Car 3',
            price: 45000,
            size: 'SUV',
            image: 'car3.jpg',
        },
        // Add more seed data as needed
    ]);
};
