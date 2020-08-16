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

    // This element will get the extra class
    const editor = document.getElementById("editor");

    // Helper function to get the template name
    const getTemplateName = () => select('core/editor').getEditedPostAttribute( 'template' )

    // Variable for saving the current template name
    let templateName;

    // Subscribe to editor changes
    const checkRequiredField = subscribe( () => {

        // Get the "new" template new
        const newTemplateName = getTemplateName();

        /**
         * Because the subscribe funciton is called very often,
         * we should check whether a change relevant to us
         * has been performed
         */
        if( templateName !== newTemplateName ) {

            /**
             * Check if the dark mode template is active
             * if true, add a new class the editor
             * if false, remove the class from the editor
             */ 
            if ( newTemplateName.includes('darkmode.php') ) {
                editor.classList.add("page-template-darkmode");
            } else {
                editor.classList.remove("page-template-darkmode");
            }
        }

        templateName = newTemplateName;
    })
} );
