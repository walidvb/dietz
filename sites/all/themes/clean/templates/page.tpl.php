<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 */
?>

    <?php if ($main_menu || $secondary_menu): ?>
      <nav id="navigation">
        <div class="section">
          <?php print render($page['main_menu']); ?>
          <?php print render($page['secondary_menu']); ?>
        </div>
      </nav>
    <?php endif; ?>
    <!-- work list -->
    <section id="header">
         <?php print render($page['header']); ?>
      </section>    
    <!-- /work list -->      
      
<div id="page-wrapper">
  <div id="page">
    <?php print $messages; ?>

    <section id="main-wrapper">
        <?php if ($page['sidebar_first']): ?>
              <?php print render($page['sidebar_first']); ?>
        <?php endif; ?>

        <div id="content" class="column">
            <?php if ($page['highlighted']): ?>
              <div id="highlighted">
                <?php print render($page['highlighted']); ?>
              </div>
            <?php endif; ?>
            <a id="main-content"></a>

            <?php if ($tabs): ?>
              <div class="tabs">
                <?php print render($tabs); ?>
              </div>
            <?php endif; ?>

            <?php print render($page['help']); ?>

            <?php if ($action_links): ?>
              <ul class="action-links">
                <?php print render($action_links); ?>
              </ul>
            <?php endif; ?>

            <?php print render($page['content']); ?>
          </div>
    </section>
    
    
        <?php if ($page['sidebar_second']): ?>
          <div id="promo-wrapper" class="promo-wrapper">
              <?php print render($page['sidebar_second']); ?>
          </div>
        <?php endif; ?>

    <footer id="footer">
        <?php print render($page['footer']); ?>
    </footer>
  </div>
</div>
