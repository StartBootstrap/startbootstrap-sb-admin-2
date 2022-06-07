
const server = 'http://34.228.53.60:8081';
const header= {"Content-Type" : "application/json"};
var tipo_veiculo = 0;
var veiculo = 0;

function limpacampos(){
  tipo_veiculo = 0;
  veiculo = 0;
  document.getElementById("desc_type_ed").value = "";
  document.getElementById("name_type_cad").value = "";
  document.getElementById("name_tipo_ed").value = "";
  document.getElementById("tipo_desc_ed").value = "";

}

function buscaVehicTypeleAll(){

    var link = server +'/vehiclesType/';

    $.ajax({
        url: link,
        type: 'GET',
        dataType: 'json',
  
      })
      .done(function(json) {
        
            var text = "";
    
            json.content.forEach(function(vehicle, i) {
                text +=    " <tr>"
                        +  " <th>"+ vehicle.veicleTypeid +"</th>"
                        +  " <td> "+ vehicle.vehicleTypeName +" </td> "
                        +  " <td> "+ vehicle.vehicleTypeDesc +" </td>"
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

$('#busca_tipo').click(function() {
  var valor = document.getElementById("name_tipo_ed").value;
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
      document.getElementById("name_tipo_ed").value = json.vehicleTypeName + ' - ' + json.veicleTypeid;
    })
    .fail(function() {
      tipo_veiculo = 0
      document.getElementById("name_tipo_ed").value = "";
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
            vehicleName : document.getElementById("vehicleNameCad").value,
            vehicleDesc : document.getElementById("vehicleDescCad").value,
            vehicleType : tipo_veiculo,
            vehiclePlate: document.getElementById("vehiclePlateCad").value
        }

    var link = server +'/vehicles/'+veiculo;
    $.ajax({
      url: link,
      type: 'POST',
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
        type: 'DEL',
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
      buscaVehicTypeleAll();
      //buscaVehicleAll();
    }
  }