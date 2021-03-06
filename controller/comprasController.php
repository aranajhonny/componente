<?php
	/**
	*
	*/
	class ComprasController
	{
		public function __construct(){
      require_once("model/comprasModel.php");
      require_once("model/provModel.php");
      require_once("model/prodModel.php");
      require_once("controller/utilidadesController.php");

      if (($_SESSION['id_emp']) == "") {
        header("Location: ".Conectar::ruta()."?controller=login");
      }
    }
    //carga la vista de nueva compra
    public function index(){
     unset($_SESSION['detalle']);
      $ivaEnt = new utilidadesController;
      $impuesto = $ivaEnt->valorIva();
      $bancos = $ivaEnt->valorBancos();
      $c= new compra;
      $numorden = $c->numorden();
      require_once("model/categoriaModel.php");
      $c = new categoria();
      $categorias = $c->get_categorias() ;
      require_once("views/layout/template.php");
      require_once("views/compras/nuevaCompra.php");
    }
    //carga todas las compras realizadas
    public function all()
    {
      $c = new compra();
      $compras = $c->get_compras() ;
      $data = array();
      foreach ($compras as $com) {
        $fecha = date_create($com['fecha']);//funcion para voltear la fecha
        $row = array(
            $com['codigo'],
          $com['proveedor'],
        date_format($fecha, 'd-m-Y'),//se voltea la fecha
        $com['monto']);
        $data[] = $row;
      }
      $output = array("data" => $data);
      echo json_encode($output);
    }
    public function buscar()
    {
      $c = new compra();
      $compras = $c->get_compras() ;
      $data = array();
      foreach ($compras as $com) {
        $fecha = date_create($com['fecha']);//funcion para voltear la fecha
        $row = array($com['prov'],
          $com['proveedor'],
        date_format($fecha, 'd-m-Y'),//se voltea la fecha
        $com['monto'],
        '<a  data-toggle="tooltip" title="Ver" href="javascript:void(0)" onclick=""><i class=" btn btn-xs btn-ver
        glyphicon glyphicon-eye-open"></i></a>
        <a  data-toggle="tooltip" title="Eliminar" href="javascript:void(0)" onclick="" ><i class=" btn btn-xs btn-delete
          glyphicon glyphicon-trash"></i></a>');
        $data[] = $row;
      }
      $output = array("data" => $data);
      echo json_encode($output);
    }
    // crear compra
    public function create(){
      if((isset($_SESSION['token'])) && ($_POST['token'] == $_SESSION['token'])){
        $compra = new compra;
        $cod_compra = $_POST['cod_factura'];
        $id_prov = $_POST['id_prov'];
        $id_emp = $_POST['id_emp'];
        $fecha_actual = $_POST['fecha'];
        $forma_pago = $_POST['forma_pago'];
        $banco = $_POST['banco'];
        $nro_cuenta = $_POST['nro_cuenta'];
        $nro_comprobante = $_POST['nro_comprobante'];
        $impuesto = $_POST['impuesto'];
        $subtot = $_POST['subtotal'];
        $tot = $_POST['total'];
        $status = 'activo';
        $datos=array();
        foreach ($_POST['cod'] as $key => $value) {
          $datos[$key]['cod']=$value;
        }
        foreach ($_POST['cant'] as $key => $value) {
          $datos[$key]['cant']=$value;
        }
        foreach ($_POST['precio_p'] as $key => $value) {
          $datos[$key]['precio_p']=$value;
        }
        $compra->create_compra($cod_compra,$id_prov,$id_emp,$fecha_actual,$forma_pago,$banco,$nro_cuenta,$nro_comprobante,$impuesto,$subtot,$tot,$status,$datos);
      }
    }

      public function listadoprov()
  {
    require_once("views/layout/template.php");
    require_once("views/compras/listadoProv.php");
    $f = new compra();
    $rif = $_POST["rif"];
    if (isset($_POST["rif"])){
          $compras = $f->get_compras_by_id($rif);
      }else{
        $rif = $_POST[""];
        $compras = $f->get_compras_by_id($rif);
  }
}

 public function listadoprovfecha(){
    require_once("views/layout/template.php");
    require_once("views/compras/listadoprovfecha.php");
  }

    // agrega producto al carrito de compras
    public function agregar(){
     $objProducto = new producto();
     if (isset($_GET['codigo']) && $_GET['codigo']!='' && isset($_GET['cantidad']) && $_GET['cantidad']!='') {
       try {
        $cantidad = $_GET['cantidad'];
        $codigo = $_GET['codigo'];
        $precio = $_GET['precio'];
        $producto = $objProducto->agregar_producto($codigo,$cantidad,$precio);
      } catch (PDOException $e) {
        $e->getMessage();
      }
    }
  }
  // muestra la pantalla de todas las compras y all(pasa el listado por json a datables)
  public function listado(){
    require_once("views/layout/template.php");
    require_once("views/compras/listadoCompras.php");
  }
  public function listadoP()
  {
    require_once("views/layout/template.php");
    require_once("views/compras/listadoProv.php");
  }
  //busca un proveedor
  public function buscarProveedor(){
   require_once("model/provModel.php");
   $rif = $_GET["rif"];
   if(empty($_GET["rif"]))
   {
     echo 1 ;
     exit;
   }
   $p = new proveedor();
   if (isset($_GET["rif"]) and $_GET["rif"] != "") {
     $proveedor = $p->buscar_proveedor($rif);
   }
 }
  //busca un producto
   public function buscarProducto(){
   require_once("model/prodModel.php");
   $codigo = $_GET["codigo"];
   if(empty($_GET["codigo"]))
   {
     echo 1 ;
     exit;
   }
   $p = new producto();
   if (isset($_GET["codigo"]) and $_GET["codigo"] != "") {
     $proveedor = $p->buscar_producto($codigo);
   }
 }

 public function update(){
      # code...
 }
   // public function reporteFactura(){
   //    $c = new compra();
   //    $compras = $c->reporte_factura();
   // }

 public function delete(){
      # code...
 }
 //eliminina el carrito de compras
 public function destruirCarrito(){
  try {
    unset($_SESSION['detalle']);
  } catch (PDOException $e) {
   $e->getMessage();
 }
}
//elimina un item del carrito de compras
public function eliminar(){
  $json = array();
  $json['msj'] = 'Producto Eliminado';
  $json['success'] = true;

  if (isset($_POST['codigo'])) {
    try {
      $codigo = $_POST['codigo'];
      unset($_SESSION['detalle'][$codigo]);
      $json['success'] = true;

      echo json_encode($json);

    } catch (PDOException $e) {
      $json['msj'] = $e->getMessage();
      $json['success'] = false;
      echo json_encode($json);
    }
  }
}

public function autoProv(){
  $searchTerm = $_GET['term'];
  $p = new proveedor();
  $p->auto_prov($searchTerm);
}

public function autoProd(){
  $searchTerm = $_GET['term'];
  $producto = new producto();
  $producto->auto_prod($searchTerm);
}

}


?>
