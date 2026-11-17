export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  group: Group;
  icon: string;
};

export type Group = 'Breads' | 'Pastries' | 'Cakes & sweets' | 'Coffee & drinks';

export const MENU: MenuItem[] = [
  { id: 'country-sourdough', name: 'Country Sourdough', desc: '36-hour ferment, crackly crust, tangy crumb.', price: 8, group: 'Breads', icon: 'loaf' },
  { id: 'rustic-white', name: 'Rustic White', desc: 'Soft, pillowy and perfect for toast.', price: 7, group: 'Breads', icon: 'loaf' },
  { id: 'seeded-spelt', name: 'Seeded Spelt', desc: 'Nutty spelt packed with sunflower and pumpkin seeds.', price: 9, group: 'Breads', icon: 'wheat' },
  { id: 'rosemary-focaccia', name: 'Rosemary Focaccia', desc: 'Olive oil, sea salt and fresh rosemary.', price: 7.5, group: 'Breads', icon: 'leaf' },
  { id: 'walnut-rye', name: 'Walnut Rye', desc: 'Dark, hearty and dotted with toasted walnuts.', price: 9, group: 'Breads', icon: 'loaf' },
  { id: 'small-loaf', name: 'Small Loaf', desc: 'A little sourdough for one (or two).', price: 5, group: 'Breads', icon: 'loaf' },

  { id: 'butter-croissant', name: 'Butter Croissant', desc: 'Flaky, golden layers of cultured butter.', price: 4.5, group: 'Pastries', icon: 'croissant' },
  { id: 'almond-croissant', name: 'Almond Croissant', desc: 'Filled with almond cream, topped with toasted flakes.', price: 5.5, group: 'Pastries', icon: 'croissant' },
  { id: 'berry-danish', name: 'Berry Danish', desc: 'Vanilla custard and seasonal berries.', price: 6, group: 'Pastries', icon: 'danish' },
  { id: 'cinnamon-roll', name: 'Cinnamon Roll', desc: 'Soft swirl, brown sugar and cream cheese glaze.', price: 5, group: 'Pastries', icon: 'danish' },
  { id: 'blueberry-muffin', name: 'Blueberry Muffin', desc: 'Bursting with berries and a crumbly top.', price: 4, group: 'Pastries', icon: 'cupcake' },
  { id: 'morning-bun', name: 'Morning Bun', desc: 'Our signature cinnamon-sugar swirl.', price: 4.5, group: 'Pastries', icon: 'croissant' },

  { id: 'vanilla-bean-cake', name: 'Vanilla Bean Cake', desc: 'Light sponge, real vanilla buttercream.', price: 38, group: 'Cakes & sweets', icon: 'cake' },
  { id: 'chocolate-fudge-cake', name: 'Chocolate Fudge Cake', desc: 'Rich, dark and deeply chocolatey.', price: 42, group: 'Cakes & sweets', icon: 'cake' },
  { id: 'lemon-drizzle-loaf', name: 'Lemon Drizzle Loaf', desc: 'Bright lemon and a sweet, sticky glaze.', price: 22, group: 'Cakes & sweets', icon: 'loaf' },
  { id: 'cookie-box', name: 'Cookie Box', desc: "Six cookies — ask for today's flavours.", price: 18, group: 'Cakes & sweets', icon: 'cupcake' },

  { id: 'espresso', name: 'Espresso', desc: 'A double shot of our house blend.', price: 3, group: 'Coffee & drinks', icon: 'coffee' },
  { id: 'cappuccino', name: 'Cappuccino', desc: 'Espresso with silky steamed milk.', price: 4.5, group: 'Coffee & drinks', icon: 'coffee' },
  { id: 'flat-white', name: 'Flat White', desc: 'Strong, smooth and just the right size.', price: 4.5, group: 'Coffee & drinks', icon: 'coffee' },
  { id: 'hot-chocolate', name: 'Hot Chocolate', desc: 'Real chocolate, whipped cream on top.', price: 5, group: 'Coffee & drinks', icon: 'coffee' },
];

export const MENU_GROUPS: { title: string; note: string; items: MenuItem[] }[] = [
  { title: 'Breads', note: 'Sold by the loaf', items: MENU.filter((m) => m.group === 'Breads') },
  { title: 'Pastries', note: 'Baked fresh each morning', items: MENU.filter((m) => m.group === 'Pastries') },
  { title: 'Cakes & sweets', note: 'Whole cakes by order', items: MENU.filter((m) => m.group === 'Cakes & sweets') },
  { title: 'Coffee & drinks', note: 'Perfect with a pastry', items: MENU.filter((m) => m.group === 'Coffee & drinks') },
];

export const FEATURED: { item: MenuItem; tag: string; art: string }[] = [
  { item: MENU[0], tag: 'Bestseller', art: 'rust' },
  { item: MENU.find((m) => m.id === 'butter-croissant')!, tag: 'Morning favourite', art: 'honey' },
  { item: MENU.find((m) => m.id === 'berry-danish')!, tag: 'Seasonal', art: 'berry' },
];

export function money(value: number): string {
  return `$${value.toFixed(2).replace(/\.00$/, '')}`;
}

export function findItem(id: string): MenuItem | undefined {
  return MENU.find((m) => m.id === id);
}
