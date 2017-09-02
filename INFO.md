##### Client Side Global Variables
- _vm (the exact copy of view model that is passed on from the controller)
- _csrf (the csrf token that is generated from sails server)

##### Automated Tasks:
- No longer need to write an hidden field to store csrf token in a non-AJAX Form. Instead, the hidden field will be automatically appended on form submission (Refer to **Shared.js** under events section)