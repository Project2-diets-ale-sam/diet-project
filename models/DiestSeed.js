const Diet = require('./Diet');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dietsapp')
  .then(() => {
    let diets = [
      {
        name: 'Dieta 1',
        categories: 'Vegana, baja en proteinas, rica en carbohidratos',
        description: "Esta dieta no contiene carne por lo que se trata de una dieta baja en proteínas y rica en carbohidratos gracias a alimentos como el Arroz, la pasta o el pan"

      },
      {
        name: 'Dieta 2',
        categories: 'Carnivora, alta en proteinas, mala para el colesterol',
        description: 'Esta dieta es rica en proteinas debido al gran consumo de carne roja que conlleva.'
      },
      {
        name: 'Dieta 3',
        categories: 'Mediterranea, pura vida',
        description: 'Esta dieta es la mejor del mundo y ya les gustaría a los guiris tener Jamon con aceite y tomate'
      }
    ];

    let dietObj = diets.map( p => new Diet(d));

    dietObj.forEach( d => d.save( (err, obj) =>{
      if(err){
        console.log(err);
      }else{
        console.log(`New product created [${obj.name}] with ID:${obj._id}`);
      }
    }));

    mongoose.connection.close();
  });
