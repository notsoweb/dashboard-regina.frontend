import toastr from 'toastr';

class Notify {
  constructor() {}

  flash({message = 'Successful registration', type = 'success', timeout = 5}) {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": timeout * 1000,
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    toastr[type](message);
  }

  success(message, timeout) {
    this.flash({
      message,
      timeout
    });
  }

  error(message, timeout) {
    this.flash({
      message, 
      type:'error',
      timeout
    });
  }
  
  info(message, timeout) {
    this.flash({
      message, 
      type:'info',
      timeout
    });
  }

  warning(message, timeout) {
    this.flash({
      message, 
      type:'warning',
      timeout
    });
  }
}

export default Notify;
