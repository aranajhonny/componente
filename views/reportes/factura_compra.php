<?php
require('../../includes/dompdf/dompdf_config.inc.php');
require_once '../../includes/config.php';
require_once '../../model/comprasModel.php';
$cod_compra = $_GET["cod_compra"];
$dc = new compra();
$c = new compra();
$det_compra = $dc->detalle_compra($cod_compra);
$compra = $c->obtener_compra($cod_compra);
session_start();
$codigo='<html>
<head>
  <link rel="stylesheet" href="../../public/src/css/facturas/facturacompra.css" type="text/css" />
</head>
<body>
  <header>
    <img src="../../images/logo_empresa.jpg" />
    <div id="me">
      <h4 style="text-align:right;border:solid 0px;width:100%;">Urb. La fundación. Cagua</h4>
      <h4 style="text-align:right;border:solid 0px;width:100%;">Manzana 6, casa Nro. 33</h4>
      <h4 style="text-align:right;border:solid 0px;width:100%;">Edo Aragua. ZP 2122</h4>
      <h4 style="text-align:right;border:solid 0px;width:100%;">Telf.:(0244)396.4520</h4>
    </div>
  </header>
  <hr>
  <div id="linea">
    <h3>Orden de compra</h3>
  </div>';
  $codigo.='<table class="encabezado " style="width:100%;">';
foreach ($compra as $k => $det_c) {
  $fecha = date_create($det_c['fecha']);//funcion para voltear la fecha
  $codigo.='
  <tr>
    <td style="text-align:left;">N° de orden: '.$det_c['codigo'].'</td>
    <td style="text-align:left;">Forma de pago: '. $det_c['forma_pago'].'</td>
    <td style="text-align:left;">Fecha: '.date_format($fecha, 'd-m-Y').'</td>
  </tr>
  <tr>
    <td style="text-align:left;" >Rif: '.$det_c['rif'].'</td>
    <td style="text-align:left;" >Razon social: '. $det_c['razon_social'].'</td>
    <td style="text-align:left;" >Telefono: '.$det_c['telefono'].'</td>
  </tr>
  </table>
  <table class="encabezado" style="margin-top:0px;width:100%;">
  <tr>
    <td style="text-align:left;" >Domicilio: '.$det_c['direccion'].'</td>
  </tr>

    ';
  }
    $codigo.='</table>';
    $codigo.='<br/><table class="collapse">';
    $codigo.='<thead>
    <tr>
    <th style="width:100px;text-align:center;">Codigo</th>
    <th style="width:400px;text-align:center;">Descripción</th>
    <th style="width:100px;text-align:center;">Cantidad</th>
    <th style="width:100px;text-align:center;">Precio</th>
    </tr>
    </thead>';
    $cont = count($det_compra);
    $filas = 24 - $cont;
foreach ($det_compra as $k => $detalle) {
  $codigo.='<tr>
    <td style="width:100px;text-align:left;">'. $detalle['codigo'].'</td>
    <td style="width:400px;text-align:left;">'. $detalle['descripcion'].'</td>
    <td style="width:100px;text-align:left;">'. $detalle['cantidad'].'</td>
    <td style="width:100px;text-align:left;">'. $detalle['precio'].'</td>
    </tr>';
}
for ($i=1; $i < $filas; $i++) {
      $codigo.='<tr>
      <td style="width:100px; height:1.1em;text-align:left;"> </td>
      <td style="width:400px;text-align:left;"> </td>
      <td style="width:100px;text-align:left;"> </td>
      <td style="width:100px;text-align:left;"> </td>';
    }
   $codigo.='</tr>';
  $codigo.='</table>';
  $codigo.='<table class="collapse" style="margin-left:389px;">';

  foreach ($compra as $k => $totales) {
  $codigo.='<tr>
    <td style="width:100px;text-align:left;">Subtotal</td>
    <td style="width:100px;text-align:left;">'. $totales['subtot'].'</td>
  </tr>
  <tr>
    <td style="width:100px;text-align:left;">Iva 12%</td>
    <td style="width:100px;text-align:left;">'. $totales['impuesto'].'</td>
  </tr>
  <tr>
    <td style="width:100px;text-align:left;">Total</td>
    <td style="width:100px;text-align:left;">'. $totales['tot'].'</td>';
}
$codigo.='</tr>';
  $codigo.='</table>';
  $codigo.='</body></html>';
  $codigo=utf8_decode($codigo);
  $dompdf= new DOMPDF();
  $dompdf->load_html($codigo);
  ini_set("memory_limit","100M");
  $dompdf->set_paper("A4","portrait");
  $dompdf->render();
    //$dompdf->stream("reporteRegistro.pdf");
  $dompdf->stream('factura_compra.pdf',array('Attachment'=>0));

  ?>
