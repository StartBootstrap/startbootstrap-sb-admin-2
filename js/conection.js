
const server = 'http://34.228.53.60:8081';
const header= {"Content-Type" : "application/json"};
var tipo_veiculo = 0;
var veiculo = 0;

function limpacampos(){
  tipo_veiculo = 0;
  veiculo = 0;
  document.getElementById("vehicleDesc").value = "";
  document.getElementById("vehicleName").value = "";
  document.getElementById("vehiclePlate").value = "";
  document.getElementById("getVehicleType").value = "";
  document.getElementById("vehicleNameCad").value = "";
  document.getElementById("vehicleDescCad").value = "";
  document.getElementById("vehiclePlateCad").value = ""; 
  document.getElementById("tipo_busca_cad").value = "";

}

function buscaVehicleAll(){

    var link = server +'/vehicles';

    $.ajax({
        url: link,
        type: 'GET',
        dataType: 'json',
  
      })
      .done(function(json) {
        
            var text = "";
    
            json.content.forEach(function(vehicle, i) {
                text +=    " <tr>"
                        +  " <th>"+ vehicle.vehicleid +"</th>"
                        +  " <td> "+ vehicle.vehicleName +" </td> "
                        +  " <td> "+ vehicle.vehicleType.vehicleTypeName + "- Cod.: "+ vehicle.vehicleType.veicleTypeid + " </td>"
                        +  " <td> "+ vehicle.vehiclePlate +" </td>"
                        +  " <td> "+ vehicle.vehicleDesc +" </td>"
                        +  " </tr> "
            });

            $("#BuscaVehicleAll").html(text);

      })
      .fail(function() {
        alert("não foi possivel completar a requisição")
      })
      .always(function() {
      });
}


$('#buscar_vehicle').click(function() {
   
    var valor = document.getElementById("vehiclePlate").value;
    if(valor == ""){
      alert("a placa do veiculo deve ser informada");
      return;
    }
    var link = server +'/vehicles/plate/'+ valor;
    $.ajax({
        url: link,
        type: 'GET',
        dataType: 'json',
  
      })
      .done(function(json) {
        console.log(json);
        tipo_veiculo = json.vehicleType.veicleTypeid
        veiculo = json.vehicleid;
        document.getElementById("vehicleDesc").value = json.vehicleDesc;
        document.getElementById("vehicleName").value = json.vehicleName;
        document.getElementById("vehiclePlate").value = json.vehiclePlate;
        document.getElementById("getVehicleType").value = 'Nome.: ' + json.vehicleType.vehicleTypeName;

      })
      .fail(function(json) {
        if(json.responseText == 'Veiculo não encontrado.'){
          alert("Veiculo não encontrado");
        }else{
          alert("Dado Invalido");
        }
        limpacampos();
      })
      .always(function() {
      });
  });

$('#btn_busca_tipo_cad').click(function() {
    var valor = document.getElementById("tipo_busca_cad").value;
    if(valor == ""){
      alert("O nome do tipo deve ser informado");
      return;
    }
    var link = server +'/vehiclesType/name/'+ valor;
    $.ajax({
        url: link,
        type: 'GET',
        dataType: 'json',
  
      })
      .done(function(json) {
        console.log("teste");
        tipo_veiculo = json.veicleTypeid
        document.getElementById("tipo_busca_cad").value = json.vehicleTypeName + ' - ' + json.veicleTypeid;
      })
      .fail(function() {
        tipo_veiculo = 0
        document.getElementById("tipo_busca_cad").value = "";
      })
      .always(function() {
      });
});

$('#btn_busca_tipo').click(function() {
  var valor = document.getElementById("getVehicleType").value;
  if(valor == ""){
    alert("O nome do tipo deve ser informado");
    return;
  }
  var link = server +'/vehiclesType/name/'+ valor;
  $.ajax({
      url: link,
      type: 'GET',
      dataType: 'json',

    })
    .done(function(json) {
      console.log("teste");
      tipo_veiculo = json.veicleTypeid
      document.getElementById("getVehicleType").value = json.vehicleTypeName + ' - ' + json.veicleTypeid;
    })
    .fail(function() {
      tipo_veiculo = 0
      document.getElementById("getVehicleType").value = "";
    })
    .always(function() {
    });
});


$('#edita_veiculo').click(function() {

  if(tipo_veiculo = 0) {
    alert("Informe o tipo do veiculo primeiro, buscando pelo nome");
    return;
  }
    const data = {        
            vehicleName : document.getElementById("vehicleName").value,
            vehicleDesc : document.getElementById("vehicleDesc").value,
            vehicleType : tipo_veiculo,
            vehiclePlate: document.getElementById("vehiclePlate").value
        }

    var link = server +'/vehicles/'+veiculo;
    $.ajax({
      url: link,
      type:  'PUT',
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify(data),
      })
      .done(function(json) {
        alert("Editado com sucesso");
      })
      .fail(function(json) {
        if(json.responseText){
          alert(json.responseText);
        }else{
          alert("Dado Invalido");
        }
        limpacampos();
      })
      .always(function() {
    });
});

$('#cadastra_veiculo').click(function() {
    const data = {        
            vehicleName : document.getElementById("vehicleNameCad").value + '',
            vehicleDesc : document.getElementById("vehicleDescCad").value + '',
            vehicleType : tipo_veiculo,
            vehiclePlate: document.getElementById("vehiclePlateCad").value + ''
        }

    var link = server +'/vehicles';
    $.ajax({
        url: link,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(data),
      })
      .done(function(json) {
        alert("Veiculo cadastrado com sucesso")
        limpacampos();
      })
      .fail(function() {
        console.log("Erro");
      })
      .always(function() {

    });
});


$('#deleta_veiculo').click(function() {

    var link = server +'/vehicles/'+veiculo;
    $.ajax({
        url: link,
        type: 'DELETE',
        //contentType: "application/json; charset=utf-8",
        dataType: 'json',
      })
      .done(function(json) {
        alert("Veiculo excluido");
        limpacampos();
      })
      .fail(function(json) {
        //alert("não foi possivel excluir o Veiculo")
        console.log(json);

      })
      .always(function() {
    });
});




document.getElementById("defaultOpen").click();

function openTab(evt, table) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(table).style.display = "block";
    evt.currentTarget.className += " active";
    limpacampos();
    if(table == 'Buscar'){
      console.log('')
      buscaVehicleAll();
    }
  }