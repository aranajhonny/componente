<div class="main-sidebar">
  <!-- Inner sidebar -->
  <div class="sidebar" id="scrollspy">
    <!-- user panel (Optional) -->
    <div class="user-panel">
      <br>
      <div class="pull-left image">
        <?php
        if ( $_SESSION['rol'] == "Administrador") {
          echo "<img src='public/img/avatar5.png' class='img-circle' alt='User Image'>";
        }else{
          echo "<img src='public/img/avatar3.png' class='img-circle' alt='User Image'>";
        }
        ?>
      </div>
      <div class="pull-left info">
        <p><?php echo $_SESSION['rol']; ?></p>
        <a><i class="fa fa-circle text-success"></i><?php echo $_SESSION['nombre']; ?> <?php echo $_SESSION['apellido']; ?></a>
      </div>
    </div><!-- /.user-panel -->
    <!-- Sidebar Menu -->
    <ul class="sidebar-menu">
      <!-- Optionally, you can add icons to the links -->
      <!-- Registros Menu -->

      <li class="treeview" id="scrollspy-components">
        <a href="#">
          <span>Registros</span>
          <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li class="">
            <a href="?controller=clientes&action=create">
              <i class="fa  fa-users"></i>
              <span>Clientes</span>
            </a>
          </li>
          <li class="">
            <a href="?controller=proveedores&action=create">
              <i class="fa fa-truck"></i>
              <span>Proveedores</span>
            </a>
          </li>
          
          <?php if ( $_SESSION['rol'] == "Administrador") {?>
            <li class="">
              <a href="?controller=productos&action=create">
                <i class="fa fa-dropbox"></i>
                <span>Productos</span>
              </a>
            </li>
            <?php   } ?>

            <li class="">
              <a href="?controller=categorias&action=create">
                <i class="fa fa-th-list"></i>
                <span>Categorias</span>
              </a>
            </li>
          </ul>
        </li>

        <!-- Compras Menu -->
        <li class="treeview id="scrollspy-components"">
          <a href="?controller=compras&action=index">
            <i class="?controller=compras&action=index"></i>
            <span>Compra</span>
          </a>
        </li>
        <!-- ventas Menu -->
        <li class="treeview">
          <a href="?controller=ventas&action=index">
            <i class=""></i>
            <span>Venta</span>
          </a>
        </li>
        <!-- presupuestos Menu -->
        <li class="treeview id="scrollspy-components"">
          <a href="?controller=presupuestos&action=index">
            <i class=""></i>
            <span>Presupuesto</span>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa fa-angle-left pull-right"></i>
            <span>Reportes</span>
          </a>
          <ul class="treeview-menu">
            <li class="treeview">
              <a href="?controller=productos&action=index">
                <i class=""></i>
                <span>Productos</span>
              </a>
            </li>
            <li class="treeview">
              <a href="?controller=clientes&action=index">
                <i class=""></i>
                <span>Clientes</span>
              </a>
            </li>
            <li class="treeview">
              <a href="?controller=proveedores&action=index">
                <i class=""></i>
                <span>Proveedores</span>
              </a>
            </li>
            <li class="treeview">
              <a href="">
                <i class="fa  fa-angle-left pull-right"></i>
                <span>Ventas</span>
              </a>
              <ul class="treeview-menu">
                <li>
                  <a href="?controller=ventas&action=listados">
                    <i class="fa  fa-file-text"></i>
                    <span>Listado general</span>
                  </a>
                </li>
              </ul>
                 <ul class="treeview-menu">
                <li>
                  <a href="?controller=ventas&action=listadoclifecha">
                    <i class="fa  fa-file-text"></i>
                    <span>Por Fecha</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="treeview">
              <a href="">
                <i class="fa  fa-angle-left pull-right"></i>
                <span>Compras</span>
              </a>
              <ul class="treeview-menu">
                <li>
                  <a href="?controller=compras&action=listado">
                    <i class="fa  fa-file-text"></i>
                    <span>Listado general</span>
                  </a>
                </li>
              </ul>
              <ul class="treeview-menu">
                <li>
                  <a href="?controller=compras&action=listadoprovfecha">
                    <i class="fa  fa-file-text"></i>
                    <span>Por Fecha</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="treeview">
              <a href="">
                <i class="fa  fa-angle-left pull-right"></i>
                <span>Presupuestos</span>
              </a>
              <ul class="treeview-menu">
                <li>
                  <a href="?controller=presupuestos&action=Reporte">
                    <i class="fa  fa-file-text"></i>
                    <span>Listado general</span>
                  </a>
                </li>
              </ul>
                 <ul class="treeview-menu">
                <li>
                  <a href="?controller=presupuestos&action=listadoclifecha">
                    <i class="fa  fa-file-text"></i>
                    <span>Por Fecha</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <span>Mantenimiento</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <?php if( $_SESSION['rol'] == "Administrador") { ?>
              <li>
                <a href="?controller=usuarios">
                  <i class="fa fa-group"></i>
                  <span>Usuarios</span>
                </a>
              </li>
              <li>
                <a href="?controller=utilidades&action=bitacora">
                  <i class="fa fa-tasks"></i>
                  <span>Bítacora</span>
                </a>
              </li>
               <li>
                <a href="?controller=utilidades">
                  <i class="fa fa-edit"></i>
                  <span>Utilidades</span>
                </a>
              </li>

              <li>
                <a href="?controller=respaldos&action=index">
                  <i class="fa fa-download"></i>
                  <span>Respaldo de la data</span>
                </a>
              </li>
              <?php }?>
            </ul>
          </li>
          <li>
            <a href="http://localhost/Manual/home.php">
              <i class="fa fa-book"></i><span>Documentaci&oacuten</span></a>
            </li>
            <li>
              <a href="?controller=login&action=logout">
                <i class="fa fa-sign-out"></i><span>Cerrar sesión</span></a>
              </li>
            </ul><!-- /.sidebar-menu -->
          </div><!-- /.sidebar -->
        </div><!-- /.main-sidebar -->
