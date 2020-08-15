import '../scss/editor.scss'
console.log('editor childtheme script')

const {
	subscribe,
	select
} = wp.data;

/**
 * Add dark-mode class to block-editor based on selected page template
 */
wp.domReady( () => {

    const editor = document.getElementById("editor");
    const getTemplateName = () => select('core/editor').getEditedPostAttribute( 'template' )

    let templateName;

    // // get element to attach the darkmode class

	// 	// Subscribe to editor state changes.
    let checkRequiredField = subscribe( () => {
        console.log('subscribe');

        // get the current template name
        const newTemplateName = getTemplateName();    
        if( templateName !== newTemplateName ) {
            if ( newTemplateName.includes('darkmode.php') ) {
                editor.classList.add("page-template-darkmode");
            } else {
                editor.classList.remove("page-template-darkmode");
            }
        }

        templateName = newTemplateName;
	})
} );
