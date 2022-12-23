function guardar() {
    var supplierName = document.getElementById('supplierName').value;
    var name = document.getElementById('name').value;
    var email= document.getElementById('email').value;
    var Telefono = document.getElementById('Telefono').value;
  
    db.collection("proveedor").add({
        supplierName: supplierName,
        name: name,
        email: email,
        Telefono: Telefono,
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            //reiniciar los inputs. Una vez que se guarda, lo limpie.
            document.getElementById('supplierName').value = '';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('Telefono').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
  }
  
  //leer datos
  var tabla = document.getElementById('tabla');
  
  db.collection("proveedor").onSnapshot((querySnapshot) => {
    //tabla para limpiar
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
        tabla.innerHTML +=
            `
        <tr>
        <th scope="row">${doc.id}</th>
            <td>${doc.data().supplierName}</td>
            <td>${doc.data().name}</td>
            <td>${doc.data().email}</td>
            <td>${doc.data().Telefono}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')"><i class="fa fa-trash"></i></button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().supplierName}','${doc.data().name}','${doc.data().email}','${doc.data().Telefono}')"><i class="fa fa-edit"></i></button></td>
            <td><button class="btn" onclick="enviarCorreo('${doc.id}')"><i class="fa fa-message"></i></button></td>
        </tr>
        `
    });
  });
  
  //borrar documentos
  function eliminar(id) {
    db.collection("proveedor").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing documnent: ", error);
    });
  }

  function enviarCorreo(id){
    db.collection("proveedor").doc(id).get().then((doc) => {
        // Asigna el valor del campo "email" del documento a la variable sEmail
        let sEmail = doc.get("email");
        let sNombre = doc.get("name");
        var sStock = prompt("¿Cuantos productos deseas pedir?");
        var sProducto = prompt("¿Que producto deseas recibir?");
        var sDias = prompt("¿En cuantos dias te gustaria recibirlo?");
        
        // Ahora puedes usar la variable sEmail para cualquier cosa que necesites
        // Por ejemplo, abrir el cliente de correo con un nuevo mensaje prellenado con el destinatario y el cuerpo del mensaje especificados
        var sLink = "mailto:" + encodeURIComponent(sEmail)
         + "?subject=" + encodeURIComponent("Abastecimiento de productos")
         + "&body=" + encodeURIComponent("Tenga un buen dia estimado "+ sNombre +" Saludamos desde la Panaderia Mi Flor para solicitarle " + sStock +"  unidades de  "+sProducto+" , me gustaria recibirlo en por lo menos " +sDias+"  dias habiles. Esperamos su respuesta inmediata");
        window.location.href = sLink;
      });
  }
  

  //editar documentos
  //se le pasa el id de cada documento para que le reconozca
  //variables id,nombre,carrera donde se almacenara el id,name, carrer
  
  function editar(id,supplierName,name,email,Telefono){
  //pasar los id del html de cada input los que estan en ' '
    document.getElementById('supplierName').value = supplierName;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('Telefono').value = Telefono;
    //cambiar el boton guardar por editar
    var boton = document.getElementById('boton');
    boton.innerHTML ='Editar';
    //despues de hacer click en editar se ejecuta ls sgt funcion
    
    boton.onclick = function(){
        var supplierName = document.getElementById('supplierName').value;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var Telefono = document.getElementById('Telefono').value;
        
        var actualizar = db.collection("proveedor").doc(id);
        
        return actualizar.update({
        supplierName: supplierName,
        name: name,
        email: email,
        Telefono: Telefono,
        
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML ='Guardar';
                document.getElementById('supplierName').value = '';
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('Telefono').value = '';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
    }
