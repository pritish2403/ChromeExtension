var conf = jQuery.noConflict(true);

(function ($) {

    // Function to check if current tab supports script injection
    function checkTabSupport() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && (tabs[0].url.startsWith('chrome://') || tabs[0].url.startsWith('chrome-extension://'))) {
                $('#status-message').show();
                $('#cvd_radios input').prop('disabled', true);
            } else {
                $('#status-message').hide();
                $('#cvd_radios input').prop('disabled', false);
            }
        });
    }

    // Define the execute function that was missing
    function execute() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // Check if we can inject scripts into this tab
            if (!tabs[0] || tabs[0].url.startsWith('chrome://') || tabs[0].url.startsWith('chrome-extension://')) {
                console.log('Cannot inject scripts into this tab type');
                return;
            }

            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['colorblinding.js']
            }).then(() => {
                // After script injection, execute the color blindness function
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    function: function() {
                        if (typeof execute === 'function') {
                            execute();
                        }
                    }
                });
            }).catch(err => {
                console.error('Failed to inject colorblinding.js:', err);
            });
        });
    }

    $(function () {
        // Check tab support when popup opens
        checkTabSupport();

        chrome.storage.sync.get('colorblindingValue', function (obj) {

            var noValue = obj.colorblindingValue === null || obj.colorblindingValue === undefined;
            $("input[name=type][value=" + (noValue ? "deactivate" : obj.colorblindingValue ) + "]").prop('checked', true);

            if (obj.colorblindingValue !== 'deactivate' && !noValue) {
                //console.log("internal " + obj.colorblindingValue);
                execute();
            }

        });

        $('input[name="type"]:radio').change(
            function () {

                var newValue = $('input[name=type]:checked', '#cvd_radios').val();
                chrome.storage.sync.set({'colorblindingValue': newValue}, function () {

                    if (newValue !== 'deactivate') {
                        // Inject the colorblinding.js script to apply filters
                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            if (tabs[0] && !tabs[0].url.startsWith('chrome://') && !tabs[0].url.startsWith('chrome-extension://')) {
                                chrome.scripting.executeScript({
                                    target: {tabId: tabs[0].id},
                                    files: ['colorblinding.js']
                                }).then(() => {
                                    // Execute the color blindness function
                                    chrome.scripting.executeScript({
                                        target: {tabId: tabs[0].id},
                                        function: function() {
                                            if (typeof execute === 'function') {
                                                execute();
                                            }
                                        }
                                    });
                                }).catch(err => {
                                    console.error('Failed to inject colorblinding.js:', err);
                                });
                            }
                        });
                    } else {
                        // Inject the reload.js script to remove filters
                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            if (tabs[0] && !tabs[0].url.startsWith('chrome://') && !tabs[0].url.startsWith('chrome-extension://')) {
                                chrome.scripting.executeScript({
                                    target: {tabId: tabs[0].id},
                                    files: ['reload.js']
                                }).catch(err => {
                                    console.error('Failed to inject reload.js:', err);
                                });
                            }
                        });
                    }

                });
            }
        );

    });

})(conf);