import type { Recipe } from '../types/planner';

export const RECIPES: Recipe[] = [
  // ==========================================
  // BREAKFAST RECIPES
  // ==========================================
  {
    id: 'b_1',
    name: 'Avocado Toast with Cherry Tomatoes',
    course: 'breakfast',
    diet: 'vegetarian',
    skill: 'beginner',
    time: 15,
    calories: 320,
    macronutrients: { protein: 9, carbs: 32, fat: 18 },
    ingredients: [
      { name: 'Bread', quantity: 2, unit: 'slices', price: 0.50, category: 'Bakery' },
      { name: 'Avocado', quantity: 1, unit: 'piece', price: 1.50, category: 'Produce' },
      { name: 'Cherry Tomatoes', quantity: 50, unit: 'g', price: 0.50, category: 'Produce' },
      { name: 'Lemon Juice', quantity: 1, unit: 'tsp', price: 0.10, category: 'Produce', isPantry: true },
      { name: 'Olive Oil', quantity: 0.5, unit: 'tbsp', price: 0.15, category: 'Pantry', isPantry: true },
      { name: 'Salt & Pepper', quantity: 1, unit: 'pinch', price: 0.05, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Toast the bread slices until golden brown.',
      'Mash avocado with lemon juice, salt, and pepper in a small bowl.',
      'Spread the mashed avocado evenly onto the toasted bread.',
      'Top with halved cherry tomatoes and drizzle with olive oil.'
    ],
    substitutions: {
      'Avocado': ['Hummus', 'Cream Cheese'],
      'Bread': ['Gluten-Free Bread', 'Rice Cakes'],
      'Cherry Tomatoes': ['Cucumber slices', 'Sautéed mushrooms']
    },
    allergens: ['gluten']
  },
  {
    id: 'b_2',
    name: 'Classic Scrambled Eggs & Smoked Salmon',
    course: 'breakfast',
    diet: 'non-vegetarian',
    skill: 'intermediate',
    time: 15,
    calories: 450,
    macronutrients: { protein: 28, carbs: 24, fat: 26 },
    ingredients: [
      { name: 'Eggs', quantity: 2, unit: 'pieces', price: 0.60, category: 'Dairy & Eggs' },
      { name: 'Butter', quantity: 10, unit: 'g', price: 0.20, category: 'Dairy & Eggs', isPantry: true },
      { name: 'Smoked Salmon', quantity: 50, unit: 'g', price: 2.50, category: 'Seafood' },
      { name: 'Bread', quantity: 2, unit: 'slices', price: 0.50, category: 'Bakery' },
      { name: 'Chives', quantity: 1, unit: 'tsp', price: 0.25, category: 'Produce' },
      { name: 'Salt & Pepper', quantity: 1, unit: 'pinch', price: 0.05, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Toast the bread slices.',
      'Whisk eggs in a bowl with a pinch of salt and pepper.',
      'Melt butter in a skillet over medium-low heat, pour in the eggs, and stir slowly until soft curds form.',
      'Place scrambled eggs on toast, top with smoked salmon, and garnish with chopped chives.'
    ],
    substitutions: {
      'Smoked Salmon': ['Bacon slices', 'Sautéed mushrooms'],
      'Butter': ['Olive oil', 'Margarine'],
      'Eggs': ['Tofu scramble']
    },
    allergens: ['eggs', 'fish', 'gluten', 'dairy']
  },
  {
    id: 'b_3',
    name: 'Maple Cinnamon Oatmeal with Fresh Berries',
    course: 'breakfast',
    diet: 'vegan',
    skill: 'beginner',
    time: 15,
    calories: 290,
    macronutrients: { protein: 8, carbs: 54, fat: 5 },
    ingredients: [
      { name: 'Rolled Oats', quantity: 50, unit: 'g', price: 0.20, category: 'Pantry', isPantry: true },
      { name: 'Almond Milk', quantity: 200, unit: 'ml', price: 0.40, category: 'Dairy Alternatives' },
      { name: 'Maple Syrup', quantity: 1, unit: 'tbsp', price: 0.30, category: 'Pantry', isPantry: true },
      { name: 'Cinnamon', quantity: 0.25, unit: 'tsp', price: 0.05, category: 'Pantry', isPantry: true },
      { name: 'Mixed Berries', quantity: 75, unit: 'g', price: 1.10, category: 'Produce' },
      { name: 'Chia Seeds', quantity: 0.5, unit: 'tbsp', price: 0.15, category: 'Pantry' }
    ],
    instructions: [
      'In a saucepan, bring the almond milk and oats to a gentle boil.',
      'Reduce heat to low and simmer for 5-7 minutes, stirring occasionally, until creamy.',
      'Stir in the cinnamon and maple syrup.',
      'Transfer to a bowl and top with fresh berries and chia seeds.'
    ],
    substitutions: {
      'Almond Milk': ['Oat milk', 'Soy milk', 'Regular milk'],
      'Maple Syrup': ['Agave nectar', 'Honey (non-vegan)'],
      'Mixed Berries': ['Banana slices', 'Apple pieces', 'Raisins']
    },
    allergens: []
  },
  {
    id: 'b_4',
    name: 'Tofu Scramble & Toast',
    course: 'breakfast',
    diet: 'vegan',
    skill: 'beginner',
    time: 15,
    calories: 310,
    macronutrients: { protein: 18, carbs: 28, fat: 12 },
    ingredients: [
      { name: 'Firm Tofu', quantity: 150, unit: 'g', price: 1.00, category: 'Produce / Deli' },
      { name: 'Spinach', quantity: 30, unit: 'g', price: 0.40, category: 'Produce' },
      { name: 'Turmeric', quantity: 0.25, unit: 'tsp', price: 0.05, category: 'Pantry', isPantry: true },
      { name: 'Olive Oil', quantity: 0.5, unit: 'tbsp', price: 0.15, category: 'Pantry', isPantry: true },
      { name: 'Bread', quantity: 2, unit: 'slices', price: 0.50, category: 'Bakery' },
      { name: 'Salt & Pepper', quantity: 1, unit: 'pinch', price: 0.05, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Toast the bread.',
      'Crumble the tofu into a bowl using your fingers or a fork.',
      'Heat olive oil in a skillet, add tofu, turmeric, salt, and pepper, and cook for 5 minutes, stirring often.',
      'Fold in the spinach and cook until wilted (~2 minutes). Serve warm alongside toast.'
    ],
    substitutions: {
      'Firm Tofu': ['Tempeh crumble', 'Scrambled eggs (non-vegan)'],
      'Bread': ['Gluten-Free Bread'],
      'Spinach': ['Kale', 'Arugula']
    },
    allergens: ['soy', 'gluten']
  },
  {
    id: 'b_5',
    name: 'Fluffy Berry Pancakes',
    course: 'breakfast',
    diet: 'vegetarian',
    skill: 'intermediate',
    time: 20,
    calories: 410,
    macronutrients: { protein: 12, carbs: 64, fat: 10 },
    ingredients: [
      { name: 'Flour', quantity: 100, unit: 'g', price: 0.15, category: 'Pantry', isPantry: true },
      { name: 'Milk', quantity: 120, unit: 'ml', price: 0.25, category: 'Dairy & Eggs' },
      { name: 'Egg', quantity: 1, unit: 'piece', price: 0.30, category: 'Dairy & Eggs' },
      { name: 'Baking Powder', quantity: 1, unit: 'tsp', price: 0.05, category: 'Pantry', isPantry: true },
      { name: 'Sugar', quantity: 1, unit: 'tbsp', price: 0.05, category: 'Pantry', isPantry: true },
      { name: 'Butter', quantity: 15, unit: 'g', price: 0.30, category: 'Dairy & Eggs', isPantry: true },
      { name: 'Blueberries', quantity: 50, unit: 'g', price: 0.75, category: 'Produce' }
    ],
    instructions: [
      'In a bowl, whisk flour, baking powder, sugar, and a pinch of salt.',
      'In another bowl, whisk the egg, milk, and melted butter. Combine wet and dry ingredients.',
      'Heat a buttered griddle. Pour batter, drop blueberries on top, and cook until bubbles form on top, then flip and cook until golden.',
      'Serve warm with syrup or butter.'
    ],
    substitutions: {
      'Milk': ['Almond milk', 'Oat milk'],
      'Blueberries': ['Strawberries', 'Chocolate chips', 'Banana slices'],
      'Egg': ['Applesauce (1/4 cup)', 'Flax egg']
    },
    allergens: ['gluten', 'dairy', 'eggs']
  },

  // ==========================================
  // LUNCH RECIPES
  // ==========================================
  {
    id: 'l_1',
    name: 'Mediterranean Chickpea & Feta Salad',
    course: 'lunch',
    diet: 'vegetarian',
    skill: 'beginner',
    time: 20,
    calories: 420,
    macronutrients: { protein: 14, carbs: 38, fat: 22 },
    ingredients: [
      { name: 'Canned Chickpeas', quantity: 120, unit: 'g', price: 0.50, category: 'Canned Goods' },
      { name: 'Cucumber', quantity: 0.5, unit: 'piece', price: 0.40, category: 'Produce' },
      { name: 'Cherry Tomatoes', quantity: 75, unit: 'g', price: 0.75, category: 'Produce' },
      { name: 'Feta Cheese', quantity: 50, unit: 'g', price: 1.25, category: 'Dairy & Eggs' },
      { name: 'Red Onion', quantity: 0.25, unit: 'piece', price: 0.15, category: 'Produce', isPantry: true },
      { name: 'Olive Oil', quantity: 1, unit: 'tbsp', price: 0.30, category: 'Pantry', isPantry: true },
      { name: 'Lemon Juice', quantity: 1, unit: 'tbsp', price: 0.20, category: 'Produce', isPantry: true },
      { name: 'Dried Oregano', quantity: 0.5, unit: 'tsp', price: 0.05, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Rinse and drain chickpeas.',
      'Dice the cucumber, tomato, red onion, and feta cheese.',
      'In a bowl, mix chickpeas, vegetables, and feta.',
      'Whisk olive oil, lemon juice, and oregano. Drizzle over salad and toss gently.'
    ],
    substitutions: {
      'Feta Cheese': ['Goat Cheese', 'Olives (for vegan swap)', 'Avocado'],
      'Canned Chickpeas': ['Canned White Beans', 'Lentils'],
      'Cherry Tomatoes': ['Bell Pepper']
    },
    allergens: ['dairy']
  },
  {
    id: 'l_2',
    name: 'Garlic Butter Grilled Chicken Wrap',
    course: 'lunch',
    diet: 'non-vegetarian',
    skill: 'beginner',
    time: 25,
    calories: 550,
    macronutrients: { protein: 35, carbs: 38, fat: 24 },
    ingredients: [
      { name: 'Chicken Breast', quantity: 150, unit: 'g', price: 1.75, category: 'Meat' },
      { name: 'Tortillas', quantity: 1, unit: 'piece', price: 0.40, category: 'Bakery' },
      { name: 'Lettuce', quantity: 50, unit: 'g', price: 0.30, category: 'Produce' },
      { name: 'Tomato', quantity: 0.5, unit: 'piece', price: 0.25, category: 'Produce' },
      { name: 'Mayonnaise', quantity: 1, unit: 'tbsp', price: 0.20, category: 'Pantry', isPantry: true },
      { name: 'Garlic', quantity: 1, unit: 'clove', price: 0.08, category: 'Produce', isPantry: true },
      { name: 'Butter', quantity: 10, unit: 'g', price: 0.20, category: 'Dairy & Eggs', isPantry: true }
    ],
    instructions: [
      'Slice chicken into thin strips and season with salt, pepper, and minced garlic.',
      'Sauté chicken in butter in a pan over medium heat for 8-10 minutes until cooked through.',
      'Warm tortilla in a dry skillet for 10 seconds.',
      'Spread mayonnaise, layer lettuce, tomatoes, and cooked chicken, then roll tightly.'
    ],
    substitutions: {
      'Chicken Breast': ['Turkey breast', 'Tofu strips', 'Halloumi slices'],
      'Tortillas': ['Pita bread', 'Lettuce wraps'],
      'Mayonnaise': ['Greek yogurt', 'Hummus']
    },
    allergens: ['gluten', 'dairy']
  },
  {
    id: 'l_3',
    name: 'Zesty Peanut Tofu & Veggie Stir-fry',
    course: 'lunch',
    diet: 'vegan',
    skill: 'intermediate',
    time: 30,
    calories: 490,
    macronutrients: { protein: 22, carbs: 46, fat: 25 },
    ingredients: [
      { name: 'Firm Tofu', quantity: 125, unit: 'g', price: 0.90, category: 'Produce / Deli' },
      { name: 'Broccoli', quantity: 75, unit: 'g', price: 0.60, category: 'Produce' },
      { name: 'Bell Pepper', quantity: 0.5, unit: 'piece', price: 0.50, category: 'Produce' },
      { name: 'Peanut Butter', quantity: 1, unit: 'tbsp', price: 0.30, category: 'Pantry', isPantry: true },
      { name: 'Soy Sauce', quantity: 1, unit: 'tbsp', price: 0.20, category: 'Pantry', isPantry: true },
      { name: 'Maple Syrup', quantity: 0.5, unit: 'tbsp', price: 0.15, category: 'Pantry', isPantry: true },
      { name: 'Sesame Oil', quantity: 0.5, unit: 'tbsp', price: 0.20, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Cube tofu and press with a towel to remove moisture.',
      'Whisk peanut butter, soy sauce, maple syrup, and 1 tbsp warm water together to make sauce.',
      'Cook tofu in sesame oil in a skillet until golden on all sides. Remove tofu.',
      'Stir-fry broccoli and sliced pepper for 4 minutes, add tofu and peanut sauce, toss for 2 minutes.'
    ],
    substitutions: {
      'Firm Tofu': ['Tempeh', 'Seitan', 'Chicken (non-vegan)'],
      'Peanut Butter': ['Almond butter', 'Sunflower seed butter'],
      'Broccoli': ['Green beans', 'Snap peas']
    },
    allergens: ['soy', 'peanuts']
  },
  {
    id: 'l_4',
    name: 'Lentil Soup with Crusty Bread',
    course: 'lunch',
    diet: 'vegan',
    skill: 'beginner',
    time: 30,
    calories: 380,
    macronutrients: { protein: 16, carbs: 58, fat: 8 },
    ingredients: [
      { name: 'Canned Lentils', quantity: 150, unit: 'g', price: 0.70, category: 'Canned Goods' },
      { name: 'Carrot', quantity: 1, unit: 'piece', price: 0.20, category: 'Produce' },
      { name: 'Celery', quantity: 1, unit: 'stalk', price: 0.25, category: 'Produce' },
      { name: 'Onion', quantity: 0.5, unit: 'piece', price: 0.25, category: 'Produce', isPantry: true },
      { name: 'Vegetable Broth', quantity: 300, unit: 'ml', price: 0.60, category: 'Pantry' },
      { name: 'Canned Tomatoes', quantity: 100, unit: 'g', price: 0.40, category: 'Canned Goods' },
      { name: 'Bread', quantity: 1, unit: 'slice', price: 0.25, category: 'Bakery' },
      { name: 'Olive Oil', quantity: 0.5, unit: 'tbsp', price: 0.15, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Finely dice the onion, carrot, and celery.',
      'Sauté vegetables in olive oil inside a pot for 5 minutes.',
      'Add canned tomatoes, vegetable broth, and drained lentils. Bring to a simmer.',
      'Cook for 15 minutes, season to taste, and serve hot with a toasted slice of bread.'
    ],
    substitutions: {
      'Canned Lentils': ['Canned Chickpeas', 'Brown beans'],
      'Vegetable Broth': ['Chicken broth (non-vegan)', 'Water + bouillon cube'],
      'Bread': ['Gluten-Free Bread']
    },
    allergens: ['gluten']
  },
  {
    id: 'l_5',
    name: 'Turkey & Swiss Club Sandwich',
    course: 'lunch',
    diet: 'non-vegetarian',
    skill: 'beginner',
    time: 10,
    calories: 460,
    macronutrients: { protein: 26, carbs: 32, fat: 22 },
    ingredients: [
      { name: 'Bread', quantity: 2, unit: 'slices', price: 0.50, category: 'Bakery' },
      { name: 'Sliced Turkey', quantity: 75, unit: 'g', price: 1.50, category: 'Meat' },
      { name: 'Swiss Cheese', quantity: 30, unit: 'g', price: 0.80, category: 'Dairy & Eggs' },
      { name: 'Lettuce', quantity: 20, unit: 'g', price: 0.15, category: 'Produce' },
      { name: 'Tomato', quantity: 0.25, unit: 'piece', price: 0.13, category: 'Produce' },
      { name: 'Mayonnaise', quantity: 1, unit: 'tbsp', price: 0.20, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Toast bread slices if desired.',
      'Spread mayonnaise on one side of both slices of bread.',
      'Layer sliced turkey, Swiss cheese, lettuce, and tomato slices.',
      'Close sandwich, cut diagonally, and serve.'
    ],
    substitutions: {
      'Sliced Turkey': ['Sliced chicken', 'Ham', 'Tofu slices'],
      'Swiss Cheese': ['Cheddar Cheese', 'Provolone Cheese'],
      'Mayonnaise': ['Mustard', 'Hummus']
    },
    allergens: ['gluten', 'dairy']
  },

  // ==========================================
  // DINNER RECIPES
  // ==========================================
  {
    id: 'd_1',
    name: 'Creamy Mushroom Risotto',
    course: 'dinner',
    diet: 'vegetarian',
    skill: 'advanced',
    time: 45,
    calories: 620,
    macronutrients: { protein: 15, carbs: 82, fat: 24 },
    ingredients: [
      { name: 'Arborio Rice', quantity: 75, unit: 'g', price: 0.60, category: 'Pantry' },
      { name: 'Mushrooms', quantity: 100, unit: 'g', price: 1.10, category: 'Produce' },
      { name: 'Vegetable Broth', quantity: 400, unit: 'ml', price: 0.80, category: 'Pantry' },
      { name: 'Parmesan Cheese', quantity: 25, unit: 'g', price: 1.00, category: 'Dairy & Eggs' },
      { name: 'Shallot', quantity: 0.5, unit: 'piece', price: 0.20, category: 'Produce' },
      { name: 'Garlic', quantity: 1, unit: 'clove', price: 0.08, category: 'Produce', isPantry: true },
      { name: 'Butter', quantity: 15, unit: 'g', price: 0.30, category: 'Dairy & Eggs', isPantry: true },
      { name: 'Olive Oil', quantity: 0.5, unit: 'tbsp', price: 0.15, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Warm the vegetable broth in a small pot and keep it on low simmer.',
      'Sauté sliced mushrooms in olive oil and set aside.',
      'Sauté minced shallot and garlic in butter, add rice, and stir for 1 minute to toast.',
      'Add broth one ladle at a time, stirring constantly, letting the rice absorb liquid before adding more. (Takes ~20 mins).',
      'Stir in cooked mushrooms and Parmesan cheese. Season and serve warm.'
    ],
    substitutions: {
      'Arborio Rice': ['Jasmine rice', 'Pearl barley'],
      'Parmesan Cheese': ['Nutritional yeast (vegan)', 'Pecorino romano'],
      'Vegetable Broth': ['Chicken broth (non-vegan)']
    },
    allergens: ['dairy']
  },
  {
    id: 'd_2',
    name: 'Lemon Herb Baked Salmon with Asparagus',
    course: 'dinner',
    diet: 'non-vegetarian',
    skill: 'intermediate',
    time: 35,
    calories: 510,
    macronutrients: { protein: 38, carbs: 12, fat: 34 },
    ingredients: [
      { name: 'Salmon Fillets', quantity: 1, unit: 'piece', price: 4.50, category: 'Seafood' },
      { name: 'Asparagus', quantity: 125, unit: 'g', price: 1.50, category: 'Produce' },
      { name: 'Lemon', quantity: 0.5, unit: 'piece', price: 0.25, category: 'Produce' },
      { name: 'Olive Oil', quantity: 1, unit: 'tbsp', price: 0.30, category: 'Pantry', isPantry: true },
      { name: 'Garlic', quantity: 1.5, unit: 'cloves', price: 0.12, category: 'Produce', isPantry: true },
      { name: 'Dried Dill', quantity: 0.5, unit: 'tsp', price: 0.08, category: 'Pantry', isPantry: true },
      { name: 'Salt & Pepper', quantity: 1, unit: 'pinch', price: 0.05, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Preheat oven to 400°F (200°C). Line a sheet pan with parchment.',
      'Place salmon fillet in the center and layout trimmed asparagus spears around it.',
      'Whisk olive oil, garlic, dill, salt, and pepper. Pour over salmon and asparagus.',
      'Top salmon with lemon slices, squeeze remaining juice over asparagus, and bake for 12-15 minutes.'
    ],
    substitutions: {
      'Salmon Fillets': ['Chicken breasts', 'Cod fillets', 'Firm tofu slabs'],
      'Asparagus': ['Green beans', 'Broccoli spears'],
      'Dried Dill': ['Thyme', 'Rosemary']
    },
    allergens: ['fish']
  },
  {
    id: 'd_3',
    name: 'Hearty Coconut Chickpea Curry & Rice',
    course: 'dinner',
    diet: 'vegan',
    skill: 'beginner',
    time: 40,
    calories: 580,
    macronutrients: { protein: 16, carbs: 90, fat: 18 },
    ingredients: [
      { name: 'Canned Chickpeas', quantity: 120, unit: 'g', price: 0.50, category: 'Canned Goods' },
      { name: 'Coconut Milk', quantity: 200, unit: 'ml', price: 0.90, category: 'Canned Goods' },
      { name: 'Basmati Rice', quantity: 75, unit: 'g', price: 0.30, category: 'Pantry' },
      { name: 'Spinach', quantity: 50, unit: 'g', price: 0.60, category: 'Produce' },
      { name: 'Onion', quantity: 0.5, unit: 'piece', price: 0.25, category: 'Produce', isPantry: true },
      { name: 'Ginger Garlic Paste', quantity: 0.5, unit: 'tbsp', price: 0.15, category: 'Pantry', isPantry: true },
      { name: 'Curry Powder', quantity: 0.5, unit: 'tbsp', price: 0.10, category: 'Pantry', isPantry: true },
      { name: 'Canned Diced Tomatoes', quantity: 100, unit: 'g', price: 0.30, category: 'Canned Goods' }
    ],
    instructions: [
      'Rinse rice and cook according to packaging instructions.',
      'Sauté diced onion in oil in a pot. Add ginger-garlic paste and curry powder, cooking for 1 minute.',
      'Stir in diced tomatoes, drained chickpeas, and coconut milk. Simmer gently for 12 minutes.',
      'Stir in spinach until wilted, and serve hot over rice.'
    ],
    substitutions: {
      'Canned Chickpeas': ['Lentils', 'Sweet Potato', 'Tofu cubes'],
      'Coconut Milk': ['Heavy cream (non-vegan)', 'Cashew cream'],
      'Basmati Rice': ['Brown rice', 'Quinoa']
    },
    allergens: []
  },
  {
    id: 'd_4',
    name: 'Ribeye Steak with Butter & Potatoes',
    course: 'dinner',
    diet: 'non-vegetarian',
    skill: 'advanced',
    time: 50,
    calories: 850,
    macronutrients: { protein: 52, carbs: 32, fat: 58 },
    ingredients: [
      { name: 'Ribeye Steak', quantity: 1, unit: 'piece', price: 12.00, category: 'Meat' },
      { name: 'Baby Potatoes', quantity: 200, unit: 'g', price: 0.75, category: 'Produce' },
      { name: 'Garlic', quantity: 2, unit: 'cloves', price: 0.13, category: 'Produce', isPantry: true },
      { name: 'Fresh Rosemary', quantity: 1.5, unit: 'sprigs', price: 0.60, category: 'Produce' },
      { name: 'Butter', quantity: 25, unit: 'g', price: 0.50, category: 'Dairy & Eggs', isPantry: true },
      { name: 'Olive Oil', quantity: 1, unit: 'tbsp', price: 0.30, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Preheat oven to 400°F (200°C). Roast halved baby potatoes with olive oil and salt for 25 minutes.',
      'Dry the steak with paper towels. Season generously with salt and pepper.',
      'Sear steak in a hot skillet with olive oil for 2-3 minutes on each side.',
      'Reduce heat, add butter, garlic, and rosemary to the skillet, spooning melted butter over steak for 2 minutes.',
      'Let steak rest for 5 minutes, slice and serve with potatoes.'
    ],
    substitutions: {
      'Ribeye Steak': ['Sirloin steak', 'Pork chop', 'Portobello mushroom cap'],
      'Fresh Rosemary': ['Fresh Thyme'],
      'Butter': ['Olive oil']
    },
    allergens: ['dairy']
  },
  {
    id: 'd_5',
    name: 'Vegan Lentil Shepherd\'s Pie',
    course: 'dinner',
    diet: 'vegan',
    skill: 'advanced',
    time: 55,
    calories: 480,
    macronutrients: { protein: 18, carbs: 68, fat: 12 },
    ingredients: [
      { name: 'Canned Lentils', quantity: 150, unit: 'g', price: 0.70, category: 'Canned Goods' },
      { name: 'Potatoes', quantity: 300, unit: 'g', price: 0.80, category: 'Produce' },
      { name: 'Mixed Vegetables', quantity: 100, unit: 'g', price: 0.60, category: 'Produce' },
      { name: 'Onion', quantity: 0.5, unit: 'piece', price: 0.25, category: 'Produce', isPantry: true },
      { name: 'Tomato Paste', quantity: 1, unit: 'tbsp', price: 0.20, category: 'Canned Goods' },
      { name: 'Vegetable Broth', quantity: 150, unit: 'ml', price: 0.30, category: 'Pantry' },
      { name: 'Olive Oil', quantity: 1, unit: 'tbsp', price: 0.30, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Peel and boil potatoes in salted water until soft. Mash with salt, pepper, and olive oil.',
      'Sauté diced onion and mixed vegetables in a skillet. Stir in tomato paste, lentils, and broth. Cook for 5 minutes.',
      'Transfer lentil-veggie mixture to a small baking dish.',
      'Spread mashed potatoes on top. Broil in the oven for 10 minutes until golden.'
    ],
    substitutions: {
      'Canned Lentils': ['Black beans', 'Ground turkey (non-vegan)'],
      'Potatoes': ['Sweet potatoes', 'Mashed cauliflower']
    },
    allergens: []
  },
  {
    id: 'd_6',
    name: 'Classic Margherita Pizza',
    course: 'dinner',
    diet: 'vegetarian',
    skill: 'intermediate',
    time: 40,
    calories: 680,
    macronutrients: { protein: 24, carbs: 90, fat: 22 },
    ingredients: [
      { name: 'Pizza Dough', quantity: 1, unit: 'piece', price: 1.50, category: 'Bakery' },
      { name: 'Marinara Sauce', quantity: 100, unit: 'g', price: 0.60, category: 'Canned Goods' },
      { name: 'Mozzarella Cheese', quantity: 100, unit: 'g', price: 2.00, category: 'Dairy & Eggs' },
      { name: 'Fresh Basil', quantity: 10, unit: 'g', price: 0.50, category: 'Produce' },
      { name: 'Olive Oil', quantity: 0.5, unit: 'tbsp', price: 0.15, category: 'Pantry', isPantry: true }
    ],
    instructions: [
      'Preheat oven to 450°F (230°C). Stretch pizza dough onto a baking sheet.',
      'Spread marinara sauce over the dough, leaving a border.',
      'Top with sliced mozzarella cheese and bake for 12-15 minutes until crust is browned and cheese bubbly.',
      'Garnish with fresh basil leaves and a drizzle of olive oil before slicing.'
    ],
    substitutions: {
      'Mozzarella Cheese': ['Vegan cheese', 'Provolone'],
      'Pizza Dough': ['Gluten-Free Pizza Crust', 'Flatbread'],
      'Fresh Basil': ['Dried oregano']
    },
    allergens: ['gluten', 'dairy']
  }
];
