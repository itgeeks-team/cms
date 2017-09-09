##### Client Side Global Variables
- _vm (the exact copy of view model that is passed on from the controller)
- _csrf (the csrf token that is generated from sails server)

##### Automated Tasks:
- No longer need to write an hidden field to store csrf token in a non-AJAX Form. Instead, the hidden field will be automatically appended on form submission (Refer to **Shared.js Events section**)
- No longer need to manually insert _csrf field into ajax send data because the csrf token will be automatically appended right before ajax call. (Refer to **Shared.js Ajax setup section**)
