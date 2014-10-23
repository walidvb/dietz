<?php
/**
 * @file views-view-table.tpl.php
 * Template to display a view as a table.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $header: An array of header labels keyed by field id.
 * - $header_classes: An array of header classes keyed by field id.
 * - $fields: An array of CSS IDs to use for each field id.
 * - $classes: A class or classes to apply to the table, based on settings.
 * - $row_classes: An array of classes to apply to each row, indexed by row
 *   number. This matches the index in $rows.
 * - $rows: An array of row items. Each row is an array of content.
 *   $rows are keyed by row number, fields within rows are keyed by field ID.
 * - $field_classes: An array of classes to apply to each field, indexed by
 *   field id, then row number. This matches the index in $rows.
 * @ingroup views_templates
 */
 unset($header['nid']); 

 if(!$user->uid)
 {
  unset($header['edit_node']);
 }
 //add class 
 $header_classes['field_year'] .= " active";
?>
<table <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
  <?php if (!empty($title)) : ?>
    <caption><?php print $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>
    <thead>
      <tr>
        <?php foreach ($header as $field => $label): ?>
          <th <?php if ($header_classes[$field]) { print 'class="sort '. $header_classes[$field] . '" '; } ?>>
            <div><?php print $label; ?></div>
          </th>
        <?php endforeach; ?>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php foreach ($rows as $row_count => $row): ?>
      <tr <?php 
      $data = "";
      $sortable = array();
      if(!$user->uid)
       {
        unset($row['edit_node']);
       }

      foreach($row as $key => $value)
      {
        $key = str_replace('field_', '', $key);
        $value = str_replace(' ', '-', $value);
        print  "data-$key=\"" . strip_tags($value) . '" ';
      }
		//  $sortable['title'] = $row['title'];
		//  $sortable['topology'] = $row['field_topology'];
		//  $sortable['city'] = $row['field_city'];
		//  $sortable['team'] = $row['field_team'];
		 
		//  //$scales = array('s', 'm', 'l', 'xl', 'xxl');
		//  //$sortable['scale'] = str_replace(array('S', 'M', 'L', 'XL', 'XXL'), array(1, 2, 3, 4, 5), $row['field_scale']);
		//  $sortable['status'] = $row['field_status'];
		//  $sortable['year'] = $row['field_year'];
		//  $sortable['nid'] = $row['nid'];
		 unset($row['nid']);

		// foreach($sortable as $key => $value)
		// {
		// 	$data .= "data-$key=\"" . strip_tags($value) . "\" ";
		// }

       print $data; 
       //unset($sortable);
      
      
      ?> class="<?php print implode(' ', $row_classes[$row_count]); ?>">
        <?php foreach ($row as $field => $content): ?>
          <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php print $content; ?>
          </td>
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>