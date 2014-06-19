<?php
/**
 * @file views-view-fields.tpl.php
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
 $id = $fields['title']->content;
 $nid = $fields['nid']->content;
 $edit = $fields['edit_node']->content;
 $body = $fields['body']->content;
 $short = $fields['field_short_description']->content;
 $first_img = $fields['field_images_1']->content;
 $images = $fields['field_images']->content;
 $sortable = array();
 $sortable['title'] = $id;
 $sortable['topology'] = $fields['field_topology']->content;
 $sortable['city'] = $fields['field_city']->content;
 $sortable['team'] = $fields['field_team']->content;
 $sortable['status'] = $fields['field_status']->content;

 /*	$scales = array('s', 'm', 'l', 'xl', 'xxl');
 	$sortable['scale'] = str_replace(array('S', 'M', 'XL', 'L'), array(1, 2, 4, 3), $fields['field_scale']->content);
 */
 $sortable['year'] = substr($fields['field_year']->content,0,4);
 $sortable['nid'] = $nid;
 $sortable['cycle-hash'] = render_($id);
 $data = '';
	foreach($sortable as $key => $value)
	{
		$value = str_replace(' ', '-', $value);
		$data .= " data-$key=\"$value\"";
	}
?>	
<div class="views-row miniframe" <?php print $data ?>>

	<div class="proj-info">
		<div class="proj-header">
			<div class="proj-title"><?php print $id . ' ' . $edit  ?></div>
			<div class="proj-details">
				<?php print($sortable['city'] . ", " . $sortable['year'] . ": " . $sortable['status']) ?>
			</div>
		</div>
		<div class="proj-body">
		<div class="proj-short">
			<?php print($short) ?>
		</div>
		<?php print($body); ?>
		</div>
	</div>
	
	
	<div class="proj-wrapper"  data-id="<?php print $nid ?>">
		<?php print $first_img . $images ?>
	</div>
	
</div>