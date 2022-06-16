<?php
global $config, $tmpl, $module;
$logo = URL_ROOT . $config['logo'];
$Itemid = FSInput::get('Itemid');
$ccode = FSInput::get('ccode');
$tmpl->addScript('main');
?>
    <header>
        <div class="container">

        </div>
    </header><!-- END: #header -->
    <section>
        <!-- Content Wrapper. Contains page content -->
        <div class="container">
            <?php echo $main_content; ?>
        </div>
        <!-- /.content-wrapper -->
    </section>

    <footer>
        <div class="container">

        </div>
    </footer><!-- END: #footer -->