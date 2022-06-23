const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({
			title: 'Fish finger and custard',
			level: 'UltraPro Chef',
			ingredients: [
				'14-oz piece skinned and boned cod or haddock fillet',
				'2 3/4 tbsp all-purpose flour',
				'1 medium egg, beaten',
				'1 1/4 cups fresh breadcrumbs oil, for shallow-frying',
				'1 tbsp butter',
				'1 1/4 cups milk',
				'1 tsp Dijon mustard',
        'A new'
			],
			cuisine: 'Whovian',
			dishType: 'dessert',
			image: 'https://images.squarespace-cdn.com/content/v1/559dc96be4b099333339097f/1436405239562-APCKJQLY5ELPFX43F43V/image-asset.jpeg?format=1000w',
			duration: 10,
			creator: 'The Doctor'
		});
  })
  .then((response) => {
   
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((element) => {
      console.log(element.title);
    });
  })
  .then((response) => {
   
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese'}, 
      {  duration: 100}, 
     
    );
  })
  .then((response) => {
    
    return Recipe.deleteOne({ title: 'Carrot Cake'});
  })
.then((response)=>{
  mongoose.connection.close()
})

  .catch(error => {
    console.error('Error connecting to the database', error);
    
  });

