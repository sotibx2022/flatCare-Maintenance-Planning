import axios from 'axios';

export const getCategoreis = async () => {
  const response = await axios.get('/api/category/findCategory');
  const result = response.data;
  const foundCategories = result.categories;
  const categoryCollections: string[] = [];

  if (foundCategories) {
    const categories = foundCategories.forEach(
      (category: { _id: string; name: string }) => {
        if (!categoryCollections.includes(category.name)) {
          categoryCollections.push(category.name);
        }
      },
    );
    return categoryCollections;
  }
};
