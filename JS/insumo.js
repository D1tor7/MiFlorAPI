//Agregar documentos de manera dinamica
//las variables nombre y carrera son las que se reconoce del id en index.html
//Las variables que se encuentran en db.collection name y career, son los campos de la base de datos de firestore.

//funcion guardar, cuando se hace clic en guardar() se ejecuta el sgt codigo
//leer datos

var tabla = document.getElementById('tabla');
  
db.collection("productos").onSnapshot((querySnapshot) => {
  //tabla para limpiar
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
      tabla.innerHTML +=
          `
    
      <tr>
      <th scope="row">${doc.id}</th>
          <td>${doc.data().category}</td>
          <td>${doc.data().description}</td>
          <td>${doc.data().name}</td>
          <td>${doc.data().price}</td>
          <td>${doc.data().stock}</td>
         

        
        </tr>
      `
  });
});


